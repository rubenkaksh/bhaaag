import { describe, expect, it } from 'vitest';
import { HERO_AIRBORNE, HERO_ATTACHED, HERO_DEAD, HERO_GROUNDED, HERO_HANGING } from '../../src/core/hero';
import { applyLookDrag, lookAvailability, newLookState, setLookActive, tickLook } from '../../src/adapters/render/lookOffset';

const D = Math.PI / 180;
const cfg = {
  lookYawMaxDeg: 170,
  lookPitchMinDeg: -25,
  lookPitchMaxDeg: 40,
  lookDragDegPerPx: 0.5,
  lookIdleSec: 4,
  lookEase: 0.1,
  lookInvertX: 1,
  lookInvertY: 0,
};

describe('look offset', () => {
  it('ignores drags while off', () => {
    const s = newLookState();
    applyLookDrag(s, 100, 100, cfg);
    expect(s.yaw).toBe(0);
    expect(s.pitch).toBe(0);
  });
  it('default: drag right turns the view right, drag down looks up', () => {
    const s = newLookState();
    setLookActive(s, true);
    applyLookDrag(s, 40, 20, cfg);
    expect(s.yaw).toBeCloseTo(20 * D);
    expect(s.pitch).toBeCloseTo(10 * D);
  });
  it('lookInvertX / lookInvertY flip the directions', () => {
    const s = newLookState();
    setLookActive(s, true);
    applyLookDrag(s, 40, 20, { ...cfg, lookInvertX: 0, lookInvertY: 1 });
    expect(s.yaw).toBeCloseTo(-20 * D);
    expect(s.pitch).toBeCloseTo(-10 * D);
  });
  it('clamps yaw and pitch', () => {
    const s = newLookState();
    setLookActive(s, true);
    applyLookDrag(s, 99999, 99999, cfg);
    expect(s.yaw).toBeCloseTo(170 * D);
    expect(s.pitch).toBeCloseTo(40 * D);
    applyLookDrag(s, -99999, -99999, cfg);
    expect(s.yaw).toBeCloseTo(-170 * D);
    expect(s.pitch).toBeCloseTo(-25 * D);
  });
  it('switches off after the idle timeout, a drag resets it, a held drag never times out', () => {
    const s = newLookState();
    setLookActive(s, true);
    for (let i = 0; i < 3; i++) tickLook(s, 1, false, cfg);
    expect(s.active).toBe(true);
    applyLookDrag(s, 1, 0, cfg);
    for (let i = 0; i < 3; i++) tickLook(s, 1, false, cfg);
    expect(s.active).toBe(true);
    for (let i = 0; i < 10; i++) tickLook(s, 1, true, cfg);
    expect(s.active).toBe(true);
    tickLook(s, 1, false, cfg);
    tickLook(s, 3, false, cfg);
    expect(s.active).toBe(false);
  });
  it('lookIdleSec 0 never times out', () => {
    const s = newLookState();
    setLookActive(s, true);
    tickLook(s, 1000, false, { ...cfg, lookIdleSec: 0 });
    expect(s.active).toBe(true);
  });
  it('holds while active and eases back to exactly 0 when off', () => {
    const s = newLookState();
    setLookActive(s, true);
    applyLookDrag(s, -200, 100, cfg);
    const y = s.yaw;
    tickLook(s, 0.016, false, cfg);
    expect(s.yaw).toBe(y);
    setLookActive(s, false);
    tickLook(s, 0.016, false, cfg);
    expect(Math.abs(s.yaw)).toBeLessThan(Math.abs(y));
    for (let i = 0; i < 300; i++) tickLook(s, 0.016, false, cfg);
    expect(s.yaw).toBe(0);
    expect(s.pitch).toBe(0);
  });
});

describe('lookAvailability', () => {
  it('grounded: available, toggle (not auto)', () => {
    expect(lookAvailability(HERO_GROUNDED)).toEqual({ available: true, auto: false });
  });
  it('attached to the rope: available and on by default', () => {
    expect(lookAvailability(HERO_ATTACHED)).toEqual({ available: true, auto: true });
  });
  it('airborne, hanging, dead: unavailable', () => {
    for (const m of [HERO_AIRBORNE, HERO_HANGING, HERO_DEAD]) {
      expect(lookAvailability(m)).toEqual({ available: false, auto: false });
    }
  });
});
