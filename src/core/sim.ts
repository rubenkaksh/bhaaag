// Grounded hero controller (M1-T06). Portable core: no three/DOM, no closures,
// no allocation inside step (module-level scratch only).
import type { Tuning } from './config';
import {
  BTN_ACTION,
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
  DEAD_WALL,
  HERO_ATTACHED,
  HERO_AIRBORNE,
  HERO_DEAD,
  HERO_EV_CLING,
  HERO_EV_DIED,
  HERO_EV_HOOKED,
  HERO_EV_LANDED,
  HERO_EV_RELEASED,
  HERO_EV_ROLLED,
  HERO_GROUNDED,
  HERO_HANGING,
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
  pickAnchorAssisted,
  resetHook,
} from './hook';
import { SweepHit, circleOverlapsAabbXZ, clampScalar, sweptCapsuleVsAabb } from './math/aabb';
import { Vec3 } from './math/vec3';
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

const HEAD_FRAC = 0.9; // aim ray starts at this fraction of the hero height
const LAND_TOL = 2 * SKIN; // feet this close above a surface count as touching it
const AT_END_PROBE = 0.1; // extra reach past the rope stop when checking for a wall
const RUNOUT_TOL = 0.05; // launch-surface match tolerance, metres

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

// Highest walkable surface under the capsule footprint (circle x, z, radius) whose
// height is <= maxH, or NO_GROUND. Support comes from the footprint overlapping the
// solid/ramp xz rect, not just the centre point (finding 1): the hero stays
// supported until fully clear of an edge and never drops its feet into the side
// volume of the box it stepped off.
function groundHeight(w: World, x: number, z: number, radius: number, maxH: number): number {
  let best = NO_GROUND;
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
    if (h > NO_GROUND && h <= maxH && h > best) best = h;
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
  resetHook(s.hook);
}

// Feet are on a surface; s.vy is the speed at touchdown. Classifies the landing and turns
// horizontal speed into run speed (capped at carryCap, kept through a roll).
function landHero(s: HeroState, cfg: Tuning): void {
  const vyDown = -s.vy;
  if (vyDown > cfg.landing.vyRoll) {
    killHero(s, DEAD_HARD_LANDING);
    return;
  }
  if (vyDown > cfg.landing.vyClean) {
    s.rollT = cfg.landing.rollSec;
    s.eventBits |= HERO_EV_ROLLED;
  }
  const hs = Math.sqrt(s.vx * s.vx + s.vz * s.vz);
  if (hs > cfg.landing.carryCap) {
    const k = cfg.landing.carryCap / hs;
    s.vx *= k;
    s.vz *= k;
  }
  s.vy = 0;
  s.grounded = 1;
  s.mode = HERO_GROUNDED;
  s.runOut = 0;
  s.chainT = cfg.landing.chainWindowMs / 1000;
  s.eventBits |= HERO_EV_LANDED;
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
  s.hookCd = cfg.release.hookCooldownSec;
  s.eventBits |= HERO_EV_RELEASED;
}

function tryFire(s: HeroState, input: InputFrame, world: World, cfg: Tuning): void {
  // A press arms the hook for hookIntentSec: a click that lands a hair early (rope would
  // clip the launch roof, anchor not yet in the cone) fires the moment an anchor is valid.
  if (wasPressed(input, BTN_HOOK)) s.hookIntentT = cfg.release.hookIntentSec;
  if (s.hookIntentT <= 0) return;
  if (s.hookCd > 0 || s.hook.state !== HOOK_IDLE) return;
  let yaw = s.camYaw;
  let pitch = s.camPitch;
  if (input.hasAim === 1) {
    yaw = dequantizeTurn(input.aimYaw);
    pitch = dequantizeTurn(input.aimPitch);
  }
  const cp = Math.cos(pitch);
  const head = s.py + cfg.hero.height * HEAD_FRAC;
  const handY = s.py + cfg.rope.handToFeet;
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
  s.hookIntentT = 0;
  let speedAlong = 0;
  if (s.chainT > 0) {
    const a = world.anchors[scratchAim.anchorId];
    const cx = a.px - s.px;
    const cy = a.py - handY;
    const cz = a.pz - s.pz;
    const len = Math.sqrt(cx * cx + cy * cy + cz * cz);
    if (len > 0) speedAlong = (s.vx * cx + s.vy * cy + s.vz * cz) / len;
  }
  if (hookFire(s.hook, scratchAim.anchorId, s.px, handY, s.pz, world, cfg, speedAlong)) {
    s.eventBits |= HERO_EV_HOOKED;
  }
}

function rideStep(s: HeroState, input: InputFrame, world: World, cfg: Tuning, dt: number): void {
  if (wasPressed(input, BTN_JUMP)) {
    releaseHero(s, cfg, true);
    return;
  }
  if (wasPressed(input, BTN_DROP)) {
    releaseHero(s, cfg, false);
    return;
  }
  const h = s.hook;
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
      landHero(s, cfg);
      return;
    }
  }
  if (blocked) {
    wallHit(s, cfg);
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
      wallHit(s, cfg);
      return;
    }
    s.mode = HERO_HANGING;
    s.vx = 0;
    s.vy = 0;
    s.vz = 0;
    resetHook(h);
  }
}

// scratchHit holds the blocking face. Above vCling the hero dies, otherwise it clings.
function wallHit(s: HeroState, cfg: Tuning): void {
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
  resetHook(h);
}

function hangStep(s: HeroState, input: InputFrame, cfg: Tuning): void {
  s.vx = 0;
  s.vy = 0;
  s.vz = 0;
  if (wasPressed(input, BTN_JUMP)) releaseHero(s, cfg, true);
  else if (wasPressed(input, BTN_DROP)) releaseHero(s, cfg, false);
}

export function step(s: HeroState, input: InputFrame, world: World, cfg: Tuning): void {
  s.eventBits = 0;
  if (s.dead === 1) return;
  const dt = 1 / cfg.fixedHz;
  if (s.chainT > 0) s.chainT = s.chainT > dt ? s.chainT - dt : 0;
  if (s.rollT > 0) s.rollT = s.rollT > dt ? s.rollT - dt : 0;
  if (s.hookCd > 0) s.hookCd = s.hookCd > dt ? s.hookCd - dt : 0;
  if (s.hookIntentT > 0) s.hookIntentT = s.hookIntentT > dt ? s.hookIntentT - dt : 0;

  // Camera.
  s.camYaw += dequantizeTurn(input.lookYaw);
  s.camPitch += dequantizeTurn(input.lookPitch);
  const pMin = cfg.camera.pitchMin * DEG2RAD;
  const pMax = cfg.camera.pitchMax * DEG2RAD;
  if (s.camPitch < pMin) s.camPitch = pMin;
  if (s.camPitch > pMax) s.camPitch = pMax;

  if (s.mode !== HERO_ATTACHED) {
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
      }
    }
  }

  if (s.mode === HERO_ATTACHED) rideStep(s, input, world, cfg, dt);
  else if (s.mode === HERO_HANGING) hangStep(s, input, cfg);
  else moveFree(s, input, world, cfg, dt);

  if (s.dead === 0 && s.py < world.killPlaneY) killHero(s, DEAD_FELL);
}

function moveFree(s: HeroState, input: InputFrame, world: World, cfg: Tuning, dt: number): void {
  // Desired horizontal velocity, camera-relative.
  let mx = dequantizeAxis(input.moveX);
  let my = dequantizeAxis(input.moveY);
  const mag = Math.sqrt(mx * mx + my * my);
  if (mag > 1) {
    mx /= mag;
    my /= mag;
  }
  const sy = Math.sin(s.camYaw);
  const cy = Math.cos(s.camYaw);
  const wantX = (my * sy + mx * cy) * cfg.hero.run;
  const wantZ = (my * cy - mx * sy) * cfg.hero.run;

  if (s.grounded === 1) {
    if (wasPressed(input, BTN_JUMP)) {
      s.vy = cfg.hero.jump;
      s.grounded = 0;
    } else {
      s.vy = 0;
    }
  }

  // Horizontal velocity.
  if (s.grounded === 1) {
    if (mag > 0) {
      const dx = wantX - s.vx;
      const dz = wantZ - s.vz;
      const dl = Math.sqrt(dx * dx + dz * dz);
      const maxD = cfg.hero.accel * dt;
      if (dl <= maxD) {
        s.vx = wantX;
        s.vz = wantZ;
      } else {
        s.vx += (dx / dl) * maxD;
        s.vz += (dz / dl) * maxD;
      }
    } else if (s.chainT <= 0) {
      // Momentum survives the chain window after a landing.
      const sp = Math.sqrt(s.vx * s.vx + s.vz * s.vz);
      const drop = cfg.hero.friction * dt;
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
  }

  // Horizontal move, per axis. Grounded bodies ignore geometry below stepUp.
  let baseY = s.py;
  let h = cfg.hero.height;
  if (s.grounded === 1) {
    baseY = s.py + cfg.hero.stepUp;
    h = cfg.hero.height - cfg.hero.stepUp;
  }
  const r = cfg.hero.radius;
  const oldPx = s.px;
  const mvx = sweepAxis(world, s.px, baseY, s.pz, h, r, 0, s.vx * dt);
  if (scratchHit.hit) s.vx = 0;
  s.px += mvx;
  // Ramps carry no sweep geometry: reject the axis move when the ramp surface at the
  // new footprint is more than stepUp above the feet (wall rule, finding 5).
  if (rampBarrierHeightAt(world, s.px, s.pz, r) > s.py + cfg.hero.stepUp) {
    s.px = oldPx;
    s.vx = 0;
  }
  const oldPz = s.pz;
  const mvz = sweepAxis(world, s.px, baseY, s.pz, h, r, 2, s.vz * dt);
  if (scratchHit.hit) s.vz = 0;
  s.pz += mvz;
  if (rampBarrierHeightAt(world, s.px, s.pz, r) > s.py + cfg.hero.stepUp) {
    s.pz = oldPz;
    s.vz = 0;
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
        landHero(s, cfg);
      }
    }
  }

  if (s.dead === 0) s.mode = s.grounded === 1 ? HERO_GROUNDED : HERO_AIRBORNE;
}
