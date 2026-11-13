// Hold-to-zoom-out bird's eye camera. Pure: no three, no DOM. Rig convention (yaw 0 faces -Z,
// +yaw turns right). The overview pose is blended over the normal follow camera; it never
// touches the sim, so movement stays relative to the follow view.
import { HERO_ATTACHED, HERO_GROUNDED } from '../../core/hero';

const DEG = Math.PI / 180;

export interface OverviewCfg {
  overviewHeight: number; // camera height above the framed centre, m (before span gain)
  overviewPullBack: number; // extra metres the camera sits back from the centre
  overviewPitchDeg: number; // nominal pitch down; sets the base back-off from the height
  overviewEase: number; // per fixed tick ease of the blend, in and out
  overviewMaxExtent: number; // max horizontal reach from the hero that is framed, m
  overviewSpanScale: number; // extra height per metre of framed span
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

/**
 * Target pose from the hero and the points to frame (path ahead: next anchors, pads, finish).
 * Each point is pulled to within overviewMaxExtent of the hero horizontally, the centre is the middle
 * of the bounds of hero + points, and the camera sits behind that centre (relative to `yaw`) and above it.
 */
export function overviewPose(
  hero: Pt,
  ahead: readonly Pt[],
  yaw: number,
  cfg: OverviewCfg,
  out: OverviewPose,
): OverviewPose {
  let minX = hero.x;
  let maxX = hero.x;
  let minY = hero.y;
  let maxY = hero.y;
  let minZ = hero.z;
  let maxZ = hero.z;
  const reach = cfg.overviewMaxExtent;
  for (let i = 0; i < ahead.length; i++) {
    let dx = ahead[i].x - hero.x;
    let dz = ahead[i].z - hero.z;
    const d = Math.sqrt(dx * dx + dz * dz);
    if (d > reach && d > 0) {
      dx *= reach / d;
      dz *= reach / d;
    }
    const x = hero.x + dx;
    const z = hero.z + dz;
    const y = ahead[i].y;
    if (x < minX) minX = x;
    if (x > maxX) maxX = x;
    if (y < minY) minY = y;
    if (y > maxY) maxY = y;
    if (z < minZ) minZ = z;
    if (z > maxZ) maxZ = z;
  }
  const cx = (minX + maxX) / 2;
  const cy = (minY + maxY) / 2;
  const cz = (minZ + maxZ) / 2;
  const span = Math.max(maxX - minX, maxZ - minZ);
  const h = cfg.overviewHeight + span * cfg.overviewSpanScale;
  const tanP = Math.tan(Math.max(cfg.overviewPitchDeg, 1) * DEG);
  const back = h / tanP + cfg.overviewPullBack;
  out.px = cx - Math.sin(yaw) * back;
  out.py = cy + h;
  out.pz = cz + Math.cos(yaw) * back;
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
