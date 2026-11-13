import { describe, expect, it } from 'vitest';
import {
  blendPose,
  newOverviewPose,
  overviewAvailable,
  overviewPose,
  overviewWeight,
  stepOverview,
  type OverviewCfg,
} from '../../src/adapters/render/overviewCam';
import {
  HERO_AIRBORNE,
  HERO_ATTACHED,
  HERO_DEAD,
  HERO_GROUNDED,
  HERO_HANGING,
} from '../../src/core/hero';

const cfg: OverviewCfg = {
  overviewHeight: 40,
  overviewPullBack: 10,
  overviewPitchDeg: 45,
  overviewEase: 0.1,
  overviewMaxExtent: 100,
  overviewSpanScale: 0.5,
};

describe('overviewPose', () => {
  it('with nothing ahead, looks at the hero from behind and above (yaw 0 = camera on +z)', () => {
    const p = overviewPose({ x: 3, y: 5, z: -2 }, [], 0, cfg, newOverviewPose());
    expect(p.lx).toBeCloseTo(3);
    expect(p.ly).toBeCloseTo(5);
    expect(p.lz).toBeCloseTo(-2);
    expect(p.py).toBeCloseTo(5 + 40);
    expect(p.px).toBeCloseTo(3);
    expect(p.pz).toBeCloseTo(-2 + 40 + 10); // h / tan45 + pull
  });

  it('frames hero plus path: centre is the bounds middle and height grows with the span', () => {
    const near = overviewPose(
      { x: 0, y: 10, z: 0 },
      [{ x: 0, y: 0, z: -20 }],
      0,
      cfg,
      newOverviewPose(),
    );
    const far = overviewPose(
      { x: 0, y: 10, z: 0 },
      [{ x: 0, y: 0, z: -80 }],
      0,
      cfg,
      newOverviewPose(),
    );
    expect(near.lz).toBeCloseTo(-10);
    expect(near.ly).toBeCloseTo(5);
    expect(far.lz).toBeCloseTo(-40);
    expect(far.py - far.ly).toBeGreaterThan(near.py - near.ly);
    expect(far.py - far.ly).toBeCloseTo(40 + 80 * 0.5);
  });

  it('clamps far points to the max extent from the hero', () => {
    const p = overviewPose(
      { x: 0, y: 0, z: 0 },
      [{ x: 0, y: 0, z: -1000 }],
      0,
      cfg,
      newOverviewPose(),
    );
    expect(p.lz).toBeCloseTo(-50);
  });

  it('puts the camera behind the view direction for a rotated yaw', () => {
    const yaw = Math.PI / 2; // faces +x, so behind is -x
    const p = overviewPose({ x: 0, y: 0, z: 0 }, [], yaw, cfg, newOverviewPose());
    expect(p.px).toBeLessThan(-40);
    expect(Math.abs(p.pz)).toBeLessThan(1e-6);
  });
});

describe('ease in and out', () => {
  it('rises toward 1 while held and snaps, then returns to 0 on release', () => {
    let k = 0;
    let prev = 0;
    for (let i = 0; i < 200 && k < 1; i++) {
      k = stepOverview(k, true, cfg);
      expect(k).toBeGreaterThan(prev);
      prev = k;
    }
    expect(k).toBe(1);
    for (let i = 0; i < 200 && k > 0; i++) k = stepOverview(k, false, cfg);
    expect(k).toBe(0);
  });

  it('weight is a smoothstep: 0, 0.5, 1 at the ends and middle, flat at the ends', () => {
    expect(overviewWeight(0)).toBe(0);
    expect(overviewWeight(0.5)).toBeCloseTo(0.5);
    expect(overviewWeight(1)).toBe(1);
    expect(overviewWeight(0.1)).toBeLessThan(0.1);
    expect(overviewWeight(2)).toBe(1);
  });

  it('blendPose interpolates every component', () => {
    const a = { px: 0, py: 0, pz: 0, lx: 0, ly: 0, lz: 0 };
    const b = { px: 10, py: 20, pz: 30, lx: 40, ly: 50, lz: 60 };
    blendPose(a, b, 0.5);
    expect(a).toEqual({ px: 5, py: 10, pz: 15, lx: 20, ly: 25, lz: 30 });
  });
});

describe('overviewAvailable', () => {
  it('is on for grounded and attached only', () => {
    expect(overviewAvailable(HERO_GROUNDED)).toBe(true);
    expect(overviewAvailable(HERO_ATTACHED)).toBe(true);
    expect(overviewAvailable(HERO_AIRBORNE)).toBe(false);
    expect(overviewAvailable(HERO_HANGING)).toBe(false);
    expect(overviewAvailable(HERO_DEAD)).toBe(false);
  });
});
