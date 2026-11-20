-- L7: Dragon Chase board on the same tables. A mode is a (mode, level, cfg_hash) board; Chase is mode 'chase',
-- level 'endless'. Its score is points (higher is better), stored in the same `ticks` column the Classic
-- time uses, so every read path (bests, friends, delete) is shared. Only two things differ per mode:
-- the better-than direction on submit and the sort order on the friends board (the public top list is
-- ordered by the client query). Bounds are trust-the-client sanity limits, tighten after real runs.
-- cfg_hash comes from src/app/cfgHash.ts: cfgHash('endless', 1, resolveCfg('chase'), ['chase']), SIM_VERSION 1.
insert into public.cfg_versions (cfg_hash, level, min_ticks, max_ticks, note)
values ('1f497a591d9ba73a', 'endless', 1, 1000000, 'default chase tuning, simVersion 1, endless v1')
on conflict (cfg_hash) do nothing;

create or replace function lb_private.submit_run(
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
  v_better boolean;
begin
  if p_player_id is null or p_secret is null or char_length(p_secret) < 32 or char_length(p_secret) > 128 then
    raise exception 'bad_player' using errcode = '22023';
  end if;
  if v_name is null or char_length(v_name) not between 3 and 20 or v_name ~ '[[:cntrl:]]' then
    raise exception 'bad_name' using errcode = '22023';
  end if;
  if p_mode not in ('classic', 'chase') or p_level is null or char_length(p_level) not between 1 and 40 then
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
  v_better := v_prev is null
    or (p_mode = 'chase' and p_ticks > v_prev)      -- score: higher wins
    or (p_mode <> 'chase' and p_ticks < v_prev);    -- time: lower wins
  if v_better then
    insert into public.bests (player_id, mode, level, cfg_hash, ticks, run_id)
      values (p_player_id, p_mode, p_level, p_cfg_hash, p_ticks, v_run)
      on conflict (player_id, mode, level, cfg_hash)
      do update set ticks = excluded.ticks, run_id = excluded.run_id, updated_at = now();
    return query select p_ticks, true;
  else
    return query select v_prev, false;
  end if;
end $$;

create or replace function lb_private.friends_board(p_player_id uuid, p_secret text, p_mode text, p_level text, p_cfg_hash text, p_n integer)
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
     order by case when p_mode = 'chase' then -b.ticks else b.ticks end asc
     limit greatest(1, least(coalesce(p_n, 10), 50));
end $$;
-- Grants and the public INVOKER shims are unchanged (same signatures, create or replace keeps them).
