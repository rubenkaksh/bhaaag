// ADR 0011 strategy rules: fixed lines, trampolines, cushions, hazards, ledge grab + mantle.
import { describe, expect, it } from 'vitest';
import { DEFAULT_TUNING } from '../../src/core/config';
import {
  DEAD_HAZARD,
  HERO_AIRBORNE,
  HERO_EV_BOUNCE,
  HERO_EV_CUSHION,
  HERO_EV_GRAB,
  HERO_EV_HOOKED,
  HERO_EV_MANTLE,
  HERO_GROUNDED,
  HERO_HANGING,
  HeroState,
} from '../../src/core/hero';
import { AIM_NO_LINE, AIM_OK, HOOK_IDLE, aimReason } from '../../src/core/hook';
import { BTN_CLIMB, BTN_HOOK, BTN_JUMP, InputFrame, quantizeAxis } from '../../src/core/input';
import { AABB } from '../../src/core/math/aabb';
import { Vec3 } from '../../src/core/math/vec3';
import { step } from '../../src/core/sim';
import { World, addAnchor, addLine, addSolid } from '../../src/core/world';

const cfg = DEFAULT_TUNING;

function box(x0: number, y0: number, z0: number, x1: number, y1: number, z1: number): AABB {
  return new AABB(new Vec3(x0, y0, z0), new Vec3(x1, y1, z1));
}

function spawn(x: number, y: number, z: number, grounded: number): HeroState {
  const s = new HeroState();
  s.px = x;
  s.py = y;
  s.pz = z;
  s.grounded = grounded;
  s.mode = grounded === 1 ? HERO_GROUNDED : HERO_AIRBORNE;
  return s;
}

function run(s: HeroState, f: InputFrame, w: World, n: number): number {
  let ev = 0;
  for (let i = 0; i < n; i++) {
    step(s, f, w, cfg);
    ev |= s.eventBits;
  }
  return ev;
}

// Roof top at y=10 (z -4..4), a lower roof at y=0 (z 20..30), anchor over the lower roof.
function lineWorld(): World {
  const w = new World();
  w.lineOnly = 1;
  addSolid(w, box(-4, -20, -4, 4, 10, 4));
  addSolid(w, box(-4, -20, 20, 4, 0, 30));
  const a = addAnchor(w, 0, 1.6, 21);
  addLine(w, box(-1.5, 10, 1, 1.5, 10.05, 4), a);
  w.killPlaneY = -30;
  return w;
}

function hookPress(): InputFrame {
  const f = new InputFrame();
  f.buttons = BTN_HOOK;
  f.pressed = BTN_HOOK;
  return f;
}

describe('fixed lines (lineOnly)', () => {
  it('fires at the zone anchor without aiming when standing in the zone', () => {
    const w = lineWorld();
    const s = spawn(0, 10, 2.5, 1);
    s.camYaw = Math.PI; // looking away from the anchor: aim must not matter
    const ev = run(s, hookPress(), w, 1);
    expect(ev & HERO_EV_HOOKED).not.toBe(0);
    expect(s.hook.anchorId).toBe(0);
  });

  it('does not fire outside the zone', () => {
    const w = lineWorld();
    const s = spawn(0, 10, -2, 1);
    s.camYaw = 0; // looking straight at the anchor
    const f = hookPress();
    run(s, f, w, 1);
    f.pressed = 0;
    run(s, f, w, 60);
    expect(s.hook.state).toBe(HOOK_IDLE);
  });

  it('aimReason says no line outside and ok inside', () => {
    const w = lineWorld();
    const hand = 10 + cfg.rope.handToFeet;
    const out = aimReason(w, cfg, 0, hand, -2, 0, 11.6, -2, 0, -0.3, 1, 35, 6);
    expect(out).toBe(AIM_NO_LINE);
    const inZone = aimReason(w, cfg, 0, hand, 2.5, 0, 11.6, 2.5, 0, 0, -1, 35, 6);
    expect(inZone).toBe(AIM_OK);
  });

  it('classic worlds (lineOnly 0) still need an aim and ignore lines', () => {
    const w = lineWorld();
    w.lineOnly = 0;
    const s = spawn(0, 10, 2.5, 1);
    s.camYaw = Math.PI;
    run(s, hookPress(), w, 1);
    expect(s.hook.state).toBe(HOOK_IDLE);
  });
});

function slabWorld(kind: 'tramp' | 'cushion'): World {
  const w = new World();
  addSolid(w, box(-5, -1, -5, 5, 0, 60));
  const slab = box(-5, 0, -5, 5, 0.02, 5);
  if (kind === 'tramp') w.tramps.push(slab);
  else w.cushions.push(slab);
  w.killPlaneY = -20;
  return w;
}

describe('trampoline', () => {
  it('bounces a lethal fall back up instead of killing', () => {
    const w = slabWorld('tramp');
    const s = spawn(0, 30, 0, 0); // ~24 m/s at contact, well above vyRoll
    const ev = run(s, new InputFrame(), w, 200);
    expect(s.dead).toBe(0);
    expect(ev & HERO_EV_BOUNCE).not.toBe(0);
  });

  it('leaves at tramp.vUp and reaches the expected apex', () => {
    const w = slabWorld('tramp');
    const s = spawn(0, 3, 0, 0);
    let bounced = false;
    let apex = 0;
    for (let i = 0; i < 300; i++) {
      step(s, new InputFrame(), w, cfg);
      if ((s.eventBits & HERO_EV_BOUNCE) !== 0) {
        bounced = true;
        expect(s.vy).toBeCloseTo(cfg.tramp.vUp, 6);
      }
      if (bounced && s.py > apex) apex = s.py;
    }
    expect(bounced).toBe(true);
    const h = (cfg.tramp.vUp * cfg.tramp.vUp) / (2 * cfg.physics.g);
    expect(apex).toBeGreaterThan(h - 0.2);
    expect(apex).toBeLessThan(h + 0.05);
  });

  it('adds jumpBonus when JUMP is held at contact', () => {
    const w = slabWorld('tramp');
    const s = spawn(0, 3, 0, 0);
    const f = new InputFrame();
    f.buttons = BTN_JUMP;
    for (let i = 0; i < 120; i++) {
      step(s, f, w, cfg);
      if ((s.eventBits & HERO_EV_BOUNCE) !== 0) {
        expect(s.vy).toBeCloseTo(cfg.tramp.vUp + cfg.tramp.jumpBonus, 6);
        return;
      }
    }
    throw new Error('no bounce');
  });
});

describe('cushion', () => {
  it('absorbs a lethal fall and locks movement for lockSec', () => {
    const w = slabWorld('cushion');
    const s = spawn(0, 30, 0, 0);
    const f = new InputFrame();
    f.moveY = quantizeAxis(1);
    let landedAt = -1;
    for (let i = 0; i < 400; i++) {
      step(s, f, w, cfg);
      if ((s.eventBits & HERO_EV_CUSHION) !== 0) {
        landedAt = i;
        expect(s.landLockT).toBeCloseTo(cfg.cushion.lockSec, 6);
        expect(s.vx).toBe(0);
        expect(s.vz).toBe(0);
      }
      if (landedAt >= 0 && i === landedAt + 20) expect(s.pz).toBe(0); // still locked
      if (landedAt >= 0 && i === landedAt + 60) expect(s.pz).toBeGreaterThan(0.5); // released
    }
    expect(s.dead).toBe(0);
    expect(landedAt).toBeGreaterThan(0);
  });
});

describe('hazard', () => {
  it('kills on contact with DEAD_HAZARD', () => {
    const w = new World();
    addSolid(w, box(-5, -1, -5, 5, 0, 40));
    w.hazards.push(box(-5, -0.5, 6, 5, 0.5, 9));
    w.killPlaneY = -20;
    const s = spawn(0, 0, 0, 1);
    const f = new InputFrame();
    f.moveY = quantizeAxis(1);
    run(s, f, w, 180);
    expect(s.dead).toBe(1);
    expect(s.deadCause).toBe(DEAD_HAZARD);
    expect(s.pz).toBeGreaterThan(5.5);
    expect(s.pz).toBeLessThan(9.5);
  });
});

// Balcony (floor at y=0, z<2) against a house wall whose roof is 3 m up (z 2..12).
function balconyWorld(climb: number): World {
  const w = new World();
  w.climb = climb;
  addSolid(w, box(-5, -1, -5, 5, 0, 2));
  addSolid(w, box(-5, -1, 2, 5, 3, 12));
  w.killPlaneY = -20;
  return w;
}

function fwd(): InputFrame {
  const f = new InputFrame();
  f.moveY = quantizeAxis(1);
  return f;
}

// Runs the hero from the balcony into the wall, then jumps with the stick still held forward.
// Returns the events of the jump tick and the following 60 ticks.
function runUpAndJump(s: HeroState, w: World): number {
  const f = fwd();
  run(s, f, w, 20); // 6 m/s: reaches the wall and leans on it
  f.pressed = BTN_JUMP;
  let ev = run(s, f, w, 1);
  f.pressed = 0;
  ev |= run(s, f, w, 60);
  return ev;
}

describe('ledge grab and mantle', () => {
  it('a jump against the wall grabs the roof edge', () => {
    const w = balconyWorld(1);
    const s = spawn(0, 0, 0, 1);
    const ev = runUpAndJump(s, w);
    expect(ev & HERO_EV_GRAB).not.toBe(0);
    expect(s.mode).toBe(HERO_HANGING);
    expect(s.hasLedge).toBe(1);
    expect(s.hangLedgeY).toBe(3);
    expect(s.py).toBeGreaterThanOrEqual(3 - cfg.climb.reachMax - 1e-6);
    expect(s.py).toBeLessThanOrEqual(3 - cfg.climb.reachMin + 1e-6);
  });

  it('holding CLIMB for holdSec mantles onto the roof', () => {
    const w = balconyWorld(1);
    const s = spawn(0, 0, 0, 1);
    runUpAndJump(s, w);
    expect(s.mode).toBe(HERO_HANGING);
    const hold = new InputFrame();
    hold.buttons = BTN_CLIMB;
    const ticks = Math.ceil(cfg.climb.holdSec * cfg.fixedHz) + 1;
    const ev = run(s, hold, w, ticks);
    expect(ev & HERO_EV_MANTLE).not.toBe(0);
    expect(s.mode).toBe(HERO_GROUNDED);
    expect(s.grounded).toBe(1);
    expect(s.py).toBe(3);
    expect(s.pz).toBeGreaterThan(2 + cfg.hero.radius);
    run(s, new InputFrame(), w, 30);
    expect(s.dead).toBe(0);
    expect(s.py).toBe(3);
  });

  it('a short CLIMB tap does not mantle', () => {
    const w = balconyWorld(1);
    const s = spawn(0, 0, 0, 1);
    runUpAndJump(s, w);
    const tap = new InputFrame();
    tap.buttons = BTN_CLIMB;
    run(s, tap, w, 5);
    run(s, new InputFrame(), w, 5);
    expect(s.mode).toBe(HERO_HANGING);
    expect(s.climbT).toBe(0);
  });

  it('does nothing when the level has climb 0', () => {
    const w = balconyWorld(0);
    const s = spawn(0, 0, 0, 1);
    const ev = runUpAndJump(s, w);
    expect(ev & HERO_EV_GRAB).toBe(0);
    expect(s.mode).toBe(HERO_GROUNDED);
    expect(s.py).toBe(0);
  });

  it('ignores walls too tall to reach', () => {
    const w = balconyWorld(1);
    w.solids[1].max.y = 6;
    const s = spawn(0, 0, 0, 1);
    const ev = runUpAndJump(s, w);
    expect(ev & HERO_EV_GRAB).toBe(0);
    expect(s.mode).toBe(HERO_GROUNDED);
  });
});
