import { describe, expect, it } from 'vitest';
import {
  Vec3,
  add,
  addScaledTo,
  addTo,
  crossTo,
  dot,
  length,
  lengthSq,
  normalizeTo,
  scale,
  scaleTo,
  sub,
  subTo,
} from '../../src/core/math/vec3';

describe('vec3', () => {
  const a = new Vec3(1, 2, 3);
  const b = new Vec3(4, -5, 6);
  it('adds', () => {
    const r = add(a, b);
    expect([r.x, r.y, r.z]).toEqual([5, -3, 9]);
  });
  it('subtracts', () => {
    const r = sub(a, b);
    expect([r.x, r.y, r.z]).toEqual([-3, 7, -3]);
  });
  it('scales', () => {
    const r = scale(a, 2);
    expect([r.x, r.y, r.z]).toEqual([2, 4, 6]);
  });
  it('dots', () => {
    expect(dot(a, b)).toBe(12);
  });

  it('addTo is alias-safe when out is a', () => {
    const x = new Vec3(1, 2, 3);
    addTo(x, x, new Vec3(4, -5, 6));
    expect([x.x, x.y, x.z]).toEqual([5, -3, 9]);
  });
  it('subTo is alias-safe when out is a', () => {
    const x = new Vec3(1, 2, 3);
    subTo(x, x, new Vec3(4, -5, 6));
    expect([x.x, x.y, x.z]).toEqual([-3, 7, -3]);
  });
  it('subTo is alias-safe when out is b', () => {
    const y = new Vec3(4, -5, 6);
    subTo(y, new Vec3(1, 2, 3), y);
    expect([y.x, y.y, y.z]).toEqual([-3, 7, -3]);
  });
  it('scaleTo is alias-safe when out is a', () => {
    const x = new Vec3(1, 2, 3);
    scaleTo(x, x, 2);
    expect([x.x, x.y, x.z]).toEqual([2, 4, 6]);
  });
  it('addScaledTo is alias-safe when out is a', () => {
    const x = new Vec3(1, 2, 3);
    addScaledTo(x, x, new Vec3(4, -5, 6), 2);
    expect([x.x, x.y, x.z]).toEqual([9, -8, 15]);
  });
  it('addScaledTo is alias-safe when out is b', () => {
    const y = new Vec3(4, -5, 6);
    addScaledTo(y, new Vec3(1, 2, 3), y, 2);
    expect([y.x, y.y, y.z]).toEqual([9, -8, 15]);
  });
  it('normalizeTo is alias-safe when out is a', () => {
    const x = new Vec3(3, 0, 4);
    normalizeTo(x, x);
    expect(x.x).toBeCloseTo(0.6);
    expect(x.y).toBe(0);
    expect(x.z).toBeCloseTo(0.8);
  });
  it('normalizeTo of zero vector gives (0,0,0)', () => {
    const out = new Vec3(9, 9, 9);
    normalizeTo(out, new Vec3(0, 0, 0));
    expect([out.x, out.y, out.z]).toEqual([0, 0, 0]);
  });
  it('length and lengthSq', () => {
    const v = new Vec3(3, 4, 0);
    expect(lengthSq(v)).toBe(25);
    expect(length(v)).toBe(5);
  });
  it('crossTo of x and y axes gives z', () => {
    const out = new Vec3(0, 0, 0);
    crossTo(out, new Vec3(1, 0, 0), new Vec3(0, 1, 0));
    expect([out.x, out.y, out.z]).toEqual([0, 0, 1]);
  });
  it('crossTo is alias-safe when out is a', () => {
    const x = new Vec3(1, 0, 0);
    crossTo(x, x, new Vec3(0, 1, 0));
    expect([x.x, x.y, x.z]).toEqual([0, 0, 1]);
  });
});
