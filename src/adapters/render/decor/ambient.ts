import { DynamicDrawUsage } from 'three';
import type { BufferAttribute, Group, Mesh } from 'three';

// ADR 0007 section 6 (L-AMBIENT): flag flutter and canopy sway.
// Base positions are copied once per geometry at attach time; onBeforeRender
// rewrites the position attribute in place (t = performance.now()/1000, the
// same source as birds.ts). Normals are not recomputed, nothing else runs
// per frame, and no per-frame allocation happens (ADR 0007 section 1).

const TAU = Math.PI * 2;
const FLAG_SWAY = 0.05;
const FLAG_HZ = 1.4;
const FLAG_X_PHASE = 4;
const CANOPY_X_SWAY = 0.035;
const CANOPY_Z_SWAY = 0.02;
const CANOPY_X_HZ = 0.35;
const CANOPY_Z_HZ = 0.27;

interface Slots {
  attr: BufferAttribute;
  arr: Float32Array;
  base: Float32Array;
  n: number;
}

function prepare(mesh: Mesh): Slots | null {
  const got = mesh.geometry.getAttribute('position');
  if (got === undefined || got.itemSize !== 3) return null;
  const attr = got as BufferAttribute;
  const arr = attr.array as Float32Array;
  attr.setUsage(DynamicDrawUsage);
  const base = new Float32Array(arr); // one copy, at attach time only
  return { attr, arr, base, n: attr.count };
}

function bounds(base: Float32Array, n: number): { yMin: number; yMax: number } {
  let yMin = Infinity;
  let yMax = -Infinity;
  for (let i = 0; i < n; i++) {
    const y = base[i * 3 + 1];
    if (y < yMin) yMin = y;
    if (y > yMax) yMax = y;
  }
  return { yMin, yMax };
}

/** PlaneGeometry 0.35 x 0.25 (4 verts): top edge fixed, bottom edge z-sways. */
function attachFlag(mesh: Mesh): void {
  const s = prepare(mesh);
  if (s === null) return;
  const { attr, arr, base, n } = s;
  const { yMin } = bounds(base, n);
  mesh.onBeforeRender = (): void => {
    const t = performance.now() / 1000;
    const w = TAU * FLAG_HZ * t;
    for (let i = 0; i < n; i++) {
      const o = i * 3;
      if (base[o + 1] > yMin) continue; // top verts stay put
      arr[o + 2] = base[o + 2] + FLAG_SWAY * Math.sin(w + FLAG_X_PHASE * base[o]);
    }
    attr.needsUpdate = true;
  };
}

/** Every canopy vert sways by its normalised height h = (y - yMin) / (yMax - yMin). */
function attachCanopy(mesh: Mesh): void {
  const s = prepare(mesh);
  if (s === null) return;
  const { attr, arr, base, n } = s;
  const { yMin, yMax } = bounds(base, n);
  const span = Math.max(1e-6, yMax - yMin);
  mesh.onBeforeRender = (): void => {
    const t = performance.now() / 1000;
    const dx = CANOPY_X_SWAY * Math.sin(TAU * CANOPY_X_HZ * t);
    const dz = CANOPY_Z_SWAY * Math.sin(TAU * CANOPY_Z_HZ * t + 1);
    for (let i = 0; i < n; i++) {
      const o = i * 3;
      const h = (base[o + 1] - yMin) / span;
      arr[o] = base[o] + dx * h;
      arr[o + 2] = base[o + 2] + dz * h;
    }
    attr.needsUpdate = true;
  };
}

/** Wires ambient motion onto the kit's `decor_flag` / `decor_canopy` meshes. */
export function attachAmbient(decor: Group): void {
  decor.traverse((o) => {
    const m = o as Mesh;
    if (m.isMesh !== true) return;
    if (m.name === 'decor_flag') attachFlag(m);
    else if (m.name === 'decor_canopy') attachCanopy(m);
  });
}
