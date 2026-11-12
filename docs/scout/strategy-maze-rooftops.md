# Scout: rooftop maze with fixed ziplines, trampolines and cushions

scouted: 2026-11-10 | re-validate: 2027-05 | tags: parkour, grapple, zipline, graph-level, procedural, web-game

Question: before designing the Nagarkot->Bhaktapur rooftop maze (owner pivot 2026-11-10, items 3-7),
what do the reference games and the open-source world already do that we should copy or reuse?

## Existing products (reference design, not code)

- **Mirror's Edge (2008, DICE).** Runner's vision paints the one intended route red; the level is a
  linear corridor dressed as a city. Momentum chain (roll keeps speed, wall-run, spring-board) is what
  our ADR 0001 already keeps. Lesson for the maze: colour marks *affordance* (what you can do here),
  never the route, or the maze is solved for the player.
- **Assassin's Creed (rooftops, 2007-).** Rooftop "highways": flat roofs are the fast road, gaps are
  risk, towers are view points, haystacks absorb lethal falls (leap of faith). Haystack = our cushion
  (lethal-landing absorber at specific spots, never everywhere). Lesson: a cushion is a *destination*
  you steer to, not a safety net under every drop.
- **Prince of Persia: Sands of Time (2003).** Rooms are small puzzles; the ledge grab is forgiving
  (reach ~2 m); you can always see the next hold. Lesson: ledge grab + hold-to-climb is the cheapest
  "vertical" move and makes balcony->roof trivial to teach; dead ends in PoP are always visible from
  the room entrance, never discovered after a one-way drop.
- **Grapple puzzle games on itch / CrazyGames** (Grapple Grip, Last Swing, Grappler, Castle Grab,
  Grappling Hook/jMonkeyEngine, "grappling_hook" tag). Common pattern: the hook only works on *marked
  fixed anchors*, pressing the action button attaches without free aim, release timing is the skill.
  Last Swing (mobile) uses hold-to-attach and one button. Lesson: "zipline only at line-houses with a
  fixed rope" is a known, mobile-friendly reduction of free-aim grappling; keep the one contextual
  button.
- **Spelunky / Downwell / Rogue Legacy style "drop mazes"** (one-way vertical descent, side rooms are
  optional). A hillside descent is one-way by gravity; dead ends are side rooms you cannot climb out
  of. Lesson: a dead end on a gravity-fed map is a *restart*, so it must be cheap (ours is, 0.8 s).

## Open-source and tools

- **Grammar's Edge** (eon-kyle.itch.io, UE5): procedural parkour layout via a move grammar
  (jump / climb / slide moves chained by reachability). Closed source, Unreal. Idea to copy: generate
  from the *move set* outward (place the next platform where a legal move lands), not from a grid.
- **Evan's Parkour Engine Editor** (impossibleevan.itch.io, open source, text `.epe` levels): editor
  only, no generator; levels are lists of boxes. Confirms a flat box list + separate "feature" lists
  is enough as a format (matches our zod JSON).
- **proof-engine `graph::level_gen`** (docs.rs, Rust): dungeon graph generator (spanning tree first,
  then extra edges for loops). The shape we want: backbone path S->G, dead-end branches, a second
  rejoining branch for "2 or n escape paths".
- **IGNF route-graph-generator** (GPL, road routing): too heavy and GPL; not used.
- No open-source web rooftop-parkour generator found that we could fork; nothing on npm.

## Options

1. Hand-build the 100-house level in JSON. Rejected: 100 houses x (walls, roof, balcony, lines,
   tramps, cushions) is >1000 boxes; unmaintainable and no dead-end guarantee.
2. Fork a dungeon-graph generator and map rooms to houses. Rejected: none in TS; the geometry
   (20 degree hill, kinematic move rules) is the hard part, the graph part is 40 lines.
3. **Own generator, moves-first (Grammar's Edge idea), graph BFS as the unit test.** Chosen.

## Near-misses
- Three.js "city generator" demos: visuals only, no gameplay graph.
- Yuka / three-pathfinding navmesh: pathfinding for agents, not reachability over jumps/ziplines.

## Decision
Build our own seeded TypeScript generator in `src/content/strategy/`, moves-first from the sim's own
constants, with a pure-graph BFS reachability test in `pnpm test` (not a CI deploy gate; lean-scope
item 2 still drops the sim validator). Colour marks affordance only. Details: `docs/adr/0011-strategy-maze-core.md`.

## Learnings
- Fixed-anchor grappling with one button is the mobile standard; free aim is the outlier.
- Haystack-style cushions work because they are rare and visible; a cushion on every roof removes risk.
- Generate from moves, test with a graph; never trust geometry generated from a grid to be playable.
