# Graphics requirements: the Chitlang hillside (decided 2026-11-08, grill session)

References: Chitlang village photo (dense houses stacked on a forested slope, pitched red tile roofs, balconies), the first generated in-game mock (prayer flags, water tanks, dense trees, mountains behind). Photo `IMG_1554.HEIC` still to be converted (blocked by macOS permissions on ~/Downloads).

## The level IS a packed village
- The level is a dense village on one continuous hillside. No tall foundation walls and no 12 m terrace drops: neighbouring houses, lanes and stairs are the ground.
- Filler houses are cheap instanced scenery packed on the slope; the route houses sit among them. Lane clear for the rope. Stay inside the 150k triangle / 24 draw-call budget.

## Scale
- Houses: 2-3 storeys (6-9 m), footprints 6-9 m.
- Hillside about 25-30 degrees; rope lines 8-15 degrees; roof-to-roof height difference 2-5 m.
- Hop lengths 5-20 m mostly, a few up to 50 m. Rope `maxLen` stays at 35 m (decision: keep it), so 35-50 m hops are out unless that is revisited.

## Roofs
- Flat roofs with parapet and tank: easy landing.
- Pitched tile roofs: landable but hard to stay on (slip off). Needs a sloped collider = a CORE change (AABB-only today), so it is a separate milestone. Until then pitched roofs are scenery.

## Terrain
- No core change: stepped box pads per house plot, ramps and stairs for lanes, all boxes. A smooth hill mesh is drawn over them for looks. A real heightfield is not planned.

## Progress readability (HUD)
- "Hop n/7" counter, bright marker on the next anchor, thin altitude strip alongside the existing distance and timer.

## Art direction
- Low-poly stock materials. Get the silhouette right first: prayer flags, water tanks, stairs, balconies, dense trees, mountains behind.
- MISSION (now decided, 2026-11-08 grill round 2): realistic lighting and better graphics (soft shadows, sky and haze, richer materials, ambient detail) toward the painterly look of the first mock. Its own milestone after the layout; needs a re-read of the "stock materials, no post-processing" lock before starting.

## Open
- Convert and add `IMG_1554.HEIC` to `docs/reference/`.
- Which generated sprites go in-world.

## Look decisions, round 2 (2026-11-08)
References in docs/reference/: target-lane-roof.png and target-village-backdrop.png (AI video frames: sunlit tile roofs, dense village, huge cliff backdrop), himalaya-valley-photo.jpg (valley village with snow range behind).
- Look: STYLISED but lit like the target (warm directional sun, soft shadows, haze, tone-mapped sunset). Not photoreal.
- Quality tiers: Low = today's look (the default on slower phones); Medium/High add shadows, tone mapping and bloom. The player picks in a settings choice before play; baseline High target device is iPhone 13.
- The locks "stock materials only, no custom shaders, no post-processing" are lifted ONLY for the High/Medium tiers and only via three's own built-in passes (no hand-written shaders). Low stays stock.
- Camera stays third-person.
- Backdrop: a Himalayan snow range and layered hills at sunset behind the village.
- Models: CC0 free assets first; replacing primitives with real models is considered and implemented AFTER the MVP.
- Rejected for now: first-person camera.
