// LOOK mode camera offset (owner feedback A). Pure: no three, no DOM. Angles in radians, rig
// convention (+yaw turns the view right, +pitch looks up). The offset is added on top of the
// normal follow camera; it never touches the sim, so movement stays relative to the follow view.
import { HERO_ATTACHED, HERO_GROUNDED } from '../../core/hero';

const DEG = Math.PI / 180;

export interface LookCfg {
  lookYawMaxDeg: number; // max |yaw| from the follow view; >= 180 wraps (free 360)
  lookPitchMinDeg: number; // lowest pitch offset (negative = look down)
  lookPitchMaxDeg: number; // highest pitch offset
  lookDragDegPerPx: number; // view turn per px of drag
  lookIdleSec: number; // LOOK switches itself off after this long without a drag (0 = never)
  lookInvertX: number; // 1 = drag right turns the view right; 0 = old direction (drag right turns left)
  lookInvertY: number; // 1 = drag down looks down; 0 = drag down looks up
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
 * Apply a drag of (dx, dy) client px. Defaults (lookInvertX 1, lookInvertY 0): dragging right turns the
 * view right (owner iPhone feedback, reversed from the first version); dragging down looks up. Ignored while LOOK is off. Resets the idle timer.
 */
export function applyLookDrag(s: LookState, dx: number, dy: number, cfg: LookCfg): void {
  if (!s.active) return;
  const yaw = s.yaw + (cfg.lookInvertX >= 0.5 ? dx : -dx) * cfg.lookDragDegPerPx * DEG;
  // lookYawMaxDeg >= 180 means a free full turn: wrap into (-180, 180] so you can keep swiping round.
  s.yaw =
    cfg.lookYawMaxDeg >= 180
      ? yaw - Math.round(yaw / (2 * Math.PI)) * 2 * Math.PI
      : clamp(yaw, -cfg.lookYawMaxDeg * DEG, cfg.lookYawMaxDeg * DEG);
  s.pitch = clamp(
    s.pitch + (cfg.lookInvertY >= 0.5 ? -dy : dy) * cfg.lookDragDegPerPx * DEG,
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

export interface LookAvailability {
  /** LOOK may be on: the button is enabled. */
  available: boolean;
  /** Look-around is on by default (no toggle needed) and ends when this turns false. */
  auto: boolean;
}

/**
 * Where LOOK is allowed, by hero mode: grounded = toggle; riding the rope = free look, on by default; airborne,
 * hanging, dead or anything else = off and disabled.
 */
export function lookAvailability(heroMode: number): LookAvailability {
  if (heroMode === HERO_GROUNDED) return { available: true, auto: false };
  if (heroMode === HERO_ATTACHED) return { available: true, auto: true };
  return { available: false, auto: false };
}
