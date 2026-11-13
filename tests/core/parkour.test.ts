// Parkour moves (ADR 0013): auto-vault, airborne step-up, ledge grab + auto-mantle, landing slide.
// Hand-built tiny worlds; every move is inert at world.parkour 0.
import { describe, expect, it } from 'vitest';
import { DEFAULT_TUNING } from '../../src/core/config';
import {
  DEAD_HARD_LANDING,
  HERO_AIRBORNE,
  HERO_EV_MANTLE,
  HERO_EV_ROLLED,
  HERO_EV_SLIDE,
  HERO_EV_VAULT,
  HERO_GROUNDED,
  HERO_HANGING,
  HERO_VAULT,
  HeroState,
} from '../../src/core/hero';
import { BTN_JUMP, InputFrame, quantizeAxis } from '../../src/core/input';
import { AABB } from '../../src/core/math/aabb';
import { Vec3 } from '../../src/core/math/vec3';
import { step } from '../../src/core/sim';
import { World, addSolid } from '../../src/core/world';

const cfg = DEFAULT_TUNING;

function box(x0: number, y0: number, z0: number, x1: number, y1: number, z1: number): AABB {
  return new AABB(new Vec3(x0, y0, z0), new Vec3(x1, y1, z1));
}

function world(parkour: number): World {
  const w = new World();
  w.parkour = parkour;
  w.climb = 1;
  w.killPlaneY = -60;
  addSolid(w, box(-30, -2, -30, 30, 0, 30));
  return w;
}

function hero(x: number, y: number, z: number, grounded: number, vz = 0): HeroState {
  const s = new HeroState();
  s.px = x;
  s.py = y;
  s.pz = z;
  s.vz = vz;
  s.grounded = grounded;
  s.mode = grounded === 1 ? HERO_GROUNDED : HERO_AIRBORNE;
  return s;
}

function stick(mag: number): InputFrame {
  const f = new InputFrame();
  f.moveY = quantizeAxis(mag); // camYaw 0: forward is +z
  return f;
}

// Runs n ticks with the same input; returns the OR of every tick's event bits.
function run(s: HeroState, w: World, f: InputFrame, n: number): number {
  let ev = 0;
  for (let i = 0; i < n; i++) {
    step(s, f, w, cfg);
    ev |= s.eventBits;
  }
  return ev;
}

// Run-up to an obstacle at z = 5: the hero starts 3 m back at run speed.
function runUp(w: World): { s: HeroState; ev: number } {
  const s = hero(0, 0, 2, 1, 6);
  const ev = run(s, w, stick(1), 90);
  return { s, ev };
}

describe('auto-vault (ADR 0013 s2.1)', () => {
  it('vaults a 0.45 parapet at run speed and ends past it', () => {
    const w = world(1);
    addSolid(w, box(-4, 0, 5, 4, 0.45, 5.25));
    const { s, ev } = runUp(w);
    expect(ev & HERO_EV_VAULT).toBe(HERO_EV_VAULT);
    expect(s.dead).toBe(0);
    expect(s.pz).toBeGreaterThan(5.25);
  });

  it('is in HERO_VAULT for vault.sec and keeps 90 % of the entry speed', () => {
    const w = world(1);
    addSolid(w, box(-4, 0, 5, 4, 0.45, 5.25));
    const s = hero(0, 0, 2, 1, 6);
    let ticks = 0;
    let vz = 0;
    for (let i = 0; i < 90; i++) {
      step(s, stick(1), w, cfg);
      if (s.mode === HERO_VAULT) {
        ticks++;
        vz = s.vz;
      }
    }
    expect(ticks).toBeGreaterThanOrEqual(Math.floor(cfg.vault.sec * cfg.fixedHz) - 1);
    expect(vz).toBeCloseTo(6 * cfg.vault.keep, 0);
  });

  it('is inert at parkour 0: the parapet stops the hero', () => {
    const w = world(0);
    addSolid(w, box(-4, 0, 5, 4, 0.45, 5.25));
    const { s, ev } = runUp(w);
    expect(ev & HERO_EV_VAULT).toBe(0);
    expect(s.pz).toBeLessThan(5);
  });

  it('does not vault from a standing start (walking pace stops at a parapet)', () => {
    const w = world(1);
    addSolid(w, box(-4, 0, 5, 4, 0.45, 5.25));
    const s = hero(0, 0, 4.6, 1, 0);
    const ev = run(s, w, stick(1), 60);
    expect(ev & HERO_EV_VAULT).toBe(0);
    expect(s.pz).toBeLessThan(5);
  });

  it('does not vault without the stick held', () => {
    const w = world(1);
    addSolid(w, box(-4, 0, 5, 4, 0.45, 5.25));
    const s = hero(0, 0, 3.5, 1, 6);
    const ev = run(s, w, new InputFrame(), 60);
    expect(ev & HERO_EV_VAULT).toBe(0);
    expect(s.pz).toBeLessThan(5);
  });

  it('does not vault a 1.2 m parapet', () => {
    const w = world(1);
    addSolid(w, box(-4, 0, 5, 4, 1.2, 5.25));
    const { s, ev } = runUp(w);
    expect(ev & HERO_EV_VAULT).toBe(0);
    expect(s.pz).toBeLessThan(5);
  });

  it('vaults onto a 0.9 crate and stands on it with the chain window open', () => {
    const w = world(1);
    addSolid(w, box(-1, 0, 5, 1, 0.9, 5.9));
    const s = hero(0, 0, 2, 1, 6);
    let ev = 0;
    let chain = 0;
    let topY = 0;
    for (let i = 0; i < 90; i++) {
      step(s, stick(1), w, cfg);
      ev |= s.eventBits;
      if (topY === 0 && s.mode === HERO_GROUNDED && s.py > 0.8) {
        chain = s.chainT;
        topY = s.py;
      }
    }
    expect(ev & HERO_EV_VAULT).toBe(HERO_EV_VAULT);
    expect(chain).toBeGreaterThan(0);
    expect(topY).toBeCloseTo(0.9, 2);
    expect(s.dead).toBe(0);
  });

  it('refuses to vault into a lethal drop: the parapet blocks like a wall', () => {
    const w = world(1);
    addSolid(w, box(-4, 0, -10, 4, 12, 5.25)); // roof deck at 12, ground at 0 beyond
    addSolid(w, box(-4, 12, 5, 4, 12.45, 5.25)); // parapet
    const s = hero(0, 12, 2, 1, 6);
    let ev = 0;
    for (let i = 0; i < 200; i++) {
      step(s, stick(1), w, cfg);
      ev |= s.eventBits;
    }
    expect(ev & HERO_EV_VAULT).toBe(0);
    expect(s.dead).toBe(0);
    expect(s.py).toBeCloseTo(12, 2);
  });

  it('refuses to vault a balcony rail over a hazard band', () => {
    const w = world(1);
    addSolid(w, box(-4, 0, -10, 4, 3, 5.25)); // deck at 3
    addSolid(w, box(-4, 3, 5, 4, 3.9, 5.05)); // 0.9 m rail
    w.hazards.push(box(-30, -5, 5.1, 30, 1, 30)); // gully just beyond the rail
    const s = hero(0, 3, 2, 1, 6);
    let ev = 0;
    for (let i = 0; i < 150; i++) {
      step(s, stick(1), w, cfg);
      ev |= s.eventBits;
    }
    expect(ev & HERO_EV_VAULT).toBe(0);
    expect(s.dead).toBe(0);
  });

  it('still vaults a drop onto a surface it survives', () => {
    const w = world(1);
    addSolid(w, box(-4, 0, -10, 4, 1.5, 5.25)); // deck at 1.5, ground at 0 beyond
    addSolid(w, box(-4, 1.5, 5, 4, 1.95, 5.25)); // parapet
    const s = hero(0, 1.5, 2, 1, 6);
    let ev = 0;
    for (let i = 0; i < 150; i++) {
      step(s, stick(1), w, cfg);
      ev |= s.eventBits;
    }
    expect(ev & HERO_EV_VAULT).toBe(HERO_EV_VAULT);
    expect(s.dead).toBe(0);
  });
});

describe('airborne step-up (ADR 0013 s2.1)', () => {
  it('lifts a falling hero that clips a parapet onto its top', () => {
    const w = world(1);
    addSolid(w, box(-4, 0, 5, 4, 0.45, 5.25));
    const s = hero(0, 0.15, 4.4, 0, 5);
    s.vy = -1;
    let topY = 0;
    for (let i = 0; i < 30 && topY === 0; i++) {
      step(s, stick(1), w, cfg);
      if (s.grounded === 1 && s.py > 0.4) topY = s.py;
    }
    expect(s.dead).toBe(0);
    expect(topY).toBeCloseTo(0.45, 2);
  });

  it('does not lift the hero into an overhang above the ledge (review S5)', () => {
    const w = world(1);
    addSolid(w, box(-4, 0, 5, 4, 0.45, 5.25));
    addSolid(w, box(-4, 2.0, 3, 4, 2.3, 6)); // low ceiling: standing on the ledge would clip it
    const s = hero(0, 0.15, 4.4, 0, 5);
    s.vy = -1;
    for (let i = 0; i < 30; i++) {
      step(s, stick(1), w, cfg);
      expect(s.grounded === 1 && s.py > 0.4).toBe(false);
    }
    expect(s.dead).toBe(0);
  });

  it('is inert at parkour 0', () => {
    const w = world(0);
    addSolid(w, box(-4, 0, 5, 4, 0.45, 5.25));
    const s = hero(0, 0.15, 4.4, 0, 5);
    s.vy = -1;
    run(s, w, stick(1), 30);
    expect(s.pz).toBeLessThan(5);
  });
});

describe('ledge grab and auto-mantle (ADR 0013 s2.2)', () => {
  // Wall face at z = 5, top at 2.0 (1.5 above the airborne hero's feet at 0.5).
  function wallWorld(pk: number): World {
    const w = world(pk);
    addSolid(w, box(-4, 0, 5, 4, 2, 6));
    return w;
  }

  it('grabs from 0.2 m away with the 0.3 probe, not at parkour 0 (0.08 probe)', () => {
    const z = 5 - cfg.hero.radius - 0.2;
    const a = hero(0, 0.5, z, 0);
    run(a, wallWorld(1), stick(1), 4);
    expect(a.mode).toBe(HERO_HANGING);
    const b = hero(0, 0.5, z, 0);
    run(b, wallWorld(0), stick(1), 4);
    expect(b.mode).not.toBe(HERO_HANGING);
  });

  it('auto-mantles by stick after autoMantleSec, with no CLIMB button', () => {
    const w = wallWorld(1);
    const s = hero(0, 0.5, 5 - cfg.hero.radius - 0.05, 0);
    run(s, w, stick(1), 2);
    expect(s.mode).toBe(HERO_HANGING);
    run(s, w, stick(1), Math.floor(cfg.parkour.autoMantleSec * cfg.fixedHz) - 3);
    expect(s.mode).toBe(HERO_HANGING);
    const ev = run(s, w, stick(1), 8);
    expect(ev & HERO_EV_MANTLE).toBe(HERO_EV_MANTLE);
    expect(s.mode).toBe(HERO_GROUNDED);
    expect(s.py).toBeCloseTo(2, 3);
  });

  it('does not auto-mantle at parkour 0', () => {
    const w = wallWorld(0);
    const s = hero(0, 0.5, 5 - cfg.hero.radius - 0.05, 0);
    run(s, w, stick(1), 60);
    expect(s.mode).not.toBe(HERO_GROUNDED);
  });
});

describe('roll and slide on landing (ADR 0013 s2.3)', () => {
  // A low bar (bottom 1.2, top 1.5) across the lane at z 4..zEnd.
  function barWorld(pk: number, zEnd = 4.2): World {
    const w = world(pk);
    addSolid(w, box(-4, 1.2, 4, 4, 1.5, zEnd));
    return w;
  }

  it('a clean fast landing with the stick forward slides under a 1.2 m bar, then stops', () => {
    const w = barWorld(1);
    const s = hero(0, 0.3, 0, 0, 7.5);
    const ev = run(s, w, stick(1), 40);
    expect(ev & HERO_EV_SLIDE).toBe(HERO_EV_SLIDE);
    expect(s.pz).toBeGreaterThan(4.2);
    expect(s.dead).toBe(0);
    run(s, w, new InputFrame(), 120);
    expect(s.slideT).toBe(0);
    expect(Math.hypot(s.vx, s.vz)).toBe(0);
  });

  it('the same landing is stopped by the bar at parkour 0', () => {
    const w = barWorld(0);
    const s = hero(0, 0.3, 0, 0, 7.5);
    const ev = run(s, w, stick(1), 60);
    expect(ev & HERO_EV_SLIDE).toBe(0);
    expect(s.pz).toBeLessThan(4);
  });

  it('the slide extends under a long low ceiling, holding at least minKeep', () => {
    const w = barWorld(1, 8);
    const s = hero(0, 0.3, 0, 0, 7.5);
    run(s, w, stick(1), 30);
    let minSp = 99;
    let slidingUnder = false;
    for (let i = 0; i < 80; i++) {
      step(s, stick(1), w, cfg);
      if (s.pz > 4.7 && s.pz < 7.5) {
        slidingUnder = slidingUnder || s.slideT > 0;
        minSp = Math.min(minSp, Math.hypot(s.vx, s.vz));
      }
    }
    expect(slidingUnder).toBe(true);
    expect(minSp).toBeGreaterThanOrEqual(cfg.slide.minKeep - 1e-6);
  });

  it('the slide ends when the stick is released or pulled back in the open (review S2)', () => {
    for (const mag of [0, -1]) {
      const w = world(1);
      const s = hero(0, 0.3, 0, 0, 7.5);
      run(s, w, stick(1), 22);
      expect(s.slideT).toBeGreaterThan(0);
      run(s, w, stick(mag), 2);
      expect(s.slideT).toBe(0);
    }
  });

  it('a slide that hits a wall under a low ceiling can still crawl out (review S1)', () => {
    const w = world(1);
    addSolid(w, box(-4, 1.2, 4, 4, 1.5, 7)); // low ceiling
    addSolid(w, box(-4, 0, 7, 4, 1.5, 7.3)); // wall at its end
    const s = hero(0, 0.3, 0, 0, 7.5);
    run(s, w, stick(1), 90);
    expect(s.pz).toBeGreaterThan(4.5); // under the ceiling, stopped by the wall
    run(s, w, stick(-1), 240);
    expect(s.pz).toBeLessThan(3.9); // crawled back out
    expect(s.dead).toBe(0);
  });

  it('no slide without the stick held forward', () => {
    const s = hero(0, 0.3, 0, 0, 7.5);
    const ev = run(s, world(1), new InputFrame(), 30);
    expect(ev & HERO_EV_SLIDE).toBe(0);
  });

  it('a hard impact (8 m/s) still rolls and never slides', () => {
    const s = hero(0, 0.3, 0, 0, 7.5);
    s.vy = -8;
    const ev = run(s, world(1), stick(1), 10);
    expect(ev & HERO_EV_ROLLED).toBe(HERO_EV_ROLLED);
    expect(ev & HERO_EV_SLIDE).toBe(0);
    expect(s.dead).toBe(0);
  });

  it('a 13.5 m/s impact still kills', () => {
    const s = hero(0, 0.3, 0, 0, 0);
    s.vy = -13.5;
    run(s, world(1), stick(1), 10);
    expect(s.dead).toBe(1);
    expect(s.deadCause).toBe(DEAD_HARD_LANDING);
  });

  it('JUMP during a slide jumps with the slide speed', () => {
    const w = world(1);
    const s = hero(0, 0.3, 0, 0, 7.5);
    run(s, w, stick(1), 20);
    expect(s.slideT).toBeGreaterThan(0);
    const f = stick(1);
    f.buttons = BTN_JUMP;
    f.pressed = BTN_JUMP;
    step(s, f, w, cfg);
    expect(s.grounded).toBe(0);
    expect(s.vy).toBeGreaterThan(0);
    expect(Math.hypot(s.vx, s.vz)).toBeGreaterThan(cfg.slide.minKeep);
  });
});
