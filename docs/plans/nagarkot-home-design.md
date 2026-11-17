# T336a design: `nagarkot-home` height model and generator

Date 2026-11-17. Premium design seat (Opus), for review by the Opus-alias seat (O1) before Sonnet builds. Nothing was built or run, and every number below is worked out by hand from tuning.json, so each one is unverified. Mission: PRODUCT.md (to 17f) was read. This design does not work against the purpose or the non-goals: it is one Classic level, fixed lines, finish in under 2 minutes, and a pure-graph test only (no sim validator). One deviation needs sign-off: the node-disjoint rule in section 5. Owner rules followed: new seed `NAGARKOT_HOME_SEED = 20261117` and a new key, with today's defaults untouched.

## 1. Height model
- **Ground is stepped per row, not the 20 degree plane.** `groundY(row) = planeY(zDown + 4) - drift[row]`. `zDown` is the row's downhill edge, so the plane is read at the downhill house centre; for an 8 m row that is `planeY(zc)`. `drift[row]` is 0, or a whole number of 1.2 m terrace steps (section 2). Every house in a row stands on one flat terrace. A node of 3 joined houses (24 m) is cut up to 5.8 m into the slope at its back, behind a retaining wall that T337 terrain draws.
- **Under a roof** there is only the kit body, from `groundY - 2.0` (HK.bodyBelow) up to the deck. Hazards follow the steps: each row owns z from half the gap before it to half the gap after it, with a 1 m hazard band whose top is `groundY + 0.2`. This replaces the plane strips for this level only. Under a road row the top is `deck - 1.0`, inside the road solid.
- **Kit table** (replaces H_*): `KIT_DECK = [3.2, 6.0]` over groundY (0.4 + 2.8 x storeys). Nothing else sets a height.

| Old constant | Nagarkot (frozen) | nagarkot-home |
|---|---|---|
| STOREY | 4 | 2.8 (HK.storey) |
| H_LOW/MID/HIGH | 7/11/15 over planeY(zc) | 3.2 / 6.0 over groundY(row); no third height |
| BALCONY_DROP, BALCONY_DEPTH, width | 2, 2, 8 | 2.8 (HK.balconyTop 3.2 on a 2-storey house only), 1.2, 3.0 (kit balcony on face 2, uphill) |
| ROAD_LIFT 5 (over the plane at the road's uphill edge) | | `ROAD_UNDER = 1.8`: road deck = groundY(front row) - 1.8. A 1-storey front roof drops 5.0 (plain jump); a 2-storey drops 7.8 (line only: run-off lands at 12.4 > 12.2) |
| ROAD_FRONT_HEIGHTS [H_LOW, H_MID] | | [3.2, 6.0]; new `ROAD_BACK_HEIGHTS = [3.2]`: the row after a road is 1-storey only. Its drop from the road is 4.5, its climb back is 4.5 > 3.08 (no way back) |
| SPAWN_H 15 | | 6.0 (2-storey tower) |
| GOAL_H 5 | | 3.2 (1-storey cushion roof) |
| HOUSE_HALF, LANES, GRADE | 4, pitch 12, tan 20 | unchanged: the 4 m lateral gap keeps level side-steps possible (run-jump gap <= 4.38) |

## 2. What the 2.8 m storey does to leaks, and the rules
- **Grab ceiling.** Jump apex is 4.5^2/2g = 1.03 m, plus a reach of 2.2 - 0.15 = 2.05, so a grab tops out at **3.08 m** above the feet whatever the run speed. A 4 m storey was always out of reach; one 2.8 m storey is always grabbable. At run, 2.8 up is grabbable across a 1.7-4.5 m gap; at sprint 11 m/s, up to about 7.9 m. STEP_MAX 0.3 (0.5 with parkour airStepUp) is never hit, because kit decks differ by 0 or 2.8 within a row.
- **Lateral rule (same row, |dTop| = 2.8): a 1.2 m tall parapet on the LOWER node's facing face.** Going up, the hero would have to cross their own tall parapet: they cannot vault it (vault maxH 1.1), and mantling over leaves no run-up, so the model launches at walk speed from `y + 1.2` and cannot reach. Going down, the arc is still 3.5 m over the lower deck at its lip, so it lands. Lateral traps survive and the climb-back is gone. Level pairs keep low (0.45) parapets.
- **Band-to-band rule.** For every cross-row pair (lane-overlapping or diagonal), the drop must be >= 4.0, or <= 2.8 with a downhill edge in the graph. A drop between 2.8 and 4.0 rerolls the lower house's storeys. Drops of 2.3-2.7 do occur: a 1-storey upper over a 2-storey lower at gap 6/7, where the ground step is 5.1-5.5. At run they cannot be climbed back (gap 6 > 5.0). From a fast launcher (sprint runway, zip target with carry) they can.
- **Leak repair (terrace step, only where found).** After each attempt, `findUphillLeaks` lists every edge whose target row is uphill of its source row, except MOVE_CLIMB. For each leak, `drift[sourceRow..end] += TERRACE_STEP (1.2)`; the 2.3 m climb becomes 3.5 > 3.08. The same seed is then re-attempted. The parameter is per row, at most `TERRACE_MAX = 2` steps per row and 3 passes; if leaks remain, move to the next seed. Faces that carry a declared jump, grab or tramp edge get a full-width run-out (`runout {s: 0, w: 7.5}`, an existing HouseSpec field), so route faces have no parapet. Zip zones get the usual 1.6 m run-out.

## 3. Sprint reach (graph.ts, named constants, default path untouched)
```
export const SPRINT_SPEED = 11;            // m/s; swap on T334 merge -> tuning.hero.sprintSpeed
export const SPRINT_STRIDE_M = 1.70;       // run 6 / (2 x runCadence(6) = 3.53 steps/s), heroPose.ts:462; swap on T334
export const SPRINT_STREAK_M = 7 * SPRINT_STRIDE_M;  // 11.9 m
export const SPRINT_RAMP_M = 6.0;          // ASSUMED 6 -> 11 m/s speed-up distance; swap on T334 (ADR 0018)
const RUN_UP_M = (run * run) / (2 * hero.accel);     // 0.45 m
export const SPRINT_RUNWAY_M = RUN_UP_M + SPRINT_STREAK_M + SPRINT_RAMP_M; // 18.35 m
```
- **Strict (route) model.** `launches(a, rel, opts)` returns the frozen `LAUNCHES` const unchanged when `opts` is undefined. With `opts.sprint` it returns `LAUNCHES` plus `[hero.jump, SPRINT_SPEED]`, but only when `extentAlong(a, rel) - 2R >= SPRINT_RUNWAY_M`. Sprint jumps count as MOVE_JUMP; no new MOVE_* id, so `moves[]` stays 6 long.
- **Leak (measure) model** (`opts.leak`): `vLeak(a) = max(run, sprintV(diag(a) - 2R), a.zipIn ? landing.carryCap : 0)`, where `sprintV(L)` ramps from 6 to 11 m/s over L in [12.35, 18.35] m. These launches decide MOVE_TIGHT edges in any direction. Grabs sample vh from 1 m/s to vLeak in 0.5 m/s steps. Non-tall faces launch from `y + 0.45` (an auto-vault off a low parapet). A tall face blocks arrivals unless the arc is above `y + 1.2` at the lip, and lifts the ledge by 1.2. A new `relation(a, b, diag)` returns the AABB-to-AABB Euclidean gap for pairs that overlap on neither axis (jump, grab, tight only).
- **Measured reach**, run / sprint (gap m): flat 4.38 / 8.86; drop 2.8: 6.79 / 13.3; drop 4.1: 7.56 / 14.7. Effect: a 1-storey runway node beats an 11-12 m gap onto a 2-storey only by sprinting.

## 4. Generator changes (minimal diff)
- **gen.ts:**
  - `GenParams` holds every constant above plus segments, heights, kit flag and edge opts. `NAGARKOT_PARAMS` copies today's values verbatim; `HOME_PARAMS` holds the new ones. `P` is threaded as a last, defaulted argument through `roofY`, `roadY`, `buildNodes`, `routeMove`, `link`/`linkWith`, `linkRoad`, `lateral`/`attach` (`STOREY` becomes `P.storey`), `measure` (`buildEdges(nodes, P.edge)`), `layoutToLevel`, `attemptStrategy(seed, P, drift?)` and `levelValid(s, P)`.
  - `buildStrategy()` keeps its signature and cache. A new `buildNagarkotHome()` has its own cache and runs the leak-repair loop.
  - Data: `House.depth` (1 or 3 joined kit houses along z, default 1) and `Layout.drift[]` (default 0).
  - A node's footprint is ONE AABB: 8x8 holds 1 kit house; an 8x24 runway holds 3 kit houses of the same storeys (party faces 2/3 between them) on one terrace. There is no lateral joining.
  - Long rows: HOME segments set `longBands` (ridge 0, hillside 1, turnings 1, lower 1, town 0). In a long row every node is 3-deep and aligned to the row's downhill edge, and the gap after it is drawn from [11, 12] (the sprint gap).
  - `layoutToLevel(L, P)` with `P.kit` calls `emitHouse(HouseSpec)` from houseKit, a read-only import; no kit edit, so the home-street/valley freeze is safe. It sets stairs null, awnings [], the `tall` and `runout` faces from `assignParapets(L, nodes)`, `balcony: 2` on 2-storey balcony houses, and `parkour: 1, climb: 1, lineOnly: 1`. Tramps, cushions, zones and anchors stay as today's boxes (the anchor equals the kit pole: 2.6 up, 2.5 in).
  - New functions: `assignParapets`, `findUphillLeaks`, `groundY`, `steppedHazards`.
- **graph.ts:** `MazeNode` gains optional `tall?: number` (face bitmask) and `zipIn?: boolean`. `EdgeOpts {parkour, sprint, leak, diag}` is threaded through `buildEdges`, `moveOf`, `jumpOk`, `grabOk` and `tightOk`, all optional, so the default is byte-identical. New `nodeDisjointPaths(g, uncapped)` (node-split max flow) and `estimateRoute(g, nodes)` (Dijkstra).
- **Size for the 80 s cap:** 15 house rows: ridge 2 (houses 2-2, gaps 11-12), hillside 3, turnings 3, lower 4, town 3 (houses 3-5), plus spawn, goal and 3 roads. That is about 62 roof nodes, about 8 balconies and 3 roads (about 73 nodes), and about 89 kit houses (62 + 2 x about 13.5 in the long rows). The run is about 350 m along z; the route is about 386 m including side-steps.
- **Time estimate:** about 286 m run/jump / 6 = 47.7 s, about 100 m of zip at a mean of about 7.5 = 13.3 s, plus about 4 mantles/climbs = 4 s, so **about 65 s** against 80 s. Mean zip speed per edge = (rope.launchSpeed + min(rope.terminal, sqrt(launch^2 + 2g x drop))) / 2. If the estimate exceeds 80, drop one lower row, then one town row.
- **Targets:** `deadMin = ceil(0.095 x reachable)`, about 7 nodes; DEAD_MAX 20; `MAX_SEED_TRIES` 64.

## 5. Acceptance test `tests/content/nagarkotHome.test.ts` (pure graph, from emitted LevelJson)
**Rebuild the nodes from `level` only.** Shared helper `rebuildNodes(level)`:
- **Roofs:** group STYLE_BODY solids by top y. Join groups whose plan rects share an edge and have the same top. Each union must be one rectangle, and it becomes a node (kit house count = group size).
- **Faces:** STYLE_PARAPET solids whose min y is the deck and which lie on a node's boundary strip give that face; `tall` if height >= 1.2 - 1e-6. Rails at balcony height are ignored. A face with no parapet is open.
- **Balconies:** each STYLE_BALCONY solid becomes a node (rect, top y). `up` is the roof whose face 2 it touches.
- **Roads:** each style-0 solid becomes a road node.
- **Features:** a node is a cushion if cushion boxes at y cover its area minus the pad rects. Tramp x centres come from the tramp boxes at y. `zipTo` is the node whose rect holds `anchors[line.anchor]` with `y - 2.6 = deck`; `zipX` is the zone centre x; `zipIn` follows from `zipTo`.
- **Start and goal:** `start` is the node under `spawn`, `goal` the node under the `goal` box.
- If this rebuild is impossible for a field, the test must fail loudly, not skip it.

**Then** run `buildEdges(rebuilt, HOME_PARAMS.edge)` (parkour, sprint, leak, diag) and assert:
1. Rebuilt nodes equal the generator's nodes field by field after an id remap by (x0, z0, y).
2. **Zero undeclared edges:** the rebuilt edge set equals the generator graph, and no edge goes to an uphill row except MOVE_CLIMB.
3. G is reachable from S.
4. **>= 2 node-disjoint S-to-G paths, with the 3 road nodes uncapped.** Roads are full-width terraces where every route must meet: they are cut vertices by design (Q3 fork/rejoin), so the literal rule cannot hold. This means >= 2 disjoint paths between consecutive junctions. Reviewer/owner to accept.
5. Dead-end nodes (reachable, cannot finish) are >= 9.5% of reachable, in >= 6 weakly connected dead-end branches.
6. Every non-road node has >= 1 kit house. No two STYLE_BODY plan rects overlap in area (> 1e-6; touching party walls are allowed).
7. The `estimateRoute` metres and seconds are logged and written to `summary.routeM/routeS`, and seconds <= 80.
8. **Frozen output:** a pin test written FIRST, before any gen.ts edit, with fnv1a of `JSON.stringify(buildStrategy().level)` plus nodes 118 / edges 261 / dead 14. It must stay green, and `graphFreeze` must not change.
9. After T334 merges: the graph sprint constants equal `tuning.hero.sprint*`.

## 6. Risks for the reviewer to attack
1. **T334 streak semantics.** If curves or circles on one roof count toward the streak, or landing carry (cap 12) persists, every 8x8 roof is a fast launcher. The 2.3-2.7 m cross-row climbs then leak everywhere, and terrace drift stacks up (grade drift, more seeds fail). T334 must reset the streak when the heading changes by more than about 30 degrees; check this on merge.
2. **Roads are cut vertices,** so section 5 test 4 is reworded. A real 2-node-disjoint level would need split road terraces, which goes against "3 road nodes".
3. **The leak model changes the graph a lot.** It adds diagonal jumps, carry from zip targets and partial sprint. Dead ends may fall under 9.5% / 6 branches, or few of the 64 seeds may validate; measure the seed pass rate first. The frozen Nagarkot likely has unmodelled diagonal edges too (out of scope).
4. **Lower-face tall parapet assumes no useful launch from a 0.25 m parapet top** after a mantle (mantleFwd 0.3). This is unverified in the sim; one focused core unit test is allowed.
5. **Stepped ground versus the drawn plane, and the chunk.** Long rows are buried up to 5.8 m at the back, so T336b/T337 must draw terraces. Importing houseKit into gen.ts may pull kit code into the frozen initial chunk; the controller measures this.

## 7. Review fixes applied (O1 seat, `nagarkot-home-review.md`, PASS WITH FIXES) and controller scope calls
- F1: repair step is `drift += 1.2 x ceil((4.0 - dy) / 1.2)` (2 steps), `TERRACE_MAX = 4` per row. F2: leak check = under leak opts no MOVE_GRAB/TIGHT edge climbs more than STEP_MAX (jumps cannot); lateral leaks are fixed on a DECOY by a per-node ground step (`lower`), else next seed.
- F3: `ROAD_UNDER = 2.7`; the row after a road gets one extra 1.2 m step (road-to-back drop 3.56 -> 4.76). F5: zip carry (12 m/s) only on downhill moves; uphill/lateral use run or sprint.
- F6 (owner told): >= 2 internally node-disjoint paths in each section S->R1, R1->R2, R2->R3, R3->G; one node-split max flow with unlimited capacity on S, G and the 3 roads; route-grade edges only (jump, tramp, zip, climb). A literal S-G pair cannot exist (roads are cut vertices).
- F7: pin test records `deadEnds / reachable` (14/118 = 11.9%, 7 branches); threshold = 0.8 x that share, branches >= 6. F9: `estimateRoute` costs run (arrival point to departure lip, road crossings included) + flight/zip chord, route-grade edges only. F10: `SPRINT_JUMP_VY` named. F11: test 1 ignores `id`/`house`.
- Scope cuts (controller, one 150 min session; review F12 suggested two): (a) no `emitHouse`/tall parapets in T336a: dressing is T336b, so the lateral trap is a per-node ground step, not a 1.2 m parapet, which also removes the F4 parapet-top hole; (b) kit houses are a derived tiling of each node footprint (8 m cells), asserted by the test; (c) the leak model launches at SPRINT_SPEED from every node (no streak semantics needed, T334 risk 1 removed), diagonal pairs not modelled (not verified); (d) F12 split and F8 pole are T336b's.
