# T336a review: `nagarkot-home` design (O1 seat, Opus stand-in for Fable)

Date 2026-11-17. Review only, no gates run. PRODUCT.md (to 17f) read; the design fits the purpose and non-goals.

**Verdict: PASS WITH FIXES.** F1-F4 must be applied to the note before Sonnet builds. F5-F12 can be applied in the same edit.

Re-derived by hand from tuning.json (these agree with the note): grab ceiling 1.03 + 2.05 = 3.08 m. Reach, run / sprint: flat 4.38 / 8.86 m, drop 4.1 7.56 / 14.7 m, drop 2.8 run 6.80 m. Stride 6 / (2 x 1.765) = 1.70 m, so the streak is 11.9 m. Time 47.7 + 13.3 + 4 = 65 s.

## Fixes (by severity)
F1 (high, breaks Q1 c2). One 1.2 m terrace step turns the 2.30 and 2.66 m leaks into 3.50 and 3.86 m drops. Both fall in the forbidden band (2.8, 4.0). Section 2 "Leak repair": change `drift += TERRACE_STEP` to `drift += 1.2 x ceil((4.0 - drop) / 1.2)` (2 steps, giving 4.70 / 5.06), and raise TERRACE_MAX to 4. Add test 10 to section 5: for every rebuilt cross-row pair (lane or diagonal), the drop is not in (2.8, 4.0), and any drop <= 2.8 has an edge.

F2 (high, test 2 is a tautology). The generator graph is `buildEdges` run on the same nodes, so test 1 already implies "rebuilt edges == generator edges". Replace test 2 with: under the leak opts, no edge A->B has `B.y > A.y + 0.3`, and no edge enters an uphill row, except MOVE_CLIMB. `findUphillLeaks` must use the same check. As written it misses lateral climb-backs (same row). Drift cannot repair a lateral leak, so the fix there is to set the pair level or move to the next seed.

F3 (high, wrong arithmetic). From a 2-storey front roof, the run-off to the road (drop 7.8) lands at sqrt(2 x 9.81 x 7.8) = 12.37 m/s. That is <= vyRoll - 0.4 = 12.6, so it is a plain MOVE_JUMP, not line-only. Nothing in tuning gives the note's 12.2. Change `ROAD_UNDER` to 2.7. The drops become 5.9 (10.76 m/s, a jump) and 8.7 (13.07 > 13, so neither JUMP nor TIGHT, line only). The road-to-back-row drop then becomes 3.56 (forbidden band), so the row after a road gets drift +1 step (4.76). Update both table rows.

F4 (high, lateral parapet hole). Risk 4 tests only a launch after a mantle. The hero can also run along the 0.25 m parapet top (8 or 24 m long) and steer sideways in the air (airSteer 14 m/s^2, cap 6). From y + 1.2, crossing the 4 m gap takes about 0.76 s, with the feet 0.6 m up and the ledge 1.0 m above them: grabbable. The model has no air control. Change risk 4: the one allowed core test covers both (i) mantle then jump and (ii) parapet-top run plus full steer toward the neighbour 2.8 m higher. If either grabs, the fallback (state it in the note) is that lateral pairs must be level and traps come from cross rows only. A tall parapet on the higher face is not an alternative: it also blocks the trap's way down (walk-off reach 3.1 < 5.0 needed).

F5 (med). The zip carry in `vLeak` ignores direction. sim.ts:1074 keeps carry only while the stick points the way the hero is moving (dot > 0), inside chainWindow 0.4 s, with a 7 m/s^2 skid. Apply `carryCap` only to moves with positive dot to the incoming line direction (downhill or diagonal downhill). Use run or sprint for uphill and lateral moves. This removes false uphill leaks (for example the 2.3 m climb at gap 6 from 12 m/s) and the drift stacking in risks 1 and 3.

F6 (med, owner rule for 2 node-disjoint paths). Accept the per-section reading, worded exactly as: ">= 2 internally node-disjoint paths in each section S->R1, R1->R2, R2->R3, R3->G. Computed as one node-split max flow S->G with infinite node capacity on S, G and the 3 roads." This is equivalent because roads are the only cross-segment links (Q3 / T337), so a literal S-G pair cannot exist by design. Count only route-grade edges (JUMP, TRAMP, ZIP, CLIMB), never TIGHT or GRAB, because the generator never routes on those. Delete "between consecutive junctions" and tell the owner in one line.

F7 (med). The 9.5% figure is 0.8 x 14/118, and that mixes metrics: deadRoofs (roofs only) divided by all nodes. The pin test (test 8) must record the baseline as `analyze().deadEnds.length / reachable` plus the count of weakly connected dead-end branches. Set the threshold to 0.8 x that share, and branches >= 6 (0.8 x baseline if the baseline is under 6). Compute deadMin from these; do not hard-code 0.095.

F8 (med). The kit `poleAnchor` x is cx, but `anchorPos` x clamps to cx - 2 for a same-lane line. "The anchor equals the kit pole" is true for y and z only. Emit kit houses with `pole: false` and keep the `anchorPos` anchors. T336b draws the pole mesh at `anchorPos`. Otherwise the kit adds a stray extra anchor.

F9 (med). Define the `estimateRoute` edge cost. Run metres = distance on the node from the arrival point to the departure lip. On a road that is |x_in - x_out| + depth: up to 48 m of lateral run, which the 386 m estimate leaves out. Then add the flight or zip chord. Run Dijkstra over route-grade edges only (no TIGHT). Re-check the 80 s cap with road traversal included.

F10 (low-med, T334 swap). Add `SPRINT_JUMP_VY = hero.jump` (4.5). In test 9, map each constant explicitly: SPRINT_SPEED to hero.sprintSpeed, SPRINT_STREAK_M to hero.sprintStreakM, SPRINT_RAMP_M to the value measured in ADR 0018, SPRINT_JUMP_VY to T334's sprint-jump vy. On swap, assert vy < 4.85 (a deck jump apex under 1.2, so tall parapets still hold) and vy < 5.9 (grab ceiling under 4.0). For the runway, use `extentAlong - ANCHOR_IN - 2R` (the zip arrival point): 20.8 m against 18.35 m.

F11 (low, test feasibility and c6/c7). In test 1, exclude `id` and `house`: neither can be recovered from LevelJson. Add these assertions: no STYLE_BODY solid intersects a road rect; any style-0 solid that is not road-shaped fails loudly. Add to section 4 that T336a edits neither levels.ts nor GRAPH_LEVELS. HouseSpec has no `parkour`, `climb` or `lineOnly` field: they are LevelJson flags, so say that.

F12 (low, scope). The 150 min card is too much for one Sonnet session: threading P through about 12 functions plus 6 new ones. Split it. Session 1: the pin test first, then graph.ts (EdgeOpts, leak and diag model, nodeDisjointPaths, estimateRoute) with unit tests, default output byte-identical. Session 2: gen.ts HOME_PARAMS, kit emit, the repair loop and the acceptance test.

Noted, no change: the entry drop into a long row is at least 8.1 m (walk-off 12.62 m/s, 0.02 over the JUMP limit), so entry is by line, cushion or TIGHT only. That is very close to the model's threshold; check it in the first sim playtest.
