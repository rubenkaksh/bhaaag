# Nine points: Phase 4 build plan (T342)

Date 2026-11-17, Sonnet. Mission: PRODUCT.md read; nothing here works against its purpose or non-goals (wording fixes go through T346). Inputs: inventory, analysis, review (Opus stand-in, Q1-Q8), owner decisions 2026-11-17b/c/e (newest wins). Nothing built or run. Sizes are focused-session minutes. Queue: `~/projects/sandbox/config/queue/bhagdori.yaml` (cards rewritten to match; new T345, T346; T336 split into T336a/b/c). T344 review fixes F1-F7 applied 2026-11-17.

## 0. Binding decisions (from review + owner 17e)

- Q-A: Classic on the new level is fixed-line (`lineOnly`), this level only. Q-B: freeze initial chunk at the measured size (268 KB gz baseline), no growth, lazy-load card T345 gets it under 215. Q-C: success = finish a run under 2 min (no escape-path-in-10-min clause).
- Maze: Option A (re-derive with kit heights, storeys 1|2), plus B's terrace steps only where the pure-graph test finds a leak. New level key `nagarkot-home`, registered in `BASE_LEVELS`, not `GRAPH_LEVELS`; frozen Nagarkot output and `graphFreeze` untouched.
- Sprint ON in the new level (edges derived with sprint reach), OFF in Dragon Chase via `MODE_OVERRIDES`. Dragon stays on endless rows; no ADR 0017.
- O1 (owner decision): the T336a maze design is validated by an Opus-alias review seat while Fable is unavailable (owner already approved Opus as Fable stand-in); Sonnet implementation starts after that review.
- ADR numbers: T341 = `0017-mode-registry`, T334 = `0018-sprint`. The earlier "no ADR 0017" meant no spiral-dragon ADR only. Interface name: `GameModeDef` (the union `GameMode` in `src/app/modes/mode.ts:8` is untouched).
- Chunk freeze is enforced: T334, T339, T341, T336c done_when each say "controller reports initial chunk gz <= T333 baseline (same command as T333)".
- Time = (finishTick - firstInputTick) / 60 in integer ticks; best key `bhagdori.best.nagarkot-home`; leaderboard rows carry `cfgHash`.

## 1. Ledger conventions

Engine per sandbox Rule 2: junior (hunter one file, cursor one coherent multi-file change) by default; Sonnet for integration/review; Opus only for the maze design (T336a, capped). Verification rung per Rule 3: controller command, then mutation test, then Haiku fix review, then Sonnet seat; never Opus for task review. Budget state is read with `budget` immediately before each dispatch (not known at plan time); stop at AMBER/RED or past min(5% of week, 50% of project budget). Premium share of the whole batch must stay at or under 20%: only T344 (30 min) and T336a design (about 40 of 150 min) are premium, roughly 7% of about 22 h. Gates (lint, typecheck, test, build, screenshots) are run by the controller via `rtk`, never by premium seats. Worktree per card, removed once pushed and PR open. Rule 2 (F7): load `scribe` and run `~/.claude/flags/flag check <engine>` (must exit 0) before every junior dispatch; Haiku briefs carry `skills/scribe/haiku-rules.md`; run `get_usage` + `budget record` after each card (Rule 8).

## 2. Order and waves

| Step | Cards | Notes |
|---|---|---|
| 0 | T344 Opus gate | runs first; no card leaves DRAFT before `docs/plans/nine-points-opus-review.md` says READY TO PICK |
| 0b | T333 chunk baseline (controller), T346 PRODUCT amendment | docs/measure only, parallel; T346 (20 min) must land before any build card (F1) |
| A (parallel, disjoint files) | T336a, T341, T334, T338, T343 | T336a is `src/content/strategy` only; T341 is `src/app/modes` + game.ts; T334 core/tuning/heroPose |
| B | T345 (after T341, T333), T339 (after T341, T345), T336b (after T336a), T336c (after T336a/b, T341, T339, T345) | game.ts chain: T341 -> T345 -> T339 -> T336c |
| C | T337 (after T336), T340 (after T336c, T341) | T340 is the last visible switch |
| End | T333 recheck after T345, phone QR check | "not verified" until a device run |

Merge order: T341, T345, T339, T334, T336a/b/c, T337, T340 (T338, T346, T333 docs/measure any time; T343 never merged). T334 merges before T336a needs its measured sprint distances.
Critical path: T336 (420) + T337 (240) + T340 (45) = about 11 h; T341 + T345 + T339 (about 7 h) fits beside T336a + T336b (about 4.5 h) only if T341 starts first in wave A.

## 3. Tasks

### T344 Opus review gate (wave 0)
- Ledger: risk low (doc), engine Opus (review of plans, Rule 2; premium, caps 40 tool calls / 6 delegates / 25 turns / 120k, no gate runs), rung: controller checks file exists and last line, budget: check.
- Files: `docs/plans/nine-points-opus-review.md` (new, under 120 lines). Deps: T342. Wave: 0.
- done_when: file lists per card go / go-with-changes / hold against THIS plan, ordering and conflict check, inventory-section-4 questions still open, last line `READY TO PICK` or `NOT READY: <reason>`.

### T333 chunk baseline (wave 0b)
- Ledger: risk low, engine controller (Rule 2: single fast command through rtk, not Haiku), rung controller command, budget check. 15 min.
- Files: none changed except a size note in `docs/session-state.md`. Deps: T344.
- done_when: `pnpm build`, then `gzip -c` of EACH JS file `dist/index.html` loads by `<script>` or `modulepreload` (not only `index-*.js`); per-file sizes and sum recorded (expect about 268 KB) as the frozen baseline; the number and command are written to the session file. No deploy job, no CF secrets (owner 17c).

### T346 PRODUCT.md amendment (wave 0b)
- Ledger: risk low (doc), engine hunter (one file, exact text in the card), rung controller diff read, budget check. 20 min.
- Files: `PRODUCT.md` only (the ADR 0016 amending line moves to T340). Deps: T344. Merge any time; every build card depends on it (F1).
- done_when: Amendment 2026-11-17f replaces the 17b wording "spiral layout / both modes run on the new level" with: exactly one new Classic level (Home Street houses on the Nagarkot Run graph, no spiral); modes hidden not deleted behind a registry; Dragon Chase stays on endless rows; Classic on this level is fixed-line (ADR 0016 amending line is done in T340; the "free-aim in maze is out" non-goal is kept for this level); leaderboard time = first-input offset, not replay traces; success test: finish under 2 min per run, retry instant; initial chunk frozen at the T333 baseline until T345.

### T341 Mode registry (wave A)
- Ledger: risk medium (touches game.ts), engine Sonnet for the pure `ModeRules` seam and registry, cursor for lobby and docs, rung controller gates then Haiku fix review, budget check. 180 min.
- Files: `src/app/modes/registry.ts` (new), mode.ts, levels.ts, `ui/lobby.ts`, game.ts (flags 198-258, win 689-699, best 352), `docs/adr/` entry, `docs/how-to-add-a-mode.md`, tests/app. Deps: T344, T346. 180 min. Start first in wave A.
- done_when: narrow `GameModeDef` (`id, label, enabled, levels, bestKey, playKey, rules`); Classic and Dragon Chase behind it; `enabled=false` hides from the lobby only, legacy URLs and `?mode=` still resolve; pure `ModeRules` seam (`onFinish(ticks) -> {best, record}`, chase score) unit-tested with a fake 20-line mode over 10 pure ticks (no canvas/three); `bhagdori.best.*` strings unchanged; the union `GameMode` and `MODE_OVERRIDES` in `src/app/tuning.ts` untouched (T341 does not edit tuning.ts); no behaviour change; ADR `docs/adr/0017-mode-registry.md`; initial chunk gz <= T333 baseline (controller, same command); gates pass; no three/DOM in `src/core`.

### T334 Sprint (wave A)
- Ledger: risk high (sim.ts, tuning triple), engine Sonnet for core + tests, hunter for `heroPose.ts`, rung controller gates, mutation test on the streak reset, budget check. 150 min.
- Files: `src/core/sim.ts` (grounded non-slip branch 1067-1083 only), hero.ts, config.ts, `content/config/tuning.json`, `heroPose.ts:494`, tests/config/tuning.test.ts (`strictObject(hero)`), `src/app/tuning.ts` (Dragon Chase override), `docs/config-scope.md`, override-scope test, `docs/adr/0018-sprint.md`, CLAUDE.md and ADR 0001:22 (the "~8" landing carry cap becomes 12 = `carryCap`, `config.ts:244`, applied `sim.ts:366`; NOT 6). Deps: T344, T346.
- done_when: `hero.run` stays 6; new tuning keys `sprintSpeed` 11, `sprintStreakM` (7 x stride), cadence/fov; counter in core as distance at >= 0.98 x run; ramp smoothly to 11 m/s (units m/s, 6 to 11); resets on stop, airborne, wall; `carryCap` 12 unchanged (11 < 12); `config.ts` DEFAULT mirrors tuning.json (11), so "defaults equal today" = no remote value means shipped tuning.json; ADR 0018 records measured run-jump and sprint-jump distances (m) and the speed-up distance (T336a depends on them); initial chunk gz <= T333 baseline (controller); pose clamp lifted so sprint differs visibly; Dragon Chase sprint off via `MODE_OVERRIDES`; existing long-run tests pin `sprintSpeed = run` via the cfg override (goldens stay put); new tests cover sprint. Vitest: sprint after exactly 7 steps, reset on stop, sprint jump distance > run jump distance. No HUD indicator, no remote fetch (shape only, vidanta pattern). Screenshot of sprint pose at 844x390, looked at before reporting.

### T336 New level (a/b/c)
Common (T336 is split into three queue cards T336a/b/c with their own deps): level key `nagarkot-home`, new seed constant, fixed-line Classic, sprint reach in edges, parkour on, heights only from the kit (roof deck = groundY + 0.4 + 2.8 x storeys, storeys in {1,2}).
- **T336a height model + generator** (wave A, 150 min, deps T344, T346). Ledger: risk high, engine Opus for the design note (heights, terrace steps, reach constants; premium, caps), then an Opus-alias review seat validates the maze design (O1, owner decision; Fable unavailable), then Sonnet implements, rung controller Vitest then Sonnet seat, budget check. Files: `src/content/strategy/gen.ts`, graph.ts, new `tests/content/nagarkotHome.test.ts` (pure graph). done_when: sprint reach uses named constants (11 m/s, 7 strides) in `graph.ts` until T334 merges; then rebase, swap in T334's measured distances and add test "graph sprint constants == tuning.hero.sprint*", rerun acceptance. First record Nagarkot baseline dead-end share and branch count (if under 20% / 6, use 80% of baseline); then the Q1 acceptance test, built from the EMITTED LevelJson with `buildEdges` rerun (parkour 1, sprint reach): G reachable from S; >= 2 node-disjoint S-to-G paths; dead-end nodes >= 20% of reachable and >= 6 distinct branches; zero undeclared edges; every non-road node has >= 1 kit house, no plan-view AABB overlap. Frozen Nagarkot hashes unchanged. 2-min check (F3): shortest S-to-G path time estimate = sum over its edges of (run/jump horizontal metres / 6 m/s) + (zip chord metres / mean zip speed from tuning) + 1.0 s per mantle/climb; record metres and seconds; assert <= 80 s (40 s left for hesitation; owner may change); if over, cut bands (a smaller maze). Replaces the old "identical graph / node-edge equality" check.
- **T336b dressing** (wave B, 120 min, deps T336a, T344, T346). Ledger: risk medium, engine cursor (render, one coherent change), rung controller gates + SwiftShader draw-call measure, budget check. Files: `levelView.ts`, `strategyView.ts`, `decor/houseV2.ts`. done_when: each node AABB dressed with 1..N seeded joined kit houses; doorway frames, poles, party walls, fork markers, runouts, 1 m hazard bands survive; collider solids and decor never at the same coordinates; Low tier <= 55 draw calls with all about 100 nodes dressed, measured on SwiftShader (if over, merge/instance parts per segment) before T336c starts.
- **T336c register + play** (wave B, 150 min, deps T336a, T336b, T341, T339, T345, T344, T346). Ledger: risk medium (game.ts), engine Sonnet, rung controller gates + screenshots, budget check. Files: `src/app/modes/levels.ts` (`BASE_LEVELS`), game.ts level branch, path camera bearings, best key `bhagdori.best.nagarkot-home` (the only card that creates it). done_when: level appears in the Classic row, plays fixed-line; screenshots 390x844 and 844x390 looked at; controller reports initial chunk gz <= T333 baseline (same command as T333); freeze hash added only after T337 lands.

### T337 Bend (wave C, 240 min, after T336c; title has no "spiral")
- Ledger: risk high (geometry), engine Sonnet (Opus only if the layout design stalls, owner approval first), rung controller Vitest then Sonnet seat, budget check.
- Files: gen.ts layout, per-segment local frames (ADR 0015 template), terrain.ts, strategyView.ts, `tests/content/` overlap/spacing test (written first), `tools/` top-down camera script if a screenshot is wanted. Deps: T336c, T344, T346.
- done_when: no spiral and no 1.5-turn assert. Layout per review Q3: opening straight spur from the start, a fork at the first road terrace into two branches (west, east) that rejoin at the goal terrace, a short dead-end spur, an optional middle branch (reference `docs/reference/t337-annapurna-trek-map.jpg`, read as a descent). Vitest: house centres >= 8 m apart and no plan-view overlap over all segments; every cross-segment edge touches a road node; ground only goes down along each path; T336a acceptance test still passes; hazard strips per segment in local frames.

### T338 Leaderboard plan (wave A, 60 min)
- Ledger: risk low (docs), engine Sonnet (scout-first applies, supabase skill), rung controller wc -l and read, budget check. Deps: T344. Docs only.
- done_when: `docs/plans/leaderboards-friends.md` under 300 lines: Supabase on static GitHub Pages (anon key, RLS, OAuth allow-list with the `/bhaaag/` subpath, Facebook review and free-tier pausing verified against current docs, CSP via meta only, supabase-js lazy); anti-cheat = first-input offset plus finish tick, server bounds (min time from level length and sprint cap, `cfgHash`, rate limits), stated as trust-the-client; every row carries `cfgHash`, boards show matching rows only; remote config via `app/tuning.ts` `resolveCfg`, read once at run start, clamped; milestone list; 3 open owner questions. Replaces "server replay validation".

### T339 Time mode (wave B, 150 min, after T341 and T345)
- Ledger: risk medium (game.ts win/runT), engine Sonnet core of the change, hunter for HUD, rung controller gates, budget check.
- Files: game.ts (`runT` 329, 527, 641, win 686-699, `onAnyInput`), `ui/hud.ts`, mode.ts, new `LeaderboardPort`. Ticks are counted in game.ts at the fixed 60 Hz step; `src/core` is NOT touched (T334 may still be open in sim.ts). Deps: T338, T341, T345, T344, T346 (build the local port only).
- done_when: clock counts integer ticks from phase 'play'; `firstInputTick` = first play tick whose `InputFrame` has move above deadzone or a gameplay button bit (camera drag, overview key, flyover skip ignored); `restart()` clears both; time = (finish - first) / 60; HUD shows 0.00 until first input; death ends the run, times per life; `LeaderboardPort.submit(level, ms, offsetTicks)` (not `trace`) plus `top(level, n)` with a local-storage impl behind `ModeStore`-style injection; best is read and written via the registry's `bestKey(level)`, existing keys unchanged (T336c adds `bhagdori.best.nagarkot-home`); local best keeps seconds; Chase keeps `cs.ticks`. Vitest: time = ticks/60, best updates only when faster, offset excludes planning, port fake used in the finish flow. Initial chunk gz <= T333 baseline (controller). Screenshot of finish screen at 390x844.

### T340 Hide other modes (wave C, 45 min; title drops "both modes play the new level": Dragon stays on endless rows)
- Ledger: risk low, engine cursor, Sonnet for tests, rung controller gates, budget check. Deps: T341, T336c, T344, T346.
- Files: levels.ts, mode.ts, lobby.ts, tests/app/levels.test.ts, one paragraph in ADR 0016 (includes the fixed-line amending line moved from T346, and a note that the earlier "no ADR 0017" decision concerned the spiral dragon only; ADR 0017 is mode-registry, 0018 is sprint).
- done_when: lobby lists exactly Classic and Dragon Chase; Classic level row shows the new level only; strategy, village, other modes and levels have `enabled=false` (one flag re-enables); legacy URLs (`?mode=village`, `g:*`, `strategy`) still resolve; Dragon Chase unchanged on endless rows (no spiral dragon); initial chunk gz reported against the T333 baseline; screenshots of both modes.

### T343 Gyro spike (wave A, 60 min + phone)
- Ledger: risk low (throwaway branch `spike/gyro-camera`), engine cursor (Sonnet only on failure), rung phone run via QR (else "not verified"), budget check. Deps: T344, T346. Never merged.
- done_when unchanged: render-only camera offset (do not write `lookYaw`), opt-in toggle, recenter, `docs/spikes/gyro-camera.md` under 80 lines.

### T345 Initial chunk lazy-load (new, wave B, DRAFT; moved earlier per review F2)
- Ledger: risk medium, engine cursor, rung controller `pnpm build` size check then Sonnet seat, budget check. 90 min. Deps: T341, T333, T344, T346. Runs in the game.ts chain T341 -> T345 -> T339 -> T336c.
- done_when: village, builders, the graph levels (`GRAPH_LEVELS`: home-street, valley) and any supabase code load via dynamic import; the strategy generator `src/content/strategy/gen.ts` is NOT hidden, since it builds the visible `nagarkot-home` (it stays, or becomes that level's own lazy chunk loaded on lobby pick); initial chunk gz <= 215 KB (baseline 268); legacy URLs still resolve; gates pass; sizes recorded; if 215 KB is not reachable, record the floor and stop for the owner (O2: a temporary +5 KB gz allowance instead of the reorder is an owner call; default is the reorder).

## 4. Risks and notes

- The sim.ts tuning triple is only T334; no conflicts with T335 (backlog).
- game.ts is serial: T341, T345, T339, then T336c; T343 branch is throwaway.
- Success test for the level is "finish under 2 min" only: the maze needs a path of that length, so T336a asserts a shortest S-to-G path time estimate <= 80 s (F3 formula; record metres and seconds).
- T338/T339 network code and supabase-js stay lazy; the initial chunk may not grow past the baseline.
