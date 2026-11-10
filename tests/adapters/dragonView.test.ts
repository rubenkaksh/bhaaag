import { InstancedMesh, Mesh, Sprite } from 'three';
import { beforeAll, describe, expect, it, vi } from 'vitest';
import { DragonView, PUFFS_BY_TIER } from '../../src/adapters/render/chase/dragonView';
import type { GraphicsTier } from '../../src/adapters/render/graphicsTier';

function drawObjects(v: DragonView): number {
  let n = 0;
  v.group.traverse((o) => {
    if (o instanceof Mesh || o instanceof Sprite) n++;
  });
  return n;
}

function puffCount(v: DragonView): number {
  let n = 0;
  v.group.traverse((o) => {
    if (o instanceof InstancedMesh) n += o.count;
  });
  return n;
}

describe('DragonView', () => {
  beforeAll(() => {
    // node env: the glow texture only needs a canvas whose 2d context is unavailable
    vi.stubGlobal('document', { createElement: () => ({ width: 0, height: 0, getContext: () => null }) });
  });
  const tiers: GraphicsTier[] = ['low', 'medium', 'high'];
  it('stays within a handful of draw calls at every tier', () => {
    for (const t of tiers) {
      const v = new DragonView(t);
      expect(drawObjects(v)).toBeLessThanOrEqual(6);
      v.dispose();
    }
  });
  it('has more puffs on higher tiers', () => {
    const c = tiers.map((t) => {
      const v = new DragonView(t);
      const n = puffCount(v);
      v.dispose();
      return n;
    });
    expect(c[0]).toBeLessThan(c[1]);
    expect(c[1]).toBeLessThan(c[2]);
    expect(PUFFS_BY_TIER.low).toBeLessThan(PUFFS_BY_TIER.high);
  });
  it('rebuilds on a tier change without leaking draw objects', () => {
    const v = new DragonView('low');
    const before = drawObjects(v);
    v.setTier('high');
    v.setTier('low');
    expect(drawObjects(v)).toBe(before);
    v.dispose();
  });
});
