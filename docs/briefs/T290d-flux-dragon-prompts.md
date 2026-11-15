# T290d brief: Flux redo of the cloud dragon sprite set (Snake-style layout) + animation plan

Author: art/technical director seat. Revision 2, 2026-11-12, with the owner's answers (layout,
square head, no concept jpg, local mflux route, 300 KiB cap). Status: brief only. Nothing
generated, nothing edited in `src/`, no gates run.

Mission check: PRODUCT.md read. Dragon Chase is an allowed mode. The work uses sprites and stock
`SpriteMaterial` only: no shaders, no GLB. Principle 5 ("~150 KB added max") is exceeded on
purpose: the owner set a 300 KiB cap for the new dragon set. No other conflict.

Image references come only from our own current sprites:
`docs/reference/dragon-face/masters/head-a.png`, `head-b.png`, `cloud-seg-a.png`, `cloud-seg-b.png`.

---

## 0. Target layout (owner, binding)

On the portrait screen the dragon fills an area above the hero. Inside that area:

- the **head** is at the **bottom** and leads, facing the camera/down-screen toward the hero;
- the **neck** rises just above the head;
- the **body** winds upward in a clear S-curve, like the snake in a Snake game;
- the **tail** with its plume is at the **top**.

**Assumption A1 (flagged):** "neck a little above, tail at the top" means the neck starts directly
above the head (its bottom end tucked under the head's top mane) and the S-curve starts at the
neck; it does not mean the neck sits beside the tail. If the owner meant something else (for
example a coiled body whose neck loops back up near the tail), the chain order in 2.3 and the
path in 4.2 change; the assets do not.

The geometry already points this way: the head sits nearest the camera, pinned 14 m ahead of it
(`HEAD_AHEAD`). The body runs uphill (+Z) and higher, so it projects **up** the screen. What is
missing is the S-curve near the head, the correct segment rotation, and art that reads as a snake.

---

## 1. Diagnosis: why the current set reads as a character, not a snake dragon

1. **The head is a winged emblem.** head-a/b are 3:1 crops (640x214 master, 512x172 runtime). The
   face is 29% of the width (`FACE_FRAC = 0.29`); the other 71% is two cloud arms reaching left and
   right. Head-on, that reads as a moustache, a moth or a figure with its arms out. A snake's body
   leaves the head from **one** place: in the new layout, straight up behind it.
2. **The body pieces are cumulus, not body.** cloud-seg-a/b are horizontal crescents of round
   puffs. They have no scales, no spine line, no constant thickness. A chain of them reads as weather.
3. **The segments lie across the body path.** The body runs up the screen, but the pieces are
   horizontal art rotated by only a few degrees (`atan2(..., BODY_LEN) * 0.5`, from world dx/dz,
   not from the screen tangent). The result is a stack of horizontal cloud bars above a winged
   head: a totem or blob, not a Snake-game line.
4. **No S-curve where it matters.** Lateral amplitude is `WAVE_AMP * u^2`, which is about 0 for the
   first third of the body. The body goes straight up out of the head and only curves at the far,
   small tail. Perspective also shrinks far amplitude on screen, so even the tail S is weak.
5. **Seams and beads.** The fat puffy ends overlap into bead bulges instead of a continuous tube.
   The head-to-body join is the head's own sideways cloud arms.
6. **No tail, no limbs, no taper cue.** The chain ends in a smaller copy of the same crescent. There
   is no tail plume and no claw. What identifies a long dragon (antlers, whiskers, mane, scaled
   snake body, small clawed legs, tail tuft) is only partly present, and only in the face.
7. **Colour drifts into "interactive".** The glow is saturated gold, close to the anchor gold
   `#ffc83a`. The dragon is danger: lean terracotta/ember.

**The fix in one line:** a head with no side masses that faces down-screen, with a neck rising from
its top. Body pieces drawn from above (dorsal view) along a vertical axis and rotated to the screen
tangent. An S-curve that starts at the neck and keeps a steady screen width. A plume tail at the
top. An ember/terracotta palette.

---

## 2. Target asset list

### 2.1 Conventions

- **Dorsal (top-down) view for every body piece.** Like a Snake game, the body is seen from above:
  the spine runs down the centre with mane tufts along it, the scales are mirror-symmetric, and the
  belly is never seen. That makes X-mirroring free and any rotation valid (there is no "dorsal up"
  problem).
- **Body pieces are vertical: tail end UP (+Y), head end DOWN (-Y).** The runtime rotates each piece
  to the screen tangent (4.3).
- Pivots use three.js `Sprite.center`: (0,0) is bottom-left, (1,1) is top-right.
- Runtime: WebP with alpha, quality 78-82, `LinearFilter`, no mipmaps (as today).
- Folders: raw schnell output in `art/experiments/dragon-t290d/raw/` (never edited); keyed and
  despilled masters in `art/experiments/dragon-t290d/keyed/`; the manifest in
  `art/experiments/dragon-t290d/manifest.json`. Runtime files go to `public/assets/dragon/v2/` only
  after QA.
- Overlap: consecutive pieces overlap 35-45% of a piece's length on screen. The top and bottom
  ~15% of each body piece dissolve into soft cloud wisps, so the overlap hides the seam.

### 2.2 Asset table

| ID | Runtime px (WxH) | Gen px | Content | Pivot (`Sprite.center`) | Use |
|---|---|---|---|---|---|
| `head-a` | 512x512 (see 2.5) | 1024x1024 | Head only, looking toward the viewer and down-screen, seen slightly from above. Antlers sweep up and back, the mane fans around, two whiskers, closed snarl. A neck stub leaves the **top-back** of the skull, hidden in the mane. No side masses. | (0.5, 0.5); neck socket at head-local (0, +0.32 h) | Default head |
| `head-b` | same | 1024x1024 | Same head, same framing, jaw wide open (roar), whiskers flared | same | Roar / lunge / catch beat |
| `seg-neck` | 256x512 | 704x1408 | Thickest piece, dorsal view, dense mane collar at the bottom end that matches the head's mane | (0.5, 0.5) | Directly above the head, partly under it |
| `seg-a` | 256x512 | 704x1408 | Dorsal view of the scaled body tube with a spine ridge of flame-shaped mane tufts; gentle bend to the right | (0.5, 0.5) | Body |
| `seg-b` | 256x512 | 704x1408 | Same tube, gentle bend to the left, tufts placed differently | (0.5, 0.5) | Body |
| `seg-c` | 256x512 | 704x1408 | Same tube, partly hidden behind a cloud bank at one side ("swimming through cloud") | (0.5, 0.5) | Every 3rd-4th piece, breaks repetition |
| `seg-claw` (optional) | 256x512 | 704x1408 | Same tube with two small four-toed legs sticking out sideways (left and right), the way a lizard looks from above | (0.5, 0.5) | At about u 0.25 and u 0.6 only |
| `tail` | 256x512 | 704x1408 | The tube narrows from the bottom (about 45% of canvas width) to a point near the top, ending in a fanned flame-cloud plume | (0.5, 0.06), the tail root | Topmost piece; whips around its root |

Left out on purpose:
- **Whisker overlay sprites.** Schnell draws thin strands poorly, and the key eats them. Whiskers
  are baked into the head; their drift comes from head rotation (4.6).
- **Mane-tuft sprites.** On the Sprite path each one costs a draw call. The tufts are baked into
  the pieces and sway through per-piece rotation wobble (4.6).

### 2.3 Chain, overlap and head join

- **Head join.** The head (renderOrder 2) draws over `seg-neck`. The neck's bottom mane collar
  disappears under the head's top mane, and no hard neck edge shows. The neck piece's centre sits
  at the head's neck socket, offset up-screen by 0.35 x its own length.
- **Chain order, from the head upward.**
  - Low (6): neck, a, b, c, b, tail.
  - Medium (10): neck, a, b, claw, a, c, b, a, b, tail.
  - High (14): Medium plus a, c, b, a before the tail.
  - With `seg-claw` off, use `a` in its place.
- **Variety:** alternate `a`/`b`, X-mirror every third piece (dorsal art is symmetric, so this is
  invisible except for the bend), use `c` sparingly. No Y-mirror on `tail` or `seg-neck`.

### 2.4 Budget

The owner cap is **300 KiB total** for the new dragon set. Today the set is 148 KiB on disk and
114 KiB loaded after T290b.

| Asset | Estimated KiB (WebP q80) |
|---|---|
| head-a 512x512 | 55-65 |
| head-b 512x512 | 50-60 |
| seg-neck, a, b, c (4 x 256x512) | 4 x 26-32 |
| tail 256x512 | 20-26 |
| seg-claw (optional) | 26-32 |
| **Core set** | **~230-280** |
| **With claw** | **~256-310** |

Target 256 KiB for the core set. If it goes over: WebP q72, head-b at 384x384, or drop `seg-claw`
first. The old six files leave `public/assets/dragon/` after v2 is verified in the engine (owner
call). GPU memory is about 3.6 MiB for 7 textures (today about 2.4 MiB).

### 2.5 Why square? (owner question) and the re-decision

**Where it came from:** a square head was **my (Opus) proposal**, not an owner decision. It came
from diagnosis point 1: the 3:1 crop exists only to hold the two cloud arms. Once they go, a head
with antlers and mane is roughly as tall as it is wide, so a 3:1 canvas would be about 2/3 empty
or would squash the face.

**What it costs:** `catchPose.ts` `HEAD_H_OVER_W = 306/915` and `FACE_FRAC = 0.29` (catch-beat
layout), and `HEAD_SCALE * (306/915)` in `dragonSpriteView.ts` (in-play head size) are all tied to
the 3:1 crop. The 4 tests in `tests/adapters/dragonSpriteView.test.ts` also reference the asset
names (`cloud-seg-b` in the failed-load test) and the segment array. Renaming or restructuring
touches them. That test is about segments, not the head, so the aspect alone does not break it.

**Re-decided for the Snake layout.** With the head at the bottom and the neck leaving its top, the
head canvas needs room for antlers and mane above the face and nothing at the sides.

- **Recommended: square 512x512.** Face about 60% of the width, antlers inside the top 30%. It
  gives the best detail per byte and per MiB of VRAM, and the catch beat (face >= 80% of the
  shorter screen side) gets about 3x the face pixels it has today.
  - Code: `HEAD_H_OVER_W = 1`; `FACE_FRAC` re-measured from the approved head (about 0.6);
    `HEAD_SCALE` drops from 20 to about 9-11 m so the face keeps today's on-screen size; the
    catch-beat shots are redone.
  - Head position and bob stay per T290b.
- **Zero-code alternative for a first in-game look: a padded 3:1 canvas at 1536x512.** Put the new
  head where the old face was (centre 29% of the width) and leave the sides transparent. WebP
  compresses empty alpha well, so it costs only about 5-10 KiB more file, but it needs 3 MiB of
  VRAM per head. No constants change and no tests change. The face is 445 px wide (sharper than
  today's 148 px).
- **Owner-confirmable:** square (recommended) or padded 3:1. The asset prompts are the same: the
  generator always makes a 1024x1024 head, and only the final canvas differs.

---

## 3. Generation route: local mflux FLUX.1 schnell (verified on this machine)

### 3.1 Setup and proven flags

- mflux 0.20.0, a uv tool; the CLIs are in `~/.local/bin` (`mflux-generate`,
  `mflux-generate-kontext`, `mflux-generate-redux`).
- Only `dhairyashil/FLUX.1-schnell-mflux-4bit` is cached (`~/.cache/huggingface/hub`). The Mac is
  an M4 with 16 GB.
- Proven runner: `art/experiments/zipline-tole/run.py`. Flags from it:

```
caffeinate -i mflux-generate --model dhairyashil/FLUX.1-schnell-mflux-4bit --base-model schnell \
  --steps 4 --seed <S> --width <W> --height <H> --vae-tiling --mlx-cache-limit-gb 8 \
  --output <file.png> --prompt "<prompt>" [--image-path <init.png> --image-strength <s>]
```

- `--vae-tiling --mlx-cache-limit-gb 8` is mandatory. Without these two flags, the first img2img
  run took 1 h 55 min (swap thrash, 16.8 GB peak). With them, the peak is 10 GB and a 1 MP image
  takes about 2.2 min.
- Prompts must stay **positive**. Schnell is guidance-distilled; the zipline-tole handover notes
  "schnell has no negative prompt". The `--negative-prompt` flag exists but must not be relied on.
  Exclusions are written as positive statements ("single head only", "plain flat background").
- Sizes: keep about 1 MP (1024x1024, 704x1408) and multiples of 16.
- Run one generation at a time; two in parallel would swap on 16 GB.
- mflux 0.20 prefers `--image <path> <strength>`; the deprecated `--image-path/--image-strength`
  that run.py uses still works.

### 3.2 What the img2img evidence says (zipline-tole `_test/`, STATE.md)

- In mflux, **higher `--image-strength` keeps more of the init image** (0.0 = none).
- Read from `mflux/models/common/config/config.py`: the start step is
  `max(1, int(steps * strength))`. With `--steps 4` there are only three effective levels:

  | Strength | Start step | Steps run |
  |---|---|---|
  | < 0.5 | 1 | 3 |
  | 0.5-0.74 | 2 | 2 |
  | >= 0.75 | 3 | 1 |

  So 0.1, 0.2, 0.3 and 0.4 all use the same schedule (the `tune.log` runs at 0.3/0.2/0.1 all ran
  3 steps).
- Result on a photo (`newari-house.png`, 0.85 down to 0.1): **always a near-copy** of the init.
  Img2img was usable only as a layout/light carrier (G skyline, H golden hour, at 0.4).
- **Consequence for the dragon:** img2img from our sprites keeps their composition, cloud arms
  and crescents included. So we never img2img from the raw sprites. We img2img from a **collage
  init**: a flat `#00FF00` canvas with our own sprite parts cut out and arranged into the new
  layout. The near-copy tendency then preserves the new layout and our style, while schnell
  repaints the surface coherently.
- **Recommended strengths:**

  | Use | Strength / steps |
  |---|---|
  | Collage repaint, most freedom available | **0.3** at `--steps 4` (anything 0.1-0.45 is identical). For finer control: `--steps 8` at 0.25-0.45 (start step 2-3 of 8, about 4.4 min per image) |
  | Variant of an approved piece (seg-b from seg-a, head-b from head-a) | **0.3** at `--steps 4`; if it drifts too much, 0.5 (2 steps) |
  | Harmonise a collage with little change | 0.5-0.6 (2 of 4 steps) |
  | Not useful | >= 0.75 (1 step: the init comes back almost unchanged) |

- **Text-to-image** is the primary route for anything our sprites do not contain: the scaled
  dorsal body, the tail plume, the claw. Our sprites carry style and palette; text carries shape.

### 3.3 Order and consistency

1. **First test** (section 6): head-a, text-only, 3 seeds. If 0/3 pass, run the collage route
   (step 2b).
2. head-a, the version that goes to QA:
   - a. best text-only seed; or
   - b. collage init: crop the central 29% face of `head-a.png` (no cloud arms), centre it on a
     1024x1024 `#00FF00` canvas at about 55% width, then img2img at 0.3 with the head-a prompt.
     Seeds 11-13.
3. Approved head-a becomes the **style anchor**.
4. head-b: img2img from the approved head-a (on green) at 0.3 with the roar prompt. Check
   registration (QA 9).
5. seg-a: text-only, seeds 21-23.
6. seg-b, seg-c, seg-neck: img2img from the approved seg-a at 0.3 (variants with the same scale,
   size and colour), each with its own prompt and seeds 31-33.
7. tail and seg-claw: text-only (seeds 41-43 and 51-58), then a 0.5 harmonise pass using the
   approved seg-a's colours as needed.
8. Log every kept and rejected image in `manifest.json`: id, prompt, seed, steps, size, init,
   strength, seconds, verdict. This is the same schema as zipline-tole.

Expected compute: about 25-30 images at about 2.2 min each, so **about 1 hour**. It is free and
local.

### 3.4 Optional later upgrade: Kontext / Redux (flagged, not available now)

FLUX.1 Kontext [dev] (instruction edits, for example "remove the cloud masses at the sides") and
Redux (style from an image) would fit this job better than schnell img2img. Their weights are **not
downloaded**. They need FLUX.1 [dev]-family weights: a large download, likely at the edge of 16 GB
even 4-bit quantized, and a non-commercial weights licence whose output terms must be checked. Do
this only if schnell fails QA after the collage route. It needs the owner's go-ahead for the
download.

---

## 4. Prompts (schnell, positive only)

### 4.1 Shared style suffix (append to every prompt)

> , painterly 2.5D fantasy game sprite, Chinese and Nepali serpentine sky dragon made of dense
> sunset cloud with clearly readable scales, warm low sun from the upper left, highlights warm
> peach-cream, midtones dusty rose and apricot, shadows deep terracotta and burnt sienna, ember
> orange rim light, glowing ember-orange eyes, crisp readable silhouette with short soft wisps,
> single isolated subject centred with empty margin on all sides, plain flat solid pure green
> background, uniform chroma-key green, no shadow on the background

Palette targets for the reviewer: highlight `#f2dcc8`, mid `#d9906a`, shadow `#a5462a` (near the
HUD terracotta `#c4472a`), deep `#5e2416`, rim/eyes `#ff6a2a`.
**Forbidden:**
- saturated yellow-gold near `#ffc83a` (that is the interactive colour);
- large flat areas of pure white or HUD cream `#f3ead6`;
- green, blue or purple on the subject.

All palette colours have G <= R. That property is what makes the green despill in 4.4 safe.

### 4.2 Per-asset prompts (prefix + suffix 4.1)

**head-a** (1024x1024, text-only or collage init at 0.3):
> front view of the head of a Chinese serpentine dragon looking straight at the viewer, seen
> slightly from above, symmetric, two tall forked antlers sweeping up and back, flame-shaped mane
> fanning around the head, heavy angry brows, broad snout with flared nostrils, closed snarling
> mouth showing fangs, two long thin whiskers curling down from the upper lip, pointed beard, a
> short thick neck rising from the top back of the head hidden in the mane, single head only, the
> head fills two thirds of the image

**head-b** (img2img from approved head-a at 0.3):
> the same dragon head, jaw wide open in a roar showing upper and lower fangs and a dark ember red
> mouth, whiskers flared outward, same position, same size, same antlers and mane

**seg-a** (704x1408, text-only):
> top-down view looking straight down on one straight vertical section of a serpentine dragon's
> body, a round scaled tube running from the bottom edge to the top edge with a gentle bend to the
> right, constant thickness about 40 percent of the image width, a ridge of small flame-shaped
> mane tufts along the centre of the back, overlapping scales symmetric on both sides, the top and
> bottom ends dissolving into soft cloud wisps, no legs

**seg-b** (img2img from seg-a at 0.3): seg-a text with "gentle bend to the left" and "fewer, longer
mane tufts swept toward the top".

**seg-c** (img2img from seg-a at 0.3): seg-a text plus "the left side of the body passes behind
a bank of soft sunset cloud puffs, the spine and mane stay visible".

**seg-neck** (img2img from seg-a at 0.3): seg-a text with "thicker, about 48 percent of the image
width" and "a dense flame-shaped mane collar around the bottom end".

**tail** (704x1408, text-only):
> top-down view looking straight down on the end of a serpentine dragon's tail, a scaled tube
> entering from the bottom edge about 45 percent of the image width wide, tapering smoothly to a
> narrow point near the top, a fanned plume of flame-shaped cloud tufts with ember tips spreading
> from the tip, small mane tufts along the spine getting smaller toward the tip

**seg-claw** (optional, 704x1408, text-only, up to 8 seeds):
> top-down view looking straight down on one vertical section of a serpentine dragon's body,
> scaled tube with a mane ridge along the back, exactly two small dragon legs sticking out
> sideways, one on the left and one on the right, each with four curved talons, like a lizard seen
> from above

### 4.3 Collage init recipe (for 3.3 step 2b and any later layout fix)

Build it with Pillow, outside the repo's code, using `uv run --no-project --with pillow python -I`
as in zipline-tole:
1. Make a canvas of the target size filled with `#00FF00`.
2. Paste the RGBA crops of our sprites (alpha-composited) in the new layout.
3. Save the PNG to `art/experiments/dragon-t290d/init/`.

The init must already have the flat green background: the near-copy behaviour then keeps it flat,
which helps the key.

### 4.4 Key and despill

1. **Key** (skill helper; it writes a new file and never touches the raw):

   ```bash
   python3 ~/.claude/skills/game-asset-production-integration/tools/asset_pipeline.py key \
     art/experiments/dragon-t290d/raw/head-a_s11.png art/experiments/dragon-t290d/keyed/head-a_s11_k.png \
     --color "#00FF00" --tolerance 60 --softness 45
   ```

   - First sample the real background colour from a corner and use it as `--color`. Schnell's
     "flat green" is rarely exactly `#00FF00`.
   - The Chebyshev distances from `#00FF00` are: `#d9906a` 217, `#5e2416` 219, `#f2dcc8` 242, so
     the solid body is safe up to a tolerance of about 150. The real limit is the soft wisps, which
     are part green: keep the tolerance at 60-90.
   - The whisker tips are the first casualty; check them.
2. **Despill** (the `key` command does none). Set `G = min(G, R)` on every pixel. Run it inline,
   for example:

   ```bash
   uv run --no-project --with pillow python -I -c "import sys; from PIL import Image, ImageChops; \
   im=Image.open(sys.argv[1]).convert('RGBA'); r,g,b,a=im.split(); \
   Image.merge('RGBA',(r,ImageChops.darker(g,r),b,a)).save(sys.argv[2])" in_k.png out_kd.png
   ```

   This is safe because every target palette colour has G <= R. It removes the green halo on the
   semi-transparent cloud wisps and any green rim light the subject picked up.
3. **Risks:**
   - Soft cloud edges carry green in the colour and partial alpha. Without despill they show an
     olive halo on the sunset sky.
   - Never threshold the alpha to binary.
   - If the background has a gradient or contact shadow wider than the tolerance, regenerate (new
     seed) rather than masking by hand.
   - A segmentation matte (rembg/BiRefNet) would be a new dependency and needs the owner's
     approval.
4. **Downscale** with Lanczos to the runtime size, trim nothing (keep the canvas), and export WebP
   q80.

---

## 5. Animation plan (sprites + stock materials only)

Constraints carried over from T290b:
- no `new`, arrays or closures in `update()` or `setCatch()`;
- scalars and preallocated scratch only;
- textures load once.

The **head stays as T290b has it**: position, bob, hover. Only its texture and scale constants
change (2.5).

### 5.1 Pieces by tier

| Tier | Pieces (neck + body + tail) | Mist cards (T290b) |
|---|---|---|
| Low | 6 | 1 |
| Medium | 10 | 5 (or 4) |
| High | 14 | 7 |

### 5.2 The S-curve (Snake layout)

- **Starts at the neck.** Replace `amp = WAVE_AMP * u^2` with:

  ```
  amp(u) = (A_NECK + (A_TAIL - A_NECK) * u) * smooth01(u / 0.06)
  ```

  with A_NECK about 3.5 m and A_TAIL about 8 m. The ramp `smooth01(u/0.06)` finishes inside the
  first piece. The neck therefore leaves the head on its centreline (the head stays stable) and
  bends into the S at once.
- **Steady screen width.** Perspective shrinks far amplitude. Multiply `amp(u)` by
  `clamp(dist(u) / dist(0), 1, 2.5)`, where `dist` is the piece's camera distance along the view
  axis (scalar maths from camZ and segZ). The S then keeps a similar width on screen from neck to
  tail.
- **Wavelength.** Use about 1.25 wavelengths over the body (WAVE_K 1.25, range 1.0-1.6) instead of
  2.2. That gives 2-3 large, readable bends on a phone, like a Snake game, not a zig-zag.
- **Keep** T290b's vertical corkscrew (`V_AMP`, `V_PHASE`) and body lift. Keep the travelling
  phase `WAVE_K * u * 2pi - WAVE_W * t`, so the bends travel up the body toward the tail.

### 5.3 Rotate to the screen tangent

- For each piece, project its position and the next piece's position into scratch `Vector3`s
  (`project(camera)`). Then set
  `mat.rotation = atan2(dy_ndc * viewportH, dx_ndc * viewportW) - pi/2`. The art is vertical with
  the tail end up, so a tangent pointing up the screen means rotation 0.
- Dorsal art is symmetric, so no flip logic is needed.
- Piece length `len = max(minLen(u), 1.6 x the projected spacing to the next piece, in world
  units)`; width `len * 0.5`, times the taper `1 - 0.55 * u^1.3`.
- Cost: 2 projections per piece per frame, no allocation. `update()` must receive the camera
  (today only `setCatch` gets it).

### 5.4 Head-follow lag

- Keep a preallocated `Float32Array(2 * 64)` ring buffer of the head's (x, y) offset. Write it at
  a fixed 30 Hz from a time accumulator, so it does not depend on frame rate.
- Piece u adds the sample from `LAG_S * u` seconds ago (LAG_S 0.6) to its wave offset. The head's
  bob and sway then ripple up the body.
- The head itself does not move differently from T290b.

### 5.5 Tail whip (top of the screen)

- The tail rotates around its root, pivot (0.5, 0.06):

  ```
  rotation = tangent + WHIP_A * sin(phase_tail - pi/3)
  ```

  with WHIP_A 0.35 rad, so the plume lags the body wave.
- On lunge onset (`lunge` crosses 0.1), add an impulse `0.6 * exp(-dt/0.35) * sin(18 * dt)` rad to
  the tail, and half of it to the two pieces below. Scalars only.

### 5.6 Secondary motion (cheapest implementation each)

| Motion | Implementation | Cost |
|---|---|---|
| Mane tufts sway | Add `+-3 deg * sin(2.1 t + 5u)` to each piece's rotation (tufts are baked in) | 1 sin per piece |
| Breathing | Width `x (1 + 0.03 sin(0.8 * 2pi * t - 3u))`, travelling up the body | 1 sin per piece |
| Whisker drift | Head `mat.rotation = 0.035 sin(0.5 * 2pi * t)` | 1 sin |
| Ember pulse | `headMat.color.setScalar(0.94 + 0.06 sin(3t))` | free |
| Roar | Swap to head-b when `prox > 0.7` or on a lunge, hold >= 0.6 s; replaces the fixed 2.6 s timer, so no flicker | 1 map swap |

### 5.7 Draw calls

- **Sprite path** (one call per piece):

  | Tier | Head | Pieces | Mist (max) | Total | Change vs today |
  |---|---|---|---|---|---|
  | Medium | 1 | 10 | 5 | 16 | same |
  | High | 1 | 14 | 7 | 22 | +3 |
  | Low | 1 | 6 | 1 | 8 | same |

  Check these against ADR 0009 (Low <= 55, Medium <= 70, High <= 85) with `__ztStats`.
- **Merged-body option** (only if calls are tight):
  - Pack the 6 body textures into one 1024x1024 atlas (cells 256x512) with
    `asset_pipeline.py pack --padding 2 --extrude 1`.
  - Draw the body as one `BufferGeometry` of camera-facing quads: preallocated arrays, CPU
    billboarding from the camera's right/up vectors, written tail-first (back to front), with stock
    `MeshBasicMaterial({ transparent: true, depthWrite: false })` and `frustumCulled = false`.
  - The body then costs 1 call at every tier. It also changes the tests.
  - Decide after the phase-1 shots.

---

## 6. First test (cheapest; a Sonnet seat can run it)

Goal: does schnell, text-only, give a usable head-a in our palette on a keyable green background?
Three seeds, about 7 minutes, no init image needed.

```bash
cd /Users/rubenk/projects/sandbox/workspaces/bhagdori
mkdir -p art/experiments/dragon-t290d/raw art/experiments/dragon-t290d/keyed
P="front view of the head of a Chinese serpentine dragon looking straight at the viewer, seen slightly from above, symmetric, two tall forked antlers sweeping up and back, flame-shaped mane fanning around the head, heavy angry brows, broad snout with flared nostrils, closed snarling mouth showing fangs, two long thin whiskers curling down from the upper lip, pointed beard, a short thick neck rising from the top back of the head hidden in the mane, single head only, the head fills two thirds of the image, painterly 2.5D fantasy game sprite, Chinese and Nepali serpentine sky dragon made of dense sunset cloud with clearly readable scales, warm low sun from the upper left, highlights warm peach-cream, midtones dusty rose and apricot, shadows deep terracotta and burnt sienna, ember orange rim light, glowing ember-orange eyes, crisp readable silhouette with short soft wisps, single isolated subject centred with empty margin on all sides, plain flat solid pure green background, uniform chroma-key green, no shadow on the background"
for S in 11 12 13; do
  caffeinate -i ~/.local/bin/mflux-generate --model dhairyashil/FLUX.1-schnell-mflux-4bit \
    --base-model schnell --steps 4 --seed $S --width 1024 --height 1024 \
    --vae-tiling --mlx-cache-limit-gb 8 \
    --output art/experiments/dragon-t290d/raw/head-a_t2i_s$S.png --prompt "$P" \
    >> art/experiments/dragon-t290d/run.log 2>&1
done
```

Run sequentially, nothing else heavy at the same time. Then key and despill each image (4.4) and
make a 512 px and a 160 px preview on the sunset sky colour.

**Pass** when at least one seed meets all of these:
1. It reads as a dragon head at 160 px wide: antlers, snout, eyes and mouth visible.
2. One head; no side cloud masses; no wings, hands or human face.
3. Nothing is cut at the canvas edge.
4. The background is flat: the four corner samples differ by under 30 on each channel, and G is
   above 180 with R and B below 90. After key + despill there is no green halo on dark or light
   checkerboards.
5. The palette leans peach, terracotta and ember. No lemon/yellow-gold dominates (QA 8).
6. There is no text, watermark or signature.

**Fail actions:**
- 0/3 pass on shape: run the collage init (3.3, step 2b) at 0.3 with seeds 11-13.
- Pass on shape but the background is not flat: add "studio backdrop, evenly lit flat green
  wall", or switch the key to flat magenta `#FF00FF` and redo the despill as `B = min(B, R)`.
- Palette too gold: move "terracotta" and "ember" to the front of the prompt.
- Report the seeds, times and the verdict per seed in `manifest.json`.

---

## 7. QA checklist per generated image (Opus/Sonnet reviewer)

Reject on any FAIL and record the verdict in `manifest.json`.

1. **Phone read.** Downscale to the on-screen size at 390x844: head about 150-190 px wide, body
   piece about 50-90 px long, tail about 40 px. Composite on the sunset sky colour and on a
   terracotta roof crop. The head reads as a dragon head; a body piece reads as a scaled snake
   back, not a cloud. If unsure, FAIL.
2. **Silhouette.** Fill alpha > 0.5 solid black at the same size.
   - Head: antlers, mane fan and snout are recognisable, and there are no side masses.
   - Body: a tube of constant width with a serrated spine.
   - Tail: a clear taper to a plume.
3. **Join / Snake test.** Composite head (bottom) + neck + a + b + c + b + tail (top) along an
   upward S-curve, 40% overlap, rotated to the tangent (a short Pillow script outside the repo).
   - It reads as one snake winding up from the head, like a Snake game.
   - No seam, no bead bulge, no colour step at the joins (mean Lab difference across a join < ~8).
   - The neck collar vanishes under the head's mane.
4. No text, watermark, signature, logo, frame or border.
5. No wings, feathers, human face, hands or fingers. One head. No rider.
6. Limbs: none on head, neck, a, b, c or tail; exactly two side legs with four talons each on
   `seg-claw`.
7. Orientation: body pieces vertical, dorsal (top-down) view, roughly mirror-symmetric; the tail
   root is at the bottom.
8. **Palette.**
   - FAIL if saturated yellow-gold (hue 40-55 deg, saturation > 0.6) covers more than ~5% of the
     opaque pixels.
   - Shadows terracotta/sienna; eyes ember.
   - No green after despill, and no blue or purple cast.
   - No large flat pure white or HUD cream.
9. **Head pair registration.** head-b against head-a: antler tips, eyes and outline within 3% of
   the width; only the jaw and whiskers differ.
10. **Alpha.** Check on light and dark checkerboards:
    - no green halo and no holes;
    - wisps keep soft alpha;
    - the outer 4 px are transparent, except the soft piece ends that are meant to overlap.
11. **Head symmetry.** Mirror head-a; only small painterly differences.
12. **Size and files.** Runtime dimensions exactly as in 2.2; the running total is under 300 KiB.
13. **Status label.** Keyed masters are "Processed". They become "Engine-verified" only after
    in-game shots at 390x844 and 844x390.

---

## 8. Unknowns and assumptions

- A1: the meaning of "neck a little above, tail at the top" (section 0). Flagged for the owner.
- U1: the dragon's screen area. Where the head lands on 390x844 with `HEAD_AHEAD` 14 m and HOVER
  7 m, and whether the body (BODY_LEN 44 m) reaches the top of that area, has not been measured
  (no shots run). The first phase-1 shot must show the head at the bottom of the dragon area and
  at least 2 visible S-bends above it. If the body foreshortens too much, the alternative is to
  build the path in screen space and unproject it onto a plane, as `setCatch` already does. That
  would break T290b's world-space mist/route-safety reasoning, so it needs a design call.
- U2: the head aspect: square (recommended) or padded 3:1 (zero code). Owner-confirmable (2.5).
- U3: schnell's text-only quality on a top-down scaled serpent body is untested. Zipline-tole
  shows schnell handles flat views and isolated objects on plain backgrounds well; dorsal snake
  anatomy is new territory. `seg-claw` is the most likely to fail.
- U4: green spill on the subject from the green background prompt. Despill handles colour, not
  shape; if schnell paints green reflections into the clouds, switch the key to magenta (6).
- U5: the provenance of our sprite masters (the generated T290 sheet, supplied by the owner) is
  assumed fine to use as a collage source.

## 9. Next steps (who)

1. Owner: confirm A1 and U2 (square or padded 3:1).
2. Sonnet seat: run the first test (6); report pass/fail per seed with the previews.
3. Sonnet seat: the rest of 3.3, key + despill, manifest. QA (7) per image; premium only for the
   final head approval.
4. Sonnet implementer: the animation in 5.2-5.6 in `dragonSpriteView.ts` plus the `catchPose.ts`
   constants; shots at 390x844 and 844x390; decide on the merged body (5.7) from the call counts.
