// The cloud dragon's 1-D catch rule. It chases along the fall line, ignores x, never slows for
// the player and never gets a mercy. Pure, deterministic, fixed dt. No three, no DOM.
import type { Tuning } from '../config';

export class DragonState {
  z = 0; // dragon head z
  gap = 0; // dragonZ - heroZ
  t = 0; // seconds of play
  v = 0; // current speed (m/s)
  caught = 0;
}

export function newDragon(spawnZ: number, cfg: Tuning): DragonState {
  const d = new DragonState();
  d.z = spawnZ + cfg.chase.startGap;
  d.gap = cfg.chase.startGap;
  d.v = cfg.chase.v0;
  return d;
}

export function copyDragon(dst: DragonState, src: DragonState): void {
  dst.z = src.z;
  dst.gap = src.gap;
  dst.t = src.t;
  dst.v = src.v;
  dst.caught = src.caught;
}

/** Dragon speed for the given play time and gap (m/s). */
export function dragonSpeed(t: number, gap: number, cfg: Tuning): number {
  const c = cfg.chase;
  const base = Math.min(c.vMax, c.v0 + c.accel * t);
  return gap > c.gapMax ? base + c.rubberK * (gap - c.gapMax) : base;
}

/** One fixed tick. heroZ is the hero's z after the sim step. */
export function dragonStep(d: DragonState, heroZ: number, cfg: Tuning): void {
  const dt = 1 / cfg.fixedHz;
  d.t += dt;
  d.v = dragonSpeed(d.t, d.gap, cfg);
  d.z -= d.v * dt;
  d.gap = d.z - heroZ;
  d.caught = d.gap <= cfg.chase.catchGap ? 1 : 0;
}

function smoothstep01(x: number): number {
  const c = x < 0 ? 0 : x > 1 ? 1 : x;
  return c * c * (3 - 2 * c);
}

/** 0 when the dragon is far, 1 when it is on you: drives fog, sun dimming and the cloud layer. */
export function cloudCoverFor(gap: number, cfg: Tuning): number {
  const lo = cfg.chase.catchGap;
  const hi = cfg.chase.fogGap;
  return smoothstep01((hi - gap) / (hi - lo));
}
