import { describe, expect, it } from 'vitest';
import { DEFAULT_TUNING as cfg } from '../../src/core/config';
import { chaseScore, copyChaseState, newChaseState } from '../../src/core/chase/chase';

describe('chaseScore', () => {
  it('is floor(distance) plus hop, clean and perfect bonuses', () => {
    const cs = newChaseState(1, 0, cfg);
    cs.maxProgress = 123.9;
    cs.hops = 3;
    cs.cleans = 2;
    cs.perfects = 1;
    const c = cfg.chase;
    expect(chaseScore(cs, cfg)).toBe(123 + 3 * c.scoreHop + 2 * c.scoreClean + c.scorePerfect);
  });

  it('copyChaseState copies scalars', () => {
    const a = newChaseState(1, 0, cfg);
    const b = newChaseState(1, 0, cfg);
    a.hops = 7;
    a.dragon.z = -55;
    copyChaseState(b, a);
    expect(b.hops).toBe(7);
    expect(b.dragon.z).toBe(-55);
  });
});
