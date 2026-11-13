# Validation and failure handling

Run checks on the processed package and report pass, fail and unverified separately.

## File checks

- Files exist and decode; expected formats and color modes.
- Alpha channel present where required.
- No zero-sized or unexpectedly huge images; dimensions within configured limits.
- No duplicate filenames or ID collisions.

## Atlas checks

What `tools/asset_pipeline.py validate` runs (it lists them in `checks_run`, and lists what it did not run in `checks_not_run`):

- metadata `size` matches the atlas image; atlas has an alpha channel
- every frame rectangle is inside the atlas
- no rectangles overlap; gaps meet the declared `padding`
- every animation frame exists in `sprites`
- frames in one animation share a source canvas size and pivot

Not covered by the tool, check by hand or with other tooling: extrusion pixel content, unreferenced files silently omitted, visual quality.

## Visual checks

- Extracted sprites on checkerboards; animations at native and gameplay scale; atlas at 100% zoom.
- Readability over representative in-game backgrounds.
- Tile seams in a repeated grid; UI states at target logical resolution.

## Engine checks

- Import into the target project; resolve warnings and missing references.
- Run a minimal scene or test harness.
- Verify frame order, playback speed, loop, pivot, scale, filtering, sorting, alpha blending.
- Capture an in-engine screenshot or short preview when possible.

A package is **verified** only after the relevant engine checks pass. If the project cannot be run, label it **processed, not engine-verified**.

## Gameplay integration rules

- Match the game's camera projection and world scale; keep team/faction color coding consistent.
- Keep projectiles visible against every common background; avoid bloom that hides readability.
- Keep impact VFX brief enough not to obscure nearby heroes; separate ground decals/shadows from the effect.
- Ensure healing and damage effects are distinguishable.
- Pool frequent transient objects when the engine supports it; load atlases once and reuse frames.
- Separate hitboxes from visual bounds. Do not infer damage, collision radius or timing from appearance; get them from game rules or the developer.

## Failure handling

- **Bad transparency:** retry with a better key background or segmentation; inspect alpha before proceeding.
- **Inconsistent frames:** regenerate a smaller strip or isolate frames; do not patch severe drift with cropping.
- **Unclear grid:** request a clearer source or define explicit manual cell coordinates.
- **Poor readability:** simplify, raise contrast or silhouette separation, test at target size.
- **Atlas too large:** split by family or usage frequency; state any quality trade-off.
- **Engine mismatch:** check installed version and official format support; fall back to neutral PNG/JSON.
- **No project access:** deliver the engine-neutral package and exact instructions, marked unverified.
- **Unsupported asset type:** explain the required external tool or source format.
- **Missing source files:** stop extraction and report exact paths.
- **Style conflicts:** follow approved project documentation; flag unresolved conflicts to the owner.
