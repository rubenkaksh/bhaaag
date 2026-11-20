-- L6 check: delete_my_data removes the player, their runs, bests and friendships; wrong secret is refused. Prints `L6 OK`.
begin;
insert into public.cfg_versions (cfg_hash, level, min_ticks) values ('eeeeeeeeeeeeeeee', 'l6test', 240);
set local role anon;
do $$
declare
  sa constant text := repeat('a', 40); sb constant text := repeat('b', 40);
  a constant uuid := '00000000-0000-0000-0000-0000000006a1';
  b constant uuid := '00000000-0000-0000-0000-0000000006b2';
  ca text; n integer;
begin
  ca := public.ensure_player(a, sa, 'Alice');
  perform public.ensure_player(b, sb, 'Bobby');
  perform public.submit_run(a, sa, 'Alice', 'classic', 'l6test', 'eeeeeeeeeeeeeeee', 3000);
  perform public.redeem_invite(b, sb, ca);
  begin
    perform public.delete_my_data(a, repeat('x', 40));
    raise exception 'wrong secret was accepted';
  exception when others then
    if sqlerrm not like '%bad_secret%' then raise; end if;
  end;
  perform public.delete_my_data(a, sa);
  reset role;
  if exists (select 1 from public.players where id = a) then raise exception 'player not deleted'; end if;
  if exists (select 1 from public.bests where player_id = a) or exists (select 1 from public.runs where player_id = a) then raise exception 'runs/bests remain'; end if;
  select count(*) into n from public.friendships;
  if n <> 0 then raise exception 'friendship remains'; end if;
  if not exists (select 1 from public.players where id = b) then raise exception 'friend wrongly deleted'; end if;
end $$;
rollback;
select 'L6 OK' as result;
