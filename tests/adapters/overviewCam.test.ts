import { describe, expect, it } from 'vitest';
import {
  blendPose,
  newOverviewPose,
  overviewAvailable,
  overviewPose,
  pickNodesAhead,
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
  overviewHeight: 30,
  overviewPitchDeg: 60,
  overviewEase: 0.1,
  overviewMaxExtent: 100,
  overviewNodes: 15,
  overviewMargin: 1.25,
};
const FOV = 60;
const hero = { x: 0, y: 0, z: 0 };

function pose(ahead: { x: number; y: number; z: number }[], yaw = 0, aspect = 390 / 844) {
  return overviewPose(hero, ahead, yaw, cfg, FOV, aspect, newOverviewPose());
}

describe('pickNodesAhead', () => {
  it('keeps the n nearest nodes ahead, sorted, and drops those behind', () => {
    const c = [
      { x: 0, y: 0, z: -50 },
      { x: 0, y: 0, z: -10 },
      { x: 0, y: 0, z: 30 }, // behind (yaw 0 faces -z)
      { x: 0, y: 0, z: -30 },
      { x: 0, y: 0, z: -2 }, // a hair behind the line is within the slack
    ];
    const out: { x: number; y: number; z: number }[] = [];
    expect(pickNodesAhead(hero, 0, c, 3, out)).toBe(3);
    expect(out.map((p) => p.z)).toEqual([-2, -10, -30]);
  });

  it('returns fewer when fewer qualify, and follows the yaw', () => {
    const c = [
      { x: 20, y: 0, z: 0 },
      { x: -20, y: 0, z: 0 },
    ];
    const out: { x: number; y: number; z: number }[] = [];
    expect(pickNodesAhead(hero, Math.PI / 2, c, 15, out)).toBe(1); // faces +x
    expect(out[0].x).toBe(20);
  });
});

describe('overviewPose framing', () => {
  it('with nothing ahead, sits at the minimum height looking at the hero', () => {
    const p = pose([]);
    expect(p.lx).toBeCloseTo(0);
    expect(p.lz).toBeCloseTo(0);
    expect(p.py).toBeCloseTo(30); // overviewHeight floor
    expect(p.pz).toBeGreaterThan(0); // behind the hero (yaw 0 = camera on +z)
  });

  it('centres on the hero + nodes bounds and zooms out as they spread', () => {
    const near = pose([{ x: 0, y: 0, z: -40 }]);
    const far = pose([{ x: 0, y: 0, z: -160 }]); // clamped to the 100 m reach
    expect(near.lz).toBeCloseTo(-20);
    expect(far.lz).toBeCloseTo(-50);
    expect(far.py).toBeGreaterThan(near.py);
  });

  it('fits the framed bounds inside the view (portrait and landscape)', () => {
    const nodes = [
      { x: -30, y: 0, z: -60 },
      { x: 30, y: 0, z: -100 },
    ];
    for (const aspect of [390 / 844, 844 / 390]) {
      const p = pose(nodes, 0, aspect);
      const dist = Math.hypot(p.px - p.lx, p.py - p.ly, p.pz - p.lz);
      const tanV = Math.tan((FOV * Math.PI) / 360);
      // Sideways half-extent (30 m) and forward half-extent (50 m, foreshortened by sin 60°) both fit.
      expect(30 <= dist * tanV * aspect).toBe(true);
      expect(50 * Math.sin(Math.PI / 3) <= dist * tanV).toBe(true);
    }
  });

  it('portrait backs off further than landscape for a wide spread', () => {
    const nodes = [
      { x: -40, y: 0, z: -30 },
      { x: 40, y: 0, z: -30 },
    ];
    const portrait = pose(nodes, 0, 390 / 844);
    const landscape = pose(nodes, 0, 844 / 390);
    expect(portrait.py).toBeGreaterThan(landscape.py);
  });

  it('is steep: the camera looks down at the configured pitch', () => {
    const p = pose([{ x: 0, y: 0, z: -80 }]);
    const pitch = Math.atan2(p.py - p.ly, Math.hypot(p.px - p.lx, p.pz - p.lz));
    expect((pitch * 180) / Math.PI).toBeCloseTo(60);
  });

  it('keeps the hero in view when the finish is far ahead and far below (owner 2026-11-19)', () => {
    const p = pose([{ x: 0, y: -180, z: -300 }, { x: 5, y: -20, z: -30 }]);
    // camera basis: forward = look - pos; hero must lie within the vertical and horizontal half-fov
    const fx = p.lx - p.px;
    const fy = p.ly - p.py;
    const fz = p.lz - p.pz;
    const fl = Math.hypot(fx, fy, fz);
    const hx = hero.x - p.px;
    const hy = hero.y - p.py;
    const hz = hero.z - p.pz;
    const along = (hx * fx + hy * fy + hz * fz) / fl;
    expect(along).toBeGreaterThan(0);
    const off = Math.acos(Math.min(1, along / Math.hypot(hx, hy, hz)));
    expect(off).toBeLessThan((FOV * Math.PI) / 360); // inside the half-fov cone
  });

  it('puts the camera behind the view direction for a rotated yaw', () => {
    const p = overviewPose(hero, [], Math.PI / 2, cfg, FOV, 1, newOverviewPose()); // faces +x
    expect(p.px).toBeLessThan(-5);
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
