/**
 * Fixed-timestep game loop (app layer — closures and classes are fine here;
 * the deterministic core is driven by the steps this loop produces).
 *
 * See docs/zipline-plan.md section 3.4.
 */

/** Default cap on simulation steps per rendered frame (spiral-of-death guard). */
export const DEFAULT_MAX_STEPS = 5;

/**
 * Fixed-timestep accumulator. Pure logic, no DOM/timers — feed it elapsed
 * seconds, get back how many fixed steps to run and an interpolation alpha.
 */
export class Accumulator {
  private acc = 0;
  private readonly stepDt: number;
  private readonly maxSteps: number;

  /**
   * @param stepDt fixed step size in seconds (e.g. 1 / 60)
   * @param maxSteps maximum steps a single feed() may return
   */
  constructor(stepDt: number, maxSteps: number = DEFAULT_MAX_STEPS) {
    if (!(stepDt > 0)) {
      throw new RangeError('stepDt must be > 0');
    }
    if (!(maxSteps >= 1)) {
      throw new RangeError('maxSteps must be >= 1');
    }
    this.stepDt = stepDt;
    this.maxSteps = maxSteps;
  }

  /** Seconds per fixed step. */
  get fixedStep(): number {
    return this.stepDt;
  }

  /**
   * Accumulate one frame's elapsed time and return the number of fixed steps
   * to run. Negative/NaN frame times are clamped to 0. If the backlog exceeds
   * `maxSteps` steps, only `maxSteps` run and the excess time is dropped
   * (prevents the spiral of death).
   */
  feed(frameDt: number): number {
    const dt = Number.isFinite(frameDt) && frameDt > 0 ? frameDt : 0;
    this.acc += dt;
    let steps = 0;
    while (this.acc >= this.stepDt && steps < this.maxSteps) {
      this.acc -= this.stepDt;
      steps++;
    }
    if (this.acc >= this.stepDt) {
      // Dropped frames: keep only the sub-step remainder so time already
      // "spent" on missed steps does not queue up future catch-up bursts.
      this.acc = this.acc % this.stepDt;
    }
    return steps;
  }

  /**
   * Interpolation factor in [0, 1): how far the accumulator sits between the
   * last completed step and the next one. Feed to the renderer.
   */
  get alpha(): number {
    return this.acc / this.stepDt;
  }

  /** Drop all accumulated time (e.g. when the tab is hidden). */
  reset(): void {
    this.acc = 0;
  }
}

export interface GameLoopOptions {
  /** Simulation rate in Hz (60 → step is 1/60 s). */
  fixedHz: number;
  /** Runs once per fixed step. */
  onStep: () => void;
  /** Runs once per animation frame with alpha in [0, 1) and the frame time in seconds. */
  onRender: (alpha: number, frameDt: number) => void;
  /** Max fixed steps per frame (spiral-of-death cap). Defaults to 5. */
  maxSteps?: number;
}

/**
 * requestAnimationFrame-driven loop around {@link Accumulator}. Pauses while
 * the document is hidden and resumes without a catch-up burst. {@link pause}
 * / {@link resume} do the same on demand (e.g. the portrait rotate overlay).
 */
export class GameLoop {
  private readonly accumulator: Accumulator;
  private readonly fixedHz: number;
  private readonly onStep: () => void;
  private readonly onRender: (alpha: number, frameDt: number) => void;
  private rafId: number | null = null;
  private last = 0;
  private running = false;
  private paused = false;

  constructor(options: GameLoopOptions) {
    if (!(options.fixedHz > 0)) {
      throw new RangeError('fixedHz must be > 0');
    }
    this.fixedHz = options.fixedHz;
    this.onStep = options.onStep;
    this.onRender = options.onRender;
    this.accumulator = new Accumulator(1 / options.fixedHz, options.maxSteps);
  }

  /** Begin looping. No-op if already running. */
  start(): void {
    if (this.running) return;
    this.running = true;
    this.last = performance.now();
    document.addEventListener('visibilitychange', this.handleVisibility);
    this.rafId = requestAnimationFrame(this.tick);
  }

  /** Stop looping and detach listeners. No-op if not running. */
  stop(): void {
    if (!this.running) return;
    this.running = false;
    this.paused = false;
    this.cancelFrame();
    document.removeEventListener('visibilitychange', this.handleVisibility);
  }

  /**
   * Pause on demand (portrait overlay, etc.): cancel the pending frame and
   * drop accumulated time so resuming never produces a catch-up burst.
   * Reuses the same logic as the hidden-tab path. No-op when not running or
   * already paused.
   */
  pause(): void {
    if (!this.running || this.paused) return;
    this.paused = true;
    this.cancelFrame();
    this.accumulator.reset();
  }

  /**
   * Resume after {@link pause}. Resets the timestamp so paused time never
   * counts as frame time. No-op when not running or not paused.
   */
  resume(): void {
    if (!this.running || !this.paused) return;
    this.paused = false;
    this.last = performance.now();
    this.rafId = requestAnimationFrame(this.tick);
  }

  private cancelFrame(): void {
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }

  private readonly tick = (now: number): void => {
    if (!this.running || this.paused) return;
    const frameDt = (now - this.last) / 1000;
    this.last = now;
    const steps = this.accumulator.feed(frameDt);
    for (let i = 0; i < steps; i++) {
      this.onStep();
    }
    this.onRender(this.accumulator.alpha, Number.isFinite(frameDt) && frameDt > 0 ? frameDt : 0);
    this.rafId = requestAnimationFrame(this.tick);
  };

  private readonly handleVisibility = (): void => {
    if (document.hidden) {
      // Pause: cancel the pending frame and drop backlog so returning to the
      // tab does not trigger a burst of catch-up steps.
      this.cancelFrame();
      this.accumulator.reset();
      return;
    }
    // Visible again. Stays paused if pause() (e.g. portrait) still holds;
    // cancel any frame scheduled by a resume() that ran while hidden so we
    // never end up with two ticks queued.
    if (!this.running || this.paused) return;
    this.cancelFrame();
    // Resume: reset the timestamp so hidden time never counts as frame time.
    this.last = performance.now();
    this.rafId = requestAnimationFrame(this.tick);
  };
}
