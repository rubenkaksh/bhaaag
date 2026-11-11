# Game Asset Production & Integration

## Mission
Turn a game brief or visual reference into a cohesive, verified, engine-ready asset package. A generated image is source material, not a finished game asset.

## Principles
1. Inspect the actual game, engine, camera, world scale, asset conventions, art direction, and performance budgets before generating.
2. Preserve approved visual continuity; project art guides outrank generic concept sheets.
3. Design for gameplay readability, silhouette, scale, collision clarity, and mobile constraints.
4. Preserve originals; process outputs separately and deterministically.
5. Verify transparency, crop bounds, pivots, naming, metadata, atlas references, and runtime behavior.
6. Never invent collision, dimensions, timing, or test results.
7. Ask only blocking questions; otherwise document safe assumptions.
8. Keep gameplay hitboxes separate from visual bounds.
9. Reuse existing loaders, materials, geometries, instancing, and level schemas.
10. Deliver an integration handoff and explicit validation report.

## Intake
Resolve game mode, engine/version, target platforms, asset families, camera/projection, art style, palette, runtime animation, output formats, atlas/metadata needs, and performance limits. Retrieve these from repository documentation before asking the user to repeat them.

## Source inspection
For every source image record file name, dimensions, color mode, alpha presence, content bounds, and intended use. Preserve source files. Treat concept sheets as references, not packed runtime atlases. Never display a full sheet as a game texture.

## Processing
- Crop individual assets with transparent padding; inspect edges at native and gameplay scale.
- Preserve intentional translucent/soft details; remove only actual backgrounds.
- Normalize visible bounds, naming, pivots/anchors, scale, and texture density.
- Export PNG with alpha as a reliable master; create compressed runtime variants only after checking target support.
- Build atlases only when the runtime benefits; include padding/extrusion where required.
- Generate metadata from actual outputs, never guessed coordinates.
- Keep editable masters and deterministic processing configuration.

## Metadata
Each asset should record stable ID, source path/rect, output path, dimensions, pivot/anchor, intended layer, world scale, animation frames/duration if relevant, collision relevance, and file size. Validate every referenced file and atlas rectangle.

## Engine integration
First inspect the installed engine/version and existing project architecture. Match camera projection and world units. Use existing asset loading and level data conventions. Preload resources, reuse textures/materials/geometries, pool frequent transient objects, and avoid per-frame allocations. Keep rendering and collision/gameplay data separate.

### Three.js / custom 3D
Use the project's existing scene graph, loaders, coordinate conventions, and material patterns. Use sprites/planes only when appropriate to the established visual style. For procedural architecture, prefer reusable geometries/materials and instancing if already used. Do not force 2D sprites into a 3D pipeline without a clear reason.

### Flutter Flame
Use project Flame version conventions, SpriteSheet/Sprite/animation APIs, explicit world-unit sizes and anchors, and separate world effects from HUD.

### Unity / Godot / Unreal
Use the installed version's native import settings, atlas/animation resources, pivots, sorting, compression, and collision conventions. Do not edit serialized formats blindly.

## Level production
Keep level placements, transforms, depth/layer, collision, spawn, route, hazards, collectibles, and finish data declarative and deterministic. Use existing generators and validators. Do not hand-edit generated files where a generator owns them. Decorative assets must not silently become colliders.

## Validation
- Files decode; formats, dimensions, alpha, size, and names are valid.
- Every metadata/atlas reference exists and is in bounds.
- No unintended halos, clipping, seams, or duplicate IDs.
- Test at target viewport and over representative backgrounds.
- Confirm collision matches intended gameplay geometry.
- Run lint, typecheck, tests, and production build.
- Capture and inspect an in-engine preview when possible.
- Report passed, failed, and unverified checks separately.

## Delivery
Provide source-to-output mapping, inventory, exact dimensions/pivots/frames, manifests, import/integration notes, preview, validation report, limitations, and next steps. Use statuses: Concept only, Processed, Engine-ready, Engine-verified. Never call work production-ready merely because an image was generated.

## Failure handling
If source files are missing, stop extraction and report exact paths. If style conflicts exist, follow approved project documentation and flag unresolved mode conflicts. If alpha cleanup is unreliable, keep the source and request a cleaner render or use a documented manual segmentation process. If runtime verification is unavailable, label outputs processed but unverified.
