# Config scope: global vs per-mode

Rule: tunables are GLOBAL. One source: `src/core/config.ts` (`DEFAULT_TUNING`) merged with
`content/config/tuning.json`, resolved per mode by `resolveCfg(mode)` in `src/app/tuning.ts`.
A mode may override only what is listed in `MODE_OVERRIDES` (same file) and in the table below.
`tests/config/configScope.test.ts` fails on any other per-mode difference.

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
