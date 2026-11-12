# Generation: intake defaults, audit, art direction, strategy

## Required intake decisions

- Game type: 2D, 2.5D or 3D.
- Target engine and version, or unknown.
- Asset families: characters, environment, tiles, props, projectiles, VFX, UI, icons, backgrounds, textures, 3D models.
- Platform and limits: mobile, desktop, web, console; memory, texture size, performance.
- Visual style: references, palette, shape language, lighting, outline treatment, perspective, detail level.
- Runtime needs: sprite animation, skeletal animation, particles, tilemap, nine-slice, UI scaling, LOD, shader effects.
- Output: formats, resolution, naming, atlas format, whether editable sources are required.

## Safe defaults when unspecified

- PNG with alpha for 2D sprites and VFX; lossless sources; compressed runtime variants only once targets are known.
- Power-of-two atlas dimensions where practical, without forcing empty space.
- 2-4 px extrusion/padding around atlas sprites when the renderer may sample neighbours; confirm the engine's packing behavior.
- Consistent pivots per family: characters bottom-center, projectiles visual center, ground decals center.
- Nearest-neighbor only for pixel art; high-quality resampling for smooth or painted art.
- Keep source and runtime exports separate.
- Unknown engine: neutral PNG atlas plus JSON metadata and an engine-neutral manifest.

Do not ask intake questions as a form. Ask the single most important unresolved question, then continue with documented defaults.

## Project and asset audit

1. Identify engine, version, folder conventions, render pipeline, orientation, camera projection, current import settings.
2. Inspect existing atlases, animation controllers, particle systems, prefabs/scenes, tilemaps, shaders, asset references.
3. Read handoff documents; preserve established naming, scale and gameplay conventions.
4. Detect missing assets, duplicates, style inconsistencies, wrong dimensions, unused files, broken references.
5. Build an inventory per asset: ID and display name; family and in-game use; source reference; dimensions and color mode; frame count and size; pivot; collision or interaction notes; status (planned, generated, processed, verified, integrated).

Never overwrite existing project files without explicit instruction or a safe backup.

## Art direction and asset bible

Write a compact, reusable spec before a batch:

- Art style and shape language; palette with named colors and hex values.
- Lighting direction, shadow softness, glow rules.
- Camera and perspective rules; outline, edge and material treatment.
- Relative scale of characters, props, effects, environment.
- Team/faction color rules; silhouette and readability at the smallest screen size.
- Background and transparency requirements.
- Animation principles: timing, easing, anticipation, impact, fade.
- Negative constraints: styles, details, text, perspective shifts to avoid.

For a multi-asset batch, make a reference board or approved hero asset first, generate a small proof set, review it, then scale up.

### Consistency controls

- Reuse the same reference image(s), seed when available, prompt structure, palette and camera notes.
- Specify view direction and orientation for every asset (gameplay camera, front, side, top, isometric).
- Keep lighting consistent across assets that appear together.
- Generate materially different assets separately when one sheet would cause drift.
- For repeated frames: same object, fixed camera, fixed scale, fixed lighting, only the intended motion changing.

## Generation strategy

### A. Isolated sprites

For characters, props, weapons, pickups, icons, single VFX. Prompt for:

- one subject per image
- centered composition with safe margins
- fixed view and consistent scale
- clean silhouette and readable shape
- transparent background if the generator can reliably provide it
- no text, labels, borders, contact sheets or decorative framing

If native transparency is unreliable, use a flat, high-contrast key background that does not occur in the subject and record the key color.

### B. Sprite sheets and animation strips

For idle, walk, attack, projectile, impact, explosion, loops. Specify:

- exact rows and columns, exact frame count, equal-sized cells
- fixed subject scale and anchor
- consistent camera, lighting and background
- no cell borders, labels, shadows crossing cells, or overlapping frames
- motion progression per frame, whether it loops, frame or total duration

Prefer short isolated strips over one huge sheet of unrelated effects. A generated sheet is only a visual source until cell geometry and frame consistency are verified.

### C. Tileable textures and tilesets

Specify tile dimensions, seamless edges, perspective, lighting neutrality and repeat axes. Test seams programmatically (compare opposite edges) and visually in a repeated grid.

### D. UI and icon assets

Specify logical size, safe area, states (default, pressed, disabled, selected, cooldown), visual bounds and contrast. Export every state with identical canvas size and alignment.

### E. 3D assets

A rendered image is not a 3D model. For a mesh, rig, animation or material, use a mesh-generation or DCC workflow (for example Blender) that produces real geometry. Use image generation only for concept art, orthographic references, textures, decals and material direction. Verify topology, scale, UVs, normals, rigging and export format in the target toolchain.
