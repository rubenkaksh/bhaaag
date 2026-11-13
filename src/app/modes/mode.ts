// Game modes (three-track plan D1): Classic (the L1 descent), Dragon Chase (score mode) and
// Nagarkot Run (strategy maze, ADR 0011; timed like Classic) and Cloud Village (one hand-placed
// level above a cloud sea, amendment 2026-11-12; timed like Classic).
// Pure helpers plus localStorage persistence; every storage access is guarded (private mode).

import { GRAPH_LEVELS } from '../../content/graph/registry';

export type GameMode = 'classic' | 'chase' | 'strategy' | 'village' | `g:${string}`;
const BASE_MODES = ['classic', 'chase', 'strategy', 'village'] as const;
/** The four fixed modes, then one `g:<id>` entry per registered graph level (ADR 0013 section 3.5). */
export const GAME_MODES: readonly GameMode[] = [
  ...BASE_MODES,
  ...GRAPH_LEVELS.map((g): GameMode => `g:${g.id}`),
];
export function isGraphMode(m: GameMode): boolean {
  return m.startsWith('g:');
}
export function graphIdOf(m: GameMode): string {
  return m.slice(2);
}
export const MODE_KEY = 'zt.mode';
const AIM_HINT = 'Aim at a glowing anchor and hook';
/** Per-mode UI text and flags: label, in-play hint, and whether the HOP chip is shown. */
type ModeInfo = { label: string; hint: string; hopChip: boolean };
const GRAPH_HINT = 'Run, vault, grab: find the way down';
export const MODE_INFO: Record<GameMode, ModeInfo> = {
  classic: { label: 'Classic', hint: AIM_HINT, hopChip: true },
  chase: { label: 'Dragon Chase', hint: AIM_HINT, hopChip: true },
  strategy: { label: 'Nagarkot Run', hint: 'Stand on a gold pad and press Hook', hopChip: false },
  village: { label: 'Cloud Village', hint: AIM_HINT, hopChip: true },
};
export const BEST_KEYS: Record<GameMode, string> = {
  classic: 'bhagdori.best.l1',
  chase: 'bhagdori.best.chase',
  strategy: 'bhagdori.best.strategy',
  village: 'bhagdori.best.village',
};
for (const g of GRAPH_LEVELS) {
  MODE_INFO[`g:${g.id}`] = { label: g.label, hint: GRAPH_HINT, hopChip: false };
  BEST_KEYS[`g:${g.id}`] = `bhagdori.best.g.${g.id}`;
}

export type ModeStore = Pick<Storage, 'getItem' | 'setItem'>;

function defaultStore(): ModeStore | undefined {
  try {
    return typeof localStorage === 'undefined' ? undefined : localStorage;
  } catch {
    return undefined;
  }
}

export function parseMode(v: unknown): GameMode | null {
  return typeof v === 'string' && (GAME_MODES as readonly string[]).includes(v)
    ? (v as GameMode)
    : null;
}

/** ?mode= override beats the saved mode, which beats 'classic'. */
export function loadMode(
  store: ModeStore | undefined = defaultStore(),
  override?: unknown,
): GameMode {
  const o = parseMode(override);
  if (o !== null) return o;
  try {
    return parseMode(store?.getItem(MODE_KEY)) ?? 'classic';
  } catch {
    return 'classic';
  }
}

export function saveMode(m: GameMode, store: ModeStore | undefined = defaultStore()): void {
  try {
    store?.setItem(MODE_KEY, m);
  } catch {
    // Blocked storage: the mode just is not remembered.
  }
}

/** Best value for a mode (seconds for classic and strategy, points for chase); 0 = none. */
export function readBest(m: GameMode, store: ModeStore | undefined = defaultStore()): number {
  try {
    const raw = store?.getItem(BEST_KEYS[m]);
    if (raw === null || raw === undefined) return 0;
    const v = Number(raw);
    return Number.isFinite(v) && v > 0 ? v : 0;
  } catch {
    return 0;
  }
}

export function writeBest(
  m: GameMode,
  v: number,
  store: ModeStore | undefined = defaultStore(),
): void {
  try {
    store?.setItem(BEST_KEYS[m], String(v));
  } catch {
    // Blocked storage: the best just is not kept.
  }
}

function formatTime(sec: number): string {
  const t = Math.max(0, sec);
  const m = Math.floor(t / 60);
  const s = t - m * 60;
  return m + ':' + (s < 10 ? '0' : '') + s.toFixed(1);
}

export function bestLabel(m: GameMode, v: number): string {
  if (m !== 'chase') return v > 0 ? 'Best time ' + formatTime(v) : 'No best time yet';
  return v > 0 ? 'Best score ' + Math.floor(v) : 'No best score yet';
}
