# L1 level layout: the packed hill village (for the decor agent)

Source of truth: `tools/genLevel.mjs` (run `node tools/genLevel.mjs` to rewrite `content/levels/l1.json`).
Every number below is what the generator writes today (2026-11-08). Units are metres, Y is up, and the hill descends toward -Z.
If this file disagrees with the generator, the generator is right.

## Numbers at a glance

| Item | Value |
| --- | --- |
| Route houses | 7, plus the start roof S0 |
| House spacing (z) | 18 m centre to centre, a 9 m gap between houses |
| House footprint | 8 m (x) by 9 m (z) |
| Lane alternation | house centres alternate between x = -5 and x = +5 |
| Roof-to-roof drop | 4 m |
| Wall height | 8 m from roof top to the plot (2-3 storeys); roof slab 0.6 m |
| Anchors | 1.6 m above the roof top, 1 m uphill of the roof centre |
| Rope lines | 18-22 m long. Angle hand to anchor: 13.9° (hop 1) and 11.4° (hops 2-7) |
| Route grade | about 12.5° (4 m down per 18 m) |
| Rope `maxLen` | 35, unchanged |
| `vCling` | 7.5, unchanged |

The spec asks for a 25-30° hillside, but the route cannot follow one. With 8-15° rope lines and walls of constant height, the route runs straight down the fall line, so the route ground can only slope as steeply as the ropes do.
Draw the steeper slope on the flanks (|x| > 30, outside the plots) or across the slope.

## Hill surface (ground height by x, z)

The ground under the route is a staircase of flat plots. These are style 0 colliders, solids 19-26. There is one plot per house, and each plot is 60 m wide (|x| ≤ 30).

| Plot | Top y | z range | Carries |
| --- | --- | --- | --- |
| 0 | -8 | -9 .. 30 | S0 (spawn) |
| 1 | -12 | -27 .. -9 | house 1 |
| 2 | -16 | -45 .. -27 | house 2, decoy A |
| 3 | -20 | -63 .. -45 | house 3 |
| 4 | -24 | -81 .. -63 | house 4, decoy B |
| 5 | -28 | -99 .. -81 | house 5 |
| 6 | -32 | -117 .. -99 | house 6, decoy C |
| 7 | -36 | -148 .. -117 | house 7, goal area |

As a function: for |x| ≤ 30, `ground(x, z) = -8 - 4 * i`, where i is the plot whose z range contains z (`i = 0` for z > -9, otherwise `ceil((-9 - z) / 18)`, capped at 7).
Past |x| = 30 there is no collider: a hero who walks off a plot's side falls to the kill slab (y -90..-89).
`placeDecor.groundAt` returns the plot top inside |x| ≤ 30. Outside that it returns `farPlaneY(z) = 0.22 * z - 10`, the visual far plane, which runs roughly 2 m under the plots.

## Route houses

A roof is style 2 and its wall is style 1. The tests index them as `solids[2i]` (roof) and `solids[2i+1]` (wall) for house i ≥ 1.
"Facing" is the lane-facing wall: it carries the balcony at top - 3 m and looks toward x = 0.

| i | Roof box min..max | Wall box min..max | Facing | Anchor |
| --- | --- | --- | --- | --- |
| S0 | (-5, -3, -4)..(5, 0, 4) | none: the visual brick base runs down to plot 0 | (spawn, faces -z) | (none) |
| 1 | (-9, -4.6, -22.5)..(-1, -4, -13.5) | (-9, -12, -22.5)..(-1, -4.6, -13.5) | +x | (-5, -2.4, -17) |
| 2 | (1, -8.6, -40.5)..(9, -8, -31.5) | (1, -16, -40.5)..(9, -8.6, -31.5) | -x | (5, -6.4, -35) |
| 3 | (-9, -12.6, -58.5)..(-1, -12, -49.5) | (-9, -20, -58.5)..(-1, -12.6, -49.5) | +x | (-5, -10.4, -53) |
| 4 | (1, -16.6, -76.5)..(9, -16, -67.5) | (1, -24, -76.5)..(9, -16.6, -67.5) | -x | (5, -14.4, -71) |
| 5 | (-9, -20.6, -94.5)..(-1, -20, -85.5) | (-9, -28, -94.5)..(-1, -20.6, -85.5) | +x | (-5, -18.4, -89) |
| 6 | (1, -24.6, -112.5)..(9, -24, -103.5) | (1, -32, -112.5)..(9, -24.6, -103.5) | -x | (5, -22.4, -107) |
| 7 | (-9, -28.6, -130.5)..(-1, -28, -121.5) | (-9, -36, -130.5)..(-1, -28.6, -121.5) | +x | (-5, -26.4, -125) |

Other gameplay solids. These are all colliders, and the dressing must not bury them.

- Decoys (style 3), solids 16-18. Danger houses, each standing on plot 2, 4 or 6, at x -15.5..-8.5 and roof y = route top - 0.6. Their anchors are at (-12, -6.4, -35), (-12, -14.4, -71) and (-12, -22.4, -107).
- Balconies (style 1). On the lane face, 1.8 m deep, top at roof top - 3, running along the roof's z length minus 1 m at each end.
- Parapets and tank plinths (style 4, 4 per house: 3 curbs of 0.4 m and 1 plinth of 0.8 m).
  - The uphill (arrival) edge is open.
  - The downhill edge has a curb on its outer half only.
  - The lane edge has a curb on its uphill half only.
  - The outer edge has a curb except for its last 1.5 m uphill, where the rescue stair arrives.
- Fences (style 1). 2.6 m high and 0.3 m thick, across the whole plot (x ±30) on the downhill edge of plots 0-6.
- Rescue stairs (style 1). One per house, including S0. They are 1.4 m wide and sit 0.6 m off the outer wall, at x ±9.6..±11 (S0 at x 5.6..7). They rise toward +z in steps of 0.348 m, from 2.5 m downhill of the house to a platform 0.35 m under the roof at the uphill end of the outer wall. The platform spans from the wall face to the stair's outer edge.
- Goal (haystack trigger): (-12, -34, -143.5)..(6, -30, -131), entered by running off roof 7's downhill edge.

Why the plots are fenced: a fall from a roof into its own plot is 8 m, which a hero survives. Without fences, a fallen hero could walk down the village to the goal.
Each fence is higher than jump height plus edge-grab reach. The stairs make sure a survivable fall is never a dead end.
A run that clears the fence lands on the next plot down, 12 m below, and that kills (asserted in `tests/content/terrace.test.ts`).

## Lane corridor (keep clear of scenery)

The corridor is |x| < 16, for z from 12 down to -151.5 (`laneZRange`: from the highest roof z + 8 to goal.min.z - 8). Its height runs from the plot top to the sky.
The rope lines run between x = -5 and x = +5, and the camera orbits 4.5 m behind the hero.
Only trees, at most 6 m above the ground (the `violatesLane` rule), and the level's own dressing may enter it.
Gameplay colliders inside the corridor: the houses (|x| 1..9), the rescue stairs (|x| 9..11), and decoys A-C (x -15.5..-8.5).

## Free area for filler houses

- **16 ≤ |x| ≤ 30, inside a plot's z range.** This ground is reachable: a hero who falls into a pen can walk there.
  - Anything placed here has to be a real collider, which is a gameplay change and needs a level test.
  - Otherwise keep it low and clearly non-solid: trees, pots, a cart.
  - Keep 0.5 m clear of the fences (on each plot's min z edge) and the decoys.
  - Ground height is the plot top.
- **|x| > 30 (both flanks, up to the ±60 lot edge and beyond).** The hero never stands here alive, so it is free for filler houses, the pagodas and trees.
  - The ground is drawn by the outer lots (`lotY`: plot height, one slice per plot) and the far plane `0.22 * z - 10`.
  - The steeper 25-30° look belongs here: stack the filler houses so each row steps down more than the route does.
- **Beyond the goal (z < -148) and above the spawn (z > 30).** Free.

Filler houses are not built yet. `SCENERY_HOUSES` is still `false` in `placeDecor.ts`.
