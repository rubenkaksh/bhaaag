// Finish flow for timed modes (T339): clock -> rules -> best (via the registry's bestKey) -> port.
import type { GameMode, ModeStore } from './modes/mode';
import { rulesForKey, saveBest } from './modes/registry';
import type { RunClock } from './runClock';
import type { LeaderboardPort } from './leaderboard';

export interface FinishResult {
  seconds: number;
  best: number;
  record: boolean;
}

/** Score a finished run. A run with no counted ticks (no input) records nothing. */
export function finishRun(
  mode: GameMode,
  clock: RunClock,
  prevBest: number,
  port: LeaderboardPort,
  store?: ModeStore,
): FinishResult {
  const seconds = clock.seconds;
  if (clock.runTicks <= 0) return { seconds, best: prevBest, record: false };
  const res = rulesForKey(mode).onFinish(seconds, prevBest);
  if (res.record) saveBest(mode, res.best, store);
  port.submit(mode, Math.round((clock.runTicks * 1000) / 60), clock.offsetTicks);
  return { seconds, best: res.best, record: res.record };
}
