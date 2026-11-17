# Dragon prompt requirements (input for a ChatGPT image-prompt writer)

Facts only, collected 2026-11-15. Not a prompt. Each fact cites its source. Mission check: `PRODUCT.md` read; `docs/lean-scope.md` supersedes `CLAUDE.md` and `docs/zipline-plan.md` where they conflict. Intended use of the output: (1) concept art as a visual TARGET to tune the primitive build against; (2) optionally one small baked texture tile. ChatGPT output is never imported as a model (no GLB, LS Dropped 4; PM Non-goals).

Source key: DV = `src/adapters/render/chase/dragonView.ts`; DR = `src/core/chase/dragon.ts`; CFG = `src/core/config.ts`; GAME = `src/app/game.ts`; AG = `docs/art-style-guide.md`; GS = `docs/graphics-spec.md`; LS = `docs/lean-scope.md`; PM = `PRODUCT.md`; T290d = `docs/briefs/T290d-flux-dragon-prompts.md`; T290e = `docs/briefs/T290e-ribbon-dragon-spec.md`; T290b = `docs/sessions/T290b-handoff.md`; SPR = `docs/sprite-prompt-requirements.md`; REF = `docs/ChatGPT Image Nov 11, 2026, 05_43_03 PM.png`.

## 1. What the dragon is in the game

**Role.** Dragon Chase is a score-based, endless mode (LS Amendment 2026-11-10). The dragon is a pursuer: it chases along the fall line, ignores x, never slows for the player, no mercy (DR:1-2). Caught = gap <= `catchGap` 2.5 m (CFG chase:314-326; ADR 0010 C2). Speed `min(vMax 13.5, v0 4.4 + 0.045 t)` plus a rubber band above `gapMax` 45; start gap 36 m; fog/cloud cover begins at gap 22 m (CFG:314-326; DR:30-34, 52-56). A caught hero is killed (`deadCause` DEAD_CAUGHT, ADR 0010 C2). The dragon is 3D since T304 (DV:1; `dragonSpriteView.ts` is only an alias). The sim is untouched by its looks: the catch rule is 1-D, so the visual has no hitbox (DV:17-19).

**Size relative to hero.** Hero is a ~1.8 m mannequin (pelvis 0.965 m above soles, `heroPose.ts:104`; capsule radius 0.35, CFG:264). Dragon (DV constants, in metres):
- Head frontal silhouette (skull + antlers): 7.54 m wide x 8.70 m tall (`FRONT_W`, `FRONT_H`, DV:53-54), about 4.8 hero heights. Head group scale grows `1 + prox*0.6 + lunge*0.25` as the gap closes (DV:951).
- Body: 57 m long (48 m sprite chain + 9 m tail tip, DV:57-60), a single tube plus cloud flanks.
- Body envelope (core + cloud flanks + spines) at the neck: 22.1 m wide x 13.7 m tall; at the end of the chain (u = 1): 7.8 m x 4.8 m; width = `1.3 * 20 * (0.85 - 0.55 u)`, height = 0.62 x width (`bodyEnvelope`, DV:132-137). Serpent core is 40% of envelope width and 62% of its height, with a neck pinch and tail taper (DV:61-62, 489-496).
- Size origin: "owner brief T304: width and height x1.3" of the old T290 sprite dragon (DV:15-19, 48-49). The T304 brief text itself is not in the repo; only these code comments cite it.

**How it is seen.**
- Hovers 7 m above the hill line at the head (`HOVER`, DV:56), drops 3 m as the gap closes, bobs +-1.2 m, dips 7 m on the catch lunge (DV:657-661). Hill grade 20 degrees (`GRADE_DEG`, `rows.ts:9`).
- Head weaves +-3 m sideways, drifts after the hero x (0.4 factor); the body follows the head's flown path (breadcrumb trail) with a travelling swim wave on top, lateral 2.2 m, vertical 1.1 m, wavelength ~30 m (DV:11-13, 64-69, 660).
- Body runs uphill (+z), so on screen it extends up and away from the head; head is nearest the camera (T290d s0; DV:56-57).
- Catch beat (game over): head leaves world space, is placed in camera space facing the lens, squashed in depth (0.45), face capped at 90% of visible height; body fades out over the first 40% of the beat (DV:73-75, 1021-1059; `catchPose.ts`). Beat length `CHASE_OVER_DELAY_S` 1.1 s (GAME:118). The head then docks next to the game-over card (`catchPose.ts` s3).
- Camera: third person, `dist` 4.5 m, `fov` 60 (max 75), `height` 1.6 m, pitch -12 deg (CFG:273-287; GAME:352-383).

**CONFLICT, camera direction (unresolved, needs a look at the running game).** Current config default `chase.frontPov: 0` = "camera behind the hero looking downhill" (CFG:145, 334; commit 92f242f, 2026-11-12). With that rig the dragon, which approaches from uphill, is behind the camera for most of a run and is mainly seen at the catch beat (camera "turns back", GAME:118). But DV's own comment (DV:644-645), the call site comment "Reversed chase camera: the real dragon is already in front of the rig" (GAME:960) and T290b ("camera sits downhill in front of the hero looking back up the slope", T290b:47) all assume the reversed rig (`frontPov` 1). I did not run the game, so which view players actually get during play is unverified. Concept views below cover both.

**Parts (all in DV, procedural, build-time geometry merged).**
- Body: one continuous tube of elliptic rings, rewritten every frame, analytic normals (DV:3-5). Ring x radial counts per tier below. Belly plates = cream band every `SEG_LEN` 3.2 m, alternate bands darker (x0.9) (DV:63, 512-516). Segment count visible on the body = 57 / 3.2 = about 18 belly plates, plus a 5% radius bulge per plate (DV:492).
- Cloud flanks: instanced icosahedron puffs (detail 1) riding the spine, sides ~62%, underside ~28%, upper flank ~10% (DV:6, 357, 551-553).
- Dorsal flames: instanced 5-sided cones along the back, tips reach the envelope top, +8% flicker; plus a tail tuft of 7 cones, 5.5 m long (DV:7, 566-590, 896-927).
- Head (merged primitives, DV:248-304): cranium, jowls, angry brow ellipsoids (dark gold), snout, nose pad (cream), nostrils, 2 big fangs per side (ivory), forked antlers (main beam sweeping up and back + 2 tines, bead at the fork), 2 long curling whiskers (tubes, cream), throat/palate (dark red-brown), hinged lower jaw with tongue, chin, 2 upturned lower tusks, and a flame beard (3 cones, 2.6-3.0 m).
- Eyes: two ellipsoid glowing orbs with slit pupils (DV:306-314).
- Flame mane: instanced cones fanned round the back of the skull, not straight down (the beard lives there), 2 layers, 2.4-3.9 m long (DV:600-624).
- No legs, no wings in the current build (not present in DV; the earlier wing was ADR 0010 C6, superseded).
- Tail: the tube tapers to a point (`tip` power 0.7 over the last 9 m) ending in the 7-cone flame tuft (DV:489-491, 580-587).

**Per-tier mesh budgets** (`DRAGON_TIERS`, DV:87-91; "Every tier: 7 draw calls, 0 textures"):

| Tier | body rings x radial | cloud puffs | dorsal spines (+7 tuft) | mane cones | head seg |
|---|---|---|---|---|---|
| low | 30 x 10 | 34 | 12 | 16 | 10 |
| medium | 44 x 14 | 64 | 18 | 24 | 14 |
| high | 60 x 18 | 96 | 24 | 32 | 18 |

Derived (not measured): body tube ~580 / ~1,200 / ~2,100 tris; cloud puffs 80 tris each = ~2.7k / ~5.1k / ~7.7k. Chase as a whole may add at most +6 draw calls and +12k triangles over Classic (`docs/three-track-plan.md` s107; ADR 0010). `tests/adapters/dragonView.test.ts` asserts tri counts rise with tier (lines 77-89).

**Colours in code** (DV:93-104, 336-354; all Lambert unless noted):
- `GOLD #d89b34` (flanks, head), `GOLD_DARK #9c5f1a` (back, brows), `CREAM #f2dcaa` (belly, nose pad, whiskers), `IVORY #f1e3bd` (fangs), `ANTLER #e2c588`, `MOUTH #3e0c08`, `TONGUE #a3302a`, `FLAME #f0a43a` (spines, mane, beard), `EYE #ffb02e`, `PUPIL #2a0800`, `CLOUD_TOP #f6efe2`, `CLOUD_LOW #e4a85a` (cloud puff vertical gradient).
- Emissive: body `#3a2408`, cloud `#4a3a26`, flames `#a8480a`, head `#3a2410`, mane `#b8520c`. Eyes are `MeshBasicMaterial`, vertex colours, `toneMapped: false`, fog off, so they glow past tone mapping (DV:350-354). Head and mane have fog off ("source of the white-out", DV:339).
- Vertex colours: body belly (lower 30% of the ring) cream x band; back gradient `GOLD` to `GOLD_DARK` (DV:513-518).

**What is animated** (all in code, no skeletal animation): trail-following body path; swim wave; body breathing 2% at 1.6 rad/s; cloud puffs pulse in position (4%) and scale (5%); dorsal flame flicker 8%, tuft 10%; mane flicker 10% at 5 rad/s; jaw swings `0.3 + 0.08 sin + 0.25 lunge` rad; head pitch down at the hero; head scale up with proximity; the catch-beat lunge (DV:847-964, 1021-1059). Roar sound plays when gap < 22 m (GAME:970).

## 2. Style rules and where the owner's intent is stated

**Hard rules (apply to concept art as a target).**
- Stylised, not photoreal: "STYLISED but lit like the target (warm directional sun, soft shadows, haze, tone-mapped sunset). Not photoreal." (GS "Look decisions, round 2").
- Strict colour language: gold = interactive, cream-white = safe, terracotta = danger (LS Kept; PM Principle 3). "Nothing decorative may use anchor gold" (SPR s2, from LS Kept / ZP 5.2). Anchor gold `#ffc83a` (`ropePost.ts`, `hud.ts`, per SPR). The dragon is a danger object.
- Dragon palette from T290d 4.1 (written for the old sprite, never applied to the 3D build): highlight `#f2dcc8`, mid `#d9906a`, shadow `#a5462a`, deep `#5e2416`, rim/eyes `#ff6a2a`. Forbidden: saturated yellow-gold near `#ffc83a`; large flat areas of pure white or HUD cream `#f3ead6`; green, blue or purple on the subject (T290d 4.1). T290d 1 point 7: "The glow is saturated gold, close to the anchor gold... The dragon is danger: lean terracotta/ember." Palette rule rationale for green: all palette colours have G <= R so green-key despill is safe (T290d 4.1).
- Cloud and mist stay cream, white or cool grey; no gold glows or orbs in decoration (`docs/briefs/T290c-chase-cloud-village-backdrop.md`, per SPR s2).
- Lighting reference for the world: low warm sun (~19 deg elevation on Medium/High), haze, golden hour; Himalayan snow range backdrop (GS).
- Newari/Kathmandu fit: the product is "Newari-themed Kathmandu hillside at golden hour" (PM Product Purpose). AG/SPR list rejected looks for architecture: "East-Asian curled or jade/teal roofs, torii-like gates, floating islands, off-brief decorative gold" (SPR s2, citing T290c and cloud-village README). Those exclusions are about houses and set dressing; I found no rule that bans a dragon of East-Asian type.

**Which dragon is allowed.** No doc forbids or mandates an East-Asian dragon. What exists:
- Dragon Chase is an allowed mode (PM Non-goals "Modes beyond Classic L1 and Dragon Chase"; LS Amendment 2026-11-10).
- Owner's original idea, quoted from `docs/three-track-plan.md:13-15`: "And one game mode where this cloud dragon ... When dragon catches up it gets cloudy and game over." (truncated in my grep; full text sits at that location). Reference picture was the cloud-dragon sheet (REF, same file family).
- Owner reaction to T290b sprites (phone test): dragon "looks bad af" (`docs/sessions/2026-11-12.md:10`). Owner on the ribbon dragon v2: "looks good for now" (`2026-11-12.md:18`), then superseded by the T304 3D dragon.
- Owner layout request (T290d s0, "binding"): head at the bottom leading toward the hero, neck above, body S-curve up like the Snake game, tail with a plume at the top.
- T290d 4.1 shared style suffix (the only written look brief): "Chinese and Nepali serpentine sky dragon made of dense sunset cloud with clearly readable scales... glowing ember-orange eyes... ember orange rim light". Head spec: "two tall forked antlers sweeping up and back, flame-shaped mane fanning around the head, heavy angry brows, broad snout with flared nostrils, closed snarling mouth showing fangs, two long thin whiskers curling down from the upper lip, pointed beard" (T290d 4.2 head-a).
- Fable brief wording of the original face reference: "forked antlers (two), flame-like mane fanned left/right/top, angry brows, glowing orange eyes, snout with nostrils, open fanged mouth, long curving whiskers" (`docs/sessions/fable-brief-T290-dragon-face.md:16`).
- T304 3D code header: "A golden serpent dragon" and "the 'cloud dragon' of the sprite" (DV:1-2, 6). So the shipped 3D dragon is East-Asian-type (antlers, whiskers, flame mane) and gold, which sits closer to anchor gold than T290d allows (see s6).
- No document mentions a naga, makara or any Newari-specific dragon. A Nepali/Newari fit is only claimed in the one T290d phrase "Chinese and Nepali" (no further definition found).

**Other style rules.**
- Silhouette first, readable at phone size; "Get the silhouette right first" (GS Art direction). "Readable sunlit rooftops" (PM Principle 4).
- Painterly "ui-reference.webp" is the north star for the village look (AG; SPR s2). Not the dragon.
- Style-bible fields the skill expects (style, palette, light direction, perspective, outline, scale, small-size readability, background): `~/.claude/skills/game-asset-production-integration/references/generation.md` (per SPR s1). Not re-verified here.
- Licensing: AI-generated output usable as texture or reference; record model and licence in repo notes before shipping (AG Licensing; written for FLUX, not ChatGPT, so ChatGPT terms are not recorded anywhere).

## 3. Constraints that limit how closely primitives can match concept art

- Stock materials only; no hand-written custom shaders; Low tier has no shadows and no post-processing; shadows/bloom/tone mapping only on Medium/High via three's own passes (CLAUDE.md Locked decisions; GS "Implemented tiers"; LS Budget).
- No GLB, no models from images: "no GLB hero model (procedural primitives and stock materials)" (PM Non-goals; LS Budget).
- Dragon is built from `SphereGeometry`, `CylinderGeometry`, `ConeGeometry`, `TubeGeometry`, `IcosahedronGeometry` plus a rewritten tube (DV:22-41). So: smooth ellipsoid forms, no hand-sculpted detail, no scales as geometry, no feathered fur, no wings.
- Draw calls: exactly 7 per tier, all tiers (DV:86). Shadow casters opt-in via `userData.cast` (GS ADR 0009 summary). Whole-game caps: Low 55 calls / 60k tris, Medium 70 + 14 shadow / 110k, High 85 + 24 shadow / 170k (GS "Mobile budgets").
- Shading is per-vertex colour with Lambert lighting. Fine surface detail (scale rows, painted shading, rim glow, outlines, soft glows) can only come from vertex colours, emissive, or a texture map.
- Glow: eyes unlit and un-tone-mapped; bloom exists only on High on a fine pointer and is turned off during the catch beat (GS Mobile budgets; GAME:1132).
- Textures: runtime cap Low 150 KB, Medium 300 KB, High 600 KB; 0 KB new by default; owner approval required for new texture files (PM Cloud Village amendment and Principle 5; LS Budget; `src/adapters/render/textureManifest.ts:11-16`, enforced by `tests/adapters/textureBudget.test.ts`).
- Headroom (from `ls public/assets/textures`, approximate): the ten tiles loaded on every tier (`ALL` in the manifest: brick, plaster, roof, stone, terracotta, colour + normal) total about 102 KB, which leaves about 48 KB on Low, about 198 KB on Medium (minus `tin.jpg` 2.6, `straw.jpg` 4.1, `horizon.webp` 24.6), about 450 KB on High. A dragon tile must be listed in `TEXTURE_MANIFEST` with its tiers.
- Bundle: JS under ~600 KB gz, initial chunk <= 215 KB gz (PM). Not affected by a texture file.
- Legacy: 148-151 KB of old dragon WebPs sit unreferenced in `public/assets/dragon/` (Opus art review `docs/reviews/art-direction-opus-review.md:31,71`); owner decision to delete or keep is open.

## 4. Concept views that would help tune the build

Requests below are things the coder can compare against the primitive build. Match the in-game camera (fov 60, camera ~4.5 m behind or ahead of the hero at ~1.6 m height, pitch -12 deg, CFG:273-287) and the dragon's own pose (hovering ~7 m up, head pitched down toward the hero, jaw ~0.3 rad open, DV:945-952).

1. Chase-camera view from the hero's side of the dragon (head leading toward the viewer, slightly from above, body trailing uphill and away; the rig DV was written for, T290b:47). Aspect: portrait (primary), plus landscape; both are playable (PM Platform).
2. Head front view, straight on, and three-quarter from the left or right, slightly from above: antlers, brows, snout, fangs, jaw hinge, mane silhouette, whiskers. Head ~8.7 m tall x 7.5 m wide in game.
3. Head side profile with mouth ~0.3 rad open, then fully open (the lunge opens it ~0.55 rad, DV:952).
4. Full-body side profile along the 57 m length showing the thickness taper (22 m envelope at the neck to ~8 m at the tail), belly plate banding, dorsal flame row, cloud flanks, tail tuft. Since the body is a tube plus cloud puffs, a side view tells the coder the vertical thickness ratio (envelope height 0.62 of width).
5. Rear three-quarter / chase view from behind the tail looking at the head (only if the behind-camera conflict in s1 resolves to the head being seen from behind).
6. Catch-beat key frame: face filling the screen, facing the lens, mane and beard, with cloud closing in (GAME:1021-1059; this is the most-seen angle at game over).
7. Colour and value key: a small swatch strip of the palette the owner wants (the build currently uses the hexes in s1; T290d 4.1 hexes are the written target) and a grayscale value read at ~64 px tall (phone-size silhouette read).
8. A turnaround is optional; the dragon's body is a long tube so a head turnaround (front, 3/4, side) is more useful than a full-body turnaround.
9. Lighting: key from the upper left, warm low sun, rim light on edges (T290d 4.1); the game sun is ~19 degrees, same azimuth as the descent per GS Medium.
10. Request a single flat background or a transparent one, since the aim is a reference not an asset; no text, no frame, no multiple subjects per image (SPR s1 for sheet rules; REF shows the generator's default of glowing gradient backgrounds and busy sheets).

## 5. Optional baked texture tile

- Materials that could take a map: `bodyMat` (vertex colours + `emissive #3a2408`), `headMat`, `cloudMat` (instanced, white base, instance colours). `flameMat` and `maneMat` are flat `FLAME` and `eyeMat` is `MeshBasicMaterial`. Setting a `map` on a `MeshLambertMaterial` that also uses `vertexColors` multiplies them, which is how `levelView.ts` already uses maps ("stock `MeshLambertMaterial` with a map and `RepeatWrapping`", AG Steps 5-7).
- UVs today: the merged skull, jaw, eyes geometries (`mergeParts`, DV:205-242) copy only `position`, `normal` and `color` and drop all other attributes, so they have NO `uv`. The body tube (`BufferGeometry` built in `build`, DV:530-534) has no `uv` attribute either. `InstancedMesh` puffs use `IcosahedronGeometry`, which has `uv`, as does `ConeGeometry` for the flames and mane (three's built-in primitives all carry `uv`). So any map on the body, skull or jaw needs UVs added in code first (not done anywhere).
- Body UV is straightforward: u around the ring, v along arc length, since rings are regular (R x M grid, DV:505-533).
- Tile format precedent: 256 px JPEG tiles (about 2-19 KB each) with a `_n.jpg` normal, `RepeatWrapping`, world-space planar UVs one tile per 4 m (AG Steps 5-7; `levelView.ts:68-100`). Alpha content uses WebP q78-82, `LinearFilter`, no mipmaps (SPR s2, T290d 2.1). The T290e body-strip used 256x512 WebP with `wrapT = RepeatWrapping` and mipmaps, estimated 35-60 KB (T290e:44-52) and was dropped when T304 replaced the ribbon.
- Seamless tiling needed: yes for a body tile (repeats along arc length, and around the ring), so request it tileable on at least the length axis; one tile ~256 x 256 px; scale/belly-plate pattern must line up at the seam. A separate cream belly tile is not required since the cream belly is by vertex colour.
- Greyscale-normalised tiles tinted by instance/vertex colour is the repo precedent ("generated crops, grey-normalised, tinted by instance colour", AG Kit pieces), so a neutral grey-ish scale/cloud tile would keep the palette in code.
- Budget: should fit Low's ~48 KB headroom if loaded on all tiers; otherwise list it as `RICH` or `HIGH` in `TEXTURE_MANIFEST` and the dragon falls back to flat vertex colours on Low (precedent: `tin.jpg` RICH, `straw_n.jpg` HIGH).
- Owner approval is required for new texture files (PM). ChatGPT-made tile still needs sRGB/size post-processing (resize to 256, JPEG/WebP); the repo's helper `asset_pipeline.py` needs Pillow, which is not installed for system python (SPR s4 item 6).

## 6. Open questions and conflicts

**Missing: the owner's actual dragon idea.** Nothing in the repo describes the finished look the owner wants for the 3D dragon. Missing facts:
- A reference description or reference image for the 3D dragon. The only images are the old sprite-era sheet (REF) and `docs/reference/dragon-front-face.jpg` (gitignored, local only, per the Fable brief; not viewed here). The T304 "owner brief" text is not saved (only code comments cite it).
- Mood (menacing, majestic, cute, fiery, ghostly cloud).
- Anatomy choices: legs or none, wings or none, horns vs antlers, mane vs beard, scale pattern, body thickness, how "cloud" vs "solid serpent" it should be.
- Scale feel and how much of the screen it should fill in play (I found only the x1.3 over-the-sprite factor).
- Whether the dragon is meant to read as Chinese-style (as REF and T290d show), as a Nepali/Newari creature, or a mixed design ("Chinese and Nepali", T290d 4.1, undefined).

**Conflicts between docs and code.**
1. Palette: code is gold (`GOLD #d89b34`, `FLAME #f0a43a`, eyes `#ffb02e`, `CLOUD_LOW #e4a85a`) and the header says "golden serpent dragon" (DV:1). T290d 4.1 and PM Principle 3 say danger = terracotta, forbid saturated yellow-gold near `#ffc83a`. The code values are desaturated and darker than `#ffc83a`, but the reds in T290d (`#a5462a`, `#5e2416`, `#ff6a2a`) are not used. The Opus review also flags "golden ridge near interactive-gold" (`docs/sessions/2026-11-12.md:19`).
2. Camera: see s1 (frontPov 0 vs "reversed" comments).
3. Size: DV says body envelope is the sprite chain x1.3; T290d s0 says the head is "pinned 14 m ahead" of the camera (`HEAD_AHEAD`), but DV pin mode is not used (GAME:960).
4. Budget wording: DV says "0 textures", while T290d/T290e planned image-based dragon sets (148 KiB owner-accepted overage on 2026-11-12, `2026-11-12.md:5`). That set is no longer loaded; the 2026-11-15 per-tier cap supersedes the old 300 KiB threshold.
5. East-Asian look: allowed by omission for the dragon but flagged as rejected for architecture (SPR s2); the repo's own sprite-sheet requirement notes call the REF sheet's East-Asian dragon/gold glow "out" for the village (SPR s4 item 2). Whether that exclusion extends to the Chase dragon is not decided anywhere.
6. Graphics budgets: T304 tri/draw numbers (7 calls, tri counts) are not recorded in any doc; only the test file bounds them. I did not run the tests (no gates).

**Is the reference PNG relevant?** Viewed `docs/ChatGPT Image Nov 11, 2026, 05_43_03 PM.png` (3.2 MB, portrait ~2:3, untracked in git). It is the owner's earlier ChatGPT concept sheet for the Dragon Chase sprites and the Cloud Village platforms:
- Top half: four painterly "cloud dragons" on a dark amber glowing gradient. Two have a frontal East-Asian dragon head (tall branching antlers, spiky flame-like mane in gold and cream, angry brows, glowing orange eyes, open fanged mouth with dark red interior, two long thin whiskers curling out from the lip, small pointed beard) flanked on left and right by fluffy white cloud bodies with curling wispy tails and ember-orange glowing wisps. Two more are headless cloud banks.
- Bottom half: about nine floating grassy stone platforms with brown earth undersides and a small rock-and-grass cluster, plus two more cloud banks, on an olive-green gradient.
- Look: ink-outlined painterly 2.5D, warm cream/white clouds, gold-ember rim glow.
- Relevance: it is the best written-down visual statement of what the owner meant by "cloud dragon" (head design and ember cloud body), and the 3D build's head features (antlers, whiskers, mane, beard, fangs, eyes) copy that head. But (a) the head is a flat frontal crop, no 3D views; (b) the body is cloud, not a serpent tube; (c) the platforms are the rejected floating-island concept; (d) its glowing gradient backgrounds and gold glow are what the repo rejects for decoration. Treat as mood and head-design reference only (`docs/asset-handoffs/cloud-village/README.md`: "Do not extract, crop or ship"; per SPR s3).

**Decisions the owner must make before prompts are written** (so the prompt writer does not guess): keep the Chinese-style antlered head or change it; gold vs ember/terracotta palette; cloud-body vs scaled serpent body; legs/wings yes or no; whether concept art is also wanted for the catch-beat face; whether a texture tile is wanted at all and on which tiers; whether to delete the 148 KB unused dragon WebPs.
