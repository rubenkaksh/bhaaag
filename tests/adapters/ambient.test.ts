import { Group, IcosahedronGeometry, Mesh, MeshBasicMaterial, PlaneGeometry } from 'three';
import type { BufferAttribute } from 'three';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { attachAmbient } from '../../src/adapters/render/decor/ambient';

// ADR 0007 section 6 (L-AMBIENT), section 10 tests A1-A3.
// The flag is the kit's PlaneGeometry 0.35 x 0.25 (4 verts, top edge fixed);
// the canopy is the kit's IcosahedronGeometry(1, 1). t = 1.3 s.

const NOW_MS = 1300;

function fixture(): { flag: Mesh; canopy: Mesh; decor: Group } {
  const flag = new Mesh(new PlaneGeometry(0.35, 0.25), new MeshBasicMaterial());
  flag.name = 'decor_flag';
  const canopy = new Mesh(new IcosahedronGeometry(1, 1), new MeshBasicMaterial());
  canopy.name = 'decor_canopy';
  const decor = new Group();
  decor.add(flag, canopy);
  attachAmbient(decor);
  return { flag, canopy, decor };
}

function draw(mesh: Mesh): void {
  const fn = mesh.onBeforeRender;
  if (fn === null) throw new Error(mesh.name + ': onBeforeRender not attached');
  fn(null as never, null as never, null as never, null as never, null as never, null as never);
}

function positions(mesh: Mesh): BufferAttribute {
  const attr = mesh.geometry.getAttribute('position');
  if (attr === undefined || attr.itemSize !== 3)
    throw new Error(mesh.name + ': no position attribute');
  return attr as BufferAttribute;
}

function snapshot(mesh: Mesh): Float32Array {
  return Float32Array.from(positions(mesh).array as Float32Array);
}

function moved(base: Float32Array, now: Float32Array, i: number): number {
  const dx = now[i * 3] - base[i * 3];
  const dy = now[i * 3 + 1] - base[i * 3 + 1];
  const dz = now[i * 3 + 2] - base[i * 3 + 2];
  return Math.sqrt(dx * dx + dy * dy + dz * dz);
}

function yMinOf(base: Float32Array, count: number): number {
  let yMin = Infinity;
  for (let i = 0; i < count; i++) {
    const y = base[i * 3 + 1];
    if (y < yMin) yMin = y;
  }
  return yMin;
}

afterEach(() => {
  vi.restoreAllMocks();
});

describe('A1 flag flutter (ADR 0007 section 6)', () => {
  it('leaves the top verts fixed and moves the bottom verts by 0 < |d| <= 0.05 at t = 1.3', () => {
    const { flag } = fixture();
    const base = snapshot(flag);
    const count = positions(flag).count;
    const yMin = yMinOf(base, count);
    vi.spyOn(performance, 'now').mockReturnValue(NOW_MS);
    draw(flag);
    const now = snapshot(flag);
    let bottom = 0;
    for (let i = 0; i < count; i++) {
      if (base[i * 3 + 1] > yMin) {
        expect(now[i * 3]).toBe(base[i * 3]);
        expect(now[i * 3 + 1]).toBe(base[i * 3 + 1]);
        expect(now[i * 3 + 2]).toBe(base[i * 3 + 2]);
      } else {
        const d = moved(base, now, i);
        expect(d).toBeGreaterThan(0);
        expect(d).toBeLessThanOrEqual(0.05);
        bottom++;
      }
    }
    expect(bottom).toBe(2);
  });
});

describe('A2 canopy sway (ADR 0007 section 6)', () => {
  it('moves every canopy vert by <= 0.035 and the lowest vert by <= 1e-3', () => {
    const { canopy } = fixture();
    const base = snapshot(canopy);
    const count = positions(canopy).count;
    const yMin = yMinOf(base, count);
    vi.spyOn(performance, 'now').mockReturnValue(NOW_MS);
    draw(canopy);
    const now = snapshot(canopy);
    let maxMove = 0;
    let lowestMove = 0;
    for (let i = 0; i < count; i++) {
      const d = moved(base, now, i);
      if (d > maxMove) maxMove = d;
      if (base[i * 3 + 1] <= yMin + 1e-9 && d > lowestMove) lowestMove = d;
    }
    expect(maxMove).toBeGreaterThan(0);
    expect(maxMove).toBeLessThanOrEqual(0.035);
    expect(lowestMove).toBeLessThanOrEqual(1e-3);
  });
});

describe('A3 preallocated buffers (ADR 0007 section 1)', () => {
  it('keeps the position attribute and its buffer identical across frames', () => {
    const { flag, canopy } = fixture();
    const spy = vi.spyOn(performance, 'now');
    for (const mesh of [flag, canopy]) {
      const attr = positions(mesh);
      const buffer = attr.array;
      const version0 = attr.version;
      const stamps = [NOW_MS, NOW_MS + 150, NOW_MS + 900];
      for (let k = 0; k < stamps.length; k++) {
        spy.mockReturnValue(stamps[k]);
        draw(mesh);
        expect(positions(mesh)).toBe(attr);
        expect(attr.array).toBe(buffer);
        expect(attr.version).toBe(version0 + k + 1);
      }
    }
  });
});
