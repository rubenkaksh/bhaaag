// Camera tilt assist for opt-in graph levels (Hay Run). Pure TS: no three, no DOM.
// Standing on a deck with the next deck clearly below and ahead, the view eases down to look
// at it. Render only: the sim camPitch and aim are untouched (same contract as `?tilt`).
// Yaw is SIM yaw (forward = (sin h, cos h) in x, z), pitch is rig pitch (negative = looks down).
import { bearing, wrapAngle } from './pathCamera';

const DEG = Math.PI / 180;

export interface TiltAssistCfg {
  /** Total pitch reached at full assist, rad (negative = down). */
  pitch: number;
  /** Below this horizontal speed the hero counts as standing, m/s. */
  standSpeed: number;
  /** Standing for this long arms the assist, s. */
  standSec: number;
  /** Target must be within this of the camera yaw, rad. */
  bearingMax: number;
  /** Target deck must be at least this far below the hero, m. */
  dropMin: number;
  /** Horizontal reach, m. */
  distMax: number;
  /** Ease-in and release times, s. */
  easeIn: number;
  easeOut: number;
  /** Rig pitchMin on assist levels, deg (the rig clamp only). */
  rigPitchMinDeg: number;
  /** Reticle hides above this much assist, rad. */
  reticleHide: number;
}

export const TILT_ASSIST_CFG: TiltAssistCfg = {
  pitch: -75 * DEG,
  standSpeed: 1.5,
  standSec: 0.4,
  bearingMax: 60 * DEG,
  dropMin: 1.5,
  distMax: 25,
  easeIn: 0.5,
  easeOut: 0.3,
  rigPitchMinDeg: -78,
  reticleHide: 10 * DEG,
};

export class TiltAssistState {
  /** Seconds standing still on the ground. */
  still = 0;
  /** Assist blend 0..1. */
  k = 0;
}

export interface AssistHero {
  px: number;
  py: number;
  pz: number;
  vx: number;
  vz: number;
  grounded: boolean;
  attached: boolean;
  /** Sim camera yaw. */
  camYaw: number;
  /** Pitch the rig would use without the assist (camPitch - tilt), rad. */
  basePitch: number;
  /** Player look-drag active (PathCam.paused). */
  look: boolean;
}

export interface AssistTarget {
  x: number;
  z: number;
  /** Deck height of the target house. */
  y: number;
}

export function resetAssist(s: TiltAssistState): void {
  s.still = 0;
  s.k = 0;
}

/** One tick. Returns the EXTRA pitch-down (rad, >= 0) to subtract from the rig pitch. */
export function assistPitch(
  s: TiltAssistState,
  hero: AssistHero,
  target: AssistTarget | null,
  dt: number,
  cfg: TiltAssistCfg = TILT_ASSIST_CFG,
): number {
  const speed = Math.sqrt(hero.vx * hero.vx + hero.vz * hero.vz);
  const standing = hero.grounded && !hero.attached && speed < cfg.standSpeed;
  s.still = standing ? s.still + dt : 0;

  let want = false;
  if (standing && s.still >= cfg.standSec && !hero.look && target !== null) {
    const dx = target.x - hero.px;
    const dz = target.z - hero.pz;
    const dist = Math.sqrt(dx * dx + dz * dz);
    want =
      dist <= cfg.distMax &&
      hero.py - target.y >= cfg.dropMin &&
      Math.abs(wrapAngle(bearing(hero.px, hero.pz, target.x, target.z) - hero.camYaw)) <
        cfg.bearingMax;
  }
  if (want) s.k = Math.min(1, s.k + dt / cfg.easeIn);
  else s.k = Math.max(0, s.k - dt / cfg.easeOut);
  return s.k * Math.max(0, hero.basePitch - cfg.pitch);
}
