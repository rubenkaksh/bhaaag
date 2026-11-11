import { describe, expect, it } from 'vitest';
import {
  BEST_KEYS,
  GAME_MODES,
  MODE_KEY,
  bestLabel,
  loadMode,
  parseMode,
  readBest,
  saveMode,
  writeBest,
} from '../../src/app/modes/mode';

function memStore(init: Record<string, string> = {}) {
  const m = new Map(Object.entries(init));
  return {
    getItem: (k: string) => m.get(k) ?? null,
    setItem: (k: string, v: string) => void m.set(k, v),
  };
}

describe('game modes', () => {
  it('lists classic, chase and strategy', () => {
    expect(GAME_MODES).toEqual(['classic', 'chase', 'strategy']);
    expect(BEST_KEYS.strategy).toBe('bhagdori.best.strategy');
    expect(BEST_KEYS.classic).toBe('bhagdori.best.l1');
  });
  it('parseMode accepts only known modes', () => {
    expect(parseMode('chase')).toBe('chase');
    expect(parseMode('strategy')).toBe('strategy');
    expect(parseMode('x')).toBeNull();
    expect(parseMode(null)).toBeNull();
  });
  it('loadMode: override > saved > classic', () => {
    expect(loadMode(memStore(), undefined)).toBe('classic');
    expect(loadMode(memStore({ [MODE_KEY]: 'chase' }))).toBe('chase');
    expect(loadMode(memStore({ [MODE_KEY]: 'chase' }), 'classic')).toBe('classic');
    expect(loadMode(memStore({ [MODE_KEY]: 'junk' }), 'nope')).toBe('classic');
  });
  it('saveMode round-trips', () => {
    const s = memStore();
    saveMode('chase', s);
    expect(loadMode(s)).toBe('chase');
  });
  it('best is stored per mode and 0 means none', () => {
    const s = memStore();
    expect(readBest('classic', s)).toBe(0);
    writeBest('chase', 1234, s);
    expect(readBest('chase', s)).toBe(1234);
    expect(readBest('classic', s)).toBe(0);
    expect(readBest('classic', memStore({ [BEST_KEYS.classic]: 'abc' }))).toBe(0);
  });
  it('survives a throwing store', () => {
    const bad = {
      getItem: () => {
        throw new Error('blocked');
      },
      setItem: () => {
        throw new Error('blocked');
      },
    };
    expect(loadMode(bad)).toBe('classic');
    expect(readBest('classic', bad)).toBe(0);
    expect(() => saveMode('chase', bad)).not.toThrow();
    expect(() => writeBest('chase', 5, bad)).not.toThrow();
  });
  it('bestLabel formats per mode', () => {
    expect(bestLabel('classic', 21.43)).toBe('Best time 0:21.4');
    expect(bestLabel('classic', 0)).toBe('No best time yet');
    expect(bestLabel('chase', 1234.7)).toBe('Best score 1234');
    expect(bestLabel('chase', 0)).toBe('No best score yet');
  });
});
