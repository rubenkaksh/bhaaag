-- L2: remote tuning overlay. One row per tunable, key = dotted Tuning path (e.g. hero.sprintSpeed).
-- Readable by everyone, writable only with the service key (RLS on, no write policy, no write grant).
-- The client clamps every value to CLAMPS (src/app/remoteConfig.ts) and drops unknown keys, so a bad row
-- cannot break a level. A changed config needs its cfg_versions row first (tools/publish-config.mjs does both).
create table if not exists public.game_config (
  key text primary key check (key ~ '^[a-zA-Z]+\.[a-zA-Z]+$'),
  value numeric not null,
  updated_at timestamptz not null default now()
);

alter table public.game_config enable row level security;

create policy game_config_read on public.game_config for select to anon, authenticated using (true);

revoke all on public.game_config from anon, authenticated;
grant select on public.game_config to anon, authenticated;
