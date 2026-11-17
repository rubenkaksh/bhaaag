// Red-floor regression: on a segmented graph level (ADR 0015) the terracotta gully must hug the
// drawn terrain (terrainY) and stay inside its hazard boxes. It used to be drawn at the straight
// plane height over the full hill width, so it floated up to 11 m above or sank under the ground.
import { afterEach, describe, expect, it } from 'vitest';
import type { Mesh } from 'three';
import { loadGraph } from '../../src/content/graph/registry';
import { placeGraph } from '../../src/content/graph/place';
import { loadWorldFromObject } from '../../src/content/load';
import { buildLevelMeshes } from '../../src/adapters/render/levelView';
import { gullyQuads } from '../../src/adapters/render/gully';
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

describe('gully on segmented Home Street', () => {
  const placed = placeGraph(loadGraph('home-street'));
  const world = loadWorldFromObject(placed.level);
  const build = (): Mesh | undefined => {
    const g = buildLevelMeshes(world, {
      houseDress: false,
      graph: {
        houses: placed.houses,
        props: placed.props,
        profile: placed.profile,
        seed: placed.seed,
        patches: placed.patches,
        field: placed.field,
        look: 'home',
      },
    });
    return g.children.find((c) => c.name === 'gully') as Mesh | undefined;
  };

  it('lies on the drawn terrain, not floating or buried', () => {
    const pos = build()?.geometry.getAttribute('position');
    expect(pos).toBeDefined();
    if (pos === undefined) return;
    let good = 0;
    for (let i = 0; i < pos.count; i++) {
      const d = pos.getY(i) - terrainY(pos.getX(i), pos.getZ(i));
      if (d > 0 && d < 0.5) good++;
    }
    // a few vertices sit on a step of the field at a house edge (float32 rounding flips the side)
    expect(good / pos.count).toBeGreaterThan(0.97);
  });

  it('stays inside the hazard boxes (never paints ground outside a run)', () => {
    const quads = gullyQuads(world, placed.patches);
    expect(quads.length).toBeGreaterThan(0);
    for (const [x0, z0, x1, z1] of quads) {
      const mx = (x0 + x1) / 2;
      const mz = (z0 + z1) / 2;
      const inside = world.hazards.some(
        (h) => mx >= h.min.x && mx <= h.max.x && mz >= h.min.z && mz <= h.max.z,
      );
      expect(inside, `quad at ${mx},${mz}`).toBe(true);
    }
  });
});
