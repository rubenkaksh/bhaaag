# Art style guide: review of FLUX references against `ui-reference.webp` (2026-11-08)

Drafted by Sonnet from the contact sheets (A, A2, C, D2, G, H) and the reference. Not yet judged by Opus. Colour values from the reference are estimates; sample them in an image editor before locking the palette.

## What the target has that the generated set does not
| Target (`ui-reference.webp`) | Generated set | Fix |
|---|---|---|
| Saturated red-orange terracotta roofs (lit side near `#b5441c`), strong ridge lines and deep wooden eaves on carved brackets | Roofs duller and flatter; many read Alpine or Mediterranean | Raise roof saturation and value in the kit; add eave bracket detail |
| Warm brick, mixed with cream/white plaster upper floors | Brick is close; plaster is too pure white or pastel pink/yellow | Cream plaster (`LIME`) stays; drop pink and yellow |
| Heavy brown timber balconies: square-baluster rails, big posts, full-width runs | Balconies thin, ornate, European-looking iron-style rails in several | Square-baluster timber rail; full-width (done, 85 %) |
| Black and green tanks on stilts, often with a rail and pipes | Tanks small and rare on facades | Take size and stilts from C/F, not A |
| Prayer-flag strings in blue/white/red/green/yellow | Absent from the generated set | Already in the kit (`FLAGS`) |
| Two-tier red-roofed pagodas with white walls | Rare, East-Asian roofs in some | Use E `e02`, `e04`, `e05_s11` only |
| Lived-in: plants on every terrace, weathered paving, trees between houses | Too clean and empty | Add pots/planters and tree clusters; weathering via colour jitter |
| Golden-hour rim light, layered haze hills, orange sky | G/H are photographic | Mood targets only |

## Palette direction (kit)
- Roof tile: move from `#8a4532/#7c3e2e/#96503a` toward a more saturated red-orange family around `#b5441c`; keep one darker shade for variation.
- Brick: keep `BRICK`, add one redder, one browner shade.
- Plaster: cream only (`LIME`); no pink or yellow bodies.
- Timber: `#4a2c1c`–`#5a3622` stays; add a lighter weathered `#6b4128` for rails against dark roofs.
- Tanks: black and a darker green; keep `TANKS`.

## Shapes
- Roofs: hipped pagoda tiers with deep overhang; flat terraces with 0.6 m parapet, stair hatch, tank, solar heater (done for clusters).
- Windows: carved wooden lattice, taller than wide, set in dark timber frames; some with shutters.
- Balconies: full width of the facade, timber, 1 m deep, square-baluster rail.

## Kit pieces (2026-11-08)
Done: 1 eave brackets (`bracket`), 2 lattice windows with lintel and cap, 3 tank braces and ladder, 4 planter troughs (`planter`). Walls use `wall_plaster` and `wall_brick` maps; roofs `roof_tile` (generated crops, grey-normalised, tinted by instance colour). Decor ceiling raised to 150k. Still missing:
5. Two-tier pagoda roof piece (exists inside `pagoda()`, not reusable).

## Sorting (step 3)
| Use | Keepers |
|---|---|
| **Textures** (top-down, tile) | D2 `g03_s11`, `g03_s12` (crop the dark top strip), `g04_s11`, `g04_s12`, `g05_s11`, `g05_s12`. `g01`, `g02` with caveats (grass tufts repeat, too regular). Plain facade crops from A `a03_s11`, `a15_s11` (brick/plaster areas) and A2 `b06_s11` (lattice window band). |
| **Model guides** (front-on) | The modelling set in `assets-src/zipline-tole-refs/` (houses, balconies, roofs, clutter) plus B `d01_s12`, `d02_s11`, `d03_s12`, `d04_s11`, `d05_s12` (doors and windows), E landmarks. |
| **Mood only** | G `k04_s11`, `k04_s12`, `k05_s11`, `k05_s12` (haze layering), `k01_s11` (hillside); H `h05_s11`, `h05_s12` (sun and house light), `h04_s11`, `h03_s11` (sky). |

## Licensing
- FLUX schnell outputs: usable as textures; record the model and licence in the repo notes before shipping.
- Source photos in `assets-src/` stay local (GPS data, unknown provenance); do not publish.
- Any free 3D pack needs its licence recorded in a `SOURCES.tsv` before use.

## Steps 5-7: models, pilot block, decision (2026-11-08)
**Textures wired.** `src/adapters/render/levelView.ts` now gives style-0 ground `stone_warm`, style-2 roofs `terracotta_a` and the brick dressing `brick_a` (256 px JPEGs in `public/assets/textures/`, about 48 KB total, made from the atlas tiles). Each box face has its own world-space planar UVs (one tile per 4 m), so tiles line up across boxes; stock `MeshLambertMaterial` with a map and `RepeatWrapping`, no shaders. Node tests (no DOM) keep the flat colours. Walls (style 1) stay flat plaster on purpose: the style guide wants cream plaster only.

**Base house models (step 5): none adopted.** The local packs (`workspaces/vidanta3d/assets/models`, see its `SOURCES.tsv`) hold no houses. The only relevant file is `pagoda.glb` (Poly by Google, CC-BY, 1.6 MB), far over the decor triangle budget and redundant with the procedural `pagoda()`. The ratha is project-owned but a chariot. No download was made; any external house pack needs explicit permission and a `SOURCES.tsv` line first. The instanced kit (`decor/kit.ts`) stays the house source, steered by the FLUX modelling set.

**Pilot block (step 6).** Before: `pilot-before-flat-roof.png` (flat brown roof plane). After: `pilot-block-textured.png` (tiled roof, brick plinth, cobbled lane). Both are local in `docs/reference/` (gitignored, like `ui-reference.webp`). Compare with `ui-reference.webp`.

| Reference | Pilot after textures | Still missing |
|---|---|---|
| Glazed red tile and brick read at once | Roof tile grid, brick courses and cobbles read as materials | Lit/shadow depth (no shadows, stock Lambert) |
| Carved eaves, lattice windows | Plain boxed windows | Eave brackets, lattice (kit pieces 1-2) |
| Planters, trees, tanks on stilts | Trees and tanks present, sparse | Planters, stilts (kit pieces 3-4) |
| Golden-hour haze | Sky and hills already close | none |

**Decision (step 7): keep.** The textured look beats the flat one clearly for roofs, brick and paving at near-zero cost (3 small textures, no triangles added). Walls and facade detail are the next gap. Not Opus-reviewed.

## Playable houses, not a town (2026-11-08)
Feedback: the zipline houses read as 9 m towers, three slabs were ziplined through, and most houses were scenery nobody could use. Changes: L1 houses are now 13 x 9 m, two storeys with a flat roof (`tools/genLevel.mjs`), walls run down to the hill terrace and are clad in a stepped brick base; each has a timber balcony ledge on its lane-facing wall (7 ledges, appended last); decoys are squat 10 x 9 x 6 m danger houses, not 21 m slabs. In `decor/placeDecor.ts` the flanking town (inner houses, clusters, far city) is switched off (`SCENERY_HOUSES`); `dressHouses()` adds windows, eave brackets, balcony rails and rim furniture to the playable houses only; lots are earth with trees; pagodas stay as hill temples. A house must stay 9 m deep: deeper makes the rope clip the roof edge from the roof centre (preview test).

## Layout revision: realistic descent (2026-11-08)
Opus review asked for a believable zipline/parkour descent. L1 now has 7 houses 20 m apart, 7 m lower each, 13 x 10 m roofs (10 m deep is the limit: deeper breaks the rope clearance and the idle-stop test). Walls reach the hill terrace 12 m below the roof. Decoys are grounded, hookable danger mirror houses (anchor 7 m to the other side). The goal pad is wider (x -12..6). Roofs carry style-4 colliders: 0.4 m curbs on the outer, lane-side and downhill-outer edges (the lane half of the downhill edge stays open as the launch strip, the uphill edge stays open for arrival) and a 0.8 m tank plinth. `dressHouses` rails and the tank ride on these colliders; the balcony ledge is still visual only until a mantle/ledge-grab CORE milestone exists. Brick base is flush (at most 0.12 m proud). Known gap: instanced wall UVs stretch with the box size because world-space tiling needs a shader.
