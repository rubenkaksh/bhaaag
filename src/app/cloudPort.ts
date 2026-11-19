// Mirrors Classic finishes to the online board (L3). Lives in the initial chunk, so it imports nothing
// from ./online statically: the lazy chunk loads only when a Classic run finishes and a player name exists.
import type { LeaderboardPort } from './leaderboard';

const PLAYER_KEY = 'bhagdori.player';

export function withCloud(
  local: LeaderboardPort,
  load: () => Promise<{ appOnline(): { submit(ticks: number): Promise<unknown> } | null }> = () => import('./online'),
  hasPlayer: () => boolean = () => {
    try {
      return typeof localStorage !== 'undefined' && localStorage.getItem(PLAYER_KEY) !== null;
    } catch {
      return false;
    }
  },
): LeaderboardPort {
  return {
    submit(level, ms, offsetTicks) {
      local.submit(level, ms, offsetTicks);
      if (level !== 'classic' || !(ms > 0) || !hasPlayer()) return;
      const ticks = Math.round((ms * 60) / 1000);
      void load()
        .then((m) => m.appOnline()?.submit(ticks))
        .catch(() => undefined);
    },
    top: (level, n) => local.top(level, n),
  };
}
