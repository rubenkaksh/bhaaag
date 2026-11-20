import { beforeEach, describe, expect, it, vi } from 'vitest';
import { DEFAULT_TUNING } from '../../src/core/config';

// initRemoteTuning is process-wide state, so each test loads a fresh copy of the module.
async function freshTuning() {
  vi.resetModules();
  return import('../../src/app/tuning');
}

describe('remote tuning init (src/app/tuning.ts)', () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it('before init, the tuning is the baked-in one (fallback when no file arrives)', async () => {
    const t = await freshTuning();
    expect(t.mergeTuning()).toEqual(t.bakedTuning());
    expect(t.mergeTuning().rope.drag).toBe(DEFAULT_TUNING.rope.drag);
  });

  it('init with a file changes what resolveCfg hands the game, for every mode', async () => {
    const t = await freshTuning();
    const warn = vi.fn();
    t.initRemoteTuning({ rope: { drag: 0.25 }, bogus: 1 }, warn);
    expect(warn).toHaveBeenCalledTimes(1);
    for (const mode of ['classic', 'chase', 'village'] as const) {
      expect(t.resolveCfg(mode).rope.drag).toBe(0.25);
    }
  });

  it('a second init is ignored, so a run never changes its tuning', async () => {
    const t = await freshTuning();
    t.initRemoteTuning({ rope: { drag: 0.25 } });
    t.initRemoteTuning({ rope: { drag: 0.9 } });
    expect(t.mergeTuning().rope.drag).toBe(0.25);
  });

  it('mergeTuning returns a fresh copy: resolveCfg mutating it cannot leak into the next game', async () => {
    const t = await freshTuning();
    t.initRemoteTuning({ rope: { drag: 0.25 } });
    const a = t.resolveCfg('chase');
    expect(a.hero.sprintSpeed).toBe(6); // chase's MODE_OVERRIDES still apply on top
    const b = t.resolveCfg('classic');
    expect(b.hero.sprintSpeed).toBe(DEFAULT_TUNING.hero.sprintSpeed);
    expect(b.rope.drag).toBe(0.25);
  });

  it('init with nothing (fetch failed) leaves the baked-in tuning', async () => {
    const t = await freshTuning();
    t.initRemoteTuning(undefined);
    expect(t.mergeTuning()).toEqual(t.bakedTuning());
  });

  it('does not touch DEFAULT_TUNING (graph generation keeps reading it)', async () => {
    const before = structuredClone(DEFAULT_TUNING);
    const t = await freshTuning();
    t.initRemoteTuning({ rope: { drag: 0.7 }, hero: { run: 9 } });
    expect(DEFAULT_TUNING).toEqual(before);
  });
});
