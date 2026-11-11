# Cloud Village Asset Exploration — Repository Handoff

**Status:** concept/source package staged; no runtime assets or level integrated.

## Why this is staged separately
The current product docs describe the Kathmandu hillside zipline game and its Newari/Kathmandu art direction. A separate T290 handoff describes a cloud-dragon chase. The two directions conflict. This handoff explicitly asks the next agent to inspect active code/modes and resolve that state before implementation.

## Repository files added
- `prompts/QWEN_EXECUTE_CLOUD_VILLAGE.md` — Qwen Flash execution brief. It has been adapted to the actual bhaaag repository and makes the existing art bible authoritative.
- `skills/game-asset-production-integration/SKILL.md` — asset production and validation workflow.
- `skills/game-asset-production-integration/README.md` — skill entry point.

## Source image files
The two generated concept sheets are in the companion package, not committed to this branch:
- `cloud-village-concept-sheet.png`
- `cloud-village-building-and-level-sheet.png`

The GitHub connector used for this handoff supports text files and Git objects, but not direct local binary upload. Add the images manually under `assets-src/cloud-village-concept/` before asking Qwen to extract from them. Preserve them as source-only references. Do not use either full sheet as a runtime texture.

## Important art-direction note
The generic floating fantasy village is not automatically compatible with the game's established Kathmandu/Newari look. Use the concept sheets as loose inspiration only unless code/session evidence confirms T290 is an active separate mode. Follow `docs/art-style-guide.md` for the zipline game.

## Next action
Run Qwen with `prompts/QWEN_EXECUTE_CLOUD_VILLAGE.md`. It should inspect the repository, determine which game mode is active, then produce reusable assets and one level using the project's existing generators, schemas, collision rules, and performance budgets. It must run tests/build and report exactly what is verified.
