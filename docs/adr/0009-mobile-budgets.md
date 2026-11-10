# ADR 0009: mobile budgets and the Miniclip look (2026-11-10)

Track 1 of `docs/three-track-plan.md`. Supersedes the frame budgets of ADR 0008 (90 calls, 200k
triangles). Stock three.js only: no shaders, no `onBeforeCompile`, no GLB, no new dependencies.

## Budgets (A3, binding)

| Tier | Pixel ratio cap, coarse / fine | Main calls | Shadow calls | Triangles (main + shadow) | Composer |
|---|---|---|---|---|---|
| Low | 1.0 / 1.5 | <= 55 | 0 (blob only) | <= 60k | none |
| Medium (phone default) | 1.25 / 2 | <= 70 | <= 14 | <= 110k | none |
| High | 1.5 / 2 | <= 85 | <= 24 | <= 170k | bloom, fine pointer only |

Also: JS per frame <= 4 ms at 4x CPU throttle, initial chunk <= 215 KB gz (post-processing is a
dynamic `import()` in `render/postFx.ts`), instanced meshes <= 24, additive meshes <= 5, alpha
layers over 25% of a coarse screen: sky dome and haze only.

Measured by `tools/perf.mjs` (Playwright + SwiftShader, `window.__ztStats` under `?debug`). The
renderer's `info.autoReset` is off and reset once per frame, so shadow and composer passes sum into
one total. Shadow-pass calls are proxied by the number of visible shadow casters.

## Cut (invisible on a phone)

- **Pixel ratio per tier** (`PIXEL_RATIO_CAP`): fill rate is the phone bottleneck, not triangles.
- **No composer on coarse pointers**; bloom only on High with a fine pointer. The composer loads
  lazily, so Low and Medium never download it.
- **Atmosphere extras** (second cloud layer, god rays, dust points) only on Medium/High with a fine
  pointer: they are the large alpha overdraw layers.
- **Normal maps and `MeshStandardMaterial` swap** on High only (the swap on a fine pointer only).
- **Shadow casters are opt-in** (`userData.cast`): the hero (tunic, trousers, scarf, leather; the
  head is left out), the lane's merged level meshes, and the house wall and roof instances. The
  hillside, trees, rails and pads only receive. Shadow frustum is smaller on phones.
- **Low hides small instanced detail** (`LOW_HIDDEN_DECOR`: rails, canopies, brackets, pots,
  planters, shutters, flags, trim, strings, birds). Forest density 0.2 / 0.7 / 1.
- **Draw-call packing, no look change.** Hero parts are packed into one stock `SkinnedMesh` per
  material (6 draws, was 28): joint Groups act as bones with an identity bind pose. The six backdrop
  rings are one mesh. This is draw packaging, not hero design (P5 colour/geometry lock respected).
- **Governor** at 20 ms average (after warm-up); also applied to a saved Medium on a phone.

## Added (spent from the savings, near the lane)

- Hero contact blob (`render/blob.ts`): one disc on the surface below the hero, all tiers; it is the
  only grounding cue on Low.
- Hero body in dark slate with a brighter crimson scarf: luminance contrast >= 3:1 against the
  cream pad, wall and roof colours (`tests/adapters/heroPose.test.ts`).
- Anchors: 0.5 m spheres (was 0.35) plus one camera-facing gold ring per anchor, all in one mesh
  (one draw); the next anchor's ring pulses. Waypoint beam is wider and brighter.
- Pads get a dark timber border (one extra draw) so a cream pad reads against cream roofs.
- House trim (`trim` piece, Medium/High): lintels and sills on every window, door frames.

## Tests

`tests/adapters/graphicsTier.test.ts` (pixel-ratio table, composer null on coarse, tier extras),
`tests/adapters/budget.test.ts` (static triangle totals, caster opt-in, instanced and additive
caps), `tests/adapters/decor.test.ts` (instanced cap, triangle ceiling), `heroPose.test.ts`
(hero contrast, six skinned draws).

## Not done

Window lattice, eave struts, roof overhang and parapet caps (the eave is the collider, so an
overhang would lie about where the hero slips off); lane saturation tweak; the measured numbers are
SwiftShader draw/triangle counts, not device frame times.
