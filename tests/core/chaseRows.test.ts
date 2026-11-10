import { describe, expect, it } from 'vitest';
import {
  FIXED_ROWS,
  GRADE,
  RowBoxes,
  SLOT_SOLIDS,
  rowBoxes,
  rowSpec,
  rowSpecInto,
  RowSpec,
  HOUSE_LEN,
  ROW0_ZTOP,
  nextZTop,
} from '../../src/core/chase/rows';

describe('rowSpec', () => {
  it('is stateless: call order and repeats never matter', () => {
    const a = rowSpec(777, 23);
    for (let r = 60; r >= 0; r--) rowSpec(777, r);
    const b = rowSpec(777, 23);
    expect(b).toEqual(a);
  });

  it('rows 0-3 are the L1 opening for every seed', () => {
    for (const seed of [1, 99, 123456]) {
      for (let r = 0; r < FIXED_ROWS; r++) {
        const s = rowSpec(seed, r);
        expect(s.n).toBe(2);
        expect(s.gap).toBe(13);
        expect(s.cx).toBe(0);
      }
      expect(rowSpec(seed, 1).decoy).toBe(-1);
      expect(rowSpec(seed, 1).pitched).toBe(1);
      expect(rowSpec(seed, 3).decoy).toBe(1);
    }
  });

  it('keeps every row inside the documented ranges', () => {
    const s = new RowSpec();
    for (const seed of [3, 4242]) {
      let prev = 0;
      for (let r = 0; r < 400; r++) {
        rowSpecInto(seed, r, s);
        const d = Math.min(1, r / 40);
        expect(s.n).toBeGreaterThanOrEqual(1);
        expect(s.n).toBeLessThanOrEqual(3);
        if (r >= FIXED_ROWS) {
          expect(s.gap).toBeGreaterThanOrEqual(11);
          expect(s.gap).toBeLessThanOrEqual(13 + 4 * d + 1e-9);
        }
        expect(Math.abs(s.cx)).toBeLessThanOrEqual(8);
        expect(Math.abs(s.cx - prev)).toBeLessThanOrEqual(6);
        expect(Math.abs(s.cx % 2)).toBe(0);
        prev = s.cx;
      }
    }
  });

  it('different seeds give different rows later on', () => {
    let diff = 0;
    for (let r = 6; r < 40; r++) if (rowSpec(1, r).n !== rowSpec(2, r).n || rowSpec(1, r).cx !== rowSpec(2, r).cx) diff++;
    expect(diff).toBeGreaterThan(10);
  });
});

describe('rowBoxes', () => {
  it('is translation invariant along the fall line (1e-9)', () => {
    const a = new RowBoxes();
    const b = new RowBoxes();
    for (const r of [4, 9, 31, 77]) {
      const spec = rowSpec(5, r);
      rowBoxes(spec, ROW0_ZTOP, r > 0, a);
      const zTop = -143.7 * (r % 5 + 1);
      rowBoxes(spec, zTop, r > 0, b);
      const dz = zTop - ROW0_ZTOP;
      for (let i = 0; i < SLOT_SOLIDS; i++) {
        expect(b.solidUsed[i]).toBe(a.solidUsed[i]);
        if (a.solidUsed[i] === 0) continue;
        for (let j = 0; j < 6; j++) {
          const shift = j === 1 || j === 4 ? GRADE * dz : j === 2 || j === 5 ? dz : 0;
          expect(Math.abs(b.solid[i * 6 + j] - (a.solid[i * 6 + j] + shift))).toBeLessThan(1e-9);
        }
      }
      for (let i = 0; i < 6; i++) {
        if (a.anchorUsed[0] === 1 && i < 3) {
          const shift = i === 1 ? GRADE * dz : i === 2 ? dz : 0;
          expect(Math.abs(b.anchor[i] - (a.anchor[i] + shift))).toBeLessThan(1e-9);
        }
      }
    }
  });

  it('rows are contiguous: nextZTop follows the houses and the gap', () => {
    const s = rowSpec(8, 12);
    expect(nextZTop(10, s)).toBeCloseTo(10 - HOUSE_LEN * s.n - s.gap, 12);
  });
});
