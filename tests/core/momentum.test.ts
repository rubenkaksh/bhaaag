// Smooth run-up (hero.runAccel) and kept momentum (landing.carryDecay), owner 2026-11-18. Flat hand-built world.
import { describe, expect, it } from 'vitest';
import { DEFAULT_TUNING } from '../../src/core/config';
import type { Tuning } from '../../src/core/config';
import { HERO_AIRBORNE, HERO_GROUNDED, HeroState } from '../../src/core/hero';
import { InputFrame, quantizeAxis } from '../../src/core/input';
import { AABB } from '../../src/core/math/aabb';
import { Vec3 } from '../../src/core/math/vec3';
import { step } from '../../src/core/sim';
import { World, addSolid } from '../../src/core/world';

const cfg = DEFAULT_TUNING;
const HZ = 60;

function flat(): World {
  const w = new World();
  w.killPlaneY = -60;
  addSolid(w, new AABB(new Vec3(-30, -2, -30), new Vec3(30, 0, 900)));
  return w;
}

function runner(vz: number): HeroState {
  const s = new HeroState();
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

const speed = (s: HeroState): number => Math.hypot(s.vx, s.vz);

function ticksToRun(c: Tuning): number {
  const w = flat();
  const s = runner(0);
  for (let i = 1; i <= 600; i++) {
    step(s, stick(1), w, c);
    if (speed(s) >= c.hero.run - 1e-6) return i;
  }
  return -1;
}

describe('hero.runAccel: gradual run-up', () => {
  it('ships a smooth ramp below the steering accel', () => {
    expect(cfg.hero.runAccel).toBeGreaterThan(0);
    expect(cfg.hero.runAccel).toBeLessThan(cfg.hero.accel);
  });

  it('0 to run takes about run / runAccel seconds, longer than the old abrupt start', () => {
    const smooth = ticksToRun(cfg) / HZ;
    const abrupt = ticksToRun({ ...cfg, hero: { ...cfg.hero, runAccel: cfg.hero.accel } }) / HZ;
    expect(smooth).toBeGreaterThan(cfg.hero.run / cfg.hero.runAccel - 0.05);
    expect(smooth).toBeLessThan(cfg.hero.run / cfg.hero.runAccel + 0.05);
    expect(abrupt).toBeLessThan(smooth / 2);
  });

  it('speed rises every tick (no jump) and is deterministic', () => {
    const trace = (): number[] => {
      const w = flat();
      const s = runner(0);
      const out: number[] = [];
      for (let i = 0; i < 90; i++) {
        step(s, stick(1), w, cfg);
        out.push(speed(s));
      }
      return out;
    };
    const a = trace();
    expect(a).toEqual(trace());
    for (let i = 1; i < a.length; i++) {
      expect(a[i]).toBeGreaterThanOrEqual(a[i - 1] - 1e-9);
      expect(a[i] - a[i - 1]).toBeLessThan(0.5); // never a sudden kick
    }
  });

  it('braking and a stick release keep the hard accel/friction', () => {
    const w = flat();
    const s = runner(6);
    for (let i = 0; i < 30; i++) step(s, stick(0), w, cfg);
    expect(speed(s)).toBe(0);
  });
});

describe('landing.carryDecay: momentum is kept', () => {
  it('ships 0 (no decay) and the cap stays 12 (ADR 0018)', () => {
    expect(cfg.landing.carryDecay).toBe(0);
    expect(cfg.landing.carryCap).toBe(12);
  });

  it('a hero above run speed keeps it with the stick held, until it chooses to stop', () => {
    const w = flat();
    const s = runner(10);
    for (let i = 0; i < 4 * HZ; i++) step(s, stick(1), w, cfg);
    expect(speed(s)).toBeGreaterThanOrEqual(10 - 1e-6);
    for (let i = 0; i < HZ; i++) step(s, stick(0), w, cfg);
    expect(speed(s)).toBe(0);
  });

  it('carryDecay > 0 bleeds the extra speed down to run at that rate', () => {
    const w = flat();
    const c: Tuning = {
      ...cfg,
      landing: { ...cfg.landing, carryDecay: 4 },
      hero: { ...cfg.hero, sprintSpeed: cfg.hero.run },
    };
    const s = runner(10);
    for (let i = 0; i < HZ; i++) step(s, stick(1), w, c);
    expect(speed(s)).toBeLessThan(6.5);
    expect(speed(s)).toBeGreaterThanOrEqual(c.hero.run - 1e-6);
  });

  it('landing from a fast rope release keeps the carry up to carryCap and no more', () => {
    const w = flat();
    const s = new HeroState();
    s.py = 0.3;
    s.vz = 20;
    s.vy = -1;
    s.mode = HERO_AIRBORNE;
    s.grounded = 0;
    for (let i = 0; i < 3 * HZ; i++) {
      step(s, stick(1), w, cfg);
      if (s.grounded === 1) expect(speed(s)).toBeLessThanOrEqual(cfg.landing.carryCap + 1e-6);
    }
    expect(s.grounded).toBe(1);
    expect(speed(s)).toBeGreaterThan(cfg.hero.sprintSpeed);
    expect(speed(s)).toBeLessThanOrEqual(cfg.landing.carryCap + 1e-6);
  });
});
