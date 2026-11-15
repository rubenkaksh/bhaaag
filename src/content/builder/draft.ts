// Autosaved builder draft (localStorage), kept apart from store.ts so the game bundle stays free of it.
import { parseBuilderLevel } from './format';
import type { BuilderLevel } from './format';

export const DRAFT_KEY = 'bhaaag.builder.draft';

export function saveDraft(l: BuilderLevel): void {
  try {
    localStorage.setItem(DRAFT_KEY, JSON.stringify(l));
  } catch {
    // Blocked storage: the draft is simply not kept.
  }
}

export function loadDraft(): BuilderLevel | null {
  try {
    const raw = localStorage.getItem(DRAFT_KEY);
    return raw === null ? null : parseBuilderLevel(raw);
  } catch {
    return null;
  }
}
