// Lobby-side listing of the shipped builder levels: id and name only, read with JSON.parse so the
// zod parser and the compiler stay out of the initial chunk (T345). Full validation happens in
// shipped.ts when a level is actually played (lazy chunk); a file that fails there falls back to the default level.
const files = import.meta.glob('../../../content/builders/*.builder.json', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>;

export interface ShippedMeta {
  id: string;
  name: string;
}

let cache: ShippedMeta[] | null = null;

export function shippedBuilderMeta(): readonly ShippedMeta[] {
  if (cache === null) {
    cache = [];
    for (const text of Object.values(files)) {
      try {
        const o: unknown = JSON.parse(text);
        if (typeof o !== 'object' || o === null) continue;
        const { id, name } = o as { id?: unknown; name?: unknown };
        if (typeof id === 'string' && typeof name === 'string') cache.push({ id, name });
      } catch {
        // Bad file: leave it out of the level row.
      }
    }
  }
  return cache;
}
