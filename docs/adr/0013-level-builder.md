# ADR 0013: Level builder and builder level files

Date: 2026-11-13. Status: proposed (owner ask 2026-11-13). Builds on ADR 0011/0012. Nagarkot Run
(`src/content/strategy/gen.ts`, `graph.ts`, ADR 0011/0012) stays frozen; nothing here edits it.

## Decision

Levels are authored in a dev-only browser tool and stored as **builder files**
(`*.builder.json`, format `bhaaag-level-builder` v1). A pure compiler turns a builder file into
the ordinary `LevelJson` the sim already loads (`load.ts`, zod). Every iteration is a new file with a new
`id`; compiling never mutates a file, and no existing level is touched.

## File format (`src/content/builder/format.ts`)

```
{ format, version: 1, id, name,
  houses: [{ id, x, z, lift, storeys: 1|2, balcony }],
  edges:  [{ id, a, b, kind: 'zip' | 'gap', via?: 'jump'|'tramp'|'cushion'|'boxes'|'stairs' }],
  start, goal }               // house ids
```

- **House**: fixed 8 m square footprint (same size for all, T308/T309 own the real sizing), centre
  (x, z). Altitude is not free: the roof is `planeY(z) + 7|11 m + lift` (storeys 1|2, the
  20 degree hill of ADR 0012), so the hill stays realistic and the descent comes from z. `lift` (>= 0 m)
  is a terrace for the rare ascent. Balcony is the old-Nepali uphill ledge (climb back to the roof).
- **Edge kinds** (owner decision): SOLID = `zip` (fixed zipline, one per source house); DASHED =
  `gap` crossed by `via` jump, tramp (pad on the source), cushion (on the target), boxes or stairs
  (solid steps emitted in the gap). TOUCHING = not stored: houses whose footprints touch (gap <= 0.25 m)
  are adjoining; the builder snaps them and the validator walks or hops across.
- Edges are directed (descent is the norm); boxes and stairs work both ways.

## Compile and validation (`compile.ts`)

`MazeNode`s are built from the houses and judged by the existing `graph.ts` rules (jump, tramp,
zip, grab, tight: closed-form kinematics from `DEFAULT_TUNING`). Not the sim: modelled, as ADR 0012.
A report lists: overlapping houses, declared edges the model refuses (with the reason), start to goal
reachable through valid declared edges and touching pairs, reachable on the full derived graph, dead-end
houses, edge-disjoint routes. The goal house gets a cushion roof, as in Nagarkot.
Stairs and boxes are geometry the model checks by limits (gap and rise), not by sim.

## Loading

The builder stores the compiled level in `localStorage` (`bhaaag.builder.play`) and opens
`?mode=strategy&level=builder`; `game.ts` loads it instead of the generator. No fifth mode, no level
select. The builder route (`?builder`) and its code are `import.meta.env.DEV` only and
dynamically imported, so the production bundle gains nothing.

## Mission note

PRODUCT.md lists multi-level content as a non-goal, and the lean scope allows one generated level.
This tool therefore ships no levels: builder levels are dev artifacts the owner plays locally. Shipping
one would need a PRODUCT.md amendment (owner's call).

## Not covered

Roads, terrain-following house placement beyond the plane, sim-verified stairs/boxes, momentum carry,
phone feel, best-time storage for builder levels (they share the strategy best key).
