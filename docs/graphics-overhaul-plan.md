# Graphics overhaul plan — cure the "bland / AI slop" look

Stored 2026-11-09 from the review session. Read-only diagnostic of the render pipeline plus a
phased, tier-gated execution plan. Composes with `docs/graphics-spec.md` (the requirements),
`docs/art-style-guide.md` (the palette/shape targets) and ADRs 0005-0007 (what is already built).
This file is the carry-out plan; it changes no locked decision on its own — see "Open decisions".

## 1. Diagnosis — why the game reads as AI slop

Current best frame: `art/shots/gfx=high.png`. North star: `docs/reference/ui-reference.webp`.
The render is a washed, repetitive low-poly diorama; the target is a saturated, sun-raked,
lived-in city. Code-grounded causes:

| # | Cause | Evidence |
|---|---|---|
| 1 | Most players see the flattest tier. Mobile/touch defaults to `low`: no tone mapping, no shadows, no post. The washed-pastel first impression IS the default. | `src/adapters/render/graphicsTier.ts:36-41` (`defaultTierFor`), `:163-177` (low config) |
| 2 | Uniform haze wash kills saturation and depth. Linear fog toward cream `#eaa978`, far 260 m, bleaches mid-ground houses to one beige. | `graphicsTier.ts:154,172`, `scene.ts:141` |
| 3 | `MeshLambertMaterial` + `flatShading` + vertexColors on all decor: faceted toy look, zero specular/roughness response. | ADR 0005 D5, `src/adapters/render/decor/kit.ts` |
| 4 | Shadows do not ground the vista. Tight follow-frustum (26-34 m half-extent) around the camera focus; the wide shot has almost no cast shadow, houses float. | `graphicsTier.ts:181-189`, `scene.ts:299-312` (`followShadow`) |
| 5 | Repetitive instancing: one box house x ~240 with +/-5 % value jitter only. No silhouette variety, procedural sameness. | ADR 0005 D5 |
| 6 | Tiny texture set, walls flat: 6 small JPEGs (~48 KB) on ground/roof/brick only. Known world-space UV stretch on instanced walls (needs per-instance UV bake). | `public/assets/textures/`, `levelView.ts`, art-style-guide "Layout revision" note |
| 7 | Weak sky/sun and no atmosphere life: flat vertical sky band, small sun disc; birds cut, clutter cut, static diorama. | `skyView.ts`, ADR 0005 D9 |
| 8 | Placeholder hero: capsule-and-box mannequin (lean scope) reads as unfinished next to the reference boy. | `docs/lean-scope.md` "Model and animation" |

## 2. Constraints and locks (what this plan may touch)

- Bundle: JS under ~600 KB gzipped; decor under 150k tris / 24 draw calls (spec), frame budget
  60 fps on iPhone 12-class, `?debug` overlay + `tests/adapters/decor.test.ts` are the gates.
- Stock three.js materials only; no hand-written custom shaders (lean-scope Budget + CLAUDE.md).
  Already lifted ONLY for Medium/High via three's own passes (shadows, ACES, UnrealBloom,
  OutputPass) — graphics-spec "Look decisions, round 2".
- Textures: lean-scope says "no textures"; the repo already ships 6 tiny JPEGs (pilot decision
  "keep", art-style-guide step 7). This plan continues that precedent: small, baked, no shaders.
- No GLB pipeline (lean-scope item 4). CC0 free assets first, per graphics-spec line 39.
- Colour language stays: gold = interactive, cream = safe, terracotta = danger (PRODUCT.md P3).

## 3. Phases (ROI order; each ships alone and is screenshot-verifiable)

### P0 — De-wash and grade the base look (cheapest, biggest win)
- Enable ACES tone mapping + exposure ~1.1 and a mild saturation/contrast lift on LOW too
  (ACES is a material-shader define, no extra pass, effectively free on phones).
- Retune fog: push `far`, lift `near`, desaturate the haze toward peach so mid-ground keeps
  terracotta and brick chroma instead of bleaching to cream.
- Richer sky gradient + bigger, warmer sun glow (more stops, stronger sun-side boost).
- Raise the default tier on capable devices (see Open decisions D-A).
- Files: `graphicsTier.ts`, `skyView.ts`. Tier gating: applies to all tiers.
- Accept: `gfx=low` screenshot at 1280x720 no longer reads beige-on-beige; roofs keep
  saturated red-orange at 40-80 m; `pnpm test` green; bundle delta 0.
- Owner: Opus-high spec for the grade numbers, Sonnet implements.

### P1 — Ground the scene with light
- Strengthen baked vertex-gradient AO (darker bottoms, eave undersides); add cheap contact
  shadow decals (dark alpha quads) under houses, trees, tanks on terraces.
- Medium/High: widen/soften the shadow frustum and add a low-res far shadow pass (second
  tight cascade or larger 1024 map covering the vista) so the wide shot is grounded.
- Files: `decor/kit.ts`, `placeDecor.ts`, `scene.ts`, `graphicsTier.ts`.
- Accept: spawn + mid-rope screenshots show objects sitting on the ground, no floating;
  draw-call delta under 8; Medium stays 60 fps in 4x CPU throttle capture.
- Owner: Opus spec, Sonnet implements.

### P2 — Material and texture richness
- Expand the FLUX texture set: roof tile (saturated red-orange family toward `#b5441c`),
  brick (add one redder, one browner), cream plaster, timber, stone lane; generate matching
  NORMAL maps (Lambert supports `normalMap`, stock, no shader).
- Fix the instanced-wall UV stretch: bake per-instance planar UVs at build time in JS
  (boxes are axis-aligned; no shader needed).
- Selective `MeshStandardMaterial` (roughness ~0.9) for route-house roofs/brick on Med/High.
- Record model + licence per art-style-guide Licensing section.
- Files: `tools/makeTextureAtlas.py`, `tools/makeWallTextures.py`, `tileTexture.ts`,
  `levelView.ts`, `decor/kit.ts`, `public/assets/textures/`.
- Accept: pilot-block screenshot beats `pilot-block-textured.png` on material read at 10 m;
  textures stay under ~150 KB total added; UV stretch on instanced walls accepted (ADR 0008, 2026-11-10).
- Owner: Opus texture/UV direction; Sonnet implements; FLUX (schnell) generates tiles.

### P3 — Kill the sameness (set dressing and silhouettes)
- More house variants (2-3 roof pitches, balcony styles, window arrangements per the FLUX
  modelling set), stronger per-instance colour spread in the terracotta roof family.
- Lived-in clutter the art-style-guide says is missing: planters/potted plants on every
  terrace, varied water tanks on stilts, laundry lines, satellite dishes, denser prayer
  flags, 1-2 landmark pagodas visible in the near field.
- All instanced, inside the 150k-tri decor cap; lane keep-out rules unchanged (ADR 0005 D1).
- Files: `decor/kit.ts`, `placeDecor.ts`, `tools/genLevel.mjs` (variant seeds).
- Accept: `decor.test.ts` green (determinism, lane clearance); a 3-frame screenshot strip
  where no two neighbouring houses read identical; tri budget respected.
- Owner: Opus variant silhouette sheet; Sonnet/junior implements.

### P4 — Atmosphere and life
- Layered soft-alpha cloud cards; sun-side god-ray cards; snow-capped Himalaya backdrop
  with aerial perspective (build into `backdropRoot`, tier-aware).
- Birds + dust motes on Med/High only (birds were cut in ADR 0005 D9 for cost; re-add
  gated); animated flag/leaf sway (cheap vertex-free: rotate instances per frame).
- Files: `skyView.ts`, `backdrop.ts`, `decor/ambient.ts`, `decor/birds.ts`, `dustPuff.ts`.
- Accept: backdrop screenshot at spawn matches `target-village-backdrop.png` mood;
  transparent-layer cap (5 additive meshes) respected or amended in ADR; fps check.
- Owner: Opus mood spec; Sonnet implements.

### P5 — Hero and rope polish
- More shaped procedural hero: tapered limbs, hair cap with volume, multi-segment scarf and
  sash with secondary swing (existing CH_SCARF channel), better pose blending weights.
- Rope: subtle animated sag/twist read, gold sleeve pulse on attach; landing dust tuned.
- Stays under the 1,500-tri hero cap, procedural, no GLB.
- Files: `heroRig.ts`, `heroPose.ts`, `ropeView.ts`, `ropePost.ts`, `dustPuff.ts`.
- Accept: hero silhouette reads as the reference boy at 6 m in a mid-rope screenshot;
  hero tri test cap unchanged and green.
- Owner: Opus rig/pose spec (lean-scope already mandates Opus for this); Sonnet implements.

### P6 — Optional: one grade pass (LOCK LIFT — needs explicit user OK)
- If P0-P5 land short of the reference on Med/High, add a single vignette + warm-lift grade
  via a three `ShaderPass` (stock-style) gated to High only. This breaks the
  "no hand-written custom shaders" lean-scope lock; do NOT start without D-B below.

## 4. Model / agent routing

| Phase | Design (spec/ADR) | Implement | Asset generation |
|---|---|---|---|
| P0, P1, P4 | Opus (high) | Sonnet / junior single-file | - |
| P2 | Opus | Sonnet | FLUX schnell (tiles + normals), licence recorded |
| P3 | Opus | Sonnet / junior | FLUX concept sheets -> procedural kit |
| P5 | Opus | Sonnet | - |
| P6 | Opus + user lock-lift OK | Sonnet | - |

3D models stay procedural / CC0-first (graphics-spec line 39); if the GLB lock is ever lifted,
source CC0 packs (Poly Haven, Kenney) with a `SOURCES.tsv` line, not generated GLBs.

## 5. References

In-repo (already curated):
- `docs/reference/ui-reference.webp` — painted key-art north star (composition, palette, HUD).
- `docs/reference/target-lane-roof.png`, `target-village-backdrop.png` — AI video frames:
  high-fidelity stylized rooftop run + sunlit tile roofs with cliff backdrop.
- `docs/reference/himalaya-valley-photo.jpg`, `pilot-before-flat-roof.png`,
  `pilot-block-textured.png` — valley mood + before/after texture baseline.
- `assets-src/` photos: `sunset-1..4`, `village.jpg`, `hill.jpg`, `temple.jpg`,
  `stone-roads.png`, `newari-house.png`, `skyline-view.HEIC` (HEIC conversions still owed,
  incl. `IMG_1554.HEIC` per graphics-spec Open).
- `assets-src/zipline-tole-refs/` FLUX contact sheets (A, A2, B, C, D2, E, F, G, H) —
  sorting table in art-style-guide "Sorting (step 3)".
- `art/shots/` — current-state baselines (`gfx=low|medium|high.png`, `p0_*.png`, `roof*.png`).

Worth collecting (scout-first; do not guess URLs):
- Golden-hour drone footage of Kathmandu/Chitlang hillside villages (haze layering, roof
  saturation, street life) for P0/P2/P4 mood targets.
- Gameplay captures: Mirror's Edge runner-vision framing and AC rooftop runs (named in
  lean-scope Kept), plus a parkour-roof-slide mobile web game capture like the one the
  `target-lane-roof.png` frame came from (camera height, rope framing, HUD placement).
- Reference stills go to `docs/reference/` (gitignored) with one line added to this plan.

## 6. Open decisions (blocking)

- D-A: raise the default graphics tier on capable devices (keep Low for <=4-core/<=4 GB and
  old phones). Without it, most of P0-P5 is invisible to the majority of players.
- D-B: approve P6 (single hand-written grade shader on High only) — a lean-scope lock lift.
  Decide after P0-P5 screenshots, not before.

## 7. Verification loop (every phase)

1. `pnpm lint && pnpm typecheck && pnpm test && pnpm build` green.
2. Headless Playwright screenshots (the pw/play.mjs scratchpad pattern from T273):
   640x360 touch emulation + 1920x1080, at spawn / mid-rope / a death, for each of
   `?gfx=low|medium|high`; no console errors; save to `art/shots/`.
3. Budget check via `?debug`: draw calls <= 80, tris <= 120k, zero per-frame allocation in
   new code; bundle gzip delta recorded here.
4. Compare against `ui-reference.webp` + the phase's Accept line; log verdict in this file.
5. Small commit per phase (working agreement); never push to main directly.

## 8. Sequencing

P0 -> P1 -> P2 -> P3 -> P4 -> P5 -> (D-B decision) -> P6.
P0+P1 are the "stop the bleeding" pair: they change only lighting/grade/shadow params and
together account for most of the perceived gap. P2/P3 attack material and sameness. P4/P5
add mood and character. Each phase is independently shippable and revertable.

## 9. Opus review amendments (2026-11-09) — these supersede sections 1-8 where they conflict

Owner decisions recorded 2026-11-09: D-A approved (raise default tier on capable devices);
textures (P2), clutter (P3) and birds/atmosphere (P4) approved on Med/High; P6 stays OUT.
PRODUCT.md and lean-scope are amended to match. P5 (hero) lock LIFTED by owner 2026-11-09 (shaped procedural hero, still under the 1,500-tri cap, no GLB).

1. **ADR 0008 first (before P1):** rebaseline budgets. ADR 0006 s1 / 0007 s1 say <=80 calls
   (~74 used), <=16 decor calls; decor.test.ts:193-204 allows 24 calls / 150k tris; plan s7's
   120k-tri frame cap is below the 150k decor cap. Define whether shadow-pass draws count.
2. **P0:** adding ACES to Low breaks graphics-spec "Low = today's look"; amend that line. Keep
   gold/danger distinct from filler roofs (`#b5441c` is near danger `#c4472a`, levelView.ts:22;
   `COLOR_TILE_ROOF` `#b5523a`). Accept line becomes a sampled-pixel distinctness check, not
   "no longer beige". Also keep lean-scope's "hazy desaturated world" wording in view.
3. **P0 / D-A detection:** no UA sniffing (iOS has no `deviceMemory`, under-reports cores, iPadOS
   sends desktop UA). Rule: start Medium, drop to Low if frame time stays >~20 ms over the first
   N seconds.
4. **P0 tests to update:** graphicsTier.test.ts:53-66, :111-117, :151-154; sky.test.ts:32;
   backdrop.test.ts. backdrop.ts, skyView and mountains are pre-blended to HAZE: recolour all
   three. Add `backdrop.ts` to the P0 file list.
5. **P2:** per-instance UV bake is impossible (InstancedMesh shares one UV set). Use size-bucketed
   wall geometries (+1 call per bucket) or quantised house dimensions. MeshStandardMaterial per
   tier needs material-swap code in `applyConfig`.
6. **P1:** no second cascade (second shadow light doubles casters; CSM patches shaders). Use one
   larger frustum on High only. Verify fps on a real iPhone 12 / `?debug`, not CPU throttle.
7. **P4 rescoped:** backdrop, birds, flag/canopy sway already exist; additive-mesh cap is full
   (5/5). P4 = cloud and god-ray cards with normal blending, plus dust. Amend ADR 0005 D9.
8. **P3:** do not touch `tools/genLevel.mjs` (gameplay source of truth). Variant seeds go in
   `placeDecor.ts`. Pagodas, stilt tanks, flags already exist (ADR 0006).
9. **P5:** owner OK given 2026-11-09. Diagnosis #8 is stale (hero has a tunic, ADR 0006).
   `ropeView.ts` / `ropePost.ts` live in `src/app/`.
10. **s7 verification:** `pw/play.mjs` does not exist and Playwright is not a dependency (ask
    before adding). Commit a `tools/shots.mjs` or gitignore shot output; 18 shots/phase is too
    much for git.
11. **Corrections:** textures total ~77 KB (not ~48 KB); decor walls are already mapped
    (kit.ts:418-427). Bundle is ~215 KB gz, ample headroom.

Go/no-go: P0 go after fixes 2-4; P1 after 1+6; P2 after 5; P3 after 1+8; P4 after rescope (7);
P5 go (owner OK); P6 out.

## 10. Progress log
- P0 done (c74a4fb): ACES on Low, fog 60-320 / 55-320, Medium default + frame governor, bigger glow. Not visually verified.
- ADR 0008 written. P1 done: dark contact slab under every house, shadow frustum High 48 m / Medium 30 m. Not visually verified; baked-AO strengthening and decals for trees/tanks not done.
- Verification tool added: `pnpm build && node tools/shots.mjs <label>` writes 6 shots to `art/shots/auto/` (gitignored; Playwright 1.49.1 devDep, SwiftShader so fps is meaningless). P0+P1 verdict (high, 1080): mid-ground keeps red/orange chroma versus the old baseline, haze is lighter, no console errors. Contact slabs and larger shadows are subtle at spawn.
- P2 partial: normal maps (`*_n.jpg`, ~58 KB, derived by `tools/makeNormalMaps.py`, no AI generation) on decor walls/roofs, pitched roofs and textured ground. Bundle 218.6 KB gz. Shots show no errors, effect is subtle. NOT done: new FLUX tiles (redder roof/brick, timber, stone lane; no generator wired here), instanced-wall UV stretch (needs size-bucketed wall geometries), MeshStandardMaterial swap.
- P3 partial: roof/plaster colour spread widened (7 roof tones, +-12 % jitter); variants, clutter pieces and pagodas already existed. NOT done: new silhouettes, extra clutter (laundry lines, dishes).
- P4 partial: five god-ray wedges (normal blending, 1 draw call) in skyView. Backdrop, birds, sway already existed. Not seen in shots (sun is out of frame at spawn). NOT done: new cloud layers, dust motes, tier gating of rays.
- P5 partial: scarf second segment (secondary swing), top-knot and fringe on the hair; hero mesh cap 25 -> 28 (ADR 0008). NOT done: tapered limbs, pose blend weights, rope sag/pulse polish.
- Measured (SwiftShader, spawn): Low 65 calls / 140k tris; Medium 115 calls / 273k tris including the shadow pass.
