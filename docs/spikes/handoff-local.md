# Handoff to a local session (2026-11-27)

Branch `claude/bhaaag-hero-spikes-0a5eiv` (pushed, not merged, no PR). Start with `git fetch && git checkout claude/bhaaag-hero-spikes-0a5eiv`, `pnpm install`, then read `CLAUDE.md`, `PRODUCT.md`, `docs/spikes/README.md`, `hero-look.md`, `playable.md`.

## State
- Spike cores `src/spikes/*.ts` (ride, weapons, enemies, camp night, bot). Pure TS, 34 spike tests.
- Rider views `src/spikes/view/` and the shared hero look `src/adapters/render/heroLook.ts` + `heroRig.ts`. This CHANGED the zipline hero (beanie, face, hemp tunic, knots, bracers, boots): it needs the usual phone check at 390x844 and 844x390, Low and High.
- Playable page `spike.html` + `src/spikes/play/` (dev server only). Run: `pnpm dev`, open `/spike.html?spike=horse` or `?spike=bike`; phone: `pnpm exec vite --host 0.0.0.0 --port 4174`.
- Gates green on this branch: `pnpm lint`, `pnpm typecheck`, `pnpm test` (129 files), `pnpm build`.
- Initial chunk: 257,593 B gzip (231,646 + 24,969 was 256,615 before the hero change; budget in PRODUCT.md 17g is 255,000 B, already exceeded on main). Owner said lazy-loading is not needed now.

## Do next, in order
1. **Look at `~/projects/sandbox/workspaces/assets-gamedev`** (owner's folder; the cloud session could not see it). Evaluate what can replace the placeholder wolf, boar, deer, rabbit, zombie, runner, brute, fire, tent, crates in `src/spikes/play/creatures.ts` and `world.ts`. Follow `skills/game-asset-production-integration` (status ladder, record licences in a SOURCES.tsv, no GLB pipeline per CLAUDE.md and lean-scope, art stays out of git). Write the evaluation into `docs/spikes/README.md`.
2. **Phone test both spikes** (CLAUDE.md "Phone test, unasked": vite on 0.0.0.0, PNG QR with qrencode, delete the PNG before committing). Check touch feel, thumb reach of the buttons, frame rate on Low and High, the backdrop night tint on a real GPU, and the zipline hero on cream pads. Write "not verified on device" until done.
3. **Human balance pass**: the scripted player wins 10 of 20 horse nights and 15 of 20 bike nights; a person will differ. Tune in `src/spikes/run.ts` (waveGrowth, zombieShare, cacheAmmo, ammoCrates) and keep `tests/spikes/bot.test.ts` green.
4. **Polish**: hit flashes, death and spawn feedback, bow and rifle sounds (procedural Web Audio like `src/adapters/audio/sfx.ts`), dust and fire particles, pack the bow, string and arrow meshes to cut the 22 draw calls on the horse rider.
5. **Landscape ride camera**: the Himalaya range is mostly out of frame (low horizon). Camera changes in the zipline game need owner approval; the spike camera is free to change.

## Owner decisions already made (2026-11-27)
- Spikes live isolated under `src/spikes` and `spike.html`, not in the lobby or modes, no PRODUCT.md amendment (they sit outside the Non-goals; melee stays out, everything is ranged).
- Hero: D1(b) dark hemp tunic `#4b4636` in the zipline game and oat `#d7c9a6` only for riders; D2 beanie in both; D3 baked vertex shading and a 3,000 triangle High cap (Low under 1,500).
- Controls: touch first with desktop mirror. Creatures: simple primitives for now. Done test: one bot-verified full run per spike.

## Known gaps and cautions
- Creatures and props are placeholders; GPT reference views still to generate are listed in `image-prompts.md` (prompt wording that avoids the content filter is recorded there).
- Do not run `prettier --write` on `src` or `tests` wholesale: it reformats many unrelated files (happened once and was reverted).
- Screenshot tools need `CHROMIUM_PATH` set when using the cloud chromium; locally use your own Playwright browsers. `tools/shots-spikes.mjs` (riders on grey), `tools/shots-play.mjs` (playable page, bot driven).
