# ADR 0002: Pitched tile roofs (sloped, slippery colliders)

Status: Accepted 2026-11-08

## Context

The graphics spec (`docs/graphics-spec.md`, Roofs) asks for pitched tile roofs that the hero can land on but that are hard to stay on. The world was AABBs plus walkable ramps. The core must stay portable (no physics engine, geometric rules only) and the level must keep the never-a-dead-end guarantee. Ledge-grab/mantle is out of scope.

## Decision

**Shape.** A `Roof` is a gable prism: footprint box with `min.y` = eave and `max.y` = ridge, `ridgeAxis` 0 (ridge along x, slopes face ±z) or 1 (ridge along z, slopes face ±x). A gable is symmetric, so yaw 0/180 and 90/270 collapse to these two values. Pitch is derived: `atan(rise / halfSpan)`. Level JSON: optional `roofs: [{min, max, ridge}]`, zod-checked (ridge above eave, footprint with area, ridge 0 or 1).

**Collider = two slippery ramps.** `addRoof` appends the two halves as ordinary `Ramp`s with `slip = 1` and `roofId` set. The existing ramp code already gives surface height, support, side/high-end blocking and per-tick snapping, so no new collision primitive was needed. Roofs are not in `solids` (solid indices in tests are unchanged); ramps of a roof are appended after the level's plain ramps.

**Landing.** `landHero` uses the support's normal: impact speed = speed into the surface along the normal (flat tops keep `-vy`, so old behaviour is bit-identical). The same `vyClean`/`vyRoll` bands apply. The normal component is removed; the tangential horizontal part becomes run speed (`carryCap` still caps it). A straight fall onto a 30° roof therefore hits about 13% softer than onto a flat top, and running into the uphill face hits harder.

**Slide.** Grounded on a `slip` ramp steeper than `roof.slipDeg` (15°), `moveFree` replaces normal ground control:
- gravity along the slope, horizontal projection `g sinθ cosθ`, downslope;
- kinetic tile friction `roof.mu · g cosθ` (0.2) against the motion;
- steering at `hero.accel · roof.control` (0.3, i.e. 12 m/s²) toward the wanted velocity, with its uphill part cut to `roof.uphillRun` (0.4, i.e. 2.4 m/s at most uphill);
- no full-friction stop with the stick released: on a 30° roof an idle hero keeps accelerating toward the eave (gravity term beats `mu`).
A slippery ramp wins a height tie with a solid, so the eave over its wall box stays slippery until the capsule is clear.

**Eave drop.** Leaving the slope keeps its vertical rate (`vy = (v · uphill) · tanθ`); then the normal airborne code and fall/landing/kill-plane rules apply. No new death rule.

**Hooks.** Unchanged: anchors may sit on a roof (a ridge finial). The rope-clip check still tests solids only, so a rope may visually graze a roof; the hero lands on the tiles when the feet meet them during the ride.

**Rendering.** `levelView` draws each roof as one gable prism mesh (two tiled slopes, two gable triangles) with the kit's `roof_tile` texture and a terracotta tint; exactly the collider, no overhang, so the drawn eave is where the hero slips off. Decor treats roof volumes as colliders.

**L1.** Decoys A and B (houses 2 and 4) get a 2 m gable (29.7°) on their wall box, ridge along z through the anchor, which becomes a finial 0.2 m above the ridge. Route roofs stay flat (the scripted route, preview and human-like gates are unchanged). Hooking a pitched decoy lands on the tiles and sheds the hero: a fall to the decoy's plot (8 m eave drop, a roll) or its downhill fence top, both of which walk back into the plot whose rescue stair leads to the route; or a lethal overshoot into the next plot. Asserted in `tests/content/roofs.test.ts`.

## Tunables (`tuning.json`, `roof`)

| Key | Default | Meaning |
|---|---|---|
| `slipDeg` | 15 | slopes at or below this pitch are walkable, even on a roof |
| `mu` | 0.2 | kinetic tile friction |
| `control` | 0.3 | fraction of `hero.accel` available on tiles |
| `uphillRun` | 0.4 | fraction of the wanted uphill speed that is kept |

## Consequences

- Plain ramps are unchanged except for the slope-aware landing normal.
- `pnpm validate:levels` is still the M1 placeholder; the never-a-dead-end checks for roofs live in Vitest (`tests/content/roofs.test.ts`, `tests/content/terrace.test.ts`) until the validator CLI exists. When it does, it must sample slides off each pitched roof.
- Golden trace `tests/golden/roof-slide.trace.json` pins the slide numbers for the GDScript port; re-record on purpose when the roof tunables change.
- Feel is untested by a human: slipperiness, the uphill cap and the roll-on-landing-uphill effect need a playtest.
