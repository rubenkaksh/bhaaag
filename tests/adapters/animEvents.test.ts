import { describe, expect, it } from 'vitest';
import { HERO_EV_MANTLE, HERO_EV_PERFECT, HERO_EV_SLIDE, HERO_EV_VAULT } from '../../src/core/hero';
import {
  AE_ATTACH,
  AE_CLING,
  AE_DIE,
  AE_FIRE,
  AE_JUMP,
  AE_LAND,
  AE_MANTLE,
  AE_PERFECT,
  AE_RELEASE,
  AE_SLIDE,
  AE_VAULT,
} from '../../src/adapters/render/animEvents';

describe('animEvents', () => {
  it('AE_PERFECT is its own bit, distinct from every other event', () => {
    const all = [AE_LAND, AE_JUMP, AE_RELEASE, AE_FIRE, AE_ATTACH, AE_CLING, AE_DIE];
    for (const b of all) expect(AE_PERFECT & b).toBe(0);
    expect(HERO_EV_PERFECT).toBe(64); // sim bit; the adapter maps it in game.ts
  });

  it('parkour events are distinct bits and match the sim bits', () => {
    const all = [AE_LAND, AE_JUMP, AE_RELEASE, AE_FIRE, AE_ATTACH, AE_CLING, AE_DIE, AE_PERFECT];
    for (const b of all) {
      expect(AE_MANTLE & b).toBe(0);
      expect(AE_VAULT & b).toBe(0);
      expect(AE_SLIDE & b).toBe(0);
    }
    expect(AE_MANTLE & AE_VAULT & AE_SLIDE).toBe(0);
    expect(AE_VAULT & AE_SLIDE).toBe(0);
    expect(AE_MANTLE & AE_VAULT).toBe(0);
    expect(AE_MANTLE & AE_SLIDE).toBe(0);
    expect(HERO_EV_MANTLE).toBe(1024);
    expect(HERO_EV_VAULT).toBe(2048);
    expect(HERO_EV_SLIDE).toBe(4096);
  });
});
