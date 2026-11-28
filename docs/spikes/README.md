# Hero spikes: horse + bow, dirt bike + rifle, then a night at camp (2026-11-27)

Owner request 2026-11-27. Isolated spike code (owner choice): `src/spikes/`, tests in `tests/spikes/`. Nothing in `src/app` or `src/adapters` imports it, so the lobby, the mode registry, PRODUCT.md and the 255 KB initial-chunk budget are untouched. Both spikes sit outside the current Non-goals (melee is backlog, no new modes), so they stay throwaway until the owner amends PRODUCT.md.

## Loop (both spikes)
1. **Ride** to the camp site (horse 900 m, bike 1600 m) on a fixed trail per spike over THREE.Terrain hills (2026-11-27, `docs/spikes/trails-plan.md`): uphills slow, downhills speed up, one river ford, boulders on the banks. 3 lives: a fall (bend too fast, steep side slope, ford too fast, deep water) respawns 8 m back. Steer, boost, jump logs, ramps launch the bike, mud slows. Aim is independent of heading. Enemies come from ahead and behind, faster the further you ride. Arrive under `parTime` for one bonus wood. HP, weapon and ammo carry into camp.
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

## Update 2026-11-27 (later): hero look and riders
Hero look shared with the zipline game, rider views, harness and measurements are in `hero-look.md`. The zipline hero itself changed (beanie, face, hemp tunic, scarf and sash knots, bracers, boots), so Bhaaag's hero needs the usual phone check before it counts as done.

## Asset evaluation: `~/projects/sandbox/workspaces/assets-gamedev` (2026-11-27)
Status ladder: **concept only / inventoried**. Nothing processed, nothing in the repo, nothing engine-verified. Models were not opened; counts come from each pack's `models.json` and README.

**What is there:** 13 packs. Four are music/VFX/ocean for Godot (Aria, Cyberpunk-Music-Set, mega-combat-vfx-kit, emberflash, tidewater x2): not usable in three.js as shipped. Firmament (sky, trees, grass) is Godot/Unity/Defold. The usable ones are generic glTF/FBX: `wild-west-town-3d` (363 low-poly models, 48 px/m pixel textures), `landscape-kit` (20 rocks, walls, timber), `stone-circle` (1 mesh) and the Firmament props.

**Gaps (nothing in any pack):** wolf, boar, deer, rabbit, zombie, runner, brute, tent, dirt bike, bow/rifle/arrow meshes, bow/rifle/wolf/zombie sound effects. Audio is music only. Those stay primitives, as the owner decided.

| Placeholder | Candidate | Triangles | Verdict |
|---|---|---|---|
| Horse mount | `wild-west-town-3d/models/glb/vehicles/horse.glb` | 1,416, rigged (`horse_rig`), clips idle/graze | Only real fit. No gallop or ride clip, no saddle slot; needs a hand-made gait. |
| Fire | `props/campfire_lit.glb` | 1,288, 9 flame meshes + `flicker` clip | Fits the camp. Triangle count is high for the Low tier. |
| Crates | `props/crate_a/b/big.glb` | 178 / 238 / 558 | Cheap, drop-in. Replaces the current ammo/wood crate boxes. |
| Hay, bedroll, logpile, sack, barrel | `props/*.glb` | 68 to 1,332 | Optional camp dressing. Bedroll is heavy for what it is. |
| Rocks, fences, cairn | `landscape-kit`, Firmament props | not read | Ride-corridor dressing; unchecked. |
| VFX (arrow, fire, muzzle) | mega-combat-vfx-kit | n/a | Godot `.tscn`: reference for timing and colour only. |

**Blockers before any of it ships:**
1. **Pipeline conflict.** CLAUDE.md and lean-scope drop the GLB pipeline ("primitives only"). Using any GLB needs the owner to lift that for the spikes (GLTFLoader from three's examples, no new dependency, but a new code path and chunk).
2. **Licence** (`wild-west-town-3d/LICENSE.md`, Out Of Tokens): commercial use, modification and shipping inside a finished build are allowed, even if the project source is public, **provided the assets are not offered as assets in their own right**. Committing the GLBs to this public repo, or leaving them as raw downloadable files in the GitHub Pages build, is the grey zone ("ship the assets inside something, not as something"). Art stays out of git anyway (`art/`, CLAUDE.md), so any use needs a build-time bake to a compact form, or a reading of the licence by the owner. The Defold and Unity Firmament packs carry no licence file of their own. Record each pack in a `SOURCES.tsv` when anything is adopted.
3. **Style.** 48 px/m pixel-art textures against the painted, lit look of the zipline game (graphics-spec.md). The horse would read as a different game unless retextured with the palette atlas.
4. **Tier budget.** Low is under 1,500 triangles per hero; horse + rider + campfire already pushes that.

**Recommendation:** keep primitives for every creature, bike and weapon. Optionally trial only the horse and the campfire, retextured to the project palette, behind the owner lifting the GLB rule; the crates are the cheapest win but gain little over the current boxes. Do not adopt anything until the owner answers the pipeline and licence questions above.

## Phone test, round 1 (owner 2026-11-27)

Fixed on the spike page:
- **"Skybox is gone at high mode"**: the ride camera's far plane was 900 m and the backdrop plate is a 900 m cylinder, so it sat on the clip edge. The camera far plane is now 3000 m, like `scene.ts`.
- **"Feels a little laggish at high mode"**: the spike set its own pixel ratio (2 at High, 1.5 at Low), above the game's phone caps. It now uses `pixelRatioFor` (ADR 0009): 1.5 at High and 1 at Low on touch.
- **"Feels too 2D"** (partly): the ride camera is lower and closer (landscape 6.5 m back and 2.6 m up, was 8.5 and 4; portrait 8 and 3.6, was 10 and 5.2). The plate is lifted by 0.3 of its height in landscape, so the snow range sits above the horizon (handoff step 5). The ground is still flat; that is the bigger part of "2D".

**Owner idea, after the spike, not started:** "rocks and rivers and downhills and uphills where horses and bike both have a chance of falling and sliding over which ends the game, or we could have 3 lives." Open questions for later: a height-field ride corridor instead of flat ground, river crossings as a hazard, a fall/slide rule per mount (speed and slope), and one life vs 3 lives. Run scout-first before any design.
