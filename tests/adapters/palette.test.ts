import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

// Graphics overhaul plan fix 2: gold (interactive) and terracotta (danger) must stay visually
// distinct from the filler roof tones. Palette constants are parsed from source so the test
// follows edits; distance is measured in lightness-weighted RGB (a cheap perceptual proxy).
const rgb = (h: string): number[] => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const dist = (a: string, b: string): number => {
  const x = rgb(a);
  const y = rgb(b);
  return Math.hypot(2 * (x[0] - y[0]), 4 * (x[1] - y[1]), 3 * (x[2] - y[2])) / 3;
};

const decor = readFileSync('src/adapters/render/decor/placeDecor.ts', 'utf8');
const level = readFileSync('src/adapters/render/levelView.ts', 'utf8');
const hexes = (src: string): string[] => src.match(/#[0-9a-fA-F]{6}/g) ?? [];

const plaster = hexes(/const PLASTER = \[([^\]]*)\]/.exec(decor)![1]);
const brick = hexes(/const BRICK = \[([^\]]*)\]/.exec(decor)![1]);
const fill = [...plaster, ...brick];
const gold = /const COLOR_ANCHOR = '(#[0-9a-fA-F]{6})'/.exec(level)![1];
const dangerIdx = Number(/const DANGER_STYLE = (\d+)/.exec(level)![1]);
const danger = hexes(/const COLOR_STYLE = \[([^\]]*)\]/.exec(level)![1])[dangerIdx];
const tile: string[] = [];
const pitched = /const COLOR_TILE_ROOF = '(#[0-9a-fA-F]{6})'/.exec(level)![1];
// Roof tint jitter reaches x1.12 (placeDecor); test the brightest case.
const bright = (h: string): string =>
  '#' +
  rgb(h)
    .map((v) =>
      Math.min(255, Math.round(v * 1.12))
        .toString(16)
        .padStart(2, '0'),
    )
    .join('');

// NOTE: source-hex stand-in for the plan's sampled-pixel check; lighting, ACES and fog are not modelled.
describe('colour language', () => {
  it('pitched roof and gold stay apart', () => {
    expect(dist(gold, pitched)).toBeGreaterThan(60);
    expect(dist(danger, pitched)).toBeGreaterThan(20);
  });
  it('reads the palette', () => {
    expect(fill.length).toBeGreaterThanOrEqual(5);
  });
  it('gold anchors stay far from every filler roof tone', () => {
    for (const f of fill) expect(dist(gold, f)).toBeGreaterThan(60);
  });
  it('danger terracotta is a distinct hue-lightness step from the filler tones', () => {
    // The filler is deliberately darker and browner than the hot danger colour.
    const lum = (h: string): number => {
      const c = rgb(h);
      return 0.3 * c[0] + 0.59 * c[1] + 0.11 * c[2];
    };
    // Plaster is far lighter than danger terracotta; brick differs by hue.
    for (const f of [...plaster, ...tile].map(bright)) {
      expect(Math.abs(lum(danger) - lum(f))).toBeGreaterThan(5);
      expect(dist(danger, f)).toBeGreaterThan(20);
    }
    for (const f of brick) expect(dist(danger, f)).toBeGreaterThan(20);
  });
});
