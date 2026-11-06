# Session state (2026-11-05)

- Repo: workspaces/bhagdori, branch feat/m0-scaffold (nothing committed). Plan: docs/zipline-plan.md; review+tasks: docs/work-breakdown.md; ADR 0001 feel model applied (docs/adr/0001-feel-model.md).
- M0 scaffold: cursor junior returned EMPTY (exit 0, no files) -> cursor flagged limit. Next rung per Rule 2: M0 scaffold to hunter-pro/gamer-pro per file, or Haiku/Sonnet fixer. Verify cmd: pnpm i --frozen-lockfile && pnpm lint && pnpm typecheck && pnpm test && pnpm build.
- Live agent: Opus max ac2256a20fe5a236b writing docs/adr/0003-models-and-animation.md; it was told to REUSE workspaces/vidanta3d/assets/models (hero_base_rigged.glb 1508 tris 24 clips, pagoda/shrine/wall/platform/bell/flag/crate; SOURCES.tsv licences; CC-BY: hero base, pagoda, platform).
- User constraints: AC + Mirror's Edge feel reference; gamer-pro as much as possible for game-core; Opus max only for modelling/animation design; three pinned 0.187.0 (plan said r186) -> record in docs/verify-log.md; first playable est 9/12/18 wall days.
- Pending sync: tuning.json must add brakeDecel, carryCap, chainWindowMs, vhStumble, vCling 7.5, rope gravityFactor 1.0 drag 0.05 launchSpeed 6.
- User cannot be read by agent: ~/Downloads (TCC). User runs cp commands themselves.

## Update (user directive, same day)
- cursor: `flag off cursor` set (standing off). The 21 cursor-tagged tasks in work-breakdown.md are reassigned: multi-file view/adapter tasks -> gamer-pro (or Sonnet fixer if gamer-pro budget is amber); single-file pieces -> hunter-pro. flash stays off.
- Dispatch rule: run every task whose deps are met in parallel (no shared files, per Par column), via background subagents; Opus only for M4-T00 validator ADR (deferred, design-only) and anything an agent reports as BRIEF_PROBLEM needing a trade-off.
- Wave 1 (starts when M0 fixer a6480182aacb952f2 reports and controller verifies lint/typecheck/test/build): M1-T01 vec3, M1-T04 InputFrame, M1-T03 AABB (after T01), M1-T05 World+loader (after T01).

## Decision 2026-11-05: orientation
Landscape-first on phones. Portrait shows a rotate-your-phone overlay and pauses the sim. Affects M1-T09 (touch layout) and M1-T10 (camera rig): design for landscape only. Add the overlay as a small task in M1-T09 scope.

## Checkpoint 2026-11-05 (after wave 2)
Repo green: lint, typecheck, test (79/79, 8 files), build. Nothing committed (user has not asked).
DONE: M1-T01 vec3 (Haiku fixer), T03 aabb+swept capsule (Sonnet), T04 input (hunter-pro), T05 world+loader+testworld fixture (hunter-pro; fixed lint + node:fs by hand), T06 hero.ts/sim.ts (Sonnet), T07 loop.ts (hunter-pro), T08 desktop.ts (hunter-pro), T09a touch.ts + T09b touch.css/index.html (hunter-pro), T10 cameraRig.ts (Sonnet; added 6 camera keys). T02 folded into T01 tests.
Tuning keys added to config.ts + tuning.json + tests/config/tuning.test.ts strict schema: hero height/accel/friction; camera height/probeRadius/smooth/armRelease/downhillBias/fovSpeed. Any new key must be added in all three.
NEXT: M1-T11 render+wiring (src/adapters/render/{scene,heroView}.ts, src/adapters/ui/debugHud.ts, src/app/{game,main}.ts); then T12 Haiku fix sweep; T13 Sonnet review (user: do the review once first playable is done) + user phone check.
API notes: HeroState starts airborne (set grounded=1 to spawn standing); yaw 0 faces +z in sim, camera rig yaw 0 faces -Z (reconcile in wiring); touch exposes tapPending/tapNdcX/Y; desktop/touch .sample(InputFrame).
DECISIONS: landscape-first phones (rotate overlay). Cursor + flash off. Route former cursor tasks hunter then hunter-pro. Juniors time out on long briefs: keep briefs ~2KB, SCRIBE_TIMEOUT=900 TRIES=1; fixer ladder Haiku/Sonnet after.
ADR 0003 (models/animation) delivered by Opus max, status Proposed; 20 tasks A-01..A-20; user step: ADR section 5.2 copy + licence check; hero mesh CC BY 3.0 needs credit; GLBs must ship as hashed ?url imports (public/_headers immutable).
USER TODOs: Cloudflare secrets CLOUDFLARE_API_TOKEN, CLOUDFLARE_ACCOUNT_ID, var CF_PAGES_PROJECT; accept/reject ADR 0003.
Scratchpad run scripts: scratchpad/run.sh (420s x3) and run2.sh (900s x1) take <brief-id> <agent>.
