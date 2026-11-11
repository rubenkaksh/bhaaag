# Qwen Flash — Produce a Kathmandu Hillside Building Kit and One Playable Level

Work in the **rubenkaksh/bhaaag** repository. Read this prompt and the full `skills/game-asset-production-integration/SKILL.md` before editing.

## Critical project context
The repository's current product README and `docs/level-layout.md` describe a third-person web zipline game sliding house-to-house down a Kathmandu hillside at golden hour. The art bible in `docs/art-style-guide.md` is authoritative: Newari/Kathmandu hillside architecture, saturated red-orange terracotta roofs, cream plaster, warm brick, dark timber balconies with square balusters, carved eaves, lattice windows, lived-in terraces, prayer flags, water tanks, trees, and layered Himalayan foothills/haze.

There is also `docs/sessions/T290-handoff-updated.md` describing a portrait 2.5D cloud-dragon chase. This conflicts with the current README and active level layout. **Do not assume the dragon-chase handoff supersedes the live zipline game.** Inspect recent session notes, package scripts, current mode selection, rendering architecture, and git history. Determine whether T290 is an active mode or a historical/parallel task. Preserve both systems if both are active; do not replace the zipline game's camera, level, or gameplay with a cloud-chase design.

## Source material
Two generated cloud-village concept sheets are intended as loose visual exploration only:
- `assets-src/cloud-village-concept/cloud-village-concept-sheet.png`
- `assets-src/cloud-village-concept/cloud-village-building-and-level-sheet.png`

If either source file is absent, do not fabricate it or silently substitute a web image. Report the missing input and continue with repo-native style exploration from existing approved references. The concept sheets depict generic ancient fantasy / East-Asian pagoda motifs; they are **not** the art-style authority. Adapt only useful silhouettes or composition ideas into the project's Kathmandu/Newari visual language. Avoid importing fantasy pagodas, floating islands, cloud platforms, or dragon-chase scenery into the zipline level unless repository evidence confirms that direction is desired.

## Inspect before editing
1. Read `README.md`, `CLAUDE.md`, `PRODUCT.md`, `docs/art-style-guide.md`, `docs/level-layout.md`, `docs/graphics-spec.md`, current session notes, relevant ADRs, and the existing level generator.
2. Inspect `content/levels/l1.json`, `tools/genLevel.mjs`, decor placement, render adapters, asset conventions, package scripts, tests, and performance budgets.
3. Identify the current intended level scope. The level generator owns generated level JSON; do not hand-edit generated output if the repo says otherwise.
4. Check the current branch/worktree for user changes and preserve them.

## Production goal
Create a **reusable building/decor sprite or texture/model-reference kit and one additional level concept/implementation** that fits the confirmed active game mode and art direction. Prefer repo-native procedural Three.js geometry and existing instanced decor systems where those are the established approach. Do not force a sprite-only solution into a 3D game architecture.

If the active game is the Kathmandu hillside zipline game:
- Build a coherent set of reusable Newari-style house variations, roof/eave/balcony/window/tank/planter/flag/tree details, and hillside scenery.
- Keep gameplay houses hookable and dimensionally compatible with rope clearance, launch strips, collision rules, and route readability.
- Separate gameplay geometry/collision from decorative meshes.
- Add one level using the established level generator and schema. Keep route, spawn, anchor, hazard, and goal data declarative and deterministic.
- Respect the art guide's exact visual constraints: red-orange tiled hipped roofs, cream plaster, warm brick, dark timber square-baluster balconies, lattice windows, lived-in clutter, prayer flags, golden-hour light, Himalayan haze.
- Avoid overpopulating the hillside; consult the current level-layout rules and mobile budgets.

If T290 is confirmed active instead:
- Follow `docs/sessions/T290-handoff-updated.md` for portrait 2.5D cloud-dragon composition and chase behavior.
- Build a separate level/art family and do not mix it into the zipline level's asset paths or runtime.
- Use Three.js scene objects and modular cloud segments; never flatten a concept sheet into a gameplay background.

## Asset workflow
- Preserve source art unchanged.
- Inspect dimensions, color mode, alpha, and content bounds.
- Extract isolated elements only where separation is clean; otherwise use source as modeling/reference guidance.
- Create transparent crops with inspected edges; preserve soft highlights and intentional translucent details.
- Normalize naming, visible bounds, pivots/anchors, scale, and texture density.
- Generate optimized runtime files and retain editable/lossless masters where project policy permits.
- Create an `asset-manifest.json` with source mapping, dimensions, pivots, layers, and collision relevance.
- Do not call a concept image engine-ready until processed and validated.

## Level integration
- Keep level data separate from rendering.
- Use existing schema, level generator, content validation, and route tests.
- Reuse materials, geometries, textures, and instancing patterns.
- Preload assets; avoid per-frame allocations.
- Keep mobile texture/draw-call/triangle budgets.
- Do not break existing player controls, HUD, camera, zipline physics, level progression, or any separately active T290 mode.

## Verification
Run the actual repository scripts for tests, lint/typecheck, and build. Use existing screenshot/preview scripts where available. Inspect the result at the intended viewport. Report exact commands and outcomes; never claim visual verification without an actual capture.

## Deliverables
- Reusable processed assets or procedural building kit in existing project conventions.
- Source-to-output mapping and `asset-manifest.json`.
- One new level in the established data/generator format.
- Tests for level schema, route/collision/readability invariants, and deterministic generation as appropriate.
- Updated handoff describing asset IDs, dimensions, placements, gameplay geometry, integration points, controls, preview route, performance, and limitations.
- A concise completion report distinguishing concept-only, processed, engine-ready, and engine-verified work.

## Execution rules
Make the smallest safe changes. Do not stop after planning. Do not overwrite unrelated work. If source images are missing or the product-mode conflict cannot be resolved from repository evidence, state that blocker explicitly and do not guess. Commit only on the assigned feature branch if repository policy permits.