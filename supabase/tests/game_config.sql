-- L2 checks: game_config is world-readable and not writable by anon/authenticated. Rolls back; prints `L2 OK`.
-- Run after leaderboard_v1.sql's migration and 20261119000200_game_config.sql (see README.md).
begin;
insert into public.game_config(key, value) values ('hero.sprintSpeed', 12);

set local role anon;
do $$ begin
  if (select count(*) from public.game_config) <> 1 then raise exception 'anon cannot read game_config'; end if;
  begin
    insert into public.game_config(key, value) values ('hero.run', 7);
    raise exception 'anon insert was allowed';
  exception when insufficient_privilege then null; end;
  begin
    update public.game_config set value = 14;
    raise exception 'anon update was allowed';
  exception when insufficient_privilege then null; end;
  begin
    delete from public.game_config;
    raise exception 'anon delete was allowed';
  exception when insufficient_privilege then null; end;
end $$;

set local role authenticated;
do $$ begin
  begin
    insert into public.game_config(key, value) values ('hero.run', 7);
    raise exception 'authenticated insert was allowed';
  exception when insufficient_privilege then null; end;
end $$;

reset role;
do $$ begin
  begin
    insert into public.game_config(key, value) values ('not a path', 1);
    raise exception 'bad key accepted';
  exception when check_violation then null; end;
end $$;
rollback;
select 'L2 OK' as result;
