import { Vec3 } from './vec3';

export class AABB {
  min: Vec3;
  max: Vec3;

  constructor(min: Vec3, max: Vec3) {
    this.min = min;
    this.max = max;
  }
}

/** Parallel-axis threshold: |delta| below this on an axis is treated as zero. */
export const EPS = 1e-9;

export class SweepHit {
  hit: boolean;
  t: number;
  nx: number;
  ny: number;
  nz: number;

  constructor() {
    this.hit = false;
    this.t = 0;
    this.nx = 0;
    this.ny = 0;
    this.nz = 0;
  }
}

/** Strict overlap: boxes that only touch on a face/edge/corner do NOT overlap. */
export function aabbOverlaps(a: AABB, b: AABB): boolean {
  return (
    a.min.x < b.max.x &&
    a.max.x > b.min.x &&
    a.min.y < b.max.y &&
    a.max.y > b.min.y &&
    a.min.z < b.max.z &&
    a.max.z > b.min.z
  );
}

/** Inclusive: points on the surface count as contained. */
export function aabbContainsPoint(a: AABB, x: number, y: number, z: number): boolean {
  return (
    x >= a.min.x && x <= a.max.x && y >= a.min.y && y <= a.max.y && z >= a.min.z && z <= a.max.z
  );
}

/** v clamped into [lo, hi]. */
export function clampScalar(v: number, lo: number, hi: number): number {
  if (v < lo) return lo;
  if (v > hi) return hi;
  return v;
}

/**
 * Circle (cx, cz, r) vs the box footprint rect in xz: clamp the centre to the rect and
 * compare squared distance to r squared. Tangent (distance exactly r) counts as overlap.
 * The box y range is irrelevant.
 */
export function circleOverlapsAabbXZ(a: AABB, cx: number, cz: number, r: number): boolean {
  const dx = cx - clampScalar(cx, a.min.x, a.max.x);
  const dz = cz - clampScalar(cz, a.min.z, a.max.z);
  return dx * dx + dz * dz <= r * r;
}

function setMiss(out: SweepHit): void {
  out.hit = false;
  out.t = 1;
  out.nx = 0;
  out.ny = 0;
  out.nz = 0;
}

/**
 * Slab sweep of point (ox,oy,oz) moving by (dx,dy,dz) against box [lo,hi].
 * strict = false: surface counts as inside / grazing counts as a hit.
 * strict = true: surface is outside; grazing / moving away from a touching face is a miss,
 * moving into a touching face is a hit at t = 0.
 * Does not handle the "already inside" case; callers do that first.
 */
function slabSweep(
  ox: number,
  oy: number,
  oz: number,
  dx: number,
  dy: number,
  dz: number,
  lox: number,
  loy: number,
  loz: number,
  hix: number,
  hiy: number,
  hiz: number,
  strict: boolean,
  out: SweepHit,
): void {
  let tEnter = -Infinity;
  let tExit = Infinity;
  let enterAxis = -1;
  let enterSign = 0;
  for (let i = 0; i < 3; i++) {
    let o = ox;
    let d = dx;
    let lo = lox;
    let hi = hix;
    if (i === 1) {
      o = oy;
      d = dy;
      lo = loy;
      hi = hiy;
    } else if (i === 2) {
      o = oz;
      d = dz;
      lo = loz;
      hi = hiz;
    }
    if (Math.abs(d) < EPS) {
      if (strict ? o <= lo || o >= hi : o < lo || o > hi) {
        setMiss(out);
        return;
      }
    } else {
      let t0 = (lo - o) / d;
      let t1 = (hi - o) / d;
      let sign = -1; // entering through the low face, normal points to -axis
      if (t0 > t1) {
        const tmp = t0;
        t0 = t1;
        t1 = tmp;
        sign = 1;
      }
      if (t0 > tEnter) {
        tEnter = t0;
        enterAxis = i;
        enterSign = sign;
      }
      if (t1 < tExit) {
        tExit = t1;
      }
    }
  }
  const empty = strict ? tEnter >= tExit || tExit <= 0 : tEnter > tExit || tExit < 0;
  if (empty || tEnter > 1 || enterAxis < 0) {
    setMiss(out);
    return;
  }
  out.hit = true;
  out.t = tEnter <= 0 ? 0 : tEnter;
  out.nx = enterAxis === 0 ? enterSign : 0;
  out.ny = enterAxis === 1 ? enterSign : 0;
  out.nz = enterAxis === 2 ? enterSign : 0;
}

/**
 * Segment p0 -> p1 vs box (slab method). Writes into out; no allocation.
 * Touching/grazing semantics (inclusive): the box surface counts as solid, so a segment
 * running exactly along a face or touching an edge/corner IS a hit. A p0 on or inside the
 * box gives hit = true, t = 0, normal (0,0,0).
 */
export function segmentVsAabb(p0: Vec3, p1: Vec3, box: AABB, out: SweepHit): void {
  if (aabbContainsPoint(box, p0.x, p0.y, p0.z)) {
    out.hit = true;
    out.t = 0;
    out.nx = 0;
    out.ny = 0;
    out.nz = 0;
    return;
  }
  slabSweep(
    p0.x,
    p0.y,
    p0.z,
    p1.x - p0.x,
    p1.y - p0.y,
    p1.z - p0.z,
    box.min.x,
    box.min.y,
    box.min.z,
    box.max.x,
    box.max.y,
    box.max.z,
    false,
    out,
  );
}

/**
 * Vertical capsule (feet at base, total height, radius) moved by delta vs box.
 * Implemented as: box expanded by radius on x and z (and on y for the caps, which equals
 * sweeping the core segment [base.y+r, base.y+height-r] against a box expanded by r),
 * then a swept-AABB test. Corner/edge contacts are conservatively treated as the expanded
 * box corner (over-estimates by < radius*0.41, the gap between a square and a round corner).
 * Touching semantics (strict): resting on a face (gap 0) with delta moving away or parallel
 * is NOT a hit; delta moving into the touching face is a hit at t = 0.
 * Starting penetrating: hit, t = 0, normal = axis of least penetration pointing out.
 */
export function sweptCapsuleVsAabb(
  base: Vec3,
  height: number,
  radius: number,
  delta: Vec3,
  box: AABB,
  out: SweepHit,
): void {
  // Core segment extent [base.y+r, base.y+height-r] grown by r each end = [base.y, base.y+height].
  // Relative to the box expanded by r, the mover is the point base.y with the box y-range
  // stretched down by the capsule height.
  const lox = box.min.x - radius;
  const hix = box.max.x + radius;
  const loy = box.min.y - height;
  const hiy = box.max.y;
  const loz = box.min.z - radius;
  const hiz = box.max.z + radius;
  const ox = base.x;
  const oy = base.y;
  const oz = base.z;
  if (ox > lox && ox < hix && oy > loy && oy < hiy && oz > loz && oz < hiz) {
    // penetrating: pick axis of least penetration
    let bestPen = ox - lox;
    let nx = -1;
    let ny = 0;
    let nz = 0;
    let pen = hix - ox;
    if (pen < bestPen) {
      bestPen = pen;
      nx = 1;
    }
    pen = oy - loy;
    if (pen < bestPen) {
      bestPen = pen;
      nx = 0;
      ny = -1;
    }
    pen = hiy - oy;
    if (pen < bestPen) {
      bestPen = pen;
      nx = 0;
      ny = 1;
    }
    pen = oz - loz;
    if (pen < bestPen) {
      bestPen = pen;
      nx = 0;
      ny = 0;
      nz = -1;
    }
    pen = hiz - oz;
    if (pen < bestPen) {
      nx = 0;
      ny = 0;
      nz = 1;
    }
    out.hit = true;
    out.t = 0;
    out.nx = nx;
    out.ny = ny;
    out.nz = nz;
    return;
  }
  slabSweep(ox, oy, oz, delta.x, delta.y, delta.z, lox, loy, loz, hix, hiy, hiz, true, out);
}
