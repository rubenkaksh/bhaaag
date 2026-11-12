import { describe, expect, it } from 'vitest';
import {
  HOUSE_COUNT,
  STRATEGY_SEED,
  UNREACHED_MAX,
  buildStrategy,
  hasEscape,
  levelValid,
  strategyUsedFallback,
} from '../../src/content/strategy/gen';

const SEEDS = [STRATEGY_SEED];
for (let i = 1; i <= 20; i++) SEEDS.push((STRATEGY_SEED + i * 7919) >>> 0);

describe('strategy generator guard', () => {
  it.each(SEEDS)('seed %i yields a valid level without the fallback', (seed) => {
    const s = buildStrategy(seed);
    expect(strategyUsedFallback(), 'fallback was used: level is not fully valid').toBe(false);
    expect(levelValid(s)).toBe(true);
    expect(hasEscape(s.graph)).toBe(true);
    expect(s.stats.escapePaths).toBeGreaterThanOrEqual(2);
    expect(s.summary.unreachedRoofs).toBeLessThanOrEqual(UNREACHED_MAX);
    expect(s.summary.houses).toBe(HOUSE_COUNT);
    expect(s.layout.houses.length).toBe(100);
  });

  it('is deterministic: same seed, same level', () => {
    const a = buildStrategy(STRATEGY_SEED);
    const first = JSON.stringify(a.level);
    buildStrategy(STRATEGY_SEED + 1); // evict the one-entry cache
    const c = buildStrategy(STRATEGY_SEED);
    expect(c).not.toBe(a);
    expect(JSON.stringify(c.level)).toBe(first);
  });
});
