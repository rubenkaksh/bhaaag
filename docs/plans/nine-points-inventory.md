# Nine points: Phase 1 inventory (T342)

Date 2026-11-17. Source: three read-only Haiku Explore passes over this branch (main 11628e8 + docs). No `.codegraph/` exists, so symbols come from rtk grep/read. Line numbers are approximate and drift. Nothing was run (no tests, no screenshots). Cards: `~/projects/sandbox/config/queue/bhagdori.yaml` T334-T343.

## 1. Cards whose done_when looks wrong (read first)

| Card | Problem |
|---|---|
| T334 | Run cap is `hero.run` = 6 m/s (tuning.json:37), not "~8"; landing `carryCap` = 12 (pinned by tests/config/tuning.test.ts:174). "8 -> 11" is really 6 -> 11. ADR 0001 and CLAUDE.md "~8" are stale. Sprint cap 11 < carryCap 12. No footstep counter exists in core (render `phase` is render-only). Sprint pose clamp `amp = speed/6` (heroPose.ts:494) makes the pose identical at 11 m/s, so the "sprint pose" screenshot shows no change. No sprint shot script or URL param exists. |
| T335 | Sloped-roof collider is already built (`Roof` = two slip `Ramp`s, ADR 0002 "Accepted"). "Balance" does not exist anywhere (owner must define). Pitched roofs live in levelView.ts, not houseV2. Roof change breaks golden `tests/golden/roof-slide.trace.json`. ADR 0002 cites tests/content/terrace.test.ts, which does not exist. |
| T336 | `content/builders/` is empty and the builder compiler has no HouseSpec: the suggested builder JSON is the wrong format. Level schema is `worldSchema` (load.ts:64, not exported); graph schema is `graphLevel` (format.ts:27). Level-graph skill is `.claude/skills/level-graph/SKILL.md` in the repo, not ~/.claude. Shots live at `tools/shots*.mjs` (run `node tools/...`). "Every node >= 1 house" fails for 3 road nodes (house = -1). Nagarkot roofs are 7/11/15 m (3 storeys) but the Home Street kit allows storeys 1|2 only. Nagarkot is parkour 0, Home Street parkour 1. |
| T337 | Nagarkot edges are derived from geometry (graph.ts `buildEdges`), so bending positions changes edges: "topology unchanged" is not free. Ground height is `planeY(z)` only (gen.ts:40); a spiral needs a new ground model. No overlap or spacing test exists for the generator. |
| T338 | RESOLVED 2026-11-17: live host is GitHub Pages, https://rubenkaksh.github.io/bhaaag/ (branch gh-pages, legacy build, checked via the Pages API; ci.yml has no gh-pages job, the push is manual). |
| T339 | "From first input" does not match code: clock `runT` starts at phase 'play' after the 2.5 s flyover (game.ts:572, 641). `trace` arg collides with PRODUCT.md non-goal "replay traces". Best keys are not per level: Nagarkot, shipped builder levels and "My level" share `bhagdori.best.strategy`. `runT` is a float sum; ms needs an integer tick count. |
| T340 | Contradicts ADR 0016 and ADR 0010 C2 (dragon stays on straight endless rows). ADR 0017 must supersede both. "Both modes run the level": chase uses its own endless z-rows, not a level, so this is a new sim path. "New level" is not in the repo (T336/T337 unbuilt). "Hide strategy/village" applies to the Classic level row; the mode row is already two. 215 KB initial-chunk check does not exist anywhere (no size script, no CI step). |
| T341 | Names `modes.ts`; folder has `mode.ts` and `levels.ts` (suggest `registry.ts`). "PlayKey" is the doc name; the type is `GameMode`. "Fake mode plays 10 ticks via startGame" is impossible in Vitest (needs canvas/three); needs a pure seam first. `enabled` is new. |
| T343 | Card is fine. Note docs/controls.md:46 ("no look control") is stale vs PRODUCT 17b. |

## 2. Per card: files, symbols, tests, extension points

### T334 Sprint
- Files: src/core/sim.ts (`step` ~892, `moveFree` 1003-1130: wantX/wantZ 1016-1017, jump 1022-1024, ground accel/skid 1067-1083, air steer 1097-1129; `bounceHero` 364, `landHero` 404), src/core/hero.ts (`HeroState`, `copyHeroState`), src/core/config.ts (Tuning.hero ~70-81, DEFAULT ~261-272), content/config/tuning.json:37, src/adapters/render/heroPose.ts (`runCadence` 462, `writeRun` 490).
- Tests: tests/core/hero.test.ts:64 (run distance), gameplay.test.ts:228-358 (fire v0, skid hardcoded 12, carry), tests/adapters/heroPose.test.ts:147, tests/config/tuning.test.ts:67 (`strictObject(hero)`: every new hero key must be added) and :174, configScope.test.ts.
- Extension: new keys `hero.sprintSpeed`, stride length; counter on HeroState incremented in grounded non-slip branch (1067-1083), reset on stop, airborne, wall.
- Jump momentum is already kept (jump sets only vy); only the ground clamp needs the sprint cap.
- Do NOT raise `hero.run`: strategy graph reachability (graph.ts:118-211) and `graphFreeze.test.ts` depend on it.
- All modes share one tuning (`MODE_OVERRIDES` empty), so Dragon Chase (chase.vMax 13.5) also sprints.

### T335 Sloped roofs (BLOCKED on reference)
- Files: src/core/world.ts (`Ramp` 9, `Roof` 33, `addRoof` 141), sim.ts (`rampHeightAt` 223, `slipSupport` 262, `groundHeight` 277, `landHero` 404, slip branch 1046, `slideVelocity` 958), src/content/load.ts (ramp schema 28-36, `roofSchema` 40-50), levelView.ts (gable prism), houseSpec.ts:47 `RampDraft`. Levels with roofs: l1.json, village.json.
- Tuning: `roof {slipDeg 15, mu 0.2, control 0.3, uphillRun 0.4}` (tuning.json:36).
- Tests: tests/core/roof.test.ts, tests/content/roofs.test.ts, tests/adapters/gable.test.ts, golden roof-slide trace, tuning.test.ts:66.
- Extension: branch in `slipSupport`/`slideVelocity`; free button bit from 256 (input.ts:14; tests/core/input.test.ts:62 checks powers of two); load.ts:33 already lets any ramp be `slip`.
- Needs: owner's definition of "balance" plus the house reference. Only an ADR draft is allowed now.

### T336 New level (Nagarkot graph + Home Street houses)
- Files: src/content/strategy/gen.ts (`STRATEGY_SEED` 34, `buildNodes` 335, `layoutToLevel` 664, `attemptStrategy` 754, `buildStrategy` 977, `generateStrategyLevel` 995), strategy/graph.ts (`MazeNode` 23, `MazeEdge` 40, `buildEdges` 280), content/graph/place.ts (`placeGraph` 1053, frozen v1), content/graph/registry.ts, src/app/modes/levels.ts (`BASE_LEVELS` 22), mode.ts (`GameMode` 8, `MODE_INFO` 26), game.ts (199 `isStrategy`, 223 generator call, 233 `houseDress`), levelView.ts (`buildLevelMeshes` 255), decor/houseV2.ts, house/houseSpec.ts (storeys 1|2, `HK.half` 4), content/load.ts.
- Tests today: tests/content/strategyGen.test.ts, core/strategy.test.ts, adapters/strategyView.test.ts:54 (100 dressed houses), graph*.test.ts, graphFreeze.test.ts, app/levels.test.ts. No test compares two graphs.
- Extension: new key (e.g. `nagarkot-home`) in `BASE_LEVELS` plus a game.ts branch; do not add to `GRAPH_LEVELS` (needs a FROZEN hash).
- Risks: height mismatch (7/11/15 m vs 2 storeys), parkour 0 vs 1, 12 m lanes vs touching party walls, road nodes without houses, same-generator equality is a tautology (rebuild nodes/edges from the emitted LevelJson instead). ADR 0011 s6 says houseDress false; code dresses.

### T337 Spiral
- Files: gen.ts (`LANES` 44, `HOUSE_HALF` 45, `planeY` 40, `roofY` 324, hazard strips 722-730, goal 742), graph.ts, src/adapters/render/terrain.ts (`TERRAIN_HALF_X` 320, `setTerrainExtent` 33, `setTerrainField` 78), strategyView.ts.
- Tests: graphSegments.test.ts:38 (8 m centre distance, Home Street only) and :48 (ground only goes down). None for spiral or generator overlap.
- Extension: ADR 0015 segmented layout (local frame rotated) is the template. Sim has no ground field.
- Risks: edge set changes with geometry; hazards are z-stepped full-width strips (HAZARD_HALF_W 60); 1.5 turns with 8 m houses is a new packing problem; no top-down screenshot camera exists.

### T338 Leaderboard plan (docs only)
- Facts: deps are three 0.187.0 and zod 4.6.7 only; no fetch/network code in src; no CSP (index.html), `public/_headers` sets Cache-Control only; vite has no `base`; CI deploy is Cloudflare Pages when `CLOUDFLARE_API_TOKEN` is set; old notes at zipline-plan.md:46, :1062 (Workers+D1, superseded by Supabase), three-track-plan.md:858.
- Determinism: src/core has no Math.random/Date. App-layer non-determinism to record: `chaseSeed` Math.random (game.ts:212, 513), `?dragonGap` (214), tuning.json hash, app-side pathCam writes `camYaw` (623-629) and aim fields (631-636, `computeAim` 780). Replay = (level id, seed, config hash, per-tick InputFrame after app writes) plus the app-side PathCam. Not replayable from core alone.
- No existing replay test; tests/core/chaseBot.test.ts could seed one.

### T339 Time mode
- Files: game.ts (`runT` 329, reset 527, `+= stepDt` 641, win 686-699, `setTime` 1136, `onAnyInput` 1237, input sample 553), ui/hud.ts (timer 72-75, `showWin` 264), modes/mode.ts (`BEST_KEYS` 25, `readBest`/`writeBest`, `formatTime`), main.ts 46-52, core/input.ts. New: LeaderboardPort + localStorage impl.
- Extension: `ModeStore = Pick<Storage,...>` (mode.ts:43) is the injection pattern; chase has integer `cs.ticks` (chase.ts:118), classic has none; `hud.showWin(time, best)` can grow a list.
- Tests today: mode.test.ts (8), levels.test.ts (6), loop.test.ts. Nothing on the run clock, finish, or HUD. No trace recorder (`grep trace src` empty).

### T340 Two visible modes on the new level
- Files: modes/mode.ts, levels.ts (`playKey` 56), lobby.ts (172-186), game.ts (chase setup 198, 217-258, render/gap 982-1012), core/chase/{dragon.ts (`dragonStep` 37-43, `gap = z - heroZ`), chase.ts (`heroRowFor` 94, `killHero` 103, `chaseStep` 116, `prog = spawnZ - pz` 154), chaseWorld.ts (`routeIndexFor` 230), rows.ts 131}, core/config.ts (startGap 36, catchGap 2.5). New: docs/adr/0017.
- Tests: tests/app/levels.test.ts (exactly two modes), tests/core/dragon.test.ts, chaseWorld, chaseRows, chaseBot, chaseDifficulty, chaseScore, content/chaseL1.test.ts, adapters/dragonView, catchPose, chaseDanger. None for a spiral or route progress.
- Extension: route index per hero tick exists; arc-length progress per anchor does not. `enabled` flag per `LevelEntry` is the smallest hide.
- Risks: home-street runs have 90/180/270 headings, so z-gap is flat or non-monotone; score and `maxProgress` assume monotone z. Must not break `legacyLevel` old URLs.

### T341 Mode interface
- Files: modes/mode.ts (`GameMode` 6, `GAME_MODES` 8, `MODE_INFO` 24, `BEST_KEYS` 25), modes/levels.ts, game.ts (1327 lines; `startGame` 183; ~47 mode-flag lines: flags 198-201, world select 218-228, layout 231-258, win 689-699, chase score 710-728, restart 511-527, best 352), main.ts (48-59 plus the `village` lazy import), app/tuning.ts (`MODE_OVERRIDES`, `resolveCfg`), ui/lobby.ts (179, 186).
- Tests: mode.test.ts, levels.test.ts, tuning.test.ts, tests/config/configScope.test.ts (needs `GAME_MODES` and `MODE_OVERRIDES` keys stable). No startGame or lobby test.
- Keep key strings (`bhagdori.best.*`, `?mode=` legacy URLs). Do not fix the shared `strategy` best key inside T341 (no-behaviour-change card). `hopChip` in `MODE_INFO` has no reader.

### T343 Gyro spike
- Files: src/adapters/input/{desktop.ts (sample 85), touch.ts (sample 154, look zone 343-395), tapGesture.ts}, core/input.ts (`InputFrame` lookYaw/lookPitch 26-27; nothing writes them), game.ts (frame->step 598-640, camera yaw assembly ~400-410, pathCam pause 628), adapters/render/{cameraYaw.ts, cameraRig.ts}, app/ui/orientation.ts (not a sensor), ui/hud.ts, touch.css.
- Tests: core/input.test.ts, adapters/cameraYaw.test.ts, cameraRig.test.ts (fov clamp :95), tapGesture.test.ts, golden trace (lookYaw). Nothing for DeviceOrientation.
- Preferred: render-only offset in camera assembly (no sim change). Writing `lookYaw` changes stick mapping and pauses the path camera: a gameplay change, not a spike.
- iOS permission and drift/orientation rebasing are untested assumptions; device run needed ("not verified").

## 3. Conflicts between cards

1. **sim.ts**: T334 edits `moveFree` ground branch (1067-1083); T335 edits slip/slide (262, 958, 1046). Sprint clamp must stay out of the slip branch.
2. **Tuning triple**: T334 (and maybe T335) add keys to tuning.json (hero/roof one-liners), config.ts Tuning+DEFAULT, tests/config/tuning.test.ts strictObject. Certain textual merge conflicts.
3. **Goldens and frozen tests**: roof-slide golden (T334/T335), graphFreeze (any `hero.run` change).
4. **game.ts (45 KB)**: T334 (sprint indicator), T339 (win 689-699, runT, anyInput), T340 (chase 253-257, 982-1012), T341 (flags 198-258, win/score 687-728, best 352), T343 (camera ~400-410). Overlaps: 689-699 (T339+T341), 198-201 (T340+T341).
5. **hud.ts/css**: T334 indicator, T339 finish list, T343 toggle.
6. **T336 vs T337**: "exact topology" vs "bend positions" (edges are geometric); both stuck on 3-storey height and parkour 0/1.
7. **T337 vs T340**: spiral z is non-monotone; ADR 0017 must pick the progress parameter before T340 code. Also supersedes ADR 0016 and 0010 C2.
8. **T336 vs T340**: chase needs a level-driven world path, not a new `PlayKey`.
9. **T339 vs PRODUCT.md and T338**: trace field vs "replay traces" non-goal; both cards need one owner decision.
10. **Order constraints**: T341 first (registry, `enabled`); T339 and T340 after it; T340 also needs T336, T337. T338 is docs-only and parallel. T334 before T335 per queue, but shares sim.ts.
11. **All modes share one tuning**: T334/T335 tuning changes also hit Dragon Chase and every hidden mode; per-mode overrides must be documented (configScope).

## 4. Owner questions raised by the inventory

1. T339/T338: allow input traces (amend PRODUCT.md non-goal) or drop the `trace` field?
2. T340: confirm ADR 0017 supersedes ADR 0016 and ADR 0010 C2.
3. T336/T337: accept new generator path and decide storeys (3-storey kit vs 2), parkour 0 or 1, and whether road nodes carry houses.
4. T337: is a changed edge set acceptable, or must edges be fixed data checked against the sim?
5. T339: per-level best keys (split the shared `strategy` key)? "From first input" or from play start?
6. T338: RESOLVED, GitHub Pages (see section 6).
7. T334: confirm 6 -> 11 and the cap above carryCap 12; is a visible sprint pose required (pose clamp)?
8. T335: define "balance"; supply house reference.

## 5b. Owner decisions 2026-11-17b (after this inventory; they override the cards)

- T334: add a sprint animation with the higher speed (lift the pose clamp, heroPose.ts:494).
- T335: backlog, not in this batch.
- T336: ONE map: Home Street extended with a house for every Nagarkot Run maze node; other levels hidden. Fable clarifies the model merge in phase 3.
- T337: only a Home Street type angle change, no literal spiral.
- T339: one level only; per-level keys moot.
- T340: keep Dragon Chase logic as is, reintegrate into new Classic later; no spiral dragon/ADR 0017 now.
- T341: do the recommended (registry.ts, GameMode, keep key strings, pure tick seam).
- T338: host = GitHub Pages https://rubenkaksh.github.io/bhaaag/ (recorded in PRODUCT.md, CLAUDE.md, session-state, queue T333/T338).
Open still: replay trace vs PRODUCT.md non-goal; 3-storey/parkour/road-node merge (for Fable); sprint 6 -> 11 above carryCap 12.

## 5c. Owner decisions 2026-11-17c

- T337 reference: `docs/reference/t337-annapurna-trek-map.jpg`: winding trail with a loop, a long curved spur and a short spur (see queue T337 note).
- Leaderboard time: record an offset at the first user input; time = finish tick minus that offset. Replaces full replay traces (PRODUCT.md non-goal needs a wording amendment).
- T334: 11 m/s sprint approved; sprint values stay in tuning.json, ready for Supabase remote config as in `workspaces/vidanta/docs/plans/2026-09-27-remote-game-config.md` (defaults equal today, clamped, never blocks, anon key only). Not built yet.
- Deployment stays manual to https://rubenkaksh.github.io/bhaaag/; no new deploy job (T333 reduced to the chunk-size check).

## 5. Not verified

dist initial-chunk size; `DEAD_CAUGHT` caller; desktop.ts/touch.ts sample internals; no gates, screenshots or device checks were run.
