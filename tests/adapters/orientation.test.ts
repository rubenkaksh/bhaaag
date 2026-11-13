import { describe, expect, it } from 'vitest';
import {
  ORIENT_KEY,
  cyclePref,
  loadOrientPref,
  logicalSize,
  needsRotation,
  parseOrientPref,
  physicalOrientation,
  remapPoint,
  rotatedRootStyle,
  saveOrientPref,
  swapOrientationText,
} from '../../src/adapters/ui/orientation';

describe('orientation helpers', () => {
  it('classifies the physical orientation', () => {
    expect(physicalOrientation(390, 844)).toBe('portrait');
    expect(physicalOrientation(844, 390)).toBe('landscape');
  });

  it('rotates only when forced, mismatched and not locked', () => {
    expect(needsRotation('auto', 390, 844, false)).toBe(false);
    expect(needsRotation('landscape', 390, 844, false)).toBe(true);
    expect(needsRotation('landscape', 844, 390, false)).toBe(false);
    expect(needsRotation('portrait', 844, 390, false)).toBe(true);
    expect(needsRotation('landscape', 390, 844, true)).toBe(false);
  });

  it('swaps width and height only when rotated', () => {
    expect(logicalSize(390, 844, false)).toEqual({ w: 390, h: 844 });
    expect(logicalSize(390, 844, true)).toEqual({ w: 844, h: 390 });
  });

  it('remaps pointer coordinates through the 90 degree rotation (inverse of (W - y, x))', () => {
    const out = { x: 0, y: 0 };
    const W = 390;
    // Logical (x, y) is drawn at screen (W - y, x); remapping that screen point must give (x, y) back.
    for (const [x, y] of [
      [0, 0],
      [100, 50],
      [844, 390],
    ]) {
      const r = remapPoint(W - y, x, W, true, out);
      expect(r.x).toBe(x);
      expect(r.y).toBe(y);
    }
    // Screen top-left corner is the logical bottom-left; screen top-right is the logical top-left.
    expect(remapPoint(0, 0, W, true, { x: 0, y: 0 })).toEqual({ x: 0, y: W });
    expect(remapPoint(W, 0, W, true, { x: 0, y: 0 })).toEqual({ x: 0, y: 0 });
  });

  it('passes points through unchanged when not rotated', () => {
    expect(remapPoint(12, 34, 390, false, { x: 0, y: 0 })).toEqual({ x: 12, y: 34 });
  });

  it('builds the rotated root style with swapped size', () => {
    expect(rotatedRootStyle(390, 844)).toEqual({
      width: '844px',
      height: '390px',
      transform: 'translateX(390px) rotate(90deg)',
    });
  });

  it('swaps orientation media queries and leaves others alone', () => {
    expect(swapOrientationText('(orientation: portrait) and (pointer: coarse)')).toBe(
      '(orientation: landscape) and (pointer: coarse)',
    );
    expect(swapOrientationText('(orientation:landscape)')).toBe('(orientation: portrait)');
    expect(swapOrientationText('(max-width: 600px)')).toBe('(max-width: 600px)');
  });

  it('cycles Auto -> Landscape -> Portrait -> Auto and parses bad values to auto', () => {
    expect(cyclePref('auto')).toBe('landscape');
    expect(cyclePref('landscape')).toBe('portrait');
    expect(cyclePref('portrait')).toBe('auto');
    expect(parseOrientPref('sideways')).toBe('auto');
    expect(parseOrientPref(null)).toBe('auto');
  });

  it('persists the choice', () => {
    const mem = new Map<string, string>();
    const store = {
      getItem: (k: string) => mem.get(k) ?? null,
      setItem: (k: string, v: string) => void mem.set(k, v),
    };
    expect(loadOrientPref(store)).toBe('auto');
    saveOrientPref('portrait', store);
    expect(mem.get(ORIENT_KEY)).toBe('portrait');
    expect(loadOrientPref(store)).toBe('portrait');
  });
});
