import { readFileSync } from 'node:fs';
import type { Object3D } from 'three';
import { describe, expect, it } from 'vitest';
import { loadWorldFromJson } from '../../src/content/load';
import { buildLevelMeshes } from '../../src/adapters/render/levelView';

const world = loadWorldFromJson(
  readFileSync(new URL('../../content/levels/l1.json', import.meta.url), 'utf8'),
);

function names(root: Object3D): string[] {
  const out: string[] = [];
  root.traverse((o) => out.push(o.name));
  return out;
}

describe('buildLevelMeshes scenery option', () => {
  it('default keeps ground, birds and the rope post', () => {
    const n = names(buildLevelMeshes(world));
    expect(n).toContain('decor_ground');
    expect(n.some((x) => x.includes('bird'))).toBe(true);
  });
  it('scenery:false drops ground, birds and the rope post but keeps houses and anchors', () => {
    const g = buildLevelMeshes(world, { scenery: false });
    const n = names(g);
    expect(n).not.toContain('decor_ground');
    expect(n.some((x) => x.includes('bird'))).toBe(false);
    expect(n).not.toContain('ropePost');
    expect(n.some((x) => x.startsWith('anchor'))).toBe(true);
    expect(n.some((x) => x.startsWith('decor_'))).toBe(true);
  });
});
