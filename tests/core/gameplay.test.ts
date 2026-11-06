import { describe, expect, it } from 'vitest';
import { DEFAULT_TUNING } from '../../src/core/config';
import {
  DEAD_FELL,
  DEAD_WALL,
  HERO_AIRBORNE,
  HERO_ATTACHED,
  HERO_DEAD,
  HERO_EV_RELEASED,
  HERO_GROUNDED,
  HeroState,
} from '../../src/core/hero';
import { BTN_HOOK, BTN_JUMP, BTN_REEL, InputFrame } from '../../src/core/input';
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
        step(s, i < 40 && brake ? frame(BTN_REEL, 0) : IDLE, w, cfg);
      }
      expect(s.dead).toBe(0);
      return v;
    }
    expect(arrival(true)).toBeLessThan(arrival(false) - 1);
  });

  it('(f) JUMP release flies forward and up', () => {
    const w = twoRoofs();
    const s = hero(0, 10, -1, 1);
    fireAndAttach(s, w);
    run(s, w, 40);
    expect(s.mode).toBe(HERO_ATTACHED);
    const chordVy = s.hook.dirY * s.hook.v;
    const chordVz = s.hook.dirZ * s.hook.v;
    step(s, frame(0, BTN_JUMP), w, cfg);
    expect(s.eventBits & HERO_EV_RELEASED).toBe(HERO_EV_RELEASED);
    expect(s.mode).toBe(HERO_AIRBORNE);
    expect(s.vy).toBeCloseTo(chordVy + cfg.release.jumpUp, 6);
    expect(s.vz).toBeGreaterThan(chordVz);
    expect(s.vy).toBeGreaterThan(chordVy);
  });
});

describe('gameplay: momentum chain', () => {
  // High roof to land on, then a lower roof to hook.
  function chainWorld(): World {
    const w = new World();
    addSolid(w, box(-5, 0, -10, 5, 8, 12));
    addSolid(w, box(-5, -20, 38, 5, -2, 60));
    addAnchor(w, 0, -1.5, 38);
    w.killPlaneY = -30;
    return w;
  }
  // Lands with ~8 m/s forward, then fires `wait` ticks later; returns the rope v0.
  function chainV0(wait: number): number {
    const w = chainWorld();
    const s = hero(0, 10, 0, 0);
    s.vz = 8;
    for (let i = 0; i < 300 && s.grounded === 0; i++) step(s, IDLE, w, cfg);
    expect(s.grounded).toBe(1);
    run(s, w, wait);
    aimAt(s, w, 0);
    step(s, frame(0, BTN_HOOK), w, cfg);
    expect(s.hook.anchorId).toBe(0);
    return s.hook.v;
  }

  it('(d) firing within 0.4 s of landing seeds v0; after 0.5 s it does not', () => {
    expect(chainV0(12)).toBeGreaterThan(cfg.rope.launchSpeed + 0.5);
    expect(chainV0(30)).toBeCloseTo(cfg.rope.launchSpeed, 9);
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
