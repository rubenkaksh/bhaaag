// Tap-count and hold timing for the single right-thumb button (ADR 0011, docs/controls.md).
// Pure TS, no DOM: the touch adapter feeds it pointer times in ms and polls it once per sample.

// A press shorter than this is a tap; longer is a hold and breaks any tap sequence.
export const TAP_MAX_MS = 250;
// After a release, this long with no new press completes the sequence (double tap resolves here).
export const TAP_GAP_MS = 220;
// Hold time that mantles while hanging (matches climb.holdSec 0.35 s in tuning).
export const CLIMB_HOLD_MS = 350;
// Hold time that starts the hand-brake while attached to the rope.
export const BRAKE_HOLD_MS = 180;
// Most taps counted (InputFrame.taps is 0..3).
export const MAX_TAPS = 3;

export class TapTracker {
  private down = false;
  private downT = 0;
  private count = 0;
  private lastUpT = 0;

  /** Finger lands. */
  press(t: number): void {
    this.down = true;
    this.downT = t;
  }

  /** Finger lifts normally. Returns the press duration in ms, or -1 if no press was live. */
  release(t: number): number {
    if (!this.down) return -1;
    this.down = false;
    const dur = t - this.downT;
    if (dur <= TAP_MAX_MS) {
      if (this.count < MAX_TAPS) this.count++;
      this.lastUpT = t;
    } else {
      this.count = 0; // a hold is not a tap and breaks the sequence
    }
    return dur;
  }

  /** pointercancel / blur / orientation flip: nothing counts, nothing fires. */
  cancel(): void {
    this.down = false;
    this.count = 0;
  }

  /** True while a finger is down and has been for at least holdMs. */
  holding(t: number, holdMs: number): boolean {
    return this.down && t - this.downT >= holdMs;
  }

  isDown(): boolean {
    return this.down;
  }

  /** Taps completed since the last poll (0..3): fires on the third tap at once, else after the gap. */
  poll(t: number): number {
    if (this.down || this.count === 0) return 0;
    if (this.count >= MAX_TAPS || t - this.lastUpT >= TAP_GAP_MS) {
      const n = this.count;
      this.count = 0;
      return n;
    }
    return 0;
  }
}
