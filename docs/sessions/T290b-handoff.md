# T290b Handoff: Dragon slither tuning (2026-11-11)

**State at handoff:** sprite dragon integrated and accepted ("dragon looks nice now").
Reversed chase camera live. Next: motion tuning only — no art changes needed.

## Owner request (verbatim intent)
1. **Add vertical slithering** on top of the existing left-right wave — the body should undulate
   vertically as it comes down the hill, which also sells the 3D depth of the serpentine motion.
2. **The tail/bottom part reads great — extend that quality to the full body.** The fluffy, tapered,
   continuous look at the tail end should hold along the whole chain (no gaps, no bead-like middle).
3. **The head stays stable.** No vertical wave on the head — only its existing gentle bob/proximity
   loom. The slither belongs to the body.
4. **No phasing through buildings — absorb them in fog.** The cloud body currently clips through
   houses (hard sprite-vs-roof intersections look broken). Instead, where the body passes over or
   near buildings, the buildings should fade into the cloud like mist swallowing them.

## Fog-absorption approach (requirement 4)
Stock-materials-only recipe (no shaders, matches project locks):
- Build ONE shared soft mist texture once: 128px CanvasTexture radial gradient, white core →
  transparent rim (pattern exists already: `makeGlowTexture()` in the old `dragonView.ts`).
- Per body segment, add a sibling "mist card" Sprite: same position, ~2.5× the segment scale,
  opacity ~0.55, `transparent: true, depthWrite: false, depthTest: true, fog: false`,
  renderOrder just BELOW the segment sprites so clouds sit in front of the mist.
- With soft radial alpha, quad/roof intersections read as fog rolling over the houses instead of
  clipping. Raise mist-card opacity slightly for segments over the village lane (optional: scale
  by nearby row density from `ChaseWorld`).
- Also raise the chain's base clearance a few metres (HOVER + ~4 on segments only, not the head)
  so only the dips of the new vertical slither come into roof level — the absorption then happens
  rhythmically as the body undulates, which is the effect the owner wants.
- Acceptance: in `t291-play-landscape/portrait` shots no segment shows a hard cut through a roof;
  where the body meets the village, the roofs visibly wash out toward white.

## Where to edit
`src/adapters/render/chase/dragonSpriteView.ts` → `update()` segment loop + `build()` (mist cards
added there). Only this file (plus `dragonView.ts` only to copy the `makeGlowTexture` pattern).

- Current lateral wave: `offsetX = WAVE_AMP * u² * sin(WAVE_K*u*2π − WAVE_W*t)`
- Add: `offsetY = V_AMP * u² * sin(WAVE_K*u*2π − WAVE_W*t + φ)` with a phase offset φ (try ~π/2)
  so the vertical slither travels with the lateral one (elliptical/3D corkscrew feel rather than
  two independent waves). V_AMP start ~4–6 m, u² ramp like the lateral one.
- Head: leave `headY` as-is (hillRef + HOVER − prox·3 + small bob − lunge·7). Stable.
- Full-body continuity: overlap segments more (raise segment scale slightly or reduce BODY_LEN),
  and/or bias the segment texture mix toward the big cloud-seg pieces near the neck so the middle
  of the chain reads as full as the tail. Check shots for bead/gap artifacts at u≈0.4–0.6.

## Context you need
- Camera: chase rig yaw is reversed (`r = −c` in `game.ts tickCamera`), camera sits downhill in
  front of the hero looking back up the slope; dragon is the real one (pin disabled, `update(...,
  camZ, false)` from game.ts). Body extends from head toward +Z (uphill, away from camera) — so
  vertical wave amplitude also reads as depth. Classic mode untouched.
- `hillY(z)` from `src/core/chase/rows.ts` already makes the chain follow the slope; the vertical
  slither is an OFFSET on top of that, not a replacement.
- Segments: 6/10/12 per tier (`SEGMENTS_BY_TIER`), one SpriteMaterial each (opacity/rotation
  mutated per frame only). No per-frame allocations allowed — keep it that way.
- Assets: `public/assets/dragon/*.webp` (8 files, 272 KB total, budget deviation accepted).
  Masters in `docs/reference/dragon-face/masters/`.

## Verification loop (all known-good commands)
```bash
cd /Users/rubenk/projects/sandbox/workspaces/bhagdori
PATH=/opt/homebrew/bin:$PATH ./node_modules/.bin/tsc --noEmit
PATH=/opt/homebrew/bin:$PATH ./node_modules/.bin/vite build
PATH=/opt/homebrew/bin:$PATH node tools/shots-chase.mjs t291        # 0 errors, 0 over budget
PATH=/opt/homebrew/bin:$PATH ./node_modules/.bin/vitest run --dir tests   # 419 green
# review art/shots/auto/t291-play-portrait.png, t291-play-landscape.png, t291-cloud-creep.png
# phone: restart preview, then QR:
PATH=/opt/homebrew/bin:$PATH nohup ./node_modules/.bin/vite preview --host 0.0.0.0 --port 4174 &
qrencode -t ANSIUTF8 "http://192.168.1.105:4174/?mode=chase&debug"   # re-check IP with ifconfig
```
Note: system pnpm breaks under nvm Node 20.18.1 — always prefix `PATH=/opt/homebrew/bin:$PATH`.

## Open items / caveats (owner aware)
- Aiming in reversed view: anchors are downhill = behind camera. Owner judging gameplay vs
  showcase; possible follow-ups: rear-quarter camera angle or auto-hook assist.
- `src/adapters/render/chase/dragonView.ts` (old puff dragon) kept only for its test — retire with
  owner approval.
- Nothing committed yet; branch + draft PR when asked.
- High-tier budget occasionally blips +1 call (noise vs classic count; Medium is the phone default
  and comfortably under).

## Session docs
- Work log: `docs/sessions/2026-11-11.md` (this task's full history incl. camera flip decision)
- Previous handoff: `docs/sessions/T290-handoff-updated.md` (art pipeline rationale, still valid)
