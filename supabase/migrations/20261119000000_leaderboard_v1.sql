-- L1 (docs/plans/leaderboards-friends.md, owner scope change 2026-11-19):
-- name-only leaderboard first, no login. A player is a client-made uuid plus a secret kept in
-- the browser; only sha256(secret) is stored. `players.auth_user_id` is NULL until a later
-- login "claims" the row (claim_player), so a Facebook/Google profile can be mapped on later.
-- Clients never write tables: anon/authenticated only get column-limited SELECT and the
-- two RPCs below. Friends, profiles-with-email and remote config come in later milestones.

create schema if not exists lb_private;

create table public.cfg_versions (
  cfg_hash   text primary key check (cfg_hash ~ '^[0-9a-f]{16}$'),
  level      text not null check (char_length(level) between 1 and 40),
  min_ticks  integer not null check (min_ticks > 0),
  max_ticks  integer not null default 36000 check (max_ticks >= min_ticks),
  note       text,
  created_at timestamptz not null default now()
);

create table public.players (
  id           uuid primary key,
  display_name text not null check (char_length(display_name) between 3 and 20),
  secret_hash  bytea not null,
  auth_user_id uuid unique references auth.users (id) on delete set null,
  created_at   timestamptz not null default now()
);

create table public.runs (
  id         bigint generated always as identity primary key,
  player_id  uuid not null references public.players (id) on delete cascade,
  mode       text not null,
  level      text not null,
  cfg_hash   text not null references public.cfg_versions (cfg_hash),
  ticks      integer not null check (ticks > 0),
  created_at timestamptz not null default now()
);
create index runs_player_created_idx on public.runs (player_id, created_at desc);

create table public.bests (
  player_id  uuid not null references public.players (id) on delete cascade,
  mode       text not null,
  level      text not null,
  cfg_hash   text not null references public.cfg_versions (cfg_hash),
  ticks      integer not null check (ticks > 0),
  run_id     bigint not null references public.runs (id),
  updated_at timestamptz not null default now(),
  primary key (player_id, mode, level, cfg_hash)
);
-- Board read path: one (mode, level, cfg_hash), fastest first.
create index bests_board_idx on public.bests (mode, level, cfg_hash, ticks);

alter table public.cfg_versions enable row level security;
alter table public.players      enable row level security;
alter table public.runs         enable row level security;
alter table public.bests        enable row level security;

create policy cfg_versions_read on public.cfg_versions for select to anon, authenticated using (true);
create policy players_read      on public.players      for select to anon, authenticated using (true);
create policy bests_read        on public.bests        for select to anon, authenticated using (true);
-- runs: no policy and no grant = unreadable and unwritable from the API (append-only, RPC only).

revoke all on public.cfg_versions, public.players, public.runs, public.bests from anon, authenticated;
grant select on public.cfg_versions to anon, authenticated;
grant select on public.bests        to anon, authenticated;
-- Column-level: secret_hash and auth_user_id never leave the database.
grant select (id, display_name, created_at) on public.players to anon, authenticated;

-- ---------------------------------------------------------------------------------------
-- Submit. SECURITY DEFINER lives in a non-exposed schema; the public shim is INVOKER.
-- ---------------------------------------------------------------------------------------
create function lb_private.submit_run(
  p_player_id uuid, p_secret text, p_name text,
  p_mode text, p_level text, p_cfg_hash text, p_ticks integer
) returns table (best_ticks integer, is_new_best boolean)
language plpgsql security definer set search_path = ''
as $$
declare
  v_name   text := btrim(p_name);
  v_hash   bytea;
  v_stored bytea;
  v_cfg    public.cfg_versions;
  v_run    bigint;
  v_prev   integer;
begin
  if p_player_id is null or p_secret is null or char_length(p_secret) < 32 or char_length(p_secret) > 128 then
    raise exception 'bad_player' using errcode = '22023';
  end if;
  if v_name is null or char_length(v_name) not between 3 and 20 or v_name ~ '[[:cntrl:]]' then
    raise exception 'bad_name' using errcode = '22023';
  end if;
  if p_mode <> 'classic' or p_level is null or char_length(p_level) not between 1 and 40 then
    raise exception 'bad_mode_or_level' using errcode = '22023';
  end if;

  select * into v_cfg from public.cfg_versions where cfg_hash = p_cfg_hash and level = p_level;
  if not found then raise exception 'unknown_cfg' using errcode = '22023'; end if;
  if p_ticks is null or p_ticks < v_cfg.min_ticks or p_ticks > v_cfg.max_ticks then
    raise exception 'ticks_out_of_bounds' using errcode = '22023';
  end if;

  v_hash := extensions.digest(convert_to(p_secret, 'UTF8'), 'sha256');
  insert into public.players (id, display_name, secret_hash)
    values (p_player_id, v_name, v_hash) on conflict (id) do nothing;
  select secret_hash into v_stored from public.players where id = p_player_id;
  if v_stored is distinct from v_hash then raise exception 'bad_secret' using errcode = '42501'; end if;
  update public.players set display_name = v_name where id = p_player_id and display_name <> v_name;

  if exists (select 1 from public.runs where player_id = p_player_id and created_at > now() - interval '10 seconds')
     or (select count(*) from public.runs where player_id = p_player_id and created_at > now() - interval '1 day') >= 200 then
    raise exception 'rate_limited' using errcode = '54000';
  end if;

  insert into public.runs (player_id, mode, level, cfg_hash, ticks)
    values (p_player_id, p_mode, p_level, p_cfg_hash, p_ticks) returning id into v_run;

  select b.ticks into v_prev from public.bests b
    where b.player_id = p_player_id and b.mode = p_mode and b.level = p_level and b.cfg_hash = p_cfg_hash;
  if v_prev is null or p_ticks < v_prev then
    insert into public.bests (player_id, mode, level, cfg_hash, ticks, run_id)
      values (p_player_id, p_mode, p_level, p_cfg_hash, p_ticks, v_run)
      on conflict (player_id, mode, level, cfg_hash)
      do update set ticks = excluded.ticks, run_id = excluded.run_id, updated_at = now();
    return query select p_ticks, true;
  else
    return query select v_prev, false;
  end if;
end $$;

-- Later login: attach the browser's name-only player to the signed-in auth user.
create function lb_private.claim_player(p_player_id uuid, p_secret text)
returns boolean
language plpgsql security definer set search_path = ''
as $$
declare v_uid uuid := (select auth.uid());
begin
  if v_uid is null then raise exception 'not_signed_in' using errcode = '42501'; end if;
  update public.players
     set auth_user_id = v_uid
   where id = p_player_id
     and auth_user_id is null
     and secret_hash = extensions.digest(convert_to(p_secret, 'UTF8'), 'sha256');
  return found;  -- false: wrong secret, already claimed, or this user already owns another player (unique)
exception when unique_violation then
  return false;
end $$;

revoke all on function lb_private.submit_run(uuid, text, text, text, text, text, integer) from public;
revoke all on function lb_private.claim_player(uuid, text) from public;
grant usage on schema lb_private to anon, authenticated;
grant execute on function lb_private.submit_run(uuid, text, text, text, text, text, integer) to anon, authenticated;
grant execute on function lb_private.claim_player(uuid, text) to authenticated;

create function public.submit_run(
  p_player_id uuid, p_secret text, p_name text,
  p_mode text, p_level text, p_cfg_hash text, p_ticks integer
) returns table (best_ticks integer, is_new_best boolean)
language sql security invoker set search_path = ''
as $$ select * from lb_private.submit_run(p_player_id, p_secret, p_name, p_mode, p_level, p_cfg_hash, p_ticks) $$;

create function public.claim_player(p_player_id uuid, p_secret text)
returns boolean language sql security invoker set search_path = ''
as $$ select lb_private.claim_player(p_player_id, p_secret) $$;

revoke all on function public.submit_run(uuid, text, text, text, text, text, integer) from public;
revoke all on function public.claim_player(uuid, text) from public;
grant execute on function public.submit_run(uuid, text, text, text, text, text, integer) to anon, authenticated;
grant execute on function public.claim_player(uuid, text) to authenticated;
