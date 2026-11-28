# v1 item 1 diagnosis (T352 stuck hang, thin-air standing)

Status: Bug A diagnosed, not reproduced in the sim. Bug B not done (see end). Nothing fixed.

## Bug A: stuck hanging on a wall edge (T352)

**Cause (not confirmed as reproduced).** The sim has no exit from HERO_HANGING when no ledge is held:
- `src/core/sim.ts:801` `if (s.hasLedge !== 1) return;` in `hangStep`. A hang with `hasLedge = 0` only ends on JUMP or DROP.
- `src/core/sim.ts:748` `recordLedge` sets `hasLedge = 1` only when the top is in reach (`sim.ts:750`-ish, reachMin..reachMax 0.6..2.2 m) and the head room check passes. `wallHit` (`sim.ts:759-772`) still sets HERO_HANGING when no ledge is recorded, so a wall hit below the reach window (or with a blocked head room) gives a hang with no mantle.
- `mantleHero` (after `sim.ts:823`) teleports the hero to the stand point with no collision check, so a mantle that lands in another solid is not caught here.
- HUD shows CLIMB from `src/app/game.ts:696` only when `hasLedge === 1`, so "CLIMB shows, nothing happens" in the report fits a held ledge whose hold never completes, not `hasLedge = 0`.

**Evidence.**
- Test: `tests/core/stuckHang.test.ts`, both tests PASS now (`npx vitest run tests/core/stuckHang.test.ts`, 2 passed).
  - "a real hay-run edge hang leaves HERO_HANGING after holding CLIMB for 3 s": passes.
  - "no hang on any solid or ramp face in either level stays hung after 3 s of CLIMB": passes.
- Sweep (diagnostic run, 1,008 nagarkot-home and 384 hay-run probes, ledge heights 0.2-3.0 m above the feet, 4 faces each, then 3 s CLIMB hold and 120 ticks idle): 805 hangs reached, 0 with `hasLedge !== 1`, 0 stuck after CLIMB, 0 re-hangs after the mantle.
- Stuck spots found: none in either level under this probe. No coordinates to list.
- Mantle settle check (idle 120 ticks after the mantle): 57 hangs dropped more than 0.05 m. Examples (hay-run, solid index, face, top Y, settle drop): solid 58 -z top -0.89 drop -6.38 m; solid 59 -z top 0.28 drop -8.14 m; solid 45 -x top -3.44 drop -4.10 m; solid 52 -z top -11.46 drop -1.20 m. These are mantles that put the hero where it falls off the roof, not hangs that stick. Coordinates not extracted (partial).
- Not exercised by the sweep: the hillside climb (`startHillClimb`, `sim.ts:~850`), ladder zones (`sim.ts:1417`), and touch input. Touch CLIMB sends BTN_CLIMB only after a 350 ms hold (`src/adapters/input/tapGesture.ts:9`, `touch.ts:169`); a short tap in climb mode sends JUMP (`touch.ts:424`), which releases the hang.
- Not checked: the hay-run ladder box overlapping house 5's body (card note).

**Smallest fix I would suggest (not made).** Make hangs without a held ledge release (`hangStep`: when `hasLedge !== 1` after `wallHit`, call `releaseHero` after a short timeout, or make `wallHit` drop if `recordLedge` fails). Add a head-room check in `mantleHero` that refuses the mantle when the stand point is inside a solid, and log the refusal. Mantle onto a roof wider than `radius + mantleFwd` only, or fix the stand point for narrow roofs.

**Tests.** `tests/core/stuckHang.test.ts`: both tests pass now (neither fails). The T352 test as specified would fail only if a stuck spot exists; none found. To reproduce the owner report, the phone input path (touch hold/tap) or the hillside/ladder path needs a probe that is not written yet.

## Bug B: hero stands on thin air (Nagarkot Home, 2026-11-20)

Not done. The plan was to compare sim solid tops with the rendered house and terrain bounds for nagarkot-home and hay-run, and to write `tests/content/thinAir.test.ts`. I did not do this comparison. No findings, no test file.

## Test files
- `tests/core/stuckHang.test.ts`: 2 tests, both pass now.
- `tests/content/thinAir.test.ts`: not written.
