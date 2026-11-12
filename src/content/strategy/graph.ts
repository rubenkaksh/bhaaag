// Strategy maze graph (ADR 0011 / 0012, track S1): platforms are nodes, moves are edges derived
// from closed-form kinematics of the sim rules (jump/drop, trampoline bounce, fixed zipline,
// ledge grab + mantle, balcony climb). Every reach limit comes from the tuning config; the few
// constants below are geometry of the pads and margins of the model, not sim rules.
// The model is conservative on purpose (margins, no air control, drag included): an edge here
// is a move the real sim allows. Pure TS, no three/DOM.
import { DEFAULT_TUNING } from '../../core/config';

export const NODE_ROOF = 0;
export const NODE_BALCONY = 1;
export const NODE_ROAD = 2;

export const MOVE_JUMP = 0; // run-jump, run-off or walk-off onto a lower or level platform
export const MOVE_TRAMP = 1; // hop onto a tramp pad at the departure edge, bounce to the target
export const MOVE_ZIP = 2; // fixed line from a zone on the departure edge to an anchor over the target
export const MOVE_CLIMB = 3; // balcony -> own roof: jump against the wall, grab, hold CLIMB
export const MOVE_GRAB = 4; // jump (or bounce) to the target's wall, grab its ledge, mantle
// Lip landing: the arc clears the far lip without the comfort margin. The sim allows it, so it
// counts when deciding what is a dead end, but the generator never builds a route on it.
export const MOVE_TIGHT = 5;
export const MOVE_NAMES: readonly string[] = ['jump', 'tramp', 'zip', 'climb', 'grab', 'tight'];

export interface MazeNode {
  id: number;
  kind: number; // NODE_*
  house: number; // owning house index (-1 for roads)
  x0: number;
  x1: number;
  z0: number; // downhill edge (smaller z)
  z1: number; // uphill edge
  y: number; // standing surface height
  cushion: boolean; // whole surface is a cushion: any fall is safe
  tramps: number[]; // x centres of tramp pads on the downhill edge strip
  zipTo: number; // node id the zone on the downhill edge lines to, or -1
  zipX: number; // x centre of that zone
  up: number; // balcony only: node id of the roof it climbs to, else -1
  balc: number; // roof only: node id of its balcony (on the uphill face), else -1
}

export interface MazeEdge {
  from: number;
  to: number;
  move: number; // MOVE_*
}

/** The level as a plain directed graph: what `hasEscape` and the tests look at. */
export interface MazeGraph {
  n: number; // node count; node ids are 0..n-1
  edges: MazeEdge[];
  start: number;
  goal: number;
}

// Pad and anchor geometry shared with the generator (metres).
export const PAD_DEPTH = 3; // tramp pad and zip zone strip depth along z
export const PAD_HALF = 1.5; // half width of a pad or zone along x
export const ANCHOR_UP = 2.6; // anchor height over the target surface (feet hang 0.6 m up)
export const ANCHOR_IN = 2.5; // anchor this far inside the target's uphill edge
export const ANCHOR_SIDE = 2; // and at least this far inside its side edges
export const TRAMP_APPROACH = 0.9; // share of run speed kept through the hop onto the pad
// Model margins.
const LAND_MARGIN = 0.3; // extra reach required past the far lip plus two radii
const VLAND_MARGIN = 0.4; // landing speed stays this far inside landing.vyRoll (one tick of g and change)
const CROSS_MIN = 1.2; // platforms must overlap at least this much across the move axis
const STEP_MAX = 0.3; // a jump target may be at most this much higher than the platform
const PAD_SLACK = 0.5; // a pad may overhang the target's lane by this much
const GRAB_MARGIN = 0.15; // the ledge must be this far inside climb.reachMax
const GRAB_VY_MARGIN = 1.5; // falling speed at the wall stays this far inside climb.vyMax
const CHORD_STEP = 0.5; // zip clearance sampling step
const CHORD_CLEAR = 0.3; // zip rider clearance around other platforms (plus the radius)

const T = DEFAULT_TUNING;
const G = T.physics.g;
const DRAG = T.physics.airDrag;
const R = T.hero.radius;

export interface Flight {
  dist: number; // horizontal distance travelled when the feet reach dy
  vLand: number; // downward speed at that moment
}

/** Horizontal reach of a launch (vy0 up, vh forward) until the feet are dy above the launch. */
export function flight(vy0: number, vh: number, dy: number): Flight | null {
  const disc = vy0 * vy0 - 2 * G * dy;
  if (disc < 0) return null;
  const t = (vy0 + Math.sqrt(disc)) / G;
  // Horizontal speed decays by (1 - DRAG*dt) per tick ~ exp(-DRAG t).
  const dist = (vh * (1 - Math.exp(-DRAG * t))) / DRAG;
  return { dist, vLand: Math.sqrt(disc) };
}

function overlap(a0: number, a1: number, b0: number, b1: number): number {
  return Math.min(a1, b1) - Math.max(a0, b0);
}

// Relative placement of B seen from A: the move axis gap and whether lanes overlap.
export interface Rel {
  gap: number; // open space between the facing lips along the move axis
  downhill: boolean; // B lies at smaller z (the only direction with pads and zones)
  lateral: boolean;
}

export function relation(a: MazeNode, b: MazeNode): Rel | null {
  if (b.z1 <= a.z0 && overlap(a.x0, a.x1, b.x0, b.x1) >= CROSS_MIN) {
    return { gap: a.z0 - b.z1, downhill: true, lateral: false };
  }
  if (b.z0 >= a.z1 && overlap(a.x0, a.x1, b.x0, b.x1) >= CROSS_MIN) {
    return { gap: b.z0 - a.z1, downhill: false, lateral: false };
  }
  if (overlap(a.z0, a.z1, b.z0, b.z1) >= CROSS_MIN) {
    if (b.x0 >= a.x1) return { gap: b.x0 - a.x1, downhill: false, lateral: true };
    if (b.x1 <= a.x0) return { gap: a.x0 - b.x1, downhill: false, lateral: true };
  }
  return null;
}

const LAUNCHES: ReadonlyArray<readonly [number, number]> = [
  [0, T.hero.walk], // walk off: gentlest landing
  [0, T.hero.run], // run off
  [T.hero.jump, T.hero.run], // run-jump: longest
];

/** Jump/drop edge A -> B: the gentlest launch that makes the distance decides lethality. */
export function jumpOk(a: MazeNode, b: MazeNode, rel: Rel): boolean {
  const dy = b.y - a.y;
  if (dy > STEP_MAX) return false;
  const need = rel.gap + 2 * R + LAND_MARGIN;
  for (let i = 0; i < LAUNCHES.length; i++) {
    const f = flight(LAUNCHES[i][0], LAUNCHES[i][1], dy);
    if (f === null || f.dist < need) continue;
    return b.cushion || f.vLand <= T.landing.vyRoll - VLAND_MARGIN;
  }
  return false;
}

function padAligned(a: MazeNode, b: MazeNode): boolean {
  for (let i = 0; i < a.tramps.length; i++) {
    const x = a.tramps[i];
    if (x - PAD_HALF >= b.x0 - PAD_SLACK && x + PAD_HALF <= b.x1 + PAD_SLACK) return true;
  }
  return false;
}

/** Tramp edge A -> B: a pad on A's downhill edge aligned with B, bounce at tramp.vUp. */
export function trampOk(a: MazeNode, b: MazeNode, rel: Rel): boolean {
  if (!rel.downhill || !padAligned(a, b)) return false;
  const dy = b.y - a.y;
  const vy = T.tramp.vUp;
  const apex = (vy * vy) / (2 * G);
  if (dy > apex - STEP_MAX) return false;
  const f = flight(vy, T.hero.run * TRAMP_APPROACH, dy);
  if (f === null) return false;
  // Launch from the pad centre, PAD_DEPTH/2 inside the lip; do not fly past the far lip either
  // (a balcony has its house wall as a backstop).
  const lip = rel.gap + PAD_DEPTH / 2;
  if (f.dist < lip + R + LAND_MARGIN) return false;
  if (b.kind !== NODE_BALCONY && f.dist > lip + (b.z1 - b.z0) - R) return false;
  return b.cushion || f.vLand <= T.landing.vyRoll - VLAND_MARGIN;
}

// State of a launch (vy0, vh) after d metres of horizontal travel: feet height over the launch
// and vertical speed. Null when drag stops it short.
function atDistance(vy0: number, vh: number, d: number): [number, number] | null {
  const x = (Math.max(0, d) * DRAG) / vh;
  if (x >= 1) return null;
  const t = -Math.log(1 - x) / DRAG;
  return [vy0 * t - 0.5 * G * t * t, vy0 - G * t];
}

// A launch that travels d to the target's wall: is its ledge then in grab reach? `top` is the
// ledge height over the feet at the wall. The hero slides down the wall into the grab window,
// which needs a falling speed inside climb.vyMax (the sim refuses the grab above it).
function grabFrom(vy0: number, vh: number, d: number, dy: number): boolean {
  const s = atDistance(vy0, vh, d);
  if (s === null) return false;
  const top = dy - s[0];
  if (top <= 0 || top > T.climb.reachMax - GRAB_MARGIN) return false;
  return s[1] >= -(T.climb.vyMax - GRAB_VY_MARGIN);
}

// A launch whose arc is over the far lip when the hero's centre gets there (lip = distance from
// the launch point to the lip), lands on the platform and survives it.
function lipFrom(vy0: number, vh: number, lip: number, b: MazeNode, dy: number): boolean {
  const f = flight(vy0, vh, dy);
  if (f === null || f.dist < lip) return false;
  const s = atDistance(vy0, vh, lip - R);
  if (s === null || s[0] < dy) return false;
  if (b.kind !== NODE_BALCONY && f.dist > lip + (b.z1 - b.z0) - R) return false;
  return b.cushion || f.vLand <= T.landing.vyRoll; // the sim's own limit: no comfort margin here
}

/** Tight edge A -> B: a lip landing the sim allows but the comfort margins of jumpOk/trampOk refuse. */
export function tightOk(a: MazeNode, b: MazeNode, rel: Rel): boolean {
  const dy = b.y - a.y;
  for (let i = 0; i < LAUNCHES.length; i++) {
    if (lipFrom(LAUNCHES[i][0], LAUNCHES[i][1], rel.gap, b, dy)) return true;
  }
  if (rel.downhill && padAligned(a, b)) {
    return lipFrom(T.tramp.vUp, T.hero.run * TRAMP_APPROACH, rel.gap + PAD_DEPTH / 2, b, dy);
  }
  return false;
}

/** Grab edge A -> B: reach B's wall with its ledge in climb reach, then mantle (ADR 0011). */
export function grabOk(a: MazeNode, b: MazeNode, rel: Rel): boolean {
  // A balcony covers its roof's uphill face: from uphill you meet the balcony, not the roof wall.
  if (b.kind === NODE_ROOF && b.balc >= 0 && rel.downhill) return false;
  const dy = b.y - a.y;
  if (grabFrom(T.hero.jump, T.hero.run, rel.gap - R, dy)) return true;
  if (rel.downhill && padAligned(a, b)) {
    return grabFrom(T.tramp.vUp, T.hero.run * TRAMP_APPROACH, rel.gap + PAD_DEPTH / 2 - R, dy);
  }
  return false;
}

/** Zone centre on A's downhill edge (feet), as the generator places it. */
export function zoneCentre(a: MazeNode): [number, number, number] {
  return [a.zipX, a.y, a.z0 + PAD_DEPTH / 2];
}

/** Anchor over B for the line from A: straight down the hill from the zone where B allows. */
export function anchorPos(a: MazeNode, b: MazeNode): [number, number, number] {
  const lo = b.x0 + ANCHOR_SIDE;
  const hi = b.x1 - ANCHOR_SIDE;
  const x = Math.min(hi, Math.max(lo, a.zipX));
  return [x, b.y + ANCHOR_UP, b.z1 - ANCHOR_IN];
}

/** Zip edge A -> B: rope limits from the config, and the rider's path clears every other platform. */
export function zipOk(a: MazeNode, b: MazeNode, nodes: MazeNode[]): boolean {
  if (a.zipTo !== b.id || b.z1 > a.z0) return false;
  if (b.z1 - b.z0 < ANCHOR_IN + R) return false;
  const zc = zoneCentre(a);
  const an = anchorPos(a, b);
  const dx = an[0] - zc[0];
  const dz = an[2] - zc[2];
  const horiz = Math.sqrt(dx * dx + dz * dz);
  const drop = zc[1] + T.rope.handToFeet - an[1];
  if (drop <= 0) return false;
  const slope = (Math.atan2(drop, horiz) * 180) / Math.PI;
  if (slope < T.rope.minSlopeDeg || slope > T.rope.maxSlopeDeg) return false;
  const len = Math.sqrt(horiz * horiz + drop * drop);
  if (len < T.rope.minLen || len > T.rope.maxLen) return false;
  // Feet path: the chord lowered by handToFeet. Houses are solid down to the ground, so a
  // sample is blocked when it is inside a platform's footprint and not clearly above it.
  const steps = Math.ceil(len / CHORD_STEP);
  const pad = R + CHORD_CLEAR;
  for (let s = 1; s < steps; s++) {
    const k = s / steps;
    const px = zc[0] + dx * k;
    const pz = zc[2] + dz * k;
    const py = zc[1] - drop * k;
    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i];
      if (n.id === a.id || n.id === b.id) continue;
      if (px < n.x0 - pad || px > n.x1 + pad || pz < n.z0 - pad || pz > n.z1 + pad) continue;
      if (py < n.y + CHORD_CLEAR) return false;
    }
  }
  return true;
}

/** The move that takes A to B, or -1. One edge per ordered pair; plain moves win over features. */
export function moveOf(a: MazeNode, b: MazeNode, nodes: MazeNode[]): number {
  if (a.id === b.id) return -1;
  if (a.kind === NODE_BALCONY && a.up === b.id) return MOVE_CLIMB;
  const rel = relation(a, b);
  // A balcony hangs on the uphill face: its own house blocks every downhill move off it.
  if (rel !== null && !(a.kind === NODE_BALCONY && rel.downhill)) {
    if (jumpOk(a, b, rel)) return MOVE_JUMP;
    if (trampOk(a, b, rel)) return MOVE_TRAMP;
    if (grabOk(a, b, rel)) return MOVE_GRAB;
  }
  if (zipOk(a, b, nodes)) return MOVE_ZIP;
  if (rel !== null && !(a.kind === NODE_BALCONY && rel.downhill) && tightOk(a, b, rel)) return MOVE_TIGHT;
  return -1;
}

/** All edges of a node set, recomputed from geometry. */
export function buildEdges(nodes: MazeNode[]): MazeEdge[] {
  const edges: MazeEdge[] = [];
  for (let i = 0; i < nodes.length; i++) {
    for (let j = 0; j < nodes.length; j++) {
      const move = moveOf(nodes[i], nodes[j], nodes);
      if (move >= 0) edges.push({ from: nodes[i].id, to: nodes[j].id, move });
    }
  }
  return edges;
}

function adjacency(g: MazeGraph, reverse: boolean): number[][] {
  const adj: number[][] = [];
  for (let i = 0; i < g.n; i++) adj.push([]);
  for (let i = 0; i < g.edges.length; i++) {
    const e = g.edges[i];
    if (reverse) adj[e.to].push(e.from);
    else adj[e.from].push(e.to);
  }
  return adj;
}

function bfs(n: number, adj: number[][], from: number): boolean[] {
  const seen: boolean[] = new Array<boolean>(n).fill(false);
  const q: number[] = [from];
  seen[from] = true;
  for (let h = 0; h < q.length; h++) {
    const nb = adj[q[h]];
    for (let k = 0; k < nb.length; k++) {
      const v = nb[k];
      if (!seen[v]) {
        seen[v] = true;
        q.push(v);
      }
    }
  }
  return seen;
}

/** Pure BFS: can the goal be reached from the start at all? */
export function hasEscape(g: MazeGraph): boolean {
  if (g.start < 0 || g.goal < 0 || g.start >= g.n || g.goal >= g.n) return false;
  return bfs(g.n, adjacency(g, false), g.start)[g.goal];
}

/** Number of edge-disjoint start -> goal paths (unit-capacity max flow), counted up to cap. */
export function escapePaths(g: MazeGraph, cap: number = 8): number {
  const n = g.n;
  if (g.start === g.goal || !hasEscape(g)) return 0;
  const c = new Int8Array(n * n);
  for (let i = 0; i < g.edges.length; i++) {
    const e = g.edges[i];
    if (e.from !== e.to) c[e.from * n + e.to] = 1;
  }
  const prev = new Int32Array(n);
  let flow = 0;
  while (flow < cap) {
    prev.fill(-1);
    prev[g.start] = g.start;
    const q: number[] = [g.start];
    for (let h = 0; h < q.length && prev[g.goal] < 0; h++) {
      const u = q[h];
      for (let v = 0; v < n; v++) {
        if (prev[v] < 0 && c[u * n + v] > 0) {
          prev[v] = u;
          q.push(v);
        }
      }
    }
    if (prev[g.goal] < 0) break;
    for (let v = g.goal; v !== g.start; v = prev[v]) {
      const u = prev[v];
      c[u * n + v]--;
      c[v * n + u]++;
    }
    flow++;
  }
  return flow;
}

export interface MazeStats {
  reach: boolean[]; // reachable from start
  canFinish: boolean[]; // goal reachable from here
  deadEnds: number[]; // reachable, goal unreachable
  escapePaths: number; // edge-disjoint start -> goal paths
  goalReached: boolean;
}

export function analyze(g: MazeGraph): MazeStats {
  const reach = bfs(g.n, adjacency(g, false), g.start);
  const canFinish = bfs(g.n, adjacency(g, true), g.goal);
  const deadEnds: number[] = [];
  for (let i = 0; i < g.n; i++) if (reach[i] && !canFinish[i]) deadEnds.push(i);
  return { reach, canFinish, deadEnds, escapePaths: escapePaths(g), goalReached: reach[g.goal] };
}
