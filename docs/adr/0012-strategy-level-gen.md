# ADR 0012: Strategy level generator

Date: 2026-11-11. Status: accepted. Builds on ADR 0011 (strategy maze core). Track S1.
Code: `src/content/strategy/graph.ts` (kinematic model, `hasEscape`), `src/content/strategy/gen.ts` (generator).

## Decision

The strategy level is generated, not hand-placed: a seeded, deterministic layout of exactly 100
houses from the Nagarkot ridge to Bhaktapur. `generateStrategyLevel(seed)` returns ordinary level
JSON (zod-validated by `load.ts`), so the sim and renderer need nothing new.

1. **Grid.** Five lanes (x = -24..24, 12 m apart), 8 m square houses, rows down the 20 degree
   hill. Roof heights are whole storeys: 7, 11 or 15 m over the ground (4 m step).
2. **Segments.** ridge (9 houses, rows of 2, 11-12 m gaps: lines only) -> hillside (15, rows of
   3-5) -> road -> turnings (15, rows of 4-5) -> road -> lower slope (36, rows of 4-5) -> road ->
   Bhaktapur town (25, rows of 4-5, last house is the goal). About 32 rows, about 500 m.
3. **Two routes, built first.** Routes A and B go row by row from the spawn tower to the goal on
   different houses. Each step is checked with the kinematic model and gets what it needs:
   nothing (plain jump), a balcony (land low, climb), a cushion (cream, a drop that would kill),
   a trampoline (one storey up, or two via a balcony), or a zipline (gold, wide gap or lethal
   drop). A feature is only placed on a route where the step fails without it. A fails: the seed
   is rejected. B fails: B ends there (a long dead end) and starts again at the next road.
4. **Decoys make the maze.** Every other house hangs sideways off a placed neighbour: level with
   it, or one storey lower (60-85% depending on segment). One storey down is the commitment: you
   can hop over, you cannot get back (4 m is out of ledge-grab reach). Decoys get random
   cushions, balconies, pads and lines, some of which rescue and some of which lead further in.
5. **Dead ends are measured on the real graph.** After placement the graph is rebuilt from
   geometry alone. Dead-end roofs (reachable, goal unreachable) must number 8 to 20. Above 20 the
   generator opens some (cushion below, pad or line here); under 8 the seed is rejected.
6. **Acceptance.** `levelValid`: goal reachable, 100 houses, at least 2 edge-disjoint routes,
   at most 2 unreachable roofs, dead ends in range. `buildStrategy(seed)` takes the first of
   seed, seed+1, ... (up to 64) that passes; if none has 2 routes it accepts one with 1.
7. **`hasEscape(graph)`** is a pure BFS over `{n, edges, start, goal}`.

## Readable choice (colour language)

- Gold = interactive: line zones and ropes. One per house at most, left of the lane centre.
- Cream = safe landing: cushion roofs and trampoline pads (pad right of centre, never under a zone).
- Terracotta = danger: the ground everywhere (hazard strips) and plain roofs after a long drop.

The generator only emits `lines`, `cushions`, `tramps`, `hazards` and `style` (0 road, 1 wall,
2 roof). The colours are the renderer's job (track S2); the hazard tint is not checked here.

## Numbers

All reach limits come from `DEFAULT_TUNING` (g 9.81, run 6, walk 3.5, jump 4.5, air drag 0.05,
landing.vyRoll 13, tramp.vUp 9, climb.reachMax 2.2, climb.vyMax 8, rope 4-35 m and 10-55
degrees, handToFeet 2.0). Geometry constants (in `gen.ts` / `graph.ts`):

| Constant | Value | Why |
|---|---|---|
| Storey | 4 m (7/11/15) | one up sideways is beyond jump apex + grab reach; one down is survivable sideways |
| Row gaps | 6, 7 m; wide 11, 12 m | 6-7: level jump is comfortable; 11-12: no jump or bounce crosses, a line does |
| Road | 10 m deep, deck 5 m over its uphill ground, 4 m gaps | 7 m roof drops onto it, 11 m roof needs its line; from it 7/11 are jumps, 15 needs the pad |
| Row before a road | heights 7/11 only | 15 m is steeper than rope.maxSlopeDeg |
| Spawn | 15 m tower, lane 2, 6 m gap | A leaves by jump/pad/cushion, B by the tower's one line |
| Goal | 5 m cushion roof, 7 m gap | A leaps onto it, B lines in from the side |
| Balcony | 2 m deep, 2 m under the roof, uphill face | inside climb reach |
| Pads / zones | 3 x 3 m on the downhill edge | zone at lane centre -2, pad at +2 |
| Anchor | 2.6 m over the target, 2.5 m in | feet arrive 0.6 m above the roof |
| Hazards | 4 m strips, 120 m wide, top 0.2 m over the slope at the uphill edge | never rises to a balcony or deck (old single boxes could) |
| Model margins | landing reach +0.3 m, landing speed -0.4 m/s, grab reach -0.15 m | routes use only comfortable moves |

Default seed 20261111 under committed tuning: 100 houses, 3 roads, 32 rows, 504 m (z down to
-500), 115 nodes, 242 edges (177 jump, 5 tramp, 32 zip, 12 climb, 9 grab, 7 tight), 9 dead-end
roofs, 0 unreachable, 2 disjoint routes; 32 lines, 6 pads, 10 cushions, 12 balconies. Over
200 seeds: 79 valid at first try, dead ends p10/p50/p90 = 3/7/13, generation about 1 ms a seed.

## Tradeoffs

- **Modelled, not proven.** Edges come from closed-form kinematics, not from running the sim
  (the validator is a non-goal). Routes use only moves with margin. To keep dead ends honest the
  graph also carries `grab` (ledge grab + mantle) and `tight` (lip landings at the sim's exact
  limits) edges; routes never rely on them.
- **Two routes everywhere** instead of 1/2/n per section: simpler, and a lost B already gives
  the one-route stretches. About 60 of 100 houses are route houses, so dead ends top out near 20.
- **One-storey drops between rows are near the lethal line** (13.4-13.6 m/s against 13). They
  are treated as lethal; a cushion or line is placed where a route needs one.
- **Core tuning untouched.** An uncommitted `tramp.vUp 9 -> 11` change found in the worktree was
  not adopted (S0 owns it). The generator reads the config, so it adapts if S0 changes it; the
  default seed may then roll forward to the next valid one.

## Not checked

- Momentum carry (landing speed above run speed) can beat a modelled dead end.
- Zip ride feel and arrival speed; `hook.ts` firing rules were not read.
- Landing on a tramp pad at the far end of a roof bounces instead of landing.
- Terrain and fog must cover z down to about -500; hazard tint; real phone; feel.
