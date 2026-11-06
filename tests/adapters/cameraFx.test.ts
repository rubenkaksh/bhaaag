import { describe, expect, it } from 'vitest';
import { MeshBasicMaterial, NormalBlending } from 'three';
import { CameraFx } from '../../src/adapters/render/cameraFx';
import { DustPuff, dustPuffTriangles } from '../../src/adapters/render/dustPuff';
import { AE_ATTACH, AE_DIE, AE_LAND, AE_RELEASE } from '../../src/adapters/render/animEvents';

// ADR 0007 section 10, tests F1-F6 (lane L-FX).

const DT = 1 / 60;

function state(fx: CameraFx): number[] {
  return [fx.offX, fx.offY, fx.fovAdd, fx.kick, fx.amp, fx.shakeT, fx.accS, fx.prevSpeed];
}

function materialOf(puff: DustPuff): MeshBasicMaterial {
  const m = puff.mesh.material;
  if (m instanceof MeshBasicMaterial) return m;
  throw new Error('dust material is not MeshBasicMaterial');
}

describe('cameraFx', () => {
  it('F1: no events -> offsets and fovAdd stay 0', () => {
    const fx = new CameraFx();
    for (let i = 0; i < 120; i++) {
      fx.update(DT, 0, 0, 6, 0);
      expect(fx.offX).toBe(0);
      expect(fx.offY).toBe(0);
      expect(fx.fovAdd).toBe(0);
    }
    fx.reset();
    expect(state(fx)).toEqual([0, 0, 0, 0, 0, 0, 0, 0]);
  });

  it('F2: AE_LAND at impact 11 shakes in the first 30 ms, silent by 0.6 s', () => {
    const fx = new CameraFx();
    let elapsed = 0;
    let maxAbs = 0;
    let first = true;
    for (;;) {
      fx.update(DT, first ? AE_LAND : 0, 11, 4, 0);
      first = false;
      elapsed += DT;
      if (elapsed > 0.03 + 1e-9) break;
      maxAbs = Math.max(maxAbs, Math.abs(fx.offY));
    }
    expect(maxAbs).toBeGreaterThanOrEqual(0.05);
    expect(maxAbs).toBeLessThanOrEqual(0.1);
    while (elapsed < 0.6 - 1e-9) {
      fx.update(DT, 0, 0, 4, 0);
      elapsed += DT;
    }
    expect(Math.abs(fx.offY)).toBeLessThan(0.002);
    expect(Math.abs(fx.offX)).toBeLessThan(0.002);
  });

  it('F3: AE_RELEASE kicks fovAdd to 5, decayed below 1 at 0.6 s', () => {
    const fx = new CameraFx();
    fx.update(DT, AE_RELEASE, 0, 0, 0);
    expect(Math.abs(fx.fovAdd - 5)).toBeLessThanOrEqual(0.1);
    let elapsed = 0;
    while (elapsed < 0.6 - 1e-9) {
      fx.update(DT, 0, 0, 0, 0);
      elapsed += DT;
    }
    expect(fx.fovAdd).toBeLessThan(1);
  });

  it('F4: same sequence -> identical output; dt 0 and dt over the clamp change nothing', () => {
    const a = new CameraFx();
    const b = new CameraFx();
    const seq: number[][] = [
      [DT, AE_ATTACH, 0, 5, 0],
      [DT, 0, 0, 9, 0],
      [DT, AE_LAND, 11, 3, 0],
      [DT, AE_RELEASE, 0, 14, 0],
      [DT, AE_DIE, 0, 0, 2],
      [DT, AE_LAND | AE_ATTACH, 7, 22, 0],
      [0.05, 0, 0, 1, 0],
      [0.1, 0, 0, 40, 0],
    ];
    for (const step of seq) {
      a.update(step[0], step[1], step[2], step[3], step[4]);
      b.update(step[0], step[1], step[2], step[3], step[4]);
      expect(a.offX).toBe(b.offX);
      expect(a.offY).toBe(b.offY);
      expect(a.fovAdd).toBe(b.fovAdd);
    }

    const snap = state(a);
    a.update(0, AE_LAND | AE_RELEASE | AE_ATTACH | AE_DIE, 11, 100, 3);
    expect(state(a)).toEqual(snap);
    a.update(-1, AE_RELEASE, 11, 10, 2);
    expect(state(a)).toEqual(snap);

    // dt above the 0.1 clamp behaves exactly like dt 0.1.
    const clamped = new CameraFx();
    const reference = new CameraFx();
    clamped.update(5, AE_ATTACH | AE_LAND, 11, 20, 0);
    reference.update(0.1, AE_ATTACH | AE_LAND, 11, 20, 0);
    expect(state(clamped)).toEqual(state(reference));

    const fresh = new CameraFx();
    fresh.update(0, AE_RELEASE, 11, 10, 2);
    expect(state(fresh)).toEqual([0, 0, 0, 0, 0, 0, 0, 0]);
  });

  it('F5: fovAdd stays within [-4, 12] under any spam', () => {
    const fx = new CameraFx();
    for (let i = 0; i < 600; i++) {
      let ev = 0;
      if (i % 2 === 0) ev |= AE_ATTACH;
      if (i % 3 === 0) ev |= AE_RELEASE;
      if (i % 5 === 0) ev |= AE_LAND;
      if (i % 7 === 0) ev |= AE_DIE;
      const speed = i % 2 === 0 ? 0 : 45;
      fx.update(DT, ev, 11, speed, 2);
      expect(fx.fovAdd).toBeLessThanOrEqual(12);
      expect(fx.fovAdd).toBeGreaterThanOrEqual(-4);
    }

    // Both terms saturated on one frame: kick 8 + accFov 4 = 12 exactly.
    const hot = new CameraFx();
    hot.update(0.1, AE_ATTACH, 0, 0, 0);
    hot.update(0.1, AE_ATTACH | AE_RELEASE | AE_LAND, 0, 400, 0);
    expect(hot.fovAdd).toBeLessThanOrEqual(12);
    expect(hot.fovAdd).toBeCloseTo(12, 6);
  });
});

describe('dustPuff', () => {
  it('F6: hidden at rest, animates then hides at 0.4 s, 24 tris, normal blending', () => {
    const puff = new DustPuff();
    const mat = materialOf(puff);
    expect(puff.mesh.visible).toBe(false);
    expect(mat.opacity).toBe(0);

    const idx = puff.mesh.geometry.getIndex();
    expect(idx ? idx.count / 3 : -1).toBe(24);
    expect(dustPuffTriangles()).toBe(24);
    expect(mat.blending).toBe(NormalBlending);
    expect(mat.transparent).toBe(true);
    expect(mat.depthWrite).toBe(false);

    puff.trigger(1, 5, -2, 1);
    expect(puff.mesh.visible).toBe(true);
    expect(puff.mesh.position.y).toBeCloseTo(5.03, 6);
    expect(puff.mesh.scale.x).toBeCloseTo(1, 6);

    const startOpacity = mat.opacity;
    expect(startOpacity).toBeGreaterThan(0);
    let prevScale = puff.mesh.scale.x;
    let prevOpacity = startOpacity;
    let elapsed = 0;
    const step = 0.005;
    while (elapsed < 0.39) {
      puff.update(step);
      elapsed += step;
      const s = puff.mesh.scale.x;
      const o = mat.opacity;
      expect(s).toBeGreaterThanOrEqual(prevScale);
      expect(o).toBeLessThanOrEqual(prevOpacity);
      prevScale = s;
      prevOpacity = o;
    }
    expect(puff.mesh.visible).toBe(true);
    expect(prevScale).toBeGreaterThan(1);
    expect(prevOpacity).toBeLessThan(startOpacity);

    puff.update(0.05);
    expect(puff.mesh.visible).toBe(false);
    expect(mat.opacity).toBe(0);

    // A hidden puff ignores updates and stays hidden.
    puff.update(0.1);
    expect(puff.mesh.visible).toBe(false);
    expect(mat.opacity).toBe(0);
  });
});
