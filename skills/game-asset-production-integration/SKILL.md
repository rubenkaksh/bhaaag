---
name: game-asset-production-integration
description: Turn generated or painted art into engine-ready asset packages (sprites, atlases, animation clips, metadata) and integrate them into a game. Use when processing, slicing, packing, validating or importing art assets, not for tweaking an existing texture or material.
---

# Game Asset Production & Integration

## Mission

Turn a game brief or visual reference into a cohesive, production-usable asset package, not merely attractive concept images. Make the result reproducible and easy for another developer to import.

**Core rule:** a generated image is source material, not a finished game asset. Never call an asset production-ready until its dimensions, transparency, slicing, naming, metadata and target-engine behavior have been checked.

## Operating principles

1. **Project art guides outrank generic concept sheets.** Read the repo's style guide, product docs and ADRs before generating or processing anything. Where they conflict with a reference image, the docs win.
2. **Understand the game first.** Genre, camera, art style, gameplay readability, target platform, engine, render pipeline, asset families.
3. **Preserve visual continuity.** Reuse approved references, palette and constraints. Do not silently change approved designs.
4. **Design for gameplay first.** Silhouette, contrast, scale and hierarchy beat decorative detail.
5. **Source art is immutable.** Write processed outputs elsewhere; never overwrite a master.
6. **Automate deterministic processing.** Scripts and explicit config over hand cropping or guessed coordinates.
7. **Never fabricate technical correctness.** If transparency, frame bounds, pivots or import behavior cannot be verified, mark the package provisional and say what remains. Populate metadata from actual files, never guesses.
8. **Decorative assets must not silently become colliders.** Never infer collision, damage or timing from visuals; take them from game rules. Keep hitboxes separate from visual bounds.
9. **Do not hand-edit generator-owned files.** Change the generator or its input, then regenerate.
10. **Reuse before adding.** Existing loaders, materials, geometries, instancing and level schemas come first.
11. **Ask only blocking questions**, one at a time. Otherwise pick a documented default and proceed.
12. **Controller owns the final gate.** A delegated executor reports what it ran; the controller runs lint, typecheck, tests and build and reports exact results.

## Intake

Retrieve answers from the brief, repo docs, screenshots and earlier decisions before asking the user to repeat them. Resolve: game type (2D/2.5D/3D), engine and version, asset families, platform and budgets, style references and palette, runtime requirements, output formats and naming. Safe defaults when unspecified: PNG with alpha, lossless sources, separate source and runtime folders, 2-4 px atlas padding, consistent pivots per family (bottom-center for characters, center for projectiles), neutral PNG+JSON if the engine is unknown. See `references/generation.md` for the full list.

## Status ladder

| Label | Meaning |
|---|---|
| Concept only | Generated visual; not processed. |
| Processed | Extracted, normalized and packaged. |
| Engine-ready | Metadata and import configuration prepared for the target engine. |
| Engine-verified | Imported and tested in the actual project. |

"Production-ready" is never a synonym for "generated". If the project cannot be run, say **processed, not engine-verified**.

## Validation honesty

Report passed, failed and unverified checks separately. A PASS from `tools/asset_pipeline.py validate` covers only the checks the tool lists in `checks_run`; visual and engine checks are separate. Never claim integration because files were generated or copied. Unsupported asset types (a rendered image is not a mesh or rig): explain the required tool rather than pretending image generation can create it.

## Completion checklist

- [ ] Requirements and target engine known, or defaults documented
- [ ] Art direction and asset IDs consistent with project docs
- [ ] Source images preserved, unmodified
- [ ] Background/alpha verified; sprites cropped and normalized
- [ ] Animation frames aligned and ordered
- [ ] Atlases and metadata generated from actual files; bounds and references validate
- [ ] Engine import settings documented
- [ ] In-engine behavior tested, or verification limits stated explicitly
- [ ] Previews and validation report included; handoff says exactly how to use the assets

**Definition of done:** another developer can take the package, identify each asset, import it into the stated engine, reproduce its animation, and see every remaining unverified step without guessing.

## Where to read next

Load only what the task needs.

| Need | File |
|---|---|
| Prompting, style bible, consistency, sprite/sheet/tile/UI/3D strategy | `references/generation.md` |
| Keying, crop/trim, slicing, frame QA, atlas packing, metadata schema | `references/processing.md` |
| File, atlas, visual and engine checks; failure handling | `references/validation.md` |
| Folder layout, handoff contents, working with existing repos | `references/delivery.md` |
| Three.js / custom 3D | `references/engines/threejs.md` |
| Flutter Flame | `references/engines/flame.md` |
| Unity | `references/engines/unity.md` |
| Godot | `references/engines/godot.md` |
| Unreal | `references/engines/unreal.md` |

Helper script: `tools/asset_pipeline.py` (Pillow). Documented in `references/processing.md`.
