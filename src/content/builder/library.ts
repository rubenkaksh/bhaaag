// Saved builder levels (localStorage). Each entry keeps the editable source, the compiled LevelJson and a
// `visible` flag: visible levels are listed in Classic's level row, hidden ones stay builder-only.
// Imports no builder runtime code (types only), so the game bundle stays free of it.
import type { LevelJson } from '../load';
import { loadWorldFromObject } from '../load';
import type { BuilderLevel } from './format';

export const LIBRARY_KEY = 'bhaaag.builder.library';
export const LIBRARY_PREFIX = 'l:';

export interface LibraryEntry {
  id: string;
  name: string;
  visible: boolean;
  updated: number;
  source: BuilderLevel;
  compiled: LevelJson;
}
export type LibraryMeta = Pick<LibraryEntry, 'id' | 'name' | 'visible'>;

type Store = Pick<Storage, 'getItem' | 'setItem'>;

function defaultStore(): Store | undefined {
  try {
    return typeof localStorage === 'undefined' ? undefined : localStorage;
  } catch {
    return undefined;
  }
}

function isEntry(v: unknown): v is LibraryEntry {
  if (typeof v !== 'object' || v === null) return false;
  const e = v as Record<string, unknown>;
  return (
    typeof e.id === 'string' &&
    typeof e.name === 'string' &&
    typeof e.visible === 'boolean' &&
    typeof e.updated === 'number' &&
    typeof e.source === 'object' &&
    e.source !== null &&
    typeof e.compiled === 'object' &&
    e.compiled !== null
  );
}

/** All saved entries, oldest first; a corrupt store reads as empty. */
export function readLibrary(store: Store | undefined = defaultStore()): LibraryEntry[] {
  try {
    const raw = store?.getItem(LIBRARY_KEY) ?? null;
    if (raw === null) return [];
    const v: unknown = JSON.parse(raw);
    return Array.isArray(v) ? v.filter(isEntry) : [];
  } catch {
    return [];
  }
}

function write(items: LibraryEntry[], store: Store | undefined): boolean {
  try {
    if (store === undefined) return false;
    store.setItem(LIBRARY_KEY, JSON.stringify(items));
    return true;
  } catch {
    return false;
  }
}

/** Save or replace (by id). A new entry is hidden; replacing keeps the existing visible flag. */
export function saveToLibrary(
  source: BuilderLevel,
  compiled: LevelJson,
  store: Store | undefined = defaultStore(),
  now: number = Date.now(),
): boolean {
  const items = readLibrary(store);
  const i = items.findIndex((e) => e.id === source.id);
  const entry: LibraryEntry = {
    id: source.id,
    name: source.name,
    visible: i >= 0 ? items[i].visible : false,
    updated: now,
    source,
    compiled,
  };
  if (i >= 0) items[i] = entry;
  else items.push(entry);
  return write(items, store);
}

export function setLibraryVisible(
  id: string,
  visible: boolean,
  store: Store | undefined = defaultStore(),
): boolean {
  const items = readLibrary(store);
  const e = items.find((x) => x.id === id);
  if (e === undefined) return false;
  e.visible = visible;
  return write(items, store);
}

export function removeFromLibrary(id: string, store: Store | undefined = defaultStore()): boolean {
  return write(
    readLibrary(store).filter((e) => e.id !== id),
    store,
  );
}

/** Visible levels only: what the lobby lists. */
export function visibleLibrary(store: Store | undefined = defaultStore()): LibraryMeta[] {
  return readLibrary(store)
    .filter((e) => e.visible)
    .map(({ id, name, visible }) => ({ id, name, visible }));
}

/** The compiled level for a lobby id `l:<id>`, schema-checked; null when absent, hidden or corrupt. */
export function readLibraryLevel(
  lobbyId: string,
  store: Store | undefined = defaultStore(),
): LevelJson | null {
  if (!lobbyId.startsWith(LIBRARY_PREFIX)) return null;
  const e = readLibrary(store).find((x) => x.id === lobbyId.slice(LIBRARY_PREFIX.length));
  if (e === undefined || !e.visible) return null;
  try {
    loadWorldFromObject(e.compiled);
    return e.compiled;
  } catch {
    return null;
  }
}

/** The editable source of a visible saved level (lobby id `l:<id>`), or null. */
export function readLibrarySource(
  lobbyId: string,
  store: Store | undefined = defaultStore(),
): BuilderLevel | null {
  if (!lobbyId.startsWith(LIBRARY_PREFIX)) return null;
  const e = readLibrary(store).find((x) => x.id === lobbyId.slice(LIBRARY_PREFIX.length));
  return e === undefined || !e.visible ? null : e.source;
}
