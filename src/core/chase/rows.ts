// Dragon Chase rows: a pure, stateless row generator for the endless hillside.
// rowSpec(seed, r) says what row r looks like; rowBoxes(spec, zTop, out) turns it into boxes with
// exactly the tools/genLevel.mjs formulas, so rows 0-3 equal the L1 opening. No three, no DOM.

import { DEFAULT_TUNING } from '../config';
import type { Tuning } from '../config';

// Hill and house constants (mirrors of tools/genLevel.mjs; tests compare against l1.json).
export const GRADE_DEG = 20;
export const GRADE = Math.tan((GRADE_DEG * Math.PI) / 180); // metres of drop per metre of z
export const GROUND_Y0 = -8; // hill surface height at z = 0
export const WALL_H = 8;
export const ROW_DROP = 2.6;
export const ROOF_T = 0.6;
export const HALF_X = 4;
export const HALF_Z = 3.5;
export const HOUSE_LEN = 2 * HALF_Z;
export const BALCONY_DEPTH = 1.8;
export const BALCONY_DROP = 3;
export const ANCHOR_H = 1.6;
export const ANCHOR_Z = 1;
export const CURB_H = 0.4;
export const CURB_T = 0.25;
export const PLINTH_H = 0.8;
export const DECOY_X = 12;
export const PITCH_RISE = 2;
export const HILL_HALF_X = 34;
export const HILL_Z_MAX = 26;
export const WALL_T = 2;
export const STYLE_HIDDEN = 5;
export const ROW0_ZTOP = HALF_Z; // uphill edge of row 0 (house 0 is centred on z = 0)
export const MAX_HOUSES = 3;

type ChaseTuning = Tuning['chase'];

// Fixed slot layout: every row owns the same index ranges, so ids never change.
export const SLOT_SOLIDS = 3 * 6 + 1 + 2; // 3 houses x 6 parts, decoy wall, two side walls
export const SLOT_PADS = 3;
export const SLOT_ANCHORS = 2; // 0 route, 1 decoy
export const SLOT_ROOFS = 1; // pitched decoy roof (2 ramps)
export const DECOY_SOLID = 18;
export const WALL_L_SOLID = 19;
export const WALL_R_SOLID = 20;

export const FIXED_ROWS = 4; // rows 0..3 are the L1 opening
const WALL_OVERLAP = 0.2;

export function hillY(z: number): number {
  return GRADE * z + GROUND_Y0;
}

export class RowSpec {
  n = 2; // houses in the row (1..3)
  gap = 13; // open hillside after the row, edge to edge
  cx = 0; // lane x
  decoy = 0; // -1 left, 0 none, 1 right
  pitched = 0; // the decoy wears a pitched roof
  drift = 0; // sign of (next lane x - cx): the plinths sit on the far side so they never block the hop
}

/** Stateless uniform [0,1) from (seed, row, salt): mulberry32 on a hashed state. */
export function hash01(seed: number, r: number, salt: number): number {
  let a = (seed ^ Math.imul(r + 1, 0x9e3779b1) ^ Math.imul(salt + 1, 0x85ebca6b)) >>> 0;
  a = (a + 0x6d2b79f5) >>> 0;
  let t = Math.imul(a ^ (a >>> 15), 1 | a);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}

/**
 * Lane x of row r: a clamped random walk in 2 m steps (|delta| <= 6, |x| <= 8), O(r). Rows 0-4
 * stay on x = 0 (the L1 opening), the walk starts at row 5.
 */
export function laneX(seed: number, r: number): number {
  let x = 0;
  for (let i = FIXED_ROWS + 1; i <= r; i++) {
    const step = (Math.floor(hash01(seed, i, 3) * 7) - 3) * 2; // -6..6
    x += step;
    if (x > 8) x = 8;
    if (x < -8) x = -8;
  }
  return x;
}

/**
 * Row difficulty in [0,1] as a pure, monotonic function of the dragon's speed: 0 at v0, 1 at vMax,
 * clamped outside. Rows are written once, when they stream in, using the speed at that moment.
 */
export function difficultyFor(dragonSpeed: number, cfg: Tuning): number {
  const lo = cfg.chase.v0;
  const hi = cfg.chase.vMax;
  if (!(hi > lo)) return 0;
  const d = (dragonSpeed - lo) / (hi - lo);
  return d < 0 ? 0 : d > 1 ? 1 : d;
}

/**
 * Row r for a given difficulty d in [0,1]. Deterministic in (seed, r, d). Gaps stay within
 * gapBase + [0, gapSpanLo + (gapSpanHi - gapSpanLo) d]: 17 m at most, which the bots cross.
 */
export function rowSpecInto(
  seed: number,
  r: number,
  out: RowSpec,
  d = 0,
  k: ChaseTuning = DEFAULT_TUNING.chase,
): void {
  if (r < FIXED_ROWS) {
    out.n = 2;
    out.gap = 13;
    out.cx = 0;
    out.decoy = r === 1 ? -1 : r === 3 ? 1 : 0;
    out.pitched = r === 1 ? 1 : 0;
    out.drift = 0;
    return;
  }
  const u = hash01(seed, r, 1);
  const p1 = k.oneHouseBase + k.oneHouseGain * d;
  out.n = u < p1 ? 1 : u < 0.7 ? 2 : 3;
  out.gap = k.gapBase + hash01(seed, r, 2) * (k.gapSpanLo + (k.gapSpanHi - k.gapSpanLo) * d);
  out.cx = laneX(seed, r);
  const nx = laneX(seed, r + 1);
  out.drift = nx > out.cx ? 1 : nx < out.cx ? -1 : 0;
  out.decoy = 0;
  if (hash01(seed, r, 4) < k.decoyBase + k.decoyGain * d)
    out.decoy = hash01(seed, r, 5) < 0.5 ? -1 : 1;
  out.pitched = out.decoy !== 0 && hash01(seed, r, 6) < 0.5 ? 1 : 0;
}

export function rowSpec(
  seed: number,
  r: number,
  d = 0,
  k: ChaseTuning = DEFAULT_TUNING.chase,
): RowSpec {
  const s = new RowSpec();
  rowSpecInto(seed, r, s, d, k);
  return s;
}

/** Uphill edge of the row after the one at zTop with this spec. */
export function nextZTop(zTop: number, spec: RowSpec): number {
  return zTop - HOUSE_LEN * spec.n - spec.gap;
}

/** Flat output of rowBoxes: boxes are [minX, minY, minZ, maxX, maxY, maxZ]. */
export class RowBoxes {
  solid = new Float64Array(SLOT_SOLIDS * 6);
  solidUsed = new Uint8Array(SLOT_SOLIDS);
  style = new Uint8Array(SLOT_SOLIDS);
  pad = new Float64Array(SLOT_PADS * 6);
  padUsed = new Uint8Array(SLOT_PADS);
  anchor = new Float64Array(SLOT_ANCHORS * 3);
  anchorUsed = new Uint8Array(SLOT_ANCHORS);
  roof = new Float64Array(6);
  roofUsed = 0;
  /** House top (roof surface) of each house, for tests and the bot. */
  top = new Float64Array(MAX_HOUSES);
  centreZ = new Float64Array(MAX_HOUSES);
}

function put(
  a: Float64Array,
  i: number,
  x0: number,
  y0: number,
  z0: number,
  x1: number,
  y1: number,
  z1: number,
): void {
  const o = i * 6;
  a[o] = x0;
  a[o + 1] = y0;
  a[o + 2] = z0;
  a[o + 3] = x1;
  a[o + 4] = y1;
  a[o + 5] = z1;
}

/**
 * Boxes of the row whose uphill edge is at zTop (absolute coordinates). Translation invariant
 * along the fall line: rowBoxes(s, z + dz) = rowBoxes(s, z) shifted by (0, GRADE*dz, dz).
 * `hasAnchor` is false for row 0 (nothing to hook back to).
 */
export function rowBoxes(spec: RowSpec, zTop: number, hasAnchor: boolean, out: RowBoxes): void {
  out.solidUsed.fill(0);
  out.padUsed.fill(0);
  out.anchorUsed.fill(0);
  out.roofUsed = 0;
  let top0 = 0;
  let cz0 = 0;
  for (let k = 0; k < spec.n; k++) {
    const cz = zTop - HALF_Z - HOUSE_LEN * k;
    const top = hillY(cz) + WALL_H - (k === 0 ? 0 : ROW_DROP);
    const x0 = spec.cx - HALF_X;
    const x1 = spec.cx + HALF_X;
    const z0 = cz - HALF_Z;
    const z1 = cz + HALF_Z;
    out.top[k] = top;
    out.centreZ[k] = cz;
    if (k === 0) {
      top0 = top;
      cz0 = cz;
    }
    const b = k * 6;
    put(out.solid, b, x0, top - ROOF_T, z0, x1, top, z1);
    out.style[b] = 2;
    put(out.solid, b + 1, x0, hillY(z0), z0, x1, top - ROOF_T, z1);
    out.style[b + 1] = 1;
    const dir = k % 2 === 0 ? 1 : -1;
    const face = spec.cx + dir * HALF_X;
    const xa = Math.min(face, face + dir * BALCONY_DEPTH);
    const xb = Math.max(face, face + dir * BALCONY_DEPTH);
    put(out.solid, b + 2, xa, top - BALCONY_DROP - 0.3, z0 + 1, xb, top - BALCONY_DROP, z1 - 1);
    out.style[b + 2] = 1;
    put(out.solid, b + 3, x0, top, z0, x0 + CURB_T, top + CURB_H, z1);
    out.style[b + 3] = 4;
    put(out.solid, b + 4, x1 - CURB_T, top, z0, x1, top + CURB_H, z1);
    out.style[b + 4] = 4;
    const left = spec.drift === 0 ? k % 2 === 0 : spec.drift > 0;
    const tx = left ? x0 + 1.1 : x1 - 1.1;
    put(out.solid, b + 5, tx - 0.8, top, cz - 1.6, tx + 0.8, top + PLINTH_H, cz);
    out.style[b + 5] = 4;
    for (let j = 0; j < 6; j++) out.solidUsed[b + j] = 1;
    put(out.pad, k, x0 + 1, top, z0 + 1, x1 - 1, top, z1 - 1);
    out.padUsed[k] = 1;
  }
  if (hasAnchor) {
    out.anchor[0] = spec.cx;
    out.anchor[1] = top0 + ANCHOR_H;
    out.anchor[2] = cz0 + ANCHOR_Z;
    out.anchorUsed[0] = 1;
  }
  if (spec.decoy !== 0) {
    const dx = spec.cx + spec.decoy * DECOY_X;
    const z0 = cz0 - HALF_Z;
    const z1 = cz0 + HALF_Z;
    put(out.solid, DECOY_SOLID, dx - 3.5, hillY(z0), z0, dx + 3.5, top0 - 0.6, z1);
    out.style[DECOY_SOLID] = 3;
    out.solidUsed[DECOY_SOLID] = 1;
    if (spec.pitched !== 0) {
      put(out.roof, 0, dx - 3.5, top0 - 0.6, z0, dx + 3.5, top0 - 0.6 + PITCH_RISE, z1);
      out.roofUsed = 1;
    }
    out.anchor[3] = dx;
    out.anchor[4] = top0 + ANCHOR_H;
    out.anchor[5] = cz0 + ANCHOR_Z;
    out.anchorUsed[1] = 1;
  }
  // Invisible side walls over this row and the hillside after it (contiguous, slightly overlapped).
  const zt = zTop + WALL_OVERLAP;
  const zb = nextZTop(zTop, spec) - WALL_OVERLAP;
  const yLo = hillY(zb) - 20;
  const yHi = hillY(zt) + 60;
  put(out.solid, WALL_L_SOLID, -HILL_HALF_X - WALL_T, yLo, zb, -HILL_HALF_X, yHi, zt);
  put(out.solid, WALL_R_SOLID, HILL_HALF_X, yLo, zb, HILL_HALF_X + WALL_T, yHi, zt);
  out.style[WALL_L_SOLID] = STYLE_HIDDEN;
  out.style[WALL_R_SOLID] = STYLE_HIDDEN;
  out.solidUsed[WALL_L_SOLID] = 1;
  out.solidUsed[WALL_R_SOLID] = 1;
}
