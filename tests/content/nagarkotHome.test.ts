// T336a acceptance: the nagarkot-home maze generator (pure graph test, no sim). See docs/plans/nagarkot-home-design.md.
import { describe, expect, it } from 'vitest';
import {
  HOUSE_HALF,
  LANES,
  NAGARKOT_HOME_SEED,
  planeY,
  roofY,
} from '../../src/content/strategy/gen';
import { buildNagarkotHome, nagarkotHomeTries } from '../../src/content/strategy/home';
import {
  MOVE_CLIMB,
  MOVE_JUMP,
  moveOf,
  NODE_ROAD,
  analyze,
  buildEdges,
  estimateRoute,
  nodeDisjointPaths,
  type MazeGraph,
} from '../../src/content/strategy/graph';

const s = buildNagarkotHome();
const strict: MazeGraph = { n: s.nodes.length, edges: buildEdges(s.nodes), start: s.graph.start, goal: s.graph.goal };
const roads = s.nodes.filter((n) => n.kind === NODE_ROAD).map((n) => n.id);

describe('nagarkot-home sprint runs', () => {
  const est = estimateRoute(strict, s.nodes)!;
  const path = est.path.map((i) => s.nodes[i]);

  it('the route crosses at least two straight runs of 25 m or more', () => {
    expect(path.filter((n) => n.z1 - n.z0 >= 25).length).toBeGreaterThanOrEqual(2);
    expect(s.summary.routeRuns).toBeGreaterThanOrEqual(2);
  });

  it('the route has a launch gap that only a sprint from a long run clears', () => {
    let sprintOnly = 0;
    for (let i = 0; i + 1 < path.length; i++) {
      const a = path[i];
      const b = path[i + 1];
      if (moveOf(a, b, s.nodes) !== MOVE_JUMP) continue;
      if (moveOf({ ...a, z1: a.z0 + 10 }, b, s.nodes) !== MOVE_JUMP) sprintOnly++;
    }
    expect(sprintOnly).toBeGreaterThanOrEqual(1);
    expect(s.summary.sprintGaps).toBe(sprintOnly);
  });

  it('keeps the route under 80 s', () => {
    expect(s.summary.routeS!).toBeLessThanOrEqual(80);
  });
});

describe('nagarkot-home generator', () => {
  it('is deterministic and records its seed', () => {
    expect(s.seed).toBeGreaterThanOrEqual(NAGARKOT_HOME_SEED);
    expect(nagarkotHomeTries()).toBeGreaterThanOrEqual(1);
    expect(JSON.stringify(buildNagarkotHome().level)).toBe(JSON.stringify(s.level));
    expect(s.level.parkour).toBe(1);
  });

  it('every emitted node surface is a solid top in the level JSON', () => {
    for (const n of s.world?.nodes ?? s.nodes) {
      const hit = s.level.solids.some(
        (b) =>
          Math.abs(b.max[1] - n.y) < 1e-6 &&
          b.min[0] <= n.x0 + 1e-6 &&
          b.max[0] >= n.x1 - 1e-6 &&
          b.min[2] <= n.z0 + 1e-6 &&
          b.max[2] >= n.z1 - 1e-6,
      );
      expect(hit, `node ${n.id} has no solid top`).toBe(true);
    }
  });

  it('goal is reachable and the strict (route) graph has no undeclared edges', () => {
    expect(analyze(s.graph).goalReached).toBe(true);
    expect(analyze(strict).goalReached).toBe(true);
    // Every strict edge must be one the generator also holds (leak graph is a superset of strict).
    const held = new Set(s.graph.edges.map((e) => e.from * 100000 + e.to));
    for (const e of strict.edges) expect(held.has(e.from * 100000 + e.to)).toBe(true);
  });

  it('has two node-disjoint routes in every section between roads (roads are cut vertices)', () => {
    expect(nodeDisjointPaths(strict, roads, true)).toBeGreaterThanOrEqual(2);
  });

  it('keeps >= 80% of the baseline dead-end share in >= 6 branches', () => {
    const reach = s.stats.reach.filter(Boolean).length;
    expect(s.stats.deadEnds.length / reach).toBeGreaterThanOrEqual(0.8 * (14 / 118));
    expect(s.summary.deadBranches ?? 0).toBeGreaterThanOrEqual(6);
  });

  it('only a balcony climb leads uphill in the leak graph', () => {
    for (const e of s.graph.edges) {
      if (e.move === MOVE_CLIMB) continue;
      expect(s.nodes[e.to].y, `edge ${e.from}->${e.to}`).toBeLessThanOrEqual(s.nodes[e.from].y + 0.3 + 1e-6);
    }
  });

  it('every non-road node sits on a kit house (3.2 or 6.0 deck) and houses do not overlap in plan', () => {
    for (const n of s.nodes) {
      if (n.kind === NODE_ROAD) continue;
      expect(n.house).toBeGreaterThanOrEqual(0);
      const h = s.layout.houses[n.house];
      const deck = roofY(h) - (planeY(h.zc) - h.drop);
      expect([3.2, 6.0].some((k) => Math.abs(deck - k) < 1e-6), `house ${n.house} deck ${deck}`).toBe(true);
    }
    const hs = s.layout.houses;
    for (let i = 0; i < hs.length; i++) {
      for (let j = i + 1; j < hs.length; j++) {
        const ox = Math.abs(LANES[hs[i].lane] - LANES[hs[j].lane]) < 2 * HOUSE_HALF;
        const oz = Math.abs(hs[i].zc - hs[j].zc) < 2 * HOUSE_HALF;
        expect(ox && oz, `houses ${i},${j}`).toBe(false);
      }
    }
  });

  it('shortest start -> goal route is <= 80 s (metres and seconds logged)', () => {
    const r = estimateRoute(strict, s.nodes);
    expect(r).not.toBeNull();
    console.log(`nagarkot-home S->G: ${r!.metres.toFixed(1)} m, ${r!.seconds.toFixed(1)} s, seed ${s.seed}, tries ${nagarkotHomeTries()}`);
    expect(r!.seconds).toBeLessThanOrEqual(80);
  });
});
