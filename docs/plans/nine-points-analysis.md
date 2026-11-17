# Nine points: Phase 2 analysis (T342)

Date 2026-11-17, Sonnet. Input: inventory, PRODUCT.md (17, 17b), ADR 0010/0011/0015/0016, cards T333-T344 with owner notes (newest wins). Code checked by reading only; nothing was run. Estimates are focused-session minutes incl. tests, excl. owner waits. Tiers: J = junior (hunter/cursor), H = Haiku, S = Sonnet, P = premium review of the named design only.

## 1. Inventory claims checked against code

Confirmed: `hero.run` 6, `carryCap` 12 (tuning.json:27,37); flyover `PAN_S` 2.5 s, `runT` starts at phase 'play' and `anyInput` is cleared at pan end (game.ts:568-575, 641); `restart()` sets phase 'play' directly (no flyover) and zeroes `runT`/`anyInput` (:511-527); Nagarkot roofs `planeY(z)+{7,11,15}` with `STOREY` 4 (gen.ts:46-48, 324) vs kit roof deck `groundY+0.4+2.8*storeys` = 3.2 / 6.0 m (houseSpec.ts:80,192); `buildEdges` is pairwise closed-form over axis-aligned AABBs with "downhill = +z side" (graph.ts:103-115, 264-289); `graphLevel.segments` are node *chains* with edges only inside a segment (format.ts:85-110); Home Street is 10 nodes / 9 edges / 5 segments; placer is a BFS from `start`.
Corrections to the inventory: (a) `wallHit`/`vCling` (sim.ts:676-690) fires only on the rope (hook speed), so a sprint jump into a wall is NOT lethal; no new wall rule needed. (b) The graph-level edge vocabulary is `zip|gap(jump,tramp,cushion,boxes,stairs)|touch`; Nagarkot's `grab`, `tight`, `climb` (balcony) and road nodes have no equivalent, so "same graph in graphLevel JSON" is not a mechanical conversion.
Unverified: dist chunk size, pure-graph results for any new height set, frame cost of 100 kit houses.

## 2. Per card

| Card | Est. | Tier | Needs | Touches (conflict-prone) | Premium part |
|---|---|---|---|---|---|
| T333 chunk check | 15 | H | none | none (reads dist) | none |
| T341 registry | 180 | S (J for lobby/docs) | none | game.ts (mode flags 198-258, win 689-699, best 352), mode.ts, levels.ts, lobby.ts | interface width (Q7) |
| T334 sprint | 150 | S core+tests, J heroPose | Q5 | sim.ts moveFree, hero.ts, tuning triple, heroPose.ts | Q5, Q6 |
| T336 level | 420 (a 150, b 120, c 150) | S | Q1, Q2, Q5 | strategy/gen.ts, graph.ts, levelView/strategyView, then levels.ts+game.ts | Q1, Q2 |
| T337 bend | 240 | S | T336a-b, Q3 | gen.ts layout, terrain.ts, hazards | Q3 |
| T338 plan | 60 | S | none | docs only | anti-cheat, data model |
| T339 time | 150 | S (H for HUD) | T341, Q4 | game.ts win/runT/anyInput, hud.ts, mode.ts | Q4 |
| T340 hide modes | 45 | J + S for tests | T341, T336c | levels.ts, mode.ts, lobby.ts, tests/app/levels.test.ts | none |
| T343 gyro spike | 60 + phone | S | none | adapters/input, camera assembly (game.ts ~400) | none (throwaway) |

Card notes (owner decisions applied):
- **T333** (reduced): run `pnpm build`, gzip `dist/assets/index-*.js`, record vs 215 KB; rerun at the end because T338/T339 add a Supabase client (lazy chunk only, never in the initial chunk). Baseline first, it gates how much T339/T336 may add.
- **T341**: `startGame` has no test, so "no behaviour change" is only provable on extracted pure parts. Slice: (1) `registry.ts` (`GameMode`, `enabled`, `levels()`, `bestKey`, `playKey`), lobby reads it; (2) pure `ModeRules` seam: `onFinish(ticks) -> {best, record}` and chase score, unit-tested with a fake mode over N ticks of a pure `tick(state)` fn; (3) ADR + "How to add a mode". Do not move world creation or render extras yet. Keep `bhagdori.best.*` and `?mode=` strings.
- **T334**: step counter must live in core as distance at >=0.98*run (render `phase` is not core): `sprintStreakM = 7 * stride`. Set sprint cap only in the grounded non-slip branch (sim.ts:1067-1083); `carryCap` 12 > 11 so landing carry is unchanged. Lift `amp = clamp(speed/6, .3, 1)` (heroPose.ts:494) to a higher cap; `runCadence` already rises (1.76 -> 2.24 cycles/s at 11 m/s). Skip the HUD sprint indicator (it would force game.ts/hud edits for no owner ask). Existing tests that run >7 steps (hero.test.ts:64, gameplay.test.ts) either pin `sprintSpeed = run` via cfg override or are re-recorded: decide once. tuning.test.ts `strictObject(hero)` needs the new keys.
- **T336**: see Q1/Q2. Split a (height model + generator + pure tests, `src/content/strategy` only, parallel with T341), b (kit dressing of node AABBs, render), c (register level, lobby/default, path camera, screenshots; after T341).
- **T337**: bends are only safe at segment boundaries (Q3). No literal spiral, no winding assert. Add the missing generator overlap/spacing test (AABB, plan view) first; it is the real acceptance gate.
- **T338**: plan fits static GitHub Pages: anon key public by design so RLS carries all security; OAuth redirect allow-list must include the `/bhaaag/` subpath URL; Facebook login normally needs app review (verify against current docs, record); free-tier project pausing on inactivity (verify); no CSP header file, meta only; supabase-js lazy-imported. Anti-cheat with only a first-input offset is trust-the-client: say so, plan server-side bounds (min time from level length / sprint cap, config-version tag, rate limits), not replay. Remote config: Vidanta pattern (read at run start, clamp, defaults on failure, anon key, history table) maps onto `app/tuning.ts` `resolveCfg`.
- **T339**: time in integer ticks (`runTicks`), `ms = round(ticks*1000/60)` for submit, local best keeps today's unit (seconds, ticks/60) so existing `bhagdori.best.*` values stay valid. `LeaderboardPort.submit(level, ms, offsetTicks)`, local impl behind `ModeStore`-style injection. Lobby/finish list via `hud.showWin`. New level needs one best-key string (decide in Q7); old keys stay for hidden levels.
- **T340** (reduced): `enabled` on `GameMode` and `LevelEntry`; lobby lists exactly Classic + Dragon Chase; Classic level row shows the new level only; legacy URLs (`?mode=village`, `g:*`, `strategy`) still resolve. Chase stays on endless rows (ADR 0010 C2 untouched). Amend ADR 0016 with one paragraph (no ADR 0017). Must land after T336c or Classic's default level is hidden with nothing to replace it.
- **T343**: render-only camera offset on the throwaway branch; do not write `lookYaw` (changes stick mapping and pauses pathCam). iOS permission and drift stay "not verified" until a phone run. Fix stale docs/controls.md:46 only if the spike is kept.

## 3. Conflicts and ordering

- **sim.ts**: only T334 in scope (T335 backlog). **Tuning triple**: only T334. No conflict in this batch.
- **game.ts**: T341 (flags, win, best), T339 (runT, win, anyInput), T343 (camera, throwaway), T336c (level branch). Serial: T341 -> T339; T336c after T341; T343 never merged.
- **levels.ts / mode.ts / lobby.ts**: T341 moves them, T336c and T340 add to them: T341 first, then T336c, then T340.
- **Cross-card coupling the cards do not state**: (1) T334 sprint changes maze edge feasibility (Q5) and Dragon Chase difficulty (shared tuning, `MODE_OVERRIDES` empty); (2) T334 remote config makes leaderboard times config-dependent (Q6); (3) T336 changes the Classic identity from free-aim to fixed-line (`lineOnly`, zip only inside zones; PRODUCT non-goal "free-aim in maze is out"): the owner should confirm Classic = fixed-line maze, hints/aim-reason UI differ.
- Goldens: `graphFreeze` pins Home Street hash da373009 and Nagarkot output: any change to gen.ts must go through a NEW level key, never mutate the frozen Nagarkot output; roof-slide golden unaffected unless sprint is on in tests.

## 4. Open design questions for the Fable review

**Q1. Changing the Nagarkot maze for 1-2 storey houses.** Why it is not a retune: one-way ledges depend on 4 m steps (STOREY 4: sideways step-up is out of grab reach). Kit steps are 0 / 2.8 m; by ADR 0011 the climb rule allows dTop <= ~3.2 (jump apex 1.03 + reach 2.2), so every lateral 2.8 m step becomes a free grab edge, drops of 2.8 m become safe (vy ~7.4 < vyRoll 13), and dead ends leak. Downhill bands keep most one-way-ness (ground drop ~5-7 m per band) but not lateral rows.
- **A. Re-derive.** Keep gen.ts as authority; heights from the kit ({3.2, 6.0}); rerun `buildEdges`; fix the generator's "adjust receiving house so the move holds" rules for 2 levels; accept the new edge set (owner allows). ~150 min. Risk medium: dead-end count shrinks; verified cheaply by the existing pure-graph BFS (S->G, >=1 dead end) plus new asserts (>=2 escape paths, >=N dead ends).
- **B. Redesign segment heights.** Add stepped terrace ground (retaining walls, Home Street `profile` style) so band-to-band dy is >= 4 m and kit storeys only modulate +-2.8; lateral rows use tall parapets (1.2, not vaultable) to block step-ups. ~240 min. Risk: new terrain visuals, hazard strips (z-stepped, HAZARD_HALF_W 60), more generator rules.
- **C. Edges as data, revalidate with the sim.** Freeze the old topology as JSON, place with Home Street's placer, run `graphBot` per edge. ~400+ min. Risk high: placer BFS packing at 100 nodes unknown (retries), vocabulary lacks grab/tight/road, and nothing proves *undeclared* shortcuts are absent (only the pairwise check does, which is A's test anyway).
- **Recommendation: A, add B's ground steps only where A's pure-graph test shows leaks.** Acceptance = new BFS test, not edge equality. Ask Fable: is one-way-ness the maze's defining property (then B earlier), and what minimum dead-end/escape counts make it "a maze"?

**Q2. Hosting ~100 nodes + 12 balconies + 3 road nodes with the segmented placer (ADR 0015, frozen v1).** Findings: placer lays chains with BFS neighbour placement; no packing for a 5-lane 2-D grid, no road nodes, balconies are child nodes in gen but a flag in graphLevel, level hash freezes the output, and PRODUCT says the maze is generated at runtime (no 100-house JSON). Proposal: do not host it; keep gen.ts geometry (footprint 8 x 8 = `HK.half` 4, so kit houses fit) and dress each node AABB with kit houses (the strategy view already dresses 100 houses, strategyView.test:54). "Home Street" then means the look (kit, doorway frame, poles, path camera, 1 m hazard bands), not the placer. Ask Fable: which Home Street features must survive (path camera needs house bearings from the graph; fork markers; runouts; party walls), and does the 100-house kit dressing fit Low 55 draw calls (measure on SwiftShader, do not guess)? Also the dual-representation hazard: PR #21 z-fight came from colliders and decor at the same coordinates; keep one source of truth.

**Q3. T337 bend vs edge geometry.** `relation()` is axis-aligned with uphill = z, so bends are only valid in per-segment local frames (ADR 0015 model) with edges computed inside each frame; the three road terraces are the natural bend nodes (shared node, lateral strips ~64 m wide, so cross-segment edges are only road-incident). Ground must follow path length (view field), as Home Street does; the sim has no ground field, hazards and the kill plane are the safety net. The reference map's *closed loop* cannot close in plan at monotone descent: read it as topology (rejoining branches = loop, dead ends = spurs) drawn on curves, or accept a near-closure with vertical offset. Needs a plan-view overlap/spacing test (none exists) and no top-down screenshot tool exists. Ask Fable: serpentine (0/180 hairpins, 120 x 120 m footprint) vs L/U shapes, where to cut segments, and how hazard strips and the 64 m road strips behave under rotation.

**Q4. First-input offset vs flyover and restarts.** Facts: the DOM `onAnyInput` also fires on UI clicks and is cleared at pan end; restart skips the flyover. Proposal: offset = first tick in phase 'play' whose `InputFrame` has move magnitude or a button (sim-level, deterministic, ignores camera drag, overview key and flyover skip); tick counter starts at play start (flyover excluded); `restart()` clears both; time = finishTick - firstInputTick; both integers. Open: free planning before the first input (overview L/M) is excluded from time by design: intended? Does a death before any input count? Does `hud.setTime` show 0 until the first input? Chase has its own `cs.ticks`; leave it.

**Q5. Sprint vs the maze.** Maze edge rules use `T.hero.run` (6): run-jump ~5.5 m, sprint-jump ~10 m (11 m/s x 0.92 s). Bands gaps of 7/9/11 m become jumpable, so sprint creates shortcuts across dead ends. Options: per-level `sprint` flag (precedent: `climb`, `lineOnly`), sprint disabled in the maze; re-derive edges with sprint reach; accept shortcuts. Also Dragon Chase: sprint 11 vs chase vMax 13.5 changes difficulty; default proposal: sprint off for chase via `MODE_OVERRIDES`. Also "defaults equal today" (remote config) vs "tuning.json 11": clarify that JSON ships sprint on, the code fallback only matters when remote fails. Decide before T336a fixes the edge constants.

**Q6. Leaderboard fairness with remote config.** Times from different `sprintSpeed` values are not comparable. Rows need a config version/hash; remote values apply at run start only, clamped, never mid-run; plan which keys are remote (sprint set) and which stay build-time. Where it enters: `app/tuning.ts` `resolveCfg`, not core.

**Q7. T341 interface width and keys.** Narrow (`id, label, enabled, levels, bestKey, playKey, rules`) vs the card's wide list (createWorld, renderer extras). Dragon will be reintegrated into the new Classic later; a wide interface bakes in today's chase flags. Also: best key for the one new level (new string vs reuse `bhagdori.best.strategy`/`classic`), and `enabled` semantics for hidden levels with legacy URLs. Recommendation: narrow now, widen when the dragon is reintegrated.

**Q8. Other.** (a) PRODUCT.md wording: first-input offset, one new level, hidden modes, "no free-aim in maze" non-goal vs Classic becoming fixed-line (T338/T339 note says amend). (b) ADR 0011 s6 says `houseDress` false; code dresses: align doc. (c) Initial chunk is already over 215 KB per T333 title (268 KB gz); any new code must be lazy or the budget needs an owner decision. (d) Frozen-hash policy for the new level: do not register in `GRAPH_LEVELS`; choose its own freeze.

## 5. Recommended build order (★ = critical path)

0. T333 baseline chunk size (15).
1. Fable review answers Q1-Q8 (before any generator code).
2. **Wave A, parallel, disjoint files:** ★T336a (gen.ts height model, `src/content/strategy` only) | T341 (app/modes + game.ts) | T334 (core, tuning, heroPose; after Q5) | T338 (docs) | T343 (throwaway branch).
3. **Wave B:** ★T336b (dressing) after T336a; T339 after T341; ★T336c after T336a-b and T341.
4. **Wave C:** ★T337 after T336 (generator overlap test first); ★T340 after T336c and T341 (last visible switch).
5. T333 size recheck, phone QR check of the final build ("not verified" until then).

Critical path ~ T336 (420) + T337 (240) + T340 (45) = ~11 h; T341 + T339 (~5.5 h) and T334 run alongside. Merge order: T341, T339, T334, T336, T337, T340; worktree per session, one writer per file set.
