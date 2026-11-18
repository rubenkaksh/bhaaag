// Route bot for nagarkot-home (dev aid, not a gate; nothing in src imports it). Plays the generator's shortest route
// (strict graph, estimateRoute) through the REAL step() with DEFAULT_TUNING, from the start pad to the goal box.
// It only reads HeroState and writes InputFrames (look delta, stick, JUMP, HOOK); no sim state is set while it plays
// (isolated-edge runs and respawns after a death place the hero, and say so).
import { loadWorldFromObject } from '../../src/content/load';
import { buildNagarkotHome } from '../../src/content/strategy/home';
import {
  MOVE_JUMP,
  MOVE_NAMES,
  MOVE_ZIP,
  SPRINT_RUNWAY_M,
  SPRINT_SPEED,
  buildEdges,
  estimateRoute,
  flight,
  type MazeNode,
} from '../../src/content/strategy/graph';
import { DEFAULT_TUNING } from '../../src/core/config';
import {
  HERO_AIRBORNE,
  HERO_ATTACHED,
  HERO_GROUNDED,
  HERO_HANGING,
  HeroState,
} from '../../src/core/hero';
import {
  AXIS_MAX,
  BTN_HOOK,
  BTN_JUMP,
  InputFrame,
  quantizeAxis,
  quantizeTurn,
} from '../../src/core/input';
import { aabbContainsPoint } from '../../src/core/math/aabb';
import { step } from '../../src/core/sim';
import type { World } from '../../src/core/world';

const cfg = DEFAULT_TUNING;
const R = cfg.hero.radius;
const TWO_PI = Math.PI * 2;
export const TICK_HZ = 60;
export const TIME_LIMIT_S = 120;
const LAND_MARGIN = 0.3; // graph.ts LAND_MARGIN (private there)
const EDGE_BUDGET = 60 * 40; // ticks one edge may take before it counts as stuck

type V2 = [number, number];
interface Rect {
  x0: number;
  x1: number;
  z0: number;
  z1: number;
  y: number;
}

/** One route edge in the world frame, with what the graph model expects of it. */
export interface Leg {
  index: number;
  from: number;
  to: number;
  move: number;
  moveName: string;
  a: Rect; // departure surface (R_B for the edge off the pivot road)
  b: Rect;
  ux: number; // travel direction (world)
  uz: number;
  gap: number; // open space between the facing lips along u
  dep: number; // lateral coordinate of the departure line
  launch: Launch;
  via: V2[]; // waypoints on the way to the run-up point (bend corner)
  line: number; // fixed-line index for a zip, else -1
  pad: V2 | null; // cushion pad centre on b, if any
  note: string;
}

interface Launch {
  jump: boolean;
  speed: number; // horizontal m/s the model assumes at take-off
  sprint: boolean;
  ok: boolean; // false: no launch in the model's list reaches the need
}

export interface Plan {
  seed: number;
  world: World;
  legs: Leg[];
  nodes: MazeNode[]; // world frame
  start: V2;
  startY: number;
  routeS: number;
  summaryDeadEnds: number;
}

function wrapAngle(a: number): number {
  let r = a % TWO_PI;
  if (r > Math.PI) r -= TWO_PI;
  if (r < -Math.PI) r += TWO_PI;
  return r;
}

function rectOf(n: MazeNode): Rect {
  return { x0: n.x0, x1: n.x1, z0: n.z0, z1: n.z1, y: n.y };
}

// Coordinates along u and along the lateral perp(u) = (-uz, ux).
function along(r: Rect, ux: number, uz: number): [number, number] {
  const c = [r.x0 * ux + r.z0 * uz, r.x1 * ux + r.z1 * uz, r.x0 * ux + r.z1 * uz, r.x1 * ux + r.z0 * uz];
  return [Math.min(...c), Math.max(...c)];
}
function lateral(r: Rect, ux: number, uz: number): [number, number] {
  const px = -uz;
  const pz = ux;
  const c = [r.x0 * px + r.z0 * pz, r.x1 * px + r.z1 * pz, r.x0 * px + r.z1 * pz, r.x1 * px + r.z0 * pz];
  return [Math.min(...c), Math.max(...c)];
}
function pt(ux: number, uz: number, al: number, la: number): V2 {
  return [ux * al + -uz * la, uz * al + ux * la];
}

function chooseLaunch(gap: number, dy: number, alongLen: number): Launch {
  const need = gap + 2 * R + LAND_MARGIN;
  const list: Array<[number, number, boolean]> = [
    [0, cfg.hero.walk, false],
    [0, cfg.hero.run, false],
    [cfg.hero.jump, cfg.hero.run, false],
  ];
  if (alongLen - 2 * R >= SPRINT_RUNWAY_M) list.push([cfg.hero.jump, SPRINT_SPEED, true]);
  for (const [vy, v, sp] of list) {
    const f = flight(vy, v, dy);
    if (f !== null && f.dist >= need) return { jump: vy > 0, speed: v, sprint: sp, ok: true };
  }
  return { jump: true, speed: cfg.hero.run, sprint: false, ok: false };
}

export function buildPlan(seed: number): Plan {
  const s = buildNagarkotHome(seed);
  const bend = s.world;
  if (bend === undefined) throw new Error('nagarkot-home level has no bend frame');
  const world = loadWorldFromObject(s.level);
  const strict = {
    n: s.nodes.length,
    edges: buildEdges(s.nodes),
    start: s.graph.start,
    goal: s.graph.goal,
  };
  const est = estimateRoute(strict, s.nodes);
  if (est === null) throw new Error('no route');
  const wn = bend.nodes;
  const legs: Leg[] = [];
  for (let i = 0; i + 1 < est.path.length; i++) {
    const fromId = est.path[i];
    const toId = est.path[i + 1];
    const e = strict.edges.find((k) => k.from === fromId && k.to === toId);
    if (e === undefined) throw new Error('route edge missing ' + fromId + '->' + toId);
    const an = wn[fromId];
    const bn = wn[toId];
    let a = rectOf(an);
    const b = rectOf(bn);
    const via: V2[] = [];
    let note = '';
    if (fromId === bend.pivotNode && bend.tail[toId]) {
      // The road turns: the hero walks R_A east to R_B (x 32..42, the turned copy) and jumps off R_B's east edge.
      const half = (an.z1 - an.z0) / 2;
      a = {
        x0: bend.xEast - half,
        x1: bend.xEast + half,
        z0: bend.zr + an.x0,
        z1: bend.zr + an.x1,
        y: an.y,
      };
      via.push([bend.xEast - half + 1, bend.zr]);
      note = 'bend corner via R_B';
    }
    // Travel direction: the axis on which the rects do not overlap.
    let ux = 0;
    let uz = 0;
    if (b.x0 >= a.x1 - 1e-9) ux = 1;
    else if (b.x1 <= a.x0 + 1e-9) ux = -1;
    else if (b.z0 >= a.z1 - 1e-9) uz = 1;
    else uz = -1;
    const [aLo, aHi] = along(a, ux, uz);
    const [bLo] = along(b, ux, uz);
    void aLo;
    const gap = bLo - aHi;
    const [la0, la1] = lateral(a, ux, uz);
    const [lb0, lb1] = lateral(b, ux, uz);
    const o0 = Math.max(la0, lb0);
    const o1 = Math.min(la1, lb1);
    let dep = (o0 + o1) / 2;
    // cushion pad on b: aim at its centre when the lateral range allows
    let pad: V2 | null = null;
    for (const c of world.cushions) {
      const cx = (c.min.x + c.max.x) / 2;
      const cz = (c.min.z + c.max.z) / 2;
      if (cx >= b.x0 && cx <= b.x1 && cz >= b.z0 && cz <= b.z1 && Math.abs(c.max.y - b.y) < 1)
        pad = [cx, cz];
    }
    if (pad !== null) {
      const pl = pad[0] * -uz + pad[1] * ux;
      dep = Math.min(o1 - 1.2, Math.max(o0 + 1.2, pl));
    }
    const dy = b.y - a.y;
    const launch = chooseLaunch(gap, dy, aHi - along(a, ux, uz)[0]);
    let line = -1;
    if (e.move === MOVE_ZIP) {
      for (let k = 0; k < world.lines.length; k++) {
        const zb = world.lines[k].zone;
        const cx = (zb.min.x + zb.max.x) / 2;
        const cz = (zb.min.z + zb.max.z) / 2;
        if (
          cx >= a.x0 - 0.5 &&
          cx <= a.x1 + 0.5 &&
          cz >= a.z0 - 0.5 &&
          cz <= a.z1 + 0.5 &&
          Math.abs(zb.max.y - a.y) < 1.5
        )
          line = k;
      }
      if (line < 0) throw new Error('no fixed line on node ' + fromId);
    }
    legs.push({
      index: i,
      from: fromId,
      to: toId,
      move: e.move,
      moveName: MOVE_NAMES[e.move],
      a,
      b,
      ux,
      uz,
      gap,
      dep,
      launch,
      via,
      line,
      pad,
      note,
    });
  }
  const st = wn[strict.start];
  return {
    seed: s.seed,
    world,
    legs,
    nodes: wn,
    start: [world.spawn.x, world.spawn.z],
    startY: world.spawn.y,
    routeS: est.seconds,
    summaryDeadEnds: s.stats.deadEnds.length + (st === undefined ? 0 : 0),
  };
}

// ---------------------------------------------------------------------------------------------------------------

export interface EdgeResult {
  index: number;
  from: number;
  to: number;
  move: string;
  ok: boolean;
  seconds: number; // time spent on the edge
  cause: string; // '' when ok
  where: string; // hero position at the end
  expected: string; // what the graph model says
  real: string; // what the sim did
  respawned: boolean; // sequence run: hero was put on the departure node after a failed edge before this one
}

export interface RunResult {
  finished: boolean; // goal reached
  clean: boolean; // ... with no respawn
  seconds: number; // total time (ticks / 60), including respawn stitching
  edges: EdgeResult[];
  deathAt: string; // first failure, '' if none
}

class Pilot {
  s = new HeroState();
  ticks = 0;
  events = 0;
  constructor(public w: World) {}

  place(x: number, y: number, z: number): void {
    const s = this.s;
    s.px = x;
    s.py = y + 0.05;
    s.pz = z;
    s.vx = 0;
    s.vy = 0;
    s.vz = 0;
    s.dead = 0;
    s.grounded = 0;
    s.mode = HERO_AIRBORNE;
  }

  /** One tick: turn the camera to yaw, push the stick forward by k (0..1), plus buttons. */
  tick(yaw: number | null, k: number, buttons = 0, pressed = 0): void {
    const f = new InputFrame();
    if (yaw !== null) f.lookYaw = quantizeTurn(wrapAngle(yaw - this.s.camYaw));
    f.moveY = k > 0 ? quantizeAxis(k) : 0;
    f.buttons = buttons;
    f.pressed = pressed;
    step(this.s, f, this.w, cfg);
    this.events |= this.s.eventBits;
    this.ticks++;
  }
  alive(): boolean {
    return this.s.dead === 0;
  }
  speed(): number {
    return Math.hypot(this.s.vx, this.s.vz);
  }
  yawTo(tx: number, tz: number): number {
    return Math.atan2(tx - this.s.px, tz - this.s.pz);
  }
  dist(tx: number, tz: number): number {
    return Math.hypot(tx - this.s.px, tz - this.s.pz);
  }
  idle(n: number): void {
    for (let i = 0; i < n && this.alive(); i++) this.tick(null, 0);
  }
  /** Walk to a point, braking in; true when within tol. */
  walkTo(tx: number, tz: number, tol: number, maxK: number, budget: number): boolean {
    for (let i = 0; i < budget && this.alive(); i++) {
      const d = this.dist(tx, tz);
      if (d <= tol) return true;
      const vt = d > 0.01 ? (this.s.vx * (tx - this.s.px) + this.s.vz * (tz - this.s.pz)) / d : 0;
      const k = Math.min(maxK, Math.max(0.1, 0.35 * d - 0.12 * vt));
      this.tick(this.yawTo(tx, tz), k);
    }
    return this.alive() && this.dist(tx, tz) <= tol;
  }
}

function fmtPos(s: HeroState): string {
  return `(${s.px.toFixed(1)}, ${s.py.toFixed(1)}, ${s.pz.toFixed(1)})`;
}

function inRect(s: HeroState, r: Rect, pad: number): boolean {
  return (
    s.px >= r.x0 - pad && s.px <= r.x1 + pad && s.pz >= r.z0 - pad && s.pz <= r.z1 + pad
  );
}

function onB(p: Pilot, leg: Leg): boolean {
  const s = p.s;
  return (
    s.dead === 0 &&
    s.grounded === 1 &&
    s.mode === HERO_GROUNDED &&
    inRect(s, leg.b, 0) &&
    Math.abs(s.py - leg.b.y) < 0.6
  );
}

function expectText(leg: Leg): string {
  const l = leg.launch;
  const how =
    leg.move === MOVE_ZIP
      ? 'fixed line, lands on the target roof'
      : `${l.sprint ? 'sprint' : l.jump ? 'run' : l.speed <= cfg.hero.walk ? 'walk' : 'run'}${
          l.jump ? '-jump' : '-off'
        } at ${l.speed.toFixed(1)} m/s, gap ${leg.gap.toFixed(1)} m, dy ${(leg.b.y - leg.a.y).toFixed(1)} m${
          l.ok ? '' : ' (no model launch reaches it)'
        }`;
  return how;
}

/** Fly after take-off: steer to the landing target until grounded (or something else takes over). */
function fly(p: Pilot, leg: Leg, budget: number): void {
  const s = p.s;
  const [bLo, bHi] = along(leg.b, leg.ux, leg.uz);
  const tAl = bLo + Math.min((bHi - bLo) / 2, 3.5);
  let tgt = pt(leg.ux, leg.uz, tAl, leg.dep);
  if (leg.pad !== null) tgt = leg.pad;
  for (let i = 0; i < budget && p.alive(); i++) {
    if (s.grounded === 1 || s.mode === HERO_ATTACHED || s.mode === HERO_HANGING) return;
    const d = p.dist(tgt[0], tgt[1]);
    const vt = d > 0.01 ? (s.vx * (tgt[0] - s.px) + s.vz * (tgt[1] - s.pz)) / d : 0;
    const k = Math.min(1, Math.max(0, 0.5 * d - 0.35 * vt));
    p.tick(p.yawTo(tgt[0], tgt[1]), k);
  }
}

/** After a landing: kill excess speed so the next edge starts from a known state. */
function settle(p: Pilot): void {
  for (let i = 0; i < 90 && p.alive() && (p.s.grounded !== 1 || p.speed() > 0.6); i++) p.tick(null, 0);
}

function runJump(p: Pilot, leg: Leg): string {
  const s = p.s;
  const { ux, uz } = leg;
  const [aLo, aHi] = along(leg.a, ux, uz);
  const l = leg.launch;
  // Run-up start: long enough to reach the take-off speed, the whole straight for a sprint.
  const need = l.sprint ? aHi - aLo - 2 * R : l.jump ? 4.5 : 1.5;
  const startAl = Math.max(aLo + R + 0.3, aHi - need - R);
  const st = pt(ux, uz, startAl, leg.dep);
  for (const w of leg.via) if (!p.walkTo(w[0], w[1], 0.6, 0.9, EDGE_BUDGET)) return 'walk to via';
  if (!p.walkTo(st[0], st[1], 0.25, 0.8, EDGE_BUDGET)) return 'walk to run-up';
  p.idle(6);
  const aheadK = l.speed >= cfg.hero.run ? 1 : l.speed / cfg.hero.run;
  const ahead = (al: number): V2 => pt(ux, uz, al + 6, leg.dep);
  let jumped = false;
  for (let i = 0; i < EDGE_BUDGET && p.alive(); i++) {
    const al = s.px * ux + s.pz * uz;
    const tg = ahead(al);
    if (s.grounded !== 1) break;
    const lead = l.jump ? 0.08 + 0.016 * Math.hypot(s.vx, s.vz) : 0;
    if (l.jump && !jumped && al >= aHi - lead) {
      p.tick(p.yawTo(tg[0], tg[1]), aheadK, BTN_JUMP, BTN_JUMP);
      jumped = true;
    } else p.tick(p.yawTo(tg[0], tg[1]), aheadK);
  }
  if (!p.alive()) return 'died on run-up';
  fly(p, leg, 400);
  if (!p.alive()) return '';
  settle(p);
  return '';
}

function zip(p: Pilot, leg: Leg): string {
  const s = p.s;
  const zb = p.w.lines[leg.line].zone;
  const cx = (zb.min.x + zb.max.x) / 2;
  const cz = (zb.min.z + zb.max.z) / 2;
  for (const w of leg.via) if (!p.walkTo(w[0], w[1], 0.6, 0.9, EDGE_BUDGET)) return 'walk to via';
  if (!p.walkTo(cx, cz, 0.4, 0.8, EDGE_BUDGET)) return 'walk to zone';
  p.idle(8);
  p.tick(null, 0, BTN_HOOK, BTN_HOOK);
  let attached = false;
  for (let i = 0; i < EDGE_BUDGET && p.alive(); i++) {
    if (s.mode === HERO_ATTACHED) attached = true;
    if (attached && s.mode !== HERO_ATTACHED && s.grounded === 1) break;
    p.tick(null, 0);
  }
  if (!attached) return 'hook never attached (zone or cooldown)';
  settle(p);
  return '';
}

function runLeg(p: Pilot, leg: Leg): string {
  const stuck = leg.move === MOVE_ZIP ? zip(p, leg) : runJump(p, leg);
  if (stuck !== '') return stuck;
  return '';
}

function legResult(p: Pilot, leg: Leg, t0: number, why: string, respawned: boolean): EdgeResult {
  const s = p.s;
  const ok = why === '' && onB(p, leg);
  let cause = '';
  let real: string;
  if (!ok) {
    if (s.dead !== 0) {
      cause = `died (cause ${s.deadCause}) at ${fmtPos(s)}`;
      real = `dead, cause ${s.deadCause}`;
    } else if (why !== '') {
      cause = why;
      real = why + ' at ' + fmtPos(s);
    } else {
      cause = `ended off target at ${fmtPos(s)}`;
      real = `alive at ${fmtPos(s)}, grounded=${s.grounded}, not on node ${leg.to}`;
    }
  } else real = 'landed on target';
  return {
    index: leg.index,
    from: leg.from,
    to: leg.to,
    move: leg.moveName,
    ok,
    seconds: (p.ticks - t0) / TICK_HZ,
    cause,
    where: fmtPos(s),
    expected: expectText(leg),
    real,
    respawned,
  };
}

function standOn(p: Pilot, r: Rect): void {
  p.place((r.x0 + r.x1) / 2, r.y, (r.z0 + r.z1) / 2);
  for (let i = 0; i < 30 && p.s.grounded !== 1; i++) p.tick(null, 0);
  p.idle(10);
}

/** Departure surface for a leg to start from: where the previous leg's target node is (R_A for the pivot road). */
function startRect(plan: Plan, leg: Leg): Rect {
  return leg.via.length > 0 ? rectOf(plan.nodes[leg.from]) : leg.a;
}

/** Each edge alone: hero put on the centre of the departure node, then the edge routine. */
export function playEdgeAlone(plan: Plan, i: number): EdgeResult {
  const leg = plan.legs[i];
  const p = new Pilot(plan.world);
  const r = startRect(plan, leg);
  standOn(p, r);
  const t0 = p.ticks;
  const why = runLeg(p, leg);
  return legResult(p, leg, t0, why, false);
}

/** The whole route from the start pad. After a failed edge the hero is placed on the next node so every edge gets measured. */
export function playRoute(plan: Plan): RunResult {
  const p = new Pilot(plan.world);
  p.place(plan.start[0], plan.startY, plan.start[1]);
  p.s.camYaw = Math.PI; // facing downhill (-z) like the game's spawn
  for (let i = 0; i < 40 && p.s.grounded !== 1; i++) p.tick(null, 0);
  const edges: EdgeResult[] = [];
  let respawned = false;
  let respawns = 0;
  let deathAt = '';
  for (const leg of plan.legs) {
    const t0 = p.ticks;
    const why = p.alive() ? runLeg(p, leg) : 'dead';
    const res = legResult(p, leg, t0, why, respawned);
    edges.push(res);
    respawned = false;
    if (!res.ok) {
      if (deathAt === '') deathAt = `edge ${leg.index} (${leg.from}->${leg.to} ${leg.moveName}): ${res.cause}`;
      respawns++;
      respawned = true;
      standOn(p, plan.legs[leg.index + 1] === undefined ? leg.b : startRect(plan, plan.legs[leg.index + 1]));
    }
    if (p.ticks > TIME_LIMIT_S * TICK_HZ * 3) break;
  }
  // finish: the goal box sits on the last roof
  const goal = plan.world.goal;
  const last = plan.legs[plan.legs.length - 1];
  let inGoal = p.alive() && aabbContainsPoint(goal, p.s.px, p.s.py + 0.1, p.s.pz);
  if (p.alive() && !inGoal && respawns === 0) {
    const gx = (goal.min.x + goal.max.x) / 2;
    const gz = (goal.min.z + goal.max.z) / 2;
    p.walkTo(gx, gz, 0.5, 0.6, 600);
    inGoal = aabbContainsPoint(goal, p.s.px, p.s.py + 0.1, p.s.pz);
  }
  void last;
  const seconds = p.ticks / TICK_HZ;
  return { finished: inGoal, clean: inGoal && respawns === 0, seconds, edges, deathAt };
}

export function formatReport(plan: Plan, run: RunResult, alone: EdgeResult[]): string {
  const out: string[] = [];
  out.push(`route bot: nagarkot-home seed ${plan.seed}, graph estimate ${plan.routeS.toFixed(1)} s, ${plan.legs.length} edges`);
  out.push('edge | from->to | move | alone | in run | s | expected (graph) | real');
  for (let i = 0; i < plan.legs.length; i++) {
    const a = alone[i];
    const r = run.edges[i];
    out.push(
      `${String(i).padStart(2)} | ${a.from}->${a.to} | ${a.move} | ${a.ok ? 'ok' : 'FAIL'} | ${
        r.ok ? 'ok' : 'FAIL'
      }${r.respawned ? ' (after respawn)' : ''} | ${r.seconds.toFixed(1)} | ${a.expected} | ${
        !a.ok ? 'alone: ' + a.cause : ''
      }${!r.ok ? ' run: ' + r.cause : ''}`,
    );
  }
  out.push(
    `finish: ${run.finished ? 'YES' : 'NO'} ${
      run.clean ? '(clean, no respawn)' : `(NOT clean: ${run.edges.filter((e) => !e.ok).length} failed edge(s), hero placed on the next node)`
    } in ${run.seconds.toFixed(1)} s (limit ${TIME_LIMIT_S} s)`,
  );
  if (run.deathAt !== '') out.push('first failure: ' + run.deathAt);
  return out.join('\n');
}

void MOVE_JUMP;
void AXIS_MAX;
