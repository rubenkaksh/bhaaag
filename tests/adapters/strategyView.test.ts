import { describe, expect, it } from 'vitest';
import type { Mesh } from 'three';
import { HOOK_ATTACHED, HOOK_FLYING, newHook } from '../../src/core/hook';
import { RopeView } from '../../src/app/ropeView';
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
  it('draws one old-look rope tube per fixed line, not thin line segments', () => {
    const w = loadWorldFromObject(generateStrategyLevel());
    const g = buildLevelMeshes(w, { houseDress: false });
    const ropes = g.children.filter((c) => c.name === 'lineRopes');
    expect(ropes).toHaveLength(1);
    const mesh = ropes[0] as Mesh;
    expect(mesh.isMesh).toBe(true);
    expect(mesh.geometry.getAttribute('color')).toBeDefined(); // twist + gold end
    const perRope = mesh.geometry.getAttribute('position').count / w.lines.length;
    expect(perRope).toBe(41 * 9); // SPAN_SEG + 1 rings x (SPAN_SIDES + 1)
  });
  it('rides the fixed line: the hero rope view draws only the trolley in lineOnly worlds', () => {
    const hook = newHook();
    hook.state = HOOK_ATTACHED;
    hook.ax = 5;
    const fixed = new RopeView(true);
    fixed.update(hook, 0, 2, 0, 20, 0.016);
    expect(fixed.group.visible).toBe(true);
    const vis = fixed.group.children.map((c) => c.visible);
    expect(vis.filter(Boolean)).toHaveLength(1); // handle only
    hook.state = HOOK_FLYING;
    fixed.update(hook, 0, 2, 0, 20, 0.016);
    expect(fixed.group.visible).toBe(false);
    const free = new RopeView(false);
    hook.state = HOOK_ATTACHED;
    free.update(hook, 0, 2, 0, 20, 0.016);
    expect(free.group.children.filter((c) => c.visible).length).toBeGreaterThan(1);
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
