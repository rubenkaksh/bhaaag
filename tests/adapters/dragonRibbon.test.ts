import { describe, expect, it, vi } from 'vitest';
import { type BufferAttribute, Vector3 } from 'three';
import {
  D_Y,
  D_Z,
  DragonRibbon,
  RIBBON_SECTIONS_BY_TIER,
  SOCKET_BACK,
  ribbonRootY,
  type RibbonParams,
} from '../../src/adapters/render/chase/dragonRibbon';
import { hillY } from '../../src/core/chase/rows';
import type { GraphicsTier } from '../../src/adapters/render/graphicsTier';

const HZ = 40;
function params(t: number, s = 1): RibbonParams {
  const hy = hillY(HZ) + 7;
  return { headX: 0, headY: hy, headZ: HZ, s, lagX: 0, lagY: ribbonRootY(hy, s), time: t };
}
const TIERS: GraphicsTier[] = ['low', 'medium', 'high'];

describe('DragonRibbon', () => {
  it.each(TIERS)('counts at %s', (tier) => {
    const r = new DragonRibbon(tier);
    const n = RIBBON_SECTIONS_BY_TIER[tier];
    expect(r.geometry.attributes.position.count).toBe(2 * n);
    expect(r.geometry.index!.count).toBe(6 * (n - 1));
    expect(r.geometry.index!.count / 3).toBeLessThanOrEqual(110);
  });

  it('does not allocate: buffers keep identity, version grows, no clone/from', () => {
    const r = new DragonRibbon('high');
    r.layout(params(0));
    const g = r.geometry;
    const pos = g.attributes.position.array;
    const uv = g.attributes.uv.array;
    const idx = g.index!.array;
    const { centres, widths } = r;
    const v0 = (g.attributes.position as BufferAttribute).version;
    const clone = vi.spyOn(Vector3.prototype, 'clone');
    const from = vi.spyOn(Float32Array, 'from');
    for (let i = 0; i < 200; i++) r.layout(params(i * 0.037));
    expect(g.attributes.position.array).toBe(pos);
    expect(g.attributes.uv.array).toBe(uv);
    expect(g.index!.array).toBe(idx);
    expect(r.centres).toBe(centres);
    expect(r.widths).toBe(widths);
    expect((g.attributes.position as BufferAttribute).version - v0).toBe(200);
    expect(clone).not.toHaveBeenCalled();
    expect(from).not.toHaveBeenCalled();
    clone.mockRestore();
    from.mockRestore();
  });

  it('starts at the socket and leaves along D', () => {
    const p = params(1.3);
    const r = new DragonRibbon('high');
    r.layout(p);
    expect(r.centres[0]).toBeCloseTo(p.headX, 6);
    expect(r.centres[1]).toBeCloseTo(ribbonRootY(p.headY, p.s), 5);
    expect(r.centres[2]).toBeCloseTo(p.headZ + SOCKET_BACK, 5);
    const c = r.centres;
    const t = new Vector3(c[3] - c[0], c[4] - c[1], c[5] - c[2]).normalize();
    const d = new Vector3(0, D_Y, D_Z);
    expect((Math.acos(Math.min(1, t.dot(d))) * 180) / Math.PI).toBeLessThan(15);
  });

  it('UVs are continuous', () => {
    const r = new DragonRibbon('high');
    const n = r.sections;
    r.layout(params(2));
    const uv = r.geometry.attributes.uv.array as Float32Array;
    const prev = Float32Array.from(uv);
    for (let i = 0; i < n; i++) {
      expect(uv[4 * i]).toBe(0);
      expect(uv[4 * i + 2]).toBe(1);
      expect(uv[4 * i + 1]).toBe(uv[4 * i + 3]);
    }
    expect(uv[1]).toBe(0);
    for (let i = 1; i < n; i++) {
      const step = uv[4 * i + 1] - uv[4 * (i - 1) + 1];
      expect(step).toBeGreaterThan(0);
      expect(step).toBeLessThanOrEqual(0.6);
    }
    r.layout(params(2 + 1 / 60));
    for (let i = 0; i < n; i++) expect(Math.abs(uv[4 * i + 1] - prev[4 * i + 1])).toBeLessThan(0.05);
  });

  it.each(TIERS)('no fold and no twist over 10 s at %s', (tier) => {
    const r = new DragonRibbon(tier);
    const n = r.sections;
    const c = r.centres;
    const pa = r.geometry.attributes.position.array as Float32Array;
    const wd = (i: number, out: number[]) => {
      out[0] = pa[6 * i + 3] - pa[6 * i];
      out[1] = pa[6 * i + 4] - pa[6 * i + 1];
      out[2] = pa[6 * i + 5] - pa[6 * i + 2];
      const l = Math.hypot(out[0], out[1], out[2]);
      out[0] /= l;
      out[1] /= l;
      out[2] /= l;
    };
    const a = [0, 0, 0];
    const b = [0, 0, 0];
    for (let t = 0; t <= 10; t += 0.05) {
      r.layout(params(t));
      for (let i = 0; i < n; i++) {
        wd(i, a);
        expect(a[0]).toBeGreaterThan(0); // left-to-right never reverses relative to X
        if (i > 0) {
          wd(i - 1, b);
          expect(a[0] * b[0] + a[1] * b[1] + a[2] * b[2]).toBeGreaterThan(0.5);
        }
        if (i > 0 && i < n - 1) {
          const p0 = new Vector3(c[3 * i - 3], c[3 * i - 2], c[3 * i - 1]);
          const p1 = new Vector3(c[3 * i], c[3 * i + 1], c[3 * i + 2]);
          const p2 = new Vector3(c[3 * i + 3], c[3 * i + 4], c[3 * i + 5]);
          const la = p1.distanceTo(p0);
          const lb = p2.distanceTo(p1);
          const lc = p2.distanceTo(p0);
          const area2 = new Vector3().subVectors(p1, p0).cross(new Vector3().subVectors(p2, p0)).length();
          if (area2 < 1e-6) continue;
          const R = (la * lb * lc) / (2 * area2);
          expect(r.widths[i] / 2).toBeLessThanOrEqual(0.9 * R);
        }
      }
    }
  });

  it('stays uphill of the hero and above the hill', () => {
    const r = new DragonRibbon('high');
    for (const gap of [36, 22, 2.5]) {
      const heroZ = HZ - gap;
      for (let t = 0; t <= 10; t += 0.25) {
        r.layout(params(t, gap < 10 ? 1.8 : 1));
        for (let i = 0; i < r.sections; i++) {
          const z = r.centres[3 * i + 2];
          expect(z).toBeGreaterThanOrEqual(HZ - 1);
          expect(z).toBeGreaterThan(heroZ);
          expect(r.centres[3 * i + 1]).toBeGreaterThanOrEqual(hillY(z) + 2);
        }
      }
    }
  });

  it('tapers from neck to tail and the neck grows with the loom', () => {
    const r = new DragonRibbon('high');
    r.layout(params(0.7));
    const ratio = r.widths[0] / r.widths[r.sections - 1];
    expect(ratio).toBeGreaterThanOrEqual(2.5);
    expect(ratio).toBeLessThanOrEqual(3.6);
    const w1 = r.widths[0];
    r.layout(params(0.7, 1.8));
    expect(r.widths[0]).toBeGreaterThan(w1);
  });
});
