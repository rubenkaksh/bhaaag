# Home assets: final review (Opus, 2026-11-15)

Scope: `git diff origin/main...HEAD` on `claude/determined-hopper-t0drsv` (64 files). Read-only review, no gates run.

## 1. Verdict

**NOT SHIP to main yet. Ship after 2 MUST-FIX items** (one small code change, one hand-play). The frozen levels, the core and the Low tier look safe. The diff is well fenced: everything new is opt-in through `graphEntry(...).look` / `.pathCamera`. Two things block the merge. The facade atlas is painted onto the walkable roof decks on Medium/High. And a new lobby level with a camera that turns the stick under the player has never been played to the goal. `main` deploys, so both would reach players.

Nothing works against PRODUCT.md Non-goals. Home Street is a graph level under Amendment 2026-11-13. Placer v2 is not built. There is no custom shader and no GLB. The texture caps are restated in PRODUCT.md and lean-scope.

## 2. Correctness risks in the diff

- **Core leak: none.** No file under `src/core` changes. `src/content/graph/pathCamera.ts` and `src/content/house/*` import no three or DOM code.
- **Frozen levels: unchanged by construction.** Not pixel-diffed.
  - `graphFreeze.test.ts` only adds `home-street`. `valley-1` has no `look` and no `pathCamera`.
  - `DecorKit` gains `homeTank`/`homeTin`, but `finish()` drops empty pieces, so v1 and valley-1 scenes get no new mesh.
  - `applyTierMaps` is a no-op without `userData.tierMaps`. `tileTexture(name, ext='jpg')` keeps the old default.
  - The new `shed` case is only reached by a `shed` prop.
  - `pathCam` is null on every other mode, so `cur.camYaw` is never written there.
  - The one shared visual change is `lobby.css` (H9, 6 entries), which is intended.
- **Texture budget: OK.** Sums from the manifest and the files on disk: Low ~102 KB / 150, Medium ~146 KB / 300, High ~153 KB / 600. Home files never load on Low (test-guarded). `brick_a*` ships but is never loaded (`tiers: []`).
- **Low tier: OK, with an unchecked gap.** `budget.test.ts` covers home decor at <= 55 Low draws. It does not cover what this branch adds outside the decor kit:
  - the 2 fork-marker cones: separate meshes, visible on Low, not counted;
  - the horizon card (hidden on Low).
  - `homeTin` is visible on Low, as a flat tint. That contradicts the new comment in `graphicsTier.ts` ("Low hides all of it").
- **Facade on decks (MUST-FIX 1).** `kit.ts` gives the whole `wallPlaster` piece `rich: { map: 'facade' }`. That piece also builds roof decks and parapet blocks. Its scaled unit-box UVs stretch the atlas. Result on Medium/High: window/door photo texture on the floor the hero runs on, smeared on walls. This is the "noisy/muddy" report. It breaks Principle 4 (readable sunlit rooftops) and the art-review condition ("one strip maps without UV stretch").
- **Path camera drives the stick (MUST-FIX 2, verification).**
  - The camera eases at 60 deg/s and snaps over 135 deg. It commits at a fork 2.5 m from the node centre.
  - Each of these rotates "forward" under a held stick, mid-run on a roof with open edges.
  - The fork at node 4 uses the midpoint fallback (98 deg check fails), and its exit 9 is a dead end.
  - Unit tests cannot show whether this causes deaths that no input mistake caused (graph-level success line).
- **Horizon card: dead weight.** It is likely invisible because it is `transparent` and drawn in the transparent pass after the opaque backdrop massif (`depthWrite: true`, ~1.5 km), so it fails the depth test behind it. It still costs 25 KB and one draw on Medium/High.
- **Look-drag pause is unreachable.** `frame.lookYaw/lookPitch` is never non-zero. This is harmless dead code.
- **Undone owner scope (2026-11-15 list).** Sloped roofs (landable, slide on long open slopes) are not in this diff. The deploy target is still unresolved: the owner said GitHub Pages, but `CLAUDE.md` says Cloudflare Pages. Neither blocks the merge. The owner should know both before deploy.

## 3. Visual verdict per screenshot

- **g-home-street-high.png: pass.** The overview reads as a lit row of Newari houses with red parapets, flags and a cream landing pad. The horizon card is not visible: the far backdrop is the stock massif.
- **g-home-street-medium.png: fail.** The deck and the wall behind the hero show the facade atlas as a brown photographic smear (windows on the floor, stretched streaks on the wall). The walkable surface no longer reads as plain plaster.
- **g-home-street-low.png: pass.** Flat plaster deck, clean colour language, gold anchor marker clear. A jagged stair-step band crosses the spawn wall on all three tiers. It is probably existing geometry, not this diff, but nobody has checked.
- **valley-1-high.png: pass (eyeball only).** Same v1 dressing as before (green v1 tank, rails, red house). No home look leaked. Not pixel-diffed.
- **start.png: pass.** Spawn without the facade: plain deck. This is what Medium should look like after fix 1. At spawn the camera faces the next block's wall, which is acceptable because the first edge is a touch-climb.
- **after.png: pass.** The prayer-flag line sits inside the parapet, the cream pad and pole are clear, and the route ahead is legible. Flag colours avoid gold.

## 4. Ordered fix list

1. **MUST-FIX-BEFORE-MERGE: take the facade off the plaster piece.**
   - Change: in `src/adapters/render/decor/kit.ts`, home branch, change the `wallPlaster` `tierMaps.rich` to `{ map: 'wall_plaster', normal: 'wall_plaster' }`, or drop the `wallPlaster` `tierMaps` entirely. In `src/adapters/render/textureManifest.ts`, set `facade.jpg` to `tiers: []`, or delete the file and its row.
   - Done when: a Medium spawn shot of `g:home-street` shows a plain plaster deck like start.png, and `textureBudget.test.ts` and `houseV2.test.ts` pass.
   - A wall-only facade piece is LATER (item 8).
2. **MUST-FIX-BEFORE-MERGE: hand-play Home Street to the goal.**
   - Who: the owner or the controller, on desktop.
   - How: once in a landscape window and once in a portrait window (devtools device mode is enough). Take both the main route and the node-4 decoy (9).
   - Done when: the goal is reached in under 2 minutes in both orientations. Record any death where the camera turn or the fork commit steered the hero, with the node id, in `docs/sessions/2026-11-15.md`.
   - If such a death occurs: add `"heading"` on node 4 in `content/graphs/home-street.graph.json`, re-freeze the hash in `tests/content/graphFreeze.test.ts`, and replay.
3. **LATER: merge the fork markers into one draw and count them.**
   - Change: build one merged geometry in `src/adapters/render/forkMarkers.ts`, and hide it on Low or count it in the Low draw test in `tests/adapters/budget.test.ts`.
   - Done when: a test asserts the fork markers add <= 1 Low draw.
4. **LATER: make the horizon card visible or stop loading it.**
   - Change: in `src/adapters/render/horizonCard.ts`, try `transparent: false` with `alphaTest: 0.5`, drawn before the backdrop, or `depthTest: false` with a render order below the backdrop.
   - If neither reads well, set `horizon.webp` to `tiers: []` and do not build the mesh.
   - Done when: a High screenshot shows the card above the massif, or the card costs 0 KB and 0 draws.
5. **LATER: fix the stale comment** in `src/adapters/render/graphicsTier.ts`. `homeTin` stays on Low as a flat tint.
6. **LATER: check the hay cover.** Take one Low and one Medium close shot of a hay cushion. Done when: cream is still at least half of the visible top. If not, narrow the `homeTin` strip in `houseV2.ts` `hayCover`.
7. **LATER: wire or remove the look-drag pause.** Either give `PathCam.update` a real look signal, or remove `paused` and its argument (`src/content/graph/pathCamera.ts`, `src/app/game.ts`).
8. **LATER: wall-only facade.** Add a separate vertical-face piece with per-storey UVs, as the art review intended (kit v2, 8 m x 2.8 m strip). Medium/High only, inside the 24 instanced-mesh cap.
9. **LATER: commit the art-direction review.** Commit `docs/reviews/art-direction-opus-review.md` (untracked) with this review.
10. **LATER, owner call before merge: the reference photos.**
    - The 18 MB of owner reference photos in `docs/handoff/references/` enter `main` history for good.
    - A quick header scan found no GPS strings, but nothing has confirmed it with an EXIF tool.
    - Owner decides: keep them, or move them out (`assets-src/`, gitignored) before merge.
11. **LATER: before deploy.**
    - Owner confirms the deploy target (Cloudflare Pages vs GitHub Pages).
    - Real-phone run of Home Street on Medium.
    - Pixel diff of valley-1 against `main`.
    - Sloped-roof task scheduled or explicitly deferred by the owner.
