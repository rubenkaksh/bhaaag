// Touch input adapter (M1-T09a). Adapter layer: DOM + Pointer Events,
// closures allowed. Fills the core InputFrame; src/core never imports this.
// Portrait and landscape are both playable (decided 2026-11-10): game.ts calls reset() on an
// orientation flip, so this adapter needs no orientation logic of its own.
//
// Control map (plan 4.7 + ADR 0001):
//   Move    floating stick in #stick-zone (left). The stick base appears
//           wherever the thumb lands; offset from that origin, clamped to
//           STICK_RADIUS_PX, normalised -> quantizeAxis (up = forward).
//   Look    none: the camera is a fixed front view (no player view control).
//   Aim     short tap on #look-zone (< TAP_MAX_MS, < TAP_MAX_PX) sets tapPending with tapNdcX/tapNdcY (-1..1) for
//           the game to raycast (tap-to-aim, ADR 0001). The game clears
//           tapPending after consuming it. hasAim stays 0 in InputFrame
//           until M2 writes the absolute aim fields.
//   Button  ONE big right-thumb button (#btn-jump, label set by the game via actionMode):
//           jump  -> press = BTN_JUMP (held while down); double tap = Hook, triple tap = Drop
//           hook  -> press = BTN_HOOK (line pad in a lineOnly level)
//           brake -> hold >= BRAKE_HOLD_MS = BTN_REEL; short tap = BTN_JUMP (release off the rope)
//           climb -> hold >= CLIMB_HOLD_MS = BTN_CLIMB (mantle); short tap = BTN_JUMP (wall jump)
//           Tap counting and hold thresholds live in tapGesture.ts; docs/controls.md has the table.
//   Drop    fast downward swipe on #look-zone (> SWIPE_DOWN_PX within
//           SWIPE_MAX_MS) -> BTN_DROP pressed edge only (no hold).
//
// Per-pointer tracking: one role per pointerId, setPointerCapture on the
// element that received pointerdown so pointerup arrives even after the
// finger slides off. Two thumbs (stick + look, or look + button) work at
// once. pointercancel releases that pointer safely: no tap, no swipe, no
// pressed edge, held bits derived from the live pointer ids drop cleanly.

import {
  BTN_JUMP,
  BTN_DROP,
  BTN_ACTION,
  BTN_HOOK,
  BTN_REEL,
  BTN_CLIMB,
  InputFrame,
  clearInputFrame,
  quantizeAxis,
} from '../../core/input';
import { BRAKE_HOLD_MS, CLIMB_HOLD_MS, TapTracker } from './tapGesture';

/** What a press of the one right-hand button does (set each frame by the game). */
export type ActionMode = 'jump' | 'hook' | 'brake' | 'climb';

// Max distance from the stick origin that maps to full deflection.
const STICK_RADIUS_PX = 64;
// A tap: short and almost stationary (else it is a swipe or ignored).
const TAP_MAX_MS = 250;
const TAP_MAX_PX = 10;
// Swipe down for DROP: vertical distance and a "fast" time budget.
const SWIPE_DOWN_PX = 80;
const SWIPE_MAX_MS = 300;

// Roles tracked per pointerId (one role per pointer).
const ROLE_STICK = 1;
const ROLE_LOOK = 2;
const ROLE_JUMP = 4; // the one big right-hand button

export class TouchInput {
  // Floating-stick state, public so the UI can place the base under the
  // thumb and draw the knob (touch.css positions those visuals).
  stickActive = false;
  stickOriginX = 0; // client px where the thumb landed
  stickOriginY = 0;
  stickX = 0; // normalised -1..1 (already quantized in sample())
  stickY = 0;

  // Context of the right-hand button, set by the game each frame (drives label and press mapping).
  actionMode: ActionMode = 'jump';

  // Tap-to-aim result for the game to raycast. The game reads and clears
  // tapPending; NDC is -1..1 with +Y up (three.js convention).
  tapPending = false;
  tapNdcX = 0;
  tapNdcY = 0;

  // Active pointer per role (-1 = none).
  private stickId = -1;
  private lookId = -1;
  private jumpId = -1;
  // Role lookup so pointerup/pointercancel know which state to release.
  private readonly roles = new Map<number, number>();

  // Tap / swipe bookkeeping (client px).
  private lookStartX = 0;
  private lookStartY = 0;
  private lookStartTime = 0;
  // Largest distance from pointerdown to any move, for tap vs drag.
  private lookMaxDevPx = 0;

  // Button edges since the last sample, cleared by sample().
  private pressedPending = 0;
  // Right-hand button gesture state: tap counter plus the mode captured at press time.
  private readonly tapper = new TapTracker();
  private pressMode: ActionMode = 'jump';

  private readonly root: HTMLElement;
  private readonly stickZone: HTMLElement | null;
  private readonly lookZone: HTMLElement | null;
  private readonly btnJump: HTMLElement | null;
  // Stick visuals (created under #stick-zone; drawn by render()).
  private readonly stickBase: HTMLElement | null = null;
  private readonly stickKnob: HTMLElement | null = null;

  constructor(root: HTMLElement) {
    this.root = root;
    // Ids come from index.html (M1-T09 UI side). A missing zone disables
    // that control instead of throwing, so partial layouts still run.
    this.stickZone = root.querySelector<HTMLElement>('#stick-zone');
    this.lookZone = root.querySelector<HTMLElement>('#look-zone');
    this.btnJump = root.querySelector<HTMLElement>('#btn-jump');

    if (this.stickZone !== null) {
      this.stickBase = document.createElement('div');
      this.stickBase.id = 'stick-base';
      this.stickKnob = document.createElement('div');
      this.stickKnob.id = 'stick-knob';
      for (const dir of ['up', 'right', 'down', 'left']) {
        const c = document.createElement('i');
        c.className = 'chev ' + dir;
        c.innerHTML =
          '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 14l4-4 4 4" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>';
        this.stickBase.appendChild(c);
      }
      this.stickZone.appendChild(this.stickBase);
      this.stickZone.appendChild(this.stickKnob);
      this.stickZone.addEventListener('pointerdown', this.onStickDown);
      this.stickZone.addEventListener('pointermove', this.onStickMove);
      this.stickZone.addEventListener('pointerup', this.onStickUp);
      this.stickZone.addEventListener('pointercancel', this.onStickCancel);
    }
    if (this.lookZone !== null) {
      this.lookZone.addEventListener('pointerdown', this.onLookDown);
      this.lookZone.addEventListener('pointermove', this.onLookMove);
      this.lookZone.addEventListener('pointerup', this.onLookUp);
      this.lookZone.addEventListener('pointercancel', this.onLookCancel);
    }
    if (this.btnJump !== null) {
      this.btnJump.addEventListener('pointerdown', this.onJumpDown);
      this.btnJump.addEventListener('pointerup', this.onJumpUp);
      this.btnJump.addEventListener('pointercancel', this.onJumpCancel);
    }
    // Safety net: focus loss must not leave a thumb "held".
    window.addEventListener('blur', this.onBlur);
    // A held thumb is a long press: suppress the browser context menu /
    // callout on the touch shell (m1-review F10).
    root.addEventListener('contextmenu', this.onContextMenu);
  }

  // Fill out with the current sample. buttons = held mask; pressed = edge
  // mask since the previous sample (then cleared); hasAim/aimYaw/aimPitch stay 0 (clearInputFrame): tap-to-aim is
  // delivered via tapPending for the game to raycast (game.ts wires it).
  sample(out: InputFrame): void {
    clearInputFrame(out);

    // Movement from the floating stick (already clamped to -1..1).
    out.moveX = quantizeAxis(this.stickX);
    out.moveY = quantizeAxis(this.stickY);


    // Held buttons derive from the live pointer id, so pointercancel and blur release them.
    const now = performance.now();
    let buttons = 0;
    if (this.jumpId !== -1) {
      if (this.pressMode === 'jump') buttons |= BTN_JUMP | BTN_ACTION;
      else if (this.pressMode === 'hook') buttons |= BTN_HOOK | BTN_ACTION;
      else if (this.pressMode === 'brake' && this.tapper.holding(now, BRAKE_HOLD_MS)) buttons |= BTN_REEL;
      else if (this.pressMode === 'climb' && this.tapper.holding(now, CLIMB_HOLD_MS)) buttons |= BTN_CLIMB;
    }
    // Completed tap sequence: double tap = Hook (jump context only), triple tap = Drop.
    const taps = this.tapper.poll(now);
    out.taps = taps;
    if (taps === 2 && this.actionMode === 'jump') {
      this.pressedPending |= BTN_HOOK | BTN_ACTION;
      buttons |= BTN_HOOK | BTN_ACTION;
    } else if (taps === 3) {
      this.pressedPending |= BTN_DROP;
    }
    out.buttons = buttons;
    out.pressed = this.pressedPending;
    this.pressedPending = 0;
  }

  /**
   * Clear every live input: stick, held buttons, pressed edges, look
   * accumulators and pending tap. Called on pause or an orientation flip
   * so a thumb that is still down under the overlay cannot keep driving the
   * sim when the game resumes (m1-review F4).
   */
  reset(): void {
    // Release captures first so a finger still down (mid-gesture flip) stops feeding the old
    // zone; later pointermove/up events for those ids are ignored (ids are -1 below).
    for (const id of this.roles.keys()) this.releaseCapture(id);
    this.roles.clear();
    this.stickId = -1;
    this.lookId = -1;
    this.jumpId = -1;
    this.releaseStick();
    this.pressedPending = 0;
    this.tapper.cancel();
    this.tapPending = false;
    this.lookMaxDevPx = 0;
    this.render();
  }

  /**
   * Draw the floating stick: base ring at the thumb origin, knob offset by
   * the normalised deflection. Call once per rendered frame (m1-review F10).
   */
  render(): void {
    if (this.stickBase === null || this.stickKnob === null) return;
    if (!this.stickActive) {
      // Resting ghost: CSS positions it bottom-left (see touch.css).
      this.stickBase.classList.add('ghost');
      this.stickKnob.classList.add('ghost');
      this.stickBase.style.display = 'block';
      this.stickKnob.style.display = 'block';
      this.stickBase.style.left = '';
      this.stickBase.style.top = '';
      this.stickKnob.style.left = '';
      this.stickKnob.style.top = '';
      return;
    }
    this.stickBase.classList.remove('ghost');
    this.stickKnob.classList.remove('ghost');
    // #stick-zone is fixed at (0, 0), so client px map straight to offsets.
    const cx = this.stickOriginX;
    const cy = this.stickOriginY;
    this.stickBase.style.display = 'block';
    this.stickBase.style.left = cx + 'px';
    this.stickBase.style.top = cy + 'px';
    this.stickKnob.style.display = 'block';
    this.stickKnob.style.left = cx + this.stickX * STICK_RADIUS_PX + 'px';
    this.stickKnob.style.top = cy - this.stickY * STICK_RADIUS_PX + 'px';
  }

  dispose(): void {
    if (this.stickZone !== null) {
      this.stickZone.removeEventListener('pointerdown', this.onStickDown);
      this.stickZone.removeEventListener('pointermove', this.onStickMove);
      this.stickZone.removeEventListener('pointerup', this.onStickUp);
      this.stickZone.removeEventListener('pointercancel', this.onStickCancel);
    }
    if (this.lookZone !== null) {
      this.lookZone.removeEventListener('pointerdown', this.onLookDown);
      this.lookZone.removeEventListener('pointermove', this.onLookMove);
      this.lookZone.removeEventListener('pointerup', this.onLookUp);
      this.lookZone.removeEventListener('pointercancel', this.onLookCancel);
    }
    if (this.btnJump !== null) {
      this.btnJump.removeEventListener('pointerdown', this.onJumpDown);
      this.btnJump.removeEventListener('pointerup', this.onJumpUp);
      this.btnJump.removeEventListener('pointercancel', this.onJumpCancel);
    }
    window.removeEventListener('blur', this.onBlur);
    this.root.removeEventListener('contextmenu', this.onContextMenu);
    this.stickBase?.remove();
    this.stickKnob?.remove();
    this.roles.clear();
    this.releaseStick();
    this.lookId = -1;
    this.jumpId = -1;
  }

  // Best-effort capture so pointerup outside the zone still arrives here.
  private capture(el: HTMLElement, e: PointerEvent): void {
    try {
      el.setPointerCapture(e.pointerId);
    } catch {
      // Capture is optional; the element-level listeners still cover us
      // while the finger stays over the zone.
    }
  }

  private releaseCapture(id: number): void {
    for (const el of [this.stickZone, this.lookZone, this.btnJump]) {
      try {
        if (el !== null && el.hasPointerCapture(id)) el.releasePointerCapture(id);
      } catch {
        // The pointer may already be gone; nothing to release.
      }
    }
  }

  private releaseStick(): void {
    this.stickActive = false;
    this.stickX = 0;
    this.stickY = 0;
  }

  // ---- floating stick (#stick-zone) ----

  private readonly onStickDown = (e: PointerEvent): void => {
    if (this.stickId !== -1 || this.stickZone === null) return; // one thumb
    e.preventDefault();
    this.stickId = e.pointerId;
    this.roles.set(e.pointerId, ROLE_STICK);
    this.capture(this.stickZone, e);
    // Floating base: appears where the thumb lands.
    this.stickActive = true;
    this.stickOriginX = e.clientX;
    this.stickOriginY = e.clientY;
    this.stickX = 0;
    this.stickY = 0;
  };

  private readonly onStickMove = (e: PointerEvent): void => {
    if (e.pointerId !== this.stickId) return;
    const dx = e.clientX - this.stickOriginX;
    const dy = e.clientY - this.stickOriginY;
    // Clamp to the radius, normalise; drag up = forward (+Y).
    let nx = dx / STICK_RADIUS_PX;
    let ny = -dy / STICK_RADIUS_PX;
    const len = Math.sqrt(nx * nx + ny * ny);
    if (len > 1) {
      nx /= len;
      ny /= len;
    }
    this.stickX = nx;
    this.stickY = ny;
  };

  private readonly onStickUp = (e: PointerEvent): void => {
    if (e.pointerId !== this.stickId) return;
    this.roles.delete(e.pointerId);
    this.stickId = -1;
    this.releaseStick();
  };

  private readonly onStickCancel = (e: PointerEvent): void => {
    // pointercancel: drop the stick safely, no edges, no tap.
    if (e.pointerId !== this.stickId) return;
    this.roles.delete(e.pointerId);
    this.stickId = -1;
    this.releaseStick();
  };

  // ---- look drag + swipe + tap (#look-zone, doubles as the canvas area) ----

  private readonly onLookDown = (e: PointerEvent): void => {
    if (this.lookId !== -1 || this.lookZone === null) return; // one thumb
    e.preventDefault();
    this.lookId = e.pointerId;
    this.roles.set(e.pointerId, ROLE_LOOK);
    this.capture(this.lookZone, e);
    this.lookStartX = e.clientX;
    this.lookStartY = e.clientY;
    this.lookStartTime = e.timeStamp;
    this.lookMaxDevPx = 0;
  };

  private readonly onLookMove = (e: PointerEvent): void => {
    if (e.pointerId !== this.lookId) return;
    // Track deviation from the start for the tap-vs-drag decision.
    const sx = e.clientX - this.lookStartX;
    const sy = e.clientY - this.lookStartY;
    const dev = Math.sqrt(sx * sx + sy * sy);
    if (dev > this.lookMaxDevPx) this.lookMaxDevPx = dev;
  };

  private readonly onLookUp = (e: PointerEvent): void => {
    if (e.pointerId !== this.lookId) return;
    this.roles.delete(e.pointerId);
    this.lookId = -1;
    const dt = e.timeStamp - this.lookStartTime;
    const dy = e.clientY - this.lookStartY;
    const dev = Math.max(this.lookMaxDevPx, Math.abs(dy));

    // Fast downward swipe = DROP edge (checked first: a swipe of SWIPE_DOWN_PX
    // is far beyond TAP_MAX_PX, so the two never overlap).
    if (dy > SWIPE_DOWN_PX && dt <= SWIPE_MAX_MS) {
      this.pressedPending |= BTN_DROP;
      return;
    }
    // Short, almost stationary tap = tap-to-aim (the game picks an anchor from tapNdc).
    if (dt < TAP_MAX_MS && dev < TAP_MAX_PX && this.lookZone !== null) {
      const rect = this.lookZone.getBoundingClientRect();
      const w = rect.width > 0 ? rect.width : 1;
      const h = rect.height > 0 ? rect.height : 1;
      this.tapNdcX = ((e.clientX - rect.left) / w) * 2 - 1;
      this.tapNdcY = 1 - ((e.clientY - rect.top) / h) * 2; // +Y up
      this.tapPending = true;
    }
  };

  private readonly onLookCancel = (e: PointerEvent): void => {
    // pointercancel: abandon the drag safely (no tap, no swipe, no edge).
    if (e.pointerId !== this.lookId) return;
    this.roles.delete(e.pointerId);
    this.lookId = -1;
  };

  // ---- the one big right-hand button (#btn-jump) ----

  private readonly onJumpDown = (e: PointerEvent): void => {
    if (this.jumpId !== -1 || this.btnJump === null) return;
    e.preventDefault();
    this.jumpId = e.pointerId;
    this.roles.set(e.pointerId, ROLE_JUMP);
    this.capture(this.btnJump, e);
    this.pressMode = this.actionMode;
    this.tapper.press(e.timeStamp);
    if (this.pressMode === 'jump') this.pressedPending |= BTN_JUMP;
    else if (this.pressMode === 'hook') this.pressedPending |= BTN_HOOK | BTN_ACTION;
  };

  private readonly onJumpUp = (e: PointerEvent): void => {
    if (e.pointerId !== this.jumpId) return;
    this.roles.delete(e.pointerId);
    this.jumpId = -1;
    const dur = this.tapper.release(e.timeStamp);
    // Deferred jump: off the rope or off a wall a short tap jumps, a hold brakes / climbs.
    if (this.pressMode === 'brake' && dur >= 0 && dur < BRAKE_HOLD_MS) this.pressedPending |= BTN_JUMP;
    if (this.pressMode === 'climb' && dur >= 0 && dur < CLIMB_HOLD_MS) this.pressedPending |= BTN_JUMP;
  };

  private readonly onJumpCancel = (e: PointerEvent): void => {
    // pointercancel: no tap, no edge, held bits drop.
    if (e.pointerId !== this.jumpId) return;
    this.roles.delete(e.pointerId);
    this.jumpId = -1;
    this.tapper.cancel();
  };

  private readonly onContextMenu = (e: Event): void => {
    // Long-press callout / context menu on a held thumb is never wanted.
    e.preventDefault();
  };

  private readonly onBlur = (): void => {
    // Alt-tab etc.: nothing may stay held after focus leaves the window.
    this.reset();
  };
}
