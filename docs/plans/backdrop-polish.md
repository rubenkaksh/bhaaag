# Backdrop polish plan (2026-11-18, follows PR #40)

Owner: "a chunk of coded hill right in the middle is too sloppy". Level: `?mode=classic&level=nagarkot-home`.
Mission check (PRODUCT.md): stock materials, no custom shaders, three-colour gameplay language untouched
(gold / cream / terracotta stay on roofs and pads only), texture caps per tier (Low 150 / Medium 300 /
High 600 KB), initial chunk <= 255,000 B gz. Nothing here adds JS to the initial chunk (backdrop.ts is lazy;
terrain/ground/sky code changes are a few hundred bytes).

## 1. Why it looks bad (diagnosis, read from code + shots)

Shots: `art/shots/auto/backdrop-{low,medium,high}-p-2-play.png`, `backdrop-high-l-4-later.png`, `backdrop-low-l-1b-flyover.png`.

1. **The wedge is the bent ground field, not the stock hill.** nagarkot-home sets `setTerrainField(bentField(...))`
   (`src/adapters/render/decor/homeDress.ts:101`). East of the seam (x > SEAM1 = 40) the field returns
   `d = |z - zr| - 34`, the distance to the *turned* road only, even next to the straight run. So near the spawn
   d is ~70-120 m while the true distance to the road is a few metres. `terrainY` (`terrain.ts:116`) then adds
   `0.0014*d^2 + 0.05*d` (~20-60 m) and the height also jumps from h1 to h2 across the 14 m seam (x 26..40).
   Result: a near-vertical wall whose crest is the "hard ridge line up the middle", climbing toward the far rim.
2. **The quadratic bowl never saturates.** At the terrain rim (d ~ 280) the rise is ~124 m, so the drawn ground
   stands up in front of the plate (plate/cards use `depthWrite: false`, renderOrder -1.8..-1.6, so any
   terrain overdraws them). The hillside pokes above the painted horizon instead of tucking under it.
3. **It reads as sand because it is mostly fog.** Fog is `#eaa978` near 65-70 / far 480 (`graphicsTier.ts`).
   The wedge sits 150-450 m out, so it is 40-100 % fog colour: a flat peach slab, while the unfogged photo cards
   next to it stay saturated green. The vertex colours (`groundMesh.ts`) never show.
4. **Flat-shaded look.** `buildGroundMesh` grid grows by x1.22 per step outside |x| 42 / z -156..46, so the far
   wall is a handful of 20-40 m triangles; Lambert per-vertex normals over big cells give hard facet bands.
5. **Lavender patch under the near card.** `tools/backdrop-build.mjs:31` bakes `#c7a9a4` (a lilac grey) into
   the far (18 %) and near (10 %) cards, and the near card's bottom 8 % fades to alpha over the plate; runtime
   then lerps the card 22 % to the peach fog. Lilac + peach over green = the fog-lavender patch.
6. **Sky seam.** The plate (R 900, height ~524 m, eyeRow 0.6) tops out ~314 m above the eye, elevation ~19 deg,
   dome h ~0.33. `SKY_STOPS` (`skyView.ts:51`) is between `#d77a45` and `#9c5a4c` there: saturated orange-brown,
   while the plate's top rows are pale gold. FADE_TOP 0.16 (~84 px on High) is too short to hide the step.

## 2. Options and decision

- **(a) Reshape + re-colour the terrain** so the flanks are low terraced pine hillside that saturates below the
  near card: fixes 1, 2, 4 at the source, zero bytes of texture, zero draw calls. Needs care at the seam crease.
- **(b) Hide / lower the ramp and let the near card carry the hillside**: the card sits at 450 m on the horizon;
  everything between the lane and 450 m below the horizon would be empty plate, so houses float. Rejected alone,
  but its good half (sink the far rim under the card) is folded into (a).
- **(c) Baked terrain colour texture**: Low has 4.2 KB left (145.8 / 150 KB measured 2026-11-18), the ground mesh
  has no UVs, and a texture does not fix the wall geometry. Rejected.

**Recommendation: (a) with the far-rim sink from (b)**, plus fog, card haze and sky-stop fixes (3, 5, 6).
`homeDress.ts` stays untouched (constraint), so the field is corrected inside `terrain.ts` only.

## 3. Global constraints (every task)

- Stock three materials only, no ShaderMaterial / onBeforeCompile, no new dependencies.
- Do NOT touch: `src/adapters/render/heroPose.ts`, `src/adapters/render/decor/homeDress.ts`, `src/core/**`,
  the map camera, the stock (non-field) branch of `terrainY` (other levels must not change).
- Contract: where the field's `d === 0` (inside the road), `terrainY === f.h` exactly (hero feet on the drawn ground).
- Low draw calls <= 55 (debug overlay `calls` in the shots; today 31). No new meshes.
- Texture bytes per tier stay within caps (`tests/adapters/textureBudget.test.ts`).
- Gates per task: `pnpm lint && pnpm typecheck && pnpm test` green; build is run once in T7.
- Shots: `pnpm build && G=low node tools/shots-backdrop.mjs` (and `G=high`); output in `art/shots/auto/`.

## 4. Tasks (run in this order; T2, T3, T5 are independent after T1 and may run in any order)

### T1 - cursor - reshape the bent-field terrain (+ pin it with a test)
Files: `src/adapters/render/terrain.ts`, new `tests/adapters/terrainShape.test.ts`.
Change only the `if (fieldNow !== null) { ... }` branch of `terrainY`. Add module constants:
```ts
const RISE_MAX = 18; // m: flank rise far from the road (was unbounded 0.0014 d^2 + 0.05 d)
const RISE_L = 55; // m: e-folding distance of the rise
const CAP = 24; // m: hard ceiling above max(f.h, planeY(z))
const TAP = 14; // m: box-filter step that melts the seam crease
const TERRACE_H = 3.5; // m: terrace step height, faded out by d = 120
const SINK = 28; // m: far rim sinks this much between d 150 and 280 (tucks under the near card)
```
Add a helper `fieldRaw(x, z)`: `f = fieldNow(x, z)`; `rise = RISE_MAX * (1 - Math.exp(-f.d / RISE_L))`;
return `f.h + rise - SINK * smooth(150, 280, f.d) + 1.6 * wobble(x, z) * smooth(0, 60, f.d)` (wobble amplitude 3.2 -> 1.6).
Add `terrace(r)`: `s = r / TERRACE_H; k = Math.floor(s); return TERRACE_H * (k + smooth(0.3, 0.7, s - k))`.
New field branch:
```ts
const f = fieldNow(x, z);
const w = smooth(0, 18, f.d);
if (w <= 0) return f.h;
const raw = fieldRaw(x, z);
const soft = (fieldRaw(x - 2 * TAP, z) + fieldRaw(x - TAP, z) + raw + fieldRaw(x + TAP, z) +
  fieldRaw(x + 2 * TAP, z) + fieldRaw(x, z - TAP) + fieldRaw(x, z + TAP)) / 7;
let y = raw + smooth(4, 30, f.d) * (soft - raw); // filter only off the road
y = Math.min(y, Math.max(f.h, planeY(z)) + CAP);
const r = y - f.h;
if (r > 0) y = f.h + r + (1 - smooth(80, 120, f.d)) * (terrace(r) - r); // terraces fade out far away
return f.h + w * (y - f.h);
```
Test file (vitest, no three): build a synthetic bent field identical in shape to `bentField` (copy its 10 lines
into the test, constants HILL_HALF 34, SEAM0 26, SEAM1 40) with profile `[[60, 0], [-120, -65], [-300, -130]]`,
`zr = -120`, `xE = 60`; call `setTerrainProfile(profile)` and `setTerrainField(field)`, `afterEach` reset both to null.
Sample x in [-320, 320] step 4, z in [-360, 200] step 4 and assert:
1. where `field(x,z).d === 0`, `terrainY(x,z) === field(x,z).h` (exact);
2. for |x| > 40 neighbouring samples: `|dy| / 4 <= 0.70` (35 deg) - today this fails at the seam;
3. `terrainY - Math.max(field.h, planeY(z)) <= 24.001` everywhere;
4. with both setters null, `terrainY(100, -50)` equals the value captured before the change (stock branch untouched:
   compute it once on the pre-change code and hard-code it).
done_when: `pnpm vitest run tests/adapters/terrainShape.test.ts` -> 4 passed; `pnpm test` green.
Screenshot (after T7 build): `backdrop-low-p-2-play.png` shows no peach wall right of the lane; the hillside
stays below the plate's foothill line.

### T2 - hunter - ground colour: terraces and plate-matched greens, finer far grid
File: `src/adapters/render/decor/groundMesh.ts` only.
- Palette: `EARTH '#6b8a3e'`, add `TERRACE_LIP '#8f8a4c'` (dry terrace edge), `FOREST_LOW '#46703a'`,
  `FOREST_MID '#3d5634'`, `CONIFER '#2e452d'`, add `FAR_HAZE '#7f8a5e'` (plate foothill green seen through haze).
  Delete `ROCK` and its `f4` line (the capped terrain never reaches 110 m).
- Replace the z stripe `Math.floor((z + 400) / 9) % 3` with height bands that follow the terraces:
  `const band = Math.floor((y + 1000) / 3.5) % 2;` band 1 -> `out.lerp(TERRACE_LIP, 0.45)`; and a thin lip at the top
  of each band: `if (((y + 1000) % 3.5) > 3.0) out.lerp(TERRACE_LIP, 0.6)`.
- Conifer fraction by distance from the lane instead of altitude: `f2 = clamp((ax - 50) / 60)` to FOREST_MID,
  `f3 = clamp((ax - 110) / 90)` to CONIFER (keep `up`-based terms as `max` with these).
- Far tint so the ground meets the cards in hue: `const far = clamp((Math.hypot(x, z) - 160) / 160); out.lerp(FAR_HAZE, 0.55 * far)`.
- Grid: in `buildGroundMesh` change both `axis(..., 1.22, ...)` growth factors to `1.12` (smoother normals on the
  far flanks; ~+3k triangles, check `tests/adapters/budget.test.ts` triangle limits stay green).
- Use module-level `Color` constants (no `new Color` per vertex).
done_when: `pnpm vitest run tests/adapters` green; shot `backdrop-high-l-4-later.png`: green terraced bands on
both flanks, no facet stripes on the right hillside.

### T3 - hunter - fog distances
File: `src/adapters/render/graphicsTier.ts` only. Low `fog: { color: FOG_HAZE, near: 80, far: 650 }`;
Medium/High `fog: { color: FOG_HAZE, near: 75, far: 620 }`. Do NOT change `FOG_HAZE` (must equal `skyView.HAZE`).
Update any test literal that pins 70/65/480 (`rtk grep -rn "480" tests/adapters`).
done_when: `pnpm vitest run tests/adapters/graphicsTier.test.ts` green; shot `backdrop-medium-p-2-play.png`:
the flanks 150-300 m out are green-olive, not peach.

### T4 - cursor - card haze: warm instead of lilac, longer plate top fade, rebuild textures
Files: `tools/backdrop-build.mjs`, `src/adapters/render/backdrop.ts`, regenerated `public/assets/textures/backdrop/*.webp`.
- `backdrop-build.mjs`: `HAZE = { far: [0.16, '#d9a881'], near: [0.06, '#d9a881'] }` (warm, between FOG_HAZE and the
  plate foothills); `FADE_TOP = 0.28`; near card `fadeBottom(..., 0.08)` -> `0.14`. Inside the plate branch log the
  mean RGB (hex) of the first fully opaque row (`y = ceil(h * FADE_TOP)`) as `plateTop #rrggbb` for T5.
  Keep `PLAN` byte targets unchanged.
- `backdrop.ts`: `near.fogTint 0.22 -> 0.12`, `far.fogTint 0.4 -> 0.3`. Nothing else.
- Run `node tools/backdrop-build.mjs` (needs local `art-src/backdrop/`), note the printed `plateTop` hex in the commit message.
done_when: `pnpm vitest run tests/adapters/textureBudget.test.ts` green (Low <= 150 KB, today 145.8);
`ls -l public/assets/textures/backdrop` each file within +-5 % of its PLAN target; shot `backdrop-low-p-2-play.png`:
no lavender band under the near ridge.

### T5 - hunter - sky stops matched to the plate top
File: `src/adapters/render/skyView.ts` only (after T4, uses its `plateTop` hex; default if missing: `#e8c08e`).
`SKY_STOPS` becomes `[[0, HAZE], [0.12, '#f0b47a'], [0.33, <plateTop>], [0.45, '#e2a46e'], [0.7, '#b7765a']]`.
Keep stop 0 = `HAZE` and `BELOW_HORIZON` as is. Update the skyView test if it pins old stop colours.
done_when: `pnpm vitest run tests/adapters` green; shot `backdrop-high-p-2-play.png`: no visible colour step where the
plate's top dissolves (rows ~150-210 px in portrait).

### T6 - hunter - pine scatter on the flanks (existing instancing, no new meshes)
File: `src/adapters/render/decor/placeDecor.ts`, function `forest` only.
- Inner pitch `x < 110 ? 9` -> `8`; density `dens = 0.82 - 0.5 * ...` (was 0.78).
- Conifer choice: `const con = ax > 60 ? rc < 0.65 : up > 50 || (up > 22 && rc < (up - 22) / 28);` (pine hillside like the card).
- Do not raise kit capacities; `DecorStats.dropped` must stay 0 for nagarkot-home on every tier.
done_when: `pnpm vitest run tests/adapters` green (budget test: Low draw calls <= 55, instanced meshes <= 24);
shot `backdrop-low-l-1b-flyover.png`: pines dot both flanks, Low still sparse (forestDensity 0.2).

### T7 - controller - build, shots, numbers (not a junior)
`pnpm lint && pnpm typecheck && pnpm test && pnpm build`, then `G=low node tools/shots-backdrop.mjs`,
`G=medium node tools/shots-backdrop.mjs`, `G=high node tools/shots-backdrop.mjs`. Expect `console/page errors: 0`.
Read `backdrop-{low,medium,high}-p-2-play.png`, `backdrop-high-l-4-later.png`, `backdrop-low-l-1b-flyover.png`:
debug `calls` <= 55 on Low; no wall, no ridge crest in the sky, no lavender patch, no sky step.
Initial chunk: sum of gzip of the JS files `dist/index.html` loads <= 255,000 B.
If the seam crease still shows: raise `TAP` to 18 (T1) before anything else; if the hillside now looks too flat
against the card, raise `RISE_MAX` to 22 (CAP stays 24).

### T8 - Sonnet - final review (one seat, no gate runs)
Inputs: the diff of T1-T6, this plan, the T7 shots. Check: stock-branch `terrainY` unchanged; d = 0 contract kept;
no file in the do-not-touch list changed; no new mesh/material/texture; colours keep gameplay language
(no gold/cream/terracotta in ground or sky); fog change acceptable on other levels (spot-read one
non-nagarkot shot if available). Verdict: ship / fix list with file:line.
