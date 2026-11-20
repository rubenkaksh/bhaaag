-- Run on a local Postgres with Supabase-like roles (see supabase/tests/README.md).
-- Each check raises on failure; success prints NOTICE 'L1 OK'.
begin;
insert into public.cfg_versions (cfg_hash, level, min_ticks, max_ticks) values ('0123456789abcdef','nagarkot',3000,36000);

create function pg_temp.expect_fail(sql text, code text) returns void language plpgsql as $$
begin
  execute sql;
  raise exception 'expected failure % but succeeded: %', code, sql;
exception when others then
  if sqlerrm not like '%' || code || '%' and sqlstate <> code then raise; end if;
end $$;

set local role anon;
select submit_run('00000000-0000-0000-0000-000000000001', repeat('a',40), 'Alice', 'classic','nagarkot','0123456789abcdef', 4000);
select pg_temp.expect_fail($q$select submit_run('00000000-0000-0000-0000-000000000001', repeat('b',40), 'Alice','classic','nagarkot','0123456789abcdef',3900)$q$, 'bad_secret');
select pg_temp.expect_fail($q$select submit_run('00000000-0000-0000-0000-000000000002', repeat('c',40), 'Bob','classic','nagarkot','0123456789abcdef',100)$q$, 'ticks_out_of_bounds');
select pg_temp.expect_fail($q$select submit_run('00000000-0000-0000-0000-000000000002', repeat('c',40), 'Bob','classic','nagarkot','ffffffffffffffff',4000)$q$, 'unknown_cfg');
select pg_temp.expect_fail($q$select submit_run('00000000-0000-0000-0000-000000000002', repeat('c',40), 'Bo','classic','nagarkot','0123456789abcdef',4000)$q$, 'bad_name');
select pg_temp.expect_fail($q$select submit_run('00000000-0000-0000-0000-000000000001', repeat('a',40), 'Alice','classic','nagarkot','0123456789abcdef',3900)$q$, 'rate_limited');
-- no direct table writes, no secret leak, runs unreadable
select pg_temp.expect_fail($q$insert into public.bests values ('00000000-0000-0000-0000-000000000001','classic','nagarkot','0123456789abcdef',3001,1,now())$q$, 'permission denied');
select pg_temp.expect_fail($q$select secret_hash from public.players$q$, 'permission denied');
select pg_temp.expect_fail($q$select * from public.runs$q$, 'permission denied');
select pg_temp.expect_fail($q$select claim_player('00000000-0000-0000-0000-000000000001', repeat('a',40))$q$, 'permission denied');
do $$ begin
  if (select count(*) from public.bests) <> 1 or (select ticks from public.bests) <> 4000 then raise exception 'bests wrong'; end if;
  if (select display_name from public.players) <> 'Alice' then raise exception 'players wrong'; end if;
end $$;
reset role;
insert into auth.users values ('aaaaaaaa-0000-0000-0000-000000000001');
set local role authenticated;
set local "request.jwt.claim.sub" = 'aaaaaaaa-0000-0000-0000-000000000001';
do $$ begin
  if (select claim_player('00000000-0000-0000-0000-000000000001', repeat('z',40))) then raise exception 'claim with wrong secret succeeded'; end if;
  if not (select claim_player('00000000-0000-0000-0000-000000000001', repeat('a',40))) then raise exception 'claim failed'; end if;
  if (select claim_player('00000000-0000-0000-0000-000000000001', repeat('a',40))) then raise exception 'double claim succeeded'; end if;
end $$;
reset role;
do $$ begin raise notice $n$L1 OK$n$; end $$;
rollback;
