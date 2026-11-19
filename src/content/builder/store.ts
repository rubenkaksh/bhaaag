// Hand-off between the builder page and the game (ADR 0014, 0016): the builder drops the compiled level
// in localStorage and opens ?level=builder (Classic's "My level"). Guarded for blocked storage.
// Imports nothing from the builder so game.ts pulls in no builder code (dead-code-eliminated in prod).
import type { LevelJson } from '../load';
import { loadWorldFromObject } from '../load';

export const PLAY_KEY = 'bhaaag.builder.play';

export const PLAY_SRC_KEY = 'bhaaag.builder.play.src';

/** `source` (the builder JSON text) lets the game dress the level like Nagarkot; without it the level plays plain. */
export function savePlayLevel(compiled: LevelJson, source?: string): boolean {
  try {
    localStorage.setItem(PLAY_KEY, JSON.stringify(compiled));
    // A source left from an earlier level would dress the wrong houses: always overwrite it.
    localStorage.setItem(PLAY_SRC_KEY, source ?? '');
    return true;
  } catch {
    return false;
  }
}

/** The builder's last compiled level, or null (none saved, blocked storage, corrupt JSON). */
export function readLocalBuilderLevel(): LevelJson | null {
  try {
    const raw = localStorage.getItem(PLAY_KEY);
    if (raw === null) return null;
    const v: unknown = JSON.parse(raw);
    if (typeof v !== 'object' || v === null) return null;
    loadWorldFromObject(v); // schema check: a stale or corrupt entry must not reach startGame
    return v as LevelJson;
  } catch {
    return null;
  }
}

export function hasLocalBuilderLevel(): boolean {
  return readLocalBuilderLevel() !== null;
}

/** The builder source text saved with the play level, or null. Parsed later in the builder chunk. */
export function readLocalBuilderSource(): string | null {
  try {
    const t = localStorage.getItem(PLAY_SRC_KEY);
    return t === null || t === '' ? null : t;
  } catch {
    return null;
  }
}
