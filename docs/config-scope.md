# Config scope: global vs per-mode

Rule: tunables are GLOBAL. One source: `src/core/config.ts` (`DEFAULT_TUNING`) merged with
`content/config/tuning.json`, resolved per mode by `resolveCfg(mode)` in `src/app/tuning.ts`.
A mode may override only what is listed in `MODE_OVERRIDES` (same file) and in the table below.
`tests/config/configScope.test.ts` fails on any other per-mode difference.

## Global keys (apply in classic, chase, strategy, village)

| Key | Global default | Where it acts |
| --- | --- | --- |
| `camera.sideYawDeg / sideYawSpeed / sideYawEase / sideYawEaseBack` (T300, widened) | 35 / 2.5 / 0.07 / 0.035 | `tickYawOffsets`, called from the one camera tick in `game.ts`; full lean at 2.5 m/s sideways, slower ease back |
| `camera.lookYawMaxDeg / lookPitchMinDeg / lookPitchMaxDeg / lookDragDegPerPx / lookIdleSec / lookEase` (LOOK mode) | 170 / -25 / 40 / 0.3 / 4 / 0.08 | `adapters/render/lookOffset.ts`, ticked in `game.ts` `stepBody`, added to the camera yaw/pitch in all modes (button, L key, touch and mouse drag) |
| `camera.tiltDeg` (render-only pitch-down) | 20 | `game.ts` camera tick, all modes (was village-only) |
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
| Camera tilt `?tilt=N` | `camera.tiltDeg` 20 | debug URL param, all modes | debugging only; no per-mode tilt any more |
| `chase.startGap` | 36 | `?dragonGap=N` debug param in chase | debug aid, chase-only key |
| HINT button | shown | hidden in strategy | `world.lineOnly`: no free aim, nothing to hint |
| Camera base rig (chase `frontPov`) | 0 = behind view | `chase.frontPov` 1 = ahead view | chase-only flag; yaw offsets still apply |

## Known exception: the maze graph

`src/content/strategy/graph.ts` (the Nagarkot Run reach model and generator) reads `DEFAULT_TUNING` directly, not the
merged per-mode tuning. Content generation must stay deterministic and independent of the runtime tuning
overlay, so the dead-end and route numbers are fixed by the defaults. If a mode override ever touches a hero/rope
key the graph uses, the generated level will not follow it.

## History

LOOK mode (look-around toggle) and the wider side lean were added after device testing: the player could not tell where the next path was. The LOOK offset is render-only, sits on top of the follow view in every mode, and never changes the sim or the stick direction. In Chase the danger vignette is unaffected.


The side-look and zip yaw were skipped in Dragon Chase (its camera branch returned before them).
Classic, Nagarkot Run and Cloud Village already shared one path and one cfg; Cloud Village was
simply the mode where the 20 deg tilt (then village-only, now global) and its wide lateral lanes made the side look obvious.
