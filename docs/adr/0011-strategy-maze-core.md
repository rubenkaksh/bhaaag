# ADR 0011: Strategy maze core (fixed lines, trampolines, cushions, climb, graph level)

Status: Proposed 2026-11-10 (owner pivot recorded in `docs/lean-scope.md` Amendment 2026-11-10b).
Scout: `docs/scout/strategy-maze-rooftops.md`. Tracks: `docs/strategy-tracks.md`.

## Context

The owner pivoted (2026-11-10): trampolines and cushions on target houses, zipline fixed and only at
houses that have one, a maze through the roofs with dead ends and 1/2/n escape paths, levels as a
stretch Nagarkot -> Bhaktapur with road turnings, balcony landings and climbs to roofs, 100 houses if
feasible. Controls are a separate track; this ADR fixes the **action model**, the **level model**, the
**level format**, the **generator** and the **InputFrame** additions. Classic L1 and Chase must keep
working unchanged.

## Decision

### 1. Action model (sim, `src/core`)

All rules are geometric, 60 Hz, tuning-driven (`content/config/tuning.json`), no physics engine.

| Move | When | Rule |
|---|---|---|
| **Zip (fixed line)** | `world.lineOnly === 1`, hero grounded, feet inside a `ZipLine.zone` AABB (xz inside, y within `line.zoneTol`), HOOK/ACTION pressed | Fires the existing hook at `line.anchorId` with momentum seeding (same `hookFire` path as free aim; aim is bypassed). Outside a zone the hook never fires; `aimReason` returns `AIM_NO_LINE` (8). Rope physics, hand-brake, release, landing rules unchanged. Levels with `lineOnly === 0` (L1, Chase) are untouched. |
| **Jump** | grounded, JUMP | Existing `hero.jump` (4.5 m/s, ~1.03 m apex) with run momentum. Unchanged. |
| **Trampoline** | airborne, landing on a `World.tramps` slab (feet within 0.05 m of its top) | Never lethal. `vy = tramp.vUp` (9 m/s, ~4.1 m apex) `+ tramp.jumpBonus` (1.5) if JUMP is held at contact; horizontal speed kept, capped at `landing.carryCap`; event `HERO_EV_BOUNCE`; hero stays `HERO_AIRBORNE`. Checked before the hard-landing kill rule. |
| **Cushion** | airborne, landing on a `World.cushions` slab | Never lethal at any speed. Velocity -> 0, `landLockT = cushion.lockSec` (0.5 s, move input ignored while > 0), event `HERO_EV_CUSHION`, grounded. The haystack role: rare, visible, a destination. |
| **Ledge grab** | `world.climb === 1`, airborne, horizontal sweep blocked by solid `i`, the solid's top is in `[py + climb.reachMin, py + climb.reachMax]` (0.6..2.2 m above feet), `|vy| <= climb.vyMax` (8), head room free | Hero -> `HERO_HANGING` with `hangLedgeY`, `hangNx/Nz` (wall normal), `climbT = 0`; event `HERO_EV_GRAB`. Rope cling (`wallHit`, below `vCling`) also records the ledge when it is within reach, so Mantle works after a rope cling. Gated by the level flag `climb` (0 in L1/Chase) so their rope-preview verdicts stay bit-identical; the owner may switch it on for L1 later. |
| **Mantle / climb** | hanging, CLIMB held for `climb.holdSec` (0.35 s) | Hero placed on the ledge: `py = hangLedgeY`, pushed inward by `hero.radius + climb.mantleFwd`, grounded, velocity 0; event `HERO_EV_MANTLE`. JUMP while hanging = existing wall jump; DROP = let go. Balcony -> roof: balcony drop is 3 m, jump apex 1.03 m + reach 2.2 m >= 3 m, so a jump from the balcony against the wall grabs the roof edge. |
| **Drop** | grounded, walk off an edge | Existing fall; lethal above `landing.vyRoll` unless the target is a cushion/trampoline. |
| **Hazard** | feet inside a `World.hazards` AABB | `killHero(DEAD_HAZARD)` (cause already exists, unused). Generator paints the open hillside between houses as hazard bands so "fell to the ground" is an instant restart, not a walk. |

Unchanged: one-hit death, `vCling` 7.5 wall kill, momentum carry and chain window, hand-brake,
instant restart. `HeroState.landLockT` (already present, unused) becomes live.

**InputFrame additions** (`src/core/input.ts`, consumed by the sim; produced by the controls track):
- `BTN_CLIMB = 128` in `buttons` (held = climbHold). `pressed` bit as for other buttons.
- `taps: number` (0..3): completed tap count on the action area this tick. The sim ignores it in
  this ADR; reserved so the controls track can map double/triple tap to Jump/Drop without a core change.
- `copyInput` / `clearInput` updated. No other field changes; `aimYaw/aimPitch/hasAim` stay for L1/Chase.

**Tuning additions** (`DEFAULT_TUNING`, `tuning.json`, test schema):
`line { zoneTol 0.6 }`, `tramp { vUp 9, jumpBonus 1.5 }`, `cushion { lockSec 0.5 }`,
`climb { reachMin 0.6, reachMax 2.2, holdSec 0.35, vyMax 8, mantleFwd 0.3 }`.

### 2. Level as a graph

- **Node** = a standable platform: house roof, balcony (child of a house), road terrace, goal.
- **Edge** = a legal move between two nodes, derived from geometry with closed-form kinematics using
  the sim's constants (never authored by hand):
  - `jump`: run 6 m/s, vy 4.5, g 9.81; gap `<= 0.8 * reach(dTop) - 0.5` m, `dTop <= 0.6`, landing
    `vy <= landing.vyRoll` (13) unless the target is a cushion.
  - `tramp`: from a trampoline node, vy 9 (+1.5 with JUMP): `dTop in [-4, 3.5]` within the parabola.
  - `zip`: from a line zone to its fixed anchor's house: rope `len <= rope.maxLen` (35), slope within
    `rope.minSlope..maxSlope` (10..55 degrees) downhill, chord unblocked by other solids.
  - `climb`: wall-adjacent nodes, `dTop <= 3.2` (jump apex + reach), horizontal gap `<= 1`.
  - `drop`: roof -> own balcony, or roof -> a lower node whose landing `vy <= 13` (or cushion).
  - `road`: roof -> road terrace (drop rule), road terrace -> downhill roofs at road level (walk/jump).
- **Dead end** = node in `reach(S)` but not in `coReach(G)`. **Escape paths** = edge-disjoint S->G
  paths; the generator targets 1, 2 or n by construction (backbone + rejoining branches).
- Runner's vision (`route`) is empty in the maze; affordance colour only.

### 3. Level format (JSON + zod, `src/content/load.ts`)

`version: 1` schema extended with optional fields (old files keep loading):
`lineOnly?: 0|1`, `climb?: 0|1`, `lines?: [{ zone: box, anchor: int }]`, `tramps?: box[]`,
`cushions?: box[]`, `hazards?: box[]`. `World` gains `lineOnly`, `climb`, `lines: ZipLine[]`,
`tramps`, `cushions`, `hazards`.
The schema stays the format contract even though the maze is generated at runtime (the test validates
the generator output through `loadWorldFromObject`).

### 4. Generator (`src/content/strategy/gen.ts`, `graph.ts`; pure TS, seeded)

- Same 20 degree plane as L1 (`planeY(z) = GRADE * z - 8`) so `terrain.ts` works; extents extended
  (level ~460 m long, ~170 m drop; `terrain.ts` VALLEY_Z / TERRAIN_Z_MIN widened by the renderer track).
- Lanes `x in {-24, -12, 0, 12, 24}`, bands along z with gaps `{7, 9, 11}` m and per-house wall
  heights `{8, 11, 14}` m: on a 20 degree hill the next band is ~3-4 m lower per 10 m of z, so a
  move between bands needs a zip, tramp, jump-to-cushion or a taller receiving house. Wall height
  and band gap are the difficulty levers.
- Segments (z from top): Nagarkot ridge (~8 houses, view-tower spawn, first fork), upper hillside
  (~30), three road terraces (lateral flat strips at downhill-roof level, runnable, with turnings),
  lower hillside (~35), Bhaktapur town (~20 tight rows, leap-of-faith goal into a cushion).
- Algorithm: (1) place houses on the lane/band grid with seeded jitter; (2) random-walk a backbone
  S -> G choosing a move type per step and adjusting the receiving house (height, line, tramp,
  cushion) so the move's rule holds; (3) add a second rejoining escape branch; (4) grow dead-end
  branches (reachable, no way on); (5) emit hazard bands on the open ground between bands;
  (6) recompute ALL edges from geometry and assert BFS reachability (S reaches G) and at least one
  dead end. Seed is a constant (`STRATEGY_SEED`); the owner can change it to re-roll.
- Generated at runtime (`loadWorldFromObject(generateStrategyLevel(seed))`): no 50-160 KB JSON in
  the bundle; generator code is a few KB.

### 5. BFS check: yes, as a unit test

A pure-graph BFS over the generated edges runs in `pnpm test` (milliseconds) and asserts: S reaches
G, >= 1 escape path, >= 1 dead end, every node reachable from S. One sim-driven smoke test drives a
scripted bot through one instance of each move type (zip, tramp, cushion, climb) on a tiny fixture.
This is NOT the dropped sim validator (lean-scope item 2) and NOT a deploy gate. **Owner to confirm.**

### 6. Rendering (minimum, under ADR 0009)

One merged mesh per feature: line zones (gold pads), rope lines (one `LineSegments`) + posts, tramps
(cream slab, dark rim), cushions (cream thick slab). Per-anchor spheres and rings are skipped when
`lineOnly` (100 anchor draws would break the 55-call Low budget). House dressing (`dressHouses`,
laundry, flags) is off for the maze (`houseDress: false`). Hazards are not drawn (terracotta ground
tint is a renderer-track follow-up). Budget estimate: 100 houses x ~2 boxes + roofs merged by style =
5-7 draws; features 4-5 draws; well inside Low 55 calls; triangles ~25k.

## Consequences

- `src/core` gains world feature lists, four sim rules, one input bit, four tuning sections; L1 and
  Chase behaviour is bit-identical (`lineOnly 0`, empty feature lists; existing tests stay green).
- A third mode entry `strategy` in `src/app/modes/mode.ts` (label "Nagarkot Run") if cheap; else a
  documented hook in `game.ts`.
- Not verified by this ADR: phone frame time with 100 houses, feel of the climb hold time, whether
  2.2 m reach is too generous. Owner decisions flagged: BFS test (sec. 5), PRODUCT.md wording,
  seed re-roll policy, hazard = instant death vs. slow walk-back.

## Amendment 2026-11-13 (ADR 0013)
"Still exactly one such level" no longer holds: further levels are graph-driven (ADR 0013), each
a new lobby entry; this ADR's generated Nagarkot Run stays frozen as shipped. New levels set
`parkour: 1`, which adds auto-vault, airborne step-up, auto-mantle by stick and the landing slide;
with `parkour: 0` every rule in this ADR is unchanged. Section 5's "pure-graph BFS only" applies to
Nagarkot; graph levels are accepted by sim bots (ADR 0013 s3.6).
