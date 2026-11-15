# T290c: Chase cloud-village backdrop (executable brief)

Replaces the two earlier Qwen prompts (`QWEN_EXECUTE_CLOUD_VILLAGE.md`, zip and PR versions), which asked for a new level. Source of the scope: `docs/reviews/game-art-skill-review.md` (Opus review, 2026-11-12).

Mission: read `PRODUCT.md` first. This is decoration for Dragon Chase only (mode `chase`).

## Settled facts (do not investigate or re-decide)

- Modes are settled: `classic`, `chase`, `strategy` (`src/app/modes/mode.ts`). ADR 0010 is accepted. T290 and T290b are live Chase tasks.
- Do NOT add a level, a mode, a level select, collectibles, platforms, bridges or any collision.
- Art authority: `docs/art-style-guide.md` and `docs/graphics-spec.md`. Concept sheets are loose mood reference only.

## Scope (edit allowlist)

- Edit ONLY `src/adapters/render/chase/**` and its tests.
- Do NOT edit `src/core/**`, `content/levels/**`, `tools/genLevel.mjs`, `src/app/modes/**`.
- Stop and report (do not guess) if any step needs a file outside the allowlist.

## Goal

Under the dragon's cloud, the chase rows' Newari houses dissolve into a golden-lit cloud sea (T290b fog-absorb), plus a distant row of village silhouettes fading into haze.

- Mist: the T290b 128 px `CanvasTexture` radial gradient, generated at runtime (0 bytes shipped).
- Houses: existing decor kit and chase row meshes only.
- Distant silhouettes: built from the existing kit plus fog; no billboards of concept art.

## Palette and style

- Newari: red-orange terracotta roofs (`#b5441c` family), cream plaster, brick, dark timber. Two-tier pagoda roofs only where the kit already provides them.
- Not allowed: East-Asian curled or jade/teal roofs, torii-like gates, chimney cottages, floating islands.
- Gold means interactive only. No gold lanterns, glows or orbs in decoration. Cloud and mist stay cream, white or cool grey.

## Materials and budget

- Stock three.js materials only (Lambert, Basic, Sprite). No `ShaderMaterial`, no `onBeforeCompile`, no GLB, no new npm or Python dependencies.
- 0 KB new texture files unless the owner approves first.
- Draw calls stay within ADR 0009 per tier; the Low tier adds at most 1 call. No per-frame allocation.
- Concept sheets: never load, crop, commit or ship them (`docs/reference/`, gitignored).

## Done when

- `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm build` pass (report exact output).
- `tests/content/chaseL1.test.ts` unchanged and green.
- A portrait and a landscape screenshot of `?mode=chase` at the cloud edge are saved under `art/shots/auto/` and listed in the report.
- Status label in the report, per the asset skill: Processed, Engine-ready or Engine-verified.

## Dispatch notes (controller)

Route per sandbox rule 2: one coherent multi-file render change, so cursor or a Sonnet junior; Flash only if long-spanning. Ledger line before dispatch. The controller runs the final gates, not the executor.
