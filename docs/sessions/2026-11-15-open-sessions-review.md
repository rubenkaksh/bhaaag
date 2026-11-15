# 2026-11-15 Open sessions sync review (verdicts only)

Owner ask: "sync every working tree into main, by everything I mean all other open sessions as well."
Bhaaag PRs #15/#16 were already merged and deployed before this review.

- Inventory: 6 Haiku Explore agents, read-only. Most ran no `git fetch`, so ahead/behind is against the last-fetched origin refs and may be stale. The controller re-checks with a fresh `git fetch` before acting.
- Verdicts: Opus. No gates, merges, pushes or deletes were run. This file is uncommitted.
- Verdict key: **MERGE** = safe now, after the check listed. **MERGE-AFTER-FIX** = do the fix first. **PARK** = leave it as is, the owner decides. **DROP** = nothing unique, or noise; safe to remove after the check listed.
- "Merged" for a branch means its commits are ancestors of, or patch-equivalent to, the default branch.

## Cross-cutting findings (read first)

1. **bhagdori: worktrees are tracked as gitlinks.** Git status shows `.claude/worktrees/agent-a0a6…` as deleted and `agent-ae84…` as modified, so worktree dirs got committed as gitlinks at some point. Fix: `git rm --cached` those entries on a branch and add `.claude/worktrees/` to `.gitignore`. Do this before any `git add -A` in bhagdori.
2. **bhagdori `art/` is 348 MB (549 files), untracked.** Never commit it to git. That would break Principle 5 (light repo/load) and make every clone huge. Owner decision: gitignore it, move it out of the repo, or use LFS/external storage.
3. **The sandbox root repo has no remote.** Its 9-commit branch and all its tooling (queue yamls, budget, CLAUDE.md) have no backup at all. Its `workspaces/` folder: one agent saw it as untracked (`?? workspaces/`), another found `workspaces/*/` in `.gitignore`. Verify before any `git add -A`, because 21 nested repos could get swept in.
4. **`workspaces/tv` is not a git repo** and is ignored by the sandbox repo. Any work there is unversioned and unbacked.
5. **Two clones of `rubenkaksh/commons`:** `sandbox/workspaces/commons` and `infra/commons`. Merge order matters; pick one as canonical.
6. **Rule 7 (shared tooling from the main checkout):** `~/projects/infra/agent-tools` is checked out on `feat/devlink`, not `main`. Shared tooling served from it runs feature-branch code. It also holds the uncommitted Budget-run logs.
7. **Budget morning start sessions:** they left uncommitted run logs, checkpoints and script edits in `~/projects/infra/agent-tools` (the feat/devlink worktree), not in `agent-tools-adr4`. See the agent-tools rows.
8. **Brief vs inventory mismatch:** the brief says `feat/chase-front-pov` conflicts with merged work. The inventory says both of its commits are already patch-equivalent on origin/main. Verdict below assumes the inventory is right; one `git cherry` confirms it.

## workspaces/bhagdori (Bhaaag)

| Item | Verdict | Reason / check |
|---|---|---|
| main checkout, branch `docs/session-2026-11-12` (108 behind, 0 ahead) | MERGE-AFTER-FIX | Only real content: +66 lines of edits to docs/sessions/2026-11-10/11/12.md (origin hasn't touched them). Create a new branch from origin/main, carry the three session diffs over, PR. Then switch the checkout to main. |
| untracked `docs/learning/*`, `docs/reviews/art-direction-opus-review.md` | DROP | Identical to origin/main. Delete the local copies, or the pull refuses to overwrite them. |
| untracked `docs/briefs/` (5 local-only files) | MERGE | Brief docs, no code. Check none duplicates the 3 origin-only briefs under another name. |
| untracked `docs/reviews/game-art-skill-review.md`, `t297-cloud-village-review.md`, `docs/sessions/T290b-handoff.md` | MERGE | Review/history docs (Rule 10 history). Same docs PR as above. |
| untracked `tools/levelGraph.mjs` + `.claude/skills/` | MERGE | The `level-graph` skill depends on them. Check that `tools/levelGraph.mjs` imports no new dependency. Put them in their own small PR. |
| untracked `docs/ChatGPT Image Nov 11…png` (3.2 MB) | PARK | Owner reference image. Rename or downscale if kept, or move it out of the repo. |
| untracked `art/` (348 MB) | PARK | See cross-cutting finding 2. Not for git. |
| gitlinks `.claude/worktrees/agent-*` | MERGE-AFTER-FIX | See cross-cutting finding 1. |
| local `main` (109 behind) | MERGE | Fast-forward only. |
| worktree `agent-ae84e8d73076b701b` (merged; untracked `tests/content/strategyDiag.test.ts`, `strategyLevel.test.ts`, `art/perf/strategy.json` in a 4.1 MB `art/`) | MERGE-AFTER-FIX | The two strategy tests are unique and guard the generated maze (PRODUCT allows a pure-graph BFS test). Copy them to a branch from main, confirm they pass in CI, and PR. Do not commit `art/perf/strategy.json` unless a test reads it and it is small. Only then remove the worktree. |
| worktree `agent-a8ab28337ead4c3d5` / `feat/nagarkot-house-models` (merged; only `phone-qr.png`) | DROP | Nothing unique. Remove the worktree and branch. |
| `feat/chase-front-pov` (worktree agent-ac2aafe7, 2 ahead, clean) | DROP | Content already on main. Check: `git cherry origin/main feat/chase-front-pov` prints only `-` lines. If any `+` line shows, PARK it and ask the owner instead. |
| `origin/claude/busy-pasteur-9ttkfq` (1 commit, backdrop snow massif + forest colour, backdrop.ts only) | MERGE | Small and isolated. Check visually that the new backdrop colours keep the three-colour language (Principle 3): no gold, cream or terracotta read on scenery. |
| `origin/claude/cool-fermat-ekic5n` (docs/team-workflow.md, tools/sheet.mjs) | MERGE | Docs + a dev tool, disjoint paths. Check `tools/sheet.mjs` adds no dependency (CLAUDE.md: ask before new deps). |
| local `assets` (1 commit, 16 reference JPGs, ~1 MB each, docs/handoff/references) | PARK | About 16 MB of photos in git history forever. Owner decides: commit them downscaled (~150 KB each), or keep them out of git like `art/`. |
| `origin/feat/t290e-ribbon-dragon` (PR #5 closed; base is old; 158-file diff) | DROP | Its PR was closed, and its own merge message says "drop sprite ribbon work". Delete the remote branch only after the owner OKs it. |
| ~30 other local branches (all merged ancestors) | DROP | `git branch -d` (it refuses anything unmerged). |
| ~23 other remote branches | not reviewed | Not inspected. Run `git branch -r --merged origin/main` before pruning. |

## sandbox root repo (`~/projects/sandbox`, no remote)

| Item | Verdict | Reason / check |
|---|---|---|
| `feat/server-base-template` (root checkout, 9 ahead) + uncommitted `config/queue/bhagdori.yaml` (+283), `config/opencode.json` | MERGE-AFTER-FIX | Commit the queue/config edits first, then fast-forward local `main`. Check the yaml parses (`queue.sh` reads it). |
| `claude/vigorous-easley-c3e3dc` and `feat/dashboard-status-colors` (same tip e3855d5, 7 ahead, 2026-09-21) | MERGE-AFTER-FIX | Both touch the same queue-dashboard plan/spec that server-base touches. Check `git cherry feat/server-base-template e3855d5`. If it is already contained, DROP both; if not, PARK them (stale since September). One of the two is a pure duplicate either way. |
| worktree `.claude/worktrees/vigorous-easley-c3e3dc` (detached, clean) | DROP | Clean, stale. |
| untracked tooling: CLAUDE.md, PRODUCT.md, AGENTS.md, `.claude/`, `config/queue/*.yaml`, `config/budget/`, `docs/sessions/`, `docs/reviews/` | MERGE-AFTER-FIX | These are the live rulebook/queue/budget files and should be tracked. Commit them, but first gitignore `.codegraph/`, `graphify-out/`, `LOOP-STATE.json`, `workspaces/`, `vidanta-AR/` and `land-model/` (if it is a repo). |
| untracked CV drafts and `.docx` files in the root | PARK | Personal documents. Owner decides; default is to keep them out of git. |
| lookbook, khel-service (live inside this repo's tree) | covered above | No branches of their own. Their files follow the root decisions. |

## infra/agent-tools-adr4 + infra/agent-tools (`rubenkaksh/agent-tools`)

| Item | Verdict | Reason / check |
|---|---|---|
| `feat/devlink` (PR #30 open, 1 ahead) | MERGE | Check PR #30's CI is green, then merge. Afterwards switch `~/projects/infra/agent-tools` back to `main` (Rule 7). |
| uncommitted Budget-run logs/checkpoints/scripts in `~/projects/infra/agent-tools` (modified loop-run-log.md, daily_digest.sh, flip-a7.sh, skills-audit/*; untracked run logs 2026-09-02..10-14, generate_agent_md.py, write_file.sh, tools/) | MERGE-AFTER-FIX | Do not fold these into PR #30. Move them to their own branch, `docs/budget-run-logs`, first. Review the script edits separately from the logs. |
| `fix/gate-hook-git-env` (adr4 checkout, merged) + untracked `.launchd/…index-refresh.plist`, `scripts/weekly_index_refresh.sh` | MERGE-AFTER-FIX | Weekly codegraph refresh job. Put it on a new branch from main and PR it. Check the plist paths point at the main checkout (Rule 7). |
| untracked `docs/autonomous/agent-tools/handoff-2026-10-15-skills-audit.md` | DROP | Stale: it says PR #29 is open (it is merged) and names a branch that no longer exists. |
| `feat/a8-session-doc-rollout` (3 ahead / 68 behind) | PARK | Stale, and it conflicts with codegraph-instrumentation on `scripts/weekly_review.sh`. Owner: is A8 still wanted? |
| `feat/codegraph-graphify-instrumentation` (1 ahead / 96 behind) | PARK | Same conflict as above. If both are wanted, merge this one first; it is the smaller change. |
| `feat/c18-caveman-console-only` (1 ahead / 139 behind) | PARK | Very stale. Caveman now exists as a skill, so this is likely superseded. Owner decides; DROP if superseded. |
| 28 merged branches (A1–A8, executor-*, fix/*, …) | DROP | `git branch -d`. |

## sandbox/workspaces/commons and infra/commons (same remote `rubenkaksh/commons`)

| Item | Verdict | Reason / check |
|---|---|---|
| workspaces/commons `docs/hardware-theme-plan` (1 ahead, doc) | MERGE | Doc-only PR. |
| workspaces/commons untracked CLAUDE.md, PRODUCT.md | MERGE | Rule 10 files. Same PR. |
| workspaces/commons untracked `assets3d/` | PARK | Size and contents not checked. |
| infra/commons `fix/flutter-upgrade-errors` (1/1; its PR #2 merged) + uncommitted Home preview tests, analysis_options, 3 widgets | MERGE-AFTER-FIX | Rebase onto main, commit the tests and widget edits, run `flutter test` in CI, PR. Gitignore `.vscode/` and `LOOP-STATE.json`. |
| infra/commons `feat/absorb-atoms-p5` (7 ahead, "release 0.9.0", ~30 widgets) | PARK | Both it and main claim version 0.9.0, and it conflicts with flutter-upgrade on `lib/commons.dart`, `pubspec.yaml` and `loop_verify.sh`. Owner: is the atoms absorption still planned? If yes, it needs a version bump and a rebase. |
| infra/commons `feat/skeleton-loading-view` (merged) | DROP | `git branch -d`. |
| infra/commons worktree `commons-main` (clean) | keep | Fine as the main checkout (Rule 7). |

## workspaces/vakund

| Item | Verdict | Reason / check |
|---|---|---|
| main worktree on `feat/queue-vakund-w42` (merged) + untracked CLAUDE.md, PRODUCT.md, docs/sessions/2026-11-12.md | MERGE | Rule 10 docs PR from main. Then switch the checkout to main. |
| untracked `godot/kit3d/` | PARK | Not inspected; likely a large asset kit. Check its size and licence before committing. |
| modified `.DS_Store` (godot/scripts, godot/tests) | DROP | Revert them and gitignore `.DS_Store`. |
| worktree `claude/awesome-lewin-f2f8f7` (merged, clean) | DROP | Remove the worktree. |
| all other branches (all merged) + stale local main (26 behind) | DROP / fast-forward | `git branch -d`; fast-forward main. |

## workspaces/vidanta3d

| Item | Verdict | Reason / check |
|---|---|---|
| `claude/art-polish-textures-shaders-5fbd35` (14 ahead, 0 behind, clean worktree) | MERGE-AFTER-FIX | Merge this one first; it applies cleanly on main. Open a PR and check CI and the credits file (it drops the Poly by Google credit; confirm the pagoda really is an own mesh). |
| `feat/camera-presets` (main worktree, 6 ahead / 7 behind, many dirty) | MERGE-AFTER-FIX | Commit or sort the dirty files first (see below), then rebase on main after art-polish lands. Expect conflicts in `data/credits.gd`, `sfx.gd`, `sound*.gd`, `game.gd`, `guns.gd` and `ui_kit.gd`. |
| `fix/astronaut-gun-scale-random-bots` (3 commits after PR #11: Character Base import, CC BY credit) | PARK | Overlaps the uncommitted `hero_base_rigged.glb` + rig tools in the main worktree. Owner: is Character Base the hero direction? If yes, merge it after camera-presets with the rig work. |
| untracked CLAUDE.md, PRODUCT.md, docs/sessions/2026-11-04.md, docs/plans/visual-target-camera-c.md | MERGE | Docs PR. |
| untracked `assets/models/hero_base_rigged.glb` (+.import), `tools/rig_character_base.py`, `tools/shot_rig.gd`, `art/rig_check.png`, `art/target/*.webp`, `.uid` files | PARK | Goes with the astronaut/hero decision. Check the glb size and licence. |
| untracked `kit3d/` | PARK | Not inspected. |
| modified `.DS_Store` ×6 | DROP | Revert and gitignore. |
| `feat/queue-vidanta-ratha`, `feat/w1-visibility-load-carry` (merged) | DROP | `git branch -d`. |

## workspaces/vidanta (Flutter; last session 2026-10-15)

Owner decision first: is vidanta (Flutter) retired in favour of vidanta3d (Godot)? If yes, PARK every unmerged branch as is (push them so they are backed up) and stop. The verdicts below assume it is still alive.

| Item | Verdict | Reason / check |
|---|---|---|
| `docs/jatra-pull-design`, `docs/polypizza-shopping-list` (1 doc commit each) | MERGE | Doc-only. |
| `claude/ux-phase1` (1/1 diverged, vision doc) | MERGE-AFTER-FIX | Rebase onto main, then PR. |
| `feat/queue-vidanta-ratha` (20), `feat/queue-vidanta-t83` (19), `feat/t83-ult-indicator` (3) | PARK | They overlap heavily (twin_stick_hud.dart, oblique_renderer.dart, CLAUDE.md, spike/godot_look). Merge them one at a time, ratha first, and only if vidanta is alive. Check whether the t83 commits are already contained in ratha (`git cherry`). |
| `art/durbar-pieces` (main worktree, 18 ahead) + `art/queue-t50-t51-w43` (1) | PARK | Art branches that share `art/models/*.glb` and `piece_*.png`. Check whether t50-t51 is contained in durbar-pieces; check the binaries' size. |
| `claude/sleepy-napier-996c50` (worktree, 3 commits, 4 heroes, 1,473 asset files) | PARK | Very large asset drop. Owner decides whether these heroes are wanted. |
| main-worktree dirt: three APKs at the repo root | DROP | Build outputs. Move them out and gitignore `*.apk`; never commit them. |
| main-worktree dirt: `GeneratedPluginRegistrant.swift`, `.DS_Store` | DROP | Generated noise. Revert. |
| main-worktree dirt: CLAUDE.md edit, PRODUCT.md, `docs/plans/` (5), `docs/skills-picks.md` | MERGE | Docs PR. |
| main-worktree dirt: `app/test_spike/`, `spike/attract/`, `docs/decisions/*.mov`, `.vscode/`, `.codegraph/`, `graphify-out/` | PARK / gitignore | Spikes: owner decides. Gitignore the tool dirs. Keep the .mov files out of git. |
| worktree `claude/relaxed-cannon-d1dcaa` (merged, clean) | DROP | Remove the worktree. |
| `2.5d-stage1`, `claude/loadout-settings-json`, `claude/t34-arena-kit-plan`, `mvp1*` (all merged) | DROP | `git branch -d`. |

## workspaces/librosa-service (`rubenkaksh/audio-processor`)

| Item | Verdict | Reason / check |
|---|---|---|
| `feature/lottie-theme-upgrade` (main checkout, 16 ahead / 1 behind) + uncommitted guitar-neck renderer, onboarding docs, MISSION.md deletion, rebuilt `static/` | MERGE-AFTER-FIX | This is the integration branch. Commit its uncommitted work. Do not hand-merge `static/main.dart.js` or `flutter_bootstrap.js`; rebuild them. Rebase onto origin/main, then PR. Check that the MISSION.md deletion is intended (PRODUCT.md replaces it under Rule 10). |
| `feature/rhythm-strum` (worktree, all 15 commits already in lottie) + uncommitted `lib/rhythm`, `spike/`, `web/rhythm_audio.js`, `main.dart` edits | MERGE-AFTER-FIX | Its commits are redundant. Move only its uncommitted work onto lottie, after lottie's own commit. Expect a conflict on `frontend/lib/main.dart`, and the duplicated untracked docs (piano-fork-design.md, rhythm-instruments-plan.md) need reconciling. Then DROP the branch and worktree. |
| local `main` (1 behind) | MERGE | Fast-forward. |

## sandbox/vidanta-AR

| Item | Verdict | Reason / check |
|---|---|---|
| `main` (1 commit ahead, unpushed: SpawnPointSampler, boundary tests, mission files) | MERGE-AFTER-FIX | The commit sits directly on local main. Push it as a branch, open a PR, let CI run the tests, then merge. Owner OK needed for the push. |

## workspaces/swatchwear

| Item | Verdict | Reason / check |
|---|---|---|
| `main` dirty: CLAUDE.md, PRODUCT.md modified; `docs/sessions/2026-11-09-baseline.md` untracked | MERGE | Docs PR from a branch. |

## workspaces/khel-service/khelam (`rubenkaksh/khelam`)

| Item | Verdict | Reason / check |
|---|---|---|
| `fix/commons-path-dependency` (only worktree, 5 ahead / 1 behind) | MERGE-AFTER-FIX | Rebase, PR, CI `flutter test`. Check that the commons path dependency points at the canonical commons clone (cross-cutting finding 5). |
| its 48 dirty entries | MERGE-AFTER-FIX | Commit docs/reviews and docs/sessions. Review the `scripts/*.sh`, AGENTS.md and STATE.md edits separately. DROP `out_T04.txt` and `out_T05.txt`, and revert generated plugin files. |
| `feat/c20-real-turfs-e2e` (2/1), `feat/rtk-dry-run` (3/8) | PARK | Stale since August. rtk-dry-run is likely superseded by the rtk work in agent-tools. Owner decides. |
| `autonomous/C13-readme-timestamp`, `feat/skeleton-booking-timeline`, `fix/loop-md-dead-links` (merged); local `main` (6 behind) | DROP / fast-forward | `git branch -d`; fast-forward main. |

## workspaces/on-device-agent (`rubenkaksh/on-device-agent`)

| Item | Verdict | Reason / check |
|---|---|---|
| `feature/g6-gemma-poc` (default branch; 3 unpushed commits; d4 worktree dirty only in analysis_options and macOS Podfile/Xcode files) | MERGE-AFTER-FIX | Push the 3 commits (owner OK). Revert or commit the Xcode noise separately. Note: the default branch is a feature branch with no `main`; the owner may want a real `main`. |
| main worktree on `fix/sequential-gemma-generation` (merged) with ~48 dirty entries | MERGE-AFTER-FIX | Contents: deletions of lib/MISSION.md, NOTES.md, RESOURCES.md and learning records; untracked PRODUCT.md/CLAUDE.md (Rule 10); a `gemma_service.dart` edit; iOS/macOS config. Split it: one docs PR (Rule 10 files plus the deletions, if intended), one code PR (gemma_service). Gitignore and DROP `ios/build/` and `android/build/`. |
| PR #4 "docs: write real README" (docs/readme-run-sh) | MERGE | Review, then merge. Docs only. |
| `docs/needle3-contribution-guide` (4/9), `docs/needle3-plan-local` (5/15) | PARK | Likely overlapping docs. Check `git cherry` between them, keep one, rebase it. Owner: is Needle3 contribution still planned? |
| `feature/d1-stop-token-guardrails`, `fix/sequential-gemma-generation` (merged) | DROP | `git branch -d` (after the main worktree leaves the sequential branch). |

## Not repos / no action

| Item | Verdict | Reason |
|---|---|---|
| `essentials/ai-engineering-from-scratch` (third-party clone, 266 behind, clean) | DROP (no action) | Not the owner's repo. The open PRs belong to upstream contributors. Optionally `git pull`. |
| `~/projects` (Rust vs Python session) | no action | Not a repo. |
| `~/Desktop/als` (Ableton) | no action | Not a repo; .als files only. |
| Two scratch workspaces (2026-10-15) | no action | Not repos; empty within depth 3. |
| `workspaces/tv` | PARK | Not a repo and ignored by sandbox (cross-cutting finding 4). Owner decides whether it gets its own repo. |

## Skipped / not covered

- No `git fetch` was run in most repos, so counts may be stale.
- No stashes were checked in any repo.
- Not inspected: ~23 bhagdori remote branches beyond the four named; `kit3d/` dirs (vakund, vidanta3d); `assets3d/` (commons); `land-model/` (sandbox); `tv` contents.
- Sessions in repos this inventory did not list as dirty (e.g. "Notion requirement", "Weekly performance review", "Multi-model task analysis", "Codegraph and graphify syncs") ran in the sandbox root or bhagdori. Any files they left are covered by the sandbox-root and bhagdori rows.
