# Plan review: reference-led visual pass (2026-11-06)

Scope: the draft 6-step plan (save reference, Opus spec, Sonnet A HUD, Sonnet B scene + level + hero, verify, Chrome check). Spec: `docs/adr/0005-visual-direction.md`.

Verdict: the right shape (spec first, then parallel lanes), but under-specified in exactly the places where art can break play. Agent B as drafted is three agents' worth of work spread over six files, two of which the HUD agent also needs.

## Critique

### Blocking

1. **The reference contradicts the colour language.** Lean scope and ADR 0004 reserve gold for interactive, cream-white for safe and terracotta for danger, and keep the hero out of all three. The reference has terracotta roofs everywhere, whitewash walls close to pad cream, and a cream-topped hero. Left to agents, this either gets copied, so roofs read as danger, or silently ignored. ADR 0005 D3 resolves it by value and saturation (dark fogged tiles vs hot danger `#c4472a`, whitewash darker than pads, oat and crimson hero). That is a user decision.
2. **Decor vs colliders is not addressed.** The level is 7 floating 9 m boxes over an 80 m void. "Dense houses around the solids" invites three failures:
   - (a) decor roofs near walkable height look landable and are not
   - (b) the camera probe only sees colliders, so the camera clips into decor
   - (c) every missed hop drops the hero through a painted street and 60-80 m on under the terrain while the camera follows. Failure is the core loop, so (c) is on screen constantly.

   Fix: the reserved lane plus "pitched roof = scenery" (ADR 0005 D1), and terrace colliders appended in `genLevel.mjs` (D2). Indices stay stable for `level.test.ts`, and a new lethality test gates it.
3. **The control mapping would add gameplay.** The reference has joystick + HOOK + SPRINT. The game has a floating stick, a look-drag and tap-aim zone, a contextual ACTION (HOOK/BRAKE) and JUMP, and no sprint. Building "a sprint button" is a feature. The fix is restyling only: the runner icon goes on JUMP and the hook/brake glyph on ACTION (D8). Note that `Hud.setActionLabel` uses `textContent`, which would wipe an icon.

### Major

4. **File collisions.** The waypoint needs `game.ts` (target, camera, hero position each frame). "Rope gold end" and "anchor glow" pull B into `levelView.ts` and `game.ts`. Hero, rope, scene and decor are four separate lanes in the draft's single B. The revised split below gives every file exactly one owner. B lanes never touch `game.ts`: decor is built inside `levelView.buildLevelMeshes`, the sky inside `scene.ts`, and the halo faces the camera via `onBeforeRender`.
5. **No performance budget or measurement.** "Dense houses, balconies, water tanks, flags, trees" as plain meshes is hundreds of draw calls. Fix: an `InstancedMesh` kit (about 12 decor calls), budgets of ≤ 80 calls and ≤ 120k tris with a pixel ratio of 1.5 on phones, no shadows, post-processing or tone mapping, and a headless `decor.test.ts` that sums triangles and checks lane clearance and determinism (D10). `?debug` already shows calls and tris.
6. **Verification is too thin.** "Build/tests/screenshots" misses:
   - re-running `humanlike` / `level` / `goal` after the content change
   - a decor determinism test
   - pinned viewports (640×360 touch emulation and 1920×1080)
   - a throttled frame-time check
   - a reviewer comparing against the spec rather than impressions

### Minor

7. **Sun placement conflict.** In-frame sun vs readable roofs: the key light must stay 78° off the descent axis (ADR 0001 and lean scope), so the visible sun disc is a deliberate cheat, decoupled from the light. Without the spec saying so, an agent will "fix" the light toward the sun and backlight every pad.
8. **Hero tests constrain B.** The heroPose test checks under 1,500 tris and one material per colour. Adding skin, hair and leather means `HERO_COLORS` must grow to match, and only the HANG row may change.
9. **Cuts.** Birds, pots and plants, the rope trailing behind the hero, the camera reframing (changes aim feel), tone mapping and the lobby art repaint (optional, last). The timer stays count-up: `mm:ss` in the pill, `m:ss.t` on the win screen; `formatTime` is untouched.
10. **Process.** Parallel agents in one working tree see each other's half-written files in `tsc`. Either give each lane its own worktree, or have each agent run only `vitest` on its own tests plus `tsc`, and ignore errors in files it does not own until integration. Per the rulebook, the controller writes the engine line before each dispatch. B3 (hero colours) and A1's CSS part are junior-sized.

## Revised plan

Decisions first, then content (the only change that touches play), then three art lanes in two waves, then one integration and verification pass by the controller.

| Phase | Owner (engine) | Files owned (exclusive) | Done when | ETA |
|---|---|---|---|---|
| P0 Reference saved | done | `docs/reference/ui-reference.webp` | - | done |
| P1 Spec | Opus | `docs/adr/0005-visual-direction.md`, this file | written | done |
| P1.5 User decisions | user | - | D2 terraces yes/no, D3 colour amendment, D7/D8 button mapping answered | 2 min |
| **Wave 1 (parallel)** | | | | **~8 min wall** |
| C Terraces (D2) | Sonnet (or hunter: one generator) | `tools/genLevel.mjs`, `content/levels/l1.json` (regenerated), new `tests/content/terrace.test.ts` | `pnpm test` green including `level`, `humanlike`, `goal` and the new terrace test; solids indices unchanged | 6-8 min |
| A1 Static HUD | Sonnet | `src/adapters/ui/hud.ts`, `hud.css`, `touch.css`, `src/adapters/input/touch.ts` (`render()` + DOM creation only), `index.html`, `src/app/main.ts` (zt-menu listener) | objective, timer pill, pause, icons, ghost joystick, restyled ACTION/JUMP with `data-mode`; input semantics unchanged | 6-8 min |
| B1 Sky | Sonnet | `src/adapters/render/scene.ts`, new `skyView.ts` | HAZE fog, sky stops, sun disc + glow, clouds, world-fixed mountains, lights, pixel ratio 1.5 on touch | 5-7 min |
| **Wave 2 (parallel, after wave 1 merges)** | | | | **~16 min wall** |
| A2 Waypoint | Sonnet | `src/app/game.ts`, new `src/adapters/ui/waypointMath.ts`, new `src/adapters/render/waypointView.ts`, new `tests/adapters/waypoint.test.ts` (+ `hud.ts` marker DOM, carried over from A1) | marker on the next route anchor, then the goal; edge clamp and behind-camera mirror tested; beam + ring; hidden in pan/dead/< 3 m | 8-10 min |
| B2 City | Sonnet | `src/adapters/render/levelView.ts`, new `src/adapters/render/decor/kit.ts`, `decor/placeDecor.ts`, new `tests/adapters/decor.test.ts` | kit per D5 table; placement seeded; lane + collider clearance, ≤ 80k tris and ≤ 16 instanced meshes asserted; walkable-house dressing; palette per D3 | 12-16 min (split into kit, then placement, if the first attempt overruns) |
| B3 Hero, then B4 Rope (one lane, sequential) | junior/Haiku for B3 colours, Sonnet for B4 | B3: `heroRig.ts`, `heroPose.ts` (HANG row), ADR 0004 "Amended by 0005" note. B4: `src/app/ropeView.ts` | B3: heroPose test green, < 1k tris. B4: 24×6 tube, twist colours, gold end + sleeve + halo, 1 px line kept, no per-frame allocation | 5-7 + 6-8 min |
| P4 Integrate + verify | controller | none (read-only) | `pnpm lint && pnpm typecheck && pnpm test && pnpm build`; bundle delta; `?debug` calls ≤ 80, tris ≤ 120k; screenshots at 640×360 (touch emulation) and 1920×1080, framed at spawn, mid-rope and a death | 6-8 min |
| P5 Review | Sonnet, one seat | - | diff checked against ADR 0005 D1-D10 and the file-ownership table; findings listed | 6-8 min |
| P6 Fixes | owner lane's engine (Haiku, then Sonnet) | per finding | review findings closed, P4 commands re-run | 5-10 min |
| P7 Chrome check + report | controller | - | a playthrough with 4× CPU throttle: median frame ≤ 16.7 ms, waypoint behaves off-screen and behind the camera, pause → lobby → resume works, rotate overlay still works | 6-8 min |

**Totals**: about 60-75 min wall clock and about 95-110 agent-minutes. The critical path is P1.5, wave 1 (8 min), B2 (16 min), then P4-P7 (25-35 min).

**If D2 is rejected**: drop C. B2 still builds the visual hill from the same constants. Add a P7 check that the death-fall camera frames are acceptable.

**Cut first under time pressure**: pagodas, balconies, clouds, lobby repaint, rope sleeve (keep the gold vertex tint and the halo).
