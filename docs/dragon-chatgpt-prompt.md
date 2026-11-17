# ChatGPT dragon prompts for Bhaaag (2026-11-15)

Input: `docs/dragon-prompt-requirements.md`. Conventions follow `docs/sprite-chatgpt-prompt.md`. Mission: `PRODUCT.md`; `docs/lean-scope.md` supersedes other docs.

What these images are for: (1) concept art the owner judges and a coding agent uses as a visual TARGET when tuning the primitive dragon in `src/adapters/render/chase/dragonView.ts`; (2) optionally one small baked texture tile. Nothing here is ever imported as a model or shipped as a picture of the dragon.

Status: nothing was test-generated and nothing was checked against the running game. Every prompt is unverified until one image exists. The palette and styling below are my recommended defaults for decisions the owner has not made (see the last section); the prompts are written so that changing a decision means swapping one block.

## 1. Review of the requirements

Issues that would make concept art useless for tuning:

1. **Palette conflict, must be settled before any image.** The code is gold (`GOLD #d89b34`, `FLAME #f0a43a`, eyes `#ffb02e`). T290d 4.1 and PM Principle 3 say the dragon is danger and must lean terracotta/ember, with saturated yellow-gold forbidden. Art in one palette cannot be a colour target for a build in the other. Default used here: ember (T290d hexes). That makes the colour step a code change to the `dragonView.ts` constants, which the owner must approve.
2. **Cloud colour is a second, unlisted palette conflict.** `CLOUD_TOP #f6efe2` is almost HUD cream `#f3ead6`, and cream-white means "safe" in the colour language. T290d forbids large flat areas of white or HUD cream on the dragon. The cloud flanks are the largest area on screen (envelope 22 m wide against a 7.5 m head). Prompts below tint the cloud peach `#f2dcc8` shading to `#d9906a`.
3. **Camera conflict decides which views are worth generating.** With `frontPov: 0` (camera behind the hero, looking downhill) the dragon is behind the camera for the whole run and is seen only at the catch beat. With the reversed rig the player sees the head from the front, above and behind the hero. So the chase-cam view is only a valid target for the reversed rig, and the catch-beat face and head views are valid under both. Requirements view 5 (rear three-quarter from behind the tail) is valid under neither rig and is dropped. Unverified which rig players get; nobody ran the game.
4. **The owner's dragon idea is not recorded.** The T304 owner brief is not in the repo, the original quote is truncated, `docs/reference/dragon-front-face.jpg` was not viewed, and mood, anatomy and screen share are undefined. The spec in section 2 is therefore reverse-engineered from the code plus the head of the 2026-11-11 sheet. The owner should read and edit the locked spec before any view is generated; that is the cheapest point to correct it.
5. **"Chinese and Nepali" is undefined.** The built head (antlers, whiskers, flame mane, beard) is East-Asian in type. The repo rejects East-Asian styling for architecture and is silent on the dragon. Left alone, ChatGPT will return a Chinese imperial dragon: gold, jade, pearl, four clawed legs, scroll clouds. The prompts steer to a Himalayan reading instead: a legless serpent like a naga, with a carved-timber head in the manner of the makara and dragon heads on Newari toranas and stone water spouts. That keeps every part the code already has. The cultural fit is my proposal, not a documented rule or a checked fact.
6. **The requested views are painterly; the build is Lambert primitives.** Scale rows, rim light, soft glow, outlines and fur cannot be built (no custom shaders, 0 textures, 7 draw calls). A painterly target invites the coding agent to chase detail it cannot reach. Section 4 adds a primitive-friendly variant, and section 7 makes that variant the tuning target and the painterly set mood only.
7. **Proportions are given in metres only.** An image model cannot use metres. The spec restates them as ratios (body about 7 head-heights long, cloud envelope about 3 head-widths wide at the neck, core serpent about as thick as the head). Without these the art comes back with a thin Chinese-scroll body and the comparison fails on the first step.
8. **Canvas sizes are not stated.** ChatGPT gives 1024x1024, 1536x1024 and 1024x1536 only. The full-body side view is about 4:1, so it will sit small in a 3:2 canvas; that is accepted.
9. **"Transparent background" should not be requested** (sprite doc review item 8). These are references, so a flat neutral grey is enough and no keying is needed.
10. **"Grayscale value read at 64 px" cannot be generated.** Generate at full size and downscale by hand. The same goes for hex accuracy: the locked spec holds the hexes, the image only approximates them.
11. **Light direction is unverified.** Requirements s4.9 gives "upper left" from T290d and "same azimuth as the descent" from the graphics spec, which may disagree under the reversed camera. Prompts use upper left; mirror the image if the game differs.
12. **Do not attach the 2026-11-11 sheet as a reference.** It teaches gradient backgrounds, gold glow and floating islands. Use the first approved image from this batch.
13. **Texture section omits one practical fact.** A map on a Lambert material multiplies the vertex colours, so a tile must be light and near-neutral or it darkens and shifts the dragon. Section 5 asks for that.
14. **Licence.** ChatGPT output terms are not recorded in the repo (the licensing note was written for FLUX). Only matters if the texture tile ships.

Consistent and kept: one subject per image, no text or frame, head turnaround preferred over full-body turnaround, sizes and pose from the code.

## 2. Design brief prompt (run FIRST, text only)

Paste as the first message of a new chat. It returns a text block called DRAGON SPEC. Read it, edit anything the owner disagrees with, and keep the edited text: it is pasted into every later prompt.

```text
You are the art director for a stylised low-poly web game. Lock ONE dragon design and return it as a short reusable text spec. Reply with text only in this message; make no image yet.

GAME CONTEXT: a third-person runner on a Newari hillside in the Kathmandu valley at sunset. The dragon chases the hero down the slope. It is the danger of the game and must read as a threat at phone size.

HOW IT WILL BE BUILT: from simple 3D primitives with flat colours and plain diffuse lighting. Every part of your design must be one of these shapes:
- body: one long tapered tube with an oval cross-section, wider than tall
- belly: plain bands across the underside of the tube, about 18 along the body
- cloud flanks: clusters of plain spheres hugging both sides and the underside of the body
- back ridge: one row of simple cones shaped like flames
- head: a few smooth ellipsoids (cranium, jowls, brows, snout, nose pad)
- lower jaw: one hinged wedge with a tongue, two upturned tusks
- fangs: cones
- antlers: two, each a tapered cone beam sweeping up and back with two short cone tines
- whiskers: two long thin curling tubes from the upper lip
- mane: about 20 flame-shaped cones fanned around the back of the skull
- beard: three cones under the chin
- eyes: two glowing oval orbs with a dark slit pupil
- tail: the tube tapers to a point and ends in a tuft of 7 flame cones
The design has no legs, no wings, no fur, no feathers, no individually modelled scales and no fine surface detail.

FIXED PROPORTIONS:
- head with antlers is slightly taller than wide (about 7 wide by 8 tall)
- body length is about 7 head-heights
- at the neck the serpent core is about as thick as the head; with its cloud flanks the body is about 3 head-widths wide and 2 head-widths tall
- the body tapers evenly to about one third of that at the tail
- a human is about one fifth of the head's height

STYLING: a Himalayan serpent dragon. The long legless body is like a naga. The head is like the carved timber and stone dragon and makara heads on Newari temple gateways and water spouts in Kathmandu: heavy brows, broad snout, bold simple shapes. Mood: menacing and angry, a predator, not cute and not majestic. It is partly cloud: the solid serpent rides inside a bank of sunset cloud.

PALETTE, warm ember and terracotta only. Use exactly these hex colours and give each one a job:
- #f2dcc8 pale peach: top of the cloud puffs, highlights
- #d9906a terracotta: body flanks, head, underside of the cloud puffs
- #a5462a burnt red: back of the body, brows, base of the flames
- #5e2416 deep red-brown: deepest shadow, pupils
- #ff6a2a ember orange: eyes, flame tips, mane, beard, tail tuft
- #e9c4a0 light clay: belly bands, nose pad, whiskers
- #e8d2b0 bone: fangs, tusks, antlers (small areas only)
- #3e0c08 dark red: inside of the mouth; #a3302a tongue
In every colour, red is the strongest channel. The design contains no yellow-gold, no green, no blue, no purple, no pure white and no black.

Return exactly this, under 220 words, as plain text in a code block:

DRAGON SPEC v1
1. One-line identity
2. Silhouette rules (3 bullets: what makes the head readable as a black shape, what makes the body readable, what must never be added)
3. Head (one line per part: shape, size relative to the head, colour hex)
4. Body, cloud flanks, back ridge, tail (one line each with colour hex)
5. Counts (antler tines, fangs, mane cones, back-ridge cones, belly bands, cloud puffs visible per side)
6. Palette (the hex list with jobs, unchanged)
7. Never (one line)

Keep every proportion, shape and hex given above. Decide only what is left open: exact part sizes, the curve of the antlers and whiskers, the brow angle, how the mane fans, the spacing of the back ridge.
```

Owner check before continuing: read the spec against decisions 1 to 3 at the end of this file. If the gold palette is chosen instead, replace the PALETTE block with the code's hexes (`#d89b34` flanks and head, `#9c5f1a` back and brows, `#f2dcaa` belly, `#f1e3bd` fangs, `#e2c588` antlers, `#f0a43a` flames, `#ffb02e` eyes, `#f6efe2` to `#e4a85a` cloud, `#3e0c08` mouth, `#a3302a` tongue) and delete the "no yellow-gold" wording here and in sections 3 to 6.

## 3. Master view prompt

Same chat as the design brief. Fill the slots in braces. Generate view 3.1 first and get it approved; from then on every prompt keeps the REFERENCE line.

```text
Create one concept art image of the game's dragon: {VIEW_NAME}.

CANVAS: {CANVAS: 1024x1024 square | 1536x1024 landscape | 1024x1536 portrait}.

DESIGN, follow this locked spec exactly:
{PASTE DRAGON SPEC v1 HERE}

REFERENCE: {REFERENCE: for the first image write "none, this image sets the design". Afterwards write "match the attached approved image exactly in design, part counts, proportions and colours; only the camera and pose change"}.

CAMERA: {CAMERA}.
POSE: {POSE: default "hovering, head pitched slightly down toward the viewer's position, mouth a little open showing fangs and tongue, body in a gentle S-curve"}.
FRAMING: {FRAMING}.

BACKGROUND: {BACKGROUND: default "one flat, even, neutral mid grey, hex #6b6b6b, the same in every corner, with no gradient, no vignette and no floor shadow"}.

STYLE: stylised game concept art with simple, bold, readable forms. Every part is a clean geometric volume: tube body, sphere cloud puffs, cone flames, ellipsoid head parts, cone antlers. Surfaces are smooth and plain with soft painted shading. Lit by a low warm sun from the upper left. Clean and sharp, with neutral colour balance.

PALETTE: only the hex colours in the spec. Red is the strongest channel in every colour on the dragon. The dragon is ember, terracotta and peach.

The image shows exactly one dragon, complete as described, with the same parts and counts as the spec. It is a single plain image, unframed and unlabelled.

Before finishing, check: does every part match the spec, are there exactly two antlers and two whiskers, is the body legless and wingless, and are all dragon colours warm ember and terracotta? If not, redo it.
```

Notes for the person pasting:

- Save every PNG unchanged under `art/` (gitignored) with the view name and the prompt used. These files stay out of `public/`.
- The spec's hexes are the truth. Sample colours from an image only to see how far it drifted.
- If the light direction turns out wrong for the game, mirror the image; do not regenerate.

### Per-view fill-ins

Replace the slots with these values. Order is the recommended generation order.

#### 3.1 Head three-quarter (generate first; becomes the reference)

```text
VIEW_NAME: head, three-quarter view
CANVAS: 1024x1024 square
CAMERA: three-quarter front view from the dragon's left, camera slightly above the snout looking a little down, moderate lens with no wide-angle distortion
POSE: head and the first short stretch of neck only, mouth a little open
FRAMING: the head with both antlers, both whiskers, mane and beard fully inside the canvas, filling about 75 percent of it, with clear background on every side
```

#### 3.2 Head front

```text
VIEW_NAME: head, straight front view
CANVAS: 1024x1024 square
CAMERA: straight on from the front at the height of the eyes, flat and symmetric, no perspective distortion
POSE: head only, facing the viewer, mouth a little open, perfectly left-right symmetric
FRAMING: head with antlers fills about 75 percent of the canvas height; whisker ends, mane and beard fully inside the canvas
```

#### 3.3 Side profile, jaw open

Run twice: once as written, once with POSE "mouth wide open in a roar, lower jaw dropped about 30 degrees".

```text
VIEW_NAME: head, side profile, jaw open
CANVAS: 1024x1024 square
CAMERA: exact side view from the dragon's left, orthographic feel, no perspective
POSE: head and a short stretch of neck, facing left, lower jaw open about 17 degrees so the hinge, tongue, fangs and lower tusks are all visible
FRAMING: head with antlers sweeping back and the beard fills about 75 percent of the canvas width, clear background on every side
```

#### 3.4 Full-body side

```text
VIEW_NAME: full body, side profile
CANVAS: 1536x1024 landscape
CAMERA: exact side view from the dragon's left, orthographic, the whole dragon at one scale
POSE: head on the left facing left, body stretched out to the right in one shallow wave, tail tuft at the far right
FRAMING: the whole dragon from snout to tail tuft spans about 90 percent of the canvas width, centred vertically. Show clearly: the even taper from neck to tail, the row of belly bands, the row of flame cones along the back, the sphere cloud puffs along the flank and underside, the tail tuft. Add one small plain human figure standing under the head, one fifth of the head's height, in flat dark grey, as a scale marker.
```

#### 3.5 Chase camera (portrait first; valid for the reversed camera only)

Run again with `CANVAS: 1536x1024 landscape` and the same text.

```text
VIEW_NAME: chase camera view
CANVAS: 1024x1536 portrait
CAMERA: a low camera at chest height, standing on a steep grassy 20-degree hillside and looking back up the slope, tilted slightly upward, 60-degree field of view
POSE: the dragon flies down the slope toward the camera, hovering a few metres above the ground. Its head is nearest, about 20 metres away, pitched down toward the runner, mouth a little open. The body trails away up the slope behind the head in a wide S-curve, getting smaller with distance, with the tail tuft at the top of the image.
FRAMING: a small human runner in the lower centre, seen from the front, running toward the camera, about one eighth of the canvas height. The dragon's head is directly above and behind the runner and is about one third of the canvas width. The cloud flanks spread wide on both sides of the body.
BACKGROUND: a simple hazy sunset hillside in muted olive and haze tones with a pale sky, very plain, with a few simple brick houses with red tiled roofs far off to the sides. The background stays quiet and low in contrast so the dragon is the clear subject.
```

#### 3.6 Catch-beat face (valid for both cameras; the most-seen angle)

```text
VIEW_NAME: catch moment, face filling the screen
CANVAS: 1024x1536 portrait
CAMERA: straight on from the front, very close, as if the head is about to swallow the camera
POSE: head lunging at the viewer, mouth wide open in a roar, brows furious, eyes glowing, mane and beard flared outward, antlers sweeping up
FRAMING: the face fills about 90 percent of the canvas height and is centred. Antler tips may reach the top edge. Banks of peach sunset cloud made of round puffs close in from the left and right edges and the bottom, covering the neck and body completely.
BACKGROUND: flat warm haze, hex #d8c59a, visible only in small gaps between the cloud puffs
```

#### 3.7 Colour and value key

```text
VIEW_NAME: colour and value key
CANVAS: 1536x1024 landscape
CAMERA: straight front view of the head, flat and symmetric
POSE: head only, mouth a little open
FRAMING: three things in one row with clear grey background between them. Left: the head in full colour. Centre: the identical head in pure greyscale, same size. Right: one vertical column of nine plain square colour swatches, flat and unlabelled, top to bottom in the order of the palette list in the spec.
```

This is the one image with more than one subject. Read the value steps from the greyscale head: eyes and flame tips brightest, mouth interior darkest, head clearly separated from the cloud behind it.

#### 3.8 Phone-size silhouette

Run twice: once as written, once with POSE and CAMERA taken from 3.5 (whole dragon coming down the slope, no runner, no scenery).

```text
VIEW_NAME: silhouette test
CANVAS: 1024x1024 square
CAMERA: straight front view of the head
POSE: head only, mouth a little open
FRAMING: head with antlers, whiskers, mane and beard fills about 75 percent of the canvas
BACKGROUND: flat pure white
STYLE OVERRIDE: draw the dragon as one solid flat black shape with a crisp edge and no interior detail at all, like a paper cut-out. Ignore the palette for this image.
```

Processing: downscale to 64 px tall and view at actual size on a phone. Antlers, mane spikes and whiskers must still separate from the skull; if they merge, thicken them in the spec and regenerate 3.1.

## 4. Primitive-friendly simplification variant

Shows what the code can actually build. Use it for 3.1, 3.4, 3.5 and 3.6 after the painterly versions are approved. In the master prompt, replace the whole STYLE paragraph with this block and keep the REFERENCE line pointing at the approved painterly image.

```text
STYLE: a flat-shaded low-poly 3D model of the same dragon, rendered plainly. It is assembled from a small kit of basic solids and each solid is clearly visible as its own shape: one faceted tapered tube for the body, plain spheres for the cloud puffs, plain cones for every flame, antler, fang and tusk, smooth ellipsoids for the head parts, a wedge for the lower jaw, thin tubes for the whiskers. Each solid has one flat colour from the spec, shaded only by simple soft diffuse light from a low warm sun at the upper left. The belly bands are flat stripes of alternating light clay, slightly lighter and slightly darker. Surfaces are completely plain and matte. The eyes are flat bright ember orange ovals with a dark slit.

Use few shapes: the whole head is built from under 25 solids, the back ridge has 12 to 18 cones, the mane has 16 to 24 cones in two layers, each side of the body shows 15 to 30 cloud spheres, the tail tuft has 7 cones. The edges of shapes are clean and hard where they meet. The look is a simple mobile game model seen in an editor viewport.
```

If a result still shows scales, painted rim light or glow, send: "Simpler. Each part one flat matte colour, plain geometric solids only, fewer shapes."

## 5. Optional seamless texture tile (NEEDS OWNER APPROVAL)

Default: do not make this. It needs owner approval for a new texture file (`PRODUCT.md`), UVs added to the body tube in `dragonView.ts` (it has none today), an entry in `TEXTURE_MANIFEST` with tiers, and it ends the "0 textures" property of the dragon. Low has about 48 KB of headroom; recommended tiers if approved are Medium and High, with Low staying on flat vertex colours.

The tile is light and near-neutral on purpose: the map multiplies the vertex colours, so the palette stays in code and a pale tile does not darken the dragon. New chat, no spec pasted.

```text
Create one seamless tileable game texture: dragon body scales.

CANVAS: 1024x1024 square.

SUBJECT: a flat pattern of large, overlapping, rounded scales in regular staggered rows, like roof tiles seen from directly above. About 6 scales across the width and 6 rows down the height, all the same size. Each scale is a simple rounded shape with a slightly darker edge at its base and a slightly lighter centre. Between some scales a thin warm line suggests a faint ember glow underneath.

VIEW: exactly top-down and flat, orthographic, filling the entire canvas edge to edge.

TILING: the pattern repeats perfectly. Scales cut by the left edge continue exactly at the right edge, and scales cut by the top edge continue exactly at the bottom edge, so copies of the image placed side by side show no seam.

LIGHT: completely even and flat across the whole image, the same brightness in every corner, as if scanned.

PALETTE: warm only. Very light warm grey to pale peach, between hex #c9b8a8 and #f2e6da, with the thin ember lines no stronger than #d9906a. Red is the strongest channel in every pixel. Low contrast overall. The image contains no gold, no yellow, no green, no blue and no dark areas.

The image is only the pattern: plain, unlabelled, unframed, with no objects, no border and no lettering.

Before finishing, check: does the pattern fill the canvas, would it tile on all four edges, and is the lighting even? If not, redo it.
```

Processing: ChatGPT does not guarantee seamless output. Offset the image by half in both axes and inspect the cross seam; if it shows, mirror-tile or regenerate. Downscale to 256x256 with Lanczos, save as JPEG, target under 15 KB. Check it tinted by each body vertex colour before wiring. Record model and licence terms in the repo notes before it ships.

## 6. Fix-up message for drift

Attach the approved 3.1 image and send:

```text
Redo the same view. Use the attached approved image as the exact reference for the design: same head shapes, two antlers with two tines each, two whiskers, same mane, beard and part counts, same proportions; only the camera and pose differ.
Colours: use only the hex palette in the spec. Make every dragon colour ember, terracotta or peach with red as the strongest channel, and replace any gold, yellow, green or blue on the dragon with the nearest spec colour.
Keep the body legless and wingless, the background as specified, and the image single, plain and unlabelled.
```

## 7. How the coding agent should use the images

- **Never import.** No image, crop or trace enters `public/` or the bundle (the texture tile in section 5 is the only exception, and only after owner approval). The images are read, not loaded.
- **Target is the section 4 set.** The painterly set is mood and owner sign-off only. Do not try to reproduce scales, rim light, glow or outlines.
- **Compare like with like.** Take a game screenshot with the same camera as the image: debug side view against 3.4, reversed chase camera at a gap of about 20 m against 3.5, catch beat against 3.6, head close-ups against 3.1 to 3.3. Use the same aspect ratio. Screenshots are a cheaper seat's job, not a premium seat's.
- **Tune in this order, one pass each:** (1) silhouette and proportions (head against body, taper, antler and mane size, cloud width) using 3.8 as a black-shape check; (2) part counts and spacing within the tier budgets; (3) values, checked in greyscale against 3.7; (4) hues, last.
- **Stay inside the build rules.** Change constants in `dragonView.ts` only: sizes, counts, colours, emissive. Keep 7 draw calls per tier, the per-tier counts in `DRAGON_TIERS`, stock Lambert, no shaders. The sim is not touched.
- **Colour changes are gated.** Moving the code from gold to the ember hexes is decision 1 below; do not change the palette constants until the owner has chosen.
- **Stop rule.** When the silhouette and value read match at phone size, stop. A remaining difference in surface detail is expected and is not a defect.

## Decisions the owner must make

1. **Palette: ember/terracotta or gold.** Default: ember (the T290d hexes in section 2), because the dragon is danger and gold means interactive. Consequence: the `dragonView.ts` colour constants change. Choosing gold keeps the code as is and needs the palette swap described under section 2.
2. **Body: cloud-bodied or solid serpent.** Default: both, as built: a solid serpent core inside peach-tinted cloud flanks, with the cloud moved off cream-white. Pure cloud loses the readable body; pure serpent loses the owner's "cloud dragon".
3. **Anatomy and styling: legs, wings, head type.** Default: no legs, no wings, keep the antlered whiskered head already built, described as a Himalayan naga-bodied dragon with a Newari carved head rather than a Chinese imperial dragon. Legs or wings would be new geometry and draw calls.
4. **Which camera the dragon is tuned for.** Default: tune for the catch-beat face and the head views (valid under both rigs) and generate the chase-cam view 3.5 only if the reversed camera (`frontPov` 1) is what ships. Needs one look at the running game to confirm which rig players get.
5. **Texture tile.** Default: no. Keep 0 textures and flat vertex colours; revisit only if the tuned primitive dragon still reads as bare on Medium and High.
