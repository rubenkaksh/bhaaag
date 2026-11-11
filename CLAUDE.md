# Bhaaag

> **Mission:** read `PRODUCT.md` before acting. Check every task against its Product Purpose
> and Non-goals. If a task, a design or a shortcut works against either, stop and tell the
> user before doing it.

Third-person, single-player web game. The hero fires a zipline hook at marked anchors and slides down a Newari-themed Kathmandu hillside at sunset. Bad landings kill. Restart is instant. The zipline later becomes an ability in a Godot 4 shooter, ~~so the core must stay engine-portable~~ (dropped by lean-scope item 1; keep `src/core` free of three/DOM imports only).

Full spec: `docs/zipline-plan.md` (read the relevant section before each milestone; section 8 is the milestone checklist).

## Locked decisions

> **Precedence (decided 2026-11-09):** `docs/lean-scope.md` (2026-11-06) supersedes this file and the full plan where they conflict. Items below marked ~~struck~~ are DROPPED by it; do not build or follow them. If anything else here conflicts with lean-scope, stop and ask.

- Renderer: three.js `WebGLRenderer`, exact version pinned. Stock materials only: no hand-written custom shaders. Post-processing (three's own passes) and shadows are allowed ONLY in the Medium/High quality tiers; the Low tier stays stock (decided 2026-11-08, see docs/graphics-spec.md).
- Tooling: TypeScript strict, Vite, pnpm, Vitest. Vanilla DOM for UI, no framework.
- Core (`src/core`): pure TS, deterministic, fixed 60 Hz, NO imports of three or DOM. `step(state, input, world, cfg)`. No physics engine. Rope is a straight chord (sag is visual only). World is AABBs (house yaw in 0/90/180/270). Landing and wall impact are geometric speed/angle rules.
- Levels: JSON validated with zod. JSON is the gameplay source of truth; GLB is visuals only (`part_*` nodes, primitive fallback when a part is missing). NOTE: lean-scope item 4 drops the GLB pipeline and multi-level content; exactly one level (L1), primitives only.
- ~~Never a dead end: a validator CLI runs the real sim over every survivable state. It runs in CI and blocks deploys.~~ DROPPED by lean-scope item 2 (one hand-checked level).
- Health: one-hit death. No pips. Wall impact above `vCling` kills (default 7.5 m/s, range 7-8); below it the hero clings. Rough landings only cost time.
- Hand-brake: hold REEL while Attached (~10 m/s² decel, no new button). It is the skill answer to "too low".
- Momentum carry: landing turns horizontal speed into run speed (cap ~8 m/s), a roll keeps it; firing within 0.4 s of landing seeds `v0` from it. Aiming works at full speed while moving.
- Orientation: portrait and landscape both playable (decided 2026-11-10); no rotate overlay. Supersedes the 2026-11-05 landscape-first decision.
- Touch scheme: tap-to-aim on an anchor, one contextual action button (Hook, Release, Mantle/Brake), JUMP; DROP is a swipe down.
- Feel model details: `docs/adr/0001-feel-model.md`.
- ~~Preview help: release window shown in L1a/L1b, colour only in L1c.~~ DROPPED by lean-scope item 4 (no L1a/L1b/L1c ladder).
- Hero: neutral parkour runner (placeholder mannequin).
- Input: Pointer Events, desktop (pointer lock + WASD) and touch (floating stick, look-drag, buttons) from day one. Engine-agnostic `InputFrame`.
- Hosting: Cloudflare Pages via GitHub Actions, `*.pages.dev`. Deploy from M0.
- MVP1 backlog (do NOT build yet): melee combat on balconies/roofs.

## Portable-core coding rules — DROPPED by lean-scope item 1

The existing core stays as is (no rewrite). New code may use plain idiomatic TypeScript (closures, destructuring, etc.). The list below is kept only as history; do not enforce it.

- No closures, async/await, union types, destructuring, spread, getters/setters, Map/Set iteration order, or map/reduce chains inside `src/core`.
- Use classes with plain fields, for-loops, enums, integer ids, flat arrays, and a thin `Vec3` helper made of plain functions.
- Units: 1 unit = 1 metre. Y-up.
- All tunables live in `tuning.json`; no magic numbers in core code.
- Unit tests only where they protect the sim; `pnpm test` stays green. ~~Recorded input traces / golden tests~~ DROPPED by lean-scope item 3.

## Working agreement

- Work one milestone at a time from section 8 of the plan. Tick the checklist items in `docs/zipline-plan.md` as they are finished.
- Prefer small commits per checklist item.
- Before using any item in the plan's "Verify before building" list (three version, Godot specifics, etc.), check it against current docs and record the result.
- Ask before adding dependencies not named in the plan.

## Commands
- `pnpm dev`: Vite dev server.
- `pnpm build`: `tsc --noEmit` then `vite build` into `dist/`.
- `pnpm test`: Vitest, single run.
- `pnpm lint`: ESLint (core may not import three or adapters).
- `pnpm typecheck`: `tsc --noEmit`, then `tsc --noEmit -p tsconfig.core.json` (core with ES2022 lib only).
- ~~`pnpm validate:levels`~~ DROPPED (lean-scope item 2).
- `pnpm format`: Prettier write (docs and md files are ignored).
- CI order: lint, typecheck, test, build. ~~validate:levels and deploy gates~~ DROPPED (lean-scope items 2-3); Cloudflare Pages hosting itself is unchanged.
