# Plan: Himalaya skybox, landscape mountains, sky animation, terraced hills (2026-11-19)

Owner request: new skybox from 4 sunset Himalaya photos; mountains barely visible in landscape; slightly animated background; richer textures on coded hills. Plan by Opus seat. Mission: PRODUCT.md applies.

Photos (not in git, art/ only): portrait peaks with pink cap (1326c610), portrait with pylon (4d0fa473), wide range (02287ae1), panorama (4a43d14f), under ~/.claude/uploads/918b95f2-9f15-4e5a-af44-3a0d7066fe71/. Crop out pylon and wires.

## A. Root cause (landscape)
Fog is not the cause (backdrop.ts:494 fog:false; massif ~1.4 km; far 3000).
1. Snow sits above the frame top. Forward peaks authored 13.5-21 deg (backdrop.ts:159-174), snow only above ~12.8 deg (:396-398). Landscape keeps fov 60 (framing.ts:30), pitch -12 rest / -20 running (tuning.json frontPitchDeg, cameraRig.ts:48), so frame top is +18 / +10 deg. Portrait fov up to 88 shows it.
2. The visible part is washed out: lavender rock pre-blended to haze (backdrop.ts:229-232, 407-409), cloud cards 4-14 deg at 0.85 opacity (skyView.ts:227-234), additive haze to 7.1 deg (skyView.ts:289-318).
3. Side bug: backdrop tier captured once (scene.ts:116-118); setTier (scene.ts:362) never rebuilds it. Comment at backdrop.ts:8 stale.
Photos show a thin low band 1-4 deg above horizon, layered blue ridges, cloud sea below.

## B. Skybox
- Keep geometry rings, retune to photo proportions: peaks 4-8 deg, snow line relative to crest (top 35-40%), ridges 0.5-4.5 deg in photo blues, less haze on snow.
- Add sky_pano.webp: 360 deg open cylinder inside the dome, MeshBasic, unfogged, from sky parts of 4a43d14f/02287ae1. New `--mode pano` in tools/cartoonify.py (no alpha, wrap cross-fade). Vertex dome stays for zenith and as fallback.
- Add range_card.webp: card mode on snow band of 02287ae1 plus pink cap from 1326c610, 180 deg forward arc ~2000 m.
- Sun stays SUN_AZ_DEG 32 / SUN_EL_DEG 8.
- Sizes: Low pano 1024x256 <=20 KB, card 1024x128 <=14 KB; Med/High pano 2048x512 <=50 KB, card 2048x256 <=30 KB.
- Rejected: cubemap/equirect sphere (no zenith in photos, 6 faces break Low budget, photoreal); flat photo cards only (loses parallax, distorts across orientations).

## C. Animation (stock materials, Low-safe)
`updateSky(sky, t)` in skyView.ts, called in scene.ts render() beside updateDust, not gated by dust.visible.
- pano map.offset.x drift (~1 cycle / 20 min); clouds mesh rotation.y +-3 deg over ~90 s.
- Mist bands: merged open cylinder 0-2 deg, vertex alpha, opacity +-0.15, slow counter-rotation (1 band Low, 2 High); cloud cards up to 9-20 deg; horizonHaze top ~2 deg.
- Alpenglow: range_card color lerp white to #ffc8b8 on 45 s sine; cloud-cap opacity pulse.
- ~3 extra draw calls, no per-frame allocation, freeze under prefers-reduced-motion.

## D. Terraced hills (decor/groundMesh.ts)
- UVs u = x/6, v = terrainY/1.6 so terraces follow contours.
- terrace.jpg grey-normalised tile from 1326c610 (tile mode, --mirror --grey): Low 128 px <=6 KB; High 256 px + terrace_n.jpg <=22 KB. Via userData.tierMaps with a low entry.
- Replace 9 m z-stripes (groundMesh.ts:63) with height-band green/ochre alternation plus 20 m patches.
- No new draw calls. chase/endlessGround.ts untouched.
- Budget after: Low ~142/150, Medium ~245/300, High ~290/600.

## E. Cards
| # | Task | Files | done_when | Engine |
|---|---|---|---|---|
| T0 | cartoonify pano mode + 4 files + manifest rows | tools/cartoonify.py, public/assets/textures/*, textureManifest.ts | tests/adapters/textureBudget.test.ts passes; painterly strips, no pylon | Sonnet |
| T1 | Retune backdrop rings | backdrop.ts, backdrop.test.ts (:108, :124) | new test: snow vertices |az|<50 below pitch+30-2 deg for eyes at -12/-20; 844x390 shows white range | Sonnet |
| T2 | Rebuild backdrop on tier change | scene.ts:116 | segment count changes after tier switch | Haiku |
| T3 | Sky pano, range card, move clouds/haze | new skyPano.ts, skyView.ts, scene.ts, sky.test.ts | tests pass; Low <=55 draw calls | Sonnet |
| T4 | updateSky animation | skyView.ts, scene.ts, sky.test.ts | test: offset/opacity/colour change with t | junior |
| T5 | Terraces | groundMesh.ts, new groundMesh.test.ts | UV+colour test; terraces visible Low and High | Sonnet |
| T6 | Owner screenshots | tools/shots.mjs, tools/shots-portrait.mjs | 844x390 + 390x844, Low+High | Haiku |

Parallel worktrees: T0, T1(+T2), T5. Sequence T3 then T4. Shared: scene.ts (T2,T3,T4), skyView.ts + sky.test.ts (T3,T4), textureManifest.ts (T0 only).

## F. Owner questions
1. Photo-accurate low thin range (peaks 4-8 deg) or stylised taller? Default used: photo-accurate.
2. If still weak in landscape, may frontPitchDeg go -12 to -8? (camera change, NOT allowed without asking)
   **ANSWER (owner, 2026-11-19): Yes, allowed.** Only as a fallback if the retune alone leaves the range weak at 844x390; the owner reverted a camera change before (2026-11-11), so make it a separate commit, landscape only, easy to revert, and tell the owner.
3. Low at ~142/150 KB: accept, or keep Low procedural without sky_pano? Default used: accept.
