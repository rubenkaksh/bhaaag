// Cushion landing reaction (render only, no sim change). When the hero lands on a cushion the pad
// puff compresses fast, then rebounds with a small overshoot and settles. The envelope is a pure
// function of time; PadBounce applies it to the per-slab cushion meshes built by padView.
import type { Object3D } from 'three';

export const PAD_SQUASH_SEC = 0.55; // whole reaction, s
const PRESS_SEC = 0.09; // time to reach full compression
const MIN_SY = 0.35; // deepest vertical scale of the pad (1 = rest)
const SPREAD = 0.22; // sideways bulge per unit of vertical squash

/** Vertical scale of a cushion `t` seconds after a landing of depth `amp` (0..1). 1 = at rest. */
export function padScaleY(t: number, amp: number): number {
  if (t <= 0 || t >= PAD_SQUASH_SEC) return 1;
  const depth = (1 - MIN_SY) * amp;
  if (t < PRESS_SEC) {
    const u = t / PRESS_SEC;
    return 1 - depth * (1 - (1 - u) * (1 - u)); // ease-out press
  }
  const u = (t - PRESS_SEC) / (PAD_SQUASH_SEC - PRESS_SEC);
  // damped cosine from -depth back to 0 with a small overshoot above rest
  const k = Math.exp(-3.2 * u) * Math.cos(u * Math.PI * 2.5);
  return 1 - depth * k;
}

/** Horizontal scale that goes with a vertical scale (volume-ish: squash widens). */
export function padScaleXZ(sy: number): number {
  return 1 + (1 - sy) * SPREAD;
}

/** Index of the cushion slab the feet are on (top within `tol` of py, xz inside), or -1. */
export function cushionUnder(
  cushions: readonly {
    min: { x: number; y: number; z: number };
    max: { x: number; y: number; z: number };
  }[],
  x: number,
  z: number,
  py: number,
  tol: number,
): number {
  for (let i = 0; i < cushions.length; i++) {
    const c = cushions[i];
    if (x < c.min.x || x > c.max.x || z < c.min.z || z > c.max.z) continue;
    if (Math.abs(py - c.max.y) <= tol) return i;
  }
  return -1;
}

interface PadEntry {
  obj: Object3D;
  cx: number;
  cz: number;
  base: number;
  t: number; // seconds since trigger; < 0 = idle
  amp: number;
}

/** Drives the squash of the per-slab cushion meshes (userData.padSlab = index into world.cushions). */
export class PadBounce {
  private readonly pads: (PadEntry | undefined)[] = [];
  private active = 0;

  constructor(root: Object3D | null) {
    if (root === null) return;
    root.traverse((o) => {
      const s = o.userData.padSlab as
        | { index: number; cx: number; cz: number; base: number }
        | undefined;
      if (s === undefined) return;
      this.pads[s.index] = { obj: o, cx: s.cx, cz: s.cz, base: s.base, t: -1, amp: 0 };
    });
  }

  trigger(index: number, amp: number): void {
    const p = this.pads[index];
    if (p === undefined) return;
    if (p.t < 0) this.active++;
    p.t = 0;
    p.amp = amp;
    this.apply(p);
  }

  update(dt: number): void {
    if (this.active === 0) return;
    for (let i = 0; i < this.pads.length; i++) {
      const p = this.pads[i];
      if (p === undefined || p.t < 0) continue;
      p.t += dt;
      if (p.t >= PAD_SQUASH_SEC) {
        p.t = -1;
        this.active--;
        p.obj.scale.set(1, 1, 1);
        p.obj.position.set(0, 0, 0);
        continue;
      }
      this.apply(p);
    }
  }

  private apply(p: PadEntry): void {
    const sy = padScaleY(p.t, p.amp);
    const sxz = padScaleXZ(sy);
    p.obj.scale.set(sxz, sy, sxz);
    // geometry is in world coordinates: scale about the pad's centre-bottom
    p.obj.position.set(p.cx * (1 - sxz), p.base * (1 - sy), p.cz * (1 - sxz));
  }
}
