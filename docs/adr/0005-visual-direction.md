# ADR 0005: Visual direction (sunset Kathmandu, reference-led HUD)

Status: Proposed 2026-11-06. Three decisions need the user's OK before build (marked **[USER]**): D2 terrace colliders, D3 colour-language amendment, D7 button mapping.
Reference: `docs/reference/ui-reference.webp`. Amends ADR 0004 (colours, head, sash, hang row). Bound by `docs/lean-scope.md`: stock three.js materials, primitives only, no image or model files, no network, small bundle, phones first.

The reference is a painted key-art frame. We copy its composition, palette, HUD layout and set dressing. We do not copy its rendering. Gameplay logic (`src/core/*`, tuning) does not change. The only content change is D2, and the existing tests gate it.

---

## D1. Composition: a lane through a city

The reference reads as "a rope over a canyon of houses". In-game, the walkable route is 7 flat roofs (9x9 m, alternating x = ±5, 26 m apart in z, 9.5 m drops) hanging over an 80 m void. We turn that void into a hillside city with a **reserved lane** down the middle.

- **Lane (keep-out volume)**: |x| < 16 m, z from `goal.min.z - 8` to `spawnRoof.max.z + 8` (l1: -206 to +12). Inside the lane, decor may rise only to `terraceTop + 3 m` for buildings and steps, `+6 m` for trees and `+8 m` for flag strings. That keeps everything at least 11 m below the hero's feet on the rope and at least 14 m below any walkable top. The 16 m half-width is 9.5 (roof edge) + 4.5 (camera distance) + 0.6 (shoulder) + 1.4 margin. The camera probe only sees colliders, so the lane is also the camera's safe space.
- **Lane walls**: decor houses stand at |x| ≥ 16 with eaves near walkable-roof height, so the route reads as a canyon, like the reference.
- **Readability rule**: inside |x| < 35 m every decor house has a **pitched tile roof**. Flat roofs mean "walkable" in this game, and the only flat, cream-padded roofs near the lane are the route. Flat decor roofs with water tanks and railings appear only at |x| ≥ 35.
- **Walkable houses** (collider boxes) get dressing that never sits above `top - 0.3 m`, sticks out at most 0.12 m from a collider face, and adds no parapet, railing, tank or overhang on or past the top face. Their tops stay exactly where the collider is.

## D2. Hill terraces become colliders [USER]

Problem: with a visual-only hill, every missed hop drops the hero through a painted street and 60-80 m on through the inside of the terrain before the kill plane. The camera follows him under the ground. Failure is the core loop, so this frame is shown constantly.

Decision: `tools/genLevel.mjs` **appends** terrace solids (style 0) **after** all existing solids, so the indices that `level.test.ts` uses (`solids[1]`, `solids[2 + 2*hop]`) do not change. Then regenerate `content/levels/l1.json`.

```
TERRACE_DROP = 20            // m below the walkable roof above it
for i in 0..7 (i = 0 is the spawn roof, cz_i = -26 i, top_i = -9.5 i):
  box(x -30..30, z cz_i-13 .. cz_i+13 (i = 0: up to +30), y top_i-24 .. top_i-20)
goal terrace: box(x -30..30, z goal.min.z-20 .. cz_7-13, y top_7-24 .. top_7-20)
```

Lethality check (`vyRoll` 13 m/s, so any drop over 8.6 m from rest is fatal):
- walkable roof to terrace: 20 m
- clinging on a decoy wall (feet about `top - 7`) to terrace: 13 m
- goal: the haystack box is not a collider, and entering it wins first. A visual-only "goal house" fills the space under the goal footprint down to the terrace.

Net gameplay effect: a miss ends 1-2 s sooner, with a hard-landing death instead of a fall death. No new survivable surface exists.

Gate: new `tests/content/terrace.test.ts` asserts that every stand or hang point overlapping a terrace in x/z is at least 12 m above it. `level.test.ts`, `humanlike.test.ts` and `goal.test.ts` stay green and unchanged.

If D2 is rejected, decor still builds the same visual hill (same constants) and falls keep going through it. Ship it that way only knowingly.

## D3. Colour language and palette [USER]

Lean scope reserves gold for interactive, cream-white for safe and terracotta for danger. The reference has terracotta roofs everywhere and a cream-topped hero. Resolution:

- City tiles and bricks are **dark, low-saturation brown-reds** and get fogged. Danger walls are **hot, saturated terracotta** with a slight self-glow. Value and saturation separate them, not hue alone.
- Whitewash is **warmer and darker** than pad cream. Pads stay the brightest near-white horizontal surface in the lane.
- The hero uses **oat**, not cream-white, and **crimson**, not terracotta. The hero is never a surface, and the dark trousers and hair carry the silhouette. This amends ADR 0004's "never gold, cream or terracotta" rule.

| Role | Hex | Notes |
|---|---|---|
| anchor (interactive) | `#ffc83a` | unchanged, fog off |
| pad (safe) | `#f1e9d2` | unchanged |
| danger wall | `#c4472a` | was `#b4583f`; Lambert emissive same colour × 0.2 |
| walkable roof rim / top | `#b9a68c` | was grey `#8d8a86` |
| goal (haystack) | `#efe2b4` | unchanged |
| brick (3 tints) | `#9c5640` `#8c4a38` `#a8634a` | per-instance ±5 % value jitter |
| whitewash (3 tints) | `#d9c6aa` `#cfb99a` `#e0cfb4` | never brighter than `#e4d4ba` |
| dark wood (windows, cornices, rails) | `#4a2c1c` `#5a3622` | |
| roof tile (3 tints) | `#8a4532` `#7c3e2e` `#96503a` | flatShading so the facets catch light |
| flat roof concrete | `#a99a88` | only at \|x\| ≥ 35 |
| water tank | `#26282c` black, `#2e6b47` green | stand `#6b6058` |
| tree canopy | `#5d7a3a` `#6f8a3f` `#4f6b34` | trunk `#4a3424` |
| prayer flags | `#2f62b8` `#f2efe4` `#c8322f` `#2f8a4f` `#d0a12e` | blue, white, red, green, yellow in that order; the yellow is mustard, not anchor gold |
| terrace paving / retaining wall | `#8e7a66` / `#7d4a3a` | |
| far city (pre-fogged) | lime `#cdb59a`, brick `#a87a62` | colours already 40 % toward the fog colour |
| brass finial (pagodas) | `#9a7a3a` | not gold |

## D4. Sky, sun, haze, mountains (`scene.ts` plus new `skyView.ts`)

- **Haze constant** `HAZE = '#eaa978'`. Fog colour = HAZE, near 45, far 260 (now 70/340; the reference is hazier). The sky's horizon band equals HAZE, so far houses melt into it.
- **Sky dome** (existing 32x16 sphere, vertex colours, follows the camera). Stops by normalised height h:
  - below the horizon: `#e6a77a`
  - h = 0: HAZE
  - 0.10: `#f2a050`
  - 0.30: `#d77a45`
  - ≥ 0.60: `#9c5a4c`
  - Sun-side boost, computed once: `c = lerp(c, #ffd890, 0.5 * max(0, dot(dir, SUN_DIR))^4)`
- **Visible sun** is decoupled from the key light, on purpose. The key light stays at (70, 38, -15), 78° off the descent axis, so roofs and pads stay lit (ADR 0001). Lit that way, the sun would sit outside the frame, so the disc is placed where the reference has it:
  - `SUN_DIR = normalize(0.528, 0.087, -0.845)`: 32° right of -Z, 5° up
  - core: `CircleGeometry(9, 24)` `#fff1c4`
  - glow: `CircleGeometry(83, 32)` with vertex alpha (centre `#ffb24a` at 0.6, rim 0), additive
  - both at `camera + SUN_DIR * 470`, facing `-SUN_DIR`, inside the sky group (no per-frame rotation needed), `fog: false`, `depthWrite: false`
- **Clouds**: 7 flat ellipse cards (`CircleGeometry(1, 16)` scaled 60-140 × 8-14 m) at distance 440, 4-14° elevation, azimuth -40° to +60°. Vertex colours: top `#f7b98a`, underside `#ffd9a0`, alpha 0.85. Merged into one mesh in the sky group.
- **Mountains**: 3 ridge strips, **fixed in world space** (parallax over the 200 m descent), merged into one mesh, vertex colours, `fog: false`:
  - centre (0, ·, -110); 160 segments around 360°
  - height `y = base + H(0.55 + 0.45 * ridge(θ))`, where `ridge` is the sum of `a_k sin(f_k θ + φ_k)` with f = 3, 7, 13, 29, a = 0.5, 0.25, 0.15, 0.1 and phases from the seeded RNG
  - near layer: radius 360, base -110, peaks +30 to +70, `#9a5f58`
  - mid layer: radius 420, peaks +60 to +110, `#b4766a`
  - far layer: radius 480, peaks +100 to +150, `#cf9a82`
  - each strip's bottom edge drops to y -200 so no gap shows
- **Lights**: key `#ffb469` at 3.0, same position. Hemisphere sky `#ffc99c`, ground `#5b4656`, intensity 1.0. No shadow maps. No tone mapping (keeps hex colours true to the language).
- **Pixel ratio**: `min(devicePixelRatio, coarsePointer ? 1.5 : 2)`.

## D5. City kit and placement (new `src/adapters/render/decor/{kit,placeDecor}.ts`, called from `levelView.ts`)

**Kit.** One `InstancedMesh` per piece, so every piece costs one draw call.
- All pieces use `MeshLambertMaterial({ color: '#ffffff', vertexColors: true, flatShading: true })`, with colour set by `setColorAt`.
- Box pieces carry a baked vertical vertex-colour gradient (bottom 0.72, top 1.0) as fake ambient occlusion.
- Unit geometry is scaled per instance.

| Piece | Geometry | Tris | Max instances | Tris max |
|---|---|---|---|---|
| body (storey block, brick or lime by instance colour; also terrace steps, far city, goal house) | Box 1x1x1, origin bottom-centre | 12 | 1,400 | 16.8k |
| cornice band (floor line, dark wood) | Box | 12 | 500 | 6.0k |
| window (dark wood frame, 0.9 × 1.3 × 0.12 m, 0.12 m proud) | Box | 12 | 1,200 | 14.4k |
| hip roof (overhang 0.5 m; also pagoda tiers) | `Cylinder(0.35, 0.72, 0.4, 4, 1)` rotated π/4 | 16 | 600 | 9.6k |
| balcony rail unit (2.4 m: 2 rails + 5 balusters, merged) | 7 boxes | 84 | 90 | 7.6k |
| balcony deck | Box | 12 | 90 | 1.1k |
| water tank | `Cylinder(0.5, 0.5, 1.1, 8)` | 32 | 80 | 2.6k |
| tank stand / roof parapet | Box | 12 | 240 | 2.9k |
| tree canopy | `Icosahedron(1, 0)` | 20 | 260 | 5.2k |
| tree trunk | `Cylinder(0.15, 0.2, 1, 5, 1, true)` | 10 | 130 | 1.3k |
| prayer flag (double-sided quad 0.35 × 0.25) | Plane | 2 | 400 | 0.8k |
| flag strings | one merged `LineSegments` | 0 | - | - |
| **Decor total** | | | | **≤ 68k** (cap 80k) |

**Placement.** Pure function `buildDecor(world: World, seed = 1729): Group`, deterministic with mulberry32 (no `Math.random`, no time).
- **Ground**: `hillY(z)` is the terrace top under z. It is piecewise per D2, with `top_i - 20` for |z - cz_i| ≤ 13, and it uses the same constants whether or not D2 ships. Visual terraces cover |x| ≤ 30. A sloped far-ground plane (`y = 0.365 z - 20`) covers 30 < |x| ≤ 200, colour `#9a8068`.
- **Near lots**, for both sides s = ±1:
  - 5 columns starting at |x| = 16, widths 7-10 m, gaps 0-1.5 m
  - rows along z, depths 8-11 m, from z = +24 to `goal.min.z - 20`
  - about 240 houses
- **Storeys**: 3.0 m each.
  - Column 0: `n = round((20 + U(-4, +2)) / 3)`, which puts eaves near walkable height.
  - Columns 1-4: `n ∈ [3, 6]`.
  - Base: 1-2 brick storeys, or all brick on 25 % of houses.
  - Cornice at every brick-to-lime change and under the roof.
- **Roofs**: hip roof everywhere inside |x| < 35. Beyond that, 60 % flat (parapet from 4 thin bodies, a water tank on half of them) and 40 % hip.
- **Windows** go only on the faces the camera sees:
  - lane-facing face: `floor(width / 2.4)` per storey above the base
  - +z face: 2 per storey, columns 0-1 only
  - columns 2-4: 2 per house in total
- **Balconies**: column 0, 50 % of houses, on the storey `n - 2` of the lane face, 60 % of the face width.
- **Trees**: inside the lane on terraces (height ≤ 6 m, 1-2 canopies), and in lot gaps over 0.8 m (30 %).
- **Prayer flags**: about 20 strings between roof corners of neighbouring column-0 houses, parallel to the lane. 12 flags per string, sag 8 % of chord, colours cycle. Both endpoints have |x| ≥ 16, and no string crosses the lane above `terraceTop + 8`. No flag within 4 m of an anchor.
- **Landmarks**: 2 pagodas (3 stacked hip-roof tiers on lime bodies, brass finial) at (-48, hillY, -70) and (+52, hillY, -150).
- **Far city**: a coarse 9 m grid of bodies at 60 ≤ |x| ≤ 160 for z from -260 to +40, plus a valley band at z from -420 to -215 across |x| ≤ 160. 2-4 storeys, 70 % flat tops, no windows, about 900 instances, pre-fogged colours.
- **Goal house**: one body filling the goal footprint from `hillY` to `goal.min.y`, with a cornice.
- **Walkable-house dressing** (in `levelView.ts`):
  - a visual brick base from the wall collider's bottom (`top - 9`) down to `hillY`, with the same footprint
  - windows (0.08 m proud) on the wall collider's 4 faces
  - a cornice at `top - 3`
  - roof slab sides are whitewash
- **Rejection rule**: an instance whose world AABB intersects the lane volume (D1), or any collider expanded by 0.5 m, is dropped. Walkable-house dressing is exempt and follows its own D1 rule instead. The test checks this.

## D6. Rope (`src/app/ropeView.ts` only; `update` signature unchanged)

- **Tube**: SEG = 24 rings × RAD = 6 sides, radius 0.04 m, 288 tris. Positions and normals are rewritten in place each frame with no allocation.
  - Centre line: the existing sag curve.
  - Ring frame: `T` by central difference, `N = normalize(T × up)` (fall back to `up = +x` when |T·up| > 0.95), `B = T × N`.
- **Twist look**: a static vertex-colour pattern, `(i + j) % 3 == 0 ? #6e5232 : #b08850`. This gives diagonal stripes that read as a twisted hemp rope. No per-frame colour work.
- **Gold end**: rings at 0.8 SEG and beyond lerp to `#ffc83a`. A glow sleeve (radius 0.09, last 5 rings, `MeshBasic`, additive, gold, opacity 0.5, `fog: false`) and a halo at the anchor or hook tip: `CircleGeometry(0.9, 20)` with vertex alpha (centre 0.9, rim 0), additive.
- **Halo orientation**: the halo faces the camera through `onBeforeRender` (copy the camera quaternion, then `updateMatrixWorld()`, which runs before the model-view matrix is computed). This keeps `game.ts` out of the rope owner's files.
- **Far fallback**: the existing 1 px `Line` stays underneath, so the rope never vanishes at distance (0.08 m is under 1 px beyond about 25 m on a 360 px-tall screen).
- The rope trailing behind the hero in the reference is **not** drawn. Our hook line runs from the hand to the anchor only.

## D7. Hero (`heroRig.ts`, `heroPose.ts` HANG row only) — amends ADR 0004

| Role | Hex | Parts |
|---|---|---|
| top (oat) | `#d9c6a2` | torso, upper and lower arms (sleeves) |
| trousers | `#2a2f3b` | pelvis, thighs, shins |
| crimson | `#c4262e` | neck wrap + scarf tail, **new** waist sash band + sash tail |
| skin | `#b98563` | face patch, hands |
| hair | `#1f1a17` | **hood replaced by a hair cap** (same capsule, shorter, sitting lower) |
| leather | `#4a3426` | gloves, shoes, optional cross strap (thin box, chest to hip) |

- **Sash**: a box (0.32 × 0.07 × 0.22) at the pelvis top, plus a tail box hanging from the left hip. The tail swings with `CH_SCARF × 0.6`. No new channel.
- **Emissive**: keep the 0.18 self-glow on each colour, 0.35 on crimson.
- **Hang pose** (reference: both hands up on the handle, knees tucked): knee 1.1 rad, hip flex 0.35 rad, elbows 0.15 rad, body pitch -0.1. Edit only the HANG pose row.
- **Unchanged**: interface, joint tree, channels, blend, the other poses, and the budget (< 1,000 tris; the test cap is 1,500). The heroPose test keeps one material per colour, so `HERO_COLORS` grows to 6 keys.

## D8. HUD and touch (`hud.ts/.css`, `touch.css`, `touch.ts` `render()` only, `index.html`, new `waypointMath.ts`, `waypointView.ts`)

**Mapping** **[USER]**: the reference shows joystick + HOOK + SPRINT. The game has no sprint (stick magnitude sets speed), and adding one would change gameplay.
- The runner pictogram goes on **JUMP**. The hook pictogram goes on the contextual **ACTION** button, which swaps to a brake glyph while attached.
- The right-side look-drag and tap-to-aim zone stays as it is.
- `setActionLabel` must stop using `textContent`, which would wipe the icon. It sets `data-mode="hook|brake"` and `aria-label` instead.

**Shared tokens** (vh-driven, so both viewports derive from one rule):

```css
--pad: clamp(10px, 2.8vh, 28px);
--panel: rgba(28, 20, 16, .74);
--ink: #fff6e4;
--gold: #ffc83a;
--ring: rgba(255, 246, 228, .85);
font-family: "Avenir Next", "Segoe UI", Roboto, system-ui, sans-serif;  /* local fonts only */
font-weight: 700;
font-variant-numeric: tabular-nums;
```

| Element | Rule | 640×360 | 1920×1080 |
|---|---|---|---|
| Objective (diamond + "Reach the Target") | top/left `--pad` (left also respects the safe-area inset); height `clamp(28px, 4.6vh, 50px)`; font `clamp(13px, 2.3vh, 25px)`; background `linear-gradient(90deg, var(--panel) 0 70%, transparent)`; padding-right 3em | 10 / 10, h 28, 13 px | 28 / 28, h 50, 25 px |
| Stopwatch pill (`mm:ss`, count-up) | centred, top `--pad`; height `clamp(32px, 5.4vh, 58px)`; digits `clamp(18px, 3.3vh, 36px)`; `clip-path: polygon(8% 0, 100% 0, 92% 100%, 0 100%)`; min-width 5.6em | h 32, 18 px | h 58, 36 px |
| Pause button (pointer-events auto, z 31) | top/right `--pad`; size `clamp(34px, 6vh, 64px)`; radius 18 %; background `--panel` | 34 | 64 |
| Hint pill (existing text, fades on first hook) | centred, top `pad + timer + 8px`; font 13-20 px | y 50 | y 94 |
| Joystick (touch only) | base fixed 128 px (= 2 × `STICK_RADIUS_PX`; do not decouple), ring 2px `--ring`, fill `rgba(28,20,16,.28)`, 4 chevrons at 12 % inset; knob 52 px `rgba(255,246,228,.75)`. **At rest**: a ghost at 45 % opacity centred at (pad + 64, H - pad - 64) plus safe insets. **Active**: floats to the touch origin (current behaviour) | centre (74, 286) | hidden (desktop) |
| ACTION (hook / brake) | right/bottom `--pad` + safe; size `clamp(68px, 21vh, 96px)`; ring `--ring`, fill `--panel` at 55 %; pressed: fill `rgba(255,200,58,.35)`, ring gold | 76 | hidden |
| JUMP (runner icon) | directly above ACTION, gap 10px, centres aligned; size `clamp(56px, 16vh, 76px)` | 58, bottom 96 | hidden |
| Waypoint marker | see below; diamond `clamp(22px, 5.5vh, 40px)`; label `clamp(12px, 2.2vh, 22px)` in a `--panel` pill with radius .35em; 1.5 px gold stem, 0.6 × diamond tall, ending at the projected point | 22 / 12 px | 40 / 22 px |

The win overlay and the death toast keep their content but are restyled with `--panel`, `--ink` and gold buttons. z-order: touch zones 10, buttons 20, HUD 30, pause 31, win 40, rotate 100.

**Pause wiring**: the button dispatches `window.dispatchEvent(new CustomEvent('zt-menu'))`. `main.ts` listens and runs the same handler as the lobby's `onMenu` (`game.pause(); lobby.show()`).

**Icons** (inline SVG, `viewBox="0 0 24 24"`, `stroke` or `fill` = `currentColor` unless stated; tune visually):

```html
<!-- diamond (objective + waypoint) -->
<path d="M12 1.5 22.5 12 12 22.5 1.5 12Z" fill="#ffc83a" stroke="#2a1a0e" stroke-width="1.5"/>
<path d="M12 6.5 17.5 12 12 17.5 6.5 12Z" fill="none" stroke="#2a1a0e" stroke-width="1.5"/>
<!-- stopwatch -->
<g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="13.5" r="8"/><path d="M12 13.5V9.5M10 2.5h4M12 2.5v3M18.5 6.5 20 5"/></g>
<!-- pause -->
<g fill="currentColor"><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></g>
<!-- hook (grapple + rope loop) -->
<g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 9.5 19.5 4.5M17 2.5l4.5 4.5M14.5 9.5c-3 3-6 2-8 4.5a3 3 0 1 0 4 4c1.2-1.4.6-3.4-1-3.6"/></g>
<!-- brake (hold) -->
<g fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M6 8h12M6 12h12M8 16l4 3 4-3"/></g>
<!-- jump / runner -->
<path fill="currentColor" d="M13.6 6.4 9 7.6l-2.4 3.1 1.6 1.2 1.9-2.4 2-.5-1.6 4.4L7.4 17H3.5v2h5l2.6-2.6 2 1.9V23h2v-5.6l-2.4-2.3 1-3 1.4 1.8H20v-2h-3.9l-1.7-3.3c-.3-.6-.9-1-1.6-1z"/><circle fill="currentColor" cx="15.5" cy="3.5" r="2"/>
<!-- chevron (joystick arrows, off-screen waypoint arrow) -->
<path d="M8 14l4-4 4 4" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
```

**Waypoint.**
- **Target**: `world.anchors[world.route[nextRouteIndex]]`, which follows runner's vision. Decoy anchors never get a marker. After the last route anchor the target is the goal centre. The marker is hidden during the establishing pan, while dead, and when the target is under 3 m away.
- **Projection**: a pure function in `src/adapters/ui/waypointMath.ts`, unit tested, called each render frame after the camera pose is set.

```
camera.updateMatrixWorld()
v.set(tx, ty + 2.2, tz).applyMatrix4(camera.matrixWorldInverse)   // view space
behind = v.z > -camera.near
v.applyMatrix4(camera.projectionMatrix)                          // NDC (w divide)
nx = behind ? -v.x : v.x;  ny = behind ? -v.y : v.y
sx = (nx*0.5 + 0.5) * W;   sy = (0.5 - ny*0.5) * H
top = pad + timerH + 8;    m = 28
if behind or sx ∉ [m, W-m] or sy ∉ [top, H-m]:
  dx = sx - W/2; dy = sy - H/2; if dx == dy == 0: dy = 1
  k  = min((W/2 - m)/|dx|, (H/2 - m)/|dy|)   // clamp to an inset rect
  sx = W/2 + dx*k; sy = max(top, H/2 + dy*k)
  show chevron rotated atan2(dy, dx); hide stem
```

- **DOM**: only `transform: translate3d(sx, sy, 0)`, written when it moves by 0.5 px or more. The distance text is `Math.round(|target - heroFeet|) + ' m'`, written only when the integer changes. No allocation per frame (preallocated `Vector3`).
- **Beam** (`src/adapters/render/waypointView.ts`, 3D):
  - shaft: `CylinderGeometry(0.12, 0.3, 40, 8, 1, true)`, base at the target, vertex alpha 0.9 at the bottom to 0 at the top, `#ffd35a`, additive, `depthWrite: false`, `fog: false`
  - ring: `RingGeometry(0.5, 0.75, 24)`, horizontal at the target, scale `1 + 0.25 sin(6t)`
  - 64 tris, 2 draw calls

## D9. What we cannot match, and the stylised substitute

| Reference has | Why not | Substitute |
|---|---|---|
| Global illumination, soft contact shadows | shadow maps double the draw cost; no baking pipeline | Lambert + hemisphere fill, baked vertex-gradient AO on blocks, dark eave undersides from down-facing normals |
| Painted brick, tile and wood textures | no image assets | colour blocking, per-instance tint jitter, geometric detail (cornices, proud window frames, faceted roofs) |
| Carved Newari window lattices | geometry cost | dark-wood framed boxes sitting proud of the wall |
| God rays, bloom, colour grade, depth of field | post-processing costs a full-screen pass on phones | additive sun glow disc, additive beam, a palette that does the grading |
| Height-falloff atmospheric haze | stock `Fog` is linear | linear fog + pre-fogged far city and mountain colours |
| Detailed clouds | textures | 7 flat vertex-coloured ellipse cards |
| A city to the horizon | triangle budget | about 240 near houses, about 900 far boxes, fog, mountain silhouettes |
| Lush foliage, potted plants, clutter | triangle and draw budget | low-poly icosahedron trees; pots and clutter cut |
| A detailed boy (cloth, face, hair) | lean scope: a capsule mannequin | colour-zoned mannequin with hair cap, scarf, sash |
| Rope trailing behind to a post | gameplay: the hook line runs hand to anchor | not drawn |
| Sun in frame and lighting the scene | the readable key light is 78° off axis | visual sun decoupled from the key light (D4) |
| Birds | cost vs value | cut |

## D10. Performance budget and how it is measured

Target: 60 fps on a 2021 mid-range phone (iPhone 12 / Pixel 6a class), landscape 640×360 CSS px, pixel ratio ≤ 1.5.

| Metric | Budget | Measured by |
|---|---|---|
| Draw calls (gameplay frame) | ≤ 80 (decor ≤ 16; the hero's about 25 mesh parts are the biggest existing item) | `?debug` overlay (`renderer.info.render.calls`, already in `debugHud.ts`) |
| Triangles per frame | ≤ 120k (decor ≤ 80k, sky + mountains ≤ 3k, hero < 1k, rope + beam + halo < 0.5k) | `?debug` overlay; `tests/adapters/decor.test.ts` sums `geometry index count / 3 × instance count` |
| Decor determinism and lane clearance | same seed gives identical matrices; zero instances inside the lane or colliders + 0.5 m | `tests/adapters/decor.test.ts` (headless three, no WebGL needed) |
| Terrace lethality | every stand or hang point at least 12 m above any terrace under it | `tests/content/terrace.test.ts` |
| Transparent layers | ≤ 5 additive meshes (sun glow, sun core, beam shaft, beam ring, rope halo or sleeve); no full-screen quads | code review |
| Decor build time | ≤ 30 ms desktop, ≤ 120 ms phone | `performance.now()` around `buildDecor`, logged under `?debug` |
| Per-frame allocation | zero in new code (rope, waypoint, halo) | code review + DevTools allocation timeline (flat during play) |
| Frame time | median ≤ 16.7 ms during the first 30 s of a run | Chrome DevTools Performance, 4× CPU throttle, 640×360 emulation; real phone if available |
| Bundle | added code ≤ 25 KB gzip; total stays under lean scope's 600 KB | `pnpm build` then gzip size of `dist/assets/*.js` before and after |
| Off | shadow maps, tone mapping, post-processing, textures, fonts fetched over the network | review |

## Consequences

- The game looks like the reference in composition, palette and HUD, but stays clearly stylised (flat-shaded, low-poly).
- Readability is protected by rules (the lane, pitched roofs near the lane, a dark tile vs hot danger split, the brightest-near-white rule for pads, the marker only on the next route anchor), and tests check them.
- D2 adds colliders to the content. It is the only change that touches play. It is test-gated and can be reverted on its own.
- ADR 0004 is superseded on colours, head and hang row only.
