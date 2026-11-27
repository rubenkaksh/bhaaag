# Hero spikes: horse + bow, dirt bike + rifle, then a night at camp (2026-11-27)

Owner request 2026-11-27. Isolated spike code (owner choice): `src/spikes/`, tests in `tests/spikes/`. Nothing in `src/app` or `src/adapters` imports it, so the lobby, the mode registry, PRODUCT.md and the 255 KB initial-chunk budget are untouched. Both spikes sit outside the current Non-goals (melee is backlog, no new modes), so they stay throwaway until the owner amends PRODUCT.md.

## Loop (both spikes)
1. **Ride** to the camp site (horse 900 m, bike 1600 m): steer, boost, jump logs, ramps launch the bike, mud slows. Aim is independent of heading. Enemies come from ahead and behind, faster the further you ride. Arrive under `parTime` for one bonus wood. HP, weapon and ammo carry into camp.
2. **Camp night** (240 s, dusk to dawn): fire, wood piles, hunting, cooking, health.
3. **Dawn** = win, HP 0 = dead. Instant restart, same as the main game.

| | Horse + bow | Dirt bike + rifle |
|---|---|---|
| Mount | grip 9 (planted), gallop meter, jump 8 m/s | grip 3.2 (drifts), nitro meter, ramps, tramples zombies above 8 m/s |
| Weapon | hold to draw 0.7 s, release; 1-3 dmg, 28-55 m/s, silent; missed arrows can be picked up | hold to fire 0.3 s; 2 dmg, pierces 1, mag 8, reload 2 s, loud |
| Camp pressure | 35% undead, wolves and boars | 70% undead, heat: every shot speeds the next wave |

## Camp rules (shared core, `camp.ts`)
- **Fire:** lit fire holds animals (wolf, boar) at a 7 m edge. **Zombies ignore it.** It burns 1 fuel/s, 40 per wood, max 120. Out = animals attack too.
- **Hunt:** rabbits and deer spawn up to a cap and flee; wolves and boars also drop meat. Meat is walk-over pickup.
- **Cook:** E at the fire with raw meat, 4 s while lit. **Eat:** cooked heals 4 plus regen 0.5 HP/s for 10 s; raw heals 1 and blocks regen for 10 s.
- **Escalation:** waves every 20 s, count 2 + 1.4 per wave, runners from wave 3, boars from wave 2, brutes from wave 6, blood moon horde at 80% of the night.
- Ranged only: no melee (PRODUCT.md non-goal). The fire, the meat and the wood are the only non-gun tools.

## Status
- Pure TS, fixed 60 Hz, seeded RNG, deterministic. 22 Vitest tests pass; typecheck, core typecheck and ESLint clean on `src/spikes` and `tests/spikes`.
- **Not balanced, not played, no renderer, no input adapter.** Numbers are first guesses; the bike cannot jump logs (jump 4 m/s), by design, it steers or ramps. Not verified on device.
- Next: a three.js harness (ride view plus camp view), touch and desktop input, a bot that plays a full night to tune wave sizes and heat.

## Asset evaluation (what exists in the repo today)
I found no new asset batch in this checkout beyond the 2026-11-18 painted backdrop and the 2026-11-20 textures. If you meant files that are not in git (uploads, `art/`, your machine), tell me where and I will look.

| Asset | Where | Verdict for the spikes |
|---|---|---|
| Painted 360 backdrop (plate, far, near, per tier 21-130 KB) | `render/backdrop.ts`, `loadBackdrop(tier)`, `public/assets/textures/backdrop/` | **Reuse as the skybox.** It is a golden-hour Himalaya sunset, right for the ride. Wrong mood for a night camp: first try a dark blue-violet `color` multiply on the layer materials (cheap, not tried); a night plate prompt is in `image-prompts.md` if that looks muddy. It follows camera position, so a long ride never leaves it behind. |
| Sky dome, haze, dust, sun | `render/skyView.ts` (`SUN_EL_DEG` 8, `HAZE`) | Reuse for ride. Night needs lower sun and darker haze colours (palette values, no shader). |
| Cloud sea and banks | `render/cloudSea.ts` | Reuse as valley mist around the camp. |
| Endless hillside strip and trees | `render/chase/endlessGround.ts` | Concept fits (periodic strip re-snapped along the route) but it follows a fall line and `x <= 34`. The ride is a flat corridor along +z, so copy the approach, not the file. |
| Terrain textures: `stone_warm`, `straw`, `terrace`, `roof_clay` | `public/assets/textures/` | Camp ground and a thatch lean-to. New textures count against tier caps (Low 150 / Medium 300 / High 600 KB). |
| Hero mannequin (boy, hemp tunic, crimson scarf and sash) | `render/heroRig.ts` | Reuse as the rider and camper. No seated or riding pose exists in `heroPose.ts` (1049 lines): needs one, or a static seated attachment. |
| Dust puff, birds, flag and canopy sway | `render/dustPuff.ts`, `decor/birds.ts`, `decor/ambient.ts` | Dust puff for hooves and bike spray; flags and canopy at camp. |
| Procedural SFX (Web Audio, no files) | `adapters/audio/sfx.ts` | Pattern fits. No bow, rifle, wolf or zombie sounds yet: add as oscillator plus noise bursts, no audio files. |
| Dragon sprites (cloud puffs, heads) | `public/assets/dragon/` | Not relevant. |
| GLB models, audio files | none in repo | Mounts, animals, zombies and campfire do not exist. Primitives only (no GLB pipeline, CLAUDE.md and lean-scope); the GPT images are modelling reference, not shipped. The TripoSR dragon failed (2026-11-16), so do not route these images through image-to-3D. |
| Reference photos (22 MB) | branch `assets` | Houses and hillside only; never in `main`. Nothing for mounts. |
