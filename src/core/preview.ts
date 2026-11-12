// Aim preview (fun-pass 2.1). Predicts a shot by running the REAL `step` on scratch copies of
// the hero: no second physics or landing model lives here. Lean-scope: plain TS, but still no
// three/DOM imports, and module-level scratch so a call allocates nothing.
import type { Tuning } from './config';
import {
  HERO_ATTACHED,
  HERO_EV_CLING,
  HERO_GROUNDED,
  HERO_HANGING,
  HeroState,
  copyHeroState,
} from './hero';
import { HOOK_IDLE } from './hook';
import { BTN_DROP, BTN_HOOK, InputFrame, quantizeTurn } from './input';
import { aabbContainsPoint } from './math/aabb';
import { HEAD_FRAC, step } from './sim';
import type { World } from './world';

export const PREVIEW_NONE = 0; // the scripted fire did not hook that anchor
export const PREVIEW_SAFE = 1; // riding with no input ends survivably
export const PREVIEW_RELEASE = 2; // riding to the end kills or clings, a release survives
export const PREVIEW_LETHAL = 3; // riding kills and no sampled release survives

export class PreviewResult {
  outcome = PREVIEW_NONE;
  // Where the ride-to-end run touches down, hits the wall or hangs (metres, feet position).
  x = 0;
  y = 0;
  z = 0;
  /** Tick (after the fire tick) of the first surviving release sample, or -1. */
  releaseTick = -1;
  /** Fraction 0..1 along the attached ride of that sample, or -1. */
  releaseFrac = -1;
}

// Single-run verdicts (internal).
const R_NOHOOK = 0;
const R_DEAD = 1;
const R_OK = 2; // alive and settled (or inside the goal)
const R_HANG = 3; // ride ended in a hang with no wall impact: rope-end hang
const R_CLING = 4; // ride ended clinging to a wall

const REST_SPEED = 1e-3; // m/s; below this a grounded hero counts as at rest

const real = new HeroState();
const sc = new HeroState();
const fireFrame = new InputFrame();
const idleFrame = new InputFrame();
const jumpFrame = new InputFrame();
idleFrame.hasAim = 0;
jumpFrame.pressed = BTN_DROP;
jumpFrame.buttons = BTN_DROP;

// Filled by every run(); the base run's values become the result.
let endX = 0;
let endY = 0;
let endZ = 0;
let attachTick = -1;
let endTick = -1;
let runEndTick = -1; // first tick on the rope with the feet off the launch roof

function atGoal(s: HeroState, world: World): boolean {
  return world.goal.max.y > world.goal.min.y && aabbContainsPoint(world.goal, s.px, s.py, s.pz);
}

function recordEnd(s: HeroState, t: number): void {
  endX = s.px;
  endY = s.py;
  endZ = s.pz;
  endTick = t;
}

/**
 * One scripted run from src: tick 0 presses HOOK aimed dead-on at the anchor, then empty input,
 * except a DROP (the real release; JUMP is ignored on the rope) on tick releaseTick (0 = none) if the hero is on the rope.
 *
 * "Survivable" is what the sim does to a hero who then does nothing: the run ends dead (kill),
 * hanging, inside the goal, or grounded at rest. Grounded alone is NOT enough: a hero who lands
 * and skids/rolls off an edge must still be judged, so the run continues through the landing
 * skid until the hero stops (friction brings speed to exactly 0) or leaves the roof and dies.
 * At the time cap (aim.previewMaxSec) an airborne or still-moving hero counts as not surviving.
 */
function run(world: World, cfg: Tuning, releaseTick: number): number {
  copyHeroState(sc, real);
  attachTick = -1;
  endTick = -1;
  runEndTick = -1;
  step(sc, fireFrame, world, cfg);
  if (sc.hook.state === HOOK_IDLE || sc.hook.anchorId !== fireAnchor) return R_NOHOOK;
  const maxTicks = Math.ceil(cfg.aim.previewMaxSec * cfg.fixedHz);
  let cling = false;
  let t = 0;
  for (;;) {
    if ((sc.eventBits & HERO_EV_CLING) !== 0) cling = true;
    if (sc.mode === HERO_ATTACHED && attachTick < 0) attachTick = t;
    if (sc.mode === HERO_ATTACHED && sc.runOut === 0 && runEndTick < 0) runEndTick = t;
    if (attachTick >= 0 && endTick < 0 && sc.mode !== HERO_ATTACHED) recordEnd(sc, t);
    if (sc.dead === 1) {
      if (endTick < 0) recordEnd(sc, t);
      return R_DEAD;
    }
    if (atGoal(sc, world)) {
      if (endTick < 0) recordEnd(sc, t);
      return R_OK;
    }
    if (endTick >= 0) {
      if (sc.mode === HERO_HANGING) return cling ? R_CLING : R_HANG;
      if (
        sc.grounded === 1 &&
        sc.mode === HERO_GROUNDED &&
        sc.vx * sc.vx + sc.vz * sc.vz < REST_SPEED * REST_SPEED
      ) {
        return R_OK;
      }
    }
    if (t >= maxTicks) {
      if (endTick < 0) recordEnd(sc, t);
      return R_DEAD;
    }
    t++;
    step(sc, t === releaseTick && sc.mode === HERO_ATTACHED ? jumpFrame : idleFrame, world, cfg);
  }
}

let fireAnchor = -1;

/**
 * Predicts firing at anchorId from the hero's CURRENT state (run-up speed and the chain window
 * count). Never mutates `state`. Release search: the ride is rerun with DROP (the real release
 * input) pressed at aim.previewReleaseSamples
 * evenly spaced ticks between attach and the ride end.
 *
 * Assumptions: the player lets go of the stick when firing (idle input after the press), and
 * the camera aims exactly at the anchor. The hand-brake (hold REEL) is not searched.
 */
export function previewShot(
  state: HeroState,
  anchorId: number,
  world: World,
  cfg: Tuning,
  out: PreviewResult,
): void {
  out.outcome = PREVIEW_NONE;
  out.x = 0;
  out.y = 0;
  out.z = 0;
  out.releaseTick = -1;
  out.releaseFrac = -1;
  const a = world.anchors[anchorId];
  if (a === undefined || state.dead === 1) return;

  copyHeroState(real, state);
  fireAnchor = anchorId;
  const dx = a.px - real.px;
  const dy = a.py - (real.py + cfg.hero.height * HEAD_FRAC);
  const dz = a.pz - real.pz;
  fireFrame.hasAim = 1;
  fireFrame.aimYaw = quantizeTurn(Math.atan2(dx, dz));
  fireFrame.aimPitch = quantizeTurn(Math.atan2(dy, Math.sqrt(dx * dx + dz * dz)));
  fireFrame.pressed = BTN_HOOK;
  fireFrame.buttons = BTN_HOOK;

  const base = run(world, cfg, 0);
  if (base === R_NOHOOK) return;
  out.x = endX;
  out.y = endY;
  out.z = endZ;
  if (base === R_OK || base === R_HANG) {
    out.outcome = PREVIEW_SAFE;
    return;
  }
  if (base === R_CLING) {
    out.outcome = PREVIEW_RELEASE; // plan 4.1: a cling needs the player to act
    return;
  }
  // Base ride kills. Search for a release that survives.
  // A DROP during the run-out just falls back onto the launch roof: search only after it ends.
  const a0 = runEndTick > attachTick ? runEndTick : attachTick;
  const span = endTick - a0;
  const rideSpan = endTick - attachTick;
  const attach0 = attachTick;
  const n = cfg.aim.previewReleaseSamples;
  out.outcome = PREVIEW_LETHAL;
  if (a0 < 0 || span <= 0) return;
  let last = -1;
  for (let k = 1; k <= n; k++) {
    const tick = a0 + Math.round((k * span) / (n + 1));
    if (tick <= 0 || tick === last) continue;
    last = tick;
    const r = run(world, cfg, tick);
    if (r === R_OK || r === R_HANG || r === R_CLING) {
      out.outcome = PREVIEW_RELEASE;
      out.releaseTick = tick;
      out.releaseFrac = (tick - attach0) / rideSpan;
      return;
    }
  }
}
