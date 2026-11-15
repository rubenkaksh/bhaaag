# T290e spec: continuous ribbon dragon body + Flux ember art (implementation-ready)

Author: tech lead (design authority) seat, 2026-11-12. Status: spec only. No source edits, no gates
run, no images generated. Implementer: Sonnet, working from commit `fedbfe7` in
`.claude/worktrees/agent-aea5b1eba16abba5e` (branch `worktree-agent-aea5b1eba16abba5e`).

Mission check (PRODUCT.md read): Dragon Chase is an allowed mode. Stock `MeshBasicMaterial` and
`SpriteMaterial` only, no shaders, no GLB. `src/core` is untouched, so the 1-D catch rule cannot
change. The new set is about 100-130 KiB, under the owner's 300 KiB cap and smaller than today's
148 KiB. One flagged tension: the owner-chosen **golden** dorsal ridge sits close to the
"gold = interactive" colour (Principle 3). See R1. Nothing else conflicts.

Inputs read: `dragonSpriteView.ts`, `catchPose.ts`, `game.ts` (`tickCamera`, `renderChase`,
`onRender` dragon block), `tests/adapters/dragonSpriteView.test.ts`, `tests/adapters/catchPose.test.ts`,
`tools/shots-chase.mjs`, T290b spec, T290d brief, session 2026-11-12, `art/experiments/dragon-t290d/`
(assembly mock, processed head and tail, keyed `seg-a_s13`, `build.py`), and the asset skill.

---

## 0. Decisions in one place

| # | Decision |
|---|---|
| D1 | Body = **one** `Mesh` (`BufferGeometry` triangle strip, 2 vertices per cross-section) with a **tileable body-strip texture**. No body sprites, no seg-a/b/c, no seg-neck. |
| D2 | Body strip is **regenerated** with mflux text-to-image as a full-bleed scale swatch. The crops cannot be tiled (measured, section 1.2). |
| D3 | Neck = the first 30% of the ribbon (wider, scaled with the head loom), tucked under the head. No neck piece. |
| D4 | Tail = the existing processed `tail.png` (flame plume), trimmed, as one `Sprite`, pivot at the tube base, overlapping the ribbon end. |
| D5 | Head = `head-a` seed 13, **square**, re-centred on its content. `head-b` and the 2.6 s pose swap are removed (old-style art; head must stay stable). |
| D6 | "45 degrees" = the body lies in a world-fixed **board plane at 45 degrees to the view ray** (tilted ribbon, not a billboard). **No camera change.** Owner-confirmable (A1). |
| D7 | Mist: keep the T290b cards, cut to **2** (Medium/High) and **1** (Low), as a cloud collar around the neck. Same route-safe rule. |
| D8 | `catchPose.ts`: `HEAD_H_OVER_W = 1`, `FACE_FRAC = measured antler span (about 0.90)`. All other catch constants stay. All existing catchPose tests still pass (checked by hand in section 4). |
| D9 | `game.ts`: one added line (`dragonView.layout(gs.camera)`). Nothing else changes in game.ts. |

---

## 1. Asset plan

### 1.1 What ships

Runtime folder: `public/assets/dragon/v2/` (new). The loader reads only these three files.

| Runtime file | Source | Size (px) | Texture settings | Est. KiB (WebP q80) |
|---|---|---|---|---|
| `v2/head-a.webp` | `art/experiments/dragon-t290d/keyed/head-a_s13_kd.png` (re-centred, 1.3) | 512x512 | as today: sRGB, Linear, no mipmaps | 38-45 |
| `v2/body-strip.webp` | new mflux swatch (1.2) | 256x512, one tile | sRGB, `wrapS = ClampToEdgeWrapping`, `wrapT = RepeatWrapping`, `generateMipmaps = true`, `minFilter = LinearMipmapLinearFilter`, `magFilter = LinearFilter` | 35-60 (hard cap 80) |
| `v2/tail.webp` | `processed/tail.png` (trimmed, 1.4) | 256 x about 400 | as today: sRGB, Linear, no mipmaps | 22-26 |
| mist | `CanvasTexture`, built at runtime (unchanged) | 128x128 | unchanged | 0 |
| **Total** | | | | **about 95-130 (cap 300)** |

GPU memory: about 1.0 MiB head + 0.7 MiB strip (with mips) + 0.4 MiB tail. Today's set is about
2.4 MiB.

Not shipped: `seg-a/b/c` (blurry, kinked, alpha holes), `seg-neck` (off-style grey), old v1
`head-b`. The v1 files in `public/assets/dragon/` (`head-a`, `head-b`, `cloud-seg-a/b`,
`cloud-puff-d/e`, 148 KiB) are **no longer loaded**. Deleting them is an owner call after the
phone check. Do not delete them in this task. `dragonView.ts` (old 3D dragon) is not touched.

Export command for every runtime file (Pillow, no new dependency):

```bash
uv run --no-project --with pillow --with numpy python -I <script.py> ...
# inside: Image.save(out, 'WEBP', quality=80, method=6)
```

All scripts live in `art/experiments/dragon-t290e/` (new folder; never in `src/`). Raw and keyed
files in `art/experiments/dragon-t290d/` are never overwritten. Log every generation and every
processing step in `art/experiments/dragon-t290e/manifest.json` (id, prompt, seed, steps, size,
seconds, verdict), using the same schema as T290d.

### 1.2 Body strip: why the crops cannot be tiled, and the recipe

**Measured on `keyed/seg-{a,b,c}_s13_kd.png`** (704x1408). All three seeds are the same top-down
lizard:
- Body width runs from about 170 px (torso) down to 31 px (tail). Rows 380-830 carry legs.
- In-body alpha fill (alpha > 200) is only 0.48-0.99 per row. The key (olive background, tolerance
  60, softness 45) ate the dark scale crevices. That is the "blurry" look.
- The widest clean band (seg-c rows 200-330) is about 158 px wide and includes orange shoulder
  spikes.
- No band of constant width is longer than about 130 px. Upscaled to 256 px it is soft.

So the strip is **regenerated as a full-bleed swatch**: scales fill the whole image edge to edge,
with no background and no key. Alpha is added procedurally afterwards, which removes the holes for
good.

**Generation** (flags proven in T290d 3.1; run one at a time; about 1 min each at 0.5 MP):

```bash
caffeinate -i mflux-generate --model dhairyashil/FLUX.1-schnell-mflux-4bit --base-model schnell \
  --steps 4 --seed <S> --width 512 --height 1024 --vae-tiling --mlx-cache-limit-gb 8 \
  --output art/experiments/dragon-t290e/raw/strip_s<S>.png --prompt "<PROMPT>"
```

Seeds 61, 62, 63, 64. If none passes QA, use 65-68. Prompt (positive only):

> flat vector game texture, orthographic top-down view filling the entire image from edge to edge,
> tightly overlapping dragon scales in deep maroon and burnt sienna with bright ember-orange scale
> rims, one straight vertical spine ridge of golden diamond-shaped plates running exactly down the
> centre from the top edge to the bottom edge, scales mirror-symmetric on both sides of the spine,
> the same scale size everywhere, even flat lighting, clean cel shading, crisp edges, matching a
> flat ember vector dragon head illustration, no border, no background, no legs, no shading
> gradient

**Selection QA** (scripted, numbers printed to the manifest):
1. Spine detection: per row, the x of the centroid of "gold" pixels (R > 170, G > 120, B < 110,
   R > B + 60) within the central 40% of the width.
2. Pass if the spine is found in >= 95% of rows and its x stays within W/2 +- 6% of W.
3. Pass if no pixel column in the central 70% is background-like (row std of luminance < 4 over
   more than 64 consecutive rows means a flat, empty area: reject).
4. Of the passing seeds, pick by eye (closest to the head's palette). Record the verdict.

**Processing** (`art/experiments/dragon-t290e/strip.py`, input = the chosen raw):
1. **Straighten.** Per row, shift horizontally (edge-clamped, integer `np.roll` plus edge fill) so
   the spine centroid sits at x = W/2. Smooth the per-row shift with a 31-row box filter first, so
   the scales do not shear.
2. **Crop the width.** Keep the 256 px centred on the spine (columns 128-383 of 512).
3. **Find the period.** Autocorrelate the luminance of the central 24 px column band along y. Take
   the first peak between 24 and 160 px as `P` (spine plate period).
4. **Tile height.** `Ht = P * round(512 / P)`, clamped to 384-640.
5. **Seam.** Take a band of `Ht + O` rows starting at y0 = 128, where `O = max(P, 48)`. Build
   `tile[y] = band[y]` for `O <= y < Ht`. For `0 <= y < O`, use
   `tile[y] = (y/O) * band[y] + (1 - y/O) * band[y + Ht]` (linear crossfade on RGB). The content is
   periodic at P, so the blended rows line up.
6. **Resize** to 256x512 with Lanczos (only if Ht != 512).
7. **Alpha** (procedural, the same for every row, so the seam stays seamless): with
   `d = |x/255 - 0.5|`, `a = 1 - smoothstep(0.40, 0.49, d)`. The edges get a soft 9% fall-off; the
   scales carry the silhouette detail.
8. Save `processed/body-strip.png` (lossless) and `runtime/body-strip.webp` (q80), plus
   `preview/body-strip-tile3.png` (the tile stacked 3x vertically on a flat `#6a4060` dusk colour)
   for the owner.

**Seam QA** (scripted): the mean abs RGB difference between the last row and the first row must
be <= 1.5x the median of adjacent-row differences inside the tile. A fail means trying the next
peak multiple of P, then the next seed.

**Fallback** (only if all 8 seeds fail QA): use `keyed/seg-c_s13_kd.png` rows 200-330. Take the
RGB from `raw/seg-c_t2i_s13.png` (not the keyed alpha). Per row, find the body edges, resample
`[l, r]` to 256 px (unwarp), and then run steps 3-8. Report the fallback to the controller: it will
be softer.

### 1.3 Head (`head-a` seed 13, square, re-centred)

The processed `head-a.png` content bbox (alpha > 40) is x 82-429, y 34-404 on a 512 canvas.
The bottom 21% is empty, so the face sits above centre.
1. Source: `keyed/head-a_s13_kd.png` (the full-resolution master, not the 512 processed file).
2. Crop to its alpha > 8 bbox. Pad it to a square with side `S = max(w, h) + 2 * m`, where
   `m = 0.02 * max(w, h)`, centred.
3. Lanczos to 512x512 and save `processed/head-a-v2.png` and `runtime/head-a-v2.webp`, shipped as
   `v2/head-a.webp`.
4. **Measure** `FACE_FRAC = bboxW_alpha40 / 512` on the result (antler tip to antler tip; expected
   about 0.90). Measure `CONTENT_H = bboxH_alpha40 / 512` (expected about 0.96). Write both into
   the manifest and use `FACE_FRAC` in `catchPose.ts` (section 4).

### 1.4 Tail (plume)

1. Source: `processed/tail.png` (256x512; plume on top, tube at the bottom with the 22% bottom fade
   from `build.py`).
2. Trim the transparent rows below the last row with alpha > 8. Keep 256 px width. Save
   `processed/tail-v2.png`, then `v2/tail.webp`.
3. **Measure** `TAIL_TUBE_FRAC`: the width of the tube's opaque core (alpha > 200) at 25% height
   from the bottom, divided by 256 (expected about 0.27). Also measure `TAIL_ASPECT = H / W`.
   Record both.
4. Pivot: `Sprite.center = (0.5, 0)` (bottom centre = tube base). The faded base overlaps the
   ribbon end (section 2.6).

### 1.5 Asset status ladder

After this task: **processed + engine-ready**. It becomes **engine-verified** only after the shots
in section 6 and the phone preview pass.

---

## 2. Ribbon geometry and motion

### 2.1 Files

- **New:** `src/adapters/render/chase/dragonRibbon.ts`. Pure geometry with no materials and no
  textures. It imports `BufferGeometry`, `BufferAttribute`, `DynamicDrawUsage` from three and
  exports:
  - the constants below;
  - `RIBBON_SECTIONS_BY_TIER`;
  - `ribbonWidth(u, time)`;
  - `class DragonRibbon`: `geometry`, `sections`, `centres: Float32Array(3N)`,
    `widths: Float32Array(N)`, `layout(p: RibbonParams): void`, `dispose()`.
- **Changed:** `dragonSpriteView.ts`. It owns the `Mesh` (`MeshBasicMaterial`), the tail `Sprite`,
  the head `Sprite` and the mist cards.
- **Changed:** `game.ts` (one line, 2.9) and `catchPose.ts` (two constants, section 4).

### 2.2 Board plane (the 45-degree view)

World-fixed basis. The chase camera looks up the slope along +Z, close to level; that is the
nominal view ray.

```
BOARD_ELEV_DEG = 45
E  = BOARD_ELEV_DEG * PI/180
X  = (1, 0, 0)                 // lateral: the S-curve swings here
D  = (0, sin E, cos E)         // along-body: neck -> tail, away from and above the camera
N  = (0, -cos E, sin E)        // board normal = cross(X, D): vertical slither goes here
```

Precompute D and N as numbers in module scope (`D_Y, D_Z, N_Y, N_Z`).

### 2.3 Centreline (per section i = 0..N-1, u = i/(N-1))

Scalars stored by `update()` (2.8): `headX, headY, headZ, s` (head loom scale), `lagX, lagY`,
`time`.

```
RIBBON_LEN   = 28      // m along D (tune 22-32 only to keep the tail in frame, 6.2)
SOCKET_UP    = 0.18    // root height above the head centre, x head world size
SOCKET_BACK  = 0.6     // m behind the head (+Z) so the head sprite covers the root
WAVE_K       = 1.25    // wavelengths over the body (T290d 5.2)
WAVE_W       = 1.4     // rad/s, unchanged
A_NECK       = 3.0     // m lateral amplitude at u = 0 (before the ramp)
A_TAIL       = 6.0     // m lateral amplitude at u = 1
S_RAMP_U     = 0.12    // the S starts within the first 12% (neck leaves the head straight)
V_AMP        = 2.0     // m along N (was 4.5 vertical; see 2.7)
V_PHASE      = PI/2    // unchanged

rootX = headX
rootY = headY + SOCKET_UP * HEAD_SCALE * s
rootZ = headZ + SOCKET_BACK

along = RIBBON_LEN * u
ph    = 2*PI*WAVE_K*u - WAVE_W*time
ramp  = smoothstep01(u / S_RAMP_U)          // existing smooth01
lat   = (A_NECK + (A_TAIL - A_NECK)*u) * ramp * sin(ph)
nrm   = V_AMP * u * ramp * sin(ph + V_PHASE)
f     = smooth01(u)                          // head-follow lag blend
bx    = rootX + (lagX - rootX) * f
by    = rootY + (lagY - rootY) * f

C_i = ( bx + lat,
        by + along*D_Y + nrm*N_Y,
        rootZ + along*D_Z + nrm*N_Z )
```

Section 0 is exactly the socket. With `ramp(0) = 0` and the slope of `ramp` being 0 at u = 0,
the neck leaves the head along D (straight up the screen), then bends into the S at once.

### 2.4 Width taper

```
W_NECK    = 0.40 * HEAD_SCALE    // 4.0 m at HEAD_SCALE 10
W_TAIL    = 1.3                  // m, must equal TAIL_TUBE_FRAC * TAIL_W (2.6)
SHOULDER  = 0.10
w(u)      = (W_NECK + (W_TAIL - W_NECK) * u^1.3) * (1 + SHOULDER * sin(PI * clamp01(u/0.35)))
breath    = 1 + 0.03 * sin(2*PI*0.8*time - 3*u)       // travels up the body
loom(u)   = 1 + (s - 1) * (1 - smooth01(u / 0.3))     // neck grows with the head loom
width_i   = w(u) * breath * loom(u)
```

### 2.5 Vertices, UVs, indices (all in place)

Built once per tier in the constructor:
- `position`: `Float32Array(2N*3)`, `setUsage(DynamicDrawUsage)`.
- `uv`: `Float32Array(2N*2)`, `DynamicDrawUsage`. `u` is written once: left 0, right 1.
- `index`: `Uint16Array(6(N-1))`, static. The quads are written **from the tail to the head**
  (quad `N-2` first, quad 0 last). With `depthWrite: false`, the nearer neck then paints over the
  farther body wherever the S overlaps itself on screen.
- `centres: Float32Array(3N)` and `widths: Float32Array(N)` as scratch.

`layout(p)` per frame, with no `new`, no array literals and no closures:
1. Fill `centres` and `widths` (2.3, 2.4).
2. For each i, tangent `T = C[i+1] - C[i-1]` (one-sided at the ends), normalised in scalars.
3. Width direction `Wd = normalize(cross(N, T))`, in scalars. `N` is constant. `T` never becomes
   parallel to N because `along` grows monotonically and the lateral slope stays <= 2.2 (2.10).
4. Vertex `2i = C - Wd * width/2` (uv u = 0), vertex `2i+1 = C + Wd * width/2` (uv u = 1).
5. **V coordinate (stationary, aspect-true):** `v_0 = 0`.
   `v_i = v_{i-1} + |C_i - C_{i-1}| / (TILE_LEN_PER_W * 0.5*(width_i + width_{i-1}))`, with
   `TILE_LEN_PER_W = 2` (the tile is 256x512). Scales therefore keep their aspect and shrink toward
   the tail like a real snake. There is **no time scroll**: a scroll reads as a treadmill. The tiny
   v creep from arc-length changes reads as muscle motion.
6. `position.needsUpdate = true; uv.needsUpdate = true`. Do not call `computeBoundingSphere`. The
   mesh sets `frustumCulled = false`.

### 2.6 Tail sprite

```
TAIL_W         = W_TAIL / TAIL_TUBE_FRAC         // about 4.8 m
TAIL_H         = TAIL_W * TAIL_ASPECT
TAIL_OVERLAP_F = 0.30                            // share of TAIL_H that overlaps the ribbon end
WHIP_A         = 0.30                            // rad
```

- Position: `C_{N-1} - T_{N-1} * (TAIL_OVERLAP_F * TAIL_H)` (the tube base sits over the last
  ribbon metre, and its baked fade hides the join).
- Scale: `(TAIL_W, TAIL_H)`, constant (no loom).
- Rotation (screen tangent): project `C_{N-3}` and `C_{N-1}` into two scratch `Vector3`s with
  `.project(camera)`. Then `rot = atan2(dy, dx * camera.aspect) - PI/2`, plus
  `WHIP_A * sin(phTail - PI/3)`, where `phTail = 2*PI*WAVE_K - WAVE_W*time`. The art is tail-up, so
  a tangent pointing up the screen means rotation 0.
- The tail is a billboard and the ribbon is tilted. Where the ribbon end is foreshortened, its
  width is up to 29% narrower than the tube base; the plume and the fade cover it (R3).

### 2.7 What the 45-degree board changes vs T290b

| T290b (billboards, about 90 degrees) | T290e (board at 45 degrees) |
|---|---|
| Body ran along +Z with `hillY(segZ) + HOVER + BODY_LIFT...` | Body runs along D. Height comes from the 45-degree rise, so `BODY_LIFT`, `LIFT_U` and the per-segment `hillY` lookups go away. The head keeps its `hillY` maths. |
| Lateral `WAVE_AMP * u^2` | Lateral along X (perpendicular to the view, full width on screen). Amplitude is linear in u, with a neck ramp (2.3). |
| Vertical `V_AMP 4.5 * u^2` in world Y | Along N (out of the board). On screen it shows as about 0.7 of its size, plus a depth ripple, so `V_AMP` is 2.0. |
| Segment sprites rotated by `atan2(...) * 0.5` | No rotation: the ribbon is real geometry, and its width direction is `cross(N, T)`. Only the tail sprite takes the screen tangent. |
| On-screen length about L * 1 (foreshortened by the near-level view along +Z) | On-screen length about L * sin 45 = 0.71L plus perspective, which is why `RIBBON_LEN` is 28 (was 44). |

### 2.8 `DragonSpriteView` per frame

`update(dragonZ, time, lunge, heroX, gap, camZ, pin)` keeps its **signature** (tests and game.ts
call it). It now:
- computes `prox`, `headX`, `headY`, `headZ` exactly as today, and sets the head position and scale
  (square: `HEAD_SCALE * s` on both axes, `s = 1 + prox*0.6 + lunge*0.25`);
- removes the head pose swap (`HEAD_SWAP_S`, `headIndex`, `lastHeadSwap`, `headTextures[1]`);
- updates the lag:
  `dt = clamp(time - lastTime, 0, 0.1)`, `a = 1 - exp(-dt / LAG_S)` with `LAG_S = 0.6`,
  `lagX += (rootX - lagX) * a`, `lagY += (rootY - lagY) * a`. Snap on the first call
  (`lastTime < 0`) and after `build()`;
- stores `time, s, heroZ = dragonZ - gap, camZ, lunge, prox` in fields for `layout`.

**New** `layout(camera: PerspectiveCamera): void`. It calls `ribbon.layout(...)`, places the tail
(2.6) and places the mist (2.11). Its early-out is `!this.built`.

Render order: mist 0, ribbon 1, tail 2, head 3 (`HEAD_ORDER = 3`; `setCatch` restores to
`HEAD_ORDER`, not the literal 2). The head keeps `fog: false, toneMapped: false`.

Ribbon material:
`new MeshBasicMaterial({ map: strip, transparent: true, depthWrite: false, side: DoubleSide, toneMapped: false })`.
Fog stays on (the body recedes into the cloud cover; the head stays readable).
`castShadow = receiveShadow = false`. If the strip fails to load, use `map: null` and
`color: 0x7a2a18` (the dragon still has a body), and warn once.

Tail material: `SpriteMaterial({ map: tail, transparent: true, depthWrite: false, toneMapped: false })`.
If the tail fails to load, skip the tail sprite.

### 2.9 game.ts change (the only one)

In `onRender`, inside `if (dragonView !== null) {` (line ~923, after `gs.camera.lookAt` and the fov
update, so the camera pose is final), add as the first statement:

```ts
dragonView.layout(gs.camera);
```

`renderChase`'s `dragonView.update(...)` call is unchanged. `tickCamera`, the rig, the pitch and
the fov are all unchanged.

### 2.10 Fold and twist limits (why these constants)

Lateral curvature peaks at `A * w^2` with `w = 2*PI*WAVE_K / RIBBON_LEN = 0.280`:
- at the tail: `6 * 0.0787 = 0.47`, so R = 2.1 m vs half-width 0.65 m;
- at the shoulder (u 0.35): R = 3.1 m vs half-width 1.8 m.

The maximum lateral slope is `A_TAIL * w = 1.7` (2.2 with the ramp), so the curve never doubles
back. The test in 5.2 enforces `halfWidth <= 0.9 R` over 10 s of motion. If a tuning change breaks
it, lower `A_TAIL` first.

### 2.11 Mist cards (kept, reduced)

They are still useful: the board rises fast, so the body is in open sky after about 6 m. A cloud
collar where the neck meets the head grounds the creature in the cloud cover and hides the root.
Cards at u = 0.05 and u = 0.20 (Low: only 0.05):
- position: `C(u)` minus `(0, MIST_DROP * width(u), MIST_PULL)`;
- size: `min(MIST_MAX_W, MIST_SCALE * width(u))`;
- opacity: the T290b formula unchanged (`routeK`, `lensK`, `dipK` from `sin(ph + V_PHASE)`) times
  the body fade.

`ROUTE_CLEAR`, `ROUTE_FADE`, `LENS_*` and `MIST_*` keep their values. `hasMist` is replaced by the
fixed u list.

### 2.12 Route safety (no new data needed)

Every ribbon point has `z >= rootZ - V_AMP * |N_Z| = headZ + 0.6 - 1.41 > dragonZ - 1`. While
playing, `gap >= catchGap = 2.5`, so the whole body is uphill of the hero and depth-tested. It
cannot cover anything between the hero and the camera, which includes the next on-route anchor and
its pad. The mist keeps T290b's `routeK` fade. Test 5.2 asserts the z bound.

---

## 3. Draw-call and triangle budget

| Tier | Head | Ribbon | Tail | Mist (max) | Dragon calls | T290b | Change |
|---|---|---|---|---|---|---|---|
| Low | 1 | 1 | 1 | 1 | **4** | 8 | -4 |
| Medium | 1 | 1 | 1 | 2 | **5** | 16 | -11 |
| High | 1 | 1 | 1 | 2 | **5** | 19 | -14 |

- **High:** T290b measured 84 against a gate of 80 (Classic High + 6). This design gives about
  84 - 19 + 5 = **70**. The shadow pass gets no new casters.
- **Medium:** the gate is Classic + 6 (the owner's "about +9" is looser), and T290b already passed
  with 16 dragon calls, so 5 passes with room to spare.

Triangles: the ribbon has 2(N-1). With N = 24 / 40 / 56 (Low / Medium / High), that is 46 / 78 /
110, plus 2 per sprite. The +12k tri gate is not affected.

`RIBBON_SECTIONS_BY_TIER = { low: 24, medium: 40, high: 56 }`.

---

## 4. Head and catchPose changes

`catchPose.ts`:
- `export const HEAD_H_OVER_W = 1;` with the comment "square v2 head (512x512, re-centred)".
- `export const FACE_FRAC = <measured, about 0.90>;` with the comment "share of the head sprite's
  width the catch framing must fit: antler tip to antler tip on head-a v2 (manifest)". The meaning
  moves from "face with mane" to "whole head span", so the >= 80% fill and the "antlers inside"
  checks become the same test.
- Update the design comment block (point 4 "Budgets" and the 915x306 mentions) in 2-3 lines. No
  other constant changes.

Hand check with FACE_FRAC 0.90 (all existing tests pass):

| Case | Value | Limit |
|---|---|---|
| Portrait fill: h | 0.472 | |
| Portrait fill: span | 0.92 | >= 0.8 |
| Portrait fill: top | 0.296 | <= 0.5 |
| Landscape / square fill: h | 0.96 | |
| Landscape / square fill: span x a | 0.864 | >= 0.8 |
| Top dock | h 0.36, gap 0.03, bottom 0.11 | bottom >= 0.04 |
| Side dock at a 2.16: right edge | 0.42 | < 0.46 |
| Side dock at a 1.21: right edge | 0.44 | < 0.46 |

Any FACE_FRAC in 0.84-0.95 passes.

`dragonSpriteView.ts` head:
- `HEAD_SCALE = 10` (square sprite, world metres). The antler span is 9 m and the face plus mane is
  about 6 m, close to today's 5.8 m face.
- Replace both `HEAD_SCALE * (306 / 915)` uses with `HEAD_SCALE * s` (square).
- `setCatch` already uses `h / HEAD_H_OVER_W` and works unchanged.
- In `setCatch`, the body fade (`bodyOp`) now multiplies the ribbon material opacity, the tail
  opacity and the mist opacity. It sets `visible = opacity > 0.01` on each. The pose lock now uses
  `headTextures[0]` only.

Keep everything else about the head: hover, bob `sin(0.9t) * 1.2`, sway, proximity loom, lunge dip,
`headScreen`, `ndcOnPlane`.

---

## 5. Tests

### 5.1 `tests/adapters/dragonSpriteView.test.ts` (update)

- The loader mock is unchanged. There are now 3 jobs: `v2/head-a`, `v2/body-strip`, `v2/tail`.
- **Keep** "re-applies beat material state after a tier rebuild mid-catch". Add one line: call
  `v.layout(c)` before each `setCatch`.
- **Replace** "a failed segment load..." with "a failed body-strip load still builds, warns once,
  and the ribbon falls back to a plain colour" (`fail: 'body-strip'`). Expect: warn called once,
  `built` true, the ribbon material `map` is null, and `layout(cam())` does not throw.
- **Keep** "a missing head-a skips the head..." (path match `head-a`).
- **Keep** "load callbacks after dispose..." (it iterates `jobs`; it works with 3).
- **Add** "a missing tail builds without a tail sprite and layout does not throw".
- **Add** "the ribbon is one mesh, and the dragon adds at most 5 renderable children on high"
  (count `group.children` that are `Mesh` or `Sprite`: 5 on high/medium, 4 on low, with mist in
  the node env: `mistTexture()` returns null there, so assert `<=`).

### 5.2 `tests/adapters/dragonRibbon.test.ts` (new, pure geometry)

Helper: build `new DragonRibbon(tier)` and call `layout` with fixed params
(`headX 0, headY hillY(40)+7, headZ 40, s 1, lagX 0, lagY = rootY, time t`).

1. **Counts:**
   - position count = 2N for N in {24, 40, 56};
   - index count = 6(N-1);
   - triangles <= 110.
2. **No allocation:**
   - after 200 `layout` calls at varied t, `geometry.attributes.position.array`, `uv.array`,
     `index.array`, `centres` and `widths` are the same object identities as before;
   - `position.version` increased by 200;
   - a `vi.spyOn(Vector3.prototype, 'clone')` spy and a `vi.spyOn(Float32Array, 'from')` spy are
     both never called.
3. **Root at the socket:**
   - section 0 centre equals `(rootX, rootY, rootZ)` within 1e-6;
   - the tangent at section 1 is within 15 degrees of D.
4. **UV continuity:**
   - u is 0 on even vertices and 1 on odd ones;
   - `v_0 = 0`, v strictly increasing, every step in (0, 0.6];
   - at t and t + 1/60, every v changes by < 0.05 (no popping).
5. **No fold, no twist** (t = 0..10 s, step 0.05):
   - consecutive width directions have a dot product > 0.5;
   - for each interior section, `width/2 <= 0.9 * R`, with R the circumradius of the 3 consecutive
     centres (skip when collinear);
   - the left-to-right vector never reverses relative to X.
6. **Route safety and clearance:**
   - for gap in {36, 22, 2.5} (`heroZ = headZ - gap`), every centre has `z >= headZ - 1` and
     `z > heroZ`;
   - every centre has `y >= hillY(z) + 2`.
7. **Taper:** `widths[0] / widths[N-1]` is in [2.5, 3.6] at s = 1, and `widths[0]` grows with s.

### 5.3 `tests/adapters/catchPose.test.ts` (update)

The existing tests stay as they are and must pass with the new constants. Add:
- "v2 head is square": `HEAD_H_OVER_W === 1`;
- "FACE_FRAC is the measured antler span": a value in [0.84, 0.95];
- "fill frame keeps the whole head inside the width" for every aspect:
  `faceW(a, p.h) <= 1.0` at settle 0, which is the antlers-inside check.

---

## 6. Acceptance checklist

The controller runs the gates. The implementer reports exact output.

### 6.1 Gates
- `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm build` all green.
- The new tests in 5.2 are present and passing.

### 6.2 Shots
Command: `pnpm build && node tools/shots-chase.mjs t291` → `art/shots/auto/t291-*.png`.
- Exit code 0: no console errors and no `OVER BUDGET` line.
- Record the printed `calls` and `triangles` for `classic-spawn`, `classic-spawn-high`, `pan-dragon`,
  `pan-dragon-high` and `play-landscape` in the session file. High dragon shots must be <= Classic
  High + 6; the expected total is about 70.

Visual checks, by shot:

| Shot | Must show |
|---|---|
| `pan-dragon`, `pan-dragon-high`, `play-landscape`, `play-portrait` | Head at the bottom of the dragon area. The neck rises from behind the head's mane. One continuous scaled body winds up in an S to the flame plume at the top. No beads, kinks or seams (also check the tile repeats). No grey piece. No green or olive halo. The tail plume is inside the frame at start gap (if not, lower `RIBBON_LEN` toward 22 and reshoot). |
| `cloud-creep` | Mist only around the neck, not over the hero or the next anchor. The anchor pulse is visible. |
| `game-over`, `game-over-portrait` | Body faded. The face is not washed out (bloom is off during the beat). |
| `catch-*` (`game-over-face*`) | At fill: both eyes, both antlers and the open mouth are inside the viewport, and the head spans >= 80% of the shorter side. At the card frame: the face is fully visible beside or above the card, and every card line is readable. |

### 6.3 Phone preview (owner)
- Run `pnpm build && pnpm exec vite preview --host --port 4174` in the worktree. Stop the old :4174
  server first. The owner opens `http://<mac-lan-ip>:4174` in portrait and landscape, with
  `?gfx=low` and the default tier.
- Checks:
  - the S slithers smoothly (bends travel toward the tail);
  - the head is stable (bob plus loom only, no texture flicker);
  - the body reads as a dragon seen from about 45 degrees (A1);
  - no frame hitch on a run of at least 60 s.

### 6.4 Assets
- `art/experiments/dragon-t290e/manifest.json` lists every kept and rejected file.
- `public/assets/dragon/v2/` total <= 300 KiB (expected about 130). Run
  `rtk ls public/assets/dragon/v2` and paste the output.

---

## 7. Assumptions, risks, conflicts

### Owner-confirmable assumptions
- **A1 (45 degrees).** Read as: the body lies in a plane at 45 degrees to the line of sight, like
  looking at a Snake board tilted back, instead of today's face-on cards (about 90 degrees).
  - Effects: the S swings at full width; the along-body axis is foreshortened by about 0.71; scales
    and width are foreshortened at the bends; the body rises into the sky.
  - Not chosen: re-pitching the chase camera about 45 degrees down. The reversed rig looks up the
    slope at a dragon that is above and behind the hero, so a downward camera would lose the
    dragon and the route framing.
  - If the owner meant the camera: that is a separate change in `tickCamera`
    (`cur.camPitch + 0.14`) plus framing work, and it is out of scope here.
  - One constant tunes the reading: `BOARD_ELEV_DEG` (30 = flatter and more top-down-looking,
    60 = more upright).
- **A2.** Square head, re-centred, with `head-b` dropped (no roar pose; the stable head was asked
  for). A matching head-b would be a later card: img2img at 0.3 from head-a v2, per T290d 3.3
  step 4.
- **A3.** The body strip is **new generated art** (crops measured untileable). The owner should
  glance at `preview/body-strip-tile3.png` before the shots. If the style drifts from the mock,
  pick another seed; do not ship.

### Risks
- **R1 (colour language).** The gold spine ridge is close to the interactive gold `#ffc83a`.
  - Mitigation if the owner or a review flags it: in strip step 8, pull spine pixels toward amber
    (`G *= 0.85` where the gold test in 1.2 matches) and regenerate the WebP.
  - No code change is needed. Owner decides; the default is to ship as generated.
- **R2.** Schnell may not give a straight, centred, full-bleed swatch.
  - The straighten step and QA cover mild drift. 8 seeds plus the fallback crop bound the effort to
    about 15 minutes of generation.
- **R3 (tail join).** A billboard tail on a tilted ribbon gives up to a 29% width mismatch at
  lateral tangents. The overlap and the baked fade hide most of it.
  - If it shows in shots: raise `TAIL_OVERLAP_F` to 0.4 first, then set `W_TAIL` to the projected
    width.
- **R4 (framing at close gap).** As the gap closes, the head looms and the tail may leave the top of
  the frame. That is accepted as part of the loom. At start gap the plume must be in frame (6.2).
- **R5 (one-frame order).** `update()` runs before the camera pose is final; `layout()` runs after.
  Only the tail's screen angle and the mist `lensK` read the camera, and both are in `layout`, so
  there is no lag.
- **R6 (fog).** The ribbon takes scene fog and the head does not, as today. Under heavy cloud cover
  the body fades before the head, which is intended.

### Gameplay
- No conflict. `src/core` is untouched, the catch rule stays 1-D, and `dragonZ` and `gap` are read
  only.
- The body can never sit between the hero and the camera (2.12). The mist keeps its route fade.
- Classic mode is untouched: `dragonView` is null outside Chase.

### Out of scope
- Deleting the v1 dragon files.
- `dragonView.ts` retirement.
- `head-b` v2.
- Aiming in the reversed camera.
- T297.
