// Endless hillside for Dragon Chase: one periodic vertex-coloured strip plus periodic trees,
// re-snapped along the fall line in steps of PERIOD so it never ends. Inside |x| <= 34 it is
// exactly the collider plane hillY(z); outside it rises into wooded foothills. Stock Lambert only.
import {
  BufferGeometry,
  Color,
  ConeGeometry,
  Float32BufferAttribute,
  Group,
  InstancedMesh,
  Matrix4,
  Mesh,
  MeshLambertMaterial,
  Quaternion,
  Vector3,
} from 'three';
import { GRADE, HILL_HALF_X, hillY } from '../../../core/chase/rows';

export const GROUND_PERIOD = 108; // metres; divisible by the 27 m stripe period and the 6 m row grid
const Z_NEAR = 150; // local z of the uphill end (behind the hero)
const Z_FAR = -300; // local z of the downhill end
const X_MAX = 150;
const STEP_Z = 6;

const EARTH = '#678a3c';
const EARTH_ALT = '#7c8c42';
const DIRT = '#857a50';
const FOREST_LOW = '#43763a';
const FOREST_MID = '#3f5a33';
const CONIFER = '#3a5c35';

function hash2(i: number, j: number): number {
  return (Math.imul((i + 1) * 7919, (j + 3) * 104729 + 17) >>> 0) / 4294967296;
}

/** Foothill rise outside the lane (0 inside). Periodic in z by construction. */
function rise(x: number, zl: number): number {
  const ax = Math.abs(x);
  if (ax <= HILL_HALF_X) return 0;
  const d = ax - HILL_HALF_X;
  const w = 0.6 + 0.4 * Math.sin((zl * 2 * Math.PI) / GROUND_PERIOD + (x > 0 ? 0.7 : 2.1));
  return d * 0.22 * w + d * d * 0.004;
}

function colorAt(x: number, zl: number, y: number, out: Color, h: number): void {
  const ax = Math.abs(x);
  const up = y - hillY(zl);
  const stripe = ((Math.floor(zl / 9) % 3) + 3) % 3;
  out.set(EARTH);
  if (stripe === 1) out.lerp(new Color(EARTH_ALT), 0.7);
  if (ax < 14) out.lerp(new Color(DIRT), 0.18 * h);
  const f1 = Math.min(1, Math.max(0, (ax - 36) / 40));
  out.lerp(new Color(FOREST_LOW), f1 * (0.5 + 0.5 * h));
  const f2 = Math.min(1, Math.max(0, (up - 18) / 50));
  out.lerp(new Color(FOREST_MID), f2);
  const f3 = Math.min(1, Math.max(0, (up - 55) / 70));
  out.lerp(new Color(CONIFER), f3);
  out.multiplyScalar(0.92 + 0.14 * h);
}

function buildStrip(): Mesh {
  const xs: number[] = [];
  for (let x = -X_MAX; x <= X_MAX + 1e-6; x += x < -60 || x > 60 ? 15 : 6) xs.push(x);
  if (xs.indexOf(-HILL_HALF_X) < 0) xs.push(-HILL_HALF_X, HILL_HALF_X);
  xs.sort((a, b) => a - b);
  const zs: number[] = [];
  for (let z = Z_NEAR; z >= Z_FAR - 1e-6; z -= STEP_Z) zs.push(z);
  const nx = xs.length;
  const nz = zs.length;
  const pos: number[] = [];
  const col: number[] = [];
  const idx: number[] = [];
  const c = new Color();
  for (let i = 0; i < nz; i++) {
    for (let j = 0; j < nx; j++) {
      const x = xs[j];
      const zl = zs[i];
      // periodic hash: indices wrap with the period so snapping by PERIOD is seamless
      const per = Math.round(GROUND_PERIOD / STEP_Z);
      const h = hash2(((i % per) + per) % per, j);
      const y = hillY(zl) + rise(x, zl);
      pos.push(x, y, zl);
      colorAt(x, zl, y, c, h);
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
  m.name = 'decor_ground'; // scene.ts flags: receives shadows, never casts
  return m;
}

function buildTrees(perPeriod: number): InstancedMesh {
  const copies = Math.ceil((Z_NEAR - Z_FAR) / GROUND_PERIOD) + 1;
  const geo = new ConeGeometry(1.6, 6, 6);
  geo.translate(0, 3, 0);
  const mat = new MeshLambertMaterial({ color: '#ffffff' });
  const count = perPeriod * copies;
  const im = new InstancedMesh(geo, mat, count);
  const m4 = new Matrix4();
  const q = new Quaternion();
  const p = new Vector3();
  const s = new Vector3();
  const col = new Color();
  let n = 0;
  for (let k = 0; k < copies; k++) {
    for (let i = 0; i < perPeriod; i++) {
      const side = i % 2 === 0 ? -1 : 1;
      const x = side * (HILL_HALF_X + 4 + hash2(i, 11) * 90);
      const zl = Z_NEAR - k * GROUND_PERIOD - hash2(i, 29) * GROUND_PERIOD;
      const sc = 0.8 + hash2(i, 41) * 1.1;
      p.set(x, hillY(zl) + rise(x, zl) - 0.3, zl);
      s.set(sc, sc * (0.9 + hash2(i, 53) * 0.5), sc);
      m4.compose(p, q, s);
      im.setMatrixAt(n, m4);
      col.set(hash2(i, 61) < 0.5 ? CONIFER : FOREST_MID).multiplyScalar(0.85 + hash2(i, 67) * 0.3);
      im.setColorAt(n, col);
      n++;
    }
  }
  im.count = n;
  im.instanceMatrix.needsUpdate = true;
  if (im.instanceColor !== null) im.instanceColor.needsUpdate = true;
  im.frustumCulled = false;
  im.name = 'chase_trees';
  return im;
}

export class EndlessGround {
  readonly group = new Group();
  private readonly strip: Mesh;
  private readonly trees: InstancedMesh;
  private k = 0;

  constructor(treesPerPeriod: number) {
    this.group.name = 'chase_endlessGround';
    this.strip = buildStrip();
    this.trees = buildTrees(treesPerPeriod);
    this.group.add(this.strip, this.trees);
    this.snap(0, true);
  }

  /** Re-centres the periodic strip around the hero's z (snaps in whole periods). */
  snap(heroZ: number, force = false): void {
    const k = Math.round(heroZ / GROUND_PERIOD);
    if (k === this.k && !force) return;
    this.k = k;
    const dz = k * GROUND_PERIOD;
    this.group.position.set(0, GRADE * dz, dz);
  }

  dispose(): void {
    this.strip.geometry.dispose();
    (this.strip.material as MeshLambertMaterial).dispose();
    this.trees.geometry.dispose();
    (this.trees.material as MeshLambertMaterial).dispose();
    this.trees.dispose();
  }
}
