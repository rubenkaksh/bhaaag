-- L7 checks: Chase submit keeps the HIGHEST score, Classic still keeps the lowest, mode bounds, friends order.
-- Run after the L1, L5 and L7 migrations. Rolls back; prints `L7 OK`.
begin;
create function pg_temp.age() returns void language plpgsql security definer as $$
begin update public.runs set created_at = created_at - interval '1 hour'; end $$;
grant execute on function pg_temp.age() to anon;
set local role anon;
do $$
declare
  s1 constant text := repeat('a', 40); s2 constant text := repeat('b', 40);
  a constant uuid := '00000000-0000-0000-0000-0000000007a1';
  b constant uuid := '00000000-0000-0000-0000-0000000007b2';
  h constant text := '1f497a591d9ba73a';
  r record; code text; rows text;
begin
  select * into r from public.submit_run(a, s1, 'Alice', 'chase', 'endless', h, 500);
  if r.best_ticks <> 500 or not r.is_new_best then raise exception 'first chase score should be best: %', r; end if;
  perform pg_temp.age();
  select * into r from public.submit_run(a, s1, 'Alice', 'chase', 'endless', h, 300);
  if r.best_ticks <> 500 or r.is_new_best then raise exception 'lower chase score must not replace best: %', r; end if;
  perform pg_temp.age();
  select * into r from public.submit_run(a, s1, 'Alice', 'chase', 'endless', h, 900);
  if r.best_ticks <> 900 or not r.is_new_best then raise exception 'higher chase score must replace best: %', r; end if;
  begin
    perform public.submit_run(a, s1, 'Alice', 'chase', 'endless', h, 0);
    raise exception 'expected bounds error';
  exception when others then if sqlerrm like 'expected%' then raise; end if; end;
  begin
    perform public.submit_run(a, s1, 'Alice', 'chase', 'l1', h, 100);
    raise exception 'expected unknown_cfg';
  exception when others then if sqlerrm like 'expected%' then raise; end if; end;
  begin
    perform public.submit_run(a, s1, 'Alice', 'other', 'endless', h, 100);
    raise exception 'expected bad mode';
  exception when others then if sqlerrm like 'expected%' then raise; end if; end;

  -- friends board lists the highest first for chase
  code := public.ensure_player(b, s2, 'Bobby');
  perform pg_temp.age();
  perform public.submit_run(b, s2, 'Bobby', 'chase', 'endless', h, 1200);
  perform public.redeem_invite(a, s1, code);
  select string_agg(name, ',') into rows from public.friends_board(a, s1, 'chase', 'endless', h, 10);
  if rows <> 'Bobby,Alice' then raise exception 'chase friends board must list highest first, got %', rows; end if;
end $$;
select 'L7 OK';
rollback;
