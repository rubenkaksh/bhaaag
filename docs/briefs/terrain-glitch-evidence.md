# Terrain glitch evidence: Hay Run after commit 74dedbb

Evidence only. No file under src/ or tests/ was changed. Branch `claude/terrain-under-patches`, HEAD `74dedbb` (clean at start and end). Measurements came from a throwaway vitest file that placed `hay-run` through `placeGraph`, built the ground mesh with `buildGroundMesh()` after `setTerrainProfile/Field/Extent(minSolidZ)` (the same calls `buildLevelMeshes` makes), and interpolated the real triangles. All scratch files were deleted. Raw JSON is in `/private/tmp/claude-501/-Users-rubenk-projects-sandbox-workspaces-bhagdori/33fa8855-3c44-4956-a382-adc05a7bbf54/scratchpad/` (evid.json, evid2.json, evid3.json, evid4.json, houses.json).

Conventions: units are metres. Run direction is -z (downhill). `terrainY` is the sampled field. "mesh" is the drawn triangles (barycentric interpolation of the vertex heights), which is what the eye sees.

## 0. Test result (item 5)

`node_modules/.bin/vitest run tests/adapters/terrainUnderPatches.test.ts`: **4 passed / 4** (`hay-run` and `home-street`, two tests each). Green.

## 1. Patch tile, ground mesh, and coplanarity

### 1a. Patch tile (floor tile) rendering

- The tile is a collider solid with style 0. `placeSegmentedOnce` pushes the patch to `patches` (place.ts:365-396), and the solid is emitted by the same placement. Each patch has one 1 m slab on top with the same xz rect and `max.y = patch.y`. Measured: solid min.y = patch.y - 1.0 (solids 75, 76, 77).
- Draw path: `buildLevelMeshes` (levelView.ts:262 onward) loops style 0..4 and calls `mergedMesh` (levelView.ts:93). Style 0 is `COLOR_STYLE[0] = '#8e7a66'` with texture `stone_warm` (levelView.ts:36). Style 0 is not skipped for graph levels (only style 1/4 are skipped under `opts.graph`).
- `mergedMesh` material (levelView.ts:107-112): `MeshLambertMaterial({ color: tint, flatShading: true, map, normalMap })`. Tint = `#8e7a66` lerped 55% toward white when textured. No polygonOffset, no depthWrite override (default true), no renderOrder, not transparent, side FrontSide (default). Box faces are emitted at the exact `max.y` (pushBox, levelView.ts:68-90), so the top face is exactly `patch.y`.

### 1b. Ground mesh material and geometry

- `buildGroundMesh` (groundMesh.ts:106-160): `MeshLambertMaterial({ vertexColors: true })`. No polygonOffset, depthWrite default, renderOrder default, not transparent, FrontSide. Name `decor_ground`.
- Vertex heights = `terrainY(x, z)` (groundMesh.ts:136). Triangles are wound upward-facing (checked by winding math).
- Grid (`axis()`, groundMesh.ts:32-55): x fine step 3 m for |x| <= 42, then growing by 1.12 per step (cell 3.36, 3.76, 4.21, 4.72, 5.28, 5.91, 6.62, 7.41, 8.30 m ...) toward the ends. z fine step 3 m between -156 and 46, same growth beyond. Total vertices 8025, 75 unique x, 107 unique z.

### 1c. Patch geometry against the grid (the cause of the straddle)

| Patch | rect x0..x1 | rect z0..z1 | tile top y | grid cell that holds x0 / x1 | grid cell that holds z0 / z1 |
|---|---|---|---|---|---|
| 0 | 1.5 .. 12.0 | -16.152714 .. -12.0 | -5.015271 | x0 1.5 in [0, 3]: STRADDLES; x1 12 is a grid line | z0 -16.15 in [-18, -15]: STRADDLES; z1 -12 is a grid line |
| 1 | -24.853492 .. -20.0 | -32.152714 .. -21.652714 | -6.438582 | x0 in [-27, -24]: STRADDLES; x1 -20 in [-21, -18]: STRADDLES | z0 in [-33, -30]: STRADDLES; z1 in [-24, -21]: STRADDLES |
| 2 | -80.717067 .. -75.717067 | -35.753392 .. -27.753392 | -18.977495 | x0 in [-83.27, -75.86] (7.4 m cell): STRADDLES; x1 -75.72 in [-75.86, -69.24] (6.6 m cell): STRADDLES | z0 in [-36, -33]: STRADDLES; z1 in [-30, -27]: STRADDLES |

Vertices lying inside any rect: none above the tile (see 1d, column "vertices in rect"). So the excess comes from triangles that cross a rect edge, where one corner is a vertex outside the rect whose height is the house or profile value.

### 1d. Mesh height against the tile top, per patch (sampled 0.1 m in the rect)

| Patch | terrainY max over rect minus y | mesh max over rect minus y | mesh max location | mesh cells in rect: coplanar within 1 mm | below tile top | above tile top | max above (in rect) |
|---|---|---|---|---|---|---|---|
| 0 | 0.000 | +2.422 | (1.50, -12.05) | 87.3% | 0.0% | 12.7% | +2.42 |
| 1 | 0.000 | +0.227 | (-20.05, -32.05) | 76.4% | 0.0% | 23.6% | +0.23 |
| 2 | 0.000 | +0.152 | (-75.72, -27.85) | 0.0% | 96.1% | 3.9% | +0.15 |

Corner heights, mesh minus tile top (x, z, value):
- Patch 0: (1.5, -12.0) +2.508; (1.5, -16.15) +0.018; (12, -12) 0.000; (12, -16.15) 0.000.
- Patch 1: (-24.85, -21.65) 0.000; (-24.85, -32.15) +0.007; (-20, -21.65) +0.060; (-20, -32.15) +0.209.
- Patch 2: (-80.72, -27.75) -0.691; (-80.72, -35.75) -0.691; (-75.72, -27.75) +0.152; (-75.72, -35.75) +0.119.

Explanation, patch 0 NW corner: vertex (0, -12) sits on house 2's footprint (x -4..4, z -12..-4, groundY 0). The `onHouse` branch (place.ts:1068-1073) skips every patch except one whose rect contains the point, so that vertex stays at 0. Vertex (3, -12) is on the rect edge and gets -5.015. The cell [0,3]x[-15,-12] therefore interpolates from 0 down to -5 across the x = 1.5 edge, and the mesh reaches +2.42 above the tile at (1.50, -12.05).

Explanation, patch 2: both west and east cells are coarse (6.6-7.4 m). The mesh is below the tile top across 96% of the rect, and by up to -0.69 at the west corners. The tile top therefore stands proud of the grass by up to 0.69 m there (the tile's side faces show).

### 1e. Coplanarity after the last fix

- Where the mesh equals the tile (patch 0 87%, patch 1 76%), both top faces sit at the same Float32 y (`patch.y`). Both materials have no polygonOffset and default depthWrite, and the mesh is drawn by a separate draw call. This is depth-equal, z-fighting territory: which fragment wins depends on per-triangle rounding, so the expected artefact is speckle or flicker, not a clean hidden floor.
- Depth settings: `PerspectiveCamera(60, 1, 0.3, 3000)` (scene.ts:166), antialias true. No logarithmic depth. Note the gully ribbon (gully.ts:14, 137-142) uses `polygonOffset` factor -2 units -2 and LIFT 0.12, but nothing biases the tile or the ground.
- Not verified on device (rendering was not run).

## 2. Hero reach, hazards and ramps

### 2a. Walkable tops checked (all solids, ramps, cushions, tramps)

| Surface | Count | Result |
|---|---|---|
| Solid tops, style 0 (patch slabs) | 3 | the 3 patch tops above (table 1d) |
| Solid tops, style 1 (house body deck), 4 (parapet, rails, posts), 5 (balcony) | 18 / 52 / 2 | none with mesh above top by > 0.05 over footprint |
| Ramps (stairs, gable, awnings; surface from `rampHeightAt` logic, sim.ts:222-236) | all | none with mesh above surface by > 0.05 |
| Cushions (2) and tramp (1) | 3 | top is 0.5 to 0.9 m above the mesh everywhere: no burial |

### 2b. Hazard volumes (kill slabs that act as hillside ground)

- 156 hazard volumes. Walkable top = `max.y`. Each slab is about 8 m deep (min.y is about 8 m under max.y).
- Mesh above hazard top by more than 0.05 m: **85 of 156**. Of these, 59 are flagged "covered" (some solid with min.y at or above the hazard top overlaps its footprint; this is a weak flag, not a reachability proof) and 50 lie within a house footprint box.

Largest and most relevant groups (mesh minus hazard top; fraction of the footprint above top by > 0.05):

| Hazard ids | x | z | min.y | top | max excess (m) | fraction over | note |
|---|---|---|---|---|---|---|---|
| 15-17 | 1..4 | -4..17 | -13.52 | -5.52 | 5.52 | 1.00 | under house 1 area |
| 18-25 | 4..12 | -4..17 | -13.52 | -5.52 | 4.45..5.42 | 1.00 | lane north of house 3 (no cover flag) |
| 42, 43 | -12..-4.5 and 4.5..17 | -13..-12 | -13.52 | -5.52 | 5.24 / 3.51 | 1.00 | |
| 44-47 | -12..17 | -17..-14 | -13.52 | -5.52 | 3.08..5.11 | 1.00 | overlap patch 0 footprint (patch top is 0.5 above) |
| 52-55 | -12..17 | -25..-21 | -14.94 | -6.94 | 1.92 | 1.00 | |
| 56-63 | -12..17 | -33..-25 | -14.94 | -6.94 | 1.24..1.69 | 1.00 | |
| 73-76 | -24..-20 | -45..-11 | -14.94 | -6.94 | 4.10..4.16 | 1.00 | overlaps patch 1 footprint (patch top -6.44, 0.5 above) |
| 128-131 | -79..-75 | -45..-11 | -27.48 | -19.48 | 1.86..3.24 | 1.00 | overlaps patch 2 footprint |

Other hazard groups with smaller excess (0.05 to 0.7) are the strips at z -5..-11 for x in [-25, -4.5] and [4.5, 17] (top -0.25 to -0.55, excess 0.1 to 0.7).

### 2c. Can the hero stand on a hazard top with the grass above?

- Sim rule (sim.ts:1079-1080 calls `hazardContact`, sim.ts:390-410): a soft contact puts feet on the top (`py = top`, `grounded`, `hill`), and the hero walks there at `groundWalkSpeed` 2 m/s (tuning.json:397, hazard block). A hard contact (-vy > `killImpact` 10 m/s) kills. A fall from rest kills above v^2/(2g) = 100/19.62 = **5.10 m** (g = 9.81, tuning physics.g).
- So a hero who falls up to 5.1 m onto a hazard top survives there, with the drawn grass 0.1 to 5.5 m above his feet (2b). The hero is then inside the grass.
- Derived from code, not simulated: time spent inside a hazard volume before resolution is at most one 1/60 s step for a soft landing. A hard landing kills on that step.
- Walk-off from a tile: patch 1 (top -6.44) and patch 0 (top -5.02) overlap hazard strips whose tops are 0.5 m lower (-6.94 and -5.52). Stepping off the tile onto those strips puts feet 0.5 m lower, with the grass above by 4.1 m (hazards 73-76) and 3.5 to 5.1 m (hazards 43-47).
- Reach by falls from houses or roofs was not simulated (unknown, 2e).

### 2d. House walls next to patches

- Footprint vertices use `h = groundY` (onHouse branch). Patch 0's north edge (z = -12) meets house 2 (g 0.0) and house 3 (g -0.4) while the tile is at -5.02, a 4.6 to 5.0 m step at the wall line.
- House bodies start at g - 2 (houseKit.ts:60-67, HK.bodyBelow 2). Bodies for houses 2 and 3 therefore have bottoms at -2.0 and -2.4, above the patch tile at -5.02. The patch-side wall base is exposed for about 2.6 m above the tile. Not verified on device.
- Measured mesh over house footprints touching patches: 0 (house 2), -0.4 (house 3), -5.02 (house 4, same as patch 0's south edge, no step).

## 3. Camera (cameraRig)

Model: `cameraRig` (cameraRig.ts:73-137) sweeps only `boxes` (AABB solids). Camera = focus + rig vector (dist 4.5, shoulder 0.6, height 1.6, tuning.json:80-101), scaled to `arm`. This was simulated with no sweep (arm fixed), with focus = visible ground under the hero (feet) and head = feet + 1.6. The real focus height is not verified (unknown).

Sign: `wantY = headY - sin(pitch)*dist`, so positive pitch = camera below head (looks up). `frontPitchDeg` -12 (tuning.json) = camera above head. `pitchMin/Max` -60/50 and tilt assist `rigPitchMinDeg` -78.

Samples: hero positions over each patch rect plus 3 m; yaw 0, 40, -40; pitch -40, -12, 0, 15, 30, 50; arm 4.5 and 0.5 (6318 per row).

| pitch | arm | samples with camera below mesh | worst excess (m) | worst location |
|---|---|---|---|---|
| -40 | 4.5 | 112 (1.8%) | 0.55 | hero (0.5, -14.15), yaw 0 |
| -12 | 4.5 | 759 (12%) | 2.49 | hero (-1.5, -16.15), yaw 0 |
| 0 | 4.5 | 1207 (19%) | 3.42 | hero (-1.5, -16.15), yaw 0 |
| 15 | 4.5 | 2286 (36%) | 4.57 | hero (-1.5, -16.15), yaw 0 |
| 30 | 4.5 | 5790 (92%) | 5.65 | hero (0.5, -15.15), yaw 40 |
| 50 | 4.5 | 6118 (97%) | 6.83 | hero (0.5, -14.15), yaw 40 |
| -40 | 0.5 | 108 | 2.91 | hero (0, -12.15), yaw 0 |
| -12 | 0.5 | 126 | 3.31 | hero (0.5, -12.15), yaw 40 |
| 0 | 0.5 | 135 | 3.42 | hero (0.5, -12.15), yaw 40 |
| 15 | 0.5 | 151 | 3.54 | hero (0.5, -12.15), yaw 40 |
| 30 | 0.5 | 165 | 3.57 | hero (0.5, -12.15), yaw 40 |
| 50 | 0.5 | 186 | 3.61 | hero (0, -12.15), yaw 0 |

Reading: camera below the drawn ground is common near patches 0 and 1 when the camera sits uphill of the patch (over house 2/3 ground at 0 to -0.4 while the hero stands at -5.0). Heights: head = feet + 1.6; camera y = head - sin(pitch) * arm. Distance range: 0.5 to 4.5 m. Excess at 0.5 m arm reaches 3.6 m. Caveats: these are unclipped camera positions; in-game an AABB hit would shorten the arm, and the sweep ignores t=0 contacts that do not face the sweep (cameraRig.ts:111-116). The table shows the potential, not the in-game result. The pitch values the game actually uses on Hay Run were not measured.

## 4. Exact lines

- Last fix, place.ts: `profileField` at 1042 (the old `field`, renamed). `PATCH_MARGIN = 1` at 1063, `PATCH_EASE = 4` at 1064. `field` at 1065-1083:
  - 1066 `const f = profileField(x, z);`
  - 1068 `onHouse = ordered.some(...)` (footprint test, HALF).
  - 1070-1073 patch loop: `o` = distance from (x, z) to the patch rect (line 1071); skip if `onHouse ? o > 0 : o >= 5`.
  - 1074 `t = clamp((o - 1) / 4, 0, 1)`.
  - 1075 `s = t * t * (3 - 2 * t)` (smoothstep).
  - 1076 `ph = p.y + s * (f.h - p.y)`.
  - 1077-1080 `if (ph < h) { h = ph; d = min(d, f.d * s); }`.
  - 1082 `return { h, d }`.
- Smoothstep also in terrain.ts `smooth(a, b, v)` (terrain.ts:58, `t*t*(3-2t)`). Flank blend `w = smooth(BLEND_X0, BLEND_X1, |x|)` is at terrain.ts:168 (plane branch, not the field branch).
- terrain.ts (field branch, `terrainY` at line 130):
  - 132 `f = fieldNow(x, z)`; 133 `w = smooth(0, 18, f.d)` (flank blend on the reduced `d`).
  - 134 `if (w <= 0) return f.h;` (so inside a patch rect, and near its edge where `f.d * s` is 0, the result is exactly the patch-lowered `f.h`).
  - 140-146 raw/soft blend (`raw`, `soft`); 147 `y = raw + smooth(4, 30, f.d) * (soft - raw)`; 148 `y = min(y, max(f.h, planeY(z)) + CAP)`; 150 terrace step fade; 151 `return f.h + w * (y - f.h)`.
- How d and h combine: field sets `d = min(d, f.d * s)` only where the patch lowers `h`. `w` is computed from that reduced `d`, so the blend weight falls to 0 next to a patch, and `terrainY` collapses to `f.h = p.y` there. Far from patches (s = 1) `d` is unchanged. The field output therefore makes `terrainY` exact inside rects, but the triangle mesh does not follow it between vertices (see 1d).

## 5. Unknowns

- Real focus and head height used by `cameraRig` on Hay Run, and which pitch values occur in play. Only the frontPitch -12 default is known.
- Whether the camera sweep ever clips the arm before the camera drops below ground (not simulated, only AABB solids are swept).
- Reach of hazard slabs by falls from house decks or roofs (the 5.1 m soft-landing limit is known; per-hazard drop heights were not computed).
- Actual sim traces of walking across hazard tops (time-in-volume is derived from sim.ts, not measured).
- Visual result: z-fight speckle, tile-edge exposure, and wall-base exposure were not rendered or seen on a device. Not verified.
- Hazard "covered" flag is only an overlap test against solids with bottom at or above the hazard top, not a reachability proof.
- Patches 1 and 2 hero standing points beyond the rect (margin ring) were checked for mesh height only (ring 5 m for patch 0 gives 5.0 m, which is house footprint, not a finding).
