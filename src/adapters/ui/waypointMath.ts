// Pure projection maths for the HUD waypoint marker (ADR 0005 D8). No DOM, no three.

export type WaypointScreen = {
  x: number;
  y: number;
  /** True when the marker is clamped to the screen edge (off-screen or behind). */
  edge: boolean;
  /** Arrow angle in radians (atan2(dy, dx), screen space); only meaningful when edge. */
  angle: number;
};

export function newWaypointScreen(): WaypointScreen {
  return { x: 0, y: 0, edge: false, angle: 0 };
}

/**
 * Projects a view-space point (camera looks down -z) to screen pixels.
 * tanHalfFov = tan(vertical fov / 2). `top` is the lowest-y the marker may take
 * (below the HUD timer), `m` the edge inset. `shiftY` is the screen-space pixels the camera lens
 * shift moves the image down (added to the projected y; 0 = no shift). Writes into `out`,
 * allocates nothing.
 */
export function projectWaypoint(
  out: WaypointScreen,
  vx: number,
  vy: number,
  vz: number,
  tanHalfFov: number,
  near: number,
  w: number,
  h: number,
  top: number,
  m: number,
  shiftY = 0,
): WaypointScreen {
  const behind = vz > -near;
  let sx: number;
  let sy: number;
  if (behind) {
    // Direction only: mirror through the screen centre so the arrow points the way to turn.
    sx = w / 2 - vx * w;
    sy = h / 2 + vy * w;
  } else {
    const d = -vz;
    const nx = vx / d / (tanHalfFov * (w / h));
    const ny = vy / d / tanHalfFov;
    sx = (nx * 0.5 + 0.5) * w;
    sy = (0.5 - ny * 0.5) * h + shiftY;
  }
  const inside = !behind && sx >= m && sx <= w - m && sy >= top && sy <= h - m;
  out.edge = !inside;
  if (inside) {
    out.x = sx;
    out.y = sy;
    out.angle = 0;
    return out;
  }
  const dx = sx - w / 2;
  let dy = sy - h / 2;
  if (dx === 0 && dy === 0) dy = 1;
  const adx = Math.abs(dx);
  const ady = Math.abs(dy);
  const kx = adx > 0 ? (w / 2 - m) / adx : Infinity;
  const ky = ady > 0 ? (h / 2 - m) / ady : Infinity;
  const k = Math.min(kx, ky);
  out.x = w / 2 + dx * k;
  out.y = Math.max(top, h / 2 + dy * k);
  out.angle = Math.atan2(dy, dx);
  return out;
}

/** Rounded whole metres, formatted for the label. */
export function formatDistance(metres: number): string {
  return Math.round(metres) + ' m';
}

/** The marker hides when the target is closer than this (metres). */
export const WAYPOINT_HIDE_M = 3;

/**
 * Roof height under (x, z): the largest max.y among solids whose x/z ranges
 * contain the point and whose top is at or below y. Falls back to y when
 * nothing is below. Plain for-loop, no allocation.
 */
export function padHeightBelow(
  solids: readonly {
    min: { x: number; y: number; z: number };
    max: { x: number; y: number; z: number };
  }[],
  x: number,
  y: number,
  z: number,
): number {
  let best = y;
  let found = false;
  for (let i = 0; i < solids.length; i++) {
    const s = solids[i];
    if (s.max.y > y) continue;
    if (x < s.min.x || x > s.max.x) continue;
    if (z < s.min.z || z > s.max.z) continue;
    if (!found || s.max.y > best) {
      best = s.max.y;
      found = true;
    }
  }
  return best;
}

/**
 * Lowest-y the waypoint marker may take: clear of the timer pill (top pad + timer height + 8).
 * Landscape reproduces the original vh-based formula. Portrait mirrors hud.css: vw-based pill
 * (clamped), plus room for the hop and objective rows under it.
 */
export function waypointTopPx(w: number, h: number, portrait: boolean): number {
  if (!portrait) return Math.max(10, h * 0.028) + Math.max(32, h * 0.054) + 8;
  const pad = Math.max(10, w * 0.03);
  const pill = Math.min(48, Math.max(34, w * 0.1));
  const row = Math.min(30, Math.max(24, w * 0.07));
  return pad + pill + 4 + row + 8;
}
