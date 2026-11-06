// Desktop input adapter (M1-T08). Adapter layer: DOM + Pointer Events,
// closures allowed. Fills the core InputFrame; src/core never imports this.
//
// Control map (docs/zipline-plan.md 4.7 where it differs from the task
// statement, differences listed there too):
//   Move     WASD + arrow keys          (plan lists WASD only)
//   Look     pointer lock; drag-to-look (pointer down + move) once
//            requestPointerLock is unavailable or fails
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
  InputFrame,
  clearInputFrame,
  dequantizeTurn,
  quantizeAxis,
  quantizeTurn,
} from '../../core/input';

// Radians of turn per pixel of mouse movement.
const LOOK_SENSITIVITY = 0.0025;

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
  private locked = false;
  // Set once requestPointerLock is unavailable or has failed; enables drag look.
  private dragFallback = false;
  // Pointer deltas (radians) accumulated since the last sample.
  private accYaw = 0;
  private accPitch = 0;
  // Button edges (up -> down) since the last sample, cleared by sample().
  private pressedPending = 0;

  constructor(target: HTMLElement) {
    this.target = target;
    if (typeof target.requestPointerLock !== 'function') {
      this.dragFallback = true;
    }

    target.addEventListener('pointerdown', this.onPointerDown);
    target.addEventListener('pointermove', this.onPointerMove);
    target.addEventListener('pointerup', this.onPointerUp);
    target.addEventListener('pointercancel', this.onPointerUp);
    target.addEventListener('click', this.onClick);
    target.addEventListener('contextmenu', this.onContextMenu);
    // Safety net: releases buttons even when pointer capture was not granted.
    window.addEventListener('pointerup', this.onPointerUp);
    window.addEventListener('pointercancel', this.onPointerUp);
    window.addEventListener('keydown', this.onKeyDown);
    window.addEventListener('keyup', this.onKeyUp);
    window.addEventListener('blur', this.onBlur);
    document.addEventListener('pointerlockchange', this.onLockChange);
    document.addEventListener('pointerlockerror', this.onLockError);
  }

  // Fill out with the current sample. buttons = held mask; pressed = edge mask
  // since the previous sample (then cleared); look deltas are consumed here.
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

    // Look: accumulated pointer-lock (or drag) delta since the last sample.
    // +yaw = turn right, +pitch = look up. Quantise and carry the remainder
    // so slow drags are not skewed by discarding the sub-quantum residue
    // (m1-review F9).
    const qYaw = quantizeTurn(this.accYaw);
    const qPitch = quantizeTurn(this.accPitch);
    this.accYaw -= dequantizeTurn(qYaw);
    this.accPitch -= dequantizeTurn(qPitch);
    out.lookYaw = qYaw;
    out.lookPitch = qPitch;

    out.buttons = buttons | this.mouseBits();
    out.pressed = this.pressedPending;
    this.pressedPending = 0;
    // hasAim / aimYaw / aimPitch stay 0 (clearInputFrame): desktop aims by
    // holding BTN_AIM, not by absolute ray.
  }

  dispose(): void {
    this.target.removeEventListener('pointerdown', this.onPointerDown);
    this.target.removeEventListener('pointermove', this.onPointerMove);
    this.target.removeEventListener('pointerup', this.onPointerUp);
    this.target.removeEventListener('pointercancel', this.onPointerUp);
    this.target.removeEventListener('click', this.onClick);
    this.target.removeEventListener('contextmenu', this.onContextMenu);
    window.removeEventListener('pointerup', this.onPointerUp);
    window.removeEventListener('pointercancel', this.onPointerUp);
    window.removeEventListener('keydown', this.onKeyDown);
    window.removeEventListener('keyup', this.onKeyUp);
    window.removeEventListener('blur', this.onBlur);
    document.removeEventListener('pointerlockchange', this.onLockChange);
    document.removeEventListener('pointerlockerror', this.onLockError);
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

  private readonly onPointerMove = (e: PointerEvent): void => {
    const looking = this.locked || (this.dragFallback && this.mouseHeld !== 0);
    if (!looking) return;
    this.accYaw += e.movementX * LOOK_SENSITIVITY;
    this.accPitch += -e.movementY * LOOK_SENSITIVITY; // mouse up = look up
  };

  private readonly onPointerUp = (e: PointerEvent): void => {
    this.mouseHeld &= ~(1 << e.button);
  };

  private readonly onClick = (): void => {
    if (this.locked || this.dragFallback) return;
    if (typeof this.target.requestPointerLock !== 'function') {
      this.dragFallback = true;
      return;
    }
    try {
      const res: unknown = this.target.requestPointerLock();
      if (res !== null && typeof res === 'object' && 'catch' in res) {
        (res as Promise<void>).catch(() => {
          this.dragFallback = true;
        });
      }
    } catch {
      this.dragFallback = true;
    }
  };

  private readonly onContextMenu = (e: Event): void => {
    // Right mouse is a held control (REEL + AIM), not a context menu.
    e.preventDefault();
  };

  private readonly onLockChange = (): void => {
    this.locked = document.pointerLockElement === this.target;
    // Held bits derive from this.locked, so BTN_HOOK drops automatically.
  };

  private readonly onLockError = (): void => {
    this.locked = false;
    this.dragFallback = true;
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
