import { readFileSync } from 'node:fs';
import type { Mesh } from 'three';
import { describe, expect, it } from 'vitest';
import { loadWorldFromJson } from '../../src/content/load';
import { buildLevelMeshes } from '../../src/adapters/render/levelView';

const world = loadWorldFromJson(
  readFileSync(new URL('../../content/levels/l1.json', import.meta.url), 'utf8'),
);

describe('level base (ADR 0007 R7)', () => {
  it('gives the spawn roof a brick base down to y -20', () => {
    const s0 = world.solids[1];
    const g = buildLevelMeshes(world);
    let found = false;
    g.traverse((o) => {
      const m = o as Mesh;
      if (!m.isMesh || m.name === 'ropePost') return;
      const mat = m.material as { color?: { getHexString(): string } };
      if (mat.color?.getHexString() !== '9c5640') return;
      const p = m.geometry.getAttribute('position');
      for (let i = 0; i < p.count; i++) {
        if (
          Math.abs(p.getY(i) + 20) < 0.01 &&
          p.getX(i) >= s0.min.x - 1e-6 &&
          p.getX(i) <= s0.max.x + 1e-6 &&
          p.getZ(i) >= s0.min.z - 1e-6 &&
          p.getZ(i) <= s0.max.z + 1e-6
        )
          found = true;
      }
    });
    expect(found).toBe(true);
  });
});
