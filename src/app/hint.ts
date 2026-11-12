// HINT (T299): which anchor to highlight. Pure read of the world and hero position; never
// touches sim state. An anchor counts as takeable when the real aim picker, aimed dead-on at it
// from the hero's head, returns that same anchor (range, slope, line of sight all pass).
import type { Tuning } from '../core/config';
import { AimResult, NO_ANCHOR, pickAnchorAssisted } from '../core/hook';
import { HEAD_FRAC } from '../core/sim';
import type { World } from '../core/world';

const scratch = new AimResult();

/** True when firing straight at anchor `id` from feet (px, py, pz) would hook it. */
export function anchorTakeable(
  world: World,
  cfg: Tuning,
  px: number,
  py: number,
  pz: number,
  id: number,
  magnetDeg: number,
): boolean {
  const a = world.anchors[id];
  if (a === undefined) return false;
  const head = py + cfg.hero.height * HEAD_FRAC;
  const dx = a.px - px;
  const dy = a.py - head;
  const dz = a.pz - pz;
  const len = Math.sqrt(dx * dx + dy * dy + dz * dz);
  if (len < 1e-6) return false;
  pickAnchorAssisted(
    world,
    cfg,
    px,
    py + cfg.rope.handToFeet,
    pz,
    px,
    head,
    pz,
    dx / len,
    dy / len,
    dz / len,
    cfg.rope.maxLen,
    magnetDeg,
    scratch,
  );
  return scratch.anchorId === id;
}

/**
 * Best zipline anchor to take: the next route anchor when it is takeable, else the nearest
 * takeable anchor, else NO_ANCHOR. Line-only worlds (strategy) have no free anchors: NO_ANCHOR.
 */
export function pickHintAnchor(
  world: World,
  cfg: Tuning,
  px: number,
  py: number,
  pz: number,
  nextRouteIndex: number,
  magnetDeg: number,
): number {
  if (world.lineOnly === 1) return NO_ANCHOR;
  const r = world.route[nextRouteIndex];
  if (r !== undefined && anchorTakeable(world, cfg, px, py, pz, r, magnetDeg)) return r;
  let best = NO_ANCHOR;
  let bestD = Infinity;
  for (let i = 0; i < world.anchors.length; i++) {
    const a = world.anchors[i];
    const d = (a.px - px) * (a.px - px) + (a.py - py) * (a.py - py) + (a.pz - pz) * (a.pz - pz);
    if (d >= bestD) continue;
    if (!anchorTakeable(world, cfg, px, py, pz, i, magnetDeg)) continue;
    best = i;
    bestD = d;
  }
  return best;
}
