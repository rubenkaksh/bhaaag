# Three-track plan: mobile graphics, portrait, Dragon Chase (2026-11-10)

Architect: Opus. Builders: three Sonnet agents in parallel worktrees, after one short sequential
Track 0. Owner lifted two PRODUCT.md non-goals for this work: portrait layout, and a scoring chase
mode beyond the single L1 descent. Everything else in PRODUCT.md, CLAUDE.md and
`docs/lean-scope.md` still holds: stock three.js materials only (no custom shaders, no GLB), one
level (L1), `src/core` pure TS (no three/DOM), gold/cream/terracotta colour language, one-hit
death, instant restart, JS under ~600 KB gz.

Source request (verbatim): "1. Now is time to optimize graphics more so that it performs and looks
like a proper web mobile miniclip small game so we cut on unnecessary graphics and add to the
detailing instead. 2. Also would love to see this map on portrait mode. Thats how I originally
planned it. On mobile at least. 3. And one game mode where this cloud dragon in the pic above is
chasing us downhill while we zipline and parkour to run away from him in a high scoring game
mode. When dragon catches up it gets cloudy and game over." Reference picture: a huge dragon made
of grey-white sunlit cloud puffs (head with a glowing orange eye on the left, one big bat wing,
long coiling tail) over the Kathmandu valley at orange sunset.

## 0. Baseline (measured 2026-11-10, HEAD 8c299ea, SwiftShader, `?debug` HUD)

| Tier | 1920x1080 desktop | 844x390 phone landscape (DPR 3, canvas 1266x585, pr 1.5) |
|---|---|---|
| Low | 74 calls, 63.3k tris | 80 calls, 63.5k tris |
| Medium | 136 calls, 158k tris (shadow pass included) | 136 calls, 158k tris |
| High | "1 call, 1 tri": broken, the EffectComposer's last pass resets `renderer.info` | same |

- Portrait phone (390x844): the rotate overlay covers PLAY, so the game never starts.
- JS bundle: 795.9 KB raw / **212 KB gz** (one chunk; post-processing is bundled even when unused).
  Textures: 160 KB in `public/assets`.
- `renderer.info` counts shadow-pass draws too. So Medium is about 70 main-pass calls plus about
  66 shadow calls: every lit opaque mesh casts, decor included.
- The hero alone is 28 draw calls (`heroRig.ts`). Merging them is out of scope because the hero
  rework (P5) is locked.

## 1. Decisions (summary)

1. **Chase world: endless ring-slot streaming.** The core `World` stays static AABB arrays with fixed
   capacity. Six row slots get rewritten in place, from a pure `rowSpec(seed, row)`. Nothing is
   allocated and ids never change. Visuals are rebuilt from the same pure row boxes.
2. **Dragon catch rule:** a 1-D scalar in core. `gap = dragonZ - hero.pz`. Caught when
   `gap <= catchGap` (2.5 m), checked once per fixed tick after `step()`. Dragon speed ramps up
   with time, and rubber-banding stops it falling behind more than `gapMax`. It never slows down
   for a struggling player.
3. **Portrait: same hill, same sim.** A pure `framingFor(viewport, cameraCfg)` keeps the horizontal
   FOV usable: vertical FOV up to 88 degrees, longer and higher arm, no shoulder offset, and a lens
   shift (`camera.setViewOffset`) that puts the hero in the lower third. Portrait touch layout is
   CSS-only. The rotate overlay and the pause are deleted.
4. **Perf budgets:** phones default to Medium. Per tier on phones: Low 55 main calls / 60k tris /
   pr 1.0; Medium 70 / 110k / pr 1.25 with a lane-only shadow pass of 14 or fewer; High 85 / 170k /
   pr 1.5. No composer on any coarse-pointer device. Post-processing is loaded with dynamic import.
5. **Ownership:** a sequential Track 0 lands every shared contract first. Then each hot file has
   exactly one owner. `game.ts` belongs to Track 3, `scene.ts` to Track 1, the CSS/HUD/touch files to
   Track 2. Merge order: 0, then 1 (gfx), then 2 (portrait), then 3 (chase).

---

## A. Track 1: graphics optimisation (mobile Miniclip look)

### A1. What to cut (cost with no visible gain on a phone)

| Cut | Where | Why |
|---|---|---|
| Pixel ratio on coarse pointers: Low 1.0, Medium 1.25, High 1.5 (desktop 1.5 / 2 / 2) | `graphicsTier.ts` `maxPixelRatio`, `pixelRatioFor` | Fill rate is the phone bottleneck. 1.25 squared is 1.56x pixels, against 2.25x today. |
| EffectComposer + bloom on every coarse device. Lazy-load the post-processing modules with `import()` (desktop High only) | `scene.ts` `buildComposer` | Full-screen passes plus a HalfFloat MSAA target are the costliest thing on mobile GPUs. Also takes ~10-15 KB gz off the initial bundle. |
| God-ray cards, `cloudsHigh`, dust points on coarse devices (all tiers) | `scene.ts` `applyConfig` (the `rich` flag becomes `rich && !coarse`) | Large alpha-blended overdraw. Barely visible at phone size. |
| Shadow casters: only the hero, route houses and decoys, and decor within 12 m of the lane centre cast. Forest, hill trees, field walls, strings, flags and birds never cast | `scene.ts` `applyFlags` (name/userData rule) and `placeDecor.ts` (tag far pieces `userData.noCast`) | The shadow pass is about 66 calls today. Shadows only read near the lane. |
| Medium shadow map 1024, halfExtent 30 to 24 on coarse devices | `graphicsTier.ts` | Texel density near the hero is kept with a smaller frustum. |
| Normal maps: High only (Low/Medium materials drop `normalMap`) | `levelView.ts`, `scene.ts` material swap | Per-fragment cost and texture memory, invisible at 0.5 MP. |
| Small clutter beyond 25 m from the lane (pots, small crates, small prayer-flag strings). Forest density Low 0.3 to 0.2 | `decor/placeDecor.ts`, `scene.ts` `applyForest` | Subpixel at phone size, but each piece costs instances and triangles. |
| Governor threshold 22 ms to 20 ms average; also applies to a saved "medium" on coarse devices for the first session after this update | `scene.ts` `govern` | Weak phones land on Low faster. |

### A2. What to add with the savings (bold, readable, Miniclip)

1. **Hero contact blob:** on all tiers, a dark ellipse (`MeshBasicMaterial`, transparent, depthWrite
   false) projected straight down onto the highest solid under the hero. It anchors the hero on
   every roof, which helps most on Low with no shadows. 1 draw call.
2. **Hero value contrast:** darker trousers and torso and a saturated scarf accent (colours only,
   no geometry: P5 lock). A test checks the luminance gap between the hero torso and the cream pad
   and roof colours.
3. **Anchor readability:** the next on-route anchor gets a bigger gold head (visual radius
   0.35 to 0.5), a gold ring billboard and a thin vertical light beam (`MeshBasicMaterial`, additive,
   fog false, 12 m tall). Readable from 80 m. All within the 5 additive meshes allowed. Decoy
   anchors keep their look.
4. **Pads:** cream pads get a 0.15 m darker cream border strip (clean Miniclip edge), done by
   splitting the pad mesh into fill and border in the same merged geometry (no new draw call).
5. **Route-house detail near the lane** (route houses and decoys only, faces within 12 m of x = 0):
   - Newari carved window frames: dark wood boxes with a 3-bar lattice.
   - Eave struts under roof overhangs.
   - Roof overhang 0.4 m.
   - Parapet cap strip.
   - Door frame on the downhill face.
   - Brick string course.
   All use existing kit pieces or new pieces in the same instanced meshes. The instanced mesh
   count stays at 24 or fewer, and the decor triangle total drops overall because the far clutter
   is cut.
6. **Chunkier silhouettes and grade:** slightly higher saturation near the lane, and keep the
   hemisphere warmth. Low and Medium stay Lambert. High on desktop keeps Standard for walls and roofs.

### A3. Budgets per tier (binding; ADR 0009 supersedes the ADR 0008 table)

| Tier | maxPixelRatio coarse / fine | Main-pass calls | Shadow-pass calls | Triangles (main + shadow) | Composer | Target |
|---|---|---|---|---|---|---|
| Low | 1.0 / 1.5 | <= 55 | 0 (blob only) | <= 60k | none | 60 fps, iPhone 11 / 2020 mid Android |
| Medium (phone default) | 1.25 / 2 | <= 70 | <= 14 | <= 110k | none | 60 fps, iPhone 12 class |
| High | 1.5 / 2 | <= 85 | <= 24 | <= 170k | bloom on fine pointer only | 60 fps, desktop iGPU, iPhone 14+ |

- Dragon Chase may add **at most +6 calls and +12k triangles** on top of each tier cap (Track 3
  verifies this).
- JS work per frame (sim + view updates + HUD, excluding `gs.render`) must stay at **4 ms or less
  on average** with Chromium CPU throttling 4x.
- JS bundle after all three tracks: **<= 240 KB gz** (initial chunk). Added textures: 0 KB.
- Large alpha layers covering more than 25% of the screen on coarse devices: sky dome and haze
  only (2 at most).
- **Default tier:** coarse pointer goes to Medium unless there is a hard weak signal (4 or fewer
  cores, or 4 GB or less memory), which goes to Low. The governor drops an auto-chosen tier to Low
  if the average frame is over 20 ms after warm-up. Desktop keeps Medium as the default.

### A4. Verification without a real GPU

1. `frameStats()` (Track 0 contract): `renderer.info.autoReset = false`, reset once at the start of
   `render()`, so composer passes are summed and High becomes measurable. It reports `calls`,
   `triangles`, `shadowCasters` (visible meshes with castShadow, a proxy for shadow-pass calls),
   `pixelRatio`, canvas w/h, `textures`, `geometries`, `programs` and `jsMs` (EMA).
2. `tools/perf.mjs` (Track 1, **port 4181**) runs every tier against three viewports:
   1920x1080 desktop, 844x390 touch DPR 3, and 390x844 touch DPR 3.
   - It reads `window.__ztStats` (present only with `?debug`) at the spawn view and again 3 s into
     a scripted run (hold W).
   - It runs once more with CDP `Emulation.setCPUThrottlingRate` 4 to get `jsMs`.
   - It writes `art/perf/<label>.json` and exits 1 when a table cap is exceeded.
3. Vitest static budgets: extend `tests/adapters/graphicsTier.test.ts` (pixel ratio, composer null
   on coarse, shadow sizes) and `decor.test.ts` (instanced meshes <= 24, decor triangles, casters
   tagged). Add `tests/adapters/budget.test.ts` for static triangle totals per tier from the data
   functions (backdrop, decor stats, sky).
4. Bundle: `pnpm build` and read the gzip size of the initial chunk from the output.
5. Owner gate (the only real frame-time measurement): a phone on the LAN dev server (:5180) with
   `?debug`, Medium, fps at 55 or more for 30 s of play. It is listed under G and is not blocking for
   the agent.

---

## B. Track 2: portrait mode

### B1. Camera framing (pure, `src/adapters/render/framing.ts`)

`framingFor(v: ViewportLayout, base: CameraCfg): Framing` returns `{ camera: CameraCfg, lensShiftY }`.

- **Landscape** (`aspect >= 1`): returns `base` unchanged and `lensShiftY = 0`. Desktop and current
  landscape phones stay byte-identical.
- **Portrait** (`aspect <= 0.6`, a full blend between 1.0 and 0.6 via smoothstep on aspect):

| Field | Landscape | Portrait |
|---|---|---|
| fov (vertical) | 60 | `clamp(2*atan(tan(26deg)/aspect), 60, 88)`, i.e. 88 at 390x844 (hFOV about 48 degrees) |
| fovMax | 75 | fov + 10, cap 98 |
| dist / distSlide | 4.5 / 6.5 | 5.6 / 8.0 |
| height | 1.6 | 2.2 |
| shoulder | 0.6 | 0 (centre the hero in the narrow view) |
| downhillBias | 8 | 12 |
| lensShiftY | 0 | 0.14 (hero sits at about 64% of the height; more downhill route above him) |

- The lens shift uses stock `camera.setViewOffset(w, h, 0, -lensShiftY*h, w, h)`, applied in
  `scene.ts` `resize` through the Track 0 `setLensShift`. The aim ray is unchanged (the sim aims from
  the head along camYaw/camPitch), so the reticle moves to the shifted principal point. Track 0 sets
  a `--lens-shift` CSS var, and Track 2 uses it in `hud.css` for the reticle and aim-reason
  position, and in `projectWaypoint`.
- Why it works on this map: the route is a straight fall line, so a narrow horizontal view loses
  only the decoys (12 m off-lane: about 24 degrees, right at the edge). The tall view shows two or
  three rows ahead. Track 3's generator caps the lateral shift at 6 m or less per row so the next
  chase anchor stays inside the portrait view.

### B2. Touch layout in portrait (`touch.css` portrait block, coarse only)

- `#look-zone`: `inset: 0` (full screen, z 9). Look-drag, swipe-down DROP and taps work anywhere
  that is not stick or button.
- `#stick-zone`: bottom-left, `left 0; bottom 0; width 50vw; height 42vh` (z 10). The floating
  stick's resting ghost sits at the left thumb.
- `#btn-action`: bottom-right, `--a: clamp(76px, 22vw, 100px)`.
- `#btn-jump`: up and to the left of ACTION, at the right-thumb arc (`--j: clamp(60px, 17vw, 80px)`),
  not directly above it. A portrait thumb pivots from the bottom corner.
- All offsets use `env(safe-area-inset-*)`. The home indicator needs the bottom inset plus 8 px.
- `--controls-h` (declared in Track 0) is about 42vh in portrait, so the HUD and Track 3's chase HUD
  keep clear of the thumbs.
- `TouchInput`: no logic change is needed for zones. Review its overlapping-zone hit test: the
  topmost element gets pointerdown, and `setPointerCapture` stays. Add `reset()` on orientation flip
  (Track 0 wires the call). The 128 px stick radius is unchanged.

### B3. HUD and lobby in portrait

- `hud.css` portrait block (`@media (orientation: portrait)`, any pointer):
  - Switch the `vh`-based clamps to `vw`.
  - Timer pill top-centre below `env(safe-area-inset-top)`.
  - Hop and objective under it.
  - Altitude meter on the right edge from `20vh` to `calc(var(--controls-h) + 16px)` from the bottom.
  - Pause top-right.
  - Toast at about 40% height, max-width 88vw.
  - Win overlay as a full-width card.
- Do not rename or remove any HUD element id. Track 3's chase CSS hides elements by id.
- `waypointMath.ts`: `waypointTopPx(w, h, portrait)` replaces the inline formula in `game.ts`
  (Track 0 moves the call). `projectWaypoint` honours `shiftY`.
- `lobby.css` portrait block: a vertical stack (title, art band about 30vh, mode radiogroup, PLAY,
  best, graphics radiogroup, controls list in 2 columns). Every tap target at least 44 px. The SVG
  art already uses `slice`.
- The rotate overlay, its CSS and the portrait pause are deleted in Track 0. Orientation changes
  mid-run are live:
  - `watchViewport` triggers resize, framing, lens shift and `input.reset()` on an orientation flip.
  - A URL-bar resize does not reset input.
  - There is no pause.
- iOS Safari has no orientation lock or fullscreen. Use `100dvh`/`inset: 0` (already on the canvas),
  `visualViewport` resize, and safe-area insets. Never rely on `screen.orientation`.

---

## C. Track 3: Dragon Chase mode

### C1. Options and recommendation

| Option | Score potential | Cost | Verdict |
|---|---|---|---|
| Fixed short chase on L1 (130 m, about 20 s) | none: a time trial with a dragon | low | Rejected: not a high-score mode. |
| Long fixed generated level (about 40 rows, 1.1 km) | capped | medium: huge static world, terrain and backdrop must be extended | Fallback only. |
| **Endless ring-slot streaming** | unbounded: distance plus style | medium-high | **Recommended.** It degenerates into the fixed option when `slots >= rows`, so the fallback is free. |

### C2. How endless streaming works with the deterministic core

- **Geometry is translation-invariant along the fall line.** The hill is the planar ramp
  `hillY(z) = tan20*z - 8`. A house row built at local `zTop = 3.5, cx = 0` and translated by
  `(cx, GRADE*dz, dz)` is exactly a row further downhill.
- **Row spec (pure):** `rowSpec(seed, r)` in `src/core/chase/rows.ts` uses a stateless hash
  (mulberry32 of `seed ^ imul(r, 0x9E3779B1)`), so recycle order never matters. It returns
  `{ n: 1..3 houses, gap: metres before the next row, cx: lane x, decoy: -1|0|1, pitched: 0|1 }`.
  Difficulty `d = min(1, r/40)`:
  - Rows 0-3 are fixed L1 rows: n 2, gap 13, cx 0, decoys as L1 (row 1 left pitched, row 3 right).
    The opening is identical to Classic.
  - From row 4: n weighted 1/2/3 (0.2 / 0.5 / 0.3); gap in `[11, 13 + 4d]`; cx moves in 2 m steps
    with `|delta cx| <= 6` and `|cx| <= 8`; decoy probability `0.2 + 0.3d` on a random side;
    pitched probability 0.5.
  - The row-to-row hop always targets the first house of the next row (as L1).
- **Row boxes (pure):** `rowBoxes(spec, rowZTop)` produces solids, style, pads, anchors and roofs
  with exactly the `tools/genLevel.mjs` formulas: roof slab, wall, balcony (parity of k), two curbs,
  plinth, annex drop 2.6, anchor `top + 1.6` at `cz + 1`, decoy at `cx ± 12`.
  - Test: rows 0-3 of any seed equal the L1 houses in `content/levels/l1.json` (boxes, styles,
    anchors).
  - Test: absolute boxes equal local boxes plus the row offset, within 1e-9.
- **Fixed-capacity world** (`buildChaseWorld(seed, cfg)`):
  - Fixed part: kill slab, one hill ramp from z 26 to z -200000 (doubles; fine), long side barrier
    walls, back wall at z 26, `killPlaneY = -1e9` (the ramp catches every fall; a hard landing still
    kills), empty `goal`.
  - `slots = 6`. Each slot owns fixed index ranges: 19 solids (3 houses x 6 plus 1 decoy wall),
    1 roof (2 ramps), 2 anchors (route plus decoy) and 3 pads.
  - Unused entries are **parked**: collapsed AABBs at `(0, -1e4, 0)`; anchors parked there too
    (beyond `maxLen`, never picked).
- **Streaming step** (`chaseStep(cs, hero, world, cfg)`, called by `game.ts` once per fixed tick
  right after `step()`, play phase only):
  1. `heroRow` = the largest live row with `rowZTop <= hero.pz + 0.5` (the hero is on it or past it).
  2. While `heroRow >= oldestLiveRow + 2`: rewrite the oldest slot's ranges in place with row
     `newestLiveRow + 1`. Ids never change, and the hook's anchor is at least 2 rows ahead of the
     recycled slot (assert in tests).
  3. `world.route` = route-anchor ids of live rows with `row > heroRow`, ascending, refilled in place
     (`length = 0`, push). `pickAnchorAssisted`'s early and late cones then apply to the next
     two hops.
  4. Hops: on `HERO_EV_HOOKED`, if the anchor is the route anchor of row `r > lastHopRow`, then
     `hops++` and `lastHopRow = r`.
  5. Clean landing: `HERO_EV_LANDED` with the hero's xz inside a live pad and the pre-landing
     `-vy < landing.vyClean` adds `cleans++`.
  6. Perfect: `HERO_EV_PERFECT` adds `perfects++`.
  7. Distance: `maxProgress = max(maxProgress, spawnZ - hero.pz)`.
  8. The dragon advances (C3).
  The step is pure, allocation-free and uses fixed dt. `copyChaseState` exists for prev/cur render
  interpolation.
- **Score:** `floor(maxProgress) + 25*hops + 10*cleans + 10*perfects`. It is shown live. The best
  score lives in localStorage `bhagdori.best.chase` (Track 0 `BEST_KEYS.chase`).
- **Seed:** each run gets a new seed (`Math.random` in the adapter, passed into core). Rows 0-3 are
  always the L1 opening. `?debug` shows the seed, and `?seed=` pins it.
- Existing core files are **frozen**: `sim.ts`, `hook.ts`, `hero.ts`, `world.ts`, `preview.ts` and
  `input.ts` are not edited. `config.ts` only gets the appended `chase` section.

### C3. The dragon (core rule, then view)

**Core (`src/core/chase/dragon.ts`).** `dragonZ` starts at `spawnZ + startGap`. Each tick:

```
vBase = min(vMax, v0 + accel * t)
v     = vBase + (gap > gapMax ? rubberK * (gap - gapMax) : 0)
dragonZ -= v * dt
gap   = dragonZ - hero.pz
caught = gap <= catchGap
```

- Tuning (`tuning.json` "chase", mirrored in `DEFAULT_TUNING`):

```
startGap 36, v0 4.0, accel 0.045, vMax 10.5, gapMax 45, rubberK 0.4, catchGap 2.5,
fogGap 22, slots 6, scoreHop 25, scoreClean 10, scorePerfect 10
```

- Calibration: Track 3 measures the mean z-speed of a scripted bot on rows 0-12. Set `v0` to about
  0.6x the bot's speed and `vMax` to about 1.2x a clean skilled line. Document both numbers in
  ADR 0010.
- The dragon is frozen during the pan. It ignores x: it chases along the fall line.
- Speed is the skill pressure. Standing still gets you caught in about 8 s; clean fast lines keep
  the gap open. There is no mercy slowdown.
- Any normal death (wall, hard landing, fell) also ends the run with the same game-over card.

**View (`src/adapters/render/chase/dragonView.ts`, stock materials only):**
- Spine of 24 nodes. Head at `(laneX, hillY(dragonZ) + alt, dragonZ)` with
  `alt = lerp(4, 16, clamp(gap / gapMax))`. The body trails uphill in an S-curve; a sine wave runs
  along the spine and the tail coils.
- **Puffs:** one `InstancedMesh(IcosahedronGeometry(1, detail))`, flat-shaded `MeshLambertMaterial`
  with `instanceColor` (warm sunlit top `#f3d2b0`, grey-violet underside `#8e8698`) and a faint warm
  emissive `#3a2418`. Per-instance scale follows the spine profile: head 3.5, neck 2, body 4, tail
  down to 0.5.
- **Wing:** 6 finger spines of flattened puffs (same InstancedMesh) plus one membrane `ShapeGeometry`
  (`MeshLambertMaterial`, transparent 0.75, DoubleSide). Slow flap.
- **Eye:** `SphereGeometry` `MeshBasicMaterial #ff9a2e` (fog false) plus a `Sprite` glow (additive;
  counts toward the 5 additive meshes).
- Per tier: Low 48 puffs at detail 0; Medium 110 at detail 1; High 160 at detail 1. 4 draw calls,
  about 1k / 9k / 13k triangles. castShadow false.
- **Visibility:** the third-person camera looks downhill, so a chaser behind is off-screen. That is
  accepted and covered by:
  1. Chase pan intro: 2.5 s from in front of the dragon's head swinging round to behind the hero.
  2. HUD gap meter: a dragon-head icon sliding toward a hero icon, with metres, pulsing terracotta
     under 12 m.
  3. Cloud creep: `gs.setCloudCover(k)` with `k = smoothstep((fogGap - gap) / (fogGap - catchGap))`.
     Fog turns cloud-white and moves in; the sun dims by up to 55%.
  4. Twelve wisp puffs stream past the camera from behind once `gap < 15`. They are part of the
     dragon InstancedMesh, so no extra call.
  5. The catch reveal: the camera turns 180 degrees over 0.6 s to the head and glowing eye while the
     white fills the screen.

### C4. "It gets cloudy": the game-over sequence

1. While the gap closes: cover `k` drives the fog. A DOM `#chase-cloud` layer (top-heavy white
   radial gradients) runs at opacity `0.85*k`.
2. When caught (or any death in chase): phase `dead`. The cover ramps to 1 over 0.4 s while the
   camera turns back. At 0.8 s the game-over card appears.
3. Game-over card:
   - Title: "The cloud dragon caught you", or the `DEATH_MSG` text.
   - Big score, then "Best" (NEW BEST highlighted in gold).
   - A line with distance, hops, clean landings and perfect releases.
   - **RETRY** (gold, primary) and **MENU**.
4. Any key or tap after 0.5 s retries: a new seed, rows rebuilt, cover 0. There is no auto-restart
   in chase, because the player must see the score. Classic keeps its 0.3 / 0.8 s auto-restart.

### C5. HUD and lobby

- **Chase HUD** (`src/adapters/ui/chaseHud.ts` + `chaseHud.css`): score pill top-centre (replaces
  the timer slot), distance under it, and a dragon gap meter on the left edge (vertical in portrait,
  horizontal under the score in landscape).
- `body.mode-chase` hides `#hud-timer`, `#hud-hop` and `#hud-alt` by id.
- Portrait and landscape both use Track 0's CSS vars (`--hud-top`, `--hud-side`, `--controls-h`).
- **Lobby:** the "Classic / Dragon Chase" radiogroup and the per-mode best line come from Track 0.
  Track 3 does not touch `lobby.ts` or `main.ts`.

### C6. Chase visuals for an endless hill

- **Rows** (`chase/chaseRowsView.ts`):
  - When any slot changes (a per-slot version counter is read in `onRender`), build one
    `World`-shaped mini world holding the live rows in local coordinates relative to the oldest live
    row.
  - Call `buildLevelMeshes(mini, { scenery: false })` (Track 0 contract). It does house dressing on
    the plane, with no ground, forest, birds or rope post.
  - Position the group at the oldest row's offset. Swap it in and dispose the old group's
    geometries and materials, but not the cached tile textures. Then call `gs.refreshFlags()`.
  - Budget: rebuild of 4 ms or less median (logged under `?debug`). If it is over, fall back to a
    pool of per-variant groups keyed by `n|decoy|pitched`.
  - Next-anchor pulse: `updateLevelView(rowsGroup, t, idx)`, with `idx` the next route anchor's index
    in the mini world's route.
- **Endless ground** (`chase/endlessGround.ts`):
  - A terrain strip about 600 m long and ±150 m wide. `y = planeY(z)` inside |x| <= 34.
  - Flanks: a bowl plus noise that is **periodic in z with period P = 108 m**.
  - Vertex colours copied from `decor/groundMesh.ts` (copied, not imported, because Track 1 may
    change that file).
  - 2 InstancedMeshes of stock cone and icosahedron trees on the flanks, placed periodically and
    thinned per tier.
  - The group snaps by `k*P` along `(0, GRADE*dz, dz)` when the camera passes. The terrain is
    periodic, so the snap is invisible. Segments: Low 24x48, Medium/High 48x96.
- **Backdrop and sky:** the sky already follows the camera. In chase, `gs.backdropRoot.position` is
  set to `(0, camY - camY0, camZ - camZ0)` every frame (the far mountains at infinity).
- **Classic untouched:**
  - `mode === 'classic'` runs the existing code path. Every chase branch in `game.ts` is guarded
    by `if (chase !== null)`.
  - The classic world, `gs.buildWorld`, pan, best time, waypoint, auto-restart and HUD are unchanged.
  - The 351 existing tests stay green, and Classic screenshots match the pre-Track-3 shots.

### C7. Core versus adapters

| Pure core (`src/core/chase/`) | Adapters / app |
|---|---|
| `rows.ts` (rowSpec, rowBoxes), `chaseWorld.ts` (buildChaseWorld, slot layout, recycle), `dragon.ts`, `chase.ts` (ChaseState, newChaseState, copyChaseState, chaseStep, score) | `render/chase/{dragonView, chaseRowsView, endlessGround}.ts`, `ui/chaseHud.{ts,css}`, `app/game.ts` wiring, `audio/sfx.ts` (appended `wind(k)`, `roar()` procedural) |

---

## D. File ownership, contracts and merge order

### D1. Track 0: shared contracts (sequential, before forking; one Sonnet agent; controller commits)

Branch `feat/three-track` from `feat/hillside-level` (8c299ea). Track 0 lands every cross-track
interface, so the parallel tracks never edit the same file.

**Contracts (exact names):**

```ts
// src/app/modes/mode.ts
export type GameMode = 'classic' | 'chase';
export const GAME_MODES: readonly GameMode[];          // ['classic', 'chase']
export const MODE_KEY = 'zt.mode';
export const MODE_INFO: Record<GameMode, { label: string }>; // 'Classic', 'Dragon Chase'
export const BEST_KEYS: Record<GameMode, string>;      // { classic: 'bhagdori.best.l1', chase: 'bhagdori.best.chase' }
export function parseMode(v: unknown): GameMode | null;
export function loadMode(store?, override?): GameMode; // ?mode= > saved > 'classic'
export function saveMode(m: GameMode, store?): void;
export function readBest(m: GameMode, store?): number; // 0 = none
export function writeBest(m: GameMode, v: number, store?): void;
export function bestLabel(m: GameMode, v: number): string; // 'Best time 0:21.4' | 'Best score 1234' | 'No best ... yet'

// src/app/viewport.ts
export type Orientation = 'landscape' | 'portrait';
export type ViewportLayout = { w: number; h: number; aspect: number; orientation: Orientation; coarse: boolean };
export function layoutFor(w: number, h: number, coarse: boolean): ViewportLayout; // pure
export function readViewport(): ViewportLayout;
/** resize + orientationchange + visualViewport.resize, rAF-coalesced, re-read 250 ms after an orientation change. Returns unsubscribe. */
export function watchViewport(cb: (v: ViewportLayout, orientationChanged: boolean) => void): () => void;

// src/adapters/render/framing.ts  (Track 0: identity; Track 2: real)
export type Framing = { camera: Tuning['camera']; lensShiftY: number };
export function framingFor(v: ViewportLayout, base: Tuning['camera']): Framing;

// GameScene additions (scene.ts; Track 1 must keep them working)
setCloudCover(k: number): void;   // 0..1, re-applied after every applyConfig
setLensShift(fracY: number): void; // camera.setViewOffset in resize; 0 clears it
refreshFlags(): void;             // flagsDirty = materialsDirty = true (for groups added after buildWorld)
frameStats(): FrameStats;         // { calls, triangles, shadowCasters, pixelRatio, width, height, textures, geometries, programs }

// levelView.ts
export type BuildLevelOpts = { scenery?: boolean }; // default true
export function buildLevelMeshes(world: World, opts?: BuildLevelOpts): Group;
// scenery:false => no ground mesh, forest, hill trees, field walls, birds, rope post;
// house dressing uses planeY(z) for ground height.

// game.ts
export type GameHandle = { mode: GameMode; pause; resume; restart; destroy };
export function startGame(canvas, root, mode: GameMode = 'classic'): GameHandle;
// Until Track 3 lands, 'chase' logs console.info and runs classic.

// lobby.ts
LobbyHandlers = { onPlay: (mode: GameMode) => void; onMenu: () => void; getBestLabel: (mode: GameMode) => string };
// Markup adds <div id="lobby-mode" role="radiogroup"> above PLAY (2 buttons, data-mode).

// hud.css :root (declared with current landscape values; Track 2 sets portrait values)
--hud-top; --hud-side; --controls-h: 0px;
// document.documentElement --lens-shift set by game.ts on every viewport change.
```

**Track 0 steps:**
1. Create the files above.
2. Wire `game.ts`:
   - `watchViewport` replaces `window.addEventListener('resize', gs.resize)` and the
     portrait-pause block.
   - On change: `gs.resize()`, `camCfg = framingFor(v, cfg.camera).camera`, `gs.setLensShift`,
     `--lens-shift`, and `input.reset()` on an orientation flip.
   - `tickCamera` uses `camCfg`.
   - The waypoint top uses `waypointTopPx(w, h, portrait)` from `waypointMath.ts`, which reproduces
     the current formula for landscape.
   - `projectWaypoint` gains an optional trailing `shiftY = 0`.
   - Under `?debug`, set `window.__ztStats = {...gs.frameStats(), jsMs}` each frame (jsMs = EMA of
     onStep plus onRender up to `gs.render`).
   - The `readBestTime` export stays as a thin wrapper around `readBest('classic')`.
3. `main.ts`: drop `screen.orientation.lock('landscape')` but keep the fullscreen request. On
   `onPlay(mode)`, if `game.mode !== mode`, destroy it and start a new game.
4. `lobby.ts`: add the mode radiogroup plus a per-mode best line. Hint text becomes
   "Portrait or landscape, both work".
5. `lobby.css`: `#lobby-mode button` joins the `#lobby-gfx button` selectors.
6. Delete `#rotate` from `index.html` and `touch.css`. Update the comments in `touch.ts`.
7. Docs (owner intent):
   - PRODUCT.md Non-goals: remove "Portrait layout"; add "Modes beyond Classic L1 and Dragon Chase".
     Platform line: "Landscape and portrait on phones".
   - `docs/lean-scope.md`: add "Amendment 2026-11-10: portrait play and a Dragon Chase score mode
     (owner lifted)".
   - CLAUDE.md Orientation bullet: "portrait and landscape both playable (decided 2026-11-10)".
8. Tests: `tests/app/mode.test.ts`, `tests/app/viewport.test.ts` (`layoutFor`),
   `tests/adapters/framing.test.ts` (identity for aspect >= 1), and a `buildLevelMeshes` scenery
   false test (no `decor_ground`, no birds).

**Track 0 gates:** `pnpm lint`, `pnpm typecheck`, `rtk test ./node_modules/.bin/vitest run`,
`pnpm build`, and `node tools/shots.mjs t0` (port 4177, nobody else is running yet). Landscape
shots must be unchanged. The controller reviews and commits, then creates the worktrees:

```
git worktree add ../bhagdori-gfx      -b track/gfx      feat/three-track
git worktree add ../bhagdori-portrait -b track/portrait feat/three-track
git worktree add ../bhagdori-chase    -b track/chase    feat/three-track
(cd each && pnpm install --frozen-lockfile)
```

### D2. Ownership map (after Track 0)

| File / area | Owner | Others |
|---|---|---|
| `src/adapters/render/{scene, graphicsTier, skyView, backdrop, levelView, terrain, tileTexture, heroView, heroRig, heroPose, waypointView, aimPreviewView, dustPuff, cameraFx}.ts`, `render/decor/*`, `src/app/{ropeView, ropePost}.ts`, `public/assets/*`, `tools/shots.mjs`, `tools/perf.mjs` (new), `docs/adr/0009-*.md`, `docs/graphics-spec.md` | **T1** | T3 reads only, and may call only the frozen API: `buildLevelMeshes(world, opts)`, `updateLevelView(group, t, idx)`, `GameScene` members, `getTier()`, `GraphicsTier`. T1 must keep those signatures and behaviours, including `scenery:false`. |
| `src/adapters/ui/{touch.css, hud.css, hud.ts, lobby.css, waypointMath.ts}`, `src/adapters/input/touch.ts`, `src/adapters/render/framing.ts`, `src/app/viewport.ts`, `tools/shots-portrait.mjs` (new) | **T2** | Nobody else. T2 must not rename or remove HUD or lobby element ids, and must not edit `game.ts`. If it needs a `game.ts` change, it describes the change in its report and the controller applies it after merge. |
| `src/app/game.ts`, `src/core/config.ts` (append `chase` only), `content/config/tuning.json` (append `chase` only), `src/core/chase/*` (new), `src/adapters/render/chase/*` (new), `src/adapters/ui/chaseHud.{ts,css}` (new), `src/adapters/audio/sfx.ts` (append only), `tests/core/chase*.test.ts`, `tests/adapters/dragon*.test.ts`, `tools/shots-chase.mjs` (new), `docs/adr/0010-dragon-chase.md` | **T3** | Nobody else. |
| `src/app/main.ts`, `src/adapters/ui/lobby.ts`, `src/app/modes/mode.ts`, `index.html` | frozen after T0 | Any change goes through the controller after merge. |
| `src/core/{sim, hook, hero, world, preview, input}.ts`, `content/levels/l1.json`, `tools/genLevel.mjs` | frozen | Nobody edits them. |
| `docs/sessions/2026-11-10.md` | all | Each track appends only under its own heading `### Track N (<branch>)`. |

Ports: T1 4181 (`tools/perf.mjs`; T1 may also run `tools/shots.mjs` with its port changed to 4181
via `PORT` env, added by T1), T2 4182, T3 4183. The controller's dev servers stay on :5180/:5181.

### D3. Merge order and expected conflicts

1. **T1 (gfx) into `feat/three-track`.** It defines the budgets that the dragon must fit.
2. **T2 (portrait).** CSS, touch and framing only; no overlap with T1.
3. **T3 (chase), rebased on 1+2.** Re-run its budget and portrait checks after the rebase.

Where conflicts are still likely:

| Spot | Resolution |
|---|---|
| `docs/sessions/2026-11-10.md` appends | Keep both sections. |
| T1 changes `levelView` internals or kit names that `chaseRowsView` depends on implicitly (for example a mesh name used for the pulse) | T3 uses only `updateLevelView`. If a T1 change breaks the chase rows, fix it in T3's files during the rebase, not in T1's files. |
| `scene.ts` `applyConfig` resets fog | `setCloudCover` stores `k` and re-applies it at the end of `applyConfig` (T0). The T1 reviewer checks it survives. |
| `tests/config/tuning.test.ts` (`DEFAULT_TUNING` equals `tuning.json`) | T3 updates both together. |
| Bundle size | Measured only after the final merge (budget 240 KB gz). |
| Chase HUD portrait CSS versus T2 HUD positions | T3 builds against the T0 vars. After the T2 merge, T3 rechecks `shots-chase` in portrait and adjusts only `chaseHud.css`. |

---

## E. Builder briefs

### Common preamble (paste at the top of every brief)

> - **Mission pointer:** read `PRODUCT.md` and `CLAUDE.md` first, then `docs/lean-scope.md` and
>   this plan (`docs/three-track-plan.md`). The owner lifted two non-goals for this work: portrait
>   layout and the Dragon Chase score mode. If anything you are about to do works against the
>   Product Purpose or the remaining Non-goals, stop and report.
> - **Tools rule:** no `.codegraph/` exists here, so skip CodeGraph. In Bash use the rtk proxies:
>   `rtk read`, `rtk grep`, `rtk find`, `rtk ls`, `rtk git`, `rtk diff`. Run tests through
>   `rtk test ./node_modules/.bin/vitest run`. Use raw commands only where rtk has no proxy
>   (`pnpm lint`, `pnpm typecheck`, `pnpm build`, `node tools/...`).
> - **Stock materials only:** three.js stock materials and geometries. No hand-written
>   shaders, no `onBeforeCompile`, no GLB, no new npm dependencies, no new textures. `src/core`
>   must not import three or the DOM.
> - **Your worktree only:** you work in your own git worktree. Edit only the files your brief
>   owns (`docs/three-track-plan.md` section D2). Every other file is read-only.
> - **Session note:** before you finish, append a short state note (5-10 lines: done, numbers,
>   open issues) under your own heading in `docs/sessions/2026-11-10.md`:
>   `### Track N (<branch>)`.
> - **Do not commit, branch, push or open a PR.** Your final report lists every file changed or
>   added, the gate results, the measured numbers and anything left undone.

### E1. Track 1 brief: graphics optimisation (worktree `../bhagdori-gfx`, branch `track/gfx`)

**Goal:** make the game run and look like a polished Miniclip-style mobile web game. Cut the
rendering cost that does not show on a phone, and spend part of the savings on readable detail
near the play lane. Meet the budgets in section A3.

**Read:**
- Plan sections 0, A and D.
- `docs/adr/0008-graphics-overhaul-budgets.md` and `docs/graphics-spec.md`.
- `src/adapters/render/{scene, graphicsTier, levelView, skyView, backdrop}.ts` and
  `render/decor/{placeDecor, kit, groundMesh}.ts`.
- `src/app/ropeView.ts`, `tools/shots.mjs`, `tests/adapters/{graphicsTier, decor, backdrop, sky}.test.ts`.

**Owned files:** the T1 row in D2.

**Contract you must keep:**
- `GameScene` members, including the T0 `setCloudCover`, `setLensShift`, `refreshFlags` and
  `frameStats`.
- `buildLevelMeshes(world, opts)` with `scenery:false` behaviour, and `updateLevelView` signature
  and behaviour.
- `RenderConfig` existing field names (you may add fields), the tier ids and `GRAPHICS_TIER_EVENT`.

**Steps:**
1. **Measure first.** Write `tools/perf.mjs` (port 4181) as in A4 and record a baseline in
   `art/perf/t1-before.json`. Confirm that High now reports real numbers through `frameStats`.
2. **Cuts** (A1, in this order, re-measuring after each):
   1. Pixel ratio per tier and pointer.
   2. No composer on coarse devices, plus a dynamic `import()` of the post-processing modules.
   3. Sky extras off on coarse devices.
   4. Shadow casters limited to the lane (`userData.noCast` tags in decor, rule in `applyFlags`).
   5. Normal maps on High only.
   6. Far clutter and forest density.
   7. Governor at 20 ms.
3. **Adds** (A2): hero contact blob, hero colours, next-anchor ring and beam, pad border,
   route-house detail within 12 m of the lane, overhangs and parapet caps. Respect the 24
   instanced-mesh cap and the 5 additive meshes.
4. Update `defaultTierFor` and `TIER_INFO` text. Write `docs/adr/0009-mobile-budgets.md` (table A3,
   what was cut and why) and update `docs/graphics-spec.md`.

**Tests to add or extend:**
- `graphicsTier.test.ts`: pixel ratio table, composer null when coarse, shadow configs, default tier.
- `decor.test.ts`: instanced meshes <= 24, triangle cap, far pieces tagged noCast,
  `scenery:false` still dresses houses.
- New `tests/adapters/budget.test.ts`: static triangle totals per tier.
- A hero/pad luminance contrast test.

**Acceptance:**
- `node tools/perf.mjs t1-after` exits 0 against every A3 cap, on all three viewports.
- The JS bundle initial chunk is 215 KB gz or less (dynamic post-processing).
- Shots on each tier show the readable anchor, blob, pads and house detail. No console errors.
- Classic still plays: a hook in the action shot.

**Verification commands:**

```
pnpm lint && pnpm typecheck && rtk test ./node_modules/.bin/vitest run && pnpm build
node tools/perf.mjs t1-after          # port 4181, prints table, exit 1 over budget
PORT=4181 node tools/shots.mjs t1     # after adding PORT env support to shots.mjs
```

**Definition of done:** all gates green; before/after numbers table in the report and session
note; no file outside the T1 row touched; not committed.

### E2. Track 2 brief: portrait mode (worktree `../bhagdori-portrait`, branch `track/portrait`)

**Goal:** phones play the same L1 hill in portrait with good framing, thumb-friendly controls, and
a HUD and lobby laid out for a tall screen. Landscape keeps working unchanged, orientation changes
mid-run are live, and desktop is unaffected.

**Read:**
- Plan sections B and D.
- `src/app/viewport.ts`, `src/adapters/render/framing.ts` (T0 identity), `src/app/game.ts`
  (read only: how framing, lens shift and the waypoint are wired).
- `src/adapters/render/cameraRig.ts`, `src/adapters/input/touch.ts`.
- `src/adapters/ui/{touch.css, hud.css, hud.ts, lobby.css, waypointMath.ts}`, `index.html`.

**Owned files:** the T2 row in D2. Do **not** edit `game.ts`, `lobby.ts`, `main.ts` or
`index.html`. Describe any change you need there in your report.

**Contract:**
- `framingFor(v, base) -> { camera, lensShiftY }`, which must be identity for `aspect >= 1`.
- `ViewportLayout` and `watchViewport`.
- The CSS vars `--hud-top`, `--hud-side`, `--controls-h`, `--lens-shift`.
- HUD and lobby ids stay unchanged (Track 3 hides `#hud-timer`, `#hud-hop` and `#hud-alt` by id).

**Steps:**
1. Implement `framingFor` per the B1 table with a smoothstep blend between aspect 1.0 and 0.6.
2. Make `projectWaypoint` honour `shiftY` and keep `waypointTopPx` in `waypointMath.ts`.
3. Write the `touch.css` portrait block (B2): full-screen look zone, bottom-left stick zone, ACTION
   at the bottom-right and JUMP on the thumb arc, safe areas, `--controls-h`.
4. Write the `hud.css` portrait block (B3): reticle and aim reason at `calc(50% + var(--lens-shift) * 100%)`.
   Do the same for the `lobby.css` portrait block, which must also style `#lobby-mode`.
5. In `touch.ts`, check overlapping zones and pointer capture, and make `reset()` safe to call
   mid-gesture.
6. Write `tools/shots-portrait.mjs` (port 4182):
   - Chromium mobile emulation at 390x844 and 430x932, DPR 3, touch.
   - Shots: lobby, play at spawn, and after a scripted hold of ACTION.
   - A live rotation: `page.setViewportSize` 390x844, then 844x390, then back, mid-run. Assert no
     page errors and that the canvas size follows.
   - Also shoot 844x390 landscape and 1920x1080 desktop for regression.

**Tests:**
- `tests/adapters/framing.test.ts`: identity for landscape; portrait fov 88 at 390x844; hFOV
  between 45 and 55 degrees; monotonic blend; lensShiftY 0 in landscape.
- `tests/ui/waypointMath` additions: `shiftY` and `waypointTopPx`.
- `tests/app/viewport.test.ts`: orientation from w/h.

**Acceptance:**
- In portrait shots: the hero is in the lower third, the next anchor is visible with the reticle on
  it at spawn, the HUD and buttons clear the safe areas and do not overlap, and the lobby PLAY is
  reachable.
- Landscape and desktop shots look the same as the T0 shots.
- The rotation script passes.

**Verification commands:**

```
pnpm lint && pnpm typecheck && rtk test ./node_modules/.bin/vitest run && pnpm build
node tools/shots-portrait.mjs t2      # port 4182; writes art/shots/auto/t2-*.png, exit 1 on page errors
```

Look at every PNG yourself. WebKit is not installed, so iOS Safari specifics (URL bar, safe area,
no orientation lock) are reasoned through, not tested: list them in your report for the owner's
phone check.

**Definition of done:** gates green; shots reviewed; report has the before/after shot list and
the iOS notes; not committed.

### E3. Track 3 brief: Dragon Chase mode (worktree `../bhagdori-chase`, branch `track/chase`)

**Goal:** add a "Dragon Chase" high-score mode. A cloud dragon (reference:
`/Users/rubenk/.claude/uploads/b22f314f-67a2-4981-a1b9-9cac9ebcff14/b5679c7c-image.png`, look at it)
chases the hero down an endless version of the L1 hillside. Score is distance plus hops plus clean
landings plus perfect releases. When the dragon catches up, the screen clouds over, then game over
with the score, a best score and instant retry. Classic stays untouched.

**Read:**
- Plan sections C and D (C is the spec).
- `src/app/game.ts` in full, `src/core/{sim, hook, hero, world, config}.ts`, `src/content/load.ts`.
- `tools/genLevel.mjs` (the row formulas to mirror).
- `tests/content/{hillside, humanlike}.test.ts`, `src/adapters/render/{scene, levelView, terrain}.ts`.
- `src/adapters/render/decor/groundMesh.ts` (colours to copy), `src/app/modes/mode.ts`.

**Owned files:** the T3 row in D2. Core files other than `config.ts` are frozen.

**Contract:**
- Use only `GameScene` members, `buildLevelMeshes(world, { scenery: false })`, `updateLevelView`,
  `getTier()`, and the `mode.ts` API (`BEST_KEYS.chase`, `readBest`/`writeBest`).
- `startGame(canvas, root, mode)` must run Classic exactly as before when mode is `'classic'`.

**Steps:**
1. **Core:** `src/core/chase/rows.ts`, `chaseWorld.ts`, `dragon.ts` and `chase.ts` per C2/C3,
   allocation-free in `chaseStep`. Append `chase` to `Tuning`/`DEFAULT_TUNING` and to `tuning.json`
   together.
2. **Bot calibration:** in a new test file, copy (do not edit) the `humanlike` bot pattern into a
   bot that plays a chase `World`. Measure the mean z-speed on rows 0-12 for 3 seeds, then set
   `v0`/`vMax` per C3 and write the numbers into ADR 0010.
3. **`game.ts` wiring**, every branch guarded by `chase !== null`:
   - World creation and seed (`?seed=` debug override; `?dragonGap=` debug-only start gap for shots).
   - `chaseStep` after `step()`. Caught or dead goes to phase `dead` with the chase game-over flow
     (C4, no auto-restart).
   - Waypoint target = next chase anchor.
   - Chase pan (dragon reveal).
   - Camera turn-back on catch.
   - `setCloudCover`.
   - `backdropRoot` follow.
   - Best score through `writeBest('chase')`.
   - `body.mode-chase` class.
   - Retry gives a new seed.
4. **Views:** `render/chase/dragonView.ts` (C3), `chaseRowsView.ts` and `endlessGround.ts` (C6).
   Dispose old row groups (check `frameStats().geometries` stays flat across 50 recycles under
   `?debug`).
5. **UI:** `ui/chaseHud.ts` and `chaseHud.css` (score, distance, gap meter, `#chase-cloud`,
   game-over card with RETRY and MENU; MENU dispatches `zt-menu`). Landscape and portrait blocks use
   the T0 CSS vars. Append the procedural `wind(k)` and `roar()` to `sfx.ts`.
6. Write `docs/adr/0010-dragon-chase.md` (decisions C1-C6, tuning numbers, budgets).

**Tests:**
- `tests/core/chaseRows.test.ts`:
  - Rows 0-3 equal L1 houses and anchors.
  - Absolute boxes equal local boxes plus the offset.
  - For seeds 1-20 and rows 0-300, every hop chord is between `minLen + 1` and `maxLen - 3`, the
    slope is within `[minSlopeDeg + 2, maxSlopeDeg - 2]`, and the launching-roof clearance passes
    the same check `hillside.test.ts` uses.
  - `|delta cx| <= 6`, and houses stay inside |x| <= 34.
- `tests/core/chaseWorld.test.ts`:
  - Capacity is fixed: array lengths never change over 200 recycles.
  - Parked entries are inert.
  - The hook anchor is never in a recycled slot.
  - `world.route` is ascending and ahead of the hero.
  - Determinism: the same seed and inputs give a bit-identical state after 3000 ticks.
- `tests/core/dragon.test.ts`: ramp, rubber band capped at `gapMax`, a standing hero is caught in
  7-10 s, catch exactly at `catchGap`, frozen while not stepping.
- `tests/core/chaseScore.test.ts`: score formula; hops counted once per row; decoys never score.
- `tests/core/chaseBot.test.ts`: the bot survives at least 8 rows with the dragon off for 3 seeds
  (feasibility).
- `tests/adapters/dragonView.test.ts` (node, three without a renderer): puff counts and triangles
  per tier within C3, 4 draw objects, stock material classes only.

**Acceptance:**
- `node tools/shots-chase.mjs t3` (port 4183) produces:
  - The chase pan showing the dragon.
  - Play at spawn with the chase HUD, landscape and portrait.
  - `?dragonGap=8` with the cloud creep visible.
  - The game-over card after the catch.
  - Classic spawn, compared against the pre-T3 shot.
  It exits 1 on page errors.
- Under `?mode=chase&debug` the frame is within the A3 caps +6 calls and +12k triangles (read
  `__ztStats` in the script).
- Row rebuild median is 4 ms or less (logged).
- All 351 existing tests are still green.

**Verification commands:**

```
pnpm lint && pnpm typecheck && rtk test ./node_modules/.bin/vitest run && pnpm build
node tools/shots-chase.mjs t3         # port 4183; art/shots/auto/t3-*.png; prints __ztStats; exit 1 on errors/over budget
```

After T1 and T2 merge, rebase and re-run both commands.

**Definition of done:** gates green; shots looked at (the dragon reads as a cloud dragon:
sunlit top, grey underside, glowing orange eye, wing, coiling tail); Classic unchanged; calibration
numbers recorded; not committed.

---

## F. Review checklist (Opus pass)

**Track 0**
- [ ] Classic behaviour is byte-identical in landscape: same camera numbers, same waypoint
  position, same best-time key.
- [ ] `watchViewport` unsubscribes in `destroy()`. There is no listener leak when `main.ts`
  recreates the game on a mode switch (the old canvas WebGL context is disposed or reused, not
  leaked).
- [ ] `setCloudCover` survives a tier change. `frameStats` sums composer passes.
- [ ] `scenery:false` builds no ground, forest, birds or post, and places house dressing on the plane.

**Track 1**
- [ ] Every A3 cap is met in `art/perf/t1-after.json` on all three viewports. High is measured, not
  "1 call".
- [ ] No composer on coarse devices. Post-processing is in a lazy chunk, and the initial chunk
  shrank.
- [ ] No custom shaders or `onBeforeCompile`. At most 5 additive meshes. At most 24 instanced decor
  meshes. No new textures.
- [ ] Colour language kept: gold only on interactive things (anchors, ring, beam), cream pads,
  terracotta danger. The pad border is not gold.
- [ ] Shadow casters limited to the lane, and the hero shadow is still visible on Medium.
- [ ] Governor: an explicit user choice is never overridden. The auto drop happens once.
- [ ] GameScene contract and `buildLevelMeshes` opts still behave (run T3's expectations
  mentally).

**Track 2**
- [ ] Landscape (844x390) and desktop shots unchanged. `framingFor` is identity for aspect >= 1
  (test).
- [ ] Portrait: the reticle sits on the projected aim point with lens shift, and the waypoint arrow
  is not offset. Check at spawn, where the reticle should be gold on the first anchor.
- [ ] Thumb zones: stick and buttons do not overlap. The look zone gets drags elsewhere. A
  two-finger stick plus ACTION works. Pointer capture across zones works.
- [ ] Orientation flip mid-drag gives no stuck input (`reset()` on flip; `pointercancel` path).
  A URL-bar resize does not reset input.
- [ ] iOS Safari reasoning: `visualViewport`, `100dvh`/`inset`, safe-area top and bottom, no
  `screen.orientation.lock`, no fullscreen reliance, `touch-action: none` on the zones, no 300 ms
  delay. Real-device check is listed for the owner.
- [ ] Desktop narrow window: portrait framing applies by aspect, and the touch UI stays hidden on a
  fine pointer.

**Track 3**
- [ ] Determinism: `chaseStep` is pure (no `Math.random`, `Date` or `performance` in core),
  allocation-free, fixed dt. `rowSpec` is stateless. The 3000-tick replay test is bit-identical.
- [ ] Array lengths are fixed and ids are stable. The hook anchor and current support slots are
  never recycled. Parked boxes are inert for sweeps, ground queries, camera probes and `pickAnchor`.
- [ ] `world.route` is refilled in place, and the assist cones only point ahead.
- [ ] Classic isolation: every chase branch is guarded. Classic pan, win, best time, auto-restart,
  HUD and level view are unchanged. Classic shot compared.
- [ ] Generator feasibility over 300 rows x 20 seeds. `|delta cx| <= 6` keeps the next anchor in the
  portrait hFOV.
- [ ] Dragon fairness: the bot-based calibration is recorded, a standing hero is caught in 7-10 s,
  and the rubber band never exceeds `gapMax + 5`.
- [ ] Visual seams: the terrain snap is invisible (periodic flanks; check two frames across a snap).
  The row rebuild hitch is 4 ms or less. There is no z-fighting between the endless ground and the
  rows. Shadow flags are refreshed after a rebuild. The backdrop follows.
- [ ] Memory: geometries and textures are flat across 50 recycles.
- [ ] Budgets: tier caps +6 calls and +12k triangles under `?mode=chase`. Dragon materials are
  stock. Additive count is still 5 or fewer overall.
- [ ] Game-over: no auto-restart, retry after 0.5 s, `NEW BEST` correct, best kept separately from
  Classic.

**Merged result**
- [ ] `pnpm lint`, `pnpm typecheck`, all tests (351 plus new) and `pnpm build` are green. Initial
  JS is 240 KB gz or less.
- [ ] `tools/perf.mjs` passes for Classic. `tools/shots-chase.mjs` passes for Chase in both
  orientations on Low and Medium.
- [ ] Portrait Chase: the gap meter, score and game-over card clear `--controls-h` and the safe areas.
- [ ] A mode switch through the lobby (Classic to Chase to Classic) does not leak contexts or
  listeners, and the right best line is shown.
- [ ] PRODUCT.md, lean-scope and CLAUDE.md amendments are present. ADRs 0009 and 0010 are written.
  The session file has all track notes.

## G. Risks and decisions the owner might reverse

1. **The dragon is mostly off-screen during play.** It is behind the downhill-facing camera.
   Mitigations: pan reveal, gap meter, cloud creep, wisps, catch turn-back. If the owner wants to
   see it constantly, the alternative is a dragon flying alongside or overhead and ahead, swooping
   in from the side. That is a view-only change (core rule unchanged).
2. **Endless streaming complexity.** It is the riskiest piece (slot recycling, visual rebuilds,
   terrain snap). The free fallback is `slots >= rows` with a fixed 40-row run (about 1.1 km).
3. **New seed per run.** A daily fixed seed (fair leaderboard, memorisable) is a one-line change.
4. **Score formula** (+25 per hop, +10 per clean landing, +10 per perfect release). A combo
   multiplier is easy to add later.
5. **Phones default to Medium,** relying on the governor. If owner phone tests show drops, the
   default goes to Low.
6. **Cutting god rays, high clouds, dust and bloom on phones** removes some of the 2026-11-09
   atmosphere work, and shadows are limited to the lane. The owner may want some of it back on High
   phones.
7. **Portrait framing numbers** (vFOV 88, lens shift 0.14) are a first guess, tuned only in
   SwiftShader shots. Real-phone feel may need adjusting (pure constants in `framing.ts`).
8. **No iOS WebKit in CI.** Playwright WebKit is not installed (adding it is a browser download,
   not an npm dependency). iOS Safari portrait and the safe areas are verified only on the owner's
   phone.
9. **Merge base.** `feat/hillside-level` is not merged to main yet. `feat/three-track` builds on it,
   so the PR to main contains both unless hillside merges first.
10. **No real GPU frame-time measurement.** The budgets are proxies (calls, triangles, pixels, JS ms
    at 4x CPU throttle). The binding check is the owner's phone at :5180 with `?debug`.
