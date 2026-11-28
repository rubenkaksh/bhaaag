// Ride trail terrain for the spike view: one vertex-coloured mesh built from the baked TrailField heights
// (the sim samples the same array), the river surface, and seated trees and boulders. Stock materials only.
import {
  BufferGeometry,
  Color,
  Float32BufferAttribute,
  Group,
  Mesh,
  MeshStandardMaterial,
} from 'three';
import { groundY, riverZ, trailX, type TrailField } from '../trail';

const DIRT = new Color('#9a7650');
const GRASS = new Color('#7d8a45');
const GRASS_DRY = new Color('#9a9450');
const ROCK = new Color('#878279');
const SAND = new Color('#8c7a5a');

const smooth = (a: number, b: number, v: number): number => {
  const t = Math.max(0, Math.min(1, (v - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

/** Rows of the (sub-sampled) grid per chunk: chunks behind the camera or past the fog are culled. */
const CHUNK_ROWS = 40;

/**
 * Terrain as chunks along z sharing one material. `step` 2 halves the grid in both directions (Low tier).
 * The material colour carries the dusk-to-night tint; the vertex colours carry the look.
 */
export function buildTerrainMesh(
  f: TrailField,
  step: 1 | 2,
): { group: Group; material: MeshStandardMaterial } {
  const spec = f.spec;
  const cols = Math.floor(f.nx / step) + 1;
  const rows = Math.floor(f.nz / step) + 1;
  const pos = new Float32Array(cols * rows * 3);
  const col = new Float32Array(cols * rows * 3);
  const r = f.nx + 1;
  const c = new Color();
  for (let jj = 0; jj < rows; jj++) {
    const j = jj * step;
    const z = f.z0 + j * f.dz;
    const cx = trailX(spec, z);
    const rz = (x: number): number => Math.abs(z - riverZ(spec, x));
    for (let ii = 0; ii < cols; ii++) {
      const i = ii * step;
      const x = f.x0 + i * f.dx;
      const k = jj * cols + ii;
      const h = f.h[j * r + i];
      pos[k * 3] = x;
      pos[k * 3 + 1] = h;
      pos[k * 3 + 2] = z;
      // steepness from the neighbouring heights
      const hx = f.h[j * r + Math.min(f.nx, i + 1)] - f.h[j * r + Math.max(0, i - 1)];
      const hz = f.h[Math.min(f.nz, j + 1) * r + i] - f.h[Math.max(0, j - 1) * r + i];
      const slope = Math.hypot(hx / (2 * f.dx), hz / (2 * f.dz));
      // grass, drier on the tops, rock on steep faces, dirt on the trail, sand by the river
      const noise = Math.sin(x * 0.37 + z * 0.11) * Math.sin(z * 0.23 - x * 0.07);
      c.copy(GRASS).lerp(GRASS_DRY, Math.max(0, Math.min(1, 0.35 + noise * 0.35 + (h - f.waterY) * 0.01)));
      c.lerp(ROCK, smooth(0.45, 0.8, slope));
      c.lerp(SAND, smooth(spec.ford.halfWidth + 6, spec.ford.halfWidth + 1, rz(x)));
      c.lerp(DIRT, smooth(spec.band + 1.5, spec.band - 0.5, Math.abs(x - cx)) * (z < spec.distance + 5 ? 1 : 0));
      col[k * 3] = c.r;
      col[k * 3 + 1] = c.g;
      col[k * 3 + 2] = c.b;
    }
  }
  // normals over the whole grid first, so chunk seams light the same on both sides
  const whole = new BufferGeometry();
  whole.setAttribute('position', new Float32BufferAttribute(pos, 3));
  const idx: number[] = [];
  for (let jj = 0; jj < rows - 1; jj++)
    for (let ii = 0; ii < cols - 1; ii++) {
      const a = jj * cols + ii;
      idx.push(a, a + cols, a + 1, a + 1, a + cols, a + cols + 1);
    }
  whole.setIndex(idx);
  whole.computeVertexNormals();
  const nrm = whole.getAttribute('normal').array as Float32Array;
  whole.dispose();

  const material = new MeshStandardMaterial({ vertexColors: true, roughness: 0.95, metalness: 0 });
  const group = new Group();
  group.name = 'trail_terrain';
  for (let j0 = 0; j0 < rows - 1; j0 += CHUNK_ROWS) {
    const j1 = Math.min(rows - 1, j0 + CHUNK_ROWS);
    const from = j0 * cols * 3;
    const to = (j1 + 1) * cols * 3;
    const ci: number[] = [];
    for (let jj = 0; jj < j1 - j0; jj++)
      for (let ii = 0; ii < cols - 1; ii++) {
        const a = jj * cols + ii;
        ci.push(a, a + cols, a + 1, a + 1, a + cols, a + cols + 1);
      }
    const g = new BufferGeometry();
    g.setAttribute('position', new Float32BufferAttribute(pos.slice(from, to), 3));
    g.setAttribute('normal', new Float32BufferAttribute(nrm.slice(from, to), 3));
    g.setAttribute('color', new Float32BufferAttribute(col.slice(from, to), 3));
    g.setIndex(ci);
    g.computeBoundingSphere();
    group.add(new Mesh(g, material));
  }
  return { group, material };
}

/** River surface: a strip along the river line, wide enough to cover the channel banks. */
export function buildWater(f: TrailField): Mesh {
  const spec = f.spec;
  const half = spec.ford.halfWidth + 2.5;
  const x1 = f.x0 + f.nx * f.dx;
  const pos: number[] = [];
  const idx: number[] = [];
  let n = 0;
  for (let x = f.x0; x <= x1 + 0.01; x += 3) {
    const z = riverZ(spec, x);
    pos.push(x, f.waterY, z - half, x, f.waterY, z + half);
    if (n > 0) {
      const a = (n - 1) * 2;
      idx.push(a, a + 1, a + 2, a + 1, a + 3, a + 2);
    }
    n++;
  }
  const g = new BufferGeometry();
  g.setAttribute('position', new Float32BufferAttribute(pos, 3));
  g.setIndex(idx);
  g.computeVertexNormals();
  const m = new Mesh(
    g,
    new MeshStandardMaterial({
      color: '#4f86a0',
      roughness: 0.25,
      metalness: 0.1,
      transparent: true,
      opacity: 0.85,
      emissive: '#2a5a78',
      emissiveIntensity: 0.15,
    }),
  );
  m.name = 'trail_water';
  return m;
}

/** True where props must not stand: the river channel and its banks. */
export function inRiver(f: TrailField, x: number, z: number, margin: number): boolean {
  return Math.abs(z - riverZ(f.spec, x)) < f.spec.ford.halfWidth + margin;
}

export { groundY };
