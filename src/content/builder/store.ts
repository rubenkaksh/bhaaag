// Hand-off between the builder page and the game (ADR 0014, 0016): the builder drops the compiled level
// in localStorage and opens ?level=builder (Classic's "My level"). Guarded for blocked storage.
// Imports nothing from the builder so game.ts pulls in no builder code (dead-code-eliminated in prod).
import type { LevelJson } from '../load';
import { loadWorldFromObject } from '../load';

export const PLAY_KEY = 'bhaaag.builder.play';

export function savePlayLevel(compiled: LevelJson): boolean {
  try {
    localStorage.setItem(PLAY_KEY, JSON.stringify(compiled));
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
