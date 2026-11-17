# ADR 0017: Mode registry (plug-in game modes)

Date: 2026-11-17. Status: accepted (owner decision 2026-11-17b, queue T341). Builds on ADR 0016
(two modes). Implements PRODUCT.md Amendment 2026-11-17b: modes stay flexible, hidden not deleted.

## Decision

A mode is one `GameModeDef` in `src/app/modes/registry.ts` plus one line in `MODE_DEFS`:

| field | meaning |
|---|---|
| `id` | lobby mode id (`classic`, `chase`); also the saved-choice and `?mode=` value |
| `label` | lobby button text |
| `enabled` | `false` hides the mode from the lobby only; `?mode=` and saved choices still resolve |
| `levels(hasLocalBuilder)` | the mode's level row (empty = none) |
| `bestKey(key)` | storage key of the best value; the `bhagdori.best.*` strings are unchanged |
| `playKey(sel, levels)` | maps (mode, level) to the internal play key |
| `rules` | pure `ModeRules` |

`ModeRules.onFinish(value, prevBest) -> { best, record }` is the pure scoring seam: seconds for timed
modes (lower wins, 0 = none yet; `TIMED_RULES`, Classic), points for score modes (higher wins;
`SCORE_RULES`, Dragon Chase). `game.ts` calls it at the win and at chase game-over instead of
inlining the comparisons. No canvas, three or DOM, so a mode's rules are unit-tested over plain
numbers (`tests/app/registry.test.ts`, with a fake 20-line mode).

## Unchanged on purpose

- The union `GameMode` (`mode.ts`) stays the internal play key; `MODE_OVERRIDES` in `src/app/tuning.ts`
  is not touched (T341 does not edit it). A new mode that needs its own tuning adds its own key there
  separately.
- `levels.ts` stays the level data source; `Mode` there is now a plain string, valid ids come from
  `MODE_IDS`. `loadSelection` takes them as an optional 4th argument (default Classic and Chase).
- `MODE_INFO` lost its `label` (labels live in the registry and the level list); hint and hop chip stay.
- No behaviour change: same lobby, same keys, same win and game-over logic.

## Known limits

`defOf` resolves a play key to a def by id (a mode whose play key equals its id, like `chase`);
every other key is Classic's. A new mode with several play keys needs its own lookup.
Initial chunk: baseline 264,521 B gz (T333); this card adds about 100 B (see PR); T345 (lazy load) is
the card that shrinks it.
