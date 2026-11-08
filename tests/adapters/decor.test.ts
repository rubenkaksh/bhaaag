import { readFileSync } from 'node:fs';
import { InstancedMesh, Matrix4, Mesh, MeshBasicMaterial, Quaternion, Vector3 } from 'three';
import type { Camera, Group, Object3D } from 'three';
import { describe, expect, it, vi } from 'vitest';
import { loadWorldFromJson } from '../../src/content/load';
import { kitTriangleCeiling } from '../../src/adapters/render/decor/kit';
import { PIECE_CAP, PIECE_IDS } from '../../src/adapters/render/decor/kit';
import type { ClusterPlan } from '../../src/adapters/render/decor/cluster';
import {
  LANE_HALF_X,
  buildDecor,
  lotParams,
  lotY,
  groundAt,
  hitsCollider,
  terraceBoxes,
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

describe('city decor (ADR 0005 D5)', () => {
  it('is deterministic for a seed and differs across seeds', () => {
    const again = buildDecor(world).userData.boxes as DecorBox[];
    expect(JSON.stringify(again)).toBe(JSON.stringify(boxes));
    const other = buildDecor(world, 7).userData.boxes as DecorBox[];
    expect(JSON.stringify(other)).not.toBe(JSON.stringify(boxes));
  });

  it('is dense: houses, windows, roofs, trees and flags all present', () => {
    const kinds = new Set(boxes.map((b) => b.kind));
    for (const k of [
      'window',
      'pagoda',
      'cornice',
      'tree',
      'flag',
      'rail',
      'tank',
      'stair',
      'pot',
      'shutter',
      'finial',
    ])
      expect(kinds.has(k), k).toBe(true);
    expect(kinds.has('stand')).toBe(false);
    expect(boxes.length).toBeGreaterThan(500);
  });

  it('keeps the reserved lane clear and never intersects a collider', () => {
    const scenery = boxes.filter((b) => !b.house);
    expect(scenery.filter((b) => violatesLane(world, b))).toEqual([]);
    expect(scenery.filter((b) => hitsCollider(world, b))).toEqual([]);
    // direct check: everything beside the route sits outside |x| < 16 except lane trees
    const inLane = scenery.filter(
      (b) => b.max[2] > -206 && b.min[2] < 12 && b.min[0] < LANE_HALF_X && b.max[0] > -LANE_HALF_X,
    );
    expect(inLane.every((b) => b.kind === 'tree' || b.kind === 'stair')).toBe(true);
  });

  it('only the playable houses are dressed: seven houses, no flanking town', () => {
    const houses = boxes.filter((b) => b.house);
    for (const k of ['window', 'bracket', 'rail', 'tank', 'parapet', 'base', 'pot'])
      expect(
        houses.some((b) => b.kind === k),
        k,
      ).toBe(true);
    // 7 hops: every house has a brick base reaching down to its hill terrace, 3 steps each
    expect(houses.filter((b) => b.kind === 'base').length).toBe(21);
    // no body, roof or cluster outside the dressed houses beyond the three pagodas
    expect((decor.userData.clusters as ClusterPlan[]).length).toBe(0);
    const town = boxes.filter((b) => !b.house && b.kind === 'house');
    expect(town.length).toBe(0);
  });

  it('flags a stair step that breaks the exemption', () => {
    const t = terraceBoxes(world);
    const U = t[0];
    const L = t[1];
    const z0 = U.min.z - 2.1;
    const z1 = U.min.z - 0.55;
    const good: DecorBox = {
      kind: 'stair',
      min: [8, L.max.y, z0],
      max: [8.4, L.max.y + 0.5, z1],
    };
    expect(groundAt(world, 8.2, z1 + 0.6)).toBeGreaterThan(groundAt(world, 8.2, (z0 + z1) / 2));
    expect(violatesLane(world, good)).toBe(false);
    // too close to the route centre line
    expect(
      violatesLane(world, { ...good, min: [7, good.min[1], z0], max: [7.4, good.max[1], z1] }),
    ).toBe(true);
    // taller than the upper terrace top
    expect(violatesLane(world, { ...good, max: [8.4, U.max.y + 1, z1] })).toBe(true);
  });

  it('has exactly three finials, one far left at the goal end', () => {
    const f = boxes.filter((b) => b.kind === 'finial');
    expect(f.length).toBe(3);
    expect(f.some((b) => b.min[0] < -30 && b.min[2] < -190)).toBe(true);
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
    expect(inst.length).toBeGreaterThanOrEqual(13);
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

  it('D1: lot constants derive from the terraces', () => {
    const p = lotParams(world);
    expect(p.step).toBeCloseTo(4.75, 2);
    expect(p.sliceZ).toBe(13);
    expect(p.z0).toBe(-13);
    expect(p.y0).toBe(-20);
    expect(p.floor).toBe(-86.5);
  });

  it('D2: lotY is a monotone staircase of 4.75 or 0', () => {
    const p = lotParams(world);
    let prev = lotY(p, p.zMax - 0.01);
    for (let k = 0; k < 20; k++) {
      const y = lotY(p, p.zMax - 0.01 - 13 * (k + 1));
      const dy = prev - y;
      expect(dy === 0 || Math.abs(dy - 4.75) < 1e-6 || y === p.floor).toBe(true);
      expect(y).toBeLessThanOrEqual(prev);
      prev = y;
    }
    for (let z = 30; z > -218; z -= 0.7) expect(lotY(p, z - 0.7)).toBeLessThanOrEqual(lotY(p, z));
  });

  it('D3/D4: dressed houses reach the hill and no scenery body stands in the lane', () => {
    const bases = boxes.filter((b) => b.house && b.kind === 'base');
    expect(bases.length).toBeGreaterThan(0);
    for (const b of bases) {
      const zc = (b.min[2] + b.max[2]) / 2;
      const xc = (b.min[0] + b.max[0]) / 2;
      expect(Math.abs(b.min[1] - groundAt(world, xc, zc))).toBeLessThanOrEqual(21);
    }
    const lane = boxes.filter(
      (b) => !b.house && b.kind === 'body' && Math.abs(b.min[0] + b.max[0]) / 2 < 16,
    );
    expect(lane.length).toBe(0);
  });

  it('D5: one 10-step flight per rising lot boundary', () => {
    const steps = boxes.filter(
      (b) => b.kind === 'stair' && Math.abs(b.min[0] + b.max[0]) / 2 > 30.5,
    );
    expect(steps.length % 10).toBe(0);
    expect(steps.length / 10).toBeGreaterThanOrEqual(15);
    for (const b of steps) {
      expect(Math.min(Math.abs(b.min[0]), Math.abs(b.max[0]))).toBeGreaterThanOrEqual(30.9);
      expect(Math.max(Math.abs(b.min[0]), Math.abs(b.max[0]))).toBeLessThanOrEqual(33.5);
    }
    for (let f = 0; f < steps.length; f += 10) {
      for (let j = 1; j < 10; j++) {
        expect(steps[f + j].max[1] - steps[f + j - 1].max[1]).toBeCloseTo(0.475, 3);
      }
    }
  });

  it('D6: no flat clusters; the hills are left to trees and pagodas', () => {
    expect((decor.userData.clusters as ClusterPlan[]).length).toBe(0);
    expect(boxes.filter((b) => b.kind === 'tree').length).toBeGreaterThan(100);
  });

  it('D7: nothing dropped, key pieces under 90 % of cap', () => {
    expect(stats.dropped).toBe(0);
    const inst: Record<string, number> = {};
    decor.traverse((o) => {
      if (o instanceof InstancedMesh) inst[o.name.replace('decor_', '')] = o.count;
    });
    for (const id of ['body', 'window', 'shutter', 'parapet', 'tank'] as const)
      expect(inst[id]).toBeLessThanOrEqual(0.9 * PIECE_CAP[id]);
    expect(PIECE_IDS.length).toBe(17);
  });

  it('D8: ceiling and instanced mesh count', () => {
    expect(kitTriangleCeiling()).toBeLessThanOrEqual(150000);
    let n = 0;
    decor.traverse((o) => {
      if (o instanceof InstancedMesh) n++;
    });
    expect(n).toBeLessThanOrEqual(24);
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
