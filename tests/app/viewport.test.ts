import { describe, expect, it } from 'vitest';
import { layoutFor } from '../../src/app/viewport';

describe('layoutFor', () => {
  it('classifies landscape and portrait', () => {
    expect(layoutFor(1920, 1080, false).orientation).toBe('landscape');
    expect(layoutFor(390, 844, true).orientation).toBe('portrait');
  });
  it('a square viewport counts as landscape', () => {
    expect(layoutFor(800, 800, false).orientation).toBe('landscape');
  });
  it('computes aspect and keeps inputs', () => {
    const v = layoutFor(640, 360, true);
    expect(v.aspect).toBeCloseTo(16 / 9, 5);
    expect(v).toMatchObject({ w: 640, h: 360, coarse: true });
  });
  it('a zero height does not divide by zero', () => {
    expect(Number.isFinite(layoutFor(100, 0, false).aspect)).toBe(true);
  });
});
