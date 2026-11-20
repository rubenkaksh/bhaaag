# Opus verdict: houses, parkour level, tilt assist, tile texture (2026-11-20)

Input: `docs/plans/2026-11-20-three-tasks.md`, the 9 images in `art/refs-2026-11-20/`, PRODUCT.md, CLAUDE.md,
graphics-spec, ADR 0013/0014/0015/0016, `src/content/{house,graph,builder}`, `cameraRig.ts`, `pathCamera.ts`, `game.ts`.

**Mission check: no conflict.** "Far fewer ziplines" fits the 2026-11-13 graph-level amendment (parkour moves *plus*
the zipline); Valley Run is the precedent. The new level keeps at least one zip (sketch: one, at the end), Classic L1
stays zip-first, so the Product Purpose holds. The tilt assist is opt-in per level (owner briefed it; 2026-11-11 revert respected).

**Facts that shaped the verdict:**
- Two level pipelines exist. Graph levels (`content/graphs/*.graph.json` → `place.ts` → kit v2 `emitHouse`,
  `houseV2.ts`, archetypes, hay/tramp/crate props, bends via `segments`, opt-in `pathCamera`) and builder levels
  (`content/builders/*.builder.json` → `builder/compile.ts`). The builder emits its own plain boxes with roofs at
  7/11 m, not kit v2's 3.2/6.0 m decks, and has no archetypes or props. It cannot express this level today.
- Already built: hay cushion (`HK.haySize` 2.4, top 0.9, a cushion slab) with the tin and tarp cover (`hayCover`, look 'home'),
  ledge grab and mantle up to 2.8 m (one storey), trampolines, crates, sheds, awnings (slip-1 ramps), archetypes A1-B2.
  `tin.jpg`, `straw.jpg`, `roof_tile.jpg`, `roof_home.jpg` already ship.

## 1. Asset route

| Item | Route | Why |
|---|---|---|
| House C1 "verandah" (IMG_1689) | Procedural kit v2 + existing textures | Boxes, rails, posts, one awning; all kit pieces |
| House C2 "stepped" (IMG_1690) | Procedural: two touching kit v2 houses + eave skirt mesh | Every part is a box or a tilted slab |
| House C3 plain gable (IMG_1659) | Procedural gable (`levelView` gable prism exists) + `tin.jpg` | Corrugated tin is already a tile |
| Haystack (IMG_1663_2) | Procedural: existing `hay` prop; add a dome cap on Medium/High | `straw.jpg` + `hayCover` exist; cream tint keeps the "safe" colour |
| Rock (sketch) | Procedural: crate solid, `stone_warm.jpg`, squashed | One step piece |
| Ladder (sketch) | Procedural decor only (two rails + rungs, instanced) | Visual cue over a mantle wall; no sim object (see 3) |
| Clay tile texture (IMG_1662) | **One generated image**, then `tools/cartoonify.py --mode tile` | The photo shows tiles **stacked** on tin at an oblique angle, not a laid roof. No crop gives a laid course, so cartoonify alone yields a "pile of tiles" pattern. The handoff already lists "no top-down view of tile roofs" as missing. |
| Level layout | None (hand-authored graph JSON) | |

Generated image needed: exactly one. Not a sprite. It is source material for cartoonify, so palette, budget and colour language still go through the tool.
- Size 1024x1024 PNG, strictly top-down orthographic (the camera square to the roof plane), seamless on both axes,
  flat even light with no cast shadows or vignette, no sky, no stacks. cartoonify then cuts it down to 128 px (Low) and 256 px (Medium/High) JPEGs.
- Prompt (paste as is, attach IMG_1662 as the reference):
  > Seamless tileable texture, strictly top-down orthographic view of a laid roof of old interlocking Marseille-style
  > clay roof tiles, as in the reference photo (worn, weathered, dark brown-red clay with grey lichen spots, raised
  > ribs along each tile, overlapping rows). Even flat overcast lighting, no shadows from outside the frame, no
  > perspective, no sky, no stacked tiles, no corrugated sheet visible. About 6 tiles across and 4 rows down, edges
  > wrap seamlessly left-right and top-bottom. Square, 1024x1024.
- Save it as `art/refs-2026-11-20/gen-clay-tile.png` (not in git). Fallback if the owner skips it: crop the front face of the lowest stack
  (box ~140,940,1140,1400) with `--mirror`, accept the "stacked" read.

## 2. Task 1: house specs (8 x 8 m kit footprint, storey 2.8 m, decks at 3.2 / 6.0 m, ADR 0013)

**C1 verandah house (IMG_1689; refs IMG_1648 shopfront, IMG_1657_2 lean-to).** I read the sketch rotated 90 deg: arched door at the bottom left, set-back upper storey on top.
- 2 storeys, flat walkable roof (deck 6.0), parapets per kit rule (0.45 takeoff, 1.2 lethal sides).
- Full-width first-floor balcony on the front face: new spec field `balconyFull: true` → deck 7.6 w x 1.2 d at g+3.2,
  rail on the 3 open sides (the existing rail rule). AABB: one solid deck plus rail solids, the same types as today, wider.
- Ground floor: 3 front posts under the balcony (0.25 m square). **Solids** (style 4), so the hero cannot run through what he sees.
- Side lean-to over the side door: the existing awning (slip-1 ramp) on a side face, rendered with `tin.jpg` and round log ends.
- The box on the right of the sketch is the existing `shed` prop (top 2.2): a step from the street to the balcony is out
  (3.2 > reach). It is a step to the awning.
- "Set back" upper storey: visual only (the balcony already sits outside the body). No core change.

**C2 stepped house (IMG_1690).** A wide 1-storey block plus a 2-storey block on its right half, each roof a flat tiled top inside a sloped eave skirt.
- Built as **two touching kit v2 houses** (one 1-storey, one 2-storey, a party wall between them), like the 'touch' edges in valley-1.
  The lower deck (3.2) is a walkable terrace. The climb from it to the upper deck (6.0) is 2.8 m, exactly the grab-and-mantle
  reach in ADR 0013's table (0.28 m margin). This is the sketch's "climb up", with no new mechanic.
- Eave skirt: a visual slab ring hanging 0.5 m outward and down from each deck edge, below the parapet. No collider,
  so it never looks standable above the deck height.
- **IMG_1662 tile texture goes on the C2 eave skirts and on every sloped (slippery, non-route) roof**, C3 included as an option.
  Never on a walkable deck: clay terracotta would collide with the "terracotta = danger" language. Sloped tile roofs already
  mean "do not stand here", so they agree. Walkable decks keep the neutral deck tone.

**C3 plain gable house (IMG_1659, no sketch).** 2 storeys, no balcony, no walkable roof. The roof is two slip-1 ramps (ADR 0002,
existing core) at about 30 deg with a ridge on the long axis, no parapet, rendered with `tin.jpg` (default) or the clay tile.
Used as filler and as decoys beside the route. Body solid up to the eaves. No core change.

Kit work: new archetypes `C1`, `C2lo`/`C2hi` and `C3` in `archetypes.ts`; `HouseSpec` gains `balconyFull?`, `roof?: 'flat'|'gable'`,
`eave?: boolean`; `emitHouse` and `houseV2` read them; the piece caps and the <= 24 instanced-mesh guard (`budget.test.ts`) still hold.

## 3. Task 2: level. Pick **Option B, a new graph level** (`content/graphs/hay-run.graph.json`, "Hay Run")

Why B: Nagarkot is a seeded 100-house generator (ADR 0011/0012, frozen, hash tests). Reworking it means changing a generator
and its maze BFS. The sketch is a ~12-house hand route with one bend: that is a graph level with `segments` (ADR 0015),
the same machinery as Home Street. Nagarkot stays untouched.

Layout from IMG_1692 (sloppy sketch, so my reading). The run goes right along the ridge, takes a U-bend, and comes back left lower down:
- Seg 1 (heading 90): start on C2hi (the hero on the upper roof) → `touch` down to C2lo ("Jump"), drop one storey onto a long 1-storey
  house ("Sprint" across its deck, a 0.45 takeoff parapet at its far end) → `gap via cushion`: the dive off the end down the slope
  into the **haystack**.
- Seg 2 (heading 180, the bend): hay patch → rock + crate steps → C1/C2 cluster; **climb up** C2lo→C2hi by mantle, with ladder decor on that
  wall → `touch` across the 2-3 joined houses on the right, stepping down.
- Seg 3 (heading 270): drop to the street → `gap via tramp` (the **trampoline**) up onto the gable cluster (decks between C3 decoys) →
  jumps west over the left cluster → **one zip** from the last left house down to the goal house at the bottom left.
- Totals: about 12 route nodes, 1 zip, 1 cushion, 1 tramp, 1 mantle climb, plus decoys. Under 2 minutes.

New mechanics: **none in `src/core`.** The haystack dive is the existing cushion. Climb-up is the existing grab and mantle (2.8 m).
The ladder is decor. Possible gaps, each small:
- A "dive" pose on a cushion landing: render only (`heroPose`/animEvents).
- A real ladder (climbs over 2.8 m) would be a new hero state in `sim.ts` (ladder AABB volume, stick-up = climb at a fixed
  speed, top = mantle), roughly 80-120 lines plus tests and a high-risk core change. **Do not build** unless playtest asks for it.

Format and registration ("symlink into the builder"):
1. `graph/format.ts`: node gains `archetype?: ArchetypeId` and `ladder?: Face`; `place.ts` passes the archetype to `archetype()`.
2. `graph/registry.ts`: one line, `{ id: 'hay-run', label: 'Hay Run', file: hayRun, look: 'home', pathCamera: true, tiltAssist: true }`.
   That alone puts it in Classic's level row (ADR 0016).
3. Builder: make the builder speak kit v2 so the owner can place these pieces himself. `builder/format.ts` house gains
   `archetype?: ArchetypeId` (absent = today's box). `compile.ts` emits through `emitHouse` when it is set; `builderPage.ts`
   palette lists `ARCHETYPE_IDS` (one shared registry, no copy). Fixing the 7/11 m vs 3.2/6.0 m roof mismatch is part of this.
   No builder level ships yet, so nothing breaks. This is after the level, not blocking it.

## 4. Task 3: camera tilt assist, feasible and small

Ownership: `src/app/game.ts` (camera tick around l.395-425; `pitch = cur.camPitch - camTilt`), rig math in
`src/adapters/render/cameraRig.ts` (clamps to `camera.pitchMin` -60 deg), heading in `src/content/graph/pathCamera.ts` (`PathCam`).

Design (render only; sim `camPitch` and aim untouched, like `?tilt`):
- New pure module `src/content/graph/tiltAssist.ts` (no three, no DOM): `assistPitch(state, hero, target, dt, cfg) → extra pitch-down (rad)`.
  `target` = the next exit node of `PathCam` (add `nextTarget()` returning x, z and deck y from `placed.houses`).
- Fires when **all** hold: grounded on a deck; speed < 1.5 m/s for 0.4 s (standing, unsure); target **ahead** (|bearing - cam yaw| < 60 deg);
  target deck at least 1.5 m below the hero; horizontal distance <= 25 m. Behind or to the side → no tilt (owner's sketch rule).
- Eases total pitch to **-75 deg** over 0.5 s; releases (0.3 s) on movement > 1.5 m/s, airborne, attached, or any look-drag
  (the same `paused` rule as PathCam). On assist levels `camCfg.pitchMin` becomes -78 for the rig clamp only.
- Opt-in: registry flag `tiltAssist: true` (it needs `pathCamera`); `?assist=0` turns it off for A/B. Every other level is byte-identical.

Risks: (1) Owner reverted a camera change on 2026-11-11, so per-level opt-in only and he judges it on the phone.
(2) The centre reticle and desktop aim are off under a render-only tilt (T297 review): hide the reticle while assist > 10 deg.
(3) At 75 deg the arm can clip into the hero's own roof. The existing capsule sweep handles walls; check the arm floor on decks.
(4) Bloom and shadow frustum (26/34 m) follow the camera focus, so a steep view may show the shadow edge on High.

## 5. Build plan (order binding: houses → level → camera). Opus owns design only.

| # | Step | Engine | Risk | done_when |
|---|---|---|---|---|
| 0 | Owner generates `gen-clay-tile.png` from the prompt above | owner | low | file exists, 1024 px, seamless (checked by eye with a 2x2 tile) |
| 1 | Clay tile: cartoonify → `public/assets/textures/roof_clay.jpg` (128 Low, 256 Medium/High); add a `textureManifest` row | junior (hunter) | low | `textureBudget.test.ts` green; Low total <= 150 KB, High <= 600 KB |
| 2 | Kit: `balconyFull`, `roof: 'gable'`, `eave`, posts; archetypes C1, C2lo/hi, C3; houseV2 render (eave skirt, gable, ladder decor, clay map on slopes) | junior (cursor), fallback Sonnet | med | new archetype tests in `tests/content/` (AABB counts and heights per spec above); `budget.test.ts` <= 24 meshes, refused 0 |
| 3 | Graph format `archetype?`, `ladder?`; `place.ts` passes them on | junior (hunter) | low | format test parses a node with archetype; existing graph hash tests unchanged |
| 4 | `hay-run.graph.json` (3 segments as in 3) + registry line | Sonnet | med | graph reachability test green; every gap within the ADR 0013 reach table; the bot or a scripted run reaches the goal |
| 5 | Haystack dome cap + dive landing pose (render only) | junior (hunter) | low | visual check at 390x844 Medium |
| 6 | `tiltAssist.ts` + `PathCam.nextTarget` + game.ts wiring + `tiltAssist` registry flag + `?assist=0` | Sonnet | med-high | unit tests: ahead and below → -75 deg; behind or side → 0; release on move or look; other levels' camera output unchanged (snapshot) |
| 7 | Builder speaks kit v2 (`archetype?`, `emitHouse`, palette) | Sonnet | med | builderStore and compile tests; a sample builder file with C1/C2/C3 compiles and plays |
| 8 | Phone check per CLAUDE.md: `vite preview --host 0.0.0.0 --port 4174`, QR PNG, 390x844 + 844x390, Low + High | controller | low | 200 returned, QR shown; "not verified on device" until the owner reports |
| - | Real ladder state in core | not scheduled | high | only if step 4's playtest needs a climb over 2.8 m; then its own Opus design note |

Gates (lint, typecheck, test, build) run per step by the controller through rtk, never by a premium seat.

premium: owns=verdict, handed down=all building, cap=40 calls
