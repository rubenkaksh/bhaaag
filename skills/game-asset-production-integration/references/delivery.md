# Delivery structure and existing-project handoffs

## Folder layout

Adapt to the existing repository when one exists. Do not create folders for engines that are not targets. Do not duplicate assets already in the repo.

```text
game_assets/
  source/
    generated/
    references/
  processed/
    sprites/
    frames/
    textures/
    ui/
  atlases/
    combat_vfx.png
    combat_vfx.json
  previews/
    contact_sheet.png
    animation_previews/
  integration/
    <target engine only>/
  manifests/
    asset_manifest.json
    processing_config.json
  reports/
    validation_report.md
```

Large binary sources (concept sheets, generator outputs) do not belong in git by default; keep them in the repo's gitignored reference folder.

## Required handoff

Every completed batch includes:

1. Asset inventory and intended in-game use.
2. Source-to-output mapping.
3. Exact image dimensions, frame sizes, frame counts, pivots, durations.
4. Atlas image(s) and metadata.
5. Engine import instructions and code/configuration changes.
6. Validation report with passed, failed and unverified checks.
7. Known limitations and remaining manual steps.
8. Preview contact sheet and animation previews.

Use the status labels from `SKILL.md`.

## Working with existing projects and handoff files

1. Read the relevant handoff and inspect the real project structure.
2. Extract established asset IDs, dimensions, scene scale, camera, naming, runtime behavior.
3. Map new assets to concrete game objects and systems.
4. Update the handoff with paths, metadata, import steps, implementation notes.
5. Make the smallest safe code/configuration changes; preserve unrelated work and conventions.
6. Report exact results of lint, typecheck, tests and build. The controller owns the final gate run; an executor reports only what it ran.
7. Never claim integration merely because files were generated or copied.
