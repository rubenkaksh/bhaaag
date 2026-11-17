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
  NODE_ROOF,
  buildEdges,
  estimateRoute,
  nodeDisjointPaths,
  type EdgeOpts,
  type MazeGraph,
  type MazeStats,
} from './graph';

const KIT_LOW = 3.2; // 1-storey deck over its ground: 0.4 + 2.8 x 1 (houseKit HK)
const KIT_HIGH = 6.0; // 2-storey deck: 0.4 + 2.8 x 2
const KIT_STOREY = 2.8;
const KIT_HEIGHTS: readonly number[] = [KIT_LOW, KIT_HIGH];
const ROAD_UNDER = 2.7; // road deck under the front row's ground: a 1-storey front roof drops 5.9
const HOME_BALCONY_MIN = 3.0; // a balcony only on a 2-storey house
const HOME_ROUTE_MAX_S = 80; // fixed-line run, seconds (card T336a)
const HOME_DEAD_SHARE = 0.095; // 0.8 x the frozen level's 14/118 dead ends (review F7)
const HOME_BRANCHES = 6;

function homeSegment(name: string, houses: number, perBand: [number, number], gaps: number[], roadAfter: boolean, base: Segment): Segment {
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
      for (let k = 0; k < row.houses.length; k++) drop = Math.min(drop, L.houses[row.houses[k]].drop);
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
    else if (b.z1 > a.z0 + 1e-9 && b.y > a.y + STEP_UP) out.push({ from: a.id, to: b.id, cross: false });
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
      for (let i = 0; i < L.houses.length; i++) if (L.houses[i].row >= r) L.houses[i].drop += TERRACE_STEP;
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
      else if (ha !== null && ha.role !== ROLE_SPAWN && ha.role !== ROLE_GOAL) ha.drop += TERRACE_STEP; // route: validated later
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
  const strict: MazeGraph = { n: m.graph.n, edges: buildEdges(m.nb.nodes), start: m.graph.start, goal: m.graph.goal };
  summary.routeDisjoint = nodeDisjointPaths(strict, m.nb.roadNode, true);
  const est = estimateRoute(strict, m.nb.nodes);
  summary.routeM = est === null ? -1 : est.metres;
  summary.routeS = est === null ? -1 : est.seconds;
  summary.deadBranches = deadBranches(m.graph, m.stats);
}

setHomeHooks({ hazards: steppedHazards, repair: repairLeaks, leaks: (L, m) => findLeaks(L, m).length, summarize });

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
    if (s === null || !homeValid(s, HOME_PARAMS)) continue;
    homeCached = s;
    homeCachedFor = seed;
    homeTries = t + 1;
    return s;
  }
  throw new Error('nagarkot-home: no valid level within ' + MAX_SEED_TRIES + ' seeds of ' + seed);
}
