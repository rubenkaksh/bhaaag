import { readFileSync } from 'node:fs';
import { InstancedMesh, Matrix4, Mesh, MeshBasicMaterial, Quaternion, Vector3 } from 'three';
import type { Camera, Group, Object3D } from 'three';
import { describe, expect, it, vi } from 'vitest';
import { loadWorldFromJson } from '../../src/content/load';
import { kitTriangleCeiling } from '../../src/adapters/render/decor/kit';
import { PIECE_CAP, PIECE_IDS } from '../../src/adapters/render/decor/kit';
import {
  LANE_HALF_X,
  buildDecor,
  groundAt,
  hitsCollider,
  violatesLane,
} from '../../src/adapters/render/decor/placeDecor';
import type { DecorBox, DecorStats } from '../../src/adapters/render/decor/placeDecor';
import { buildLevelMeshes } from '../../src/adapters/render/levelView';

const world = loadWorldFromJson(
  readFileSync(new URL('../../content/levels/l1.json', import.meta.url), 'utf8'),
);
const decor = buildDecor(world);
const boxes = decor.userData.boxes as DecorBox[];
const stats = decor.userData.stats as DecorStats;

function leaves(o: Object3D, out: Object3D[] = []): Object3D[] {
  if ((o as { isMesh?: boolean }).isMesh || (o as { isLine?: boolean }).isLine) out.push(o);
  for (let i = 0; i < o.children.length; i++) leaves(o.children[i], out);
  return out;
}

describe('hillside decor (one hill, ten houses)', () => {
  it('is deterministic for a seed and differs across seeds', () => {
    const again = buildDecor(world).userData.boxes as DecorBox[];
    expect(JSON.stringify(again)).toBe(JSON.stringify(boxes));
    const other = buildDecor(world, 7).userData.boxes as DecorBox[];
    expect(JSON.stringify(other)).not.toBe(JSON.stringify(boxes));
  });

  it('dresses the ten houses and wooded flanks: windows, rails, tanks, trees, flags', () => {
    const kinds = new Set(boxes.map((b) => b.kind));
    for (const k of [
      'window',
      'cornice',
      'tree',
      'flag',
      'rail',
      'tank',
      'pot',
      'shutter',
      'base',
      'mast',
    ])
      expect(kinds.has(k), k).toBe(true);
    // the old staircase machinery is gone: no side village, plots, plaza or pagodas
    for (const k of [
      'filler',
      'fillerroof',
      'pagoda',
      'plazahouse',
      'stair',
      'finial',
      'far',
      'house',
    ])
      expect(kinds.has(k), k).toBe(false);
    expect(boxes.filter((b) => b.kind === 'tree').length).toBeGreaterThan(300);
  });

  it('keeps the lane clear and never intersects a collider', () => {
    const scenery = boxes.filter((b) => !b.house);
    expect(scenery.filter((b) => violatesLane(world, b))).toEqual([]);
    expect(scenery.filter((b) => hitsCollider(world, b))).toEqual([]);
    // in the 9 m corridor along the route only trees up to 6 m high stand
    const inLane = scenery.filter(
      (b) => b.max[2] > -110 && b.min[2] < 12 && b.min[0] < LANE_HALF_X && b.max[0] > -LANE_HALF_X,
    );
    expect(inLane.every((b) => b.kind === 'tree')).toBe(true);
  });

  it('dresses exactly the ten houses: 8 route houses with brick plinths, 2 decoys', () => {
    const houses = boxes.filter((b) => b.house);
    for (const k of ['window', 'bracket', 'rail', 'tank', 'parapet', 'base', 'pot', 'door'])
      expect(
        houses.some((b) => b.kind === k),
        k,
      ).toBe(true);
    expect(houses.filter((b) => b.kind === 'base').length).toBe(8);
    expect(houses.filter((b) => b.kind === 'plaster').length).toBe(8);
    expect(houses.filter((b) => b.kind === 'door').length).toBeGreaterThanOrEqual(6);
  });

  it('house dressing respects the colliders: skins wrap the walls, nothing else is buried', () => {
    const houses = boxes.filter((b) => b.house);
    const solids = world.solids;
    const enclosing = new Set(['base', 'plaster', 'cornice', 'parapet', 'door', 'step', 'mast']);
    const buried: string[] = [];
    for (const b of houses) {
      if (enclosing.has(b.kind)) continue;
      for (let i = 0; i < solids.length; i++) {
        const c = solids[i];
        const ox = Math.min(b.max[0], c.max.x) - Math.max(b.min[0], c.min.x);
        const oy = Math.min(b.max[1], c.max.y) - Math.max(b.min[1], c.min.y);
        const oz = Math.min(b.max[2], c.max.z) - Math.max(b.min[2], c.min.z);
        if (ox <= 0.2 || oy <= 0.2 || oz <= 0.2) continue;
        buried.push(`${b.kind}@${b.min.map((v) => v.toFixed(1)).join(',')} in solid ${i}`);
      }
    }
    expect(buried).toEqual([]);
    // plinths start at the hill height under the wall's downhill edge and wrap at most 0.12 m proud
    const walls = solids.filter(
      (_, i) => world.style[i] === 1 && solids[i].max.y - solids[i].min.y > 5,
    );
    for (const b of houses.filter((h) => h.kind === 'base')) {
      const wall = walls.find(
        (c) =>
          b.min[0] <= c.min.x + 1e-6 &&
          b.max[0] >= c.max.x - 1e-6 &&
          b.min[2] <= c.min.z + 1e-6 &&
          b.max[2] >= c.max.z - 1e-6,
      );
      expect(wall).toBeDefined();
      expect(wall!.min.x - b.min[0]).toBeLessThanOrEqual(0.121);
      expect(wall!.min.z - b.min[2]).toBeLessThanOrEqual(0.121);
      expect(Math.abs(b.min[1] - groundAt(world, 0, wall!.min.z))).toBeLessThan(0.05);
    }
  });

  it('walls meet the ground: every door stands on the hill', () => {
    for (const b of boxes.filter((h) => h.kind === 'door')) {
      const xc = (b.min[0] + b.max[0]) / 2;
      expect(Math.abs(b.min[1] - groundAt(world, xc, b.max[2] + 0.05))).toBeLessThan(0.1);
    }
  });

  it('keeps trees off the colliders, clear of the houses and out of the hero lane unless low', () => {
    const trees = boxes.filter((b) => b.kind === 'tree');
    for (const t of trees) {
      expect(hitsCollider(world, t)).toBe(false);
      if (t.min[0] < LANE_HALF_X && t.max[0] > -LANE_HALF_X && t.max[2] > -110 && t.min[2] < 12) {
        expect(t.max[1] - groundAt(world, 0, (t.min[2] + t.max[2]) / 2)).toBeLessThanOrEqual(6.01);
      }
    }
    // nothing on the hill's far flanks inside the barrier walls except trees and field walls
    const hill = boxes.filter(
      (b) => !b.house && Math.abs((b.min[0] + b.max[0]) / 2) < 34 && b.kind !== 'tree',
    );
    expect(hill).toEqual([]);
  });

  it('forest density hook thins the instanced tree meshes', () => {
    const d = buildDecor(world);
    const canopy = d.getObjectByName('decor_canopy') as InstancedMesh;
    const full = canopy.count;
    (d.userData.setForestDensity as (f: number) => void)(0.4);
    expect(canopy.count).toBeLessThan(full);
    expect(canopy.count).toBeGreaterThan(0);
    (d.userData.setForestDensity as (f: number) => void)(1);
    expect(canopy.count).toBe(full);
  });

  it('birds: 10 tris, MeshBasic, tips move between frames', () => {
    const birds = decor.getObjectByName('decor_birds') as Mesh;
    expect(birds).toBeDefined();
    expect(birds.geometry.index!.count / 3).toBe(10);
    expect(birds.material).toBeInstanceOf(MeshBasicMaterial);
    const cam = { position: new Vector3(1, 2, 3) } as unknown as Camera;
    const pos = birds.geometry.getAttribute('position');
    const spy = vi.spyOn(performance, 'now');
    spy.mockReturnValue(1000);
    birds.onBeforeRender(
      null as never,
      null as never,
      cam,
      null as never,
      null as never,
      null as never,
    );
    const a = Array.from(pos.array);
    spy.mockReturnValue(1300);
    birds.onBeforeRender(
      null as never,
      null as never,
      cam,
      null as never,
      null as never,
      null as never,
    );
    const b = Array.from(pos.array);
    spy.mockRestore();
    expect(a.some((v, i) => Math.abs(v - b[i]) > 1e-6)).toBe(true);
    expect(birds.position.x).toBeCloseTo(61);
  });

  it('respects tri, mesh and draw-call budgets', () => {
    const inst: InstancedMesh[] = [];
    decor.traverse((o) => {
      if (o instanceof InstancedMesh) inst.push(o);
    });
    expect(inst.length).toBeGreaterThanOrEqual(12);
    expect(inst.length).toBeLessThanOrEqual(24);
    expect(stats.triangles).toBeLessThanOrEqual(150000);
    expect(kitTriangleCeiling()).toBeLessThanOrEqual(150000);
    let tris = 0;
    for (const m of inst) {
      const g = m.geometry;
      tris += m.count * (g.index ? g.index.count / 3 : g.getAttribute('position').count / 3);
    }
    expect(tris).toBeLessThanOrEqual(150000);
    const level: Group = buildLevelMeshes(world);
    expect(leaves(level).length).toBeLessThanOrEqual(60);
    expect(stats.drawCalls).toBeLessThanOrEqual(24);
  });

  it('F4: instance counts stay under the cap table with the 90 % margin', () => {
    const counts: Record<string, number> = {};
    decor.traverse((o) => {
      if (o instanceof InstancedMesh) counts[o.name.replace('decor_', '')] = o.count;
    });
    for (const id of PIECE_IDS) {
      expect(counts[id] ?? 0, id).toBeLessThanOrEqual(0.9 * PIECE_CAP[id] + 1e-9);
    }
    expect(counts.canopy + counts.conifer).toBeGreaterThan(300);
  });

  it('D7: nothing dropped', () => {
    expect(stats.dropped).toBe(0);
  });

  it('D8: ceiling and instanced mesh count', () => {
    expect(kitTriangleCeiling()).toBeLessThanOrEqual(150000);
    expect(PIECE_IDS.length).toBeLessThanOrEqual(24);
  });

  it('D9: adjacent flags on a string alternate rotY by pi', () => {
    const fm = decor.getObjectByName('decor_flag') as InstancedMesh;
    const m = new Matrix4();
    const q = new Quaternion();
    const pos = new Vector3();
    const sc = new Vector3();
    let pairs = 0;
    let flipped = 0;
    let prevRot = 0;
    const prevPos = new Vector3();
    for (let i = 0; i < fm.count; i++) {
      fm.getMatrixAt(i, m);
      m.decompose(pos, q, sc);
      const rot = 2 * Math.atan2(q.y, q.w);
      if (i > 0 && pos.distanceTo(prevPos) < 3.5) {
        pairs++;
        const d = Math.abs(Math.atan2(Math.sin(rot - prevRot), Math.cos(rot - prevRot)));
        if (Math.abs(d - Math.PI) < 1e-3) flipped++;
      }
      prevRot = rot;
      prevPos.copy(pos);
    }
    expect(pairs).toBeGreaterThan(50);
    expect(flipped / pairs).toBeGreaterThanOrEqual(0.9);
  });
});
