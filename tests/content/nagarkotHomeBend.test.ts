// T337: nagarkot-home turns 90 degrees at its middle road (an angle change like Home Street), with no spiral.
import { describe, expect, it } from 'vitest';
import { buildNagarkotHome } from '../../src/content/strategy/home';
import {
  buildEdges,
  estimateRoute,
  NODE_BALCONY,
  type MazeGraph,
} from '../../src/content/strategy/graph';
import type { Box } from '../../src/content/strategy/gen';

const s = buildNagarkotHome();
const w = s.world!;
const lvl = s.level;

function overlaps(a: Box, b: Box): boolean {
  for (let k = 0; k < 3; k++)
    if (a.max[k] - 1e-6 <= b.min[k] || b.max[k] - 1e-6 <= a.min[k]) return false;
  return true;
}
function pairs(boxes: Box[]): number {
  let n = 0;
  for (let i = 0; i < boxes.length; i++)
    for (let j = i + 1; j < boxes.length; j++) if (overlaps(boxes[i], boxes[j])) n++;
  return n;
}

describe('nagarkot-home bend (T337)', () => {
  it('carries a world frame and the straight local level it came from', () => {
    expect(w).toBeDefined();
    expect(w.nodes.length).toBe(s.nodes.length);
    expect(w.tail.filter(Boolean).length).toBeGreaterThan(20);
    expect(w.local.solids.length).toBeLessThan(lvl.solids.length); // the world adds the turned road copy
  });

  it('descends south, turns once at the pivot road, then descends east (a 90 degree bend, no spiral)', () => {
    const spawn = lvl.spawn;
    const goal = lvl.goal!;
    const gx = (goal.min[0] + goal.max[0]) / 2;
    const gz = (goal.min[2] + goal.max[2]) / 2;
    const pivot = s.nodes[w.pivotNode];
    // before the pivot: pure -z; after: pure +x, within the lane width of the pivot road's z
    expect(spawn[2]).toBeGreaterThan(pivot.z1);
    expect(Math.abs(spawn[0])).toBeLessThanOrEqual(32);
    expect(gx).toBeGreaterThan(100);
    expect(Math.abs(gz - w.zr)).toBeLessThanOrEqual(32);
    // a spiral would revisit earlier ground: no tail node may lie west of the turned road or north of the pivot
    for (const n of w.nodes)
      if (w.tail[n.id]) expect(n.x0).toBeGreaterThanOrEqual(w.xEast - 5 - 1e-6);
  });

  it('keeps every node surface a solid top and adds no overlapping solids', () => {
    for (const n of w.nodes) {
      const hit = lvl.solids.some(
        (b) =>
          Math.abs(b.max[1] - n.y) < 1e-6 &&
          b.min[0] <= n.x0 + 1e-6 &&
          b.max[0] >= n.x1 - 1e-6 &&
          b.min[2] <= n.z0 + 1e-6 &&
          b.max[2] >= n.z1 - 1e-6,
      );
      expect(hit, `node ${n.id}`).toBe(true);
    }
    expect(pairs(lvl.solids)).toBeLessThanOrEqual(pairs(w.local.solids));
  });

  it('the bend puts no roof or road into lethal ground that the straight level did not', () => {
    const buried = (nodes: typeof s.nodes, hz: Box[]): number[] => {
      const out: number[] = [];
      for (const n of nodes) {
        if (n.kind === NODE_BALCONY) continue; // balconies hang off a roof
        const bad = hz.some(
          (h) =>
            h.min[0] < n.x1 - 1e-6 &&
            h.max[0] > n.x0 + 1e-6 &&
            h.min[2] < n.z1 - 1e-6 &&
            h.max[2] > n.z0 + 1e-6 &&
            h.max[1] > n.y + 1e-6,
        );
        if (bad) out.push(n.id);
      }
      return out;
    };
    const before = buried(s.nodes, w.local.hazards ?? []);
    const after = buried(w.nodes, lvl.hazards ?? []);
    expect(after.filter((id) => !before.includes(id))).toEqual([]);
  });

  it('only the turned run holds the pivot road tramps, and the shortest route stays within 80 s', () => {
    const strict: MazeGraph = {
      n: s.nodes.length,
      edges: buildEdges(s.nodes),
      start: s.graph.start,
      goal: s.graph.goal,
    };
    const straight = estimateRoute(strict, s.nodes)!;
    expect(s.summary.routeS!).toBeGreaterThan(straight.seconds); // the corner costs run time
    expect(s.summary.routeS!).toBeLessThanOrEqual(80);
    const pz = s.nodes[w.pivotNode];
    for (const t of lvl.tramps ?? []) {
      const onA =
        t.min[0] < 32 &&
        t.min[2] >= pz.z0 - 1e-6 &&
        t.max[2] <= pz.z1 + 1e-6 &&
        t.max[0] <= 32 + 1e-6;
      expect(onA, 'no tramp left on the straight pivot road').toBe(false);
    }
  });
});
