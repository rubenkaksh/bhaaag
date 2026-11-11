// Desktop input adapter (M1-T08). Adapter layer: DOM + Pointer Events,
// closures allowed. Fills the core InputFrame; src/core never imports this.
//
// Control map (docs/zipline-plan.md 4.7 where it differs from the task
// statement, differences listed there too):
//   Move     WASD + arrow keys          (plan lists WASD only)
//   Look     none: the camera is a fixed front view (no player view control)
//   Aim      hold right mouse (also raises BTN_REEL, per the task statement)
//   Hook     E or left mouse
//   Jump     Space
//   Drop     Shift, Ctrl or Q
//   Reel     hold R or right mouse      (hand-brake while on the rope)
//   Restart  any key / click (handled in app/game.ts)

import {
  BTN_JUMP,
  BTN_HOOK,
  BTN_DROP,
  BTN_REEL,
  BTN_AIM,
  BTN_CLIMB,
  InputFrame,
  clearInputFrame,
  quantizeAxis,
} from '../../core/input';

// e.code -> button bit.
const KEY_BUTTONS: Record<string, number | undefined> = {
  Space: BTN_JUMP,
  ShiftLeft: BTN_DROP,
  ShiftRight: BTN_DROP,
  ControlLeft: BTN_DROP,
  ControlRight: BTN_DROP,
  KeyE: BTN_HOOK,
  KeyQ: BTN_DROP,
  KeyR: BTN_REEL, // hold = hand-brake while on the rope
  KeyF: BTN_CLIMB, // hold while hanging at a ledge = mantle (ADR 0011)
};

// e.code -> axis contribution (+1 / -1). Sums are clamped by quantizeAxis.
const KEY_AXIS_X: Record<string, number | undefined> = {
  KeyD: 1,
  ArrowRight: 1,
  KeyA: -1,
  ArrowLeft: -1,
};
const KEY_AXIS_Y: Record<string, number | undefined> = {
  KeyW: 1,
  ArrowUp: 1,
  KeyS: -1,
  ArrowDown: -1,
};

function isTextField(el: EventTarget | null): boolean {
  if (!(el instanceof HTMLElement)) return false;
  const tag = el.tagName;
  return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || el.isContentEditable;
}

export class DesktopInput {
  private readonly target: HTMLElement;
  // Only mapped game keys are tracked (see the KEY_* tables).
  private readonly heldKeys = new Set<string>();
  // Bit per DOM mouse button index (bit 0 = left, bit 2 = right).
  private mouseHeld = 0;
  // Button edges (up -> down) since the last sample, cleared by sample().
  private pressedPending = 0;

  constructor(target: HTMLElement) {
    this.target = target;
    target.addEventListener('pointerdown', this.onPointerDown);
    target.addEventListener('pointerup', this.onPointerUp);
    target.addEventListener('pointercancel', this.onPointerUp);
    target.addEventListener('contextmenu', this.onContextMenu);
    // Safety net: releases buttons even when pointer capture was not granted.
    window.addEventListener('pointerup', this.onPointerUp);
    window.addEventListener('pointercancel', this.onPointerUp);
    window.addEventListener('keydown', this.onKeyDown);
    window.addEventListener('keyup', this.onKeyUp);
    window.addEventListener('blur', this.onBlur);
  }

  // Fill out with the current sample. buttons = held mask; pressed = edge mask
  // since the previous sample (then cleared); .
  sample(out: InputFrame): void {
    clearInputFrame(out);

    // Movement, camera-relative: +X = right, +Y = forward.
    let x = 0;
    let y = 0;
    let buttons = 0;
    for (const code of this.heldKeys) {
      const ax = KEY_AXIS_X[code];
      if (ax !== undefined) x += ax;
      const ay = KEY_AXIS_Y[code];
      if (ay !== undefined) y += ay;
      const bit = KEY_BUTTONS[code];
      if (bit !== undefined) buttons |= bit;
    }
    out.moveX = quantizeAxis(x);
    out.moveY = quantizeAxis(y);

    out.buttons = buttons | this.mouseBits();
    out.pressed = this.pressedPending;
    this.pressedPending = 0;
    // hasAim / aimYaw / aimPitch stay 0 (clearInputFrame): desktop aims by
    // holding BTN_AIM, not by absolute ray.
  }

  dispose(): void {
    this.target.removeEventListener('pointerdown', this.onPointerDown);
    this.target.removeEventListener('pointerup', this.onPointerUp);
    this.target.removeEventListener('pointercancel', this.onPointerUp);
    this.target.removeEventListener('contextmenu', this.onContextMenu);
    window.removeEventListener('pointerup', this.onPointerUp);
    window.removeEventListener('pointercancel', this.onPointerUp);
    window.removeEventListener('keydown', this.onKeyDown);
    window.removeEventListener('keyup', this.onKeyUp);
    window.removeEventListener('blur', this.onBlur);
  }

  // Mouse-derived button bits from current held buttons.
  private mouseBits(): number {
    let bits = 0;
    const left = (this.mouseHeld & 1) !== 0;
    const right = (this.mouseHeld & 4) !== 0;
    if (left) bits |= BTN_HOOK;
    if (right) bits |= BTN_REEL | BTN_AIM;
    return bits;
  }

  private readonly onPointerDown = (e: PointerEvent): void => {
    const before = this.mouseBits();
    this.mouseHeld |= 1 << e.button;
    // Best-effort capture so pointerup outside the target still arrives here.
    try {
      this.target.setPointerCapture(e.pointerId);
    } catch {
      // Capture is optional; the window-level pointerup listener covers us.
    }
    this.pressedPending |= this.mouseBits() & ~before;
  };

  private readonly onPointerUp = (e: PointerEvent): void => {
    this.mouseHeld &= ~(1 << e.button);
  };

  private readonly onContextMenu = (e: Event): void => {
    // Right mouse is a held control (REEL + AIM), not a context menu.
    e.preventDefault();
  };

  private readonly onKeyDown = (e: KeyboardEvent): void => {
    if (isTextField(e.target)) return;
    // Leave browser shortcuts (reload, close tab, devtools) alone.
    const code = e.code;
    // Ctrl alone is DROP; Ctrl+key combos stay with the browser.
    const bareCtrl = code === 'ControlLeft' || code === 'ControlRight';
    if ((e.ctrlKey && !bareCtrl) || e.metaKey || e.altKey) return;
    const bit = KEY_BUTTONS[code];
    const ax = KEY_AXIS_X[code];
    const ay = KEY_AXIS_Y[code];
    if (bit === undefined && ax === undefined && ay === undefined) return;
    // Mapped game keys must not scroll the page or activate UI.
    e.preventDefault();
    if (e.repeat || this.heldKeys.has(code)) return;
    this.heldKeys.add(code);
    if (bit !== undefined) this.pressedPending |= bit;
  };

  private readonly onKeyUp = (e: KeyboardEvent): void => {
    // No guards: always release, even if the keyup lands on a focused field.
    this.heldKeys.delete(e.code);
  };

  private readonly onBlur = (): void => {
    // Alt-tab etc.: nothing may stay held after focus leaves the window.
    this.heldKeys.clear();
    this.mouseHeld = 0;
  };
}
