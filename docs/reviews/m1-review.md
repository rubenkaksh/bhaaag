# M1 review (first playable), read-only, 2026-11-05

Scope: src/core, src/content/load.ts, src/app, src/adapters, index.html, tests, content/test/testworld.json.
Not run: tests, dev server (read-only brief). Findings come from reading code and tracing numbers by hand.

Checked by hand, no finding: the sim/rig yaw mirror in game.ts:27-29,85-86. With r = PI - c, sim forward (sin c, cos c) equals rig look (sin r, -cos r). Sim right (cos c, -sin c) equals minus rig right (cos r, sin r), so negating moveX is correct. Negating lookYaw is correct. Desktop and touch both emit +X = right and +yaw = right (desktop.ts:174, touch.ts:277), so both are covered by the same negation. Pitch sign needs no conversion.

## Findings, most severe first

### 1. BLOCKER: walking off a platform wedges the hero permanently (sim.ts:44-56, 159-166, 186; aabb.ts:202-244)
Scenario, in the shipped test world: stand on the 3 m platform (-12..-6, 0..3, -16..-10) and walk off the edge.
- The grounded sweep passes (the box top equals the feet). The centre crosses the edge by <= 0.1 m and `groundHeight` (centre only) finds no support, so the hero goes airborne.
- The same tick drops py by 0.00136 (sim.ts:183), putting the feet below the box top while the centre is within `radius` of the box. `sweptCapsuleVsAabb` reports "penetrating", so `hit=true, t=0` for ANY delta direction, including away from the box.
- `sweepAxis` returns 0, so vx and vz are zeroed. The hero falls straight down inside the wall's expanded volume and lands on the floor still penetrating.
- Grounded sweeps (baseY = py+0.4, box top 3 > 0.4) also see penetration. Every horizontal move returns 0 and the jump sweep zeroes vy, so the hero is stuck for good (until the kill plane or reload).
- The same thing happens when falling onto a platform with the centre outside but the rim over the box.
- tests/core/hero.test.ts:126 does not catch it: there is no floor below the box, so the hero falls into the void and the test only asserts `py<0, vy<0`.

Fix (both parts, otherwise the bug moves):
1. Ground support from the capsule footprint. In `groundHeight`, accept a box/ramp when the circle (px,pz,radius) overlaps its xz rect (clamp the point to the rect, compare distance² to radius²), not just the centre. The hero then stays supported until fully clear of the edge and never drops its feet into the side volume.
2. Sweep downward too. In the airborne branch (sim.ts:185), sweep dy<0 with `sweepAxis(..., 1, dy)` and land at the hit. Also make penetrating hits non-blocking when the motion increases separation, using `scratchHit.n*` against the delta sign. In `sweepAxis`, ignore a `t=0` hit whose normal dotted with the delta is >= 0.
Add a regression test: platform on a floor, walk off, then assert the hero reaches z beyond the edge + radius and `grounded===1` on the floor and that `pz` keeps increasing under forward input.

### 2. MAJOR: camera yaw/pitch are smoothed, so the view lags the direction the hero actually moves (cameraRig.ts:67-72, game.ts:103)
Movement uses the unsmoothed sim `camYaw` (sim.ts:107-110), but the rig eases yaw and pitch with k=0.25 per tick (time constant about 4 ticks, 70 ms). While turning, the hero runs where the camera will be looking about 70 ms later, so "forward" does not match the screen. On touch drag and mouse look it feels like input lag and stick drift.
Fix: set `rig.yaw = yaw; rig.pitch = pitchWanted` every tick. Keep smoothing only for `focus`, `fov` and arm release.

### 3. MAJOR: hero is interpolated, camera is not, so the hero shimmers on screen at any refresh rate other than 60 Hz (game.ts:99-123, 106-109)
`updateCamera` runs once per sim step from `cur`. `onRender` interpolates the hero mesh with alpha, but the camera pose only changes on steps. On a 120 Hz iPhone (two renders per step) or a 144 Hz monitor, the hero moves smoothly while the camera moves in 60 Hz jumps, so the hero oscillates relative to the frame.
Fix: keep `prevRig`/`curRig` poses and lerp them with alpha in `onRender`, or run `updateCamera` in `onRender` with the interpolated hero position. For the second option, use the sim `dt` for the smoothing, because the fixed step does not apply there.

### 4. MAJOR: the rotate overlay does not pause the sim (touch.css:115-119, game.ts, loop.ts)
CLAUDE.md locked decision and touch.ts:4 say portrait "pauses the sim". Only `visibilitychange` is wired. In portrait the overlay is CSS only: the sim keeps ticking and the camera runs. A thumb that was holding the stick keeps its capture, so the hero keeps running under the overlay and can walk off the map and die.
Fix: in game.ts add `matchMedia('(orientation: portrait) and (pointer: coarse)')`. On change, call new `loop.pause()`/`resume()` (reuse the `handleVisibility` logic: cancel rAF, `accumulator.reset()`, reset `last`) and clear the input. Needs a `TouchInput.reset()`, since `onBlur` is private. Also verify there is no `resize` or `orientationchange` race on iOS, where `innerWidth` is stale for a frame.

### 5. MAJOR: ramps are not collidable except on top (sim.ts:44-46, 59-69, 173; cameraRig.ts boxes arg; game.ts:103)
`World.ramps` is never swept, in sim or in the camera. Evidence:
- Walk into a ramp from its side, its high end or from underneath: the hero stays on the floor (ground height 0, ramp top > py+stepUp so it is not ground) and walks straight through the wedge, visible inside the mesh. In the test world this works on both ramps.
- The camera pulls in against `world.solids` only, so on a ramp, or when looking up from below, it passes through the ramp surface.
Fix: for hero, after each horizontal move, if `rampHeightAt(newx,newz) > s.py + stepUp` reject the move per axis (restore the old position and zero that velocity component). That gives a wall rule for ramps without new geometry. For the camera, generate side-wall and underside boxes for each ramp at load (a stepped box approximation is fine), or add a segment test against the sloped plane.

### 6. MAJOR (missing checklist item): debug HUD is not behind `?debug` (game.ts:67; plan section 8 M1)
The HUD is always created. Plan: "debug HUD skeleton (`?debug`)". It will also overlap the stick zone on phones and costs a DOM text write per frame.
Fix: `const hud = new URLSearchParams(location.search).has('debug') ? new DebugHud() : null;` and guard `hud?.update` in `onRender`.

### 7. MINOR: step-down then jump freezes horizontal motion (sim.ts:156-159 vs 186; aabb.ts:202)
Walk off a <= 0.4 m ledge (grounded sweeps ignore it, hero stays grounded at the lower height with the rim inside the ledge box), then jump within `radius` of the ledge. The airborne sweep uses baseY = py, so it sees the 0.3 m ledge as penetrated and returns 0 on every axis until the feet rise above it (about 70 ms). Horizontal velocity is zeroed meanwhile.
Fix: the same non-blocking rule for separating motion as in finding 1.

### 8. MINOR: camera arm collapses to zero when the lagging focus clips a wall corner (cameraRig.ts:79-121; aabb.ts:202)
`focus` is smoothed (k=0.25) and cuts inside convex corners, so it can enter a wall's probe-expanded volume (0.25 m). The sweep reports penetration (`t=0`) so `allowed=0`, `rig.arm` snaps to 0 (camera sits in the hero's head), and recovers only at `armRelease=0.05` per tick, about 1.3 s to reach 2/3. Reproduces by running round a platform corner at speed.
Fix: skip hits with `t===0` and a zero normal component along the sweep (treat as already-penetrating and ignore), or sweep from the hero's raw (unsmoothed) head position, or clamp `focus` out of boxes.

### 9. MINOR: look input quantisation discards the remainder every tick (desktop.ts:121-124, touch.ts:146-149)
`quantizeTurn(acc)` then `acc = 0`. One quantum is 0.0015 rad. At 0.0025 rad/px, a 1 px move becomes 2 units (+22 percent) and a 2 px move 3 units (-8 percent). Slow drags are uneven and sensitivity depends on mouse speed.
Fix: `const q = quantizeTurn(acc); acc -= dequantizeTurn(q);` (carry the residual).

### 10. MINOR: touch shell is not phone-ready (index.html:29-30, 38-39; touch.css:55-80; touch.ts stickActive)
- No stick base or knob is drawn: `stickActive` and the origin are public but nothing renders them. Same for the buttons: both are blank translucent circles, so Jump and Action are indistinguishable.
- `canvas { height: 100vh }` on iOS Safari is the large viewport, but `renderer.setSize` uses `innerHeight`, so the image is stretched vertically and the bottom is cropped. Use `inset:0; width:100%; height:100%` or `100dvh`.
- No `contextmenu` preventDefault and no `-webkit-touch-callout:none` on touch zones. A held stick on Android or iOS can trigger long-press callout or selection; a held thumb is exactly a long press.
Fix: render the stick base and knob from `stickActive`/`stickX`/`stickY` each frame, add glyphs to the buttons, switch to `dvh`, and add `contextmenu` and `gesturestart` preventDefault on the zones.

### 11. MINOR (bites in M2): DROP swipe vs look flick (touch.ts:277-299)
A downward flick of more than 80 px within 300 ms (about 270 px/s, a normal "look down" flick) raises `BTN_DROP`, and the same drag has already rotated the pitch. Also the tap path says the drag deltas are "dropped" (touch.ts:300), but they are already accumulated into `accYaw/accPitch` at line 277, up to 10 px of camera twitch per tap.
Fix: swipe check on a dedicated zone or a faster threshold plus an angle test (mostly vertical, dy > 2*|dx|), and subtract the stored deltas on tap-up.

### 12. MINOR: portable-core and determinism rule hits
- sim.ts:18-20: module-level scratch objects (`scratchBase`, `scratchDelta`, `scratchHit`). Allowed only by convention; GDScript port needs these passed in or owned by a context object.
- sim.ts:107,108,169: `Math.sin/cos/atan2` are not bit-reproducible across engines (V8 vs JavaScriptCore vs Godot libm). Golden traces and the validator (M3) will diverge across platforms. Use a shared table or own polynomial, or accept tolerances in goldens.
- sim.ts:183: magic `0.5` in the integrator (name it).
- game.ts:85-86: the mirror negation runs between `sample()` and `step()`. If the M3 trace recorder taps `frame` before this, replays desync. Record after the mirror, or move the mirror into the adapters/core convention.
- No allocation inside `step`, no closures, spread, destructuring, Map/Set, map/reduce, getters, union types or `Math.random`/`Date` found in src/core (grep clean).

### 13. MINOR: tests that do not test what they claim
- hero.test.ts:126 "walks off an edge and falls": asserts only `grounded===0, py<0`; passes while the hero is wedged (finding 1). No test with a floor below.
- hero.test.ts:146 "is deterministic" and cameraRig.test.ts:65: same code, same process, same inputs; it can never fail for a reproducibility bug. Replace with a pinned expected final state (golden numbers) after N ticks.
- cameraRig.test.ts:19: `toBeCloseTo(..., 1)` allows +-0.05 m on a 4.5 m arm; the rig uses `len = hypot(dist, shoulder)`, so the assertion cannot tell a full arm from one that is 4 percent short.
- Missing coverage: the game.ts mirror conversion (extract `camYawToRig` and the sign flips into a pure function and test it); desktop and touch adapters (multi-pointer, pointercancel, tap vs drag vs swipe) have no tests; no `GameLoop` pause/resume test (only `Accumulator`); no ramp descent, ramp-side collision, or jump-near-wall test.

### 14. MINOR: latent bugs and dead code
- game.ts:34-36: `mergeTuning` iterates `Object.keys(DEFAULT_TUNING)` including `fixedHz`, and `{...60, ...undefined}` gives `{}`. It only works because tuning.json contains `fixedHz`; if it is removed, `cfg.fixedHz` is an object and `GameLoop` throws. Skip non-object keys.
- desktop.ts:210-213: after Esc, Chrome refuses a new pointer lock for about 1 s and fires `pointerlockerror`, which sets `dragFallback=true` for good; `onClick` then never requests the lock again. Reset `dragFallback` on a later successful `pointerlockchange`, or retry on click when the failure was a cooldown.
- scene.ts:52-102: `createHelloScene` is dead code left from M0.

## Plan M1 checklist status
- core/math + swept capsule with tests: present. Hole: penetration semantics (finding 1).
- InputFrame, desktop + touch adapters: present (pointer lock, drag fallback, per-pointer capture OK). Gaps: findings 9-11.
- Fixed 60 Hz loop + interpolation, pause on hidden tab: present for hidden; interpolation is hero-only (finding 3); portrait pause missing (finding 4).
- Grounded controller, jump, walk-off to Airborne: works until the walk-off wedge (finding 1).
- Spring-arm camera with pull-in against core AABBs: present; ramps excluded (finding 5), corner collapse (finding 8).
- Test world 5 boxes + 2 ramps, mannequin, debug HUD `?debug`: world and mannequin present; `?debug` gating missing (finding 6).
- Device check on a phone: pending.

## Verdict
Not ready for a phone check: finding 1 (walk-off wedge) makes the test world unplayable after the first ledge, and findings 2-4 (view lag, camera jitter at 120 Hz, no portrait pause) will dominate the feel check. Fix 1-4 first.
