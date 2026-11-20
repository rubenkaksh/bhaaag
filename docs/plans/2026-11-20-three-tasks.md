# Three sequential tasks (owner briefs, 2026-11-20)

Order is binding: 1 → 2 → 3. Images live in `art/refs-2026-11-20/` (not in git, see CLAUDE.md repo weight).

## 1. Houses rework
- Sketches: IMG_1689, IMG_1690 (two house models). References: IMG_1648, IMG_1657 2, IMG_1659.
- The reference with no sketch is a plain sloped house: no roofs to walk, no balconies. Simple.
- 2-3 storey rule (docs/graphics-spec.md) stands unless a sketch says otherwise.

## 2. New parkour level (Classic level, built in the level builder)
- Sketch: IMG_1692 (owner calls it sloppy; familiar to Nagarkot Run with the bend). Haystack reference: IMG_1663 2.
- Direction: much more parkour, far fewer ziplines. Jump down, climb up, dive into haystacks, zipline only occasionally.
- Option A: modify Nagarkot Run toward the sketch with more joined houses and routes between them. Option B: new level. Either way new pieces must be symlinked/registered into the level builder.
- Open: haystack dive and climb-up are likely new sim mechanics. Check PRODUCT.md first (less ziplines vs core hook idea); owner says product goal stays.
- Engine plan: one Opus design seat (layout, A vs B, moveset), then Sonnet/juniors build.

## 3. Camera tilt assist (experimental)
- Sketch: IMG_1691. Standing on a roof edge with no idea where to go.
- When the next target (e.g. balcony) is AHEAD/away from the camera, camera tilts to ~75 deg, almost top-down, to show the route. Not needed when the target is behind or to the sides (ledge already visible).
- Experiment: one level where the camera always guides to the right path to the end.
- Owner approved this camera change by briefing it (CLAUDE.md: no camera-angle change without asking). Keep it opt-in per level so other levels are untouched.

## Extra: tile texture (IMG_1662)
- Owner has a tile texture and needs help using it in game. Plan: run it through `tools/cartoonify.py` per quality tier (Low/High, 2026-11-15 rule), make it seamless/tileable, apply as a stock-material map (no custom shaders). Likely for roofs (task 1); the Opus verdict confirms where it goes.

## After all three briefs
1. Owner runs the copy command (images into `art/refs-2026-11-20/`, HEIC → JPEG).
2. Opus verdict: read sketches/refs, decide whether ChatGPT-generated sprites/textures are needed vs procedural geometry + `tools/cartoonify.py`.
3. Then dispatch task 1 first.
