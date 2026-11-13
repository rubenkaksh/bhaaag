# ADR 0013: Parkour houses, moves and graph-driven levels (T311, T312, T313)

Date: 2026-11-13. Status: proposed (architecture seat). Builds on ADR 0002, 0009, 0011, 0012.
Inputs: cards T311/T312/T313 (`config/queue/bhagdori.yaml`, outside the repo), owner sketches and
grill decisions in `docs/briefs/sketches-2026-11-13/` (graph.jpg, valley-layout.jpg, houses.jpg,
README.md; untracked in the main checkout, not committed here), read-only look at branch
`claude/level-builder-7cb08e`.

Locked by the owner (not reopened here): Nagarkot Run frozen; every new level = graph file + fixed
seed + its own lobby entry; solid edge = fixed zipline, dashed = jump/object gap, touching boxes =
adjoining houses; mostly one-way descent, rare short uphill via trampoline or stairs; one-hit death;
safe high-speed ground landings only on cushions, boxes, trampolines; new moves = auto-vault, ledge
grab + mantle, roll/slide (no wall-run), no new touch buttons; uniform houses, max 2 storeys, windows
on every visible wall, balconies, outside stairs, awnings, street props; primitives and stock
materials; `src/core` stays free of three/DOM. The journey should feel real, not gamey.

## 0. Ground rules for all three cards

1. **Nothing old changes.** Every new sim rule is gated by a new world flag `parkour` (0 in L1,
   Chase, Nagarkot Run, Cloud Village). No existing `DEFAULT_TUNING` value changes: `graph.ts`
   (Nagarkot) reads `DEFAULT_TUNING` directly, so a changed `climb.*` or `landing.*` default would
   silently re-roll the frozen Nagarkot level. New keys only, in new sections.
2. **Existing pieces before new ones.** Existing ledge grab + mantle (ADR 0011) and the existing
   landing roll (`landing.vyClean..vyRoll`, `rollSec`) are the base; T312 extends them, it does not
   rewrite them. Awnings are slippery ramps (ADR 0002 slide physics already exist).
3. **The sim is the acceptance**, not a kinematic model: new levels are accepted by bot runs through
   the real `step()` (section 3.6). `graph.ts` is not reused for new levels (different storey grid).

## 1. House kit v2 (T311)

### 1.1 Grid and dimensions (one size for every house)

| Item | Value | Why |
|---|---|---|
| Footprint | 8.0 x 8.0 m, yaw 0/90/180/270 | same as ADR 0012 and the builder branch; one size for all |
| Plinth | 0.4 m brick base | equals `hero.stepUp`: the hero walks onto it |
| Storey | 2.8 m floor to floor (the `STOREY` already in `placeDecor.ts`) | realistic; see the reach table |
| Roof deck (flat terrace) | ground + 0.4 + 2.8 n: **3.2 m** (1 storey), **6.0 m** (2 storeys) | n in {1, 2}, never 3 |
| Parapet | 0.25 m thick, **0.45 m** high (vaultable) or **1.2 m** (safety, not vaultable) | rule in 1.3 |
| Balcony (2-storey houses only) | deck 3.0 w x 1.2 d x 0.2 thick, top at ground + 3.2, centred on one face | first floor line |
| Balcony rail | 0.9 m over the deck, 0.1 thick, on the 3 open sides, gap 1.0 m on the side toward stairs | vaultable |
| Outside stairs | one walkable ramp (`slip 0`), 1.0 m wide, along a face, rise to balcony (3.2) or 1-storey roof (3.2), slope 35 deg (run 4.57 m) | ramp, not 16 step boxes; rendered as steps |
| Awning | single-slope slippery ramp (`slip 1`), 3.6 w x 1.5 d, high edge 2.7 at the wall, low edge 2.2 (18.4 deg > `roof.slipDeg` 15) | slides you off, breaks a fall |
| Zipline pole | zone 3 x 3 m slab, anchor 2.6 m over the target roof, 2.5 m in (ADR 0012) | unchanged convention |

Reach table (`DEFAULT_TUNING`: jump apex 1.03 m, `climb.reachMax` 2.2, grab margin 0.15):

| Move | Height | Verdict |
|---|---|---|
| Jump + grab up one storey (party wall, no parapet) | 2.8 m | OK, 3.08 reach, 0.28 margin |
| Balcony deck to roof edge (no parapet over a balcony) | 2.8 m | OK, same |
| Ground to balcony | 3.2 m | NO without a crate (0.9) or stairs: deliberate |
| Drop one storey | 2.8 m, vy 7.4 | roll (vyClean 7 < 7.4 < vyRoll 13) |
| Drop two storeys + 1 row of hill (~2.9) | ~8.9 m, vy 13.2 | lethal: needs a cushion, awning, tramp or line |

### 1.2 Jumpable pieces and their exact sim mapping

All pieces are emitted by one pure function, `emitHouse(spec)` in `src/content/house/houseKit.ts`,
into ordinary level JSON fields. Nothing in `src/core` knows about houses.

| Piece | Sim object | AABB (house frame: centre (cx, cz), ground g, deck D = g + 0.4 + 2.8 n) | style |
|---|---|---|---|
| Body | solid | x cx +-4, z cz +-4, y g-2 .. D (2 m into the hill) | 1 |
| Roof deck | top of body | same solid; its top is the walkable deck | 1 (body) |
| Parapet segment | solid per exposed side | outer 0.25 m strip of the footprint, y D .. D+0.45 (or D+1.2), minus party sides and minus the 3.4 m span over a balcony | 4 |
| Balcony deck | solid | 3.0 x 1.2 strip outside the face, y g+3.0 .. g+3.2 | 5 |
| Balcony rail | solid per open side | 0.1 thick, y g+3.2 .. g+4.1 | 4 |
| Outside stairs | ramp `slip 0` | 1.0 x 4.57 strip along the face, low edge at g, rise 3.2, slopeAxis toward the wall end | (ramp) |
| Awning | ramp `slip 1` | 3.6 x 1.5 outside a ground-floor face, y g+2.2 .. g+2.7, slopeAxis toward the wall | (ramp) |
| Crate (step) | solid | 0.9 cube, top g+0.9 | 6 |
| Box pile (absorber) | cushion slab | 1.6 x 1.6, top g+0.8; a solid 0.8 high under it | 6 |
| Hay cushion | cushion slab | 2.4 x 2.4, top g+0.9; solid under it | 6 |
| Trampoline | tramp slab | 1.8 x 1.8, top g+0.5; solid under it | 6 |
| Line zone + anchor | `lines[]`, `anchors[]` | as ADR 0012 | n/a |

"Ledges" need no marker type: the existing grab (`recordLedge`) and the new vault (section 2) read
solid tops and side faces geometrically. The contract between T311 and T312 is the numbers in this
table plus the vault band in section 2.1 (every 0.45 parapet, 0.9 rail and 0.9 crate is inside
it, every 1.2 parapet is above it).

### 1.3 Placement rules

- **Parapets:** none on a party side (shared wall with an adjoining house) and none over a balcony
  span. On any other side: 0.45 m where the side is a route takeoff (the placer marks it) or the
  surface beyond the edge is at most 6.5 m below the deck; otherwise 1.2 m. A lethal drop is never
  one auto-vault away.
- **Windows (every visible wall):** every face that is not a party wall gets, per storey, two
  window slots at +-1.8 m from the face centre, 1.0 w x 1.3 h, sill 0.9 m above the storey floor.
  A slot is dropped only where a balcony door (centre, first floor), stairs or awning covers it; an
  awning face gets a shop opening on the ground floor instead. Expected count
  `windows(h) = sum over exposed faces (2 * storeys) - blocked slots`; guard test asserts this
  formula and >= 1 window per exposed face per storey.
- **Storeys never depend on altitude.** `storeys` comes from the graph node (if set) or from the
  level rng, which is never fed z or ground height. Roof height = local ground + deck formula. Guard
  test: over 200 seeds, mean storeys of the top-third houses minus the bottom third is within +-0.25,
  and `emitHouse` has no z input except to place the box.
- **Street props** sit on street patches (section 3.3), never on roofs, except tramps on roofs only
  where a graph edge asks (none in valley-1).

### 1.4 Rendering and caps

- Render module `src/adapters/render/decor/houseV2.ts` reads `HouseSpec[]` + `PropSpec[]` (data,
  not solids) and fills the existing instanced kit. Reuse: `body`, `cornice` (storey band),
  `window` + `shutter`, `parapet`, `deck` (balcony), `rail`, `canopy` (awning, tilted), `tank`
  (roof clutter). **Two new piece ids only:** `stair` (one tread unit, 16 instances per flight)
  and `crate` (crates, box piles, hay as a tinted crate, tramp frame). ADR 0009 allows 24
  instanced meshes; T311 must show the count stays <= 24 in `budget.test.ts`, else `crate`
  merges into `tank`.
- Caps for a 20-house level (per house max): window 16, shutter 32, parapet 4, deck 1, rail 3,
  canopy 2, cornice 2, stair 16, crate 6. `pieceCaps(houses)` keeps scaling from the ten-house
  base; the guard asserts `refused === 0` for valley-1 and for a 20-house fixture.
- Low tier hides shutters, rails, canopies as today (`LOW_HIDDEN_DECOR`); parapets, decks, stairs,
  crates stay visible on Low because they are gameplay.
- Kit v1 (`placeDecor.ts` path) keeps drawing L1, Chase, Nagarkot and Village unchanged; v2 runs
  only for graph levels. T311 does not change v1 output (frozen levels look the same).
- Colour language: crates and hay cream (safe), tramps cream with dark rim, 1.2 parapets and gully
  edges terracotta, zones and ropes gold. Stock `MeshLambertMaterial`, no new textures.

## 2. Move set in the sim (T312)

All three moves run only when `world.parkour === 1`. Fixed 60 Hz, no allocation, deterministic.
New hero mode `HERO_VAULT = 5`; slide is a grounded sub-state (`slideT > 0`), not a mode, so app
code that switches on `mode` (action label, overview availability) needs no change: VAULT falls
into the "airborne" defaults (overview off, label JUMP).

### 2.1 Auto-vault (parapets, rails, crates)

Trigger (all must hold, checked in `moveFree` after the grounded horizontal sweep is blocked):
- grounded, horizontal speed >= `vault.minSpeed` (2.5 m/s; walking pace stops at a parapet),
- stick held with magnitude >= 0.5 and its direction within `vault.coneDeg` (45 deg) of the
  inward face normal (no vault from momentum alone),
- blocking face is a side face (ny = 0) of solid i, and its top is in (`hero.stepUp`,
  `vault.maxH`] above the feet: (0.4, 1.1],
- end capsule is free (`sweepVec` probe) at the end point below.

Two outcomes, chosen by the solid's depth along the travel normal:
- **Vault over** (depth <= `vault.maxDepth` 0.7): end point = far face + radius + 0.05, y = top +
  `vault.clearH` (0.1). After `vault.sec` (0.28 s) the hero becomes AIRBORNE with horizontal
  velocity = entry velocity x `vault.keep` (0.9), vy 0, and falls under the normal landing rules.
- **Vault onto** (deeper: crates, a box stack, a step): end point = near face + radius + 0.3 on
  top. After `vault.sec` the hero is GROUNDED there, speed x `vault.keep`, `chainT` set to the
  chain window.

During VAULT: position follows a fixed path (xz linear, y rises to top + clearH over the first 40%
then holds), no collision except the precheck, hook firing skipped (`tryFire` not called), kill
plane and hazards still checked each tick. State: `vaultT, vaultX0/Y0/Z0, vaultX1/Y1/Z1,
vaultOnto, vaultVx, vaultVz`. Event `HERO_EV_VAULT = 2048`.

Also new (same flag): **airborne step-up**. An airborne horizontal sweep blocked by a solid whose
top is at most `parkour.airStepUp` (0.5) above the feet, with vy <= 0, lifts the feet onto it
(lands, landing rules apply). Clipping a 0.45 parapet at the end of a jump lands you on the roof
instead of stopping you dead and dropping you down the wall.

### 2.2 Ledge grab and mantle (extend ADR 0011)

Existing rule stays: airborne probe toward the wall, ledge top in [`climb.reachMin` 0.6,
`climb.reachMax` 2.2] above the feet, |vy| <= `climb.vyMax` 8, head room free -> HANGING; CLIMB
held `climb.holdSec` mantles; JUMP = wall jump, DROP = let go. Parkour levels set `climb: 1`.
Changes, parkour only:
- **Forgiving probe:** probe distance `parkour.grabProbe` 0.3 m (the climb-level constant stays for
  Nagarkot).
- **Auto-mantle by stick:** while hanging, stick held toward the wall (dot with -normal >=
  `parkour.stickDot` 0.7) for `parkour.autoMantleSec` 0.25 s mantles, same placement code as the
  CLIMB hold. No new button: CLIMB hold on the action button still works (docs/controls.md).
- **Mantle is still instantaneous in the sim;** the 0.35 s climb-up look is a render blend in
  `heroPose.ts` keyed on `HERO_EV_MANTLE` (camera and pose interpolate from the hang point). Keeps
  the core simple and the hit test exact.

### 2.3 Roll and slide on landing

Existing roll stays exactly: vImpact in (vyClean 7, vyRoll 13] -> roll, carry capped at
`landing.carryCap`, above vyRoll -> death. Parkour adds the slide:
- **Landing slide:** flat-ground landing with vImpact <= vyClean and horizontal speed >=
  `slide.minSpeed` (7 m/s) and the stick held forward (within 45 deg of travel) -> `slideT =
  slide.sec` (0.6). While sliding: no stick acceleration, decel `slide.decel` (4 m/s^2), capsule
  height `slide.height` (1.0) for all horizontal sweeps, so the hero passes under awning lips,
  rails and laundry lines whose bottom is >= 1.0 m above the feet. If head room is < `hero.height`
  when `slideT` ends, the slide extends until clear, holding at least `slide.minKeep` 2 m/s. JUMP
  during a slide jumps with the slide speed. Event `HERO_EV_SLIDE = 4096`.
- **Slope slide** (awnings, pitched roofs): existing ADR 0002 `slideVelocity`, unchanged. The
  impact on a slope is measured along its normal (already true), so dropping onto an awning is the
  realistic way down a storey and a half.
- A hard roll impact (> vyClean) never becomes a slide: roll wins.

### 2.4 Interactions

| Rule | Interaction |
|---|---|
| One-hit death | Moves never kill or save on their own: after a vault or slide off an edge the landing rule decides. Safe high-speed ground landings remain only cushions (hay, box pile) and trampolines. |
| vCling | Untouched. Vault and slide are ground moves; a rope arriving at a parapet still uses `wallHit` (cling or die). `hook.ts` is not edited. |
| Hand-brake | Untouched (rope only). |
| Momentum carry | Vault keeps 90 %; slide keeps speed minus decel; `chainT` set on landing and on vault-onto, so a hook within 0.4 s still seeds `v0`. Carry cap unchanged. |
| lineOnly | Independent: graph levels are `lineOnly: 1, climb: 1, parkour: 1`. Zones are slabs, not solids, so they never trigger a vault. |
| Cushion lock | A cushion landing (`landLockT`) blocks vault and slide triggers (stick ignored). |
| Old levels | `parkour: 0`: every branch is skipped, behaviour bit-identical; existing humanlike, village, strategy and chase bot tests must pass unchanged. |

### 2.5 New tuning keys (new sections, appended to `Tuning`, `DEFAULT_TUNING`, `tuning.json`,
`docs/config-scope.md` global table)

```
vault:   { minSpeed: 2.5, maxH: 1.1, maxDepth: 0.7, sec: 0.28, keep: 0.9, coneDeg: 45, clearH: 0.1 }
slide:   { minSpeed: 7, sec: 0.6, height: 1.0, decel: 4, minKeep: 2 }
parkour: { airStepUp: 0.5, grabProbe: 0.3, autoMantleSec: 0.25, stickDot: 0.7 }
```

Global keys (no `MODE_OVERRIDES`); `configScope.test.ts` stays green because they act through the
world flag, not the mode.

### 2.6 Tests that protect it (T312)

`tests/core/parkour.test.ts`, small fixture worlds, one `it` per rule: vault over a 0.45 parapet at
run speed; no vault at walk speed; no vault without stick; no vault over 1.2; vault onto a 0.9
crate; vault over into a lethal drop kills by landing rule (not by vault); airborne step-up onto a
parapet; grab with the 0.3 probe; auto-mantle by stick after 0.25 s; landing slide passes under a
1.2 m bar and stops after; roll still at vImpact 8; death still at 13.5; all of the above inert with
`parkour: 0` (state equals the pre-change step). Existing bot tests are the regression gate.

## 3. Graph level format (T313)

### 3.1 File and schema

Files: `content/graphs/<id>.graph.json`, one per level, never edited after the level ships.
Schema in `src/content/graph/format.ts` (zod):

```ts
const node = z.object({
  id: z.number().int().min(1),
  storeys: z.union([z.literal(1), z.literal(2)]).optional(), // else rng
  balcony: z.boolean().optional(),                            // else rng (2-storey only)
});
const edge = z.object({
  a: z.number().int(), b: z.number().int(),
  kind: z.enum(['zip', 'gap', 'touch']),                      // solid / dashed / touching
  via: z.enum(['jump', 'tramp', 'cushion', 'boxes', 'stairs']).optional(), // gap only, required there
});
export const graphLevel = z.object({
  format: z.literal('bhaaag-graph'), version: z.literal(1),
  id: z.string().regex(/^[a-z0-9-]+$/), name: z.string(),
  placer: z.literal(1),            // placer version that built the shipped level (frozen)
  seed: z.number().int(),
  nodes: z.array(node).min(2), edges: z.array(edge).min(1),
  start: z.number().int(), goal: z.number().int(),
  decoys: z.number().int().min(0).max(12),
  profile: z.array(z.tuple([z.number(), z.number()])).min(2), // (z, groundY) knots, z decreasing
}).superRefine(/* ids unique, edges reference nodes, via iff gap, start/goal exist,
                 goal reachable from start over edges (touch both ways), profile non-increasing */);
```

Edges are directed a -> b (descent); `touch` is undirected.

### 3.2 Edge -> geometry

| Edge | Placement of b relative to a | Geometry emitted |
|---|---|---|
| `touch` | shares a full face with a (gap 0); side (+x/-x) 2/3 of the time by rng, downhill otherwise; roof difference in [-6.0, +2.8] m | no parapet on the shared sides; up one storey = jump + grab + mantle |
| `zip` | downhill, horizontal distance 14..26 m, lateral offset <= 8 m; rope slope in [13, 50] deg and length <= 32 m (3 m and 3-5 deg inside `rope.*`); chord clear of every placed body | zone on a's downhill half, pole + anchor on b |
| `gap` `jump` | face gap 2.0..3.5 m, roof difference [-3.0, 0] | 0.45 parapet on a's takeoff side |
| `gap` `cushion` | street patch between a and b (gap 4..6 m); hay at the foot of a; b's outside stairs land on the patch | patch, hay cushion, stairs on b |
| `gap` `boxes` | as cushion, but a box pile; crates (0.9) step up to b's balcony; b forced 2 storeys + balcony | patch, box pile, 2 crates, balcony |
| `gap` `tramp` | street patch; tramp at the foot of a; b's roof <= tramp top + 4.1 (apex) + 2.05 (grab) | patch, tramp, 0.45 parapet on b's facing side |
| `gap` `stairs` | street patch; a's drop to the patch <= 3.2 m (else the placer upgrades the via to cushion, logged) | patch, stairs on b |

### 3.3 From graph to hillside

1. **Order:** BFS from `start`; each edge places its b once (first visit wins; later edges between
   placed nodes are checked, not placed).
2. **Ground:** `groundY(z)` = piecewise-linear over `profile` knots. Houses sit on it; a house is cut
   into the hill (body starts 2 m below ground) so the downhill face shows the plinth.
3. **Storeys:** node value or rng(seed); if an edge rule fails, b's storeys are re-rolled from the
   rng (max 4 tries), never set from z.
4. **Uphill budget:** an edge is uphill if b's deck is > 0.3 m above a's. Allowed only on `tramp`,
   `stairs`, `boxes` or `touch`, each <= 2.8 m (one storey), at most max(1, floor(edges / 5)) per
   level. More = seed rejected.
5. **Street patches:** flat 6 x 8 m safe ground (no hazard), cream edge kerb.
6. **Gullies:** all other open ground between houses is a hazard strip (ADR 0012 convention),
   rendered as a drainage gully with a terracotta lip, so a bad fall is an instant restart, not a
   walk down the street. Street patches and the ground under awnings/stairs are not hazards.
7. **Decoys:** `decoys` extra houses (rng storeys, kit v2) touching placed houses or across a gap,
   never on a zip chord; some reachable (dead ends), some only scenery.
8. **Goal:** a hay cushion on a street patch below the goal house's downhill face: the leap of
   faith. `world.goal` = that cushion's box.
9. **Seed retries:** if any rule fails, try seed+1 .. seed+63. The placer returns the effective
   seed; the shipped file's `seed` is set to it (authoring time), so runtime never retries.
10. **Output:** `PlacedLevel { houses: HouseSpec[], props: PropSpec[], patches, lines, edges:
   PlacedEdge[], level: LevelJson }` with `lineOnly 1, climb 1, parkour 1`. `PlacedEdge` carries
   takeoff and target points for the bots.

The level is generated at runtime from the committed graph file (pure, a few ms, no big JSON in
the bundle). **Frozen means frozen:** `placer: 1` names the code path; once a level ships, placer
v1 and `emitHouse` v1 output for it may not change. `tests/content/graphFreeze.test.ts` stores a
hash of `JSON.stringify(level)` per shipped level; any drift fails. A new placer or kit version is a
new code path (`placer: 2`) used only by new files.

### 3.4 The first file: `content/graphs/valley-1.graph.json`

Owner graph: 10 nodes; 1-2 zip, 2-3 touch, 3-4 touch, 4-5 zip, 5-6 zip, 6-7 gap, 7-8 touch, 8-9
gap, 9-10 touch. Chosen `via`: 6-7 `cushion` (drop to the street hay, stairs up into 7), 8-9
`tramp` (the level's one short uphill). Start 1, goal 10, decoys 8 (valley sketch has 18 houses),
seed 20261113, profile `[[0, 0], [-60, -22], [-100, -32], [-130, -34]]` (steep upper slope, gentler
lower slope, near-flat valley floor). Owner can flip a `via` by editing one word before it ships.

### 3.5 Lobby entry wiring

- `src/content/graph/registry.ts`: `GRAPH_LEVELS = [{ id: 'valley-1', label: 'Valley Run', file }]`
  (file imported as JSON). One line per future level.
- `src/app/modes/mode.ts`: `GameMode = 'classic' | 'chase' | 'strategy' | 'village' | \`g:${string}\``;
  `GAME_MODES` appends `g:<id>` per registry entry; `parseMode` accepts registered ids only;
  `MODE_INFO` label from the registry, hint "Run, vault, grab: find the way down", `hopChip` false;
  `BEST_KEYS` `bhagdori.best.g.<id>`, timed like Classic.
- `src/adapters/ui/lobby.ts` renders `GAME_MODES` already; it only needs the portrait layout to fit
  5 buttons (screenshot check at 390x844).
- `src/app/game.ts`: `isGraph = mode.startsWith('g:')` -> `place(registry entry)` ->
  `loadWorldFromObject(placed.level)`; houses through `houseV2`, lines/zones through
  `strategyView` with its prop slabs skipped (`houseV2` draws props), terrain from `groundY`.
  Hint button hidden (lineOnly). `?mode=g:valley-1` works as a debug link.

### 3.6 Bot-guard acceptance (replaces the dropped validator for graph levels)

`tests/content/graphLevelBot.test.ts`, per registered graph level, through the real `step()`:
- **Route bot:** shortest start -> goal path over graph edges; per edge a recipe from `PlacedEdge`:
  `touch` (run across; if up, jump at the wall and hold stick -> grab -> auto-mantle), `zip` (walk to
  zone, HOOK, brake per style, release near the anchor), `jump` (run, JUMP at the takeoff mark),
  `cushion`/`boxes`/`tramp` (run off onto the prop, then stairs, crates or the bounce), goal (leap).
- **Four styles** (the humanlike `Style` shape plus one): precise (no noise); late (`lateTicks`
  6..12 on every JUMP and release); sloppy (+-0.3 m position target, +-4 ticks timing, +-10 deg
  heading); spammer (`singleShot: false`, JUMP/HOOK pressed every 4 ticks where legal). 25 seeded
  variants each, 120 s cap. **Pass:** precise 25/25, late >= 23, sloppy >= 22, spammer >= 22.
- **Every edge alone:** for each graph edge (not only the route), the precise bot spawned on a
  completes it alive and grounded on b. Catches an edge the shortest route skips.
- **Moves are used:** across the precise run, at least one `HERO_EV_VAULT`, one `HERO_EV_MANTLE`, and
  one roll or slide event fire.
- **Old modes unchanged:** existing `humanlike`, `villageHumanlike`, `strategy`, `strategyGen`,
  chase bot tests run untouched.
This is a unit test in `pnpm test`, not a deploy gate, and not the dropped never-dead-end proof.

### 3.7 Amendment text (T313 applies once, verbatim)

Append to `docs/lean-scope.md`:

> ## Amendment 2026-11-13 (graph levels; owner decided; recorded, not relitigated)
> Lifted from "Dropped" item 4 and the modes limit: new levels may be added, each as its own lobby
> entry, built from a graph file (`content/graphs/*.graph.json`) plus a fixed seed with house kit v2
> and the parkour moves (ADR 0013). A new iteration is a new level; shipped levels are frozen
> (placer version + hash test). Classic L1, Dragon Chase, Nagarkot Run and Cloud Village are frozen
> and unchanged. Each graph level is accepted by a sim bot-guard unit test (ADR 0013 s3.6); the
> validator and deploy gates stay dropped. Still out: a level-select screen beyond the lobby mode
> row, GLB, custom shaders, wall-run, new touch buttons. Bundle budget unchanged.

Append to `docs/adr/0011-strategy-maze-core.md`:

> ## Amendment 2026-11-13 (ADR 0013)
> "Still exactly one such level" no longer holds: further levels are graph-driven (ADR 0013), each
> a new lobby entry; this ADR's generated Nagarkot Run stays frozen as shipped. New levels set
> `parkour: 1`, which adds auto-vault, airborne step-up, auto-mantle by stick and the landing slide;
> with `parkour: 0` every rule in this ADR is unchanged. Section 5's "pure-graph BFS only" applies to
> Nagarkot; graph levels are accepted by sim bots (ADR 0013 s3.6).

`PRODUCT.md` (owner-owned; T313 proposes, applies only with the owner's OK): Non-goals line 3 and
the "no fifth mode, no level select" line gain "except graph levels per lean-scope Amendment
2026-11-13, each a lobby entry".

## 4. Task split (parallel T311 + T312, then T313)

### 4.0 Interface commit (first, before the fork; T312 agent, ~20 min, merged to main)

Files: `src/core/world.ts` (+`parkour: number`, default 0), `src/core/config.ts` (+`vault`,
`slide`, `parkour` sections, values of 2.5), `content/config/tuning.json`,
`tests/config/tuning.test.ts` (schema), `src/content/load.ts` (`parkour?: flag`, ramp `slip?:
flag` -> `Ramp.slip`, default 0), `docs/config-scope.md` (three global rows). No behaviour change.
Gate: lint, typecheck, test, build green on main. Both T311 and T312 branch from this commit.

### 4.1 T311 owns (render, decor, house content)

- `src/content/house/houseSpec.ts` (NEW: `HouseSpec`, `PropSpec`, `Face`, the 1.1 constants table,
  style codes 4 parapet, 5 balcony, 6 prop)
- `src/content/house/houseKit.ts` (NEW: `emitHouse`, `emitProp` -> level JSON fragments; window
  slot function `windowSlots(spec)` shared with the renderer)
- `src/adapters/render/decor/houseV2.ts` (NEW), `kit.ts` (two pieces, caps),
  `placeDecor.ts` (only shared helpers if needed; v1 output unchanged)
- `tests/content/houseKit.test.ts` (NEW), `tests/adapters/houseV2.test.ts` (NEW),
  `tests/adapters/decor.test.ts`, `tests/adapters/budget.test.ts`
- A demo fixture `src/content/house/demoStreet.ts` (6 houses, all piece kinds) used by tests.

### 4.2 T312 owns (core sim, hero animation)

- `src/core/sim.ts`, `src/core/hero.ts`, NEW `src/core/parkour.ts` (vault path, slide helpers)
- `src/adapters/render/heroPose.ts`, `src/adapters/render/animEvents.ts` (vault, mantle blend, slide pose)
- `tests/core/parkour.test.ts` (NEW), `tests/adapters/heroPose.test.ts`, `tests/adapters/animEvents.test.ts`
- `docs/controls.md` (one paragraph: vault and slide are automatic, mantle also by stick hold)

### 4.3 T313 owns (after both merge)

- `content/graphs/valley-1.graph.json`, `src/content/graph/format.ts`, `place.ts`, `registry.ts` (NEW)
- `src/app/modes/mode.ts`, `src/adapters/ui/lobby.ts` (+ `lobby.css` if 5 buttons need it),
  `src/app/game.ts`, `src/adapters/render/strategyView.ts` (skip-props option),
  `src/adapters/render/terrain.ts` (profile ground)
- tests: `graphFormat`, `graphPlace`, `graphLevelBot`, `graphFreeze` (NEW), `tests/app/mode.test.ts`
- `docs/lean-scope.md`, `docs/adr/0011-strategy-maze-core.md`, `PRODUCT.md` (with owner OK),
  `docs/level-layout.md` (one section), level-graph skill drawing

No file appears in two lists. T311 and T312 share only the interface commit and this ADR's numbers.
`game.ts`, `mode.ts`, `load.ts` after 4.0 are touched by T313 only.

### 4.4 Interfaces fixed now

```ts
// src/core/world.ts (4.0)
parkour: number; // 1: auto-vault, airborne step-up, auto-mantle, landing slide (ADR 0013)
// src/core/hero.ts (T312)
export const HERO_VAULT = 5;
export const HERO_EV_VAULT = 2048;
export const HERO_EV_SLIDE = 4096;
// HeroState: vaultT, vaultX0, vaultY0, vaultZ0, vaultX1, vaultY1, vaultZ1, vaultOnto, vaultVx,
// vaultVz, slideT (all copied in copyHeroState)
// src/content/house/houseSpec.ts (T311)
export type Face = 0 | 1 | 2 | 3; // +x, -x, +z, -z
export interface HouseSpec {
  id: number; cx: number; cz: number; groundY: number; storeys: 1 | 2;
  party: [boolean, boolean, boolean, boolean];
  balcony: Face | -1; stairs: { face: Face; to: 'balcony' | 'roof' } | null;
  awnings: Face[]; takeoff: Face[]; pole: boolean; tall: Face[]; // tall = 1.2 m parapet sides
}
export interface PropSpec { kind: 'crate' | 'boxPile' | 'hay' | 'tramp'; x: number; z: number; groundY: number; yaw: number }
export function emitHouse(h: HouseSpec, out: LevelJsonDraft): void;
export function emitProp(p: PropSpec, out: LevelJsonDraft): void;
```

The placer (T313) decides `takeoff` and `tall`; T311's kit obeys them.

## 5. Risks and owner calls

1. **Auto-vault into a lethal drop (one-hit death feels unfair).** Mitigated by speed + stick +
   1.2 m parapets on lethal sides. Watch it in the first phone test.
2. **Frozen levels drifting** because they are generated at runtime. Mitigated by `placer`
   versioning + hash test. Any shared code (`emitHouse`, `groundY`) change that moves a shipped
   level fails CI-locally; fix by versioning, never by re-hashing.
3. **Two level formats.** The unmerged `claude/level-builder-7cb08e` branch defines
   `bhaaag-level-builder` (houses with x/z, 7/11 m storeys) and also claims ADR number 0013.
   Recommendation: this ADR keeps 0013 (cards reference it); the builder ADR becomes 0014; the
   builder later edits graph files (or exports them), and its own format does not ship levels.
4. **Draw calls and instanced meshes.** Windows on every wall + stairs + crates: +2 instanced
   meshes, ~300 window instances for 18 houses. Budget test must prove Low <= 55 calls, <= 24
   instanced meshes.
5. **Lobby as a level select in disguise.** Each level = a lobby button; at 5+ buttons portrait
   wraps. PRODUCT.md still names level select a non-goal: owner must amend it (s3.7).
6. **Hazard gullies vs "feel real".** Without lethal open ground the street becomes the route.
   Gullies with a terracotta lip are the realistic framing; owner to confirm.
7. **Grab margin 0.28 m** for a one-storey climb; a sloppy bot may miss. If the sloppy style fails
   there, raise `parkour.grabProbe`, never `climb.reachMax` (frozen default).

Recommend the owner veto or change:
- **Veto "slide under on demand".** It needs a crouch input (a new button). The landing slide
  passes under low obstacles automatically; that is all this batch builds.
- **Move T311's 390x844 screenshots to T313.** T311 has no playable level to screenshot without
  touching `game.ts` (T313's file); T311 proves itself with unit tests and the budget test.
- **6-7 = cushion, 8-9 = tramp** in valley-1 is this seat's pick for the dashed edges; flip if wanted.

## 6. Acceptance per card

**4.0 interface commit:** new keys load from `tuning.json`; `parkour`/`slip` optional in level JSON;
every existing test green; lint, typecheck, test, build green.

**T311:**
- `emitHouse` guard tests: storeys in {1, 2}; deck heights exactly 3.2 / 6.0 over ground; window
  count equals the formula and >= 1 per exposed face per storey; no parapet on party sides or over
  balconies; parapet heights only 0.45 or 1.2; balcony top 2.8 below a 2-storey deck; no input but
  the spec (no altitude dependence); 200-seed storey/altitude test within +-0.25.
- Every vaultable piece top (0.45 parapet, 0.9 rail, 0.9 crate) lies in (0.4, 1.1]; 1.2 parapet above.
- `houseV2` on `demoStreet` and a 20-house fixture: `refused === 0`; budget test Low <= 55 calls,
  instanced meshes <= 24; v1 levels render unchanged (existing decor tests untouched and green).
- lint, typecheck, test, build green. (Screenshots moved to T313, see s5.)

**T312:**
- `parkour.test.ts` cases of s2.6 pass; all moves inert at `parkour: 0`.
- Existing bot tests unchanged and green in every mode; no `DEFAULT_TUNING` value changed (diff of
  the old sections is empty).
- No three/DOM import in `src/core` (lint); `heroPose` blends for vault, mantle, slide covered by
  tests; `docs/controls.md` updated; lint, typecheck, test, build green.

**T313:**
- `valley-1.graph.json` parses; placer deterministic (same file -> same JSON); uphill budget and
  zip slope/length rules hold; storeys independent of altitude (the T311 check on placed houses).
- `graphLevelBot` passes all four styles at the thresholds, every edge alone, moves used;
  `graphFreeze` hash recorded.
- Lobby shows "Valley Run"; `?mode=g:valley-1` loads; best time stored under its own key;
  Nagarkot, Classic, Chase, Village unchanged (their tests untouched and green).
- lean-scope and ADR 0011 amended with the s3.7 text; PRODUCT.md only with owner OK.
- 390x844 screenshots at the top and bottom of valley-1 (portrait), lobby with 5 entries; level-graph
  skill drawing of valley-1 attached; lint, typecheck, test, build green.
