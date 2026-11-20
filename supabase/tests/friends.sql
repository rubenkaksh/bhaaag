-- L5 checks: invite codes, mutual friendships, rate limit, friends board, and that nothing private leaks.
-- Run after the L1, L2 and L5 migrations. Rolls back; prints `L5 OK`.
begin;
insert into public.cfg_versions (cfg_hash, level, min_ticks) values ('ffffffffffffffff', 'l5test', 240);

create function pg_temp.fail(msg text) returns void language plpgsql as $$ begin raise exception '%', msg; end $$;
-- Expects `stmt` to raise with the given message fragment.
create function pg_temp.expect_err(stmt text, frag text) returns void language plpgsql as $$
begin
  execute stmt;
  raise exception 'expected error "%" from: %', frag, stmt;
exception when others then
  if sqlerrm like '%expected error%' or position(frag in sqlerrm) = 0 then raise; end if;
end $$;
grant execute on function pg_temp.expect_err(text, text) to anon;
grant execute on function pg_temp.fail(text) to anon;

set local role anon;
do $$
declare
  sa constant text := repeat('a', 40); sb constant text := repeat('b', 40); sc constant text := repeat('c', 40);
  a constant uuid := '00000000-0000-0000-0000-0000000005a1';
  b constant uuid := '00000000-0000-0000-0000-0000000005b2';
  c constant uuid := '00000000-0000-0000-0000-0000000005c3';
  ca text; cb text; cc text; n integer;
begin
  ca := public.ensure_player(a, sa, 'Alice');
  cb := public.ensure_player(b, sb, 'Bobby');
  cc := public.ensure_player(c, sc, 'Carol');
  if ca !~ '^[ABCDEFGHJKMNPQRSTUVWXYZ23456789]{8}$' then raise exception 'bad code format %', ca; end if;
  if public.ensure_player(a, sa, 'Alice') <> ca then raise exception 'code not stable'; end if;
  if public.my_invite(a, sa) <> ca then raise exception 'my_invite differs'; end if;
  perform pg_temp.expect_err(format('select public.ensure_player(%L, %L, %L)', a, repeat('x', 40), 'Alice'), 'bad_secret');
  perform pg_temp.expect_err(format('select public.my_invite(%L, %L)', a, repeat('x', 40)), 'bad_secret');

  -- Data API cannot read codes or friendships.
  perform pg_temp.expect_err('select invite_code from public.players', 'permission denied');
  perform pg_temp.expect_err('select * from public.friendships', 'permission denied');
  perform pg_temp.expect_err('select * from lb_private.redeem_log', 'permission denied');

  -- Redeem: mutual, case-insensitive, idempotent, never self, never a bad code, wrong secret refused.
  if public.redeem_invite(b, sb, lower(ca)) <> 'Alice' then raise exception 'redeem returned wrong name'; end if;
  perform public.redeem_invite(b, sb, ca);
  perform public.redeem_invite(a, sa, cb);
  perform pg_temp.expect_err(format('select public.redeem_invite(%L, %L, %L)', a, sa, ca), 'self_invite');
  if public.redeem_invite(a, sa, 'ZZZZZZZZ') <> '' then raise exception 'unknown code should return empty string'; end if;
  perform pg_temp.expect_err(format('select public.redeem_invite(%L, %L, %L)', a, repeat('x', 40), cb), 'bad_secret');
  select count(*) into n from public.my_friends(a, sa);
  if n <> 1 then raise exception 'alice should have 1 friend, has %', n; end if;
  select count(*) into n from public.my_friends(c, sc);
  if n <> 0 then raise exception 'carol should have 0 friends'; end if;

  -- Friends board: me + friends only, fastest first, is_me flagged.
  perform public.submit_run(a, sa, 'Alice', 'classic', 'l5test', 'ffffffffffffffff', 3000);
  perform public.submit_run(b, sb, 'Bobby', 'classic', 'l5test', 'ffffffffffffffff', 2800);
  perform public.submit_run(c, sc, 'Carol', 'classic', 'l5test', 'ffffffffffffffff', 2500);
  if (select array_agg(name order by ticks) from public.friends_board(a, sa, 'classic', 'l5test', 'ffffffffffffffff', 10)) <> array['Bobby','Alice'] then
    raise exception 'friends board wrong for alice';
  end if;
  if not (select is_me from public.friends_board(a, sa, 'classic', 'l5test', 'ffffffffffffffff', 10) where name = 'Alice') then
    raise exception 'is_me not set';
  end if;
  if (select count(*) from public.friends_board(c, sc, 'classic', 'l5test', 'ffffffffffffffff', 10)) <> 1 then
    raise exception 'carol must see only herself';
  end if;
  perform pg_temp.expect_err(format('select * from public.friends_board(%L, %L, %L, %L, %L, 10)', a, repeat('x', 40), 'classic', 'l5test', 'ffffffffffffffff'), 'bad_secret');

  -- Rate limit: 10 attempts an hour per player (bad codes count). Carol has made none yet.
  for i in 1..10 loop
    perform public.redeem_invite(c, sc, 'ZZZZZZZZ');
  end loop;
  perform pg_temp.expect_err(format('select public.redeem_invite(%L, %L, %L)', c, sc, ca), 'rate_limited');
end $$;
rollback;
select 'L5 OK' as result;
