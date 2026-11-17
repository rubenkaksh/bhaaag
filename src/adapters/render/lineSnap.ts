// Fixed-line ride, visual only (playtest 2026-11-17). On lineOnly levels the drawn cable runs from
// the pad centre at hand height to the anchor and sags, while the sim chord starts at the hand
// wherever the hero stood on the 3 x 3 m pad and is straight. Without this the hero and trolley
// slide up to ~1.5 m off the cable and look like they float. LineSnap gives the offset that puts
// the drawn hand on the drawn cable, eased in at attach and out at release. The sim never moves.
// No three imports, node-testable.

/** Cosmetic cable sag as a fraction of span length (shared with ropePost.buildSpan). */
export const SPAN_SAG = 0.012;
/** Ease time (s) onto the cable at attach and off it at release. */
export const SNAP_SEC = 0.18;

/**
 * Point on the drawn cable S -> A (with sag) nearest the hand: projection of the hand onto the
 * straight S -> A, then the sag at that fraction. Writes out[0..2], returns the fraction t.
 */
export function cablePoint(
  sx: number,
  sy: number,
  sz: number,
  ax: number,
  ay: number,
  az: number,
  hx: number,
  hy: number,
  hz: number,
  out: number[],
): number {
  const dx = ax - sx;
  const dy = ay - sy;
  const dz = az - sz;
  const l2 = dx * dx + dy * dy + dz * dz;
  let t = l2 > 1e-9 ? ((hx - sx) * dx + (hy - sy) * dy + (hz - sz) * dz) / l2 : 1;
  t = t < 0 ? 0 : t > 1 ? 1 : t;
  const drop = Math.sqrt(l2) * SPAN_SAG;
  out[0] = sx + dx * t;
  out[1] = sy + dy * t - 4 * drop * t * (1 - t);
  out[2] = sz + dz * t;
  return t;
}

export class LineSnap {
  /** Offset to add to the drawn hero (and hand) this frame. */
  ox = 0;
  oy = 0;
  oz = 0;
  private w = 0;
  private tx = 0;
  private ty = 0;
  private tz = 0;

  /**
   * on: riding a fixed line; (tx, ty, tz) = cable point minus drawn hand (ignored when off).
   * Off, the last offset fades out, so a release never pops the hero.
   */
  step(on: boolean, tx: number, ty: number, tz: number, dt: number): void {
    if (on) {
      this.tx = tx;
      this.ty = ty;
      this.tz = tz;
    }
    const d = dt / SNAP_SEC;
    this.w = on ? Math.min(1, this.w + d) : Math.max(0, this.w - d);
    const k = this.w * this.w * (3 - 2 * this.w);
    this.ox = this.tx * k;
    this.oy = this.ty * k;
    this.oz = this.tz * k;
  }

  /** Drop any offset at once (respawn). */
  reset(): void {
    this.w = 0;
    this.ox = 0;
    this.oy = 0;
    this.oz = 0;
  }
}
