import { AE_ATTACH, AE_DIE, AE_LAND, AE_RELEASE, landAmp } from './animEvents';

/** ADR 0007 section 4: camera kick (FOV) and deterministic shake. */

const DT_MAX = 0.1;
const KICK_TAU = 0.35;
const ACC_TAU = 0.2;
const SHAKE_TAU = 0.11;
const SHAKE_EPS = 0.002;

const KICK_ATTACH = 3;
const KICK_RELEASE = 5;
const KICK_LAND = -2;
const KICK_MIN = -4;
const KICK_MAX = 8;
const ACC_FOV_MAX = 4;
const FOV_ADD_MAX = 12;

const SHAKE_LAND = 0.1;
const SHAKE_LAND_MIN_AMP = 0.15;
const SHAKE_ATTACH = 0.035;
const SHAKE_DIE = 0.15;
const SHAKE_FREQ_Y = 23;
const SHAKE_FREQ_X = 31;
const SHAKE_PHASE_X = 1.3;

const TWO_PI = Math.PI * 2;

function clamp(v: number, lo: number, hi: number): number {
  if (v < lo) return lo;
  if (v > hi) return hi;
  return v;
}

/**
 * Screen-space camera feedback: FOV kick + acceleration FOV, and a
 * deterministic (no RNG) positional shake. Drive it once per fixed tick
 * after the sim step; read `fovAdd` (degrees, added to the rig FOV) and
 * `offX` / `offY` (metres, added to the camera position).
 */
export class CameraFx {
  offX = 0;
  offY = 0;
  fovAdd = 0;

  kick = 0;
  accS = 0;
  prevSpeed = 0;
  speedReady = 0;
  amp = 0;
  shakeT = 0;

  /**
   * Advance one tick. `events` is an AE_* bitmask, `impact` the downward
   * landing speed (m/s), `deadCause` the AE_DIE cause (2 or 3 shakes).
   * dt is clamped to [0, 0.1]; dt 0 changes nothing.
   */
  update(dt: number, events: number, impact: number, speed: number, deadCause: number): void {
    const t = dt < 0 ? 0 : dt > DT_MAX ? DT_MAX : dt;
    if (t === 0) return;

    // 1. FOV kick: triggers land at full strength on this frame, then decay.
    if ((events & AE_ATTACH) !== 0) this.kick += KICK_ATTACH;
    if ((events & AE_RELEASE) !== 0) this.kick += KICK_RELEASE;
    if ((events & AE_LAND) !== 0) this.kick += KICK_LAND * landAmp(impact);
    this.kick = clamp(this.kick, KICK_MIN, KICK_MAX);

    // 2. Shake trigger: amp = max(amp, X), each trigger resets shakeT.
    if ((events & AE_LAND) !== 0 && landAmp(impact) >= SHAKE_LAND_MIN_AMP) {
      this.triggerShake(SHAKE_LAND * landAmp(impact));
    }
    if ((events & AE_ATTACH) !== 0) this.triggerShake(SHAKE_ATTACH);
    if ((events & AE_DIE) !== 0 && (deadCause === 2 || deadCause === 3)) {
      this.triggerShake(SHAKE_DIE);
    }

    // 3. Acceleration term (first frame seeds prevSpeed, no false spike).
    if (this.speedReady === 0) {
      this.speedReady = 1;
      this.prevSpeed = speed;
      this.accS = 0;
    } else {
      this.accS += ((speed - this.prevSpeed) / t - this.accS) * (1 - Math.exp(-t / ACC_TAU));
      this.prevSpeed = speed;
    }
    const accFov = clamp(0.5 * this.accS, 0, ACC_FOV_MAX);

    this.fovAdd = clamp(this.kick + accFov, KICK_MIN, FOV_ADD_MAX);
    this.kick *= Math.exp(-t / KICK_TAU);

    // 4. Shake sample this frame.
    this.shakeT += t;
    this.amp *= Math.exp(-t / SHAKE_TAU);
    this.offY = this.amp * Math.sin(TWO_PI * SHAKE_FREQ_Y * this.shakeT);
    this.offX = 0.5 * this.amp * Math.sin(TWO_PI * SHAKE_FREQ_X * this.shakeT + SHAKE_PHASE_X);
    if (this.amp < SHAKE_EPS) {
      this.amp = 0;
      this.offX = 0;
      this.offY = 0;
      this.shakeT = 0;
    }
  }

  reset(): void {
    this.offX = 0;
    this.offY = 0;
    this.fovAdd = 0;
    this.kick = 0;
    this.accS = 0;
    this.prevSpeed = 0;
    this.speedReady = 0;
    this.amp = 0;
    this.shakeT = 0;
  }

  private triggerShake(x: number): void {
    if (x > this.amp) this.amp = x;
    this.shakeT = 0;
  }
}
