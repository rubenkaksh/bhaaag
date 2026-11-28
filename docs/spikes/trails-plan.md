# Ride trails plan (owner 2026-11-27)

Status: BUILT 2026-11-27 (option B), uncommitted, not verified on device. See "Build result" at the end. Scout-first entry: `~/knowledge/scout/games/ride-trails-terrain-threejs.md`.

## Owner intent
- The hunting game is two phases: **1. ride** to the camp site, **2. camp and secure** it through the night.
  The current spike build "is not what I intended", but it stays as it is: deferred, to be worked on later.
  (Reading recorded here: the current two spikes are parked as-is; the next work is the ride.)
- "Make the ride part more awesome by building actual trails instead of straight grasslands."
- Earlier the same day: "rocks and rivers and downhills and uphills where horses and bike both have a chance of
  falling and sliding over which ends the game, or we could have 3 lives."

## Today (what the trails replace)
- `src/spikes/ride.ts`: the course is a straight corridor along +z (horse 900 m, bike 1,600 m, half width 14 and 16 m),
  ground at y = 0, walls that scrub speed, obstacles (log, rock, ramp, mud) every 18-42 m, enemies spawned 45 m
  ahead or 40 m behind on the same z axis. Fall = never; damage from obstacles and enemies, 10 HP.
- `src/spikes/play/world.ts`: one 900 m wide flat plane, instanced trees on both edges, the painted backdrop.
- Speeds: horse 13 m/s (boost 17), bike 22 m/s (boost 30).

## Own code that already covers pieces (Reuse)
- `src/adapters/render/terrain.ts`: `setTerrainField(f)`, a ground field `(x, z) -> { h, d }` that follows a road
  polyline (ADR 0015 segmented graph levels, Home Street turns), and `terrainY` used by `groundMesh.ts` and
  `placeDecor.ts` to seat decor on the ground.
- `src/adapters/render/chase/endlessGround.ts`: endless vertex-coloured hillside strip with instanced trees,
  re-snapped every 108 m (Dragon Chase). Pattern for streaming ground on phones.
- `src/core/chase/rows.ts`: `hillY(z)`, `GRADE`: a sim-side height function the view reads.

## What "done" looks like (owner will judge on the phone)
- The ride follows a visible trail that winds, climbs and drops, with rocks and at least one river ford.
- Slopes change speed, and a bad line on a steep slope or a ford can make the mount fall or slide.
- Both spikes stay playable at 390x844 and 844x390, Low and High, with the bot still finishing a run.

## Scout result (2026-11-27, full entry in the scout file above)
- No library does "trail over terrain" whole. Reference games: Lonely Mountains: Downhill ($3.99), Descenders
  ($24.99, on mobile since 2022), Alto's Odyssey. Browser MX/MTB games were not checked.
- **THREE.Terrain** (MIT, pushed 2026-11-19, 929 stars, npm 3.1.1, peer three >= 0.160; we pin 0.187): height-field
  generators and decoration, no road or spline carving. It builds three geometry, so the sim (which must not import
  three) cannot read heights from it without baking them into an array first.
- three.js `webgl_geometry_terrain` example (MIT): a plain height-field reference, stock material.
- simplex-noise (MIT, 1.8k stars) fails the freshness filter (last release 2024-07-26).
- Assets: Kenney Nature Kit and Quaternius are CC0 (rocks, trees). Using them means the GLB question again
  (see the assets evaluation in README.md); primitives stay the default.
- two threejs-discourse threads on roads along splines in terrain (50365, 69461), not read yet.

## Options
| | Option | Tier | Effort | Risk |
|---|---|---|---|---|
| **A (recommended)** | Pure-TS trail in `src/spikes`: a centreline spline plus `groundY(x, z)` and `trailInfo(x, z)` (lateral distance, grade, camber, surface). The view builds one vertex-coloured strip mesh from it, like `EndlessGround`. No new dependency. | Reuse own code + M2 | medium | low |
| B | Same trail, but the terrain around it from THREE.Terrain, baked to a height array the sim samples. | M1 Adapt | medium-high | new dependency (needs your OK), two height sources to keep in step |
| C | Hand-authored trails: one fixed route per spike, authored as control points, like the level JSON files. Can be combined with A. | M2 | low per trail | less replay than a seeded route |

## Design sketch for A (to confirm before building)
1. **Route.** A centreline of control points (Catmull-Rom), seeded per run: gentle S-bends, a climb, a long descent,
   one or two switchbacks, and one ford across a river in a valley. Horse 900 m, bike 1,600 m as today.
2. **Ground.** `groundY(x, z)` = the trail profile along the route, blended into rolling hills away from it
   (cheap value-noise in TS, no dependency). The trail is a flattened band about 6-10 m wide; off the trail the
   ground is rougher and slower but rideable up to a bank.
3. **Riding on slopes.** Grade adds or removes speed (uphill slows, downhill speeds up). The mount's `y` follows the
   ground; jumps lift off it.
4. **Falls and slides (your idea).** A fall happens when (a) you take a bend on a downhill too fast, (b) you ride
   across a steep side slope, or (c) you hit the ford at speed. Mud and wet rock make the bike slide (low grip);
   the horse stumbles less but is slower. A fall ends the run, or costs a life (your call, below).
5. **Rocks and river.** Rocks sit along the trail edges and in the rough as obstacles; the river runs down the valley
   with a shallow ford on the trail (slows, can make you fall) and deep water off it (blocked).
6. **Enemies and camera.** Spawns move from "z ahead/behind" to "distance along the trail ahead/behind". The ride
   camera follows the trail heading instead of +z.
7. **View.** One strip mesh along the route (vertex colours: dirt trail, grass, rock), instanced trees and rocks,
   a water ribbon for the river. Stock materials, Low and High budgets as today.
8. **Bot and tests.** The bot steers to the centreline; `tests/spikes/bot.test.ts` keeps its win counts, and new
   unit tests cover `groundY`, grade speed and the fall rules.

## Open questions for the owner
1. A fall ends the run, or 3 lives?
2. One seeded route per run, or a fixed hand-made route per spike (option C)?
3. "Not what I intended" reading: is the current ride-then-camp structure right, and only the content wrong?

## Owner choice (2026-11-27): "Try THREE.Terrain" (option B)
Scout-first proof in a scratch folder (three 0.187.0 + three.terrain.js 3.1.1 from npm, Node 22). The proof script is
kept in this file's history only; it was 40 lines:
- `Terrain({ heightmap: PerlinDiamond, xSegments: 63, ySegments: 255, xSize: 300, ySize: 1200, maxHeight: 25,
  minHeight: -5, random: createSeededRandom(seed), after(zs) { carve } })`. `after` gets the plain height array, so
  the trail is carved there: an 8 m flat band that blends into the hills over 10 m, following a centreline `trailX(t)`.
- Heights export with `TerrainNS.toArray1D(geometry.attributes.position.array)` into a `Float32Array`; a 10-line
  bilinear `groundY(h, x, z)` samples it with no three import, so the sim can own the array.
- **Deterministic:** the same seed gives identical heights; a different seed changes them. **Build time: 28 ms**
  (Node, M-series) for 16,384 vertices.
- Trail grade with these settings peaks at 28%: tune with the height range and the carve smoothing.
- **Gotchas:** (1) the library reads `HTMLCanvasElement` and `Image` even with a procedural heightmap, so it throws in
  Node: Vitest needs two one-line class stubs (or the jsdom environment) for any test that builds terrain.
  (2) One 63x255 tile is 32,130 triangles, as much as the whole scene today; Low needs about 31x127 (about 8k).
  (3) No TypeScript types ship with it: a small `.d.ts` for the parts we use. (4) It is a new runtime dependency:
  the owner's pick above is the go-ahead (CLAUDE.md "ask before adding dependencies").

Build plan for B, once the open questions below are answered: add `three.terrain.js` 3.1.1; generate the terrain in
the view at run start from the run seed, hand the height array and the trail centreline to the ride core, which
samples `groundY` and grade; the rest follows the design sketch for A (falls, ford, camera, spawns along the trail).
Not verified in a browser or on a phone yet.

## Owner answers (2026-11-27)
1. Falls: **3 lives**. A fall costs a life and respawns the rider on the trail a few metres back; the third ends the run.
2. Trail: **fixed per spike** (one horse trail, one bike trail, the same every run so it can be learned). The terrain
   seed is a constant per spike, not the run seed; enemy spawns can still vary with the run seed.
3. Two-phase reading: not answered yet (ride-then-camp structure kept; current spike parked as-is).

## Build result (2026-11-27)
- **Code:** `src/spikes/trail.ts` (three-free: spec, `trailX`, `groundY`, `waterDepth`, `carveTrail`),
  `src/spikes/trailGen.ts` (THREE.Terrain PerlinDiamond noise, carved in `after`, baked to a Float32Array, cached),
  `src/spikes/play/terrainMesh.ts` (vertex-coloured terrain in 160 m chunks, water strip). The ride core samples the
  baked heights; the view builds its mesh from the same array.
- **Trails (fixed per spike):** horse seed 1907, S-bends down to a ford at 520 m, max grade 16%; bike seed 2207,
  wider swings, ford at 980 m in a deeper valley, max grade 18%. Trail band 7-8 m of flat dirt, hills beyond.
- **Riding:** uphill slows (grade pull 6 m/s² per unit grade, top speed scaled), downhill speeds up; rough ground off the
  band caps speed at 75%, water at 45%. Mount pitches with the grade.
- **Falls (3 lives):** too fast into a bend (tip meter, stricter downhill), too steep across a side slope
  (horse 0.5, bike 0.4), the ford above a safe speed (horse 7, bike 8 m/s), deep water off the ford. A fall rolls the
  mount over for 1.4 s, then respawns 8 m back on the trail centre with 2 s grace; the third fall ends the ride.
  The HUD shows hearts and the cause ("Too fast into that bend").
- **Balance numbers (for the owner's pass):** enemy pack capped at 3 within 60 m, none spawn in the river; horse
  obstacles every 22-38 m (was 18-34), 30% bank boulders; bike every 30-50 m, 20%; par time horse 100 s (was 90), bike
  115 s (was 100); starting ammo horse 44 (was 32), bike 52 (was 40), because the trail ride takes about 90 s instead
  of 55 s and the bot arrived at camp with no spare arrows. Bot over 12 seeds: horse camp 11, dawn 5; bike dawn 7.
- **Cost (SwiftShader, bot at 15 s):** Low 28-30k triangles, High 48-50k; chunks and tree bands past the fog are hidden.
- **Known:** the bike bot drifts off the band about 28% of the time (a bot weakness, the player can hold the line).
  Not verified on device.

## Owner direction (2026-11-28)
- "We can park the spike in a remote branch. We move ahead with the two phase." The two-phase reading (1. ride,
  2. camp and secure) is confirmed. This branch, `claude/bhaaag-hero-spikes-0a5eiv`, is the parked spike, pushed to origin.
- Ride asks: "a lot more obstacles"; remove jump for the bike ("bikes don't really jump"), the horse may keep it;
  "dirt bikes can go through logs with their build"; keep a boost.
- Bigger ideas, not built yet: the series as a maze-puzzle strategy with multiple pathways and dead ends you can ride
  back out of; the horse loses at sundown (dark), the bike can go on with a headlight but it gets very hard; cliffs and
  hard ground the owner wants to design himself; he wants the full current terrain look described and to know
  whether it can be shaped his way (see `docs/spikes/terrain-visuals.md`).
