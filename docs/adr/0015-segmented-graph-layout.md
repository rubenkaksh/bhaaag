# 0015 Segmented graph layout (Home Street turns)

Status: partly implemented (WIP). Placer v1 is untouched when a graph has no `segments`.

## Decision
Optional `segments` in the graph format: `{heading: 0|90|180|270, nodes}`; consecutive runs share one bend node. Each run is laid out with the v1 `attempt()` logic in local coordinates (now `layout()`), rotated by `turnsOf(heading)` quarter turns (positions, faces, poleFace, runout, takeoff, tall, party, balcony, stairs), translated to the previous run's last house and merged. Hazards are per-run 1 m bands, cut by foreign houses and lowered under patches. spawnYaw comes from the first heading; killPlaneY sits under the lowest terrace. Edges carry `rot` so the sim bot rotates its recipes. `src/core` is untouched (nothing there needed to change).

## Design findings
- A bend must not sit on a zip target: the pole stands on the entry face, so a hairpin exit on that face is blocked (the bot stood against the pole). Home Street bends at 3, 5, 6, 7.
- A lone touch run may step sideways (v1 behaviour), so heading is only asserted for other runs.
- Tramp edges in segmented layouts reject drops over 8 m (the vault lands lethal); gated on the segment option so v1 is unchanged.

## Not done
View-only terrain/road following the polyline (`field` wiring in terrain.ts, levelView.ts, game.ts), pathCamera headings, hazard coverage at house 2, final freeze hash.
