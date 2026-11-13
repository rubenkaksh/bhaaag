import { describe, expect, it } from 'vitest';
import { DEFAULT_TUNING } from '../../src/core/config';
import { framingFor, portraitBlend } from '../../src/adapters/render/framing';
import { layoutFor } from '../../src/app/viewport';

const base = DEFAULT_TUNING.camera;
const f = (w: number, h: number) => framingFor(layoutFor(w, h, true), base);
const hfovDeg = (fovDeg: number, aspect: number) =>
  (2 * Math.atan(Math.tan((fovDeg * Math.PI) / 360) * aspect) * 180) / Math.PI;

describe('framingFor', () => {
  it.each([
    [1920, 1080],
    [640, 360],
    [800, 800],
  ])('is identity for aspect >= 1 (%ix%i)', (w, h) => {
    const r = f(w, h);
    expect(r.camera).toBe(base);
    expect(r.lensShiftY).toBe(0);
  });

  it('portrait 390x844 uses fov 88 and the B1 table', () => {
    const r = f(390, 844);
    expect(r.camera.fov).toBeCloseTo(88, 5);
    expect(r.camera.fovMax).toBeCloseTo(98, 5);
    expect(r.camera.dist).toBeCloseTo(5.6, 5);
    expect(r.camera.distSlide).toBeCloseTo(8, 5);
    expect(r.camera.height).toBeCloseTo(2.2, 5);
    expect(r.camera.shoulder).toBeCloseTo(0, 5);
    expect(r.camera.downhillBias).toBeCloseTo(12, 5);
    expect(Math.abs(r.lensShiftY)).toBeCloseTo(0.14, 5);
    expect(r.lensShiftY).toBeLessThan(0); // image moves down: hero low in frame
  });

  it('horizontal fov stays between 45 and 55 degrees on phones', () => {
    for (const [w, h] of [
      [390, 844],
      [430, 932],
      [360, 800],
    ] as const) {
      const r = f(w, h);
      const hf = hfovDeg(r.camera.fov, w / h);
      expect(hf).toBeGreaterThan(45);
      expect(hf).toBeLessThan(55);
    }
  });

  it('blends monotonically from landscape to portrait', () => {
    let prevFov = base.fov;
    let prevShift = 0;
    for (let a = 1; a >= 0.4; a -= 0.02) {
      const r = framingFor(layoutFor(a * 1000, 1000, true), base);
      expect(r.camera.fov).toBeGreaterThanOrEqual(prevFov - 1e-9);
      expect(Math.abs(r.lensShiftY)).toBeGreaterThanOrEqual(prevShift - 1e-9);
      prevFov = r.camera.fov;
      prevShift = Math.abs(r.lensShiftY);
    }
    expect(portraitBlend(1)).toBe(0);
    expect(portraitBlend(0.6)).toBe(1);
    expect(portraitBlend(0.3)).toBe(1);
  });

  it('does not mutate the base camera', () => {
    const copy = { ...base };
    f(390, 844);
    expect(base).toEqual(copy);
  });
});
