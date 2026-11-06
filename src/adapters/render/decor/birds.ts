import {
  BufferAttribute,
  BufferGeometry,
  DoubleSide,
  DynamicDrawUsage,
  Mesh,
  MeshBasicMaterial,
} from 'three';
import type { Camera } from 'three';

// ADR 0006 section 4.9: five distant kites, one BufferGeometry, positions rewritten in place.
const N = 5;
const SPAN = 2.4;
const BODY = 0.5;
const TAU = Math.PI * 2;

/** Verts per bird: 0 tip L, 1 tip R, 2 body front, 3 body back. Two triangles each. */
export function buildBirds(): Mesh {
  const pos = new Float32Array(N * 4 * 3);
  const idx: number[] = [];
  for (let k = 0; k < N; k++) {
    const b = k * 4;
    idx.push(b, b + 2, b + 3, b + 1, b + 3, b + 2);
  }
  const geo = new BufferGeometry();
  const attr = new BufferAttribute(pos, 3);
  attr.setUsage(DynamicDrawUsage);
  geo.setAttribute('position', attr);
  geo.setIndex(idx);
  const mesh = new Mesh(
    geo,
    new MeshBasicMaterial({ color: '#2b1d1a', side: DoubleSide, fog: false }),
  );
  mesh.name = 'decor_birds';
  mesh.frustumCulled = false;
  mesh.onBeforeRender = (_r, _s, camera: Camera): void => {
    const t = performance.now() / 1000;
    for (let k = 0; k < N; k++) {
      const a = 0.12 * t + (TAU * k) / N;
      const rad = 18 + 3 * k;
      const cs = Math.cos(a);
      const sn = Math.sin(a);
      const by = 3 * Math.sin(0.7 * t + k);
      const tipY = Math.sin(0.25 * t + k) > -0.3 ? 0.45 * Math.sin(TAU * 2.2 * t + k) : 0.15;
      const bx = cs * rad;
      const bz = sn * rad;
      // heading is the tangent (-sn, cs); wings run along the radial (cs, sn)
      const h = SPAN / 2;
      const f = BODY / 2;
      const o = k * 12;
      pos[o] = bx + cs * h;
      pos[o + 1] = by + tipY;
      pos[o + 2] = bz + sn * h;
      pos[o + 3] = bx - cs * h;
      pos[o + 4] = by + tipY;
      pos[o + 5] = bz - sn * h;
      pos[o + 6] = bx - sn * f;
      pos[o + 7] = by;
      pos[o + 8] = bz + cs * f;
      pos[o + 9] = bx + sn * f;
      pos[o + 10] = by;
      pos[o + 11] = bz - cs * f;
    }
    attr.needsUpdate = true;
    mesh.position.set(camera.position.x + 60, camera.position.y + 22, camera.position.z - 115);
    mesh.updateMatrixWorld();
  };
  return mesh;
}
