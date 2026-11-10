// Packed-village flanks (docs/graphics-spec.md, docs/level-layout.md): a pure, deterministic plan
// for the filler houses on the hillside beyond |x| = 30. No three import; the builder in
// placeDecor.ts turns the plan into instanced kit pieces. Scenery only: the hero never stands here.

export const FLANK_X0 = 30; // plots end here; the smooth hillside starts
export const ROUTE_SLOPE = 0.2222; // the plot staircase: 4 m down per 18 m
export const FLANK_SLOPE = 0.45; // about 24 degrees down the fall line (25-26 with the cross slope)
const SLOPE_RAMP = 50; // flank slope eases from route slope to steep over this many metres of |x|
const PIVOT_Z = -70; // the steeper slope pivots here, so the village meets the route height mid-way
const Z_STEEP_LO = -140;
const Z_STEEP_HI = 0;
const CROSS = 0.16; // hillside rises sideways, the route lies in a shallow valley
const CROSS_MAX = 110;
const BASE_DROP = 10; // flank line sits under the plot mean so plot edges always read as on top

export const BANK_X1 = 38; // the earth bank from the plot edge (x = 30) to the smooth hillside ends here
export const FILL_X0 = 38.6; // first filler column starts here (the bank and gap trees stay left of it)
export const FILL_COLS = 5;
export const FILL_PITCH_X = 11.5;
export const FILL_PITCH_Z = 12;
export const FILL_Z_TOP = 42;
export const FILL_Z_BOTTOM = -214;
/** Dense forest begins where the village ends. */
export const FOREST_X0 = FILL_X0 + FILL_COLS * FILL_PITCH_X + 1;
export const FOREST_X1 = 135;

function clamp(v: number, lo: number, hi: number): number {
  return v < lo ? lo : v > hi ? hi : v;
}

/** Smooth hillside height at (x, z) for |x| >= 30. Monotone, no steps: the visible surface. */
export function flankY(x: number, z: number): number {
  const ax = Math.abs(x);
  const u = clamp((ax - FLANK_X0) / SLOPE_RAMP, 0, 1);
  const s = ROUTE_SLOPE + (FLANK_SLOPE - ROUTE_SLOPE) * u * u * (3 - 2 * u);
  const zc = clamp(z, Z_STEEP_LO, Z_STEEP_HI);
  const base = ROUTE_SLOPE * z - BASE_DROP;
  return base + (s - ROUTE_SLOPE) * (zc - PIVOT_Z) + CROSS * Math.min(ax - FLANK_X0, CROSS_MAX);
}

export class FillerHouse {
  /** Unsigned distance from the lane axis, mirrored by `side`. */
  x0 = 0;
  x1 = 0;
  z0 = 0;
  z1 = 0;
  side = 1;
  col = 0;
  row = 0;
  storeys = 2;
  /** 0 hip, 1 tall elongated hip, 2 low wide hip. */
  roofVariant = 0;
  roofH = 1.4;
  /** Wall colour palette index (see placeDecor): 0 brick, 1 plaster. */
  brickGround = false;
  colorIdx = 0;
  roofColorIdx = 0;
  balcony = false;
  tank = false;
}

/** Tiny seeded generator local to the plan, so the main decor stream is untouched. */
export function fillRng(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Deterministic seeded grid on the slope: FILL_COLS columns per side, one row every FILL_PITCH_Z.
 * Each cell holds at most one house, jittered inside its cell so lanes (>= 2.5 m) and alleys
 * (>= 3 m) always remain. Rows step down with the ground because every house is placed on flankY.
 */
export function planFillers(seed: number): FillerHouse[] {
  const rng = fillRng(seed);
  const out: FillerHouse[] = [];
  const rows = Math.floor((FILL_Z_TOP - FILL_Z_BOTTOM) / FILL_PITCH_Z);
  for (let c = 0; c < FILL_COLS; c++) {
    for (let side = -1; side <= 1; side += 2) {
      for (let r = 0; r < rows; r++) {
        // always consume the same number of draws per cell: plans stay stable under tweaks
        const rw = rng();
        const rd = rng();
        const rj = rng();
        const rk = rng();
        const rs = rng();
        const rv = rng();
        const rc = rng();
        const rt = rng();
        const rb = rng();
        const rBal = rng();
        const rTank = rng();
        const rBrick = rng();
        const rSkip = rng();
        if (rSkip < 0.07) continue; // the odd gap: a yard
        const w = 6 + 3 * rw;
        const d = 6 + 3 * rd;
        const cellX = FILL_X0 + c * FILL_PITCH_X;
        // alternate rows shift half a metre so lanes zig-zag a little
        const shift = (r & 1) * 0.6;
        const x0 = cellX + shift + (FILL_PITCH_X - 2.6 - w) * rj;
        const zTop = FILL_Z_TOP - r * FILL_PITCH_Z;
        const z0 = zTop - FILL_PITCH_Z + 3.2 + (FILL_PITCH_Z - 3.4 - d) * rk;
        const h = new FillerHouse();
        h.x0 = x0;
        h.x1 = x0 + w;
        h.z0 = z0;
        h.z1 = z0 + d;
        h.side = side;
        h.col = c;
        h.row = r;
        h.storeys = rs < 0.3 ? 2 : 3;
        h.roofVariant = rv < 0.45 ? 0 : rv < 0.8 ? 1 : 2;
        h.roofH = h.roofVariant === 1 ? 2.1 : h.roofVariant === 2 ? 1.3 : 1.7;
        h.brickGround = rBrick < 0.45;
        h.colorIdx = Math.floor(rc * 1000);
        h.roofColorIdx = Math.floor(rt * 1000);
        h.balcony = rBal < 0.28 && c < 3;
        h.tank = rTank < 0.22;
        void rb;
        out.push(h);
      }
    }
  }
  return out;
}
