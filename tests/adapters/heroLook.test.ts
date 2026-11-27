import { describe, expect, it } from 'vitest';
import { Color, Mesh } from 'three';
import type { Material, SkinnedMesh } from 'three';
import { HERO_HEMP, HERO_OAT, heroLook, riderLook } from '../../src/adapters/render/heroLook';
import { HeroRig, HERO_COLORS } from '../../src/adapters/render/heroRig';

function stats(rig: HeroRig): { tris: number; draws: number; mats: number } {
  let tris = 0;
  let draws = 0;
  const mats = new Set<Material>();
  rig.root.traverse((o) => {
    if (o instanceof Mesh) {
      draws++;
      const g = o.geometry;
      tris += (g.index ? g.index.count : g.attributes.position.count) / 3;
      mats.add(o.material as Material);
    }
  });
  return { tris, draws, mats: mats.size };
}

const lum = (hex: string): number => {
  const c = new Color(hex);
  return 0.2126 * c.r + 0.7152 * c.g + 0.0722 * c.b;
};

describe('heroLook (shared by the zipline hero and the hunting riders)', () => {
  it('zipline hero keeps the hemp palette (ADR 0009 contrast) and a beanie', () => {
    expect(HERO_COLORS).toBe(HERO_HEMP);
    expect(heroLook().hat).toBe('beanie');
    for (const bg of ['#f1e9d2', '#d9c6aa', '#b9a68c']) {
      expect((lum(bg) + 0.05) / (lum(HERO_HEMP.tunic) + 0.05)).toBeGreaterThanOrEqual(3);
    }
  });

  it('riders use the oat reference palette, which deliberately fails the pad contrast rule', () => {
    expect(riderLook('quiver').palette).toBe(HERO_OAT);
    expect((lum('#f1e9d2') + 0.05) / (lum(HERO_OAT.tunic) + 0.05)).toBeLessThan(3);
    expect(riderLook('quiver').hat).toBe('beanie');
    expect(riderLook('bandolier').hat).toBe('helmet');
  });

  it('every look stays at 6 skinned draws and 6 materials', () => {
    for (const look of [
      heroLook(),
      riderLook('quiver'),
      riderLook('bandolier'),
      riderLook('quiver', 1),
    ]) {
      const s = stats(new HeroRig(look));
      expect(s.draws).toBeLessThanOrEqual(6);
      expect(s.mats).toBe(6);
    }
  });

  it('Low is under 1,500 triangles, High under 3,000 (owner D3, 2026-11-27)', () => {
    for (const g of ['quiver', 'bandolier'] as const) {
      expect(stats(new HeroRig(riderLook(g, 0))).tris).toBeLessThan(1500);
      expect(stats(new HeroRig(riderLook(g, 1))).tris).toBeLessThan(3000);
    }
    expect(stats(new HeroRig()).tris).toBeLessThan(1500);
  });

  it('bakes clay shading into vertex colours (darker at the feet)', () => {
    const rig = new HeroRig();
    let found = false;
    rig.root.traverse((o) => {
      const sm = o as SkinnedMesh;
      if (!sm.isSkinnedMesh) return;
      const c = sm.geometry.getAttribute('color');
      const p = sm.geometry.getAttribute('position');
      let lo = 1;
      let hi = 0;
      for (let i = 0; i < p.count; i++) {
        if (p.getY(i) < 0.1) lo = Math.min(lo, c.getX(i));
        if (p.getY(i) > 1.4) hi = Math.max(hi, c.getX(i));
      }
      if (lo < hi) found = true;
    });
    expect(found).toBe(true);
  });
});
