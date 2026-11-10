# ADR 0010: Dragon Chase mode (Track 3)

Status: accepted, 2026-11-10. Spec: docs/three-track-plan.md (C1-C7, D2).

## Decisions
- C1 Endless rows: a stateless `rowSpecInto(seed, r)` generator; rows 0-3 equal the L1 opening (tested against l1.json). Rows live in 6 ring slots (row r in slot r % 6), rewritten in place; parked entries sit at y = -1e4. Collision world arrays never change length.
- C2 Catch rule: 1-D. gap = dragonZ - heroZ, caught at gap <= 2.5. Speed = min(vMax, v0 + accel*t) plus a rubber band (k 0.4) above gapMax. No mercy slowdown. Caught kills the hero (deadCause 7).
- C3 Scoring: metres + 25/hop + 10/clean + 10/perfect.
- C4 Cloud cover: `GameScene.setCloudCover` only scales sky-cloud opacity, so game.ts drives scene fog, the sun light and a DOM `#chase-cloud` layer directly from `cloudCoverFor(gap)` (fogGap 22). Base fog/sun are re-captured on every tier change.
- C5 Rendering: ChaseRowsView rebuilds the row meshes on a streaming epoch (about 6.4 ms, over the 4 ms target; accepted, it happens once per row). endlessGround is a periodic strip snapped by (0, GRADE*dz, dz), cast-shadow exempt.
- C6 Dragon: 24-node spine, InstancedMesh puffs (stock Lambert, instance colour), one bat wing with bone puffs and a membrane fan, one eye mesh and one additive glow sprite: 5 draw calls. Puffs 48/110/160 body, 48/90/120 wing (low/medium/high). Wisps NOT built.

## Deviation
SLOT_SOLIDS = 21 (3 houses x 6 parts + decoy wall + 2 side walls), not the plan's smaller figure.

## Numbers
Dragon v0 4.4, vMax 13.5, accel 0.045, startGap 36, gapMax 45. Bots: casual 7.3 m/s caught at 109-124 s (score ~1750-2150); chain 11.3 m/s caught at 160-194 s (3900-5200); expert ~14 m/s. A stalled hero is caught in ~7.6 s.
Budget (chase vs Classic, same run, SwiftShader): +6 calls, +12k triangles at every tier; script reports 0 over. jsMs about 0.1-0.7.
