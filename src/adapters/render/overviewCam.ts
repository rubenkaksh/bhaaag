// Hold-to-zoom-out bird's eye camera. Pure: no three, no DOM. Rig convention (yaw 0 faces -Z,
// +yaw turns right). The overview pose is blended over the normal follow camera; it never
// touches the sim, so movement stays relative to the follow view.
import { HERO_ATTACHED, HERO_GROUNDED } from '../../core/hero';

const DEG = Math.PI / 180;

export interface OverviewCfg {
  overviewHeight: number; // minimum camera height above the framed centre, m
  overviewPitchDeg: number; // pitch down of the held-MAP view (steep oblique), deg
  overviewEase: number; // per fixed tick ease of the blend, in and out
  overviewMaxExtent: number; // max horizontal reach from the hero that is framed, m
  overviewNodes: number; // how many nearest nodes ahead (pads, anchors, goal) are framed
  overviewMargin: number; // framing margin multiplier on the node bounds (1.3 = 30% breathing room)
}

export interface Pt {
  x: number;
  y: number;
  z: number;
}

export interface OverviewPose {
  px: number;
  py: number;
  pz: number;
  lx: number;
  ly: number;
  lz: number;
}

export function newOverviewPose(): OverviewPose {
  return { px: 0, py: 0, pz: 0, lx: 0, ly: 0, lz: 0 };
}

/** Distance along the view direction below which a node still counts as "ahead" (a little behind is fine). */
export const OVERVIEW_BEHIND_SLACK = 4;

/**
 * Pick the `n` candidates nearest (horizontally) to the hero that lie ahead along the view direction
 * (rig yaw, 0 faces -Z), writing them into `out` (reused). Returns how many were written.
 */
export function pickNodesAhead(
  hero: Pt,
  yaw: number,
  candidates: readonly Pt[],
  n: number,
  out: Pt[],
): number {
  const fx = Math.sin(yaw);
  const fz = -Math.cos(yaw);
  const dist: number[] = [];
  out.length = 0;
  for (let i = 0; i < candidates.length; i++) {
    const c = candidates[i];
    const dx = c.x - hero.x;
    const dz = c.z - hero.z;
    if (dx * fx + dz * fz < -OVERVIEW_BEHIND_SLACK) continue;
    const d = dx * dx + dz * dz;
    // Insertion into a short sorted list of at most n entries.
    let k = out.length;
    if (k === n && d >= dist[k - 1]) continue;
    if (k < n) k++;
    let j = k - 1;
    while (j > 0 && dist[j - 1] > d) {
      dist[j] = dist[j - 1];
      out[j] = out[j - 1];
      j--;
    }
    dist[j] = d;
    out[j] = c;
  }
  return out.length;
}

/**
 * Target pose: frame the hero plus the (already picked) nodes ahead. Each node is pulled to within
 * overviewMaxExtent of the hero horizontally. Bounds are measured in the view frame (forward / right),
 * padded by overviewMargin, and the camera backs off along a steep pitch until both axes fit the
 * vertical fov (degrees) and aspect. Pure: portrait and landscape differ only through `aspect`.
 */
export function overviewPose(
  hero: Pt,
  ahead: readonly Pt[],
  yaw: number,
  cfg: OverviewCfg,
  fovDeg: number,
  aspect: number,
  out: OverviewPose,
): OverviewPose {
  const fx = Math.sin(yaw);
  const fz = -Math.cos(yaw);
  const rx = Math.cos(yaw);
  const rz = Math.sin(yaw);
  let minF = 0;
  let maxF = 0;
  let minR = 0;
  let maxR = 0;
  let minY = hero.y;
  let maxY = hero.y;
  const reach = cfg.overviewMaxExtent;
  for (let i = 0; i < ahead.length; i++) {
    let dx = ahead[i].x - hero.x;
    let dz = ahead[i].z - hero.z;
    const d = Math.sqrt(dx * dx + dz * dz);
    if (d > reach && d > 0) {
      dx *= reach / d;
      dz *= reach / d;
    }
    const f = dx * fx + dz * fz;
    const r = dx * rx + dz * rz;
    if (f < minF) minF = f;
    if (f > maxF) maxF = f;
    if (r < minR) minR = r;
    if (r > maxR) maxR = r;
    const y = ahead[i].y;
    if (y < minY) minY = y;
    if (y > maxY) maxY = y;
  }
  const cf = (minF + maxF) / 2;
  const cr = (minR + maxR) / 2;
  const cx = hero.x + fx * cf + rx * cr;
  const cz = hero.z + fz * cf + rz * cr;
  const cy = (minY + maxY) / 2;
  const halfF = ((maxF - minF) / 2) * cfg.overviewMargin;
  const halfR = ((maxR - minR) / 2) * cfg.overviewMargin;
  const pitch = Math.min(Math.max(cfg.overviewPitchDeg, 20), 89) * DEG;
  const tanV = Math.tan((Math.max(fovDeg, 5) * DEG) / 2);
  const tanH = tanV * Math.max(aspect, 0.2);
  // Distance D from the camera to the centre. Sideways extent is seen at ~D; forward extent is
  // foreshortened by sin(pitch); the height spread of the nodes adds a little depth.
  const dSide = halfR / tanH;
  const dFwd = (halfF * Math.sin(pitch) + ((maxY - minY) / 2) * Math.cos(pitch)) / tanV;
  const dist = Math.max(dSide, dFwd, cfg.overviewHeight / Math.sin(pitch));
  const back = dist * Math.cos(pitch);
  out.px = cx - fx * back;
  out.py = cy + dist * Math.sin(pitch);
  out.pz = cz - fz * back;
  out.lx = cx;
  out.ly = cy;
  out.lz = cz;
  return out;
}

/** One fixed tick of the blend factor k (0 = follow camera, 1 = overview); snaps within a hair. */
export function stepOverview(k: number, held: boolean, cfg: OverviewCfg): number {
  const target = held ? 1 : 0;
  const next = k + (target - k) * cfg.overviewEase;
  return Math.abs(target - next) < 1e-3 ? target : next;
}

/** Smoothstep of k, so the rise and the return both start and end gently. */
export function overviewWeight(k: number): number {
  const c = k < 0 ? 0 : k > 1 ? 1 : k;
  return c * c * (3 - 2 * c);
}

/** In-place blend of a follow pose toward the overview pose by weight w (0..1). */
export function blendPose(follow: OverviewPose, target: OverviewPose, w: number): void {
  follow.px += (target.px - follow.px) * w;
  follow.py += (target.py - follow.py) * w;
  follow.pz += (target.pz - follow.pz) * w;
  follow.lx += (target.lx - follow.lx) * w;
  follow.ly += (target.ly - follow.ly) * w;
  follow.lz += (target.lz - follow.lz) * w;
}

/** The overview may be held only while grounded on a roof or riding the rope. */
export function overviewAvailable(heroMode: number): boolean {
  return heroMode === HERO_GROUNDED || heroMode === HERO_ATTACHED;
}
