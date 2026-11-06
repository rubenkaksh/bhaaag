# ADR 0001: Feel model (rope defaults, hand-brake, momentum, touch, restart, light)

Status: Accepted 2026-11-05

## Context

The senior review (`docs/work-breakdown.md` section 1, findings #1, #2, #3, #8, #9, #10, #12) found that the v1 plan's feel numbers contradict its own hop spec:

- With `gravityFactor 0.7, drag 0.4, launchSpeed 3`, a 20 m hop at 22 degrees takes 4.1 s and arrives at 5.8 m/s (plan §4.2 promises 1.5-3 s and 9-16 m/s). Linear drag 0.4 caps speed near 6 m/s.
- One-hit death plus `vCling 6` plus real slide speeds (11-16 m/s) means every facade contact kills; "too low" has no skill answer.
- Momentum is discarded at each step (skid to 0, run 6 m/s, aim slows to 50%), so the flow is stop-and-go.
- The touch scheme (look-drag plus stick plus five buttons) is too dense; the checkpoint snapshot could capture a moving hero; restart (0.3 s freeze plus 1.2 s card) is slow; the sun placement backlights landing pads.

## Decision

**Rope defaults.** `gravityFactor 1.0`, `drag 0.05`, `launchSpeed 6`. A 20 m hop at 22 degrees takes 2.1-2.3 s and arrives at 11-16 m/s (checked by integrating §4.2 at 60 Hz).

**Hand-brake.** Holding REEL while Attached decelerates the trolley at about 10 m/s^2. No new button. It is the skill answer to "too low".

**Cling threshold.** `vCling` 7-8; default tuning value 7.5. **Decoy-cling rule (validator V9):** a decoy that ends in a cling must have `vImpact <= vCling - 1 m/s` (margin). The L1a facade beat is authored as a grazing approach (<= 20 degrees) or a brake tutorial.

**Momentum carry.** Landing turns horizontal speed into run speed, capped at about 8 m/s; a roll keeps it. **Chain window:** firing the hook within 0.4 s after landing seeds `v0` from the carried speed. The validator also samples run-up `v0`.

**Aim while moving.** Aiming works at full movement speed; the 50% slowdown applies only when standing still.

**Touch scheme.** Tap-to-aim on an anchor (screen ray gives an aim yaw/pitch in `InputFrame`, separate from the camera), one contextual action button (Hook -> Release -> Mantle/Brake), and JUMP. DROP is a swipe down.

**Checkpoint.** A canonical state: authored stand point, zero velocity, hook Idle. Not a snapshot of the landing moment.

**Restart.** The death overlay accepts input after 0.3 s and auto-restarts at 0.8 s. The cause is shown as a toast during respawn.

**Light and colour.** Sun key light 60-90 degrees to the side of the descent axis, sun disc at the frame edge. Pads are lit and catch rim light. Anchors and pads use `fog:false`.

**AC / Mirror's Edge reference.** Runner's vision highlights only the next on-route anchor (stronger pulse) and its landing pad; decoys get standard anchor gold with no pulse, and the effect fades with assist (on in L1a/L1b, off in L1c). Colour language is a strict three-role palette over a hazy, desaturated world: gold = interactive (anchors only), cream-white = safe, terracotta/dark rebar = danger.

## Consequences

- `content/config/tuning.json` and plan §3.9 take the new defaults; `vLethal` and `pipsAt` are removed, and the file contains no comments (invalid JSON).
- M2 implements hand-brake and slide-camera levers; M3 implements momentum carry, chain window, canonical checkpoint and the 0.3/0.8 s restart; M4 adds validator rule V9 and run-up `v0` sampling; M5 applies the lighting and palette rules.
- Every band that depended on arrival speed (cling, landing, release windows) must be re-derived against 11-16 m/s arrivals and re-validated.
- Touch input needs tap-to-aim fields in `InputFrame` (M2).
- Feel remains the top risk; a whitebox feel gate with outsiders at the end of M3 (work-breakdown finding #7) guards it.
