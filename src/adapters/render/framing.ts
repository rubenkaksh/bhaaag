import type { Tuning } from '../../core/config';
import type { ViewportLayout } from '../../app/viewport';

// Camera framing per viewport (three-track plan B1). Pure: no three, no DOM.
// Landscape (aspect >= 1) returns `base` unchanged. Portrait blends to a taller, wider-FOV,
// centred, higher camera between aspect 1.0 and 0.6 (smoothstep), plus a lens shift that parks
// the hero low in the frame so more of the descent shows above him.
//
// lensShiftY follows the GameScene.setLensShift convention: fraction of the viewport height passed
// to camera.setViewOffset as +y. A NEGATIVE value moves the image (and the principal point) DOWN,
// so portrait returns a negative number. The principal point sits at 50% - lensShiftY of the
// height; CSS uses `calc(50% - var(--lens-shift) * 100%)`.
export type Framing = { camera: Tuning['camera']; lensShiftY: number };

const PORTRAIT_ASPECT = 0.6;
const LENS_SHIFT_PORTRAIT = -0.14;
const DEG = Math.PI / 180;

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

/** 0 at aspect >= 1, 1 at aspect <= 0.6, smooth in between. */
export function portraitBlend(aspect: number): number {
  const x = Math.min(1, Math.max(0, (1 - aspect) / (1 - PORTRAIT_ASPECT)));
  return x * x * (3 - 2 * x);
}

export function framingFor(v: ViewportLayout, base: Tuning['camera']): Framing {
  if (v.aspect >= 1) return { camera: base, lensShiftY: 0 };
  const t = portraitBlend(v.aspect);
  const aspect = Math.max(0.2, v.aspect);
  const fovP = Math.min(88, Math.max(60, (2 * Math.atan(Math.tan(26 * DEG) / aspect)) / DEG));
  const fov = lerp(base.fov, Math.max(base.fov, fovP), t);
  const fovMaxP = Math.min(98, fov + 10);
  return {
    camera: {
      ...base,
      fov,
      fovMax: lerp(base.fovMax, fovMaxP, t),
      dist: lerp(base.dist, 5.6, t),
      distSlide: lerp(base.distSlide, 8.0, t),
      height: lerp(base.height, 2.2, t),
      shoulder: lerp(base.shoulder, 0, t),
      downhillBias: lerp(base.downhillBias, 12, t),
    },
    lensShiftY: LENS_SHIFT_PORTRAIT * t,
  };
}
