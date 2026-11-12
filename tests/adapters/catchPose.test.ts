import { describe, expect, it } from 'vitest';
import {
  FACE_FRAC,
  HEAD_H_OVER_W,
  SIDE_LAYOUT_ASPECT,
  catchPose,
  easeOutBack,
  irisRadius,
  type CatchPose,
} from '../../src/adapters/render/chase/catchPose';

const ASPECTS: Array<[string, number]> = [
  ['portrait 390/844', 390 / 844],
  ['landscape 844/390', 844 / 390],
  ['square 1.0', 1.0],
  ['just below side layout 1.19', 1.19],
  ['just above side layout 1.21', 1.21],
];
const pose = (aspect: number, settle: number): CatchPose =>
  catchPose(aspect, settle, { cx: 0, cy: 0, h: 0 });
/** Face width as a fraction of the visible width. */
const faceW = (aspect: number, h: number) => (FACE_FRAC * h) / (HEAD_H_OVER_W * aspect);

describe('catchPose fill frame (settle 0)', () => {
  it.each(ASPECTS)('fits vertically at %s', (_n, a) => {
    const p = pose(a, 0);
    expect(p.h).toBeGreaterThan(0);
    expect(p.h).toBeLessThanOrEqual(0.96 + 1e-9);
    expect(p.cy + p.h / 2).toBeLessThanOrEqual(0.5);
    expect(p.cy - p.h / 2).toBeGreaterThanOrEqual(-0.5);
  });

  it.each(ASPECTS)('face spans >= 80%% of the shorter side at %s', (_n, a) => {
    const p = pose(a, 0);
    const share = a < 1 ? faceW(a, p.h) : faceW(a, p.h) * a;
    expect(share).toBeGreaterThanOrEqual(0.8);
  });

  it.each(ASPECTS)('is horizontally centred at %s', (_n, a) => {
    expect(pose(a, 0).cx).toBeCloseTo(0, 9);
  });
});

describe('catchPose card frame (settle 1)', () => {
  it.each(ASPECTS.filter(([, a]) => a < SIDE_LAYOUT_ASPECT))(
    'docks the head at the top at %s',
    (_n, a) => {
      const p = pose(a, 1);
      const topGap = 0.5 - (p.cy + p.h / 2);
      expect(topGap).toBeGreaterThanOrEqual(0.02);
      expect(topGap).toBeLessThanOrEqual(0.05);
      expect(p.cy - p.h / 2).toBeGreaterThanOrEqual(0.5 - 0.46);
      expect(p.cx).toBe(0);
    },
  );

  it.each(ASPECTS.filter(([, a]) => a >= SIDE_LAYOUT_ASPECT))(
    'docks the face on the left at %s',
    (_n, a) => {
      const p = pose(a, 1);
      const centre = 0.5 + p.cx;
      expect(centre).toBeGreaterThanOrEqual(0.24);
      expect(centre).toBeLessThanOrEqual(0.28);
      expect(centre + faceW(a, p.h) / 2).toBeLessThan(0.46);
      expect(p.cy + p.h / 2).toBeLessThanOrEqual(0.5);
      expect(p.cy - p.h / 2).toBeGreaterThanOrEqual(-0.5);
    },
  );
});

describe('catchPose mechanics', () => {
  it('writes into and returns the out object', () => {
    const out = { cx: 9, cy: 9, h: 9 };
    expect(catchPose(0.5, 0.5, out)).toBe(out);
    expect(out.h).not.toBe(9);
  });

  it.each(ASPECTS)('clamps settle outside 0..1 at %s', (_n, a) => {
    expect(pose(a, -3)).toEqual(pose(a, 0));
    expect(pose(a, 7)).toEqual(pose(a, 1));
  });

  it.each(ASPECTS)('h is monotonic across settle at %s', (_n, a) => {
    const hs = [0, 0.25, 0.5, 0.75, 1].map((s) => pose(a, s).h);
    const dir = Math.sign(hs[4] - hs[0]);
    for (let i = 1; i < hs.length; i++) {
      const d = hs[i] - hs[i - 1];
      if (dir >= 0) expect(d).toBeGreaterThanOrEqual(-1e-12);
      else expect(d).toBeLessThanOrEqual(1e-12);
    }
  });
});

describe('easeOutBack', () => {
  it('hits 0 and 1 at the ends', () => {
    expect(easeOutBack(0)).toBeCloseTo(0, 9);
    expect(easeOutBack(1)).toBeCloseTo(1, 9);
  });
  it('overshoots with a peak between 1.03 and 1.15', () => {
    let max = 0;
    for (let i = 1; i < 100; i++) max = Math.max(max, easeOutBack(i / 100));
    expect(max).toBeGreaterThan(1.03);
    expect(max).toBeLessThan(1.15);
  });
  it('clamps outside 0..1', () => {
    expect(easeOutBack(-5)).toBe(easeOutBack(0));
    expect(easeOutBack(5)).toBe(easeOutBack(1));
  });
});

describe('irisRadius', () => {
  it('is about 1.2 at 0 and 0.46 at 1', () => {
    expect(irisRadius(0)).toBeCloseTo(1.2, 2);
    expect(irisRadius(1)).toBeCloseTo(0.46, 2);
  });
  it('decreases with k', () => {
    let prev = irisRadius(0);
    for (let i = 1; i <= 20; i++) {
      const r = irisRadius(i / 20);
      expect(r).toBeLessThan(prev);
      prev = r;
    }
  });
});
