# Brief for Fable 5.2: the 100-house Nagarkot to Bhaktapur generator (premium seat, capped, delegating)

Mission: read `PRODUCT.md` first (the strategy pivot is recorded in `docs/lean-scope.md`, amendment 2026-11-10b). Bound by the rulebook skill, `sessions.md`, "Premium seats are not a toy".

Ledger line: `premium: Fable 5.2 owns: level-graph design + generator algorithm + final verdict; delegates (Sonnet/Haiku, chosen by Fable): tests, gates, merges, wiring, screenshots, perf, any reading beyond 6 files; cap: 60 own tool calls (Agent calls count)`.

First action: state your model id. If it is not `claude-fable-5-2`, stop.

## Where to work
Existing worktree `/Users/rubenk/projects/sandbox/workspaces/bhagdori/.claude/worktrees/agent-ae84e8d73076b701b`, branch `worktree-agent-ae84e8d73076b701b`. Commit on that branch only. No push. No other writer is in it, except the delegates you start (one writer per file at a time).

## What you own (the only things you do yourself)
1. **Design the level.** Read only: `docs/adr/0011-strategy-maze-core.md`, `docs/strategy-tracks.md`, `src/content/strategy/gen.ts` (stub, final signature `generateStrategyLevel`, seed `STRATEGY_SEED`), `src/core/world.ts`, `src/content/load.ts`, and the rule parts of `src/core/sim.ts` you need for reach limits (jump, mantle, climb, trampoline, cushion, line-house, in metres).
2. **Write the generator** in `src/content/strategy/` : deterministic, seeded graph of about 100 houses from Nagarkot ridge to Bhaktapur. Segments: ridge, hillside houses, road turnings you can run along, Bhaktapur town. Every edge traversable by the real sim rules (reach limits from `config`, no magic numbers). Dead ends, and the escape-path structure ADR 0011 asks for (1, 2 or n routes, at least one guaranteed). Line-houses for ziplines, trampolines and cushions as safety and as decision points. Readable choice: gold interactive, cream safe, terracotta danger. Export the pure BFS `hasEscape(graph)`.
3. **Design note**: tradeoffs and tuning numbers, in `docs/adr/0012-strategy-level-gen.md`.
4. **Final verdict** on what your delegates produced: SHIP or FIX with exact items. Design-level fixes you make yourself; everything else goes back to a delegate.

## Delegation is expected, and is how you stay productive
You may start subagents with the Agent tool (`model: "sonnet"` for multi-file or anything needing judgement, `model: "haiku"` for single-file mechanical edits and file checks; use `subagent_type: general-purpose`). You decide what to delegate; the rule is: if a task is not one of items 1 to 4, delegate it. Never do these yourself: lint, typecheck, test, build, vitest, Playwright, perf scripts, screenshots, git merges, wiring into game.ts or UI, renderer code, writing tests for decided rules, fixing lint or type errors, reading more than the files in item 1.
Every delegate prompt must contain: the mission pointer (`PRODUCT.md`), "in Bash use `rtk` proxies (rtk read/grep/find/ls/git/diff, `rtk test`), vitest picks up .claude/worktrees so exclude it with `pnpm exec vitest run --exclude '.claude/**'`", the exact files it may touch, what done looks like, and "return a summary under 100 words, never raw output". Run independent delegates in parallel when they touch different files.
Delegates the work should use, as you see fit: (a) tests: determinism, `hasEscape` true, dead-end count in range, every edge within sim reach; (b) gates: lint, typecheck, test, build; (c) merge branch `worktree-agent-af14f96e79ccc39f2` (controls) into your branch; (d) wire the `strategy` mode so the generated level loads, check ADR 0011 hooks; (e) screenshots at 390x844 and 844x390 via `tools/shots-strategy.mjs` and perf via `tools/perf.mjs` against ADR 0009 budgets.

## Limits
- 60 own tool calls, counting Agent calls. At the cap, commit and report.
- You do not run gates, even "just once". A delegate does and reports.
- Do not spawn Opus or Fable agents. Do not spawn more than 6 delegates in total.
- Final report under 150 words: what you decided, the numbers, gate results as your delegates reported them, what nobody checked (real phone, feel), and the delegate count.
