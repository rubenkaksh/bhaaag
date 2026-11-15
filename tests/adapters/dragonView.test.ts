import { BufferGeometry, Mesh, PerspectiveCamera, Vector3 } from 'three';
import type { Material } from 'three';
import { describe, expect, it } from 'vitest';
import {
  DRAGON_TIERS,
  DragonView,
  SPRITE_SCALE,
  bodyEnvelope,
} from '../../src/adapters/render/chase/dragonView';
import { DragonSpriteView } from '../../src/adapters/render/chase/dragonSpriteView';
import type { GraphicsTier } from '../../src/adapters/render/graphicsTier';

const tiers: GraphicsTier[] = ['low', 'medium', 'high'];

function drawObjects(v: DragonView): Mesh[] {
  const out: Mesh[] = [];
  v.group.traverse((o) => {
    if (o instanceof Mesh) out.push(o);
  });
  return out;
}

function triangles(v: DragonView): number {
  let n = 0;
  for (const m of drawObjects(v)) {
    const g = m.geometry as BufferGeometry;
    const t = g.index !== null ? g.index.count / 3 : g.getAttribute('position').count / 3;
    n += t * ('count' in m ? (m as unknown as { count: number }).count : 1);
  }
  return n;
}

function cam(): PerspectiveCamera {
  const c = new PerspectiveCamera(60, 16 / 9, 0.1, 400);
  c.position.set(0, 10, -20);
  c.lookAt(0, 12, 10);
  c.updateMatrixWorld();
  c.updateProjectionMatrix();
  return c;
}

/** Run the dragon down the hill at `v` m/s for `sec` seconds of 60 Hz frames. */
function fly(d: DragonView, z0: number, v: number, sec: number, heroX = 0): number {
  let z = z0;
  for (let f = 0; f < sec * 60; f++) {
    z -= v / 60;
    d.update(z, f / 60, 0, heroX, 15, z - 20, false);
  }
  return z;
}

function spineOk(d: DragonView): void {
  const a = new Vector3();
  const b = new Vector3();
  const n = d.ringCount;
  let total = 0;
  for (let i = 0; i + 1 < n; i++) {
    d.spinePoint(i, a);
    d.spinePoint(i + 1, b);
    const step = a.distanceTo(b);
    expect(Number.isFinite(step)).toBe(true);
    expect(step).toBeLessThan(4);
    total += step;
  }
  d.spinePoint(0, a);
  d.spinePoint(n - 1, b);
  expect(b.z).toBeGreaterThan(a.z + 30); // the body trails uphill behind the head
  expect(total).toBeGreaterThan(50);
}

describe('DragonView (T304 3D dragon)', () => {
  it('keeps the sprite view name for game.ts', () => {
    expect(DragonSpriteView).toBe(DragonView);
  });

  it('is 7 draw calls and no textures at every tier, with more detail on higher tiers', () => {
    const tris = tiers.map((t) => {
      const v = new DragonView(t);
      const meshes = drawObjects(v);
      expect(meshes.length).toBe(7);
      for (const m of meshes) {
        const mat = m.material as Material & { map?: unknown };
        expect(mat.map ?? null).toBeNull();
      }
      const n = triangles(v);
      v.dispose();
      return n;
    });
    expect(tris[0]).toBeLessThan(tris[1]);
    expect(tris[1]).toBeLessThan(tris[2]);
    expect(DRAGON_TIERS.low.rings).toBeLessThan(DRAGON_TIERS.high.rings);
  });

  it('body envelope is the T290 sprite segment quad x1.3', () => {
    const e = { w: 0, h: 0 };
    for (const u of [0.1, 0.5, 1]) {
      bodyEnvelope(u, e);
      const spriteW = 20 * (0.85 - 0.55 * u);
      expect(e.w).toBeCloseTo(SPRITE_SCALE * spriteW, 6);
      expect(e.h).toBeCloseTo(SPRITE_SCALE * spriteW * 0.62, 6);
    }
  });

  it('rebuilds on a tier change without leaking draw objects', () => {
    const v = new DragonView('low');
    const before = drawObjects(v).length;
    v.setTier('high');
    v.setTier('low');
    expect(drawObjects(v).length).toBe(before);
    v.dispose();
  });

  it('the body follows the head path: continuous, trailing uphill, through a restart jump', () => {
    const d = new DragonView('medium');
    spineOk(d);
    const z = fly(d, 0, 12, 6, 4);
    spineOk(d);
    // the neck ring stays just behind the head after a long run
    const head = new Vector3();
    d.spinePoint(0, head);
    expect(head.z).toBeLessThan(z + 4);
    fly(d, 600, 12, 1); // restart: the dragon jumps back uphill
    spineOk(d);
    d.dispose();
  });

  it('catch beat: head goes on top and faces the lens, then restores; tier rebuild mid-catch restores', () => {
    const d = new DragonView('low');
    const c = cam();
    d.update(5, 1, 1, 0, 2, -15, false);
    d.setCatch(c, 1, 0, 1);
    expect(d.inCatch).toBe(true);
    const skull = drawObjects(d).find((m) => m.name === 'dragon_skull');
    expect(skull?.renderOrder).toBe(999);
    const scr = { x: 0, y: 0 };
    d.headScreen(c, scr);
    expect(scr.x).toBeCloseTo(0.5, 2); // landscape fill frame: face centred
    expect(scr.y).toBeCloseTo(0.5, 2);
    d.setTier('high');
    expect(d.inCatch).toBe(false);
    d.update(5, 1, 1, 0, 2, -15, false);
    d.setCatch(c, 0.6, 0, 1);
    expect(d.inCatch).toBe(true);
    d.setCatch(c, 0, 0, 1);
    expect(d.inCatch).toBe(false);
    for (const m of drawObjects(d)) {
      expect(m.renderOrder).toBe(0);
      expect(m.visible).toBe(true);
    }
    d.dispose();
  });
});
