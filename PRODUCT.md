# Product

<!-- impeccable:product-schema 1 -->

## Platform

Web (three.js, Vite). Landscape and portrait on phones; desktop (pointer lock + WASD) and touch from day one. Hosting: Cloudflare Pages.

## Users

UNCONFIRMED: owner to fill. (Repo only implies phone and desktop browser players of a short Miniclip-style game: "open the link, play".)

## Product Purpose

Bhaaag is a third-person, single-player web game: fire a zipline hook at marked anchors and slide house to house down a Newari-themed Kathmandu hillside at golden hour. Bad landings kill, restart is instant (`docs/lean-scope.md`). Per the lean scope, one hand-tuned rooftop descent (L1) playable in under 2 minutes, light on load and on the phone (JS bundle under ~600 KB gzipped).

Success: PROPOSED (inferred from `docs/lean-scope.md` Goal and Budget sections): a first-time player opens the link, plays the L1 descent in under 2 minutes per run and retries instantly after dying, with the JS bundle under ~600 KB gzipped; owner to confirm.

Amendment 2026-11-10b (strategy pivot, `docs/lean-scope.md` Amendment 2026-11-10b; accepted by the owner on 2026-11-11):
- Purpose addition: Zipline Tole is also a rooftop **strategy maze**. In the Nagarkot->Bhaktapur run the player reads the roofs ahead, picks a path through ~100 houses (fixed ziplines only at line-houses, trampolines, cushions, balcony->roof climbs, road turnings) and learns which branches are dead ends. Dying is cheap; planning is the game.
- Success addition: a first-time player finds at least one escape path to Bhaktapur within 10 minutes of play (several restarts), and can tell from the colour language alone what each roof offers (gold line zone, cream trampoline/cushion, terracotta hazard) without a tutorial.
- Budget unchanged: JS bundle under ~600 KB gzipped, initial chunk <= 215 KB gz; the maze level is generated at runtime from a seed (no 100-house JSON in the bundle).

Amendment 2026-11-12 (cloud village, owner decided 2026-11-12; draft `docs/briefs/T297-amendment-draft.md`):
- Purpose addition: Zipline Tole also has a short, calm-looking but lethal **Cloud Village** descent: one hand-placed level of about 8 to 10 Newari houses above a golden cloud sea, played with the same free-aim zipline, hand-brake and one-hit death as Classic.
- Success addition: a first-time player opens `?mode=village` (or picks it in the mode switch) and finishes it in under 2 minutes per run, retrying instantly after a death; the cloud sea and houses read as one place without a tutorial.
- Budget: JS bundle limit unchanged (under ~600 KB gzipped, initial chunk <= 215 KB gz). New texture files: 0 KB by default; texture bytes loaded at runtime are capped per tier (Low 150 KB, Medium 300 KB, High 600 KB, owner decision 2026-11-15, supersedes the 300 KiB approval threshold); a new graph level adding textures must fit these caps.

Amendment 2026-11-13 (graph levels, `docs/lean-scope.md` Amendment 2026-11-13; success line added after the parkour-levels review S7):
- Purpose addition: hand-graphed parkour levels (Valley Run first) are lobby entries played with the parkour moves (auto-vault, mantle, slide) plus the same zipline and one-hit death.
- Success addition (confirmed by owner 2026-11-13): a first-time player finishes Valley Run in under 2 minutes within a few restarts, and never dies without an input mistake (no death from an auto-move, an undrawn hazard or an open edge at spawn).

## Non-goals

Stated in `docs/lean-scope.md` ("Dropped, do NOT build") and `CLAUDE.md`:
- Godot-portable core rules and the Godot shooter integration (dropped by lean scope).
- Level validator / never-dead-end proof, replay traces, golden-test gates, CI deploy gates.
- Multi-level content beyond Classic L1, the one generated Nagarkot level and the one hand-placed Cloud Village level, except graph levels per lean-scope Amendment 2026-11-13, each a lobby entry; assist ladder, level select, GLB asset pipeline.
- Melee combat (MVP1 backlog, do not build yet).
- Modes beyond Classic L1 and Dragon Chase. Amendment 2026-11-10b: plus the Nagarkot->Bhaktapur strategy run (one generated level); plus Cloud Village (Amendment 2026-11-12); no fifth mode, no level select, except graph levels per lean-scope Amendment 2026-11-13, each a lobby entry; no per-level progression.
- Health pips or checkpoints beyond near-instant restart (one-hit death).
- Amendment 2026-11-10b: a sim-driven level validator stays out; only a pure-graph BFS unit test guards the generated maze. Free-aim zipline in the maze mode is out (fixed lines only); a cushion under every roof is out (cushions are rare destinations).
Stated in `CLAUDE.md` Locked decisions and `docs/lean-scope.md` Budget: no hand-written custom shaders, no GLB hero model (procedural primitives and stock materials). Small baked textures allowed since 2026-11-09 (graphics overhaul).

## Product Principles

From `CLAUDE.md` and `docs/lean-scope.md`:
1. Momentum is never thrown away (landing turns speed into run speed, roll keeps it).
2. Near-instant restart: death is cheap, try again immediately.
3. Strict three-colour language: gold = interactive, cream-white = safe, terracotta = danger.
4. Readable sunlit rooftops; the route is legible (only the next on-route anchor and its pad pulse).
5. Light on load and on the phone: stock materials, primitives, a small texture set (runtime-loaded cap per tier: Low 150 KB, Medium 300 KB, High 600 KB).
6. One-hit death, with the hand-brake as the skill answer to "too low".

Amendment 2026-11-17 (two modes, owner decided; `docs/adr/0016-two-modes.md`):
- The game has exactly TWO modes: Classic and Dragon Chase. Home Street, Valley Run, Nagarkot Run, Cloud Village, the original descent and builder levels are Classic **levels** (one level row in the lobby, Classic only), not modes. The "no level select" and "no fifth mode" non-goals are lifted only in this form.
- Builder levels (`?builder`, `content/builders/*.builder.json`) may ship; the owner supplies them. No new level content is added by this amendment.

Amendment 2026-11-17b (owner approved, NOT FROZEN: expect iteration; queue T334-T343):
- Modes stay flexible behind a plug-in interface (T341). Classic and Dragon Chase are the visible modes and both run on the new level (Home Street houses on the Nagarkot Run graph, spiral layout); every other mode is hidden, not deleted. This overrides the "exactly two modes" wording above only where it implies deleting modes.
- One new level is added (T336/T337). The "no multi-level content" non-goal is relaxed for it.
- Classic is a time mode with a leaderboard for the shortest time (T339). Friends, Google/Facebook login and per-mode leaderboards run on Supabase with static hosting kept (T338). Login stays optional; anonymous play keeps working. This relaxes the "no per-level progression" non-goal for best times only.
- New movement: sprint after 7 full-speed steps and sprint jumps (T334); runnable sloped roofs while balance is held (T335, waits for the owner's house reference). A gyroscope camera is a spike only (T343).
