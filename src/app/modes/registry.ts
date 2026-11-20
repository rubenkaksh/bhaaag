// Game-mode registry (ADR 0017): a mode is one `GameModeDef` plus one line in MODE_DEFS.
// `GameMode` (mode.ts) stays the internal play-key union that selects tuning, best key and HUD flags;
// a def maps a lobby mode + level onto it. Pure: no canvas, three or DOM, so rules are unit-testable.
import { BEST_KEYS } from './mode';
import type { GameMode } from './mode';
import { classicLevels, playKey } from './levels';
import type { LevelEntry, Selection } from './levels';

export interface RunResult {
  /** Best value after this run (unchanged when `record` is false). */
  best: number;
  /** True when this run beat the previous best and must be stored. */
  record: boolean;
}

/** Pure scoring seam: no game state, so a mode's rules run over plain numbers in tests. */
export interface ModeRules {
  /** Finish a run with its value (seconds for timed modes, points for score modes). */
  onFinish(value: number, prevBest: number): RunResult;
}

/** Timed rules (Classic): lower is better; 0 = no best yet. */
export const TIMED_RULES: ModeRules = {
  onFinish: (value, prevBest) =>
    prevBest === 0 || value < prevBest
      ? { best: value, record: true }
      : { best: prevBest, record: false },
};

/** Score rules (Dragon Chase): higher is better. */
export const SCORE_RULES: ModeRules = {
  onFinish: (value, prevBest) =>
    value > prevBest ? { best: value, record: true } : { best: prevBest, record: false },
};

export interface GameModeDef {
  id: string;
  label: string;
  /** false hides the mode from the lobby only; legacy URLs and ?mode= still resolve. */
  enabled: boolean;
  /** The mode's lobby level row (empty = no level row). */
  levels(hasLocalBuilder: boolean): LevelEntry[];
  /** Storage key of the best value for one of this mode's play keys. */
  bestKey(key: GameMode): string;
  /** Map a selection (mode + level) to the internal play key. */
  playKey(sel: Selection, levels: readonly LevelEntry[]): GameMode;
  rules: ModeRules;
}

const bestKey = (key: GameMode): string => BEST_KEYS[key];

const classic: GameModeDef = {
  id: 'classic',
  label: 'Classic',
  enabled: true,
  levels: classicLevels,
  bestKey,
  playKey,
  rules: TIMED_RULES,
};

const chase: GameModeDef = {
  id: 'chase',
  label: 'Dragon Chase',
  enabled: true,
  levels: () => [],
  bestKey,
  playKey,
  rules: SCORE_RULES,
};

/** Add a mode: write one `GameModeDef` and list it here (docs/how-to-add-a-mode.md). */
export const MODE_DEFS: readonly GameModeDef[] = [classic, chase];

/** Every mode id, enabled or not (URL and saved-choice parsing). */
export const MODE_IDS: readonly string[] = MODE_DEFS.map((d) => d.id);

/** The modes the lobby shows. */
export function lobbyModes(defs: readonly GameModeDef[] = MODE_DEFS): GameModeDef[] {
  return defs.filter((d) => d.enabled);
}

/** The def with this id; unknown ids fall back to the first (Classic). A play key equal to a mode id (`chase`) finds that mode. */
const defOf = (id: string): GameModeDef => MODE_DEFS.find((d) => d.id === id) ?? MODE_DEFS[0];

export const rulesForKey = (key: GameMode): ModeRules => defOf(key).rules;

/** Play key for a selection, through the selected mode's def. */
export const resolvePlayKey = (
  sel: Selection,
  levels: readonly LevelEntry[] = classicLevels(true),
): GameMode => defOf(sel.mode).playKey(sel, levels);

/** Storage key of the best value for a play key, through its mode def (existing keys unchanged). */
export const bestKeyFor = (key: GameMode): string => defOf(key).bestKey(key);

/** Stored best for a play key; 0 = none (also when storage is blocked). */
export function loadBest(key: GameMode, store?: Pick<Storage, 'getItem'>): number {
  try {
    const raw = store?.getItem(bestKeyFor(key));
    const v = raw === null || raw === undefined ? 0 : Number(raw);
    return Number.isFinite(v) && v > 0 ? v : 0;
  } catch {
    return 0;
  }
}

export function saveBest(key: GameMode, v: number, store?: Pick<Storage, 'setItem'>): void {
  try {
    store?.setItem(bestKeyFor(key), String(v));
  } catch {
    // Blocked storage: the best just is not kept.
  }
}
