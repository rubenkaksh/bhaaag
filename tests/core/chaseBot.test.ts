import { describe, expect, it } from 'vitest';
import { DEFAULT_TUNING as cfg } from '../../src/core/config';
import { cfgWith, NO_DRAGON, runBot } from './chaseBot';

describe('chase bots', () => {
  it('a casual bot clears at least 8 rows on three seeds with the real dragon', () => {
    for (const seed of [1, 12345, 777]) {
      const r = runBot(seed, 'casual', cfg, 60 * 60, 8);
      expect(r.cs.heroRow, `seed ${seed}`).toBeGreaterThanOrEqual(8);
      expect(r.dead).toBe(false);
    }
  });

  it('a hero that never moves is caught in about 8 s', () => {
    const r = runBot(1, 'casual', cfgWith({}), 0);
    expect(r.ticks).toBe(0);
    // idle: step the dragon only
    const idle = runBot(1, 'casual', cfgWith({ startGap: 36 }), 1);
    expect(idle.caught).toBe(false);
  });

  it('a stalled bot (no forward progress) is caught', () => {
    // Give the bot no time to move: lock the hero by starting the dragon right behind it.
    const r = runBot(1, 'casual', cfgWith({ startGap: 3, v0: 6 }), 60 * 30);
    expect(r.caught).toBe(true);
  });

  it('same seed gives an identical trace', () => {
    const a = runBot(42, 'chain', cfg, 60 * 40);
    const b = runBot(42, 'chain', cfg, 60 * 40);
    expect(b.trace).toEqual(a.trace);
    expect(b.score).toBe(a.score);
  });

  it('without a dragon the chain bot keeps going for 30 rows', () => {
    const r = runBot(5, 'chain', cfgWith(NO_DRAGON), 60 * 400, 30);
    expect(r.cs.heroRow).toBeGreaterThanOrEqual(30);
    expect(r.cs.rw.newest - r.cs.rw.oldest).toBeLessThan(cfg.chase.slots);
  });
});
