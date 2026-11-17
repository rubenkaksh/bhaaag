# How to add a mode

A mode is one `GameModeDef` plus one registry line (ADR 0017).

1. In `src/app/modes/registry.ts` write the def:
   ```ts
   const sprintRun: GameModeDef = {
     id: 'sprint-run',
     label: 'Sprint Run',
     enabled: true, // false = hidden in the lobby, ?mode=sprint-run still works
     levels: () => [],
     bestKey: (key) => BEST_KEYS[key],
     playKey: () => 'classic', // the internal GameMode that picks tuning and HUD flags
     rules: TIMED_RULES, // or SCORE_RULES, or your own ModeRules
   };
   ```
2. Add it to `MODE_DEFS` (one line). The lobby button, `?mode=` parsing and saved choice follow.
3. Rules: `onFinish(value, prevBest)` returns `{ best, record }`; keep it pure (numbers in, numbers
   out). Test it like `tests/app/registry.test.ts` does, no canvas.
4. Best storage: reuse an existing `BEST_KEYS` string, or add a new `bhagdori.best.<name>` to
   `BEST_KEYS` in `mode.ts` (never rename an existing one).
5. If the mode needs a new internal play key, add it to the `GameMode` union in `mode.ts`, to
   `MODE_INFO` and to `MODE_OVERRIDES` in `src/app/tuning.ts` (document in `docs/config-scope.md`).
6. To hide a mode later, set `enabled: false`; do not delete it.
