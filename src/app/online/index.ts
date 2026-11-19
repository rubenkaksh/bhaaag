// Online leaderboard client (L3, docs/plans/leaderboards-friends.md). Lazy chunk: reached only through
// `await import('./online')` from boardPanel.ts. Plain fetch to Supabase REST, no SDK (the SDK arrives with
// login in a later milestone). Every call has a timeout and never throws: failure means "no online result".
import l1 from '../../../content/levels/l1.json';
import { cfgHash } from '../cfgHash';
import type { ModeStore } from '../modes/mode';
import { rowsToOverrides } from '../remoteConfig';
import { resolveCfg } from '../tuning';
import type { TuningWarn } from '../tuningOverrides';

export const PLAYER_KEY = 'bhagdori.player';
/** An invite code from `?friend=CODE`, kept until it can be redeemed (needs a named player). */
export const PENDING_KEY = 'bhagdori.pendingFriend';
const CODE_RE = /^[A-Za-z2-9]{8}$/;
const TIMEOUT_MS = 3000;
/** Remote config is read while the lobby shows and PLAY may wait for it, so it gets a shorter budget. */
const CONFIG_TIMEOUT_MS = 1500;

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

export interface FriendRow extends BoardRow {
  me: boolean;
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

  const call = async (path: string, init?: RequestInit, ms = TIMEOUT_MS): Promise<unknown> => {
    const ctl = new AbortController();
    const timer = setTimeout(() => ctl.abort(), ms);
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

  const rpc = (fn: string, args: object, ms?: number): Promise<unknown> =>
    call(`/rpc/${fn}`, { method: 'POST', body: JSON.stringify(args) }, ms);
  const creds = (p: Player) => ({ p_player_id: p.id, p_secret: p.secret });
  let notice: string | null = null;

  /** Registers the player on the server (idempotent) and returns their invite code. */
  const ensure = async (p: Player): Promise<string | null> => {
    const code = await rpc('ensure_player', { ...creds(p), p_name: p.name });
    return typeof code === 'string' ? code : null;
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
    /** Remembers an invite code from a URL query (`?friend=CODE`). True if one was found. */
    stashFriendCode(search: string): boolean {
      const code = new URLSearchParams(search).get('friend');
      if (!code || !CODE_RE.test(code) || !store) return false;
      try {
        store.setItem(PENDING_KEY, code.toUpperCase());
        return true;
      } catch {
        return false;
      }
    },
    /** Redeems a stashed invite once there is a player. Returns the new friend's name; null when nothing to do, unknown code or offline (an offline attempt stays stashed). */
    async redeemPending(): Promise<string | null> {
      const p = loadPlayer();
      const code = store?.getItem(PENDING_KEY);
      if (!p || !code || !store) return null;
      if ((await ensure(p)) === null) return null;
      const name = await rpc('redeem_invite', { ...creds(p), p_code: code });
      if (typeof name !== 'string') return null;
      try {
        store.setItem(PENDING_KEY, '');
      } catch {
        /* storage blocked: the code is redeemed again next time, which is harmless (idempotent) */
      }
      if (name === '') return null;
      notice = name;
      return name;
    },
    /** The name of a friend added this session that the UI has not shown yet. */
    takeNotice(): string | null {
      const n = notice;
      notice = null;
      return n;
    },
    /** The shareable link for this player, or null when offline or no player. */
    async inviteLink(): Promise<string | null> {
      const p = loadPlayer();
      const code = p ? await ensure(p) : null;
      if (code === null || typeof location === 'undefined') return null;
      return `${location.origin}${location.pathname}?friend=${code}`;
    },
    /** Deletes this player's data on the server, then the local identity. False (nothing local touched) if the server did not confirm. */
    async deleteMyData(): Promise<boolean> {
      const p = loadPlayer();
      if (!p) return true;
      if ((await rpc('delete_my_data', creds(p))) !== true) return false;
      try {
        store?.setItem(PLAYER_KEY, '');
        store?.setItem(PENDING_KEY, '');
      } catch {
        /* blocked storage: nothing was there to clear */
      }
      return true;
    },
    /** Best Classic times of this player and their friends, fastest first. Empty on any failure. */
    async friendsTop(n: number): Promise<FriendRow[]> {
      const p = loadPlayer();
      if (!p) return [];
      const out = (await rpc('friends_board', {
        ...creds(p),
        p_mode: 'classic',
        p_level: 'l1',
        p_cfg_hash: await hash(),
        p_n: n,
      })) as { name: string; ticks: number; is_me: boolean }[] | null;
      return Array.isArray(out) ? out.map((r) => ({ name: r.name, ticks: r.ticks, me: r.is_me })) : [];
    },
    /** The clamped remote tuning overlay from `game_config`; undefined on any failure or when no row applies (defaults stay). */
    async config(warn?: TuningWarn): Promise<ReturnType<typeof rowsToOverrides>> {
      return rowsToOverrides(await call('/game_config?select=key,value', undefined, CONFIG_TIMEOUT_MS), warn);
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

/** Boot step: the remote tuning overlay for this build, or undefined (no Supabase config, failure, or no rows). */
export function remoteOverrides(warn?: TuningWarn): Promise<ReturnType<typeof rowsToOverrides>> {
  const online = appOnline();
  if (online === null) return Promise.resolve(undefined);
  if (typeof location !== 'undefined' && online.stashFriendCode(location.search)) {
    // Drop the code from the address bar so a reload or a re-share does not carry it.
    const u = new URL(location.href);
    u.searchParams.delete('friend');
    history.replaceState(null, '', u);
  }
  void online.redeemPending();
  return online.config(warn);
}
