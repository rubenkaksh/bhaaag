import { describe, expect, it } from 'vitest';
import { Accumulator } from '../../src/app/loop';

const STEP = 1 / 60;

describe('Accumulator', () => {
  it('runs ~60 steps for 60 frames of 16.67 ms (1 s of wall time)', () => {
    const acc = new Accumulator(STEP);
    let total = 0;
    for (let i = 0; i < 60; i++) {
      total += acc.feed(0.01667); // 16.67 ms per frame
    }
    expect(Math.abs(total - 60)).toBeLessThanOrEqual(1);
    expect(acc.alpha).toBeGreaterThanOrEqual(0);
    expect(acc.alpha).toBeLessThan(1);
  });

  it('clamps a huge frame to maxSteps and drops the excess', () => {
    const acc = new Accumulator(STEP, 5);
    const steps = acc.feed(1.0); // one full second in a single frame
    expect(steps).toBe(5);
    // Excess dropped: no leftover backlog waiting to explode next frame.
    expect(acc.alpha).toBeGreaterThanOrEqual(0);
    expect(acc.alpha).toBeLessThan(1);
    expect(acc.feed(0)).toBe(0);
  });

  it('keeps alpha in [0, 1) across varied frame times', () => {
    const acc = new Accumulator(STEP);
    const dts = [0.001, 0.008, 0.01667, 0.033, 0.05, 0.2, 0.7, 0.01667];
    for (const dt of dts) {
      acc.feed(dt);
      expect(acc.alpha).toBeGreaterThanOrEqual(0);
      expect(acc.alpha).toBeLessThan(1);
    }
  });

  it('carries leftover time across frames', () => {
    const acc = new Accumulator(STEP);
    // 60% of a step: nothing to run, remainder must be kept.
    expect(acc.feed(STEP * 0.6)).toBe(0);
    expect(acc.alpha).toBeCloseTo(0.6, 10);
    // Another 60% pushes past one step; 20% carries over.
    expect(acc.feed(STEP * 0.6)).toBe(1);
    expect(acc.alpha).toBeCloseTo(0.2, 10);
    // Carried remainder still counts on the next frame.
    expect(acc.feed(STEP * 0.8)).toBe(1);
    expect(acc.alpha).toBeCloseTo(0.0, 10);
  });

  it('ignores negative and non-finite frame times', () => {
    const acc = new Accumulator(STEP);
    expect(acc.feed(-0.5)).toBe(0);
    expect(acc.feed(Number.NaN)).toBe(0);
    expect(acc.feed(Number.POSITIVE_INFINITY)).toBe(0);
    expect(acc.alpha).toBe(0);
  });

  it('reset drops accumulated time', () => {
    const acc = new Accumulator(STEP);
    acc.feed(STEP * 0.75);
    expect(acc.alpha).toBeCloseTo(0.75, 10);
    acc.reset();
    expect(acc.alpha).toBe(0);
    expect(acc.feed(STEP * 0.5)).toBe(0);
  });

  it('rejects invalid constructor arguments', () => {
    expect(() => new Accumulator(0)).toThrow(RangeError);
    expect(() => new Accumulator(-1)).toThrow(RangeError);
    expect(() => new Accumulator(STEP, 0)).toThrow(RangeError);
  });
});

describe('GameLoop pause/resume', () => {
  it('runs no ticks while paused and no catch-up burst after resume', async () => {
    const { GameLoop } = await import('../../src/app/loop');
    let now = 0;
    const cbs: Array<(t: number) => void> = [];
    const g = globalThis as Record<string, unknown>;
    const saved = {
      raf: g.requestAnimationFrame,
      caf: g.cancelAnimationFrame,
      doc: g.document,
      perf: g.performance,
    };
    g.requestAnimationFrame = (cb: (t: number) => void): number => cbs.push(cb);
    g.cancelAnimationFrame = (id: number): void => {
      cbs[id - 1] = (): void => undefined;
    };
    g.document = {
      hidden: false,
      addEventListener: (): void => {},
      removeEventListener: (): void => {},
    };
    g.performance = { now: (): number => now };
    try {
      let steps = 0;
      const loop = new GameLoop({ fixedHz: 60, onStep: () => steps++, onRender: () => {} });
      loop.start();
      const frame = (t: number): void => {
        now = t;
        const cb = cbs.pop();
        if (cb) cb(t);
      };
      frame(16.7);
      frame(33.4);
      const before = steps;
      expect(before).toBeGreaterThan(0);
      loop.pause();
      cbs.length = 0;
      now = 10_000; // long pause
      expect(steps).toBe(before);
      loop.resume();
      expect(cbs.length).toBe(1);
      frame(10_016.7);
      expect(steps - before).toBeLessThanOrEqual(1);
      loop.stop();
    } finally {
      g.requestAnimationFrame = saved.raf;
      g.cancelAnimationFrame = saved.caf;
      g.document = saved.doc;
      g.performance = saved.perf;
    }
  });
});
