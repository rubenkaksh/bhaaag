// Builder level -> MazeNodes -> validation report and ordinary LevelJson (ADR 0014).
// Edge legality comes from the strategy graph model (graph.ts, tuning-driven); nothing here edits it.
import type { LevelJson } from '../load';
import { planeY } from '../strategy/gen';
import type { MazeEdge, MazeGraph, MazeNode } from '../strategy/graph';
import {
  MOVE_CLIMB,
  NODE_BALCONY,
  NODE_ROOF,
  PAD_DEPTH,
  PAD_HALF,
  analyze,
  anchorPos,
  buildEdges,
  grabOk,
  jumpOk,
  moveOf,
  relation,
  tightOk,
  trampOk,
  zipOk,
  zoneCentre,
} from '../strategy/graph';
import type { BuilderEdge, BuilderHouse, BuilderLevel, GapVia } from './format';
import { HOUSE_HALF, STOREY_HEIGHT, TOUCH_EPS } from './format';
import { addEdge, houseById, overlaps } from './model';

// Geometry shared with the generator's emitter (kept numerically identical, gen.ts is frozen).
const ZONE_OFF = 2; // zip zone centre, left of the house centre
const PAD_OFF = 2; // tramp pad centre, right of the house centre
const BALCONY_DEPTH = 2;
const BALCONY_DROP = 2;
const SLAB = 0.3;
const FOOT = 6;
const THIN = 0.02;
const ZONE_THICK = 0.05;
const HAZARD_STRIP = 4;
const HAZARD_DEPTH = 6;
const HAZARD_LIP = 0.2;
const HAZARD_PAST = 8;
const HAZARD_MARGIN = 36; // lethal ground past the outer houses sideways
const GOAL_REACH = 3;

// Steps in a gap: rise per step and tread length per step (boxes are hop-sized, stairs walk-sized).
const STEP_RISE = { boxes: 0.9, stairs: 0.5 };
const STEP_TREAD = { boxes: 1.2, stairs: 0.8 };
const STEP_GAP_MAX = 12;
const STEP_DY_MAX = 4.5;
const STEP_WIDTH = 4;

export function roofHeight(h: BuilderHouse): number {
  return planeY(h.z) + STOREY_HEIGHT[h.storeys - 1] + h.lift;
}

export interface NodeSet {
  nodes: MazeNode[];
  roofOf: Map<number, number>; // house id -> node id
  houseIds: number[]; // house id by index
}

export function buildNodeSet(l: BuilderLevel): NodeSet {
  const nodes: MazeNode[] = [];
  const roofOf = new Map<number, number>();
  const cushion = new Set<number>([l.goal]);
  const tramp = new Set<number>();
  for (const e of l.edges) {
    if (e.via === 'cushion') cushion.add(e.b);
    if (e.via === 'tramp') tramp.add(e.a);
  }
  for (const h of l.houses) {
    roofOf.set(h.id, nodes.length);
    nodes.push({
      id: nodes.length,
      kind: NODE_ROOF,
      house: h.id,
      x0: h.x - HOUSE_HALF,
      x1: h.x + HOUSE_HALF,
      z0: h.z - HOUSE_HALF,
      z1: h.z + HOUSE_HALF,
      y: roofHeight(h),
      cushion: cushion.has(h.id),
      tramps: tramp.has(h.id) ? [h.x + PAD_OFF] : [],
      zipTo: -1,
      zipX: h.x - ZONE_OFF,
      up: -1,
      balc: -1,
    });
  }
  for (const h of l.houses) {
    if (!h.balcony) continue;
    const roof = nodes[roofOf.get(h.id) as number];
    roof.balc = nodes.length;
    nodes.push({
      id: nodes.length,
      kind: NODE_BALCONY,
      house: h.id,
      x0: roof.x0,
      x1: roof.x1,
      z0: roof.z1,
      z1: roof.z1 + BALCONY_DEPTH,
      y: roof.y - BALCONY_DROP,
      cushion: false,
      tramps: [],
      zipTo: -1,
      zipX: roof.zipX,
      up: roof.id,
      balc: -1,
    });
  }
  for (const e of l.edges) {
    if (e.kind === 'zip') nodes[roofOf.get(e.a) as number].zipTo = roofOf.get(e.b) as number;
  }
  return { nodes, roofOf, houseIds: l.houses.map((h) => h.id) };
}

export interface EdgeCheck {
  edgeId: number;
  ok: boolean;
  note: string;
}

/** One finding, with where it is (house and edge ids) and what to do about it, in plain words. */
export interface Problem {
  level: 'error' | 'warn';
  key: string; // stable id of the cause (kind + houses/edge), so edits can tell new problems from old
  text: string;
  fix: string;
  houses: number[];
  edges: number[];
}

export interface Report {
  ok: boolean; // no errors (warnings allowed)
  errors: string[];
  warnings: string[];
  problems: Problem[];
  edgeChecks: EdgeCheck[];
  touching: [number, number][]; // house id pairs whose footprints touch
  declaredReach: boolean; // start -> goal over valid declared edges + touching houses
  checked: boolean; // false when validate stopped at the basic errors (links and routes not examined)
  derivedReach: boolean; // start -> goal over every move the model allows
  deadEnds: number[]; // house ids reachable from start with no way to the goal
  unreached: number[]; // house ids start cannot reach at all
  escapePaths: number; // edge-disjoint start -> goal routes on the derived graph
}

function stepCount(via: 'boxes' | 'stairs', dy: number): number {
  return dy <= 0.3 ? 1 : Math.ceil(dy / STEP_RISE[via]);
}

function stepsCheck(a: MazeNode, b: MazeNode, via: 'boxes' | 'stairs'): string | null {
  const rel = relation(a, b);
  if (rel === null) return 'houses do not face each other (need lateral overlap)';
  if (rel.gap <= TOUCH_EPS) return 'houses already touch: no ' + via + ' needed';
  const dy = Math.abs(b.y - a.y);
  if (dy > STEP_DY_MAX)
    return 'height difference ' + dy.toFixed(1) + ' m is over ' + STEP_DY_MAX + ' m';
  if (rel.gap > STEP_GAP_MAX)
    return 'gap ' + rel.gap.toFixed(1) + ' m is over ' + STEP_GAP_MAX + ' m';
  const need = stepCount(via, dy) * STEP_TREAD[via];
  if (rel.gap < need)
    return (
      'gap ' +
      rel.gap.toFixed(1) +
      ' m is too short for ' +
      stepCount(via, dy) +
      ' ' +
      via +
      ' (need ' +
      need.toFixed(1) +
      ' m)'
    );
  return null;
}

function gapNote(a: MazeNode, b: MazeNode, why: string): string {
  const rel = relation(a, b);
  const gap =
    rel === null
      ? 'no shared lane'
      : 'gap ' + rel.gap.toFixed(1) + ' m, drop ' + (a.y - b.y).toFixed(1) + ' m';
  return why + ' (' + gap + ')';
}

const VIA_NAME: Record<string, string> = {
  zip: 'Zipline',
  jump: 'Jump',
  tramp: 'Trampoline',
  cushion: 'Cushion drop',
  boxes: 'Box steps',
  stairs: 'Stairs',
};
export const viaName = (k: string): string => VIA_NAME[k] ?? k;

function edgeFix(e: BuilderEdge): string {
  if (e.kind === 'zip')
    return 'Move the houses closer, make the start roof higher, or pick another link type.';
  const via = e.via ?? 'jump';
  if (via === 'boxes' || via === 'stairs')
    return 'Steps need houses that face each other with a short, low gap. Move them, or use a zipline or jump.';
  return 'Move the houses closer or lower the drop, or switch to a zipline, trampoline or cushion.';
}

function checkEdge(e: BuilderEdge, ns: NodeSet): EdgeCheck {
  const a = ns.nodes[ns.roofOf.get(e.a) as number];
  const b = ns.nodes[ns.roofOf.get(e.b) as number];
  const rel = relation(a, b);
  const res = (ok: boolean, note: string): EdgeCheck => ({ edgeId: e.id, ok, note });
  if (e.kind === 'zip') {
    return zipOk(a, b, ns.nodes)
      ? res(true, 'zipline ok')
      : res(false, gapNote(a, b, 'rope limits, slope or clearance fail'));
  }
  const via = e.via ?? 'jump';
  if (via === 'boxes' || via === 'stairs') {
    const why = stepsCheck(a, b, via);
    return why === null ? res(true, via + ' ok') : res(false, why);
  }
  if (rel === null) return res(false, 'houses do not face each other (need lateral overlap)');
  if (via === 'tramp') {
    if (trampOk(a, b, rel) || grabOk(a, b, rel)) return res(true, 'tramp bounce ok');
    return res(false, gapNote(a, b, 'tramp bounce does not reach (pad is on the downhill edge)'));
  }
  // jump and cushion: the cushion is already on the target node.
  if (jumpOk(a, b, rel)) return res(true, via === 'cushion' ? 'cushion landing ok' : 'jump ok');
  if (grabOk(a, b, rel)) return res(true, 'ledge grab ok');
  if (tightOk(a, b, rel)) return res(true, 'tight lip landing (sim allows it)');
  return res(
    false,
    gapNote(a, b, via === 'cushion' ? 'cushion landing out of reach' : 'jump out of reach'),
  );
}

function reach(n: number, edges: MazeEdge[], from: number): boolean[] {
  const seen: boolean[] = new Array<boolean>(n).fill(false);
  seen[from] = true;
  const q = [from];
  for (let h = 0; h < q.length; h++) {
    for (const e of edges) {
      if (e.from === q[h] && !seen[e.to]) {
        seen[e.to] = true;
        q.push(e.to);
      }
    }
  }
  return seen;
}

export function validate(l: BuilderLevel): Report {
  const r: Report = {
    ok: true,
    errors: [],
    warnings: [],
    problems: [],
    edgeChecks: [],
    touching: [],
    declaredReach: false,
    checked: false,
    derivedReach: false,
    deadEnds: [],
    unreached: [],
    escapePaths: 0,
  };
  const add = (
    level: 'error' | 'warn',
    key: string,
    tech: string,
    text: string,
    fix: string,
    houses: number[] = [],
    edges: number[] = [],
  ): void => {
    (level === 'error' ? r.errors : r.warnings).push(tech);
    r.problems.push({ level, key, text, fix, houses, edges });
  };
  for (let i = 0; i < l.houses.length; i++) {
    for (let j = i + 1; j < l.houses.length; j++) {
      const a = l.houses[i].id;
      const b = l.houses[j].id;
      if (overlaps(l.houses[i], l.houses[j]))
        add(
          'error',
          'overlap:' + a + ':' + b,
          'houses ' + a + ' and ' + b + ' overlap',
          'House ' + a + ' and house ' + b + ' overlap.',
          'Drag one of them apart (touching is fine, overlapping is not).',
          [a, b],
        );
    }
  }
  for (const h of l.houses) {
    if (!h.balcony) continue;
    // Balcony slab sits on the +z side, 2 m deep, full house width.
    const hit = l.houses.find(
      (o) =>
        o.id !== h.id &&
        Math.abs(o.x - h.x) < 2 * HOUSE_HALF &&
        o.z - HOUSE_HALF < h.z + HOUSE_HALF + BALCONY_DEPTH &&
        o.z + HOUSE_HALF > h.z + HOUSE_HALF,
    );
    if (hit !== undefined)
      add(
        'error',
        'balcony:' + h.id,
        'house ' + h.id + ' balcony runs into house ' + hit.id + ' (move it or drop the balcony)',
        'House ' + h.id + "'s balcony runs into house " + hit.id + '.',
        'Move house ' + hit.id + ' away, or untick the balcony on house ' + h.id + '.',
        [h.id, hit.id],
      );
  }
  for (const e of l.edges) {
    if (e.kind !== 'gap' || (e.via !== 'boxes' && e.via !== 'stairs')) continue;
    const ha = houseById(l, e.a);
    const hb = houseById(l, e.b);
    if (ha === undefined || hb === undefined) continue;
    // Steps fill the strip between the two houses; no third house may stand in it.
    const x0 = Math.min(ha.x, hb.x) - HOUSE_HALF;
    const x1 = Math.max(ha.x, hb.x) + HOUSE_HALF;
    const z0 = Math.min(ha.z, hb.z) - HOUSE_HALF;
    const z1 = Math.max(ha.z, hb.z) + HOUSE_HALF;
    const third = l.houses.find(
      (o) =>
        o.id !== ha.id &&
        o.id !== hb.id &&
        o.x + HOUSE_HALF > x0 &&
        o.x - HOUSE_HALF < x1 &&
        o.z + HOUSE_HALF > z0 &&
        o.z - HOUSE_HALF < z1,
    );
    if (third !== undefined)
      add(
        'error',
        'steps:' + e.id,
        'edge ' +
          e.a +
          ' -> ' +
          e.b +
          ' (' +
          e.via +
          '): house ' +
          third.id +
          ' stands in the steps',
        viaName(e.via ?? '') +
          ' from house ' +
          e.a +
          ' to ' +
          e.b +
          ' are blocked by house ' +
          third.id +
          '.',
        'Move house ' + third.id + ' out of the strip between them, or remove these steps.',
        [e.a, e.b, third.id],
        [e.id],
      );
  }
  if (l.houses.length < 2)
    add(
      'error',
      'few',
      'need at least 2 houses',
      'A level needs at least 2 houses.',
      'Pick Add house and click the canvas.',
    );
  if (l.start === -1)
    add(
      'error',
      'nostart',
      'no start house',
      'No start house is set.',
      'Click a house, then press Set start.',
    );
  if (l.goal === -1)
    add(
      'error',
      'nogoal',
      'no goal house',
      'No goal house is set.',
      'Click a house, then press Set goal.',
    );
  if (l.start !== -1 && l.start === l.goal)
    add(
      'error',
      'samesg',
      'start and goal are the same house',
      'Start and goal are the same house.',
      'Choose a different house for the goal.',
      [l.start],
    );
  if (r.errors.length > 0) {
    r.ok = false;
    return r;
  }
  r.checked = true;
  const ns = buildNodeSet(l);
  const roofs = l.houses.map((h) => ns.nodes[ns.roofOf.get(h.id) as number]);
  const declared: MazeEdge[] = [];
  const derivedExtra: MazeEdge[] = [];
  for (const e of l.edges) {
    const c = checkEdge(e, ns);
    r.edgeChecks.push(c);
    if (!c.ok) {
      add(
        'error',
        'edge:' + e.id,
        'edge ' + e.a + ' -> ' + e.b + ' (' + (e.via ?? 'zip') + '): ' + c.note,
        viaName(e.kind === 'zip' ? 'zip' : (e.via ?? 'jump')) +
          ' from house ' +
          e.a +
          ' to ' +
          e.b +
          " doesn't work: " +
          c.note +
          '.',
        edgeFix(e),
        [e.a, e.b],
        [e.id],
      );
      continue;
    }
    const from = ns.roofOf.get(e.a) as number;
    const to = ns.roofOf.get(e.b) as number;
    declared.push({ from, to, move: 0 });
    if (e.via === 'boxes' || e.via === 'stairs') declared.push({ from: to, to: from, move: 0 });
  }
  // Touching houses are adjoining: walk or hop over wherever the model allows it.
  for (let i = 0; i < roofs.length; i++) {
    for (let j = i + 1; j < roofs.length; j++) {
      const rel = relation(roofs[i], roofs[j]);
      if (rel === null || rel.gap > TOUCH_EPS) continue;
      r.touching.push([l.houses[i].id, l.houses[j].id]);
      for (const [p, q] of [
        [roofs[i], roofs[j]],
        [roofs[j], roofs[i]],
      ]) {
        if (moveOf(p, q, ns.nodes) >= 0) declared.push({ from: p.id, to: q.id, move: 0 });
      }
    }
  }
  for (const n of ns.nodes)
    if (n.kind === NODE_BALCONY) declared.push({ from: n.id, to: n.up, move: MOVE_CLIMB });
  // Derived: every move the model allows (shortcuts and dead ends show up here), plus valid steps.
  const derived = buildEdges(ns.nodes);
  for (const d of declared)
    if (!derived.some((x) => x.from === d.from && x.to === d.to)) derivedExtra.push(d);
  const start = ns.roofOf.get(l.start) as number;
  const goal = ns.roofOf.get(l.goal) as number;
  const n = ns.nodes.length;
  r.declaredReach = reach(n, declared, start)[goal];
  const g: MazeGraph = { n, edges: [...derived, ...derivedExtra], start, goal };
  const stats = analyze(g);
  r.derivedReach = stats.goalReached;
  r.escapePaths = stats.escapePaths;
  const houseOf = (nodeId: number): number => ns.nodes[nodeId].house;
  r.deadEnds = stats.deadEnds.filter((i) => ns.nodes[i].kind === NODE_ROOF).map(houseOf);
  r.unreached = ns.nodes
    .filter((nd) => nd.kind === NODE_ROOF && !stats.reach[nd.id])
    .map((nd) => nd.house);
  if (!r.declaredReach)
    add(
      'error',
      'nopath',
      'no drawn path from start to goal (check edges and touching houses)',
      'There is no route from the start to the goal.',
      'Link houses with ziplines, jumps or steps (or touch them) so the start leads to the goal.',
      [l.start, l.goal],
    );
  if (r.declaredReach && !r.derivedReach)
    add(
      'warn',
      'noderived',
      'drawn path exists but the model finds none: re-check edges',
      'Your drawn route exists, but the physics model finds no way along it.',
      'Re-check the links on the route; one may only just work.',
    );
  if (r.unreached.length > 0)
    add(
      'warn',
      'unreached',
      r.unreached.length + ' house(s) cannot be reached from the start',
      'House ' +
        r.unreached.join(', ') +
        (r.unreached.length > 1 ? ' cannot' : ' cannot') +
        ' be reached from the start.',
      'Link them in, or delete them if they are not part of the level.',
      r.unreached,
    );
  r.ok = r.errors.length === 0;
  return r;
}

/** The first error that `next` has and `prev` did not (tied to a house or edge), else null. Edits that add one are refused. */
export function newProblem(prev: Report, next: Report): Problem | null {
  // The earlier state stopped at basic errors (overlap, no start...): its link checks never ran, so what
  // they now report is not something this edit caused. Fixing the basics must not be refused.
  if (!prev.checked) return null;
  const had = new Set(prev.problems.map((p) => p.key));
  return (
    next.problems.find(
      (p) => p.level === 'error' && (p.houses.length > 0 || p.edges.length > 0) && !had.has(p.key),
    ) ?? null
  );
}

export type LinkChoice = 'zip' | GapVia;

/** Which link types a→b would be accepted for (adds no problem). Used for hints and refusal messages. */
export function linkOptions(l: BuilderLevel, a: number, b: number): Record<LinkChoice, boolean> {
  const before = validate(l);
  const out = {} as Record<LinkChoice, boolean>;
  for (const k of ['zip', 'jump', 'tramp', 'cushion', 'boxes', 'stairs'] as const) {
    const next = k === 'zip' ? addEdge(l, a, b, 'zip') : addEdge(l, a, b, 'gap', k);
    out[k] = next !== l && newProblem(before, validate(next)) === null;
  }
  return out;
}

type Box = { min: [number, number, number]; max: [number, number, number] };

function bx(x0: number, y0: number, z0: number, x1: number, y1: number, z1: number): Box {
  return { min: [x0, y0, z0], max: [x1, y1, z1] };
}

/** Compile to the ordinary level JSON the sim loads. Throws on errors that make no level (see validate). */
export function compileLevel(l: BuilderLevel): LevelJson {
  const rep = validate(l);
  const blocking = rep.errors.filter((m) =>
    /overlap|no start|no goal|same house|at least 2/.test(m),
  );
  if (blocking.length > 0) throw new Error('cannot compile: ' + blocking.join('; '));
  const ns = buildNodeSet(l);
  const solids: Box[] = [];
  const style: number[] = [];
  const anchors: { pos: [number, number, number] }[] = [];
  const lines: { zone: Box; anchor: number }[] = [];
  const tramps: Box[] = [];
  const cushions: Box[] = [];
  const hazards: Box[] = [];
  const H = HOUSE_HALF;
  for (const h of l.houses) {
    const a = ns.nodes[ns.roofOf.get(h.id) as number];
    const y = a.y;
    const z0 = h.z - H;
    const z1 = h.z + H;
    solids.push(bx(h.x - H, planeY(h.z) - FOOT, z0, h.x + H, y - SLAB, z1));
    style.push(1);
    solids.push(bx(h.x - H, y - SLAB, z0, h.x + H, y, z1));
    style.push(2);
    if (h.balcony) {
      const by = y - BALCONY_DROP;
      solids.push(bx(h.x - H, by - SLAB, z1, h.x + H, by, z1 + BALCONY_DEPTH));
      style.push(2);
    }
    const hasTramp = a.tramps.length > 0;
    const px0 = h.x + PAD_OFF - PAD_HALF;
    const px1 = h.x + PAD_OFF + PAD_HALF;
    if (a.cushion && !hasTramp) {
      cushions.push(bx(h.x - H, y, z0, h.x + H, y + THIN, z1));
    } else if (a.cushion) {
      cushions.push(bx(h.x - H, y, z0 + PAD_DEPTH, h.x + H, y + THIN, z1));
      cushions.push(bx(h.x - H, y, z0, px0, y + THIN, z0 + PAD_DEPTH));
      if (px1 < h.x + H) cushions.push(bx(px1, y, z0, h.x + H, y + THIN, z0 + PAD_DEPTH));
    }
    if (hasTramp) tramps.push(bx(px0, y, z0, px1, y + THIN, z0 + PAD_DEPTH));
    if (a.zipTo >= 0) {
      const b = ns.nodes[a.zipTo];
      const zc = zoneCentre(a);
      lines.push({
        zone: bx(zc[0] - PAD_HALF, y, z0, zc[0] + PAD_HALF, y + ZONE_THICK, z0 + PAD_DEPTH),
        anchor: anchors.length,
      });
      anchors.push({ pos: anchorPos(a, b) });
    }
  }
  for (const e of l.edges) {
    if (e.via === 'boxes' || e.via === 'stairs') emitSteps(ns, e, e.via, solids, style);
  }
  let xMin = Infinity;
  let xMax = -Infinity;
  let zMin = Infinity;
  let zMax = -Infinity;
  for (const h of l.houses) {
    xMin = Math.min(xMin, h.x - H);
    xMax = Math.max(xMax, h.x + H);
    zMin = Math.min(zMin, h.z - H);
    zMax = Math.max(zMax, h.z + H);
  }
  const zEnd = zMin - HAZARD_PAST;
  for (let z = zMax + HAZARD_PAST; z > zEnd; z -= HAZARD_STRIP) {
    const top = planeY(z) + HAZARD_LIP;
    hazards.push(
      bx(xMin - HAZARD_MARGIN, top - HAZARD_DEPTH, z - HAZARD_STRIP, xMax + HAZARD_MARGIN, top, z),
    );
  }
  const s = l.houses.find((h) => h.id === l.start) as BuilderHouse;
  const gl = l.houses.find((h) => h.id === l.goal) as BuilderHouse;
  const gy = roofHeight(gl);
  return {
    version: 1,
    spawn: [s.x, roofHeight(s) + 0.01, s.z],
    spawnYaw: Math.PI,
    killPlaneY: planeY(zEnd) - 40,
    solids,
    style,
    ramps: [],
    anchors,
    goal: bx(gl.x - H, gy, gl.z - H, gl.x + H, gy + GOAL_REACH, gl.z + H),
    route: [],
    lineOnly: 1,
    climb: 1,
    lines,
    tramps,
    cushions,
    hazards,
  };
}

// Steps fill the gap between two houses: treads of equal length, each one rise higher, starting at
// the lower roof. Width is the shared lane, at most STEP_WIDTH, centred.
function emitSteps(
  ns: NodeSet,
  e: BuilderEdge,
  via: 'boxes' | 'stairs',
  solids: Box[],
  style: number[],
): void {
  const a = ns.nodes[ns.roofOf.get(e.a) as number];
  const b = ns.nodes[ns.roofOf.get(e.b) as number];
  const rel = relation(a, b);
  if (rel === null || stepsCheck(a, b, via) !== null) return;
  const lo = a.y <= b.y ? a : b;
  const hi = lo === a ? b : a;
  const dy = hi.y - lo.y;
  const n = stepCount(via, dy);
  const alongZ = !rel.lateral;
  // Lane overlap on the other axis.
  const o0 = alongZ ? Math.max(a.x0, b.x0) : Math.max(a.z0, b.z0);
  const o1 = alongZ ? Math.min(a.x1, b.x1) : Math.min(a.z1, b.z1);
  const mid = (o0 + o1) / 2;
  const half = Math.min(STEP_WIDTH, o1 - o0) / 2;
  // Gap runs between the facing lips; direction from `lo` toward `hi` along the move axis.
  const loEdge = alongZ ? (hi.z1 <= lo.z0 ? lo.z0 : lo.z1) : hi.x0 >= lo.x1 ? lo.x1 : lo.x0;
  const sign = alongZ ? (hi.z1 <= lo.z0 ? -1 : 1) : hi.x0 >= lo.x1 ? 1 : -1;
  const tread = rel.gap / n;
  for (let k = 1; k <= n; k++) {
    const top = lo.y + (dy * k) / n;
    const p0 = loEdge + sign * tread * (k - 1);
    const p1 = loEdge + sign * tread * k;
    const lo1 = Math.min(p0, p1);
    const hi1 = Math.max(p0, p1);
    solids.push(
      alongZ
        ? bx(mid - half, top - FOOT, lo1, mid + half, top, hi1)
        : bx(lo1, top - FOOT, mid - half, hi1, top, mid + half),
    );
    style.push(1);
  }
}
