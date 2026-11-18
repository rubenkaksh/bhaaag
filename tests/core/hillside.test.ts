// Hillside ground (owner order 2026-11-18): a soft landing on a hazard volume holds the hero as
// slow-walking ground, a hard one still kills, and the hero can climb a house wall back to its roof.
import { describe, expect, it } from 'vitest';
import { loadWorldFromObject } from '../../src/content/load';
import { buildNagarkotHome } from '../../src/content/strategy/home';
import { DEFAULT_TUNING } from '../../src/core/config';
import {
  DEAD_HAZARD,
  HERO_AIRBORNE,
  HERO_EV_MANTLE,
  HERO_GROUNDED,
  HERO_HANGING,
  HeroState,
  copyHeroState,
} from '../../src/core/hero';
import { InputFrame, quantizeAxis } from '../../src/core/input';
import { AABB } from '../../src/core/math/aabb';
import { Vec3 } from '../../src/core/math/vec3';
import { step } from '../../src/core/sim';
import { World, addSolid } from '../../src/core/world';

const cfg = DEFAULT_TUNING;
const WALK = cfg.hazard.groundWalkSpeed;

function box(x0: number, y0: number, z0: number, x1: number, y1: number, z1: number): AABB {
  return new AABB(new Vec3(x0, y0, z0), new Vec3(x1, y1, z1));
}

// Hillside top y=0 for z in [-40, 0); a house wall face at z=0 with its roof at y=9.
function hillWorld(): World {
  const w = new World();
  w.climb = 1;
  w.parkour = 1;
  addSolid(w, box(-10, -20, 0, 10, 9, 10));
  w.hazards.push(box(-60, -6, -40, 60, 0, 0));
  w.killPlaneY = -50;
  return w;
}

function air(x: number, y: number, z: number): HeroState {
  const s = new HeroState();
  s.px = x;
  s.py = y;
  s.pz = z;
  s.mode = HERO_AIRBORNE;
  return s;
}

function stick(mx: number, my: number): InputFrame {
  const f = new InputFrame();
  f.moveX = quantizeAxis(mx);
  f.moveY = quantizeAxis(my);
  return f;
}

function runFor(s: HeroState, f: InputFrame, w: World, n: number): void {
  for (let i = 0; i < n && s.dead === 0; i++) step(s, f, w, cfg);
}

describe('hillside ground', () => {
  it('a soft landing survives and holds the hero on the hillside', () => {
    const w = hillWorld();
    const s = air(0, 3, -10); // ~7.7 m/s at the band, under killImpact
    runFor(s, new InputFrame(), w, 120);
    expect(s.dead).toBe(0);
    expect(s.grounded).toBe(1);
    expect(s.mode).toBe(HERO_GROUNDED);
    expect(s.hill).toBe(1);
    expect(s.py).toBeCloseTo(0, 5);
  });

  it('a hard landing (above hazard.killImpact) still kills', () => {
    const w = hillWorld();
    const s = air(0, 12, -10); // ~15 m/s
    runFor(s, new InputFrame(), w, 120);
    expect(s.dead).toBe(1);
    expect(s.deadCause).toBe(DEAD_HAZARD);
  });

  it('killImpact 0 restores the old always-kill rule', () => {
    const w = hillWorld();
    const s = air(0, 1, -10);
    const old = { ...cfg, hazard: { ...cfg.hazard, killImpact: 0 } };
    for (let i = 0; i < 60 && s.dead === 0; i++) step(s, new InputFrame(), w, old);
    expect(s.deadCause).toBe(DEAD_HAZARD);
  });

  it('walking is capped at groundWalkSpeed and a fast landing carries no momentum', () => {
    const w = hillWorld();
    const s = air(0, 2, -10);
    s.vz = -11; // rope-release speed along the slope
    let peak = 0;
    let landZ = NaN;
    const f = stick(0, -1); // away from the wall
    for (let i = 0; i < 240; i++) {
      step(s, f, w, cfg);
      expect(s.dead).toBe(0);
      if (s.hill === 1 && Number.isNaN(landZ)) landZ = s.pz;
      if (s.grounded === 1) peak = Math.max(peak, Math.hypot(s.vx, s.vz));
    }
    expect(s.hill).toBe(1);
    expect(peak).toBeLessThanOrEqual(WALK + 1e-9);
    expect(peak).toBeGreaterThan(WALK * 0.9);
    expect(s.sprintM).toBe(0);
    // Under four seconds at <= 2 m/s cannot cover more than 8 m from the landing.
    expect(Math.abs(s.pz - landZ)).toBeLessThan(WALK * 4);
  });

  it('holding the stick into a house wall climbs back to its roof', () => {
    const w = hillWorld();
    const s = air(0, 1.5, -1.5);
    runFor(s, new InputFrame(), w, 60); // settle on the hillside
    expect(s.hill).toBe(1);
    const f = stick(0, 1); // toward the wall
    let hung = false;
    let mantled = false;
    for (let i = 0; i < 900 && s.dead === 0; i++) {
      step(s, f, w, cfg);
      if (s.mode === HERO_HANGING) hung = true;
      if ((s.eventBits & HERO_EV_MANTLE) !== 0) mantled = true;
      if (mantled && s.grounded === 1) break;
    }
    expect(hung).toBe(true);
    expect(mantled).toBe(true);
    expect(s.py).toBeCloseTo(9, 2);
    expect(s.hill).toBe(0);
    expect(s.hillClimb).toBe(0);
    expect(s.mode).toBe(HERO_GROUNDED);
  });

  it('is deterministic and the state copy carries the hillside fields', () => {
    const w = hillWorld();
    const a = air(0, 3, -10);
    const b = air(0, 3, -10);
    const f = stick(0.3, 1);
    for (let i = 0; i < 400; i++) {
      step(a, f, w, cfg);
      step(b, f, w, cfg);
    }
    const c = new HeroState();
    copyHeroState(c, a);
    for (const k of [
      'px',
      'py',
      'pz',
      'vx',
      'vz',
      'mode',
      'hill',
      'hillClimb',
      'hillClimbT',
    ] as const)
      expect(c[k]).toBe(b[k]);
  });

  it('nagarkot-home: a short drop onto the real hillside survives', () => {
    const w = loadWorldFromObject(buildNagarkotHome().level);
    expect(w.hazards.length).toBeGreaterThan(0);
    let tried = 0;
    for (const h of w.hazards) {
      const x = (h.min.x + h.max.x) / 2;
      const z = (h.min.z + h.max.z) / 2;
      const s = air(x, h.max.y + 1.5, z);
      const y0 = s.py;
      let ok = true;
      for (let i = 0; i < 60 && s.dead === 0; i++) {
        step(s, new InputFrame(), w, cfg);
        if (s.hill === 1) break;
        if (s.grounded === 1) {
          ok = false; // landed on a solid first (a house or road): not the hillside
          break;
        }
      }
      if (!ok || s.py >= y0) continue; // a solid first, or the start is wedged inside one
      tried++;
      expect(s.dead).toBe(0);
      expect(s.hill).toBe(1);
    }
    expect(tried).toBeGreaterThan(0);
  });
});
