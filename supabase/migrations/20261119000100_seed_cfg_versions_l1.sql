-- Default Classic config published as a valid leaderboard version. cfg_hash comes from src/app/cfgHash.ts
-- (resolveCfg('classic'), level l1 v1, SIM_VERSION 1). min_ticks is a physical lower bound, not a real
-- best: ~99 m straight line from spawn to goal at terminal speed 20 m/s, x0.8 margin = 240 ticks. Tighten it
-- after real runs. Any tuning change gives a new hash and needs a new row here.
insert into public.cfg_versions (cfg_hash, level, min_ticks, max_ticks, note)
values ('8fe22192c3687801', 'l1', 240, 36000, 'default classic tuning, simVersion 1, level l1 v1')
on conflict (cfg_hash) do nothing;
