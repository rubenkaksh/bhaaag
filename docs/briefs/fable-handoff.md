# Handoff: Fable 5.2 verdict on the strategy generator (premium seat, capped)

Mission: read `PRODUCT.md` first (strategy pivot: `docs/lean-scope.md`, amendment 2026-11-10b). Bound by rulebook `sessions.md`, "Premium seats are not a toy".

Ledger line (write it first): `premium: Fable 5.2 owns: final verdict on the generator + any design-level fix in gen.ts/graph.ts/ADR 0012; handed down: tests, gates, lint/type fixes, merges, wiring, screenshots, perf (Sonnet/Haiku); cap: 60 own tool calls, 6 delegates`.

First action: state your model id. If it is not `claude-fable-5-2`, stop.

## Where the work is
- Worktree: `/Users/rubenk/projects/sandbox/workspaces/bhagdori/.claude/worktrees/integration-strategy-demo`, branch `integration-strategy-demo` (HEAD c9c3ece). Do not push. One writer per file.
- Your earlier commit 90c933c (generator + `docs/adr/0012-strategy-level-gen.md`) is inside it. Merged on top: touch controls, camera (behind-the-hero downhill view, no view control), zip diagonal yaw 45 deg, trampoline air steer (`tramp.airSteer` 12, `tramp.airSteerCap` 6, `bounceAir` in `HeroState`).
- Live preview (served from that worktree's dist): http://192.168.1.105:4173/?mode=strategy

## Decided (do not reopen)
- Camera: fixed view BEHIND the hero looking downhill, pans left/right to keep the hero centred. No player view control. Only automatic change: diagonal zipline NE/NW turns yaw 45 deg for the zipline's duration, then eases back.
- Ziplines fixed: fire only from a line-house zone at a fixed anchor (ADR 0011). Trampolines never turn the camera; left stick steers in the air so the player can land on a cushion.
- Controls: left stick all modes incl. portrait, one right button, double tap hook, triple tap drop, hold climb.

## What you own (the only things you do yourself)
1. Read only: `docs/adr/0011-strategy-maze-core.md`, `docs/adr/0012-strategy-level-gen.md`, `src/content/strategy/gen.ts`, `src/content/strategy/graph.ts`, plus `tuning.json` strategy/tramp keys. No other reading.
2. Verdict SHIP or FIX on: ~100 houses, Nagarkot ridge to Bhaktapur, dead ends, 1/2/n escape routes (`hasEscape` BFS), every edge reachable by the real sim rules (zip, tramp, cushion, climb, drop), tramp air steer now widens reach: does ADR 0012's reach table need updating?
3. Design-level fixes only, yourself. Everything else goes to a delegate.

## Known open items to delegate (not yours)
- Lint: 2 errors in `gen.ts` (Sonnet).
- Test failing: `strategyView.test.ts` terrain extent, also failing on the base (Sonnet).
- Dropped tests `tests/content/strategyLevel.test.ts` / `strategyDiag.test.ts` (failed typecheck: `edges` missing on `StrategyLevel`): restore as proper determinism, `hasEscape`, dead-end count and edge-reach tests (Sonnet).
- Wrong on-screen hint in strategy mode ("Aim at a glowing anchor and hook"): should say stand on a line pad (Haiku).
- Walk-through check in strategy mode (run, climb, zip, bounce, sideways camera tracking, 390x844 and 844x390) via `tools/shots-strategy.mjs`, perf via `tools/perf.mjs` vs ADR 0009 (Sonnet).

## Limits
60 own tool calls (Agent calls count), max 6 delegates (Sonnet/Haiku only, never Opus/Fable), you run no gates, no Bash except git diff/log. Delegate prompts carry: the PRODUCT.md pointer, "use rtk proxies; vitest: `pnpm exec vitest run --exclude '.claude/**'`", exact files, done definition, "summary under 100 words". Final report under 150 words: verdict, numbers, delegate results as reported, what nobody checked (real phone, feel).
