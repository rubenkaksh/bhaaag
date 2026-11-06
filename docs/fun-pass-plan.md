# Fun pass plan (2026-11-06)

Goal: turn L1 from a working tech demo into a run people replay. Scope rules come from `docs/lean-scope.md`: one level, under 2 minutes, no validator, no assist ladder.

## Where the game stands

Measured with a scratch bot on the current `l1.json`, firing at six different distances from the roof edge, aiming perfectly and never releasing, braking or jumping. This shows what the rules reward. It does not show how the game feels to a person.

| Measure | Result | What it means |
| ---|---|--- |
| Full run | 24.2-26.4 s across all fire timings | Only 2.2 s separates best from worst, so a medal has little to measure |
| Fastest line | Fire as soon as possible; a run-up to the edge is slower | Running to the roof edge costs time and earns nothing |
| Rope top speed | 13.9-14.1 m/s on every hop | Launch speed barely changes the ride |
| Landings | Clean on all 7 hops, every timing | No hop needs a brake, release or roll |
| Hops | 7 near-identical: 26 m apart, 9.5 m drop, x alternating ±5 m | No hop stands out from the others |

From reading the code:

- **Hook delay:** at `hookSpeed` 150, a 30 m shot takes about 0.2 s to attach.
- **Aim:** `routeAssistDeg` 16 steers shots toward the route anchor (`src/core/hook.ts:252`), so aim rarely decides anything.
- **Route data:** `route` is one linear list, so the level cannot hold a fork.
- **Reticle:** it has two states only. The green/yellow/red preview from plan section 4.1 was never built.
- **Already in place:** camera kicks and shake (`cameraFx.ts`), the animation event bus (`animEvents.ts`), the best-time save, the timer and 0.3/0.8 s restart.
- **Missing:** audio (`src/adapters/audio/` is empty), medals, checkpoints.

## Priority order

Your order is kept, with two changes:

- **Four core sounds move into phase 1.** A silent attach cannot feel satisfying.
- **Goal comes before the rest of juice.** Medal times need the final level, and polish should go on final geometry.

### 0. Protect the work (under 1 hour)

Needs your go-ahead, since commits are on your word.

- Commit everything. The whole project is currently untracked with no commits, so one bad command could lose it.
- Move the scratch probe into `tests/content/lines.test.ts`. It reports run time and top speed for a casual line and an expert line. Every later phase is gated on it.

**Engine:** controller.

### 1. Game feel (2-3 days)

| # | Change | Files | Done when |
| ---|---|---|--- |
| 1.1 | Faster attach: raise `hookSpeed` to about 300, and show the fire pose and sound on the press frame | `tuning.json`, `game.ts` | 30 m shot attaches in 0.1 s or less |
| 1.2 | Speed carries between hops: landing at speed and firing inside the 0.4 s chain window seeds the next rope. Raise `carryCap` from 8 to about 12 | `sim.ts`, `tuning.json` | A chained hop is at least 0.4 s faster than a standing hop |
| 1.3 | Run-up pays: firing at a full run from the edge beats firing early from a standstill | `sim.ts` | Probe shows the run-up line is faster |
| 1.4 | Timed release: JUMP in the last part of the rope gives a speed boost, with a clear cue | `sim.ts`, `tuning.json` | Expert line is at least 15% faster than casual line |
| 1.5 | Attach and swing feel: body swing spring on attach, stronger on long ropes; tune against the kicks already in `cameraFx.ts` | `heroPose.ts`, `cameraFx.ts` | You sign off in the browser |
| 1.6 | Four core sounds: fire, attach, land, die, driven from the event bus | `src/adapters/audio/` | Audible on desktop and iPhone after first tap |

Each sim change gets a Vitest test. All tuning values go in `tuning.json`, `config.ts` and the strict schema test together.

**Engine:** Sonnet for `sim.ts` rules, hunter for single-file work, you for the feel sign-off.

### 2. Readable route (1-2 days)

Built before the new level, because authoring depends on it.

| # | Change | Done when |
| ---|---|--- |
| 2.1 | Aim preview: gold line to the target, colour from a real sim of the ride (safe, needs a release, lethal), plus a landing marker. Same code as `step`, 15 Hz | Colour matches the outcome in table tests |
| 2.2 | Runner's vision: only the next anchor and its pad pulse. Check the current `waypointView.ts` against this | Next target is visible from every roof in a screenshot pass |
| 2.3 | Reticle reasons: "Too flat", "Out of range", "Line blocked" | Each reason has a test |
| 2.4 | Reduce `routeAssistDeg` so aim matters, and exempt the first two hops | Casual bot still clears hops 1-2 at 90% or better |

**Engine:** Sonnet for 2.1, hunter for the rest.

### 3. Level design (3-4 days)

Replaces the staircase with about 45 s of authored beats, all in `tools/genLevel.mjs`.

| Beat | Moment | Skill it asks for |
| ---|---|--- |
| 1 | Two easy hops | Hook and land, no pressure |
| 2 | Risky gap: rope ends short of the far roof | Release at the right moment |
| 3 | Long crossing over the lanes, about 34 m | Brake, or hit the wall above `vCling` |
| 4 | Fork: safe two-hop route or one risky fast line | Choosing a line, the medal decision |
| 5 | Rope-per-roof set piece (see decisions) | To be decided |
| 6 | Existing leap of faith into the haystack | Finish |

- `route` becomes a small graph so beat 4 can fork.
- Add checkpoints at beats 2 and 4. Death restarts there and the timer keeps running, so deaths cost time (plan section 4.9). Hold-R restarts the run.
- **Knock-on work:** `humanlike.test.ts` hard-codes solid indices and needs a rewrite. `placeDecor.ts` needs checking against the new layout. The gate moves to: expert bot finishes every time, casual bot clears beat 1 at 90% and finishes at 30% or better.

**Engine:** Sonnet for the graph and checkpoints, Opus only if a beat's design stays open, you for play-testing since lean scope hand-checks the level.

### 4. Goal and progression (1 day)

- Gold, silver and bronze times in the level JSON, set from probe results on the final level.
- Win card shows medal, time, deaths and the gap to the next medal.
- One key or tap to retry from the win card. The death restart is already done.
- Save medal and deaths beside the best time; show the medal in the lobby.

**Engine:** hunter, one file at a time.

### 5. Remaining juice (2 days)

- **Sound:** wind and trolley loops with pitch and gain following speed, plus a medal sting. No music, which the plan leaves for later.
- **Effects:** trolley sparks, speed lines at high speed, a brief hit-stop on a hard landing.
- **Limits:** stock materials only, 5 additive meshes (ADR 0006), about 600 KB gzipped.
- **Check on a real phone** before calling it done.

**Engine:** hunter per file, Sonnet for review.

## Decisions for you

1. **Is "swing" a real pendulum?** The locked rule says the rope is a straight line with visual sag only. So the current game can slide, not swing. Lean scope dropped the Godot port and validator, which were the main reasons for that rule. **Recommendation: keep the straight rope for phase 1, then add one pendulum anchor type for the lanes crossing (beat 3) if the feel gate passes.** It would be a small addition, about 100 lines in core plus tests, and CLAUDE.md would need updating.
2. **What is rope-per-roof?** The only record is one line in `docs/sessions/2026-11-06.md` saying it needs a brainstorm with you; no spec exists. Possible meanings:
   - You carry one rope shot per roof, so a miss forces a fall or a retry.
   - Each roof has one fixed, already-rigged line to choose.
   - Ropes stay behind and can be reused on a checkpoint restart.

   This only blocks beat 5, and the level works without it. **Recommendation: a short session with you before phase 3.**

3. **Which audio approach?** The project rule is to ask before adding dependencies. **Recommendation: plain Web Audio with no dependency**, using generated sounds and a filtered noise loop for wind. If the generated sounds come out thin, add ZzFX (MIT, under 1 KB compressed, no dependencies, pushed this month), which also plays looped sounds at a set rate. Howler (MIT, about 7 KB gzipped per its README) would do the job, but its last push was November 2025, outside the 6-month maintenance filter, and it has 420 open issues and pull requests. Tone.js (MIT, 5.4 MB unpacked, two dependencies) is a music toolkit and far more than this needs.

## Known risks and cleanup

- **Stale instructions:** `CLAUDE.md` still requires Godot-portable rules and a validator, which `lean-scope.md` dropped. It should be aligned.
- **Faster ropes can break landings:** a higher speed moves the `vyRoll`, `vhStumble` and `vCling` margins, so retune them in 1.2-1.4.
- **No live link yet:** the Cloudflare secrets are still your to-do, and sharing a playtest needs them.
- **Time estimates are rough**, based on the code read, not on past delivery speed.
