import { describe, expect, it } from 'vitest';
import { DEFAULT_TUNING } from '../../src/core/config';
import { framingFor } from '../../src/adapters/render/framing';
import { layoutFor } from '../../src/app/viewport';

describe('framingFor (Track 0: identity)', () => {
  const base = DEFAULT_TUNING.camera;
  it.each([
    [1920, 1080],
    [640, 360],
    [800, 800],
  ])('returns the base camera unchanged at %ix%i', (w, h) => {
    const f = framingFor(layoutFor(w, h, w < 1000), base);
    expect(f.camera).toBe(base);
    expect(f.lensShiftY).toBe(0);
  });
});
