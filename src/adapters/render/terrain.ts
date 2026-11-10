// Visual hillside height field: pure functions, no three imports, node-testable.
// Contract with the level (tools/genLevel.mjs): inside the collider hill (|x| <= HILL_HALF_X) the
// surface is EXACTLY the planar ramp hillY(z) = GRADE * z + GROUND_Y0, so what the hero stands on
// is what is drawn. Outside it the ground blends into forested foothills that rise toward the
// mountain ranges (render/backdrop.ts), and below the last house it levels into a valley floor.
// These three mirror tools/genLevel.mjs (a node script, not importable here); a test pins them.
export const GRADE = Math.tan((20 * Math.PI) / 180); // metres of drop per metre of z
export const GROUND_Y0 = -8; // surface height at z = 0 (the first roof top is y = 0)
export const HILL_HALF_X = 34; // collider hill half width

/** Edge of the drawn terrain (the mountain ranges start beyond this). */
export const TERRAIN_HALF_X = 320;
export const TERRAIN_Z_MAX = 200; // uphill, behind the spawn
export const TERRAIN_Z_MIN = -360; // downhill, across the valley

const VALLEY_Z = -150; // the plane stops descending here
const VALLEY_DROP = 5; // further drop while it rolls out into the valley floor
const FAR_RISE_Z = -260; // the far valley wall starts to rise
const BLEND_X0 = HILL_HALF_X; // exact plane inside this
const BLEND_X1 = HILL_HALF_X + 18; // fully blended outside this

function smooth(a: number, b: number, v: number): number {
  const t = Math.max(0, Math.min(1, (v - a) / (b - a)));
  return t * t * (3 - 2 * t);
}

/** The planar hill the hero walks on (the collider ramp), extended in both directions. */
export function planeY(z: number): number {
  return GRADE * z + GROUND_Y0;
}

/** Cheap deterministic value noise in roughly [-1, 1]. */
function wobble(x: number, z: number): number {
  return (
    0.55 * Math.sin(x * 0.045 + 1.7) * Math.cos(z * 0.038 + 0.4) +
    0.3 * Math.sin(x * 0.11 + z * 0.07 + 2.1) +
    0.15 * Math.sin(x * 0.27 - z * 0.21)
  );
}

/** Height of the visible ground at (x, z). Equals planeY(z) for |x| <= HILL_HALF_X. */
export function terrainY(x: number, z: number): number {
  // Centre-line profile: the plane, then a valley floor, then the far wall rising.
  let base = planeY(z);
  if (z < VALLEY_Z) {
    const d = VALLEY_Z - z;
    base = planeY(VALLEY_Z) - VALLEY_DROP * (1 - Math.exp(-d / 40));
    if (z < FAR_RISE_Z) {
      const f = FAR_RISE_Z - z;
      base += 0.0006 * f * f;
    }
  } else if (z > 40) {
    // behind the spawn the hill keeps climbing and curls up into a shoulder
    const f = z - 40;
    base += 0.0009 * f * f;
  }
  const ax = Math.abs(x);
  const w = smooth(BLEND_X0, BLEND_X1, ax);
  if (w <= 0) return base;
  // Flanks: a bowl that rises into the foothills, with soft undulation.
  const out = ax - BLEND_X0;
  const bowl = 0.0014 * out * out + 0.05 * out;
  return base + w * (bowl + 3.2 * wobble(x, z) * smooth(BLEND_X0, BLEND_X0 + 60, ax));
}
