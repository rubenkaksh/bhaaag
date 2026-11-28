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
const VALLEY_ABOVE_END = VALLEY_Z - TERRAIN_Z_MIN; // 210: valley start sits this far above the z-min edge
const FAR_RISE_ABOVE_END = 100;

// Extent override for long levels (strategy maze runs to z -700): the valley, far wall and the
// z-min edge slide down together. Default (null) leaves every value exactly as above.
let zMinNow = TERRAIN_Z_MIN;
let valleyZNow = VALLEY_Z;
let farRiseZNow = FAR_RISE_Z;

/**
 * Lets the drawn terrain follow a long level: the plane keeps its grade down to
 * `lastSolidZ - margin`, then rolls into the valley. Pass null (or a level shorter than the
 * default) to restore the stock extents. Never moves the plane inside the hill.
 */
export function setTerrainExtent(lastSolidZ: number | null, margin = 30): void {
  const want = lastSolidZ === null ? TERRAIN_Z_MIN : lastSolidZ - margin - VALLEY_ABOVE_END;
  zMinNow = Math.min(TERRAIN_Z_MIN, want);
  if (zMinNow === TERRAIN_Z_MIN) {
    valleyZNow = VALLEY_Z;
    farRiseZNow = FAR_RISE_Z;
  } else {
    valleyZNow = zMinNow + VALLEY_ABOVE_END;
    farRiseZNow = zMinNow + FAR_RISE_ABOVE_END;
  }
}

/** Downhill edge of the drawn terrain right now (TERRAIN_Z_MIN unless extended). */
export function terrainZMin(): number {
  return zMinNow;
}

/** Where the plane stops descending right now (-150 unless extended). */
export function terrainValleyZ(): number {
  return valleyZNow;
}

const BLEND_X0 = HILL_HALF_X; // exact plane inside this
const BLEND_X1 = HILL_HALF_X + 18; // fully blended outside this

function smooth(a: number, b: number, v: number): number {
  const t = Math.max(0, Math.min(1, (v - a) / (b - a)));
  return t * t * (3 - 2 * t);
}

// Graph levels (ADR 0013): the hill follows the level's own (z, groundY) profile instead of the
// 20 degree plane. null = stock plane. Extended past both ends along the end segments.
let profileNow: [number, number][] | null = null;

/** Sets (or clears with null) the ground profile of a graph level; z must be decreasing. */
export function setTerrainProfile(profile: [number, number][] | null): void {
  profileNow = profile;
}

// Segmented graph levels (ADR 0015): the ground follows the road polyline. field(x, z) gives the
// run's own ground height and the plan distance to the nearest run; null = the straight hill.
type GroundField = (x: number, z: number) => { h: number; d: number };
let fieldNow: GroundField | null = null;

/** Sets (or clears with null) the view-only ground field of a segmented graph level. */
export function setTerrainField(f: GroundField | null): void {
  fieldNow = f;
}

// Extra ground-mesh grid lines (patch and sunk-rect edges of a segmented graph level); null = none.
interface TerrainBreaks {
  xs: readonly number[];
  zs: readonly number[];
}
let breaksNow: TerrainBreaks | null = null;

/** Sets (or clears with null) the extra mesh grid lines of a segmented graph level. */
export function setTerrainBreaks(b: TerrainBreaks | null): void {
  breaksNow = b;
}

export function terrainBreaks(): TerrainBreaks | null {
  return breaksNow;
}

function profileY(p: [number, number][], z: number): number {
  const n = p.length;
  if (z >= p[0][0]) return p[0][1] + ((z - p[0][0]) * (p[1][1] - p[0][1])) / (p[1][0] - p[0][0]);
  for (let i = 1; i < n; i++) {
    if (z >= p[i][0]) {
      const t = (z - p[i - 1][0]) / (p[i][0] - p[i - 1][0]);
      return p[i - 1][1] + t * (p[i][1] - p[i - 1][1]);
    }
  }
  return p[n - 1][1];
}

/** The planar hill the hero walks on (the collider ramp), extended in both directions. */
export function planeY(z: number): number {
  if (profileNow !== null) return profileY(profileNow, z);
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

const RISE_MAX = 18; // m: flank rise far from the road (was unbounded 0.0014 d^2 + 0.05 d)
const RISE_L = 55; // m: e-folding distance of the rise
const CAP = 24; // m: hard ceiling above max(f.h, planeY(z))
const TAP = 14; // m: box-filter step that melts the seam crease
const TERRACE_H = 3.5; // m: terrace step height, faded out by d = 120
const SINK = 28; // m: far rim sinks this much between d 150 and 280 (tucks under the near card)

function fieldRaw(x: number, z: number): number {
  if (fieldNow === null) return 0;
  const f = fieldNow(x, z);
  const rise = RISE_MAX * (1 - Math.exp(-f.d / RISE_L));
  return f.h + rise - SINK * smooth(150, 280, f.d) + 1.6 * wobble(x, z) * smooth(0, 60, f.d);
}

function terrace(r: number): number {
  const s = r / TERRACE_H;
  const k = Math.floor(s);
  return TERRACE_H * (k + smooth(0.2, 0.8, s - k));
}

/** Height of the visible ground at (x, z). Equals planeY(z) for |x| <= HILL_HALF_X. */
export function terrainY(x: number, z: number): number {
  if (fieldNow !== null) {
    const f = fieldNow(x, z);
    const w = smooth(0, 18, f.d);
    if (w <= 0) return f.h;
    const raw = fieldRaw(x, z);
    // x taps slide east near the seam (x 20..44) so the filter never samples across it
    const sh = 2 * TAP * smooth(20, 44, x);
    const soft =
      (fieldRaw(x - 2 * TAP + sh, z) +
        fieldRaw(x - TAP + sh, z) +
        raw +
        fieldRaw(x + TAP + sh, z) +
        fieldRaw(x + 2 * TAP + sh, z) +
        fieldRaw(x, z - TAP) +
        fieldRaw(x, z + TAP)) /
      7;
    let y = raw + smooth(4, 30, f.d) * (soft - raw); // filter only off the road
    y = Math.min(y, Math.max(f.h, planeY(z)) + CAP);
    const r = y - f.h;
    if (r > 0) y = f.h + r + (1 - smooth(80, 120, f.d)) * (terrace(r) - r); // terraces fade out far away
    return f.h + w * (y - f.h);
  }
  // Centre-line profile: the plane, then a valley floor, then the far wall rising.
  let base = planeY(z);
  if (z < valleyZNow) {
    const d = valleyZNow - z;
    base = planeY(valleyZNow) - VALLEY_DROP * (1 - Math.exp(-d / 40));
    if (z < farRiseZNow) {
      const f = farRiseZNow - z;
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
