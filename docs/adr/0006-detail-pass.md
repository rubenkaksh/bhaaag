# ADR 0006: Detail pass (hero tunic, trailing rope, Newari kit, sun valley)

Status: Proposed 2026-11-06. Target: close the detail gap with `docs/reference/ui-reference.webp`.
Amends ADR 0004 (look only) and ADR 0005 (D3 hero row, D4 sun, D6 rope, D9 cuts, D10 budget).
Unchanged: stock materials only, no custom shaders, no shadows, no post, strict TS, mulberry32
seed 1729, no `Math.random`, zero per-frame allocation, ADR 0005 D1 lane rules and D3 palette
(except where a row below says otherwise).

## 0. Measured baseline (2026-11-06, scratch count over level l1)

| Item | Now |
| ---- | --- |
| Draw calls (level 31 + hero 23 + sky 5 + rope 4 + waypoint 2) | ≈ 65 |
| Decor tris (used instances) / kit ceiling | 39,434 / ≈ 74,900 |
| Non-instanced level tris | 4,468 |
| Hero | 23 meshes, 832 tris |
| Decor instances used | body 939, cornice 186, window 902, roof 317, rail 63, deck 21, tank 16, parapet 183, canopy 49, trunk 37, flag 216 |
| Spawn roof (solid 1) | x -5..5, y -3..0, z -4..4; anchors route[0] (-5, -7.9, -24), [1] (5, -17.4, -50), [2] (-5, -26.9, -76) |
| Goal | x -6..6, y -75..-70, z -198..-186; lane z -206..+12 |

Known defects this pass fixes:
- **F1:** the hero's oat top (`#d9c6a2`, H 39°, S 0.43, L 0.74) sits next to skin (`#b98563`, H 24°, S 0.39, L 0.56) in hue and saturation, so the top reads as bare skin.
- **F2:** `ropeView.fillRopeColors` writes sRGB bytes / 255 straight into a linear vertex-colour buffer, so the rope is washed out.
- **F3:** the near mountain ridge sits 8.6° above the horizon at the spawn and 26° above it at the goal. The sun is at 5° (camera-relative), so the ridge hides it on almost the whole route.
- **F4:** `decor.test` filters `decor.children` for InstancedMesh, but `kit.finish()` nests them in a Group, so the "≤ 16 instanced" assertion checks nothing.

## 1. Budget (binding)

| Budget | Limit | After this pass (target) |
| ------ | ----- | ------------------------ |
| Draw calls per frame | ≤ 80 | ≈ 72 (+shutter, +pot, +birds, +ropePost, +haze, +2 hero) |
| Triangles per frame | ≤ 120k | ≈ 86k actual (decor ≈ 73k, level 4.5k, hero ≤ 1.1k, sky 2.3k, rope+post 0.8k) |
| Instanced meshes | ≤ 16 | 13 (all decor) |
| Decor draw calls | ≤ 16 | 16 = 13 instanced + ground + strings + birds |
| Decor kit ceiling (`kitTriangleCeiling`) | ≤ 90k (was 80k; raised to 150k 2026-11-08 for the facade upgrade) | 89,720 |
| Sky + mountains tris | < 3,000 | ≈ 2,300 |
| Additive meshes | ≤ 5 | 5 (sun glow, horizon haze, rope halo, 2 waypoint) |
| Pixel ratio | 1.5 on coarse pointer | unchanged |
| Hero | < 1,500 tris (test), ≤ 1,100 target, ≤ 25 meshes, 6 materials | |

## 2. L-HERO: hemp tunic dress, gloves, satchel

**Files:** `src/adapters/render/heroRig.ts`, `src/adapters/render/heroPose.ts` (no edit expected; owned so nobody else touches it), `tests/adapters/heroPose.test.ts`. The joint tree, channels, pose rows, interface and `HERO_*` constants all stay unchanged.

**Look:** an undyed hemp/linen kurta-cut tunic dress with these parts:
- a loose torso
- a short flared yoke on the pelvis
- two thigh panels that follow the legs (a side-slit look, so leg flex never punches through a rigid skirt)
- a rough hem
- loose bell sleeves to the glove cuff
- the crimson sash as the belt, and the crimson scarf, both kept
- leather gloves and a satchel on a chest strap

**HERO_COLORS contract.** Six keys, in this order. `top` is renamed to `tunic`. This is the D3 hero row of ADR 0005.

| Key | Hex | sRGB HSL | emissiveIntensity | side |
| --- | --- | -------- | ----------------- | ---- |
| tunic | `#c9c0a3` | 46°, 0.26, 0.71 | 0.10 | DoubleSide |
| trousers | `#2a2f3b` | unchanged | 0.18 | Front |
| crimson | `#c4262e` | unchanged | 0.35 | Front |
| skin | `#a5674a` | 19°, 0.38, 0.47 | 0.12 | Front |
| hair | `#1f1a17` | unchanged | 0.18 | Front |
| leather | `#4a3426` | unchanged | 0.18 | Front |

**Why this fixes F1.** The tunic is desaturated (S 0.26 against 0.38) and lighter (ΔL 0.24), and its hue is shifted to straw (ΔH 27°). Its lower self-glow keeps the folds' value range visible. Rename the `Mats` type field `top` to `tunic`. The materials stay one shared MeshStandardMaterial per colour (roughness 0.85, metalness 0).

**Meshes.** Positions are in each parent joint's frame, in metres. Every new piece is a stock geometry. "Merged" means `mergeGeometries` on clones whose transforms are baked in, so all parts need the same attribute set.

| # | Parent | Piece | Geometry | Mat | Pos / rot / scale |
| - | ------ | ----- | -------- | --- | ----------------- |
| 1 | pelvis | pelvis block | Box(0.27, 0.17, 0.19) | trousers | (0, -0.01, 0) |
| 2 | pelvis | sash | Cyl(0.195, 0.19, 0.085, 10) | crimson | (0, 0.07, 0), scale z 0.82 |
| 3 | sashTail joint, moved to (0.15, 0.06, -0.12) | sash tail | Box(0.09, 0.3, 0.022) | crimson | (0, -0.14, 0), rot z 0.12 |
| 4 | pelvis | yoke skirt | Lathe([(0.16, 0.06), (0.19, -0.04), (0.215, -0.16)], 10), open | tunic | scale z 0.85 |
| 5 | spine | loose torso | Lathe([(0, -0.06), (0.17, -0.05), (0.168, 0.10), (0.172, 0.30), (0.158, 0.44), (0.095, 0.53), (0, 0.55)], 10) | tunic | scale (1.1, 1, 0.82) |
| 6 | spine | strap (front and back merged) | 2× Box(0.045, 0.52, 0.02) at (0, 0.23, ±0.15), rot (±0.06, 0, 0.55) | leather | |
| 7 | spine | neck wrap | Cyl(0.1, 0.13, 0.1, 8) | crimson | (0, 0.55, 0), scale z 0.85 |
| 8 | scarfTail | scarf tails (merged) | Box(0.11, 0.44, 0.025) at (0, -0.21, 0) rot y 0.5, plus Box(0.08, 0.3, 0.02) at (0.05, -0.14, -0.01) rot (0, -0.6, -0.25) | crimson | |
| 9-10 | head | head, hair | as now | skin, hair | as now |
| 11 | pelvis | satchel | Box(0.06, 0.16, 0.2) | leather | (0.25, -0.05, -0.03) (hero's left hip; the strap runs from the right shoulder to here) |
| 12-13 | shoulder L/R | upper sleeve | Capsule(0.07, 0.17, 1, 6) | tunic | (0, -0.16, 0) |
| 14-15 | elbow L/R | bell sleeve, replacing the forearm capsule | Cyl(0.065, 0.10, 0.22, 8, 1, open) | tunic | (0, -0.13, 0) |
| 16-17 | hand L/R | glove (merged, ≈ 50 tris) | see below | leather | joint origin = grip point |
| 18-19 | hip L/R | thigh | as now | trousers | |
| 20-21 | hip L/R | thigh panel | Cyl(0.115, 0.135, 0.26, 8, 1, open) | tunic | (0, -0.13, 0) |
| 22-25 | knee L/R | shin, shoe | as now | trousers, leather | as now |

**Glove** (hand-joint frame, where +y points toward the elbow). It is built twice, once per side, because the thumb is mirrored.
- cuff: open Cyl(0.05, 0.058, 0.06, 7) at (0, 0.05, 0). It sits inside the bell, whose wrist radius is 0.10.
- palm: Box(0.075, 0.085, 0.045) at (0, -0.005, 0)
- curled fingers: Box(0.08, 0.04, 0.05) at (0, -0.055, 0.03), rot x 0.5, wrapping over the trolley bar
- thumb: Box(0.025, 0.05, 0.025) at (−0.045 for handL, +0.045 for handR, -0.02, 0.025), on the inner side

**Rough hem.** On the bottom vertex ring of the skirt (#4) and both thigh panels (#20, #21), offset each vertex at index k along the ring:
- y: −0.025 when k is even, +0.01 when k is odd
- radius: ×1.06 when k % 3 = 0

The offset is deterministic, applied once at build, and has no RNG.

**Tri estimate:** ≈ 940. The sash tail swing stays `CH_SCARF × 0.6`.

**heroPose.test expectations:**
- Replace `tris < 1000` with `tris < 1500`. Add a soft log line when it is above 1,100.
- `Object.keys(HERO_COLORS)` equals `['tunic', 'trousers', 'crimson', 'skin', 'hair', 'leather']`, and `mats.size === 6`. Materials are shared across two rigs (unchanged).
- Mesh count (traverse `isMesh`) ≤ 25.
- New test, "tunic never reads as skin". Use `new Color(hex).getHSL(out, SRGBColorSpace)`. It requires:
  - tunic S ≤ 0.28 and skin S ≥ 0.35
  - |L_tunic − L_skin| ≥ 0.20
  - circular |H_tunic − H_skin| ≥ 20°
  - tunic `emissiveIntensity` ≤ 0.12
- New test: no mesh under `rig.head` uses the tunic material, and both `handL` and `handR` have exactly one leather child mesh (the glove).
- Unchanged: hands at the grip (±0.01 m, within 0.08 of `HERO_GRIP_X`), every hang-channel range test, and the blend tests.

**done_when:**
- `pnpm vitest run tests/adapters/heroPose.test.ts` and `pnpm typecheck` both exit 0.
- `git diff --stat` touches only the three owned files.

## 3. L-ROPE: colour fix, trailing rope, carved tie post

**Files:** `src/app/ropeView.ts`, new `src/adapters/render/ropePost.ts`, new `tests/adapters/rope.test.ts`. `game.ts` is not touched; `ropeView.update(...)` keeps its signature.

**F2 fix.** `fillRopeColors` uses three module-level `Color` objects:

```
dark.setHex(TWIST_DARK)
light.setHex(TWIST_LIGHT)
gold.setHex(GOLD)   // setHex converts sRGB to linear
c.copy(base).lerp(gold, k)
```

Then write `c.r, c.g, c.b`. The same helper colours the trail and the post span.

**Trail** (the rope continuing past the hero, behind and above, past the camera side):
- **Mesh.** A second strip in the same tube geometry, so there is no extra call:
  - TRAIL_SEG 12 × RAD 6 sides; the index buffer grows to (SEG + TRAIL_SEG)·RAD·6, which is 432 tris for the whole tube
  - trail radius 0.045
  - twist colours with no gold
  - no fallback Line for the trail
- **Visibility.** Only while `hook.state === HOOK_ATTACHED`. In any other state, write every trail vertex to the hand position (degenerate, zero alloc).
- **Geometry.** Let u = (hook.dirX, dirY, dirZ) and O = (hook.ox, oy, oz). The trail end is Q = O − u·TRAIL_BACK, with TRAIL_BACK = 8 m. The trail centre line runs from the hand to Q with sag SAG_TAUT and the same parabola as the main rope. Because chords descend, Q is uphill of O, so the trail climbs behind the hero.
- **Camera side.** The camera shoulder is +0.6 m to the right (`cameraRig.ts`), so the chord line passes about 0.6 m to the left of the lens. That is the reference's "rope from the upper-left corner".
- **Camera clearance.** `readonly eye = new Vector3()` is copied from `camera.position` in `tube.onBeforeRender`, which gives a one-frame lag and is fine. In `update`, any main or trail ring centre closer than CAM_CLEAR = 0.7 m to `eye` is pushed radially away from `eye` to exactly 0.7 m. Skip this while `eye` is all zeros (never rendered).
- **Post tie.** When `ROPE_TIE.set` and `hook.anchorId === ROPE_TIE.anchorId` and dot(tie − O, u) < −1, Q = tie instead. Also set `ROPE_TIE.live = (state === ATTACHED && anchorId === ROPE_TIE.anchorId)` every update.

**`ropePost.ts`:**

```ts
export const ROPE_TIE = { x: 0, y: 0, z: 0, anchorId: -1, set: false, live: false };
export function buildRopePost(world: World): Group;
```

The spawn roof is the style-2 solid containing `world.spawn` (l1: solid 1). Let T = roof.max.y.
- **Post:**
  - carved timber Cyl(0.17, 0.19, 5.4, 8, 6) standing from y = roof.min.y to T + 2.4, at (roof.min.x − 0.75, ·, roof.max.z − 1.2); l1: (−5.75, ·, 2.8)
  - carving bands: vertex colour 0.72 on height rings 1, 3 and 5, and 1.0 elsewhere, over base `#5a3622`
  - Cone(0.24, 0.3, 8) cap in `#4a2c1c`
- **Bindings:** three open Cyl(0.2, 0.2, 0.08, 8) wraps at T + 2.0, T + 2.15 and T + 2.3, in TWIST_DARK.
- **Tie:** (post.x + 0.2, T + 2.2, post.z). Write it into ROPE_TIE with `anchorId = world.route[0]` and `set = true`.
- **Span:**
  - a thick static rope, radius 0.06, 16 segments × 6 sides, from the tie to the anchor point of `route[0]`, sag 1.2 %
  - twist colours via the F2 helper; the last 20 % lerps to gold
- **Mesh:** all pieces are merged into ONE mesh, MeshLambertMaterial({ vertexColors: true, flatShading: true }), name `ropePost`, with the span indices last.
  - `onBeforeRender` sets `geometry.setDrawRange(0, ROPE_TIE.live ? postIndexCount : Infinity)`. While the hero rides the first line, the visible rope is a single rope: tie → hands → anchor.
- **Budget:** ≈ 370 tris, +1 call.
- **D1 exception (new, documented here).** At most one rope post per level, within 4 m of the spawn roof. Every part keeps ≥ 0.5 m from every collider (expanded AABB distance), except the last 1.5 m of the span at the anchor. In l1 the span passes the roof's −x wall at about 0.56 m.

**rope.test.ts:**
1. The tube colour at ring 0, side 1 (light) equals `new Color(0xb08850)` within 1e-6 and differs from 0xb0/255. The last main ring equals `new Color(0xffc83a)`.
2. Attached hook (O = (0, 2, 0), A = route[0]), hand 3 m along the chord: the last trail ring centre is O − 8u within 1e-4, and dot(trailEnd − hand, u) < 0.
3. FLYING: every trail vertex is within 0.05 m of the hand.
4. `buildRopePost(l1)` then attach to `route[0]` from O = (0, 2, −1): the trail ends at the tie, and `ROPE_TIE.live` is true.
5. `eye` 0.3 m from a ring centre: after `update`, every centre is ≥ 0.7 − 1e-6 from `eye`.
6. The post is deterministic (two builds give identical position arrays). Tris ≤ 450. Clearance for the post, bindings and span as in the D1 exception, sampled every 0.25 m.
7. The tube index count is 432 × 3.

**Integration (controller only, after L-ROPE is green):** add one line to `levelView.ts`, `g.add(buildRopePost(world));` next to `buildDecor`.

**done_when:**
- `pnpm vitest run tests/adapters/rope.test.ts` and `pnpm typecheck` both exit 0.
- The diff touches only the three owned files.

## 4. L-KIT: Newari set dressing folded into the instanced kit

**Files:** `src/adapters/render/decor/kit.ts`, `decor/placeDecor.ts`, new `decor/birds.ts`, `tests/adapters/decor.test.ts`.

**Rules:**
- ADR 0005 D1 and D3 stay.
- One InstancedMesh per piece; each instance gets `setColorAt` × baked vertex colour (the 0.72 → 1.0 gradient unless stated otherwise).
- Shared Lambert flatShading material; flags DoubleSide.
- Every unit geometry is built once and merged with `mergeGeometries`.

**Piece table.** The 11 existing pieces plus 2 new ones (shutter, pot), 13 instanced meshes:

| Piece | Unit geometry (unit space; base at y 0) | Tris | Cap | Ceiling |
| ----- | --------------------------------------- | ---- | --- | ------- |
| body | unchanged box | 12 | 1250 | 15,000 |
| cornice | unchanged box | 12 | 300 | 3,600 |
| window | frame: unit box minus back face (10); dark pane quad at z +0.75, x ±0.38, y 0.1..0.9, vertex colour 0.4 (2); sill: box x ±0.6, y −0.08..0, z −0.5..1.1 minus back face (10) | 22 | 1000 | 22,000 |
| roof | tiled eave: Lathe([(0.56, 0), (0.74, 0.04), (0.58, 0.10), (0.34, 0.28), (0, 0.49)], 4, π/4). Bands by point: 0.5 soffit, 0.78 lip, 1.0, 0.88, 1.0. `ROOF_UNIT_H = 0.49`, `ROOF_UNIT_W = 0.74·√2` | 32 | 400 | 12,800 |
| rail | carved: top rail and low rail Box(2.4, 0.06, 0.06); 6 balusters 0.05×0.9×0.05 without caps (8 each); 2 end posts 0.12×1.05×0.12 at ±1.14; carved frieze plank Box(2.4, 0.18, 0.03) at y 0.62..0.80, vertex colour 0.7. New export `RAIL_POST_H = 1.05`, used for the recorded box height | 108 | 80 | 8,640 |
| deck | unchanged | 12 | 60 | 720 |
| tank | on stilts: 4 stilt boxes 0.08×1.0×0.08 at (±0.42, ·, ±0.42) without caps (8 each); platform Box(1.0, 0.08, 1.0) at y 1.0; Cyl(0.5, 0.5, 1.1, 8) at y 1.08..2.18. Stilts and platform at vertex colour 0.55, so each stand is a dark shade of its tank. New export `TANK_UNIT_H = 2.18` | 76 | 60 | 4,560 |
| parapet | unchanged | 12 | 260 | 3,120 |
| canopy | rounded: Icosahedron(1, 1). Radial jitter ±6 % keyed on a hash of the rounded vertex position (`mulberry32(hash)`; equal positions get equal jitter, so no cracks) | 80 | 110 | 8,800 |
| trunk | unchanged | 10 | 120 | 1,200 |
| flag | unchanged | 2 | 800 | 1,600 |
| shutter (new) | two panels 0.45×1.3×0.04 at x ±0.705, y 0..1.3, z 0..0.04, without back faces, vertex colour 0.8; metres, scale 1 | 20 | 160 | 3,200 |
| pot (new) | open Cyl(0.16, 0.12, 0.28, 6) at y 0.14, baked `#9a4a2e` (12); Icosahedron(0.24, 0) at y 0.42, baked `#5d7a3a` (20). The instance colour is grey jitter 0.88-1.0 | 32 | 140 | 4,480 |
| **Total** | | | | **89,720** |

All baked colours go through `Color` (linear).

**Oriented pieces.** Window and shutter are no longer symmetric, so add `Builder.facing(piece, kind, face, cx, y0, cz, w, h, depth, c)`.
- face `'x-'` → rotY −π/2, `'x+'` → +π/2, `'z+'` → 0; the unit +z points out of the wall.
- It records the full AABB including the pane, sill and shutters. A window sticks out 0.19 m; the lane face stays at |x| ≥ 16.86.
- Lane-face windows use the face that points toward the lane: `out < 0` → `'x-'`.

**Placement changes in `placeDecor.ts`** (order unchanged except where noted; rng draws stay deterministic):
1. **Windows** on column ≤ 1 lane faces and z1 faces go through `facing`.
   - **Shutters:** column-0 lane-face windows only, 40 % chance, same face, centred on the window, colour picked from [`#4a2c1c`, `#5a3622`, `#7c3e2e`, `#2e6b47`].
2. **Tiled eaves.** `roof()` keeps the w+1, d+1 footprint and height 1.5, through the new unit. No other change; tile roofs stay at |x| < 35.
3. **Balconies:** still 50 % on column 0. Rails use the carved unit, and each deck gets 2 pots at z = zc ± (len/2 − 0.4), x at the deck centre, y fy + 0.15.
4. **Flat roofs (|x| ≥ 35):**
   - Delete the `'stand'` box.
   - 85 % of flat roofs get a stilt tank at (tx, y1, tz) with r 0.8: scale (1.6, 1, 1.6), recorded height `TANK_UNIT_H`, colour black `#26282c` or green `#2e6b47`.
   - 30 % of those, when d ≥ 5, get a pair: a black and a green tank 1.9 m apart along z.
   - 50 % of flat roofs get 2 pots at the parapet corners nearest the lane.
5. **Trees:**
   - three lane trees per terrace: sides −1, +1, then `rng < 0.5 ? −1 : +1`
   - x = side·U(11.5, 14), z = U in successive thirds of [tb.min.z + 3, tb.max.z − 3]
   - gap-tree chance 0.30 → 0.45
   - canopies use the rounded unit; trees keep the ground + 6 rule
6. **Terrace steps.** These are new; build them after the pagodas and before the houses.
   - For each consecutive pair (upper U, lower L) from `terraceBoxes`, with Δ = U.max.y − L.max.y > 0.6:
     - one flight, side = +1 for even pair indexes and −1 for odd
     - n = min(24, ceil(Δ / 0.5)) steps; rise r = Δ/n; tread t = min(0.45, 7.5/n)
     - step k (0..n−1): body box, kind `'stair'`
       - x from side·(8 + k·t) to side·(8 + (k+1)·t)
       - y from L.max.y to L.max.y + (k+1)·r
       - z from U.min.z − 2.1 to U.min.z − 0.55
       - colour paving `#8e7a66`
   - The run stays inside |x| 8..15.5. Skip the whole flight if any step fails `B.allowed`.
7. **Pagodas.** Three landmarks: (−48, −70) at scale 1, (52, −150) at scale 1, and (−40, −200) at scale 1.25 with 4 tiers.
   - **Plinth:** 3 brick steps, widths 9 / 7.6 / 6.4 × s, each 0.5 × s tall.
   - **Tiers:**
     - widths 6.0 / 4.4 / 3.0 (4th tier 2.0) × s; heights 3.6 / 3.0 / 2.6 (2.2) × s
     - a cornice under each roof
     - roof footprint = tier width + 2.2 × s, height 1.4 × s, using the eave unit
     - tier 1 gets 2 windows per face through `facing`
   - **Finial:** brass `#9a7a3a` (parapet kind `'finial'`), 0.3 × 2.4 × s.
   - **Footprint.** The house-lot blocking half-size becomes 6·s + 0.5 (was a fixed 5).
8. **Prayer flags:**
   - The column-0 neighbour chance goes from 0.45 to 0.70.
   - New: 4 strings per pagoda from the finial top to points 10·s m away diagonally, at the height of the nearest house roofTop + 2.2 or the pagoda plinth top + 4, whichever is higher.
   - Every string keeps 12 flags, 8 % sag, the 4 m anchor exclusion and the |x| ≥ 16 rule (drop a string that crosses the lane).
9. **Birds** (`birds.ts`):
   - `export function buildBirds(): Mesh`, named `decor_birds`, added by `buildDecor` and not recorded as boxes
   - 5 birds × 2 tris: wing tips L and R, body front and back; wingspan 2.4 m, body length 0.5 m
   - one BufferGeometry, MeshBasicMaterial `#2b1d1a`, DoubleSide, fog false, frustumCulled false
   - In `onBeforeRender(_, __, camera)`, with t = performance.now()/1000 and bird k = 0..4:
     - orbit centre = camera.position + (60, 22, −115)
     - angle = 0.12·t + 2πk/5, radius 18 + 3k, height offset 3·sin(0.7t + k)
     - flap: tip y = 0.45·sin(2π·2.2·t + k) while sin(0.25t + k) > −0.3, otherwise glide (tip y +0.15)
   - Write the 20 position floats in place, set needsUpdate, set the mesh position, and call `updateMatrixWorld`. The callback uses only module scratch objects.
10. **Stats.** `drawCalls = instanced + 1 (ground) + strings + 1 (birds)`.

**decor.test expectations:**
- F4 fix: count InstancedMesh by `decor.traverse`; expect ≥ 13 and ≤ 16.
- Determinism (same seed gives identical boxes; seed 7 differs) is unchanged.
- The kinds present now include `stair`, `pot`, `shutter` and `finial`, and `stand` is absent.
- `kitTriangleCeiling() ≤ 90_000`, `stats.triangles ≤ 90_000` and `stats.drawCalls ≤ 16`.
- Lane and collider clearance:
  - The `violatesLane` exemption is extended. Kind `'stair'` may enter the lane iff min |x| ≥ 7.9 and max.y ≤ groundAt(cx, max.z + 0.6) + 1e-6, and that ground is higher than groundAt(cx, cz).
  - Add a test that a stair step violating either condition is flagged.
- Flat roofs and tanks stay at |x| ≥ 34.5.
- Exactly 3 finials, with one finial at x < −30 and z < −190.
- Birds: 10 tris; calling `onBeforeRender` twice with a stub camera at different times moves at least one tip; the material is MeshBasic.
- Level leaves ≤ 60 is unchanged.

**done_when:**
- `pnpm vitest run tests/adapters/decor.test.ts` and `pnpm typecheck` both exit 0.
- The diff touches only the four owned files.

## 5. L-SKY: sun valley, draw order, horizon haze, glow

**Files:** `src/adapters/render/skyView.ts`, `tests/adapters/sky.test.ts`. `scene.ts` is not changed.

**How the sun stops being hidden (F3):**
1. **Raise the sun.**
   - SUN_EL goes from 5° to 8°: `SUN_DIR = (sin32°·cos8°, sin8°, −cos32°·cos8°) = (0.5248, 0.1392, −0.8398)`.
   - Export `SUN_EL_DEG = 8` and `SUN_AZ_DEG = 32`. The key light is untouched.
2. **Sun valley (saddle) carved into every mountain layer**, deterministic, at build time, after the ridge `top[i]` is computed (keep `top0[i]`, the uncarved value):
   - Eyes are E = (x, 4 + 0.37·z, z) for z = 10, 0, …, −210 and x ∈ {−7, 0, 7}.
   - The sun's horizontal direction is h = (sin 32°, −cos 32°). Solve |E.xz + d·h − C| = R (C = (0, −110)) for the positive root d, and take θhit as the ring angle of the hit point.
   - cap = E.y + d·tan(SUN_EL − 3°). For each vertex i, let arc = R·|wrap(θ_i − θhit)|:
     - arc < 30 → lim = cap
     - arc < 90 → u = (arc − 30)/60, lim = cap + smoothstep(u)·(top0[i] − cap)
     - otherwise skip the vertex
   - `top[i] = max(MOUNTAIN_BASE, min(top[i], lim))`
   - The result is a valley that descends with the route; the sun sits in it all the way down.
3. **Draw order.** The dome's renderOrder goes from −1 to −2, the core gets −1 (core and dome stay opaque, `depthWrite false`), and the mountains keep 0.
   - The core therefore always draws before the mountains, which paint over it only where they really are in front of it. That cannot happen inside the valley.
   - The glow stays `transparent` + Additive, so it draws after all opaque geometry and blooms over the ridge silhouette.

**Glow.** CircleGeometry(120, 32) (was 83), colour `#ffc070`, centre alpha 0.5, rim 0.

**Horizon haze** (new, additive):
- `horizonHaze`: open Cyl(240, 240, 42, 48, 2, open) in the sky group, centred at y +9, spanning el −2.9° to +7.1° at r 240.
- Vertex alpha by row, bottom/middle/top: 0, 0.35, 0. Each vertex's alpha is multiplied by 0.4 + 0.6·max(0, ĥ·h_sun)².
- Colour `#ffb070`, MeshBasic, vertexColors (RGBA), AdditiveBlending, transparent, depthWrite false, depthTest true, fog false, side BackSide.
- At r 240 it sits inside every mountain (≥ 250 m away along the route), so it veils them, while the city in front occludes it.
- 192 tris.

**sky.test expectations:**
- "SUN_DIR is 32° right of −Z and 8° up": `toBeCloseTo(8, 0)`.
- Glow and core at 470 along SUN_DIR, facing the origin (unchanged).
- Glow centre alpha 0.5, rim 0, radius 120.
- `skyDome.renderOrder === -2` and `sunCore.renderOrder === -1`.
- Haze: name `horizonHaze`, blending Additive, `depthWrite` false, max vertex alpha ≤ 0.35.
- Radii 360-480, bottoms −200 and determinism are unchanged.
- Sky + mountains < 3,000 tris.
- **New ridge test.** For eyes z = 10 → −210 every 5 m and x ∈ {−7, 0, 7}, intersect the horizontal sun-azimuth ray with each layer's top polyline (2D segment intersection, interpolating top y). Assert atan((y − E.y)/d) ≤ SUN_EL − 1.5°. The core's half-angle is 1.1°, so the whole disc clears the ridge.
- The pixel-ratio tests are unchanged.

**done_when:**
- `pnpm vitest run tests/adapters/sky.test.ts` and `pnpm typecheck` both exit 0.
- The diff touches only the two owned files.

## 6. Order, engines, verification

**Lane order:**
- L-HERO, L-ROPE, L-KIT and L-SKY are file-disjoint and run in parallel.
- Each lane runs only its own vitest file plus `pnpm typecheck`. A full `pnpm test` while siblings are mid-edit is not a signal.
- Integration (the `levelView.ts` line) runs after L-ROPE is green. The full verification runs after all four lanes.

**Engines** (Rule 2; flags checked before dispatch; Haiku is the first fixer, then Sonnet):

| Lane | Engine | Why |
| ---- | ------ | --- |
| L-SKY | hunter-pro: run 1 `skyView.ts`, run 2 `sky.test.ts` | one file per run, spec complete to the constant |
| L-HERO | hunter-pro: run 1 `heroRig.ts`, run 2 `heroPose.test.ts` | one file per run, full mesh table |
| L-KIT birds | hunter-pro: `decor/birds.ts` | one self-contained file |
| L-KIT kit + placement | Sonnet | `kit.ts` and `placeDecor.ts` are coupled (unit exports, `facing`, lane exemption) |
| L-ROPE | Sonnet | two coupled source files plus a new test, with frame math |
| Review | Sonnet seat per lane diff; never Opus | |
| Integration + full verify | controller | |

**Verification ladder** (controller, in order):
1. `pnpm lint && pnpm typecheck && pnpm test && pnpm validate:levels && pnpm build`, all exiting 0.
2. Budgets: open `pnpm dev` with `?debug` and read `renderer.info.render`.
   - calls ≤ 80 and triangles ≤ 120k at three shots: spawn, attached to route[1] mid-chord, and the last 20 m before the goal facing the sun
   - instanced ≤ 16 (from the decor test)
   - additive count = 5 (source grep `AdditiveBlending` in mesh materials)
3. Lane clearance: decor.test (lane, collider, stair exemption) plus rope.test #6. `validate:levels` passing shows no gameplay change (decor has no colliders).
4. Determinism: decor boxes (seed 1729 twice; 7 differs), mountain positions, rope post positions. A grep of the touched files for `Math.random` finds nothing.
5. Screenshots at 640×360 and 1920×1080 of the three shots, compared side by side with the reference. All of these must be visible:
   - the sun clear of the ridge on every shot
   - the trail rope entering from the left of the frame on the attached shot
   - the post plus binding in the spawn shot
   - tanks on stilts, flags, at least 2 pagodas, birds near the sun
   - the tunic distinct from the face at 640×360
6. Perf spot check on a touch device or emulation at pixel ratio 1.5: no frame-time regression of more than 10 % against main.

## 7. Cut-first list (cut in this order if any budget, test or schedule fails)

1. Birds (−1 call, −10 tris; birds.ts is never wired in).
2. Shutters (−1 instanced mesh, −3.2k ceiling).
3. Pots (−1 instanced mesh, −4.5k ceiling).
4. Third pagoda at (−40, −200).
5. Rope camera-clearance push (keep the trail).
6. Horizon haze (−1 call, −1 additive).
7. Canopy detail 1 → 0 (Icosahedron(1, 0), −6.6k ceiling).
8. Hero thigh panels (−2 calls; the yoke alone carries the dress).

The sun valley, the colour-space fixes (F1, F2, F4) and the gloves are never cut.

## 8. Consequences and risks

- **Decor ceiling 80k → 90k.** The headroom to 120k is still ≈ 25k at worst case (all caps full). Watch `PIECE_CAP` creep; a cap raise needs an ADR line.
- **Sun valley.** From the low eyes, the near ridge peaks reach about 26° next to a valley floor at about 5°. That can read as a gorge rather than a skyline. If it looks wrong on screenshots, lower the near layer's peak range to 20-50 before touching the valley maths.
- **New exceptions to D1** (both are covered by tests):
  - the stair exemption (`'stair'` inside the lane up to the upper terrace top, |x| ≥ 7.9)
  - one rope post per level beside the spawn roof
- **Rename `top` → `tunic`** breaks any out-of-lane reader of `HERO_COLORS`. Grep found none on 2026-11-06.
- **Cross-file state.** `ROPE_TIE` is module-level mutable state shared between `ropePost.ts` and `ropeView.ts`, both in one lane. A level reload rewrites it in `buildRopePost`.
- **Camera-relative birds and sun.** They never get closer while the hero moves, which is intended for distant kites.
