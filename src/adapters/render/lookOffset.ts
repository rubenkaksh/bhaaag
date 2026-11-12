// LOOK mode camera offset (owner feedback A). Pure: no three, no DOM. Angles in radians, rig
// convention (+yaw turns the view right, +pitch looks up). The offset is added on top of the
// normal follow camera; it never touches the sim, so movement stays relative to the follow view.

const DEG = Math.PI / 180;

export interface LookCfg {
  lookYawMaxDeg: number; // max |yaw| from the follow view
  lookPitchMinDeg: number; // lowest pitch offset (negative = look down)
  lookPitchMaxDeg: number; // highest pitch offset
  lookDragDegPerPx: number; // view turn per px of drag
  lookIdleSec: number; // LOOK switches itself off after this long without a drag (0 = never)
  lookEase: number; // per fixed tick ease of the offset back to 0 once LOOK is off
}

export interface LookState {
  active: boolean;
  yaw: number;
  pitch: number;
  idle: number; // seconds since the last drag (or since LOOK was switched on)
}

export function newLookState(): LookState {
  return { active: false, yaw: 0, pitch: 0, idle: 0 };
}

function clamp(v: number, lo: number, hi: number): number {
  return v < lo ? lo : v > hi ? hi : v;
}

export function setLookActive(s: LookState, on: boolean): void {
  s.active = on;
  s.idle = 0;
}

/**
 * Apply a drag of (dx, dy) client px. Dragging right turns the view left (the scene follows the
 * finger); dragging down looks up. Ignored while LOOK is off. Resets the idle timer.
 */
export function applyLookDrag(s: LookState, dx: number, dy: number, cfg: LookCfg): void {
  if (!s.active) return;
  s.yaw = clamp(
    s.yaw - dx * cfg.lookDragDegPerPx * DEG,
    -cfg.lookYawMaxDeg * DEG,
    cfg.lookYawMaxDeg * DEG,
  );
  s.pitch = clamp(
    s.pitch + dy * cfg.lookDragDegPerPx * DEG,
    cfg.lookPitchMinDeg * DEG,
    cfg.lookPitchMaxDeg * DEG,
  );
  s.idle = 0;
}

/**
 * One fixed tick (dt seconds). While active: advance the idle timer and switch off at lookIdleSec
 * (pass dragging = true while a finger/button is down so a held drag never times out).
 * While off: ease the offset back to 0 and snap when within a hair.
 */
export function tickLook(s: LookState, dt: number, dragging: boolean, cfg: LookCfg): void {
  if (s.active) {
    if (dragging) s.idle = 0;
    else s.idle += dt;
    if (cfg.lookIdleSec > 0 && s.idle >= cfg.lookIdleSec) s.active = false;
    return;
  }
  s.yaw += (0 - s.yaw) * cfg.lookEase;
  s.pitch += (0 - s.pitch) * cfg.lookEase;
  if (Math.abs(s.yaw) < 1e-4) s.yaw = 0;
  if (Math.abs(s.pitch) < 1e-4) s.pitch = 0;
}
