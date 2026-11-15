# Game graphics for the Bhaaag director: a beginner syllabus

## How to use this

- Twelve short modules. Do them in order: each one uses words from the one before.
- One module is about 30 minutes: read the summary, go through one or two links from
  `docs/learning/graphics-resources.md`, then do the 10-minute exercise.
- Every new word gets a plain one-line meaning the first time it appears.
- The exercises use real things in this repo: the house kit, the texture tiles in
  `public/assets/textures/`, the quality tiers. To see the tiers, run `pnpm dev` and add
  `?gfx=low`, `?gfx=medium` or `?gfx=high` to the address.
- Each self-check has its answer folded underneath. Try first, then peek.
- You do not need to code anything. The goal is to make good decisions, not to build.

---

## 1. What a game picture is

**ELI5:** A game is a flipbook: the computer paints a new picture about 60 times every second,
and each picture is a photo of a tiny paper-model village taken by a camera that follows the hero.

You will be able to:
- Say what a **frame** is (one painted picture) and why 60 per second matters.
- Name the three things every three.js picture needs: a **scene** (the model village), a
  **camera** (where you look from) and a **renderer** (the painter).
- Explain the **frame budget**: at 60 frames per second each picture must be painted in about 16 ms.
- Say why a slow picture feels like a stutter, not just "lower quality".

**Exercise (10 min):** Play Classic L1 in the dev build. While sliding, notice the camera behind the
hero. Then read the first table in `docs/graphics-spec.md` ("Implemented tiers"). Circle every
word you do not know yet; you will meet each one in a later module.

**Self-check:** If each picture takes 33 ms to paint, how many pictures per second do you get?
<details><summary>Answer</summary>About 30. The game feels half as smooth as at 60.</details>

## 2. Shapes: polygons, triangles and meshes

**ELI5:** Every object in the game is folded from flat paper triangles, like a paper lantern;
more triangles make rounder shapes but take the painter longer.

You will be able to:
- Say what a **polygon** is (a flat shape with straight edges; games use triangles) and a
  **mesh** (one object made of many triangles).
- Explain why a box house costs 12 triangles and a carved window can cost hundreds.
- Say what a **draw call** is (one "please paint this" trip from the program to the graphics
  chip) and why many small trips are slow, like going to the market once per onion.
- Read the Bhaaag caps: Low 55 calls / 60k triangles, Medium 70 / 110k, High 85 / 170k (ADR 0009).

**Exercise (10 min):** Open `src/content/house/houseSpec.ts` and read only the comments. List the
parts of one kit v2 house (plinth, storeys, parapet, balcony, stairs, awning). For each, guess
"few triangles" or "many triangles". Then read why 100 houses needed "house dressing off" in
`docs/lean-scope.md` (Amendment 2026-11-10b).

**Self-check:** Is 100 identical houses painted in 1 trip better or worse than 100 trips?
<details><summary>Answer</summary>Better. Copying one shape many times in one trip ("instancing") is how Bhaaag fits a whole village.</details>

## 3. Colour without pictures: flat colour

**ELI5:** The cheapest way to colour a shape is to dip the whole clay pot in one paint; no
picture is needed, so it costs nothing to download.

You will be able to:
- Say what **flat colour** is (one colour per surface) and **vertex colour** (a colour stored at
  each triangle corner, blended in between, like dyed cloth fading from one shade to the next).
- Explain why flat colour is 0 KB of download and still looks good in a stylised game.
- Explain how small colour changes between houses ("colour jitter") make a village feel lived in.
- Connect colour to gameplay: gold = interactive, cream = safe, terracotta = danger.

**Exercise (10 min):** Read "Palette direction (kit)" in `docs/art-style-guide.md`. Paste the hex
codes (for example `#b5441c`) into any online colour picker and look at them side by side. Ask
yourself: does any house colour fight with the gold, cream or terracotta signal colours?

**Self-check:** Kit v2 houses use stock Lambert with no new textures. How many KB do their wall
colours add to the download?
<details><summary>Answer</summary>Zero. Colours are a few numbers in the code, not image files.</details>

## 4. Textures: pictures wrapped on shapes

**ELI5:** A texture is a printed cloth (like dhaka fabric) stretched over the paper shape, so a
plain box suddenly looks like brick or clay tile.

You will be able to:
- Say what a **texture** is (an image painted onto a surface) and a **pixel** (one dot of it).
- Say what **resolution** means (how many dots wide and tall; Bhaaag tiles are 256 x 256).
- Explain a **tiling** or **seamless** texture: a small patch that repeats without visible joins,
  like a block-printed pattern.
- Spot the classic problem: a repeating tile that looks like wallpaper from far away.

**Exercise (10 min):** Open `public/assets/textures/`. Look at `roof_tile.jpg`, `wall_brick.jpg`
and `wall_plaster.jpg` in an image viewer. Then compare them with the clay-tile close-ups
(IMG_1662, IMG_1661) listed in section 2 of `docs/handoff/home-assets-handoff.md`. What did the
small tile keep from the photo, and what did it throw away?

**Self-check:** Why is a 256 x 256 seamless tile better than one big photo of a whole wall?
<details><summary>Answer</summary>It is tiny to download and repeats over every wall. A whole-wall photo is large and fits only one wall.</details>

## 5. What a texture costs: download size and memory

**ELI5:** A texture is like dried rice: small in the bag (the download), but it swells up once
cooked (unpacked in the graphics chip's memory).

You will be able to:
- Tell **KB** (1,000 bytes) from **KiB** (1,024 bytes); the difference is small (about 2 %), but
  budgets should say which one.
- Explain **compression**: JPEG squeezes a picture to download faster (Bhaaag's 256 x 256 tiles
  are 2 to 19 KB each, about 137 KB for all 12 files).
- Explain that the chip unpacks each 256 x 256 tile to about 256 KiB (a third more with
  **mipmaps**, the smaller copies used for far-away surfaces), no matter how small the JPEG was.
- Weigh a budget: what 300 KiB versus 600 KiB of textures would buy, in tiles and in load time.

**Exercise (10 min):** In `public/assets/textures/`, list each file's size (your file manager shows
it). Add them up. Now answer: at about 15 KB per new tile (colour + normal map is about 2 files),
how many new materials fit under 300 KiB? Under 600 KiB? Write the two numbers down; you will use
them in the brief.

**Self-check:** Two JPEGs are both 256 x 256. One is 4 KB, one is 19 KB. Which uses more memory
on the graphics chip?
<details><summary>Answer</summary>Neither: both unpack to the same size. File size affects download time; resolution affects memory.</details>

## 6. Materials: how a surface treats light

**ELI5:** A material is a recipe that says how a surface reacts to light: matte like a mud wall,
shiny like new tin, or glowing like a butter lamp.

You will be able to:
- Say what a **material** is (colour + texture + rules for light) and name the three stock
  ones Bhaaag uses: **Basic** (ignores light, used for sky and UI marks), **Lambert** (matte,
  cheap, most houses) and **Standard** (more realistic shine, costs more).
- Say what a **normal map** is (a special image that fakes small bumps, like embossed paper,
  without adding triangles); every Bhaaag tile has one (the `_n` files).
- Explain **emissive** (a surface that glows on its own, used for anchors).
- Explain the lock "stock materials only, no hand-written shaders" (a **shader** is the small
  program that paints each dot) and list what you can still change: colour, texture, roughness,
  emissive, fog on/off.

**Exercise (10 min):** Open any `MeshLambertMaterial` line in `src/adapters/render/` (search for
it). Read only the words in the braces, such as `color`, `map`, `fog`. Then, in the game, find
one Basic surface (the sky) and one Lambert surface (a wall). What changes on the wall as the
light changes, and what never changes on the sky?

**Self-check:** You want tin to look shiny. Is that a new shader or a material setting?
<details><summary>Answer</summary>A material setting (a Standard material with lower roughness). No custom shader needed.</details>

## 7. Light

**ELI5:** Game light works like sunlight through a window: one strong light makes the bright
side and the dark side of every wall, and a soft fill keeps the dark side from going black.

You will be able to:
- Name the main light types: **directional** (the sun: parallel rays from far away),
  **hemisphere** (sky-blue from above, ground-brown from below) and **ambient** (flat fill).
- Explain **key light** (the main light) and why Bhaaag sets it 60 to 90 degrees off the slide
  direction: the rooftops show a lit side and a shadow side, so shapes read clearly.
- Explain why more lights cost more work for every surface.
- Say what **fog** does: fades far things toward the sky colour, giving depth and hiding the edge.

**Exercise (10 min):** Run `?gfx=low`, then `?gfx=medium`, standing at the same spot. Compare the
sun's height and the colour of the shadow sides. Then read the "Lighting" column of the tier table
in `docs/graphics-spec.md` and match each difference you saw to a word in that column.

**Self-check:** Why does a roof look flat when the sun is directly behind the camera?
<details><summary>Answer</summary>Every face is lit the same, so there is no bright-side/dark-side contrast to show the shape.</details>

## 8. Shadows

**ELI5:** To draw shadows the game secretly takes a second photo from the sun's position; any
place the sun cannot "see" in that photo is in shadow, so the village is painted almost twice.

You will be able to:
- Say what a **shadow map** is (that secret picture from the sun) and why its resolution
  (Bhaaag: 1024 on Medium, 2048 on High) decides how sharp or blocky shadows look.
- Explain why shadows cost a lot: about one extra draw call per shadow-casting object.
- Explain **soft shadows** (blurred edges, like light through cloth) and the Bhaaag choice to
  let only chosen objects cast (`userData.cast`).
- Explain the cheap fake on every tier: a dark **contact blob** under the hero.

**Exercise (10 min):** Compare `?gfx=low` and `?gfx=high` on the same rooftop. Where do houses
look "glued down" with shadows and "floating" without? Then read the shadow bullets under
"Implemented tiers" in `docs/graphics-spec.md`.

**Self-check:** Why does Low have no shadows but still a blob under the hero?
<details><summary>Answer</summary>Real shadows are expensive for slow phones; the blob is one cheap shape that still shows where the hero will land.</details>

## 9. What makes a scene look like sunset

**ELI5:** Sunset is not just "orange": it is a low sun, long shadows, warm light on one side,
cool blue shade on the other, and dusty air that fades the far hills, like evening in Bhaktapur.

You will be able to:
- List the sunset ingredients: low **sun angle** (Medium/High use about 19 degrees), warm key
  light, cool fill, long shadows, haze, a sky **gradient** (colours blending top to bottom),
  layered hills that get paler with distance, and a **rim light** (a bright edge on silhouettes).
- Say what **tone mapping** is (squeezing very bright and very dark light into what a screen can
  show, like a camera's auto-exposure; Bhaaag uses ACES) and **exposure** (overall brightness).
- Explain why sunset reduces colour range, and why the gold/cream/terracotta signals must still pop.
- Tell mood references (feel only) from building references (shapes to copy).

**Exercise (10 min):** Pick two photos: one of your village references and one golden-hour photo
from anywhere. For each, write the sun direction, the colour of lit walls, the colour of shadows
and how far you can see. Then find `SKY_STOPS` in `src/adapters/render/skyView.ts`: four colours
from the horizon up; paste them into a colour picker. Which ingredient from your list is weakest in the game today?

**Self-check:** Name two sunset ingredients that cost almost nothing to draw.
<details><summary>Answer</summary>Any two of: sky gradient, fog/haze colour, warm light colour, low sun angle. They are settings, not extra objects.</details>

## 10. Post-processing: a filter on the finished picture

**ELI5:** Post-processing is like putting a phone photo filter on each finished frame: the game
paints the picture first, then runs it through extra steps such as glow.

You will be able to:
- Say what **post-processing** is (effects applied to the whole finished picture) and name the
  one Bhaaag uses: **bloom** (a soft glow around very bright things, like sun on tin).
- Explain why each step repaints every pixel on screen, so it is costly on phones.
- Read the Bhaaag rule: three.js built-in passes only, High tier only, and on phones no
  composer at all (ADR 0009).
- Say what **anti-aliasing** (MSAA) does: smooths the jagged stair-step edges on lines.

**Exercise (10 min):** On a desktop, compare `?gfx=medium` and `?gfx=high` at the brightest spot
(sun on a roof, anchors). Write down what glows. Ask: does bloom help the anchors (gold =
interactive) stand out, or does it blur the signal?

**Self-check:** Why is a full-screen effect costlier on a big, sharp phone screen?
<details><summary>Answer</summary>It works once per pixel, and a sharp screen has many more pixels to process every frame.</details>

## 11. Quality tiers and phones

**ELI5:** Quality tiers are the same dal bhat served on three plate sizes: everyone gets the same
meal (the same game and colour signals); bigger plates just get more side dishes.

You will be able to:
- Say what a **quality tier** is (a preset bundle of settings for slower or faster devices) and
  list what Bhaaag adds from Low to Medium to High (shadows, warm low sun, haze, bloom, more
  triangles and draw calls).
- Explain **pixel ratio** (how many real screen dots per game dot; Bhaaag caps it at 1.0 / 1.25 /
  1.5 on phones), often the biggest single cost on phones.
- Explain the **frame-time governor**: if pictures average over 22 ms, the game drops to Low.
- Decide what must look the same on every tier (gameplay signals) and what may differ (mood).

**Exercise (10 min):** Make a three-column table (Low / Medium / High) from the tier table and
"Mobile budgets" in `docs/graphics-spec.md`. Add one row: "What a player on a cheap phone
loses". Is anything in that row something they need to play well? If yes, note it for the brief.

**Self-check:** A new feature only looks good with shadows. Which tiers can it rely on?
<details><summary>Answer</summary>Medium and High only. Low must still play and read well without it.</details>

## 12. References, art direction and the one-page brief

**ELI5:** An art brief is the recipe card you give the cook: what dish, which ingredients, which
not to use, how big the plate is, and a photo of what "done" looks like.

You will be able to:
- Build a **reference sheet**: a few labelled pictures sorted into "copy the shape", "copy the
  material" and "copy the mood", with what to take from each.
- Write **style words** precisely (stylised, not photoreal; warm low sun; dense lived-in village).
- State the hard limits for an artist or an AI: stock three.js materials, no custom shaders, no
  GLB, 256 x 256 seamless tiles, the texture budget, the three-colour language, triangle caps.
- Know what to refuse: textures without a clear free licence, photoreal one-offs that do not
  tile, colours that clash with gold/cream/terracotta, anything that only works on High.

**Exercise (10 min, then about 30 min to write):** Using `docs/art-style-guide.md` "Sorting" as a
model, sort your village photos (section 2 of `docs/handoff/home-assets-handoff.md`) into shape,
material and mood. Then write `docs/learning/my-art-brief.md`, one page: (1) the one-sentence look;
(2) 3 to 6 reference images with what to take; (3) palette and colour-language rules; (4) the
limits above with numbers; (5) per-tier "must keep" and "nice to have"; (6) the texture budget
you choose and why; (7) what you will refuse.

**Self-check:** An AI gives you a beautiful 4096 x 4096 photo of a mud wall. Name two reasons it
is not ready for the game.
<details><summary>Answer</summary>Any two of: far over the tile size and memory budget, not seamless, licence unclear, lighting baked into the photo will fight the game's sun.</details>

---

## Decisions this unlocks

| Open Bhaaag decision | Where it stands | Modules that prepare you |
|---|---|---|
| Texture approval threshold: 300 KiB or 600 KiB (handoff, "Still open after part 3") | Recorder read "double the threshold" as 600 KiB; owner to confirm | 4, 5, 11, 12 |
| Tin and straw tiles (H14): how big, how many, flat colour instead? | Approved in principle; total about 300 KB | 3, 4, 5, 6 |
| KB versus KiB in the written budget | Docs mix "300 KB" and "300 KiB" | 5 |
| Look options: flat colour versus photo tiles, Lambert versus Standard, normal maps on phones | Kit v2 is stock Lambert, no new textures; normal maps off on phones | 3, 4, 6 |
| How strong the sunset is (sun angle, haze, sky, tone mapping) | Medium/High: ~19 degree warm sun, ACES; untuned on a real phone | 7, 9 |
| What each quality tier must keep or may drop | Low/Medium/High table and ADR 0009 caps | 2, 8, 10, 11 |
| Briefing an artist or AI for the new graph level's houses | Reference photos sorted; no brief yet | 9, 12 |
