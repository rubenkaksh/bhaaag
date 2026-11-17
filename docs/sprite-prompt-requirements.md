# Sprite prompt requirements (input for a ChatGPT image-prompt writer)

Facts only, collected 2026-11-15. Not a prompt. Each fact cites its source. Mission check: `PRODUCT.md` read; `docs/lean-scope.md` supersedes `CLAUDE.md` and `docs/zipline-plan.md` where they conflict (`CLAUDE.md`, "Precedence").

Source key: SKILL = `~/.claude/skills/game-asset-production-integration/` (identical copy in `skills/game-asset-production-integration/`); T290d = `docs/briefs/T290d-flux-dragon-prompts.md`; AG = `docs/art-style-guide.md`; GS = `docs/graphics-spec.md`; LS = `docs/lean-scope.md`; ZP = `docs/zipline-plan.md`; PM = `PRODUCT.md`.

## 1. What generated art must survive (skill rules)

Core rule: a generated image is source material, never a finished asset; status ladder Concept only / Processed / Engine-ready / Engine-verified (SKILL `SKILL.md`).

**Background and alpha**
- Prompt for transparent background only "if the generator can reliably provide it"; otherwise a flat, high-contrast key colour that does not occur in the subject, and record the key colour (SKILL `references/generation.md`, strategy A).
- Project precedent: flat `#00FF00` chroma key, then key with `asset_pipeline.py key --color <sampled corner colour> --tolerance 60..90 --softness 45`, then despill `G = min(G, R)`, never threshold alpha to binary (T290d 4.4). Despill is only safe when the subject palette has G <= R (T290d 4.1).
- The `key` command is a flat-colour key; it cannot cut gradient or glowing backgrounds, and no shadow/gradient/contact shadow wider than the tolerance may be on the background (SKILL `references/processing.md`; T290d 4.4).
- Alpha must be inspected on light and dark checkerboards for halos before any "background removed" claim (SKILL `processing.md` 2).
- Preserve soft glows and semi-transparent particles for VFX (SKILL `processing.md` 2).

**Framing, padding, composition**
- One subject per image; centred; safe margins on all sides; fixed view and consistent scale; clean readable silhouette; no text, labels, borders, contact sheets or decorative framing (SKILL `generation.md` A).
- T290d wording used: "single isolated subject centred with empty margin on all sides, plain flat solid pure green background, uniform chroma-key green, no shadow on the background".
- State the view direction per asset (gameplay camera, front, side, top, isometric) (SKILL `generation.md`, consistency controls). Project precedent: body pieces in dorsal/top-down view, symmetric, so mirroring and rotation are free (T290d 2.1).
- Never stretch to fit; preserve aspect ratio and pad (SKILL `processing.md` 3).

**Sprite sheets / animation strips (if any are requested)**
- Specify exact rows x columns, exact frame count, equal-sized cells, fixed subject scale and anchor, same camera/lighting/background, no cell borders, labels, cross-cell shadows or overlapping frames, motion per frame, loop or not, frame/total duration (SKILL `generation.md` B).
- Prefer short isolated strips over one huge sheet; generate materially different assets separately to avoid drift (SKILL `generation.md`).
- Never assume the grid is exact; slicing detects boundaries, rejects clipped/mixed cells, exports zero-padded names like `projectile_blue_000.png` (SKILL `processing.md` 4).
- Frame QA: identical frame dimensions, consistent pivot, no jitter, no edge clipping, no palette/lighting drift (SKILL `processing.md` 5). Severe drift is regenerated as a smaller strip, not cropped away (SKILL `validation.md`).

**Atlas, sizes, pivots, naming, metadata**
- Default PNG with alpha for sources, lossless; power-of-two atlas "where practical"; 2-4 px padding/extrusion; pivots characters bottom-centre, projectiles centre, ground decals centre (SKILL `generation.md`). Default `pack`: max 2048, padding 2, extrude 1, `--trim` optional, `--pivot` default 0.5,0.5 (`tools/asset_pipeline.py`).
- Stable IDs/names, zero-padded frame suffix (SKILL `processing.md`).
- Metadata fields: atlas, image, size, format, padding, extrude, per sprite `frame{x,y,w,h}`, `sourceSize`, `spriteSourceSize`, `trimmed`, `pivot`, `sourcePivot`; per animation `frames`, `frameDurationMs`, `loop` (SKILL `processing.md`).
- `validate` checks: size matches, alpha present, rects inside atlas, no overlap, padding gaps, animation frames exist, same canvas size and pivot per animation. Not checked: extrusion content, visual quality, engine behaviour (SKILL `validation.md`).
- Per-asset inventory fields: ID, family, in-game use, source reference, dimensions, colour mode, frame count/size, pivot, collision notes, status (SKILL `generation.md`).

**Style bible needed before a batch** (SKILL `generation.md`): style, named palette with hex, lighting direction, camera/perspective, outline treatment, relative scale, readability at smallest screen size, background/alpha, animation timing, negative constraints. For a batch: approved hero asset first, small proof set, review, then scale up; reuse the same reference image and prompt structure.

**Import steps / engine (three.js)**
- Use the project's loaders and scene graph; sprites/planes only when appropriate to the style; stock materials only; budget texture bytes per tier; load once, share, dispose; concept sheets are mood only, never loaded, cropped or shipped as a texture (SKILL `references/engines/threejs.md`).
- Folders: `source/generated` (immutable), `processed/`, `atlases/`, `previews/`, `manifests/`, `reports/`; large binary sources stay out of git in a gitignored reference folder (SKILL `references/delivery.md`).
- Handoff must list: inventory, source-to-output map, dimensions/frames/pivots/durations, atlas+JSON, import instructions, validation report (passed/failed/unverified), limitations, previews (SKILL `delivery.md`).
- Decorative art must never become a collider or set timing/damage (SKILL `SKILL.md` principle 8).

## 2. Project facts

**Game and camera.** Third-person single-player web game (three.js, Vite); hero zipline-hooks anchors and slides house to house down a Newari-themed Kathmandu hillside at golden hour; bad landings kill; instant restart (PM Product Purpose; `CLAUDE.md`). Camera stays third-person; first person rejected (GS round 2). Portrait and landscape both playable (PM Platform). Modes: Classic L1, Dragon Chase, Nagarkot Run, Cloud Village, graph levels (LS amendments).

**Style.** Stylised but lit, not photoreal; warm directional low sun, soft shadows, haze, tone-mapped sunset; Himalayan snow range and layered hills behind (GS round 2). Painterly "ui-reference.webp" is the north star (AG; `docs/graphics-overhaul-plan.md`, local gitignored `docs/reference/`).

**Palette.**
- Gameplay colour language, strict: gold = interactive, cream-white = safe, terracotta = danger; "Nothing decorative may use anchor gold" (LS Kept; PM Principle 3; ZP 5.2). Anchor gold `#ffc83a` in code (`src/app/ropePost.ts`, `src/adapters/ui/hud.ts`); HUD terracotta `#c4472a`, HUD cream `#f3ead6` (T290d 4.1).
- Newari kit: roof tile red-orange near `#b5441c` (darker variant allowed), brick red/brown, cream plaster only (no pink/yellow), timber `#4a2c1c` to `#5a3622` (lighter `#6b4128`), tanks black and dark green, prayer flags `#2F6FD1 #F4F4F4 #D23A2E #2F9E4F #F2C230` (AG palette direction; ZP 5.2 table).
- Sky/haze: zenith `#6F87A8`, mid `#C9C3A8`, horizon gold `#F4D27F`, haze `#D8C59A`, ridges `#4A5236 / #6E7158 / #A7A68F` (ZP 5.2; "sampled by eye", AG says sample references before locking).
- Dragon (Chase): ember/terracotta; highlight `#f2dcc8`, mid `#d9906a`, shadow `#a5462a`, deep `#5e2416`, rim/eyes `#ff6a2a`; forbidden saturated yellow-gold near `#ffc83a`, large flat pure white or `#f3ead6`, any green/blue/purple on the subject (T290d 4.1).
- Cloud and mist stay cream, white or cool grey; no gold lanterns, glows or orbs in decoration (`docs/briefs/T290c-chase-cloud-village-backdrop.md`).

**Newari shape language.** Hipped/two-tier pagoda roofs with deep eaves and carved brackets; carved dark-timber lattice windows (taller than wide); full-width timber balconies with square-baluster rail; flat terrace roofs with 0.6 m parapet, black/green tanks on stilts, solar heater, planters, laundry lines, prayer-flag strings (AG Shapes; ZP 5.1). Rejected: East-Asian curled or jade/teal roofs, torii-like gates, European chimney cottages, floating islands, off-brief decorative gold (T290c; `docs/asset-handoffs/cloud-village/README.md`; `docs/briefs/T297-amendment-draft.md`).

**What is a sprite vs 3D under lean-scope.**
- Hero: procedural capsule-and-box mannequin, 6 poses (run, jump/fall, rope hang, slide-brake, roll, dead), no GLB, no hero sprite (LS Model and animation; `CLAUDE.md` Hero).
- Houses, anchors, ropes, terrain, hero, dragon (since T304) are 3D primitives with stock materials; textures are small baked tiles (GS; AG; `src/adapters/render/dragonSpriteView.ts` says the sprite dragon was replaced by the 3D `dragonView.ts`).
- Current raster assets in `public/assets/`: tile JPEGs 256 px (`wall_brick`, `wall_plaster`, `roof_tile`, `stone_warm`, `terracotta_a`, `tin`, `straw`, plus `_n` normals), `textures/horizon.webp` (alpha above the ridge, far backdrop card), and `dragon/*.webp` (head-a/b, cloud-seg-a/b, cloud-puff-d/e; legacy, not in `textureManifest.ts`).
- Runtime sprite-like uses in code: additive glow `Sprite` on the dragon eye, rope billboard handle, sun disc/glow sprites planned (ZP 5.6), HUD icons are inline SVG (`src/adapters/ui/hud.ts`, `docs/three-track-plan.md` C-section).
- Open item in GS: "Which generated sprites go in-world." Not decided anywhere I found.
- Therefore no sprite list is mandated by lean-scope. Plausible candidates, not decided: Chase cloud/mist cards and distant village silhouette band (T290c, renders from kit + fog, "no billboards of concept art"), horizon card, prayer-flag or cloud billboard cards. Needs owner confirmation (see section 4).

**Sizes and budgets.**
- Runtime texture bytes loaded per tier cap: Low 150 KB, Medium 300 KB, High 600 KB (owner 2026-11-15; PM; LS Budget; `src/adapters/render/textureManifest.ts`). Every shipped texture must be listed in `textureManifest.ts` with its tiers; a test fails otherwise.
- New texture files 0 KB by default; owner approval needed first (`docs/briefs/T290c`; PM Cloud Village amendment). Earlier T290d set a one-off 300 KiB cap for the dragon set (now superseded in effect by the 2026-11-15 caps).
- JS bundle <= ~600 KB gz, initial chunk <= 215 KB gz (PM).
- Low tier stays stock: no shadows, no post-processing, small instanced detail hidden, atmosphere layers and normal maps off on phones; Medium/High add shadows, tone mapping, (High) bloom; mobile pixel ratio 1.0 / 1.25 / 1.5; draw-call caps Low 55, Medium 70, High 85 (GS Mobile budgets, ADR 0009).
- Existing runtime format precedent: WebP with alpha, quality 78-82, `LinearFilter`, no mipmaps; tiles 256 px JPEG; sprite pivots via three.js `Sprite.center` (0,0 bottom-left); generation 1024x1024 or 704x1408, about 1 MP, multiples of 16 (T290d 2.1, 3.1). Downscale with Lanczos, trim nothing, keep the canvas (T290d 4.4).
- Sprite draw cost: one call per `Sprite` piece; Low adds at most 1 call for a new backdrop element (T290c; T290d 5.7).
- Shipped palette-gameplay constraint: decorative sprites must not read as gold/cream/terracotta gameplay signals (PM Principle 3).

**Art budgets from ZP (kit parts, not sprites):** one 2048 atlas per kit at about 256 px/m was the pre-lean plan; GLB pipeline is dropped (LS item 4).

## 3. Existing style reference image

`docs/ChatGPT Image Nov 11, 2026, 05_43_03 PM.png` (3.2 MB, portrait about 2:3, untracked in git). Viewed. It is a loose concept sheet, not a Newari reference:
- Top half: four painterly cloud dragons on a dark-amber glowing gradient background (two frontal Chinese dragon heads with tall antlers, flame mane, whiskers, open fanged mouth, each flanked by a fluffy white cloud body with curling tails and ember-orange glowing wisps; two headless cloud banks).
- Bottom half: about nine floating grassy stone platforms with brown rocky earth undersides and a small rock-and-grass cluster, plus two more cloud banks, on an olive/green gradient background.
- Look: ink-outlined painterly 2.5D, warm cream/white clouds with gold-ember rim glow, cream-grey stone, saturated green grass. Subjects are separated by gradient, glowing halos, not flat key colour and not transparent.
- It is the same kind of source as the "cloud village" concept sheets the repo rejected: "Do not extract, crop or ship"; mood only (`docs/asset-handoffs/cloud-village/README.md`; `docs/reviews/game-art-skill-review.md` verdict 4).

## 4. Open questions / conflicts

**What ChatGPT image generation cannot do reliably (affects the skill's requirements)**
- True transparency: the skill allows transparent background only if reliably produced; expect a baked-in background or a fake checkerboard. Plan on a flat key colour and record it (SKILL `generation.md` A). Request a single flat colour, no gradient, no vignette, no glow halo, no ground shadow. The reference image above shows the generator's default: glowing gradient backgrounds that `key` cannot cut (SKILL `processing.md`; T290d 4.4).
- Exact colours: hex values in a prompt are not honoured exactly; the actual background colour must be sampled from a corner (T290d 4.4: "Schnell's flat green is rarely exactly `#00FF00`").
- Exact grids and frame counts: rows, columns, equal cells and clean gutters are unreliable; the skill says never assume a grid is exact (SKILL `processing.md` 4). Prefer one subject per image, or strips of few frames, and expect manual cell coordinates.
- Frame-to-frame consistency: the skill requires same camera, scale, lighting and palette across frames; the generator drifts. Follow the skill's failure rule: regenerate smaller strips or single frames, never crop severe drift (SKILL `validation.md`). The reference image's four near-identical clouds already differ in size and silhouette.
- Exact pixel sizes and power-of-two: output sizes are fixed generator sizes, not 256/512; downscale with Lanczos afterwards. Plan generation at about 1 MP and resize (T290d 3.1).
- Negative constraints, text, labels, borders: write exclusions as positive statements (T290d 3.1 for schnell; likely also helps here, untested).
- No depth, collision or mesh: image generation cannot create a 3D model or rig (SKILL `generation.md` E).
- Edge quality: thin strands (whiskers) and soft wisps are lost or haloed by keying (T290d 2.2, 4.4).

**Conflicts and gaps**
1. No sprite list exists. LS requires primitives and procedural art; hero and houses are 3D. The only live raster candidates are Chase/Cloud Village backdrop cards, horizon card, glow sprites. Owner must say which assets to generate before prompts are written.
2. The existing ChatGPT reference shows floating platforms and gold-ember glowing dragons; floating islands, gold decoration and East-Asian dragon/architecture are out (LS 2026-11-12 amendment; T290c; PM). Dragon is now 3D (T304), so dragon sprites may be moot.
3. Palette clash: reference has saturated green grass on stone platforms, and T290d forbids green on the subject so the green key can be despilled. If a green-heavy subject is needed, use a different key (for example magenta) and re-derive the despill rule.
4. Skill defaults (PNG source, bottom-centre pivot for characters, 2-4 px atlas padding, atlas packing) vs project precedent (WebP runtime q78-82, centre pivots, per-file textures loaded via `textureManifest.ts`, no atlas yet). Which governs is undecided; PNG sources plus WebP runtime is consistent with both.
5. Texture budget: Low tier is capped at 150 KB total and the existing six eager tiles already load on every tier (`textureManifest.ts`); a new always-on sprite likely does not fit on Low. Tier assignment (`RICH`, `HIGH`, or `[]`) must be stated per sprite.
6. Python/Pillow is not installed for system `python3`; `asset_pipeline.py` fails to import. Project precedent runs Python via `uv run --no-project --with pillow python -I` (T290d 4.4). Adding Pillow to the repo needs owner approval (SKILL `processing.md`; `CLAUDE.md` ask-before-dependencies).
7. No target sizes are fixed for any new sprite. The only numeric precedents are dragon 512x512 head, 256x512 body pieces (T290d 2.2) and 256 px tiles.
8. Pivot, frame counts and frame durations are unspecified for everything; no sprite animation exists in the lean scope (animation is code-driven rotation/wobble, T290d 5). Treat sprites as static unless the owner asks.
9. Style source conflict: the skill says project docs outrank concept sheets (SKILL principle 1); this image is a concept sheet that contradicts docs (islands, gold, East-Asian). Docs win.
10. PM "Users" is UNCONFIRMED; phone play and light load are the working assumption.
11. `docs/zipline-plan.md` palette and 6-archetype kit are pre-lean; AG palette direction (roof `#b5441c`, cream plaster only) overrides ZP's peach/mint plaster and `#A8492F` tile (AG vs ZP 5.2).
