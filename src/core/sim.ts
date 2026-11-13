// Grounded hero controller (M1-T06). Portable core: no three/DOM, no closures,
// no allocation inside step (module-level scratch only).
import type { Tuning } from './config';
import {
  BTN_ACTION,
  BTN_CLIMB,
  BTN_DROP,
  BTN_HOOK,
  BTN_JUMP,
  BTN_REEL,
  dequantizeAxis,
  dequantizeTurn,
  hasButton,
  wasPressed,
} from './input';
import type { InputFrame } from './input';
import {
  DEAD_FELL,
  DEAD_HARD_LANDING,
  DEAD_HAZARD,
  DEAD_WALL,
  HERO_ATTACHED,
  HERO_AIRBORNE,
  HERO_DEAD,
  HERO_EV_BOUNCE,
  HERO_EV_CLING,
  HERO_EV_CUSHION,
  HERO_EV_DIED,
  HERO_EV_GRAB,
  HERO_EV_HOOKED,
  HERO_EV_LANDED,
  HERO_EV_MANTLE,
  HERO_EV_RELEASED,
  HERO_EV_ROLLED,
  HERO_EV_SLIDE,
  HERO_EV_VAULT,
  HERO_GROUNDED,
  HERO_HANGING,
  HERO_VAULT,
  HeroState,
} from './hero';
import {
  AimResult,
  HOOK_ATTACHED,
  HOOK_AT_END,
  HOOK_FLYING,
  HOOK_IDLE,
  NO_ANCHOR,
  hookFire,
  hookRebase,
  hookRelease,
  hookStep,
  hookTrolleyPos,
  lineAt,
  pickAnchorAssisted,
  resetHook,
} from './hook';
import { SweepHit, circleOverlapsAabbXZ, clampScalar, sweptCapsuleVsAabb } from './math/aabb';
import type { AABB } from './math/aabb';
import { Vec3 } from './math/vec3';
import { VaultPlan, inCone, planVault, slideSpeed, vaultPosition } from './parkour';
import type { World } from './world';

export { copyHeroState } from './hero';

const SKIN = 1e-4; // gap kept from walls after a sweep, metres
const DEG2RAD = Math.PI / 180;
const MIN_FACE_SPEED = 0.1; // below this horizontal speed yaw is left alone
const NO_GROUND = -1e30;

const scratchBase = new Vec3(0, 0, 0);
const scratchDelta = new Vec3(0, 0, 0);
const scratchHit = new SweepHit();
const scratchAim = new AimResult();
const scratchVel = new Vec3(0, 0, 0);
const scratchFeet = new Vec3(0, 0, 0);
const scratchPlan = new VaultPlan();

// Stick this tick as a world-space unit direction and a magnitude (0 while a cushion landing
// locks the controls). Written once per step, read by the parkour rules (ADR 0013).
let stickDx = 0;
let stickDz = 0;
let stickMag = 0;

export const HEAD_FRAC = 0.9; // aim ray starts at this fraction of the hero height
const LAND_TOL = 2 * SKIN; // feet this close above a surface count as touching it
const AT_END_PROBE = 0.1; // extra reach past the rope stop when checking for a wall
const RUNOUT_TOL = 0.05; // launch-surface match tolerance, metres
const SLAB_TOL = 0.05; // a tramp/cushion slab counts when its top is this close to the feet
const STICK_MIN = 0.5; // stick magnitude the automatic parkour moves need
const AIR_LIFT = 0.002; // feet clearance above a ledge after an airborne step-up, metres
const GRAB_PROBE = 0.08; // airborne wall probe length toward the stick, metres (ledge grab)

// Index of the solid that blocked the last sweepAxis / sweepVec call (-1 when none). Written
// and read inside one step only, like groundRamp.
let hitSolid = -1;

// Support surface found by the last groundHeight call: -1 = a solid top (or none), else a ramp
// id. Written and read inside one step, never carried between steps, so state copies stay exact.
let groundRamp = -1;
// Slope frame of a ramp (rampFrame): uphill unit (x, z), tan/cos/sin of its pitch.
let slopeUx = 0;
let slopeUz = 0;
let slopeTan = 0;
let slopeCos = 1;
let slopeSin = 0;

// Sweeps the capsule (feet at py) along one axis (0=x, 1=y, 2=z) by amount a
// against all solids. Returns the distance actually travelled (signed) and
// sets scratchHit.hit (with the blocking normal) when blocked. baseY/height
// allow the caller to ignore the lowest part of the body (step-up).
// A t=0 hit is ignored when the delta does not decrease the separation
// (normal . delta >= 0): this un-wedges separating / parallel motion inside an
// expanded-volume penetration (finding 1/7/8). A penetrating hit with a zero
// normal is treated as unblocked motion as well.
function sweepAxis(
  w: World,
  px: number,
  baseY: number,
  pz: number,
  height: number,
  radius: number,
  axis: number,
  a: number,
): number {
  scratchBase.x = px;
  scratchBase.y = baseY;
  scratchBase.z = pz;
  scratchDelta.x = axis === 0 ? a : 0;
  scratchDelta.y = axis === 1 ? a : 0;
  scratchDelta.z = axis === 2 ? a : 0;
  let best = 1;
  let blocked = false;
  let bnx = 0;
  let bny = 0;
  let bnz = 0;
  hitSolid = -1;
  for (let i = 0; i < w.solids.length; i++) {
    sweptCapsuleVsAabb(scratchBase, height, radius, scratchDelta, w.solids[i], scratchHit);
    if (!scratchHit.hit) continue;
    if (scratchHit.t === 0) {
      const zeroNormal = scratchHit.nx === 0 && scratchHit.ny === 0 && scratchHit.nz === 0;
      const separating =
        scratchHit.nx * scratchDelta.x +
          scratchHit.ny * scratchDelta.y +
          scratchHit.nz * scratchDelta.z >=
        0;
      if (zeroNormal || separating) continue;
    }
    if (scratchHit.t < best) {
      best = scratchHit.t;
      blocked = true;
      bnx = scratchHit.nx;
      bny = scratchHit.ny;
      bnz = scratchHit.nz;
      hitSolid = i;
    }
  }
  scratchHit.hit = blocked;
  scratchHit.nx = bnx;
  scratchHit.ny = bny;
  scratchHit.nz = bnz;
  if (!blocked) return a;
  const dist = best * Math.abs(a) - SKIN;
  if (dist <= 0) return 0;
  return a < 0 ? -dist : dist;
}

// General-direction version of sweepAxis: sweeps the capsule by (dx, dy, dz) and returns
// the fraction of the delta travelled (1 when free). scratchHit carries hit + normal.
function sweepVec(
  w: World,
  px: number,
  baseY: number,
  pz: number,
  height: number,
  radius: number,
  dx: number,
  dy: number,
  dz: number,
): number {
  scratchBase.x = px;
  scratchBase.y = baseY;
  scratchBase.z = pz;
  scratchDelta.x = dx;
  scratchDelta.y = dy;
  scratchDelta.z = dz;
  let best = 1;
  let blocked = false;
  let bnx = 0;
  let bny = 0;
  let bnz = 0;
  hitSolid = -1;
  for (let i = 0; i < w.solids.length; i++) {
    sweptCapsuleVsAabb(scratchBase, height, radius, scratchDelta, w.solids[i], scratchHit);
    if (!scratchHit.hit) continue;
    if (scratchHit.t === 0) {
      const zeroNormal = scratchHit.nx === 0 && scratchHit.ny === 0 && scratchHit.nz === 0;
      const separating = scratchHit.nx * dx + scratchHit.ny * dy + scratchHit.nz * dz >= 0;
      if (zeroNormal || separating) continue;
    }
    if (scratchHit.t < best) {
      best = scratchHit.t;
      blocked = true;
      bnx = scratchHit.nx;
      bny = scratchHit.ny;
      bnz = scratchHit.nz;
      hitSolid = i;
    }
  }
  scratchHit.hit = blocked;
  scratchHit.nx = bnx;
  scratchHit.ny = bny;
  scratchHit.nz = bnz;
  if (!blocked) return 1;
  const len = Math.sqrt(dx * dx + dy * dy + dz * dz);
  const dist = best * len - SKIN;
  if (dist <= 0) return 0;
  return dist / len;
}

// Surface height of ramp r at (x, z), or NO_GROUND when outside its footprint.
function rampHeightAt(w: World, idx: number, x: number, z: number): number {
  const r = w.ramps[idx];
  const b = r.aabb;
  if (x < b.min.x || x > b.max.x || z < b.min.z || z > b.max.z) return NO_GROUND;
  let frac: number;
  if (r.slopeAxis === 0) frac = (x - b.min.x) / (b.max.x - b.min.x);
  else if (r.slopeAxis === 1) frac = (b.max.x - x) / (b.max.x - b.min.x);
  else if (r.slopeAxis === 2) frac = (z - b.min.z) / (b.max.z - b.min.z);
  else frac = (b.max.z - z) / (b.max.z - b.min.z);
  return b.min.y + r.rise * frac;
}

// Fills the slope frame (slopeUx/Uz/Tan/Cos/Sin) for ramp idx.
function rampFrame(w: World, idx: number): void {
  const r = w.ramps[idx];
  const b = r.aabb;
  slopeUx = 0;
  slopeUz = 0;
  let run: number;
  if (r.slopeAxis === 0) {
    slopeUx = 1;
    run = b.max.x - b.min.x;
  } else if (r.slopeAxis === 1) {
    slopeUx = -1;
    run = b.max.x - b.min.x;
  } else if (r.slopeAxis === 2) {
    slopeUz = 1;
    run = b.max.z - b.min.z;
  } else {
    slopeUz = -1;
    run = b.max.z - b.min.z;
  }
  slopeTan = run > 0 ? r.rise / run : 0;
  slopeCos = 1 / Math.sqrt(1 + slopeTan * slopeTan);
  slopeSin = slopeTan * slopeCos;
}

// Ramp id of the slippery slope the hero stands on (pitch above roof.slipDeg), or -1. Leaves
// that ramp's frame in the slope scratch. Call only while grounded (feet on the support).
function slipSupport(w: World, s: HeroState, cfg: Tuning): number {
  groundHeight(w, s.px, s.pz, cfg.hero.radius, s.py + LAND_TOL);
  const idx = groundRamp;
  if (idx < 0 || w.ramps[idx].slip !== 1) return -1;
  rampFrame(w, idx);
  if (slopeTan <= Math.tan(cfg.roof.slipDeg * DEG2RAD)) return -1;
  return idx;
}

// Highest walkable surface under the capsule footprint (circle x, z, radius) whose
// height is <= maxH, or NO_GROUND. Sets groundRamp to the supporting ramp (-1 for a solid);
// a slippery ramp wins a tie with a solid, so an eave over its wall box stays slippery. Support comes from the footprint overlapping the
// solid/ramp xz rect, not just the centre point (finding 1): the hero stays
// supported until fully clear of an edge and never drops its feet into the side
// volume of the box it stepped off.
function groundHeight(w: World, x: number, z: number, radius: number, maxH: number): number {
  let best = NO_GROUND;
  groundRamp = -1;
  for (let i = 0; i < w.solids.length; i++) {
    const b = w.solids[i];
    if (!circleOverlapsAabbXZ(b, x, z, radius)) continue;
    const top = b.max.y;
    if (top <= maxH && top > best) best = top;
  }
  for (let i = 0; i < w.ramps.length; i++) {
    const b = w.ramps[i].aabb;
    if (!circleOverlapsAabbXZ(b, x, z, radius)) continue;
    const h = rampHeightAt(
      w,
      i,
      clampScalar(x, b.min.x, b.max.x),
      clampScalar(z, b.min.z, b.max.z),
    );
    if (h <= NO_GROUND || h > maxH) continue;
    if (h > best || (h === best && w.ramps[i].slip === 1)) {
      best = h;
      groundRamp = i;
    }
  }
  return best;
}

// Highest ramp surface over the capsule footprint (clamped to each ramp's xz rect, so
// every side, the high end and the underside count), or NO_GROUND when no ramp is
// within reach. Used as a wall test: ramps are not in w.solids, so this is the only
// thing that keeps the hero out of a wedge (finding 5).
function rampBarrierHeightAt(w: World, x: number, z: number, radius: number): number {
  let best = NO_GROUND;
  for (let i = 0; i < w.ramps.length; i++) {
    const b = w.ramps[i].aabb;
    if (!circleOverlapsAabbXZ(b, x, z, radius)) continue;
    const h = rampHeightAt(
      w,
      i,
      clampScalar(x, b.min.x, b.max.x),
      clampScalar(z, b.min.z, b.max.z),
    );
    if (h > NO_GROUND && h > best) best = h;
  }
  return best;
}

function killHero(s: HeroState, cause: number): void {
  s.dead = 1;
  s.mode = HERO_DEAD;
  s.deadCause = cause;
  s.eventBits |= HERO_EV_DIED;
  s.vx = 0;
  s.vy = 0;
  s.vz = 0;
  s.grounded = 0;
  s.perfect = 0;
  s.hasLedge = 0;
  s.slideT = 0;
  resetHook(s.hook);
}

// Index of the slab in list whose top is within SLAB_TOL of y and whose xz rect overlaps the
// capsule footprint, or -1. Tramps and cushions are thin slabs laid on roof tops (ADR 0011).
function slabAt(list: AABB[], x: number, z: number, radius: number, y: number): number {
  for (let i = 0; i < list.length; i++) {
    const b = list[i];
    if (!circleOverlapsAabbXZ(b, x, z, radius)) continue;
    const d = b.max.y - y;
    if (d > -SLAB_TOL && d < SLAB_TOL) return i;
  }
  return -1;
}

// Index of the hazard volume containing the feet point, or -1.
function hazardAt(w: World, x: number, y: number, z: number): number {
  for (let i = 0; i < w.hazards.length; i++) {
    const b = w.hazards[i];
    if (x < b.min.x || x > b.max.x || z < b.min.z || z > b.max.z) continue;
    if (y < b.min.y || y > b.max.y) continue;
    return i;
  }
  return -1;
}

// Trampoline contact: the feet are on a tramp slab. Never lethal; the hero leaves the roof
// again at tramp.vUp (plus jumpBonus when JUMP is held), horizontal speed kept under carryCap.
function bounceHero(s: HeroState, cfg: Tuning, jumpHeld: boolean): void {
  const hs = Math.sqrt(s.vx * s.vx + s.vz * s.vz);
  const cap = cfg.landing.carryCap;
  if (hs > cap) {
    const k = cap / hs;
    s.vx *= k;
    s.vz *= k;
  }
  s.vy = cfg.tramp.vUp + (jumpHeld ? cfg.tramp.jumpBonus : 0);
  s.bounceAir = 1;
  s.grounded = 0;
  s.mode = HERO_AIRBORNE;
  s.runOut = 0;
  s.perfect = 0;
  s.chainT = 0;
  s.eventBits |= HERO_EV_BOUNCE;
  if (s.hook.state === HOOK_ATTACHED || s.hook.state === HOOK_AT_END) resetHook(s.hook);
}

// Cushion contact: the landing is absorbed at any speed; the hero stands still for
// cushion.lockSec (move input ignored in moveFree).
function cushionHero(s: HeroState, cfg: Tuning): void {
  s.vx = 0;
  s.vy = 0;
  s.vz = 0;
  s.grounded = 1;
  s.mode = HERO_GROUNDED;
  s.runOut = 0;
  s.perfect = 0;
  s.chainT = 0;
  s.landLockT = cfg.cushion.lockSec;
  s.eventBits |= HERO_EV_CUSHION | HERO_EV_LANDED;
  if (s.hook.state === HOOK_ATTACHED || s.hook.state === HOOK_AT_END) resetHook(s.hook);
}

// Feet are on the surface groundHeight just found (groundRamp says which); s.v* is the velocity
// at touchdown. The impact speed is the speed into the surface along its normal (ADR 0002; on a
// flat top that is -vy, as before). Classifies the landing, keeps the tangential part and turns
// its horizontal speed into run speed (capped at carryCap, kept through a roll).
// Tramp and cushion slabs (ADR 0011) are checked first and are never lethal.
function landHero(s: HeroState, w: World, cfg: Tuning, jumpHeld: boolean): void {
  if (w.tramps.length > 0 && slabAt(w.tramps, s.px, s.pz, cfg.hero.radius, s.py) >= 0) {
    bounceHero(s, cfg, jumpHeld);
    return;
  }
  if (w.cushions.length > 0 && slabAt(w.cushions, s.px, s.pz, cfg.hero.radius, s.py) >= 0) {
    cushionHero(s, cfg);
    return;
  }
  let nx = 0;
  let ny = 1;
  let nz = 0;
  if (groundRamp >= 0) {
    rampFrame(w, groundRamp);
    nx = -slopeUx * slopeSin;
    ny = slopeCos;
    nz = -slopeUz * slopeSin;
  }
  const vn = s.vx * nx + s.vy * ny + s.vz * nz;
  const vImpact = -vn;
  if (vImpact > cfg.landing.vyRoll) {
    killHero(s, DEAD_HARD_LANDING);
    return;
  }
  if (vImpact > cfg.landing.vyClean) {
    s.rollT = cfg.landing.rollSec;
    s.eventBits |= HERO_EV_ROLLED;
  }
  if (vn < 0) {
    s.vx -= vn * nx;
    s.vz -= vn * nz;
  }
  const hs = Math.sqrt(s.vx * s.vx + s.vz * s.vz);
  const cap = cfg.landing.carryCap + (s.perfect === 1 ? cfg.release.perfectBoost : 0);
  s.perfect = 0;
  if (hs > cap) {
    const k = cap / hs;
    s.vx *= k;
    s.vz *= k;
  }
  s.vy = 0;
  s.grounded = 1;
  s.mode = HERO_GROUNDED;
  s.runOut = 0;
  s.chainT = cfg.landing.chainWindowMs / 1000;
  s.eventBits |= HERO_EV_LANDED;
  // Landing slide (ADR 0013): a clean flat landing at speed with the stick held forward.
  const hsEnd = hs > cap ? cap : hs;
  if (
    w.parkour === 1 &&
    groundRamp < 0 &&
    vImpact <= cfg.landing.vyClean &&
    hsEnd >= cfg.slide.minSpeed &&
    stickMag >= STICK_MIN &&
    inCone(stickDx, stickDz, s.vx / hsEnd, s.vz / hsEnd, cfg.vault.coneDeg)
  ) {
    s.slideT = cfg.slide.sec;
    s.eventBits |= HERO_EV_SLIDE;
  }
  if (s.hook.state === HOOK_ATTACHED || s.hook.state === HOOK_AT_END) resetHook(s.hook);
}

// Lets go of the rope (or the wall). withJump adds the forward + up kick.
function releaseHero(s: HeroState, cfg: Tuning, withJump: boolean): void {
  if (s.hook.state === HOOK_ATTACHED || s.hook.state === HOOK_AT_END) {
    hookRelease(s.hook, scratchVel);
  } else {
    scratchVel.x = 0;
    scratchVel.y = 0;
    scratchVel.z = 0;
  }
  s.vx = scratchVel.x;
  s.vy = scratchVel.y;
  s.vz = scratchVel.z;
  if (withJump) {
    s.vx += Math.sin(s.yaw) * cfg.release.jumpFwd;
    s.vz += Math.cos(s.yaw) * cfg.release.jumpFwd;
    s.vy += cfg.release.jumpUp;
  }
  s.grounded = 0;
  s.runOut = 0;
  s.mode = HERO_AIRBORNE;
  s.hasLedge = 0;
  s.climbT = 0;
  s.hookCd = cfg.release.hookCooldownSec;
  s.eventBits |= HERO_EV_RELEASED;
}

function tryFire(s: HeroState, input: InputFrame, world: World, cfg: Tuning): void {
  // A press arms the hook for hookIntentSec: a click that lands a hair early (rope would
  // clip the launch roof, anchor not yet in the cone) fires the moment an anchor is valid.
  if (wasPressed(input, BTN_HOOK)) s.hookIntentT = cfg.release.hookIntentSec;
  if (s.hookIntentT <= 0) return;
  if (s.hookCd > 0 || s.hook.state !== HOOK_IDLE) return;
  const handY = s.py + cfg.rope.handToFeet;
  if (world.lineOnly === 1) {
    // Fixed line (ADR 0011): no aim; the zone under the feet names the anchor.
    if (s.grounded !== 1) return;
    const li = lineAt(world, cfg, s.px, s.py, s.pz);
    if (li < 0) return;
    scratchAim.anchorId = world.lines[li].anchorId;
  } else {
    let yaw = s.camYaw;
    let pitch = s.camPitch;
    if (input.hasAim === 1) {
      yaw = dequantizeTurn(input.aimYaw);
      pitch = dequantizeTurn(input.aimPitch);
    }
    const cp = Math.cos(pitch);
    const head = s.py + cfg.hero.height * HEAD_FRAC;
    const magnet = hasButton(input, BTN_ACTION) ? cfg.aim.magnetDegTouch : cfg.aim.magnetDegDesktop;
    pickAnchorAssisted(
      world,
      cfg,
      s.px,
      handY,
      s.pz,
      s.px,
      head,
      s.pz,
      Math.sin(yaw) * cp,
      Math.sin(pitch),
      Math.cos(yaw) * cp,
      cfg.rope.maxLen,
      magnet,
      scratchAim,
    );
    if (scratchAim.anchorId === NO_ANCHOR) return;
  }
  s.hookIntentT = 0;
  let speedAlong = 0;
  // Momentum seeds the rope whenever the hero is on the ground (a run-up pays) or still inside
  // the chain window (carried speed above run speed survives there).
  if (s.grounded === 1 || s.chainT > 0) {
    const a = world.anchors[scratchAim.anchorId];
    const cx = a.px - s.px;
    const cy = a.py - handY;
    const cz = a.pz - s.pz;
    const len = Math.sqrt(cx * cx + cy * cy + cz * cz);
    if (len > 0) speedAlong = (s.vx * cx + s.vy * cy + s.vz * cz) / len;
  }
  if (hookFire(s.hook, scratchAim.anchorId, s.px, handY, s.pz, world, cfg, speedAlong)) {
    s.eventBits |= HERO_EV_HOOKED;
    s.perfect = 0; // a new rope forfeits the timed-release carry
  }
}

function rideStep(s: HeroState, input: InputFrame, world: World, cfg: Tuning, dt: number): void {
  const h = s.hook;
  // JUMP is ignored on the rope (T303): DROP is the only manual release.
  if (wasPressed(input, BTN_DROP)) {
    releaseHero(s, cfg, false);
    return;
  }
  const st = hookStep(h, dt, world, cfg, hasButton(input, BTN_REEL));
  hookTrolleyPos(h, scratchFeet);
  const r = cfg.hero.radius;
  s.vx = h.dirX * h.v;
  s.vy = h.dirY * h.v;
  s.vz = h.dirZ * h.v;
  if (h.v > 0.1) s.yaw = Math.atan2(h.dirX, h.dirZ);

  // Run-out: while the rope pulls the hero off the launch surface, the feet stay on it.
  let ty = scratchFeet.y;
  const wasRun = s.runOut === 1;
  if (wasRun) {
    const gh = groundHeight(world, scratchFeet.x, scratchFeet.z, r, s.launchY + cfg.hero.stepUp);
    if (gh > NO_GROUND && gh >= s.launchY - RUNOUT_TOL) {
      if (ty < gh) ty = gh;
    } else {
      s.runOut = 0;
    }
  }
  const off = wasRun ? cfg.hero.stepUp : 0;
  const oldY = s.py;
  const dx = scratchFeet.x - s.px;
  const dy = ty - s.py;
  const dz = scratchFeet.z - s.pz;
  let f = sweepVec(world, s.px, s.py + off, s.pz, cfg.hero.height - off, r, dx, dy, dz);
  let blocked = scratchHit.hit;
  // Edge graze: the rope pulls the feet down while the capsule still overlaps the launch
  // roof's rim by a few cm. Slide on horizontally (no landing, rope kept) until clear, so a
  // hook fired well before the edge still carries the hero off it.
  let graze = false;
  if (blocked && dy < 0 && scratchHit.ny > 0.5 && Math.abs(s.py - s.launchY) < RUNOUT_TOL) {
    f = sweepVec(world, s.px, s.py + off, s.pz, cfg.hero.height - off, r, dx, 0, dz);
    blocked = scratchHit.hit;
    s.px += dx * f;
    s.pz += dz * f;
    graze = true;
  } else {
    s.px += dx * f;
    s.py += dy * f;
    s.pz += dz * f;
  }

  if (s.runOut === 0 && !graze) {
    const gh = groundHeight(world, s.px, s.pz, r, oldY + cfg.hero.stepUp);
    if (gh > NO_GROUND && gh >= s.py - LAND_TOL) {
      s.py = gh;
      landHero(s, world, cfg, hasButton(input, BTN_JUMP));
      return;
    }
  }
  if (blocked) {
    wallHit(s, world, cfg);
    return;
  }
  if (st === HOOK_AT_END) {
    // Rope end: the anchor may sit on a wall just past the stop point. Probe that last
    // stretch; a wall there is an impact at the arrival speed, otherwise the hero hangs.
    const reach = cfg.rope.trolleyStop + AT_END_PROBE;
    const pf = sweepVec(
      world,
      s.px,
      s.py,
      s.pz,
      cfg.hero.height,
      r,
      h.dirX * reach,
      h.dirY * reach,
      h.dirZ * reach,
    );
    if (scratchHit.hit) {
      s.px += h.dirX * reach * pf;
      s.py += h.dirY * reach * pf;
      s.pz += h.dirZ * reach * pf;
      wallHit(s, world, cfg);
      return;
    }
    // Far anchor reached with open air beyond: exit the line on its own, carrying the
    // trolley velocity exactly like a manual DROP release at the end.
    releaseHero(s, cfg, false);
    // Fixed-line worlds: drop gently onto the roof below (the old hang), no flying on.
    if (world.lineOnly === 1) {
      s.vx = 0;
      s.vz = 0;
    }
  }
}

// Records the top of solid idx (whose side face scratchHit names) as the held ledge when it is
// within climb reach above the feet and nothing sits on it within a hero height. The wall
// normal must be horizontal (a side face). Returns true when a ledge was recorded.
function recordLedge(s: HeroState, w: World, cfg: Tuning, idx: number): boolean {
  s.hasLedge = 0;
  if (idx < 0 || scratchHit.ny !== 0) return false;
  const b = w.solids[idx];
  const dTop = b.max.y - s.py;
  if (dTop < cfg.climb.reachMin || dTop > cfg.climb.reachMax) return false;
  const r = cfg.hero.radius;
  const nx = scratchHit.nx;
  const nz = scratchHit.nz;
  // The wall face the hero leans on, measured along the normal axis.
  const face = nx !== 0 ? (nx > 0 ? b.max.x : b.min.x) : nz > 0 ? b.max.z : b.min.z;
  // Stand point: the whole footprint on the roof, mantleFwd past the edge.
  const push = r + cfg.climb.mantleFwd;
  const inX = nx !== 0 ? face - nx * push : s.px;
  const inZ = nz !== 0 ? face - nz * push : s.pz;
  // Head room: the highest surface under the stand point up to a hero height above the
  // ledge must be the ledge itself.
  const above = groundHeight(w, inX, inZ, r, b.max.y + cfg.hero.height);
  if (above > b.max.y + SLAB_TOL) return false;
  s.hasLedge = 1;
  s.hangLedgeY = b.max.y;
  s.hangNx = nx;
  s.hangNz = nz;
  s.hangWall = face;
  s.climbT = 0;
  return true;
}

// scratchHit holds the blocking face (hitSolid its solid). Above vCling the hero dies,
// otherwise it clings; a ledge within reach is kept for a mantle.
function wallHit(s: HeroState, w: World, cfg: Tuning): void {
  const h = s.hook;
  const vImpact =
    h.v * Math.max(0, -(h.dirX * scratchHit.nx + h.dirY * scratchHit.ny + h.dirZ * scratchHit.nz));
  if (vImpact > cfg.wall.vCling) {
    killHero(s, DEAD_WALL);
    return;
  }
  s.mode = HERO_HANGING;
  s.vx = 0;
  s.vy = 0;
  s.vz = 0;
  s.eventBits |= HERO_EV_CLING;
  if (w.climb === 1) recordLedge(s, w, cfg, hitSolid);
  resetHook(h);
}

// Airborne horizontal sweep blocked by solid idx: grab its top when in reach (ADR 0011).
function tryGrab(s: HeroState, w: World, cfg: Tuning, idx: number): boolean {
  if (s.vy > cfg.climb.vyMax || s.vy < -cfg.climb.vyMax) return false;
  if (!recordLedge(s, w, cfg, idx)) return false;
  s.mode = HERO_HANGING;
  s.vx = 0;
  s.vy = 0;
  s.vz = 0;
  s.runOut = 0;
  s.eventBits |= HERO_EV_GRAB;
  return true;
}

function hangStep(s: HeroState, input: InputFrame, world: World, cfg: Tuning, dt: number): void {
  s.vx = 0;
  s.vy = 0;
  s.vz = 0;
  if (wasPressed(input, BTN_JUMP)) {
    releaseHero(s, cfg, true);
    return;
  }
  if (wasPressed(input, BTN_DROP)) {
    releaseHero(s, cfg, false);
    return;
  }
  if (s.hasLedge !== 1) return;
  // Parkour (ADR 0013): the stick held toward the wall also mantles, after a shorter hold.
  const byStick =
    world.parkour === 1 &&
    stickMag >= STICK_MIN &&
    -(stickDx * s.hangNx + stickDz * s.hangNz) >= cfg.parkour.stickDot;
  if (!hasButton(input, BTN_CLIMB) && !byStick) {
    s.climbT = 0;
    return;
  }
  s.climbT += dt;
  if (s.climbT < (byStick ? cfg.parkour.autoMantleSec : cfg.climb.holdSec)) return;
  // Mantle: stand on the ledge with the whole footprint on the roof, mantleFwd past the
  // edge, measured from the wall face (the hero hangs a radius short of it).
  const push = cfg.hero.radius + cfg.climb.mantleFwd;
  if (s.hangNx !== 0) s.px = s.hangWall - s.hangNx * push;
  if (s.hangNz !== 0) s.pz = s.hangWall - s.hangNz * push;
  s.py = s.hangLedgeY;
  s.yaw = Math.atan2(-s.hangNx, -s.hangNz);
  s.grounded = 1;
  s.mode = HERO_GROUNDED;
  s.hasLedge = 0;
  s.climbT = 0;
  s.chainT = 0;
  s.eventBits |= HERO_EV_MANTLE;
}

// Auto-vault in progress (ADR 0013): the hero follows the stored path, no collision (the end
// point was checked when the vault began). The kill plane and hazards still run in step().
function vaultStep(s: HeroState, cfg: Tuning, dt: number): void {
  s.vaultT += dt;
  s.vx = s.vaultVx;
  s.vz = s.vaultVz;
  s.vy = 0;
  if (s.vaultT < cfg.vault.sec) {
    vaultPosition(s, cfg, s.vaultT);
    return;
  }
  vaultPosition(s, cfg, cfg.vault.sec);
  s.vaultT = 0;
  if (s.vaultOnto === 1) {
    s.grounded = 1;
    s.mode = HERO_GROUNDED;
    s.chainT = cfg.landing.chainWindowMs / 1000;
  } else {
    s.grounded = 0;
    s.mode = HERO_AIRBORNE;
  }
}

// Predicts the fall after a vault that clears the obstacle (no steering, air physics at 60 Hz,
// at most 2 s). True when the hero would land alive: on a tramp/cushion slab, or on a surface at
// an impact the landing rule survives, before touching a hazard volume or the kill plane.
function vaultLandsSafe(
  w: World,
  cfg: Tuning,
  x1: number,
  y1: number,
  z1: number,
  vx: number,
  vz: number,
): boolean {
  const dt = 1 / cfg.fixedHz;
  const r = cfg.hero.radius;
  let x = x1;
  let y = y1;
  let z = z1;
  let vy = 0;
  for (let i = 0; i < 2 * cfg.fixedHz; i++) {
    const oldY = y;
    y += vy * dt - 0.5 * cfg.physics.g * dt * dt;
    vy -= cfg.physics.g * dt;
    x += vx * dt;
    z += vz * dt;
    if (w.hazards.length > 0 && hazardAt(w, x, y, z) >= 0) return false;
    if (y < w.killPlaneY) return false;
    const gh = groundHeight(w, x, z, r, oldY + cfg.hero.stepUp);
    if (gh > NO_GROUND && gh >= y - LAND_TOL) {
      if (slabAt(w.tramps, x, z, r, gh) >= 0 || slabAt(w.cushions, x, z, r, gh) >= 0) return true;
      let impact = -vy;
      if (groundRamp >= 0) {
        rampFrame(w, groundRamp);
        impact = -(vx * -slopeUx * slopeSin + vy * slopeCos + vz * -slopeUz * slopeSin);
      }
      return impact <= cfg.landing.vyRoll;
    }
  }
  return false;
}

// Tries to start an auto-vault over solid idx whose side face (unit axis normal nax/naz,
// from the wall toward the hero) blocked a grounded run at entry velocity (pvx, pvz). Returns
// true when the vault began (hero is now HERO_VAULT).
function tryVault(
  s: HeroState,
  w: World,
  cfg: Tuning,
  idx: number,
  nax: number,
  naz: number,
  pvx: number,
  pvz: number,
): boolean {
  if (idx < 0) return false;
  const b = w.solids[idx];
  const dTop = b.max.y - s.py;
  if (dTop <= cfg.hero.stepUp || dTop > cfg.vault.maxH) return false;
  if (!inCone(stickDx, stickDz, -nax, -naz, cfg.vault.coneDeg)) return false;
  planVault(scratchPlan, b, nax, naz, s.px, s.pz, cfg);
  const r = cfg.hero.radius;
  const x1 = scratchPlan.x1;
  const y1 = scratchPlan.y1;
  const z1 = scratchPlan.z1;
  // End capsule free: no surface in the body volume above the end feet, no wall beside it.
  const gh = groundHeight(w, x1, z1, r, y1 + cfg.hero.height);
  if (gh > y1 + SLAB_TOL) return false;
  sweepVec(w, x1, y1 + 0.02, z1, cfg.hero.height - 0.02, r, -nax * 1e-3, 0, -naz * 1e-3);
  if (scratchHit.hit) return false;
  // A vault that clears the obstacle ends in a fall: refuse it (the obstacle blocks like a wall)
  // unless the landing is survivable. Computed last: it reuses the groundRamp scratch.
  if (
    scratchPlan.onto === 0 &&
    !vaultLandsSafe(w, cfg, x1, y1, z1, pvx * cfg.vault.keep, pvz * cfg.vault.keep)
  )
    return false;
  s.vaultX0 = s.px;
  s.vaultY0 = s.py;
  s.vaultZ0 = s.pz;
  s.vaultX1 = x1;
  s.vaultY1 = y1;
  s.vaultZ1 = z1;
  s.vaultOnto = scratchPlan.onto;
  s.vaultVx = pvx * cfg.vault.keep;
  s.vaultVz = pvz * cfg.vault.keep;
  s.vaultT = 0;
  s.vx = s.vaultVx;
  s.vz = s.vaultVz;
  s.vy = 0;
  s.yaw = Math.atan2(-nax, -naz);
  s.mode = HERO_VAULT;
  s.grounded = 0;
  s.runOut = 0;
  s.eventBits |= HERO_EV_VAULT;
  return true;
}

// True when a solid sits in the standing body volume above the slide capsule at the feet
// (a standing hero would clip it): the slide must not end here.
function headBlocked(w: World, s: HeroState, cfg: Tuning): boolean {
  const r = cfg.hero.radius;
  const top = s.py + cfg.hero.height;
  for (let i = 0; i < w.solids.length; i++) {
    const b = w.solids[i];
    if (b.min.y >= top || b.max.y <= s.py + cfg.hero.stepUp) continue;
    if (circleOverlapsAabbXZ(b, s.px, s.pz, r)) return true;
  }
  return false;
}

export function step(s: HeroState, input: InputFrame, world: World, cfg: Tuning): void {
  s.eventBits = 0;
  if (s.dead === 1) return;
  const dt = 1 / cfg.fixedHz;
  if (s.chainT > 0) s.chainT = s.chainT > dt ? s.chainT - dt : 0;
  if (s.rollT > 0) s.rollT = s.rollT > dt ? s.rollT - dt : 0;
  if (s.hookCd > 0) s.hookCd = s.hookCd > dt ? s.hookCd - dt : 0;
  if (s.hookIntentT > 0) s.hookIntentT = s.hookIntentT > dt ? s.hookIntentT - dt : 0;
  if (s.landLockT > 0) s.landLockT = s.landLockT > dt ? s.landLockT - dt : 0;

  // Camera.
  s.camYaw += dequantizeTurn(input.lookYaw);
  s.camPitch += dequantizeTurn(input.lookPitch);
  const pMin = cfg.camera.pitchMin * DEG2RAD;
  const pMax = cfg.camera.pitchMax * DEG2RAD;
  if (s.camPitch < pMin) s.camPitch = pMin;
  if (s.camPitch > pMax) s.camPitch = pMax;

  // Stick this tick, for the parkour rules.
  {
    let mx = dequantizeAxis(input.moveX);
    let my = dequantizeAxis(input.moveY);
    const m = Math.sqrt(mx * mx + my * my);
    stickMag = s.landLockT > 0 ? 0 : m > 1 ? 1 : m;
    stickDx = 0;
    stickDz = 0;
    if (m > 0) {
      mx /= m;
      my /= m;
      const sy = Math.sin(s.camYaw);
      const cy = Math.cos(s.camYaw);
      stickDx = my * sy + mx * cy;
      stickDz = my * cy - mx * sy;
    }
  }

  if (s.mode !== HERO_ATTACHED && s.mode !== HERO_VAULT) {
    tryFire(s, input, world, cfg);
    if (s.hook.state === HOOK_FLYING) {
      const hs = hookStep(s.hook, dt, world, cfg, false);
      if (hs === HOOK_ATTACHED) {
        // The hero moved while the hook flew: re-base the chord on the current hand.
        hookRebase(s.hook, s.px, s.py + cfg.rope.handToFeet, s.pz);
        s.runOut = s.grounded === 1 ? 1 : 0;
        s.launchY = s.py;
        s.grounded = 0;
        s.mode = HERO_ATTACHED;
        s.bounceAir = 0;
      }
    }
  }

  if (s.mode === HERO_ATTACHED) rideStep(s, input, world, cfg, dt);
  else if (s.mode === HERO_HANGING) hangStep(s, input, world, cfg, dt);
  else if (s.mode === HERO_VAULT) vaultStep(s, cfg, dt);
  else moveFree(s, input, world, cfg, dt);
  if (s.slideT > 0 && s.grounded !== 1) s.slideT = 0;

  if (s.dead === 0 && s.py < world.killPlaneY) killHero(s, DEAD_FELL);
  if (s.dead === 0 && world.hazards.length > 0 && hazardAt(world, s.px, s.py, s.pz) >= 0)
    killHero(s, DEAD_HAZARD);
}

// Grounded on a slippery slope (frame in the slope scratch): weak steering toward the wanted
// velocity with the uphill part cut to roof.uphillRun, gravity along the slope (horizontal
// projection) and kinetic tile friction against the motion. No full-friction stop.
function slideVelocity(
  s: HeroState,
  cfg: Tuning,
  wantX: number,
  wantZ: number,
  mag: number,
  dt: number,
): void {
  if (mag > 0) {
    let wx = wantX;
    let wz = wantZ;
    const up = wx * slopeUx + wz * slopeUz;
    if (up > 0) {
      const cut = up * (1 - cfg.roof.uphillRun);
      wx -= slopeUx * cut;
      wz -= slopeUz * cut;
    }
    const dx = wx - s.vx;
    const dz = wz - s.vz;
    const dl = Math.sqrt(dx * dx + dz * dz);
    const maxD = cfg.hero.accel * cfg.roof.control * dt;
    if (dl <= maxD) {
      s.vx = wx;
      s.vz = wz;
    } else {
      s.vx += (dx / dl) * maxD;
      s.vz += (dz / dl) * maxD;
    }
  }
  const g = cfg.physics.g;
  const aDown = g * slopeSin * slopeCos;
  s.vx -= slopeUx * aDown * dt;
  s.vz -= slopeUz * aDown * dt;
  const sp = Math.sqrt(s.vx * s.vx + s.vz * s.vz);
  const drop = cfg.roof.mu * g * slopeCos * dt;
  if (sp <= drop) {
    s.vx = 0;
    s.vz = 0;
  } else {
    const k = (sp - drop) / sp;
    s.vx *= k;
    s.vz *= k;
  }
}

function moveFree(s: HeroState, input: InputFrame, world: World, cfg: Tuning, dt: number): void {
  // Desired horizontal velocity, camera-relative. A cushion landing locks the controls for
  // landLockT (ADR 0011).
  const locked = s.landLockT > 0;
  let mx = locked ? 0 : dequantizeAxis(input.moveX);
  let my = locked ? 0 : dequantizeAxis(input.moveY);
  const mag = Math.sqrt(mx * mx + my * my);
  if (mag > 1) {
    mx /= mag;
    my /= mag;
  }
  const sy = Math.sin(s.camYaw);
  const cy = Math.cos(s.camYaw);
  const wantX = (my * sy + mx * cy) * cfg.hero.run;
  const wantZ = (my * cy - mx * sy) * cfg.hero.run;

  const pk = world.parkour === 1;
  if (s.grounded === 1) {
    // A slide cannot jump into a low ceiling (parkour).
    if (!locked && wasPressed(input, BTN_JUMP) && !(s.slideT > 0 && headBlocked(world, s, cfg))) {
      s.vy = cfg.hero.jump;
      s.grounded = 0;
      s.slideT = 0;
    } else {
      s.vy = 0;
    }
  }

  // Slippery pitched roof under the feet (ADR 0002): -1 when none.
  const slip = s.grounded === 1 ? slipSupport(world, s, cfg) : -1;

  // Horizontal velocity.
  if (slip >= 0) {
    s.slideT = 0;
    slideVelocity(s, cfg, wantX, wantZ, mag, dt);
  } else if (s.grounded === 1 && s.slideT > 0) {
    // Landing slide (ADR 0013): no steering, constant decel. The slide runs on past slide.sec
    // while a low ceiling is overhead.
    const sp = Math.sqrt(s.vx * s.vx + s.vz * s.vz);
    if (sp > 0) {
      const k = slideSpeed(sp, cfg.slide.decel, cfg.slide.minKeep, dt) / sp;
      s.vx *= k;
      s.vz *= k;
    }
    s.slideT -= dt;
    if (s.slideT <= 0) s.slideT = headBlocked(world, s, cfg) ? dt : 0;
  } else if (s.grounded === 1) {
    if (mag > 0) {
      const dx = wantX - s.vx;
      const dz = wantZ - s.vz;
      const dl = Math.sqrt(dx * dx + dz * dz);
      // Holding the way you are already going keeps a landing's carry through the chain window.
      const wantSq = wantX * wantX + wantZ * wantZ;
      const carrying =
        s.chainT > 0 && s.vx * s.vx + s.vz * s.vz > wantSq && s.vx * wantX + s.vz * wantZ > 0;
      const maxD = (carrying ? cfg.landing.skidDecel : cfg.hero.accel) * dt;
      if (dl <= maxD) {
        s.vx = wantX;
        s.vz = wantZ;
      } else {
        s.vx += (dx / dl) * maxD;
        s.vz += (dz / dl) * maxD;
      }
    } else {
      // A landing skids through the chain window, then full friction stops the hero.
      const sp = Math.sqrt(s.vx * s.vx + s.vz * s.vz);
      const drop = (s.chainT > 0 ? cfg.landing.skidDecel : cfg.hero.friction) * dt;
      if (sp <= drop) {
        s.vx = 0;
        s.vz = 0;
      } else {
        const k = (sp - drop) / sp;
        s.vx *= k;
        s.vz *= k;
      }
    }
  } else {
    const k = 1 - cfg.physics.airDrag * dt;
    s.vx *= k;
    s.vz *= k;
    // Air steer: the stick turns horizontal velocity toward the wanted direction. After a
    // trampoline bounce it pulls toward tramp.airSteerCap at tramp.airSteer m/s^2; on any other
    // airborne state (jump, rope release) toward hero.airSteerCap at hero.airSteer m/s^2, never
    // slowing a hero already faster than the cap (T302).
    if (mag > 0 && !locked) {
      const bounce = s.bounceAir === 1;
      let tx: number;
      let tz: number;
      if (bounce) {
        tx = (wantX / cfg.hero.run) * cfg.tramp.airSteerCap;
        tz = (wantZ / cfg.hero.run) * cfg.tramp.airSteerCap;
      } else {
        const sp = Math.sqrt(s.vx * s.vx + s.vz * s.vz);
        const tm = Math.max(cfg.hero.airSteerCap * mag, sp);
        tx = (wantX / (cfg.hero.run * mag)) * tm;
        tz = (wantZ / (cfg.hero.run * mag)) * tm;
      }
      const dx = tx - s.vx;
      const dz = tz - s.vz;
      const dl = Math.sqrt(dx * dx + dz * dz);
      const maxD = (bounce ? cfg.tramp.airSteer : cfg.hero.airSteer) * dt;
      if (dl <= maxD) {
        s.vx = tx;
        s.vz = tz;
      } else {
        s.vx += (dx / dl) * maxD;
        s.vz += (dz / dl) * maxD;
      }
    }
  }

  // Horizontal move, per axis. Grounded bodies ignore geometry below stepUp.
  let baseY = s.py;
  let h = cfg.hero.height;
  if (s.grounded === 1) {
    baseY = s.py + cfg.hero.stepUp;
    h = (s.slideT > 0 ? cfg.slide.height : cfg.hero.height) - cfg.hero.stepUp;
  }
  const r = cfg.hero.radius;
  const oldPx = s.px;
  // Vault entry velocity and eligibility (ADR 0013): grounded run, stick pushing into the wall.
  const pvx = s.vx;
  const pvz = s.vz;
  const canVault =
    pk &&
    s.grounded === 1 &&
    s.slideT <= 0 &&
    stickMag >= STICK_MIN &&
    pvx * pvx + pvz * pvz >= cfg.vault.minSpeed * cfg.vault.minSpeed;
  let mvx = sweepAxis(world, s.px, baseY, s.pz, h, r, 0, s.vx * dt);
  let hitX = scratchHit.hit;
  let nxX = scratchHit.nx;
  let nyX = scratchHit.ny;
  let solidX = hitSolid;
  // Airborne step-up (parkour): clipping a low ledge while falling lifts the feet onto it.
  if (pk && hitX && s.grounded === 0 && s.vy <= 0 && nyX === 0 && solidX >= 0) {
    const d = world.solids[solidX].max.y - s.py;
    if (d > 0 && d <= cfg.parkour.airStepUp) {
      s.py = world.solids[solidX].max.y + AIR_LIFT;
      mvx = sweepAxis(world, s.px, s.py, s.pz, cfg.hero.height, r, 0, s.vx * dt);
      hitX = scratchHit.hit;
      nxX = scratchHit.nx;
      nyX = scratchHit.ny;
      solidX = hitSolid;
    }
  }
  if (hitX) s.vx = 0;
  s.px += mvx;
  // Ramps carry no sweep geometry: reject the axis move when the ramp surface at the
  // new footprint is more than stepUp above the feet (wall rule, finding 5).
  if (rampBarrierHeightAt(world, s.px, s.pz, r) > s.py + cfg.hero.stepUp) {
    s.px = oldPx;
    s.vx = 0;
  } else if (
    canVault &&
    hitX &&
    nyX === 0 &&
    tryVault(s, world, cfg, solidX, nxX > 0 ? 1 : -1, 0, pvx, pvz)
  ) {
    return;
  }
  const oldPz = s.pz;
  let mvz = sweepAxis(world, s.px, s.grounded === 1 ? baseY : s.py, s.pz, h, r, 2, s.vz * dt);
  let hitZ = scratchHit.hit;
  let nzZ = scratchHit.nz;
  let nyZ = scratchHit.ny;
  let solidZ = hitSolid;
  if (pk && hitZ && s.grounded === 0 && s.vy <= 0 && nyZ === 0 && solidZ >= 0) {
    const d = world.solids[solidZ].max.y - s.py;
    if (d > 0 && d <= cfg.parkour.airStepUp) {
      s.py = world.solids[solidZ].max.y + AIR_LIFT;
      mvz = sweepAxis(world, s.px, s.py, s.pz, cfg.hero.height, r, 2, s.vz * dt);
      hitZ = scratchHit.hit;
      nzZ = scratchHit.nz;
      nyZ = scratchHit.ny;
      solidZ = hitSolid;
    }
  }
  if (hitZ) s.vz = 0;
  s.pz += mvz;
  if (rampBarrierHeightAt(world, s.px, s.pz, r) > s.py + cfg.hero.stepUp) {
    s.pz = oldPz;
    s.vz = 0;
  } else if (
    canVault &&
    hitZ &&
    nyZ === 0 &&
    tryVault(s, world, cfg, solidZ, 0, nzZ > 0 ? 1 : -1, pvx, pvz)
  ) {
    return;
  }

  // Ledge grab (ADR 0011, climb levels only): in the air, holding the stick toward a wall
  // (or facing it with no input) probes a few cm that way; a wall there whose top is in
  // reach is grabbed. The probe, not the blocked sweep, is the test, because a blocked
  // airborne hero has its velocity zeroed and would never touch the wall again.
  if (world.climb === 1 && s.grounded === 0) {
    let gx = wantX;
    let gz = wantZ;
    if (mag === 0) {
      gx = Math.sin(s.yaw);
      gz = Math.cos(s.yaw);
    }
    const gl = Math.sqrt(gx * gx + gz * gz);
    if (gl > 1e-6) {
      const k = (pk ? cfg.parkour.grabProbe : GRAB_PROBE) / gl;
      sweepVec(world, s.px, s.py, s.pz, cfg.hero.height, r, gx * k, 0, gz * k);
      if (scratchHit.hit && tryGrab(s, world, cfg, hitSolid)) return;
    }
  }

  const sp2 = s.vx * s.vx + s.vz * s.vz;
  if (sp2 > MIN_FACE_SPEED * MIN_FACE_SPEED) s.yaw = Math.atan2(s.vx, s.vz);

  // Vertical.
  if (s.grounded === 1) {
    const gh = groundHeight(world, s.px, s.pz, r, s.py + cfg.hero.stepUp);
    if (gh > NO_GROUND && gh >= s.py - cfg.hero.stepUp) {
      s.py = gh;
      s.vy = 0;
    } else {
      s.grounded = 0;
      // Off the eave: keep the slope's vertical rate (slipSupport left its frame in scratch).
      if (slip >= 0) s.vy = (s.vx * slopeUx + s.vz * slopeUz) * slopeTan;
    }
  }
  if (s.grounded === 0) {
    const oldY = s.py;
    const dy = s.vy * dt - 0.5 * cfg.physics.g * dt * dt;
    let mvy: number;
    if (dy > 0) {
      mvy = sweepAxis(world, s.px, s.py, s.pz, cfg.hero.height, r, 1, dy);
      if (scratchHit.hit) s.vy = 0;
      else s.vy -= cfg.physics.g * dt;
    } else {
      s.vy -= cfg.physics.g * dt;
      // Sweep downward too (finding 1): stop the feet at the box top instead of
      // letting them pass into the expanded side volume.
      mvy = sweepAxis(world, s.px, s.py, s.pz, cfg.hero.height, r, 1, dy);
    }
    s.py = oldY + mvy;
    if (dy <= 0) {
      const gh = groundHeight(world, s.px, s.pz, r, oldY + cfg.hero.stepUp);
      // A blocked down-sweep leaves the feet SKIN above the top: land there.
      if (gh > NO_GROUND && gh >= s.py - LAND_TOL) {
        s.py = gh;
        landHero(s, world, cfg, hasButton(input, BTN_JUMP));
      }
    }
  }

  if (s.grounded === 1) s.bounceAir = 0;
  if (s.dead === 0) s.mode = s.grounded === 1 ? HERO_GROUNDED : HERO_AIRBORNE;
}
