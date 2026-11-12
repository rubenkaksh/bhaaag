// T290 game-over design: "the dragon's face fills the view as the cloud closes in".
//
// DESIGN SPEC (owner: premium seat, 2026-11-11). Sprite dragon only; no puff face, no new art.
//
// 1. Problem seen in art/shots/auto/t290e-game-over*.png: at the catch the face is not on
//    screen at all (the head dips under the hill line, a uniform veil and a full-screen scrim
//    grey everything out) and the body shows grass/rock because three "cloud puff" crops are
//    really stone platforms from the concept sheet.
//
// 2. The catch beat (CHASE_OVER_DELAY_S, raise 0.9 -> 1.1 s). Progress k = deadT / delay, 0..1.
//    - The head sprite leaves its world position and is placed in CAMERA SPACE, so framing is
//      identical on every hill, row and viewport: centre = camPos + fwd*CATCH_DIST
//      + right*(cx*visW) + up*(cy*visH), height = h*visH, where visH = 2*CATCH_DIST*tan(fov/2),
//      visW = visH*aspect and (cx, cy, h) = catchPose(aspect, settle).
//    - Blend world -> camera placement with easeOutBack(k) (overshoot 1.08): it reads as a
//      lunge at the lens, not a fade. Scale blends the same way.
//    - Head material during the beat: depthTest off, renderOrder above everything in the
//      scene, fog off, toneMapped off (painted colours must not be re-exposed or bloomed white;
//      see the blown-out face in t290e-cloud-creep.png). Pose locked to head-a, no pose swap.
//    - Body chain: opacity 1 -> 0 over k 0..0.4. The head crop carries its own flanking cloud
//      body, so the creature still reads; a world-space chain behind a camera-space head would
//      shear.
//    - Cloud cover: the veil stops being a flat wash. It becomes a closing iris centred on the
//      face: radial-gradient(circle at face centre, transparent R, cloud colour R + 18%),
//      R from 120% down to 46% of the shorter viewport side as k goes 0 -> 1. Edges go white,
//      the face is the last thing left. Flat veil alpha is forced to 0 once k > 0.
//
// 3. The card (settle, 0.35 s after the card shows; settle 0..1, smoothstep inside catchPose).
//    The face must stay visible next to the card, never under the text:
//    - Portrait / near-square (aspect < SIDE_LAYOUT_ASPECT): head docks at the top (antlers 3%
//      from the top edge), card content starts at 46% from the top.
//      Scrim: linear-gradient(to bottom, transparent 0, transparent 38%, scrim 50%).
//    - Landscape: head docks on the left (face centre at 26% of the width), card content sits
//      in the right 54%. Scrim: linear-gradient(to right, transparent 0, transparent 40%, scrim 52%).
//    - The iris veil fades out over the settle (the scrim takes over); the head keeps a slow
//      bob of +-1% visH and nothing else. No flicker, no pose swap.
//    - Play-only HUD (score chip, objective hint, dragon gap bar, touch controls) is hidden
//      while the card is up. Pause stays.
//
// 4. Budgets: T290e replaced the segment chain with one ribbon mesh + tail sprite; the head is
//    a square 512x512 sprite (HEAD_H_OVER_W 1) and "face" now means the whole antler span.
//    No per-frame allocation in the beat. Classic mode and src/core untouched.
//
// 5. Acceptance (judged from screenshots at 390x844 and 844x390):
//    fill frame (k = 1, before the card): both eyes, both antlers and the open mouth inside the
//    viewport, face width >= 80% of the shorter side, not washed out;
//    card frame: face fully visible beside/above the card, every card line readable, no grass
//    or rock anywhere in the dragon.

/** Head sprite height / width: square v2 head (512x512, re-centred). */
export const HEAD_H_OVER_W = 1;
/** Share of the head sprite's width the catch framing must fit: antler tip to antler tip on head-a v2. */
export const FACE_FRAC = 0.9;
/** Metres in front of the camera for the camera-space head (in front of the hero at the catch). */
export const CATCH_DIST = 9;
/** At or above this aspect the card frame uses the side-by-side layout. */
export const SIDE_LAYOUT_ASPECT = 1.2;

/**
 * Camera-space head placement. cx / cy: head centre as a fraction of the visible width / height,
 * measured from the viewport centre (+x right, +y up). h: sprite height as a fraction of the
 * visible height (sprite width follows from HEAD_H_OVER_W).
 */
export type CatchPose = { cx: number; cy: number; h: number };

const FILL_MAX_H = 0.96; // landscape: limited by height (face = 83% of the height)
const FILL_FACE_W = 0.92; // portrait: face (not sprite) spans this share of the width
const TOP_MAX_H = 0.36;
const TOP_FACE_W = 0.8;
const TOP_MARGIN = 0.03;
const SIDE_H = 0.78;
const SIDE_CX = -0.24;
const SIDE_FACE_W = 0.36; // face centre 26% + half of 36% = 44% of the width

/** Largest h for which the face spans `faceW` of the visible width at this aspect. */
function hForFaceWidth(faceW: number, aspect: number): number {
  return (faceW * HEAD_H_OVER_W * aspect) / FACE_FRAC;
}

function smooth(x: number): number {
  const t = Math.min(1, Math.max(0, x));
  return t * t * (3 - 2 * t);
}

/**
 * aspect: viewport width / height. settle: 0 = the fill frame at the end of the catch beat,
 * 1 = docked next to the game-over card. Writes into `out` (no allocation) and returns it.
 */
export function catchPose(aspect: number, settle: number, out: CatchPose): CatchPose {
  const a = Math.max(0.2, aspect);
  const fillH = Math.min(FILL_MAX_H, hForFaceWidth(FILL_FACE_W, a));
  const fillCy = a < 1 ? 0.06 : 0;

  let dockCx = 0;
  let dockCy = 0;
  let dockH: number;
  if (a >= SIDE_LAYOUT_ASPECT) {
    // Narrow landscapes: shrink so the face's right edge stays left of the card (46% line).
    dockH = Math.min(SIDE_H, hForFaceWidth(SIDE_FACE_W, a));
    dockCx = SIDE_CX;
  } else {
    dockH = Math.min(TOP_MAX_H, hForFaceWidth(TOP_FACE_W, a));
    dockCy = 0.5 - TOP_MARGIN - dockH / 2;
  }

  const s = smooth(settle);
  out.cx = dockCx * s;
  out.cy = fillCy + (dockCy - fillCy) * s;
  out.h = fillH + (dockH - fillH) * s;
  return out;
}

/** Overshooting ease for the lunge (peaks about 1.08, ends at 1). */
export function easeOutBack(k: number): number {
  const t = Math.min(1, Math.max(0, k)) - 1;
  const c = 1.4;
  return 1 + (c + 1) * t * t * t + c * t * t;
}

/** Iris radius as a fraction of the shorter viewport side, k 0..1 through the catch beat. */
export function irisRadius(k: number): number {
  return 1.2 - 0.74 * smooth(k);
}
