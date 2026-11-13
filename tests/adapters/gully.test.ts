// Review M2: the lethal hillside of a graph level is drawn, and the kill surface is the drawn ground.
import { describe, expect, it } from 'vitest';
import type { Mesh } from 'three';
import { loadGraph } from '../../src/content/graph/registry';
import { placeGraph } from '../../src/content/graph/place';
import { loadWorldFromObject } from '../../src/content/load';
import { buildLevelMeshes } from '../../src/adapters/render/levelView';
import { gullyQuads } from '../../src/adapters/render/gully';
import { planeY, setTerrainProfile } from '../../src/adapters/render/terrain';

const placed = placeGraph(loadGraph('valley-1'));
const world = loadWorldFromObject(placed.level);

describe('graph gully (review M2)', () => {
  it('draws a terracotta gully mesh for graph levels only', () => {
    const g = buildLevelMeshes(world, {
      houseDress: false,
      graph: {
        houses: placed.houses,
        props: placed.props,
        profile: placed.profile,
        seed: placed.seed,
        patches: placed.patches,
      },
    });
    const gully = g.children.find((c) => c.name === 'gully') as Mesh | undefined;
    expect(gully).toBeDefined();
    expect(gully?.geometry.getAttribute('position').count).toBeGreaterThan(0);
    setTerrainProfile(null);
    const v1 = loadWorldFromObject(JSON.parse(JSON.stringify({ ...placed.level, hazards: [] })));
    const g1 = buildLevelMeshes(v1, { houseDress: false });
    expect(g1.children.some((c) => c.name === 'gully')).toBe(false);
  });

  it('cuts the walkable patches out of the lethal ground', () => {
    const quads = gullyQuads(world, placed.patches);
    expect(quads.length).toBeGreaterThan(0);
    for (const p of placed.patches) {
      const mx = (p.x0 + p.x1) / 2;
      const mz = (p.z0 + p.z1) / 2;
      for (const [x0, z0, x1, z1] of quads) {
        const inside = mx > x0 && mx < x1 && mz > z0 && mz < z1;
        expect(inside, `patch at ${mx},${mz}`).toBe(false);
      }
    }
  });

  it('paints only a fringe, never the whole hill red, with no overlapping quads', () => {
    const quads = gullyQuads(world, placed.patches);
    let area = 0;
    for (let i = 0; i < quads.length; i++) {
      const [x0, z0, x1, z1] = quads[i];
      area += (x1 - x0) * (z1 - z0);
      for (let j = i + 1; j < quads.length; j++) {
        const [a0, b0, a1, b1] = quads[j];
        const overlap = Math.min(x1, a1) > Math.max(x0, a0) && Math.min(z1, b1) > Math.max(z0, b0);
        expect(overlap, `quads ${i} and ${j} overlap`).toBe(false);
      }
    }
    let zs = Infinity;
    let ze = -Infinity;
    for (const hz of world.hazards) {
      zs = Math.min(zs, hz.min.z);
      ze = Math.max(ze, hz.max.z);
    }
    expect(area).toBeLessThan(0.25 * 68 * (ze - zs)); // hill is 68 m wide
  });

  it('kills at the visible ground: every band top is within 0.5 m of the drawn terrain', () => {
    setTerrainProfile(placed.profile);
    let checked = 0;
    for (const hz of world.hazards) {
      const zMid = (hz.min.z + hz.max.z) / 2;
      if (placed.patches.some((p) => p.z1 > hz.min.z && p.z0 < hz.max.z)) continue;
      const ground = planeY(zMid);
      expect(hz.max.y, `band z ${zMid}`).toBeLessThanOrEqual(ground + 0.5);
      expect(hz.max.y, `band z ${zMid}`).toBeGreaterThanOrEqual(ground - 0.5);
      checked++;
    }
    setTerrainProfile(null);
    expect(checked).toBeGreaterThan(20);
  });
});
