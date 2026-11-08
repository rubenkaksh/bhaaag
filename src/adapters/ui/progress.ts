// Pure presentation helpers for the HUD progress readout. No DOM, no three.

/** Number of route hops hooked so far, clamped to [0, total]. */
export function hopIndex(nextRouteIndex: number, total: number): number {
  if (!(total > 0)) return 0;
  if (nextRouteIndex < 0) return 0;
  return nextRouteIndex > total ? total : nextRouteIndex;
}

/** Counter text, e.g. "HOP 2/7". */
export function formatHop(nextRouteIndex: number, total: number): string {
  return 'HOP ' + hopIndex(nextRouteIndex, total) + '/' + Math.max(0, total);
}

/**
 * Altitude strip fill: 0 at level start height (top), 1 at the goal height
 * (bottom). Clamped; 0 when the span is degenerate.
 */
export function altitudeFraction(y: number, startY: number, goalY: number): number {
  const span = startY - goalY;
  if (!(span > 0)) return 0;
  const f = (startY - y) / span;
  if (f < 0) return 0;
  return f > 1 ? 1 : f;
}
