// Ride trail over a height field (owner 2026-11-27: "actual trails instead of straight grasslands").
// Three-free: the sim samples the baked height array; trailGen.ts fills it with THREE.Terrain noise and
// calls carveTrail. One fixed trail per spike (owner: "fixed per spike"), so it can be learned.

export interface TrailSpec {
  /** Terrain noise seed: a constant per spike, not the run seed. */
  seed: number;
  /** Camp flags (end of the ride) and camp centre, metres along +z. */
  distance: number;
  campZ: number;
  /** Centreline x(z) = envelope * sum(amp * sin(2 pi cycles z / distance + phase)). */
  waves: { amp: number; cycles: number; phase: number }[];
  /** Half width of the flat dirt band, m. */
  band: number;
  /** Metres over which the band blends into the hills. */
  blend: number;
  maxHeight: number;
  minHeight: number;
  /** Steepest grade along the trail (rise over run). */
  maxGrade: number;
  /** The river crosses the trail here, in a valley. */
  ford: { z: number; halfWidth: number; valleyDepth: number; valleyWidth: number };
}

export interface TrailField {
  spec: TrailSpec;
  x0: number;
  z0: number;
  dx: number;
  dz: number;
  /** Segments; the array holds (nx + 1) * (nz + 1) heights, row j along z, column i along x. */
  nx: number;
  nz: number;
  h: Float32Array;
  waterY: number;
  /** The hills before the trail was carved (same layout as h): what the heightmap export paints. */
  hills?: Float32Array;
}

/** Shallow water on the trail (the ford), deep water off it. */
export const FORD_DEPTH = 0.45;
export const RIVER_DEPTH = 1.8;
const CAMP_FLAT = 35;
const ENVELOPE = 80;

export function gridFor(spec: TrailSpec): Pick<TrailField, 'x0' | 'z0' | 'dx' | 'dz' | 'nx' | 'nz'> {
  const dx = 3;
  const dz = 4;
  const nx = 80;
  const z0 = -100;
  const nz = Math.ceil((spec.campZ + 200 - z0) / dz);
  return { x0: -(nx * dx) / 2, z0, dx, dz, nx, nz };
}

const smooth01 = (a: number, b: number, v: number): number => {
  const t = Math.max(0, Math.min(1, (v - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

/** Trail centreline x at z. Straight (x = 0) at the start and into the camp. */
export function trailX(spec: TrailSpec, z: number): number {
  const L = spec.distance;
  if (z <= 0 || z >= L) return 0;
  const env = smooth01(0, ENVELOPE, z) * smooth01(L, L - ENVELOPE, z);
  let x = 0;
  for (const w of spec.waves) x += w.amp * Math.sin((2 * Math.PI * w.cycles * z) / L + w.phase);
  return env * x;
}

/** Heading of the trail at z (0 = +z, positive toward +x), the same convention as RideState.heading. */
export function trailHeading(spec: TrailSpec, z: number): number {
  return Math.atan2(trailX(spec, z + 1) - trailX(spec, z - 1), 2);
}

/** The river's line across the valley: z of the channel centre at x. */
export function riverZ(spec: TrailSpec, x: number): number {
  return spec.ford.z + 6 * Math.sin(x * 0.05);
}

/** Bilinear height at (x, z); clamps to the grid edge. */
export function groundY(f: TrailField, x: number, z: number): number {
  const fi = (x - f.x0) / f.dx;
  const fj = (z - f.z0) / f.dz;
  const i = Math.max(0, Math.min(f.nx - 1, Math.floor(fi)));
  const j = Math.max(0, Math.min(f.nz - 1, Math.floor(fj)));
  const u = Math.max(0, Math.min(1, fi - i));
  const v = Math.max(0, Math.min(1, fj - j));
  const r = f.nx + 1;
  const h = f.h;
  const a = h[j * r + i];
  const b = h[j * r + i + 1];
  const c = h[(j + 1) * r + i];
  const d = h[(j + 1) * r + i + 1];
  return a * (1 - u) * (1 - v) + b * u * (1 - v) + c * (1 - u) * v + d * u * v;
}

/** Water depth at (x, z): > 0 only inside the river channel. */
export function waterDepth(f: TrailField, x: number, z: number): number {
  if (Math.abs(z - riverZ(f.spec, x)) > f.spec.ford.halfWidth) return 0;
  return Math.max(0, f.waterY - groundY(f, x, z));
}

/**
 * Carves the trail into raw noise heights (row-major, (nx + 1) per row), in place. The trail profile is the
 * noise along the centreline, smoothed and grade-limited; the band is flat across; the river valley and the
 * camp site are shaped in. Returns the water surface height.
 */
export function carveTrail(zs: Float32Array | number[], spec: TrailSpec): number {
  const g = gridFor(spec);
  const r = g.nx + 1;
  const rows = g.nz + 1;
  const raw = Float32Array.from(zs);
  const zAt = (j: number): number => g.z0 + j * g.dz;
  const rawAt = (x: number, j: number): number => {
    const fi = Math.max(0, Math.min(g.nx - 1e-6, (x - g.x0) / g.dx));
    const i = Math.floor(fi);
    const u = fi - i;
    return raw[j * r + i] * (1 - u) + raw[j * r + i + 1] * u;
  };

  // 1. profile along the centreline, smoothed twice over +-40 m
  let p = new Float32Array(rows);
  for (let j = 0; j < rows; j++) p[j] = rawAt(trailX(spec, zAt(j)), j);
  const win = Math.round(40 / g.dz);
  for (let pass = 0; pass < 2; pass++) {
    const q = new Float32Array(rows);
    for (let j = 0; j < rows; j++) {
      let s = 0;
      let n = 0;
      for (let k = Math.max(0, j - win); k <= Math.min(rows - 1, j + win); k++) {
        s += p[k];
        n++;
      }
      q[j] = s / n;
    }
    p = q;
  }

  // 2. the ford: the trail dips into the valley; the bed sits FORD_DEPTH under the water
  const fj = Math.round((spec.ford.z - g.z0) / g.dz);
  const waterY = p[Math.max(0, Math.min(rows - 1, fj))] - spec.ford.valleyDepth;
  const fw = spec.ford;
  for (let j = 0; j < rows; j++) {
    const v = smooth01(fw.halfWidth + fw.valleyWidth, fw.halfWidth, Math.abs(zAt(j) - fw.z));
    p[j] = p[j] * (1 - v) + (waterY - FORD_DEPTH) * v;
  }

  // 3. flat into the camp, then cap the grade both ways
  const jd = Math.min(rows - 1, Math.round((spec.distance - 10 - g.z0) / g.dz));
  for (let j = jd + 1; j < rows; j++) p[j] = p[jd];
  const step = spec.maxGrade * g.dz;
  for (let j = 1; j < rows; j++) p[j] = Math.max(p[j - 1] - step, Math.min(p[j - 1] + step, p[j]));
  for (let j = rows - 2; j >= 0; j--)
    p[j] = Math.max(p[j + 1] - step, Math.min(p[j + 1] + step, p[j]));
  const campY = p[jd];

  // 4. every vertex: hills (with the river valley cut through), blended into the flat band
  for (let j = 0; j < rows; j++) {
    const z = zAt(j);
    const cx = trailX(spec, z);
    for (let i = 0; i < r; i++) {
      const x = g.x0 + i * g.dx;
      const k = j * r + i;
      const dv = Math.abs(z - riverZ(spec, x));
      const valley = smooth01(fw.halfWidth + fw.valleyWidth, fw.halfWidth, dv);
      const bed = dv < fw.halfWidth ? waterY - RIVER_DEPTH : waterY + 0.5;
      const hills = raw[k] * (1 - valley) + bed * valley;
      const w = smooth01(spec.band, spec.band + spec.blend, Math.abs(x - cx));
      let h = p[j] * (1 - w) + hills * w;
      const cd = Math.hypot(x, z - spec.campZ);
      const c = smooth01(CAMP_FLAT + 20, CAMP_FLAT, cd);
      h = h * (1 - c) + campY * c;
      zs[k] = h;
    }
  }
  return waterY;
}
