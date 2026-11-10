// Zipline hook: anchor picking, rope chord and slide physics (plan §4.1 / §4.2, ADR 0001).
// Core rules: no three/DOM, plain classes with fields, no allocation inside the
// per-tick functions (module-level scratch only). Units: metres, Y-up, 1 unit = 1 m.
//
// Geometry model (§4.2):
//   O = rope origin (hero hand at fire time), H = anchor point,
//   L = |H - O|, d = (H - O)/L, sin(theta) = -d.y  (positive = downhill)
//   s in [0, L - trolleyStop], v >= 0
//   a = g * gravityFactor * sin(theta) - drag * v - (brake ? brakeDecel : 0)
//   v = min(v + a*dt, terminal);  s += v*dt
//   trolley T = O + d*s;  feet F = T - (0, handToFeet, 0)
// The rope is a straight chord; sag is cosmetic and lives in the renderer.

import type { Tuning } from './config';
import { SweepHit, segmentVsAabb } from './math/aabb';
import { Vec3, set } from './math/vec3';
import type { Anchor, World } from './world';

export const HOOK_IDLE = 0;
export const HOOK_FLYING = 1;
export const HOOK_ATTACHED = 2;
export const HOOK_AT_END = 3;

export const NO_ANCHOR = -1;

const DEG2RAD = Math.PI / 180;
const RAD2DEG = 180 / Math.PI;
const MIN_LEN = 1e-4; // metres; at or below this a chord / ray is degenerate
// The blocked test trims this off both chord ends: an anchor that sits exactly on a
// solid surface would otherwise report a self-hit at t = 1, and a hand resting on a
// roof edge would report one at t = 0.
const BLOCK_MARGIN = 0.05;

export class Hook {
  state = HOOK_IDLE;
  anchorId = NO_ANCHOR;
  // Hook point (anchor position).
  ax = 0;
  ay = 0;
  az = 0;
  // Rope origin = hero hand at fire time.
  ox = 0;
  oy = 0;
  oz = 0;
  // Unit chord direction O -> A and sin(theta), cached at fire so the hot path has
  // no divides.
  dirX = 0;
  dirY = 0;
  dirZ = 0;
  slopeSin = 0;
  len = 0; // chord length O -> A
  s = 0; // distance travelled along the chord from O
  v = 0; // speed along the chord, m/s
  flyT = 0; // time left while the hook is in the air (FLYING only)
  handToFeet = 0; // copied from rope.handToFeet at fire (pos helpers need no cfg)
}

export function newHook(): Hook {
  return new Hook();
}

// Puts h back to a pristine idle rope (anchorId -1, zeroed travel).
export function resetHook(h: Hook): void {
  h.state = HOOK_IDLE;
  h.anchorId = NO_ANCHOR;
  h.ax = 0;
  h.ay = 0;
  h.az = 0;
  h.ox = 0;
  h.oy = 0;
  h.oz = 0;
  h.dirX = 0;
  h.dirY = 0;
  h.dirZ = 0;
  h.slopeSin = 0;
  h.len = 0;
  h.s = 0;
  h.v = 0;
  h.flyT = 0;
  h.handToFeet = 0;
}

export function copyHook(d: Hook, s: Hook): void {
  d.state = s.state;
  d.anchorId = s.anchorId;
  d.ax = s.ax;
  d.ay = s.ay;
  d.az = s.az;
  d.ox = s.ox;
  d.oy = s.oy;
  d.oz = s.oz;
  d.dirX = s.dirX;
  d.dirY = s.dirY;
  d.dirZ = s.dirZ;
  d.slopeSin = s.slopeSin;
  d.len = s.len;
  d.s = s.s;
  d.v = s.v;
  d.flyT = s.flyT;
  d.handToFeet = s.handToFeet;
}

/**
 * Re-bases the chord onto a new hand position (the hero moved while the hook flew), keeping
 * state, speed and anchor. s restarts at 0. No-op when the new chord is degenerate.
 */
export function hookRebase(h: Hook, handX: number, handY: number, handZ: number): void {
  const cx = h.ax - handX;
  const cy = h.ay - handY;
  const cz = h.az - handZ;
  const len = Math.sqrt(cx * cx + cy * cy + cz * cz);
  if (len <= MIN_LEN) return;
  const inv = 1 / len;
  h.ox = handX;
  h.oy = handY;
  h.oz = handZ;
  h.dirX = cx * inv;
  h.dirY = cy * inv;
  h.dirZ = cz * inv;
  h.slopeSin = -h.dirY;
  h.len = len;
  h.s = 0;
}

// Result of a pick: anchorId is NO_ANCHOR when nothing valid was found.
export class AimResult {
  anchorId = NO_ANCHOR;
  dist = 0; // chord length hand -> anchor, metres
  angleDeg = 0; // angular error between the aim ray and the anchor, degrees
}

const scratchP0 = new Vec3(0, 0, 0);
const scratchP1 = new Vec3(0, 0, 0);
const scratchHit = new SweepHit();
// Split route lists for pickAnchorAssisted, refilled (length = 0, then push) on every
// call, plus the second result for the late pass: pickAnchor resets its out on entry, so
// a pass that finds nothing must not erase an earlier hit.
const scratchRouteEarly: number[] = [];
const scratchRouteLate: number[] = [];
const scratchLatePick = new AimResult();

// True when any solid blocks the hand -> anchor chord. Writes into module scratch only.
function chordBlocked(
  world: World,
  handX: number,
  handY: number,
  handZ: number,
  ax: number,
  ay: number,
  az: number,
  len: number,
  dirX: number,
  dirY: number,
  dirZ: number,
): boolean {
  const trim = BLOCK_MARGIN < len * 0.25 ? BLOCK_MARGIN : len * 0.25;
  if (len - trim * 2 <= 0) return false;
  set(scratchP0, handX + dirX * trim, handY + dirY * trim, handZ + dirZ * trim);
  set(
    scratchP1,
    ax - dirX * trim,
    ay - dirY * trim,
    az - dirZ * trim,
  );
  const solids = world.solids;
  for (let i = 0; i < solids.length; i++) {
    segmentVsAabb(scratchP0, scratchP1, solids[i], scratchHit);
    if (scratchHit.hit) return true;
  }
  return false;
}

/**
 * Picks the valid anchor whose direction is closest to the aim ray (smallest angular
 * error), scanning world.anchors. A candidate is valid when it is
 *   - within magnetDeg of the ray (ray from camX/camY/camZ along dirX/dirY/dirZ),
 *   - within [rope.minLen, maxLen] of the hero hand,
 *   - sloping downward from the hand within [rope.minSlopeDeg, rope.maxSlopeDeg],
 *   - and the hand -> anchor chord is not blocked by any solid.
 * maxLen / magnetDeg are explicit so callers can tighten them per input device
 * (aim.magnetDegDesktop vs aim.magnetDegTouch); the aim direction need not be unit
 * length. Writes into out; allocates nothing.
 */
export function pickAnchor(
  world: World,
  cfg: Tuning,
  handX: number,
  handY: number,
  handZ: number,
  camX: number,
  camY: number,
  camZ: number,
  dirX: number,
  dirY: number,
  dirZ: number,
  maxLen: number,
  magnetDeg: number,
  out: AimResult,
  only: number[] | null = null,
): void {
  out.anchorId = NO_ANCHOR;
  out.dist = 0;
  out.angleDeg = 0;

  const rayLen = Math.sqrt(dirX * dirX + dirY * dirY + dirZ * dirZ);
  if (rayLen <= MIN_LEN) return;
  const invRay = 1 / rayLen;
  const fx = dirX * invRay;
  const fy = dirY * invRay;
  const fz = dirZ * invRay;

  const rope = cfg.rope;
  const minSlopeSin = Math.sin(rope.minSlopeDeg * DEG2RAD);
  const maxSlopeSin = Math.sin(rope.maxSlopeDeg * DEG2RAD);
  const cosLimit = Math.cos(magnetDeg * DEG2RAD);

  const anchors = world.anchors;
  let bestId = NO_ANCHOR;
  let bestCos = cosLimit; // candidates must beat the cone edge, so start there
  let bestDist = 0;
  const n = only === null ? anchors.length : only.length;
  for (let i = 0; i < n; i++) {
    const a = only === null ? anchors[i] : anchors[only[i]];
    if (a === undefined) continue;
    // Angular error to the aim ray. Comparing cos keeps acos off the loop; larger cos
    // is smaller angle.
    const rx = a.px - camX;
    const ry = a.py - camY;
    const rz = a.pz - camZ;
    const rLen = Math.sqrt(rx * rx + ry * ry + rz * rz);
    if (rLen <= MIN_LEN) continue;
    const invR = 1 / rLen;
    const cosA = (rx * fx + ry * fy + rz * fz) * invR;
    if (!(cosA > bestCos)) continue; // also drops NaN and everything outside the cone
    // Chord from the hero hand.
    const cx = a.px - handX;
    const cy = a.py - handY;
    const cz = a.pz - handZ;
    const len = Math.sqrt(cx * cx + cy * cy + cz * cz);
    if (len < rope.minLen || len > maxLen) continue;
    const slopeSin = -cy / len; // positive = downhill
    if (slopeSin < minSlopeSin || slopeSin > maxSlopeSin) continue;
    if (chordBlocked(world, handX, handY, handZ, a.px, a.py, a.pz, len, cx / len, cy / len, cz / len))
      continue;
    bestCos = cosA;
    bestId = a.id;
    bestDist = len;
  }
  if (bestId === NO_ANCHOR) return;
  out.anchorId = bestId;
  out.dist = bestDist;
  out.angleDeg = Math.acos(bestCos > 1 ? 1 : bestCos) * RAD2DEG;
}

/**
 * Casual-friendly pick: first the on-route anchors (world.route) inside the wide aim
 * cones — routeAssistDeg for the first cfg.aim.routeAssistEarlyHops route entries (the
 * opening hops), routeAssistLateDeg for the rest — so a sloppy aim at the glowing next
 * anchor still hooks it (decoy anchors are never on the route). The two passes write into
 * separate results because pickAnchor resets its out on entry, so a pass with no hit must
 * not erase an earlier hit; when both find an anchor the smaller angular error wins. If
 * neither route pass finds one, the plain pickAnchor with the device magnet cone runs.
 * Writes into out; allocates nothing per call.
 */
export function pickAnchorAssisted(
  world: World,
  cfg: Tuning,
  handX: number,
  handY: number,
  handZ: number,
  camX: number,
  camY: number,
  camZ: number,
  dirX: number,
  dirY: number,
  dirZ: number,
  maxLen: number,
  magnetDeg: number,
  out: AimResult,
): void {
  const aim = cfg.aim;
  const route = world.route;
  scratchRouteEarly.length = 0;
  scratchRouteLate.length = 0;
  for (let i = 0; i < route.length; i++) {
    if (i < aim.routeAssistEarlyHops) scratchRouteEarly.push(route[i]);
    else scratchRouteLate.push(route[i]);
  }
  let found = false;
  if (aim.routeAssistDeg > magnetDeg) {
    pickAnchor(world, cfg, handX, handY, handZ, camX, camY, camZ, dirX, dirY, dirZ, maxLen, aim.routeAssistDeg, out, scratchRouteEarly);
    found = out.anchorId !== NO_ANCHOR;
  }
  if (aim.routeAssistLateDeg > magnetDeg) {
    pickAnchor(world, cfg, handX, handY, handZ, camX, camY, camZ, dirX, dirY, dirZ, maxLen, aim.routeAssistLateDeg, scratchLatePick, scratchRouteLate);
    if (scratchLatePick.anchorId !== NO_ANCHOR) {
      if (!found || scratchLatePick.angleDeg < out.angleDeg) {
        out.anchorId = scratchLatePick.anchorId;
        out.dist = scratchLatePick.dist;
        out.angleDeg = scratchLatePick.angleDeg;
      }
      found = true;
    }
  }
  if (found) return;
  pickAnchor(world, cfg, handX, handY, handZ, camX, camY, camZ, dirX, dirY, dirZ, maxLen, magnetDeg, out);
}

export const AIM_OK = 0;
export const AIM_NONE = 1;
export const AIM_TOO_CLOSE = 2;
export const AIM_OUT_OF_RANGE = 3;
export const AIM_UPHILL = 4;
export const AIM_TOO_FLAT = 5;
export const AIM_TOO_STEEP = 6;
export const AIM_BLOCKED = 7;

/**
 * Why pickAnchor would (or would not) hook here: picks the in-cone anchor nearest the aim
 * ray (on-route anchors get the wider of the magnet cone and their hop's route cone —
 * routeAssistDeg below routeAssistEarlyHops, routeAssistLateDeg after) and reports the
 * first failed chord check as an AIM_* reason, AIM_OK when none fails. Allocation-free.
 */
export function aimReason(
  world: World,
  cfg: Tuning,
  handX: number,
  handY: number,
  handZ: number,
  camX: number,
  camY: number,
  camZ: number,
  dirX: number,
  dirY: number,
  dirZ: number,
  maxLen: number,
  magnetDeg: number,
): number {
  const rayLen = Math.sqrt(dirX * dirX + dirY * dirY + dirZ * dirZ);
  if (rayLen <= MIN_LEN) return AIM_NONE;
  const invRay = 1 / rayLen;
  const fx = dirX * invRay;
  const fy = dirY * invRay;
  const fz = dirZ * invRay;

  const rope = cfg.rope;
  const minSlopeSin = Math.sin(rope.minSlopeDeg * DEG2RAD);
  const maxSlopeSin = Math.sin(rope.maxSlopeDeg * DEG2RAD);
  const cosLimit = Math.cos(magnetDeg * DEG2RAD);
  // On-route anchors sit in the larger of the magnet cone and their hop's route cone:
  // the first routeAssistEarlyHops route entries get routeAssistDeg, the rest
  // routeAssistLateDeg. Both limits are precomputed so the loop allocates nothing.
  const routeEarlyCos =
    cfg.aim.routeAssistDeg > magnetDeg ? Math.cos(cfg.aim.routeAssistDeg * DEG2RAD) : cosLimit;
  const routeLateCos =
    cfg.aim.routeAssistLateDeg > magnetDeg ? Math.cos(cfg.aim.routeAssistLateDeg * DEG2RAD) : cosLimit;
  const earlyHops = cfg.aim.routeAssistEarlyHops;
  const route = world.route;

  const anchors = world.anchors;
  let best: Anchor | null = null;
  let bestCos = 0; // only consulted once best is set
  for (let i = 0; i < anchors.length; i++) {
    const a = anchors[i];
    if (a === undefined) continue;
    let routeIdx = -1;
    for (let r = 0; r < route.length; r++) {
      if (route[r] === a.id) {
        routeIdx = r;
        break;
      }
    }
    let coneCos = cosLimit;
    if (routeIdx >= 0) coneCos = routeIdx < earlyHops ? routeEarlyCos : routeLateCos;
    // Angular error to the aim ray, as in pickAnchor: comparing cos keeps acos out of the
    // loop; larger cos is smaller angle.
    const rx = a.px - camX;
    const ry = a.py - camY;
    const rz = a.pz - camZ;
    const rLen = Math.sqrt(rx * rx + ry * ry + rz * rz);
    if (rLen <= MIN_LEN) continue;
    const invR = 1 / rLen;
    const cosA = (rx * fx + ry * fy + rz * fz) * invR;
    if (!(cosA > coneCos)) continue; // outside this anchor's cone, and drops NaN
    if (best !== null && !(cosA > bestCos)) continue;
    best = a;
    bestCos = cosA;
  }
  if (best === null) return AIM_NONE;

  const cx = best.px - handX;
  const cy = best.py - handY;
  const cz = best.pz - handZ;
  const len = Math.sqrt(cx * cx + cy * cy + cz * cz);
  if (len < rope.minLen) return AIM_TOO_CLOSE;
  if (len > maxLen) return AIM_OUT_OF_RANGE;
  const slopeSin = -cy / len; // positive = downhill
  if (slopeSin <= 0) return AIM_UPHILL;
  if (slopeSin < minSlopeSin) return AIM_TOO_FLAT;
  if (slopeSin > maxSlopeSin) return AIM_TOO_STEEP;
  if (chordBlocked(world, handX, handY, handZ, best.px, best.py, best.pz, len, cx / len, cy / len, cz / len))
    return AIM_BLOCKED;
  return AIM_OK;
}

/**
 * Fires the hook at world.anchors[anchorId] from the hero hand: state becomes FLYING
 * with flyT = len / rope.hookSpeed, and the ride start speed is
 * v0 = max(rope.launchSpeed, speedAlong), where speedAlong is the hero velocity already
 * projected on the chord direction (dot(heroVel, d)) — pass the carried run speed inside
 * the chain window, 0 otherwise. v0 is also clamped into [0, rope.terminal]. Returns
 * false (hook left idle) when the id is out of range or the chord is degenerate.
 */
export function hookFire(
  h: Hook,
  anchorId: number,
  handX: number,
  handY: number,
  handZ: number,
  world: World,
  cfg: Tuning,
  speedAlong: number,
): boolean {
  resetHook(h);
  if (anchorId < 0 || anchorId >= world.anchors.length) return false;
  const a = world.anchors[anchorId];
  const cx = a.px - handX;
  const cy = a.py - handY;
  const cz = a.pz - handZ;
  const len = Math.sqrt(cx * cx + cy * cy + cz * cz);
  if (len <= MIN_LEN) return false;
  const inv = 1 / len;
  h.anchorId = a.id;
  h.ax = a.px;
  h.ay = a.py;
  h.az = a.pz;
  h.ox = handX;
  h.oy = handY;
  h.oz = handZ;
  h.dirX = cx * inv;
  h.dirY = cy * inv;
  h.dirZ = cz * inv;
  h.slopeSin = -h.dirY;
  h.len = len;
  h.handToFeet = cfg.rope.handToFeet;
  // v0 = max(launchSpeed, projected run speed); rope.terminal is the rope's ceiling, so a
  // run-up above it (only reachable through tuning) starts clamped rather than breaking §4.2.
  let v0 = cfg.rope.launchSpeed > speedAlong ? cfg.rope.launchSpeed : speedAlong;
  if (v0 > cfg.rope.terminal) v0 = cfg.rope.terminal;
  if (v0 < 0) v0 = 0;
  h.v = v0;
  h.flyT = len / cfg.rope.hookSpeed;
  h.state = HOOK_FLYING;
  return true;
}

/**
 * Advances the hook one tick of dt seconds. FLYING only counts down flyT (the hero does
 * not move yet) and then becomes ATTACHED; the first tick after attaching does not
 * integrate. ATTACHED integrates the §4.2 slide: gravity along the slope minus linear
 * drag, minus rope.brakeDecel while brake is held, clamped to [0, rope.terminal], then
 * s += v*dt; reaching len - rope.trolleyStop sets AT_END and freezes v as the arrival
 * speed (the caller reads h.v / hookRelease). IDLE and AT_END do nothing. Returns the
 * resulting state. world is unused today and reserved for the §4.2 run-out / blocked-end
 * checks; callers keep passing it so this signature does not churn.
 */
export function hookStep(
  h: Hook,
  dt: number,
  world: World,
  cfg: Tuning,
  brake: boolean,
): number {
  if (h.state === HOOK_FLYING) {
    h.flyT -= dt;
    if (h.flyT <= 0) {
      h.flyT = 0;
      h.state = HOOK_ATTACHED;
    }
    return h.state;
  }
  if (h.state !== HOOK_ATTACHED) return h.state;

  const rope = cfg.rope;
  let a = cfg.physics.g * rope.gravityFactor * h.slopeSin - rope.drag * h.v;
  if (brake) a -= rope.brakeDecel;
  let v = h.v + a * dt;
  if (v > rope.terminal) v = rope.terminal;
  if (v < 0) v = 0; // the hand-brake never reverses the trolley
  h.v = v;
  h.s += v * dt;

  const end = h.len - rope.trolleyStop;
  if (h.s >= end) {
    h.s = end;
    h.state = HOOK_AT_END;
  }
  return h.state;
}

/**
 * Hero FEET position on the rope (§4.2): the chord point at s, lowered by handToFeet.
 * (The rope trolley itself is hookHandPos.) Writes into out; allocates nothing.
 */
export function hookTrolleyPos(h: Hook, out: Vec3): void {
  if (h.state === HOOK_IDLE) {
    set(out, 0, 0, 0);
    return;
  }
  out.x = h.ox + h.dirX * h.s;
  out.y = h.oy + h.dirY * h.s - h.handToFeet;
  out.z = h.oz + h.dirZ * h.s;
}

/** The trolley / hand point on the chord at s (O + d*s), without the handToFeet drop. */
export function hookHandPos(h: Hook, out: Vec3): void {
  if (h.state === HOOK_IDLE) {
    set(out, 0, 0, 0);
    return;
  }
  out.x = h.ox + h.dirX * h.s;
  out.y = h.oy + h.dirY * h.s;
  out.z = h.oz + h.dirZ * h.s;
}

/**
 * Lets go: out = chord direction * v (the world velocity the hero keeps), then the hook
 * returns to IDLE. Releasing while still FLYING (the hook never attached) gives a zero
 * vector. out may alias nothing the caller still needs; it is written before h resets.
 */
export function hookRelease(h: Hook, out: Vec3): void {
  const riding = h.state === HOOK_ATTACHED || h.state === HOOK_AT_END;
  const vx = riding ? h.dirX * h.v : 0;
  const vy = riding ? h.dirY * h.v : 0;
  const vz = riding ? h.dirZ * h.v : 0;
  resetHook(h);
  out.x = vx;
  out.y = vy;
  out.z = vz;
}
