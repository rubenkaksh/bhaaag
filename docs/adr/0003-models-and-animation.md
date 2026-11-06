# ADR 0003: Models and animation (vidanta3d reuse, hero rig, render rules)

Status: Proposed 2026-11-05. Needs the plan owner's sign-off on §7 and the user's acceptance of the CC BY 3.0 duties (task A-01).

## Context

- **First playable:** hook → slide → land → die → restart on one hillside of 6–8 houses.
- **Core contract:** `src/core` stays pure, deterministic TS at 60 Hz with an AABB world. The view interpolates `prev`/`curr` SimState with `alpha`.
- **What the plan assumed:** no GLB in MVP0 (M5 note, M5-T10) and a mannequin hero (§5.7).
- **User direction (2026-11-05):** reuse `vidanta3d/assets/models/` before sourcing Poly Pizza models. That folder holds 24 GLBs; the controller verified the inventory.
- **Cache constraint:** `public/_headers` serves `/assets/*` with `Cache-Control: public, max-age=31536000, immutable`. Any unhashed file in `public/assets/` would never update for returning players.
- **Basis for the numbers:** every figure below was measured on 2026-11-05.
  - GLB files: byte header, JSON chunk, accessors, and forward kinematics run over the clips.
  - Toolchain: three r187 and Vite 8.3.5 sources in `node_modules`, Node v22.22.3, and tsc 6.0.3.

## Decision

| #   | Decision |
| --- | -------- |
| D1  | **Collision lives in JSON.** JSON is the gameplay truth and GLB is visuals only. Colliders are defined in `archetypes.json` and `parts.json`. Each model has a `fit` (scale, offset, yaw) that places it onto its JSON box, so swapping or refitting a model never changes collision. |
| D2  | **Reuse 6 vidanta GLBs:** the hero (P0); flag, shrine and stone wall (P1); bell and pagoda (P2, the pagoda behind a user check). Skip 17 files; the ratha comes later (P3). Houses, roofs, anchors, pads, rope and trolley stay procedural. Trees are 2 Poly Pizza CC0 models that the user downloads. |
| D3  | **Hero animation** combines options (a) and (c): the vidanta rig with 10 of its 24 clips, JSON poses played as 1-key clips in the same `AnimationMixer`, 5 procedural layers and 4 pins. Later, bpy-authored clips on the same rig. Retargeting (b) is a fallback only. |
| D4  | **Shipping path:** GLBs ship from `assets-src/` through Vite's hashed `?url` imports. Nothing goes into `public/assets/`. |
| D5  | **Compression:** MVP0 ships uncompressed GLB, so no decoders are needed. Later web builds use meshopt only, never Draco, and KTX2 only when it saves more than 0.6 MB. `assets-src/` stays uncompressed for Godot. |
| D6  | **Credits and fallback:** one manifest generates CREDITS.md, the in-game credits panel and a credit line on the start overlay. A CC0 hero replaces the CC BY 3.0 mesh before any store (DRM) build. The procedural fallback (plan D6) stays. |

## 1. Poly Pizza facts (scope: the gap-filling pieces)

Agents fetched only the pages below. F4 bans automated access, so any further page check and every download is a user step.

| #   | Fact | Status | Source |
| --- | ---- | ------ | ------ |
| F1  | Licence is set per model page: "Public Domain (CC0)" (links CC0 1.0) or "Creative Commons Attribution" (links **CC BY 3.0**). | verified | https://poly.pizza/m/Zt62gceKXZ, https://poly.pizza/m/qbDLeTtb8K |
| F2  | The same author mixes licences: Quaternius "Pine" is CC0, while Quaternius "Animated Base Character" is CC BY. Check every page; never infer the licence from the author. | verified | https://poly.pizza/m/Zt62gceKXZ, https://poly.pizza/m/cwYvO5UauX |
| F3  | Pages provide no ready-made attribution text. Build it from title, author, page URL and licence. | verified (2 pages) | https://poly.pizza/m/qbDLeTtb8K, https://poly.pizza/m/1zS7ucaAd4J |
| F4  | ToS requires following "the Creative Commons license that applies at the time of download", so record the date. It bans scraping and "automated means, including spiders, robots, crawlers" (robots.txt exceptions apply), plus extraction for ML. | verified | https://poly.pizza/docs/tos |
| F5  | ToS also says: "We do not claim ownership"; the uploader warrants the rights; the service is "AS IS"; the user indemnifies Poly Pizza; content can be removed without notice. It is silent on redistribution in games and on hotlinking. So keep pristine copies and page URLs, and never hotlink `static.poly.pizza`. | verified (silence = absent from the text) | https://poly.pizza/docs/tos |
| F6  | Model pages offer "FBX/GLTF" downloads and show no triangle count. Whether "GLTF" arrives as a single `.glb` is **unverified**; block 2 stops if it does not. | verified / **unverified** | https://poly.pizza/m/Zt62gceKXZ, https://poly.pizza/m/XVB8vUbnZb |
| F7  | Pine (Quaternius) is CC0. | verified | https://poly.pizza/m/Zt62gceKXZ |
| F8  | Homely House Set (Isa Lousberg): CC0; 27 items, including "Tree", "Tree Large" and "Foliage A"; one 1024² gradient atlas; no per-model URLs. European cottage style, so unusable for Newari houses; its trees are candidates. | verified | https://poly.pizza/bundle/Homely-House-Set-zECUN0FUzz |
| F9  | Explore filters are Category, Licence and Animated, with no tri-count or format filter. Of the top 30 "People & Characters", 29 are Quaternius and 1 is madtrollstudio. Rig and clip names are not listed. | verified | https://poly.pizza/explore/People-and-Characters |
| F10 | API v1 fields: `https://api.poly.pizza/v1/`, an `X-Auth-Token` from a free account, a `tricount` filter, and `TriangleCount`/`Licence` fields. The source claims CC-BY 4.0, which contradicts the pages; the pages win. Not used. | **unverified** (secondary source) | https://raw.githubusercontent.com/jasonkneen/tiny-world-builder/a2a112937576808b5e30f99c938540d3867d5a4d/.agents/skills/poly-pizza-api/SKILL.md |
| F11 | Press page says "over 7000" models, API "soon", and "free for hobby use and pay-as-you-go for commercial use". The page reads stale. | verified (stale) | https://poly.pizza/docs/press |
| F12 | Downloads carry converter generator strings (FBX2glTF v0.9.7, obj2gltf), so the site probably converts uploads. | inferred | measured vidanta GLBs |
| F13 | Licence texts (links below). CC BY 3.0 duties: §4(a) include the licence URI with every copy and impose no DRM; §4(b) credit author, title, URI and the adaptation, "in any reasonable manner", at least as prominent as other contributor credits. | verified | CC0 https://creativecommons.org/publicdomain/zero/1.0/; CC BY 3.0 https://creativecommons.org/licenses/by/3.0/legalcode |

## 2. Asset strategy

### 2.1 vidanta3d inventory → decision

| vidanta file | Page `/m/…` | Author · licence (source) | Tris · draw calls · bytes | Decision | Role · fit | GLB material → slot |
| ------------ | ----------- | ------------------------- | ------------------------- | -------- | ---------- | ------------------- |
| `hero_base_rigged.glb` | mesh `qbDLeTtb8K`; rig + clips `3hC2i0CTuO` | madtrollstudio · CC BY 3.0 (page) + Quaternius · CC0 (TSV) | 1,508 · 1 · 1,292,800 | **P0** → `derived/hero-base/` | hero · scale 1 | `DefaultMaterial` → `hero` |
| `flag.glb` | `FuOkF3WBrx` | Quaternius · CC0 (TSV) | 216 · 2 · 14,396 | **P1** | decor, one pad marker per pad · scale 0.75 (3.05 m), offset y +0.044 | `LightRed` → [cloth_blue, cloth_white, cloth_green]; `Brown` → steel |
| `shrine.glb` | `tFxdxO5clk` | Kay Lousberg · CC0 (TSV) | 94 · 1 · 23,392 | **P1** | part `chaitya_small` (1.1 × 2.4 × 1.1 m, already bottom-centred) | texture dropped (a "HalloweenBits" atlas) → stone |
| `wall.glb` | `tdeAOh3LQV` | Quaternius · CC0 (TSV) | 216 · 3 · 17,992 | **P1** | decor on terrace and field edges, kept off walkable tops (0.446 m tall, above the 0.4 m step-up) | Stone → stone, Stone_Light → stone_light, Wood → timber |
| `bell.glb` | `cILuaO115Y` | Quaternius · CC0 (TSV) | 779 · 1 · 20,164 | **P2** | decor at the shrine or courtyard | brass `#AF8136` reads as anchor brass → bronze |
| `pagoda.glb` | `1zS7ucaAd4J` | Poly by Google · CC BY 3.0 (page) | 2,362 · 1 · 1,720,628 (2048² PNG, 1.55 MB) | **P2**. Pristine copy goes in `…/source/` and never ships. Ships only as `derived/pagoda-512/`, after the user check A-16 | backdrop ≥ 150 m away · scale 0.55 (30.5 m tall, 14.5 m wide) | texture kept at 512² |
| `ratha.glb` | project-owned | vidanta · project | 1,582 · 5 · 109,344 | **P3**, after a bpy recolour of its gold `COLOR_0` (it clashes with anchor gold) | courtyard set piece | vertex colours |
| `crate.glb` | `1dh0EFL5gl` | Quaternius · CC0 | 1,348 · 1 · 75,296 | skip: centre pivot, 1.3k tris for a box | | |
| `platform.glb` | `BfEpoctX5p` | J-Toastie · CC BY | 38 · 1 · 4,272 | skip: costs a CC-BY credit for a 38-tri disc | | |
| `character_base.glb` | `qbDLeTtb8K` | madtrollstudio · CC BY 3.0 | 1,508 · 1 · 109,004 | skip: unrigged duplicate of the hero mesh, off-origin at x 6.4 | | |
| 8 heroes: `astronaut, blitz, bulwark, medic, striker, vex, rook, luna` | various | Quaternius CC0; striker CC BY 4.0; vex/rook/luna KayKit (provenance not recorded) | 0.5–1.9 MB each | skip: sci-fi or fantasy, not a neutral runner; the astronaut is 10.5k tris | | |
| 6 weapons and props: `smg, shotgun, rifle, ray_gun, grenade_launcher, landmine` | various | Quaternius · CC0 | | skip: sci-fi; the hook launcher is procedural | | |

- **What to copy:** `.glb` only. The Godot sidecars (`*.import`) and the extracted `*.png` files are Godot's import cache. Godot regenerates them when it imports `assets-src/`.
- **"(TSV)":** the licence comes from `vidanta3d/assets/models/SOURCES.tsv` and was not re-checked on the page. By F2 that is not enough, so A-01 has the user confirm all 7 pages.
- **"(page)":** the licence was checked on the page on 2026-11-05.
- **Size:** MVP0 ships 1,368,744 B of GLB (P0, P1 and the bell), plus trees and pagoda-512 when they land.

### 2.2 Gaps

| Gap | Fill | Why |
| --- | ---- | --- |
| 6 house archetypes, plus their tile tiers, kausi, slabs, parapets, rebar, scaffold, windows and lattice | procedural `parts.json` (M5-T01) | Colliders are JSON AABBs on a 0.5 m grid with 3.0 m floors. Role colours (cream pad, terracotta tile, dark rebar) must sit exactly on the gameplay surfaces. No Newari kit exists in the inventory, and F8 is European. |
| Anchors (rings, struts, rails, tank frames, flag masts) | always procedural: `mat_anchor`, `fog:false` | Reserved gameplay gold; never a downloaded model. |
| Pads, rope, trolley with handle bar, hook launcher | procedural | Readability; rope sag is visual only. |
| Prayer-flag catenaries, laundry, poles and wires, tanks, spiral stairs, rails, plants | procedural (M5-T06) | Cheap and exact to the palette. |
| Trees: one pine and one broadleaf | Poly Pizza CC0, downloaded by the user (A-14). Pine is `/m/Zt62gceKXZ` (CC0 verified, F7). For the broadleaf, pick a Quaternius CC0 tree (style match) or Homely House "Tree Large" (CC0 via F8). The broadleaf's licence is **unverified** until it is picked. | Organic silhouettes are slow to build procedurally; two models keep the credit list short. Fallback: the parts.json recipes `tree_pine` and `tree_broadleaf`, if M5-T01 adds them, otherwise none. |
| CC0 hero for store builds | A-20, later | CC BY 3.0 §4(a) forbids DRM. |

### 2.3 Layout, manifest, fit

```
assets-src/                                      uncompressed; Godot imports the same files
  derived/hero-base/hero_base_rigged.glb         vidanta's rigging of a CC-BY mesh (an adaptation)
  derived/pagoda-512/pagoda.glb                  A-17 output (P2)
  polypizza/<slug>-<polyId>/<file>.glb           pristine downloads, never edited
  polypizza/pagoda-1zS7ucaAd4J/source/pagoda.glb pristine, never shipped: `source/` is excluded from the build
content/assets/manifest.json                     one row per GLB; zod schema in src/content/assetManifest.ts; read at runtime
CREDITS.md                                       generated by `pnpm kit:check --write-credits`
```

| Field | Meaning |
| ----- | ------- |
| `id`, `src`, `ship` | `src` is the file under `assets-src/`. `ship` is what the web build bundles: either `src`, a derived path, or `null`. A `null` row must live under a `source/` folder. |
| `role`, `part` | `role` is `hero`, `decor`, `backdrop` or `part`. `part` is the `parts.json` id whose JSON box the visual is fitted to, or `null`. |
| `sources[]` | Each source has `title`, `author`, `url`, `licence`, `licenceUrl` and `licenceSource`. `licence` is one of `CC0-1.0`, `CC-BY-3.0`, `CC-BY-4.0`, `project`. `licenceSource` is `"page YYYY-MM-DD"` or `"vidanta3d SOURCES.tsv"`. The hero row has two sources. |
| `adapted` | What we changed, or `null`. Examples: "rigged to CharacterArmature and animated", "recoloured", "texture downscaled to 512 px". |
| `measured` | `tris`, `prims`, `bytes`, `joints`, `maxTexture`. Written by `kit-check --draft-rows`; K3 compares them against the file. |
| `texture`, `vertexColors`, `doubleSided` | `texture` is `keep`, `drop` or `none`; the other two are booleans. |
| `slots` | Maps each GLB material name to one slot or to a slot array. An array means a seeded pick per instance, `rng(seed, instanceId)`. |
| `fit` | `scale: [x,y,z]`, `offset: [x,y,z]` in metres, `yaw` in degrees. |
| `fallback` | A `parts.json` recipe id, or `null` (draw nothing). |

**Fit transform:** `world = instance · T(offset) · Ry(yaw) · Ry(180°) · S(scale) · glb`.

- **The 180° turn:** applied once, converting glTF +Z forward to core −Z (§5.7, M4-T02).
- **Yaw on `part` rows:** `fit.yaw` must be one of {0, 90, 180, 270}.
- **Collision:** always comes from the JSON part.

**Resolution order** (amends §5.7):

| Visual | Order |
| ------ | ----- |
| Part | kit GLB node `part_<id>` → manifest row with `part: <id>` → `parts.json` recipe |
| Hero | manifest `role: hero` → capsule-and-box mannequin |
| Decor | manifest row → its `fallback` recipe → nothing |

### 2.4 Shipping path (hashed, cache-safe)

```ts
// src/adapters/render/assetUrls.ts: the only source of GLB URLs (snippet not executed; options checked in the Vite 8.3.5 source)
const urls = import.meta.glob<string>(['/assets-src/**/*.glb', '!/assets-src/**/source/**'], {
  query: '?url',
  import: 'default',
  eager: true,
});
export function glbUrl(ship: string): string | null {
  return urls['/' + ship] ?? null;
}
```

- **Vite 8.3.5 options:** `query`, `import` and `eager` exist. `as` is deprecated ("Use `query` instead").
- **`?url` is required:** `.glb` is not a known asset type.
- **Negated globs work:** see `vite/dist/node/chunks/node.js:27755`.
- **No inlining:** only files under 4 KB are inlined, and every GLB here is larger.
- **Output:** files land in `dist/assets/<name>-<hash>.glb`, which is safe under the immutable `/assets/*` header. Never put an unhashed file in `public/assets/`; this applies to plan §5.7's `kit.glb` too.

### 2.5 kit-check extension

**How it runs:** `node tools/kit-check.ts`, with no new dependency. Node 22 strips TypeScript types without a flag (verified on v22.22.3; CI pins 22).

**Constraints:**

- **Syntax:** erasable TS only (no enums), with `.ts` import specifiers.
- **tsconfig:** `tsconfig.json` gains `"allowImportingTsExtensions": true`. tsc 6.0.3 accepts it with `noEmit` (verified).
- **Imports:** the tool imports only `src/content/assetManifest.ts` and `src/content/credits.ts`, and those two import only `zod`.
- **Parsing:** done by hand. GLB is a 12-byte header plus a JSON chunk; PNG dimensions come from the IHDR chunk.

| Check | Version | Rule |
| ----- | ------- | ---- |
| K1 | v0 | Every `*.glb` under `assets-src/` is some row's `src` or `ship`, and every row's files exist. A row has `ship: null` exactly when its file sits under `source/`. |
| K2 | v0 | `extensionsRequired` is empty, so MVP0 needs no decoder. |
| K3 | v0 | `measured` matches the file. Budgets: hero ≤ 8k tris and ≤ 64 joints; decor ≤ 3k tris; backdrop ≤ 5k tris. |
| K4 | v0 | Each CC-BY source has `title`, `author`, `url`, `licenceUrl` and `licenceSource`. `CREDITS.md` equals the generated text. |
| K5 | v0 | Shipped textures under `texture: keep` are ≤ 512 px (decor, backdrop) or ≤ 1024 px (hero). |
| K6 | v1 | After `fit`, `part` rows match the JSON box per axis within ±10% and are XZ-centred within ±0.05 m. Every row's bottom sits at y = 0 ± 0.02 m. |
| K7 | v1 | `slots` name existing `palette.json` slots. Decor never uses `anchor_glow`, the pad slot or a danger slot. Every decor slot is at least ΔE76 15 away from `anchor_glow` and from the pad slot. |
| K8 | v1 | Hero: every `anim.json` alias exists as a clip; the Root translation is constant; looped clips drift ≤ 0.02 m in hips XZ (FK sampled at 13 points). |

### 2.6 CC-BY duty

| Duty (CC BY 3.0 legal code) | How we meet it |
| --------------------------- | -------------- |
| §4(b): credit author, title, page URI, and what was adapted | `src/content/credits.ts` builds each line from `sources[]` and `adapted`. The lines appear in the credits panel (reachable from settings, M6-T07, and the level-complete card, M6-T05) and in CREDITS.md. |
| §4(b): at least as prominent as other contributor credits | One list in one type size. CC0 authors are credited as a courtesy. |
| §4(a): licence URI with every copy | Each CC-BY line ends with the licence URL. |
| §4(a): no DRM | The web build has none. A store build (FairPlay and similar) first needs A-20 and the pagoda removed. |
| ToS (F4): the licence at time of download applies | `licenceSource` records the page and the date. |

- **Hero credit (generated):** "Character Base" by madtrollstudio (https://poly.pizza/m/qbDLeTtb8K), CC BY 3.0 (https://creativecommons.org/licenses/by/3.0/). Adapted: rigged to Quaternius' CharacterArmature (CC0, https://poly.pizza/m/3hC2i0CTuO) and animated.
- **Start-overlay line (generated):** `Models: madtrollstudio (CC BY 3.0) · Quaternius, Kay Lousberg (CC0) · Credits`. "Poly by Google (CC BY 3.0)" is added when the pagoda ships.

### 2.7 GLB compatibility (files from a Godot project) and compression

| Question | Answer |
| -------- | ------ |
| Are these Godot exports? | No. The generators are Khronos glTF Blender I/O v5.2.40 (hero, ratha), FBX2glTF v0.9.7 and obj2gltf. All are plain glTF 2.0; `extensionsUsed` and `extensionsRequired` are empty in every measured file. |
| three r187 | GLTFLoader loads them without a decoder. It also supports `EXT_meshopt_compression`, `KHR_draco_mesh_compression`, `KHR_mesh_quantization` and `KHR_texture_basisu` (checked in `node_modules`). |
| Draco | Never. Godot 4 rejects `KHR_draco_mesh_compression` (forum report for 4.3; re-check on the Godot version used), and three's glTF Draco decoder is 188 KB of wasm. |
| Meshopt | Web build only, later (M5-T10, MVP1). The decoder `three/examples/jsm/libs/meshopt_decoder.module.js` is 28.6 KB. Godot meshopt import is unverified (§9.2), so the sources stay uncompressed. |
| KTX2 | Only when it saves more than ~0.6 MB, because the Basis transcoder is 516 KB of wasm plus 56 KB of JS. Not in MVP0: the shipped textures are the 15 KB shrine texture and pagoda-512. |
| Hero file | 1.29 MB, of which 872 KB (69%) is the JSON chunk: 24 clips × 186 channels. A-19 strips unused clips and constant channels; the estimated result is ≤ 0.4 MB (unverified). |
| Scale quirk | Every hero bone has world scale 100: `CharacterArmature` has s = 100 and bone translations are in 1/100 m (measured). Anything parented to a bone gets `scale = 1 / bone world scale`, measured at load and never hard-coded. FBX2glTF meshes carry node scale 100, and wall, bell and flag also a −90° X rotation; the loader applies these node transforms. |

## 3. Hero rig and animation

### 3.1 Options and recommendation

| | (a) Built-in clips | (b) Retargeted clips | (c) Procedural poses |
| - | ------------------ | -------------------- | -------------------- |
| States covered | 10: idle, walk, run, aim, aim_move, fire, land_roll, stumble, death, win | All, if a library has parkour clips | 9: slide, reel, hang, hang_aim, cling, jump, fall, land_clean, mantle |
| Mobile cost | 1 skinned draw call; about 600 track samples per frame during a fade | Same, plus extra clips in the file | 1-key clips: negligible |
| Determinism | Mixer time = sim time | Same | Same |
| Licence | Rig and clips CC0 (TSV; re-checked in A-01) | Per library, unverified; needs a 62-joint bone map | Ours |
| Look | Good loops | Best | Stiff unless layered |
| Godot | AnimationLibrary as is | Same | Runtime `Animation` |

- **Now:** (a) and (c) together in one `AnimationMixer`, with the layers and pins of §3.6.
- **Later (A-19):** bpy-authored clips on the same rig for jump, mantle, slide entry and hang swing, baked from the tuned poses. They are named with the logical names, so they win in §3.3 without code changes.
- **Fallback:** (b), only if A-19 fails.

### 3.2 Rig facts (measured on `hero_base_rigged.glb`)

| Fact | Value |
| ---- | ----- |
| Mesh | 1,508 tris, 1 primitive, 1 grey material (metalness 0.2): a single-colour mannequin |
| Size and facing | 1.845 m tall (T-pose bounds 1.022 × 1.845 × 0.353 m). Faces +Z, with the left hand at +X. |
| Skeleton | `CharacterArmature`, 62 joints. Each hand has 19 finger and thumb joints (Index, Middle, Ring, Pinky 1–4; Thumb 1–3). `PT.L` and `PT.R` are pole targets. World scale is 100. |
| Clips | Named `CharacterArmature\|<Name>`. 24 clips, each with 186 channels (T, R and S for all 62 joints). Note the misspelling `HitRecieve`. |
| Rest joints (m) | Hips y 0.894; Head 1.587; UpperArm.L (x 0.153, y 1.432); Wrist.L x 0.568; Middle1.L x 0.596; Middle2.L x 0.719; UpperLeg.L y 0.964; LowerLeg.L 0.533; Foot.L 0.023 |
| Hand | Rest palm faces down (thumb at +Z, 3 cm below the finger plane). With arms straight up, the grip point (midpoint of Middle1 and Middle2) is 1.94 m above the sole. |
| Hand slot | None. The procedural launcher attaches to `Wrist.R`, as vidanta's `hero_model.gd` does. |

### 3.3 Clip resolution and `content/hero/anim.json`

To find the source for a logical name, the view tries each step in order:

1. A GLB clip whose name after the last `|` equals the logical name (case-insensitive).
2. `aliases[name]`, then the GLB clip it names.
3. `poses[name]`, built as a 1-key clip.
4. `fallback[name]`, then steps 1–4 again for that name.
5. `idle`.

```json
{
  "aliases": { "aim": "Idle_Gun_Pointing", "aim_move": "Run_Shoot", "fire": "Gun_Shoot",
               "land_roll": "Roll", "stumble": "HitRecieve", "win": "Wave" },
  "fallback": { "jump": "fall", "fall": "idle", "cling": "hang", "hang": "idle", "hang_aim": "hang",
                "reel": "slide", "slide": "hang", "mantle": "cling", "aim_move": "aim", "aim": "idle",
                "fire": "aim", "walk": "run", "run": "idle", "land_clean": "idle", "win": "idle" },
  "speed": { "walkMin": 0.2, "runMin": 2.5, "hysteresis": 0.2, "walkStride": 1.5, "runStride": 6.0,
             "scaleMin": 0.6, "scaleMax": 1.4 },
  "grip": { "handleDrop": 0.08, "barWidth": 0.50, "pinClamp": 0.25, "curlDeg": -60 },
  "layers": { "pitchPerAccel": 2, "pitchMax": 20, "pitchOmega": 6, "swayPerSpeed": 3, "swayMax": 25,
              "swayDecay": 1.5, "swayHz": 0.5, "aimSpineShare": 0.5, "aimMax": 40, "legDeg": 10, "legHz": 1.5 },
  "poses": { "slide": { "R": { "UpperArm.L": [-90, 0, 84], "LowerArm.L": [0, -10, 0], "UpperLeg.L": [-25, 0, 0],
                               "LowerLeg.L": [35, 0, 0], "Head": [10, 0, 0] }, "mirror": true, "grip": "both" } }
}
```

### 3.4 State → clip/pose (blend times are fade-in, in seconds)

`speed` means horizontal speed. Any state change interrupts a one-shot clip, using the new row's fade-in.

| Sim condition | Logical | Source | Play | Fade-in | Pin | Layers |
| ------------- | ------- | ------ | ---- | ------- | --- | ------ |
| Grounded, speed < 0.2 | idle | `Idle` | loop | 0.20 | — | — |
| Grounded, 0.2–2.5 m/s (±0.2 hysteresis) | walk | `Walk` | loop, ×speed/1.5 (0.6–1.4) | 0.20 | — | — |
| Grounded, ≥ 2.5 m/s | run | `Run` | loop, ×speed/6.0 (0.6–1.4); fades to and from walk with warp | 0.20 | — | — |
| Grounded + Aiming, standing | aim | `Idle_Gun_Pointing` (right wrist at 1.38 m) | loop | 0.10 | — | aim |
| Grounded + Aiming, moving | aim_move | `Run_Shoot`; P2 adds `Run_Left/Right/Back` by stick angle | loop, ×speed/6.0 | 0.10 | — | aim |
| Hook Flying, hero standing | fire | `Gun_Shoot` | once | 0.05 | — | aim |
| Hanging + Aiming, or hook Flying from Hanging | hang_aim | pose | — | 0.10 | left grip | aim, sway |
| Attached | slide | pose | — | 0.15 (0.12 from fire) | grip | yaw, pitch |
| Attached, braking (REEL held) | reel | pose (knees up) | — | 0.10 | grip | yaw, pitch |
| Hanging, cause AnchorStop | hang | pose | — | 0.20 | grip | sway |
| Hanging, cause Cling | cling | pose (feet on the wall) | — | 0.06 | grip | — |
| LedgeGrab | cling | pose | — | 0.06 | ledge | — |
| Mantle | mantle | 2-key pose clip `mantle_a → mantle_b` | scrubbed: time = stateTime / mantleTime | 0.10; 0.15 on exit | ledge, then feet | — |
| Airborne, vy > 0 and < 0.25 s since JUMP | jump | pose | — | 0.05 | — | — |
| Airborne otherwise (walk-off, DROP, slip off tiles) | fall | pose | — | 0.15 (0.25 from jump) | — | leg cycle |
| Grounded, clean landing ≤ 0.12 s ago (the sim's clean landing lasts 0 s) | land_clean | pose with `T.Hips` y −0.27 | hold 0.12, then fade out 0.15 | 0.05 | feet | — |
| Landing roll (sim 0.35 s) | land_roll | `Roll`, starting at 0.10 s | once ×2.0 (≈ 0.62 s); continues into Grounded until clip time 1.17 s, then 0.15 to run or idle | 0.05 | — | — |
| Landing stumble (sim 0.6 s) | stumble | `HitRecieve` | once ×0.9 (0.60 s) | 0.05 | — | — |
| Dead | death | `Death` | once and clamped; down at 0.72 s, before the 0.8 s auto-restart | 0.05 | — | — |
| LevelComplete | win | `Wave` (left hand) | loop | 0.30 | — | — |
| Restart | idle | hard reset: stop all actions, rest pose, zero the springs | — | 0 | — | — |

Never used: 14 clips. Six are kept for MVP1 melee (Punch ×2, Kick ×2, Sword_Slash, Idle_Sword) and three for P2 strafe (Run_Back/Left/Right). A-19 drops five: Idle_Gun, Idle_Gun_Shoot, Idle_Neutral, Interact, HitRecieve_2.

### 3.5 Poses

The format is engine-neutral. Its formulas are unexecuted; the A-07 tests prove them.

- **Angles and frame:** Euler degrees `[x, y, z]` in the body-rest frame: +X is the hero's left, +Y is up, +Z is forward.
- **Rotation order:** `q_off = qY(y) · qZ(z) · qX(x)`, built from axis-angle rather than engine Euler enums.
  - X turns first: twist, plus hip and spine pitch.
  - Z turns next: arm raise.
  - Y turns last: arm swing.
- **Local rotation:** `q_local = q_restLocal · (W0⁻¹ · q_off · W0)`. W0 is the bone's rest rotation in glTF model space, before the 180° turn.
- **How offsets compose:** model-space rotation = `q_off(parent) · q_off(child) · W0(child)`. Each offset therefore reads as if everything above the bone were at rest.
- **Optional `T`:** a per-bone translation in metres, in the body-rest frame. It is converted to bone-local units: rotate by the parent's inverse rest rotation, then divide by the world scale (100).
- **Mirroring:** `mirror: true` copies each `.L` value to `.R` as (x, −y, −z). Explicit `.R` entries win.
- **Track coverage:** every pose clip carries a rotation track for all 62 joints, at rest where the pose says nothing. Cross-fades therefore never read stale bone state.
- **Sign conventions:**
  - spine and head: x+ leans or nods forward
  - hip: x− flexes the thigh forward
  - knee: LowerLeg x+ flexes it
  - arm (`.L`): z+ raises, y− swings forward, x −90 turns the palm forward
- **Grip:** `grip` curls finger joints 2–4 (Index, Middle, Ring, Pinky) by z −60° on the left, mirrored on the right. The thumbs are tuned in the editor.

Seeds are given for the left side, mirrored unless the right side is stated. They express intent only; A-13 tunes them.

| Pose | Arms | Legs | Spine and head | Extra |
| ---- | ---- | ---- | -------------- | ----- |
| slide | UpperArm [−90,0,84], LowerArm [0,−10,0] | UpperLeg [−25,0,0], LowerLeg [35,0,0] | Head [10,0,0] | grip both |
| reel | UpperArm [−90,0,84], LowerArm [0,−25,0] | UpperLeg [−70,0,0], LowerLeg [90,0,0] | Torso [−10,0,0], Head [10,0,0] | grip both |
| hang | UpperArm [−90,0,86], LowerArm [0,−5,0] | UpperLeg [−5,0,0], LowerLeg [10,0,0] | — | grip both |
| hang_aim | Left as hang; UpperArm.R [0,90,0] | as hang | — | grip left |
| cling | UpperArm [−90,0,80], LowerArm [0,−30,0] | UpperLeg [−75,0,0], LowerLeg [80,0,0] | Torso [−15,0,0], Head [10,0,0] | grip both |
| jump | UpperArm [0,−40,40], LowerArm [0,−20,0] | Left: UpperLeg [−60,0,0], LowerLeg [70,0,0]. Right: UpperLeg [15,0,0], LowerLeg [40,0,0] | Torso [10,0,0] | — |
| fall | UpperArm [0,−20,45], LowerArm [0,−15,0] | Left: UpperLeg [−35,0,0], LowerLeg [50,0,0]. Right: UpperLeg [−10,0,0], LowerLeg [30,0,0] | Torso [5,0,0] | — |
| land_clean | UpperArm [0,−45,−30], LowerArm [0,−20,0] | UpperLeg [−60,0,0], LowerLeg [90,0,0], Foot [−30,0,0] | Torso [25,0,0], Head [−15,0,0] | T.Hips [0,−0.27,0.05] |
| mantle_a | UpperArm [0,−60,50], LowerArm [0,−60,0] | Left: UpperLeg [−80,0,0], LowerLeg [100,0,0]. Right: UpperLeg [−10,0,0], LowerLeg [20,0,0] | Torso [30,0,0] | — |
| mantle_b | UpperArm [0,−30,−50], LowerArm [0,−10,0] | Left: UpperLeg [−90,0,0], LowerLeg [120,0,0]. Right: UpperLeg [−30,0,0], LowerLeg [60,0,0] | Torso [35,0,0] | — |

### 3.6 Layers, pins (hands on the trolley), frame order

| Layer | Rule. All layers are cosmetic and run on sim time. |
| ----- | -------------------------------------------------- |
| yaw | While Attached or Hanging, the root faces the rope's horizontal direction. Otherwise it uses the sim facing. |
| pitch | θ = clamp(2° · a_rope, ±20°), through a critically damped spring (ω 6) stepped once per sim tick. θ > 0 swings the feet back: braking at −10 m/s² gives −20°. Pivots about the trolley point T. |
| sway | A · e^(−1.5t) · sin(2π · 0.5t), with A = clamp(3° · v_entry, 0, 25°) and t = time in Hanging. Pivots about T. |
| aim | Torso and Chest each take half the aim pitch (clamped ±40°). The right arm slerps toward the aim direction. |
| leg cycle | UpperLeg ±10° at 1.5 Hz, in fall only. |

Pins move the model root, not limbs (no IK). That keeps them engine-neutral, and tuned poses keep the shift near zero.

| Pin | Target | Shift Δ |
| --- | ------ | ------- |
| grip | handle-bar centre H = T − (0, 0.08, 0); the bar is 0.50 m wide, across the rope | H − mean(hand grips), where a hand grip is the midpoint of Middle1 and Middle2 |
| left grip | H | H − left-hand grip |
| ledge | `grabPoint` | grabPoint − mean(hand grips) |
| feet | ground y under the hero (the blob-shadow query) | Δy = ground − lowest foot y |

Every pin is clamped to |Δ| ≤ 0.25 m and multiplied by the pose action's `getEffectiveWeight()`, so pins fade with the cross-fade.

**Slide hands on the trolley:**

- **Seeded fit:** the hands sit about 0.41 m apart on the 0.50 m bar, with the grip about 1.89 m above the sole.
- **Sim geometry:** feet are 2.0 m below T, and the bar hangs 0.08 m below T.
- **Resulting shift:** Δ ≈ +0.03 m, so the visual feet ride 3 cm above the sim feet.
- **Gate (A-13):** |Δ| ≤ 0.05 m after tuning.

Frame order in `heroView.ts`:

1. Restore the rest pose on all 62 bones, so the mixer's saved original state is always rest and layers never accumulate.
2. Run `selectClip(prev, curr)`. It is pure, lives in `heroAnimMap.ts`, and plays or cross-fades the actions.
3. Call `mixer.update(t − tLast)` with t = (tick + alpha) / 60. Pause and slow-mo then apply for free.
4. Apply the layers.
5. Place the root: position is the lerp of the sim feet point; rotation is the yaw, with pitch and sway applied about T.
6. Call `updateMatrixWorld`, then apply the pins.
7. Render.

### 3.7 Root-motion-free rules (FK-sampled on the used clips)

| Rule | Status |
| ---- | ------ |
| Sim position is the only source of hero translation; the view never extracts root motion | by construction |
| Root joint translation is constant in every clip | verified: 0 in all 24 |
| Looped clips keep hips XZ drift ≤ 0.02 m | verified for Idle, Walk (X sway ±0.02), Run, Run_Shoot, Idle_Gun_Pointing and Wave |
| Vertical motion lives in the `Body` translation | verified: Run bobs 0.08 m. Roll moves the hips 0.84 → 0.07 → 0.84 m with 0.3 m of Z travel and ends where it started. |
| One-shot clips may displace the body only when the state ends anyway | verified: Death falls back 0.74 m and stays down; a restart follows |
| bpy clips (A-19) obey the same rules | enforced by K8 |

### 3.8 Mobile cost, determinism, SimState fields

- **Draw calls:** one SkinnedMesh draw, plus one in the Medium/High shadow pass.
- **Bones:** the 62 bones go into the bone texture. three r187 always uses it (`WebGLRenderer.js:2707–2709`), so there is no uniform limit.
- **Mixer cost:** about 600 track samples per frame during a cross-fade.
- **Culling:** `frustumCulled = false` on the hero, because bind-pose bounds are wrong mid-roll.
- **Determinism:** the view only reads SimState, never writes it. Animation time is sim time, springs step per sim tick, and everything resets on restart. Golden traces are unaffected.
- **SimState fields the view reads** (add them in M2/M3 if missing):
  - `hero`: `state`, `stateTicks`, `pos`, `vel`, `yaw`, `lastLanding {kind, tick}`, `hangCause` (AnchorStop or Cling), `braking`, `grabPoint`, `aimBase` (Grounded or Hanging), aim yaw and pitch
  - `hook.state`, `tick`
  - rope `O`, `d`, `s`

### 3.9 Godot 4 equivalent

| This ADR (three.js) | Godot 4 |
| ------------------- | ------- |
| GLTFLoader + `AnimationMixer` | glTF import → Skeleton3D + AnimationPlayer with an AnimationLibrary. Clip names stay `CharacterArmature\|Idle`, as in vidanta's `hero_model.gd`. |
| `selectClip` + fades | AnimationTree with an AnimationNodeStateMachine. Each transition's `xfade_time` comes from §3.4's fade-in column; `play(name, custom_blend, custom_speed)` also works. |
| timeScale from speed | AnimationNodeTimeScale, or a BlendSpace1D for walk ↔ run |
| JSON poses | A runtime `Animation` with one `TYPE_ROTATION_3D` key per joint (same quaternion formula), added to the library |
| Mantle scrub | AnimationNodeTimeSeek, or `seek()` |
| Layers and pins | A SkeletonModifier3D subclass (4.3+, verify) that runs after the tree |
| Grip point | `Skeleton3D.get_bone_global_pose()` of Middle1/Middle2 |
| Launcher under `Wrist.R` | BoneAttachment3D (check the ×100 scale after import) |
| Mixer on sim time | `callback_mode_process` = manual, plus `advance(dt)` from the sim loop (verify) |
| `heroAnimMap.ts` | Ports as plain GDScript: a pure function of SimState |

## 4. Rendering rules

| Rule | Detail |
| ---- | ------ |
| Loader confinement | `GLTFLoader` may only be imported under `src/adapters/render/**`, enforced by ESLint `no-restricted-imports` (A-05). |
| Instancing | One `InstancedMesh` per (part × material) for kit parts and per GLB primitive for manifest rows. Per-instance colour via `setColorAt`; call `computeBoundingSphere()` after placement. Houses repeat through instancing and never through clones. |
| Materials | Stock `MeshStandardMaterial` only, normalised at load and cached by (map, vertexColors, side). Settings are listed below this table. |
| Palette roles | Three roles. Gold `anchor_glow` = interactive (anchors only, emissive, `fog:false`). Cream = safe (pad slab, reserved pad slot). Terracotta tile or dark rebar = danger. Decor uses only the slots in the table below, never a reserved or danger slot (K7). |
| Hot swap | The game starts on primitives. GLBs load in the background with an 8 s timeout each. On arrival, shaders are warmed with `renderer.compileAsync(scene, camera)` (present in r187) and the visuals swap in. The sim is never touched. |
| Loader failure | A failure or timeout falls back to the `parts.json` recipe or the mannequin, logged once. `?noglb` forces this path. `resolveVisual(id, manifest, kitNodes, loaded)` returns `{kind: 'kit' \| 'model' \| 'procedural' \| 'none'}`; it is pure and unit-tested. |

**Material settings:**

- **Base colour:** white; the slot colour rides in `instanceColor`.
- **Metalness 0:** there is no env map, and FBX2glTF's 0.4 renders dark.
- **Surface:** roughness ≥ 0.8; no emissive.
- **Map and vertex colours:** per the row's `texture` and `vertexColors` fields.
- **Side and fog:** FrontSide unless `doubleSided`; fog on.

Decor and hero slots, proposed for M5-T03. Distances are ΔE76 to anchor_glow / cream / terracotta. The cream column uses plaster_cream as a stand-in until the pad hex is fixed.

| Slot | Hex | ΔE76 | Slot | Hex | ΔE76 |
| ---- | --- | ---- | ---- | --- | ---- |
| stone | `#7E7A70` | 72 / 39 / 48 | foliage_dark | `#2F5A2E` | 76 / 58 / 65 |
| stone_light | `#A39E92` | 66 / 27 / 52 | cloth_blue | `#2F6FD1` | 132 / 90 / 94 |
| timber (= timber_carved) | `#4A2E1C` | 83 / 65 / 38 | cloth_white | `#F4F4F4` | 70 / 27 / 73 |
| steel (= steel_rail) | `#C8C8C8` | 69 / 25 / 63 | cloth_green | `#2F9E4F` | 69 / 58 / 87 |
| bronze | `#5A4A32` | 75 / 53 / 40 | ochre (replaces flag yellow) | `#B07A2A` | 38 / 41 / 31 |
| foliage | `#4F7A3A` | 63 / 49 / 65 | **hero** (seed; ≥ 30 from all 37 palette and decor slots, closest sky_zenith 30.5) | `#1F8A8A` | 90 / 55 / 79 |

Rejected colours:

- **Plan flag yellow `#F2C230`:** ΔE 7.5 from anchor_glow, so it effectively is anchor gold.
- **Shipped flag cloth `#8F433A`:** ΔE 9.0 from brick and 15.7 from terracotta.
- **Bell brass `#AF8136`:** anchors are "warm brass" (§5.2).

**First-playable budget** for a mid phone. Plan §7.1 caps are < 150 draw calls and 150–300k tris.

| Group | Draw calls | Tris |
| ----- | ---------- | ---- |
| Houses (instanced parts) | ≤ 40 | ≤ 60k |
| Anchors, pads, rope, trolley | ≤ 10 | ≤ 5k |
| Decor + trees (GLB, per primitive) | ≤ 12 | ≤ 30k |
| Pagoda backdrop (if shipped) | 1 | 2.4k |
| Hero + launcher | ≤ 3 | ≤ 2k |
| Sky, ridges, terrain | ≤ 15 | ≤ 40k |
| Procedural props | ≤ 15 | ≤ 30k |
| **Total visible** | **≤ 96 (Low)** | **≤ 170k** |
| Shadow pass (Medium/High) | ≤ 45 | ≤ 80k |

Medium totals ≤ 141 draw calls.

**Shadows:**

| Preset | Shadows |
| ------ | ------- |
| All | A blob shadow, always on as a gameplay cue. It is projected onto the highest walkable surface below the hero, found by a pure, read-only core query. Opacity is clamp(1 − h/12, 0.25, 0.8) and scale is 0.6 + 0.04·h. |
| Low | blob only |
| Medium | A 1024 follow map with a 40 m texel-snapped ortho box. Casters are the hero and the houses; decor and trees have `castShadow = false`. |
| High | 2048 PCFSoft; trees may cast. |

## 5. Tasks

### 5.1 Ordered list

**Verification codes:**

- **C:** a controller command
- **Mu:** a mutation test
- **S:** a Sonnet review seat
- **U:** a user eyeball check

**Opus max** marks a task that needs another design decision at Opus max.

| id | Task | Engine | Files | Verification | After |
| -- | ---- | ------ | ----- | ------------ | ----- |
| A-01 | Copy 6 vidanta GLBs into `assets-src/` and confirm the 7 page licences (block 1) | user | `assets-src/**` | C: the two shasum lists match pairwise, and all 7 licence labels match §2.1 | — |
| A-02 | Zod schema and types for the manifest (§2.3) | hunter | `src/content/assetManifest.ts` | C: `pnpm typecheck` exits 0. `node -e "import('./src/content/assetManifest.ts').then(m=>console.log(typeof m.assetManifestSchema.parse))"` prints `function`. | — |
| A-03 | kit-check v0 (K1–K5) with `--draft-rows` and `--write-credits`; credits generator; `kit:check` script; CI step after `validate:levels`; `allowImportingTsExtensions` | cursor | `tools/kit-check.ts`, `src/content/credits.ts`, `tests/tools/kit-check.test.ts`, `package.json`, `.github/workflows/ci.yml`, `tsconfig.json` | C: `pnpm test tests/tools/kit-check.test.ts` passes, with one failing fixture per check. `node tools/kit-check.ts --draft-rows` prints 6 rows. Mu: delete one check's condition and its fixture test fails. | A-02 |
| A-04 | Manifest rows for the 6 files (draft rows plus the §2.1 columns), then generate CREDITS.md | hunter | `content/assets/manifest.json`, `CREDITS.md` (generated) | C: `pnpm kit:check` exits 0. Running `pnpm kit:check --write-credits` again leaves `git diff --exit-code CREDITS.md` clean. | A-01, A-03 |
| A-05 | Confine GLTFLoader imports to `src/adapters/render/**` | hunter | `eslint.config.js` | C: `pnpm lint` exits 0. Mu: add `import 'three/examples/jsm/loaders/GLTFLoader.js'` to `src/app/main.ts`; `pnpm lint` fails with `no-restricted-imports`; revert. | — |
| A-06 | Pure `selectClip` implementing §3.4, the §3.3 resolution chain, and the `anim.json` schema and data | gamer-pro | `src/adapters/render/heroAnimMap.ts`, `content/hero/anim.json`, `tests/render/heroAnimMap.test.ts` | C: `pnpm test tests/render/heroAnimMap.test.ts`, with one case per §3.4 row and per fallback chain. Mu: swap two fades in `anim.json` and a case fails. | SimState fields (§3.8) |
| A-07 | Pose → 1-key clip builder: mirror, grip curl, `T` conversion, pin and layer maths | gamer-pro | `src/adapters/render/heroPoses.ts`, `tests/render/heroPoses.test.ts` | C: tests on a synthetic 3-bone chain under a scaled, rotated parent (the ×100 case) cover model-space offsets, mirroring and the pin clamp. Mu: reverse the quaternion product order and a test fails. | A-06 |
| A-08 | Hero load: material normalisation, §3.6 frame order, launcher under `Wrist.R` with scale compensation, mannequin fallback, hot swap | cursor | `src/adapters/render/{heroModel,heroView,materials}.ts`, `src/adapters/render/props/launcher.ts` | C: `pnpm typecheck && pnpm test && pnpm build`, then `ls dist/assets` shows a hashed `hero_base_rigged-*.glb`. U: in `pnpm dev`, idle, run, aim, slide, hang, roll and death read correctly, and `?noglb` shows the mannequin. | A-04, A-05, A-07 |
| A-09 | One review seat over A-06 to A-08 against §3 | Sonnet | — | S | A-08 |
| A-10 | Manifest-row loader: `assetUrls.ts`, `resolveVisual`, instancing per primitive, slot recolour, 8 s timeout, `?noglb`, `compileAsync` warm-up | cursor | `src/adapters/render/{assetUrls,resolveVisual,decor}.ts`, `tests/render/resolveVisual.test.ts` | C: `pnpm test tests/render/resolveVisual.test.ts` covers kit → model → procedural, and missing or timed-out → procedural. After `pnpm build`, `ls dist/assets/*.glb` lists every `ship` file hashed and no `source/` file. Mu: swap the first two resolution steps and a test fails. | A-04, M5-T01, M5-T02 |
| A-11 | Credits panel (from settings and the level-complete card) and the start-overlay line, both from `credits.ts` | cursor | `src/adapters/ui/credits.ts`, overlay hook in `src/adapters/ui/` | C: `pnpm test` shows every CC-BY source with its licence URL. U: the line shows on the overlay and the panel opens. | A-04, M6-T05, M6-T07 |
| A-12 | Pose editor at `?debug&pose=<name>`: bone sliders, mirror toggle, pin-error readout, "copy JSON" | cursor | `src/adapters/ui/poseEditor.ts` | C: `pnpm build`. U: JSON copied into `anim.json` reproduces the pose. | A-08, M2-T10 |
| A-13 | Tune the 10 poses and run the eyeball gates on a phone | user | `content/hero/anim.json` (via the editor) | U: pin error ≤ 0.05 m on every pinned pose, and hero, gold, cream and terracotta read as distinct in sunset light. If the gate fails, **Opus max** decides between bpy clips now and retargeting. | A-12 |
| A-14 | Download 2 CC0 trees (block 2) | user | `assets-src/polypizza/**` | C: shasum printed, and the page label, URL and date reported | — |
| A-15 | Tree manifest rows; regenerate CREDITS.md | hunter | `content/assets/manifest.json`, `CREDITS.md` | C: `pnpm kit:check` exits 0 | A-04, A-14 |
| A-16 | Pagoda gate: does https://poly.pizza/m/1zS7ucaAd4J read as Newari rather than Japanese for a backdrop 150 m away? | user | — | U: yes → A-17; no → delete the pagoda rows and the `source/` copy | A-01 |
| A-17 | bpy texture-downscale tool, plus `derived/pagoda-512` and its row | Haiku | `tools/bpy/downscale_textures.py`, `assets-src/derived/pagoda-512/pagoda.glb`, `content/assets/manifest.json` | C: `blender -b -P tools/bpy/downscale_textures.py -- assets-src/polypizza/pagoda-1zS7ucaAd4J/source/pagoda.glb assets-src/derived/pagoda-512/pagoda.glb 512` exits 0, the output is ≤ 300 KB, and `pnpm kit:check` exits 0 | A-16 |
| A-18 | kit-check v1 (K6–K8) | hunter-pro | `tools/kit-check.ts`, `tests/tools/kit-check.test.ts` | C: `pnpm kit:check` exits 0 on the real tree, with one failing fixture per check. Mu: set the flag's `fit.offset` y to 0 and K6 fails. | A-04, M5-T01, M5-T03 |
| A-19 | Later: bpy-authored hero v2 clips (jump, mantle, slide entry, hang swing) baked from the tuned poses; strip unused clips and constant channels | Sonnet; **Opus max** for the clip spec | `tools/bpy/hero_clips.py`, `assets-src/derived/hero-v2/hero.glb`, manifest row | C: K8 passes and the hero file is ≤ 0.6 MB. U: side-by-side comparison with the poses. | A-13 |
| A-20 | Later, before any store build: a CC0 hero mesh skinned to the same rig | Sonnet; **Opus max** for the pick | `assets-src/derived/hero-cc0/*`, manifest | C: `pnpm kit:check` exits 0 and the credits contain no CC-BY hero line | store-build decision |
| A-21 | Optional validator rule: decor without a collider stays outside walkable tops + 0.35 m and outside rope-chord capsules | hunter-pro | `tools/validator/static/decorClearance.ts`, a failing fixture | C: `pnpm validate:levels` exits 0 on L1 and the fixture fails. Mu: remove the chord test and the chord fixture passes (it must fail). | M4-T05 |

**Count by engine:**

| Engine | Count | Tasks |
| ------ | ----- | ----- |
| user | 4 | A-01, A-13, A-14, A-16 |
| hunter | 4 | A-02, A-04, A-05, A-15 |
| cursor | 5 | A-03, A-08, A-10, A-11, A-12 |
| gamer-pro | 2 | A-06, A-07 |
| hunter-pro | 1 (2 with optional A-21) | A-18 |
| Haiku | 1 | A-17 |
| Sonnet | 3 | A-09, A-19, A-20 |

That is 20 tasks, or 21 with A-21. Opus max tags: A-19, A-20, and A-13 if its gate fails. This list supersedes M6-T03.

### 5.2 User-only steps (agents cannot read `~/Downloads` and may not script poly.pizza, F4)

**Block 1 (A-01).** Running it means you accept the CC BY 3.0 credit duties in §2.6.

```sh
cd /Users/rubenk/projects/sandbox/workspaces/bhagdori
V=/Users/rubenk/projects/sandbox/workspaces/vidanta3d/assets/models
mkdir -p assets-src/derived/hero-base \
  assets-src/polypizza/flag-FuOkF3WBrx \
  assets-src/polypizza/shrine-tFxdxO5clk \
  assets-src/polypizza/stone-wall-tdeAOh3LQV \
  assets-src/polypizza/bell-cILuaO115Y \
  assets-src/polypizza/pagoda-1zS7ucaAd4J/source
cp "$V/hero_base_rigged.glb" assets-src/derived/hero-base/
cp "$V/flag.glb"   assets-src/polypizza/flag-FuOkF3WBrx/
cp "$V/shrine.glb" assets-src/polypizza/shrine-tFxdxO5clk/
cp "$V/wall.glb"   assets-src/polypizza/stone-wall-tdeAOh3LQV/
cp "$V/bell.glb"   assets-src/polypizza/bell-cILuaO115Y/
cp "$V/pagoda.glb" assets-src/polypizza/pagoda-1zS7ucaAd4J/source/
shasum -a 256 "$V"/{hero_base_rigged,flag,shrine,wall,bell,pagoda}.glb
find assets-src -name '*.glb' -exec shasum -a 256 {} +
```

Then open each page below in a browser and write down its licence label and today's date:

- https://poly.pizza/m/qbDLeTtb8K
- https://poly.pizza/m/3hC2i0CTuO
- https://poly.pizza/m/FuOkF3WBrx
- https://poly.pizza/m/tFxdxO5clk
- https://poly.pizza/m/tdeAOh3LQV
- https://poly.pizza/m/cILuaO115Y
- https://poly.pizza/m/1zS7ucaAd4J

Paste both shasum lists and the 7 labels to the controller. If any label differs from §2.1, stop.

**Block 2 (A-14), trees:**

```sh
cd /Users/rubenk/projects/sandbox/workspaces/bhagdori
# Pine: open https://poly.pizza/m/Zt62gceKXZ, confirm "Public Domain (CC0)", note the date, Download → GLTF
F="$(ls -t ~/Downloads | head -1)"; echo "$F"; head -c 4 ~/Downloads/"$F"; echo   # must print glTF; otherwise stop and report
mkdir -p assets-src/polypizza/pine-Zt62gceKXZ
cp ~/Downloads/"$F" assets-src/polypizza/pine-Zt62gceKXZ/pine.glb
# Broadleaf: pick one CC0 tree page (Quaternius preferred; or Homely House "Tree Large"), confirm CC0 on that page,
# download GLTF, then replace <slug> and <id> (the id is the /m/<id> part of the URL; for the bundle use homely-house)
F="$(ls -t ~/Downloads | head -1)"; echo "$F"; head -c 4 ~/Downloads/"$F"; echo
mkdir -p assets-src/polypizza/<slug>-<id>
cp ~/Downloads/"$F" assets-src/polypizza/<slug>-<id>/<slug>.glb
shasum -a 256 assets-src/polypizza/pine-Zt62gceKXZ/pine.glb assets-src/polypizza/<slug>-<id>/<slug>.glb
```

Report the URL, title, author, licence label and date for each tree. If a `.zip` or `.gltf` arrives instead of a `.glb`, stop and tell the controller.

## 6. Open risks

| # | Risk | Mitigation |
| - | ---- | ---------- |
| R1 | CC BY 3.0 duties: a missing credit, or a store build with DRM, breaches §4(a)/(b). Affects the hero mesh and the pagoda. | Credits are generated from the manifest and checked in CI (K4); overlay line and panel (A-11); A-20 and pagoda removal before any store build. |
| R2 | Provenance: vidanta licences come from a TSV without download dates. One author mixes licences (F2). Poly Pizza gives no warranty and can delete pages (F5). | Dated page checks by the user (A-01), pristine copies kept, every author credited. |
| R3 | Stiff poses, or the grip popping on the trolley. | Pose editor with a live pin-error readout; pins clamped and faded by weight; pitch, sway and leg-cycle layers; the A-13 gate; A-19 bpy clips. |
| R4 | Style or culture clash: the pagoda may read Japanese, the shrine carries a Halloween atlas, the trees are cottage style, and the hero is one colour. | User gates (A-13, A-16), texture drop plus slot recolour, the D6 fallback, and vertex-colour regions in A-19. |
| R5 | Readability: decor near anchor gold or danger colours (flag yellow ΔE 7.5, flag cloth ΔE 9.0 from brick, the brass bell); decor without colliders in walk paths or rope corridors. | Decor slots and K7, the §2.1 recolours, the A-21 validator rule, a phone check. |
| R6 | Size and load: the hero is 1.29 MB (872 KB JSON, 4,464 tracks to parse) and has 62 joints against the plan's 40; parse time on a phone is unmeasured. | Hot swap (play starts on the mannequin), `compileAsync` warm-up, the budget amendment, the A-19 strip, meshopt in the web build later. |

## 7. Plan amendments (for the plan owner)

| Plan item | Change |
| --------- | ------ |
| §5.7 resolution order | Use the §2.3 order: kit `part_<id>` → manifest row with `part` → `parts.json`. For the hero: manifest hero row → mannequin. |
| §5.7 budgets | Hero ≤ 64 joints instead of 40 bones. The rig has 62, and r187 skins through a bone texture. |
| §5.7 clip names | Add `walk`, `aim_move`, `hang_aim`, `jump`, `win`; the alias and fallback chain lives in `content/hero/anim.json`. |
| §5.7 kit path, §3.1 `public/assets/` | `_headers` makes `/assets/*` immutable for a year. GLBs, including `kit.glb`, ship from `assets-src/` via hashed `?url` imports, or the build hashes the names. Unhashed files never go in `public/assets/`. |
| D6, M5-T10, M5 checklist note | Meshopt only, never Draco; KTX2 only when it saves more than 0.6 MB. MVP0 now ships uncompressed GLB, so "MVP0 has no GLB" no longer holds. |
| §7.1 download | MVP0: first frame < 1.5 MB on primitives (unchanged); total ≤ 2.5 MB including GLBs. |
| §5.2 palette, M5-T03 | Add the §4 decor slots and `hero`. Prayer-flag yellow `#F2C230` becomes ochre `#B07A2A` (ΔE 7.5 from anchor_glow breaks "nothing decorative may use anchor gold"). |
| §5.3 `chaitya_small` | Give it a 1.1 × 2.4 × 1.1 m box (the shrine's size), or keep it off walkable areas. |
| M5-T09 | A-03 and A-18 cover manifest models; M5-T09 keeps the kit-GLB `part_*` checks in the same tool. |
| M6-T03 | Superseded by A-06 to A-13. |
| CLAUDE.md "Hero: neutral parkour runner (placeholder mannequin)" | Still holds in spirit: the shipped hero is the grey Character Base mesh, and the capsule-and-box mannequin stays as the fallback. Suggested wording: "neutral parkour runner (vidanta base mesh; mannequin fallback)". |
| CI, tsconfig | Add `pnpm kit:check` after `validate:levels`; add `allowImportingTsExtensions: true`. |
| M2/M3 SimState | Add the read-only fields listed in §3.8. |
| M4-T05 | New static rule from A-21: decor without a collider keeps clear of walkable tops by 0.35 m and of rope-chord capsules. |
