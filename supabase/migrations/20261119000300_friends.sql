-- L5: friends for name-only players (no login). The plan's profiles/auth.uid() model is replaced by the
-- same id + secret scheme as submit_run. Each player has an invite code (readable only through RPC);
-- redeeming someone's code makes a mutual friendship (no pending state). Who is friends with whom is
-- never exposed: `friendships` has no grant and no policy, and every read/write goes through the RPCs
-- below, which check the caller's secret. Friends boards show names and times only.

create extension if not exists pgcrypto with schema extensions;

-- 8 chars, no look-alikes (no 0 O 1 I L).
create function lb_private.new_code() returns text
language plpgsql volatile set search_path = ''
as $$
declare
  alphabet constant text := 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';
  bytes bytea := extensions.gen_random_bytes(8);
  out text := '';
begin
  for i in 0..7 loop
    out := out || substr(alphabet, (get_byte(bytes, i) % 31) + 1, 1);
  end loop;
  return out;
end $$;

alter table public.players add column invite_code text unique;
do $$
declare r record;
begin
  for r in select id from public.players where invite_code is null loop
    update public.players set invite_code = lb_private.new_code() where id = r.id;
  end loop;
end $$;
alter table public.players alter column invite_code set not null;
alter table public.players alter column invite_code set default lb_private.new_code();
-- invite_code is not in the column-level SELECT grant of L1, so the Data API cannot read it.

create table public.friendships (
  player_a   uuid not null references public.players (id) on delete cascade,
  player_b   uuid not null references public.players (id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (player_a, player_b),
  check (player_a < player_b)
);
create index friendships_b_idx on public.friendships (player_b);
alter table public.friendships enable row level security;
revoke all on public.friendships from anon, authenticated;

create table lb_private.redeem_log (
  player_id uuid not null,
  at        timestamptz not null default now()
);
create index redeem_log_idx on lb_private.redeem_log (player_id, at desc);

-- Checks id + secret; raises bad_player / bad_secret. Returns nothing.
create function lb_private.check_player(p_player_id uuid, p_secret text) returns void
language plpgsql stable security definer set search_path = ''
as $$
begin
  if p_player_id is null or p_secret is null or char_length(p_secret) < 32 or char_length(p_secret) > 128 then
    raise exception 'bad_player' using errcode = '22023';
  end if;
  if not exists (
    select 1 from public.players
     where id = p_player_id and secret_hash = extensions.digest(convert_to(p_secret, 'UTF8'), 'sha256')
  ) then
    raise exception 'bad_secret' using errcode = '42501';
  end if;
end $$;

-- Registers the player (or renames it) without a run, so a friend arriving by link can join before finishing one.
create function lb_private.ensure_player(p_player_id uuid, p_secret text, p_name text) returns text
language plpgsql security definer set search_path = ''
as $$
declare
  v_name text := btrim(p_name);
  v_hash bytea;
  v_code text;
begin
  if p_player_id is null or p_secret is null or char_length(p_secret) < 32 or char_length(p_secret) > 128 then
    raise exception 'bad_player' using errcode = '22023';
  end if;
  if v_name is null or char_length(v_name) not between 3 and 20 or v_name ~ '[[:cntrl:]]' then
    raise exception 'bad_name' using errcode = '22023';
  end if;
  v_hash := extensions.digest(convert_to(p_secret, 'UTF8'), 'sha256');
  insert into public.players (id, display_name, secret_hash) values (p_player_id, v_name, v_hash)
    on conflict (id) do nothing;
  perform lb_private.check_player(p_player_id, p_secret);
  update public.players set display_name = v_name where id = p_player_id and display_name <> v_name;
  select invite_code into v_code from public.players where id = p_player_id;
  return v_code;
end $$;

create function lb_private.my_invite(p_player_id uuid, p_secret text) returns text
language plpgsql security definer set search_path = ''
as $$
begin
  perform lb_private.check_player(p_player_id, p_secret);
  return (select invite_code from public.players where id = p_player_id);
end $$;

-- Redeem someone's code: mutual friendship, idempotent. Returns the friend's display name, or '' for an unknown code.
create function lb_private.redeem_invite(p_player_id uuid, p_secret text, p_code text) returns text
language plpgsql security definer set search_path = ''
as $$
declare
  v_code   text := upper(btrim(coalesce(p_code, '')));
  v_friend public.players;
begin
  perform lb_private.check_player(p_player_id, p_secret);
  -- Every attempt counts (bad codes too), so guessing is capped at 10 an hour per player.
  if (select count(*) from lb_private.redeem_log where player_id = p_player_id and at > now() - interval '1 hour') >= 10 then
    raise exception 'rate_limited' using errcode = '54000';
  end if;
  insert into lb_private.redeem_log (player_id) values (p_player_id);
  select * into v_friend from public.players where invite_code = v_code;
  -- Unknown code returns '' (not an error) so the logged attempt is not rolled back.
  if not found then return ''; end if;
  if v_friend.id = p_player_id then raise exception 'self_invite' using errcode = '22023'; end if;
  insert into public.friendships (player_a, player_b)
    values (least(p_player_id, v_friend.id), greatest(p_player_id, v_friend.id))
    on conflict do nothing;
  return v_friend.display_name;
end $$;

create function lb_private.my_friends(p_player_id uuid, p_secret text)
returns table (name text, since timestamptz)
language plpgsql security definer set search_path = ''
as $$
begin
  perform lb_private.check_player(p_player_id, p_secret);
  return query
    select p.display_name, f.created_at
      from public.friendships f
      join public.players p on p.id = case when f.player_a = p_player_id then f.player_b else f.player_a end
     where f.player_a = p_player_id or f.player_b = p_player_id
     order by f.created_at desc;
end $$;

-- Best times of me and my friends for one (mode, level, cfg_hash), fastest first.
create function lb_private.friends_board(p_player_id uuid, p_secret text, p_mode text, p_level text, p_cfg_hash text, p_n integer)
returns table (name text, ticks integer, is_me boolean)
language plpgsql security definer set search_path = ''
as $$
begin
  perform lb_private.check_player(p_player_id, p_secret);
  return query
    select p.display_name, b.ticks, b.player_id = p_player_id
      from public.bests b
      join public.players p on p.id = b.player_id
     where b.mode = p_mode and b.level = p_level and b.cfg_hash = p_cfg_hash
       and (b.player_id = p_player_id
            or exists (select 1 from public.friendships f
                        where (f.player_a = p_player_id and f.player_b = b.player_id)
                           or (f.player_b = p_player_id and f.player_a = b.player_id)))
     order by b.ticks asc
     limit greatest(1, least(coalesce(p_n, 10), 50));
end $$;

revoke all on function lb_private.new_code() from public;
revoke all on function lb_private.check_player(uuid, text) from public;
revoke all on function lb_private.ensure_player(uuid, text, text) from public;
revoke all on function lb_private.my_invite(uuid, text) from public;
revoke all on function lb_private.redeem_invite(uuid, text, text) from public;
revoke all on function lb_private.my_friends(uuid, text) from public;
revoke all on function lb_private.friends_board(uuid, text, text, text, text, integer) from public;
grant execute on function lb_private.ensure_player(uuid, text, text) to anon, authenticated;
grant execute on function lb_private.my_invite(uuid, text) to anon, authenticated;
grant execute on function lb_private.redeem_invite(uuid, text, text) to anon, authenticated;
grant execute on function lb_private.my_friends(uuid, text) to anon, authenticated;
grant execute on function lb_private.friends_board(uuid, text, text, text, text, integer) to anon, authenticated;

-- Public INVOKER shims (what the Data API exposes).
create function public.ensure_player(p_player_id uuid, p_secret text, p_name text) returns text
language sql security invoker set search_path = '' as $$ select lb_private.ensure_player(p_player_id, p_secret, p_name) $$;
create function public.my_invite(p_player_id uuid, p_secret text) returns text
language sql security invoker set search_path = '' as $$ select lb_private.my_invite(p_player_id, p_secret) $$;
create function public.redeem_invite(p_player_id uuid, p_secret text, p_code text) returns text
language sql security invoker set search_path = '' as $$ select lb_private.redeem_invite(p_player_id, p_secret, p_code) $$;
create function public.my_friends(p_player_id uuid, p_secret text) returns table (name text, since timestamptz)
language sql security invoker set search_path = '' as $$ select * from lb_private.my_friends(p_player_id, p_secret) $$;
create function public.friends_board(p_player_id uuid, p_secret text, p_mode text, p_level text, p_cfg_hash text, p_n integer)
returns table (name text, ticks integer, is_me boolean)
language sql security invoker set search_path = '' as $$ select * from lb_private.friends_board(p_player_id, p_secret, p_mode, p_level, p_cfg_hash, p_n) $$;

revoke all on function public.ensure_player(uuid, text, text) from public;
revoke all on function public.my_invite(uuid, text) from public;
revoke all on function public.redeem_invite(uuid, text, text) from public;
revoke all on function public.my_friends(uuid, text) from public;
revoke all on function public.friends_board(uuid, text, text, text, text, integer) from public;
grant execute on function public.ensure_player(uuid, text, text) to anon, authenticated;
grant execute on function public.my_invite(uuid, text) to anon, authenticated;
grant execute on function public.redeem_invite(uuid, text, text) to anon, authenticated;
grant execute on function public.my_friends(uuid, text) to anon, authenticated;
grant execute on function public.friends_board(uuid, text, text, text, text, integer) to anon, authenticated;
