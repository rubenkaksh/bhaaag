import { AdditiveBlending, Color, Mesh, Vector3 } from 'three';
import type { Group, MeshBasicMaterial, Object3D } from 'three';
import { describe, expect, it } from 'vitest';
import { pixelRatioFor } from '../../src/adapters/render/scene';
import {
  HAZE,
  MOUNTAIN_SEGMENTS,
  SUN_AZ_DEG,
  SUN_DIR,
  SUN_EL_DEG,
  buildMountains,
  buildSkyView,
  skyColorAt,
} from '../../src/adapters/render/skyView';

const DEG = Math.PI / 180;

function triangles(o: Object3D): number {
  let n = 0;
  o.traverse((c) => {
    const m = c as Mesh;
    if (m.isMesh) n += (m.geometry.index ? m.geometry.index.count : m.geometry.attributes.position.count) / 3;
  });
  return n;
}

describe('sky gradient (ADR 0005 D4)', () => {
  it('uses the flat below-horizon colour under h = 0', () => {
    expect(skyColorAt(-0.2, new Color()).getHexString()).toBe('e6a77a');
  });

  it('starts at HAZE on the horizon and hits the stops at 0.10, 0.30 and 0.60', () => {
    expect(skyColorAt(0, new Color()).getHexString()).toBe(new Color(HAZE).getHexString());
    expect(skyColorAt(0.1, new Color()).getHexString()).toBe('f2a050');
    expect(skyColorAt(0.3, new Color()).getHexString()).toBe('d77a45');
    expect(skyColorAt(0.9, new Color()).getHexString()).toBe('9c5a4c');
  });

  it('is a real gradient between stops, not a flat band', () => {
    const lo = skyColorAt(0.05, new Color()).getHex();
    const hi = skyColorAt(0.2, new Color()).getHex();
    expect(lo).not.toBe(hi);
  });
});

describe('sun placement (ADR 0005 D4, raised by ADR 0006 L-SKY)', () => {
  it('SUN_DIR is 32 degrees right of -Z and 8 degrees up', () => {
    expect(SUN_EL_DEG).toBe(8);
    expect(SUN_AZ_DEG).toBe(32);
    expect(SUN_DIR.length()).toBeCloseTo(1, 6);
    expect(Math.atan2(SUN_DIR.x, -SUN_DIR.z) * 180 / Math.PI).toBeCloseTo(32, 0);
    expect(Math.asin(SUN_DIR.y) * 180 / Math.PI).toBeCloseTo(8, 0);
  });

  it('puts the glow and core 470 m out along SUN_DIR, facing back at the sky origin', () => {
    const sky = buildSkyView();
    const glow = sky.getObjectByName('sunGlow') as Mesh;
    const core = sky.getObjectByName('sunCore') as Mesh;
    for (const m of [glow, core]) {
      expect(m.position.distanceTo(new Vector3())).toBeCloseTo(470, 3);
      expect(m.position.clone().normalize().distanceTo(SUN_DIR)).toBeCloseTo(0, 5);
      // The disc normal (+Z in local space) must point from the sun back at the origin.
      const normal = new Vector3(0, 0, 1).applyQuaternion(m.quaternion);
      expect(normal.distanceTo(SUN_DIR.clone().negate())).toBeCloseTo(0, 5);
    }
  });

  it('gives the glow centre alpha 0.5, rim alpha 0 and a radius of 120', () => {
    const glow = buildSkyView().getObjectByName('sunGlow') as Mesh;
    const a = glow.geometry.attributes.color;
    expect(a.itemSize).toBe(4);
    expect(a.getW(0)).toBeCloseTo(0.5, 5);
    expect(a.getW(a.count - 1)).toBe(0);
    // CircleGeometry vertex 1 sits on the rim.
    const p = glow.geometry.attributes.position;
    expect(Math.hypot(p.getX(1), p.getY(1))).toBeCloseTo(120, 5);
  });

  it('draws the dome before the core and both before the mountains (ADR 0006)', () => {
    const sky = buildSkyView();
    expect((sky.getObjectByName('skyDome') as Mesh).renderOrder).toBe(-2);
    expect((sky.getObjectByName('sunCore') as Mesh).renderOrder).toBe(-1);
    expect(buildMountains().renderOrder).toBe(0);
  });
});

describe('horizon haze (ADR 0006 L-SKY)', () => {
  it('is an additive, depth-write-off band with max vertex alpha 0.35', () => {
    const haze = buildSkyView().getObjectByName('horizonHaze') as Mesh;
    expect(haze).toBeTruthy();
    const mat = haze.material as MeshBasicMaterial;
    expect(mat.blending).toBe(AdditiveBlending);
    expect(mat.depthWrite).toBe(false);
    const a = haze.geometry.attributes.color;
    expect(a.itemSize).toBe(4);
    let maxA = 0;
    for (let i = 0; i < a.count; i++) maxA = Math.max(maxA, a.getW(i));
    expect(maxA).toBeLessThanOrEqual(0.35);
    expect(maxA).toBeGreaterThan(0);
  });

  it('costs 192 triangles', () => {
    const haze = buildSkyView().getObjectByName('horizonHaze') as Mesh;
    expect(triangles(haze)).toBe(192);
  });
});

describe('mountains (ADR 0005 D4)', () => {
  it('forms a ring of strips around (0, -110) at radii 360 to 480', () => {
    const m = buildMountains();
    const p = m.geometry.attributes.position;
    let minR = Infinity;
    let maxR = -Infinity;
    for (let i = 0; i < p.count; i++) {
      const r = Math.hypot(p.getX(i), p.getZ(i) + 110);
      minR = Math.min(minR, r);
      maxR = Math.max(maxR, r);
    }
    expect(minR).toBeCloseTo(360, 3);
    expect(maxR).toBeCloseTo(480, 3);
  });

  it('drops every strip bottom to y -200 so no gap shows', () => {
    const p = buildMountains().geometry.attributes.position;
    let lowest = Infinity;
    for (let i = 0; i < p.count; i++) lowest = Math.min(lowest, p.getY(i));
    expect(lowest).toBe(-200);
  });

  it('is deterministic for a seed', () => {
    const a = buildMountains().geometry.attributes.position.array;
    const b = buildMountains().geometry.attributes.position.array;
    expect(Array.from(a)).toEqual(Array.from(b));
  });

  it('keeps the sun ray below SUN_EL - 1.5 degrees off every ridge for the whole route (ADR 0006)', () => {
    const p = buildMountains().geometry.attributes.position;
    const layerStride = MOUNTAIN_SEGMENTS * 2; // top/bottom vertex pairs
    const layers: { x: number; y: number; z: number }[][] = [];
    for (let L = 0; L * layerStride < p.count; L++) {
      const tops: { x: number; y: number; z: number }[] = [];
      for (let i = 0; i < MOUNTAIN_SEGMENTS; i++) {
        const vi = L * layerStride + 2 * i;
        tops.push({ x: p.getX(vi), y: p.getY(vi), z: p.getZ(vi) });
      }
      layers.push(tops);
    }
    expect(layers.length).toBe(3);
    // Horizontal sun-azimuth ray, 2D segment intersection against each layer's top polyline.
    const hx = Math.sin(SUN_AZ_DEG * DEG);
    const hz = -Math.cos(SUN_AZ_DEG * DEG);
    const limit = SUN_EL_DEG - 1.5;
    for (let z = 10; z >= -210; z -= 5) {
      for (const x of [-7, 0, 7]) {
        const ey = 4 + 0.37 * z;
        for (const tops of layers) {
          let hitY = Number.NaN;
          let hitD = Number.NaN;
          for (let i = 0; i < tops.length; i++) {
            const a = tops[i];
            const b = tops[(i + 1) % tops.length];
            const wx = a.x - x;
            const wz = a.z - z;
            const rx = b.x - a.x;
            const rz = b.z - a.z;
            const den = hx * rz - hz * rx;
            if (den === 0) continue;
            const t = (wx * rz - wz * rx) / den; // distance along the ray
            const u = (wx * hz - wz * hx) / den; // position along the segment
            if (t >= 0 && u >= -1e-9 && u <= 1 + 1e-9) {
              hitY = a.y + (b.y - a.y) * u;
              hitD = t;
              break;
            }
          }
          expect(Number.isNaN(hitD)).toBe(false);
          const el = (Math.atan2(hitY - ey, hitD) * 180) / Math.PI;
          expect(el).toBeLessThanOrEqual(limit);
        }
      }
    }
  });
});

describe('sky triangle budget (ADR 0005 D10: sky + mountains <= 3k)', () => {
  it('keeps sky and mountains under 3000 triangles', () => {
    const total = triangles(buildSkyView() as Group) + triangles(buildMountains());
    expect(total).toBeLessThan(3000);
    expect(total).toBeGreaterThan(0);
  });
});

describe('pixel ratio cap (ADR 0005 D4)', () => {
  it('caps at 1.5 on coarse pointers and 2 otherwise', () => {
    expect(pixelRatioFor(3, true)).toBe(1.5);
    expect(pixelRatioFor(3, false)).toBe(2);
  });

  it('never raises a low device ratio', () => {
    expect(pixelRatioFor(1, true)).toBe(1);
    expect(pixelRatioFor(1.25, false)).toBe(1.25);
  });
});
