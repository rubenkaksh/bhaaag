// Thin air (owner 2026-11-20, "hero stands on thin air at some spots (Nagarkot Home)"): every
// surface the sim lets the hero stand on (solid and ramp tops) must have drawn geometry under the
// feet. Builds the real level view in node (no WebGL needed), bakes every mesh triangle into a
// 1 m xz grid and casts a ray down at sample points on each standable top.
import { InstancedMesh, Matrix4, Mesh, Vector3, type Object3D } from 'three';
import { afterAll, describe, expect, it } from 'vitest';
import { buildLevelMeshes, type BuildLevelOpts } from '../../src/adapters/render/levelView';
import { loadGraph } from '../../src/content/graph/registry';
import { placeGraph } from '../../src/content/graph/place';
import { loadWorldFromObject } from '../../src/content/load';
import type { World } from '../../src/core/world';
import type { AABB } from '../../src/core/math/aabb';
import { loadHome } from '../../src/app/homeAssets';
import { clearTerrain } from '../adapters/terrainMeshHelpers';

const STYLE_HIDDEN = 5;
const ABOVE = 0.25; // drawn surface may sit this far above the sim top (kit trims, tiles)
const BELOW = 0.3; // and at most this far below it: more is "standing on thin air"

type Tri = Float32Array; // 9 floats
class TriGrid {
  private cells = new Map<string, Tri[]>();
  add(t: Tri): void {
    const x0 = Math.floor(Math.min(t[0], t[3], t[6]));
    const x1 = Math.floor(Math.max(t[0], t[3], t[6]));
    const z0 = Math.floor(Math.min(t[2], t[5], t[8]));
    const z1 = Math.floor(Math.max(t[2], t[5], t[8]));
    if ((x1 - x0 + 1) * (z1 - z0 + 1) > 40000) return; // far backdrop slabs: not under any roof
    for (let x = x0; x <= x1; x++)
      for (let z = z0; z <= z1; z++) {
        const k = `${x},${z}`;
        let c = this.cells.get(k);
        if (c === undefined) this.cells.set(k, (c = []));
        c.push(t);
      }
  }
  /** Heights of every triangle under (x, z). */
  heights(x: number, z: number): number[] {
    const out: number[] = [];
    for (const t of this.cells.get(`${Math.floor(x)},${Math.floor(z)}`) ?? []) {
      const h = triHeight(t, x, z);
      if (h !== null) out.push(h);
    }
    return out;
  }
}

function triHeight(t: Tri, x: number, z: number): number | null {
  const ax = t[0],
    az = t[2],
    bx = t[3],
    bz = t[5],
    cx = t[6],
    cz = t[8];
  const d = (bz - cz) * (ax - cx) + (cx - bx) * (az - cz);
  if (Math.abs(d) < 1e-9) return null; // vertical face
  const u = ((bz - cz) * (x - cx) + (cx - bx) * (z - cz)) / d;
  const v = ((cz - az) * (x - cx) + (ax - cx) * (z - cz)) / d;
  const w = 1 - u - v;
  const e = -1e-6;
  if (u < e || v < e || w < e) return null;
  return u * t[1] + v * t[4] + w * t[7];
}

function bake(root: Object3D): TriGrid {
  root.updateMatrixWorld(true);
  const grid = new TriGrid();
  const v = new Vector3();
  const im = new Matrix4();
  const m = new Matrix4();
  root.traverse((o) => {
    if (!(o instanceof Mesh) || o.name.startsWith('anchor')) return;
    const pos = o.geometry.getAttribute('position');
    if (pos === undefined) return;
    const idx = o.geometry.getIndex();
    const n = idx !== null ? idx.count : pos.count;
    const count = o instanceof InstancedMesh ? o.count : 1;
    for (let k = 0; k < count; k++) {
      if (o instanceof InstancedMesh) {
        o.getMatrixAt(k, im);
        m.multiplyMatrices(o.matrixWorld, im);
      } else m.copy(o.matrixWorld);
      for (let i = 0; i + 2 < n; i += 3) {
        const t = new Float32Array(9);
        for (let j = 0; j < 3; j++) {
          const vi = idx !== null ? idx.getX(i + j) : i + j;
          v.fromBufferAttribute(pos, vi).applyMatrix4(m);
          t[j * 3] = v.x;
          t[j * 3 + 1] = v.y;
          t[j * 3 + 2] = v.z;
        }
        grid.add(t);
      }
    }
  });
  return grid;
}

function samples(b: AABB): [number, number][] {
  const out: [number, number][] = [];
  const inset = 0.25;
  const x0 = b.min.x + inset,
    x1 = b.max.x - inset,
    z0 = b.min.z + inset,
    z1 = b.max.z - inset;
  if (x1 <= x0 || z1 <= z0) return out;
  const nx = Math.min(6, Math.max(1, Math.round((x1 - x0) / 2)));
  const nz = Math.min(6, Math.max(1, Math.round((z1 - z0) / 2)));
  for (let i = 0; i <= nx; i++)
    for (let j = 0; j <= nz; j++) out.push([x0 + ((x1 - x0) * i) / nx, z0 + ((z1 - z0) * j) / nz]);
  return out;
}

// The top the sim stands on at (x, z): the highest solid/ramp top over that point.
function simTop(w: World, x: number, z: number, near: number): number {
  let best = -Infinity;
  const tops: AABB[] = [...w.solids, ...w.ramps.map((r) => r.aabb)];
  for (const b of tops)
    if (x >= b.min.x && x <= b.max.x && z >= b.min.z && z <= b.max.z && b.max.y <= near + 0.01)
      best = Math.max(best, b.max.y);
  return best;
}

const checked = { n: 0 };

function thinAirSpots(id: string, w: World, opts: BuildLevelOpts): string[] {
  const grid = bake(buildLevelMeshes(w, opts));
  const bad: string[] = [];
  const check = (kind: string, i: number, b: AABB, slope = 0): void => {
    if (b.max.y <= w.killPlaneY) return;
    let miss = 0;
    let worst = '';
    const pts = samples(b);
    for (const [x, z] of pts) {
      // only the visible top: skip points covered by a higher solid
      if (simTop(w, x, z, Infinity) > b.max.y + 0.01) continue;
      checked.n++;
      const hs = grid.heights(x, z);
      const ok = hs.some((h) => h <= b.max.y + ABOVE && h >= b.max.y - slope - BELOW);
      if (!ok) {
        miss++;
        const below = hs.filter((h) => h < b.max.y).sort((a, c) => c - a)[0];
        worst = `(${x.toFixed(1)}, ${b.max.y.toFixed(2)}, ${z.toFixed(1)}) drawn below: ${below === undefined ? 'none' : (b.max.y - below).toFixed(2) + ' m'}`;
      }
    }
    if (miss > 0) bad.push(`${id} ${kind} ${i}: ${miss}/${pts.length} points, e.g. ${worst}`);
  };
  w.solids.forEach((b, i) => {
    const st = i < w.style.length ? w.style[i] : 1;
    if (st !== STYLE_HIDDEN) check('solid', i, b);
  });
  w.ramps.forEach((r, i) => check('ramp', i, r.aabb, r.rise)); // sloped top: up to rise below max.y
  return bad;
}

describe('thin air: every standable top has drawn geometry under it', () => {
  afterAll(clearTerrain);

  it('nagarkot-home', () => {
    const h = loadHome();
    const w = loadWorldFromObject(h.level);
    checked.n = 0;
    const bad = thinAirSpots('nagarkot-home', w, { houseDress: false, graph: h.graph });
    expect(checked.n).toBeGreaterThan(500);
    expect(bad).toEqual([]);
  });

  it('hay-run', () => {
    checked.n = 0;
    const p = placeGraph(loadGraph('hay-run'));
    const w = loadWorldFromObject(p.level);
    const bad = thinAirSpots('hay-run', w, {
      houseDress: false,
      graph: {
        houses: p.houses,
        props: p.props,
        profile: p.profile,
        seed: p.seed,
        patches: p.patches,
        field: p.field,
        breaks: p.breaks,
      },
    });
    expect(checked.n).toBeGreaterThan(300);
    expect(bad).toEqual([]);
  });
});
