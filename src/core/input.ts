// Core input frame (M1-T04). Portable: pure TS, no three, no DOM, no closures,
// no union types. Later ported line-by-line to GDScript.

// Button bit flags (distinct powers of two).
export const BTN_JUMP = 1;
export const BTN_HOOK = 2;
export const BTN_DROP = 4;
export const BTN_REEL = 8;
export const BTN_RESTART = 16;
export const BTN_AIM = 32;
// Contextual action button: Hook -> Release -> Mantle/Brake.
export const BTN_ACTION = 64;

// Max magnitude of a quantized axis value (int16-safe).
export const AXIS_MAX = 32767;
// One full turn = TURN_UNITS units (int16-safe when stored as a delta).
export const TURN_UNITS = 4096;

// Per-tick input sample. All fields are plain integers; the adapter fills it,
// the sim reads it, nothing else mutates it.
export class InputFrame {
  moveX = 0; // quantized -AXIS_MAX..AXIS_MAX, meaning -1..1 (camera-relative)
  moveY = 0; // quantized -AXIS_MAX..AXIS_MAX, meaning -1..1 (camera-relative)
  lookYaw = 0; // delta this tick, in 1/TURN_UNITS turn
  lookPitch = 0; // delta this tick, in 1/TURN_UNITS turn
  aimYaw = 0; // absolute, in 1/TURN_UNITS turn, meaningful when hasAim === 1
  aimPitch = 0; // absolute, in 1/TURN_UNITS turn, meaningful when hasAim === 1
  hasAim = 0; // 0 or 1
  buttons = 0; // bitmask of buttons currently held
  pressed = 0; // bitmask of buttons pressed THIS tick (edge-triggered)
}

export function newInputFrame(): InputFrame {
  return new InputFrame();
}

export function copyInputFrame(dst: InputFrame, src: InputFrame): void {
  dst.moveX = src.moveX;
  dst.moveY = src.moveY;
  dst.lookYaw = src.lookYaw;
  dst.lookPitch = src.lookPitch;
  dst.aimYaw = src.aimYaw;
  dst.aimPitch = src.aimPitch;
  dst.hasAim = src.hasAim;
  dst.buttons = src.buttons;
  dst.pressed = src.pressed;
}

export function clearInputFrame(f: InputFrame): void {
  f.moveX = 0;
  f.moveY = 0;
  f.lookYaw = 0;
  f.lookPitch = 0;
  f.aimYaw = 0;
  f.aimPitch = 0;
  f.hasAim = 0;
  f.buttons = 0;
  f.pressed = 0;
}

// Clamp v to -1..1, scale to +-AXIS_MAX, round to the nearest integer.
export function quantizeAxis(v: number): number {
  let c = v;
  if (c > 1) c = 1;
  if (c < -1) c = -1;
  return Math.round(c * AXIS_MAX);
}

export function dequantizeAxis(q: number): number {
  return q / AXIS_MAX;
}

// Radians -> nearest 1/TURN_UNITS turn (no wrapping required).
export function quantizeTurn(radians: number): number {
  return Math.round((radians * TURN_UNITS) / (Math.PI * 2));
}

export function dequantizeTurn(q: number): number {
  return (q * Math.PI * 2) / TURN_UNITS;
}

export function hasButton(f: InputFrame, bit: number): boolean {
  return (f.buttons & bit) !== 0;
}

export function wasPressed(f: InputFrame, bit: number): boolean {
  return (f.pressed & bit) !== 0;
}
