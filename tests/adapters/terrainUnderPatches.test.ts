// Buried-hero regression: the drawn ground (terrainY) must not rise above the stepped landing
// patches the sim lets the hero stand on (Hay Run patch 1 sat 4.3 m under the mesh).
import { afterEach, describe, expect, it } from 'vitest';
import { loadGraph } from '../../src/content/graph/registry';
import { placeGraph } from '../../src/content/graph/place';
import { loadWorldFromObject } from '../../src/content/load';
import {
  setTerrainExtent,
  setTerrainField,
  setTerrainProfile,
  terrainY,
} from '../../src/adapters/render/terrain';

afterEach(() => {
  setTerrainField(null);
  setTerrainProfile(null);
  setTerrainExtent(null);
});

const STEP = 0.5;
const TOL = 0.05;

// valley-1 is unsegmented: no view field, its ground is the z-only profile (patches up to 2.4 m
// under the mesh remain; needs a field for unsegmented levels, out of scope here).
for (const id of ['hay-run', 'home-street']) {
  describe(`terrain under patches: ${id}`, () => {
    const placed = placeGraph(loadGraph(id));
    const world = loadWorldFromObject(placed.level);
    const maxOver = (x0: number, x1: number, z0: number, z1: number, y: number): number => {
      setTerrainProfile(placed.profile);
      setTerrainField(placed.field ?? null);
      let m = -Infinity;
      for (let x = x0; x <= x1 + 1e-9; x += STEP)
        for (let z = z0; z <= z1 + 1e-9; z += STEP) m = Math.max(m, terrainY(x, z) - y);
      return m;
    };

    it('mesh stays at or under every patch top', () => {
      for (const p of placed.patches)
        expect(maxOver(p.x0, p.x1, p.z0, p.z1, p.y), JSON.stringify(p)).toBeLessThanOrEqual(TOL);
    });

    it('mesh stays under every solid whose top is a patch top', () => {
      let n = 0;
      for (const s of world.solids) {
        const top = s.max.y;
        const p = placed.patches.find(
          (q) =>
            Math.abs(q.y - top) < 1e-3 &&
            s.min.x >= q.x0 - 1e-3 &&
            s.max.x <= q.x1 + 1e-3 &&
            s.min.z >= q.z0 - 1e-3 &&
            s.max.z <= q.z1 + 1e-3,
        );
        if (p === undefined) continue;
        n++;
        expect(maxOver(s.min.x, s.max.x, s.min.z, s.max.z, top)).toBeLessThanOrEqual(TOL);
      }
      expect(n).toBeGreaterThan(0);
    });
  });
}
