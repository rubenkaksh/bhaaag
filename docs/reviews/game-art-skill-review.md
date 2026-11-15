# Review: game-asset-production-integration skill, cloud-village drop, PR #4 (2026-11-12)

Reviewer: Opus seat (verdict only; no gate runs, no source edits).
Read: PRODUCT.md, docs/lean-scope.md, docs/art-style-guide.md, docs/graphics-spec.md, ADR 0010,
docs/sessions/T290-handoff-updated.md, docs/sessions/T290b-handoff.md, src/app/modes/mode.ts,
the zip drop (SKILL.md 595 lines, tools/asset_pipeline.py, prompt, README, both concept sheets) and
branch `origin/chore/cloud-village-asset-handoff` (PR #4, 4 text files, +165 lines).

## Verdicts

| # | Question | Verdict |
|---|---|---|
| 1 | Skill as a reusable game-art skill | **FIX** (sound core, wrong shape; pipeline needs 4 fixes) |
| 2a | Zip prompt fit with this repo | **REJECT** |
| 2b | PR #4 prompt fit with this repo | **FIX** (better, still asks for a new level) |
| 3 | Safe for Qwen Flash / Sonnet junior | **Not as written**; replace the prompt with the scoped brief in section 3 |
| 4 | Concept sheets | **Loose mood reference only.** Do not extract, do not commit |
| 5 | PR #4 | **FIX, do not merge as is** (harmless to runtime, but lands an executable brief that builds a non-goal) |

## 1. The skill itself

### What is good
- The core rule ("a generated image is source material, not a finished asset") and the status
  ladder (Concept only / Processed / Engine-ready / Engine-verified, "do not use production-ready as a
  synonym for generated") are honest and worth keeping. Section 9's "processed, not
  engine-verified" label and section 12's "explain the required tool rather than pretending image
  generation can create it" are the right anti-hallucination guards.
- "Never fabricate technical correctness", "populate metadata from actual files, never guesses",
  "do not infer damage/collision from visuals" are correct and repo-compatible.
- Low hallucination risk inside the skill: it is generic advice, it names no fake APIs.

### What is wrong
1. **Two versions, neither is canonical-ready.**
   - Zip version (595 lines): has valid frontmatter (`name`, `description`), but **no three.js / web
     section** (Flame, Unity, Godot, Unreal, custom only). For this repo, the engine that matters is
     missing. Flutter Flame is listed first, which betrays the template it came from.
   - PR #4 version (65 lines): adds the useful Three.js section and three repo-relevant principles
     ("project art guides outrank generic concept sheets", "decorative assets must not silently
     become colliders", "do not hand-edit generator-owned files"), but has **no frontmatter**, so no
     agent can discover or trigger it.
   - **Canonical: the zip version's structure and frontmatter, restructured as below, with the PR
     version's Three.js section and its three principles merged in.**
2. **Sprawl.** 595 lines in one SKILL.md loads every engine adapter, the atlas JSON schema and the
   generation playbook for any texture question. Per write-a-skill progressive disclosure, split:
   - `SKILL.md` (about 100-120 lines): mission, operating principles, intake (one blocking question
     at a time), status ladder, validation honesty, completion checklist, a table pointing to the
     references.
   - `references/generation.md` (section 5), `references/processing.md` (section 6),
     `references/validation.md` (section 9), `references/delivery.md` (sections 10-11),
     `references/engines/{threejs,flame,unity,godot,unreal}.md` (one file per engine; load only the
     target).
   - `tools/asset_pipeline.py` stays, documented in processing.md.
3. **Description over-triggers.** "Use when creating ... textures" fires on every texture tweak in
   this repo. Narrow it to "turning generated or painted art into engine-ready asset packages".
4. **Broken markdown** (pandoc collapse): bullet lists rendered inline at lines 178-182, 194-198,
   234-236, 295-298, 309-316 and 530-534 ("Prompt for: - one subject per image - centered ...").
   Rebuild as real lists.
5. **Location.** A cross-project skill does not belong in `bhaaag/skills/` (not a discovery path for
   Claude Code; `.claude/skills/` or `~/.claude/skills/` is). It also overlaps the existing
   `idea-to-game` skill's art-route decision; either make it a reference of that skill or keep it
   user-level with a pointer. A repo-specific override (Bhaaag constraints) belongs in the brief, not
   in the reusable skill.
6. **Gate wording.** "Run available tests/builds" is fine for a junior executor, but the skill
   should say the controller owns the final gate run (sandbox rule 3: verify on the cheapest rung).

### tools/asset_pipeline.py (Pillow, 234 lines)
Not dangerous: no deletes, no network, no shell, no recursion into unexpected paths except
`inspect` (rglob, read-only). Output is deterministic (sorted inputs, fixed shelf order). Issues:

| Severity | Issue | Fix |
|---|---|---|
| High (data loss) | `key INPUT OUTPUT` with OUTPUT == INPUT overwrites the source master; `slice` and `pack` overwrite existing files silently. Contradicts the skill's own "never overwrite / keep source immutable". | Refuse when output resolves to input; refuse to overwrite existing outputs unless `--force`. |
| High (correctness) | `pack` always alpha-trims each sprite, records only `trim.x/y` and hard-codes `pivot 0.5/0.5`. Animation frames lose their common canvas and anchor, which the skill (6.3, 6.5) says must be preserved. | Add `--no-trim` (default for frames) or emit full `spriteSourceSize` and recompute pivot relative to the untrimmed canvas. |
| Medium (overclaim) | `validate` checks bounds and missing animation frames only. The skill (section 9) says atlas checks include no overlap, padding/extrusion, consistent frame sizes, `size` matching the image. A PASS here is weaker than the skill implies. | Add overlap, padding, size-match and per-animation frame-size checks, or state in the output which checks ran. |
| Medium (misleading) | `inspect` on RGB images uses `getbbox()`, i.e. bounds of non-black pixels. On the beige-gradient concept sheets this returns the whole image and reads as "content bounds". | Return `visible_bbox: null` for images without alpha. |
| Low | `key` is a per-pixel Python loop (slow on 1.5 MP sheets) and is a flat-colour key; the concept sheets have gradient, glowing backgrounds, so it cannot cut them. Extrusion skips corners. File handles from `Image.open` are not closed. | Use `ImageChops`/numpy-free band math; extrude corners; use context managers. |
| Repo rule | Python + Pillow is a new toolchain in a pnpm repo; CLAUDE.md says ask before adding dependencies. Atlases are also an asset-loading stage that lean-scope item 4 dropped. | Keep the tool in the user-level skill; do not vendor it into bhaaag without owner approval. |

## 2. Conflicts with this repo's rules

### Zip prompt (`prompts/QWEN_EXECUTE_CLOUD_VILLAGE.md`, original): REJECT
| Prompt text | Rule it breaks |
|---|---|
| "integrate one playable level into the existing T290 Cloud Dragon Chase" | Chase is endless and stateless (`rowSpecInto(seed, r)`, ADR 0010 C1). Non-goals: no multi-level content, no fourth mode. |
| "Integrated level selection/loading path ... how to add another level" | Non-goal: no level select (lean-scope item 4, PRODUCT.md). |
| "ancient fantasy village floating above a sea of clouds" | Product Purpose: Newari-themed Kathmandu hillside at golden hour. |
| "East Asian-inspired pagodas, temples, ... gates, bridges and lanterns" | art-style-guide line 13 rejects East-Asian roofs; target is Newari two-tier red-orange terracotta pagodas with white walls. The sheets show Chinese curled jade roofs, a torii-like gate, and European chimney cottages. |
| "jade/teal roof accents", glowing gold lanterns and gold orbs | Three-colour language (Principle 3): gold = interactive only. Decorative gold reads as hookable; jade/teal is outside the palette (roofs `#b5441c` family). |
| "foreground gameplay platforms/bridges ... platform/collision geometry, collectible/obstacle positions" | Chase collision is 6 ring slots x `SLOT_SOLIDS = 21`, arrays never change length (ADR 0010 C1); rows 0-3 must equal the L1 opening (`tests/content/chaseL1.test.ts`). Scoring is fixed (C3); there are no collectibles. Any of this touches `src/core`. |
| "distant parallax cloud/mountain layers", "parallax responds correctly to camera" | 2D side-scroller concept. The game is a 3D perspective third-person camera; depth parallax is free. Layered haze hills already exist. Extra full-screen alpha layers cost fill rate and texture budget. |
| "Export optimized WebP/PNG ... building sprites ... layered backgrounds", "Preload assets before gameplay" | Texture budget ~150 KB added max: `public/assets/textures` is already ~133 KB on disk plus the accepted dragon overage. No asset-loading stage (lean-scope item 4). Houses are procedural instanced kit pieces, not billboards. |
| "generate a replacement only if image-generation capability is available" | Uncontrolled generation; art-style-guide requires model and licence recorded before shipping. |
| "portrait 2.5D cloud-dragon chase", "avoid per-frame DOM/React updates" | Half-true: only the dragon is 2.5D sprites; the game is 3D, landscape and portrait. There is no React. Shows the prompt was written without the repo. |

### PR #4 prompt: FIX
Better: it makes `docs/art-style-guide.md` authoritative, calls the sheets loose exploration, and
forbids flattening sheets. Still wrong:
1. **"one additional level concept/implementation" / Deliverables "One new level in the
   established data/generator format"** and, in the T290 branch, "Build a separate level/art
   family". Non-goal. Must go.
2. **False premise of a mode conflict.** It asks Qwen to "determine whether T290 is active". It is
   settled: `src/app/modes/mode.ts` ships `'classic' | 'chase' | 'strategy'`, ADR 0010 is accepted,
   T290/T290b are live Chase-mode tasks. Leaving this for a Flash model to infer is the biggest
   hallucination risk in the brief. State it.
3. "Build a coherent set of reusable Newari-style house variations ..." duplicates the existing kit
   (`decor/kit.ts`, `dressHouses()`); the only open kit gap is item 5 (reusable two-tier pagoda roof
   piece).
4. "Do not break ... level progression": no level progression exists (hallucinated).
5. No numbers: missing stock-materials-only, no hand-written shaders (post passes Medium/High only),
   no GLB, texture cap, bundle 600 KB gz / initial chunk 215 KB gz (ADR 0009), draw-call budgets,
   three-colour language.
6. Source path `assets-src/cloud-village-concept/` vs the zip's `assets/source/`; both would add
   7.2 MB of PNG to git.
7. New top-level `prompts/` and `skills/` dirs; this repo keeps briefs in `docs/briefs/`.

## 3. Required changes before a junior executes anything

Do not run either prompt. Replace it with a scoped brief at `docs/briefs/T290c-chase-cloud-village-backdrop.md`
(or fold into T290b). Exact content to require:

```
Mission: read PRODUCT.md first. This is decoration for Dragon Chase only (mode 'chase').
Modes are settled: classic, chase, strategy (src/app/modes/mode.ts). Do NOT add a level,
a mode, a level select, collectibles, platforms, bridges or any collision.

Scope (allowlist): src/adapters/render/chase/** and its tests. Do NOT edit src/core/**,
content/levels/**, tools/genLevel.mjs, src/app/modes/**.

Goal: under the dragon cloud, the chase rows' Newari houses dissolve into a golden-lit cloud
sea (T290b fog-absorb), plus a distant row of village silhouettes fading into haze.
- Mist: the T290b 128 px CanvasTexture radial gradient (generated at runtime, 0 bytes shipped).
- Houses: existing decor kit / chase row meshes only. Newari: red-orange terracotta roofs
  (#b5441c family), cream plaster, brick, dark timber. No East-Asian curled or jade roofs,
  no chimney cottages, no floating islands.
- Colour: gold is for interactive things only. No gold lanterns, glows or orbs in decoration.
  Cloud and mist stay cream/white/cool grey.
- Materials: stock three.js materials (Lambert/Basic/Sprite). No ShaderMaterial, no
  onBeforeCompile, no GLB, no new npm or Python dependencies.
- Budget: 0 KB new texture files unless the owner approves first. Draw calls within ADR 0009
  per tier; Low tier adds at most 1 call. No per-frame allocation.
- Concept sheets: mood reference only (docs/reference/, gitignored). Never load, crop or ship them.

Done when: pnpm lint, pnpm typecheck, pnpm test, pnpm build pass (report exact output);
tests/content/chaseL1.test.ts unchanged and green; a portrait and a landscape screenshot of
?mode=chase at the cloud edge are saved under art/shots/auto/ and listed in the report.
Stop and report (do not guess) if any step needs a file outside the allowlist.
Status label in the report: Processed / Engine-ready / Engine-verified, per the skill.
```

Also: route per sandbox rule 2 (one coherent multi-file render change: cursor or a Sonnet junior;
Flash only if long-spanning), ledger line before dispatch, controller runs the final gates.

## 4. Concept sheets: loose reference only

- Sheet 1 ("Cloud Dragon Chase / Building Sprtte Pack"): Chinese-style jade-roof pagodas, torii-like
  gate, gold lanterns, every building fused to its cloud base, beige gradient background, baked
  misspelled labels. Sheet 2: mostly European cottages with chimneys and blue slate roofs.
- Neither can be cut cleanly (no alpha, glowing gradient background, clouds painted into the
  buildings), the painterly style clashes with the stock-Lambert primitive look, and the architecture
  is off-brief. **Do not extract assets.** Do not commit them (7.2 MB); if kept, store them like the
  other references in gitignored `docs/reference/`.
- Legitimate use, Chase only, as mood: (a) T290b fog-absorb, building bases swallowed by a warm-lit
  cloud sea is exactly the look the sheets show; (b) a distant band of house silhouettes fading into
  sunset haze behind the chase rows, built from the existing kit plus fog; (c) cloud-puff lighting
  (warm top, cool grey underside) as a colour target for the dragon's cloud segments and mist cards.
  Nothing for Classic L1 or the Nagarkot run.

## 5. PR #4: FIX, do not merge as is

It changes no runtime code, so merging breaks nothing today, but it lands an execution brief that
tells an agent to build a non-goal (a new level) and a skill no agent can discover. Before merge:
1. Drop `prompts/QWEN_EXECUTE_CLOUD_VILLAGE.md`, or replace it with the scoped brief in section 3
   under `docs/briefs/`.
2. Drop `skills/game-asset-production-integration/` from the repo; land the restructured skill
   (section 1) user-level instead.
3. Rewrite `docs/asset-handoffs/cloud-village/README.md`: the mode "conflict" is resolved (three
   modes ship); the sheets are mood reference only, not to be added under `assets-src/`; next action
   is the scoped T290b/T290c brief.
Closing PR #4 and folding the useful notes into T290b is an equally good outcome.
