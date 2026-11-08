// Distant sunset Himalaya, hazy ridge bands and an uphill ground skirt. Scenery only.
// The hill descends toward -Z and the camera looks down it, so the range sits far at -Z.
// Colours are pre-blended towards HAZE (fog is 45..260 m, the range is beyond it), so the
// materials are unfogged stock MeshBasicMaterial with vertex colours, like the sky dome.
import {
  BufferAttribute,
  BufferGeometry,
  Color,
  DoubleSide,
  Group,
  Mesh,
  MeshBasicMaterial,
} from 'three';

export type BackdropTier = 'low' | 'medium' | 'high';

export type BackdropLayer = {
  name: string;
  /** Non-indexed triangles, xyz per vertex. */
  positions: Float32Array;
  /** rgb per vertex. */
  colors: Float32Array;
  triangles: number;
};

const TOP_COLUMNS: Record<BackdropTier, number> = { low: 40, medium: 90, high: 150 };
const BAND_COLUMNS: Record<BackdropTier, number> = { low: 30, medium: 70, high: 120 };
const SKIRT_GRID: Record<BackdropTier, [number, number]> = {
  low: [10, 6],
  medium: [24, 12],
  high: [40, 20],
};

const RANGE_Z = -640;
const RANGE_HALF_X = 700;
const BASE_Y = -90;
const BAND_Z = [-560, -480, -400];
const SKIRT_Z0 = 36; // behind the spawn plot's back edge (z = 30)
const SKIRT_Z1 = 360;
const SKIRT_HALF_X = 420;

function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function mix(a: number[], b: number[], t: number): number[] {
  return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
}

function rgb(hex: string): number[] {
  const c = new Color(hex);
  return [c.r, c.g, c.b];
}

class TriSink {
  pos: number[] = [];
  col: number[] = [];
  tri(a: number[], b: number[], c: number[], ca: number[], cb: number[], cc: number[]): void {
    this.pos.push(a[0], a[1], a[2], b[0], b[1], b[2], c[0], c[1], c[2]);
    this.col.push(ca[0], ca[1], ca[2], cb[0], cb[1], cb[2], cc[0], cc[1], cc[2]);
  }
  quad(
    a: number[],
    b: number[],
    c: number[],
    d: number[],
    ca: number[],
    cb: number[],
    cc: number[],
    cd: number[],
  ): void {
    this.tri(a, b, c, ca, cb, cc);
    this.tri(a, c, d, ca, cc, cd);
  }
  layer(name: string): BackdropLayer {
    return {
      name,
      positions: new Float32Array(this.pos),
      colors: new Float32Array(this.col),
      triangles: this.pos.length / 9,
    };
  }
}

/** Ridge height profile: summed octaves plus a few sharp peaks. */
function profile(rand: () => number, n: number, lo: number, hi: number, peaky: boolean): number[] {
  const out: number[] = [];
  const ph = [rand() * 6.28, rand() * 6.28, rand() * 6.28];
  const peaks: number[][] = [];
  const count = peaky ? 9 : 5;
  for (let k = 0; k < count; k++) peaks.push([rand(), 0.55 + rand() * 0.45, 0.02 + rand() * 0.04]);
  for (let i = 0; i < n; i++) {
    const u = i / (n - 1);
    let h =
      0.35 +
      0.15 * Math.sin(u * 9 + ph[0]) +
      0.1 * Math.sin(u * 23 + ph[1]) +
      0.05 * Math.sin(u * 51 + ph[2]);
    for (let k = 0; k < peaks.length; k++) {
      const d = Math.abs(u - peaks[k][0]) / peaks[k][2];
      const v = peaks[k][1] * (1 - Math.min(d, 1));
      if (v > h) h = v;
    }
    out.push(lo + (hi - lo) * Math.max(0, Math.min(1, h)));
  }
  return out;
}

function himalaya(tier: BackdropTier, haze: number[]): BackdropLayer {
  const n = TOP_COLUMNS[tier];
  const rand = mulberry32(1953);
  const h = profile(rand, n, 70, 300, true);
  const rock = mix(rgb('#7c5f78'), haze, 0.45);
  const rockLow = mix(rgb('#a8788a'), haze, 0.6);
  const snow = mix(rgb('#fff0d8'), haze, 0.12);
  const snowShade = mix(rgb('#f2b8a0'), haze, 0.2);
  const snowLine = 150;
  const s = new TriSink();
  for (let i = 0; i + 1 < n; i++) {
    const x0 = -RANGE_HALF_X + (2 * RANGE_HALF_X * i) / (n - 1);
    const x1 = -RANGE_HALF_X + (2 * RANGE_HALF_X * (i + 1)) / (n - 1);
    const t0 = h[i];
    const t1 = h[i + 1];
    const m0 = Math.min(t0, snowLine);
    const m1 = Math.min(t1, snowLine);
    const lit = i % 2 === 0 ? snow : snowShade; // alternating faces read as facets
    const a = [x0, BASE_Y, RANGE_Z];
    const b = [x1, BASE_Y, RANGE_Z];
    s.quad(a, b, [x1, m1, RANGE_Z], [x0, m0, RANGE_Z], rockLow, rockLow, rock, rock);
    if (t0 > snowLine || t1 > snowLine) {
      s.quad(
        [x0, m0, RANGE_Z],
        [x1, m1, RANGE_Z],
        [x1, t1, RANGE_Z],
        [x0, t0, RANGE_Z],
        rock,
        rock,
        lit,
        lit,
      );
    }
  }
  return s.layer('himalaya');
}

function bands(tier: BackdropTier, haze: number[]): BackdropLayer {
  const n = BAND_COLUMNS[tier];
  const s = new TriSink();
  for (let bi = 0; bi < BAND_Z.length; bi++) {
    const rand = mulberry32(7 + bi * 101);
    const far = bi / (BAND_Z.length - 1); // 0 = nearest band
    const z = BAND_Z[2 - bi];
    const h = profile(rand, n, 20 + (2 - bi) * 5, 70 + (2 - bi) * 15, false);
    // Index 0 below is the farthest band: lighter and warmer.
    const w = 1 - far; // farthest -> 1
    const top = mix(mix(rgb('#8c5560'), rgb('#cf9a82'), w), haze, 0.25 + 0.4 * w);
    const bot = mix(top, haze, 0.35);
    for (let i = 0; i + 1 < n; i++) {
      const x0 = -RANGE_HALF_X + (2 * RANGE_HALF_X * i) / (n - 1);
      const x1 = -RANGE_HALF_X + (2 * RANGE_HALF_X * (i + 1)) / (n - 1);
      s.quad(
        [x0, BASE_Y, z],
        [x1, BASE_Y, z],
        [x1, h[i + 1], z],
        [x0, h[i], z],
        bot,
        bot,
        top,
        top,
      );
    }
  }
  return s.layer('ridges');
}

/** Terrain surface behind the spawn: rises with the route slope, then curls up into a hill cap. */
export function skirtY(z: number): number {
  const dz = z - SKIRT_Z0;
  return 0.2222 * z - 10 - 1.2 + 0.0009 * dz * dz;
}

function skirt(tier: BackdropTier): BackdropLayer {
  const [nx, nz] = SKIRT_GRID[tier];
  const rand = mulberry32(31);
  const s = new TriSink();
  const near = rgb('#7a7a45');
  const far = mix(rgb('#a98a62'), rgb('#eaa978'), 0.55);
  const grid: number[][][] = [];
  const cols: number[][][] = [];
  for (let j = 0; j <= nz; j++) {
    const row: number[][] = [];
    const crow: number[][] = [];
    for (let i = 0; i <= nx; i++) {
      const u = i / nx;
      const v = j / nz;
      const x = -SKIRT_HALF_X + 2 * SKIRT_HALF_X * u;
      const z = SKIRT_Z0 + (SKIRT_Z1 - SKIRT_Z0) * v;
      const edge = j === 0 ? 0 : 1;
      const y = skirtY(z) + (rand() - 0.5) * 1.2 * edge + 0.0006 * x * x;
      row.push([x, y, z]);
      const c = mix(near, far, Math.min(1, v * 1.2));
      const k = 0.92 + rand() * 0.16;
      crow.push([c[0] * k, c[1] * k, c[2] * k]);
    }
    grid.push(row);
    cols.push(crow);
  }
  for (let j = 0; j < nz; j++) {
    for (let i = 0; i < nx; i++) {
      // wound so the normal points +y
      s.quad(
        grid[j][i],
        grid[j + 1][i],
        grid[j + 1][i + 1],
        grid[j][i + 1],
        cols[j][i],
        cols[j + 1][i],
        cols[j + 1][i + 1],
        cols[j][i + 1],
      );
    }
  }
  return s.layer('skirt');
}

/** Pure, deterministic geometry data (no three objects), node-testable. */
export function backdropData(tier: BackdropTier): BackdropLayer[] {
  const haze = rgb('#eaa978');
  return [himalaya(tier, haze), bands(tier, haze), skirt(tier)];
}

export function backdropTriangles(tier: BackdropTier): number {
  let t = 0;
  for (const l of backdropData(tier)) t += l.triangles;
  return t;
}

export function buildBackdrop(tier: BackdropTier): Group {
  const group = new Group();
  group.name = 'backdrop';
  const layers = backdropData(tier);
  for (let i = 0; i < layers.length; i++) {
    const l = layers[i];
    const geo = new BufferGeometry();
    geo.setAttribute('position', new BufferAttribute(l.positions, 3));
    geo.setAttribute('color', new BufferAttribute(l.colors, 3));
    const isSkirt = l.name === 'skirt';
    const mat = new MeshBasicMaterial({
      vertexColors: true,
      side: DoubleSide,
      fog: isSkirt, // the skirt is near enough to take the haze; the range is pre-tinted
      depthWrite: true,
    });
    const mesh = new Mesh(geo, mat);
    mesh.name = l.name;
    mesh.frustumCulled = false;
    // After the sky dome (-2): it writes no depth but is nearer (r 500) than the range (z -640),
    // so drawing the range first lets the dome paint over it. Before the sun core (-1).
    mesh.renderOrder = isSkirt ? -1 : -1.8 + 0.2 * i;
    group.add(mesh);
  }
  return group;
}
