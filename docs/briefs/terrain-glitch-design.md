# Terrain glitch design: Hay Run patches after 74dedbb

Opus review seat, 2026-11-25. Input: `docs/briefs/terrain-glitch-evidence.md` (Haiku). Spot-checked against
code: place.ts:942-985 and 1042-1083, terrain.ts:130-151, groundMesh.ts:106-160, gully.ts:65-145,
sim.ts:390-415, graphFreeze.test.ts. Units are metres, run direction is -z. Not verified on device.

## 1. Root cause

**(a) Grass glitching on the floor tile.** Inside a patch rect the view field returns exactly `p.y`
(place.ts:1074-1076, s = 0 gives ph = p.y; terrain.ts:134 returns f.h because w = 0). The tile's top face
is also at `p.y` (place.ts:911-914, levelView.ts:68-112). Neither material has a polygonOffset, so the two
surfaces sit at the same depth and z-fight. The ground grid has no lines on the patch edges either
(groundMesh.ts:107-115, `mustHave` is only ±HILL_HALF_X and 0). Cells that straddle a rect edge therefore
interpolate between `p.y` and house or profile heights. The grass pokes through the tile by up to +2.42 m
(patch 0, cell [0,3]x[-15,-12] reaching the house-2 vertex at y 0 through the `onHouse` skip at
place.ts:1068-1072) and sinks 0.69 m under it (patch 2, 7 m cells).

**(b) Entering inside the grass.** There are two causes.
- (b1) The same straddle: a hero on patch 0 near (1.5, -12) stands 2.4 m inside the mesh.
- (b2, the main one) Hazard tops are the walkable hillside: a soft touch sets `py = top` and walks
  (sim.ts:397-414). place.ts:957 lowers a band to `p.y - 0.5` across **every span of the band** whenever the
  patch overlaps the band in z and the *uncut* strip [xa, xb] in x. The view lowering is local (rect plus
  5 m, place.ts:1063-1080). So the sim ground sits 1 to 5.5 m under the drawn grass over whole lanes. That
  includes spans of turned runs that were cut away from the patch and lie 4 to 20 m from it (hazards
  15-25, 52-63, 73-76 in the evidence).

The place.ts comment says "lowered under every patch", so this is a bug against its own intent, not a
design.

## 2. Fix spec

Design principle: **the drawn ground equals the sim ground (hazard tops) wherever the hero can stand, by
construction.** Placement owns the lowered region and exports it. The view and the mesh lattice read that
same export, so the two cannot drift.

### 2.1 Placement: clip the lowering to the patch (fixes b2)

Change only place.ts. The segmented hazard loop (lines 942-985) changes as follows.

- Constants: `SUNK_MARGIN = 1` (m), `SUNK_DROP = 0.5` (m, the existing value).
- The z test is unchanged: a band is affected by patch `p` (in local coordinates, `lp`) when
  `p.z1 > zl && p.z0 < z`. Drop the `p.x1 > xa && p.x0 < xb` test.
- Per band, build `wins = [lp.x0 - SUNK_MARGIN, lp.x1 + SUNK_MARGIN, p.y - SUNK_DROP]` for every
  affected patch.
- After the foreign and later cuts, split each span `[a, e]` at every window edge strictly inside it. Drop
  pieces narrower than 1e-6. Each piece's top is `min(bandTop, the tops of windows covering the piece's
  midpoint)`, where `bandTop = max(gyL(z), gyL(zl)) - 0.05` (unchanged).
- Push one hazard per piece, the same way as today.
- For every piece whose top is below `bandTop - 1e-9`, record its world AABB plus its top in `sunk`.
- Merge `sunk`: two rects with the same top (within 1e-6) that share a full edge become one. Repeat until
  nothing more merges.
- `PlacedLevel` gains `sunk: {x0,x1,z0,z1,y}[]` and
  `breaks: { xs: number[]; zs: number[] }`. Breaks are, for every merged sunk rect **and** every
  patch rect, each edge e as `e - 0.25, e, e + 0.25` (BREAK_D = 0.25 m), passed through `round6`,
  deduplicated and sorted. These are view-only fields, so they are not part of `placed.level`.
- The unsegmented path (place.ts:637, valley-1) is **unchanged**. It returns no `sunk` and no `breaks`.

Why clip to the patch rather than keep full-width rows on straight runs: clipping keeps the 74dedbb look,
a local yard, which the owner has already seen. Full-width rows would put a 29 m wide, 5.5 m cliff south of
house 2. Clipping also gives one testable invariant ("lowered ground only within 1 m of a tile").

### 2.2 View field: follow the sunk rects exactly (fixes a and b1)

Replace place.ts:1061-1083 (`PATCH_MARGIN`, `PATCH_EASE`, the `onHouse` exception and the smoothstep ease)
with this:

```
field(x, z):
  f = profileField(x, z); h = f.h; d = f.d
  for r in sunk:    if closedInside(r, x, z, 1e-6): h = min(h, r.y)
  for p in patches: if closedInside(p, x, z, 1e-6): h = min(h, p.y - SUNK_DROP)
  if h < f.h: d = 0          // terrainY returns h exactly (terrain.ts:134)
  return { h, d }
```

What this does:
- The grass inside the tile rect sits **0.5 m under the tile top**. That removes the z-fight with margin to
  spare: 24-bit depth resolves 0.5 m out to well over 1000 m with near plane 0.3, and 16-bit to about 99 m.
  The tile is a 1 m slab, so no gap shows under it.
- The 1 m ring is at `p.y - 0.5`, the same as the sim hazard top.
- There is no ease. The bank to the profile sits in the 0.25 m strip just outside the sunk edge, where the
  drawn ground is *below* the sim top, so the hero is never inside it.
- The `onHouse` exception is dropped. Sunk rows reach less than 1 m into the footprints of houses a and b,
  under the house bodies. The wall-base exposure there exists in either version.

### 2.3 Mesh lattice: put vertices on every edge (fixes the straddle)

- In terrain.ts, add module state `setTerrainBreaks(b: {xs; zs} | null)` and `terrainBreaks()`, default
  null, next to `setTerrainField`.
- In levelView.ts:265-266, add `setTerrainBreaks(opts.graph?.breaks ?? null)`. The `opts.graph` type
  gains `breaks?`. With no graph, it is set to null.
- In game.ts:294, pass `breaks: placed.breaks`. homeAssets.ts (nagarkot) passes nothing, so it gets null.
- In groundMesh.ts:107-115, append `terrainBreaks()?.xs` to the x `mustHave` and `?.zs` to the z
  `mustHave`. Leave everything else as is.
- Cost: about 3 patches x 2 rects x 6 lines, so at most about 36 extra lines per axis. That takes the mesh
  from 8025 vertices to about 12-18k, still one draw call.

With vertices on each sunk edge, every triangle inside a sunk rect is flat at its top, and every bank
triangle lies inside a 0.25 m strip outside it.

### 2.4 Gully ribbon: same breaks

In gully.ts `buildGully` only, leaving `gullyQuads` unchanged so gullyHome's inside-box test does not move:

- Split each quad in z at every break z strictly inside (z0, z1).
- Set its x vertices to the union of the uniform STEP subdivision and every break x strictly inside
  (x0, x1).

The ribbon then shares the mesh's vertices across banks and cannot float over the ring or sink under a bank.

### 2.5 Strip overlap: conditional step, only on test evidence

The evidence shows 0.1-0.7 m of excess on strips at z -5..-11 (x [-25,-4.5] and [4.5,17]). The likely cause
is not proven: `profileField` averages overlapping strips equally (both d = 0), while hazards follow the
later run.

Implement 2.1-2.4 first, then run T2. Do the following **only if** T2 still fails and the failing points lie
where two strips both have d < 1e-9:
- In `profileField`, among strips with d < 1e-9 take the **last** one, as place.ts:937-938 already states
  ("A later run owns the ground").
- Add each later strip's world rect edges to `breaks` as in 2.1.

If the failures are elsewhere, stop and report counts and locations. Do not tune.

### 2.6 What must NOT change

- `src/core`, tuning.json, and the camera (owner rule: no camera-angle change without asking).
- valley-1 level JSON: hash `2bd8c4e1` must stay, which guards the unsegmented path.
- In hay-run and home-street `placed.level`, everything except `hazards` (solids, ramps, anchors, spawn,
  goal, lines, tramps, cushions). Sonnet checks this before and after by hashing
  `JSON.stringify({...level, hazards: []})` and logs it in the ledger.
- Nagarkot-home field (homeFieldShelf.test.ts), terrainShape.test.ts, terrain.test.ts, gullyHome.test.ts:
  no edits, and they stay green.
- Chase and endless modes: there is no graph, so breaks are null and the ground mesh is identical (T6).

### 2.7 Frozen hashes (needs the owner's yes)

The hay-run (`688106b4`) and home-street (`da373009`) hashes change, because hazard pieces are split and
tops are restored. ADR 0013 §3.3 freezes them. The 2026-11-13 precedent allows a re-record for an
owner-reported bug, and this is one ("still I can enter inside the grass"). The controller confirms with the
owner in one line, then Sonnet re-records both hashes with a dated comment in the existing style. Without
that yes there is no acceptable fix for (b). A view-only alternative would have to draw 4-5.5 m pits where
place.ts:957 lowered unrelated spans.

### 2.8 Known results the owner will see (not verified on device)

- Each tile becomes a slab standing 0.5 m proud of its 1 m grass ring, an honest step that the sim
  already has.
- A grass bank runs at the ring's side edges. It is up to about 5 m tall at patch 0 next to house a,
  triangular, falling to about 0.5 m at house b.
- Walking into a bank uses the existing hazard step-up (sim.ts:398-400): the hero pops up to the bank top.
  Nothing new in the sim. A possible follow-up is a stepped stone retaining wall (solids) at banks over
  1 m, which would be an owner design call.
- Bank vertices tilt the normals on the ring edge, giving a shading seam along the bank lip.

### 2.9 valley-1: defer

valley-1 is legacy and hidden (`SHOW_LEGACY_LEVELS = false`, src/app/modes/levels.ts:29). Its hazard rows
are full width by design (place.ts:637, x -90..90) and it draws the z-only profile, so a hero on its patches
is up to 2.4 m inside the grass. That needs a separate, view-only fix (a z-terrace profile,
`min(profile(z), rowTop(z))`, plus z breaks) with no hash change. Queue it as a DRAFT card. It carries no
risk from this change, because its path returns no sunk or breaks and T5 pins its hash.

### 2.10 Out of scope, queue as cards

- House wall-base exposure next to deep yards (houseKit bodies start at g - 2, evidence 2d). Fix with a
  view-only skirt down to the lowest drawn ground along the footprint.
- Camera below the drawn ground near banks (evidence 3). cameraRig sweeps only AABB solids. This needs a
  ground clamp and the owner's OK, because it touches camera behaviour.

## 3. Tests (behavioural; each fails if its part of the fix is reverted)

Shared helper (test file only): `meshHeightAt(mesh, x, z)`.
- Build the sorted unique xs and zs from the position attribute.
- Find the cell by binary search, then read its two triangles from the index buffer at
  `6 * (i * (nx - 1) + j)`, using the builder's layout with rows uphill first.
- Do a barycentric point-in-triangle test in xz, then interpolate y.

Sampling for a region R:
- (i) every mesh vertex inside R;
- (ii) for every triangle whose xz box overlaps R, 21 barycentric points (u, v in 0.2 steps, u + v ≤ 1)
  plus the centroid, kept when inside R;
- (iii) a 0.1 m grid over R.

Report the worst point in the failure message. Build the mesh as `buildLevelMeshes` does: set
profile, field, extent(minSolidZ) and breaks, then call `buildGroundMesh()`. `afterEach` clears all four.

| # | File | Level(s) | Assertion | Fails when |
|---|---|---|---|---|
| T1 | tests/adapters/terrainPatchMesh.test.ts | hay-run, home-street | Over every patch rect, mesh ≤ p.y - 0.4 at all samples (i)-(iii) | breaks dropped (patch 0 +2.42), no sink (coplanar), field reverted |
| T2 | same file | hay-run, home-street | Over every hazard footprint, skipping points inside a house footprint (HALF box from `placed.houses`) or a patch rect: mesh - hazard top ≤ 0.10 at samples (i)-(iii) | clip reverted (hazards 15-25 +5.5), breaks dropped, sunk not followed |
| T3 | tests/content/graphSunk.test.ts | hay-run, home-street | Every hazard whose top equals some patch's `p.y - 0.5` (1e-6) lies inside that patch rect expanded by 1.0 + 1e-6 in x and z. `placed.sunk` is non-empty, and every sunk rect lies inside some expanded patch rect | place.ts:957 lowering restored band-wide |
| T4 | tests/adapters/terrainPatchMesh.test.ts | hay-run | Inside each merged sunk rect, shrunk by 0.3 m: mesh equals r.y within 1e-3 at (i)-(iii) | view stops following sunk (sim lowered, grass not) |
| T5 | tests/content/graphFreeze.test.ts | all | valley-1 stays `2bd8c4e1`; hay-run and home-street re-recorded (owner yes) | unsegmented path touched |
| T6 | tests/adapters/groundMesh.test.ts (add a case) | none, plus after a hay-run build then clear | With profile, field and breaks null, vertex count = 8025 and an fnv1a hash of the position array matches the value recorded on main **before** the change. Also: build hay-run via `buildLevelMeshes`, call it again with no graph, and the count is 8025 | breaks leak into chase, endless or stock |
| T7 | tests/adapters/gullyPatch.test.ts | hay-run | For every ribbon triangle, 21 barycentric samples: ribbon - meshHeightAt ∈ [0, 0.5] for ≥ 99 % of samples, and no sample with \|diff\| > 1.0 | gully break splits dropped |

Keep without edits: terrainUnderPatches.test.ts (now weaker than T1, still green), gullyHome, homeFieldShelf,
terrainShape, terrain, graphLevelBot, graphWander, graphCushionPad, chaseL1. The bot and wander tests run
the sim over the changed hazards. If one goes red, stop and report the trace. Do not tune the placement.

Mutation rung (controller, cheapest): revert each of 2.1, 2.2, 2.3 and 2.4 in turn and confirm that
T3, T4, T1 and T7 respectively fail.

## 4. Order for the implementer

1. Record the T6 baseline hash on main.
2. Implement 2.1, then T3.
3. Implement 2.2 and 2.3, then T1, T2, T4 and T6.
4. Implement 2.4, then T7.
5. If T2 is red, apply 2.5 per its condition.
6. Owner yes, then re-record the hashes (T5).
7. Full gates: lint, typecheck, test, build.
8. Phone check at 390x844 and 844x390, Low and High tiers: patch 0 north-west corner, patch 2, the patch 1
   ring. Write "not verified on device" until the owner looks.
