import { describe, expect, it } from 'vitest';
import { dangerLevel } from '../../src/adapters/ui/chaseDanger';

describe('dangerLevel', () => {
  it('is silent while the dragon is far', () => {
    expect(dangerLevel(1)).toBe(0);
    expect(dangerLevel(0.55)).toBe(0);
  });
  it('rises monotonically to 1 as the gap closes', () => {
    let prev = 0;
    for (let g = 0.5; g >= 0; g -= 0.05) {
      const v = dangerLevel(g);
      expect(v).toBeGreaterThanOrEqual(prev);
      prev = v;
    }
    expect(dangerLevel(0)).toBeCloseTo(1, 6);
    expect(dangerLevel(-1)).toBeCloseTo(1, 6);
  });
});
