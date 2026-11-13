import { describe, expect, it } from 'vitest';
import { MANTLE_SEC, MantleBlend } from '../../src/adapters/render/mantleBlend';

describe('mantle blend (T316)', () => {
  it('starts at the old drawn spot, rises first, ends at the sim position', () => {
    const m = new MantleBlend();
    m.start(0, -1.2, 0.6); // hero was 1.2 m below and 0.6 m behind the new position
    m.step(0);
    expect(m.oy).toBeCloseTo(-1.2, 5);
    expect(m.oz).toBeCloseTo(0.6, 5);
    // 40 % in: mostly risen, still behind the edge
    m.step(MANTLE_SEC * 0.4);
    m.step(0);
    expect(Math.abs(m.oy)).toBeLessThan(0.6);
    expect(m.oz).toBeGreaterThan(0.45);
    let steps = 0;
    while (m.active && steps++ < 1000) m.step(1 / 60);
    m.step(1 / 60);
    expect(m.oy).toBe(0);
    expect(m.oz).toBe(0);
    expect(steps * (1 / 60)).toBeLessThan(MANTLE_SEC + 0.05);
  });

  it('ignores teleports and no-ops', () => {
    const m = new MantleBlend();
    m.start(0, -9, 0);
    expect(m.active).toBe(false);
    m.start(0, 0.01, 0);
    expect(m.active).toBe(false);
  });
});
