import { describe, expect, it } from 'vitest';
import {
  BACKDROP_LAYER_NAMES,
  RING_CENTER,
  backdropData,
  backdropTriangles,
  buildBackdrop,
  edgeRadius,
  type BackdropLayer,
  type BackdropTier,
} from '../../src/adapters/render/backdrop';
import { SUN_AZ_DEG, SUN_EL_DEG } from '../../src/adapters/render/skyView';
import {
  TERRAIN_HALF_X,
  TERRAIN_Z_MAX,
  TERRAIN_Z_MIN,
  terrainY,
} from '../../src/adapters/render/terrain';

const DEG = Math.PI / 180;
const tiers: BackdropTier[] = ['low', 'medium', 'high'];
const layer = (d: BackdropLayer[], n: string): BackdropLayer => d.find((l) => l.name === n)!;

/** Highest y per (rounded) azimuth bucket of one layer, azimuth 0 = -Z, + = +X. */
function crestByAzimuth(l: BackdropLayer, buckets: number): number[] {
  const out = new Array<number>(buckets).fill(-Infinity);
  for (let i = 0; i < l.positions.length; i += 3) {
    const az = Math.atan2(l.positions[i] - RING_CENTER.x, -(l.positions[i + 2] - RING_CENTER.z));
    const b = Math.floor(((((az / (2 * Math.PI)) % 1) + 1) % 1) * buckets);
    out[b] = Math.max(out[b], l.positions[i + 1]);
  }
  return out;
}

describe('backdrop mountain system', () => {
  it('is deterministic', () => {
    const a = backdropData('medium');
    const b = backdropData('medium');
    expect(a.map((l) => l.name)).toEqual(BACKDROP_LAYER_NAMES);
    for (let i = 0; i < a.length; i++) {
      expect(Array.from(a[i].positions)).toEqual(Array.from(b[i].positions));
      expect(Array.from(a[i].colors)).toEqual(Array.from(b[i].colors));
    }
  });

  it('stays inside the tier triangle budgets (6k / 14k / 30k)', () => {
    expect(backdropTriangles('low')).toBeLessThanOrEqual(6000);
    expect(backdropTriangles('medium')).toBeLessThanOrEqual(14000);
    expect(backdropTriangles('high')).toBeLessThanOrEqual(30000);
    expect(backdropTriangles('low')).toBeLessThan(backdropTriangles('medium'));
    expect(backdropTriangles('medium')).toBeLessThan(backdropTriangles('high'));
  });

  it('has finite positions, vertex colours in [0, 1] and everything inside camera far (3000)', () => {
    for (const t of tiers) {
      for (const l of backdropData(t)) {
        expect(l.positions.length).toBe(l.triangles * 9);
        expect(l.colors.length).toBe(l.positions.length);
        for (let i = 0; i < l.positions.length; i += 3) {
          const [x, y, z] = [l.positions[i], l.positions[i + 1], l.positions[i + 2]];
          expect(Number.isFinite(x + y + z)).toBe(true);
          expect(Math.hypot(x, z)).toBeLessThan(2600);
          expect(y).toBeLessThan(1200);
          for (let k = 0; k < 3; k++) {
            expect(l.colors[i + k]).toBeGreaterThanOrEqual(0);
            expect(l.colors[i + k]).toBeLessThanOrEqual(1);
          }
        }
      }
    }
  }, 30000); // ~1.2 s locally but 3-5.5 s on CI runners; the default 5 s flaked

  it('wraps the whole horizon: every layer has crests in all 8 octants of azimuth', () => {
    for (const l of backdropData('medium')) {
      const c = crestByAzimuth(l, 8);
      for (const v of c) expect(Number.isFinite(v)).toBe(true);
    }
  });

  it('forest rings start at or below the terrain edge and rise above it', () => {
    const d = backdropData('medium');
    for (const name of ['forestFar', 'forestNear']) {
      const l = layer(d, name);
      let risen = 0;
      let verts = 0;
      for (let i = 0; i < l.positions.length; i += 3) {
        const [x, y, z] = [l.positions[i], l.positions[i + 1], l.positions[i + 2]];
        const outside =
          Math.abs(x) > TERRAIN_HALF_X + 0.5 || z < TERRAIN_Z_MIN - 0.5 || z > TERRAIN_Z_MAX + 0.5;
        // the seam point: where the ray from the ring centre through this vertex meets the terrain edge
        const phi = Math.atan2(x - RING_CENTER.x, -(z - RING_CENTER.z));
        const er = edgeRadius(phi);
        const ex = RING_CENTER.x + Math.sin(phi) * er;
        const ez = RING_CENTER.z - Math.cos(phi) * er;
        if (!outside) {
          // buried part: under the terrain surface, so the seam cannot show
          expect(y).toBeLessThanOrEqual(terrainY(x, z) + 0.5);
        } else {
          verts++;
          if (y > terrainY(ex, ez) + 15) risen++;
          expect(y).toBeGreaterThanOrEqual(terrainY(ex, ez) - 1);
        }
      }
      expect(risen / verts).toBeGreaterThan(0.3);
    }
  });

  it('has distinct, varied massif peaks with real height above the ridges', () => {
    const l = layer(backdropData('medium'), 'massif');
    const fwd = crestByAzimuth(l, 120).filter((_, b) => {
      const az = ((b + 0.5) / 120) * 360;
      return az < 75 || az > 285;
    });
    // count local maxima that stand clearly above both neighbours' valleys
    let peaks = 0;
    for (let i = 2; i < fwd.length - 2; i++) {
      const lo = Math.min(...fwd.slice(i - 2, i + 3));
      if (fwd[i] >= fwd[i - 1] && fwd[i] > fwd[i + 1] && fwd[i] - lo > 25) peaks++;
    }
    expect(peaks).toBeGreaterThanOrEqual(5);
    expect(Math.max(...fwd) - Math.min(...fwd)).toBeGreaterThan(100);
  });

  it('colours the massif with snow (bright) and rock (darker) and keeps forests green', () => {
    const d = backdropData('medium');
    const lum = (l: BackdropLayer, i: number): number =>
      0.3 * l.colors[i] + 0.59 * l.colors[i + 1] + 0.11 * l.colors[i + 2];
    const m = layer(d, 'massif');
    let bright = 0;
    let dark = 0;
    for (let i = 0; i < m.colors.length; i += 3) {
      if (lum(m, i) > 0.6) bright++;
      if (lum(m, i) < 0.5) dark++;
    }
    expect(bright).toBeGreaterThan(100);
    expect(dark).toBeGreaterThan(100);
    const f = layer(d, 'forestNear');
    let green = 0;
    for (let i = 0; i < f.colors.length; i += 3) {
      if (f.colors[i + 1] > f.colors[i] && f.colors[i + 1] > f.colors[i + 2]) green++;
    }
    expect(green / (f.colors.length / 3)).toBeGreaterThan(0.5);
  });

  it('keeps the sun clear from every eye along the route (sun valley)', () => {
    const limit = SUN_EL_DEG - 1.5;
    const sunAz = SUN_AZ_DEG * DEG;
    for (const l of backdropData('high')) {
      for (let i = 0; i < l.positions.length; i += 3) {
        const [x, y, z] = [l.positions[i], l.positions[i + 1], l.positions[i + 2]];
        for (let ez = 10; ez >= -110; ez -= 20) {
          for (const ex of [-7, 0, 7]) {
            const dx = x - ex;
            const dz = z - ez;
            const az = Math.atan2(dx, -dz);
            let da = Math.abs(az - sunAz);
            if (da > Math.PI) da = 2 * Math.PI - da;
            if (da > 3 * DEG) continue;
            const el = Math.atan2(y - (4 + 0.37 * ez), Math.hypot(dx, dz)) / DEG;
            expect(el).toBeLessThanOrEqual(limit);
          }
        }
      }
    }
  });

  it('edge radius hugs the terrain rectangle', () => {
    expect(edgeRadius(Math.PI / 2)).toBeCloseTo(TERRAIN_HALF_X, 5);
    expect(edgeRadius(0)).toBeCloseTo((TERRAIN_Z_MAX - TERRAIN_Z_MIN) / 2, 5);
  });

  it('builds one merged mesh, drawn after the sky dome and before the sun core', () => {
    const g = buildBackdrop('low');
    expect(g.children.length).toBe(1);
    for (const c of g.children) {
      expect(c.renderOrder).toBeGreaterThan(-2);
      expect(c.renderOrder).toBeLessThan(-1);
    }
  });
});
