// Leaderboard port (T339). Local-storage implementation only; a network adapter (T338 plan,
// docs/plans/leaderboards-friends.md) will implement the same interface lazily. No replay trace.
import type { ModeStore } from './modes/mode';

export interface LeaderboardEntry {
  /** Run time in whole milliseconds (finish tick minus first-input tick). */
  ms: number;
  /** Planning ticks before the first input (anti-cheat context for a server). */
  offsetTicks: number;
  /** Epoch ms when submitted. */
  at: number;
}

export interface LeaderboardPort {
  submit(level: string, ms: number, offsetTicks: number): void;
  /** Best `n` entries for a level, fastest first. */
  top(level: string, n: number): LeaderboardEntry[];
}

const KEEP = 20;
export const lbKey = (level: string): string => 'bhagdori.lb.' + level;

function defaultStore(): ModeStore | undefined {
  try {
    return typeof localStorage === 'undefined' ? undefined : localStorage;
  } catch {
    return undefined;
  }
}

function isEntry(e: unknown): e is LeaderboardEntry {
  const o = e as LeaderboardEntry;
  return (
    typeof o === 'object' &&
    o !== null &&
    Number.isFinite(o.ms) &&
    o.ms > 0 &&
    Number.isFinite(o.offsetTicks) &&
    Number.isFinite(o.at)
  );
}

export function createLocalLeaderboard(
  store: ModeStore | undefined = defaultStore(),
  now: () => number = Date.now,
): LeaderboardPort {
  const load = (level: string): LeaderboardEntry[] => {
    try {
      const raw = store?.getItem(lbKey(level));
      const v: unknown = raw ? JSON.parse(raw) : [];
      return Array.isArray(v) ? v.filter(isEntry) : [];
    } catch {
      return [];
    }
  };
  return {
    submit(level, ms, offsetTicks) {
      if (!(ms > 0)) return;
      const all = load(level);
      all.push({ ms: Math.round(ms), offsetTicks: Math.round(offsetTicks), at: now() });
      all.sort((a, b) => a.ms - b.ms);
      try {
        store?.setItem(lbKey(level), JSON.stringify(all.slice(0, KEEP)));
      } catch {
        // Blocked storage: the entry is just not kept.
      }
    },
    top(level, n) {
      return load(level)
        .sort((a, b) => a.ms - b.ms)
        .slice(0, n);
    },
  };
}
