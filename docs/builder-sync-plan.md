# Builder sync plan: haystack finish and the latest kit additions

Date: 2026-11-27. Author: architect seat (Opus, design only). Base: main@968a67a.
Owner ask (verbatim): "sync level builder with the latest additions. haystack is not seen yet in the
game. Let's add that as well. I want to be able to create awesome levels with the builder."
Evidence: Haiku inventory (scratchpad builder-inventory.md), spot-checked: compile.ts:563-659,
format.ts, dress.ts (builderHome passes `props: []`, `patches: []`), place.ts:462-493 and :618-639,
houseKit.ts emitProp, levels.ts, main.ts:80-231, core/sim.ts:469 (cushions are never lethal).

Mission check: no conflict. Builder levels may ship (PRODUCT.md amendment 2026-11-17); the builder and
its compile/dress code are lazy chunks, so the initial-chunk budget (<= 255,000 B gz, ~1.5 KB headroom)
is untouched if nothing new is imported from `levels.ts`/lobby. Hay is cream (safe), lethal ground stays
terracotta: the colour language holds. No camera change, no new dependency.

## 1. End state the owner judges

- In `?builder`, the Level panel has "Finish: Haystack | Roof". New levels default to Haystack: a cream
  hay square drawn on a ground patch just downhill of the goal house; Check flags a blocked finish.
- Houses show their archetype in 2D (verandah posts, gable ridge, stepped pair, balcony side, party walls),
  so the canvas looks like the level you will play, not grey squares.
- A Props tool places crate, box pile, hay and shed on the hillside; each sits on a small cream ground patch.
- Play opens (and reuses) one game tab; the level ends when the hero drops off the goal roof into the hay.
- On the phone (390x844 and 844x390, Low and High): a builder level shipped in `content/builders/` or
  flagged "Show in lobby" is in the Classic row, and its haystack is visible and ends the run.

## 2. Decisions (one recommendation each)

(a) Haystack = a goal type, not a free prop. Add `finish?: 'roof' | 'hay'` to the level schema
(format.ts). Absent = 'roof' (today's behaviour), so every existing `.builder.json`, draft and library
entry loads unchanged: no version bump, no migration (zod strips unknown keys, so an older build reading a
new file falls back to the roof finish). The builder writes `finish: 'hay'` for new levels and the sample.
Compile (compile.ts) with 'hay', mirroring place.ts:462-493 and :618-639 without editing place.ts (graph
freeze tests): goal house G, patch rect x G.x±4, z from G.z-4-5 to G.z-4, y = planeY(patch z0); hay at
(G.x, G.z-4-1.6) on that y via the existing pure `emitProp({kind:'hay'})` (solid STYLE_PROP + cushion slab
at y+hayTop); patch collider = style-0 slab y-1..y (as place.ts:622-625); builder hazard strips whose
z-range meets the patch get top = min(top, y-0.5) (as place.ts:637); goal box = hay ±1.2 x/z,
y+hayTop-0.5 .. y+hayTop+3 (place.ts:666-669). G loses its roof cushion and roof goal box.
Validate adds two errors: "haystack needs an open downhill side" (G touches a house on -z) and
"haystack patch overlaps house N". Put the geometry in one pure helper `hayFinish(level)` in
`src/content/builder/hayFinish.ts`, used by compile.ts and dress.ts, so collider and visuals never drift.
dress.ts: `props: [hay]`, `patches: [patch]`, and face 3 of G marked used (no guard rail there).
A free-standing hay prop comes with slice 4 (props), not as the finish.

(b) Expose, in value order: 1 haystack finish; 2 archetype shapes in the 2D canvas (C1 verandah, C2 pair
with eaves, C3 gable/clay all already come from the archetype dropdown; no per-feature toggles, they
would fight the presets and validateHouse); 3 props crate/boxPile/hay/shed; 4 a per-level "Parkour moves"
toggle (emits `parkour: 1`, the flag Hay Run uses). Do NOT expose now: ladders (render-only, not
climbable: a fake affordance), decoys (any unlinked house already is one; Check lists dead ends), a
look/texture picker (only one look, `home`, exists; clay/straw/tin follow the archetype and prop),
pitched-roof JSON (C3 covers it), path camera and tilt assist (camera rule: owner question 3).

(c) Preview: 2D from the pure kit (`specOf` -> HouseSpec, archetypes.ts, houseSpec.ts helpers), drawn
on the existing canvas. No three in the builder chunk, nothing for the Low tier to pay (the builder is an
authoring screen; tiers only apply to Play). Lazy 3D via createGameScene is rejected for now: a second
WebGL context next to the game tab, editor/scene sync for every edit, and a camera to design (camera
rule). Play stays the 3D check.

(d) Test-play stays a new tab, but a named one: `window.open(url, 'bhaaag-play')` so repeated Play
reloads the same tab instead of piling tabs. In-page play is rejected: main.ts owns game and lobby
singletons; tearing the builder down and remounting is a larger, riskier change for little gain.

(e) Visibility: keep `SHOW_LEGACY_LEVELS = false`. List shipped builder levels (`content/builders/*.builder.json`,
today empty) in the default row like Hay Run and library levels, so a level the owner commits reaches the
phone without flipping the legacy flag. Library "Show in lobby" stays as is (device-local by nature:
localStorage). Library play recompiles from the saved source when present (main.ts:106-117), so compile
fixes reach old saves. Hay Run needs nothing: it is in the row on main (f742e56); whether the live
gh-pages build shows it is not verified (slice 0).

## 3. Slices (each shippable alone, in order)

Slice 0, verify Hay Run on the live URL (controller, no code)
- Load https://rubenkaksh.github.io/bhaaag/ and check the Classic row lists Hay Run; if gh-pages is older
  than 968a67a, push gh-pages (manual push, owner decision 2026-11-17c, ask before pushing).
- done_when: screenshot of the live lobby showing "Hay Run". Engine: controller.

Slice 1, haystack finish (visible in game soonest)
- Files: src/content/builder/format.ts (`finish` optional enum), new src/content/builder/hayFinish.ts,
  compile.ts (buildNodeSet: goal cushion only when finish is 'roof'; compileLevel: hay solid, cushion,
  patch slab, hazard lowering, hay goal box; validate: two new errors), src/adapters/builder/dress.ts
  (hay prop, patch, open face 3), src/adapters/builder/builderPage.ts (Finish select in Level panel; draw
  the patch and hay square; `emptyLevel` callers set 'hay'), sample.ts (finish 'hay'),
  tests/content/builderCompile.test.ts, tests/content/builderDress.test.ts.
- API: `BuilderLevel.finish?: 'roof'|'hay'`; `hayFinish(l): { patch, hay: PropSpec, goal: Box } | null`.
- done_when: `pnpm test` green with new cases: (1) a v1 file without `finish` compiles byte-identical to
  today (snapshot of the sample with finish removed); (2) finish 'hay': exactly one cushion at hayTop in
  the goal box, no hazard box top above patch.y-0.5 inside the patch z-range, goal roof has no cushion;
  (3) a sim run that walks off G's downhill edge reaches the goal (pattern of tests/content/hayRun.test.ts),
  with G = 2 storeys + lift 12 (worst drop); (4) builderHome returns one hay prop and one patch. Visible:
  `?builder` -> Sample -> Play shows the haystack below the goal house. Engine: Sonnet (multi-file,
  geometry spec above is exact; not premium).

Slice 2, named play tab
- Files: builderPage.ts:604 only. done_when: clicking Play twice leaves one game tab (manual check).
  Engine: hunter.

Slice 3, archetype shapes in the 2D canvas
- Files: builderPage.ts draw() (:264-429), new src/adapters/builder/preview2d.ts (pure canvas drawing
  from `specOf(h, houses)`; no three import). No schema change.
- done_when: `?builder` -> "Kit sample" screenshot shows C1 posts, C3 ridge line, C2 pair step, balcony
  side and party walls distinct from plain boxes; `pnpm lint` passes (no three in builder files).
  Engine: cursor (one coherent change).

Slice 4, props tool
- Files: format.ts (`props?: {id, kind: 'crate'|'boxPile'|'hay'|'shed', x, z}[]`, unique ids, optional),
  model.ts (add/move/remove prop, history), compile.ts (emitProp per prop, groundY = planeY(z); one patch
  per prop, footprint + 1.5 m; hazard lowering as slice 1; validate: prop or patch overlapping a house or
  the finish patch is an error; Check notes "props are not route-checked"), hayFinish.ts (share the patch
  helper), dress.ts (props and patches), builderPage.ts (Props tool with kind picker, drag, delete, icons).
- done_when: tests: props round-trip parse/serialize, compiled level has one STYLE_PROP solid per prop and
  one cushion per boxPile/hay, file without `props` compiles unchanged. Visible: a crate and a box pile
  placed in `?builder` appear in Play. Engine: Sonnet for schema/compile/dress, then cursor for the UI.

Slice 5, parkour toggle
- Files: format.ts (`parkour?: boolean`), compile.ts (`parkour: 1` when set), builderPage.ts (checkbox).
- done_when: test: toggle on emits `parkour: 1`, absent emits nothing; Play shows auto-vault/mantle on a
  builder level. Engine: hunter. Blocked on owner question 2.

Slice 6, visibility
- Files: src/app/modes/levels.ts (shipped builders in the default row), src/app/main.ts (library: compile
  from source when it parses), tests/app/levels.test.ts.
- done_when: test: with the flag off, a shipped meta entry appears after Hay Run; initial-chunk gzip sum
  (PRODUCT.md 17g method) stays <= 255,000 B. Engine: hunter.

Premium share of the build: 0 slices (this plan is the premium part).

## 4. Risks

- Portability: hayFinish.ts, format.ts and compile.ts stay pure (no three, no DOM); src/core is not touched
  at all. preview2d.ts is DOM-only, no three. `pnpm lint` enforces the core rule.
- Old saves: every new field is optional with the old behaviour as default; slice 1 test (1) pins that
  existing files compile unchanged. Library entries store a compiled level; slice 6 recompiles from source.
  A file saved with `finish: 'hay'` and opened by an older deployed build silently plays the roof finish.
- Validation drift: removing the goal-roof cushion for 'hay' can make a high drop onto the goal roof
  fatal; Check reports it (correct), but some old drafts switched to Haystack may show a new error.
- Hazard lowering spans the full strip width, as in place.ts: a few metres of ground beside the patch are
  half a metre lower and still lethal. Accepted (same as Hay Run).
- Low tier: hay on Low is the cream body without straw bands (graphicsTier hides decor_homeStraw); per prop
  one solid and one kit mesh. Many props could cost draw calls on Low; no cap is planned, watch slice 4.
- Bundle: all new code sits in builder/compile/dress lazy chunks; only slice 6 edits levels.ts (initial
  chunk) and must stay within the ~1.5 KB headroom.
- Camera: untouched; builder levels keep `pathCam: null`.
- Not verified on device: everything. Playwright swiftshader is not a device test. Each slice that changes
  Play needs the phone test (vite preview --host 0.0.0.0 --port 4174, QR PNG, 390x844 and 844x390, Low
  and High) and a "not verified on device" line until the owner checks.

## 5. Open questions (owner)

1. Default finish for new builder levels? (a) Haystack, roof still selectable [pick]; (b) Roof, Haystack
   opt-in; (c) Haystack only, drop the roof finish for new levels.
2. Parkour moves (auto-vault, mantle, slide) in builder levels? (a) per-level toggle, off by default
   [pick]; (b) always on, like Hay Run; (c) never, builder levels stay fixed-line strategy.
3. Hay Run's path camera / tilt assist for builder levels (camera rule)? (a) no, keep today's camera
   [pick]; (b) per-level toggle, default off; (c) always on.
