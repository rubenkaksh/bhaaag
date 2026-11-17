// Two public modes (ADR 0016): Classic (finite levels) and Dragon Chase (endless). A Classic level is
// data; `playKey` maps (mode, level) to the internal GameMode that selects tuning, best key and HUD flags.
import { GRAPH_LEVELS } from '../../content/graph/registry';
import { shippedBuilderLevels } from '../../content/builder/shipped';
import type { GameMode } from './mode';

export type Mode = 'classic' | 'chase';
export const MODES: readonly Mode[] = ['classic', 'chase'];
export const MODE_LABEL: Record<Mode, string> = { classic: 'Classic', chase: 'Dragon Chase' };

export interface LevelEntry {
  id: string;
  label: string;
  key: GameMode;
  /** 'local' = the builder's last Play level (localStorage), 'shipped' = content/builders file. */
  builder?: 'local' | 'shipped';
}

export const LOCAL_BUILDER_ID = 'builder';
export const DEFAULT_LEVEL = 'l1';

const BASE_LEVELS: readonly LevelEntry[] = [
  { id: DEFAULT_LEVEL, label: 'Descent', key: 'classic' },
  ...GRAPH_LEVELS.map((g): LevelEntry => ({ id: g.id, label: g.label, key: `g:${g.id}` })),
  { id: 'nagarkot', label: 'Nagarkot Run', key: 'strategy' },
  { id: 'village', label: 'Cloud Village', key: 'village' },
];

/** Classic's levels: the built-in ones, shipped builder levels, then the local builder level when present. */
export function classicLevels(hasLocalBuilder = false): LevelEntry[] {
  const out: LevelEntry[] = [...BASE_LEVELS];
  for (const b of shippedBuilderLevels()) {
    out.push({ id: 'b:' + b.id, label: b.name, key: 'strategy', builder: 'shipped' });
  }
  if (hasLocalBuilder) {
    out.push({ id: LOCAL_BUILDER_ID, label: 'My level', key: 'strategy', builder: 'local' });
  }
  return out;
}

export interface Selection {
  mode: Mode;
  level: string;
}

export function playKey(sel: Selection, levels: readonly LevelEntry[] = classicLevels(true)): GameMode {
  if (sel.mode === 'chase') return 'chase';
  return (levels.find((l) => l.id === sel.level) ?? levels[0]).key;
}

/** Old `?mode=` values (strategy, village, g:<id>) are a Classic level now. */
export function legacyLevel(modeParam: string | null): string | null {
  if (modeParam === null) return null;
  if (modeParam === 'strategy') return 'nagarkot';
  if (modeParam === 'village') return 'village';
  if (modeParam.startsWith('g:')) return modeParam.slice(2);
  return null;
}

export const LEVEL_KEY = 'zt.level';
export const MODE_STORE_KEY = 'zt.mode2';
type Store = Pick<Storage, 'getItem' | 'setItem'>;

function defaultStore(): Store | undefined {
  try {
    return typeof localStorage === 'undefined' ? undefined : localStorage;
  } catch {
    return undefined;
  }
}

/** URL (?mode, ?level) beats the saved choice, which beats Classic / the default level. */
export function loadSelection(
  q: URLSearchParams,
  levels: readonly LevelEntry[],
  store: Store | undefined = defaultStore(),
): Selection {
  const get = (k: string): string | null => {
    try {
      return store?.getItem(k) ?? null;
    } catch {
      return null;
    }
  };
  const known = (id: string | null): id is string => id !== null && levels.some((l) => l.id === id);
  const m = q.get('mode');
  const legacy = legacyLevel(m);
  const mode: Mode =
    m === 'chase' || m === 'classic'
      ? m
      : legacy !== null
        ? 'classic'
        : get(MODE_STORE_KEY) === 'chase'
          ? 'chase'
          : 'classic';
  const wanted = q.get('level') ?? legacy ?? get(LEVEL_KEY);
  return { mode, level: known(wanted) ? wanted : DEFAULT_LEVEL };
}

export function saveSelection(sel: Selection, store: Store | undefined = defaultStore()): void {
  try {
    store?.setItem(MODE_STORE_KEY, sel.mode);
    store?.setItem(LEVEL_KEY, sel.level);
  } catch {
    // Blocked storage: the choice is simply not remembered.
  }
}
