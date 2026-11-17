// Run clock (T339): integer ticks from phase 'play'. The time that counts is
// (finishTick - firstInputTick) / 60, so planning before the first move is free.
// Pure: no DOM, three or storage; game.ts feeds it one InputFrame per play step.
import { AXIS_MAX, BTN_RESTART } from '../core/input';
import type { InputFrame } from '../core/input';

/** Stick/key magnitude (fraction of full scale) that counts as "started moving". */
export const MOVE_DEADZONE = 0.15;
const GAMEPLAY_BTN_MASK = 0xff & ~BTN_RESTART;

/** True when this frame is a gameplay input: move above the deadzone or a gameplay button bit.
 *  Camera drag (lookYaw/lookPitch), the overview key and the flyover skip are not InputFrame bits. */
export function isGameplayInput(f: InputFrame): boolean {
  const lim = MOVE_DEADZONE * AXIS_MAX;
  if (Math.abs(f.moveX) > lim || Math.abs(f.moveY) > lim) return true;
  return ((f.buttons | f.pressed) & GAMEPLAY_BTN_MASK) !== 0;
}

export class RunClock {
  /** Play ticks completed so far (counted from phase 'play'). */
  ticks = 0;
  /** Tick index of the first gameplay input, or -1 before it. */
  firstInputTick = -1;

  constructor(private readonly hz = 60) {}

  /** Clear both counters (restart). */
  reset(): void {
    this.ticks = 0;
    this.firstInputTick = -1;
  }

  /** Call once per play step, after the step ran, with that step's input frame. */
  tick(f: InputFrame): void {
    if (this.firstInputTick < 0 && isGameplayInput(f)) this.firstInputTick = this.ticks;
    this.ticks++;
  }

  get started(): boolean {
    return this.firstInputTick >= 0;
  }

  /** Ticks of planning before the first input (the leaderboard offset). */
  get offsetTicks(): number {
    return this.firstInputTick < 0 ? this.ticks : this.firstInputTick;
  }

  /** Counted ticks: finish minus first input (0 until the first input). */
  get runTicks(): number {
    return this.firstInputTick < 0 ? 0 : this.ticks - this.firstInputTick;
  }

  /** Seconds shown in the HUD and stored as best. */
  get seconds(): number {
    return this.runTicks / this.hz;
  }
}
