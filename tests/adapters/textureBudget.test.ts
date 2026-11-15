import { readdirSync, readFileSync, statSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import {
  TEXTURE_MANIFEST,
  TIER_BUDGET_KB,
  tierBytes,
} from '../../src/adapters/render/textureManifest';

const DIR = 'public/assets/textures';
const sizeOf = (f: string) => statSync(DIR + '/' + f).size;

describe('texture tier budget', () => {
  for (const tier of ['low', 'medium', 'high'] as const) {
    it(`${tier} stays within ${TIER_BUDGET_KB[tier]} KB`, () => {
      const kb = tierBytes(tier, sizeOf) / 1024;
      console.log(`texture budget ${tier}: ${kb.toFixed(1)} KB`);
      expect(kb).toBeLessThanOrEqual(TIER_BUDGET_KB[tier]);
    });
  }
  it('lists every shipped texture in the manifest', () => {
    const listed = new Set(TEXTURE_MANIFEST.map((m) => m.file));
    for (const f of readdirSync(DIR).filter((n: string) => /\.(jpg|webp|png)$/.test(n)))
      expect(listed.has(f), f).toBe(true);
  });
  it('home textures never load on Low', () => {
    for (const m of TEXTURE_MANIFEST) {
      if (/^(tin|straw|facade|horizon)/.test(m.file)) expect(m.tiers, m.file).not.toContain('low');
    }
  });
  it('palette keeps clear of gold, cream and terracotta', () => {
    const pal = JSON.parse(readFileSync('tools/palette.json', 'utf8'));
    const cols: string[] = pal.colors;
    expect(cols.length).toBeGreaterThan(8);
    const rgb = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
    const avoid = ['#ffc83a', '#f1e9d2', '#c8643c'].map(rgb);
    for (const c of cols)
      for (const a of avoid) {
        const d = Math.hypot(...rgb(c).map((v, i) => v - a[i]));
        expect(d, c).toBeGreaterThan(30);
      }
  });
});
