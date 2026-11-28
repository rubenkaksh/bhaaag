// Hazard lowering under patches is local (design 2.1): only within 1 m of a tile, never the whole band.
import { describe, expect, it } from 'vitest';
import { loadGraph } from '../../src/content/graph/registry';
import { placeGraph } from '../../src/content/graph/place';

const M = 1 + 1e-6;
for (const id of ['hay-run', 'home-street']) {
  describe(`sunk hazards: ${id}`, () => {
    const placed = placeGraph(loadGraph(id));
    const inside = (
      r: { x0: number; x1: number; z0: number; z1: number },
      p: { x0: number; x1: number; z0: number; z1: number },
    ): boolean =>
      r.x0 >= p.x0 - M && r.x1 <= p.x1 + M && r.z0 >= p.z0 - M && r.z1 <= p.z1 + M;

    it('T3: no hazard is lowered under a patch outside the 1 m margin in x', () => {
      // a hazard overlapping a patch in z, entirely outside [x0-1, x1+1], sits at its natural top, not p.y - 0.5
      let n = 0;
      for (const p of placed.patches)
        for (const h of placed.level.hazards ?? []) {
          if (!(h.max[2] > p.z0 && h.min[2] < p.z1)) continue;
          if (!(h.min[0] >= p.x1 + M - 1e-6 + 0 || h.max[0] <= p.x0 - M + 1e-6)) continue;
          n++;
          expect(h.max[1], `hazard ${JSON.stringify(h)} vs patch ${JSON.stringify(p)}`).not.toBeCloseTo(
            p.y - 0.5,
            5,
          );
        }
      expect(n).toBeGreaterThan(0);
    });

    it('T3: sunk rects exist and each lies inside an expanded patch rect', () => {
      expect(placed.sunk?.length ?? 0).toBeGreaterThan(0);
      for (const s of placed.sunk ?? [])
        expect(
          placed.patches.some((p) => inside(s, p)),
          `sunk ${JSON.stringify(s)}`,
        ).toBe(true);
    });
  });
}
