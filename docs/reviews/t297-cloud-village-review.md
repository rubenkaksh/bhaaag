# T297 Cloud Village: final review (verdict seat)

Date: 2026-11-12. Branch `claude/t297-cloud-village-91a319`, 7 commits over merge base `451b385`, 16 files, +1542/-18.
Reviewed against PRODUCT.md, `docs/briefs/T297-amendment-draft.md`, approval commit `704c685`. No gates run here (controller runs them).

## Verdict: FIX

The work fits the approved amendment: fourth mode only, one level, no level select, no shaders, no GLB, 0 texture bytes, `src/core` untouched. Classic, Chase and Nagarkot keep their behaviour. It is not mergeable as is: it was cut from a stale local `main` and conflicts with `origin/main` (T298-T304). It also grows an initial chunk that is already over budget, and the approved plan's "hand-checked by play" step has no record.

## Must-fix

1. **Branch base is stale. It conflicts with origin/main** (local `main` = `451b385`; `origin/main` = `c4ca4ce`, PR #6 T298-T304). A trial `git merge-tree` reports 2 conflicted files (see "Merge conflicts"). Merge `origin/main` into the branch and resolve as described below. Then re-run `tests/content/villageHumanlike.test.ts`. Main changed the core sim (T298 zipline auto-exit, T302 air steer, T303 JUMP ignored on the rope). The village constants (ROW_DROP 4.0, ANCHOR_H 2.0, ROW_X) were tuned until this bot passed on the old sim, so the margins are unknown.
2. **Initial-chunk budget.** `src/app/game.ts:3` imports `content/levels/village.json?raw` statically, and `game.ts:47` imports `cloudSea.ts` statically. Both land in the initial chunk for every mode, but only village uses them. The session note measures +2.4 KB gz on an initial chunk of 234.8 KB gz. The amendment restates "initial chunk <= 215 KB gz", and the chunk was already over before T297. Pick one: (a) lazy-load the village JSON and `cloudSea` with a dynamic `import()` behind `isVillage`, or (b) get an owner waiver for the overage in PRODUCT.md or the session file. Do not merge with neither.
3. **No human playthrough on record.** The approved build plan, milestone 2, says the level is "hand-checked by play". The evidence so far is the bot test plus shots, and the shots never leave spawn: the `*-later.png` debug HUD shows `pos 0.0 0.0 0.0`. Record one owner phone run in the session file before merging (QR files exist: `t297-qr*.png`). Include the tilt choice (15/20/30) and the finish time against the "< 2 min" success test.

## Should-fix

- `src/adapters/render/decor/placeDecor.ts:608-609` (via `floorY`): door-flank pots use `groundY()`, which is now a flat -58. So they sit on the cloud sea 14-50 m below their floating houses, and the plank door and step open onto the void. Use each house's wall bottom (`yBase`) as its ground when `floorY` is set, or skip foot props.
- `src/adapters/render/levelView.ts:291`: `else ROPE_TIE.set = false` also fires on every `ChaseRowsView` build (`scenery: false`), and it resets only `set`, not `live` or `anchorId`. Key it on `opts.floorY !== undefined`, or call the same full reset that `buildRopePost` does.
- `src/app/game.ts` hunks at `showChaseOver` and `dragonView.update(...)` only reformat Chase code. Revert them to shrink the merge surface (they auto-merge today, but touch T304 territory).
- Tilt and reticle: the render pitch is `camPitch - camTilt`, but `#hud-reticle` stays at screen centre. In village (default tilt 20) the reticle no longer marks the sim look direction. Aim is target-based (`computeAim`, `hasAim`), so this is cosmetic. Hide the reticle or offset it by the tilt.
- `tools/shots-village.mjs`: the "later" shot sends no input, so it is a second idle frame, not the "mid-hop view" the header claims. The script exits 0 even when it counts console errors (set `process.exitCode = 1`). If preview never comes up it goes on silently. `srv.kill()` on `pnpm exec` can orphan the vite child.
- Bot test realism (`tests/content/villageHumanlike.test.ts`): it does prove that the committed JSON is winnable through the real `step()`, with 50 seeded variants, sloppy aim and late fire. But it re-points `camYaw` at the target anchor every tick, and `moveY` follows `camYaw`, so the bot steers perfectly toward each anchor. The game has a fixed camera and the player steers with the stick. ROW_X zigzags of 4-8 m make this gap bigger than in L1. Also, the comment "game spawns with pitch 0" is wrong: `resetHero` uses `frontPitchDeg` = -12. Add a style that keeps `camYaw = spawnYaw` and steers with `moveX`.
- Visuals: in `norope-village-medium-landscape-later.png` a green hillside mass hangs across the top of the frame (backdrop or terrain seen through the tilt?). Check it. In sunset light the cloud puffs read tan or brown, not the "golden cloud sea" of the purpose text.
- Scope wording: "floating islands" is listed as out of scope, and the final layout puts each house on its own cloud bank 14-50 m above the sea. The approved shape says "houses floating at cloud level", so this is probably fine. Confirm with the owner when he plays it.
- Session file is `docs/sessions/2026-11-12-t297.md`. Rule 10 expects `docs/sessions/2026-11-12.md`, so append it there.

## Checked and fine

- `src/core`: no changes. The generator is deterministic, and `village.test.ts` asserts that the committed JSON equals the generator output, the rope limits per hop, wall height <= 8 m, and that the cloud top sits above the kill plane.
- Mode wiring: `GAME_MODES`, `MODE_INFO`, `BEST_KEYS` and `parseMode` are extended and tested. The lobby lists modes from `GAME_MODES`, which is a mode switch, not a level select.
- `?tilt=N`: clamped 0-45 and render-only (sim `camPitch` and aim are untouched). The default is 20 in village and 0 elsewhere, and Chase returns before it. -12 - 20 - 8 (downhill bias) = -40, inside `pitchMin` -60.
- `cloudSea.ts`: stock Basic and Lambert materials, 2 InstancedMeshes plus 1 plane, seeded, no textures.
- `floorY`: undefined everywhere except village, so Classic and Nagarkot decor are unchanged.

## Merge conflicts with origin/main (trial merge-tree)

| File | Region | Resolution that keeps both intents |
|---|---|---|
| `CLAUDE.md` ~l.24 | touch-scheme line | Keep main's line (Release button gone, JUMP ignored on the rope, release = DROP swipe) and add the Cloud Village line under it. |
| `src/app/game.ts` ~l.210 | `gs.buildWorld(...)` | Keep main's `houseDress: true` (Opus-review fix: Nagarkot houses dressed) and add `floorY: isVillage ? VILLAGE_CLOUD_TOP_Y : undefined`. Do not bring back `!isStrategy`. |
| `src/app/game.ts` ~l.356 | `tickCamera` | Keep main's T300 `sideYaw` easing and `base + zipYaw + sideYaw`, and use pitch `cur.camPitch - camTilt`. |

These merge cleanly (verified in the trial tree): `levelView.ts` (main's HINT pulse in `updateLevelView` and the branch's `floorY`/`ROPE_TIE`), `placeDecor.ts` (main's `free()` pad check in `dressHouses` and the branch's `floorY`), and the reformatted `dragonView.update` call (main kept the same signature). No overlap in `src/core/config.ts`, `tuning.json`, hud, touch or `dragonView`. After merging, re-run the bot test and re-shoot village with tilt 20 plus side yaw.
