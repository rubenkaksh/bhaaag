# ADR 0018: Sprint (momentum run)

Date: 2026-11-17. Status: accepted (owner 2026-11-17b/c: "sprint after 7 steps, 11 m/s approved",
plus a visibly faster run animation). Card T334, `docs/plans/nine-points-plan.md`.

## Decision

`hero.run` stays 6 m/s. A grounded hero who runs 7 steps (`sprintStreakM` = 7 x 1.7 m = 11.9 m,
one step = half the 3.4 m run cycle) at >= 0.98 x run without stopping ramps to `sprintSpeed`
11 m/s at `sprintAccel` 8 m/s^2.

- **Where:** `src/core/sim.ts`, the grounded non-slip branch of `moveFree` only. Slip, landing
  slide, rope, hang, vault and air code is untouched. The ramp is gentle; steering and braking
  keep `hero.accel` (40).
- **State:** `HeroState.sprintM`, the metres run at >= 0.98 x run. Resets to 0 on a stop (stick
  released or speed below 0.98 x run), when not grounded (jump, fall, rope, hang, vault), on a
  slip or landing slide, and on any wall hit (the tick the wall stops the hero).
- **Landing carry:** `landing.carryCap` is 12 (`config.ts`, applied in `sim.ts`) and does not
  change: 11 < 12. The old "~8" in CLAUDE.md and ADR 0001 was wrong and now says 12.
- **Off switch:** `sprintSpeed <= run` disables it. Dragon Chase sets `hero.sprintSpeed` 6 in
  `MODE_OVERRIDES` (`src/app/tuning.ts`); every other mode sprints.
- **Render only:** `hero.sprintCadence` 0.2 (run cycle 20% faster at full sprint),
  `hero.sprintFov` 6 (extra degrees), and the run pose amplitude clamp in `heroPose.ts` is lifted
  from 1 to 1.6 so the lean and limb swing grow with speed. No HUD indicator.
- **Remote config shape:** all five keys are plain numbers in `content/config/tuning.json`,
  mirrored in `config.ts` DEFAULT (no remote value = the shipped tuning.json). A later Supabase
  read at run start (clamp, defaults on failure, anon key; vidanta remote-game-config pattern)
  can override them in `app/tuning.ts` `resolveCfg`. Not built here.

## Measured (flat ground, DEFAULT_TUNING, 60 Hz, jump at full stick)

| Quantity | Value |
| --- | --- |
| Run jump (6 m/s), take-off to touchdown, same level | **5.60 m** (0.93 s airborne) |
| Sprint jump (11 m/s) | **10.03 m** (0.93 s airborne) |
| Streak before sprint starts | 11.9 m (7 steps) |
| Speed-up distance, run to full 11 m/s | 11.9 m streak + 5.45 m ramp = **17.35 m** |
| Speed-up distance from a standing start | 17.85 m (2.75 s) |

T336a reach constants: run-jump reach 5.6 m; sprint-jump reach 10.0 m, valid only from a roof
with a straight runway of at least **17.4 m** along the jump axis (earlier steps of the jump
axis count only while the hero stays at >= 5.88 m/s). Air steer never slows a hero above
`airSteerCap` (6), so the sprint speed carries through the jump.

## Consequences

- Existing levels now allow the 10 m sprint jump from long enough runways. Levels whose gaps
  were tuned for 5.6 m can be skipped by a sprint; only the generated maze (T336a) is derived
  with sprint reach.
- Sim-driven tests that run the hero far at full stick see sprint speed unless they pin
  `hero.sprintSpeed = hero.run` through the cfg override.
