// Cloud Village level shape (amendment 2026-11-12): stilt houses, no hill, rope hops within limits.
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { DEFAULT_TUNING } from '../../src/core/config';
import { loadWorldFromJson } from '../../src/content/load';
import { VILLAGE_CLOUD_TOP_Y } from '../../src/adapters/render/cloudSea';
// @ts-expect-error plain JS tool, no types
import * as gen from '../../tools/genVillage.mjs';

const text = readFileSync(new URL('../../content/levels/village.json', import.meta.url), 'utf8');
const w = loadWorldFromJson(text);
const cfg = DEFAULT_TUNING;

describe('cloud village level', () => {
  it('committed JSON equals the generator output', () => {
    expect(JSON.parse(text)).toEqual(JSON.parse(JSON.stringify(gen.generateVillage())));
  });
  it('has no hillside ramp and ten houses (8 route roofs, 2 decoys)', () => {
    expect(w.ramps).toHaveLength(0);
    expect(w.style.filter((s) => s === 2)).toHaveLength(8);
    expect(w.style.filter((s) => s === 3)).toHaveLength(2);
  });
  it('houses are normal height: walls at most 8 m tall, not stilt towers', () => {
    w.solids.forEach((b, i) => {
      if (w.style[i] === 1 || w.style[i] === 3) expect(b.max.y - b.min.y).toBeLessThanOrEqual(8);
    });
  });
  it('cloud top matches the generator and sits above the kill plane', () => {
    expect(VILLAGE_CLOUD_TOP_Y).toBe(gen.CLOUD_TOP_Y);
    expect(w.killPlaneY).toBeLessThan(VILLAGE_CLOUD_TOP_Y);
    const lastRoof = Math.min(...w.solids.filter((_, i) => w.style[i] === 2).map((s) => s.max.y));
    expect(VILLAGE_CLOUD_TOP_Y).toBeLessThan(lastRoof - 15);
  });
  it('every rope hop is within the rope limits from the launch roof edge', () => {
    const roofs = w.solids.filter((_, i) => w.style[i] === 2);
    expect(w.route).toHaveLength(3);
    w.route.forEach((id, hop) => {
      const from = roofs[2 * hop + 1];
      const a = w.anchors[id];
      const dh = Math.hypot(a.px - (from.min.x + from.max.x) / 2, a.pz - from.min.z);
      const dy = from.max.y + cfg.rope.handToFeet - a.py;
      const len = Math.hypot(dh, dy);
      const deg = (Math.atan2(dy, dh) * 180) / Math.PI;
      expect(len).toBeLessThanOrEqual(cfg.rope.maxLen);
      expect(len).toBeGreaterThanOrEqual(cfg.rope.minLen);
      expect(deg).toBeGreaterThanOrEqual(cfg.rope.minSlopeDeg);
      expect(deg).toBeLessThanOrEqual(cfg.rope.maxSlopeDeg);
    });
  });
});
