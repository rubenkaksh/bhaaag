// Skill-line gate for l1: four deterministic bots with perfect aim drive the real `step` through
// the whole level (3 hops plus the leap of faith). Each line plays the same hops differently;
// the gates prove that technique (run-up, chaining, timed release) is worth time.
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { loadWorldFromJson } from '../../src/content/load';
import { DEFAULT_TUNING } from '../../src/core/config';
import { HERO_ATTACHED, HERO_GROUNDED, HeroState } from '../../src/core/hero';
import { HOOK_ATTACHED, HOOK_IDLE } from '../../src/core/hook';
import { AXIS_MAX, BTN_HOOK, BTN_JUMP, InputFrame } from '../../src/core/input';
import { aabbContainsPoint } from '../../src/core/math/aabb';
import { step } from '../../src/core/sim';

const cfg = DEFAULT_TUNING;
const text = readFileSync(new URL('../../content/levels/l1.json', import.meta.url), 'utf8');
const HEAD = 0.9;
const MAX_TICKS = 1800;
const HZ = cfg.fixedHz;
const EDGE_FIRE_DIST = 3; // casual: metres before the roof edge
const STAND_WAIT_TICKS = HZ; // standing: 1 s at rest before firing
const EXPERT_RELEASE_FRAC = 0.9; // expert: rope fraction at which JUMP is pressed (inside the window)

type Line =
  'standing' | 'casual' | 'chain' | 'expert' | 'standing-instant' | 'casual-idle' | 'expert-late';

type Hop = { hop: number; hopT: number; ride: number; top: number };
type Result = {
  line: Line;
  finished: boolean;
  dead: boolean;
  cause: string;
  total: number;
  hops: Hop[];
  minStop: number; // idle lines: smallest gap (m) to the far roof edge after coasting to a stop
};

function play(line: Line): Result {
  const w = loadWorldFromJson(text);
  const s = new HeroState();
  s.px = w.spawn.x;
  s.py = w.spawn.y;
  s.pz = w.spawn.z;
  s.yaw = w.spawnYaw;
  s.camYaw = w.spawnYaw;
  s.camPitch = 0;
  s.grounded = 1;
  const res: Result = {
    line,
    finished: false,
    dead: false,
    cause: '',
    total: 0,
    hops: [],
    minStop: Infinity,
  };
  let ticks = 0;

  const aimAt = (tx: number, ty: number, tz: number): void => {
    const dx = tx - s.px;
    const dy = ty - (s.py + cfg.hero.height * HEAD);
    const dz = tz - s.pz;
    s.camYaw = Math.atan2(dx, dz);
    s.camPitch = Math.atan2(dy, Math.hypot(dx, dz));
  };
  const tick = (f: InputFrame): void => {
    step(s, f, w, cfg);
    ticks++;
  };
  const fail = (why: string): Result => {
    res.dead = s.dead === 1;
    res.cause = why + (s.dead === 1 ? ` dead${s.deadCause}` : '');
    res.total = ticks / HZ;
    return res;
  };

  let landedTick = 0;
  for (let hop = 0; hop < w.route.length; hop++) {
    const a = w.anchors[w.route[hop]];
    const roof = w.solids[1 + 2 * (2 * hop + 1)]; // last roof of this row (rope leaves from its edge)
    const target = w.solids[1 + 2 * (2 * (hop + 1))]; // first roof of the next row
    let stillTicks = 0;
    let fireTick = -1;
    let top = 0;
    let nextPress = 0;
    let landed = false;
    // Idle lines touch nothing after a landing until the hero has coasted to a stop.
    let settled = hop === 0 || (line !== 'casual-idle' && line !== 'expert-late');
    for (let t = 0; t < MAX_TICKS && s.dead === 0; t++) {
      const f = new InputFrame();
      aimAt(a.px, a.py, a.pz);
      const speed = Math.hypot(s.vx, s.vz);
      if (s.hook.state === HOOK_IDLE && s.mode === HERO_GROUNDED) {
        stillTicks = speed < 0.05 ? stillTicks + 1 : 0;
        if (!settled && stillTicks >= 1) {
          settled = true;
          res.minStop = Math.min(res.minStop, s.pz - roof.min.z);
        }
        let want: boolean;
        if (!settled) {
          want = false;
        } else if (
          (line === 'standing' || line === 'standing-instant') &&
          hop > 0 &&
          s.pz > roof.max.z
        ) {
          // The first house of a row cannot be crossed on momentum alone: keep walking until the
          // hero stands on the row's last roof, then let go and stop there.
          f.moveY = AXIS_MAX;
          want = false;
          stillTicks = 0;
        } else if (line === 'standing') {
          want = stillTicks >= STAND_WAIT_TICKS;
        } else if (line === 'standing-instant') {
          want = stillTicks >= 1;
        } else if ((line === 'chain' || line === 'expert') && hop > 0) {
          f.moveY = AXIS_MAX; // a person holds forward through the landing
          want = s.chainT > 0;
        } else {
          f.moveY = AXIS_MAX;
          want = s.pz - roof.min.z <= EDGE_FIRE_DIST;
        }
        if (want && ticks >= nextPress) {
          f.pressed = BTN_HOOK;
          f.buttons = BTN_HOOK;
          nextPress = ticks + 15;
        }
      } else if (
        s.hook.state === HOOK_IDLE &&
        (line === 'casual' || ((line === 'chain' || line === 'expert') && hop === 0))
      ) {
        f.moveY = AXIS_MAX; // keep running while an airborne hook is still being re-armed
      }
      // A perfect release overruns the roof with no input; the rope can still save it in the air.
      if (
        line === 'expert-late' &&
        hop > 0 &&
        s.mode !== HERO_GROUNDED &&
        s.hook.state === HOOK_IDLE &&
        ticks >= nextPress
      ) {
        f.pressed = BTN_HOOK;
        f.buttons = BTN_HOOK;
        nextPress = ticks + 15;
      }
      if (
        (line === 'expert' || line === 'expert-late') &&
        s.mode === HERO_ATTACHED &&
        s.hook.state === HOOK_ATTACHED
      ) {
        const frac = s.hook.s / (s.hook.len - cfg.rope.trolleyStop);
        if (frac >= EXPERT_RELEASE_FRAC) f.pressed |= BTN_JUMP;
      }
      if (fireTick < 0 && s.hook.state !== HOOK_IDLE) fireTick = ticks;
      // Keep the camera on the target while flying/riding (aimAt above), movement follows it.
      tick(f);
      if (fireTick >= 0) top = Math.max(top, Math.hypot(s.vx, s.vy, s.vz));
      if (
        s.dead === 0 &&
        s.grounded === 1 &&
        s.mode === HERO_GROUNDED &&
        s.hook.state === HOOK_IDLE &&
        Math.abs(s.py - target.max.y) < 0.01 &&
        s.pz > target.min.z &&
        s.pz < target.max.z
      ) {
        landed = true;
        break;
      }
    }
    if (!landed) return fail(`hop${hop + 1}@${s.pz.toFixed(0)},${s.py.toFixed(0)}`);
    res.hops.push({
      hop: hop + 1,
      hopT: (ticks - landedTick) / HZ,
      ride: (ticks - fireTick) / HZ,
      top,
    });
    landedTick = ticks;
  }

  const gx = (w.goal.min.x + w.goal.max.x) / 2;
  const gz = (w.goal.min.z + w.goal.max.z) / 2;
  for (let t = 0; t < MAX_TICKS && s.dead === 0; t++) {
    const f = new InputFrame();
    s.camYaw = Math.atan2(gx - s.px, gz - s.pz);
    s.camPitch = 0;
    f.moveY = AXIS_MAX;
    tick(f);
    if (aabbContainsPoint(w.goal, s.px, s.py, s.pz)) {
      res.finished = true;
      break;
    }
  }
  res.dead = s.dead === 1;
  res.total = ticks / HZ;
  if (!res.finished) res.cause = `leap${s.dead === 1 ? ` dead${s.deadCause}` : ''}`;
  return res;
}

const LINES: Line[] = [
  'standing',
  'standing-instant',
  'casual',
  'chain',
  'expert',
  'casual-idle',
  'expert-late',
];
const results: Record<string, Result> = {};
for (const l of LINES) results[l] = play(l);

function table(): string {
  const rows: string[] = ['line              total   top   per-hop (hopT/ride s)'];
  for (const l of LINES) {
    const r = results[l];
    const top = Math.max(0, ...r.hops.map((h) => h.top));
    const per = r.hops.map((h) => `${h.hopT.toFixed(1)}/${h.ride.toFixed(2)}`).join(' ');
    rows.push(
      `${l.padEnd(17)} ${r.total.toFixed(1).padStart(5)}  ${top.toFixed(1).padStart(5)}  ${per}${r.cause === '' ? '' : `  !! ${r.cause}`}`,
    );
  }
  return rows.join('\n');
}

describe('l1 skill lines', () => {
  it('reports the table', () => {
    console.log(`\n${table()}\n`);
  });

  it('no line dies and every line finishes the leap of faith', () => {
    for (const l of LINES) {
      const r = results[l];
      expect(r.dead, `${l}: ${r.cause}\n${table()}`).toBe(false);
      expect(r.finished, `${l}: ${r.cause}\n${table()}`).toBe(true);
    }
  });

  it('no input after a landing stops the hero at least 1 m short of the far edge', () => {
    const r = results['casual-idle'];
    expect(r.minStop, table()).toBeGreaterThanOrEqual(1);
    expect(r.minStop, table()).toBeLessThan(Infinity);
    console.log(`idle stop margin: ${r.minStop.toFixed(2)} m`);
  });

  it('expert total <= 0.85 x casual total', () => {
    expect(results.expert.total, table()).toBeLessThanOrEqual(0.85 * results.casual.total);
  });

  it('a chained hop rides at least 0.4 s faster than a standing hop (every hop after the first)', () => {
    const st = results.standing.hops;
    const ch = results.chain.hops;
    expect(ch.length, table()).toBe(st.length);
    for (let i = 1; i < st.length; i++) {
      expect(st[i].ride - ch[i].ride, `hop ${i + 1}\n${table()}`).toBeGreaterThanOrEqual(0.4);
    }
  });

  it('firing from a full run beats firing from a standstill on the same hop', () => {
    const st = results.standing.hops;
    const ca = results.casual.hops;
    expect(ca.length, table()).toBe(st.length);
    for (let i = 0; i < st.length; i++) {
      expect(ca[i].ride, `hop ${i + 1}\n${table()}`).toBeLessThan(st[i].ride);
    }
  });

  it('running up to the edge beats waiting to stop and firing at once (whole run)', () => {
    expect(results.casual.total, table()).toBeLessThan(results['standing-instant'].total);
  });
});
