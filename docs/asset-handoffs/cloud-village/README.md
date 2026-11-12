# Cloud Village Asset Exploration: Repository Handoff

**Status:** mood-reference notes plus a scoped brief. No runtime assets, no level, no new textures.

## Resolved: no mode conflict

Earlier drafts treated the cloud-dragon chase and the Kathmandu zipline game as conflicting directions. They are not. Three modes ship (`classic`, `chase`, `strategy`, see `src/app/modes/mode.ts`); ADR 0010 is accepted; T290 and T290b are live Chase-mode tasks. Newari/Kathmandu art direction (`docs/art-style-guide.md`) governs all of them.

## Concept sheets: loose reference only

Two generated sheets exist in the companion package: `cloud-village-concept-sheet.png` and `cloud-village-building-and-level-sheet.png`.

- Do not add them under `assets-src/` or anywhere else in git (7.2 MB). If kept, store them in the gitignored `docs/reference/` like other references.
- Do not extract, crop or ship assets from them. They have no alpha, glowing gradient backgrounds, and show off-brief architecture (Chinese jade roofs, torii-like gate, European chimney cottages, decorative gold).
- Legitimate use, Chase only, as mood: warm-lit cloud sea swallowing building bases (T290b fog-absorb); a distant band of house silhouettes fading into sunset haze; warm-top, cool-underside cloud-puff lighting as a colour target.

## Files in this PR

- `docs/briefs/T290c-chase-cloud-village-backdrop.md`: the executable brief (render-only, allowlist `src/adapters/render/chase/**`).
- `skills/game-asset-production-integration/`: generic asset-production skill (SKILL.md plus `references/` and per-engine files, `tools/asset_pipeline.py`). Cross-project; owner to decide whether it moves to a user-level `.claude/skills/` and whether the Pillow-based script may live in this repo (new toolchain, ask-before-dependencies rule).

## Next action

Dispatch the T290c brief per sandbox rule 2 with a ledger line; the controller runs the final gates.
