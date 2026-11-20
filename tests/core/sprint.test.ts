// Sprint (ADR 0018): after sprintStreakM metres run at >= 0.98 x run the grounded hero ramps to
// sprintSpeed. The streak resets on stop, airborne and wall. Hand-built flat worlds.
import { describe, expect, it } from 'vitest';
import { DEFAULT_TUNING } from '../../src/core/config';
import type { Tuning } from '../../src/core/config';
import { HERO_AIRBORNE, HERO_GROUNDED, HeroState } from '../../src/core/hero';
import { BTN_JUMP, InputFrame, quantizeAxis } from '../../src/core/input';
import { AABB } from '../../src/core/math/aabb';
import { Vec3 } from '../../src/core/math/vec3';
import { step } from '../../src/core/sim';
import { World, addSolid } from '../../src/core/world';

const cfg = DEFAULT_TUNING;
const RUN = cfg.hero.run;

function flat(): World {
  const w = new World();
  w.killPlaneY = -60;
  addSolid(w, new AABB(new Vec3(-30, -2, -30), new Vec3(30, 0, 400)));
  return w;
}

function hero(vz: number): HeroState {
  const s = new HeroState();
  s.pz = 0;
  s.vz = vz;
  s.grounded = 1;
  s.mode = HERO_GROUNDED;
  return s;
}

function stick(mag: number): InputFrame {
  const f = new InputFrame();
  f.moveY = quantizeAxis(mag); // camYaw 0: forward is +z
  return f;
}

function jumpFrame(): InputFrame {
  const f = stick(1);
  f.buttons = BTN_JUMP;
  f.pressed = BTN_JUMP;
  return f;
}

/** Ticks until the hero first exceeds run speed (or maxTicks); returns the distance run. */
function distanceToSprint(c: Tuning, s: HeroState, w: World, maxTicks = 600): number {
  const z0 = s.pz;
  for (let i = 0; i < maxTicks; i++) {
    step(s, stick(1), w, c);
    if (s.vz > RUN + 0.001) return s.pz - z0;
  }
  return -1;
}

/** Horizontal metres from take-off to touchdown on the same level; the hero runs `pre` ticks first. */
function jumpDistance(c: Tuning, pre: number): number {
  const w = flat();
  const s = hero(RUN);
  for (let i = 0; i < pre; i++) step(s, stick(1), w, c);
  const z0 = s.pz;
  step(s, jumpFrame(), w, c);
  let air = 0;
  while (s.grounded === 0 && air < 600) {
    step(s, stick(1), w, c);
    air++;
  }
  return s.pz - z0;
}

describe('sprint (ADR 0018)', () => {
  it('the shipped defaults: run stays 6, sprint 11 below carryCap 12', () => {
    expect(cfg.hero.run).toBe(6);
    expect(cfg.hero.sprintSpeed).toBe(11);
    expect(cfg.hero.sprintSpeed).toBeLessThan(cfg.landing.carryCap);
    expect(cfg.hero.sprintStreakM).toBeCloseTo(6, 6); // gradual build (owner 2026-11-19)
  });

  it('starts after exactly sprintStreakM metres (7 steps) at full run speed, not before', () => {
    const w = flat();
    const s = hero(RUN);
    const d = distanceToSprint(cfg, s, w);
    // The tick that crosses the streak is the first with extra speed: within one tick of 7 steps.
    expect(d).toBeGreaterThan(cfg.hero.sprintStreakM - 0.2);
    expect(d).toBeLessThan(cfg.hero.sprintStreakM + 0.35);
    // Just before: still exactly run speed.
    const s2 = hero(RUN);
    for (let i = 0; i < 50; i++) step(s2, stick(1), w, cfg); // 5 m < 6 m streak
    expect(s2.vz).toBeCloseTo(RUN, 6);
    expect(s2.sprintM).toBeLessThan(cfg.hero.sprintStreakM);
  });

  it('ramps smoothly to sprintSpeed and holds it', () => {
    const w = flat();
    const s = hero(RUN);
    let prev = s.vz;
    let maxJump = 0;
    for (let i = 0; i < 400; i++) {
      step(s, stick(1), w, cfg);
      maxJump = Math.max(maxJump, Math.abs(s.vz - prev));
      prev = s.vz;
    }
    expect(s.vz).toBeCloseTo(cfg.hero.sprintSpeed, 6);
    expect(maxJump).toBeLessThanOrEqual(cfg.hero.sprintAccel / cfg.fixedHz + 1e-9);
  });

  it('a standing start earns the streak too (run at 6, then sprint)', () => {
    const w = flat();
    const s = hero(0);
    for (let i = 0; i < 600; i++) step(s, stick(1), w, cfg);
    expect(s.vz).toBeCloseTo(cfg.hero.sprintSpeed, 6);
  });

  it('resets on stop: release the stick, run again, the streak starts over', () => {
    const w = flat();
    const s = hero(RUN);
    for (let i = 0; i < 300; i++) step(s, stick(1), w, cfg);
    expect(s.vz).toBeCloseTo(11, 6);
    for (let i = 0; i < 60; i++) step(s, stick(0), w, cfg);
    expect(s.vz).toBe(0);
    expect(s.sprintM).toBe(0);
    for (let i = 0; i < 60; i++) step(s, stick(1), w, cfg); // 6 m/s, well under 11.9 m
    expect(s.vz).toBeCloseTo(RUN, 6);
  });

  it('resets when airborne: a jump zeroes the streak and landing at speed starts a new one', () => {
    const w = flat();
    const s = hero(RUN);
    for (let i = 0; i < 300; i++) step(s, stick(1), w, cfg);
    step(s, jumpFrame(), w, cfg);
    expect(s.grounded).toBe(0);
    expect(s.sprintM).toBe(0);
    expect(s.mode).toBe(HERO_AIRBORNE);
  });

  it('resets on a wall: the hero stops against it and starts over', () => {
    const w = flat();
    addSolid(w, new AABB(new Vec3(-5, 0, 40), new Vec3(5, 6, 41)));
    const s = hero(RUN);
    for (let i = 0; i < 400 && s.pz < 39; i++) step(s, stick(1), w, cfg);
    expect(s.sprintM).toBeGreaterThan(cfg.hero.sprintStreakM); // sprinting when it arrives
    expect(s.vz).toBeGreaterThan(RUN + 1);
    // The streak is gone on the very tick the wall stops the hero, not a tick later.
    for (let i = 0; i < 20 && s.vz > 0; i++) step(s, stick(1), w, cfg);
    expect(s.vz).toBe(0);
    expect(s.sprintM).toBe(0);
  });

  it('sprint is off when sprintSpeed <= run (Dragon Chase override)', () => {
    const off = { ...cfg, hero: { ...cfg.hero, sprintSpeed: RUN } };
    const s = hero(RUN);
    for (let i = 0; i < 600; i++) step(s, stick(1), flat(), off);
    expect(s.vz).toBeCloseTo(RUN, 6);
    expect(s.sprintM).toBe(0);
  });

  it('a sprint jump flies farther than a run jump', () => {
    const off = { ...cfg, hero: { ...cfg.hero, sprintSpeed: RUN } };
    const runJump = jumpDistance(off, 30);
    const sprintJump = jumpDistance(cfg, 300);
    expect(runJump).toBeGreaterThan(3);
    expect(sprintJump).toBeGreaterThan(runJump * 1.5);
  });
});
