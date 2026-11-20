-- Gradual sprint build-up (sky-terrain-integration, 2026-11-19/20) changes the default tuning, so the
-- Classic and Chase config hashes change. Old rows stay (old boards remain readable). NOT applied live yet:
-- apply with the same project as the earlier seeds before the new build goes out, or submissions for the
-- new hash are rejected. cfg_hash values: pinned in tests/config/remoteConfig.test.ts and tests/app/chaseBoard.test.ts.
insert into public.cfg_versions (cfg_hash, level, min_ticks, max_ticks, note)
values ('ff48b1ef5a571571', 'l1', 240, 36000, 'default classic tuning, gradual sprint, simVersion 1, level l1 v2')
on conflict (cfg_hash) do nothing;
insert into public.cfg_versions (cfg_hash, level, min_ticks, max_ticks, note)
values ('e3734a98eae3643e', 'endless', 1, 1000000, 'default chase tuning, gradual sprint, simVersion 1, endless v2')
on conflict (cfg_hash) do nothing;
