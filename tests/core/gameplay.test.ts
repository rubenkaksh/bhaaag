import { describe, expect, it } from 'vitest';
import { DEFAULT_TUNING } from '../../src/core/config';
import {
  DEAD_FELL,
  DEAD_WALL,
  HERO_AIRBORNE,
  HERO_ATTACHED,
  HERO_DEAD,
  HERO_EV_LANDED,
  HERO_EV_PERFECT,
  HERO_EV_RELEASED,
  HERO_GROUNDED,
  HERO_HANGING,
  HeroState,
  copyHeroState,
} from '../../src/core/hero';
import { AXIS_MAX, BTN_DROP, BTN_HOOK, BTN_JUMP, BTN_REEL, InputFrame } from '../../src/core/input';
import { AABB } from '../../src/core/math/aabb';
import { Vec3 } from '../../src/core/math/vec3';
import { step } from '../../src/core/sim';
import { World, addAnchor, addSolid } from '../../src/core/world';

const cfg = DEFAULT_TUNING;

function box(x0: number, y0: number, z0: number, x1: number, y1: number, z1: number): AABB {
  return new AABB(new Vec3(x0, y0, z0), new Vec3(x1, y1, z1));
}

function hero(x: number, y: number, z: number, grounded: number): HeroState {
  const s = new HeroState();
  s.px = x;
  s.py = y;
  s.pz = z;
  s.grounded = grounded;
  s.mode = grounded === 1 ? HERO_GROUNDED : HERO_AIRBORNE;
  return s;
}

// Points the camera from the hero's head at anchor `id`.
function aimAt(s: HeroState, w: World, id: number): void {
  const a = w.anchors[id];
  const dx = a.px - s.px;
  const dy = a.py - (s.py + cfg.hero.height * 0.9);
  const dz = a.pz - s.pz;
  s.camYaw = Math.atan2(dx, dz);
  s.camPitch = Math.atan2(dy, Math.sqrt(dx * dx + dz * dz));
}

function frame(buttons: number, pressed: number): InputFrame {
  const f = new InputFrame();
  f.buttons = buttons;
  f.pressed = pressed;
  return f;
}

const IDLE = new InputFrame();

function run(s: HeroState, w: World, n: number, f: InputFrame = IDLE): void {
  for (let i = 0; i < n; i++) step(s, f, w, cfg);
}

// Roof 1 (top y=10, z -10..0), roof 2 (top y=1, z 22..40), anchor on roof 2.
function twoRoofs(): World {
  const w = new World();
  addSolid(w, box(-5, 0, -10, 5, 10, 0));
  addSolid(w, box(-5, -10, 22, 5, 1, 40));
  addAnchor(w, 0, 2.5, 26);
  w.killPlaneY = -30;
  return w;
}

// Fires at anchor 0 and steps until the rope is attached.
function fireAndAttach(s: HeroState, w: World): void {
  aimAt(s, w, 0);
  step(s, frame(0, BTN_HOOK), w, cfg);
  for (let i = 0; i < 30 && s.mode !== HERO_ATTACHED; i++) step(s, IDLE, w, cfg);
  expect(s.mode).toBe(HERO_ATTACHED);
}

describe('gameplay: rope ride', () => {
  it('(a) crosses a 22 m gap, lands alive on roof 2', () => {
    const w = twoRoofs();
    const s = hero(0, 10, -1, 1);
    fireAndAttach(s, w);
    let landed = false;
    for (let i = 0; i < 600 && s.mode !== HERO_GROUNDED && s.dead === 0; i++) {
      step(s, IDLE, w, cfg);
      landed = landed || (s.eventBits & 4) !== 0;
    }
    run(s, w, 120);
    expect(s.dead).toBe(0);
    expect(landed).toBe(true);
    expect(s.mode).toBe(HERO_GROUNDED);
    expect(s.py).toBeCloseTo(1, 6);
    expect(s.pz).toBeGreaterThan(22);
  });

  it('(b) anchor 5 m under the roof edge: too low, dies on the wall above vCling', () => {
    const w = new World();
    addSolid(w, box(-5, 0, -10, 5, 10, 0));
    addSolid(w, box(-6, -10, 22, 6, 10, 30)); // building, front face z = 22
    addAnchor(w, 0, 5, 22);
    w.killPlaneY = -30;
    const s = hero(0, 10, -1, 1);
    fireAndAttach(s, w);
    let lastV = 0;
    for (let i = 0; i < 600 && s.dead === 0; i++) {
      if (s.mode === HERO_ATTACHED) lastV = s.hook.v;
      step(s, IDLE, w, cfg);
    }
    expect(s.dead).toBe(1);
    expect(s.mode).toBe(HERO_DEAD);
    expect(s.deadCause).toBe(DEAD_WALL);
    expect(lastV).toBeGreaterThan(cfg.wall.vCling);
  });

  it('(c) holding REEL lowers the arrival speed', () => {
    function arrival(brake: boolean): number {
      const w = twoRoofs();
      const s = hero(0, 10, -1, 1);
      fireAndAttach(s, w);
      let v = 0;
      for (let i = 0; i < 600 && s.mode === HERO_ATTACHED; i++) {
        v = s.hook.v;
        step(s, i >= 60 && i < 100 && brake ? frame(BTN_REEL, 0) : IDLE, w, cfg);
      }
      expect(s.dead).toBe(0);
      return v;
    }
    expect(arrival(true)).toBeLessThan(arrival(false) - 1);
  });

  it('(f) JUMP is ignored on the rope; DROP releases (T303)', () => {
    const w = twoRoofs();
    const s = hero(0, 10, -1, 1);
    fireAndAttach(s, w);
    run(s, w, 40);
    expect(s.mode).toBe(HERO_ATTACHED);
    step(s, frame(0, BTN_JUMP), w, cfg);
    expect(s.eventBits & HERO_EV_RELEASED).toBe(0);
    expect(s.mode).toBe(HERO_ATTACHED);
    step(s, frame(0, BTN_DROP), w, cfg);
    expect(s.eventBits & HERO_EV_RELEASED).toBe(HERO_EV_RELEASED);
    expect(s.mode).toBe(HERO_AIRBORNE);
  });

  it('auto-exits at the far anchor with the trolley velocity, no press needed (T298)', () => {
    const w = new World();
    addSolid(w, box(-5, 0, -10, 5, 10, 0)); // launch roof only: open air past the far anchor
    addAnchor(w, 0, 1, 26);
    w.killPlaneY = -30;
    const s = hero(0, 10, -1, 1);
    fireAndAttach(s, w);
    let exitedAt = -1;
    for (let i = 0; i < 900 && exitedAt < 0; i++) {
      const vBefore = s.hook.v;
      const dirY = s.hook.dirY;
      step(s, IDLE, w, cfg);
      if ((s.eventBits & HERO_EV_RELEASED) !== 0) {
        exitedAt = i;
        expect(s.mode).not.toBe(HERO_HANGING);
        expect(s.vy).toBeCloseTo(dirY * vBefore, 1);
      }
    }
    expect(exitedAt).toBeGreaterThan(0);
    expect(s.dead).toBe(0);
  });
});

describe('gameplay: momentum chain', () => {
  // High roof to land on, then a lower roof to hook.
  function chainWorld(): World {
    const w = new World();
    addSolid(w, box(-5, 0, -10, 5, 8, 12));
    addSolid(w, box(-5, -20, 34, 5, -2, 60));
    addAnchor(w, 0, -1.5, 34);
    w.killPlaneY = -30;
    return w;
  }
  // Lands with ~8 m/s forward, then fires `wait` ticks later; returns the rope v0.
  function chainV0(wait: number, landSpeed = 8): number {
    const w = chainWorld();
    const s = hero(0, 10, 2, 0); // lands close enough to the edge that the chord clears the roof
    s.vz = landSpeed;
    for (let i = 0; i < 300 && s.grounded === 0; i++) step(s, IDLE, w, cfg);
    expect(s.grounded).toBe(1);
    run(s, w, wait);
    aimAt(s, w, 0);
    step(s, frame(0, BTN_HOOK), w, cfg);
    expect(s.hook.anchorId).toBe(0);
    return s.hook.v;
  }

  it('(d) firing within 0.4 s of landing seeds v0 from the carried speed; once stopped it does not', () => {
    expect(chainV0(12)).toBeGreaterThan(cfg.rope.launchSpeed + 0.5);
    expect(chainV0(12)).toBeGreaterThan(chainV0(30)); // friction eats the carry after the window
    expect(chainV0(120)).toBeCloseTo(cfg.rope.launchSpeed, 9); // at rest: plain launch speed
  });
});

describe('gameplay: kill plane', () => {
  it('(e) falling below the kill plane kills with cause fell', () => {
    const w = new World();
    w.killPlaneY = -20;
    const s = hero(0, 0, 0, 0);
    run(s, w, 400);
    expect(s.dead).toBe(1);
    expect(s.deadCause).toBe(DEAD_FELL);
    const y = s.py;
    run(s, w, 10, frame(BTN_JUMP, BTN_JUMP));
    expect(s.py).toBe(y);
  });
});

describe('gameplay: grounded momentum seeds the rope', () => {
  function fireV0(vz: number): number {
    const w = twoRoofs();
    const s = hero(0, 10, -5, 1);
    s.vz = vz; // chainT is 0: not inside the chain window
    aimAt(s, w, 0);
    step(s, frame(0, BTN_HOOK), w, cfg);
    expect(s.hook.anchorId).toBe(0);
    return s.hook.v;
  }

  it('a run-up outside the chain window seeds v0 above launchSpeed; standing does not', () => {
    expect(fireV0(0)).toBeCloseTo(cfg.rope.launchSpeed, 9);
    expect(fireV0(cfg.hero.run)).toBeGreaterThan(cfg.rope.launchSpeed + 1.5);
    expect(fireV0(cfg.hero.run)).toBeLessThanOrEqual(cfg.hero.run);
  });

  it('a chain (carried speed above run speed) seeds more than a run-up', () => {
    // Lands on the high roof at 11 m/s (carryCap 12 keeps it), fires 0.2 s later.
    const w = new World();
    addSolid(w, box(-5, 0, -10, 5, 8, 12));
    addSolid(w, box(-5, -20, 38, 5, -2, 60));
    addAnchor(w, 0, -1.5, 38);
    w.killPlaneY = -30;
    const s = hero(0, 10, 0, 0);
    s.vz = 11;
    for (let i = 0; i < 300 && s.grounded === 0; i++) step(s, IDLE, w, cfg);
    expect(s.chainT).toBeGreaterThan(0);
    run(s, w, 12);
    aimAt(s, w, 0);
    step(s, frame(0, BTN_HOOK), w, cfg);
    expect(s.hook.anchorId).toBe(0);
    expect(s.hook.v).toBeGreaterThan(cfg.hero.run + 2);
  });

  it('an airborne shot seeds from carried speed only inside the chain window', () => {
    const fire = (chainT: number): number => {
      const w = twoRoofs();
      const s = hero(0, 10.5, -5, 0);
      s.vz = 11;
      s.chainT = chainT;
      aimAt(s, w, 0);
      step(s, frame(0, BTN_HOOK), w, cfg);
      expect(s.hook.anchorId).toBe(0);
      return s.hook.v;
    };
    expect(fire(0.2)).toBeGreaterThan(cfg.hero.run);
    expect(fire(0)).toBeCloseTo(cfg.rope.launchSpeed, 9);
  });

  it('with no input, speed bleeds at skidDecel in the chain window, then at friction', () => {
    const w = new World();
    addSolid(w, box(-5, 0, -10, 5, 8, 60));
    const s = hero(0, 8, 0, 1);
    s.vz = 12;
    s.chainT = 0.2;
    step(s, IDLE, w, cfg);
    expect(s.vz).toBeCloseTo(12 - cfg.landing.skidDecel / cfg.fixedHz, 9);
    s.chainT = 0;
    const before = s.vz;
    step(s, IDLE, w, cfg);
    expect(s.vz).toBeCloseTo(before - cfg.hero.friction / cfg.fixedHz, 9);
  });

  it('holding forward through the chain window keeps the carry; pulling back brakes hard', () => {
    const go = (moveY: number, chainT: number): number => {
      const w = new World();
      addSolid(w, box(-5, 0, -10, 5, 8, 60));
      const s = hero(0, 8, 0, 1);
      s.yaw = 0;
      s.camYaw = 0;
      s.vz = 12;
      s.chainT = chainT;
      const f = new InputFrame();
      f.moveY = moveY;
      step(s, f, w, cfg);
      return s.vz;
    };
    expect(go(AXIS_MAX, 0.2)).toBeCloseTo(12 - cfg.landing.skidDecel / cfg.fixedHz, 9);
    expect(go(AXIS_MAX, 0)).toBeCloseTo(12 - cfg.hero.accel / cfg.fixedHz, 9);
    expect(go(-AXIS_MAX, 0.2)).toBeCloseTo(12 - cfg.hero.accel / cfg.fixedHz, 9);
  });

  it('landing keeps horizontal speed up to carryCap', () => {
    const w = new World();
    addSolid(w, box(-5, 0, -10, 5, 8, 40));
    const s = hero(0, 8.3, 0, 0);
    s.vz = 20;
    let hs = 0;
    for (let i = 0; i < 60 && (s.eventBits & HERO_EV_LANDED) === 0; i++) {
      step(s, IDLE, w, cfg);
      hs = Math.hypot(s.vx, s.vz);
    }
    expect(s.grounded).toBe(1);
    expect(hs).toBeCloseTo(cfg.landing.carryCap, 6);
  });
});

describe('gameplay: timed release', () => {
  const span = (s: HeroState): number => s.hook.len - cfg.rope.trolleyStop;

  // Rides until the rope fraction reaches `frac`; stops one tick earlier when `before` is set.
  function rideTo(frac: number, before = false): { s: HeroState; w: World } {
    const w = twoRoofs();
    const s = hero(0, 10, -1, 1);
    fireAndAttach(s, w);
    for (let i = 0; i < 600 && s.hook.s / span(s) < frac; i++) {
      const snap = new HeroState();
      copyHeroState(snap, s);
      step(s, IDLE, w, cfg);
      if (before && s.hook.s / span(s) >= frac) {
        copyHeroState(s, snap);
        break;
      }
    }
    expect(s.mode).toBe(HERO_ATTACHED);
    return { s, w };
  }

  it('a hang JUMP is never timed', () => {
    const s = hero(0, 5, 0, 0);
    s.mode = HERO_HANGING;
    step(s, frame(0, BTN_JUMP), twoRoofs(), cfg);
    expect(s.eventBits & HERO_EV_PERFECT).toBe(0);
  });

  it('a timed release lands with up to carryCap + perfectBoost; a plain landing is capped at carryCap', () => {
    function landSpeed(perfect: number): number {
      const w = new World();
      addSolid(w, box(-5, 0, -10, 5, 8, 40));
      const s = hero(0, 8.3, 0, 0);
      s.vz = 20;
      s.perfect = perfect;
      let hs = 0;
      for (let i = 0; i < 60 && (s.eventBits & HERO_EV_LANDED) === 0; i++) {
        step(s, IDLE, w, cfg);
        hs = Math.hypot(s.vx, s.vz);
      }
      expect(s.grounded).toBe(1);
      expect(s.perfect).toBe(0); // consumed by the landing
      return hs;
    }
    expect(landSpeed(0)).toBeCloseTo(cfg.landing.carryCap, 6);
    expect(landSpeed(1)).toBeCloseTo(cfg.landing.carryCap + cfg.release.perfectBoost, 6);
  });

  it('firing a new rope forfeits the timed-release carry', () => {
    const { s, w } = rideTo(0.85);
    step(s, frame(0, BTN_DROP), w, cfg);
    s.perfect = 1;
    run(s, w, 10); // past the hook cooldown
    s.hookCd = 0;
    s.hookIntentT = 0;
    s.perfect = 1;
    const w2 = twoRoofs();
    s.px = 0;
    s.py = 10;
    s.pz = -1;
    s.vx = 0;
    s.vy = 0;
    s.vz = 0;
    s.grounded = 1;
    s.mode = HERO_GROUNDED;
    aimAt(s, w2, 0);
    step(s, frame(0, BTN_HOOK), w2, cfg);
    expect(s.perfect).toBe(0);
  });
});
