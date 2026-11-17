# Gyro camera spike (T343, throwaway)

Branch `claude/spike-gyro-camera-d76ff7`, never merged. Status: **not verified on device**
(build served on the LAN, QR printed, no phone run happened in this session).

## What was built
- `src/adapters/input/gyroLook.ts`: `GyroLook` class (DeviceOrientation, no deps).
- `src/app/game.ts`: 6 lines. `gyro.update()` then `gyro.yaw` / `gyro.pitch` are added to the
  yaw/pitch handed to `updateCamera`. Render-only: `lookYaw`, `InputFrame` and `src/core` untouched.
- UI: one small button, top centre, touch devices only (`pointer: coarse`). Desktop: no button, no listener.
  Tap while off = enable (permission), tap while on = recenter, long press (>500 ms) = off.
- Look-drag and tap-to-aim are unchanged (the button stops pointer propagation).

## Approach
- Offset = current orientation minus a recentred baseline, not an absolute heading, so the
  follow camera keeps owning the base direction.
- Yaw from `alpha` delta (wrapped to +-180), pitch from `beta` (portrait) or `gamma`
  (landscape, sign by `screen.orientation.angle`).
- Low-pass (0.15 per frame), 1.5 deg dead zone, clamp yaw +-60 deg, pitch +-25 deg.
- Drift: `alpha` drifts on phones without a good magnetometer, and is arbitrary on iOS (relative
  to start). Mitigation here is manual recenter. Baseline is taken on first event after enabling.

## iOS permission flow
- `DeviceOrientationEvent.requestPermission()` exists on iOS 13+; it must be called from a user
  gesture (the pointerup on the button) and returns `'granted' | 'denied'`. A denial persists until
  Safari is restarted/site data cleared. Android and desktop have no such function: just add the listener.
- **Secure context is required.** The LAN preview is plain `http://192.168.x.x`, where iOS Safari
  and Android Chrome both withhold orientation events. A real phone test needs HTTPS (the live
  GitHub Pages URL, or a tunnel/local cert). Not checked against current docs in this session
  (no web lookup); this is from prior knowledge, confirm before production.

## What to do for production
1. Persist the toggle in settings; show a first-run hint, not a permanent button.
2. Recenter also on respawn and on orientation change; a two-finger tap is a better gesture than a tap on the button.
3. Handle the CSS-rotated root (orientation switch in `adapters/ui/orientation`): confirm pitch/yaw axes there.
4. Decide interplay with auto yaw (`yawOff`) and overview camera; the offset is added after both.
5. Consider `AbsoluteOrientationSensor` / quaternion math to avoid Euler gimbal issues near beta 90.
6. Add a cap on how much the offset can hide the aim target; test with tap-to-aim.

## Risks
- Gimbal/Euler artifacts when the phone is held upright (beta near 90), alpha jumps.
- Camera collision pushes the arm in when the offset swings into a wall.
- Motion sickness from yaw offset combined with auto camera yaw.
- Battery/permission friction; iOS prompt can only be accepted once per Safari session.
- Landscape axis mapping untested.

## Phone run (owner)
`pnpm build && pnpm exec vite preview --host --port 4343`, open the LAN URL over HTTPS or
deploy the branch build to a private HTTPS host. Expect: tilt moves the view, tap button recenters.
