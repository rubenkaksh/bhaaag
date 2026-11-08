// Pitched tile roofs (ADR 0002): slope-aware landing, slide, slow uphill, eave drop, hooks.
import { describe, expect, it } from 'vitest';
import { DEFAULT_TUNING } from '../../src/core/config';
import {
  DEAD_HARD_LANDING,
  HERO_AIRBORNE,
  HERO_ATTACHED,
  HERO_EV_LANDED,
  HERO_EV_ROLLED,
  HERO_GROUNDED,
  HeroState,
} from '../../src/core/hero';
import { BTN_HOOK, InputFrame, quantizeAxis } from '../../src/core/input';
import { AABB } from '../../src/core/math/aabb';
import { Vec3 } from '../../src/core/math/vec3';
import { step } from '../../src/core/sim';
import { RIDGE_X, RIDGE_Z, World, addAnchor, addRamp, addRoof, addSolid } from '../../src/core/world';

const cfg = DEFAULT_TUNING;
const RISE = 2.3; // 8 m span, half-span 4: pitch atan(2.3 / 4) = 29.9 deg
const PLOT = -8;

function box(x0: number, y0: number, z0: number, x1: number, y1: number, z1: number): AABB {
  return new AABB(new Vec3(x0, y0, z0), new Vec3(x1, y1, z1));
}

// A house on a plot: wall box up to the eave (y 0), gable roof above it, ridge along z at x = 0.
function houseWorld(rise: number, ridge: number): World {
  const w = new World();
  addSolid(w, box(-40, PLOT - 1, -40, 40, PLOT, 40));
  addSolid(w, box(-4, PLOT, -5, 4, 0, 5));
  addRoof(w, box(-4, 0, -5, 4, rise, 5), ridge);
  w.killPlaneY = -30;
  return w;
}

// Roof surface height of houseWorld(RISE, RIDGE_Z) at x.
function roofY(x: number, rise: number): number {
  return rise * (1 - Math.abs(x) / 4);
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

function move(yaw: number): { s: InputFrame; yaw: number } {
  const f = new InputFrame();
  f.moveY = quantizeAxis(1);
  return { s: f, yaw };
}

describe('addRoof', () => {
  it('appends two slippery ramp halves that meet at the ridge', () => {
    const w = houseWorld(RISE, RIDGE_Z);
    expect(w.roofs.length).toBe(1);
    expect(w.ramps.length).toBe(2);
    const a = w.ramps[w.roofs[0].rampA];
    const b = w.ramps[w.roofs[0].rampB];
    expect(a.slip).toBe(1);
    expect(b.slip).toBe(1);
    expect(a.roofId).toBe(0);
    expect(a.slopeAxis).toBe(0); // west half rises toward +x
    expect(b.slopeAxis).toBe(1);
    expect(a.aabb.max.x).toBe(0);
    expect(b.aabb.min.x).toBe(0);
    expect(a.rise).toBe(RISE);
    const wx = houseWorld(RISE, RIDGE_X);
    expect(wx.ramps[0].slopeAxis).toBe(2);
    expect(wx.ramps[1].slopeAxis).toBe(3);
    expect(wx.ramps[0].aabb.max.z).toBe(0);
  });

  it('a plain ramp stays non-slippery', () => {
    const w = new World();
    addRamp(w, box(0, 0, 0, 4, 2, 4), 0, 2);
    expect(w.ramps[0].slip).toBe(0);
    expect(w.ramps[0].roofId).toBe(-1);
  });
});

describe('standing on a pitched roof', () => {
  it('with no input the hero slides downslope, off the eave, and falls to the plot', () => {
    const w = houseWorld(RISE, RIDGE_Z);
    const s = hero(-1, roofY(-1, RISE), 0, 1);
    let leftAt = -1;
    let vyAtExit = 0;
    let landedPlot = false;
    for (let t = 0; t < 600 && s.dead === 0 && !landedPlot; t++) {
      const wasGrounded = s.grounded;
      step(s, new InputFrame(), w, cfg);
      if (wasGrounded === 1 && s.grounded === 0 && leftAt < 0) {
        leftAt = t;
        vyAtExit = s.vy;
        expect(s.px).toBeLessThan(-4); // left over the west eave
      }
      if (s.grounded === 1 && leftAt < 0 && s.px > -4) {
        expect(s.py).toBeCloseTo(roofY(s.px, RISE), 6); // glued to the slope while sliding
        expect(s.vx).toBeLessThan(0); // downslope is -x on the west half
      }
      if (leftAt >= 0 && s.grounded === 1) landedPlot = true;
    }
    expect(leftAt).toBeGreaterThan(0);
    expect(leftAt).toBeLessThan(120); // off within 2 s: hard to stay on
    expect(vyAtExit).toBeLessThan(0); // keeps the slope's downward rate off the eave
    expect(s.dead).toBe(0); // 8 m eave drop is a roll
    expect(landedPlot).toBe(true);
    expect(s.py).toBe(PLOT);
  });

  it('a roof below roof.slipDeg is walkable: the hero stays put', () => {
    const shallow = 4 * Math.tan(((cfg.roof.slipDeg - 3) * Math.PI) / 180);
    const w = houseWorld(shallow, RIDGE_Z);
    const s = hero(-2, roofY(-2, shallow), 0, 1);
    for (let t = 0; t < 120; t++) step(s, new InputFrame(), w, cfg);
    expect(s.px).toBe(-2);
    expect(s.grounded).toBe(1);
  });

  it('a plain ramp at the same pitch does not slide', () => {
    const w = new World();
    addSolid(w, box(-40, -1, -40, 40, 0, 40));
    addRamp(w, box(-4, 0, -5, 0, RISE, 5), 0, RISE);
    const s = hero(-1, roofY(-1, RISE), 0, 1);
    for (let t = 0; t < 120; t++) step(s, new InputFrame(), w, cfg);
    expect(s.px).toBe(-1);
    expect(s.grounded).toBe(1);
  });

  it('running uphill is slow but holds the roof; letting go loses it', () => {
    const w = houseWorld(RISE, RIDGE_Z);
    const s = hero(-3, roofY(-3, RISE), 0, 1);
    const up = move(Math.PI / 2); // forward = +x, toward the ridge
    s.camYaw = up.yaw;
    let maxVx = 0;
    for (let t = 0; t < 60; t++) {
      step(s, up.s, w, cfg);
      if (s.vx > maxVx) maxVx = s.vx;
    }
    expect(s.grounded).toBe(1);
    expect(s.px).toBeGreaterThan(-3); // made progress uphill
    expect(maxVx).toBeLessThanOrEqual(cfg.hero.run * cfg.roof.uphillRun + 1e-9);
    expect(maxVx).toBeGreaterThan(0.5);
    // the same input on a flat roof is much faster
    const flat = new World();
    addSolid(flat, box(-40, -1, -40, 40, 0, 40));
    const f = hero(-3, 0, 0, 1);
    f.camYaw = up.yaw;
    for (let t = 0; t < 60; t++) step(f, up.s, flat, cfg);
    expect(f.px - -3).toBeGreaterThan(2 * (s.px - -3));
  });

  it('a hero sliding along the ridge direction drifts down toward the eave', () => {
    const w = houseWorld(RISE, RIDGE_Z);
    const s = hero(-1, roofY(-1, RISE), 3, 1);
    const along = move(Math.PI); // forward = -z, along the ridge
    s.camYaw = along.yaw;
    for (let t = 0; t < 30; t++) step(s, along.s, w, cfg);
    expect(s.pz).toBeLessThan(3);
    expect(s.px).toBeLessThan(-1); // pulled downslope while running across it
  });
});

describe('landing on a pitched roof', () => {
  it('impact speed is measured along the slope normal', () => {
    const vy = -(cfg.landing.vyRoll + 1); // straight down: kills on a flat top
    const flat = new World();
    addSolid(flat, box(-40, -1, -40, 40, 0, 40));
    const f = hero(0, 0.05, 0, 0);
    f.vy = vy;
    step(f, new InputFrame(), flat, cfg);
    expect(f.dead).toBe(1);
    expect(f.deadCause).toBe(DEAD_HARD_LANDING);

    const w = houseWorld(RISE, RIDGE_Z);
    const s = hero(-2, roofY(-2, RISE) + 0.05, 0, 0);
    s.vy = vy;
    step(s, new InputFrame(), w, cfg);
    expect(s.dead).toBe(0); // only cos(29.9 deg) of it goes into the tiles: a roll
    expect(s.eventBits & HERO_EV_ROLLED).toBe(HERO_EV_ROLLED);
    expect(s.grounded).toBe(1);
    expect(s.py).toBeCloseTo(roofY(-2, RISE), 9);
    // the tangential part of the fall is kept as downslope speed
    expect(s.vx).toBeLessThan(-1);
  });

  it('keeps the carried speed along the ridge', () => {
    const w = houseWorld(RISE, RIDGE_Z);
    const s = hero(-2, roofY(-2, RISE) + 0.05, 3, 0);
    s.vy = -3;
    s.vz = -8;
    step(s, new InputFrame(), w, cfg);
    expect(s.eventBits & HERO_EV_LANDED).toBe(HERO_EV_LANDED);
    expect(s.vz).toBeLessThan(-7.5);
  });

  it('is deterministic: two runs from the same state are bit-identical', () => {
    const w = houseWorld(RISE, RIDGE_Z);
    const a = hero(-1.3, roofY(-1.3, RISE) + 1, 2, 0);
    const b = hero(-1.3, roofY(-1.3, RISE) + 1, 2, 0);
    a.vz = -5;
    b.vz = -5;
    for (let t = 0; t < 240; t++) {
      step(a, new InputFrame(), w, cfg);
      step(b, new InputFrame(), w, cfg);
    }
    expect(a).toEqual(b);
  });
});

describe('hooks anchored on a pitched roof', () => {
  it('the rope carries the hero onto the slope, which then slides', () => {
    const w = houseWorld(RISE, RIDGE_Z);
    addSolid(w, box(-3, 2, 15, 1, 6, 25)); // launch block, top y 6
    const id = addAnchor(w, -1, RISE + 0.7, 0); // finial just west of the ridge
    const s = hero(-1, 6, 18, 1);
    const a = w.anchors[id];
    const aim = (): void => {
      const dx = a.px - s.px;
      const dy = a.py - (s.py + cfg.hero.height * 0.9);
      const dz = a.pz - s.pz;
      s.camYaw = Math.atan2(dx, dz);
      s.camPitch = Math.atan2(dy, Math.sqrt(dx * dx + dz * dz));
    };
    aim();
    const fire = new InputFrame();
    fire.buttons = BTN_HOOK;
    fire.pressed = BTN_HOOK;
    step(s, fire, w, cfg);
    expect(s.hook.anchorId).toBe(id);
    let rode = false;
    let landed = false;
    for (let t = 0; t < 600 && s.dead === 0 && !landed; t++) {
      step(s, new InputFrame(), w, cfg);
      if (s.mode === HERO_ATTACHED) rode = true;
      if (rode && (s.eventBits & HERO_EV_LANDED) !== 0) landed = true;
    }
    expect(rode).toBe(true);
    expect(landed).toBe(true);
    expect(s.dead).toBe(0);
    expect(Math.abs(s.px)).toBeLessThan(4);
    expect(Math.abs(s.pz)).toBeLessThan(5);
    expect(s.py).toBeCloseTo(roofY(s.px, RISE), 6);
    const px0 = s.px;
    for (let t = 0; t < 20; t++) step(s, new InputFrame(), w, cfg);
    expect(s.px).toBeLessThan(px0); // slipping toward the west eave
  });
});
