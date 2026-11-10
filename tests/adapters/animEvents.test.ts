import { describe, expect, it } from 'vitest';
import { HERO_EV_PERFECT } from '../../src/core/hero';
import { AE_ATTACH, AE_CLING, AE_DIE, AE_FIRE, AE_JUMP, AE_LAND, AE_PERFECT, AE_RELEASE } from '../../src/adapters/render/animEvents';

describe('animEvents', () => {
  it('AE_PERFECT is its own bit, distinct from every other event', () => {
    const all = [AE_LAND, AE_JUMP, AE_RELEASE, AE_FIRE, AE_ATTACH, AE_CLING, AE_DIE];
    for (const b of all) expect(AE_PERFECT & b).toBe(0);
    expect(HERO_EV_PERFECT).toBe(64); // sim bit; the adapter maps it in game.ts
  });
});
