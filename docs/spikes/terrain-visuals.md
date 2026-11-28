# Ride terrain: the complete current look, and how to reshape it

Owner ask (2026-11-28): "I need the exact terrain visuals totality that is being used right now and if we
can morph it to be the way i want." This file lists every number and colour the ride terrain uses on the
parked spike (`origin/claude/bhaaag-hero-spikes-0a5eiv`, commit `1968cde`). Every value below comes from
the code, with its file named.

## 1. Shape (the height field)

**Generator:** THREE.Terrain (three.terrain.js 3.1.1), using its `PerlinDiamond` noise. See `src/spikes/trailGen.ts`.

**Grid** (`gridFor`, `src/spikes/trail.ts`):
- One height every 3 m across (x) and every 4 m along the ride (z).
- 80 columns, so the world is 240 m wide (x from −120 to +120).
- The grid starts 100 m behind the start line and ends 200 m past the camp.
- The sim and the renderer read the same height array, so what you see is what you ride on.

| | Horse spike | Bike spike |
|---|---|---|
| Noise seed (fixed, the same every run) | 1907 | 2207 |
| Ride length / camp at | 900 m | 1600 m |
| Hill height range | −4 to +30 m | −4 to +36 m |
| Trail wiggle (sum of two sine waves, metres of sideways swing) | 30 m × 1.5 cycles + 12 m × 4 cycles | 40 m × 2 cycles + 16 m × 6 cycles |
| Flat dirt band, half width | 3.5 m | 4 m |
| Blend from band into the hills | 16 m | 18 m |
| Steepest slope along the trail | 16 % | 18 % |
| River crossing (ford) at | 520 m | 980 m |
| Ford half width / valley depth / valley width | 7 / 6 / 55 m | 8 / 8 / 70 m |

**Carve steps** (`carveTrail`, `src/spikes/trail.ts`):

1. **Trail profile.** Read the noise height under the trail centre. Average it over ±40 m, twice, which
   gives the rolling up and down.
2. **Ford.** The trail dips into the river valley.
   - The water surface sits `valleyDepth` below the trail height at the ford.
   - The trail bed sits 0.45 m under the water.
   - Off the trail, the river channel is 1.8 m deep, which is a fall.
   - The river line wiggles ±6 m: `z = ford.z + 6·sin(0.05·x)`.
3. **Camp and slope cap.**
   - The trail is held level for its last 10 m into the camp.
   - The slope is then capped both ways at `maxGrade`.
4. **Every point on the grid:**
   - Start from the noise hills, with the river valley cut through them.
   - Blend those into the flat band with a smoothstep, from `band` to `band + blend` metres off the centre.
   - Add a flat camp disc: 35 m radius, blending out over the next 20 m.
5. **Trail straightness.** The trail runs straight for the first and last 80 m of the ride (the sine waves
   fade in and out there).

## 2. Ground colour (`src/spikes/play/terrainMesh.ts`)

Each grid point gets one colour, and the colours blend smoothly between points. No textures. The rules
are applied in this order; each one paints over the one before:

| Layer | Hex | Rule |
|---|---|---|
| Grass | `#7d8a45` | the base colour |
| Dry grass | `#9a9450` | mixed into the grass by a sine pattern `sin(0.37x + 0.11z)·sin(0.23z − 0.07x)`, and more of it the higher the ground is above the water (+1 % per metre) |
| Rock | `#878279` | where the slope is steeper than 0.45; fully rock by 0.8 (about 24° to 39°) |
| Sand | `#8c7a5a` | within 1 m to 6 m of the river's edge |
| Dirt (the trail) | `#9a7650` | within the band ±0.5 m to 1.5 m, and only up to the camp |

**Material:** one `MeshStandardMaterial` with vertex colours, roughness 0.95, metalness 0. Stock material,
no custom shader.

**Mesh:**
- Split into chunks of 40 grid rows (160 m), so chunks out of view can be hidden.
- Normals are computed on the whole grid before splitting, so the seams between chunks are lit the same.
- **Low tier** uses every second grid point (6 × 8 m); **High** uses all of them.

## 3. Water (`buildWater`)

- **Shape:** a flat strip that follows the river line.
  - Half width is the ford half width + 2.5 m.
  - It sits at the water height, one point every 3 m.
- **Look:** colour `#4f86a0`, opacity 0.85, roughness 0.25, metalness 0.1, emissive `#2a5a78` at 0.15.
- **Animation:** none. No waves, no flow.

## 4. Props (`src/spikes/play/world.ts`)

| Prop | Geometry | Colour | Placement |
|---|---|---|---|
| Trees | trunk cylinder r 0.25–0.35 × 2 m plus two cones (r 1.6 × 3.6 m, r 1.2 × 2.8 m), 5–6 sides | `#2f5a34` | every 5 m on both sides, `band + 5` to `band + 75` m out; none in the river or within 30 m of the camp; grouped in 200 m bands |
| Bank boulders | low-poly 12-sided rock, 1.2 × 0.8 × 1 | `#857f76` | 35 % chance per 5 m beside the trail |
| Log (obstacle) | cylinder r 0.4 × 3.2 m across the trail | `#7a5535` | from the course obstacle list |
| Rock (obstacle) | 12-sided rock r 1.5 | `#7b7b78` | same |
| Ramp | three-sided wedge 3.2 m wide, 0.7 m high | `#b98550` | same |
| Mud | flat disc r 3 m | `#4a3a28` | same |
| Camp | ground patch r 8 `#8a7a52`, tent cone `#cdbd9a`, fire logs `#4a3426`, flag poles `#6b4a2f`, flags `#b8483c` | | at the camp |

**Prop material:** each prop uses `MeshStandardMaterial` with roughness 0.9 and a slight glow of its own
colour (emissive 0.1), so props do not go black in shadow.

## 5. Light, sky, fog

**Lights:**
- Sun: `#ffd7a0` at intensity 1.5, from (−30, 40, 20), which is low, from the left and behind.
- Hemisphere: `#fff0d8` above, `#6a7040` below, intensity 1.0.
- Ambient: white at 0.2.

**Sky:**
- Sky colour `#e9a878`.
- Fog colour `#e8b48a`, from 60 m to 420 m.
- The painted backdrop plate from `src/adapters/render/backdrop.ts` sits on the horizon.

**Dusk to night** (`setNight(k)`, k goes from 0 to 1 during the camp phase):

| | Dusk (k = 0) | Night (k = 1) |
|---|---|---|
| Sky | `#e9a878` | `#101a33` |
| Fog colour | `#e8b48a` | `#16203c` |
| Fog range | 60–420 m | 30–160 m |
| Terrain tint (multiplies the vertex colours) | `#ffffff` | `#4a5878` |
| Hemisphere light | intensity 1.0, colour `#fff0d8` | intensity 0.4, colour `#7a8cc8` |
| Sun intensity | 1.5 | 0.25 |
| Ambient intensity | 0.2 | 0.3 |
| Campfire light (`#ff9a4a`, reach 40 m) | off | about 6 |

**Ride time:** the whole ride currently runs at dusk (k = 0). There is no sundown during the ride yet.

## 6. What is drawn

- `cullAround(z)` shows only the terrain chunks and tree bands from 80 m behind the rider to 460 m ahead.
- Measured triangles: Low about 28–30k, High about 48–50k.

## 7. Can it be reshaped the way you want? Yes. Five ways, from least to most work

1. **Paint the hills yourself (BUILT, see section 8).** THREE.Terrain can read a greyscale heightmap image instead of noise:
   white is high, black is low. Its README says to "pass the loaded heightmap image (or a canvas containing
   a heightmap) to the `heightmap` option".
   - You paint a PNG in any paint app, 81 pixels wide × one pixel per 4 m long (about 300 px for the horse).
   - We swap `PerlinDiamond` for your image. The trail carve, river and camp still run on top of it.
   - `TerrainNS.toHeightmap` can export the current terrain as a starting image to paint over.
   - Cost: small. No new dependency.
2. **Draw the trail as a path, not sine waves.** Replace the wave sums with a list of points you place
   (x, z every 50 m or so), joined by a smooth curve. This gives exact bends, hairpins and switchbacks
   where you want them.
   - Cost: small. Only `trailX` and `trailHeading` change.
3. **Several trails: the maze.** The carve already flattens one band through the hills. The same step can
   flatten several paths, with junctions where they split and dead ends where one stops at a cliff or a
   deep river.
   - The sim follows one trail today, so it would need to know which path the rider is on.
   - Turning back needs the mount to be able to turn around; today the ride only moves forward (+z).
   - Cost: medium to large. This is the biggest change to the ride code, and it needs a plan first.
4. **Cliffs.** A height field gives one height per point, so it cannot make overhangs or caves.
   - It can make near-vertical drops: a large height step between two neighbouring points (3–4 m apart
     today) already looks like a cliff, and the rock colour rule paints it grey.
   - For sharper edges: a finer grid (1–2 m) in the cliff zones, or rock-wall props (stock geometry or a
     model) placed along the drop.
   - The sim already treats a steep side slope as a fall. A "cliff edge = fall" rule is a small addition.
5. **Colour by zone.** The colour rules above can change per stretch: for example, a dry rocky pass,
   a green valley, a dark forest. Your painted image could also carry a second "zone" map that picks the
   palette.
   - Cost: small.

My recommendation: options 1 and 2 first, which give you full control of the shape for little code. Then
design the maze (option 3) and cliffs (option 4) on paper together before building them.

## 8. Painting the hills (built 2026-11-28, owner pick: "Painted heightmap")

1. **Start from the current hills.**
   - `docs/spikes/horse.png` (241 × 1241 px) and `docs/spikes/bike.png` (241 × 1941 px) are the current noise
     hills.
   - `*-guide.png` is the same image with the trail (red), river (blue), camp (orange) and every 100 m marked.
     Use it as a reference layer; don't paint on it.
   - To export them again: open `http://localhost:4180/spike.html?spike=horse&export=heightmap` (or
     `spike=bike`) and use the download links. If a painted map is already in place, it shows that one.
2. **How the image reads.**
   - It's a top-down map, 1 pixel = 1 metre. The ride goes up the image: the start is at the bottom, the camp
     near the top.
   - The left edge is the rider's left. This was checked in game: a bright band painted on the left stands as a
     ridge on the left of the screen.
   - Brightness is height: black = −4 m, white = +30 m (horse) or +36 m (bike).
   - Colour is ignored: only the brightness of each pixel counts.
   - Any image size works, because it is stretched over the 240 m-wide world. Keep the same proportions
     as the starting image so 1 pixel stays 1 metre.
3. **Put it in the game.**
   - Save the painted image as `public/spikes/heightmaps/horse.png` (or `bike.png`) and reload the page.
   - Without the file, the game uses the noise hills. To compare, add `&map=off` to the URL to ignore the
     painted file.
4. **What still gets carved on top.**
   - The trail band (flat across, slope capped at 16 % or 18 %), the river valley and ford, and the camp disc.
     The trail's path still comes from the sine waves (option 2 would let you draw it).
   - Paint cliffs right next to the trail and they stand beside it.
   - Height steps are 34/255 ≈ 0.13 m (horse) and 0.16 m (bike), because images are 8-bit. Soft brushes give
     smooth slopes; hard edges give cliffs.

Code: `src/spikes/trailGen.ts` (`HillMap`, `setHillMap`, `hillsFromMap`), `src/spikes/play/heightmap.ts`
(loader and export page). Tests: `tests/spikes/heightmap.test.ts`.
