// Hand-off between the builder page and the game (ADR 0013): the builder drops the compiled level
// in localStorage and opens ?mode=strategy&level=builder. Dev builds only; guarded for blocked storage.
// Imports nothing from the builder so game.ts pulls in no builder code (dead-code-eliminated in prod).
import type { LevelJson } from '../load';

export const PLAY_KEY = 'bhaaag.builder.play';

export function savePlayLevel(compiled: LevelJson): boolean {
  try {
    localStorage.setItem(PLAY_KEY, JSON.stringify(compiled));
    return true;
  } catch {
    return false;
  }
}

/** The builder's compiled level when the URL asks for it (`?level=builder`), else null. */
export function builderPlayLevel(params: URLSearchParams): LevelJson | null {
  if (!import.meta.env.DEV || params.get('level') !== 'builder') return null;
  try {
    const raw = localStorage.getItem(PLAY_KEY);
    return raw === null ? null : (JSON.parse(raw) as LevelJson);
  } catch {
    return null;
  }
}
