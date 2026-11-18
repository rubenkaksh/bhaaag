# ADR 0019: Smooth run-up, kept momentum, stacked-slab ledges

Date: 2026-11-18. Status: accepted (owner phone test, round 2). Builds on ADR 0018 (sprint) and ADR 0011 (climb).

## Decision

- **Run-up.** `hero.runAccel` (14 m/s^2): a grounded hero speeding up along its heading (below the wanted speed) accelerates at `min(runAccel, accel)`. 0 to run (6) takes ~0.43 s instead of 0.15 s. Steering, braking and a released stick keep `hero.accel` (40) and `hero.friction`. `runAccel >= accel` is the old abrupt start. The sprint streak and `sprintAccel` ramp (ADR 0018) are unchanged, so the generator's sprint-reach constants hold.
- **Momentum.** `landing.carryDecay` (0 m/s^2): grounded, stick held the way the hero already moves and faster than the stick asks, the extra speed falls only by `carryDecay` (0 = it stays). It ends when the stick is released (friction), turned away (steering accel) or a wall stops the hero. Speed still enters the ground through the landing cap `landing.carryCap` 12 m/s (ADR 0018 unchanged), so rope release plus landing keeps up to 12 m/s.
- **Dragon Chase** keeps its tuned feel: `MODE_OVERRIDES.chase` sets `runAccel` 40 and `carryDecay` 40 (the old behaviour). Legacy-physics tests pin `tests/fixtures/legacyFeel.ts`.
- **Climb (finding).** Nothing dropped climb (not lean-scope, not an ADR: lean-scope line 34 still lists "climbs (balcony -> roof)"). `world.climb`/`parkour` are 1 on nagarkot-home and the touch/desktop CLIMB wiring is intact. The sim bug: nagarkot-home roofs are a wall body plus a 0.3 m roof slab stacked on it, and `recordLedge` rejected the body top because a surface stood above it, so no ledge was ever recorded. `recordLedge` now lifts the ledge to a stacked surface up to `LEDGE_STACK_MAX` (0.5 m) above the touched wall top. `tests/core/homeClimb.test.ts` jumps from every balcony of the real level and mantles onto its roof.
