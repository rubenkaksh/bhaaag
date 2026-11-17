# ChatGPT sprite prompts for Bhaaag (2026-11-15)

Input: `docs/sprite-prompt-requirements.md`. Processing target: `game-asset-production-integration` skill (`asset_pipeline.py key / pack / validate`). Nothing here was test-generated; every prompt is unverified until one image has gone through `key` and a checkerboard halo check.

## 1. Review of the requirements

Wrong or misleading for ChatGPT:

1. **Canvas sizes.** "1024x1024 or 704x1408, multiples of 16" is the Flux precedent. ChatGPT image generation gives three canvases: 1024x1024, 1536x1024, 1024x1536. Prompts below use only those; everything else is a Lanczos downscale afterwards.
2. **Green despill rule is stated too narrowly.** `G = min(G, R)` damages every subject pixel with G > R, not only "green". That includes olive ridges (`#4A5236`, `#6E7158`), flag blue `#2F6FD1`, sky zenith `#6F87A8` and any cool grey. So "cool grey mist on a green key" (allowed by T290c wording) fails the despill. Rule used below: green key only when the whole subject is warm (R >= G); otherwise magenta.
3. **Magenta has no despill rule.** Conflict 3 says "re-derive"; nobody has. Until someone does, magenta-keyed assets need crisp opaque edges so that no despill is needed, and must contain no pink or purple. Marked as unverified work for the processing step.
4. **"Preserve soft glows" contradicts "flat-colour key only".** A flat key cannot produce soft alpha. Glow and soft mist must not go through `key` at all: generate them on pure black and either blend additively (no alpha needed) or convert luminance to alpha. `asset_pipeline.py` has no luminance-to-alpha command that I know of (not checked). Recommended default: do not generate glows at all (see decision 3).
5. **"Centred, margin on all sides" does not fit bands.** A horizon or village band must touch the left, right and bottom edges. Those assets get their own framing rule below (key colour above the silhouette only). ChatGPT will not make them seamlessly tileable; fix by mirroring the image at the seam in processing.

Missing:

6. **Lighting direction.** The style bible requires one; the requirements give none. The prompts assume a low warm sun from the upper left. Check against the game's sun direction before a batch; mirror the image if it is wrong.
7. **Outline treatment and edge style** are undecided. The prompts ask for crisp, fully opaque edges with no outline glow, because that is what the keyer needs.
8. **Transparent output.** ChatGPT sometimes returns a real transparent PNG and sometimes a painted checkerboard. Do not ask for it; ask for the key colour. If a transparent file arrives anyway, inspect the alpha channel before trusting it.
9. **ChatGPT house look.** It adds a warm yellow cast, film grain, vignette and a soft floor shadow by default. The master prompt excludes all four.
10. **Gameplay colours in decoration.** The requirements note this (PM Principle 3) but give no instruction. The prompts ban saturated yellow-gold outright and push distant cream and terracotta toward haze `#D8C59A` so backdrop art cannot read as an anchor, a safe surface or a hazard.
11. **Prayer-flag cards** are listed as a candidate but are thin strings plus blue and green cloth: the worst case for keying. Build them from primitives; no prompt is provided.
12. **The 2026-11-11 concept sheet must not be attached as a reference.** It teaches gradient backgrounds, glow halos, gold embers, floating islands and East-Asian dragons, all rejected. Use the first approved image from this batch as the reference instead.

Consistent and kept as is: one subject per image, record and sample the real key colour from a corner, never assume a grid, static sprites only, PNG source and WebP runtime, per-sprite tier assignment.

## 2. Master prompt

Fill the slots in braces. Key colour: `#FF00FF` (name "magenta") when the subject has any green, olive, blue or cool grey; otherwise `#00FF00` (name "green").

```text
Create one game sprite source image: {ASSET_NAME}.

CANVAS: {CANVAS: 1024x1024 square | 1536x1024 landscape | 1024x1536 portrait}.

SUBJECT: {SUBJECT_DESCRIPTION}.
VIEW: {VIEW: e.g. straight side view at eye level, orthographic feel, no perspective distortion}.
LAYOUT: {FRAME_LAYOUT: default "exactly one subject, centred, filling about 70 percent of the canvas, with empty background margin of at least 12 percent of the canvas on every side; nothing touches or crosses the canvas edge"}.

BACKGROUND: one perfectly flat, uniform, solid {KEY_NAME} colour, hex {KEY_HEX}, identical in every corner and behind every gap in the subject. The background is a plain colour fill for chroma keying. It has the same value everywhere: flat, even, unlit, empty. The subject casts nothing onto it and emits nothing into it.

EDGES: the subject has a crisp, clean, fully opaque silhouette with a hard boundary against the background. Shapes are chunky and solid. Every part is at least a few pixels thick. Any holes in the subject are large and clearly show the flat background colour.

STYLE: stylised hand-painted game art, simple readable forms, soft painted shading inside the silhouette only, clean and sharp, neutral colour balance. Lit by a low warm sun from the upper left. Newari architecture and landscape of the Kathmandu valley hills at sunset.

PALETTE, use these hex colours exactly:
- roof tile red-orange #b5441c, brick red-brown, plaster cream #f3ead6
- dark carved timber #4a2c1c to #5a3622
- haze #D8C59A, distant ridges #4A5236, #6E7158, #A7A68F
- cloud and mist: warm white to warm light grey
Keep every colour muted and slightly hazy. Yellow is limited to pale, desaturated haze tones. The colour {KEY_NAME} and anything close to it appears only in the background.

The image contains only the subject and the flat background: a single image, plain, unframed, unlabelled, with clean empty margins.

Before finishing, check: is the background one flat {KEY_HEX} everywhere, is the whole subject inside the canvas with margin, and is the subject free of {KEY_NAME}? If not, redo it.
```

Notes for the person pasting:

- Hex values are a request, not a guarantee. After download, sample the real background colour from a corner and pass that to `key --color`.
- Save the PNG to `source/generated/` unchanged. Record prompt, key colour and canvas in the inventory.
- Processing: green key uses the T290d recipe (`--tolerance 60..90 --softness 45`, then `G = min(G, R)`). Magenta key has no despill yet; use a tighter softness and check both checkerboards.
- Target sizes below are after Lanczos downscale; keep aspect, pad, never stretch.

## 3. Per-asset fill-ins

Paste the master prompt and replace the slots with these values.

### 3.1 Cloud / mist card (Chase and Cloud Village backdrop) - recommended first asset

```text
ASSET_NAME: cloud_card_a
CANVAS: 1536x1024 landscape
SUBJECT_DESCRIPTION: one single stylised cumulus cloud bank, wider than tall, built from large rounded lobes with a flat-ish underside. Solid and opaque like sculpted cotton, with a firm scalloped outline. Warm white on the sunlit upper left, warm light grey (slightly peach, never bluish) in the shaded lower right. It is only a cloud: plain, natural, unlit from inside.
VIEW: straight side view, as seen far away at eye level
FRAME_LAYOUT: exactly one cloud, centred, about 70 percent of canvas width, at least 12 percent empty margin on every side
KEY_NAME / KEY_HEX: green / #00FF00
```

Target: 512x256 WebP with alpha, pivot centre. Make 2 variants (`cloud_card_a`, `cloud_card_b`: same prompt plus "taller and more compact").

### 3.2 Distant village silhouette band (backdrop card)

```text
ASSET_NAME: village_band_far
CANVAS: 1536x1024 landscape
SUBJECT_DESCRIPTION: a far-away row of about nine small Newari houses along a hillside ridge, seen through sunset haze. Two-tier hipped pagoda roofs with deep straight eaves, brick walls, cream plaster bands, dark timber lattice windows taller than wide, a few flat terrace roofs with a low parapet and a black water tank. All colours faded toward haze #D8C59A so the row reads as a soft distant silhouette with only hints of roof red and timber brown. Roof lines are straight and simple. The ground under the houses is one solid dark hazy mass.
VIEW: straight side elevation, orthographic, all houses at the same scale on one baseline
FRAME_LAYOUT: one continuous horizontal band. It spans the full canvas width and touches the left edge, the right edge and the bottom edge. The band fills the lower 45 percent of the canvas. Everything above the roofline is flat background colour. The top of the band is a clean, hard skyline.
KEY_NAME / KEY_HEX: green / #00FF00
```

Target: 1024x256 WebP with alpha (crop to the band, pad to size), pivot bottom-centre. Not tileable as generated; mirror at the seam.

### 3.3 Horizon card (replacement for `textures/horizon.webp`, only if the owner wants one)

```text
ASSET_NAME: horizon_far
CANVAS: 1536x1024 landscape
SUBJECT_DESCRIPTION: three overlapping layers of far Himalayan foothill ridges at sunset, each a simple solid shape with a smooth rolling top line: nearest ridge dark olive #4A5236, middle ridge #6E7158, farthest ridge pale #A7A68F. Behind them a low, pale snow range in warm white with soft peach shadow, with broad simple peaks. Flat painted shapes with gentle shading, very hazy and calm.
VIEW: straight-on distant view, flat, like stacked paper cut-outs
FRAME_LAYOUT: one continuous horizontal band. It spans the full canvas width and touches the left edge, the right edge and the bottom edge. The band fills the lower 50 percent of the canvas. Everything above the top skyline is flat background colour. The skyline is a clean, hard edge.
KEY_NAME / KEY_HEX: magenta / #FF00FF
```

Target: match the pixel size of the existing `public/assets/textures/horizon.webp` (not checked; expected about 2048x512 or 1024x256), pivot bottom-centre. Magenta because the ridges are olive.

### 3.4 Soft mist wisp (only if hard-edged cloud cards are not enough)

This one does not use the key colour. Replace the BACKGROUND, EDGES and final check paragraphs of the master prompt with:

```text
ASSET_NAME: mist_soft_a
CANVAS: 1536x1024 landscape
SUBJECT_DESCRIPTION: one broad, low, horizontal bank of soft mist, pure white, brightest in its centre and fading smoothly to nothing at all its edges. Greyscale only.
VIEW: straight side view
FRAME_LAYOUT: one mist bank, centred, about 70 percent of canvas width; it has faded completely to black well before every canvas edge
BACKGROUND: perfectly flat pure black #000000 everywhere. The image is a greyscale brightness mask: white where the mist is dense, black where there is none.
```

Target: 256x128. Processing: brightness becomes alpha, colour set in code (cream or warm white). Needs a luminance-to-alpha step that the pipeline may not have.

### 3.5 Glow sprite (sun disc, eye glow) - recommended: do not generate

A radial gradient drawn on a canvas in code costs 0 KB and has perfect alpha. If the owner still wants a generated one, use 3.4 with:

```text
ASSET_NAME: glow_round_a
CANVAS: 1024x1024 square
SUBJECT_DESCRIPTION: one perfectly round soft glow, pure white at the centre, fading smoothly and evenly to black, perfectly symmetric, greyscale only
FRAME_LAYOUT: one glow, exactly centred, fully faded to black at 80 percent of the canvas half-width
```

Target: 128x128, additive blending, tint in code. Tint must not be anchor gold `#ffc83a`.

## 4. Multi-frame variant

Caveat: ChatGPT does not hold a grid. Cell sizes, gutters, subject scale and frame count drift, and the skill rejects clipped or mixed cells. No sprite animation is in the lean scope, so this is only for a future ask. Recommended route is A; B is a fallback for at most 4 frames.

**A. One frame per image (recommended).** Generate frame 0 with the master prompt and approve it. Then, in the same chat, attach or refer to that image and send once per frame:

```text
Use the previous image as an exact reference. Make the next frame of the same sprite: {ASSET_NAME}, frame {N} of {TOTAL}.

Keep identical: the subject's design, colours, size on the canvas, position of its {ANCHOR: e.g. base / centre}, camera view, lighting from the upper left, canvas size, and the flat {KEY_NAME} {KEY_HEX} background.

Change only this: {FRAME_CHANGE: e.g. "the left lobe has drifted slightly further left"}.

Still one subject, centred with margin on every side, crisp opaque edges, plain flat background, single unframed image.
```

Name outputs `{asset}_000.png`, `{asset}_001.png`. Before packing, check same canvas size and that the anchor has not jumped; regenerate a drifting frame instead of cropping it.

**B. Short strip (fallback, 2 to 4 frames).** Add this LAYOUT to the master prompt:

```text
CANVAS: 1536x1024 landscape
FRAME_LAYOUT: a single horizontal row of exactly {N: 2, 3 or 4} frames of the same subject, left to right. The canvas is divided into {N} equal-width invisible cells. Each cell holds one complete subject, the same size in every cell, centred in its cell with clear empty background around it, so that wide flat background separates each subject from its neighbours and from the canvas edges. The cells are divided only by empty background. Frame by frame: {FRAME_1}; {FRAME_2}; {FRAME_3}; {FRAME_4}.
```

Expect to give cell coordinates by hand when slicing.

## 5. Follow-up message for failed outputs

```text
Redo the same image with these fixes only. Background: one perfectly flat, uniform {KEY_NAME} {KEY_HEX} with the same value in every corner; plain, even and unlit.
Framing: zoom out so the whole subject is inside the canvas with at least 12 percent empty background on every side (for band assets: the band touches left, right and bottom, with flat background above it).
Edges: give the subject a crisp, hard, fully opaque outline directly against the flat background, and keep every part of the subject free of {KEY_NAME}.
```

## Decisions the owner must make

1. **Which assets to generate.** Default: two cloud cards (3.1) and one village band (3.2). Skip horizon (one already ships), glow (procedural), soft mist, prayer flags and anything dragon (dragon is 3D since T304).
2. **Texture budget and tiers.** New texture files are 0 KB by default and Low is capped at 150 KB. Default: approve up to 100 KB total for the three sprites, listed in `textureManifest.ts` for Medium and High only; Low gets none.
3. **Soft-alpha assets.** Default: none. Hard-edged cards on a key colour only, glows drawn in code. Choosing 3.4 or 3.5 means adding a luminance-to-alpha step to the pipeline.
4. **Pillow for the pipeline.** System `python3` has no Pillow. Default: run via `uv run --no-project --with pillow python -I` (existing precedent), no repo dependency added.
5. **Reference image and approval gate.** Default: do not attach the 2026-11-11 concept sheet; generate `cloud_card_a` first, run it through `key` and the checkerboard check, and only then use it as the reference for the rest. Confirm the upper-left sun direction against the game at that point.
