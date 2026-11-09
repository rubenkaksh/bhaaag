import { describe, expect, it } from 'vitest';
import {
  FOG_HAZE,
  GRAPHICS_TIER_KEY,
  GRAPHICS_TIERS,
  TIER_INFO,
  defaultTierFor,
  loadGraphicsTier,
  parseTier,
  renderConfigFor,
  saveGraphicsTier,
} from '../../src/adapters/render/graphicsTier';
import type { DeviceHints, TierStore } from '../../src/adapters/render/graphicsTier';
import { HAZE } from '../../src/adapters/render/skyView';

const DESKTOP: DeviceHints = {
  coarsePointer: false,
  userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15',
  cores: 8,
  memoryGb: 8,
};

function memStore(init: Record<string, string> = {}): TierStore & { data: Record<string, string> } {
  const data: Record<string, string> = { ...init };
  return {
    data,
    getItem: (k) => (k in data ? data[k] : null),
    setItem: (k, v) => {
      data[k] = v;
    },
  };
}

const throwing: TierStore = {
  getItem: () => {
    throw new Error('SecurityError');
  },
  setItem: () => {
    throw new Error('QuotaExceededError');
  },
};

describe('graphics tier settings', () => {
  it('parses only the three tier names', () => {
    expect(parseTier('low')).toBe('low');
    expect(parseTier('high')).toBe('high');
    expect(parseTier('ultra')).toBeNull();
    expect(parseTier(null)).toBeNull();
    expect(parseTier(2)).toBeNull();
  });

  it('defaults to medium on a capable desktop', () => {
    expect(defaultTierFor(DESKTOP)).toBe('medium');
    expect(defaultTierFor({ ...DESKTOP, cores: 0, memoryGb: 0 })).toBe('medium');
  });

  it('starts phones on medium (the governor demotes slow ones) but weak specs on low', () => {
    expect(defaultTierFor({ ...DESKTOP, coarsePointer: true })).toBe('medium');
    expect(
      defaultTierFor({
        ...DESKTOP,
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) Mobile/15E148',
      }),
    ).toBe('medium');
    expect(defaultTierFor({ ...DESKTOP, cores: 4 })).toBe('low');
    expect(defaultTierFor({ ...DESKTOP, memoryGb: 4 })).toBe('low');
  });

  it('loads the saved tier, else the device default', () => {
    expect(loadGraphicsTier(memStore({ [GRAPHICS_TIER_KEY]: 'high' }), DESKTOP, null)).toBe('high');
    expect(loadGraphicsTier(memStore({ [GRAPHICS_TIER_KEY]: 'junk' }), DESKTOP, null)).toBe(
      'medium',
    );
    expect(loadGraphicsTier(memStore(), { ...DESKTOP, cores: 4 }, null)).toBe('low');
  });

  it('the URL override wins over the saved tier', () => {
    expect(loadGraphicsTier(memStore({ [GRAPHICS_TIER_KEY]: 'low' }), DESKTOP, 'high')).toBe(
      'high',
    );
  });

  it('falls back safely without or with a broken localStorage', () => {
    expect(loadGraphicsTier(null, DESKTOP, null)).toBe('medium');
    expect(loadGraphicsTier(throwing, DESKTOP, null)).toBe('medium');
    expect(() => saveGraphicsTier('high', throwing)).not.toThrow();
    expect(() => saveGraphicsTier('high', null)).not.toThrow();
    // Default arguments under Node (no window, localStorage or location) must not throw either.
    expect(GRAPHICS_TIERS).toContain(loadGraphicsTier());
  });

  it('round-trips a saved tier', () => {
    const s = memStore();
    saveGraphicsTier('low', s);
    expect(s.data[GRAPHICS_TIER_KEY]).toBe('low');
    expect(loadGraphicsTier(s, DESKTOP, null)).toBe('low');
  });

  it('has a label and one-line description per tier', () => {
    for (const t of GRAPHICS_TIERS) {
      expect(TIER_INFO[t].label.length).toBeGreaterThan(0);
      expect(TIER_INFO[t].desc).not.toContain('\n');
      expect(TIER_INFO[t].desc.length).toBeLessThanOrEqual(64);
    }
  });
});

describe('tier -> render config', () => {
  it('low has no shadows and no post, but gets ACES and a lifted fog', () => {
    const c = renderConfigFor('low', false);
    expect(c.toneMapping).toBe('aces');
    expect(c.exposure).toBe(1.1);
    expect(c.shadow).toBeNull();
    expect(c.bloom).toBeNull();
    expect(c.sun).toEqual({ color: '#ffb469', intensity: 3.0, dir: [70, 38, -15] });
    expect(c.hemi).toEqual({ sky: '#ffc99c', ground: '#5b4656', intensity: 1.0 });
    expect(c.fog).toEqual({ color: HAZE, near: 60, far: 320 });
  });

  it('medium adds ACES, a lower warm sun and 1024 soft shadows, no bloom', () => {
    const c = renderConfigFor('medium', false);
    expect(c.toneMapping).toBe('aces');
    expect(c.shadow?.mapSize).toBe(1024);
    expect(c.bloom).toBeNull();
    const [x, y, z] = c.sun.dir;
    const el = Math.atan2(y, Math.hypot(x, z)) * (180 / Math.PI);
    expect(el).toBeGreaterThan(10);
    expect(el).toBeLessThan(25);
    // Same horizontal key direction as low (lit, not backlit; ADR 0001).
    const low = renderConfigFor('low', false).sun.dir;
    expect(Math.atan2(z, x)).toBeCloseTo(Math.atan2(low[2], low[0]), 6);
  });

  it('high is medium plus a 2048 map and subtle bloom', () => {
    const c = renderConfigFor('high', false);
    expect(c.toneMapping).toBe('aces');
    expect(c.shadow?.mapSize).toBe(2048);
    expect(c.bloom).not.toBeNull();
    expect(c.bloom?.strength ?? 1).toBeLessThanOrEqual(0.4);
    expect(c.bloom?.threshold ?? 0).toBeGreaterThanOrEqual(0.7);
  });

  it('caps the pixel ratio at 2, 1.5 on touch, for every tier', () => {
    for (const t of GRAPHICS_TIERS) {
      expect(renderConfigFor(t, false).maxPixelRatio).toBe(2);
      expect(renderConfigFor(t, true).maxPixelRatio).toBe(1.5);
    }
  });

  it('keeps the fog on the sky horizon colour and the shadow frustum tight', () => {
    expect(FOG_HAZE).toBe(HAZE);
    for (const t of GRAPHICS_TIERS) {
      const c = renderConfigFor(t, false);
      expect(c.fog.color).toBe(HAZE);
      if (c.shadow !== null) expect(c.shadow.halfExtent).toBeLessThanOrEqual(40);
    }
  });
});
