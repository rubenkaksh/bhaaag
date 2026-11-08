import { describe, expect, it } from 'vitest';
import {
  backdropData,
  backdropTriangles,
  buildBackdrop,
  skirtY,
} from '../../src/adapters/render/backdrop';

describe('backdrop', () => {
  it('is deterministic', () => {
    const a = backdropData('high');
    const b = backdropData('high');
    for (let i = 0; i < a.length; i++)
      expect(Array.from(a[i].positions)).toEqual(Array.from(b[i].positions));
  });
  it('stays inside the triangle budget', () => {
    expect(backdropTriangles('high')).toBeLessThanOrEqual(6000);
    expect(backdropTriangles('medium')).toBeLessThanOrEqual(4000);
    expect(backdropTriangles('low')).toBeLessThanOrEqual(2500);
    expect(backdropTriangles('low')).toBeLessThan(backdropTriangles('high'));
  });
  it('keeps finite data inside the camera far plane and behind the village', () => {
    for (const l of backdropData('high')) {
      expect(l.positions.length).toBe(l.triangles * 9);
      expect(l.colors.length).toBe(l.positions.length);
      for (let i = 0; i < l.positions.length; i += 3) {
        const [x, y, z] = [l.positions[i], l.positions[i + 1], l.positions[i + 2]];
        expect(Number.isFinite(x + y + z)).toBe(true);
        if (l.name === 'skirt') expect(z).toBeGreaterThan(30);
        else expect(z).toBeLessThan(-300);
        expect(Math.hypot(x, z)).toBeLessThan(1000);
      }
    }
  });
  it('skirt rises uphill and starts below the plot', () => {
    expect(skirtY(36)).toBeLessThan(0.2222 * 36 - 10);
    expect(skirtY(300)).toBeGreaterThan(skirtY(100));
  });
  it('builds a group with three meshes', () => {
    const g = buildBackdrop('low');
    expect(g.children.length).toBe(3);
    // Range and ridges draw after the sky dome (renderOrder -2) and before the sun core (-1).
    for (const c of g.children) {
      if (c.name === 'skirt') continue;
      expect(c.renderOrder).toBeGreaterThan(-2);
      expect(c.renderOrder).toBeLessThan(-1);
    }
  });
});
