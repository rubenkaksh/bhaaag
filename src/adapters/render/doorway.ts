// Zipline doorway (playtest 2026-11-17): the rope end is a lintel on two side posts, so the hero
// stands and lands in an open frame instead of on a centre pole. Render only: no collider (the sim
// never had one). No three imports, node-testable.

/** Axis-aligned box: x0 y0 z0 x1 y1 z1. */
export type DoorBox = [number, number, number, number, number, number];

/** Inner half width: hero radius 0.35 m plus 0.4 m clearance each side. */
export const DOOR_HALF_W = 0.75;
export const DOOR_POST_W = 0.12;
/** Lintel height (the rope end sits inside it). */
export const DOOR_LINTEL_H = 0.16;

/**
 * Two posts either side of (cx, cz) and a lintel across their tops. The posts stand across the
 * rope's horizontal direction (dx, dz), snapped to the nearer world axis so the lintel stays an
 * axis-aligned box. ropeY is the rope end height: the lintel is centred on it, posts run from y0
 * to the lintel top.
 */
export function doorwayBoxes(
  cx: number,
  cz: number,
  y0: number,
  ropeY: number,
  dx: number,
  dz: number,
  halfW = DOOR_HALF_W,
  postW = DOOR_POST_W,
): DoorBox[] {
  // Rope mostly along z: the frame spans x; otherwise it spans z.
  const spanX = Math.abs(dz) >= Math.abs(dx);
  const h = postW / 2;
  const top = ropeY + DOOR_LINTEL_H / 2;
  const bot = ropeY - DOOR_LINTEL_H / 2;
  const o = halfW + h; // post centre offset
  const out: DoorBox[] = [];
  for (const s of [-1, 1]) {
    const px = spanX ? cx + s * o : cx;
    const pz = spanX ? cz : cz + s * o;
    out.push([px - h, y0, pz - h, px + h, top, pz + h]);
  }
  const L = o + h;
  out.push(
    spanX ? [cx - L, bot, cz - h, cx + L, top, cz + h] : [cx - h, bot, cz - L, cx + h, top, cz + L],
  );
  return out;
}
