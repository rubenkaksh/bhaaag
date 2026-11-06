import { describe, expect, it } from 'vitest';
import { planCluster } from '../../src/adapters/render/decor/cluster';
import { mulberry32 } from '../../src/adapters/render/decor/kit';

const plan = (seed: number) => planCluster(mulberry32(seed), 1, 35, 59, -13, 0, -20);

describe('planCluster (ADR 0007 C1-C4)', () => {
  it('C1: same seed same plan, different seed different plan', () => {
    expect(JSON.stringify(plan(3))).toBe(JSON.stringify(plan(3)));
    expect(JSON.stringify(plan(7))).not.toBe(JSON.stringify(plan(3)));
  });

  it('C2: bounds, gaps, overlap, storeys, roofY', () => {
    for (let s = 1; s <= 200; s++) {
      const p = plan(s);
      for (let i = 0; i < p.houses.length; i++) {
        const h = p.houses[i];
        expect(h.x0).toBeGreaterThanOrEqual(35);
        expect(h.x1).toBeLessThanOrEqual(59 + 1e-9);
        expect(h.z0).toBeGreaterThanOrEqual(-13 + 0.8 - 1e-9);
        expect(h.z1).toBeLessThanOrEqual(-0.8 + 1e-9);
        expect(h.storeys).toBeGreaterThanOrEqual(1);
        expect(h.storeys).toBeLessThanOrEqual(3);
        expect(h.roofY).toBeCloseTo(-20 + 2.8 * h.storeys, 9);
        if (i > 0) {
          const g = h.x0 - p.houses[i - 1].x1;
          expect(g < 1e-9 || (g >= 1 - 1e-9 && g <= 3 + 1e-9)).toBe(true);
          expect(g).toBeGreaterThanOrEqual(-1e-9);
          expect(Math.abs(h.storeys - p.houses[i - 1].storeys)).toBeLessThanOrEqual(1);
        }
      }
    }
  });

  it('C3: 2 to 4 houses per plan', () => {
    for (let s = 1; s <= 200; s++) {
      const n = plan(s).houses.length;
      expect(n).toBeGreaterThanOrEqual(2);
      expect(n).toBeLessThanOrEqual(4);
    }
  });

  it('C4: at least 40 % shared walls and 40 % gaps', () => {
    let shared = 0;
    let gapped = 0;
    for (let s = 1; s <= 200; s++) {
      const hs = plan(s).houses;
      let sh = false;
      let gp = false;
      for (let i = 1; i < hs.length; i++) {
        if (hs[i].shareIn === 1) sh = true;
        else gp = true;
      }
      if (sh) shared++;
      if (gp) gapped++;
    }
    expect(shared / 200).toBeGreaterThanOrEqual(0.4);
    expect(gapped / 200).toBeGreaterThanOrEqual(0.4);
  });
});
