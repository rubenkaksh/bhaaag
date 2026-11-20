import { describe, expect, it, vi } from 'vitest';
import l1 from '../../content/levels/l1.json';
import { cfgHash } from '../../src/app/cfgHash';
import { createOnline } from '../../src/app/online';
import { CLAMPS, rowsToOverrides } from '../../src/app/remoteConfig';
import { bakedTuning, resolveCfg } from '../../src/app/tuning';

const rows = (o: Record<string, unknown>) =>
  Object.entries(o).map(([key, value]) => ({ key, value }));
const json = (body: unknown, ok = true) =>
  Promise.resolve({ ok, json: () => Promise.resolve(body) } as Response);
const online = (f: typeof fetch) =>
  createOnline({ url: 'https://x.supabase.co', key: 'k', fetch: f, store: undefined });

describe('CLAMPS', () => {
  it('every key is a numeric tunable and its baked default sits inside its range', () => {
    const base = bakedTuning() as unknown as Record<string, Record<string, unknown>>;
    for (const [key, [lo, hi]] of Object.entries(CLAMPS)) {
      const [section, name] = key.split('.');
      const def = base[section]?.[name];
      expect(typeof def, key).toBe('number');
      expect(lo, key).toBeLessThan(hi);
      expect(def as number, key).toBeGreaterThanOrEqual(lo);
      expect(def as number, key).toBeLessThanOrEqual(hi);
    }
  });
});

describe('rowsToOverrides', () => {
  it('clamps into range and builds a nested overlay', () => {
    expect(
      rowsToOverrides(rows({ 'hero.sprintSpeed': 99, 'wall.vCling': 1, 'rope.terminal': 20 })),
    ).toEqual({
      hero: { sprintSpeed: 14 },
      wall: { vCling: 7 },
      rope: { terminal: 20 },
    });
  });
  it('drops unknown, locked, non-numeric and malformed rows with a warning each', () => {
    const warn = vi.fn();
    const out = rowsToOverrides(
      [
        ...rows({
          fixedHz: 120,
          'hero.nope': 5,
          'physics.g': 1,
          'hero.run': 'fast',
          'rope.drag': null,
        }),
        null,
        { key: 7, value: 1 },
      ],
      warn,
    );
    expect(out).toBeUndefined();
    expect(warn).toHaveBeenCalledTimes(7);
  });
  it('accepts numeric strings (PostgREST may send numeric as text) and keeps the valid rows', () => {
    expect(rowsToOverrides(rows({ 'hero.run': '7.5', 'hero.bogus': 1 }))).toEqual({
      hero: { run: 7.5 },
    });
  });
  it('is undefined for no rows or a non-array', () => {
    expect(rowsToOverrides([])).toBeUndefined();
    expect(rowsToOverrides(null)).toBeUndefined();
    expect(rowsToOverrides({ 'hero.run': 7 })).toBeUndefined();
  });
});

describe('resolveCfg with a remote overlay', () => {
  it('is identical to the defaults with no remote and with an empty-result overlay', () => {
    expect(resolveCfg('classic', undefined)).toEqual(resolveCfg('classic'));
    expect(resolveCfg('classic', rowsToOverrides([]))).toEqual(resolveCfg('classic'));
  });
  it('applies the clamped value, leaves the rest, and does not mutate the base', () => {
    const before = resolveCfg('classic').hero.sprintSpeed;
    const cfg = resolveCfg('classic', rowsToOverrides(rows({ 'hero.sprintSpeed': 99 })));
    expect(cfg.hero.sprintSpeed).toBe(14);
    expect(cfg.hero.run).toBe(resolveCfg('classic').hero.run);
    expect(resolveCfg('classic').hero.sprintSpeed).toBe(before);
  });
  it('the hash is stable for the same config and changes with a remote value', async () => {
    const h = (c = resolveCfg('classic')) => cfgHash('l1', l1.version, c);
    const a = await h();
    expect(await h()).toBe(a);
    expect(a).toBe('ff48b1ef5a571571');
    const b = await h(resolveCfg('classic', rowsToOverrides(rows({ 'hero.sprintSpeed': 12 }))));
    expect(b).not.toBe(a);
    expect(await h(resolveCfg('classic', rowsToOverrides(rows({ 'hero.sprintSpeed': 12 }))))).toBe(
      b,
    );
    // Clamped values hash like the clamp, so 99 and 14 are the same config.
    const c14 = await h(resolveCfg('classic', rowsToOverrides(rows({ 'hero.sprintSpeed': 14 }))));
    expect(await h(resolveCfg('classic', rowsToOverrides(rows({ 'hero.sprintSpeed': 99 }))))).toBe(
      c14,
    );
  });
});

describe('online.config', () => {
  it('reads game_config once and returns the clamped overlay', async () => {
    const f = vi.fn(() => json([{ key: 'hero.run', value: 50 }]));
    expect(await online(f as unknown as typeof fetch).config()).toEqual({ hero: { run: 8 } });
    expect((f.mock.calls[0] as unknown as [string])[0]).toBe(
      'https://x.supabase.co/rest/v1/game_config?select=key,value',
    );
  });
  it('returns undefined on network failure, HTTP error, bad JSON shape and an empty table', async () => {
    expect(
      await online((() => Promise.reject(new Error('off'))) as typeof fetch).config(),
    ).toBeUndefined();
    expect(
      await online((() => json({ message: 'x' }, false)) as typeof fetch).config(),
    ).toBeUndefined();
    expect(await online((() => json({ not: 'rows' })) as typeof fetch).config()).toBeUndefined();
    expect(await online((() => json([])) as typeof fetch).config()).toBeUndefined();
  });
  it('gives up after the config timeout', async () => {
    vi.useFakeTimers();
    const never = ((_u: string, init: RequestInit) =>
      new Promise((_r, rej) =>
        init.signal?.addEventListener('abort', () => rej(new Error('abort'))),
      )) as unknown as typeof fetch;
    const p = online(never).config();
    await vi.advanceTimersByTimeAsync(1600);
    expect(await p).toBeUndefined();
    vi.useRealTimers();
  });
});
