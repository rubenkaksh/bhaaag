import { BufferGeometry, Color, Float32BufferAttribute, Mesh, MeshLambertMaterial } from 'three';
import {
  HILL_HALF_X,
  TERRAIN_HALF_X,
  TERRAIN_Z_MAX,
  TERRAIN_Z_MIN,
  planeY,
  terrainValleyZ,
  terrainY,
  terrainZMin,
} from '../terrain';

// The visible hillside: one merged vertex-coloured mesh over terrainY. Inside |x| <= HILL_HALF_X it
// is exactly the collider plane (the hero's feet touch the drawn surface); outside it wooded
// foothills rise toward the mountain ranges. Stock Lambert material, no textures, no shaders.

const EARTH = '#678a3c'; // muted olive grass around the village
const EARTH_ALT = '#7c8c42'; // ochre fallow strips
const DIRT = '#857a50';
const FOREST_LOW = '#43763a';
const FOREST_MID = '#3f5a33';
const CONIFER = '#2f4a2f';
const ROCK = '#6f6a5c';

/** Grid lines along one axis: `fine` m near `centre`, growing by `grow` per step toward the ends. */
function axis(
  lo: number,
  hi: number,
  fine: number,
  fineLo: number,
  fineHi: number,
  grow: number,
  mustHave: number[],
): number[] {
  const set = new Set<number>(mustHave);
  for (let v = fineLo; v <= fineHi + 1e-6; v += fine) set.add(Math.round(v * 100) / 100);
  let step = fine;
  for (let v = fineHi; v < hi;) {
    step *= grow;
    v += step;
    set.add(Math.min(hi, Math.round(v * 100) / 100));
  }
  step = fine;
  for (let v = fineLo; v > lo;) {
    step *= grow;
    v -= step;
    set.add(Math.max(lo, Math.round(v * 100) / 100));
  }
  set.add(lo);
  set.add(hi);
  return Array.from(set).sort((a, b) => a - b);
}

function hash(i: number, j: number): number {
  return (Math.imul((i + 1) * 7919, (j + 3) * 104729 + 17) >>> 0) / 4294967296;
}

/** Vertex colour of the hillside at (x, z) on terrain height y. */
export function groundColor(x: number, z: number, y: number, out: Color, h: number): Color {
  const ax = Math.abs(x);
  // altitude above the village plane: forest green deepens, then conifer, then bare rock
  const up = y - planeY(z);
  const stripe = Math.floor((z + 400) / 9) % 3; // contour fields: olive, fallow, olive
  out.set(EARTH);
  if (stripe === 1) out.lerp(new Color(EARTH_ALT), 0.7);
  // faint wandering dirt tint near the lane keeps it from looking mowed
  if (ax < 14) out.lerp(new Color(DIRT), 0.18 * h);
  // the village grass gives way to forest between x = 36 and 70
  const f1 = Math.min(1, Math.max(0, (ax - 36) / 40));
  out.lerp(new Color(FOREST_LOW), f1 * (0.5 + 0.5 * h));
  const f2 = Math.min(1, Math.max(0, (up - 18) / 50));
  out.lerp(new Color(FOREST_MID), f2);
  const f3 = Math.min(1, Math.max(0, (up - 55) / 70));
  out.lerp(new Color(CONIFER), f3);
  const f4 = Math.min(1, Math.max(0, (up - 110) / 60));
  out.lerp(new Color(ROCK), f4 * 0.6);
  // the valley floor below the last house is green meadow
  return out.multiplyScalar(0.92 + 0.14 * h);
}

export function buildGroundMesh(): Mesh {
  const xs = axis(-TERRAIN_HALF_X, TERRAIN_HALF_X, 3, -42, 42, 1.22, [
    -HILL_HALF_X,
    HILL_HALF_X,
    0,
  ]);
  const zMin = terrainZMin();
  let zs = axis(zMin, TERRAIN_Z_MAX, 3, -156, 46, 1.22, [40, terrainValleyZ(), -104, 26]);
  if (zMin < TERRAIN_Z_MIN) {
    // long level (strategy maze): a coarse 12 m strip down the linear plane to the valley
    for (let z = -156; z > terrainValleyZ() - 12; z -= 12) zs.push(z);
    zs.push(terrainValleyZ());
    zs = Array.from(new Set(zs.map((z) => Math.round(z * 100) / 100))).sort((a, b) => a - b);
  }
  const nx = xs.length;
  const nz = zs.length;
  const pos: number[] = [];
  const col: number[] = [];
  const idx: number[] = [];
  const c = new Color();
  for (let i = 0; i < nz; i++) {
    const z = zs[nz - 1 - i]; // uphill first
    for (let j = 0; j < nx; j++) {
      const x = xs[j];
      const y = terrainY(x, z);
      pos.push(x, y, z);
      groundColor(x, z, y, c, hash(i, j));
      col.push(c.r, c.g, c.b);
    }
  }
  for (let i = 0; i + 1 < nz; i++) {
    for (let j = 0; j + 1 < nx; j++) {
      const a = i * nx + j;
      const b = a + 1;
      const d = a + nx;
      const e = d + 1;
      idx.push(a, b, d, b, e, d);
    }
  }
  const geo = new BufferGeometry();
  geo.setAttribute('position', new Float32BufferAttribute(pos, 3));
  geo.setAttribute('color', new Float32BufferAttribute(col, 3));
  geo.setIndex(idx);
  geo.computeVertexNormals();
  const m = new Mesh(geo, new MeshLambertMaterial({ vertexColors: true }));
  m.name = 'decor_ground';
  return m;
}
