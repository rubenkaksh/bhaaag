import { describe, expect, it } from 'vitest';
import { DEFAULT_TUNING } from '../../src/core/config';
import { HeroState, HERO_GROUNDED, copyHeroState } from '../../src/core/hero';
import { BTN_JUMP, InputFrame, quantizeAxis } from '../../src/core/input';
import { AABB } from '../../src/core/math/aabb';
import { Vec3 } from '../../src/core/math/vec3';
import { step } from '../../src/core/sim';
import { World, addRamp, addSolid } from '../../src/core/world';

const cfg = DEFAULT_TUNING;

function box(x0: number, y0: number, z0: number, x1: number, y1: number, z1: number): AABB {
  return new AABB(new Vec3(x0, y0, z0), new Vec3(x1, y1, z1));
}

function floorWorld(): World {
  const w = new World();
  addSolid(w, box(-50, -1, -50, 50, 0, 50));
  w.killPlaneY = -20;
  return w;
}

function spawn(x: number, y: number, z: number, grounded: number): HeroState {
  const s = new HeroState();
  s.px = x;
  s.py = y;
  s.pz = z;
  s.grounded = grounded;
  return s;
}

function fwd(): InputFrame {
  const f = new InputFrame();
  f.moveY = quantizeAxis(1);
  return f;
}

function run(s: HeroState, f: InputFrame, w: World, n: number): void {
  for (let i = 0; i < n; i++) step(s, f, w, cfg);
}

describe('hero grounded controller', () => {
  it('stands still on ground', () => {
    const w = floorWorld();
    const s = spawn(0, 0, 0, 1);
    run(s, new InputFrame(), w, 120);
    expect(s.px).toBe(0);
    expect(s.py).toBe(0);
    expect(s.pz).toBe(0);
    expect(s.mode).toBe(HERO_GROUNDED);
  });

  it('settles onto ground when dropped', () => {
    const w = floorWorld();
    const s = spawn(0, 2, 0, 0);
    run(s, new InputFrame(), w, 120);
    expect(s.grounded).toBe(1);
    expect(s.py).toBe(0);
  });

  it('walks 6 m/s forward', () => {
    const w = floorWorld();
    const s = spawn(0, 0, 0, 1);
    run(s, fwd(), w, 60);
    const z0 = s.pz;
    run(s, fwd(), w, 60);
    expect(s.pz - z0).toBeCloseTo(cfg.hero.run, 2);
    expect(s.px).toBeCloseTo(0, 6);
  });

  it('jump apex matches v^2 / 2g', () => {
    const w = floorWorld();
    const s = spawn(0, 0, 0, 1);
    const j = new InputFrame();
    j.pressed = BTN_JUMP;
    j.buttons = BTN_JUMP;
    step(s, j, w, cfg);
    let apex = s.py;
    for (let i = 0; i < 120; i++) {
      step(s, new InputFrame(), w, cfg);
      if (s.py > apex) apex = s.py;
    }
    const expected = (cfg.hero.jump * cfg.hero.jump) / (2 * cfg.physics.g);
    expect(Math.abs(apex - expected) / expected).toBeLessThan(0.05);
    expect(s.grounded).toBe(1);
  });

  it('cannot walk through a wall', () => {
    const w = floorWorld();
    addSolid(w, box(-5, 0, 3, 5, 3, 4));
    const s = spawn(0, 0, 0, 1);
    run(s, fwd(), w, 240);
    expect(s.pz).toBeLessThanOrEqual(3 - cfg.hero.radius);
    expect(s.pz).toBeGreaterThan(2);
  });

  it('steps up a low ledge', () => {
    const w = floorWorld();
    addSolid(w, box(-5, 0, 2, 5, 0.3, 40));
    const s = spawn(0, 0, 0, 1);
    run(s, fwd(), w, 120);
    expect(s.pz).toBeGreaterThan(3);
    expect(s.py).toBeCloseTo(0.3, 6);
  });

  it('is blocked by a high ledge', () => {
    const w = floorWorld();
    addSolid(w, box(-5, 0, 2, 5, 1, 10));
    const s = spawn(0, 0, 0, 1);
    run(s, fwd(), w, 120);
    expect(s.pz).toBeLessThanOrEqual(2 - cfg.hero.radius);
    expect(s.py).toBe(0);
  });

  it('walks up a ramp', () => {
    const w = floorWorld();
    addRamp(w, box(-2, 0, 2, 2, 2, 12), 2, 2);
    const s = spawn(0, 0, 0, 1);
    run(s, fwd(), w, 120);
    expect(s.pz).toBeGreaterThan(4);
    const expectedY = ((s.pz - 2) / 10) * 2;
    expect(s.py).toBeCloseTo(expectedY, 6);
    expect(s.grounded).toBe(1);
  });

  it('walks off an edge and falls', () => {
    const w = new World();
    addSolid(w, box(-5, -1, -5, 5, 0, 2));
    w.killPlaneY = -50;
    const s = spawn(0, 0, 0, 1);
    run(s, fwd(), w, 60);
    expect(s.grounded).toBe(0);
    expect(s.py).toBeLessThan(0);
    expect(s.vy).toBeLessThan(0);
  });

  // Finding 1 (BLOCKER): walking off a platform onto a floor below must not wedge.
  it('walks off a platform onto the floor and keeps running', () => {
    const w = new World();
    addSolid(w, box(-50, -1, -50, 50, 0, 50)); // floor
    addSolid(w, box(-3, 0, -4, 3, 3, 1)); // 3 m platform, edge at z=1
    w.killPlaneY = -20;
    const s = spawn(0, 3, -2, 1);
    run(s, fwd(), w, 240);
    expect(s.dead).toBe(0);
    expect(s.grounded).toBe(1);
    expect(s.mode).toBe(HERO_GROUNDED);
    expect(s.py).toBe(0);
    expect(s.pz).toBeGreaterThan(2); // fully clear of the edge volume
    const pz0 = s.pz;
    run(s, fwd(), w, 60);
    expect(s.pz).toBeGreaterThan(pz0 + 1); // pz keeps increasing under forward input
    expect(s.grounded).toBe(1);
  });

  // Finding 5 (MAJOR): ramps must block like walls from the side...
  it('cannot walk through a ramp from the side', () => {
    const w = floorWorld();
    addRamp(w, box(-2, 0, 2, 2, 2, 12), 2, 2);
    const s = spawn(4, 0, 6, 1);
    s.camYaw = -Math.PI / 2; // forward = -x, into the ramp's long side at x=2
    run(s, fwd(), w, 240);
    expect(s.px).toBeGreaterThan(2); // never inside the wedge
    expect(s.px).toBeLessThan(2.5); // stopped at the side (+ radius)
    expect(s.py).toBe(0); // did not climb
    expect(s.grounded).toBe(1);
  });

  // ...or from the high end.
  it('cannot walk into a ramp from the high end', () => {
    const w = floorWorld();
    addRamp(w, box(-2, 0, 2, 2, 2, 12), 2, 2);
    const s = spawn(0, 0, 14, 1);
    s.camYaw = Math.PI; // forward = -z, into the high (2 m) end at z=12
    run(s, fwd(), w, 240);
    expect(s.pz).toBeGreaterThan(12); // never inside the wedge
    expect(s.pz).toBeLessThan(12.5); // stopped at the high end (+ radius)
    expect(s.py).toBe(0);
    expect(s.grounded).toBe(1);
  });

  // Finding 7 (MINOR): jumping while the capsule rim is inside a low ledge's
  // expanded volume must not zero horizontal velocity.
  it('jumping near a ledge does not freeze horizontal speed', () => {
    const w = floorWorld();
    addSolid(w, box(-5, 0, -5, 5, 0.3, 0)); // 0.3 m ledge, edge at z=0
    const s = new HeroState();
    s.px = 0;
    s.py = 0;
    s.pz = 0.1; // feet below the ledge top, rim inside its footprint
    s.grounded = 0;
    s.vz = cfg.hero.run;
    s.vy = cfg.hero.jump;
    run(s, new InputFrame(), w, 15);
    expect(s.vz).toBeGreaterThan(cfg.hero.run * 0.9); // not zeroed by the penetrating hit
    expect(s.pz).toBeGreaterThan(0.5);
    expect(s.py).toBeGreaterThan(0.3); // rose past the ledge, vy not zeroed
  });

  it('kill plane sets dead', () => {
    const w = new World();
    addSolid(w, box(-5, -1, -5, 5, 0, 2));
    w.killPlaneY = -10;
    const s = spawn(0, 0, 0, 1);
    run(s, fwd(), w, 300);
    expect(s.dead).toBe(1);
  });

  it('is deterministic', () => {
    const w = floorWorld();
    addSolid(w, box(-5, 0, 6, 5, 0.3, 7));
    const a = spawn(0, 0, 0, 1);
    const b = spawn(0, 0, 0, 1);
    const f = fwd();
    f.lookYaw = 7;
    for (let i = 0; i < 300; i++) {
      f.pressed = i % 50 === 0 ? BTN_JUMP : 0;
      step(a, f, w, cfg);
      step(b, f, w, cfg);
    }
    expect(JSON.stringify(a)).toBe(JSON.stringify(b));
  });

  it('snapshot/restore round-trips', () => {
    const w = floorWorld();
    const s = spawn(0, 0, 0, 1);
    run(s, fwd(), w, 30);
    const snap = new HeroState();
    copyHeroState(snap, s);
    run(s, fwd(), w, 30);
    const later = JSON.stringify(s);
    copyHeroState(s, snap);
    expect(JSON.stringify(s)).toBe(JSON.stringify(snap));
    run(s, fwd(), w, 30);
    expect(JSON.stringify(s)).toBe(later);
  });
});
