// Builder levels shipped with the game: every content/builders/*.builder.json, parsed and compiled on demand
// (ADR 0016). Empty until the owner adds files. A file that fails to parse or validate is skipped, never fatal.
import { compileLevel, validate } from './compile';
import { parseBuilderLevel } from './format';
import type { BuilderLevel } from './format';
import type { LevelJson } from '../load';

const files = import.meta.glob('../../../content/builders/*.builder.json', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>;

let cache: BuilderLevel[] | null = null;

export function shippedBuilderLevels(): readonly BuilderLevel[] {
  if (cache === null) {
    cache = [];
    for (const text of Object.values(files)) {
      try {
        const l = parseBuilderLevel(text);
        if (validate(l).ok) cache.push(l);
      } catch {
        // Bad file: leave it out of the level row.
      }
    }
  }
  return cache;
}

export function compileShipped(id: string): LevelJson | null {
  const l = shippedBuilderLevels().find((x) => x.id === id);
  return l === undefined ? null : compileLevel(l);
}

export function shippedSource(id: string): BuilderLevel | null {
  return shippedBuilderLevels().find((x) => x.id === id) ?? null;
}
