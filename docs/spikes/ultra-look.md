# "No limits" look spike (2026-11-28)

Owner ask: "What would it look like if we remove all limits and try to get as close to the models from gpt
images as possible? What would hold us back? I want to see a visual spike."

The locked rule "stock materials only, Low tier stays stock" is lifted for this spike only.

## What was built

`src/spikes/view/ultra.ts`. It uses only three.js and its bundled addons, with no new dependency.

- **Materials:** every stock material on the rider and mount becomes a `MeshPhysicalMaterial`, chosen by
  colour role:
  - satin clay for skin, coat and leather;
  - cloth sheen for the blanket, cream, mane and ochre;
  - clear-coated lacquer for the bike paint;
  - real metal;
  - glossy eyes.
- **Smoothing:** creased normals at 60°, so soft edges shade smooth and hard edges stay hard.
- **Light:** a studio environment map (`RoomEnvironment` through PMREM), a soft VSM shadow and a
  neutral tone map.
- **Post:** GTAO ambient occlusion, faint bloom and SMAA.

How to see it:
- the studio harness: `tools/spikes-harness.html?...&ultra=1`;
- the ride: `spike.html?spike=horse|bike&gfx=ultra`, which uses High geometry plus all of the above.
  Only the rider casts a shadow there.

Shots: `docs/spikes/ultra/*-before.png` and `*-ultra.png` (SwiftShader, not a device).

## Result

The light and the finish now read like the references: soft studio light, saturated satin clay, a glossy
tank and a contact shadow. What still separates it from the GPT images is the shapes, not the rendering:
boxy legs, faceted joints, no fingers, a flat face and no mane. Better rendering can't fix shapes.

## What holds us back, in order of weight

1. **There are no 3D models of the GPT designs.** The references are 2D images. TripoSR already failed on
   the dragon (a blob with no face). Getting close needs a sculpted, low-poly, rigged GLB per hero and mount,
   made by:
   - an artist;
   - Blender work;
   - or a paid image-to-3D service, which must be scouted first.
   This is the main gap, and the only fix that matters.
2. **What primitives can't do:** quilted and woven cloth, leather grain, fur and mane, cloth drape, fingers,
   faces (`hero-look.md`).
3. **Phone GPU and battery.** Physical materials, VSM shadows and GTAO at full resolution are fine on an
   iPhone 13 at best. On Low-tier Android they are too heavy, so this could only be a High or Ultra tier.
4. **Bundle size.** The post chain (EffectComposer, GTAO, SMAA, bloom) adds to the 255 kB initial chunk
   unless it is lazy-loaded.
5. **Locked decision.** The project rule is stock materials only and no post on Low. Shipping this needs
   an owner amendment, for High only.
6. **Animation.** A real gallop and a real ride need rigged models with keyed clips. Today the poses are
   procedural.

Not verified on device.
