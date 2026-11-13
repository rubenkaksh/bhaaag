// Builder level file (ADR 0013): what the level builder saves and loads. Pure data + zod, no DOM.
import { z } from 'zod';

export const BUILDER_FORMAT = 'bhaaag-level-builder';
export const BUILDER_VERSION = 1;

export const HOUSE_SIZE = 8; // every house is the same 8 m square
export const HOUSE_HALF = HOUSE_SIZE / 2;
export const STOREY_HEIGHT: readonly [number, number] = [7, 11]; // roof over the ground, 1 or 2 storeys
export const TOUCH_EPS = 0.25; // footprints this close count as touching (adjoining houses)

export const GAP_VIAS = ['jump', 'tramp', 'cushion', 'boxes', 'stairs'] as const;
export type GapVia = (typeof GAP_VIAS)[number];

const houseSchema = z.object({
  id: z.number().int().min(0),
  x: z.number(),
  z: z.number(),
  lift: z.number().min(0).max(12),
  storeys: z.union([z.literal(1), z.literal(2)]),
  balcony: z.boolean(),
});

const edgeSchema = z
  .object({
    id: z.number().int().min(0),
    a: z.number().int().min(0),
    b: z.number().int().min(0),
    kind: z.enum(['zip', 'gap']),
    via: z.enum(GAP_VIAS).optional(),
  })
  .refine((e) => (e.kind === 'gap') === (e.via !== undefined), {
    message: 'gap edges need a via; zip edges have none',
  });

const levelSchema = z
  .object({
    format: z.literal(BUILDER_FORMAT),
    version: z.literal(BUILDER_VERSION),
    id: z.string().regex(/^[a-z0-9][a-z0-9-]*$/, 'id: lowercase letters, digits, dashes'),
    name: z.string(),
    houses: z.array(houseSchema),
    edges: z.array(edgeSchema),
    start: z.number().int().min(-1),
    goal: z.number().int().min(-1),
  })
  .superRefine((l, ctx) => {
    const ids = new Set<number>();
    for (const h of l.houses) {
      if (ids.has(h.id)) ctx.addIssue({ code: 'custom', message: 'duplicate house id ' + h.id });
      ids.add(h.id);
    }
    for (const e of l.edges) {
      if (!ids.has(e.a) || !ids.has(e.b) || e.a === e.b) {
        ctx.addIssue({ code: 'custom', message: 'edge ' + e.id + ': bad house reference' });
      }
    }
    for (const id of [l.start, l.goal]) {
      if (id !== -1 && !ids.has(id))
        ctx.addIssue({ code: 'custom', message: 'start/goal: unknown house ' + id });
    }
  });

export type BuilderHouse = z.infer<typeof houseSchema>;
export type BuilderEdge = z.infer<typeof edgeSchema>;
export type BuilderLevel = z.infer<typeof levelSchema>;

export function emptyLevel(id: string, name: string): BuilderLevel {
  return {
    format: BUILDER_FORMAT,
    version: BUILDER_VERSION,
    id,
    name,
    houses: [],
    edges: [],
    start: -1,
    goal: -1,
  };
}

export function parseBuilderLevel(text: string): BuilderLevel {
  let obj: unknown;
  try {
    obj = JSON.parse(text);
  } catch (err) {
    throw new Error('invalid JSON: ' + (err instanceof Error ? err.message : String(err)), {
      cause: err,
    });
  }
  const r = levelSchema.safeParse(obj);
  if (!r.success) {
    throw new Error(
      'invalid builder level: ' +
        r.error.issues.map((i) => i.path.join('.') + ': ' + i.message).join('; '),
    );
  }
  return r.data;
}

export function serializeBuilderLevel(l: BuilderLevel): string {
  return JSON.stringify(l, null, 2) + '\n';
}
