import { describe, expect, it } from 'vitest';
import {
  DEFAULT_LEVEL,
  LEVEL_KEY,
  MODE_STORE_KEY,
  classicLevels,
  legacyLevel,
  loadSelection,
  playKey,
  saveSelection,
} from '../../src/app/modes/levels';
import { MODE_IDS } from '../../src/app/modes/registry';
import { BEST_KEYS, GAME_MODES } from '../../src/app/modes/mode';

function memStore(init: Record<string, string> = {}) {
  const m = new Map(Object.entries(init));
  return {
    getItem: (k: string) => m.get(k) ?? null,
    setItem: (k: string, v: string) => void m.set(k, v),
  };
}
const q = (s: string) => new URLSearchParams(s);

describe('two modes (ADR 0016)', () => {
  it('exposes exactly Classic and Dragon Chase', () => {
    expect(MODE_IDS).toEqual(['classic', 'chase']);
  });
  it('every Classic level maps to a known play key, and Home Street, Nagarkot, Valley are there', () => {
    const levels = classicLevels(true);
    const ids = levels.map((l) => l.id);
    expect(ids).toEqual(
      expect.arrayContaining(['l1', 'home-street', 'nagarkot', 'valley-1', 'village', 'builder']),
    );
    for (const l of levels) expect(GAME_MODES).toContain(l.key);
    expect(new Set(ids).size).toBe(ids.length);
  });
  it('playKey: chase ignores the level, classic follows it', () => {
    const levels = classicLevels(false);
    expect(playKey({ mode: 'chase', level: 'home-street' }, levels)).toBe('chase');
    expect(playKey({ mode: 'classic', level: 'home-street' }, levels)).toBe('g:home-street');
    expect(playKey({ mode: 'classic', level: 'nagarkot' }, levels)).toBe('strategy');
    expect(playKey({ mode: 'classic', level: 'nope' }, levels)).toBe('classic');
  });
  it('registers nagarkot-home in the Classic row with its own best key', () => {
    const levels = classicLevels(false);
    expect(levels.map((l) => l.id)).toContain('nagarkot-home');
    expect(playKey({ mode: 'classic', level: 'nagarkot-home' }, levels)).toBe('home');
    expect(BEST_KEYS.home).toBe('bhagdori.best.nagarkot-home');
  });

  it('old ?mode= values become a Classic level', () => {
    expect(legacyLevel('g:home-street')).toBe('home-street');
    expect(legacyLevel('strategy')).toBe('nagarkot');
    expect(legacyLevel('village')).toBe('village');
    expect(legacyLevel('classic')).toBeNull();
    const levels = classicLevels(false);
    expect(loadSelection(q('mode=g:home-street'), levels, memStore())).toEqual({
      mode: 'classic',
      level: 'home-street',
    });
    expect(loadSelection(q('mode=strategy'), levels, memStore()).level).toBe('nagarkot');
  });
  it('URL beats saved choice, saved beats default; unknown levels fall back', () => {
    const levels = classicLevels(false);
    const s = memStore({ [MODE_STORE_KEY]: 'chase', [LEVEL_KEY]: 'valley-1' });
    expect(loadSelection(q(''), levels, s)).toEqual({ mode: 'chase', level: 'valley-1' });
    expect(loadSelection(q('mode=classic&level=home-street'), levels, s)).toEqual({
      mode: 'classic',
      level: 'home-street',
    });
    expect(loadSelection(q('level=builder'), levels, memStore()).level).toBe(DEFAULT_LEVEL);
    expect(loadSelection(q('level=builder'), classicLevels(true), memStore()).level).toBe(
      'builder',
    );
  });
  it('saveSelection round-trips', () => {
    const s = memStore();
    saveSelection({ mode: 'chase', level: 'home-street' }, s);
    expect(loadSelection(q(''), classicLevels(false), s)).toEqual({
      mode: 'chase',
      level: 'home-street',
    });
  });
});
