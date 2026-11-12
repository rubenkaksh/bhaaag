# Strategy pivot: parallel tracks and file ownership (2026-11-10)

Design: `docs/adr/0011-strategy-maze-core.md`. Scope: `docs/lean-scope.md` Amendment 2026-11-10b.
One owner per file; a track that needs a change in another track's file asks, never edits.

| Track | Owns | Delivers | Depends on |
|---|---|---|---|
| **S0 Core** (architect, this branch) | `src/core/{world,input,config,sim,hero,hook,preview}.ts`, `content/config/tuning.json`, `tests/core/*`, `tests/config/*` | Fixed-line gating, tramp/cushion/hazard landing rules, ledge grab + mantle, `landLockT`, `BTN_CLIMB`, `taps`, tuning sections | nothing |
| **S1 Level data + generator** (architect, then Sonnet for tests) | `src/content/load.ts` (schema), `src/content/strategy/{gen,graph}.ts`, `tests/content/strategy*.test.ts` | zod extension, seeded 100-house Nagarkot->Bhaktapur generator, graph edges from kinematics, BFS test, move-type smoke bot | S0 world types |
| **S2 Renderer** (Sonnet) | `src/adapters/render/levelView.ts` (feature meshes, `houseDress` opt, anchor skip), `src/adapters/render/terrain.ts` (extents), `src/adapters/render/decor/placeDecor.ts` (extent constants only), `tools/shots-strategy.mjs` | Merged meshes for line zones, ropes, posts, tramps, cushions; ADR 0009 counts for the maze; screenshots | S0 + S1 |
| **S3 Mode plumbing** (Sonnet, small) | `src/app/modes/mode.ts`, `src/app/game.ts` (world selection only), `src/app/main.ts` lobby label, `tests/app/mode.test.ts` | `strategy` mode entry "Nagarkot Run", best-time key, lobby button | S1 |
| **S4 Controls** (separate track, starts after this spec) | `src/adapters/input/*`, touch UI (`touch.ts`, `touch.css`, `hud.*`) | Left stick, jump button, double/triple tap, hold-to-climb -> `BTN_CLIMB`, `taps`; contextual button shows Hook only in a line zone, Climb while hanging | S0 InputFrame (frozen after S0 commit) |
| **S5 Chase interplay** (chase track owner) | `src/core/chase/*`, `src/adapters/render/chase/*` | Decide later whether chase rows get tramps/cushions; chase keeps `lineOnly 0` and free aim until then | S0 (read only) |

## Frozen contracts
- `InputFrame` after the S0 commit: `BTN_CLIMB = 128`, `taps: 0..3`. S4 may not add fields without an ADR.
- `World` feature lists (`lines`, `tramps`, `cushions`, `hazards`, `lineOnly`) and the zod schema after S1.
- Hero events `HERO_EV_BOUNCE`, `HERO_EV_CUSHION`, `HERO_EV_GRAB`, `HERO_EV_MANTLE` (S2/S4 read them for sfx/anim; no new events without S0).

## Do not touch (other owners)
`src/core/chase/**`, `src/adapters/render/chase/**`, `src/adapters/input/**`, touch UI files.

## Gates
Every track: `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm build` green before each commit;
S2 adds `tools/shots-strategy.mjs` (0 console errors) and ADR 0009 counts (Low <= 55 calls / 60k tris).
Bundle: initial chunk <= 215 KB gz (the generator ships in the mode's lazy chunk if it exceeds ~6 KB).

## Open for the owner
1. Confirm the BFS unit test (ADR 0011 sec. 5) and the PRODUCT.md PROPOSED edits.
2. Hazard bands = instant death (chosen) vs. a slow walk back to a road terrace.
3. Seed policy: fixed constant (chosen) vs. daily seed.
4. Whether Chase gets tramps/cushions (S5).
