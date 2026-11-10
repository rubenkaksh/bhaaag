# Product

<!-- impeccable:product-schema 1 -->

## Platform

Web (three.js, Vite). Landscape and portrait on phones; desktop (pointer lock + WASD) and touch from day one. Hosting: Cloudflare Pages.

## Users

UNCONFIRMED: owner to fill. (Repo only implies phone and desktop browser players of a short Miniclip-style game: "open the link, play".)

## Product Purpose

Zipline Tole is a third-person, single-player web game: fire a zipline hook at marked anchors and slide house to house down a Newari-themed Kathmandu hillside at golden hour. Bad landings kill, restart is instant (`docs/lean-scope.md`). Per the lean scope, one hand-tuned rooftop descent (L1) playable in under 2 minutes, light on load and on the phone (JS bundle under ~600 KB gzipped).

Success: PROPOSED (inferred from `docs/lean-scope.md` Goal and Budget sections): a first-time player opens the link, plays the L1 descent in under 2 minutes per run and retries instantly after dying, with the JS bundle under ~600 KB gzipped; owner to confirm.

PROPOSED 2026-11-10b (strategy pivot, `docs/lean-scope.md` Amendment 2026-11-10b; owner to confirm the wording):
- Purpose addition: Zipline Tole is also a rooftop **strategy maze**. In the Nagarkot->Bhaktapur run the player reads the roofs ahead, picks a path through ~100 houses (fixed ziplines only at line-houses, trampolines, cushions, balcony->roof climbs, road turnings) and learns which branches are dead ends. Dying is cheap; planning is the game.
- Success addition: a first-time player finds at least one escape path to Bhaktapur within 10 minutes of play (several restarts), and can tell from the colour language alone what each roof offers (gold line zone, cream trampoline/cushion, terracotta hazard) without a tutorial.
- Budget unchanged: JS bundle under ~600 KB gzipped, initial chunk <= 215 KB gz; the maze level is generated at runtime from a seed (no 100-house JSON in the bundle).

## Non-goals

Stated in `docs/lean-scope.md` ("Dropped, do NOT build") and `CLAUDE.md`:
- Godot-portable core rules and the Godot shooter integration (dropped by lean scope).
- Level validator / never-dead-end proof, replay traces, golden-test gates, CI deploy gates.
- Multi-level content, assist ladder, level select, GLB asset pipeline.
- Melee combat (MVP1 backlog, do not build yet).
- Modes beyond Classic L1 and Dragon Chase. PROPOSED 2026-11-10b: plus the Nagarkot->Bhaktapur strategy run (one generated level); no fourth mode, no level select.
- Health pips or checkpoints beyond near-instant restart (one-hit death).
- PROPOSED 2026-11-10b: a sim-driven level validator stays out; only a pure-graph BFS unit test guards the generated maze. Free-aim zipline in the maze mode is out (fixed lines only); a cushion under every roof is out (cushions are rare destinations).
Stated in `CLAUDE.md` Locked decisions and `docs/lean-scope.md` Budget: no hand-written custom shaders, no GLB hero model (procedural primitives and stock materials). Small baked textures allowed since 2026-11-09 (graphics overhaul).

## Product Principles

From `CLAUDE.md` and `docs/lean-scope.md`:
1. Momentum is never thrown away (landing turns speed into run speed, roll keeps it).
2. Near-instant restart: death is cheap, try again immediately.
3. Strict three-colour language: gold = interactive, cream-white = safe, terracotta = danger.
4. Readable sunlit rooftops; the route is legible (only the next on-route anchor and its pad pulse).
5. Light on load and on the phone: stock materials, primitives, a small texture set (~150 KB added max).
6. One-hit death, with the hand-brake as the skill answer to "too low".
