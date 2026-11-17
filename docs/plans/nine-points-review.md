# Nine points: Phase 3 review (T342)

Date 2026-11-17. Reviewer: Claude Opus 5.5 (`claude-opus-5-5`) as a stand-in for Fable, which was unavailable; the owner approved Opus for this seat. Review and decision only: no code, no gates, no git. Inputs: PRODUCT.md (to amendment 17b), CLAUDE.md, nine-points-inventory.md (incl. 5b/5c), nine-points-analysis.md, ADR 0016, sessions/2026-11-17.md, queue T333-T344, docs/reference/t337-annapurna-trek-map.jpg. Facts are taken from the analysis; nothing was re-read in code or run.

## Mission check

Nothing in the batch works against the Product Purpose. Three points stretch it and are in section 2: (a) Classic changes from free-aim to fixed-line play, against ADR 0016; (b) the initial chunk is already over budget (268 vs 215 KB gz), against Principle 5; (c) the single new level has no stated success test (PRODUCT has a 2-minute L1 test and a 10-minute maze test). PRODUCT 17b still says "spiral layout" and "both modes run on the new level"; newer owner decisions (T337 no spiral, T340 dragon stays on endless rows) override it. Fix the wording, no decision needed.

## 1. Answers Q1-Q8

**Q1. Maze change: Option A (re-derive with kit heights), with B's terrace step as the required fix for any leak the test finds.** Reason: gen.ts and `buildEdges` already define the maze, and the pairwise closed-form check is the only thing that proves no undeclared shortcut exists. C rebuilds that proof badly and costs about 400 min.
One-way travel is the maze's defining property. Dead ends must be terminal or the strategy promise ("learn which branches are dead ends") breaks. B is therefore not optional where A leaks; it is the repair.
Designer constraints (all must hold):
1. Heights come only from the kit: roof deck = groundY + 0.4 + 2.8 x storeys, storeys in {1, 2}. No 3-storey houses, no non-kit heights.
2. Ground is stepped per band (Home Street `profile` style, retaining walls). Band-to-band roof drop on any non-edge pair is >= 4.0 m, or at most 2.8 m only where an edge is declared.
3. Within a band, a lateral step-up that is not an edge must be blocked: either dTop > 3.2 m (outside the ADR 0011 grab reach), or a gap wider than the sprint-jump reach, or a 1.2 m parapet (not vaultable) on the facing edge.
4. Reach constants include sprint (see Q5): run-jump about 5.5 m. The sprint-jump about 10 m counts only from roofs whose run-up length along the jump axis is at least `sprintStreakM` plus the acceleration distance. Joined houses (1..N per node) create those runways on purpose.
5. Parkour is on (1, Home Street rules). Mantle and auto-vault reach go into `buildEdges`.
6. Road nodes (3) carry no house; they are the terraces where the route bends (Q3).
7. The frozen Nagarkot output and the `graphFreeze` hashes are untouched. The new generator path has its own level key and its own seed constant.
Acceptance test (pure graph, Vitest, under `tests/content/`). Build nodes and edges back from the EMITTED LevelJson (not from the generator's own lists), rerun `buildEdges` with the parkour 1 and sprint reach constants, then assert all of these:
- G is reachable from S.
- There are >= 2 node-disjoint escape paths from S to G.
- Dead-end nodes (reachable from S, cannot reach G) are >= 20% of reachable nodes, and they lie in >= 6 distinct dead-end branches.
- No edge exists that the generator did not declare (zero leaks).
- Every non-road node has >= 1 kit house, with no house AABB overlap in plan view.
First record today's Nagarkot figures for these same measures as the baseline. If the baseline is lower than 20% / 6, use 80% of the baseline instead.

**Q2. Do not host the maze in the segmented placer. Keep the gen.ts geometry and dress each node's AABB with kit houses.** Reason: the placer has no 2-D packing, no road nodes and a frozen hash. "Home Street" here means the look and the camera, not the placer.
These Home Street features must survive: the kit houses and doorway frames, poles, the path camera (house bearings come from the graph segments), fork markers, runouts, party walls between joined houses, and the 1 m hazard bands.
Low tier: 55 draw calls or fewer with all ~100 nodes dressed, measured on SwiftShader in T336b before T336c starts. If it is over, merge or instance kit parts per segment.
There is one source of truth per surface: collider solids and decor never sit at the same coordinates (the PR #21 lesson).

**Q3. Home Street-style 90-degree turns in per-segment local frames. The bends sit on the three road terraces, and the reference map is mapped as a descent.** Reason: `relation()` is axis-aligned, so edges are only valid inside a frame. The road terraces are already the only cross-segment links.
The reference map is read as a descent:
- Start = the top of the long spur (ABC down to Chhomrong): a straight opening run with few branches.
- First road terrace = the fork into a LOOP: two branch segments (west: Tadapani-Ghorepani-Ulleri-Birethanti; east: Jhinu-Syauli). Both branches rejoin at the goal terrace (Nayapul).
- A short spur = a dead-end branch off the west branch (the Poon Hill spur).
- An optional middle branch = the dotted Ghandruk route.
The loop is a fork-and-rejoin diamond, so it closes in plan with a monotone descent; the "loop cannot close" worry does not apply. This splits the 5-lane maze into branch segments, which is allowed because the maze may change.
Required tests:
- Plan-view AABB overlap and spacing over all segments: house centres >= 8 m apart, no overlap.
- Every cross-segment edge touches a road node.
- Ground only goes down along each path.
Hazard strips become per-segment, in local frames, not world-z full width.

**Q4. Accept the analysis proposal as written.**
- The clock counts integer ticks from the start of phase 'play'.
- `firstInputTick` = the first tick in 'play' whose `InputFrame` has a move magnitude above the deadzone or any gameplay button bit. Camera drag, the overview key and skipping the flyover do not count.
- `restart()` clears both values.
- time = (finishTick - firstInputTick) / 60.
- Planning before the first input is excluded on purpose (planning is the game).
- A death ends that run. Times are per life, never cumulative.
- The HUD shows 0.00 until the first input.
- Chase keeps `cs.ticks`.
Reason: this is deterministic, it is what the owner asked for, and it ignores UI clicks.

**Q5. Sprint is ON in the new level, and the maze edges are derived with sprint reach (Q1 constraint 4). Sprint is OFF in Dragon Chase via `MODE_OVERRIDES`.** Reason: the new level is the only Classic level, so switching sprint off there would hide the feature the owner approved. The owner also said to keep Chase as it is. tuning.json ships `sprintSpeed` 11, and config.ts DEFAULT mirrors it. Read "defaults equal today" as "no remote value = the shipped tuning.json". Decide this before T336a fixes its constants.

**Q6. Every leaderboard row carries `cfgHash` (a hash of the keys that remote config can override). A board shows only rows that match the live `cfgHash`.** Remote values are read once at run start, clamped, and never change mid-run. Only the sprint set is remote; everything else stays build-time. The entry point is `app/tuning.ts` `resolveCfg`, never core. Reason: times are comparable only under the same physics. This is a T338 plan item; nothing is built now.

**Q7. Narrow interface: `id, label, enabled, levels, bestKey, playKey, rules`. The new level gets a NEW best key (`bhagdori.best.nagarkot-home`).** Old keys stay. `enabled` = false hides an entry from the lobby only; legacy URLs still resolve. Reason: a wide interface would freeze today's chase flags before the dragon is reintegrated. Old l1 and strategy times do not compare with the new level.

**Q8.**
(a) Amend PRODUCT.md in one edit: one new level; first-input offset (not replay traces); hidden modes; no spiral; Chase on endless rows; Classic fixed-line or free-aim (owner Q-A below).
(b) Align ADR 0011 s6 with the code (`houseDress` is on): a doc fix only.
(c) The chunk budget needs an owner decision (Q-B below). Until then, all new code (supabase-js, leaderboard, registry extras) is lazy.
(d) The new level is registered in `BASE_LEVELS`, not `GRAPH_LEVELS`. Its freeze hash is added only after T337 lands; freezing earlier would churn on every iteration.

## 2. Owner decisions needed

**Q-A. Is Classic on the new level fixed-line (maze rules, `lineOnly`) or free-aim?** PRODUCT's non-goal "free-aim in maze is out" conflicts with ADR 0016 "Classic = free-aim".
- 1 (recommended): fixed-line on this level only. The maze is only readable if line options are fixed; ADR 0016 gets a one-line amendment.
- 2: free-aim everywhere. The edge model must then include aimable anchors, and the dead-end proof weakens.
- 3: fixed lines, with free-aim only inside the gold line zones.

**Q-B. The initial chunk is 268 KB gz against the 215 KB budget. Which rule applies?**
- 1 (recommended): freeze at the measured baseline (no growth), then add one card to get back under 215 by lazy-loading the now-hidden levels and modes.
- 2: raise the budget to 270 KB gz in PRODUCT.md.
- 3: block T336-T340 until the chunk is under 215.

**Q-C. What is the success test for the one new level?**
- 1 (recommended): a first-time player finds an escape path within 10 minutes and finishes a clean run in under 2 minutes (both existing tests merged).
- 2: the 10-minute maze test only.
- 3: the 2-minute test only. This needs a smaller maze.

## 3. Card text the Phase 4 plan must rewrite (decided, no owner input)

- T336: the done_when's "identical graph / node-edge equality" contradicts "the maze may change". Replace it with the Q1 acceptance test.
- T337: remove the spiral and the 1.5-turn assert. Use the Q3 layout and tests. Remove the top-down screenshot or build the camera tool first.
- T340: remove the "both modes run the level" requirement and ADR 0017. Keep the hiding, and land it after T336c.
- T339: replace the `trace` argument with `offsetTicks`.
- T338: replace server replay with first-input offset plus server bounds (min time from level length and sprint cap, `cfgHash`, rate limits).
- T334: change "8 -> 11" to 6 -> 11; no carry-cap change is needed (11 < 12); update the stale "~8" in CLAUDE.md and ADR 0001. T333: drop the deploy wording from the title.

REVIEW VERDICT: OWNER INPUT NEEDED: Q-A Classic fixed-line vs free-aim; Q-B chunk budget rule; Q-C new level success test
