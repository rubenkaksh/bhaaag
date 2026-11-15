# Team workflow: lead + agents (2026-11-15)

Rule: the user talks to ONE lead (Opus). The lead delegates, reviews, and reports. Precedence
is unchanged: PRODUCT.md, then `docs/lean-scope.md`, then CLAUDE.md. Check every delegated
task against PRODUCT.md non-goals before dispatch.

## Roles

| Role | Model / effort | Does | Never |
| --- | --- | --- | --- |
| Lead | Opus 5.5, medium (high for design/ADR) | Plans, writes briefs, reviews, sends work back, reports to the user | Writes bulk code; reads agent transcripts |
| Builder | Sonnet, medium (high for hard bugs) | One task per brief, one owner per hot file | Touches files outside its brief; adds deps |
| Scout | Haiku, low | Codebase search, log digging; returns only the answer | Edits files |
| Fixer | Haiku, low | Mechanical work: renames, lint/type fixes, wiring approved assets | Design decisions |
| Reviewer | Sonnet, medium | Reads the diff, runs the gate, lists defects with file:line | Fixes what it reviews |

Effort guide: mechanical = low, normal = medium, tricky infra/sim bugs = high.
Do not switch model or effort mid-session (loses the prompt cache); start a fresh agent instead.

## Agent rules

1. **One job, then wipe.** An agent does one task, reports, and is discarded. The next task gets
   a fresh agent and a fresh brief. Never chain jobs in one agent (context cost grows per call).
2. **Brief format** (~2 KB): goal, files it may touch, files it must not touch, acceptance
   check (exact commands), PRODUCT.md/lean-scope constraints that apply, report path.
3. **Short reports.** First line, exactly one of:
   `STATUS: done | blocked | needs-review | brief-problem. lint/typecheck/test/build: pass|fail. Q: <question or none>`
   Details go to `docs/sessions/reports/<task-id>.md`. The lead opens it only if needed.
4. **Review loop.** Lead (or Reviewer) checks the diff against the acceptance check and
   `pnpm lint && pnpm typecheck && pnpm test && pnpm build`. Not good enough: send back with
   specific defects. Max 3 rounds, then the lead decides (rescope or take over).
5. **Parallel only when files are disjoint.** Each hot file has one owner per wave (see
   `docs/three-track-plan.md` section 5 for the ownership precedent). Use worktrees for parallel builders.
6. **Delegate cheap work down.** Search, grep-the-repo and log reading go to Scout. Only its answer returns.
7. **Verify, don't trust.** "Done" from an agent is a claim; the lead re-runs the gate before accepting.
8. **Visual review via contact sheet.** Never attach many screenshots or a clip. Run
   `node tools/shots*.mjs <tag>`, then `node tools/sheet.mjs art/shots/sheet.png <imgs...> --cols=3`
   and review that one image. Video: extract frames with ffmpeg, then sheet them.
9. **Unverifiable items stay flagged.** Real phone fps, iOS Safari, etc. go in the board as
   "user to verify"; never reported as done.

## Board and handoff (state lives in files, not chat)

- `docs/board.md`: one table, updated by the lead after every dispatch/report:
  `task | owner role | status | branch/worktree | waiting on | report path`.
- **Handoff trigger:** lead context reaches ~300k (or the user says so). Lead then:
  1. Brings `docs/board.md` fully up to date.
  2. Writes `docs/sessions/handoff-<date>.md`: done, in flight, waiting on user, not verified,
     lessons learned (template below).
  3. Ends the session. The next lead reads PRODUCT.md, CLAUDE.md, board, newest handoff, and continues.
- Existing precedent: `docs/sessions/handoff-2026-11-10.md`. Keep that shape.

Handoff template:

```
# Handoff <date>
Read PRODUCT.md first. Branch: <name>. Gates at handoff: <lint/type/test/build result>.
## Done   ## In flight (agent, task, state)   ## Waiting on user
## Not verified   ## Known gaps   ## Lessons (what to do differently)   ## Run
```

## Cost rules of thumb

Cost is roughly context size x number of calls. Keep the lead lean (no transcripts, no
full-size images), keep agents short-lived, keep briefs small, push grunt work to Haiku.

## Gaps vs the previous setup (what this adds)

- Fixed roles and effort levels (old docs named gamer-pro/hunter/cursor, now off or stale).
- Agent wipe-after-task, status-line reports, report files.
- Board file plus 300k handoff rule (old `session-state.md` was a stale 2026-11-05 log).
- Haiku scout for searching; contact sheets instead of screenshot piles.
- Rule against mid-session model/effort switches.
