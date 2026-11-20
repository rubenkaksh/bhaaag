# Bhaaag

> **Mission:** read `PRODUCT.md` before acting. Check every task against its Product Purpose
> and Non-goals. If a task, a design or a shortcut works against either, stop and tell the
> user before doing it.

## Intent notes (project-specific; global Rule 11 applies)
- **Modes vs levels:** exactly two modes, Classic and Dragon Chase (ADR 0016, 2026-11-17); Home Street, Valley Run, Nagarkot Run, Cloud Village, the original descent and builder levels are Classic levels. CLAUDE.md's "Cloud Village: fourth mode" is superseded.
- **Done = phone-visible:** check a fresh build of main at 390x844 and 844x390, Low and High tiers. Playwright swiftshader is not a device test: write "not verified on device" (owner: "Dont see any home street" 2026-11-15, "still glitching" 2026-11-17).
- **Phone test, unasked:** `vite preview --host 0.0.0.0 --port 4174` from the worktree holding the change, check it returns 200, write a PNG QR with qrencode (the terminal QR does not scan in the desktop app) and print the URL; delete the PNG before committing (memory, 2026-11-12).
- **Look:** stylised but lit, iPhone 13 is the High target (2026-11-08); textures come from `tools/cartoonify.py` per tier (2026-11-15). "Realistic lighting toward the painterly first mock" is a saved, not-started mission. TripoSR dragon failed (blob, no face), so the head is procedural in dragonView.ts (2026-11-16).
- **Camera and dragon:** no camera-angle change without asking; the owner had one reverted ("Pls revert it", 2026-11-11). The chase dragon stays on the endless rows, off Home Street and Nagarkot (2026-11-17).
- **Repo weight:** `art/` (348 MB) and the reference photos never go into git; photos live on branch `assets` (2026-11-15).
- **Misreads:** "we need walkable roofs as well" added walkable roofs and kept sloped ones (2026-11-07); "everything" means all open sessions and worktrees (2026-11-15); "tall buildings" means the 2-3 storey rule in docs/graphics-spec.md (2026-11-08).
- **Logs:** `docs/sessions/YYYY-MM-DD.md` (2026-11-17.md holds the playtest fixes); open-session triage in `docs/sessions/2026-11-15-open-sessions-review.md`; version checks in `docs/verify-log.md`; cards in sandbox `config/queue/bhagdori.yaml`. No sibling port.

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
- Momentum carry: landing turns horizontal speed into run speed (cap `carryCap`, 12 m/s; sprint tops out at 11, ADR 0018), a roll keeps it; firing within 0.4 s of landing seeds `v0` from it. Aiming works at full speed while moving.
- Orientation: portrait and landscape both playable (decided 2026-11-10); no rotate overlay. Supersedes the 2026-11-05 landscape-first decision.
- Touch scheme: tap-to-aim on an anchor, one contextual action button (Hook, Mantle/Brake), JUMP (ignored on the rope); release is DROP, a swipe down.
- Cloud Village: a Classic level, one hand-placed (ADR 0016, 2026-11-17; supersedes the 2026-11-12 "fourth mode" amendment in `docs/lean-scope.md`).
- Feel model details: `docs/adr/0001-feel-model.md`.
- ~~Preview help: release window shown in L1a/L1b, colour only in L1c.~~ DROPPED by lean-scope item 4 (no L1a/L1b/L1c ladder).
- Hero: neutral parkour runner (placeholder mannequin).
- Input: Pointer Events, desktop (pointer lock + WASD) and touch (floating stick, look-drag, buttons) from day one. Engine-agnostic `InputFrame`.
- Hosting: GitHub Pages, live at https://rubenkaksh.github.io/bhaaag/ (legacy mode serving the `gh-pages` branch, vite `--base=/bhaaag/`; GitHub's built-in pages-build-deployment action publishes each gh-pages push; the push itself is manual and STAYS manual by owner decision 2026-11-17c). Supersedes the earlier Cloudflare Pages decision (owner 2026-11-17).
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
- CI order: lint, typecheck, test, build. ~~validate:levels and deploy gates~~ DROPPED (lean-scope items 2-3); hosting is GitHub Pages (see Locked decisions; the ci.yml Cloudflare deploy job is dormant without secrets).
