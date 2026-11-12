// T301: rendered hero position is the prev -> cur lerp with the loop's alpha, so a constant-speed
// hero moves by (almost) the same distance every rendered frame at any display rate. The camera
// pose uses the same alpha (game.ts onRender), so this covers both.
import { describe, expect, it } from 'vitest';
import { Accumulator } from '../../src/app/loop';

const FIXED_HZ = 60;
const SPEED = 6; // m/s

function renderedDeltas(displayHz: number, seconds: number): number[] {
  const acc = new Accumulator(1 / FIXED_HZ);
  let prev = 0;
  let cur = 0;
  let last = Number.NaN;
  const deltas: number[] = [];
  const frames = Math.round(seconds * displayHz);
  for (let f = 0; f < frames; f++) {
    const n = acc.feed(1 / displayHz);
    for (let i = 0; i < n; i++) {
      prev = cur;
      cur += SPEED / FIXED_HZ;
    }
    const shown = prev + (cur - prev) * acc.alpha;
    if (!Number.isNaN(last)) deltas.push(shown - last);
    last = shown;
  }
  return deltas;
}

describe('interpolated hero motion (T301)', () => {
  it.each([30, 60, 120, 144])('moves evenly at %i Hz', (hz) => {
    const d = renderedDeltas(hz, 2).slice(8); // skip the start-up frames
    const expected = SPEED / hz;
    for (const x of d) {
      expect(x).toBeGreaterThanOrEqual(0); // never steps backwards
      // 1 ms of travel is the visible-stutter threshold at this speed.
      expect(Math.abs(x - expected)).toBeLessThan(SPEED * 0.001 + expected * 0.02);
    }
  });
});
