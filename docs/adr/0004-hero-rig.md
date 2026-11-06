# ADR 0004: Hero rig (procedural mannequin, 6 poses + idle, code blend)

Status: Accepted 2026-11-06. Trims ADR 0003 section 3 per `docs/lean-scope.md`: no GLB, no mixer, no clips.

## Decision

**Silhouette.** A slim hooded free-runner (Faith / Assassin's Creed read) built from three.js Groups as joint pivots with capsule and box meshes. 1.8 m tall, origin at the feet, +z forward, +x the hero's left. Under 1,000 triangles (the test caps it at 1,500), no textures.

**Colours** (one shared `MeshStandardMaterial` per colour, roughness 0.85):

| Role | Hex | Parts |
| ---- | --- | ----- |
| cloth | `#2a2e35` | jacket, hood, arms |
| dark | `#181a1f` | trousers, gloves, shoes, pelvis |
| scarf | `#4e8784` | neck wrap and trailing tail, the only accent |
| face | `#5f5652` | shaded face patch under the hood (shows facing) |

Never gold, cream-white or terracotta: those belong to anchors, safe pads and danger. The dark figure reads against the hazy sunset sky and the pale rooftops; the teal tail streams back with speed and marks motion at 30 px.

**Joints.** swing (pivot at the grip, 2.0 m) → body → pelvis (0.965 m) → spine → head, scarf tail, shoulder L/R → elbow L/R; pelvis → hip L/R → knee L/R. 22 channels in `heroPose.ts` (`CH_*`): hips y/z offset, body pitch/roll, spine pitch/twist, head pitch, shoulder flex/raise, elbow, hip flex/spread, knee, swing pitch/roll, scarf.

**Poses.** idle, run, air (jump and fall mixed by vy, with a 1.5 Hz leg cycle while falling), hang, brake, roll, dead. Priority: DEAD > ATTACHED (brake ? brake : hang) > rolling > AIRBORNE > GROUNDED (run above 0.5 m/s, idle below 0.3 m/s).

- run: the cycle phase advances by `runCadence(speed)` = speed / (1.6 + 0.3 speed) cycles/s (cap 2.4); amplitude and forward lean grow with speed.
- hang: both hands overhead. The body aligns with `ropeDir` (unit vector from the hands to the hook, world space; a vector with y ≤ 0.2 means straight up) and swings on an under-damped spring (ω 4.5, ζ 0.3) driven by horizontal acceleration and speed, so braking swings the feet forward.
- brake: left hand up on the hook, leaning back, knees up, right arm out for balance. Same swing.
- roll: tight tuck, one full forward turn about the hips in 0.4 s, ending at 0 rad so the fade-out never spins.
- dead: slumped on the back, asymmetric limbs. Terminal while the state is DEAD (no other input changes it); leaving DEAD (respawn) snaps the weights instead of blending.

**Blend.** One weight per pose, exponential approach to the target: `w += (target − w)(1 − e^(−dt/τ))`, τ per target pose 0.04-0.12 s. Weights stay normalised; channels are the weighted sum of the pose rows. The scarf channel is smoothed separately from speed and vy.

## Interface

```ts
interface HeroPoseInput { state: number; speed: number; vy: number; brake: boolean; rolling: boolean;
  ropeDirX: number; ropeDirY: number; ropeDirZ: number; dt: number }
// GROUNDED=0, AIRBORNE=1, DEAD=2, ATTACHED=3 (heroPose.ts)
updateHeroRig(rig: HeroRig, input: HeroPoseInput): void // once per render frame
```

`heroPose.ts` is pure TS (testable, no three). `heroRig.ts` builds the meshes and writes the channels. `HeroView.update(prev, cur, alpha, dt?)` places the root, sets `rig.yaw`, fills `input.state/speed/vy` from the sim and calls `updateHeroRig(this.rig, this.input)`; the game sets `heroView.input.brake`, `.rolling` and `.ropeDir*`. No per-frame allocation.

## Consequences

- No hand pins: hands sit near the hook by pose tuning only (grip about 2.0 m above the soles).
- When the sim adds ATTACHED, rolling and brake state, the game only fills three fields; no rig change.

## Amended by 0005 (2026-11-06)

ADR 0005 D3/D7 replace the look; the interface, joint tree, channels, blend and the other six poses are unchanged.

- **Look.** The hooded runner becomes a stylised boy: hair cap (open hemisphere tilted back) over a small skin face, lathe torso in oat, crimson neck wrap with a two-strip tail, a new crimson waist sash with a tail off the left hip (swings with `CH_SCARF × 0.6`, no new channel), leather cross strap, gloves and shoes, dark trousers. 832 triangles (23 meshes), 6 shared stock materials (`HERO_COLORS`: top `#d9c6a2`, trousers `#2a2f3b`, crimson `#c4262e`, skin `#b98563`, hair `#1f1a17`, leather `#4a3426`), self-glow 0.18 (crimson 0.35). The "never cream or terracotta" rule above is relaxed to oat and crimson (D3). Test cap is now < 1,000 tris.
- **Skeleton constants** (`HERO_HIP_H`, `HERO_GRIP_H`, shoulder, arm lengths, `HERO_GRIP_X`) live in `heroPose.ts`, and `heroRig.ts` imports them. The rig exposes `handL`/`handR` joints at the grip point.
- **Hang.** The row hangs the body 7.5 cm low, leans back 0.1 rad and tucks the knees (about 1.0-1.15 rad). Each frame `writeHang` adds:
  - a pendulum sway (0.75 Hz, up to 0.06 rad, scaled by rope speed)
  - a roll lean away from the turn: `atan(speed · yawRate / g) × 0.6`, capped at 0.35 rad, from a smoothed yaw rate
  - legs that trail the swing velocity, plus an out-of-phase 0.9 Hz kick

  Then a two-bone arm solve puts both hands on the trolley point (±0.07 m, `HERO_GRIP_H`) with a slight elbow bend. Because the swing pivot is the grip, swing pitch and roll never move the grip. This supersedes "No hand pins" under Consequences, for the hang only; brake is still tuned by hand.
