// Test helpers: build the ground mesh the way buildLevelMeshes does and read its surface height.
import type { Mesh } from 'three';
import { loadGraph } from '../../src/content/graph/registry';
import { placeGraph } from '../../src/content/graph/place';
import type { PlacedLevel } from '../../src/content/graph/place';
import { loadWorldFromObject } from '../../src/content/load';
import { buildGroundMesh } from '../../src/adapters/render/decor/groundMesh';
import { minSolidZ } from '../../src/adapters/render/strategyView';
import {
  setTerrainBreaks,
  setTerrainExtent,
  setTerrainField,
  setTerrainProfile,
} from '../../src/adapters/render/terrain';

export function clearTerrain(): void {
  setTerrainField(null);
  setTerrainProfile(null);
  setTerrainExtent(null);
  setTerrainBreaks(null);
}

export interface BuiltGround {
  placed: PlacedLevel;
  mesh: Mesh;
  heightAt: (x: number, z: number) => number;
  verts: [number, number, number][];
  tris: [number, number, number, number, number, number, number, number, number][];
}

export function buildGround(id: string): BuiltGround {
  const placed = placeGraph(loadGraph(id));
  const world = loadWorldFromObject(placed.level);
  setTerrainProfile(placed.profile);
  setTerrainField(placed.field ?? null);
  setTerrainExtent(minSolidZ(world));
  setTerrainBreaks(placed.breaks ?? null);
  const mesh = buildGroundMesh();
  const pos = mesh.geometry.getAttribute('position');
  const index = mesh.geometry.getIndex();
  if (index === null) throw new Error('no index');
  const verts: [number, number, number][] = [];
  for (let i = 0; i < pos.count; i++) verts.push([pos.getX(i), pos.getY(i), pos.getZ(i)]);
  const tris: BuiltGround['tris'] = [];
  for (let i = 0; i < index.count; i += 3) {
    const a = verts[index.getX(i)];
    const b = verts[index.getX(i + 1)];
    const c = verts[index.getX(i + 2)];
    tris.push([a[0], a[1], a[2], b[0], b[1], b[2], c[0], c[1], c[2]]);
  }
  const xs = Array.from(new Set(verts.map((v) => v[0]))).sort((a, b) => a - b);
  const zs = Array.from(new Set(verts.map((v) => v[2]))).sort((a, b) => a - b);
  const nx = xs.length;
  const nz = zs.length;
  const upper = (arr: number[], v: number): number => {
    let lo = 0;
    let hi = arr.length - 1;
    while (lo < hi) {
      const m = (lo + hi) >> 1;
      if (arr[m] <= v) lo = m + 1;
      else hi = m;
    }
    return lo;
  };
  const heightAt = (x: number, z: number): number => {
    const j = Math.max(0, Math.min(nx - 2, upper(xs, x) - 1));
    const zi = Math.max(0, Math.min(nz - 2, upper(zs, z) - 1));
    const i = nz - 2 - zi; // rows run uphill first
    const t0 = 2 * (i * (nx - 1) + j);
    for (let t = t0; t < t0 + 2; t++) {
      const y = interp(tris[t], x, z);
      if (y !== null) return y;
    }
    throw new Error(`no triangle at ${x},${z}`);
  };
  return { placed, mesh, heightAt, verts, tris };
}

type Tri = BuiltGround['tris'][number];

function interp(t: Tri, x: number, z: number): number | null {
  const [ax, ay, az, bx, by, bz, cx, cy, cz] = t;
  const d = (bz - cz) * (ax - cx) + (cx - bx) * (az - cz);
  if (Math.abs(d) < 1e-12) return null;
  const u = ((bz - cz) * (x - cx) + (cx - bx) * (z - cz)) / d;
  const v = ((cz - az) * (x - cx) + (ax - cx) * (z - cz)) / d;
  const w = 1 - u - v;
  const e = -1e-7;
  if (u < e || v < e || w < e) return null;
  return u * ay + v * by + w * cy;
}

export interface Rect {
  x0: number;
  x1: number;
  z0: number;
  z1: number;
}

/** Sample points of the mesh inside r: (i) vertices, (ii) 21 points + centroid per triangle, (iii) 0.1 m grid. */
export function samplePoints(g: BuiltGround, r: Rect): [number, number][] {
  const out: [number, number][] = [];
  const inR = (x: number, z: number): boolean =>
    x >= r.x0 - 1e-9 && x <= r.x1 + 1e-9 && z >= r.z0 - 1e-9 && z <= r.z1 + 1e-9;
  for (const v of g.verts) if (inR(v[0], v[2])) out.push([v[0], v[2]]);
  for (const t of g.tris) {
    const minX = Math.min(t[0], t[3], t[6]);
    const maxX = Math.max(t[0], t[3], t[6]);
    const minZ = Math.min(t[2], t[5], t[8]);
    const maxZ = Math.max(t[2], t[5], t[8]);
    if (maxX < r.x0 || minX > r.x1 || maxZ < r.z0 || minZ > r.z1) continue;
    const bary = (u: number, v: number): void => {
      const w = 1 - u - v;
      const x = u * t[0] + v * t[3] + w * t[6];
      const z = u * t[2] + v * t[5] + w * t[8];
      if (inR(x, z)) out.push([x, z]);
    };
    for (let a = 0; a <= 5; a++) for (let b = 0; a + b <= 5; b++) bary(a / 5, b / 5);
    bary(1 / 3, 1 / 3);
  }
  for (let x = r.x0; x <= r.x1 + 1e-9; x += 0.1)
    for (let z = r.z0; z <= r.z1 + 1e-9; z += 0.1) out.push([x, z]);
  return out;
}

/** Largest value of f over the samples of r, with where it happened. */
export function worst(
  g: BuiltGround,
  r: Rect,
  f: (x: number, z: number, y: number) => number | null,
): { v: number; at: string } {
  let v = -Infinity;
  let at = 'none';
  for (const [x, z] of samplePoints(g, r)) {
    const d = f(x, z, g.heightAt(x, z));
    if (d !== null && d > v) {
      v = d;
      at = `${x.toFixed(3)},${z.toFixed(3)}`;
    }
  }
  return { v, at };
}
