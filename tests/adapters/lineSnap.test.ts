import { describe, expect, it } from 'vitest';
import { LineSnap, SNAP_SEC, SPAN_SAG, cablePoint } from '../../src/adapters/render/lineSnap';

describe('fixed-line ride (hero on the drawn cable)', () => {
  it('cable point: ends are the cable ends, the middle sags by SPAN_SAG of the span', () => {
    const out = [0, 0, 0];
    expect(cablePoint(0, 10, 0, 0, 0, -20, 0, 10, 0, out)).toBe(0);
    expect(out).toEqual([0, 10, 0]);
    expect(cablePoint(0, 10, 0, 0, 0, -20, 0, 0, -20, out)).toBe(1);
    expect(out[1]).toBeCloseTo(0);
    cablePoint(0, 10, 0, 0, 0, -20, 0, 5, -10, out);
    expect(out[1]).toBeCloseTo(5 - Math.hypot(10, 20) * SPAN_SAG);
  });

  it('pulls a hand that hooked off-centre onto the cable', () => {
    // Pad centre (0, 2, 0); the hero hooked 1.4 m to the side: the hand is off the cable.
    const out = [0, 0, 0];
    const hx = 1.4 * (1 - 0.25); // chord from (1.4, 2, 0) to the anchor, a quarter of the way
    const hy = 2 - 8 * 0.25;
    const hz = -24 * 0.25;
    cablePoint(0, 2, 0, 0, -6, -24, hx, hy, hz, out);
    const s = new LineSnap();
    for (let i = 0; i < 30; i++) s.step(true, out[0] - hx, out[1] - hy, out[2] - hz, 1 / 60);
    expect(hx + s.ox).toBeCloseTo(out[0]);
    expect(hy + s.oy).toBeCloseTo(out[1]);
    expect(hz + s.oz).toBeCloseTo(out[2]);
    expect(Math.abs(s.ox)).toBeGreaterThan(0.9);
  });

  it('eases in at attach and out at release (no pop either way)', () => {
    const s = new LineSnap();
    s.step(true, 1, 0, 0, 1 / 60);
    expect(s.ox).toBeGreaterThan(0);
    expect(s.ox).toBeLessThan(0.05);
    for (let t = 0; t < SNAP_SEC; t += 1 / 60) s.step(true, 1, 0, 0, 1 / 60);
    expect(s.ox).toBeCloseTo(1);
    s.step(false, 0, 0, 0, 1 / 60);
    expect(s.ox).toBeGreaterThan(0.95); // keeps the last offset, fading
    for (let t = 0; t < SNAP_SEC + 0.02; t += 1 / 60) s.step(false, 0, 0, 0, 1 / 60);
    expect(s.ox).toBe(0);
  });
});
