// Strategy maze level generator (ADR 0011 / 0012, track S1): the 100-house Nagarkot -> Bhaktapur
// run. Seeded and pure: the same seed always yields the same level.
//
// Shape: rows of 8 m houses on five lanes down the 20 degree hill, in five segments (ridge,
// hillside houses, road turnings, lower slope, Bhaktapur town) with a road terrace between the
// middle ones. Two routes (A and B) are built row by row from the spawn tower to the goal; each
// step is checked against the kinematic model in graph.ts, and gets the cushion, trampoline,
// balcony or zipline it needs. Every other house is a decoy hung sideways off a route house,
// often one storey lower: easy to drop onto, impossible to climb back from. The graph is then
// recomputed from geometry alone and the dead ends counted and trimmed into range.
import type { LevelJson } from '../load';
import {
  MOVE_JUMP,
  MOVE_NAMES,
  MOVE_TRAMP,
  MOVE_ZIP,
  NODE_BALCONY,
  NODE_ROAD,
  NODE_ROOF,
  PAD_DEPTH,
  PAD_HALF,
  analyze,
  anchorPos,
  buildEdges,
  moveOf,
  zoneCentre,
  type MazeGraph,
  type MazeNode,
  type MazeStats,
} from './graph';

export { MOVE_NAMES, hasEscape } from './graph';

export const STRATEGY_SEED = 20261111;
export const HOUSE_COUNT = 100;

// Hill, as terrain.ts draws it (kept numerically identical; content must not import the renderer).
export const GRADE = Math.tan((20 * Math.PI) / 180);
export const GROUND_Y0 = -8;
export function planeY(z: number): number {
  return GRADE * z + GROUND_Y0;
}

export const LANES: readonly number[] = [-24, -12, 0, 12, 24];
const HOUSE_HALF = 4; // 8 m square footprint, so 4 m between neighbours in a row
const STOREY = 4; // roof heights differ by whole storeys: one up sideways is out of grab reach
const H_LOW = 7;
const H_MID = H_LOW + STOREY;
const H_HIGH = H_MID + STOREY;
const BALCONY_DEPTH = 2;
const BALCONY_DROP = 2; // balcony surface below the roof: within climb reach from a jump
const ROAD_HALF = 5;
const ROAD_HALF_W = 32;
const ROAD_LIFT = 5; // road deck above the ground at its uphill edge (retaining wall)
const ROAD_GAP = 4; // open ground between a road terrace and the rows on either side
const ROAD_FRONT_HEIGHTS: readonly number[] = [H_LOW, H_MID]; // low: jump down; mid: line down
const SPAWN_LANE = 2;
const SPAWN_H = H_HIGH;
const SPAWN_GAP = 6;
const GOAL_H = 5;
const GOAL_GAP = 7; // the last leap, onto a cushion roof
const ZONE_OFF = 2; // zip zone centre, left of the lane centre
const PAD_OFF = 2; // tramp pad centre, right of the lane centre (never under the zone)
const SLAB = 0.3; // roof and balcony slab thickness (style 2)
const FOOT = 6; // house boxes reach this far under the centre-line ground
const THIN = 0.02; // cushion and tramp slab thickness (inside the sim's slab tolerance)
const ZONE_THICK = 0.05;
const HAZARD_STRIP = 4; // lethal ground in strips this deep, stepped down the hill
const HAZARD_DEPTH = 6;
const HAZARD_LIP = 0.2;
const HAZARD_HALF_W = 60;
const HAZARD_PAST = 8; // strips run this far past the first and last row
export const DEAD_MIN = 8; // dead-end roofs wanted in a level
export const DEAD_MAX = 20;
export const MIN_ESCAPES = 2; // edge-disjoint spawn -> goal routes wanted
const UNREACHED_MAX = 2; // roofs nobody can get to (scenery) tolerated
const REPAIR_MAX = 80;
const MAX_SEED_TRIES = 64;
const GOAL_REACH = 3; // goal volume height over the last roof

// Link kinds, also the order of a segment's `mix` weights.
const K_PLAIN = 0;
const K_BALCONY = 1;
const K_CUSHION = 2;
const K_TRAMP = 3;

interface Segment {
  name: string;
  houses: number; // quota; the spawn tower counts in the first, the goal in the last
  perBand: readonly [number, number];
  gaps: readonly number[]; // open ground between rows; 11+ can only be crossed on a line
  heights: readonly number[];
  roadAfter: boolean;
  mix: readonly number[]; // weights of K_* when a route needs a step
  shift: number; // chance a route side-steps one lane inside a row
  trap: number; // chance a decoy sits one storey under the house it hangs off
  deco: readonly number[]; // decoy chances: cushion, balcony, tramp, zip
}

const ALL_H: readonly number[] = [H_LOW, H_MID, H_HIGH];
export const SEGMENTS: readonly Segment[] = [
  {
    name: 'ridge',
    houses: 9,
    perBand: [2, 2],
    gaps: [11, 12],
    heights: ALL_H,
    roadAfter: false,
    mix: [1, 1, 1, 1, 3],
    shift: 0,
    trap: 0,
    deco: [0, 0, 0, 0],
  },
  {
    name: 'hillside',
    houses: 15,
    perBand: [3, 5],
    gaps: [6, 7],
    heights: ALL_H,
    roadAfter: true,
    mix: [4, 1, 2, 2, 2],
    shift: 0.2,
    trap: 0.7,
    deco: [0.08, 0.1, 0.06, 0.12],
  },
  {
    name: 'turnings',
    houses: 15,
    perBand: [4, 5],
    gaps: [6, 7, 11, 12],
    heights: ALL_H,
    roadAfter: true,
    mix: [3, 2, 2, 2, 3],
    shift: 0.2,
    trap: 0.8,
    deco: [0.08, 0.1, 0.06, 0.12],
  },
  {
    name: 'lower',
    houses: 36,
    perBand: [4, 5],
    gaps: [6, 7, 11, 12],
    heights: ALL_H,
    roadAfter: true,
    mix: [2, 2, 3, 3, 3],
    shift: 0.2,
    trap: 0.85,
    deco: [0.06, 0.08, 0.05, 0.1],
  },
  {
    name: 'town',
    houses: 25,
    perBand: [4, 5],
    gaps: [6, 7],
    heights: ALL_H,
    roadAfter: false,
    mix: [4, 2, 2, 1, 1],
    shift: 0.25,
    trap: 0.85,
    deco: [0.06, 0.08, 0.05, 0.1],
  },
];
const TOWER_MIX: readonly number[] = [3, 1, 2, 2, 0]; // route A leaves the tower's one line to B
const ZIP_ONLY: readonly number[] = [0, 0, 0, 0, 1];
const GOAL_MIX: readonly number[] = [1, 0, 0, 1, 1];
const OPEN_MIX: readonly number[] = [0, 0, 1, 1, 1]; // what may open a dead end

export const ROLE_DECOY = 0;
export const ROLE_A = 1;
export const ROLE_B = 2;
export const ROLE_SPAWN = 3;
export const ROLE_GOAL = 4;

const NONE = -1;
// A move source or zip target is a house index (>= 0), NONE, or a road as -2 - roadIndex.
function roadRef(i: number): number {
  return -2 - i;
}

export interface House {
  lane: number; // index into LANES
  zc: number;
  h: number; // roof height over planeY(zc)
  balcony: boolean; // ledge on the uphill face, BALCONY_DROP below the roof
  cushion: boolean; // whole roof is a cushion
  tramp: boolean; // tramp pad on the downhill edge
  zipTo: number; // house index the roof zone lines to, NONE, or a road ref
  row: number;
  seg: number;
  role: number; // ROLE_*
}

export interface Road {
  zc: number;
  tramps: number[]; // x centres of pads on the downhill edge
  row: number;
}

export const ROW_BAND = 0;
export const ROW_ROAD = 1;

export interface Row {
  kind: number;
  z0: number;
  z1: number;
  houses: number[]; // band: house indices
  road: number; // road: road index, else -1
  seg: number;
}

export interface Layout {
  houses: House[];
  roads: Road[];
  rows: Row[];
}

export interface NodeIndex {
  nodes: MazeNode[];
  roofOf: number[]; // house index -> node id
  balcOf: number[]; // house index -> node id or -1
  roadNode: number[]; // road index -> node id
}

export interface StrategySummary {
  seed: number; // the seed actually used
  houses: number;
  roads: number;
  rows: number;
  nodes: number;
  edges: number;
  moves: number[]; // edge count per MOVE_*
  deadRoofs: number; // reachable roofs with no way to the goal
  unreachedRoofs: number;
  escapePaths: number;
  lostB: number; // times route B could not be continued (it restarts at the next road)
  repairs: number; // dead ends opened to get under DEAD_MAX
  zips: number;
  tramps: number;
  cushions: number;
  balconies: number;
  zMin: number; // downhill end of the level (terrain must reach it)
  length: number;
}

export interface StrategyLevel {
  level: LevelJson;
  layout: Layout;
  nodes: MazeNode[];
  graph: MazeGraph;
  stats: MazeStats;
  summary: StrategySummary;
  seed: number;
}

// mulberry32: small, deterministic, good enough for layout choices.
export function makeRng(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Rng = () => number;

function randInt(rng: Rng, n: number): number {
  return Math.min(n - 1, Math.floor(rng() * n));
}

function pick<T>(rng: Rng, arr: readonly T[]): T {
  return arr[randInt(rng, arr.length)];
}

function shuffled<T>(rng: Rng, arr: readonly T[]): T[] {
  const out = arr.slice();
  for (let i = out.length - 1; i > 0; i--) {
    const j = randInt(rng, i + 1);
    const t = out[i];
    out[i] = out[j];
    out[j] = t;
  }
  return out;
}

// Indices with a positive weight, drawn without replacement in proportion to it.
function weightedOrder(rng: Rng, w: readonly number[]): number[] {
  const left = w.slice();
  const out: number[] = [];
  for (;;) {
    let sum = 0;
    for (let i = 0; i < left.length; i++) sum += left[i];
    if (sum <= 0) return out;
    let r = rng() * sum;
    let k = -1;
    for (let i = 0; i < left.length; i++) {
      if (left[i] <= 0) continue;
      k = i;
      r -= left[i];
      if (r < 0) break;
    }
    out.push(k);
    left[k] = 0;
  }
}

// Row sizes for a quota: each inside [min, max] where the arithmetic allows, never under 2.
function split(rng: Rng, quota: number, min: number, max: number): number[] {
  const out: number[] = [];
  let rem = quota;
  while (rem > 0) {
    let k = min + randInt(rng, max - min + 1);
    if (k > rem) k = rem;
    const left = rem - k;
    if (left > 0 && left < min) k = rem <= max ? rem : Math.max(2, rem - min);
    out.push(k);
    rem -= k;
  }
  return out;
}

export function roofY(h: House): number {
  return planeY(h.zc) + h.h;
}

export function roadY(r: Road): number {
  // Flat terrace cut into the slope: the deck sits ROAD_LIFT above the ground at its uphill
  // edge. A plain deck, not a cushion: a drop from a mid-height roof onto it kills.
  return planeY(r.zc + ROAD_HALF) + ROAD_LIFT;
}

/** Nodes for a layout: roof (and balcony) per house, one per road. Ids are stable per call. */
export function buildNodes(layout: Layout): NodeIndex {
  const nodes: MazeNode[] = [];
  const roofOf: number[] = [];
  const balcOf: number[] = [];
  const roadNode: number[] = [];
  for (let i = 0; i < layout.houses.length; i++) {
    const h = layout.houses[i];
    const x = LANES[h.lane];
    roofOf.push(nodes.length);
    balcOf.push(-1);
    nodes.push({
      id: nodes.length,
      kind: NODE_ROOF,
      house: i,
      x0: x - HOUSE_HALF,
      x1: x + HOUSE_HALF,
      z0: h.zc - HOUSE_HALF,
      z1: h.zc + HOUSE_HALF,
      y: roofY(h),
      cushion: h.cushion,
      tramps: h.tramp ? [x + PAD_OFF] : [],
      zipTo: -1,
      zipX: x - ZONE_OFF,
      up: -1,
      balc: -1,
    });
  }
  for (let i = 0; i < layout.houses.length; i++) {
    const h = layout.houses[i];
    if (!h.balcony) continue;
    const x = LANES[h.lane];
    balcOf[i] = nodes.length;
    nodes[roofOf[i]].balc = nodes.length;
    nodes.push({
      id: nodes.length,
      kind: NODE_BALCONY,
      house: i,
      x0: x - HOUSE_HALF,
      x1: x + HOUSE_HALF,
      z0: h.zc + HOUSE_HALF,
      z1: h.zc + HOUSE_HALF + BALCONY_DEPTH,
      y: roofY(h) - BALCONY_DROP,
      cushion: false,
      tramps: [],
      zipTo: -1,
      zipX: x - ZONE_OFF,
      up: roofOf[i],
      balc: -1,
    });
  }
  for (let i = 0; i < layout.roads.length; i++) {
    const r = layout.roads[i];
    roadNode.push(nodes.length);
    nodes.push({
      id: nodes.length,
      kind: NODE_ROAD,
      house: -1,
      x0: -ROAD_HALF_W,
      x1: ROAD_HALF_W,
      z0: r.zc - ROAD_HALF,
      z1: r.zc + ROAD_HALF,
      y: roadY(r),
      cushion: false,
      tramps: r.tramps.slice(),
      zipTo: -1,
      zipX: 0,
      up: -1,
      balc: -1,
    });
  }
  for (let i = 0; i < layout.houses.length; i++) {
    const z = layout.houses[i].zipTo;
    if (z >= 0) nodes[roofOf[i]].zipTo = roofOf[z];
    else if (z <= -2) nodes[roofOf[i]].zipTo = roadNode[-2 - z];
  }
  return { nodes, roofOf, balcOf, roadNode };
}

function srcNode(nb: NodeIndex, s: number): MazeNode {
  return nb.nodes[s >= 0 ? nb.roofOf[s] : nb.roadNode[-2 - s]];
}

// The comfortable move from source s onto house q (its roof, or its balcony and a climb), or -1.
// Routes are only ever built on these: never on a lip landing or a ledge grab.
function routeMove(L: Layout, s: number, q: number): number {
  const nb = buildNodes(L);
  const a = srcNode(nb, s);
  const m = moveOf(a, nb.nodes[nb.roofOf[q]], nb.nodes);
  if (m === MOVE_JUMP || m === MOVE_TRAMP || m === MOVE_ZIP) return m;
  const bi = nb.balcOf[q];
  if (bi >= 0) {
    const mb = moveOf(a, nb.nodes[bi], nb.nodes);
    if (mb === MOVE_JUMP || mb === MOVE_TRAMP) return mb;
  }
  return -1;
}

// Make the step s -> q work. Kinds are tried in weighted order over shuffled target heights;
// a feature kind only counts where the step fails without it, so every cushion, pad and line
// on a route is one the player needs. `freeze` keeps q's height and balcony as they are.
function link(
  L: Layout,
  rng: Rng,
  s: number,
  q: number,
  heights: readonly number[],
  mix: readonly number[],
  freeze: boolean,
): boolean {
  // The house keeps its seeded storey count unless no kind of link can make the step work.
  if (linkWith(L, rng, s, q, [L.houses[q].h], mix, freeze)) return true;
  return !freeze && linkWith(L, rng, s, q, heights, mix, freeze);
}

function linkWith(
  L: Layout,
  rng: Rng,
  s: number,
  q: number,
  heights: readonly number[],
  mix: readonly number[],
  freeze: boolean,
): boolean {
  const Q = L.houses[q];
  const P = s >= 0 ? L.houses[s] : null;
  const road = s <= -2 ? L.roads[-2 - s] : null;
  const q0h = Q.h;
  const q0b = Q.balcony;
  const q0c = Q.cushion;
  const p0t = P !== null ? P.tramp : false;
  const p0z = P !== null ? P.zipTo : NONE;
  const pads = road !== null ? road.tramps.length : 0;
  const reset = (): void => {
    Q.h = q0h;
    Q.balcony = q0b;
    Q.cushion = q0c;
    if (P !== null) {
      P.tramp = p0t;
      P.zipTo = p0z;
    }
    if (road !== null) road.tramps.length = pads;
  };
  const hs = freeze ? [Q.h] : shuffled(rng, heights);
  const kinds = weightedOrder(rng, mix);
  for (let ki = 0; ki < kinds.length; ki++) {
    const kind = kinds[ki];
    const bals = freeze ? [q0b] : kind === K_BALCONY ? [true] : kind === K_TRAMP ? [false, true] : [false];
    for (let hi = 0; hi < hs.length; hi++) {
      for (let bi = 0; bi < bals.length; bi++) {
        reset();
        Q.h = hs[hi];
        Q.balcony = bals[bi];
        const plain = routeMove(L, s, q);
        if (kind === K_PLAIN || kind === K_BALCONY) {
          if (plain >= 0) return true;
          continue;
        }
        if (plain >= 0) continue;
        if (kind === K_CUSHION) {
          if (Q.cushion) continue;
          Q.cushion = true;
        } else if (kind === K_TRAMP) {
          if (P !== null) {
            if (P.tramp) continue;
            P.tramp = true;
          } else if (road !== null) {
            road.tramps.push(LANES[Q.lane] + PAD_OFF);
          }
        } else {
          if (P === null || P.zipTo !== NONE) continue;
          P.zipTo = q;
        }
        if (routeMove(L, s, q) >= 0) return true;
      }
    }
  }
  reset();
  return false;
}

// Step from house p down onto road ri: a plain drop, else the house's line.
function linkRoad(L: Layout, p: number, ri: number): boolean {
  const P = L.houses[p];
  let nb = buildNodes(L);
  if (moveOf(nb.nodes[nb.roofOf[p]], nb.nodes[nb.roadNode[ri]], nb.nodes) === MOVE_JUMP) return true;
  if (P.zipTo !== NONE) return false;
  P.zipTo = roadRef(ri);
  nb = buildNodes(L);
  if (moveOf(nb.nodes[nb.roofOf[p]], nb.nodes[nb.roadNode[ri]], nb.nodes) === MOVE_ZIP) return true;
  P.zipTo = NONE;
  return false;
}

// Side-step inside a row: the neighbour gets the same height, or one storey less (no way back).
function lateral(L: Layout, rng: Rng, from: number, to: number, heights: readonly number[]): boolean {
  const P = L.houses[from];
  const H = L.houses[to];
  const own = H.h; // the seeded storey count first, then level with the neighbour or one lower
  const opts = rng() < 0.5 ? [own, P.h, P.h - STOREY] : [own, P.h - STOREY, P.h];
  for (let i = 0; i < opts.length; i++) {
    if (heights.indexOf(opts[i]) < 0) continue;
    H.h = opts[i];
    const nb = buildNodes(L);
    if (moveOf(nb.nodes[nb.roofOf[from]], nb.nodes[nb.roofOf[to]], nb.nodes) === MOVE_JUMP) return true;
  }
  H.h = own;
  return false;
}

// A free lane next to e, leaning towards `toward` when there is a choice.
function adjFree(occ: boolean[], e: number, rng: Rng, toward: number): number {
  const c: number[] = [];
  if (e > 0 && !occ[e - 1]) c.push(e - 1);
  if (e < LANES.length - 1 && !occ[e + 1]) c.push(e + 1);
  if (c.length === 0) return NONE;
  if (c.length === 1) return c[0];
  if (toward !== NONE && rng() < 0.7) {
    return Math.abs(c[0] - toward) <= Math.abs(c[1] - toward) ? c[0] : c[1];
  }
  return pick(rng, c);
}

// Decoys take their height from a neighbour that is already placed: level with it, or one
// storey down (a commitment: you can hop over, you cannot hop back).
function attach(L: Layout, rng: Rng, ids: number[], heights: readonly number[], trap: number): void {
  const done: boolean[] = [];
  for (let i = 0; i < ids.length; i++) done.push(L.houses[ids[i]].role !== ROLE_DECOY);
  let progress = true;
  while (progress) {
    progress = false;
    for (let i = 0; i < ids.length; i++) {
      if (done[i]) continue;
      const me = L.houses[ids[i]];
      const nbs: House[] = [];
      for (let j = 0; j < ids.length; j++) {
        const o = L.houses[ids[j]];
        if (done[j] && Math.abs(o.lane - me.lane) === 1) nbs.push(o);
      }
      if (nbs.length === 0) continue;
      const nbh = pick(rng, nbs).h;
      // Keep the seeded storey count when it is no taller than the neighbour (a decoy taller than
      // the house it hangs off could not be reached); a taller one is pulled level, or a storey
      // under on a trap roll.
      if (me.h > nbh) me.h = rng() < trap && heights.indexOf(nbh - STOREY) >= 0 ? nbh - STOREY : nbh;
      done[i] = true;
      progress = true;
    }
  }
}

// A decoy line to something one row down: sometimes a way out, sometimes a way further in.
function decoZip(L: Layout, rng: Rng, i: number): void {
  const h = L.houses[i];
  const next = L.rows[h.row + 1];
  if (next === undefined || h.zipTo !== NONE) return;
  let target: number;
  if (next.kind === ROW_ROAD) {
    target = roadRef(next.road);
  } else {
    const c: number[] = [];
    for (let k = 0; k < next.houses.length; k++) {
      if (Math.abs(L.houses[next.houses[k]].lane - h.lane) <= 1) c.push(next.houses[k]);
    }
    if (c.length === 0) return;
    target = pick(rng, c);
  }
  h.zipTo = target;
  const nb = buildNodes(L);
  const b = target >= 0 ? nb.nodes[nb.roofOf[target]] : nb.nodes[nb.roadNode[-2 - target]];
  if (moveOf(nb.nodes[nb.roofOf[i]], b, nb.nodes) !== MOVE_ZIP) h.zipTo = NONE;
}

interface Measure {
  nb: NodeIndex;
  graph: MazeGraph;
  stats: MazeStats;
  deadRoofs: number[]; // house indices
  unreached: number;
}

function measure(L: Layout): Measure {
  const nb = buildNodes(L);
  const graph: MazeGraph = {
    n: nb.nodes.length,
    edges: buildEdges(nb.nodes),
    start: nb.roofOf[0],
    goal: nb.roofOf[L.houses.length - 1],
  };
  const stats = analyze(graph);
  const deadRoofs: number[] = [];
  let unreached = 0;
  for (let i = 0; i < L.houses.length; i++) {
    const id = nb.roofOf[i];
    if (!stats.reach[id]) unreached++;
    else if (!stats.canFinish[id]) deadRoofs.push(i);
  }
  return { nb, graph, stats, deadRoofs, unreached };
}

// Give dead roof d a way on to a live platform one row down: a cushion there, a pad or a line here.
function openDead(L: Layout, rng: Rng, d: number, m: Measure): boolean {
  const D = L.houses[d];
  const next = L.rows[D.row + 1];
  if (next === undefined) return false;
  if (next.kind === ROW_ROAD) return linkRoad(L, d, next.road);
  const same: number[] = [];
  const side: number[] = [];
  for (let k = 0; k < next.houses.length; k++) {
    const q = next.houses[k];
    if (!m.stats.canFinish[m.nb.roofOf[q]]) continue;
    const dl = Math.abs(L.houses[q].lane - D.lane);
    if (dl === 0) same.push(q);
    else if (dl === 1) side.push(q);
  }
  const c = same.concat(shuffled(rng, side));
  for (let k = 0; k < c.length; k++) {
    if (link(L, rng, d, c[k], [], OPEN_MIX, true)) return true;
  }
  return false;
}

type Box = { min: [number, number, number]; max: [number, number, number] };

function bx(x0: number, y0: number, z0: number, x1: number, y1: number, z1: number): Box {
  return { min: [x0, y0, z0], max: [x1, y1, z1] };
}

/** Geometry for a layout. Spawn on the first house, goal on the last. */
export function layoutToLevel(layout: Layout): LevelJson {
  const nb = buildNodes(layout);
  const solids: Box[] = [];
  const style: number[] = [];
  const anchors: { pos: [number, number, number] }[] = [];
  const lines: { zone: Box; anchor: number }[] = [];
  const tramps: Box[] = [];
  const cushions: Box[] = [];
  const hazards: Box[] = [];
  const H = HOUSE_HALF;
  for (let i = 0; i < layout.houses.length; i++) {
    const h = layout.houses[i];
    const x = LANES[h.lane];
    const y = roofY(h);
    const z0 = h.zc - H;
    const z1 = h.zc + H;
    solids.push(bx(x - H, planeY(h.zc) - FOOT, z0, x + H, y - SLAB, z1));
    style.push(1);
    solids.push(bx(x - H, y - SLAB, z0, x + H, y, z1));
    style.push(2);
    if (h.balcony) {
      const by = y - BALCONY_DROP;
      solids.push(bx(x - H, by - SLAB, z1, x + H, by, z1 + BALCONY_DEPTH));
      style.push(2);
    }
    const px0 = x + PAD_OFF - PAD_HALF;
    const px1 = x + PAD_OFF + PAD_HALF;
    if (h.cushion && !h.tramp) {
      cushions.push(bx(x - H, y, z0, x + H, y + THIN, z1));
    } else if (h.cushion) {
      // Keep the cushion off the tramp pad so the pad always bounces.
      cushions.push(bx(x - H, y, z0 + PAD_DEPTH, x + H, y + THIN, z1));
      cushions.push(bx(x - H, y, z0, px0, y + THIN, z0 + PAD_DEPTH));
      if (px1 < x + H) cushions.push(bx(px1, y, z0, x + H, y + THIN, z0 + PAD_DEPTH));
    }
    if (h.tramp) tramps.push(bx(px0, y, z0, px1, y + THIN, z0 + PAD_DEPTH));
    if (h.zipTo !== NONE) {
      const a = nb.nodes[nb.roofOf[i]];
      const b = nb.nodes[a.zipTo];
      const zc = zoneCentre(a);
      lines.push({
        zone: bx(zc[0] - PAD_HALF, y, z0, zc[0] + PAD_HALF, y + ZONE_THICK, z0 + PAD_DEPTH),
        anchor: anchors.length,
      });
      anchors.push({ pos: anchorPos(a, b) });
    }
  }
  for (let i = 0; i < layout.roads.length; i++) {
    const r = layout.roads[i];
    const y = roadY(r);
    const z0 = r.zc - ROAD_HALF;
    solids.push(bx(-ROAD_HALF_W, planeY(z0) - FOOT, z0, ROAD_HALF_W, y, r.zc + ROAD_HALF));
    style.push(0);
    for (let k = 0; k < r.tramps.length; k++) {
      const x = r.tramps[k];
      tramps.push(bx(x - PAD_HALF, y, z0, x + PAD_HALF, y + THIN, z0 + PAD_DEPTH));
    }
  }
  // Lethal ground over the whole run, in strips stepped down the hill so the top never rises
  // more than a strip's fall above the slope (it stays under every balcony and deck).
  const first = layout.houses[0];
  const last = layout.houses[layout.houses.length - 1];
  const zEnd = last.zc - H - HAZARD_PAST;
  for (let z = first.zc + H + HAZARD_PAST; z > zEnd; z -= HAZARD_STRIP) {
    const top = planeY(z) + HAZARD_LIP;
    hazards.push(bx(-HAZARD_HALF_W, top - HAZARD_DEPTH, z - HAZARD_STRIP, HAZARD_HALF_W, top, z));
  }
  const lx = LANES[last.lane];
  const ly = roofY(last);
  return {
    version: 1,
    spawn: [LANES[first.lane], roofY(first) + 0.01, first.zc],
    spawnYaw: Math.PI,
    killPlaneY: planeY(zEnd) - 40,
    solids,
    style,
    ramps: [],
    anchors,
    goal: bx(lx - H, ly, last.zc - H, lx + H, ly + GOAL_REACH, last.zc + H),
    route: [],
    lineOnly: 1,
    climb: 1,
    lines,
    tramps,
    cushions,
    hazards,
  };
}

/** One generation attempt for exactly this seed. Null when route A could not be completed. */
export function attemptStrategy(seed: number): StrategyLevel | null {
  const rng = makeRng(seed);
  const L: Layout = { houses: [], roads: [], rows: [] };
  const addHouse = (lane: number, zc: number, h: number, row: number, seg: number, role: number): number => {
    L.houses.push({ lane, zc, h, balcony: false, cushion: false, tramp: false, zipTo: NONE, row, seg, role });
    return L.houses.length - 1;
  };
  addHouse(SPAWN_LANE, 0, SPAWN_H, 0, 0, ROLE_SPAWN);
  L.rows.push({ kind: ROW_BAND, z0: -HOUSE_HALF, z1: HOUSE_HALF, houses: [0], road: -1, seg: 0 });
  let curA = 0; // where each route stands: a house, a road ref, or NONE when B is lost
  let curB = 0;
  let lostB = 0;

  for (let si = 0; si < SEGMENTS.length; si++) {
    const seg = SEGMENTS[si];
    const lastSeg = si === SEGMENTS.length - 1;
    const quota = seg.houses - (si === 0 ? 1 : 0) - (lastSeg ? 1 : 0);
    const counts = split(rng, quota, seg.perBand[0], seg.perBand[1]);
    for (let bi = 0; bi < counts.length; bi++) {
      const k = counts[bi];
      const front = seg.roadAfter && bi === counts.length - 1;
      const heights = front ? ROAD_FRONT_HEIGHTS : seg.heights;
      const prev = L.rows[L.rows.length - 1];
      const fromTower = L.rows.length === 1;
      const gap = prev.kind === ROW_ROAD ? ROAD_GAP : fromTower ? SPAWN_GAP : pick(rng, seg.gaps);
      const zc = prev.z0 - gap - HOUSE_HALF;

      // Lanes: where each route enters, an optional side-step each, then decoys alongside.
      const occ: boolean[] = [];
      for (let i = 0; i < LANES.length; i++) occ.push(false);
      const eA = curA >= 0 ? L.houses[curA].lane : randInt(rng, LANES.length);
      occ[eA] = true;
      let eB = NONE;
      if (curB !== NONE && k >= 2) {
        if (fromTower) eB = eA + (rng() < 0.5 ? -1 : 1);
        else if (curB >= 0) eB = L.houses[curB].lane;
        else {
          eB = randInt(rng, LANES.length - 1);
          if (eB >= eA) eB++;
        }
        occ[eB] = true;
      } else if (curB !== NONE) {
        curB = NONE;
        lostB++;
      }
      let n = eB === NONE ? 1 : 2;
      let sA = NONE;
      let sB = NONE;
      if (n < k && rng() < seg.shift) {
        sA = adjFree(occ, eA, rng, NONE);
        if (sA !== NONE) {
          occ[sA] = true;
          n++;
        }
      }
      if (eB !== NONE && n < k && rng() < seg.shift) {
        sB = adjFree(occ, eB, rng, sA !== NONE ? sA : eA);
        if (sB !== NONE) {
          occ[sB] = true;
          n++;
        }
      }
      while (n < k) {
        const free: number[] = [];
        for (let i = 0; i < LANES.length; i++) {
          if (!occ[i] && ((i > 0 && occ[i - 1]) || (i < LANES.length - 1 && occ[i + 1]))) free.push(i);
        }
        if (free.length === 0) break;
        occ[pick(rng, free)] = true;
        n++;
      }

      const row = L.rows.length;
      const ids: number[] = [];
      const at: number[] = [];
      for (let lane = 0; lane < LANES.length; lane++) {
        at.push(NONE);
        if (!occ[lane]) continue;
        const role = lane === eA || lane === sA ? ROLE_A : lane === eB || lane === sB ? ROLE_B : ROLE_DECOY;
        at[lane] = addHouse(lane, zc, pick(rng, heights), row, si, role);
        ids.push(at[lane]);
      }
      L.rows.push({ kind: ROW_BAND, z0: zc - HOUSE_HALF, z1: zc + HOUSE_HALF, houses: ids, road: -1, seg: si });

      if (!link(L, rng, curA, at[eA], heights, fromTower ? TOWER_MIX : seg.mix, false)) return null;
      curA = at[eA];
      if (eB !== NONE) {
        if (link(L, rng, curB, at[eB], heights, fromTower ? ZIP_ONLY : seg.mix, false)) {
          curB = at[eB];
        } else {
          L.houses[at[eB]].role = ROLE_DECOY;
          if (sB !== NONE) L.houses[at[sB]].role = ROLE_DECOY;
          sB = NONE;
          curB = NONE;
          lostB++;
        }
      }
      if (sA !== NONE) {
        if (lateral(L, rng, curA, at[sA], heights)) curA = at[sA];
        else L.houses[at[sA]].role = ROLE_DECOY;
      }
      if (sB !== NONE) {
        if (lateral(L, rng, curB, at[sB], heights)) curB = at[sB];
        else L.houses[at[sB]].role = ROLE_DECOY;
      }
      attach(L, rng, ids, heights, seg.trap);
    }
    if (seg.roadAfter) {
      const prev = L.rows[L.rows.length - 1];
      const zc = prev.z0 - ROAD_GAP - ROAD_HALF;
      const ri = L.roads.length;
      L.roads.push({ zc, tramps: [], row: L.rows.length });
      L.rows.push({ kind: ROW_ROAD, z0: zc - ROAD_HALF, z1: zc + ROAD_HALF, houses: [], road: ri, seg: si });
      if (!linkRoad(L, curA, ri)) return null;
      if (curB !== NONE && !linkRoad(L, curB, ri)) lostB++;
      curA = roadRef(ri);
      curB = roadRef(ri); // both routes meet on the road, and B starts afresh from it
    }
  }

  // Goal: one low cushion roof below route A's last house; B comes in on a line from the side.
  {
    const prev = L.rows[L.rows.length - 1];
    const zc = prev.z0 - GOAL_GAP - HOUSE_HALF;
    const lane = curA >= 0 ? L.houses[curA].lane : SPAWN_LANE;
    const g = addHouse(lane, zc, GOAL_H, L.rows.length, SEGMENTS.length - 1, ROLE_GOAL);
    L.houses[g].cushion = true;
    L.rows.push({ kind: ROW_BAND, z0: zc - HOUSE_HALF, z1: zc + HOUSE_HALF, houses: [g], road: -1, seg: SEGMENTS.length - 1 });
    if (!link(L, rng, curA, g, [], GOAL_MIX, true)) return null;
    if (curB !== NONE && !link(L, rng, curB, g, [], ZIP_ONLY, true)) lostB++;
  }

  // Decoys get their own cushions, balconies, pads and lines: some rescue, some mislead.
  for (let i = 0; i < L.houses.length; i++) {
    const h = L.houses[i];
    if (h.role !== ROLE_DECOY) continue;
    const deco = SEGMENTS[h.seg].deco;
    if (rng() < deco[0]) h.cushion = true;
    if (rng() < deco[1]) h.balcony = true;
    if (rng() < deco[2]) h.tramp = true;
    if (rng() < deco[3]) decoZip(L, rng, i);
  }

  // Too many dead ends: open some, one at a time, until the count is in range.
  let m = measure(L);
  let repairs = 0;
  const tried: boolean[] = [];
  for (let guard = 0; guard < REPAIR_MAX && m.deadRoofs.length > DEAD_MAX; guard++) {
    const open: number[] = [];
    for (let i = 0; i < m.deadRoofs.length; i++) if (!tried[m.deadRoofs[i]]) open.push(m.deadRoofs[i]);
    if (open.length === 0) break;
    const d = pick(rng, open);
    tried[d] = true;
    if (openDead(L, rng, d, m)) {
      repairs++;
      m = measure(L);
    }
  }

  const moves: number[] = [];
  for (let i = 0; i < MOVE_NAMES.length; i++) moves.push(0);
  for (let i = 0; i < m.graph.edges.length; i++) moves[m.graph.edges[i].move]++;
  let zips = 0;
  let tramps = 0;
  let cushions = 0;
  let balconies = 0;
  for (let i = 0; i < L.houses.length; i++) {
    const h = L.houses[i];
    if (h.zipTo !== NONE) zips++;
    if (h.tramp) tramps++;
    if (h.cushion) cushions++;
    if (h.balcony) balconies++;
  }
  for (let i = 0; i < L.roads.length; i++) tramps += L.roads[i].tramps.length;
  const zMin = L.rows[L.rows.length - 1].z0 - HAZARD_PAST;
  const summary: StrategySummary = {
    seed,
    houses: L.houses.length,
    roads: L.roads.length,
    rows: L.rows.length,
    nodes: m.graph.n,
    edges: m.graph.edges.length,
    moves,
    deadRoofs: m.deadRoofs.length,
    unreachedRoofs: m.unreached,
    escapePaths: m.stats.escapePaths,
    lostB,
    repairs,
    zips,
    tramps,
    cushions,
    balconies,
    zMin,
    length: L.rows[0].z1 - zMin,
  };
  return { level: layoutToLevel(L), layout: L, nodes: m.nb.nodes, graph: m.graph, stats: m.stats, summary, seed };
}

function deadInRange(s: StrategyLevel): boolean {
  return s.summary.deadRoofs >= DEAD_MIN && s.summary.deadRoofs <= DEAD_MAX;
}

/** The level a seed must reach: goal reachable, two disjoint routes, dead ends in range. */
export function levelValid(s: StrategyLevel): boolean {
  return (
    s.stats.goalReached &&
    s.summary.houses === HOUSE_COUNT &&
    s.stats.escapePaths >= MIN_ESCAPES &&
    s.summary.unreachedRoofs <= UNREACHED_MAX &&
    deadInRange(s)
  );
}

let cached: StrategyLevel | null = null;
let cachedFor = -1;

/** The level for a seed: the first seed from it (seed, seed+1, ...) that validates. */
export function buildStrategy(seed: number = STRATEGY_SEED): StrategyLevel {
  if (cached !== null && cachedFor === seed) return cached;
  let fallback: StrategyLevel | null = null;
  let found: StrategyLevel | null = null;
  for (let t = 0; t < MAX_SEED_TRIES && found === null; t++) {
    const s = attemptStrategy((seed + t) >>> 0);
    if (s === null) continue;
    if (levelValid(s)) found = s;
    else if (fallback === null && s.stats.goalReached && deadInRange(s)) fallback = s; // one route only
  }
  if (found === null) found = fallback;
  if (found === null) throw new Error('strategy: no valid level within ' + MAX_SEED_TRIES + ' seeds of ' + seed);
  cached = found;
  cachedFor = seed;
  return found;
}

export function generateStrategyLevel(seed: number = STRATEGY_SEED): LevelJson {
  return buildStrategy(seed).level;
}
