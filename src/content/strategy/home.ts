// nagarkot-home only passes (T336a): stepped ground, leak repair, route stats and the level builder. Kept out of gen.ts so the
// shipped bundle does not carry them until a level imports this module (initial chunk budget, T333).
import { DEFAULT_TUNING as T } from '../../core/config';
import {
  HAZARD_DEPTH,
  HAZARD_HALF_W,
  HAZARD_LIP,
  HAZARD_PAST,
  HOME_REPAIR_PASSES,
  MAX_SEED_TRIES,
  NAGARKOT_HOME_SEED,
  ROLE_DECOY,
  ROLE_GOAL,
  ROLE_SPAWN,
  ROW_ROAD,
  TERRACE_MAX,
  TERRACE_STEP,
  attemptStrategy,
  bx,
  SEGMENTS,
  UNREACHED_MAX,
  deadInRange,
  DEAD_MAX,
  measure,
  planeY,
  roadY,
  setHomeHooks,
  type BendFrame,
  type Box,
  type GenParams,
  type Segment,
  type Layout,
  type Measure,
  type StrategyLevel,
  type StrategySummary,
} from './gen';
import {
  LEAK_SPEEDS,
  MOVE_GRAB,
  MOVE_JUMP,
  MOVE_TIGHT,
  NODE_ROAD,
  NODE_ROOF,
  buildEdges,
  estimateRoute,
  nodeDisjointPaths,
  type EdgeOpts,
  type MazeGraph,
  type MazeNode,
  type MazeStats,
} from './graph';
import type { LevelJson } from '../load';

const KIT_LOW = 3.2; // 1-storey deck over its ground: 0.4 + 2.8 x 1 (houseKit HK)
const KIT_HIGH = 6.0; // 2-storey deck: 0.4 + 2.8 x 2
const KIT_STOREY = 2.8;
const KIT_HEIGHTS: readonly number[] = [KIT_LOW, KIT_HIGH];
const ROAD_UNDER = 2.7; // road deck under the front row's ground: a 1-storey front roof drops 5.9
const HOME_BALCONY_MIN = 3.0; // a balcony only on a 2-storey house
const HOME_ROUTE_MAX_S = 80; // fixed-line run, seconds (card T336a)
const HOME_DEAD_SHARE = 0.095; // 0.8 x the frozen level's 14/118 dead ends (review F7)
const HOME_BRANCHES = 6;

function homeSegment(
  name: string,
  houses: number,
  perBand: [number, number],
  gaps: number[],
  roadAfter: boolean,
  base: Segment,
): Segment {
  return { ...base, name, houses, perBand, gaps, heights: KIT_HEIGHTS, roadAfter };
}
const HOME_SEGMENTS: readonly Segment[] = [
  homeSegment('ridge', 5, [2, 2], [11, 12], false, SEGMENTS[0]),
  homeSegment('hillside', 12, [3, 4], [6, 7], true, SEGMENTS[1]),
  homeSegment('turnings', 12, [3, 4], [6, 7, 11, 12], true, SEGMENTS[2]),
  homeSegment('lower', 16, [3, 4], [6, 7, 11, 12], true, SEGMENTS[3]),
  homeSegment('town', 14, [3, 4], [6, 7], false, SEGMENTS[4]),
];

/** Leak model: any node may launch at any speed up to sprint, with no runway or streak. */
const LEAK_EDGE: EdgeOpts = {
  launches: LEAK_SPEEDS.map((v): readonly [number, number] => [T.hero.jump, v]),
  grab: LEAK_SPEEDS,
};

export const HOME_PARAMS: GenParams = {
  home: true,
  storey: KIT_STOREY,
  balconyDrop: KIT_STOREY,
  balconyDepth: 1.2,
  balconyMin: HOME_BALCONY_MIN,
  roadUnder: ROAD_UNDER,
  roadFront: KIT_HEIGHTS,
  roadBack: [KIT_LOW],
  spawnH: KIT_HIGH,
  goalH: KIT_LOW,
  segments: HOME_SEGMENTS,
  houses: 59,
  deadMin: 6,
  deadMax: DEAD_MAX,
  edge: LEAK_EDGE,
};

function homeValid(s: StrategyLevel, p: GenParams): boolean {
  let reach = 0;
  for (let i = 0; i < s.stats.reach.length; i++) if (s.stats.reach[i]) reach++;
  const sm = s.summary;
  return (
    s.stats.goalReached &&
    sm.houses === p.houses &&
    sm.unreachedRoofs <= UNREACHED_MAX &&
    deadInRange(s, p) &&
    s.stats.deadEnds.length >= HOME_DEAD_SHARE * reach &&
    (sm.deadBranches ?? 0) >= HOME_BRANCHES &&
    (sm.routeDisjoint ?? 0) >= 2 &&
    (sm.routeS ?? Infinity) > 0 &&
    (sm.routeS ?? Infinity) <= HOME_ROUTE_MAX_S
  );
}

// nagarkot-home ground is stepped per row: each row owns the z between the middles of its gaps, with a
// lethal band whose top follows that row's terrace (the highest ground in the row, so no roof is lower).
function steppedHazards(L: Layout, out: Box[]): void {
  const n = L.rows.length;
  for (let r = 0; r < n; r++) {
    const row = L.rows[r];
    let top: number;
    if (row.kind === ROW_ROAD) {
      top = roadY(L.roads[row.road]) - 1;
    } else {
      let drop = Infinity;
      for (let k = 0; k < row.houses.length; k++)
        drop = Math.min(drop, L.houses[row.houses[k]].drop);
      top = planeY((row.z0 + row.z1) / 2) - drop + HAZARD_LIP;
    }
    const zHi = r === 0 ? row.z1 + HAZARD_PAST : (L.rows[r - 1].z0 + row.z1) / 2;
    const zLo = r === n - 1 ? row.z0 - HAZARD_PAST : (row.z0 + L.rows[r + 1].z1) / 2;
    out.push(bx(-HAZARD_HALF_W, top - HAZARD_DEPTH, zLo, HAZARD_HALF_W, top, zHi));
  }
}

interface Leak {
  from: number; // node ids
  to: number;
  cross: boolean; // true: target lies in an uphill row; false: a side-step that climbs
}

const STEP_UP = 0.3; // a side-step may rise this much (the jump model's own tolerance)

// Edges that lead back up: a grab or tight landing in an uphill row, or a side-step onto a higher roof.
// Climbs (balcony to its own roof), lines and pads never count; an edge to the same house is its own balcony.
function findLeaks(L: Layout, m: Measure): Leak[] {
  const out: Leak[] = [];
  const nodes = m.nb.nodes;
  for (let i = 0; i < m.graph.edges.length; i++) {
    const e = m.graph.edges[i];
    if (e.move !== MOVE_JUMP && e.move !== MOVE_GRAB && e.move !== MOVE_TIGHT) continue;
    const a = nodes[e.from];
    const b = nodes[e.to];
    if (a.house >= 0 && a.house === b.house) continue;
    if (b.z0 >= a.z1 - 1e-9) out.push({ from: a.id, to: b.id, cross: true });
    else if (b.z1 > a.z0 + 1e-9 && b.y > a.y + STEP_UP)
      out.push({ from: a.id, to: b.id, cross: false });
  }
  void L;
  return out;
}

function rowOfNode(L: Layout, m: Measure, id: number): number {
  const n = m.nb.nodes[id];
  if (n.house >= 0) return L.houses[n.house].row;
  return L.roads[m.nb.roadNode.indexOf(id)].row;
}

// Mend every leak, or report that it cannot be mended (route house, balcony, or too many steps).
function repairLeaks(L: Layout): boolean {
  const steps: number[] = [];
  for (let pass = 0; pass < HOME_REPAIR_PASSES; pass++) {
    const m = measure(L);
    const leaks = findLeaks(L, m);
    if (leaks.length === 0) return true;
    const lk = leaks[0];
    const a = m.nb.nodes[lk.from];
    if (lk.cross) {
      const r = rowOfNode(L, m, lk.from);
      steps[r] = (steps[r] === undefined ? 0 : steps[r]) + 1;
      if (steps[r] > TERRACE_MAX) {
        return false;
      }
      for (let i = 0; i < L.houses.length; i++)
        if (L.houses[i].row >= r) L.houses[i].drop += TERRACE_STEP;
      for (let i = 0; i < L.roads.length; i++) {
        if (L.roads[i].row >= r) L.roads[i].top = roadY(L.roads[i]) - TERRACE_STEP;
      }
      for (let i = r; i < L.rowDrop.length; i++) L.rowDrop[i] += TERRACE_STEP;
    } else {
      // Side-step climb: lower the lower roof if it is a decoy, else raise the higher decoy, else lower the lower route
      // house (the strict route graph is re-checked at the end, so a broken step just fails the seed).
      const b = m.nb.nodes[lk.to];
      const ha = a.kind === NODE_ROOF ? L.houses[a.house] : null;
      const hb = b.kind === NODE_ROOF ? L.houses[b.house] : null;
      if (ha !== null && ha.role === ROLE_DECOY) ha.drop += TERRACE_STEP;
      else if (hb !== null && hb.role === ROLE_DECOY) hb.drop -= TERRACE_STEP;
      else if (ha !== null && ha.role !== ROLE_SPAWN && ha.role !== ROLE_GOAL)
        ha.drop += TERRACE_STEP; // route: validated later
      else return false;
    }
  }
  return false;
}

// Weakly connected groups of dead-end nodes: the separate blind alleys of the level.
function deadBranches(g: MazeGraph, st: MazeStats): number {
  const dead: boolean[] = new Array<boolean>(g.n).fill(false);
  for (let i = 0; i < st.deadEnds.length; i++) dead[st.deadEnds[i]] = true;
  const seen: boolean[] = new Array<boolean>(g.n).fill(false);
  let groups = 0;
  for (let i = 0; i < g.n; i++) {
    if (!dead[i] || seen[i]) continue;
    groups++;
    const q: number[] = [i];
    seen[i] = true;
    for (let h = 0; h < q.length; h++) {
      for (let k = 0; k < g.edges.length; k++) {
        const e = g.edges[k];
        const o = e.from === q[h] ? e.to : e.to === q[h] ? e.from : -1;
        if (o >= 0 && dead[o] && !seen[o]) {
          seen[o] = true;
          q.push(o);
        }
      }
    }
  }
  return groups;
}

function summarize(m: Measure, summary: StrategySummary): void {
  const strict: MazeGraph = {
    n: m.graph.n,
    edges: buildEdges(m.nb.nodes),
    start: m.graph.start,
    goal: m.graph.goal,
  };
  summary.routeDisjoint = nodeDisjointPaths(strict, m.nb.roadNode, true);
  const est = estimateRoute(strict, m.nb.nodes);
  summary.routeM = est === null ? -1 : est.metres;
  summary.routeS = est === null ? -1 : est.seconds;
  summary.deadBranches = deadBranches(m.graph, m.stats);
}

// T337: the straight level turns 90 degrees at its middle road. The generator, graph and validity stay in the straight
// local frame; this pass rigidly rotates everything after the pivot road (local -z becomes world +x, local +x stays the
// hero's right, world +z) about that road's centre line, and adds a turned copy of the road beside it (R_B) so the
// road becomes an L. Nothing is mirrored or re-run: every tail jump keeps its exact geometry.
const BEND_EAST = 32; // R_A's east end = R_B's west edge (ROAD_HALF_W)
const BEND_XE = BEND_EAST + 5; // world X of R_B's centre line (it is 10 m deep)
type V3 = [number, number, number];

function bendLevel(s: StrategyLevel): boolean {
  const L = s.layout;
  const road = L.roads[L.roads.length >> 1];
  let pn: MazeNode | null = null;
  for (let i = 0; i < s.nodes.length; i++) {
    const n = s.nodes[i];
    if (n.kind === NODE_ROAD && Math.abs((n.z0 + n.z1) / 2 - road.zc) < 1e-6) pn = n;
  }
  if (pn === null) return false;
  const zr = road.zc;
  const z0n = pn.z0;
  const z1n = pn.z1;
  const pid = pn.id;
  const tail: boolean[] = s.nodes.map((n) => (n.z0 + n.z1) / 2 < z0n - 1e-6);
  // no jump may skip the pivot road (a leak edge from above would cut the corner)
  const strict = buildEdges(s.nodes);
  for (const list of [s.graph.edges, strict]) {
    for (const e of list)
      if (tail[e.from] !== tail[e.to] && e.from !== pid && e.to !== pid) return false;
  }
  const rb = (b: Box): Box =>
    bx(
      BEND_XE + zr - b.max[2],
      b.min[1],
      zr + b.min[0],
      BEND_XE + zr - b.min[2],
      b.max[1],
      zr + b.max[0],
    );
  const rp = (p: V3): V3 => [BEND_XE + zr - p[2], p[1], zr + p[0]];
  const zc = (b: Box): number => (b.min[2] + b.max[2]) / 2;

  const lv = s.level;
  const solids: Box[] = [];
  const style: number[] = [];
  const sty = lv.style ?? [];
  for (let i = 0; i < lv.solids.length; i++) {
    const c = zc(lv.solids[i]);
    solids.push(c < z0n ? rb(lv.solids[i]) : lv.solids[i]);
    style.push(sty[i]);
    if (sty[i] === 0 && c >= z0n && c <= z1n) {
      solids.push(rb(lv.solids[i])); // R_B, the turned copy of the pivot road
      style.push(0);
    }
  }
  const lines = (lv.lines ?? []).map((l) => ({
    zone: zc(l.zone) < z0n ? rb(l.zone) : l.zone,
    anchor: l.anchor,
  }));
  const anchors = (lv.anchors ?? []).map((a, i) => {
    const li = (lv.lines ?? []).findIndex((l) => l.anchor === i);
    return li >= 0 && zc(lv.lines![li].zone) < z0n ? { ...a, pos: rp(a.pos as V3) } : a;
  });
  const hazards: Box[] = [];
  const hz = lv.hazards ?? [];
  const pr = road.row;
  for (let r = 0; r < hz.length; r++) {
    const h = hz[r];
    if (r <= pr) hazards.push(bx(h.min[0], h.min[1], h.min[2], BEND_EAST, h.max[1], h.max[2]));
    if (r === pr)
      hazards.push(
        rb(bx(h.min[0], h.min[1], h.min[2], h.max[0], h.max[1], Math.min(h.max[2], z1n))),
      );
    else if (r > pr) hazards.push(rb(h));
  }
  const level: LevelJson = {
    ...lv,
    solids,
    style,
    anchors,
    lines,
    tramps: (lv.tramps ?? []).map((b) => (zc(b) < z1n ? rb(b) : b)),
    cushions: (lv.cushions ?? []).map((b) => (zc(b) < z0n ? rb(b) : b)),
    hazards,
    goal: rb(lv.goal as Box),
  };
  const nodes: MazeNode[] = s.nodes.map((n) =>
    tail[n.id]
      ? { ...n, x0: BEND_XE + zr - n.z1, x1: BEND_XE + zr - n.z0, z0: zr + n.x0, z1: zr + n.x1 }
      : n,
  );
  // the corner costs run time: walk R_A east to R_B, then diagonally to the departure point on R_B's east edge
  const est = estimateRoute(
    { n: s.graph.n, edges: strict, start: s.graph.start, goal: s.graph.goal },
    s.nodes,
    (u, v, arrX, dep) =>
      u === pid && tail[v]
        ? Math.max(
            0,
            BEND_EAST - arrX + Math.hypot(BEND_XE + 5 - BEND_EAST, dep) - Math.abs(dep - arrX),
          )
        : 0,
  );
  if (est === null || est.seconds > HOME_ROUTE_MAX_S) return false;
  s.summary.routeM = est.metres;
  s.summary.routeS = est.seconds;
  const world: BendFrame = { pivotNode: pid, z0: z0n, zr, xEast: BEND_XE, nodes, tail, local: lv };
  s.world = world;
  s.level = level;
  return true;
}

setHomeHooks({
  hazards: steppedHazards,
  repair: repairLeaks,
  leaks: (L, m) => findLeaks(L, m).length,
  summarize,
});

let homeCached: StrategyLevel | null = null;
let homeCachedFor = -1;
let homeTries = 0;

/** Seeds tried (1 = the first seed worked) by the last buildNagarkotHome. */
export function nagarkotHomeTries(): number {
  return homeTries;
}

/** The nagarkot-home level for a seed: the first seed from it (seed, seed+1, ...) that validates, no fallback. */
export function buildNagarkotHome(seed: number = NAGARKOT_HOME_SEED): StrategyLevel {
  if (homeCached !== null && homeCachedFor === seed) return homeCached;
  for (let t = 0; t < MAX_SEED_TRIES; t++) {
    const s = attemptStrategy((seed + t) >>> 0, HOME_PARAMS);
    if (s === null || !homeValid(s, HOME_PARAMS) || !bendLevel(s)) continue;
    homeCached = s;
    homeCachedFor = seed;
    homeTries = t + 1;
    return s;
  }
  throw new Error('nagarkot-home: no valid level within ' + MAX_SEED_TRIES + ' seeds of ' + seed);
}
