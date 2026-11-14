# Home assets handoff: Kathmandu hill houses, terrain and obstacles

Status: DRAFT for owner review (2026-11-14), reviewed by Opus the same day. Photo sizes are estimates (guesses, not
measurements). Nothing here changes game code. 6 open questions remain in section 7 (original numbers kept).

## 1. Purpose and scope

Purpose: turn the owner's photos and pencil sketch into a design brief for house archetypes, terrain
layout rules and gameplay obstacles, expressed only as primitives the core already understands
(AABB solids, ramps, gable roofs, cushions, trampolines, anchors). No models, no GLB.

Checked against `PRODUCT.md` Non-goals:
- No GLB asset pipeline, no custom shaders: houses are boxes and ramps, textures are small baked tiles.
- No level select, no multi-level content beyond the allowed set: Classic L1, Nagarkot Run, Cloud
  Village, and graph levels (each a lobby entry, lean-scope Amendment 2026-11-13).
- No melee combat (balconies and roofs are for movement only).
- No new collision types for Cloud Village (Amendment 2026-11-12: "new collision types" are out).
- Texture budget (corrected in review, R2): ~150 KB added max is the 2026-11-09 graphics-overhaul
  allowance (lean-scope Budget, PRODUCT.md Principle 5); about 137 KB of tiles already ship in
  `public/assets/textures/` (roof_tile, wall_plaster, wall_brick, brick_a, stone_warm, terracotta_a,
  each with a normal map). "0 KB new by default, owner approval above 300 KiB" is the Cloud Village
  amendment (2026-11-12). House kit v2 itself uses "no new textures" (ADR 0013 s1.4).

Where this applies (answered from the docs in review, R1; was Q1):

| Area | In scope | Notes |
|---|---|---|
| Classic L1 | No (frozen) | Lean-scope Amendment 2026-11-13: "Classic L1, Dragon Chase, Nagarkot Run and Cloud Village are frozen and unchanged". |
| Cloud Village | No (frozen) | Same amendment. Also hand-placed v1 JSON (`content/levels/village.json`), not kit v2. |
| Nagarkot Run (generated) | No (frozen) | Same amendment; ADR 0013 s3.3 "this ADR's generated Nagarkot Run stays frozen". |
| Valley Run (`valley-1`, shipped graph level) | No (frozen) | `tests/content/graphFreeze.test.ts` hashes its level JSON. |
| New graph level(s) | Yes, the only target | Graph file + fixed seed + kit v2 + own lobby entry (ADR 0013, Amendment 2026-11-13). The "real level" from the notes is a NEW level. |

## 2. Reference inventory

Filenames are the upload names; IMG numbers in brackets. Family: A = rural hill house, B = city house,
T = terrain/layout, S = standalone prop.

| Image | Shows | Family | Gameplay features implied |
|---|---|---|---|
| 3cef35a7 (IMG_1657) | Two-storey mud/brick house, sloped corrugated-tin canopy over entrance; red brick toilet block to the left with a water tank nearby | A | Canopy landing (from roof or zipline); jump from canopy or ground-level run to toilet block roof; tank as a visual landmark or obstacle |
| 2264a925 (IMG_1656) | Same house, side view: cantilevered metal-sheet awning, cracked mud plaster, timber-framed eave | A | Awning as an overhanging ledge (grab or landing); timber eave as a visible ledge line; plaster texture |
| 573855f4 (IMG_1658) | Small mud house, cracked mud-plaster wall, sloped roof, porch | A | Low porch step; low gable roof (slippery tile ramp); small first-shelf house |
| 0cd56830 (IMG_1659) | Low stone-and-mud house, overgrown, flat or low roof, garden plot below | A | Flat roof as a safe pad; garden plot as a lower shelf (drop between shelves); stone base texture |
| 5e743baa (IMG_1654) | Brick and mud two-storey house, corrugated tin on gable upper walls, banana plant | A | Taller two-storey block; tin gable end as a wall (cling or kill by vCling rule); banana plant as dressing only |
| eecf70d6 (IMG_1648) | Modern city building, brick, three storeys, curved corrugated roof, shop front on ground floor | B | Tall block (about 3 storeys); curved tin roof (approximate as a low ramp pair or flat box); shop front awning. Only ground floor seen: upper floors are IMAGINED (Q6) |
| fbc63538 (IMG_1649) | City street building, brick with white trim, two storeys, tiled roof, rooftop with prayer flags and string lights | B | Rooftop as a walkable pad; prayer-flag and string-light lines as anchor candidates (gold) or decoration; tiled roof ramps |
| 7cf27e0c (IMG_1662) | Close-up worn clay tile roof over corrugated sheet, timber ridge pole | A/B | Tile texture; ridge pole as a visible ridge line; no pitch or layout visible (inferred) |
| cfdde277 (IMG_1661) | Second close-up of tile roof over corrugated sheet, timber ridge | A/B | As above; second tile variant |
| a470a679 (IMG_1663) | Dried wheat/straw stack with corrugated sheet and tarp on top | S | Hay stack = soft landing target from height (Assassin's Creed leap of faith). Maps to existing cushion (Q9) |
| 98929fbd (IMG_1665) | Distant hillside village | T | Terrain contour, road line, houses on shelves |
| f7ff4608 (IMG_1667) | Distant hillside village, tiled-roof house on a slope, water tank on concrete rooftop behind | T/A | Houses stepped on slope; rooftop water tank as an obstacle or landmark |
| 7617907d (IMG_1664) | Distant hillside village | T | Same as above; road line decides layout |
| 22c108e0 (sketch) | Pencil sketch: hillside with contour line, switchback road, houses on flat shelves clustered along the road, no straight downhill run | T | Layout reference (section 4) |

## 3. House archetypes

Conventions (all guesses, to be confirmed in Q5):
- 1 unit = 1 m, Y-up. Houses use yaw 0/90/180/270 only. Sizes are footprint W x D x H to the eave
  unless stated. Estimates assume a storey of about 2.7 m and a door about 2.0 m; photos have no
  scale reference.
- Parts map to existing core concepts: `solids` (AABB; `style` 0 ground, 1 body, 2 roof, 3 danger,
  plus kit v2 codes 4 parapet/rail, 5 balcony, 6 prop in `src/content/house/houseSpec.ts`),
  `ramps` (single slope, `slopeAxis`, `rise`, per-ramp `slip` in level JSON), `roofs` (gable prism =
  two slip-1 ramps; used by L1 only, the graph placer emits none), `pads` (v1 levels only),
  `cushions`, `tramps`, `anchors`, `lines`.
- Binding for a new graph level (review, R3): house kit v2 (ADR 0013 s1.1) is "one size for every
  house": 8 x 8 m footprint, plinth 0.4, storey 2.8, 1 or 2 storeys (never 3), flat walkable roof
  deck with 0.45/1.2 m parapets, optional balcony (2-storey only), outside stairs, awnings, pole.
  The sizes in the tables below are photo estimates; each archetype is built as a kit v2
  `HouseSpec` (see "Kit v2 mapping" rows). Other footprints, gables or a third storey are a new kit
  version (new code path, new level only; conflict 11).

### A1. Rural two-storey house with canopy and toilet block (IMG_1657, IMG_1656)

| Part | Primitive | Approx size (guess) |
|---|---|---|
| Main body | 1 box solid, style 1 | 7 x 5 x 5.6 m (two storeys) |
| Roof | gable `Roof` or a flat box with a thin tin ramp | ridge about 1.2 m above the eave |
| Entrance canopy | 1 `Ramp` (slopeAxis away from wall) on a thin solid, plus 2 post boxes | 3 x 1.5 m, rise 0.4 m, low edge about 2.6 m high |
| Side awning (IMG_1656) | thin box cantilevered from the wall | 3 x 1.2 x 0.1 m at about 3.0 m |
| Toilet block | 1 box solid, style 1 with a flat roof pad | 1.5 x 1.5 x 2.2 m, 2 to 3 m from the house |
| Water tank | 1 cylinder approximated as a box (or decor only) | 1 x 1 x 1.2 m on a stand |
| Ledges | timber eave line as a 0.2 m overhang, optional | along the roof edge |

Kit v2 mapping: 2 storeys, `awnings` on the entrance face (kit awning 3.6 x 1.5 m, 2.2 to 2.7 m,
slip 1, 18.4 deg: slides). The 0.4 m rise over 1.5 m guessed above is 14.9 deg, under
`roof.slipDeg` 15, so it would NOT slide; use the kit awning (review, R4). Toilet block and side
awning have no kit piece (Q12); tank is render-only roof clutter.
Features: land on the canopy (slides you off, breaks the fall; ADR 0013 s1.1); jump from canopy to toilet roof
(gap 2 to 3 m, height drop about 0.4 m); climb from canopy to upper balcony or roof via the existing
CLIMB or auto-mantle (parkour flag).
Materials: mud plaster (cracked), exposed red brick (toilet), corrugated tin (canopy), timber (eave).

### A2. Small mud house with porch (IMG_1658)

| Part | Primitive | Approx size (guess) |
|---|---|---|
| Body | 1 box, style 1 | 5 x 4 x 2.8 m (one storey) |
| Roof | gable `Roof`, tile | 1.1 m rise |
| Porch | thin slab or step box in front, plus roof overhang | 4 x 1.5 x 0.3 m step; posts 2.2 m |

Kit v2 mapping: 1 storey, flat deck at 3.2 m (no gable), optional roof stairs; the porch step is the
0.4 m plinth (= `hero.stepUp`, walk-on, no mantle).
Features: low roof landing from the shelf above; porch as a step.
Materials: cracked mud plaster, clay tile.

### A3. Low stone-and-mud house with garden (IMG_1659)

| Part | Primitive | Approx size (guess) |
|---|---|---|
| Body | 1 box, style 1 | 6 x 4 x 2.5 m |
| Roof | flat box pad (cream) or very low ramp | thickness 0.2 m |
| Garden plot | a lower shelf slab 1.5 to 2 m below | 8 x 5 m |

Kit v2 mapping: 1 storey; the garden is a street patch (6 x 8 m flat safe ground, ADR 0013 s3.3).
Features: safe roof deck; drop to the garden (1.5 to 2 m falls land clean: free fall from rest is
clean below 2.5 m, rolls to about 8.6 m, kills above; was Q8, see R9).
Materials: dry-stone base, mud plaster, overgrowth (decor only).

### A4. Brick and mud two-storey with tin gable (IMG_1654)

| Part | Primitive | Approx size (guess) |
|---|---|---|
| Lower storey | box, style 1 (brick/mud) | 6 x 5 x 2.7 m |
| Upper storey | box, style 1, slightly set back | 5.5 x 4.5 x 2.7 m |
| Gable end | tin wall (box) plus gable `Roof` | ridge 1.3 m |

Kit v2 mapping: 2 storeys, `tall` (1.2 m) parapets on lethal sides; set-back upper storey and tin
gable are visual only. Window ledges need no marker: grab reads solid tops (ADR 0013 s1.2).
Features: tall wall to cling to or die on (vCling 7.5 m/s); jump + grab up one storey (2.8 m).
Materials: brick, mud plaster, corrugated tin, tile.

### A5. Hay stack (IMG_1663)

| Part | Primitive | Approx size (guess) |
|---|---|---|
| Stack | 1 box (or 2 stacked boxes) | 2.5 x 2.5 x 2.5 m |
| Top | cushion slab flush with the top | thin slab 2.5 x 2.5 |
| Cover | tin sheet and tarp as a thin box (visual) | 2.6 x 2 x 0.05 m |

Kit v2 mapping (review, R5): the existing `hay` prop, 2.4 x 2.4 m, cushion slab at 0.9 m on a
solid (`HK.haySize`, `HK.hayTop`). A 2.5 m tall stack is not a kit size; the tall look is visual
only. Cover and tarp are decor.
Features: soft landing target (cushion: absorbed at any speed, 0.5 s control lock); was Q9.
Materials: hay reads cream (safe) per ADR 0013 s1.4, not yellow-brown; tin and tarp desaturated decor.

### B1. City brick house with curved tin roof (IMG_1648)

| Part | Primitive | Approx size (guess) |
|---|---|---|
| Body | 3 stacked boxes, style 1 | 6 x 10 x 8.5 m (three storeys) |
| Shop front | recessed ground floor box plus a shutter awning | 6 x 1.2 x 0.1 m at 2.8 m |
| Balconies | thin slab, 1 per upper storey | 2 to 3 x 1 x 0.15 m, railing optional |
| Roof | low gable `Roof` (curved tin approximated), or flat box | rise 1.0 m |

Features: balcony grab or mantle; reach roof via balconies; roof pad landing from a zipline.
Materials: red brick, white trim, corrugated tin (curved is visual only; collision is a plain slope).
Kit v2 mapping (review, R6; was Q6): 2 storeys (kit maximum, "never 3"), balcony, awnings on the
shop face (kit gives an awning face a ground-floor shop opening). Upper floor is the kit's.

### B2. City tiled house with rooftop (IMG_1649)

| Part | Primitive | Approx size (guess) |
|---|---|---|
| Body | 2 stacked boxes, style 1 | 6 x 8 x 5.6 m |
| Roof | gable `Roof` with tile texture on part, flat rooftop pad on the rest | pad 4 x 3 m |
| Balcony | thin slab with white trim | 3 x 1 x 0.15 m |
| Flag and light lines | anchors (gold) at two corners | span 4 to 6 m |

Kit v2 mapping: 2 storeys, balcony, `pole` if it is a zip target. Graph levels are `lineOnly 1`
(fixed lines only), so flag lines are decoration (was Q13, R10).
Features: rooftop deck landing; prayer flags as decor (`FLAGS` exists in the v1 path `placeDecor.ts`; `houseV2.ts` has none yet).
Materials: brick, white painted trim, clay tile, prayer-flag colours (must obey three-colour language, Q15).

### Water-tank rooftop (IMG_1667)

Flat roof deck with a 1 x 1 x 1.2 m tank. Corrected (R7): the auto-vault limit is `vault.maxH`
1.1 m (`parkour.airStepUp` 0.5 is the airborne step-up), so a solid 1.2 m tank would NOT be
vaultable. Kit v2 draws `tank` as render-only roof clutter (ADR 0013 s1.4); keep it dressing only
(was Q14).

## 4. Terrain and layout rules

Design rules (user-stated) and what the sketch shows.

Terrain model (shelves):
1. The hill is a stack of habitable shelves: flat AABB slabs (style 0 ground) with steep drops between them.
2. Never one long straight slope. Maximum run of continuous downhill: one shelf depth (guess 8 to 14 m,
   Q4), then a drop (guess 2.5 to 6 m).
3. Falls between shelves must be survivable or clearly lethal according to the landing speed rule, not
   a surprise (PRODUCT.md success: no death without an input mistake). Open hillside between houses
   is a hazard band only where the design says so (existing `hazards`).
4. Retaining walls (stone, 0.4 m thick boxes) mark each drop and give a visible ledge.

Road-first generation:
1. Start with a road polyline (switchback) on a height profile. The road is a flat walkable strip
   (about 3.5 to 4 m wide, guess) on each shelf, joined by ramp or stair links at the bends.
2. Derive shelves from the road: each straight leg and each bend gets one shelf, with houses on the
   uphill and downhill side.
3. Place houses along the road in rows (street pattern) on the downhill side first, so roofs sit near
   the hero's eye line; uphill houses are higher and give canopy and roof landings.
4. Cluster houses at bends (2 to 4 houses, shared yard), rows between bends (3 to 6 houses).

Spacing (corrected in review, R8: placer v1 already fixes these, ADR 0013 s3.2):
- `touch`: gap 0 (party wall), roof difference -6.0 to +2.8 m.
- `gap` `jump`: face gap 2.0 to 3.5 m, roof difference -3.0 to 0 m.
- `gap` `cushion`/`boxes`/`tramp`/`stairs`: a 6 x 8 m street patch between houses (gap 4 to 6 m).
- `zip`: 14 to 26 m horizontal, rope slope 13 to 50 deg, length <= 32 m.
- Uphill: at most one storey (2.8 m), only via tramp/stairs/boxes/touch, max(1, floor(edges/5)) per level.
- Canopy to toilet block: 2 to 3 m (guess; no kit piece, Q12).
Placer v1 ground is `groundY(z)`, a piecewise-linear `profile` along z only. Flat shelves can be
approximated with near-flat knots and steep drops; a road polyline, switchbacks in x and
road-side rows are NOT in placer v1 and would need placer v2 (Q4, conflict 2).

Switchback pattern (from the sketch):
- The road zigzags down the contour: leg, hairpin bend, leg, hairpin bend. There is no straight
  downhill run.
- Each hairpin has a cluster of houses on the inside and on the outer edge; the leg between hairpins
  has a row.
- A hero can cut across a bend by dropping or zipping to the next leg: shortcut routes are possible,
  dead ends possible (graph levels allow branches, lean-scope Amendment 2026-11-13).

What the sketch (22c108e0) shows: hillside with a contour line, a switchback road, houses on flat
shelves clustered along the road, no straight downhill run. Houses in rows along the road, clusters at
the bends. It gives no scale, no house counts, no start or finish position, and no elevation numbers
(Q4, Q5, Q18).

Source of truth: terrain, houses and anchors live in level JSON (or a graph file plus seed) validated
by zod; the road is an authoring input that the generator or placer converts to AABBs. The road itself
is not a runtime concept: the core has no road type, and the graph placer's walkable streets are
street patches (flat ground) plus hazard gullies elsewhere (ADR 0013 s3.3; was Q2, R11).

## 5. Gameplay obstacles

Existing core concepts (found in `src/core/world.ts`, `src/core/config.ts`): `Ramp` (with `slip`),
`Roof` (gable, slippery halves), `cushions` (landing absorbed, never lethal), `tramps` (bounce), `hazards`,
`pads`, `climb` and `parkour` flags (auto-vault, auto-mantle, landing slide), `vCling` 7.5 m/s wall
rule, `lineOnly` (fixed ziplines).

Flags per level, verified (R12): graph levels `lineOnly 1, climb 1, parkour 1` (`place.ts`);
Nagarkot `lineOnly 1, climb 1`, parkour 0 (`strategy/gen.ts`); L1 and Village all 0 (JSON omits them).
Landing rule, verified (R9): impact speed along the surface normal (`landHero`, `sim.ts`): clean
<= `landing.vyClean` 7, roll up to `vyRoll` 13, death above (`content/config/tuning.json`).
With g 9.81 a free drop from rest lands clean below 2.5 m and is lethal above about 8.6 m.

| Obstacle | Required core concept | Status | Answer / open question |
|---|---|---|---|
| Canopy landing | kit v2 awning: `Ramp` slip 1, 18.4 deg | Existing | Slides the hero off, breaks a fall; hard landing uses the normal-speed rule above (was Q11, R4). |
| Toilet jump | Plain box solid with flat top; gap/drop within `gap jump` limits | No kit piece (new prop kind) | Q12 |
| Hay-stack soft landing | kit v2 `hay` prop: cushion slab on a solid | Existing (absorbed at any speed). A graded surface would be NEW | Use the cushion as is (was Q9, R5); Q10 only if the owner wants graded. |
| Balcony | kit v2 balcony: standable solid slab, style 5, top g+3.2, 2-storey only | Existing | Standable and grabbable; reach is `climb.reachMax` 2.2 plus jump apex 1.03 (`parkour.grabProbe` 0.3 is a probe distance, not a height). Ground to balcony 3.2 m needs crates or stairs by design (was Q7, R13). |
| Roof landing | kit v2 flat roof deck (top of the body solid) | Existing | All kit v2 roofs are walkable decks; slippery gable `Roof` is only in L1 (was Q3, R14). |

Rules to keep:
- Colour language: gold = interactive, cream = safe, terracotta = danger, over a hazy desaturated
  world (lean-scope Kept). Kit v2 already assigns: crates and hay cream, tramps cream with dark rim,
  1.2 m parapets and gully lips terracotta, zones and ropes gold (ADR 0013 s1.4). Brick, tile, tin,
  tarp and flags are world surfaces in desaturated real colour, as shipped (art-style-guide.md)
  (was Q15, R15).
- One-hit death and `vCling` 7.5 are unchanged; hand-brake remains the answer to "too low"
  (on a zip rope in a graph level too).
- Cloud Village is frozen, so its "no new collision types" rule is moot here; a graded surface in a
  new graph level still needs an owner decision (Q10).

## 6. Textures and materials

Budget (corrected, R2): ~150 KB added max (2026-11-09 allowance), of which about 137 KB already ship
(6 tiles + normals, `public/assets/textures/`). Clay tile (`roof_tile`), plaster (`wall_plaster`),
brick (`wall_brick`, `brick_a`) and stone (`stone_warm`) already exist; only corrugated tin and straw
have no tile. Kit v2 rendering is stock Lambert with no new textures (ADR 0013 s1.4). The photos are
source reference, not shipped assets (Q16).

| Material | Best reference photos | Notes |
|---|---|---|
| Clay roof tile | IMG_1662, IMG_1661 (close-ups) | Worn, uneven; need a seamless tile crop. NO top view, so tile coursing direction and roof pitch are inferred |
| Corrugated tin | IMG_1657 (canopy), IMG_1656 (awning), IMG_1654 (gable), IMG_1648 (curved roof), IMG_1663 (stack cover), IMG_1662 and IMG_1661 (under tiles) | Ribs read at distance as stripes; a normal or stripe tile suffices |
| Mud plaster (cracked) | IMG_1656, IMG_1658, IMG_1657 | Cracks are fine detail; at game distance a flat warm tone plus a faint crack tile |
| Brick (red) | IMG_1657 (toilet block), IMG_1654, IMG_1648, IMG_1649 | City brick and rural brick differ in colour and bonding |
| White trim / paint | IMG_1649 | Plain colour, no texture needed |
| Stone-and-mud | IMG_1659 | Dry-stone base, low priority |
| Straw | IMG_1663 | Colour or tiny tile |
| Timber | IMG_1656 (eave), IMG_1662 (ridge pole) | Dark brown plain colour |

Missing:
- No top-down view of tile roofs: layout, overlap pattern and pitch are guesses.
- No view of upper floors of the city building (IMG_1648), nor of the back or sides of any house.
- No scale reference in any photo.
- No toilet block roof detail, no interior, no balcony railing detail.
- No normal maps or measured colours; palette must be sampled and then pushed into the three-colour
  language (Q15).

## 7. Open questions (need owner decisions)

Review (R16): 14 of the original 20 were answerable from the docs and code; the answers are in
sections 1, 3, 4, 5 and in "Review (Opus)" below, and they are removed from this list. Original
numbers are kept so references stay valid. Remaining: 6.

- Q4. Layout engine: build the new level with placer v1 (graph file + z-only `profile`, shelves
  approximated by knots) or commission placer v2 with a road polyline, switchbacks and road-side
  rows (new code path, new ADR, new level only)? Shelf depth, drop height and road width only
  matter for v2.
- Q10. Only if a graded hay surface (absorb below a speed threshold) is wanted: lift "no new
  collision types" for a new graph level? Default: no, the existing cushion is used.
- Q12. Toilet block: add it as a new kit v2 prop kind (a 1.5 x 1.5 x 2.2 m solid with a cream top),
  or drop it? If kept, is it a `gap` `via` in the graph format (format change, new placer version)
  or decoy-only scenery?
- Q16. Texture budget: about 13 KB is left of the ~150 KB allowance. Approve one corrugated-tin tile
  (and a straw tile) above it, or go flat colour only (default)?
- Q18. The new level's graph: the owner supplies nodes, edges, `via` choices, start/goal and decoys
  (as for valley-1). Target run time is already set (under 2 minutes, PRODUCT.md); house count is
  bounded by kit caps (20-house fixture, decoys <= 12).
- Q20. Portrait: does the new level need any placement rule for next-target visibility in
  portrait beyond what valley-1 does (graph levels emit no runner's-vision route)?

Answered and removed: Q1 (s1 table), Q2 (s4), Q3 (s5), Q5 (s3 conventions, kit v2 sizes), Q6 (B1),
Q7 (s5), Q8 (s5 landing rule), Q9 (A5), Q11 (A1, s5), Q13 (B2), Q14 (water tank), Q15 (s5 rules),
Q17 (R17), Q19 (R18).

Total: 6 open questions.

## 8. Conflicts with existing docs

Reviewed (R19): each item is marked REAL or NOT A CONFLICT.

1. REAL, resolved by the docs. "Real levels" vs one-level scope: lean-scope Amendment 2026-11-13
   allows new graph levels; Classic L1, Chase, Nagarkot, Cloud Village and valley-1 are frozen. So the
   only home is a NEW graph level with its own lobby entry.
2. REAL, open (Q4). "Road-first generation" is not in placer v1 (z-only profile). It needs placer
   v2 as a new code path for new files only (ADR 0013 s3.3). Gate: each graph level must pass the
   bot-guard unit test (ADR 0013 s3.6) and get a freeze hash; no sim validator.
3. NOT A CONFLICT by default. The existing `hay` cushion is the haystack; Cloud Village is frozen, so
   its collision rule does not bite. Only a graded surface would need a decision (Q10).
4. PARTLY. Photo textures cannot ship, but tile, plaster, brick and stone tiles already ship; only
   tin and straw are missing (Q16).
5. NOT A CONFLICT. Brick, terracotta-red tile roofs and prayer flags already ship as desaturated
   world colour (art-style-guide.md); the three-colour language marks affordances (ADR 0013 s1.4).
   Rule kept: never use gold on decor (flags, lights) and never colour hay yellow.
6. NOT A CONFLICT. Kit v2 roofs are flat walkable decks; slippery gables exist only in L1.
7. NOT A CONFLICT for a new graph level: graph levels emit no route (`place.ts`), like the maze.
8. REAL constraint (visual only): curved tin roof is a render detail over a flat deck.
9. REAL constraint: houses are axis-aligned (yaw 0/90/180/270); a switchback road cannot rotate them.
10. NOT A CONFLICT (melee stays out). Kept for the record.
11. REAL, added in review. The handoff's varied footprints (5 x 4 to 7 x 5 m), gable roofs and the
   3-storey city house contradict kit v2 "one size for every house", 1-2 storeys (ADR 0013 s1.1).
   Default: map every archetype to kit v2; a new kit version is an owner decision.
12. REAL, added in review. New prop kinds (toilet block) and new render pieces are limited: ADR 0013
   s1.4 allowed two new piece ids and ADR 0009 caps instanced meshes at 24 (`tests/adapters/budget.test.ts`).
   Prefer tints and reuse of existing pieces (`canopy`, `tank`, `crate`).
13. REAL, added in review. Render changes to `houseV2.ts` would also change valley-1's look. Gameplay
   stays frozen by the hash, but any look change for valley-1 must be opt-in per level or owner-approved.

## 9. Source files

Directory: /root/.claude/uploads/3a459e15-a327-5758-93ca-2b08c78b42b8/

- /root/.claude/uploads/3a459e15-a327-5758-93ca-2b08c78b42b8/3cef35a7-image.jpg (IMG_1657)
- /root/.claude/uploads/3a459e15-a327-5758-93ca-2b08c78b42b8/2264a925-image.jpg (IMG_1656)
- /root/.claude/uploads/3a459e15-a327-5758-93ca-2b08c78b42b8/573855f4-image.jpg (IMG_1658)
- /root/.claude/uploads/3a459e15-a327-5758-93ca-2b08c78b42b8/0cd56830-image.jpg (IMG_1659)
- /root/.claude/uploads/3a459e15-a327-5758-93ca-2b08c78b42b8/5e743baa-image.jpg (IMG_1654)
- /root/.claude/uploads/3a459e15-a327-5758-93ca-2b08c78b42b8/eecf70d6-image.jpg (IMG_1648)
- /root/.claude/uploads/3a459e15-a327-5758-93ca-2b08c78b42b8/fbc63538-image.jpg (IMG_1649)
- /root/.claude/uploads/3a459e15-a327-5758-93ca-2b08c78b42b8/7cf27e0c-image.jpg (IMG_1662)
- /root/.claude/uploads/3a459e15-a327-5758-93ca-2b08c78b42b8/cfdde277-image.jpg (IMG_1661)
- /root/.claude/uploads/3a459e15-a327-5758-93ca-2b08c78b42b8/a470a679-image.jpg (IMG_1663)
- /root/.claude/uploads/3a459e15-a327-5758-93ca-2b08c78b42b8/98929fbd-image.jpg (IMG_1665)
- /root/.claude/uploads/3a459e15-a327-5758-93ca-2b08c78b42b8/f7ff4608-image.jpg (IMG_1667)
- /root/.claude/uploads/3a459e15-a327-5758-93ca-2b08c78b42b8/7617907d-image.jpg (IMG_1664)
- /root/.claude/uploads/3a459e15-a327-5758-93ca-2b08c78b42b8/22c108e0-image.jpg (pencil sketch)

## Review (Opus)

Reviewed 2026-11-14 against CLAUDE.md, PRODUCT.md, `docs/lean-scope.md`, ADR 0013 and the code.
19 changes (R1-R19), each made in place above:

- R1 (s1 table). Cloud Village and Nagarkot were proposed targets; both are frozen (lean-scope
  Amendment 2026-11-13), as is valley-1 (`tests/content/graphFreeze.test.ts`). Scope creep removed:
  only a NEW graph level. Answers Q1.
- R2 (s1, s6). Texture numbers were merged from two rules. ~150 KB is the 2026-11-09 allowance;
  0 KB / 300 KiB is the Cloud Village rule. About 137 KB of tiles already ship in
  `public/assets/textures/`, and tile, plaster, brick and stone tiles exist; only tin and straw are new.
- R3 (s3 conventions). Style codes 4/5/6 were missing (`houseSpec.ts`). The handoff ignored kit v2's
  fixed sizes (8 x 8 m, storey 2.8, 1-2 storeys, flat deck). Sizes now map to kit v2. Answers Q5.
- R4 (A1, s5). The canopy guess (0.4 m over 1.5 m = 14.9 deg) is under `roof.slipDeg` 15 and would not
  slide. The kit awning (18.4 deg, slip 1) already exists and slides. Answers Q11.
- R5 (A5). Hay is the existing kit `hay` prop (2.4 x 2.4, top 0.9, cushion), cream not yellow-brown
  (ADR 0013 s1.4). Answers Q9.
- R6 (B1). A 3-storey house is outside kit v2 ("never 3"); mapped to 2 storeys + balcony + shop
  awning. Answers Q6.
- R7 (tank). Wrong key: the auto-vault limit is `vault.maxH` 1.1, not `parkour.airStepUp` 0.5; a
  1.2 m tank would not be vaultable. Kit v2 `tank` is render-only. Answers Q14.
- R8 (s4 spacing). Guessed gaps are replaced by placer v1 numbers (ADR 0013 s3.2). Placer v1 has a
  z-only profile, so roads and switchbacks need placer v2 (Q4 rewritten).
- R9 (A3, s5). Landing rule verified in `sim.ts` `landHero` and `tuning.json`: clean <= 7, roll
  <= 13, death above 13 m/s along the normal. That is about 2.5 m clean and about 8.6 m lethal from
  rest. Answers Q8.
- R10 (B2). Graph levels are `lineOnly 1`, so flag lines cannot be free-aim anchors; decor only.
  `FLAGS` exists only in `placeDecor.ts`. Answers Q13.
- R11 (s4). The road is not a runtime concept; the placer uses street patches and gullies. Answers Q2.
- R12 (s5). Flags per level verified: graph 1/1/1, Nagarkot lineOnly+climb, L1/Village none.
- R13 (s5). Balcony reach used the wrong key (`grabProbe` is a probe distance; reach is
  `climb.reachMax` 2.2). The balcony is a standable style-5 slab. Answers Q7.
- R14 (s5). Kit v2 roofs are flat decks; slippery gable `Roof` is used only by L1 (Village JSON has 0
  roofs, the graph placer emits none). Answers Q3.
- R15 (s5). Colour mapping is already fixed by ADR 0013 s1.4 and the shipped art style. Answers Q15.
- R16 (s7). 14 answered questions removed; Q4, Q12, Q16 and Q18 rewritten more narrowly; 6 remain.
  About 13 KB headroom in Q16 assumes every shipped tile counts against the 150 KB allowance.
- R17 (Q17). Crop dressing is allowed as decor on Medium/High (lean-scope Amendment 2026-11-09:
  "set-dressing clutter ... on Medium/High"); Low hides it via `LOW_HIDDEN_DECOR`
  (`graphicsTier.ts`); it must fit the 24 instanced-mesh cap.
- R18 (Q19). The graph placer's goal is already a hay cushion on a street patch below the goal house
  (ADR 0013 s3.3 step 8; `place.ts`). The hay stack adds to it; nothing is replaced.
- R19 (s8). Conflicts are marked real or not. 5, 6, 7 and 10 are not conflicts; 3 is moot by default.
  Added 11 (kit v2 sizes), 12 (render piece cap) and 13 (valley-1 look drift).
  Missing requirements added: bot-guard test, freeze hash and lobby entry for the new level.

Not changed: section 2 inventory and section 9 paths (all 14 upload files verified present).

## Modelling tasks

One commit each. Paths verified unless marked (new). The repo has no top-level `levels/`; level data
lives in `content/` (`content/graphs/`, `content/levels/`). Unblocked first. Every task keeps
`pnpm test` green, including `graphFreeze.test.ts` (no shipped level JSON changes).

1. **H1 Archetype presets.** Goal: A1-A4, B1, B2 as kit v2 `HouseSpec` presets (storeys, balcony,
   awnings, tall, pole, stairs), pure data. Files: `src/content/house/archetypes.ts` (new),
   `tests/content/archetypes.test.ts` (new). Depends: none. Accept: each preset passes
   `validateHouse`; `emitHouse` gives a deck at 3.2/6.0 m; A1 emits a slip-1 awning ramp; B1 emits a
   style-5 balcony. Blocked: no.
2. **H2 Home street fixture.** Goal: a `homeStreet()` fixture row built from H1 plus hay, crate and
   box-pile props, for tests and budgets. Files: `src/content/house/demoStreet.ts`,
   `tests/content/houseKit.test.ts`, `tests/adapters/budget.test.ts`. Depends: H1. Accept: houseKit
   guards pass on it; budget test `refused === 0` and <= 24 instanced meshes. Blocked: no.
3. **H3 Obstacle sim tests.** Goal: lock the obstacle numbers through the real `step()` on H2
   geometry: a 2.8 m drop rolls; a 6.0 m deck to hay drop is absorbed (`HERO_EV_CUSHION`); a drop onto
   the awning slides off alive; a 3.5 m `jump` gap from a 0.45 parapet lands; a fall of about 9 m to
   bare ground kills. Files: `tests/content/homeObstacles.test.ts` (new). Depends: H2. Accept: 5
   `it` blocks green. Blocked: no.
4. **H4 Per-level look option + hay cover.** Goal: an opt-in `look: 'home'` option on
   `buildHouseDecor` (default off, so valley-1 is unchanged); with it, hay gets a tin/tarp cap and
   straw bands made from tinted `crate` instances, body kept cream. Files:
   `src/adapters/render/decor/houseV2.ts`, `src/adapters/render/graphicsTier.ts`,
   `tests/adapters/houseV2.test.ts`. Depends: H2. Accept: test shows the cover only with the option
   on, hidden on Low; instance counts for valley-1 are identical with the option off. Blocked: no.
5. **H5 Tin awnings (flat colour).** Goal: under `look: 'home'`, the `canopy` piece gets a
   desaturated tin tint (no texture). Files: `houseV2.ts`, `tests/adapters/houseV2.test.ts`,
   `tests/adapters/palette.test.ts`. Depends: H4. Accept: palette test confirms the tint is not gold,
   cream or terracotta; visual check of H2 in a dev scene. Blocked: no.
6. **H6 Rooftop water tanks.** Goal: render-only `tank` on some 2-storey decks (seeded), never in a
   zip zone, over a takeoff parapet or on a runout gap. Files: `houseV2.ts`,
   `tests/adapters/houseV2.test.ts`. Depends: H4. Accept: test that tank boxes do not intersect line
   zones or takeoff strips; no solids added (level JSON unchanged). Blocked: no.
7. **H7 Prayer-flag strings on kit v2.** Goal: decor flag lines between deck corners (Medium/High
   only), colours from `placeDecor.ts` `FLAGS`, never gold. Files: `houseV2.ts`, `graphicsTier.ts`,
   `tests/adapters/houseV2.test.ts`. Depends: H4. Accept: hidden on Low; no instance cap refused;
   palette check that no flag colour is the gold affordance colour. Blocked: no.
8. **H8 Crop dressing.** Goal: dried-crop hangs and banana-plant decor on walls without party sides
   (Medium/High). Files: `houseV2.ts`, `graphicsTier.ts`, `tests/adapters/budget.test.ts`. Depends:
   H4. Accept: budget green; Low hides it; visual check. Blocked: no.
9. **H9 Lobby fits six entries.** Goal: the lobby layout holds a 6th mode button (ADR 0013 risk 5).
   Files: `src/adapters/ui/lobby.css`, `src/adapters/ui/lobby.ts`. Depends: none. Accept: screenshots
   at 390x844 and 844x390 with a temporary 6th registry entry show every button with no overlap or
   scroll. Blocked: no.
10. **H10 New graph level file + registry line.** Goal: `content/graphs/<id>.graph.json` (placer 1)
    from the owner graph; one line in `GRAPH_LEVELS`. Files: `content/graphs/<id>.graph.json` (new),
    `src/content/graph/registry.ts`. Depends: H9. Accept: `graphFormat.test.ts` parses it;
    `graphLevelBot.test.ts` passes (precise 25/25, late >= 23, sloppy >= 22, spammer >= 22, every edge
    alone); `?mode=g:<id>` plays to the goal in under 2 minutes, in portrait and landscape.
    Blocked: Q18, Q4 (if placer v2 is chosen, H15 comes first), Q20.
11. **H11 Freeze hash.** Goal: record the new level's hash. Files: `tests/content/graphFreeze.test.ts`.
    Depends: H10. Accept: test stores the hash and passes. Blocked: via H10.
12. **H12 Turn on the home look for the new level.** Goal: the registry entry opts into
    `look: 'home'`. Files: `src/content/graph/registry.ts`, `src/app/game.ts`. Depends: H5-H8, H11.
    Accept: visual check of the new level on High and Low; valley-1 screenshot unchanged. Blocked: via H10.
13. **H13 Toilet block prop.** Goal: a `shed` prop kind (1.5 x 1.5 x 2.2 m solid, style 6, cream top),
    rendered from existing pieces. Files: `src/content/house/houseSpec.ts`,
    `src/content/house/houseKit.ts`, `houseV2.ts`, `tests/content/houseKit.test.ts`. Depends: H2.
    Accept: emitProp test; valley-1 hash unchanged. Blocked: Q12 (and a format change if it becomes a `via`).
14. **H14 Tin/straw texture tiles.** Goal: small seamless tiles baked from IMG_1657/IMG_1663 crops.
    Files: `public/assets/textures/tin.jpg` (new), `straw.jpg` (new),
    `src/adapters/render/tileTexture.ts`. Depends: H5. Accept: `du -cb public/assets/textures` within
    the approved budget; Node tests keep flat colours. Blocked: Q16.
15. **H15 Placer v2 ADR (road-first).** Goal: design-only ADR for a road polyline, switchbacks,
    road-side rows, still emitting kit v2 + bot-guard + freeze. Files: `docs/adr/0014-road-first-placer.md`
    (new). Depends: H3. Accept: owner sign-off; no code. Blocked: Q4.
16. **H16 Graded hay surface.** Goal: only if Q10 = yes: a cushion that absorbs below a speed
    threshold. Files: `src/core/world.ts`, `src/core/sim.ts`, `src/core/config.ts`,
    `content/config/tuning.json`, `tests/core/parkour.test.ts`. Depends: H3. Accept: new tests at
    and above the threshold; all old bot tests untouched and green. Blocked: Q10.

## Owner decisions (2026-11-14)

Answers to the six open questions. These supersede the Q-list above.

- Q4 (layout engine): NEW. Commission placer v2 (road polyline, switchbacks, road-side rows). New ADR, new code path, applies to the new level only.
- Q10 (hay surface): Use the existing `hay` cushion logic. No graded surface. No change to collision rules.
- Q12 (toilet block): NEW kit prop, part of the house kit (not a graph node). Keep the 1.5 x 1.5 x 2.2 m solid with a cream top. It is not a `via` or gap in the graph format.
- Q16 (textures): Budget may increase. Approve one corrugated-tin tile and one straw tile. New total cap not yet stated (see Open items).
- Q18 (level graph): Owner supplies a subgraph of Nagarkot Run with a limit of 10 houses. Replaces the earlier 20-house fixture cap for this level. See Open items.
- Q20 (portrait camera): The camera points along the path direction. It rotates through U-turns and re-aims per house, so the view follows the road.

## Open items from these decisions

- Nagarkot Run is frozen by the 2026-11-13 amendment. Using a subgraph of it as the source for the new level needs an explicit amendment or a copy. Owner to confirm.
- New texture budget total (Q16) is not stated. Owner to give the new cap.
- Q20 camera rule touches the view code. Confirm whether this applies to all graph levels or only the new level, since valley-1 is hash-frozen.
