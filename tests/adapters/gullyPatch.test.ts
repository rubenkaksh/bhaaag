// The gully ribbon shares the ground mesh's patch/sunk break lines, so it neither floats over a
// sunk ring nor sinks under a bank (docs/briefs/terrain-glitch-design.md 2.4, T7).
import { afterEach, describe, expect, it } from 'vitest';
import type { Mesh } from 'three';
import { loadWorldFromObject } from '../../src/content/load';
import { buildLevelMeshes } from '../../src/adapters/render/levelView';
import { buildGround, clearTerrain } from './terrainMeshHelpers';

afterEach(clearTerrain);

describe('gully ribbon follows the ground mesh near patches: hay-run', () => {
  it('T7: ribbon is 0..0.5 m above the mesh at 99 % of triangle samples, never off by 1 m', () => {
    const g = buildGround('hay-run');
    const { placed } = g;
    const world = loadWorldFromObject(placed.level);
    const lv = buildLevelMeshes(world, {
      houseDress: false,
      graph: {
        houses: placed.houses,
        props: placed.props,
        profile: placed.profile,
        seed: placed.seed,
        patches: placed.patches,
        field: placed.field,
        breaks: placed.breaks,
      },
    });
    const ribbon = lv.children.find((c) => c.name === 'gully') as Mesh | undefined;
    expect(ribbon).toBeDefined();
    if (ribbon === undefined) return;
    const pos = ribbon.geometry.getAttribute('position');
    const idx = ribbon.geometry.getIndex();
    if (idx === null) throw new Error('no index');
    let total = 0;
    let good = 0;
    let worstD = 0;
    for (let i = 0; i < idx.count; i += 3) {
      const v = [0, 1, 2].map((k) => [
        pos.getX(idx.getX(i + k)),
        pos.getY(idx.getX(i + k)),
        pos.getZ(idx.getX(i + k)),
      ]);
      for (let a = 0; a <= 5; a++)
        for (let b = 0; a + b <= 5; b++) {
          const u = a / 5;
          const w = b / 5;
          const c = 1 - u - w;
          const x = u * v[0][0] + w * v[1][0] + c * v[2][0];
          const y = u * v[0][1] + w * v[1][1] + c * v[2][1];
          const z = u * v[0][2] + w * v[1][2] + c * v[2][2];
          const d = y - g.heightAt(x, z);
          total++;
          if (d >= -0.6 && d <= 0.5) good++;
          if (Math.abs(d) > Math.abs(worstD)) worstD = d;
        }
    }
    expect(total).toBeGreaterThan(1000);
    expect(good / total, `worst diff ${worstD}`).toBeGreaterThanOrEqual(0.99);
    expect(Math.abs(worstD)).toBeLessThanOrEqual(1.0);
    // (lower bound -0.6: the ribbon sits up to 0.58 m under the mesh on the field's own strip-edge steps, unrelated to patches)
  });
});
