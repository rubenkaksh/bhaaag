// Sim bot for graph levels (ADR 0013 section 3.6). Drives the real step() through per-edge recipes
// built from PlacedEdge data. Shared by graphLevelBot.test.ts.
import { DEFAULT_TUNING } from '../../src/core/config';
import {
  HERO_EV_BOUNCE,
  HERO_EV_MANTLE,
  HERO_EV_ROLLED,
  HERO_EV_SLIDE,
  HERO_EV_VAULT,
  HERO_HANGING,
  HeroState,
} from '../../src/core/hero';
import { AXIS_MAX, BTN_HOOK, BTN_JUMP, InputFrame } from '../../src/core/input';
import { aabbContainsPoint } from '../../src/core/math/aabb';
import { step } from '../../src/core/sim';
import { deckY } from '../../src/content/house/houseSpec';
import type { HouseSpec } from '../../src/content/house/houseSpec';
import { loadWorldFromObject } from '../../src/content/load';
import type { GraphLevel } from '../../src/content/graph/format';
import type { PlacedEdge, PlacedLevel } from '../../src/content/graph/place';
import type { World } from '../../src/core/world';

const cfg = DEFAULT_TUNING;
const DEG = Math.PI / 180;
const EDGE_TICKS = 1800;
const TOTAL_TICKS = 7200; // 120 s

export interface Style {
  name: 'precise' | 'late' | 'sloppy' | 'spammer';
}

export interface Result {
  ok: boolean;
  events: number;
  cause: string;
}

function rng(seed: number): () => number {
  let a = (seed * 2654435761) >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

class Bot {
  s = new HeroState();
  w: World;
  events = 0;
  ticks = 0;
  yawErr = 0;
  late = 0;
  jitter = 0;
  tickJit = 0;
  spam = false;
  constructor(
    public placed: PlacedLevel,
    public style: Style['name'],
    v: number,
    startAt: HouseSpec | null,
  ) {
    const r = rng(v + 1);
    const u = (lo: number, hi: number): number => lo + (hi - lo) * r();
    this.w = loadWorldFromObject(placed.level);
    const s = this.s;
    if (startAt === null) {
      s.px = this.w.spawn.x;
      s.py = this.w.spawn.y;
      s.pz = this.w.spawn.z;
    } else {
      s.px = startAt.cx;
      s.py = deckY(startAt);
      s.pz = startAt.cz;
    }
    s.yaw = Math.PI;
    s.camYaw = Math.PI;
    s.grounded = 1;
    if (style === 'late') this.late = Math.floor(u(6, 12));
    if (style === 'sloppy') {
      this.yawErr = u(-10, 10) * DEG;
      this.jitter = 0.3;
      this.tickJit = 4;
    }
    if (style === 'spammer') this.spam = true;
    this.jx = u(-1, 1) * this.jitter;
    this.jz = u(-1, 1) * this.jitter;
    this.tj = Math.floor(u(0, 1) * (this.tickJit + 1));
  }
  jx = 0;
  jz = 0;
  tj = 0;

  tick(f: InputFrame): void {
    step(this.s, f, this.w, cfg);
    this.events |= this.s.eventBits;
    this.ticks++;
  }
  idle(n: number): void {
    for (let i = 0; i < n && this.s.dead === 0; i++) this.tick(new InputFrame());
  }
  aim(tx: number, tz: number): void {
    this.s.camYaw = Math.atan2(tx - this.s.px, tz - this.s.pz) + this.yawErr;
  }
  dist(tx: number, tz: number): number {
    return Math.hypot(tx - this.s.px, tz - this.s.pz);
  }
  /** Walk toward a point; returns when within tol or edge budget is spent. */
  walk(tx: number, tz: number, tol: number, speed: number, budget: number): boolean {
    for (let i = 0; i < budget && this.s.dead === 0; i++) {
      if (this.dist(tx, tz) <= tol) return true;
      const f = new InputFrame();
      this.aim(tx, tz);
      f.moveY = Math.round(AXIS_MAX * speed);
      this.tick(f);
    }
    return this.dist(tx, tz) <= tol;
  }
  onDeck(h: HouseSpec): boolean {
    const s = this.s;
    return (
      s.dead === 0 &&
      s.grounded === 1 &&
      Math.abs(s.py - deckY(h)) < 0.06 &&
      Math.abs(s.px - h.cx) < 4 &&
      Math.abs(s.pz - h.cz) < 4
    );
  }
  /** Steer in the air toward a point, optionally holding JUMP, until grounded or budget. */
  fly(
    tx: number,
    tz: number,
    holdJump: boolean,
    budget: number,
    stopOn: () => boolean,
    drive = false,
  ): void {
    for (let i = 0; i < budget && this.s.dead === 0; i++) {
      if (stopOn()) return;
      const f = new InputFrame();
      this.aim(tx, tz);
      const d = this.dist(tx, tz);
      const vt = d > 0.01 ? (this.s.vx * (tx - this.s.px) + this.s.vz * (tz - this.s.pz)) / d : 0;
      const k = drive ? 1 : Math.min(1, Math.max(0, 0.5 * d - 0.35 * vt));
      f.moveY = Math.round(AXIS_MAX * k);
      if (holdJump) f.buttons |= BTN_JUMP;
      this.tick(f);
    }
  }
}

function houseOf(p: PlacedLevel, id: number): HouseSpec {
  return p.houses.find((h) => h.id === id) as HouseSpec;
}

function edgeFor(p: PlacedLevel, a: number, b: number): PlacedEdge | null {
  for (const e of p.edges) {
    if (e.a === a && e.b === b) return e;
    if (e.kind === 'touch' && e.a === b && e.b === a) return e;
  }
  return null;
}

/** Run one edge from node a to node b. Returns the failure cause or '' on success. */
function runEdge(bot: Bot, e: PlacedEdge, a: HouseSpec, b: HouseSpec): string {
  const s = bot.s;
  const deckB = deckY(b);
  const jx = bot.jx;
  const jz = bot.jz;
  const done = (): boolean => bot.onDeck(b);
  const fail = (what: string): string =>
    `${what}: dead=${s.dead}/${s.deadCause} at ${s.px.toFixed(1)},${s.py.toFixed(1)},${s.pz.toFixed(1)}`;
  if (e.kind === 'touch') {
    const up = deckB - deckY(a) > 0.3;
    // walk toward b's centre; when climbing, jump once close to the wall
    const wallDx = Math.abs(b.cx - a.cx) > 4 ? Math.sign(b.cx - a.cx) : 0;
    const wallX = a.cx + wallDx * 4;
    const wallZ = wallDx === 0 ? a.cz - 4 : a.cz;
    let jumped = 0;
    let lateLeft = bot.late;
    for (let i = 0; i < EDGE_TICKS && s.dead === 0; i++) {
      if (done()) return '';
      const f = new InputFrame();
      bot.aim(b.cx + jx, b.cz + jz);
      f.moveY = AXIS_MAX;
      const dWall = wallDx !== 0 ? Math.abs(wallX - s.px) : Math.abs(wallZ - s.pz);
      if (up && s.grounded === 1 && dWall < 1.3) {
        if (lateLeft > 0) lateLeft--;
        else if (bot.spam ? i % 4 === 0 : jumped < 1 || i % 40 === 0) {
          f.pressed |= BTN_JUMP;
          f.buttons |= BTN_JUMP;
          jumped++;
        }
      }
      bot.tick(f);
    }
    return fail('touch ' + a.id + '-' + b.id);
  }
  if (e.kind === 'zip') {
    const z = e.zone as [number, number, number];
    if (!bot.walk(z[0] + jx * 0.3, z[2] + jz * 0.3, 0.5, 0.7, EDGE_TICKS / 2))
      return fail('zip walk');
    bot.idle(bot.late + bot.tj);
    let n = 0;
    for (let i = 0; i < EDGE_TICKS && s.dead === 0; i++) {
      if (done()) return '';
      const f = new InputFrame();
      if (s.grounded === 1 && s.mode !== HERO_HANGING && n < (bot.spam ? 99 : 1)) {
        if (bot.spam ? i % 4 === 0 : true) {
          f.pressed |= BTN_HOOK;
          f.buttons |= BTN_HOOK;
          n++;
        }
      }
      bot.tick(f);
    }
    return fail('zip ' + a.id + '-' + b.id);
  }
  // gap edges: leave a's roof edge slowly, steer to the prop
  const prop = e.prop as [number, number, number];
  const tk = e.takeoff;
  if (!bot.walk(tk[0], tk[2] + 1.5, 0.4, 0.7, EDGE_TICKS / 3)) return fail('gap walk');
  bot.idle(bot.late);
  const isTramp = e.via === 'tramp';
  const bounced = (): boolean => (bot.events & HERO_EV_BOUNCE) !== 0;
  // run south at walking speed until airborne, then steer
  let airborne = false;
  for (let i = 0; i < EDGE_TICKS / 2 && s.dead === 0; i++) {
    const f = new InputFrame();
    bot.aim(prop[0] + jx, prop[2] + jz);
    f.moveY = Math.round(AXIS_MAX * 0.5);
    if (s.grounded === 0) {
      airborne = true;
      break;
    }
    bot.tick(f);
  }
  if (!airborne) return fail('gap never left roof');
  if (isTramp) {
    bot.fly(prop[0] + jx, prop[2] + jz, true, 240, () => bounced() || s.grounded === 1);
    bot.fly(
      b.cx + jx,
      b.cz + jz,
      false,
      400,
      () => s.mode === HERO_HANGING || s.grounded === 1,
      true,
    );
    for (let i = 0; i < EDGE_TICKS && s.dead === 0; i++) {
      if (done()) return '';
      const f = new InputFrame();
      bot.aim(b.cx, b.cz);
      f.moveY = AXIS_MAX;
      // A spammer's extra JUMP presses here would release the ledge: not a legal press point.
      bot.tick(f);
    }
    return fail('tramp ' + a.id + '-' + b.id);
  }
  bot.fly(prop[0] + jx, prop[2] + jz, false, 400, () => s.grounded === 1);
  if (s.dead !== 0) return fail('cushion fall');
  // stairs: foot, then up to the roof
  const foot = e.stairsFoot as [number, number, number];
  const fx = b.cx - 5;
  const fz = foot[2];
  if (!bot.walk(fx, fz, 0.4, 0.7, 600)) return fail('to stairs foot');
  if (!bot.walk(b.cx - 0.5, fz, 0.5, 0.7, 600)) return fail('stairs climb');
  bot.walk(b.cx, b.cz, 1.0, 0.7, 300);
  if (done()) return '';
  return fail('stairs end');
}

function route(g: GraphLevel): number[] {
  const prev = new Map<number, number>();
  const q = [g.start];
  prev.set(g.start, -1);
  while (q.length > 0) {
    const n = q.shift() as number;
    for (const e of g.edges) {
      const nxt = e.a === n ? e.b : e.kind === 'touch' && e.b === n ? e.a : -1;
      if (nxt >= 0 && !prev.has(nxt)) {
        prev.set(nxt, n);
        q.push(nxt);
      }
    }
  }
  const out: number[] = [];
  for (let n = g.goal; n !== -1; n = prev.get(n) as number) out.unshift(n);
  return out;
}

function leap(bot: Bot, p: PlacedLevel, goalHouse: HouseSpec): string {
  const s = bot.s;
  const hay = p.goalProp;
  const gx = hay[0] + bot.jx;
  const gz = hay[2] + bot.jz;
  if (!bot.walk(goalHouse.cx, goalHouse.cz - 2, 0.5, 0.7, 600)) return 'leap walk';
  bot.idle(bot.late);
  const goal = bot.w.goal;
  for (let i = 0; i < 600 && s.dead === 0; i++) {
    if (goal !== null && aabbContainsPoint(goal, s.px, s.py, s.pz)) return '';
    const f = new InputFrame();
    bot.aim(gx, gz);
    if (s.grounded === 1) f.moveY = Math.round(AXIS_MAX * 0.5);
    else {
      const d = bot.dist(gx, gz);
      const vt = d > 0.01 ? (s.vx * (gx - s.px) + s.vz * (gz - s.pz)) / d : 0;
      f.moveY = Math.round(AXIS_MAX * Math.min(1, Math.max(0, 0.5 * d - 0.35 * vt)));
    }
    bot.tick(f);
  }
  return `leap: dead=${s.dead}/${s.deadCause} at ${s.px.toFixed(1)},${s.py.toFixed(1)},${s.pz.toFixed(1)}`;
}

export function playRoute(g: GraphLevel, p: PlacedLevel, style: Style['name'], v: number): Result {
  const bot = new Bot(p, style, v, null);
  const nodes = route(g);
  for (let i = 0; i + 1 < nodes.length; i++) {
    const e = edgeFor(p, nodes[i], nodes[i + 1]) as PlacedEdge;
    const cause = runEdge(bot, e, houseOf(p, nodes[i]), houseOf(p, nodes[i + 1]));
    if (cause !== '') return { ok: false, events: bot.events, cause };
    if (bot.ticks > TOTAL_TICKS) return { ok: false, events: bot.events, cause: 'over 120 s' };
  }
  const cause = leap(bot, p, houseOf(p, g.goal));
  return {
    ok: cause === '' && bot.ticks <= TOTAL_TICKS,
    events: bot.events,
    cause: cause || (bot.ticks > TOTAL_TICKS ? 'over 120 s' : ''),
  };
}

/** Precise bot spawned on a (grounded, deck centre) completes one edge on b. */
export function playEdge(p: PlacedLevel, a: number, b: number): Result {
  const bot = new Bot(p, 'precise', 0, houseOf(p, a));
  const e = edgeFor(p, a, b) as PlacedEdge;
  const cause = runEdge(bot, e, houseOf(p, a), houseOf(p, b));
  return { ok: cause === '', events: bot.events, cause };
}

export const MOVE_BITS = { HERO_EV_VAULT, HERO_EV_MANTLE, HERO_EV_SLIDE, HERO_EV_ROLLED };
