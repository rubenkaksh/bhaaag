import { describe, expect, it, vi } from 'vitest';
import { withCloud } from '../../src/app/cloudPort';
import type { LeaderboardPort } from '../../src/app/leaderboard';
import { PLAYER_KEY, cleanName, createOnline } from '../../src/app/online';

const mem = () => {
  const m = new Map<string, string>();
  return { getItem: (k: string) => m.get(k) ?? null, setItem: (k: string, v: string) => void m.set(k, v) };
};
const json = (body: unknown, ok = true) => Promise.resolve({ ok, json: () => Promise.resolve(body) } as Response);
const mk = (fetchImpl: typeof fetch, store = mem()) =>
  createOnline({ url: 'https://x.supabase.co/', key: 'k', fetch: fetchImpl, store, hash: () => Promise.resolve('h'.repeat(16)) });

describe('online client', () => {
  it('validates names', () => {
    expect(cleanName('  Ra  ')).toBeNull();
    expect(cleanName(' Ruben  K ')).toBe('Ruben K');
    expect(cleanName('x'.repeat(21))).toBeNull();
  });
  it('does nothing without a player', async () => {
    const f = vi.fn();
    expect(await mk(f as unknown as typeof fetch).submit(4000)).toBeNull();
    expect(f).not.toHaveBeenCalled();
  });
  it('creates a stable player and posts the run', async () => {
    const store = mem();
    const f = vi.fn(() => json([{ best_ticks: 4000, is_new_best: true }]));
    const o = mk(f as unknown as typeof fetch, store);
    expect(o.setPlayerName('Ruben')).toBe(true);
    const id1 = JSON.parse(store.getItem(PLAYER_KEY)!).id;
    expect(o.setPlayerName('Ruben K')).toBe(true);
    expect(JSON.parse(store.getItem(PLAYER_KEY)!).id).toBe(id1);
    expect(await o.submit(4000)).toEqual({ bestTicks: 4000, isNewBest: true });
    const [url, init] = f.mock.calls[0] as unknown as [string, RequestInit];
    expect(url).toBe('https://x.supabase.co/rest/v1/rpc/submit_run');
    expect(JSON.parse(init.body as string)).toMatchObject({ p_name: 'Ruben K', p_mode: 'classic', p_level: 'l1', p_ticks: 4000 });
  });
  it('falls back to null / empty on failure', async () => {
    const o = mk((() => Promise.reject(new Error('offline'))) as typeof fetch);
    o.setPlayerName('Ruben');
    expect(await o.submit(4000)).toBeNull();
    expect(await o.top(10)).toEqual([]);
    const bad = mk((() => json({ message: 'x' }, false)) as typeof fetch);
    expect(await bad.top(10)).toEqual([]);
  });
  it('maps board rows', async () => {
    const o = mk((() => json([{ ticks: 3000, players: { display_name: 'A' } }])) as typeof fetch);
    expect(await o.top(5)).toEqual([{ name: 'A', ticks: 3000 }]);
  });
});

describe('withCloud', () => {
  const local = (): LeaderboardPort => ({ submit: vi.fn(), top: vi.fn(() => []) });
  it('always saves locally; mirrors only classic with a player', async () => {
    const submit = vi.fn(() => Promise.resolve(null));
    const load = vi.fn(() => Promise.resolve({ appOnline: () => ({ submit }) }));
    const l = local();
    withCloud(l, load, () => false).submit('classic', 66666, 0);
    expect(l.submit).toHaveBeenCalled();
    expect(load).not.toHaveBeenCalled();
    const l2 = local();
    const p = withCloud(l2, load, () => true);
    p.submit('chase', 66666, 0);
    expect(load).not.toHaveBeenCalled();
    p.submit('classic', 66667, 0);
    await new Promise((r) => setTimeout(r, 0));
    expect(submit).toHaveBeenCalledWith(4000);
  });
  it('swallows a failing loader', async () => {
    const l = local();
    expect(() => withCloud(l, () => Promise.reject(new Error('chunk')), () => true).submit('classic', 66667, 0)).not.toThrow();
    await new Promise((r) => setTimeout(r, 0));
  });
});
