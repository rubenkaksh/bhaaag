# Config scope: global vs per-mode

Rule: tunables are GLOBAL. One source: `src/core/config.ts` (`DEFAULT_TUNING`) merged with
`content/config/tuning.json`, resolved per mode by `resolveCfg(mode)` in `src/app/tuning.ts`.
A mode may override only what is listed in `MODE_OVERRIDES` (same file) and in the table below.
`tests/config/configScope.test.ts` fails on any other per-mode difference.

## Global keys (apply in classic, chase, strategy, village)

| Key | Global default | Where it acts |
| --- | --- | --- |
| `camera.sideYawDeg / sideYawSpeed / sideYawEase` (T300) | 14 / 5 / 0.05 | `tickYawOffsets`, called from the one camera tick in `game.ts` |
| `camera.zipYawDeg / zipYawMinDiagDeg / zipYawEase` | 45 / 20 / 0.06 | same helper |
| `camera.smooth`, `armRelease`, `fovSpeed` (damping) | see config | `updateCamera`, all modes |
| `hero.airSteer / airSteerCap` | 14 / 6 | `core/sim.ts`, mode-blind |
| `tramp.airSteer / airSteerCap` | 12 / 6 | `core/sim.ts`, mode-blind |
| `aim.hintSec`, HINT pick | 4 | `app/hint.ts`, all modes except strategy (see below) |
| JUMP ignored on the rope, auto-exit, interpolation | n/a | `core/sim.ts` and the render loop, mode-blind |
| `chase.*` | see config | read only by chase code; other modes never read it |

## Per-mode differences (documented)

| Item | Global default | Override | Why |
| --- | --- | --- | --- |
| Config keys (`MODE_OVERRIDES`) | n/a | none in any mode | nothing is mode-specific today |
| Render-only camera tilt (`MODE_TILT_DEG`, `?tilt=` wins) | 0 deg | village 20 deg | owner-approved Cloud Village framing (T297); not a Tuning key |
| `chase.startGap` | 36 | `?dragonGap=N` debug param in chase | debug aid, chase-only key |
| HINT button | shown | hidden in strategy | `world.lineOnly`: no free aim, nothing to hint |
| Camera base rig (chase `frontPov`) | 0 = behind view | `chase.frontPov` 1 = ahead view | chase-only flag; yaw offsets still apply |

## History

The side-look and zip yaw were skipped in Dragon Chase (its camera branch returned before them).
Classic, Nagarkot Run and Cloud Village already shared one path and one cfg; Cloud Village was
simply the mode where the 20 deg tilt and its wide lateral lanes made the side look obvious.
