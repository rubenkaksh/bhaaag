import { describe, expect, it } from 'vitest';
import { DEFAULT_TUNING as cfg } from '../../src/core/config';
import { RowSpec, difficultyFor, rowSpec, rowSpecInto } from '../../src/core/chase/rows';
import { dragonSpeed } from '../../src/core/chase/dragon';
import { NO_DRAGON, cfgWith, runBot } from './chaseBot';

const SEEDS = [1, 2, 3, 5, 8, 13, 21, 99, 777, 12345, 424242, 7];

describe('difficultyFor', () => {
  it('is 0 at v0, 1 at vMax, clamped and monotonic', () => {
    expect(difficultyFor(cfg.chase.v0, cfg)).toBe(0);
    expect(difficultyFor(cfg.chase.vMax, cfg)).toBe(1);
    expect(difficultyFor(-5, cfg)).toBe(0);
    expect(difficultyFor(1e6, cfg)).toBe(1);
    let prev = -1;
    for (let v = 0; v <= 20; v += 0.05) {
      const d = difficultyFor(v, cfg);
      expect(d).toBeGreaterThanOrEqual(prev);
      expect(d).toBeGreaterThanOrEqual(0);
      expect(d).toBeLessThanOrEqual(1);
      prev = d;
    }
  });

  it('follows the dragon ramp over time', () => {
    const a = difficultyFor(dragonSpeed(0, 30, cfg), cfg);
    const b = difficultyFor(dragonSpeed(60, 30, cfg), cfg);
    const c = difficultyFor(dragonSpeed(600, 30, cfg), cfg);
    expect(a).toBeLessThan(b);
    expect(b).toBeLessThan(c);
    expect(c).toBe(1);
  });
});

describe('rowSpec by difficulty', () => {
  it('is deterministic for seed + row + difficulty, and gaps stay bounded', () => {
    const s = new RowSpec();
    for (const seed of SEEDS) {
      for (const d of [0, 0.5, 1]) {
        for (let r = 0; r < 120; r++) {
          const a = rowSpec(seed, r, d);
          rowSpecInto(seed, r, s, d);
          expect(s).toEqual(a);
          if (r >= 4) {
            expect(a.gap).toBeGreaterThanOrEqual(cfg.chase.gapBase);
            expect(a.gap).toBeLessThanOrEqual(cfg.chase.gapBase + cfg.chase.gapSpanHi);
          }
        }
      }
    }
  });

  it('harder rows have wider gaps and more decoys on average', () => {
    const avg = (d: number): [number, number] => {
      let g = 0;
      let dc = 0;
      let n = 0;
      for (const seed of SEEDS) {
        for (let r = 4; r < 200; r++) {
          const s = rowSpec(seed, r, d);
          g += s.gap;
          if (s.decoy !== 0) dc++;
          n++;
        }
      }
      return [g / n, dc / n];
    };
    const lo = avg(0);
    const hi = avg(1);
    expect(hi[0]).toBeGreaterThan(lo[0]);
    expect(hi[1]).toBeGreaterThan(lo[1]);
  });
});

describe('bots cross rows at every difficulty', () => {
  for (const [name, d] of [
    ['min', 0],
    ['mid', 0.5],
    ['max', 1],
  ] as const) {
    it(`chain and casual bots survive 20 rows at ${name} speed on many seeds`, () => {
      for (const seed of SEEDS) {
        for (const line of ['casual', 'chain'] as const) {
          const r = runBot(seed, line, cfgWith(NO_DRAGON), 60 * 400, 20, undefined, d);
          expect(r.dead, `seed ${seed} ${line} d=${d} cause ${r.deadCause}`).toBe(false);
          expect(r.cs.heroRow, `seed ${seed} ${line} d=${d}`).toBeGreaterThanOrEqual(20);
        }
      }
    });
  }

  it('the speed ramp feeds the streaming difficulty (same seed, identical trace)', () => {
    const a = runBot(9, 'chain', cfg, 60 * 40);
    const b = runBot(9, 'chain', cfg, 60 * 40);
    expect(b.trace).toEqual(a.trace);
  });
});
