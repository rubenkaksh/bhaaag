// Review S3: a graph level with no MODE_OVERRIDES line must not crash on start.
import { describe, expect, it } from 'vitest';
import { MODE_OVERRIDES, mergeTuning, resolveCfg } from '../../src/app/tuning';
import type { GameMode } from '../../src/app/modes/mode';

describe('resolveCfg', () => {
  it('falls back to the base tuning for a mode with no override line', () => {
    const mode = 'g:future-level' as GameMode;
    expect(MODE_OVERRIDES[mode]).toBeUndefined();
    expect(() => resolveCfg(mode)).not.toThrow();
    expect(resolveCfg(mode)).toEqual(mergeTuning());
  });
});
