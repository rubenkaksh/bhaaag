import { describe, expect, it } from 'vitest';
import { DEFAULT_TUNING as cfg } from '../../src/core/config';
import { cloudCoverFor, dragonSpeed, dragonStep, newDragon } from '../../src/core/chase/dragon';

describe('dragon', () => {
  it('starts startGap behind the hero at v0', () => {
    const d = newDragon(0, cfg);
    expect(d.gap).toBe(cfg.chase.startGap);
    expect(d.v).toBe(cfg.chase.v0);
  });

  it('speeds up linearly then caps at vMax', () => {
    expect(dragonSpeed(0, 10, cfg)).toBeCloseTo(cfg.chase.v0, 12);
    expect(dragonSpeed(100, 10, cfg)).toBeCloseTo(cfg.chase.v0 + 100 * cfg.chase.accel, 12);
    expect(dragonSpeed(1e5, 10, cfg)).toBe(cfg.chase.vMax);
  });

  it('rubber-bands only beyond gapMax', () => {
    const base = dragonSpeed(10, cfg.chase.gapMax, cfg);
    expect(dragonSpeed(10, cfg.chase.gapMax + 10, cfg)).toBeCloseTo(
      base + 10 * cfg.chase.rubberK,
      9,
    );
  });

  it('catches a stationary hero in about 8 s and never slows down', () => {
    const d = newDragon(0, cfg);
    let ticks = 0;
    while (d.caught === 0 && ticks < 60 * 60) {
      dragonStep(d, 0, cfg);
      ticks++;
    }
    const secs = ticks / cfg.fixedHz;
    expect(secs).toBeGreaterThan(6);
    expect(secs).toBeLessThan(10);
  });

  it('cloud cover is 0 far away, 1 when caught, monotonic', () => {
    expect(cloudCoverFor(cfg.chase.fogGap + 5, cfg)).toBe(0);
    expect(cloudCoverFor(cfg.chase.catchGap, cfg)).toBe(1);
    let prev = 0;
    for (let g = cfg.chase.fogGap; g >= cfg.chase.catchGap; g -= 0.5) {
      const c = cloudCoverFor(g, cfg);
      expect(c).toBeGreaterThanOrEqual(prev);
      prev = c;
    }
  });
});
