# T297 amendment draft: cloud-village level (NOT APPLIED, awaiting owner approval)

Status: DRAFT. `PRODUCT.md`, `docs/lean-scope.md` and `CLAUDE.md` are untouched until the owner approves.
Trigger: owner, 2026-11-12: "Yes I do want a new level."

## What conflicts today

`PRODUCT.md` Non-goals: "Multi-level content beyond Classic L1 and the one generated Nagarkot level ... level select" and "Modes beyond Classic L1 and Dragon Chase (+ Nagarkot run); no fourth mode, no level select." `docs/lean-scope.md` Dropped item 4: exactly one level.

## Proposed shape (one plan, scoped)

A fourth mode, **Cloud Village** (`mode = 'village'`): ONE hand-placed level of ~8 to 10 Newari houses floating at cloud level, free-aim zipline like Classic, same core sim, JSON level validated by zod, primitives and stock materials, no GLB, no level select (it is picked with the existing mode switch, like the other three). Houses reuse the existing decor kit; the cloud sea is a runtime canvas gradient (0 bytes shipped), as in the T290c brief.

Fallback if you decline the new level: no amendment needed; re-skin the existing house kit to match the concept-art houses (Chase backdrop scope, T290c).

## Exact PRODUCT.md edits

**Product Purpose**, add after the 2026-11-10b block:

> Amendment 2026-11-12 (cloud village, owner decided 2026-11-12):
> - Purpose addition: Zipline Tole also has a short, calm-looking but lethal **Cloud Village** descent: one hand-placed level of about 8 to 10 Newari houses above a golden cloud sea, played with the same free-aim zipline, hand-brake and one-hit death as Classic.
> - Success addition: a first-time player opens `?mode=village` (or picks it in the mode switch) and finishes it in under 2 minutes per run, retrying instantly after a death; the cloud sea and houses read as one place without a tutorial.
> - Budget: JS bundle limit unchanged (under ~600 KB gzipped, initial chunk <= 215 KB gz). New texture files: 0 KB by default; any new texture over 300 KiB total needs owner approval first.

**Non-goals**, replace two bullets:

- Old: "Multi-level content beyond Classic L1 and the one generated Nagarkot level, assist ladder, level select, GLB asset pipeline."
  New: "Multi-level content beyond Classic L1, the one generated Nagarkot level and the one hand-placed Cloud Village level; assist ladder, level select, GLB asset pipeline."
- Old: "Modes beyond Classic L1 and Dragon Chase ... plus the Nagarkot->Bhaktapur strategy run; no fourth mode, no level select."
  New: "Modes beyond Classic L1, Dragon Chase, the Nagarkot->Bhaktapur strategy run and Cloud Village; no fifth mode, no level select, no per-level progression."

**Product Principles**: unchanged. Gold = interactive only; clouds and mist stay cream, white or cool grey.

**`docs/lean-scope.md`**: append "Amendment 2026-11-12 (cloud village)" repeating the lines above. **`CLAUDE.md`**: one line under Locked decisions pointing at it.

## Out of scope even after approval

Level select, collectibles, bridges or platforms with new collision types, floating islands, East-Asian roof shapes, custom shaders, GLB, a sim validator, a second new level, touching `src/adapters/render/chase/dragonSpriteView.ts` (PR #5).

## Build plan after approval (milestones, one at a time)

1. Mode plumbing: `village` in `src/app/modes/mode.ts`, best-score key, mode switch entry, test.
2. Level JSON `content/levels/village.json` (zod-validated, AABB houses, anchors, goal), hand-checked by play.
3. Visuals: house kit reuse, cloud-sea runtime gradient, fog, atmosphere on Medium/High only.
4. Shots at 390x844 and 844x390, gates (lint, typecheck, test, build), QR for phone test.

Estimate: ~120 min. No push or PR without your say-so.
