import { describe, expect, it } from 'vitest';
import { AXIS_MAX, BTN_JUMP, BTN_RESTART, newInputFrame } from '../../src/core/input';
import { RunClock, isGameplayInput } from '../../src/app/runClock';
import { finishRun } from '../../src/app/finish';
import { createLocalLeaderboard } from '../../src/app/leaderboard';
import type { LeaderboardPort } from '../../src/app/leaderboard';
import { formatRunTime } from '../../src/adapters/ui/hud';
import { BEST_KEYS } from '../../src/app/modes/mode';

const mem = (): Storage & { data: Map<string, string> } => {
  const data = new Map<string, string>();
  return {
    data,
    getItem: (k: string) => data.get(k) ?? null,
    setItem: (k: string, v: string) => void data.set(k, v),
  } as unknown as Storage & { data: Map<string, string> };
};
const idle = newInputFrame();
const move = (): ReturnType<typeof newInputFrame> => {
  const f = newInputFrame();
  f.moveY = AXIS_MAX;
  return f;
};
const run = (clock: RunClock, planning: number, moving: number): void => {
  for (let i = 0; i < planning; i++) clock.tick(idle);
  clock.tick(move());
  for (let i = 1; i < moving; i++) clock.tick(idle);
};

describe('RunClock', () => {
  it('time = ticks/60 from the first input; planning excluded', () => {
    const c = new RunClock(60);
    run(c, 90, 120);
    expect(c.offsetTicks).toBe(90);
    expect(c.runTicks).toBe(120);
    expect(c.seconds).toBe(2);
  });
  it('is 0 until first input; camera drag and restart bit are not input', () => {
    const c = new RunClock(60);
    const look = newInputFrame();
    look.lookYaw = 50;
    look.pressed = BTN_RESTART;
    const small = newInputFrame();
    small.moveX = Math.round(0.1 * AXIS_MAX);
    for (const f of [look, small, idle]) c.tick(f);
    expect(c.started).toBe(false);
    expect(c.seconds).toBe(0);
    expect(formatRunTime(c.seconds)).toBe('0.00');
    const j = newInputFrame();
    j.pressed = BTN_JUMP;
    expect(isGameplayInput(j)).toBe(true);
  });
  it('reset clears both counters', () => {
    const c = new RunClock(60);
    run(c, 5, 10);
    c.reset();
    expect(c.ticks).toBe(0);
    expect(c.firstInputTick).toBe(-1);
  });
});

describe('finishRun with a port fake', () => {
  it('submits ms and offset, updates best only when faster', () => {
    const calls: [string, number, number][] = [];
    const port: LeaderboardPort = {
      submit: (l, ms, o) => void calls.push([l, ms, o]),
      top: () => [],
    };
    const store = mem();
    const c = new RunClock(60);
    run(c, 30, 600);
    const a = finishRun('classic', c, 0, port, store);
    expect(a).toEqual({ seconds: 10, best: 10, record: true });
    expect(calls).toEqual([['classic', 10000, 30]]);
    expect(store.data.get(BEST_KEYS.classic)).toBe('10');
    const slow = new RunClock(60);
    run(slow, 0, 900);
    expect(finishRun('classic', slow, 10, port, store).record).toBe(false);
    expect(store.data.get(BEST_KEYS.classic)).toBe('10');
    const fast = new RunClock(60);
    run(fast, 0, 300);
    expect(finishRun('classic', fast, 10, port, store).best).toBe(5);
    expect(store.data.get(BEST_KEYS.classic)).toBe('5');
    expect(calls.length).toBe(3);
  });
  it('a run with no input records nothing', () => {
    const calls: unknown[] = [];
    const c = new RunClock(60);
    c.tick(idle);
    const r = finishRun('classic', c, 0, { submit: () => void calls.push(1), top: () => [] });
    expect(r.record).toBe(false);
    expect(calls).toEqual([]);
  });
});

describe('local leaderboard', () => {
  it('keeps fastest first and survives bad storage', () => {
    const store = mem();
    const lb = createLocalLeaderboard(store, () => 1);
    lb.submit('classic', 9000, 10);
    lb.submit('classic', 7000, 0);
    lb.submit('other', 1000, 0);
    expect(lb.top('classic', 5).map((e) => e.ms)).toEqual([7000, 9000]);
    expect(lb.top('classic', 1).length).toBe(1);
    store.setItem('bhagdori.lb.bad', '{nope');
    expect(lb.top('bad', 3)).toEqual([]);
  });
});
