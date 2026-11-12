# Lean scope (decided 2026-11-06) — supersedes the full plan where they conflict

Goal: a Miniclip-style game. Open the link, play one hand-tuned Kathmandu rooftop descent in under 2 minutes, die, restart instantly, try again. Light on load and on the phone.

## Dropped (do NOT build)
1. Godot-portable core rules. Plain idiomatic TypeScript is fine in `src/core`. The existing core stays as is (no rewrite), but new code may use closures, destructuring, etc. Keep `src/core` free of three/DOM imports (cheap, keeps tests fast).
2. Level validator, never-dead-end proof, ADR 0002. The one level is hand-checked by playing it.
3. Replay traces, golden tests, feel gate with outsiders, CI deploy gates. Unit tests only where they protect the sim (`pnpm test` must stay green).
4. Multi-level content: exactly ONE level (L1). No L1a/L1b/L1c assist ladder, no level select, no GLB pipeline, no asset-loading stage.

## Kept (the reference that must not be lost)
- Mirror's Edge: momentum is never thrown away (landing turns speed into run speed, roll keeps it, firing within 0.4 s of landing seeds the rope launch speed), runner's vision (only the next on-route anchor and its pad pulse), strict three-colour language (gold = interactive, cream-white = safe, terracotta = danger) over a hazy desaturated world, near-instant restart (accept input at 0.3 s, auto-restart 0.8 s).
- Assassin's Creed: readable sunlit rooftops (key light 60-90 degrees off the descent axis, pads lit, anchors emissive with fog off), establishing route pan at spawn, a final "leap of faith" finish into a haystack/water target instead of a plain goal marker.
- One-hit death, hand-brake (hold REEL on rope), vCling 7.5, touch scheme (tap-to-aim, one contextual action button, JUMP, swipe-down DROP), landscape-first phones.

## Budget
Target: first complete run-through playable in days, not weeks. Keep the JS bundle small (three + game under ~600 KB gzipped), stock materials, primitives only. Textures: small baked JPEG/normal tiles are allowed (amended 2026-11-09, graphics overhaul, ~150 KB added max); no hand-written shaders, no GLB.

## Model and animation
Opus (high) specifies the hero rig and pose set; smaller agents implement. Procedural primitives, no GLB. ADR 0003 is trimmed by this note to: procedural capsule-and-box mannequin, 6 poses (run, jump/fall, rope hang, slide-brake, roll, dead), blended by code.

## Amendment 2026-11-09 (graphics overhaul, `docs/graphics-overhaul-plan.md` s9)
Owner approved: higher default tier on capable devices, small textures, set-dressing clutter and atmosphere (clouds, god-ray cards, birds, dust) on Medium/High. Still out: custom shaders (P6), GLB, extra levels. Hero rework (P5) is on hold until the owner lifts the mannequin lock.

## Amendment 2026-11-10 (portrait play and a Dragon Chase score mode, owner lifted)
Owner lifted two items: portrait is playable (no rotate overlay; the layout adapts, see `docs/three-track-plan.md`), and a second mode, Dragon Chase (score based, endless), joins Classic L1. Still out: any further modes, extra levels, custom shaders, GLB.

## Amendment 2026-11-10b (strategy pivot, owner decided; recorded, not relitigated)
The owner pivoted the game from "one tuned descent" to a rooftop **strategy maze**. Lifted from
"Dropped" item 4 and from the modes limit above:
- A third mode, the Nagarkot->Bhaktapur run: ONE generated level of ~100 houses (ridge, hillside,
  road turnings, Bhaktapur town). Still exactly one such level; no level select, no GLB, no shaders.
- The zipline is **fixed**: it exists only at marked line-houses (fixed rope from a launch zone to a
  fixed far anchor). Everywhere else the hero jumps, climbs (balcony -> roof) or drops. Classic L1
  and Chase keep free-aim; the gating is a per-level flag.
- **Trampolines** (launch impulse) and **cushions** (lethal-landing absorber, haystack role) are new
  world features on target houses.
- The level is a **graph**: houses are nodes, moves are edges; some paths are dead ends, 1, 2 or n
  paths reach the goal. Falling to the hillside ground between houses is a dead end (hazard band).
- Item 2 stays dropped for the *sim* validator, but a cheap **pure-graph BFS reachability unit test**
  runs in `pnpm test` (not a deploy gate) because a generated 100-node maze cannot be hand-checked.
- Controls (left stick, jump button, double/triple tap, hold-to-climb) are a separate track; the
  core only defines the action model (`docs/adr/0011-strategy-maze-core.md`).
Kept unchanged: three-colour language (gold = interactive incl. line zones, cream = safe incl.
trampolines/cushions, terracotta = danger incl. hazard bands), one-hit death, instant restart,
momentum carry, bundle budget (~600 KB gz, initial chunk <= 215 KB gz per ADR 0009), ADR 0009
draw-call budgets. Runner's vision is OFF in the maze (it would spoil the maze); affordance colour only.
Flag: 100 houses is within the triangle budget only with house dressing off and merged feature
meshes; phone frame time is unverified until measured on a device.

## Amendment 2026-11-12 (cloud village, owner decided; recorded, not relitigated)
Lifted from "Dropped" item 4 and the modes limit: a fourth mode, Cloud Village (`village`), ONE hand-placed level of ~8-10 Newari houses above a cloud sea, free-aim zipline like Classic, same core sim. Still out: level select, a second new level, GLB, shaders, collectibles, new collision types, floating islands. New textures: 0 KB by default, owner approval above 300 KiB. Details: `docs/briefs/T297-amendment-draft.md`.
