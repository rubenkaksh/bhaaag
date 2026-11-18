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

const EARTH = '#6b8a3e'; // muted olive grass around the village
const TERRACE_LIP = '#8f8a4c'; // dry terrace edge
const DIRT = '#857a50';
const FOREST_LOW = '#46703a';
const FOREST_MID = '#3d5634';
const CONIFER = '#2e452d';
const FAR_HAZE = '#7f8a5e'; // plate foothill green seen through haze

// Module-level colours: groundColor runs once per vertex, so no Color is allocated in it.
const C_EARTH = new Color(EARTH);
const C_TERRACE_LIP = new Color(TERRACE_LIP);
const C_DIRT = new Color(DIRT);
const C_FOREST_LOW = new Color(FOREST_LOW);
const C_FOREST_MID = new Color(FOREST_MID);
const C_CONIFER = new Color(CONIFER);
const C_FAR_HAZE = new Color(FAR_HAZE);

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
  // height bands follow the terraces (3.5 m steps): alternate bands take a dry lip, and the top
  // of each band gets a thin lip line
  const band = Math.floor((y + 1000) / 3.5) % 2;
  out.copy(C_EARTH);
  if (band === 1) out.lerp(C_TERRACE_LIP, 0.45);
  if ((y + 1000) % 3.5 > 3.0) out.lerp(C_TERRACE_LIP, 0.6);
  // faint wandering dirt tint near the lane keeps it from looking mowed
  if (ax < 14) out.lerp(C_DIRT, 0.18 * h);
  // the village grass gives way to forest between x = 36 and 70
  const f1 = Math.min(1, Math.max(0, (ax - 36) / 40));
  out.lerp(C_FOREST_LOW, f1 * (0.5 + 0.5 * h));
  // conifer fractions come from distance off the lane, or from altitude, whichever is greater
  const f2 = Math.max(
    Math.min(1, Math.max(0, (up - 18) / 50)),
    Math.min(1, Math.max(0, (ax - 50) / 60)),
  );
  out.lerp(C_FOREST_MID, f2);
  const f3 = Math.max(
    Math.min(1, Math.max(0, (up - 55) / 70)),
    Math.min(1, Math.max(0, (ax - 110) / 90)),
  );
  out.lerp(C_CONIFER, f3);
  // far tint so the ground meets the cards in hue
  const far = Math.min(1, Math.max(0, (Math.hypot(x, z) - 160) / 160));
  out.lerp(C_FAR_HAZE, 0.55 * far);
  // the valley floor below the last house is green meadow
  return out.multiplyScalar(0.92 + 0.14 * h);
}

export function buildGroundMesh(): Mesh {
  const xs = axis(-TERRAIN_HALF_X, TERRAIN_HALF_X, 3, -42, 42, 1.12, [
    -HILL_HALF_X,
    HILL_HALF_X,
    0,
  ]);
  const zMin = terrainZMin();
  let zs = axis(zMin, TERRAIN_Z_MAX, 3, -156, 46, 1.12, [40, terrainValleyZ(), -104, 26]);
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
