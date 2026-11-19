// cfgHash (leaderboards plan section 7): ties a leaderboard time to the exact sim + level + timing tuning
// it was set on, so a changed config never mixes with old times. Boards query only the current hash.
import type { Tuning } from '../core/config';

/** Bump by hand whenever core physics change in a way the tuning keys do not capture. */
export const SIM_VERSION = 1;

/** Tuning sections that change how fast or how far the hero goes. aim, camera, validator, assist and chase do not. */
const HASHED_SECTIONS = [
  'physics', 'rope', 'release', 'landing', 'wall', 'roof', 'hero', 'line', 'tramp',
  'cushion', 'climb', 'vault', 'slide', 'parkour', 'hazard',
] as const;

function canonical(v: unknown): string {
  if (Array.isArray(v)) return '[' + v.map(canonical).join(',') + ']';
  if (typeof v === 'object' && v !== null) {
    const o = v as Record<string, unknown>;
    return '{' + Object.keys(o).sort().map((k) => JSON.stringify(k) + ':' + canonical(o[k])).join(',') + '}';
  }
  return JSON.stringify(v);
}

/** Canonical JSON that gets hashed; exported so tests and the publish step can show it. */
export function cfgHashInput(level: string, levelVersion: number, tuning: Tuning): string {
  const t = tuning as unknown as Record<string, unknown>;
  const picked: Record<string, unknown> = { fixedHz: t.fixedHz };
  for (const k of HASHED_SECTIONS) picked[k] = t[k];
  return canonical({ simVersion: SIM_VERSION, level, levelVersion, tuning: picked });
}

/** First 16 hex chars of SHA-256 over cfgHashInput. */
export async function cfgHash(level: string, levelVersion: number, tuning: Tuning): Promise<string> {
  const bytes = new TextEncoder().encode(cfgHashInput(level, levelVersion, tuning));
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  return Array.from(new Uint8Array(digest).subarray(0, 8), (b) => b.toString(16).padStart(2, '0')).join('');
}
