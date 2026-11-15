# Art direction review: AI images, owner photos, cartoonified backgrounds (Opus, 2026-11-15)

**Verdict**
1. A: No, you do not need ChatGPT images to hold the standard. The gap to `ui-reference.webp` is mostly horizon, lighting and facade variety, not missing pictures. Three 2D surfaces do need images: the horizon card, the kit v2 facade strip and the lobby art.
2. B: Yes, cartoonified owner photos work for the horizon/backdrop card, surface tiles, flag sprites and lobby art. Facade decals: only on kit v2 (one fixed size, so no UV stretch). Never for the hero, gameplay surfaces or affordance colours.
3. C: Use one local, deterministic pipeline (seamless crop, palette-lock to a fixed swatch, posterize, light edge ink, resize, JPEG/WebP). It costs nothing per run and gives the same style every time. ChatGPT image edit only for the one lobby/loading picture.
4. Budget: about 137 KB of textures load at runtime today. The proposed package adds about 150 KB, which is roughly 290 KB total. That fits the owner's ~300 KB, but PRODUCT.md Principle 5 still says ~150 KB, so the owner must restate the number before shipping.
5. Biggest visual fix needs no image: the hard-edged orange sky band in the High tier (`gfx=high.png`, `auto/C-high-1080.png`) makes High look worse than Low. Fix it first.

Scope of this review: read PRODUCT.md, lean-scope (main), art-style-guide, graphics-spec, ADR 0009/0013 (main), sessions 11-12, T290b handoff, both prior reviews, the home-assets handoff (branch `claude/determined-hopper-t0drsv`), the zipline-tole FLUX handover. Viewed: ChatGPT sheet, `ui-reference.webp`, `target-village-backdrop.png`, `pick_houses.png`, `gfx=high/low.png`, `p0_wide.png`, `roofA_above.png`, `auto/C-high-1080.png`, dragon-t290d contact, G_skyline sheet.
**The 14 owner photos and the pencil sketch are not on this machine.** Judgements about them use the handoff's descriptions only.

## A. Where the shipped look falls short (by screenshot)

| Shot | Shortfall vs `ui-reference.webp` | Fix needs an image? |
|---|---|---|
| `gfx=high.png`, `auto/C-high-1080.png` | A hard curved orange band cuts across the top third: a sky dome or cloud-layer edge seen from below. There is no sun and no mountain ridge, and the valley ends in a flat beige fog wall. `gfx=low.png` shows clouds and ridges, so High is worse than Low here. | No. It is a render bug; fix in `backdrop.ts`/sky first. |
| `auto/C-high-1080.png` (flanks) | Rows of identical cream/orange boxes with the same 2x3 dark windows and thin red roof caps. No timber balconies, tanks or green between houses. It reads like a 2015 mobile game. | Partly. A facade strip texture plus more clutter on the flanks. |
| `roofA_above.png` | Brick-paver texture over large flat ground reads as a car park. The tiled gable roof reads well. The saturated red danger block is crude but on-language. | No. Use plaster/earth on big ground areas and keep pavers for lanes. |
| `gfx=low.png` | Best of the set: mountains, clouds, warm tiles, a readable hero. The open gap is horizon depth (no distant city sprawl or Kathmandu bowl). | Yes. The horizon card. |
| `p0_wide.png` | Camera inside geometry (dark mass). A stale or broken shot. | Delete it, or retake it before anyone judges from it. |
| `pick_houses.png` (FLUX facades) | Not in-game. These are already the right flat frontal gouache style for facade strips. | They are the facade source. |

The target itself: `ui-reference.webp` is AI key art with dense global illumination and modelled detail. Primitives plus stock Lambert under the shader/GLB locks will not match its detail. Match its *read*: warm low sun, 3-5 hazy ridges, city sprawl on the far slopes, roof clutter, green between houses. `target-village-backdrop.png` is a screenshot of an AI Naruto video (third-party IP). It is fine as mood, but never use it as a generation input or source.

**The ChatGPT sheet** (`docs/ChatGPT Image Nov 11...png`) is well drawn: inked, glowing, detailed. It does not fit this game:
- It is a 2D side-scroller sprite sheet.
- Half of it is floating grassy rock platforms, and floating islands are an explicit Cloud Village non-goal.
- The glow and lighting are baked in and fight the scene light.
- It has already caused one bug: the `cloud-puff-a/b/c` crops were platforms (session 2026-11-11).
- Its dragon crops are now dead weight: `public/assets/dragon/*.webp` (151 KB) has no reference in `src/` on `origin/main` (checked by grep, not by build) since the T304 3D dragon replaced it.

Licence: OpenAI assigns output rights to the user, so it is usable, but each generation drifts in style. Keep it as mood only, as the game-art-skill review already ruled.

## B. Photo-derived (cartoonified) assets, per use

Constraints applied: stock materials (a map on `MeshBasic`/`MeshLambert` is stock), no shaders, no GLB, Low stays stock, ADR 0009 caps (Low <= 55 calls, Medium <= 70, alpha over 25% of a coarse screen only for sky/haze), frozen levels (gameplay is hashed; look changes need opt-in or owner OK, handoff conflict 13).

| Use | Verdict | Bytes | Tier | Risk / note |
|---|---|---|---|---|
| Horizon card: distant hills plus city sprawl, painted from IMG_1664/1665/1667 + FLUX G k04/k05 haze | **Yes** | 2048x512 WebP with alpha, ~70-90 KB | All tiers (one `MeshBasic` cylinder band, 1 draw; counts as sky alpha) | Replaces nothing in gameplay. Applying it to frozen levels changes their look, so it needs owner OK. |
| Seamless tiles: tin, straw (new); re-bake tile/brick/plaster from owner close-ups | **Yes** for tin and straw; re-bakes optional | 256 px JPEG ~8-10 KB each plus a normal map ~7 KB (High only) | All tiers (normals High only) | Owner photos are licence-clean. Strip GPS (EXIF) first. Re-bakes change frozen levels' look. |
| Facade/window/door strip on kit v2 houses | **Conditional**: kit v2 only (8 m wide x 2.8 m storey is fixed, so one strip maps without the known UV-stretch problem); not v1/L1 houses | 1024x256 atlas, 4 variants, WebP ~40-60 KB | Medium/High; Low keeps flat walls plus the existing window pieces | Must not add draws: put it in the house wall material map, not as extra planes. Source: FLUX `a01/a03/a05/b06` window bands (Apache-2.0 model) or owner IMG_1649/1654. |
| Prayer-flag and string-light sprites | **Yes** | 256x32 strip ~3 KB | Medium/High (Low hides flags today) | Never gold, never hay-yellow (three-colour language). |
| Signage / shop-shutter decals | **Later** | ~10 KB | High | Text in AI output is garbled. Draw it by hand or leave it out. |
| Hero / character art | **No** | 0 | — | Mannequin lock (lean-scope); hero is a 3D rig. |
| UI icons | **No** (use SVG/CSS) | 0 raster | — | Already vector in the HUD. |
| Lobby / loading key art | **Yes** | 1280x720 WebP ~60-90 KB, lazy-loaded outside the initial chunk | Not in-game | Only place where a ChatGPT edit of an owner photo is fine. Style drift does not matter for one picture. |

## C. Cartoonification route

Options weighed:
- **ChatGPT image edit** per photo: best single-image quality, but the style drifts across 15-30 assets, it cannot output seamless tiles reliably, it needs a manual round-trip each time, and outputs are not reproducible.
- **Local FLUX schnell img2img**: already tested (zipline-tole STATE.md). It "always near-copied the photo" at any strength. Rejected.
- **Hand-painted pass**: best quality, but the owner's hours are the scarcest resource. Rejected.
- **Recommended: local deterministic pipeline.** At 256 px tiles and a hazy horizon card, a palette-locked posterize is close to a painted look, and identical parameters guarantee one style.

Pipeline (Python + Pillow in `tools/`, the same family as `tools/makeTextureAtlas.py`):
1. `assets-src/photos/` (gitignored). The owner copies the 14 photos here; strip EXIF/GPS.
2. Crop: square for tiles, wide strip for horizon or facade. For tiles, offset by half and cross-fade edges until seamless.
3. **Palette lock**: map every pixel to the nearest of one ~16-colour swatch file `art/style/palette.json`. Sample it once from `ui-reference.webp` and the art-style-guide hex values (`#b5441c` tile, cream `LIME`, brick, timber `#4a2c1c`/`#6b4128`, haze blues). This is the "style sheet"; it is locked and versioned.
4. Posterize to 5-6 value steps, then a 1 px edge ink at 30% from a Sobel pass. Horizon card: add a vertical haze gradient toward the sky colour (3-5 ridge fade).
5. Resize: tiles to 256 px, facade atlas to 1024x256, horizon card to 2048x512. Encode: tiles JPEG q70, alpha assets WebP q60/alpha 85.
6. Contact sheet against `ui-reference.webp` for one owner look, then `public/assets/textures/`.

## D. Next steps (max 8, in order)

| # | Step | Owner effort | Agent effort | Size | Plugs into | Approval |
|---|---|---|---|---|---|---|
| 1 | Fix the High sky band; retake the High/Medium/Low shots | none | Sonnet, small | 0 KB | sky/`backdrop.ts`, `cloudSea` | no |
| 2 | Restate the texture budget in PRODUCT.md P5 (runtime-loaded bytes only); delete or document the unreferenced dragon webps | 1 line decision | Haiku | -151 KB repo | PRODUCT.md, `public/assets/dragon/` | **yes** (budget) |
| 3 | Copy the 14 photos and the sketch onto this Mac (`assets-src/photos/`) | 5 min | none | 0 | pipeline input | no |
| 4 | Build the palette-lock pipeline and `palette.json`; one sample tile for the owner | approve 1 sheet | Sonnet | 0 | `tools/` | no |
| 5 | Tin + straw tiles (from IMG_1657/1663) | none | Haiku | ~35 KB with normal maps | kit v2 awning/canopy, `hay` (keep hay cream-tinted) | yes, already approved per handoff |
| 6 | Horizon card from IMG_1664/65/67 | pick 1 of 3 | Sonnet | ~80 KB | `backdropRoot`, all tiers | **yes** if applied to frozen levels |
| 7 | Kit v2 facade strip atlas (4 variants) | pick variants | Sonnet | ~50 KB | `houseV2.ts` wall material map, Medium/High | **yes** (changes valley-1 look) |
| 8 | Lobby key art (ChatGPT edit of the best hill photo + palette) | 15 min in ChatGPT | Haiku to wire | ~80 KB lazy | lobby screen | no |

Total in-game: ~165 KB added. Steps 1-7 add about 150 KB to the 137 KB, giving about 290 KB at runtime, which sits under 300 KB only after step 2 is decided.

## E. Problems the owner should hear

- **Budget numbers drift.** ~150 KB (PRODUCT.md P5), 272/288 KB "accepted" (sessions), 300 KiB (Cloud Village), 600 KiB (approval threshold, unconfirmed), ~300 KB "doubled" (handoff). Pick one, write it once in PRODUCT.md, and count only bytes the game loads.
- **Placer v2 (road-first) plus a road-following camera: high cost, zero graphics value.** It means a new code path, a new ADR, bot-guard and freeze hash, plus camera work. The switchback look can be faked visually: a painted road on the horizon card and street patches in placer v1 with near-flat `profile` knots. Build v2 only if the owner wants switchback *gameplay* (cut-across-a-bend shortcuts), and only after steps 1-7.
- **Dragon art churn**: sprite v1, ribbon v2, then 3D T304 in two days. 151 KB of its sprites is left in `public/`. Lock a direction before generating more art.
- **Initial chunk is over its cap** (~240 KB gz vs 215 KB, pre-existing, unresolved since T297). Lobby art must be lazy or it makes this worse.
- **143 FLUX images (6.5 h) are mostly unused.** The facade bands and G haze refs are the useful remainder; use them in steps 6-7 instead of generating more.
- **PRODUCT.md still has Users UNCONFIRMED and Success PROPOSED.** Art direction without a stated player is guesswork.
- **Nothing here conflicts with the Product Purpose** (Newari hillside, golden hour, three-colour language), provided photo colours go through the palette lock and decor never uses gold.
