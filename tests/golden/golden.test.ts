// Golden input traces (plan section 3.10, simplified): replay a recorded InputFrame stream through
// the real core step() on an inline level and compare the event log and the final state. A trace
// is the GDScript port's parity fixture, so its numbers only change on purpose: re-record by
// setting "expect": null, running this test, and pasting the printed block back into the trace.
import { describe, expect, it } from 'vitest';
import roofSlide from './roof-slide.trace.json?raw';
import { loadWorldFromObject } from '../../src/content/load';
import { DEFAULT_TUNING } from '../../src/core/config';
import { HeroState } from '../../src/core/hero';
import { InputFrame } from '../../src/core/input';
import { step } from '../../src/core/sim';

interface Final {
  px: number;
  py: number;
  pz: number;
  vx: number;
  vy: number;
  vz: number;
  mode: number;
  grounded: number;
  dead: number;
  deadCause: number;
}
interface Trace {
  v: number;
  name: string;
  level: unknown;
  start: { px: number; py: number; pz: number; camYaw: number; grounded: number };
  // RLE: [count, moveX, moveY, lookYaw, lookPitch, buttons, pressed]; pressed fires on the
  // first tick of the run only (edge-triggered).
  frames: number[][];
  expect: { ticks: number; events: number[][]; final: Final } | null;
}

const R = 1e6; // final state is compared at micrometre precision
const round = (n: number): number => Math.round(n * R) / R;

function replay(t: Trace): { ticks: number; events: number[][]; final: Final } {
  const w = loadWorldFromObject(t.level);
  const s = new HeroState();
  s.px = t.start.px;
  s.py = t.start.py;
  s.pz = t.start.pz;
  s.camYaw = t.start.camYaw;
  s.grounded = t.start.grounded;
  s.mode = t.start.grounded === 1 ? 0 : 1;
  const events: number[][] = [];
  let tick = 0;
  for (const run of t.frames) {
    for (let k = 0; k < run[0]; k++) {
      const f = new InputFrame();
      f.moveX = run[1];
      f.moveY = run[2];
      f.lookYaw = run[3];
      f.lookPitch = run[4];
      f.buttons = run[5];
      f.pressed = k === 0 ? run[6] : 0;
      step(s, f, w, DEFAULT_TUNING);
      if (s.eventBits !== 0) events.push([tick, s.eventBits]);
      tick++;
    }
  }
  return {
    ticks: tick,
    events,
    final: {
      px: round(s.px),
      py: round(s.py),
      pz: round(s.pz),
      vx: round(s.vx),
      vy: round(s.vy),
      vz: round(s.vz),
      mode: s.mode,
      grounded: s.grounded,
      dead: s.dead,
      deadCause: s.deadCause,
    },
  };
}

const TRACES: string[] = [roofSlide];

describe('golden traces', () => {
  for (const text of TRACES) {
    const t = JSON.parse(text) as Trace;
    it(t.name, () => {
      const got = replay(t);
      if (t.expect === null) console.log(JSON.stringify(got));
      expect(t.expect).not.toBeNull();
      expect(got).toEqual(t.expect);
      expect(replay(t)).toEqual(got); // and it is deterministic
    });
  }
});
