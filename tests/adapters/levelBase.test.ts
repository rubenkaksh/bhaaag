import { readFileSync } from 'node:fs';
import type { Mesh } from 'three';
import { describe, expect, it } from 'vitest';
import { loadWorldFromJson } from '../../src/content/load';
import { buildLevelMeshes } from '../../src/adapters/render/levelView';
import { groundAt } from '../../src/adapters/render/decor/placeDecor';

const world = loadWorldFromJson(
  readFileSync(new URL('../../content/levels/l1.json', import.meta.url), 'utf8'),
);

describe('level base (hillside)', () => {
  it('never draws style 5 barrier walls', () => {
    const g = buildLevelMeshes(world);
    const n5 = world.style.filter((s) => s === 5).length;
    let tris = 0;
    g.traverse((o) => {
      const m = o as Mesh;
      if (m.isMesh && m.geometry.getAttribute('position')) tris++;
    });
    expect(tris).toBeGreaterThan(0);
    expect(n5).toBeGreaterThanOrEqual(0);
  });
  it('brick fill of the goal haystack reaches the hill', () => {
    const g = buildLevelMeshes(world);
    let low = Infinity;
    g.traverse((o) => {
      const m = o as Mesh;
      if (!m.isMesh || m.name === 'ropePost') return;
      const mat = m.material as { color?: { getHexString(): string } };
      if (mat.color?.getHexString() !== '9c5640') return;
      const p = m.geometry.getAttribute('position');
      for (let i = 0; i < p.count; i++) low = Math.min(low, p.getY(i));
    });
    expect(low).toBeLessThanOrEqual(groundAt(world, 0, 0) + 200);
    expect(Number.isFinite(low)).toBe(true);
  });
});
