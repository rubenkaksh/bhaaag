// Segmented graph layout (ADR 0015): Home Street turns like the owner's switchback sketch.
import { describe, expect, it } from 'vitest';
import { deckY } from '../../src/content/house/houseSpec';
import { parseGraph } from '../../src/content/graph/format';
import { loadGraph } from '../../src/content/graph/registry';
import { placeGraph } from '../../src/content/graph/place';
import type { HouseSpec } from '../../src/content/house/houseSpec';

const g = loadGraph('home-street');
const placed = placeGraph(g);
const segs = g.segments as NonNullable<typeof g.segments>;
const hazards = placed.level.hazards as { min: number[]; max: number[] }[];
const byId = new Map<number, HouseSpec>(placed.houses.map((h) => [h.id, h]));

function turn(a: number, b: number): number {
  const d = Math.abs(a - b) % 360;
  return d > 180 ? 360 - d : d;
}

describe('segmented layout: home-street', () => {
  it('has at least two heading changes of 90 degrees or more', () => {
    let turns = 0;
    for (let i = 1; i < segs.length; i++)
      if (turn(segs[i].heading, segs[i - 1].heading) >= 90) turns++;
    expect(turns).toBeGreaterThanOrEqual(2);
  });

  it('every run really heads where it says (bend house to bend house)', () => {
    for (const sg of segs) {
      if (
        sg.nodes.length < 3 &&
        g.edges.some((e) => e.kind === 'touch' && sg.nodes.includes(e.a) && sg.nodes.includes(e.b))
      )
        continue; // a lone touch may step sideways
      const a = byId.get(sg.nodes[0]) as HouseSpec;
      const b = byId.get(sg.nodes[sg.nodes.length - 1]) as HouseSpec;
      const bearing = (Math.atan2(b.cx - a.cx, b.cz - a.cz) * 180) / Math.PI;
      expect(turn((bearing + 360) % 360, sg.heading), 'run ' + sg.nodes.join('-')).toBeLessThan(55);
    }
  });

  it('no two houses overlap', () => {
    const hs = placed.houses;
    for (let i = 0; i < hs.length; i++)
      for (let j = i + 1; j < hs.length; j++) {
        const clash =
          Math.abs(hs[i].cx - hs[j].cx) < 8 - 1e-6 && Math.abs(hs[i].cz - hs[j].cz) < 8 - 1e-6;
        expect(clash, `houses ${hs[i].id} and ${hs[j].id}`).toBe(false);
      }
  });

  it('route has at most 10 houses (decoys extra) and the ground only goes down', () => {
    expect(placed.houses.filter((h) => h.id < 100).length).toBeLessThanOrEqual(10);
    for (const sg of segs) {
      const a = byId.get(sg.nodes[0]) as HouseSpec;
      const b = byId.get(sg.nodes[sg.nodes.length - 1]) as HouseSpec;
      expect(b.groundY).toBeLessThanOrEqual(a.groundY + 3);
    }
  });

  it('hazards cover every house and the goal, and never rise above a house roof', () => {
    const inXZ = (x: number, z: number): boolean =>
      hazards.some((h) => x >= h.min[0] && x <= h.max[0] && z >= h.min[2] && z <= h.max[2]);
    for (const h of placed.houses) {
      const any = [-3, 0, 3].some((dx) => [-3, 0, 3].some((dz) => inXZ(h.cx + dx, h.cz + dz)));
      expect(any, 'house ' + h.id + ' has ground').toBe(true);
      for (const hz of hazards) {
        const hit =
          hz.min[0] < h.cx + 4 &&
          hz.max[0] > h.cx - 4 &&
          hz.min[2] < h.cz + 4 &&
          hz.max[2] > h.cz - 4;
        if (hit) expect(hz.max[1], 'hazard under house ' + h.id).toBeLessThan(deckY(h) - 0.5);
      }
    }
    const goal = placed.level.goal as { min: number[]; max: number[] };
    expect(inXZ((goal.min[0] + goal.max[0]) / 2, (goal.min[2] + goal.max[2]) / 2)).toBe(true);
  });

  it('spawn yaw follows the first run, kill plane sits under the lowest terrace', () => {
    expect(placed.level.spawnYaw).toBeCloseTo((segs[0].heading * Math.PI) / 180, 5);
    const lowest = Math.min(...placed.houses.map((h) => h.groundY));
    expect(placed.level.killPlaneY).toBeLessThan(lowest - 10);
  });

  it('the view ground follows each run: exact under a house, near the run elsewhere', () => {
    const f = placed.field as NonNullable<typeof placed.field>;
    for (const h of placed.houses) expect(f(h.cx, h.cz).h).toBeCloseTo(h.groundY, 0);
  });
});

describe('segments format', () => {
  const base = JSON.parse(JSON.stringify(g)) as Record<string, unknown>;
  it('rejects a node that two runs share without a bend', () => {
    const bad = {
      ...base,
      segments: [
        { heading: 90, nodes: [1, 2, 3] },
        { heading: 0, nodes: [2, 4] },
      ],
    };
    expect(() => parseGraph(bad)).toThrow();
  });
  it('rejects an edge that crosses runs', () => {
    const bad = {
      ...base,
      segments: [
        { heading: 90, nodes: [1, 2] },
        { heading: 180, nodes: [2, 3, 4, 9, 5, 6, 7, 8, 10] },
      ],
    };
    expect(() => parseGraph(bad)).not.toThrow();
    const cross = {
      ...base,
      segments: [
        { heading: 90, nodes: [1, 2, 3, 4] },
        { heading: 180, nodes: [5, 6, 9, 7, 8, 10] },
      ],
    };
    expect(() => parseGraph(cross)).toThrow();
  });
});
