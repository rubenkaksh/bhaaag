// Hero state (M1-T06). Portable: plain fields, int enums, no allocation in step.
import { Hook, copyHook, newHook } from './hook';

export const HERO_GROUNDED = 0;
export const HERO_AIRBORNE = 1;
export const HERO_DEAD = 2;
export const HERO_ATTACHED = 3; // riding the rope
export const HERO_HANGING = 4; // clinging at a wall / rope end

// deadCause
export const DEAD_NONE = 0;
export const DEAD_FELL = 1; // kill plane
export const DEAD_WALL = 2; // wall impact above vCling
export const DEAD_HARD_LANDING = 3;
export const DEAD_HAZARD = 4;

// eventBits: set during a step, cleared at the start of the next one.
export const HERO_EV_HOOKED = 1; // hook fired and found an anchor
export const HERO_EV_RELEASED = 2;
export const HERO_EV_LANDED = 4;
export const HERO_EV_ROLLED = 8; // landed with a roll (also sets LANDED)
export const HERO_EV_CLING = 16;
export const HERO_EV_DIED = 32;
export const HERO_EV_PERFECT = 64; // JUMP released inside the timed window (speed boost)

// Conventions: yaw 0 faces +z; forward = (sin yaw, cos yaw) in (x, z);
// right = (cos yaw, -sin yaw). Positive moveY = forward, positive moveX = right.
export class HeroState {
  px = 0;
  py = 0; // feet
  pz = 0;
  vx = 0;
  vy = 0;
  vz = 0;
  yaw = 0; // body facing, radians
  camYaw = 0; // radians
  camPitch = 0; // radians
  grounded = 0; // 0 or 1
  dead = 0; // 0 or 1
  mode = HERO_AIRBORNE;
  hook: Hook = newHook();
  rollT = 0; // seconds of roll left
  landLockT = 0; // reserved: seconds of landing lock (time-cost landings)
  chainT = 0; // seconds left in the post-landing chain window
  deadCause = 0;
  eventBits = 0;
  hookCd = 0; // seconds until the hook may fire again
  hookIntentT = 0; // seconds a missed hook press stays armed (fires once an anchor is valid)
  runOut = 0; // 1 while the rope pulls the hero off the launch surface
  launchY = 0; // feet height of the launch surface during run-out
  perfect = 0; // 1 after a timed release: the next landing may carry perfectBoost above carryCap
}

export function newHeroState(): HeroState {
  return new HeroState();
}

export function copyHeroState(dst: HeroState, src: HeroState): void {
  dst.px = src.px;
  dst.py = src.py;
  dst.pz = src.pz;
  dst.vx = src.vx;
  dst.vy = src.vy;
  dst.vz = src.vz;
  dst.yaw = src.yaw;
  dst.camYaw = src.camYaw;
  dst.camPitch = src.camPitch;
  dst.grounded = src.grounded;
  dst.dead = src.dead;
  dst.mode = src.mode;
  copyHook(dst.hook, src.hook);
  dst.rollT = src.rollT;
  dst.landLockT = src.landLockT;
  dst.chainT = src.chainT;
  dst.deadCause = src.deadCause;
  dst.eventBits = src.eventBits;
  dst.hookCd = src.hookCd;
  dst.hookIntentT = src.hookIntentT;
  dst.runOut = src.runOut;
  dst.launchY = src.launchY;
  dst.perfect = src.perfect;
}
