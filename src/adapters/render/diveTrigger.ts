// Swan-dive trigger (visual only, no sim change). The hero dives when it leaves a high perch with a
// cushion under it: the feet are at least `minFall` metres above the cushion top. The dive latches
// until the hero lands or leaves the air, so drifting off the cushion edge mid-fall does not flick
// the pose back. The minimum is cfg.hero.diveMinFall (tuning, 6 m).
interface Slab {
  min: { x: number; y: number; z: number };
  max: { x: number; y: number; z: number };
}

const RISING_MAX_VY = 1; // still climbing faster than this (a jump's rise): wait for the apex

/** Feet height above the highest cushion top under (x, z) within radius r, or -1 if none. */
export function cushionBelow(
  cushions: readonly Slab[],
  x: number,
  z: number,
  py: number,
  r: number,
): number {
  let best = -1;
  let top = -Infinity;
  for (let i = 0; i < cushions.length; i++) {
    const c = cushions[i];
    if (x < c.min.x - r || x > c.max.x + r || z < c.min.z - r || z > c.max.z + r) continue;
    if (c.max.y > py || c.max.y <= top) continue;
    top = c.max.y;
    best = py - c.max.y;
  }
  return best;
}

/**
 * Next dive flag. `heightAbove` is cushionBelow() (-1 = no cushion below). Starts when airborne,
 * not rising, and at least minFall above a cushion; stays on while airborne once started.
 */
export function diveStep(
  active: boolean,
  airborne: boolean,
  vy: number,
  heightAbove: number,
  minFall: number,
): boolean {
  if (!airborne) return false;
  if (active) return true;
  return heightAbove >= 0 && heightAbove >= minFall && vy <= RISING_MAX_VY;
}
