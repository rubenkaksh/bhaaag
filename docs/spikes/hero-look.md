# Hero look: matching the GPT images (2026-11-27)

One shared hero look for the zipline game and the hunting spikes. Opus (high effort) analysis of `heroRig.ts` against the accepted GPT references, then built the same day. Owner decisions 2026-11-27: go with the recommendations (D1 b, D2 both, D3 yes) and allow what else is needed to get closest to the images.

## Decisions
- **D1 (b):** zipline hero tunic is dark warm hemp `#4b4636` (relative luminance about 0.06), so ADR 0009's 3:1 contrast on the cream pads and roofs holds. Only the spike riders get the oat tunic `#d7c9a6`, which deliberately fails that rule (the rule exists for landings in the zipline game; the spikes have none).
- **D2:** knit beanie replaces the top-knot in both games (rider on the bike wears the cream open helmet with goggles). About 100 triangles, no extra draw call.
- **D3:** baked vertex shading ("clay": darker toward the feet and under the sash) and a High-tier cap of 3,000 triangles for the hero (Low stays under 1,500).
- Allowed beyond the report: satchel removed everywhere (the images have none), crossed bandolier or quiver by gear, brick-red scarf and sash for riders, bracers and tall boots for everyone.

## Code
- `src/adapters/render/heroLook.ts`: palettes (`HERO_HEMP`, `HERO_OAT`) and `HeroLook` (hat, gear, detail 0/1, clay). `riderLook('quiver'|'bandolier', detail)` for the spikes.
- `src/adapters/render/heroRig.ts`: `new HeroRig(look?)`. Defaults reproduce the zipline hero. Still 6 skinned draws and 6 materials per palette, joint tree and pose channels untouched (`heroPose.ts` not edited).
- `src/spikes/view/`: `riderPose.ts` (pelvis on the seat, two-bone IK for legs and arms, torso twist toward the aim), `horse.ts`, `bike.ts`, `bow.ts`, `rifle.ts`, `riderView.ts`, `kit.ts` (skinned packer). Pure three.js, stock materials, no textures.
- `tools/spikes-harness.html` and `tools/shots-spikes.mjs`: render each rider at the reference views on mid-grey (`CHROMIUM_PATH=/opt/pw-browsers/chromium node tools/shots-spikes.mjs`, `ONLY=horse-bow-side DETAIL=0`).

## Measured (SwiftShader, not a device)
| | Low | High |
|---|---|---|
| Zipline hero | 1,437 tris, 6 draws | 2,432 tris, 6 draws |
| Horse + bow rider (hero, horse, bow) | 2,831 tris, 22 draws | 4,198 tris, 22 draws |
| Bike + rifle rider | 2,294 tris, 16 draws | 4,060 tris, 16 draws |
Initial chunk: +978 B gzip (257,593 B total, was 256,615 B) over the pre-change build of main (see the session log for totals against the 255,000 B budget).

## What primitives cannot match
Quilted and woven cloth, leather grain, fur and mane strands, cloth drape (scarf tails are rigid swinging strips), fingers, facial expression beyond eyes, brows and nose, and the soft offline-render lighting. Face features are 2 to 4 px at the game camera, so they may be dropped on Low if they do not survive a device check.

## Not done / not verified
- Not verified on device (iPhone 13) nor at 390x844 and 844x390 in the real game scene. Only the SwiftShader harness was looked at.
- Riders are not driven by the ride and camp cores yet; `RiderView.update(frame)` takes the values the cores already produce.
- Horse legs, the bike frame and weapons are first-pass shapes; side-by-side overlap against the reference outlines was judged by eye, not measured.
- Draw calls (22 for the horse rider) are above the report's 4-draw target because the bow, string and arrow are separate meshes and the horse has 9 materials; packing them is a later pass.
