import { describe, expect, it } from 'vitest';
import { loadWorldFromObject } from '../../src/content/load';
import { generateStrategyLevel } from '../../src/content/strategy/gen';
import { buildLevelMeshes } from '../../src/adapters/render/levelView';
import {
  TERRAIN_Z_MIN,
  setTerrainExtent,
  terrainValleyZ,
  terrainY,
  terrainZMin,
} from '../../src/adapters/render/terrain';

describe('strategy rendering', () => {
  it('skips anchor spheres and rings and adds the feature meshes', () => {
    const w = loadWorldFromObject(generateStrategyLevel());
    const g = buildLevelMeshes(w, { houseDress: false });
    const names = g.children.map((c) => c.name);
    expect(names.some((n) => n.startsWith('anchor'))).toBe(false);
    for (const n of ['lineZones', 'linePosts', 'lineRopes', 'trampRims', 'trampTops', 'cushions']) {
      expect(names).toContain(n);
    }
  });
  it('dresses all 100 houses with the real kit (no dropped instances, plain draw count)', () => {
    const w = loadWorldFromObject(generateStrategyLevel());
    const g = buildLevelMeshes(w, { houseDress: true });
    const decor = g.children.find((c) => c.name === 'decor');
    expect(decor?.userData.stats.dropped).toBe(0);
    expect(decor?.userData.stats.drawCalls).toBeLessThanOrEqual(22);
    const shell = (n: string): number => {
      let count = 0;
      decor?.traverse((o) => {
        if (o.name === n) count = (o as unknown as { count: number }).count;
      });
      return count;
    };
    expect(shell('decor_wallBrick')).toBe(100);
    expect(shell('decor_wallPlaster')).toBe(100);
  });
  it('terrain extent follows the level and resets to the stock values', () => {
    setTerrainExtent(null); // the previous test's level build leaves the extent stretched
    const before = terrainY(60, -200);
    setTerrainExtent(-700);
    expect(terrainZMin()).toBeLessThan(TERRAIN_Z_MIN);
    expect(terrainValleyZ()).toBeLessThan(-700);
    setTerrainExtent(null);
    expect(terrainZMin()).toBe(TERRAIN_Z_MIN);
    expect(terrainValleyZ()).toBe(-150);
    expect(terrainY(60, -200)).toBe(before);
  });
});
