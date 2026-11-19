// Online leaderboard client (L3, docs/plans/leaderboards-friends.md). Lazy chunk: reached only through
// `await import('./online')` from boardPanel.ts. Plain fetch to Supabase REST, no SDK (the SDK arrives with
// login in a later milestone). Every call has a timeout and never throws: failure means "no online result".
import l1 from '../../../content/levels/l1.json';
import { cfgHash } from '../cfgHash';
import type { ModeStore } from '../modes/mode';
import { resolveCfg } from '../tuning';

export const PLAYER_KEY = 'bhagdori.player';
const TIMEOUT_MS = 3000;

export interface OnlineConfig {
  url: string;
  key: string;
  fetch?: typeof fetch;
  store?: ModeStore;
  /** Resolves the hash that boards are keyed on; injectable for tests. */
  hash?: () => Promise<string>;
}

export interface BoardRow {
  name: string;
  ticks: number;
}

export interface SubmitResult {
  bestTicks: number;
  isNewBest: boolean;
}

interface Player {
  id: string;
  secret: string;
  name: string;
}

function defaultStore(): ModeStore | undefined {
  try {
    return typeof localStorage === 'undefined' ? undefined : localStorage;
  } catch {
    return undefined;
  }
}

function randomHex(bytes: number): string {
  return Array.from(crypto.getRandomValues(new Uint8Array(bytes)), (b) => b.toString(16).padStart(2, '0')).join('');
}

export function cleanName(raw: string): string | null {
  const n = raw.trim().replace(/\s+/g, ' ');
  // eslint-disable-next-line no-control-regex
  return n.length >= 3 && n.length <= 20 && !/[\u0000-\u001f\u007f]/.test(n) ? n : null;
}

export function createOnline(cfg: OnlineConfig) {
  const f = cfg.fetch ?? fetch;
  const store = cfg.store ?? defaultStore();
  const rest = cfg.url.replace(/\/$/, '') + '/rest/v1';
  const headers = { apikey: cfg.key, 'Content-Type': 'application/json' };
  const hash = cfg.hash ?? (() => cfgHash('l1', l1.version, resolveCfg('classic')));

  const call = async (path: string, init?: RequestInit): Promise<unknown> => {
    const ctl = new AbortController();
    const timer = setTimeout(() => ctl.abort(), TIMEOUT_MS);
    try {
      const res = await f(rest + path, { ...init, headers, signal: ctl.signal });
      return res.ok ? await res.json() : null;
    } catch {
      return null;
    } finally {
      clearTimeout(timer);
    }
  };

  const loadPlayer = (): Player | null => {
    try {
      const p = JSON.parse(store?.getItem(PLAYER_KEY) ?? 'null') as Player | null;
      return p && typeof p.id === 'string' && typeof p.secret === 'string' && cleanName(p.name ?? '') ? p : null;
    } catch {
      return null;
    }
  };

  return {
    hasPlayer: (): boolean => loadPlayer() !== null,
    playerName: (): string | null => loadPlayer()?.name ?? null,
    /** Saves the display name, creating the player id and secret on first use. False if the name is invalid or storage is blocked. */
    setPlayerName(raw: string): boolean {
      const name = cleanName(raw);
      if (!name || !store) return false;
      const prev = loadPlayer();
      const p: Player = prev ?? { id: crypto.randomUUID(), secret: randomHex(24), name };
      p.name = name;
      try {
        store.setItem(PLAYER_KEY, JSON.stringify(p));
        return true;
      } catch {
        return false;
      }
    },
    /** Posts one Classic run. Null when there is no player, no network, a timeout or a server rejection. */
    async submit(ticks: number): Promise<SubmitResult | null> {
      const p = loadPlayer();
      if (!p || !Number.isInteger(ticks) || ticks <= 0) return null;
      const out = (await call('/rpc/submit_run', {
        method: 'POST',
        body: JSON.stringify({
          p_player_id: p.id,
          p_secret: p.secret,
          p_name: p.name,
          p_mode: 'classic',
          p_level: 'l1',
          p_cfg_hash: await hash(),
          p_ticks: ticks,
        }),
      })) as { best_ticks: number; is_new_best: boolean }[] | null;
      const r = out?.[0];
      return r ? { bestTicks: r.best_ticks, isNewBest: r.is_new_best } : null;
    },
    /** Top `n` Classic times for the current config hash, fastest first. Empty on any failure. */
    async top(n: number): Promise<BoardRow[]> {
      const q = `/bests?mode=eq.classic&level=eq.l1&cfg_hash=eq.${await hash()}&select=ticks,players(display_name)&order=ticks.asc&limit=${n}`;
      const out = (await call(q)) as { ticks: number; players: { display_name: string } | null }[] | null;
      return Array.isArray(out) ? out.map((r) => ({ name: r.players?.display_name ?? '?', ticks: r.ticks })) : [];
    },
  };
}

export type Online = ReturnType<typeof createOnline>;

/** The app instance, or null when the build has no Supabase config (the game then stays purely local). */
export function appOnline(): Online | null {
  const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
  const key = import.meta.env.VITE_SUPABASE_KEY as string | undefined;
  return url && key ? createOnline({ url, key }) : null;
}
