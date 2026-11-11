import { describe, expect, it } from 'vitest';
import {
  BRAKE_HOLD_MS,
  CLIMB_HOLD_MS,
  TAP_GAP_MS,
  TAP_MAX_MS,
  TapTracker,
} from '../../src/adapters/input/tapGesture';

function tap(t: TapTracker, at: number, dur = 80): number {
  t.press(at);
  t.release(at + dur);
  return at + dur;
}

describe('TapTracker', () => {
  it('single tap resolves after the gap, not before', () => {
    const t = new TapTracker();
    const up = tap(t, 0);
    expect(t.poll(up + TAP_GAP_MS - 1)).toBe(0);
    expect(t.poll(up + TAP_GAP_MS)).toBe(1);
    expect(t.poll(up + TAP_GAP_MS + 500)).toBe(0); // consumed once
  });

  it('double tap inside the gap counts 2', () => {
    const t = new TapTracker();
    const up1 = tap(t, 0);
    const up2 = tap(t, up1 + TAP_GAP_MS - 20);
    expect(t.poll(up2 + 10)).toBe(0);
    expect(t.poll(up2 + TAP_GAP_MS)).toBe(2);
  });

  it('second tap after the gap is a new sequence', () => {
    const t = new TapTracker();
    const up1 = tap(t, 0);
    expect(t.poll(up1 + TAP_GAP_MS)).toBe(1);
    const up2 = tap(t, up1 + TAP_GAP_MS + 50);
    expect(t.poll(up2 + TAP_GAP_MS)).toBe(1);
  });

  it('triple tap resolves at once and caps at 3', () => {
    const t = new TapTracker();
    let up = tap(t, 0);
    up = tap(t, up + 50);
    up = tap(t, up + 50);
    expect(t.poll(up)).toBe(3);
    expect(t.poll(up + 1000)).toBe(0);
    up = tap(t, up + 60); // a fourth quick tap starts a fresh sequence
    expect(t.poll(up + TAP_GAP_MS)).toBe(1);
  });

  it('a press longer than TAP_MAX_MS is a hold, not a tap, and breaks the sequence', () => {
    const t = new TapTracker();
    const up1 = tap(t, 0);
    t.press(up1 + 50);
    t.release(up1 + 50 + TAP_MAX_MS + 1);
    expect(t.poll(up1 + 5000)).toBe(0);
  });

  it('hold threshold: not holding before, holding at the threshold', () => {
    const t = new TapTracker();
    t.press(1000);
    expect(t.holding(1000 + BRAKE_HOLD_MS - 1, BRAKE_HOLD_MS)).toBe(false);
    expect(t.holding(1000 + BRAKE_HOLD_MS, BRAKE_HOLD_MS)).toBe(true);
    expect(t.holding(1000 + CLIMB_HOLD_MS - 1, CLIMB_HOLD_MS)).toBe(false);
    expect(t.holding(1000 + CLIMB_HOLD_MS, CLIMB_HOLD_MS)).toBe(true);
    t.release(1000 + CLIMB_HOLD_MS);
    expect(t.holding(1000 + CLIMB_HOLD_MS + 50, BRAKE_HOLD_MS)).toBe(false);
  });

  it('release returns the press duration (-1 when no press was live)', () => {
    const t = new TapTracker();
    expect(t.release(5)).toBe(-1);
    t.press(10);
    expect(t.release(130)).toBe(120);
  });

  it('cancel drops the hold and clears pending taps', () => {
    const t = new TapTracker();
    const up = tap(t, 0);
    t.press(up + 30);
    t.cancel();
    expect(t.isDown()).toBe(false);
    expect(t.holding(up + 2000, BRAKE_HOLD_MS)).toBe(false);
    expect(t.poll(up + 2000)).toBe(0);
    expect(t.release(up + 2100)).toBe(-1);
  });

  it('no tap resolves while a finger is down mid-sequence', () => {
    const t = new TapTracker();
    const up = tap(t, 0);
    t.press(up + TAP_GAP_MS - 10);
    expect(t.poll(up + TAP_GAP_MS + 100)).toBe(0);
  });
});
