# Config scope: global vs per-mode

Rule: tunables are GLOBAL. One source: `src/core/config.ts` (`DEFAULT_TUNING`) merged with
`content/config/tuning.json`, resolved per mode by `resolveCfg(mode)` in `src/app/tuning.ts`.
A mode may override only what is listed in `MODE_OVERRIDES` (same file) and in the table below.
`tests/config/configScope.test.ts` fails on any other per-mode difference.

## Remote overrides (tuning without a new build)

Every number in `content/config/tuning.json` can be overridden by a remote JSON file. The baked-in values stay
the fallback; nothing here blocks the game.

- **Where the file is:** `?tuning=<url>` in the page URL (any build, handy for testing), else the build-time
  env `VITE_TUNING_URL` (set it when building, e.g. `VITE_TUNING_URL=https://example.com/tuning.json pnpm build`).
  Neither set: no fetch at all.
- **When:** fetched once at boot while the lobby is up (`src/app/main.ts`). A PLAY tapped before the fetch settles
  waits for it, at most 3 s (`TUNING_FETCH_TIMEOUT_MS`). The values are fixed for the whole run: `resolveCfg(mode)`
  reads them at game start and nothing changes mid-run. A new value reaches players on their next page load.
- **Format:** the same shape as `tuning.json`, any subset of keys. Omitted keys keep their baked value.
  Example:

  ```json
  {
    "rope": { "drag": 0.06, "brakeDecel": 12 },
    "wall": { "vCling": 8 },
    "camera": { "fov": 58 }
  }
  ```

- **Validation (per key, never the whole file):** a key is accepted only if it exists in the baked tuning and its
  value is a finite number. Unknown keys, wrong types and locked keys are skipped with one `console.warn` each
  (prefixed `[tuning]`); the rest of the file still applies. Values are not range-checked: keep them playable.
- **Locked:** `fixedHz` (60 Hz sim step). Changing it remotely is ignored.
- **Failure:** a timeout, network error, non-2xx status or invalid JSON falls back to the baked values silently.
- **Scope:** overrides reach `resolveCfg` (all runtime modes). `MODE_OVERRIDES` still apply on top, so a remote
  `hero.sprintSpeed` or `hero.runAccel` does not change Dragon Chase. `DEFAULT_TUNING` readers (maze and home
  generators in `src/content/strategy/`, chase defaults) keep the baked values, so level layouts stay deterministic.
- **Code:** merge and guards `src/app/tuningOverrides.ts` (pure); fetch `src/adapters/config/remoteTuning.ts`;
  init `initRemoteTuning` in `src/app/tuning.ts`; tests `tests/config/tuningOverrides.test.ts`,
  `tests/config/remoteTuning.test.ts`, `tests/app/tuningInit.test.ts`. No new dependency.

- **Supabase source (L2, `docs/plans/leaderboards-friends.md` section 8):** with no `?tuning=`/`VITE_TUNING_URL`, boot reads the
  `game_config` table (flat rows, key = dotted path) in the lazy `online` chunk, 1.5 s timeout, once per session (frozen, so a
  restart never changes physics). Only keys in `CLAMPS` (`src/app/remoteConfig.ts`) are accepted, values are clamped, the rest
  is dropped with a warning; any failure or no rows = baked-in defaults. A changed config has a new `cfgHash`, so publish with
  `node tools/publish-config.mjs values.json --apply` (writes the `cfg_versions` row first, then `game_config`). Table:
  `supabase/migrations/20261119000200_game_config.sql`. Tests: `tests/config/remoteConfig.test.ts`, `configScope.test.ts`.

### Keys (157 numbers, dotted paths; `tuning.json` is the authority)

- `physics`: g, airDrag, killPlaneBelowMin
- `rope`: gravityFactor, drag, terminal, launchSpeed, minLen, maxLen, minSlopeDeg, maxSlopeDeg, trolleyStop, handToFeet, hookSpeed, brakeDecel, legHazardKill
- `aim`: magnetDegDesktop, magnetDegTouch, routeAssistDeg, routeAssistLateDeg, routeAssistEarlyHops, snapRadius, previewHz, previewMaxSec, previewReleaseSamples, tapRadiusNdc, hintSec
- `release`: inputBufferMs, coyoteMs, jumpUp, jumpFwd, carry, hookCooldownSec, hookIntentSec, perfectLo, perfectHi, perfectBoost, perfectUp
- `landing`: vyClean, vyRoll, skidDecel, vhStumble, pad, carryCap, carryDecay, rollSec, chainWindowMs, edgeGrabH, edgeGrabBelowMin, edgeGrabBelowMax, edgeGrabVyMax
- `wall`: vCling
- `roof`: slipDeg, mu, control, uphillRun
- `hero`: walk, run, radius, stepUp, jump, height, accel, friction, runAccel, airSteer, airSteerCap, sprintSpeed, sprintStreakM, sprintAccel, sprintCadence, sprintFov, diveMinFall
- `camera`: dist, distSlide, fov, fovMax, shoulder, pitchMin, pitchMax, height, probeRadius, smooth, armRelease, downhillBias, fovSpeed, frontPitchDeg, zipYawDeg, zipYawMinDiagDeg, zipYawEase, sideYawDeg, sideYawSpeed, sideYawEase, sideYawEaseBack, pathLookahead, pathTurnDeg, overviewHeight, overviewPitchDeg, overviewEase, overviewMaxExtent, overviewNodes, overviewMargin, tiltDeg
- `validator`: minReleaseWindowTicks, minAimBand, aimSamples, releaseStride
- `assist`: slowmoScale, slowmoSec
- `chase`: startGap, v0, accel, vMax, gapMax, rubberK, catchGap, fogGap, slots, scoreHop, scoreClean, scorePerfect, gapBase, gapSpanLo, gapSpanHi, decoyBase, decoyGain, oneHouseBase, oneHouseGain, frontPov
- `line`: zoneTol
- `tramp`: vUp, jumpBonus, airSteer, airSteerCap
- `cushion`: lockSec
- `climb`: reachMin, reachMax, holdSec, vyMax, mantleFwd
- `vault`: minSpeed, maxH, maxDepth, sec, keep, coneDeg, clearH
- `slide`: minSpeed, sec, height, decel, minKeep
- `parkour`: airStepUp, grabProbe, autoMantleSec, stickDot
- Top-level `fixedHz`: locked (60)

## Global keys (apply in classic, chase, strategy, village)

| Key | Global default | Where it acts |
| --- | --- | --- |
| `camera.sideYawDeg / sideYawSpeed / sideYawEase / sideYawEaseBack` (T300, widened) | 40 / 2.5 / 0.07 / 0.035 | `tickYawOffsets`, called from the one camera tick in `game.ts`; full lean at 2.5 m/s sideways, slower ease back |
| `camera.pathLookahead / pathTurnDeg` (T346) | 30 / 60 | `PathCam.setLead` (`content/graph/pathCamera.ts`, `leadHeading`), called from `game.ts`: the path camera aims this many m ahead along the route so the nagarkot-home 90 degree corner turns before the hero lands; 0 = old landing-only re-aim. Manual look-drag still pauses it until the next landing. |
| `camera.overviewHeight / overviewPitchDeg / overviewEase / overviewMaxExtent / overviewNodes / overviewMargin` (hold-MAP view) | 30 / 65 / 0.08 / 120 / 15 / 1.3 | `adapters/render/overviewCam.ts`, blended in `game.ts` `tickCamera`; minimum height, steep pitch, per-tick ease in and out, max reach from the hero, how many nearest nodes ahead are framed, framing margin |
| Overview availability (`overviewAvailable(heroMode)`) | grounded or attached to the rope; airborne/hanging/dead: off | `overviewCam.ts`, wired in `game.ts` `stepBody` and `hud.setOverviewEnabled`, all modes; no tuning key |
| `camera.tiltDeg` (render-only pitch-down) | 20 | `game.ts` camera tick, all modes (was village-only) |
| `camera.zipYawDeg / zipYawMinDiagDeg / zipYawEase` | 45 / 20 / 0.06 | same helper |
| `camera.smooth`, `armRelease`, `fovSpeed` (damping) | see config | `updateCamera`, all modes |
| `hero.airSteer / airSteerCap` | 14 / 6 | `core/sim.ts`, mode-blind |
| `hero.sprintSpeed / sprintStreakM / sprintAccel` (ADR 0018) | 11 / 11.9 / 8 | `core/sim.ts` grounded non-slip branch only; sprintSpeed <= run disables it |
| `hero.sprintCadence / sprintFov` (ADR 0018) | 0.2 / 6 | render only: `heroPose.ts` cycle rate, `cameraRig.ts` fov boost |
| `hero.diveMinFall` | 6 | render only: metres above a cushion top before the swan-dive pose starts (`diveTrigger.ts`) |
| `tramp.airSteer / airSteerCap` | 12 / 6 | `core/sim.ts`, mode-blind |
| `vault.*` (minSpeed 2.5, maxH 1.1, maxDepth 0.7, sec 0.28, keep 0.9, coneDeg 45, clearH 0.1) (ADR 0013) | see config | `core/sim.ts`, global; acts only through `World.parkour` |
| `slide.*` (minSpeed 7, sec 0.6, height 1.0, decel 4, minKeep 2) (ADR 0013) | see config | `core/sim.ts`, global; acts only through `World.parkour` |
| `parkour.*` (airStepUp 0.5, grabProbe 0.3, autoMantleSec 0.25, stickDot 0.7) (ADR 0013) | see config | `core/sim.ts`, global; acts only through `World.parkour` |
| `aim.hintSec`, HINT pick | 4 | `app/hint.ts`, all modes except strategy (see below) |
| JUMP ignored on the rope, auto-exit, interpolation | n/a | `core/sim.ts` and the render loop, mode-blind |
| `chase.*` | see config | read only by chase code; other modes never read it |

## Per-mode differences (documented)

| Item | Global default | Override | Why |
| --- | --- | --- | --- |
| `hero.sprintSpeed` (ADR 0018) | 11 | `chase`: 6 (= `hero.run`, sprint off) | Dragon Chase keeps its tuned run pace; every other mode sprints |
| Camera tilt `?tilt=N` | `camera.tiltDeg` 20 | debug URL param, all modes | debugging only; no per-mode tilt any more |
| `hero.runAccel` / `landing.carryDecay` (ADR 0019) | 14 / 0 | `chase`: 40 / 40 (the old abrupt run-up and bleed-off) | Dragon Chase keeps its tuned pace; every other mode gets the smooth run-up and keeps landing/rope momentum |
| `chase.startGap` | 36 | `?dragonGap=N` debug param in chase | debug aid, chase-only key |
| HINT button | shown | hidden in strategy | `world.lineOnly`: no free aim, nothing to hint |
| Camera base rig (chase `frontPov`) | 0 = behind view | `chase.frontPov` 1 = ahead view | chase-only flag; yaw offsets still apply |

## Known exception: the maze graph

`src/content/strategy/graph.ts` (the Nagarkot Run reach model and generator) reads `DEFAULT_TUNING` directly, not the
merged per-mode tuning. Content generation must stay deterministic and independent of the runtime tuning
overlay, so the dead-end and route numbers are fixed by the defaults. If a mode override ever touches a hero/rope
key the graph uses, the generated level will not follow it.

## History

The tap-to-toggle LOOK mode (swipe look-around) was replaced by a hold-to-zoom-out bird's eye view (MAP button / L or M key): the player could not tell where the next path was, and a swipe look cost too much attention. The overview is render-only, never changes the sim or the stick direction, and eases back to the follow view on release. In Chase the danger vignette is unaffected.


The side-look and zip yaw were skipped in Dragon Chase (its camera branch returned before them).
Classic, Nagarkot Run and Cloud Village already shared one path and one cfg; Cloud Village was
simply the mode where the 20 deg tilt (then village-only, now global) and its wide lateral lanes made the side look obvious.
