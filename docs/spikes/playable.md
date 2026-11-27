# Playable hunting spike (2026-11-27)

Dev and preview only. Not in the production build, not linked from the lobby, no PRODUCT.md change (owner choice: separate page).

## Run it
```
pnpm dev      # then open http://localhost:5173/spike.html?spike=horse   (or ?spike=bike)
# phone on the same Wi-Fi: pnpm exec vite --host 0.0.0.0 --port 4174, then open http://<lan-ip>:4174/spike.html?spike=bike
```
`spike.html` is a dev-server page only (it is not part of `pnpm build`, so `vite preview` of `dist/` will not serve it).
Params: `spike=horse|bike`, `gfx=low|high`, `seed=N`, `bot=1` (scripted player drives), `ff=ticks` and `campAt=seconds` (bot fast-forward before the first frame, for screenshots).

## Controls
| | Touch | Desktop |
|---|---|---|
| Ride | left 45% floating stick: steer (pull down = brake); right side: drag to aim, hold to draw (bow) or fire (rifle); JUMP, BOOST buttons | A/D steer, S brake, mouse aim, hold click, Space jump, Shift boost, R reload |
| Camp | left stick walks; right side aims and shoots; COOK / FEED, EAT, RELOAD buttons | WASD, mouse, click, E cook/feed, Q or F eat, R reload |
| Restart | tap the end screen | Enter or Space on the end screen |

The aim point is the screen point projected onto the ground, so the rider shoots where you touch regardless of where the mount faces.

## What is in it
- Cores: `src/spikes/*.ts` (ride, camp night, weapons, enemies). Riders: `src/spikes/view/`. Page: `spike.html`, `src/spikes/play/`.
- Reused from Bhaaag: the painted Himalaya backdrop (`loadBackdrop(tier)`, dusk-to-night tint on the layer colours and the fog), the hero rig and its new shared look, `graphicsTier`.
- New, simple primitives (merged, one instanced draw per kind): wolf, boar, deer, rabbit, zombie, runner, brute, wood, ammo crate, meat, fire, tent, trees, logs, rocks, ramps, mud. No art exists for them yet: they are placeholders until the owner's GPT references arrive.
- Balance fixes found by the scripted player: bike jump 7.5 and turn 0.9 so logs and rocks can be dodged at 22 m/s; the camp has a supply cache and ammo crates and undead drop rounds; animals give up after 14 s pinned at a lit fire; feeding a nearly full fire is refused so wood is not wasted; horse waves grow 0.65 per wave (0.9 per wave was unwinnable).

## Done-test
- `tests/spikes/bot.test.ts`: scripted player rides to camp and survives to dawn on a share of 12 seeds on each spike (but not all), and doing nothing never reaches dawn. Measured over 20 seeds: horse 10 of 20 nights won, bike 15 of 20; the ride itself fails on about 1 seed in 20.
- `tests/spikes/play.test.ts`: the view follows a whole run headlessly, finite camera and aim projection.
- Screenshots: `CHROMIUM_PATH=/opt/pw-browsers/chromium node tools/shots-play.mjs` (390x844 and 844x390, Low; `GFX=high`). SwiftShader only.

## Not verified on device
No iPhone or Android check yet: touch feel, thumb reach of the buttons, frame rate on Low and High, and the backdrop tint on a real GPU are all unverified. Measured draw calls and triangles (SwiftShader): ride about 24-36 calls and 20-28k triangles, camp about 30 calls and 19-28k triangles on Low.

## Known gaps
- Creatures and camp props are placeholders; no hit flashes, death animations, sounds or particles.
- The bot is a mediocre player; human balance is untested.
- Camp pickups, enemies and projectiles are not culled by distance.
- `assets-gamedev` (owner's folder on their computer) has not been checked: the cloud session cannot see it. Share the folder in the desktop app (Settings, Claude Code, Remote Control) to let me look.
