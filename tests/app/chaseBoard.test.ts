import { describe, expect, it, vi } from 'vitest';
import { cfgHash } from '../../src/app/cfgHash';
import { BOARD_MODES, createOnline } from '../../src/app/online';
import { resolveCfg } from '../../src/app/tuning';
import { SCORE_RULES, TIMED_RULES } from '../../src/app/modes/registry';

const mem = () => {
  const m = new Map<string, string>();
  return {
    getItem: (k: string) => m.get(k) ?? null,
    setItem: (k: string, v: string) => void m.set(k, v),
  };
};
const json = (body: unknown, ok = true) =>
  Promise.resolve({ ok, json: () => Promise.resolve(body) } as Response);

describe('Dragon Chase board (L7)', () => {
  it('ranks by the ModeRules direction: Classic lower, Chase higher', () => {
    // A bigger value beats the previous best exactly when the board sorts high-first.
    expect(BOARD_MODES.classic.higherIsBetter).toBe(TIMED_RULES.onFinish(2, 1).record);
    expect(BOARD_MODES.chase.higherIsBetter).toBe(SCORE_RULES.onFinish(2, 1).record);
    expect(TIMED_RULES.onFinish(2, 1).record).toBe(false);
    expect(SCORE_RULES.onFinish(1, 2).record).toBe(false);
  });
  it('posts a chase score under mode chase / level endless', async () => {
    const f = vi.fn(() => json([{ best_ticks: 900, is_new_best: true }]));
    const o = createOnline({
      url: 'https://x.supabase.co',
      key: 'k',
      fetch: f as unknown as typeof fetch,
      store: mem(),
      hash: () => Promise.resolve('h'.repeat(16)),
    });
    o.setPlayerName('Ruben');
    expect(await o.submit(900, 'chase')).toEqual({ bestTicks: 900, isNewBest: true });
    const [, init] = f.mock.calls[0] as unknown as [string, RequestInit];
    expect(JSON.parse(init.body as string)).toMatchObject({
      p_mode: 'chase',
      p_level: 'endless',
      p_ticks: 900,
    });
  });
  it('queries the top list highest first for chase, fastest first for classic', async () => {
    const f = vi.fn(() => json([]));
    const o = createOnline({
      url: 'https://x.supabase.co',
      key: 'k',
      fetch: f as unknown as typeof fetch,
      store: mem(),
      hash: () => Promise.resolve('h'.repeat(16)),
    });
    await o.top(5, 'chase');
    await o.top(5);
    const urls = f.mock.calls.map((c) => (c as unknown as [string])[0]);
    expect(urls[0]).toContain('mode=eq.chase&level=eq.endless');
    expect(urls[0]).toContain('order=ticks.desc');
    expect(urls[1]).toContain('mode=eq.classic&level=eq.l1');
    expect(urls[1]).toContain('order=ticks.asc');
  });
  it('hashes the chase section so a score-rule change starts a new board', async () => {
    const t = resolveCfg('chase');
    const a = await cfgHash('endless', 1, t, ['chase']);
    const b = await cfgHash(
      'endless',
      1,
      { ...t, chase: { ...t.chase, scoreHop: t.chase.scoreHop + 1 } },
      ['chase'],
    );
    expect(a).not.toBe(b);
    expect(await cfgHash('endless', 1, t, ['chase'])).toBe(a);
    // the migration seeds this exact value (supabase/migrations/20261120000000_seed_cfg_versions_sprint.sql)
    expect(a).toBe('e3734a98eae3643e');
  });
  it('leaves the Classic hash unchanged (no extra sections)', async () => {
    const t = resolveCfg('classic');
    expect(await cfgHash('l1', 1, t)).toBe(await cfgHash('l1', 1, t, []));
  });
});
