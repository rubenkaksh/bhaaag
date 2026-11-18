import { describe, expect, it } from 'vitest';
import {
  MODE_DEFS,
  MODE_IDS,
  SCORE_RULES,
  TIMED_RULES,
  lobbyModes,
  resolvePlayKey,
  rulesForKey,
} from '../../src/app/modes/registry';
import type { GameModeDef, ModeRules } from '../../src/app/modes/registry';
import { BEST_KEYS } from '../../src/app/modes/mode';
import { classicLevels, loadSelection } from '../../src/app/modes/levels';

// A 20-line fake mode: score = 10 points per tick the player "holds", best = highest.
const fakeRules: ModeRules = {
  onFinish: (value, prev) =>
    value > prev ? { best: value, record: true } : { best: prev, record: false },
};
const fake = (enabled: boolean): GameModeDef => ({
  id: 'fake',
  label: 'Fake',
  enabled,
  levels: () => [],
  bestKey: () => 'bhagdori.best.fake',
  playKey: () => 'chase',
  rules: fakeRules,
});

describe('mode registry', () => {
  it('ships Classic and Dragon Chase, both enabled, best keys unchanged', () => {
    expect(MODE_IDS).toEqual(['classic', 'chase']);
    expect(lobbyModes().map((d) => d.label)).toEqual(['Classic', 'Dragon Chase']);
    expect(MODE_DEFS[0].bestKey('classic')).toBe('bhagdori.best.l1');
    expect(MODE_DEFS[0].bestKey('g:home-street')).toBe('bhagdori.best.g.home-street');
    expect(MODE_DEFS[1].bestKey('chase')).toBe('bhagdori.best.chase');
    for (const k of Object.keys(BEST_KEYS))
      expect(BEST_KEYS[k as 'classic']).toMatch(/^bhagdori\.best\./);
  });

  it('enabled=false hides a mode from the lobby only', () => {
    const defs = [...MODE_DEFS, fake(false)];
    expect(lobbyModes(defs).map((d) => d.id)).toEqual(['classic', 'chase']);
    expect(lobbyModes([...MODE_DEFS, fake(true)]).map((d) => d.id)).toEqual([
      'classic',
      'chase',
      'fake',
    ]);
    // a hidden mode still resolves by id and in URL parsing
    const ids = defs.map((d) => d.id);
    const levels = classicLevels(false);
    expect(loadSelection(new URLSearchParams('mode=fake'), levels, undefined, ids).mode).toBe(
      'fake',
    );
    expect(loadSelection(new URLSearchParams('mode=fake'), levels, undefined, MODE_IDS).mode).toBe(
      'classic',
    );
  });

  it('legacy URLs still resolve to a Classic level', () => {
    const levels = classicLevels(false);
    for (const [q, lvl] of [
      ['mode=village', 'village'],
      ['mode=strategy', 'nagarkot'],
      ['mode=g:valley-1', 'valley-1'],
    ]) {
      const s = loadSelection(new URLSearchParams(q), levels, undefined, MODE_IDS);
      expect(s).toEqual({ mode: 'classic', level: lvl });
      expect(resolvePlayKey(s, levels)).toBe(levels.find((l) => l.id === lvl)?.key);
    }
    expect(resolvePlayKey({ mode: 'chase', level: 'l1' }, levels)).toBe('chase');
  });

  it('timed rules: first run records, only a faster run replaces', () => {
    expect(TIMED_RULES.onFinish(42, 0)).toEqual({ best: 42, record: true });
    expect(TIMED_RULES.onFinish(40, 42)).toEqual({ best: 40, record: true });
    expect(TIMED_RULES.onFinish(42, 42)).toEqual({ best: 42, record: false });
    expect(TIMED_RULES.onFinish(50, 42)).toEqual({ best: 42, record: false });
    expect(rulesForKey('village')).toBe(TIMED_RULES);
    expect(rulesForKey('g:home-street')).toBe(TIMED_RULES);
  });

  it('score rules: higher wins, and chase maps to them', () => {
    expect(SCORE_RULES.onFinish(5, 0)).toEqual({ best: 5, record: true });
    expect(SCORE_RULES.onFinish(5, 5)).toEqual({ best: 5, record: false });
    expect(SCORE_RULES.onFinish(3, 5)).toEqual({ best: 5, record: false });
    expect(rulesForKey('chase')).toBe(SCORE_RULES);
  });

  it('a fake mode runs 10 pure ticks through the rules seam', () => {
    let acc = 0;
    for (let i = 0; i < 10; i++) acc += 10; // one pure tick: 10 points while held
    expect(acc).toBe(100);
    expect(fakeRules.onFinish(acc, 60)).toEqual({ best: 100, record: true });
    expect(fakeRules.onFinish(acc, 100)).toEqual({ best: 100, record: false });
  });
});
