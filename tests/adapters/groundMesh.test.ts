import { Color } from 'three';
import { afterEach, describe, expect, it } from 'vitest';
import { buildGroundMesh, groundColor } from '../../src/adapters/render/decor/groundMesh';
import { loadGraph } from '../../src/content/graph/registry';
import { placeGraph } from '../../src/content/graph/place';
import { loadWorldFromObject } from '../../src/content/load';
import { buildLevelMeshes } from '../../src/adapters/render/levelView';
import { clearTerrain } from './terrainMeshHelpers';

describe('groundMesh terraces', () => {
  const m = buildGroundMesh();
  const geo = m.geometry;
  const pos = geo.getAttribute('position');
  const uv = geo.getAttribute('uv');
  const col = geo.getAttribute('color');

  it('has top-down planar UVs u = x/7, v = z/7 (no contour streaks)', () => {
    expect(uv.count).toBe(pos.count);
    for (let i = 0; i < pos.count; i += 37) {
      expect(uv.getX(i)).toBeCloseTo(pos.getX(i) / 7, 4);
      expect(uv.getY(i)).toBeCloseTo(pos.getZ(i) / 7, 4);
    }
  });

  it('opts into the tier terrace maps with a low entry', () => {
    const tm = m.userData.tierMaps as { low?: { map?: string } };
    expect(tm.low?.map).toBe('terrace');
  });

  it('varies colour by height band and by 20 m field patch', () => {
    const a = new Color();
    const b = new Color();
    groundColor(10, -40, 1.75, a, 0.5);
    groundColor(10, -40, 5.25, b, 0.5);
    expect(a.getHex()).not.toBe(b.getHex());
    const seen = new Set<number>();
    for (let k = 0; k < 12; k++) {
      groundColor(10 + 20 * k, -40, 1.75, a, 0.5);
      seen.add(a.getHex());
    }
    expect(seen.size).toBeGreaterThan(2);
    let lo = 1;
    let hi = 0;
    for (let i = 0; i < col.count; i += 11) {
      const g = col.getY(i);
      lo = Math.min(lo, g);
      hi = Math.max(hi, g);
    }
    expect(hi - lo).toBeGreaterThan(0.1);
  });
});

// T6: breaks (graph-level patch edges) never leak into the stock mesh (chase, endless, no graph).
// Baseline recorded on the code before the terrain-under-patches change.
function posHash(p: ArrayLike<number>): string {
  let h = 0x811c9dc5;
  for (let i = 0; i < p.length; i++) {
    h ^= Math.round(p[i] * 1e4);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h.toString(16);
}

describe('stock ground mesh is unchanged without graph breaks', () => {
  afterEach(clearTerrain);
  const stock = (): { count: number; hash: string } => {
    const pos = buildGroundMesh().geometry.getAttribute('position');
    return { count: pos.count, hash: posHash(pos.array) };
  };

  it('T6: 8025 vertices and the recorded position hash', () => {
    expect(stock()).toEqual({ count: 8025, hash: '5455ad3f' });
  });

  it('T6: a graph build then a build without a graph returns to the stock mesh', () => {
    const placed = placeGraph(loadGraph('hay-run'));
    const world = loadWorldFromObject(placed.level);
    const graph = {
      houses: placed.houses,
      props: placed.props,
      profile: placed.profile,
      seed: placed.seed,
      patches: placed.patches,
      field: placed.field,
      breaks: placed.breaks,
    };
    buildLevelMeshes(world, { houseDress: false, graph });
    expect(buildGroundMesh().geometry.getAttribute('position').count).toBeGreaterThan(8025);
    buildLevelMeshes(world, { houseDress: false });
    expect(stock()).toEqual({ count: 8025, hash: '5455ad3f' });
  });
});
