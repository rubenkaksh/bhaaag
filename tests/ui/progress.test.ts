import { describe, expect, it } from 'vitest';
import { altitudeFraction, formatHop, hopIndex } from '../../src/adapters/ui/progress';

describe('hopIndex', () => {
  it('counts hooked route anchors and clamps', () => {
    expect(hopIndex(0, 7)).toBe(0);
    expect(hopIndex(3, 7)).toBe(3);
    expect(hopIndex(9, 7)).toBe(7);
    expect(hopIndex(-1, 7)).toBe(0);
    expect(hopIndex(2, 0)).toBe(0);
  });
  it('formats', () => {
    expect(formatHop(2, 7)).toBe('HOP 2/7');
  });
});

describe('altitudeFraction', () => {
  it('maps start to 0 and goal to 1', () => {
    expect(altitudeFraction(100, 100, 20)).toBe(0);
    expect(altitudeFraction(20, 100, 20)).toBe(1);
    expect(altitudeFraction(60, 100, 20)).toBeCloseTo(0.5);
  });
  it('clamps and handles a degenerate span', () => {
    expect(altitudeFraction(120, 100, 20)).toBe(0);
    expect(altitudeFraction(0, 100, 20)).toBe(1);
    expect(altitudeFraction(50, 10, 10)).toBe(0);
  });
});
