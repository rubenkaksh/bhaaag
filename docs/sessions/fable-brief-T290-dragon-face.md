> SUPERSEDED 2026-11-11 (owner ruling): no puff face. Built instead: sprite catch beat, spec in src/adapters/render/chase/catchPose.ts.

# Fable brief: T290 front-view dragon face (paste into a new Fable session)

Read `PRODUCT.md` first (mission pointer). Repo: `/Users/rubenk/projects/sandbox/workspaces/bhagdori`, branch from `main` (a9c72ab or later).
Queue card: `config/queue/bhagdori.yaml` in `/Users/rubenk/projects/sandbox` (T290, DRAFT).
Reference image: `docs/reference/dragon-front-face.jpg` (gitignored, local only; original at `~/.claude/uploads/b22f314f-67a2-4981-a1b9-9cac9ebcff14/4272eef1-image.jpg`). Look at it once.

## Premium seat rules (user's rule, binding)
- Ledger line: `premium: owns design + dragonFace.ts / handed down wiring, tests, gates, screenshots / cap 60 tool calls`.
- Premium share of the work <= 20%. Tool-call cap 60. **You run no gates** (no lint, typecheck, test, build, screenshots). You never merge, commit or push.
- You are not lead builder. Delegate everything not marked "premium" below with the Agent tool (`model: sonnet`, or `haiku` for mechanical checks). Every subagent prompt carries: mission pointer, "use rtk proxies in Bash (tests via `rtk test ./node_modules/.bin/vitest run`)", "stock three.js materials only, no shaders, no GLB, no new deps", "do not commit/branch/push".
- Model: this is a Fable seat. If you are not actually running as Fable (check your model id), stop and tell the user.

## Premium (you own, design decisions only)
1. A written design spec (put it at the top of `src/adapters/render/chase/dragonFace.ts` as a comment): the puff layout for a front-facing cloud-dragon head matching the reference: forked antlers (two), flame-like mane fanned left/right/top, angry brows, glowing orange eyes, snout with nostrils, open fanged mouth, long curving whiskers. Give each feature a list of puff centres (x, y, z), radii, and colour/emissive, in head-local units, symmetric about x = 0 so one half is mirrored. Reuse the puff kit used by the existing side-view dragon in `src/adapters/render/chase/`.
2. `dragonFace.ts` itself: the build function (merged/instanced stock-material puffs, `build(): THREE.Group`, `dispose()`), since the code is the design.
3. Final verdict on the screenshots (does the silhouette read as the reference), once the Sonnet seats have produced them.

## Handed down (Sonnet/Haiku, you only dispatch and review)
- Sonnet A: wire the face into chase game-over: the head fills the view as the cloud cover closes in (`src/app/game.ts`, `src/adapters/render/chase/`), plus reuse on the Chase lobby card only if cheap. Chase only; Classic unchanged; `src/core` untouched.
- Sonnet B: `tests/adapters/dragonFace.test.ts` (builds, disposes with InstancedMesh.dispose, draw calls <= 8 extra, tris <= 6k on Medium).
- Sonnet C: gates (`pnpm lint`, `pnpm typecheck`, vitest, `pnpm build`) and a `game-over-face` shot added to `tools/shots-chase.mjs`, run at 390x844 and 844x390; report file paths. Then you look at the shots.

## Known context
- Dragon chase: ADR `docs/adr/0010-dragon-chase.md`. Colour language: gold interactive, cream safe, terracotta danger. Wing bones look beaded and wisps are unbuilt (not part of this task).
- Done when: lint, typecheck, tests, build green; face silhouette recognisable in both orientations; budgets met; session note appended to `docs/sessions/<today>.md`; a final report under 150 words.
