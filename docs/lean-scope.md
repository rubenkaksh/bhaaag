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
