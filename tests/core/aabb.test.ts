import { describe, expect, it } from 'vitest';
import {
  AABB,
  SweepHit,
  aabbContainsPoint,
  aabbOverlaps,
  circleOverlapsAabbXZ,
  clampScalar,
  segmentVsAabb,
  sweptCapsuleVsAabb,
} from '../../src/core/math/aabb';
import { Vec3 } from '../../src/core/math/vec3';

const box = new AABB(new Vec3(0, 0, 0), new Vec3(2, 2, 2));

function seg(a: number[], b: number[]): SweepHit {
  const out = new SweepHit();
  segmentVsAabb(new Vec3(a[0], a[1], a[2]), new Vec3(b[0], b[1], b[2]), box, out);
  return out;
}

describe('aabb overlap / contains', () => {
  it('overlaps, separated, touching', () => {
    expect(aabbOverlaps(box, new AABB(new Vec3(1, 1, 1), new Vec3(3, 3, 3)))).toBe(true);
    expect(aabbOverlaps(box, new AABB(new Vec3(3, 0, 0), new Vec3(4, 2, 2)))).toBe(false);
    expect(aabbOverlaps(box, new AABB(new Vec3(2, 0, 0), new Vec3(4, 2, 2)))).toBe(false);
    expect(aabbOverlaps(box, new AABB(new Vec3(2 - 1e-6, 0, 0), new Vec3(4, 2, 2)))).toBe(true);
    expect(aabbOverlaps(box, new AABB(new Vec3(2 + 1e-6, 0, 0), new Vec3(4, 2, 2)))).toBe(false);
  });
  it('contains point (inclusive)', () => {
    expect(aabbContainsPoint(box, 1, 1, 1)).toBe(true);
    expect(aabbContainsPoint(box, 2, 2, 2)).toBe(true);
    expect(aabbContainsPoint(box, 2 + 1e-6, 1, 1)).toBe(false);
    expect(aabbContainsPoint(box, -1e-6, 1, 1)).toBe(false);
  });
});

describe('segmentVsAabb', () => {
  it('hits each of the 6 faces with t and normal', () => {
    let h = seg([-2, 1, 1], [2, 1, 1]);
    expect([h.hit, h.t, h.nx, h.ny, h.nz]).toEqual([true, 0.5, -1, 0, 0]);
    h = seg([4, 1, 1], [0, 1, 1]);
    expect([h.hit, h.t, h.nx, h.ny, h.nz]).toEqual([true, 0.5, 1, 0, 0]);
    h = seg([1, -2, 1], [1, 2, 1]);
    expect([h.hit, h.t, h.nx, h.ny, h.nz]).toEqual([true, 0.5, 0, -1, 0]);
    h = seg([1, 4, 1], [1, 0, 1]);
    expect([h.hit, h.t, h.nx, h.ny, h.nz]).toEqual([true, 0.5, 0, 1, 0]);
    h = seg([1, 1, -2], [1, 1, 2]);
    expect([h.hit, h.t, h.nx, h.ny, h.nz]).toEqual([true, 0.5, 0, 0, -1]);
    h = seg([1, 1, 4], [1, 1, 0]);
    expect([h.hit, h.t, h.nx, h.ny, h.nz]).toEqual([true, 0.5, 0, 0, 1]);
  });
  it('misses', () => {
    expect(seg([-2, 5, 1], [4, 5, 1]).hit).toBe(false);
    expect(seg([-2, 1, 1], [-0.5, 1, 1]).hit).toBe(false); // too short
    expect(seg([3, 1, 1], [5, 1, 1]).hit).toBe(false); // moving away
  });
  it('boundary +/- 1e-6 for segment end', () => {
    expect(seg([-1, 1, 1], [-1e-6, 1, 1]).hit).toBe(false);
    expect(seg([-1, 1, 1], [1e-6, 1, 1]).hit).toBe(true);
    expect(seg([-1, 2 + 1e-6, 1], [3, 2 + 1e-6, 1]).hit).toBe(false);
    expect(seg([-1, 2 - 1e-6, 1], [3, 2 - 1e-6, 1]).hit).toBe(true);
  });
  it('grazing a face exactly is a hit (inclusive surface)', () => {
    const h = seg([-1, 2, 1], [3, 2, 1]);
    expect(h.hit).toBe(true);
    expect(h.t).toBeCloseTo(0.25, 12);
    expect([h.nx, h.ny, h.nz]).toEqual([-1, 0, 0]);
  });
  it('starting inside or on the surface', () => {
    let h = seg([1, 1, 1], [5, 1, 1]);
    expect([h.hit, h.t, h.nx, h.ny, h.nz]).toEqual([true, 0, 0, 0, 0]);
    h = seg([0, 1, 1], [-5, 1, 1]);
    expect([h.hit, h.t]).toEqual([true, 0]);
  });
  it('zero-length segment', () => {
    expect(seg([1, 1, 1], [1, 1, 1]).hit).toBe(true);
    expect(seg([5, 5, 5], [5, 5, 5]).hit).toBe(false);
  });
  it('axis-parallel with no division blow-up', () => {
    const h = seg([-1, 1, 1], [3, 1, 1]);
    expect(Number.isFinite(h.t)).toBe(true);
    expect(h.t).toBeCloseTo(0.25, 12);
    expect(seg([-1, 1, 1], [-1, 1, 5]).hit).toBe(false);
  });
});

describe('sweptCapsuleVsAabb', () => {
  const wall = new AABB(new Vec3(2, 0, -5), new Vec3(3, 4, 5));
  const h = 1.8;
  const r = 0.3;
  function cap(base: Vec3, d: Vec3, b: AABB): SweepHit {
    const out = new SweepHit();
    sweptCapsuleVsAabb(base, h, r, d, b, out);
    return out;
  }
  it('walks into a wall', () => {
    const o = cap(new Vec3(0, 0, 0), new Vec3(4, 0, 0), wall);
    expect(o.hit).toBe(true);
    expect(o.t).toBeCloseTo(0.425, 12); // (2 - 0.3) / 4
    expect([o.nx, o.ny, o.nz]).toEqual([-1, 0, 0]);
  });
  it('wall boundary +/- 1e-6', () => {
    expect(cap(new Vec3(0, 0, 0), new Vec3(1.7 - 1e-6, 0, 0), wall).hit).toBe(false);
    expect(cap(new Vec3(0, 0, 0), new Vec3(1.7 + 1e-6, 0, 0), wall).hit).toBe(true);
  });
  it('lands on a roof from above', () => {
    const roof = new AABB(new Vec3(-5, 0, -5), new Vec3(5, 3, 5));
    const o = cap(new Vec3(0, 5, 0), new Vec3(0, -4, 0), roof);
    expect(o.hit).toBe(true);
    expect(o.t).toBeCloseTo(0.5, 12);
    expect([o.nx, o.ny, o.nz]).toEqual([0, 1, 0]);
  });
  it('passes under a ledge', () => {
    const ledge = new AABB(new Vec3(2, 2, -5), new Vec3(3, 3, 5)); // feet 0 + h 1.8 < 2
    expect(cap(new Vec3(0, 0, 0), new Vec3(5, 0, 0), ledge).hit).toBe(false);
    const low = new AABB(new Vec3(2, 1.8 - 1e-6, -5), new Vec3(3, 3, 5));
    expect(cap(new Vec3(0, 0, 0), new Vec3(5, 0, 0), low).hit).toBe(true);
  });
  it('starts overlapping: t = 0, least-penetration normal', () => {
    const o = cap(new Vec3(1.8, 0.5, 0), new Vec3(1, 0, 0), wall);
    expect(o.hit).toBe(true);
    expect(o.t).toBe(0);
    expect([o.nx, o.ny, o.nz]).toEqual([-1, 0, 0]);
  });
  it('delta = 0: miss when apart or resting, hit when penetrating', () => {
    expect(cap(new Vec3(0, 0, 0), new Vec3(0, 0, 0), wall).hit).toBe(false);
    expect(cap(new Vec3(1.7, 0, 0), new Vec3(0, 0, 0), wall).hit).toBe(false);
    expect(cap(new Vec3(1.8, 0, 0), new Vec3(0, 0, 0), wall).hit).toBe(true);
  });
  it('resting on a roof: moving away or sliding is not a hit; moving in is t = 0', () => {
    const roof = new AABB(new Vec3(-5, 0, -5), new Vec3(5, 3, 5));
    expect(cap(new Vec3(0, 3, 0), new Vec3(1, 1, 0), roof).hit).toBe(false);
    expect(cap(new Vec3(0, 3, 0), new Vec3(1, 0, 0), roof).hit).toBe(false);
    const o = cap(new Vec3(0, 3, 0), new Vec3(0, -1, 0), roof);
    expect([o.hit, o.t, o.ny]).toEqual([true, 0, 1]);
  });
});

describe('clampScalar', () => {
  it('clamps into the range, passes through', () => {
    expect(clampScalar(-3, 0, 2)).toBe(0);
    expect(clampScalar(1, 0, 2)).toBe(1);
    expect(clampScalar(5, 0, 2)).toBe(2);
    expect(clampScalar(0, 0, 2)).toBe(0);
    expect(clampScalar(2, 0, 2)).toBe(2);
  });
});

describe('circleOverlapsAabbXZ', () => {
  // Footprint rect x 0..2, z 0..3; the box y range must be irrelevant.
  const b = new AABB(new Vec3(0, -7, 0), new Vec3(2, 4, 3));
  const r = 0.5;
  it('centre inside the rect is an overlap', () => {
    expect(circleOverlapsAabbXZ(b, 1, 1, r)).toBe(true);
    expect(circleOverlapsAabbXZ(b, 0, 0, 0)).toBe(true); // zero radius, on the corner
  });
  it('clamped distance vs radius on a face', () => {
    expect(circleOverlapsAabbXZ(b, 2.5, 1, r)).toBe(true); // 0.5 from the x=max face
    expect(circleOverlapsAabbXZ(b, 2.5 + 1e-9, 1, r)).toBe(false);
    expect(circleOverlapsAabbXZ(b, -0.5, 1.5, r)).toBe(true); // tangent on x=min
    expect(circleOverlapsAabbXZ(b, -0.5 - 1e-9, 1.5, r)).toBe(false);
  });
  it('diagonal corner uses the clamped point, not one axis', () => {
    expect(circleOverlapsAabbXZ(b, 2.3, 3.3, r)).toBe(true); // sqrt(0.09+0.09) < 0.5
    expect(circleOverlapsAabbXZ(b, 2.4, 3.4, r)).toBe(false); // sqrt(0.16+0.16) > 0.5
  });
  it('far outside in both axes misses', () => {
    expect(circleOverlapsAabbXZ(b, 5, 5, r)).toBe(false);
    expect(circleOverlapsAabbXZ(b, 2.4, 1, 0.3)).toBe(false); // 0.4 > 0.3
  });
});
