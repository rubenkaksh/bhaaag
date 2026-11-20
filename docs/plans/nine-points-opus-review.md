# Nine points: T344 Opus review gate

Date 2026-11-17. Reviewer: Claude Opus 5.5 (`claude-opus-5-5`), premium seat, review only (no gates, no git, no code). Inputs: PRODUCT.md, nine-points-inventory/analysis/review/plan.md, sessions/2026-11-17.md (17b-17e, newest wins), queue cards T333-T346 in `~/projects/sandbox/config/queue/bhagdori.yaml`. Spot-checked in code: `src/app/tuning.ts`
(MODE_OVERRIDES), `src/app/modes/mode.ts:8`, `src/core/config.ts:244`, `src/core/sim.ts:366`, ADR 0001 line 22.

## Mission check

The batch serves the Product Purpose. Three things work against PRODUCT.md as it reads today, and each needs a fix below:
(1) PRODUCT 17b still says "spiral" and "both modes on the new level". Builders read PRODUCT.md first, so T346 must land before any build card (F1). (2) Owner Q-B allows no initial-chunk growth, but T341, T339 and T334 add code to the initial chunk before T345 runs, and none of them checks the size (F2). (3) The success test is "finish under 2 min" (Q-C). The review said this option "needs a smaller maze", but no card has a measurable path-time check (F3).

## Cross-card fixes (apply to the queue before picking)

- **F1 PRODUCT first.** Add `T346` to deps of T334, T336, T337, T339, T340, T341, T343. T346 is 20 min in wave 0b.
- **F2 Chunk freeze is enforceable.** Add to the done_when of T334, T339, T341 and T336c: "controller reports initial chunk gz <= T333 baseline (same command as T333)". To make this possible, move T345 forward: deps `[T341, T333]`, run it in the game.ts chain as T341 -> T345 -> T339 -> T336c, and scope it to village, builders and the graph levels (see T345). If the owner prefers a temporary allowance instead (for example +5 KB gz until T345), that is an owner call. Default: reorder.
- **F3 Measurable 2-min check.** T336a done_when: "shortest S-to-G path time estimate = sum over its edges of (run/jump horizontal metres / 6 m/s) + (zip chord metres / mean zip speed from tuning) + 1.0 s per mantle/climb. Record metres and seconds. Assert <= 80 s. If over, cut bands (a smaller maze)." The 80 s, with 40 s left for hesitation, is my judgment; the owner may change it.
- **F4 Sync estimates and titles to the plan** (the budget check reads them). estimate_min: T333 15, T334 150, T336 420 (or per split, F5), T337 240, T339 150, T340 45, T341 180. Titles: T333 drop "deploy is manual; CF secrets missing". T336 "re-derived from the Nagarkot Run graph with kit heights" (Option A changes the edges, so not "exact"). T337 drop "spiral". T340 drop "both modes play the Nagarkot-graph/Home-Street level" (owner 17b: Dragon stays on endless rows).
- **F5 Split T336 into T336a/b/c cards** with their own deps: a `[T344, T346]`; b `[T336a]`; c `[T336a, T336b, T341, T339, T345]`. Today T336 deps are only `[T344]`, so a cold picker could start c before T341 and T339 have landed in game.ts.
- **F6 ADR numbers.** T341 and T334 both create "a new ADR" in parallel. Assign the numbers: T341 = `0017-mode-registry`, T334 = `0018-sprint`. The "no ADR 0017" decision was about the spiral dragon only. Say so in T340's ADR 0016 paragraph.
- **F7 Rule 2 ledger additions** (plan section 1): load `scribe` and run `~/.claude/flags/flag check <engine>` (must exit 0) before every junior dispatch. Haiku briefs carry `skills/scribe/haiku-rules.md`. Run `get_usage` + `budget record` after each card (Rule 8).

## Per card

**T333 chunk baseline: go-with-changes.** Engine: the controller runs it through rtk, not Haiku (Rule 2: single fast command). done_when command, exact: `pnpm build`, then gzip -c each JS file that `dist/index.html` loads by `<script>` or `modulepreload` (not only `index-*.js`), and record the per-file sizes and the sum in `docs/session-state.md`. Expected sum is about 268 KB. The same command is reused by F2.

**T346 PRODUCT amendment: go-with-changes.** hunter edits one file per run, but the card edits PRODUCT.md plus ADR 0016. Move the ADR 0016 fixed-line line into T340's ADR paragraph, so T346 = PRODUCT.md only, and `git diff --stat` shows one file.

**T341 mode registry: go-with-changes.** Name collision: `GameMode` already exists as the mode-id union
(`src/app/modes/mode.ts:8`), and `src/app/tuning.ts` `MODE_OVERRIDES: Record<GameMode, ...>` uses it. T334 edits tuning.ts in the same wave. Fix: keep the union `GameMode` untouched. The new interface in `registry.ts` is `GameModeDef`. T341 does not edit `src/app/tuning.ts`. This keeps the owner's "registry.ts, keep key strings" decision; only the interface name moves
(one-line note to the owner). Add F2 and F6.

**T334 sprint: go-with-changes.**
(a) "~8 becomes 6" is wrong. The ~8 in CLAUDE.md (Momentum carry) and ADR 0001:22 is the landing carry cap, which is `carryCap` 12 (`config.ts:244`, applied at `sim.ts:366`). Write 12, not 6.
(b) Add the files `src/app/tuning.ts` (Dragon Chase override), `docs/config-scope.md` and the override-scope test. The header of `tuning.ts` says a mode may override only what is documented there.
(c) Decide the long-run tests now: pin `sprintSpeed = run` via the cfg override in the existing tests (goldens stay put). New tests cover sprint.
(d) Record the measured run-jump and sprint-jump distances (m) and the speed-up distance in ADR 0018, because T336a's reach constants depend on them.
(e) Say in the done_when that `config.ts` DEFAULT mirrors tuning.json (11). "Defaults equal today" means "no remote value = shipped tuning.json". Add F2.

**T336a height model + generator: go-with-changes.**
(a) Sprint reach: until T334 merges, use the plan numbers (11 m/s, 7 strides) as named constants in `graph.ts`. Before merge
(T334 merges first), rebase, swap in T334's measured distances, add a test "graph sprint constants == tuning.hero.sprint*", and rerun the acceptance test.
(b) Add F3.
(c) Owner 17d said "Opus high designs, Fable validates". Fable is unavailable (17e) and the plan drops the validation without saying so. Owner question O1 below. The Opus design note may start now. The Sonnet implementation waits for the answer.

**T336b dressing: go.** Disjoint files (levelView, strategyView, houseV2). The SwiftShader draw-call measure must be done by the controller, not by a premium seat.

**T336c register + play: go-with-changes.** F5 deps. Its best key `bhagdori.best.nagarkot-home` is the only place that key is created (see T339).

**T337 bend: go-with-changes.** F4 title. Owner 17c's "loop" is satisfied by Q3's fork-and-rejoin diamond. Keep it.

**T338 leaderboard plan: go.** Docs only. scout-first and the supabase skill apply. The supabase MCP is not authorised in this harness; the plan needs only docs, so this is not a blocker.

**T339 time mode: go-with-changes.**
(a) The level `nagarkot-home` does not exist until T336c. Replace "local best under key bhagdori.best.nagarkot-home" with "best is read and written via the registry's `bestKey(level)`; existing keys unchanged". T336c adds the new key.
(b) Delete "src/core tick counter if needed". Count ticks in game.ts at the fixed 60 Hz step, so T339 never touches core while T334 may still be open in sim.ts.
(c) Keep dep T338 (docs, wave A). Build the local port only. Add F2.

**T340 hide modes: go-with-changes.** F4 title. Add the ADR 0016 fixed-line line (moved from T346) and the F6 note. Files are disjoint from T337 in wave C.

**T343 gyro spike: go-with-changes.** Engine: cursor (Sonnet only on failure), not "cursor/Sonnet". Copy the plan's "render-only offset, do not write `lookYaw`" into the card's done_when. Throwaway branch, never merged. A phone QR run is the only rung; otherwise report "not verified".

**T345 lazy-load: go-with-changes.** Contradiction: it lists "strategy generator" as hidden, but the new visible level `nagarkot-home` is built by `src/content/strategy/gen.ts`. Fix: lazy-load village, builders, the graph levels
(`GRAPH_LEVELS`: home-street, valley) and any supabase code. gen.ts stays, or becomes the level's own lazy chunk loaded on lobby pick. If 215 KB is not reachable, record the floor and stop for the owner. Deps per F2.

## Order, merge and parallel-file check

Wave A after F6 and the T341 rename fix has disjoint file sets:
- T336a: strategy/ + tests/content
- T341: app/modes, lobby, game.ts, tests/app
- T334: core, tuning.json, heroPose, app/tuning.ts, config-scope
- T338: one doc
- T343: throwaway branch

game.ts chain: T341 -> T345 -> T339 -> T336c. Merge order becomes T341, T345, T339, T334, T336a/b/c, T337, T340. T334 merges before T336 as T336a (a) needs. The critical path stays T336 + T337 + T340 (about 11 h): T341 + T345 + T339 is about 7 h, which fits inside T336a + T336b at about 4.5 h plus slack only if T341 starts first. Start T341 at the very start of wave A. Premium share stays about 7%.

## Inventory section 4 questions

1 trace: resolved (17c offset). 2 ADR 0017: resolved (no dragon ADR, 17b). 3 storeys/parkour/road: resolved (review Q1).
4 edge set: resolved (Option A + BFS test). 5 keys/first input: resolved (new key, first input). 6 host: resolved.
7 sprint 6->11, pose: resolved (17b/17c). 8 T335 balance: open, backlog, outside this batch. Still open:
- **O1:** Fable validation of the T336a maze design (17d) while Fable is unavailable: skip it, use an Opus review as stand-in, or wait?
- **O2 (optional):** F2 reorder vs a temporary chunk allowance.
- **O3 (optional):** the 80 s threshold in F3.

NOT READY: apply queue text fixes F1-F7 and the per-card edits (a controller edit, verified by a diff read, with no re-gate), and get owner answer O1 before the T336a implementation; T333, T346, T338 may be picked once their edits land.

## Fixes applied

Applied 2026-11-17 to `docs/plans/nine-points-plan.md` and `~/projects/sandbox/config/queue/bhagdori.yaml` (valid YAML, checked with ruby). The queue file lives in the sandbox repo and is not committed here.

- F1: T346 added to deps of T334, T336a, T337, T339, T340, T341, T343 (and T336b, T336c, T345).
- F2: chunk-check line added to T334, T339, T341, T336c; T345 moved to wave B, deps [T341, T333], chain T341 -> T345 -> T339 -> T336c; scoped to village, builders, graph levels, supabase; gen.ts not hidden; floor-and-stop clause added.
- F3: T336a 80 s shortest-path estimate formula and assert.
- F4: estimates T333 15, T334 150, T336 420 (150/120/150), T337 240, T339 150, T340 45, T341 180; titles of T333, T336, T337, T340 fixed.
- F5: T336 split into T336a [T344, T346], T336b [T336a, ...], T336c [T336a, T336b, T341, T339, T345, ...]; T337 and T340 now depend on T336c.
- F6: ADR 0017-mode-registry (T341), 0018-sprint (T334); T340 ADR 0016 paragraph notes the spiral-dragon scope.
- F7: Rule 2 and Rule 8 ledger additions in plan section 1.
- Per-card edits: T333 controller engine and per-file gzip command; T346 PRODUCT.md only; T341 interface renamed `GameModeDef`, tuning.ts untouched; T334 carryCap 12 (not 6), tuning.ts, config-scope, override test, pinned long-run tests, ADR 0018 measurements, DEFAULT note; T336a named constants and sync test; T339 bestKey(level), no core edit; T343 engine and render-only offset; T345 per above.
- O1 (owner decision): T336a maze design validated by an Opus-alias review seat while Fable is unavailable; recorded in plan section 0 and T336a.
- O2, O3: left as optional owner calls (reorder default, 80 s default), noted in the plan.

READY TO PICK (after fixes, unverified by second Opus pass)
