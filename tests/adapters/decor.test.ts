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
  hillY,
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
    // 7 hops: every house has a brick base reaching down to its hill plot, 3 steps each
    expect(houses.filter((b) => b.kind === 'base').length).toBe(21);
    // no body, roof or cluster outside the dressed houses beyond the three pagodas
    expect((decor.userData.clusters as ClusterPlan[]).length).toBe(0);
    const town = boxes.filter((b) => !b.house && b.kind === 'house');
    expect(town.length).toBe(0);
  });

  it('house dressing respects the colliders: flush base, nothing buried, rails on curbs', () => {
    const houses = boxes.filter((b) => b.house);
    const solids = world.solids;
    const enclosing = new Set(['base', 'cornice', 'parapet']);
    const buried: string[] = [];
    for (const b of houses) {
      for (let i = 0; i < solids.length; i++) {
        const c = solids[i];
        const ox = Math.min(b.max[0], c.max.x) - Math.max(b.min[0], c.min.x);
        const oy = Math.min(b.max[1], c.max.y) - Math.max(b.min[1], c.min.y);
        const oz = Math.min(b.max[2], c.max.z) - Math.max(b.min[2], c.min.z);
        if (ox <= 0.2 || oy <= 0.2 || oz <= 0.2) continue;
        if (enclosing.has(b.kind)) continue; // skins that wrap a wall; checked below
        buried.push(`${b.kind}@${b.min.map((v) => v.toFixed(1)).join(',')} in solid ${i}`);
      }
    }
    expect(buried).toEqual([]);
    // the brick base wraps its wall at most 0.12 m proud
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
      expect(b.max[0] - wall!.max.x).toBeLessThanOrEqual(0.121);
      expect(wall!.min.z - b.min[2]).toBeLessThanOrEqual(0.121);
      expect(b.max[2] - wall!.max.z).toBeLessThanOrEqual(0.121);
    }
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

  // D1/D2/D5 were written for the 12 m terraces (half-step lots of 3.5 m every 10 m); since
  // 2026-11-08 a lot is one hill plot: 4 m down every 18 m (docs/level-layout.md).
  it('D1: lot constants derive from the hill plots', () => {
    const p = lotParams(world);
    expect(p.step).toBeCloseTo(4, 2);
    expect(p.sliceZ).toBe(18);
    expect(p.z0).toBe(-9);
    expect(p.y0).toBe(-8);
    expect(p.floor).toBe(-36);
  });

  it('D2: lotY is a monotone staircase of one plot step or 0', () => {
    const p = lotParams(world);
    let prev = lotY(p, p.zMax - 0.01);
    for (let k = 0; k < 20; k++) {
      const y = lotY(p, p.zMax - 0.01 - p.sliceZ * (k + 1));
      const dy = prev - y;
      expect(dy === 0 || Math.abs(dy - p.step) < 1e-6 || y === p.floor).toBe(true);
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

  it('D5: lane stairs between the filler columns come in flights of 8 steps', () => {
    const steps = boxes.filter((b) => b.kind === 'stair');
    expect(steps.length).toBeGreaterThanOrEqual(40);
    expect(steps.length % 8).toBe(0);
    for (const b of steps) {
      expect(Math.min(Math.abs(b.min[0]), Math.abs(b.max[0]))).toBeGreaterThanOrEqual(38);
    }
  });

  it('F1: filler houses pack the flanks: 2-3 storeys, pitched roofs, beyond the plots', () => {
    const fillers = boxes.filter((b) => b.kind === 'filler');
    const roofs = boxes.filter((b) => b.kind === 'fillerroof');
    expect(roofs.length).toBeGreaterThanOrEqual(100);
    expect(fillers.length).toBeGreaterThanOrEqual(roofs.length);
    for (const b of roofs) {
      expect(Math.min(Math.abs(b.min[0]), Math.abs(b.max[0]))).toBeGreaterThanOrEqual(37);
      const w = b.max[0] - b.min[0];
      const d = b.max[2] - b.min[2];
      expect(w).toBeGreaterThan(6);
      expect(w).toBeLessThan(11);
      expect(d).toBeGreaterThan(6);
      expect(d).toBeLessThan(11.5);
      expect(b.max[1] - b.min[1]).toBeGreaterThan(1.2);
    }
    // two roof silhouettes at least, both flanks
    expect(new Set(roofs.map((b) => (b.max[1] - b.min[1]).toFixed(1))).size).toBeGreaterThanOrEqual(
      3,
    );
    expect(roofs.some((b) => b.min[0] > 0)).toBe(true);
    expect(roofs.some((b) => b.max[0] < 0)).toBe(true);
  });

  it('F2: fillers never touch the lane, the route corridor or a collider', () => {
    const fillers = boxes.filter(
      (b) => !b.house && (b.kind === 'filler' || b.kind === 'fillerroof'),
    );
    expect(fillers.length).toBeGreaterThan(200);
    for (const b of fillers) {
      expect(violatesLane(world, b)).toBe(false);
      expect(hitsCollider(world, b)).toBe(false);
      expect(Math.min(Math.abs(b.min[0]), Math.abs(b.max[0]))).toBeGreaterThan(30);
    }
    // no two filler roofs overlap in plan
    const rf = fillers.filter((b) => b.kind === 'fillerroof');
    for (let i = 0; i < rf.length; i++) {
      for (let j = i + 1; j < rf.length; j++) {
        const ox = Math.min(rf[i].max[0], rf[j].max[0]) - Math.max(rf[i].min[0], rf[j].min[0]);
        const oz = Math.min(rf[i].max[2], rf[j].max[2]) - Math.max(rf[i].min[2], rf[j].min[2]);
        expect(ox > 0 && oz > 0).toBe(false);
      }
    }
  });

  it('F3: the hillside beyond the plots is smooth and steeper than the route', () => {
    const t = terraceBoxes(world);
    // bank: meets each plot top at the edge, flank slope far out
    for (let i = 0; i < t.length; i++) {
      const zc = (t[i].min.z + t[i].max.z) / 2;
      expect(hillY(world, 30.01, zc)).toBeCloseTo(t[i].max.y, 1);
    }
    const slope = (hillY(world, 100, -60) - hillY(world, 100, -80)) / 20;
    expect(slope).toBeGreaterThan(0.4);
    expect(slope).toBeLessThan(0.5);
    // no terraces: no drop above 0.8 m between points 1 m apart beyond the bank
    for (let z = 20; z > -200; z -= 1.7) {
      for (let x = 40; x < 130; x += 7) {
        expect(Math.abs(hillY(world, x, z) - hillY(world, x, z - 1))).toBeLessThan(0.8);
        expect(Math.abs(hillY(world, x, z) - hillY(world, x + 1, z))).toBeLessThan(0.8);
      }
    }
  });

  it('F4: instance counts stay under the cap table with the 90 % margin', () => {
    const counts: Record<string, number> = {};
    decor.traverse((o) => {
      if (o instanceof InstancedMesh) counts[o.name.replace('decor_', '')] = o.count;
    });
    for (const id of PIECE_IDS) {
      expect(counts[id] ?? 0, id).toBeLessThanOrEqual(0.9 * PIECE_CAP[id] + 1e-9);
    }
    expect(counts.roof).toBeGreaterThan(150);
    expect(counts.canopy).toBeGreaterThan(250);
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
