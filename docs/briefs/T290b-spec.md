# T290b spec: dragon vertical slither + route-safe mist (implementation-ready)

Author: tech lead (design authority), 2026-11-12. Implementer: Sonnet. No design decisions are left
open; tune only inside the ranges given. Mission check: PRODUCT.md read. The change is in Dragon
Chase (an allowed mode), stock materials, 0 bytes of new shipped textures, and keeps the colour
language (mist is cool grey, never cream or gold). No conflict with Purpose or Non-goals.

## 0. Scope and hard rules

- Edit ONLY `src/adapters/render/chase/dragonSpriteView.ts`. No game.ts change is needed: the
  route-safety rule uses data `update()` already receives (see section 4). No test file edits
  (owner decision 4); the 4 existing tests in `tests/adapters/dragonSpriteView.test.ts` must stay
  green unchanged.
- Stock `Sprite` + `SpriteMaterial` only. No shaders, no `onBeforeCompile`, no new files under
  `public/`. One shared 128 px radial `CanvasTexture`, generated at runtime.
- No allocation in `update()`, `setCatch()` or `headScreen()`: scalars only, no `new`, no arrays,
  no closures, no `.clone()`.
- Out of scope: aiming in the reversed camera, head position/size, `dragonView.ts`, asset files.
- Nothing committed.

## 1. Constants (replace/add at the top of the file)

Add `CanvasTexture` to the existing `three` import.

```ts
const HOVER = 7;            // unchanged (head)
const HEAD_SCALE = 20;      // unchanged
const BODY_LEN = 44;        // was 48: tighter spacing (Medium 4.4 m instead of 4.8 m)
const WAVE_K = 2.2;         // unchanged
const WAVE_W = 1.4;         // unchanged
const WAVE_AMP = 8;         // unchanged (lateral, at the tail)
const V_AMP = 4.5;          // NEW vertical amplitude at the tail, metres. Tuning range 3.5..6
const V_PHASE = Math.PI / 2;// NEW vertical phase lead over the lateral wave. Range PI/3..2PI/3
const BODY_LIFT = 4;        // NEW extra clearance for segments (not the head), metres. Range 3..5
const LIFT_U = 0.35;        // NEW lift ramps in over u 0..LIFT_U so the neck stays on the head
const SEG_W0 = 0.92;        // NEW width factor at u = 0 (was 0.85)
const SEG_W1 = 0.58;        // NEW taper (was 0.55): w = HEAD_SCALE * (SEG_W0 - SEG_W1 * u)
const SEG_ASPECT = 0.66;    // NEW height/width (was 0.62)

// Mist cards
const MIST_PX = 128;
const MIST_COLOR = 0xcdd0da; // = CLOUD_FOG_COLOR in game.ts (cool grey; never cream, never gold)
const MIST_SCALE = 1.8;      // card width = min(MIST_MAX_W, MIST_SCALE * segment width)
const MIST_MAX_W = 18;       // metres; keeps any card under ~25% of a phone screen (ADR 0009)
const MIST_ASPECT = 0.55;    // flattened fog bank
const MIST_OP = 0.5;         // peak opacity. Range 0.4..0.6
const MIST_MIN = 0.55;       // opacity factor at a wave crest (1.0 at a dip)
const MIST_PULL = 5;         // card sits this far toward the camera (-Z) from its segment
const MIST_DROP = 0.35;      // card centre = segY - MIST_DROP * segment height (at the cloud's underside)
const ROUTE_CLEAR = 4;       // no mist within this many metres uphill of the hero
const ROUTE_FADE = 6;        // then fades in over this many metres
const LENS_NEAR = 8;         // no mist within this z-distance of the camera
const LENS_FADE = 8;
```

## 2. Textures (continuity fix, requirement 2)

Diagnosis: on Medium the chain cycles a, b, puff-d, puff-e, so u 0.3-0.4 and 0.7-0.8 are the round
puffs. Those read as beads. The tail the owner likes is `cloud-seg-a`/`cloud-seg-b` (Medium i 8, 9;
Low i 4, 5).

- `SEG_PATHS` becomes `['/assets/dragon/cloud-seg-a.webp', '/assets/dragon/cloud-seg-b.webp']`.
  `textureTotal` follows automatically (2 + SEG_PATHS.length = 4). puff-d/e are no longer loaded;
  do NOT delete the files (asset cleanup is a separate owner call).
- Texture of segment i stays `this.segTextures[i % this.segTextures.length]` (a/b alternate).
- Variety without new textures: mirror every other pair. In `build()`:
  `const flip = (i >> 1) % 2 === 1 ? -1 : 1; sprite.scale.set(flip * w, w * SEG_ASPECT, 1);`
- Width: `const w = HEAD_SCALE * (SEG_W0 - SEG_W1 * t);` Store `h = w * SEG_ASPECT` on the segment.
  Medium widths: u 0.1 17.2 m, u 0.5 12.6 m, u 1.0 6.8 m (each about 10% wider than before).

## 3. Motion (requirements 1 and 3)

Head: unchanged. Do not touch `headX`, `headY`, head scale or the pose swap.

Segment loop in `update()` (replace the body of the loop; `smooth01` and `clamp01` are new
module-level pure functions):

```ts
function clamp01(x: number): number { return x < 0 ? 0 : x > 1 ? 1 : x; }
function smooth01(x: number): number { const t = clamp01(x); return t * t * (3 - 2 * t); }

const heroZ = dragonZ - gap;                 // gap is dragonZ - heroZ (see update() doc)
for (const s of this.segments) {
  const u = s.t;
  const segZ = headZ + u * BODY_LEN;
  const u2 = u * u;
  const phase = WAVE_K * u * Math.PI * 2 - WAVE_W * time;
  const amp = WAVE_AMP * u2;
  const offsetX = amp * Math.sin(phase);
  const vWave = Math.sin(phase + V_PHASE);
  const offsetY = V_AMP * u2 * vWave;        // same travelling wave, phase-led: corkscrew
  const lift = BODY_LIFT * smooth01(u / LIFT_U);
  const segY = hillY(segZ) + HOVER + lift + 2 * Math.sin(u * Math.PI * 0.5) + offsetY;
  s.sprite.position.set(headX + offsetX, segY, segZ);
  s.mat.rotation = Math.atan2(amp * Math.cos(phase) * WAVE_K * Math.PI * 2, BODY_LEN) * 0.5; // unchanged formula
  let op = 1;
  if (pin && segZ > fadeStart) op = Math.max(0, 1 - (segZ - fadeStart) / 4);
  s.mat.opacity = op;
  s.sprite.visible = op > 0.01;
  // mist: section 4
}
```

Resulting clearance (Medium, centre of sprite above the hill line; roofs sit at hill + 8 for a row's
first house, hill + 5.4 for the others): neck u 0.1: 7 + 0.8 + 0.3 = 8.1 (was 7.3); mid u 0.5:
7 + 4 + 1.4 +- 1.1 = 11.3..13.5 (was 8.4); tail u 1.0: 7 + 4 + 2 +- 4.5 = 8.5..17.5 (was 9).
Sprite bottoms: mid 7.1..9.3, tail 6.2..15.2. So the mid body grazes roof level and only the tail
dips truly into it, once per wave period (about 4.5 s at WAVE_W 1.4). That rhythmic dip is where the
mist does its work.

## 4. Mist cards (requirement 4, owner decisions 1 and 2)

### 4.1 Which segments, and the draw-call cost

```ts
function hasMist(tier: GraphicsTier, i: number, count: number): boolean {
  return tier === 'low' ? i === count - 2 : i % 2 === 0;
}
```

| Tier | Segments | Mist on i | Mist cards | Max added calls vs today |
|---|---|---|---|---|
| Low | 6 | 4 | 1 | +1 (ADR 0009 / review brief: Low adds at most 1) |
| Medium (phone default) | 10 | 0, 2, 4, 6, 8 | 5 | +5 |
| High | 12 | 0, 2, 4, 6, 8, 10 | 6 | +6 |

Each card is one Sprite, so one call while visible. Cards with opacity <= 0.01 set
`visible = false` and cost nothing (the neck card is usually off, see 4.3), so the typical added
cost on Medium is +4. The last segment never carries a card: the card on count-2 is 14 m wide and
covers the tip.

### 4.2 Build

- Shared texture, created once and lazily in `build()`, kept across tier rebuilds:

```ts
private mistTex: CanvasTexture | null = null;
private mistTexture(): CanvasTexture | null {
  if (this.mistTex !== null) return this.mistTex;
  if (typeof document === 'undefined') return null; // node test env: no mist, tests unchanged
  const c = document.createElement('canvas');
  c.width = MIST_PX; c.height = MIST_PX;
  const g = c.getContext('2d');
  if (g === null) return null;
  const r = MIST_PX / 2;
  const grad = g.createRadialGradient(r, r, 0, r, r, r);
  grad.addColorStop(0, 'rgba(255,255,255,1)');
  grad.addColorStop(0.45, 'rgba(255,255,255,0.55)');
  grad.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = grad;
  g.fillRect(0, 0, MIST_PX, MIST_PX);
  const t = new CanvasTexture(c);
  t.colorSpace = SRGBColorSpace;
  this.mistTex = t;
  return t;
}
```

- `Segment` gains `h: number; mist: Sprite | null; mistMat: SpriteMaterial | null`.
- In the build loop, after the segment sprite is created (a skipped segment gets no card):

```ts
let mist: Sprite | null = null;
let mistMat: SpriteMaterial | null = null;
const mt = hasMist(this.tier, i, count) ? this.mistTexture() : null;
if (mt !== null) {
  mistMat = new SpriteMaterial({ map: mt, color: MIST_COLOR, transparent: true, depthWrite: false,
    depthTest: true, fog: false, toneMapped: false });
  mist = new Sprite(mistMat);
  const mw = Math.min(MIST_MAX_W, MIST_SCALE * w);
  mist.scale.set(mw, mw * MIST_ASPECT, 1);
  mist.renderOrder = 0; // depth-sorted with the world's transparents; under the clouds (1), head (2)
  mist.visible = false;
  this.group.add(mist);
}
```

- `clearBuilt()`: also `group.remove(s.mist)` and `s.mistMat.dispose()` when non-null. Do NOT
  dispose `mistTex` there. `dispose()`: `this.mistTex?.dispose(); this.mistTex = null;`.

### 4.3 Per frame (inside the segment loop, after `op`)

```ts
if (s.mist !== null && s.mistMat !== null) {
  const mistZ = segZ - MIST_PULL;
  const routeK = clamp01((mistZ - heroZ - ROUTE_CLEAR) / ROUTE_FADE);
  const lensK = clamp01((mistZ - camZ - LENS_NEAR) / LENS_FADE);
  const dipK = 0.5 - 0.5 * vWave;                     // 1 at the bottom of the vertical wave
  const mop = MIST_OP * op * routeK * lensK * (MIST_MIN + (1 - MIST_MIN) * dipK);
  s.mist.position.set(headX + offsetX, segY - MIST_DROP * s.h, mistZ);
  s.mistMat.opacity = mop;
  s.mist.visible = mop > 0.01;
}
```

`setCatch()` body loop: also `s.mistMat.opacity *= bodyOp; s.mist.visible = s.mistMat.opacity > 0.01;`
when non-null.

### 4.4 Why this is route-safe (owner decision 1), with no new data

- `heroRowFor` (src/core/chase/chase.ts:94) picks the largest row whose uphill edge is at or above
  `heroZ - 0.5`. The route is rows > heroRow (`refreshRoute`), and `rowBoxes` puts each row's route
  anchor at `zTop - 2.5` and its pads at `z <= zTop - 1`. So the next on-route anchor, its pad and
  the hero's landing zone always lie at `z < heroZ - 0.5`, downhill.
- A mist card is drawn only when `mistZ > heroZ + ROUTE_CLEAR` (fully from `heroZ + 10`). The
  reversed rig puts the camera downhill of the hero looking +Z, so every route object is nearer to
  the camera than every visible card. The card has `depthTest: true, depthWrite: false`, so opaque
  route geometry always draws over it, and transparent route effects at renderOrder 0 sort after it
  (back-to-front). Mist cannot hide or tint the route, and never appears around the hero.
- The cards sit on already-passed rows, decoys and bare hillside only (rows behind the hero are
  recycled after two rows), which is what "decorative roofs" means here.
- Colour: `#cdd0da` cool grey, radial with no edges, so it cannot read as a cream rectangular pad.
- `MIST_PULL` puts the card in front of the roof under its segment, so that roof washes out behind
  it instead of cutting it. The card's soft rim takes any remaining intersection line, and the
  segment (renderOrder 1, drawn later) sits on top of its own mist.

## 5. Render order (final)

sky -2 .. -1 (skyView/backdrop, unchanged) -> opaque world -> transparent renderOrder 0 sorted by
depth (mist cards, anchor/route effects, blob) -> cloud segments 1 -> head 2 (999 during the catch,
unchanged).

## 6. T296 dragon item (line ~300, `headScreen`)

Today `headScreen` falls back to `this.target`, which is (0,0,0) when there is no head, so the HUD
iris closes on the projection of world origin. Change it to:

```ts
headScreen(camera: PerspectiveCamera, out: { x: number; y: number }): void {
  const head = this.headSprite;
  if (head === null) return; // no head (head-a failed): leave out as the caller set it
  this.pTop.copy(head.position).project(camera);
  out.x = 0.5 + this.pTop.x / 2;
  out.y = 0.5 - this.pTop.y / 2;
}
```

game.ts starts `headScr` at (0.5, 0.5) and only `headScreen` writes it, so without a head the iris
uses screen centre, never world origin. Hiding the iris completely would need a game.ts line
(`ck = 0` when there is no head). That is outside decision 4, so it is listed as an open item, not
done here.

## 7. Edge cases

- Tail tip: amplitude peaks at u = 1 (lateral 8, vertical 4.5). It carries no card; the count-2
  card covers it. If the tip dips into a roof with a visible cut in the shots, use V_AMP 4.0 first
  and keep the range.
- Lens fade: `lensK` keeps cards out of the first 8 m and fades them over the next 8 m. The width
  cap (18 m) keeps one card under ~25% of a coarse screen. At catch range (gap 2.5) the neck card is
  at about heroZ + 2, so `routeK` = 0 and it is off.
- Catch: body and mist fade together through `bodyOp`. The head is untouched.
- Tier switch: `setTier` -> `build()` -> `clearBuilt()` removes the cards and their materials; the
  shared texture survives; the card set follows the new tier table. No console errors.
- Failed segment texture: that segment and its card are skipped. With seg-a failing, Medium loses
  all 5 cards (even indices are seg-a); this is accepted, and the clouds still render.
- Missing head-a: no head, the catch is a no-op (unchanged), `headScreen` leaves `out` alone.
- Node tests: no `document`, so `mistTexture()` returns null and no cards are built. Existing
  segment-count assertions still hold (Low with seg-b failing -> 3 segments < 6).
- `pin` path (unused today): `op` already multiplies the card opacity.

## 8. Acceptance checklist (run by the controller/implementer, not the tech lead)

Before editing: `node tools/shots-chase.mjs t290b-before` (baseline; no t291 shots are on disk now).
After: `node tools/shots-chase.mjs t291`. Use the PATH prefix from the handoff.

1. `t291-play-landscape.png`, `t291-play-portrait.png`: no straight hard cut where a cloud segment
   meets a roof; where the body crosses houses, the roofs wash toward cool grey.
2. Same shots: the body is continuous from neck to tail, with no gaps or beads at u 0.4-0.6 (about
   segments 4-6 from the head on Medium).
3. Head: same place and size as in `t290b-before` (only bob and loom differ). No vertical wave on it.
4. The body visibly undulates vertically. Compare `t291-cloud-creep.png` with a second run, or with
   the phone at `?mode=chase&debug`: dips travel head to tail together with the lateral wave.
5. No mist on or around the hero, the next gold anchor, its pad or the landing zone in any shot,
   portrait included (lens shift).
6. No mist card covers more than ~25% of the screen. Catch face shots: body and mist gone by k 0.4.
7. Calls (`__ztStats`, printed per shot): Medium chase <= Classic Medium + 9 (owner decision 2) and
   <= 70 absolute; Low <= 55; High <= 85. Report the before/after numbers. shots-chase prints
   OVER BUDGET above +6; if Medium lands between +7 and +9, report it as owner-tolerated and do not
   edit the script. If Medium goes over +9, switch Medium to `i % 3 === 0` (i 0, 3, 6, 9 = 4 cards)
   and re-shoot.
8. Grep the diff: no `new ` inside `update`, `setCatch`, `headScreen`.
9. Gates: tsc --noEmit, vite build, vitest (419 green, the 4 dragonSpriteView tests unchanged), lint.
10. Phone (Medium) via the preview QR: no stutter, 60 fps feel unchanged.

## 9. Unverified assumptions

- A1: Medium chase headroom under the +6 gate today is unknown ("comfortably under" per the handoff,
  not measured in any doc). +5 cards may push the printed gate to +7..+9.
- A2: the tail the owner likes is the a/b look (Medium and phone). On High the old tail was puff-d/e;
  High's tail changes.
- A3: during the pan reveal the camera is still downhill of the hero. If not, section 4.4 does not
  hold for the pan; check the first second of the t291 run.
- A4: route/anchor visual effects are opaque, or transparent at renderOrder 0. Grep found no other
  renderOrder in the world except sky/backdrop (-2..-1) and god rays (1).
- A5: sprite vs roof intersections are hidden by MIST_PULL 5 m. With a narrower row, a roof nearer
  than the card can still cut the card's lower rim. The rim is low-alpha, so the cut should not
  show; check it in the shots.

## 10. Conflicts and open items for the owner

- C1 (head clipping): the head sits at hill + 7 with a 6.7 m tall sprite (up to 10.7 m at full
  loom), so it overlaps roof level (hill + 8) whenever it hovers over a passed row. "Head stable"
  (decision/handoff) keeps HOVER as is, so this spec does not remove head-vs-roof cuts. The Medium
  neck card is off near the hero by design (route rule). Owner call: raise the head HOVER, accept
  it, or allow a head-level card.
- C2: the shots-chase +6 gate and the owner's +6..+9 tolerance disagree for Medium (and for High,
  which already blips +1). Decide whether to change the gate.
- C3: T296 "skip or hide": the spec leaves the iris at screen centre. A full hide needs one game.ts
  line.
- C4: no test is added for the mist or for the headScreen fix (decision 4: one file). Suggest a
  follow-up card adding a `headScreen` no-head test.
