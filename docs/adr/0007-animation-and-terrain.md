# ADR 0007: Animation layer and terraced hillside

Status: Proposed 2026-11-06. Amends ADR 0004 (hero channels, poses), ADR 0006 §1 (caps), §4 (house
heights, placement), §3 (post). Unchanged: stock materials, no shaders/shadows/post, strict TS,
mulberry32 seed 1729, no `Math.random`, zero per-frame allocation, ADR 0005 D1 lane rules.
**`src/core` and `content/levels/l1.json` do not change.** Everything here is render-side.

## 0. Measured baseline (2026-11-06, scratch count over l1)

| Piece | body | cornice | window | roof | rail | deck | tank | parapet | canopy | trunk | flag | shutter | pot |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| used / cap | 1084/1250 | 190/300 | 896/1000 | 308/400 | 57/80 | 19/60 | 32/60 | 173/260 | 78/110 | 53/120 | 408/800 | **160/160** | 74/140 |
| tris / instance | 12 | 12 | 22 | 32 | 108 | 12 | 76 | 12 | 80 | 10 | 2 | 20 | 32 |

Decor: 68,916 tris used, ceiling 89,720, 13 instanced, 16 decor calls.

Defects this pass fixes:
- **F1 shutter drops.** `DecorKit.add` returns false at cap and nobody counts it. Shutters hit 160/160, so the downhill houses silently lose theirs.
- **F2 tall houses.** Column 0 uses `n = max(4, round((20 + U(-4, 2)) / 3))`, which gives 5–7 storeys of 3 m. Other columns get 3–6.
- **F3 floating hill.** Houses with `x + w > 30` stand on `farPlaneY` foundations. Nothing steps between the 9.5 m terrace drops. The spawn roof S0 (solid 1, y −3..0) has no style-1 wall, so `levelView` gives it no base and it floats 17 m above terrace 0.
- **F4 plank post.** The tie post is a flat-shaded 8-sided cylinder hanging off S0's floating underside (y −3 → 2.4). It has no foot and no mount, so from the spawn camera it reads as a plank.
- **F5 lost events.** `step()` clears `eventBits` every step and `onRender` sees only the last step's bits. Landings in a two-step frame are lost.
- **F6 cling unmapped.** `HERO_HANGING = 4` (wall cling / rope end) has no pose and falls through to idle (ADR 0004 gap).
- **F7 HOOKED fires early.** `HERO_EV_HOOKED` fires on hook *fire* (sim.ts:348), not on attach. Attach is the mode edge `prev.mode !== ATTACHED && cur.mode === ATTACHED`.
- ADR 0006 carry-over: cut item 1 says birds are "never wired". They are wired (placeDecor `g.add(buildBirds())`) and already flap and glide, so that line is stale and no birds work is needed.

## 1. Budget (binding)

| Budget | Limit | Target after this ADR |
| --- | --- | --- |
| Draw calls | ≤ 80 | ≈ 74: ADR 0006's 72, plus the trolley wheel, plus the dust puff (only while visible) |
| Triangles | ≤ 120k | ≈ 87k worst-view actual |
| Instanced meshes | ≤ 16 | 13 (no new piece) |
| Decor calls | ≤ 16 | 16 (unchanged) |
| Kit ceiling | ≤ 90k | **87,920**: window 1000→700 (−6,600), body 1250→1650 (+4,800) |
| Additive meshes | ≤ 5 | 5 (dust puff uses normal blending) |
| Hero | < 1,500 tris, ≤ 25 meshes, 6 mats | unchanged: 0 new meshes |
| Rope + post | — | post ≈ 180 + span 640 + wheel 24 tris |
| Per frame | 0 allocations | every new buffer is preallocated; per-frame vertex uploads total ≤ 50 verts (flag 4, canopy 42) |

## 2. Event latch (step 0, controller; shared by every lane)

New `src/adapters/render/animEvents.ts` (controller writes it verbatim before dispatch):
```ts
export const AE_LAND = 1, AE_JUMP = 2, AE_RELEASE = 4, AE_FIRE = 8, AE_ATTACH = 16, AE_CLING = 32, AE_DIE = 64;
/** Landing amplitude 0..1 from downward impact speed (m/s). 2 m/s → 0, 11 m/s → 1. */
export function landAmp(impact: number): number { const a = (impact - 2) / 9; return a < 0 ? 0 : a > 1 ? 1 : a; }
```
`game.ts` holds `let animEv = 0; let animImpact = 0;`. In `onStep`, right after `step(cur, frame, world, cfg)`:
```ts
const ev = cur.eventBits;
if ((ev & HERO_EV_LANDED) !== 0) { animEv |= AE_LAND; if (-prev.vy > animImpact) animImpact = -prev.vy; }
if ((ev & HERO_EV_RELEASED) !== 0) animEv |= AE_RELEASE;
if ((ev & HERO_EV_HOOKED) !== 0) animEv |= AE_FIRE;
if ((ev & HERO_EV_CLING) !== 0) animEv |= AE_CLING;
if ((ev & HERO_EV_DIED) !== 0) animEv |= AE_DIE;
if (prev.mode !== HERO_ATTACHED && cur.mode === HERO_ATTACHED) animEv |= AE_ATTACH;
if (prev.grounded === 1 && cur.grounded === 0 && cur.mode === HERO_AIRBORNE && cur.vy > 2 && (ev & HERO_EV_RELEASED) === 0) animEv |= AE_JUMP;
```
- `onRender` copies these into `heroView.input` and `cameraFx` (§4), then zeroes both. `restart()` zeroes both and calls `cameraFx.reset()`.
- Impact uses `prev.vy` because `landHero` zeroes `vy` in the landing step.
- The jump test is verified against sim.ts:524–527 (a jump sets `vy = jump` and `grounded = 0` in the same step; line 631 sets AIRBORNE). Walking off a ledge gives vy ≈ −0.16, so it is not a jump.

## 3. L-ANIM-HERO (the modelling decisions are fixed here; Sonnet implements)

**Channels:** `CH_HEM_PITCH = 22`, `CH_HEM_ROLL = 23`, `CH_SQUASH = 24`, `CH_COUNT = 25`. HEM and SQUASH are not blended (every pose row has them at 0). HEM is written after the blend, like `CH_SCARF`; SQUASH comes from overlays only.

**Poses:** `POSE_WIN = 7`, `POSE_CLING = 8`, `POSE_COUNT = 9`. `FADE_TAU` gains `[…, 0.15, 0.06]`, and `FADE_TAU[POSE_DEAD]` goes from 0.06 to **0.2** so a death reads as a fall, not a snap.

**Input:** `HeroPoseInput` gains `events` (AE bits), `impact` (m/s), `deadCause`, `win` (0/1) and `hookFlying` (0/1). heroPose gets a local constant `CLINGING = 4` (test: equals core `HERO_HANGING`); `heroView` already passes `cur.mode`, so 4 now arrives.

**selectPose precedence:** DEAD → `win` (WIN) → ATTACHED (BRAKE or HANG) → CLINGING (CLING) → rolling (ROLL) → AIRBORNE (AIR) → run/idle (unchanged).

**Rig** (`heroRig.ts`, 0 new meshes):
- Store `readonly body: Group` (the joint at swing −2.0) and `readonly yoke: Mesh` (the part at line 284).
- `applyHeroChannels` adds `body.scale.set(1 + 0.5q, 1 − q, 1 + 0.5q)` with `q = clamp(ch[CH_SQUASH], −0.12, 0.18)`; the body origin is the feet, so the soles stay planted.
- It also adds `yoke.rotation.set(ch[CH_HEM_PITCH], 0, ch[CH_HEM_ROLL])`. The hinge is the pelvis origin and `scale.z 0.85` is kept.
- Sign conventions: HEM_PITCH has the same sense as a forward `CH_BODY_PITCH`, so a trailing hem is negative. Knee, hip and shoulder flex are positive = bent / forward / up, as in the existing rows.

**New rows** (channels not listed are 0):
- `WIN`: SPINE_PITCH −0.12, HEAD_PITCH −0.25; SHOULDER_FLEX L/R 2.6, SHOULDER_RAISE L/R 0.5, ELBOW L/R 0.25; HIP_SPREAD L/R 0.12, KNEE L/R 0.05. Loop: SHOULDER_FLEX_L += 0.2·sin(2π·1.2t), _R += 0.2·sin(2π·1.2t + π).
- `CLING`: HIPS_Y −0.075, BODY_PITCH 0.15, SPINE_PITCH −0.05, HEAD_PITCH −0.3; SHOULDER_FLEX L/R 2.95, ELBOW L/R 0.2; HIP_FLEX L 0.75, R 0.6; KNEE L 0.95, R 0.8. Idle breathing (below) applies.
- `CRUMPLE` (replaces DEAD_ROW in `rows[POSE_DEAD]` when `deadCause === 3`, hard landing): HIPS_Y −0.55, BODY_PITCH 1.2, BODY_ROLL 0.35; SPINE_PITCH 0.35, SPINE_TWIST −0.25, HEAD_PITCH −0.3; SHOULDER_FLEX L 1.6, RAISE L 0.4, ELBOW L 1.9; SHOULDER_FLEX R 0.9, RAISE R 0.9, ELBOW R 1.2; HIP_FLEX L 1.5, KNEE L 2.1, HIP_FLEX R 0.6, KNEE R 0.9.
- Wall, fell and hazard deaths keep DEAD_ROW.

**Procedural layers** (added inside the row writers; t = `st.time`):

| Item | Where | Exact |
| --- | --- | --- |
| Idle breathing | IDLE and CLING rows | b = sin(2π·0.28·t). SPINE_PITCH −0.025·b; HEAD_PITCH +0.015·b; SHOULDER_RAISE L/R +0.02·b; HIPS_Y +0.004·b; BODY_ROLL +0.02·sin(2π·0.11·t) |
| Idle scarf | after blend | flutter term `+ 0.05·sin(2π·0.35·t)` when speed < 0.5 |
| Run scarf flap | after blend | flutter `+ 0.1·amp·sin(4π·phase + 2.2)`; amp = writeRun's clamp(speed/6, 0.3, 1), and 0 when not in RUN |
| Hang sway | writeHang | HANG_SWAY_AMP 0.06 → 0.08; KNEE_L += 0.12·m·sin(2π·0.9t + π/2), KNEE_R the same with −π/2; m = writeHang's speed factor |
| Hem spring | after blend | two damped springs, ω 14 rad/s, ζ 0.35, substep `SPRING_STEP` (1/120), see goals below |

Hem goals:
- Pitch goal = −clamp(0.012·speed + 0.02·max(0, −vy), 0, 0.3) − 0.2·clamp(accel/10, −1, 1) + 0.05·amp·sin(4π·phase + π/2). In HANG and BRAKE it is −0.5·`st.swing`. In DEAD it is 0.
- Roll goal = 0.06·amp·sin(2π·phase + π/2) − 0.15·clamp(yawRate/3, −1, 1).
- Clamp the outputs: pitch to [−0.35, 0.2], roll to [−0.18, 0.18]. When speed drops to 0 the spring overshoots once, which is the follow-through.

**Reach** (the continuous grab-the-rope reach): `st.reach` approaches 1 with τ 0.05 while `hookFlying`, and 0 with τ 0.1 otherwise. After the blend: SHOULDER_FLEX_R = lerp(v, clamp(π/2 + asin(ropeDirY), 0.6, 3.0), reach); ELBOW_R = lerp(v, 0.1, reach); SPINE_TWIST −= 0.15·reach.

**Overlays** are additive deltas applied after the blend.
- Evaluator: `overlayValue(keys, t)` takes a module-level `Float64Array [t0, v0, t1, v1, …]`, returns 0 outside [t0, tn] and uses smoothstep (3u² − 2u³) between keys.
- Each overlay has a timer in `HeroPoseState` (−1 = idle), started by its AE bit and advanced by dt. L and R values are the same unless noted.

| Overlay (trigger) | Keys `t: value` (s) |
| --- | --- |
| JUMP (`AE_JUMP`): render-side anticipation, crouch then extend | HIPS_Y 0:0 .05:−.07 .12:.02 .24:0 · KNEE 0:0 .05:.6 .12:−.15 .24:0 · HIP_FLEX 0:0 .05:.45 .12:−.1 .24:0 · SHOULDER_FLEX 0:0 .05:−.5 .12:1.1 .24:0 · SPINE_PITCH 0:0 .05:.15 .12:−.05 .24:0 · SQUASH 0:0 .05:.10 .12:−.08 .24:0 |
| LAND (`AE_LAND`); a = landAmp(impact), d = 0.12 + 0.18a, times × d, values × a | SQUASH 0:0 .25:.14 .6:−.03 1:0 · HIPS_Y 0:0 .3:−.22 1:0 · KNEE 0:0 .3:.9 1:0 · HIP_FLEX 0:0 .3:.7 1:0 · SPINE_PITCH 0:0 .3:.35 1:0 · SHOULDER_RAISE 0:0 .3:.3 1:0. When `rolling`, only SQUASH, at ×0.5 |
| ATTACH (`AE_ATTACH`); s = clamp(speed/10, 0.3, 1) | `st.swingVel += 1.2·s` once · SQUASH 0:0 .05:−.06s .15:0 · ELBOW 0:0 .05:−.15 .2:0 · HIPS_Y 0:0 .06:−.05s .25:0 |
| RELEASE (`AE_RELEASE`), also a jump from cling | SHOULDER_FLEX 0:1.6 .35:0 · HIP_FLEX 0:0 .12:.5 .35:0 · SPINE_PITCH 0:−.25 .3:0 · HEAD_PITCH 0:−.2 .3:0 |
| CLING (`AE_CLING`) | SQUASH 0:0 .05:.06 .18:0 · SPINE_PITCH 0:0 .05:.2 .25:0 |
| DEATH wall (`AE_DIE`, cause 2) | HEAD_PITCH 0:0 .06:−.6 .3:0 · SHOULDER_RAISE 0:0 .08:.8 .4:0 |
| DEATH hard landing (cause 3) | SQUASH 0:0 .06:.18 .2:0 · HIPS_Y 0:0 .08:−.25 .3:0 (on top of the CRUMPLE row) |
| DEATH fell or hazard (cause 1, 4) | flail, procedural for 1.2 s: SHOULDER_RAISE_L += 0.4·e^(−t/0.6)·sin(2π·3t), _R with +π; HIP_FLEX_L += 0.3·e^(−t/0.6)·sin(2π·2.5t), _R with +π |
| WIN (enter POSE_WIN) | SQUASH 0:0 .1:.08 .25:−.06 .4:0 · HIPS_Y 0:0 .25:.05 .4:0 |

Order inside `stepHeroPose`: rows (with the procedural layers) → blend → overlays → reach → hem springs → scarf, then clamp SQUASH. Zero allocation: all keys are module consts and all timers are plain fields.

**Jump anticipation limit:** the sim launches on the press. A real pre-jump crouch would need a core `jumpDelay` tunable, which is a gameplay change and out of scope. The JUMP overlay is a fast crouch-extend in the first 0.05 s of the airborne phase, plus the LAND recovery crouch.

## 4. L-FX: camera kick and shake, dust puff (new files)

`src/adapters/render/cameraFx.ts`: `class CameraFx { offX = 0; offY = 0; fovAdd = 0; update(dt, events, impact, speed, deadCause): void; reset(): void }`. dt is clamped to [0, 0.1]; dt 0 changes nothing.

FOV:
- `kick`: +3 on AE_ATTACH, +5 on AE_RELEASE, −2·landAmp(impact) on AE_LAND. Clamp to [−4, 8], then `kick *= e^(−dt/0.35)`.
- Acceleration term: `accS += ((speed − prevSpeed)/dt − accS)·(1 − e^(−dt/0.2))`, `accFov = clamp(0.5·accS, 0, 4)`.
- `fovAdd = kick + accFov`. The speed FOV (60 → 75 over 20 m/s, in cameraRig) stays as it is, so the total is ≤ 87°.

Shake (deterministic, no RNG):
- Amplitude: `amp = max(amp, X)`, where X is 0.10·landAmp(impact) on AE_LAND (only if landAmp ≥ 0.15), 0.035 on AE_ATTACH, and 0.15 on AE_DIE with cause 2 or 3. Each trigger resets `shakeT = 0`.
- Each frame: `shakeT += dt`, `amp *= e^(−dt/0.11)`, `offY = amp·sin(2π·23·shakeT)`, `offX = 0.5·amp·sin(2π·31·shakeT + 1.3)`. When amp < 0.002, amp, off and shakeT all go to 0.

`src/adapters/render/dustPuff.ts`: `class DustPuff { readonly mesh: Mesh; trigger(x, y, z, a): void; update(dt): void }`.
- Geometry `RingGeometry(0.25, 0.42, 12, 1).rotateX(−π/2)` (24 tris). Material `MeshBasicMaterial({ color: '#c9a27e', transparent: true, depthWrite: false, opacity: 0 })`, normal blending.
- Animation: u = age/0.4; scale = 1 + 2.2·(1 − (1 − u)³); opacity = 0.55·(0.5 + 0.5a)·(1 − u)²; mesh y = trigger y + 0.03. `visible = false` when u ≥ 1, so it costs 0 calls at rest.
- Triggers (from game.ts): AE_LAND with impact ≥ 3 or rolling (a = landAmp); AE_JUMP with a = 0.2; AE_DIE with cause 3 and a = 1.

## 5. L-ROPE: vibration, sag settle, trolley wheel, post, S0 base

`ropeView.ts`:
- `update(hook, hx, hy, hz, hookSpeed, dt)` gains `dt`, and there is a new method `pulse(amp)`.
- Vibration: `vibAmp = max(vibAmp, amp)`, `vibT = 0`. On each centre-line ring i (t = i/SEG):
  `y += vibAmp·e^(−vibT/0.35)·(sin(2π·6·vibT)·sin(πt) + 0.4·sin(2π·11·vibT)·sin(2πt))`.
  The ends are nodes. It applies only while ATTACHED, and the trail is untouched.
- Sag settle: a `sagCur` field moves toward the goal (SAG_FLYING or SAG_TAUT) by `1 − e^(−dt/0.12)` instead of snapping.
- Trolley wheel: a child of `handle` at (0, 0.08, 0), `CylinderGeometry(0.065, 0.065, 0.035, 6).rotateZ(π/2)` (axis = local x, 24 tris), `MeshLambertMaterial({ color: '#3a2a22', flatShading: true })` so the facets show the spin. `wheel.rotation.x = −hook.s / 0.065`, a pure function of sim state.
- game.ts calls `pulse(0.12·clamp(hook.v/10, 0.4, 1))` on AE_ATTACH, and `pulse(0.05)` on the brake rising edge.

`ropePost.ts` post rebuild. T = roof top, `px = roof.min.x − 1.05`, `pz = roof.max.z − 1.2` (both unchanged). The post stays uphill of the launch, so `ROPE_TIE` keeps `dot < −1`.

| Part | Geometry | y range / place | Colour |
| --- | --- | --- | --- |
| Shaft | Box 0.34 × H × 0.34, heightSegments 6 | T − 6 → T + 2.4 | `#6b4426`, ×0.72 where fract((y − bottom)/0.9) < 0.18 (carved bands) |
| Collars ×3 | Box 0.40 × 0.08 × 0.40 | T + 0.4, T + 1.2, T + 1.9 | `#4a2c1c` |
| Capital | Box 0.46 × 0.16 × 0.46 + Cone(0.34, 0.32, 4) rotated π/4 | top, top + 0.16 | `#4a2c1c` |
| Rope wraps ×3 | the existing open cylinders, radius 0.2 → 0.25 | T + 2.0 / 2.15 / 2.3 | TWIST_DARK |
| Brackets ×2 | Box from the post face (px + 0.17) to roof.min.x, 0.18 × 0.22 | centre y T − 3.6 and T − 5.6 | `#4a2c1c` |
| Corbel | Box 1.2 × 0.4 × 0.6, from roof.min.x out under the shaft foot | top at T − 6 | `#8a4b38` |

- The material drops `flatShading` (the box normals are already flat, and the span normals are radial).
- Span: `SPAN_SIDES` 6 → 8, `SPAN_SEG` 16 → 40 (640 tris), which also makes the twist stripes finer.
- D1 exception (ADR 0006 §8): "one rope post per level beside the spawn roof" now covers its brackets and corbel, all within 1.5 m of the roof's −x face.

`levelView.ts` S0 base:
- Applies to every style-2 roof with no style-1 solid below it. "Below" means xz overlap ≥ 50 % and the wall's max.y within 0.1 of the roof's min.y.
- Such a roof gets a flush brick box of its footprint, from the highest style-0 top under its centre up to `roof.min.y`. In l1 that is S0 only, y −20 → −3.
- The box is appended to the existing brick-base merged geometry: 0 new calls, +12 tris each. It is visual only; no collider changes.

## 6. L-AMBIENT and L-UI

New `src/adapters/render/decor/ambient.ts`: `attachAmbient(decor: Group): void`.
- Finds `decor_flag` and `decor_canopy` via `traverse`. Copies each geometry's base positions once into a Float32Array and sets `onBeforeRender` on those meshes (t = `performance.now()/1000`, the same as birds).
- Flags (PlaneGeometry 0.35 × 0.25, 4 verts): the top verts are fixed. Each bottom vert gets `z += 0.05·sin(2π·1.4t + 4·x_base)`.
- Canopy: every vert gets `x += 0.035·h·sin(2π·0.35t)` and `z += 0.02·h·sin(2π·0.27t + 1)`, with h = (y_base − y_min)/(y_max − y_min). Normals are not recomputed.
- Then `needsUpdate = true`. No other per-frame work.
- placeDecor `flagString` (L-TERRAIN) sets `rotY + (k % 2)·π` (two-sided material), so neighbouring flags flutter in anti-phase.

`hud.css` and `hud.ts` (all CSS, compositor-friendly, no per-frame JS). Restartable animations alternate two classes with identical keyframes (`-a`/`-b`), so a replay needs no forced reflow.
- **Objective pill:** `hud.objectiveIn()` toggles `in-a`/`in-b` on `#hud-objective`. Keyframes from `translateX(−110%); opacity 0` to `none; 1`, 0.5 s `cubic-bezier(0.2, 0.8, 0.2, 1)`, 0.15 s delay, `both`. The span gets a gold glow: text-shadow 0 → `0 0 12px rgba(255,200,58,.9)` → 0, 0.6 s ease-out, 0.6 s delay.
- **Timer pulse:** `hud.pulseTimer()` toggles `pulse-a`/`pulse-b` on the inner `span` (display inline-block), because the container owns `translateX(−50%)`. Keyframes: 0 % scale 1; 35 % scale 1.14, colour `var(--gold)`; 100 % scale 1. Duration 0.32 s, `cubic-bezier(0.3, 1.6, 0.5, 1)`.
- **Waypoint bob:** `.wp-dia` runs `wp-bob` 1.4 s ease-in-out infinite alternate, `translateY(0 → −5px)`. `.edge .wp-dia` has `animation: none`.
- **Toast in:** 0.2 s ease-out, from `translate(−50%, −8px)` opacity 0 to `translate(−50%, 0)` opacity 1.
- **Win:** h1, p and button drop in (`translateY(−16px)`, opacity 0 → 1), 0.45 s `cubic-bezier(0.2,0.8,0.2,1)`, delays 0 / 0.1 / 0.2 s.
- **Reticle lock pop:** 0.18 s, scale 1.35 → 1.
- `@media (prefers-reduced-motion: reduce)` sets every rule above to `animation: none`.

## 7. L-TERRAIN: lot terraces, steps, 3-storey houses, clusters

Constants in placeDecor, derived from the world. A test asserts the l1 values.

| Name | Value (l1) | Derivation |
| --- | --- | --- |
| `LOT_STEP` | 4.75 | (top of the highest style-0 terrace − the next one) / 2 |
| `SLICE_Z` | 13 | (T0.min.z − T1.min.z) / 2 |
| `Z0`, `Y0` | −13, −20 | T0.min.z, T0.max.y |
| `LOT_FLOOR` | −86.5 | the lowest style-0 top |
| `lotY(z)` | `max(LOT_FLOOR, Y0 + LOT_STEP·floor((z − Z0)/SLICE_Z))` | global staircase: each terrace's downhill half sits at T, its uphill half at T + 4.75 |
| Bands per side s = ±1 | inner \|x\| 16–30, outer 30–60, alley 30–35 (inside outer) | `LANE_HALF_X`, `TERRACE_HALF_X`, `CLUSTER_MIN_X = 35`, `LOT_OUTER_X = 60` |
| `STOREY` | 2.8 (was 3) | `n ∈ {1, 2, 3}`; pitched roof height 1.5 → 1.2; flat parapet 0.6 |
| House cap | ≤ 9.6 m above the paving (3 × 2.8 + 1.2) | tanks, pots and rails are rooftop furniture, exempt |

**Slice loop** (replaces the per-terrace row loop). Slices k cover [Z0 + 13k, Z0 + 13(k+1)], clipped to the style-0 z-extent (−218 … 30). For each slice and each side, in this order (the RNG draw order is fixed for determinism):
1. **Lots** (`B.box('body', 'lot', …)`, colour RETAIN `#7d4a3a`; each gets a 0.15-thick cap in PAVING `#8e7a66`):
   - Inner lot, only if lotY > the collider top under the slice centre: x 16–30, z [z0, z1 − 0.6] (clear of the uphill terrace's underside), y [colliderTop, lotY].
   - Outer lot: x 30–60, z [z0, z1], y [max(farPlaneY(z0) − 0.5, −90), lotY].
2. **Steps:** at each boundary z_b where lotY rises by 4.75, one flight on side `s = k % 2 === 0 ? 1 : −1`. x from s·31 to s·33.4, 10 boxes, rise 0.475, run 0.5. Step j spans z [z_b − (10 − j)·0.5, z_b] and y [lotY_k, lotY_k + (j + 1)·0.475]. Kind `stair`, PAVING colour. No flight where Δ = 0 (floor clamp).
3. **Inner houses (pitched):**
   - Up to 2: column 0 at |x| 17.05, column 1 after a gap of U(0.5, 1.5). w = U(4.5, 6); column 1 is dropped if its x1 > 29.6.
   - d = U(8, 11), centre z = slice centre + U(−0.6, 0.6), clamped to [z0 + 0.8, z1 − 1.4]. Base = lotY + 0.15. Storeys n: rng < 0.2 → 1, < 0.6 → 2, else 3.
   - Windows: column 0 on every storey, column 1 on the top storey only. Shutters stay at 40 % on column 0.
4. **Cluster:** `buildCluster(B, planCluster(rng, s, 35, 59, z0, z1, lotY + 0.15))` in the outer band. The plan is pushed to `userData.clusters`.

Trees: re-base every trunk at lotY(z) + 0.15 when |x| ≥ 16. Never inside a step flight's box.

New pure `src/adapters/render/decor/cluster.ts` (no three import; reusable by a future level generator):
```ts
export class ClusterHouse { x0 = 0; x1 = 0; z0 = 0; z1 = 0; storeys = 1; roofY = 0; shareIn = 0; shareOut = 0; }
export class ClusterPlan { side = 1; baseY = 0; houses: ClusterHouse[] = []; }
export function planCluster(rng: () => number, side: number, xIn: number, xOut: number,
  z0: number, z1: number, baseY: number): ClusterPlan;
```
- The x values are unsigned distances from the lane axis; the builder mirrors them by `side`.
- The count target is `rng() < 0.5 ? 3 : 4`, drawn first. Then, per house k, in this draw order:
  1. `w = 4.5 + 2·rng()`; then, for k > 0, gap `rng() < 0.5 ? 0 : 1 + 2·rng()`
  2. `d = min(8 + 3·rng(), z1 − z0 − 1.6)`; `zc = (z0 + z1)/2 + (rng() − 0.5)·1.2`, clamped so z stays in [z0 + 0.8, z1 − 0.8]
  3. storeys: house 0 gets `1 + floor(3·rng())`; later houses get `clamp(prev + floor(3·rng()) − 1, 1, 3)`
- Stop early if `cursor + w > xOut`. With a 24 m band that leaves 2–4 houses.
- Gap 0 sets `shareOut` on the previous house and `shareIn` on this one. `roofY = baseY + 2.8·storeys` (flat).

`buildCluster(B, plan)` in placeDecor:
- One body per house. The colour comes from the house palette; if it matches the neighbour's, re-pick once.
- Parapet (0.25 × 0.6, full depth) on the lane-facing x-face, unless `shareIn` and the inner neighbour's storeys ≥ this one's. Plus the outer face of the last house.
- Windows on the lane-facing face, where exposed, top storey only, `floor(d/2.4)`.
- Tank: 35 % at (x1 − 0.8, z1 − 1.2). Pots: 25 % one pair. Flag string: 30 % from house 0 to the last house, at roofY + 0.8.
- Flat roofs at |x| ≥ 35 keep D1 intact. Consecutive slices put cluster rooftops 2–5 m apart in z, with a 4.75 m drop. That is the future rooftop-descent route, parallel to the lane.

**Kit (`kit.ts`):**
- `PIECE_CAP.body` 1250 → 1650, `window` 1000 → 700. The others stay; ceiling 87,920.
- New `readonly dropped: Record<PieceId, number>`: `add` increments it on cap. `buildDecor` stats gain `dropped` (the sum).
- Expected use: body ≈ 1,400 (far 750, stairs 133 + 190, lots 140, houses 70 + clusters 120), window ≈ 530, shutter ≈ 100, parapet ≈ 160, tank ≈ 45.
- If the zero-drop / ≤ 90 % test fails, move caps only within the 90k ceiling, and record the new line in this table.

## 8. Lanes, file ownership, engines, order

| Lane | Exclusive files | Engine | Risk |
| --- | --- | --- | --- |
| Step 0 | `src/adapters/render/animEvents.ts` | controller (verbatim §2) | low |
| L-ANIM-HERO | `heroPose.ts`, `heroRig.ts`, `heroView.ts`, `tests/adapters/heroPose.test.ts` | Sonnet (coupled channel layout; numbers fixed in §3) | medium |
| L-FX | `cameraFx.ts`, `dustPuff.ts`, `tests/adapters/cameraFx.test.ts` | hunter-pro, 3 runs (one file each) | low |
| L-ROPE | `src/app/ropeView.ts`, `src/app/ropePost.ts`, `levelView.ts`, `tests/app/rope.test.ts`, new `tests/adapters/levelBase.test.ts` | Sonnet (frame math, shared `ROPE_TIE`) | medium |
| L-AMBIENT | `decor/ambient.ts`, `tests/adapters/ambient.test.ts` | hunter-pro, 2 runs | low |
| L-UI | `src/adapters/ui/hud.css`, `src/adapters/ui/hud.ts` | hunter-pro, 2 runs (css, then ts) | low |
| L-TERRAIN | `decor/cluster.ts` + `tests/adapters/cluster.test.ts` (hunter-pro, 2 runs), then `placeDecor.ts`, `kit.ts`, `tests/adapters/decor.test.ts` (Sonnet) | split as listed | medium |
| Integration | `src/app/game.ts` hook lines (§2 and below); the `attachAmbient(g)` line in `buildDecor` | controller | low |

- After step 0, all six lanes are file-disjoint and run in parallel. The L-TERRAIN Sonnet part starts when `cluster.ts` is green.
- Each lane runs only its own vitest files plus `pnpm typecheck`.
- Haiku is the first fixer, then Sonnet. One Sonnet review seat per lane diff (never Opus).
- Ledger line per dispatch (Rule 3). `flag check <engine>` before each junior run.

**game.ts integration lines** (controller, after the lanes; nothing else in game.ts changes):
- **Latch:** §2. **Restart:** `restart()` calls `hudUi.objectiveIn()`, and so does the pan→play transition. **Timer pulse:** `hudUi.pulseTimer()` where `nextRouteIndex` grows, and on win.
- **onRender, before `heroView.update`:** set `hv.events/impact/deadCause/win (phase === 'won')/hookFlying (hk.state === HOOK_FLYING)`.
- **onRender, after it:** the dust triggers (§4), then `dust.update(frameDt)`; `ropeView.update(..., frameDt)` plus the pulses; `cameraFx.update(frameDt, animEv, animImpact, speed, cur.deadCause)`.
- Then `camX += fx.offX; camY += fx.offY; lookY += 0.5·fx.offY; fov += fx.fovAdd`, skipped while `phase === 'pan'`.
- **End of onRender:** `animEv = 0; animImpact = 0`.

## 9. done_when per lane

- **L-ANIM-HERO:** `node_modules/.bin/vitest run tests/adapters/heroPose.test.ts` exits 0 with cases H1–H12, and `pnpm typecheck` exits 0. The hero is still 23 meshes and < 1,500 tris. `/usr/bin/grep -n "new " src/adapters/render/heroPose.ts` shows only module-level or constructor lines.
- **L-FX:** `vitest run tests/adapters/cameraFx.test.ts` exits 0 (F1–F6). Typecheck 0.
- **L-ROPE:** `vitest run tests/app/rope.test.ts tests/adapters/levelBase.test.ts` exits 0 (R1–R7), and the existing trail, post-tie and 0.5 m clearance cases still pass. Post + span ≤ 1,000 tris.
- **L-AMBIENT:** `vitest run tests/adapters/ambient.test.ts` exits 0 (A1–A3).
- **L-UI:** `pnpm lint && pnpm typecheck` exit 0. A grep finds `prefers-reduced-motion` in hud.css. Screenshot check in the verification ladder, step 4.
- **L-TERRAIN:** `vitest run tests/adapters/cluster.test.ts tests/adapters/decor.test.ts` exits 0 (C1–C4, D1–D9). `pnpm validate:levels` exits 0, with the l1.json diff empty.
- **Integration:** the full ladder (§11).

## 10. Tests to add

**heroPose.test (L-ANIM-HERO):**
- H1: `CH_COUNT` 25, `POSE_COUNT` 9, `CLINGING === HERO_HANGING`.
- H2: idle for 8 s at dt 1/60 → SPINE_PITCH peak-to-peak in [0.04, 0.07], period 3.57 ± 0.2 s.
- H3: run at 8 m/s for 2 s → mean HEM_PITCH < −0.08, and HEM_ROLL changes sign at least twice per run cycle. Then speed 0: HEM_PITCH goes > +0.005 within 0.5 s, and |HEM_PITCH| < 0.01 at 1.5 s.
- H4: AE_JUMP → SQUASH ≥ 0.09 near 0.05 s and ≤ −0.07 near 0.12 s. Delta from baseline < 1e-6 after 0.25 s.
- H5: AE_LAND at impact 11 → SQUASH peak 0.14 ± 0.01 and HIPS_Y dip ≤ −0.2 against a no-event twin. Impact 2 → |Δ| < 1e-9.
- H6: AE_ATTACH at speed 10 → `swingVel` +1.2.
- H7: `hookFlying` with ropeDir (0, .7071, .7071) for 0.3 s → SHOULDER_FLEX_R = 2.356 ± 0.05.
- H8: AE_RELEASE → SHOULDER_FLEX delta 1.6 at t 0+, and 0 at 0.35 s.
- H9: state 4 → active POSE_CLING.
- H10: death cause 3 → channels at 2 s equal the CRUMPLE row ± 1e-3; cause 2 → DEAD_ROW. DEAD weight < 0.6 at 0.1 s.
- H11: `win` = 1 → POSE_WIN, mean SHOULDER_FLEX L and R > 2.2.
- H12: rig and ground. `applyHeroChannels` with SQUASH 0.1 → `body.scale` (1.05, 0.9, 1.05); HEM → `yoke.rotation`. In the settled DEAD, CRUMPLE, WIN and CLING poses, every joint's world y ≥ −0.05. No NaN for dt 0 or 0.1 under any overlay.

**cameraFx.test (L-FX):**
- F1: no events → offsets and fovAdd stay 0.
- F2: AE_LAND at impact 11 → max |offY| in [0.05, 0.10] in the first 30 ms, and < 0.002 at 0.6 s.
- F3: AE_RELEASE → fovAdd 5 ± 0.1 on the first frame, < 1 at 0.6 s.
- F4: two instances fed the same sequence give identical output. dt 0 changes nothing.
- F5: fovAdd ≤ 12 under any spam.
- F6: dust puff hidden at rest. After a trigger it is visible, scale is monotonic and opacity goes to 0; hidden at 0.4 s. 24 tris, not additive.

**rope.test and levelBase.test (L-ROPE):**
- R1: after `pulse(0.12)`, the mid ring's y differs from an un-pulsed twin by > 0.01 at 30 ms and < 0.001 at 1.5 s. Ring 0 and ring SEG are unchanged.
- R2: `wheel.rotation.x === −hook.s/0.065`.
- R3: on the first attached frame the sag is strictly between taut and flying.
- R4: the post's lowest vertex is at T − 6 ± 0.01. Two bracket boxes reach roof.min.x ± 0.02.
- R5: post + span tris ≤ 1,000, with 41 span rings.
- R6: ROPE_TIE trail still ends at the tie.
- R7 (levelBase.test): `buildLevelMeshes(l1)` has a brick vertex at y −20 ± 0.01 inside S0's x/z footprint.

**ambient.test (L-AMBIENT):**
- A1: after `onBeforeRender` at t = 1.3, the flag's top verts are unchanged and its bottom verts moved by 0 < |Δ| ≤ 0.05.
- A2: canopy verts moved ≤ 0.035, and the lowest vert moved ≤ 1e-3.
- A3: the attribute object identity is unchanged (no allocation).

**cluster.test (L-TERRAIN):**
- C1: same seed → same plan; seed 7 → a different plan.
- C2: over 200 seeds on band 35–59, slice [−13, 0]: houses lie within [xIn, xOut] and z within [z0 + 0.8, z1 − 0.8]; each gap is 0 or in [1, 3]; no overlap; storeys in 1..3 with |Δ| ≤ 1 between neighbours; `roofY = baseY + 2.8n`.
- C3: 2–4 houses per plan.
- C4: across the 200 seeds, ≥ 40 % of plans have a shared wall and ≥ 40 % have a gap.

**decor.test (L-TERRAIN):**
- D1: the derived constants are `LOT_STEP` 4.75 ± 0.01 and `SLICE_Z` 13.
- D2: lotY never increases as z decreases. Each adjacent slice Δ is 4.75 or 0 (floor).
- D3: every house body at |x| ≥ 16 has min.y = lotY(z) + 0.15 ± 0.05.
- D4: body height ≤ 8.41. Top of roof or parapet minus the paving ≤ 9.61.
- D5: one 10-box flight per Δ > 0 boundary, within |x| 30.9–33.5, with rises 0.475.
- D6: `userData.clusters.length ≥ 24`, all houses at |x| ≥ 35, all flat. The C2 rules hold on the built plans.
- D7: `stats.dropped === 0`. Body, window, shutter, parapet and tank each use ≤ 90 % of their cap.
- D8: `kitTriangleCeiling() ≤ 90000`. The instanced count uses `traverse` and is ≤ 16. The existing lane, collider and D1 cases still pass.
- D9: adjacent flags on a string differ in rotY by π.

## 11. Verification ladder (controller, in order)

1. `pnpm lint && pnpm typecheck && pnpm test && pnpm validate:levels && pnpm build`, all exiting 0. `git diff --stat src/core content/levels` is empty.
2. Budgets: `pnpm dev` with `?debug`, at the three ADR 0006 shots plus a mid-landing frame: calls ≤ 80 and tris ≤ 120k. `AdditiveBlending` count = 5.
3. Determinism: decor boxes and cluster plans are equal for seed 1729 twice. A grep for `Math.random` in the touched files finds nothing.
4. Motion check at 1920×1080 with 10-s captures; each item must be visible: idle breathing with hem and scarf drift at the spawn; the run hem trail and stop overshoot; the jump crouch-extend; the hard-landing squash, dust and shake; reach while the hook flies, the attach jolt, rope vibration and the wheel spin; hang leg swing; the release arm sweep; wall cling (route[1] approach, slow); the wall death and the hard-landing crumple; the win pose; the HUD pill, timer pulse and waypoint bob.
5. Terrain shots at 640×360 and 1920×1080: at the spawn the post is a square carved mast on brackets over the S0 base, not a plank; mid-route shows a stepped lot staircase on both sides, with flights; lot walls at x ±16; clusters with shared walls and gaps beyond |x| 35; no house over 3 storeys and nothing floating.
6. Perf spot check at pixel ratio 1.5: frame time within +10 % of main.

## 12. Cut-first list (in this order, if a budget, test or schedule fails)

1. Canopy sway
2. Reticle pop, win stagger and toast-in
3. Trolley wheel (−1 call)
4. Fell/hazard flail (DEAD_ROW fade alone stays)
5. Rope second harmonic
6. Camera acceleration FOV term (kicks stay)
7. Dust puff (−1 transient call)
8. Cluster tanks, pots and flags
9. Step flights (the lots stay)

Never cut: the event latch, cling pose, landing squash, hem sway and idle breathing; the 3-storey cap, the lots and the clusters; the zero-drop shutter fix, the post and the S0 base.

## 13. Consequences and risks

- **D1 vs "near" clusters.** Clusters sit at |x| ≥ 35 so that D1 holds (flat roofs inside 35 read as walkable). The user asked for them near the lane. `CLUSTER_MIN_X` is one constant, but lowering it below 35 means amending D1. That is the user's call.
- **Anticipation is post-takeoff.** A true wind-up needs a core `jumpDelay`, which is a gameplay change and deferred.
- **Latch heuristics.** The jump test is `grounded` 1 → 0 with vy > 2, and impact is `−prev.vy`. A ramp launch could false-trigger a jump overlay, which is harmless.
- **Non-uniform squash** skews Lambert normals by up to 12 %, which is invisible at hero scale.
- **Shared-geometry ambient.** All flags and trees move in phase; the alternate flags flip, which halves that.
- **Lot walls at |x| = 16** are 4.75 m faces beside the lane with no collider. The camera probe ignores them, so the camera can clip into one near the lane edge. That is the same precedent as today's column-0 houses.
- **S0 base and post mounts are visual only.** No collider is added, so `validate:levels` stays the proof of no gameplay change.
- **Caps.** Body use ≈ 1,400 / 1,650 and window ≈ 530 / 700 are estimates. D7 is the gate, and cap moves stay inside 90k.
