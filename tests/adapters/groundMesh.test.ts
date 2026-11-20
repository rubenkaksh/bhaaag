import { Color } from 'three';
import { describe, expect, it } from 'vitest';
import { buildGroundMesh, groundColor } from '../../src/adapters/render/decor/groundMesh';

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
