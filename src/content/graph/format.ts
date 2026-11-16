// Graph level file format (ADR 0013 section 3.1).
import { z } from 'zod';

const node = z.object({
  id: z.number().int().min(1),
  storeys: z.union([z.literal(1), z.literal(2)]).optional(), // else rng
  balcony: z.boolean().optional(), // else rng (2-storey only)
  /** Optional camera heading override in degrees (0 faces +z, +90 faces +x); only path-camera levels read it. */
  heading: z.number().min(-360).max(360).optional(),
});

const edge = z.object({
  a: z.number().int(),
  b: z.number().int(),
  kind: z.enum(['zip', 'gap', 'touch']),
  via: z.enum(['jump', 'tramp', 'cushion', 'boxes', 'stairs']).optional(),
});

/** One straight run of the road (ADR 0015). Nodes are placed in this run's local frame, then turned to `heading`. */
const segment = z.object({
  /** Bearing of the run's downhill direction, degrees: 0 = +z, 90 = +x, 180 = -z (the unsegmented layout), 270 = -x. */
  heading: z.union([z.literal(0), z.literal(90), z.literal(180), z.literal(270)]),
  /** Node ids in order. The first is the run's start; it is also the previous run's last node (the bend house). */
  nodes: z.array(z.number().int()).min(2),
});

export const graphLevel = z
  .object({
    format: z.literal('bhaaag-graph'),
    version: z.literal(1),
    id: z.string().regex(/^[a-z0-9-]+$/),
    name: z.string(),
    placer: z.literal(1),
    seed: z.number().int(),
    nodes: z.array(node).min(2),
    edges: z.array(edge).min(1),
    start: z.number().int(),
    goal: z.number().int(),
    decoys: z.number().int().min(0).max(12),
    profile: z.array(z.tuple([z.number(), z.number()])).min(2),
    /** Optional (ADR 0015). Absent = the straight v1 layout. */
    segments: z.array(segment).min(2).optional(),
  })
  .superRefine((g, ctx) => {
    const bad = (message: string): void => ctx.addIssue({ code: 'custom', message });
    const ids = new Set<number>();
    for (const n of g.nodes) {
      if (ids.has(n.id)) bad('duplicate node id ' + n.id);
      ids.add(n.id);
    }
    for (const e of g.edges) {
      if (!ids.has(e.a) || !ids.has(e.b)) bad('edge references unknown node ' + e.a + '-' + e.b);
      if (e.kind === 'gap' && e.via === undefined) bad('gap edge needs via');
      if (e.kind !== 'gap' && e.via !== undefined) bad('via only on gap edges');
    }
    if (!ids.has(g.start)) bad('start node missing');
    if (!ids.has(g.goal)) bad('goal node missing');
    // reachability: directed a->b, touch both ways
    const seen = new Set<number>([g.start]);
    let grew = true;
    while (grew) {
      grew = false;
      for (const e of g.edges) {
        if (seen.has(e.a) && !seen.has(e.b)) {
          seen.add(e.b);
          grew = true;
        }
        if (e.kind === 'touch' && seen.has(e.b) && !seen.has(e.a)) {
          seen.add(e.a);
          grew = true;
        }
      }
    }
    if (!seen.has(g.goal)) bad('goal not reachable from start');
    if (g.segments !== undefined) {
      const segs = g.segments;
      const owner = new Map<number, number>();
      segs.forEach((sg, i) => {
        for (const id of sg.nodes) {
          if (!ids.has(id)) bad('segment ' + i + ' unknown node ' + id);
          const prev = owner.get(id);
          const shared =
            i > 0 && id === sg.nodes[0] && id === segs[i - 1].nodes[segs[i - 1].nodes.length - 1];
          if (prev !== undefined && !shared) bad('node ' + id + ' in two segments');
          if (prev === undefined) owner.set(id, i);
        }
      });
      for (const id of ids) if (!owner.has(id)) bad('node ' + id + ' in no segment');
      if (segs[0].nodes[0] !== g.start) bad('first segment must start at start');
      if (segs[segs.length - 1].nodes[segs[segs.length - 1].nodes.length - 1] !== g.goal)
        bad('last segment must end at goal');
      for (const e of g.edges) {
        const home = segs.some((sg) => sg.nodes.includes(e.a) && sg.nodes.includes(e.b));
        if (!home) bad('edge ' + e.a + '-' + e.b + ' crosses segments');
      }
    }
    for (let i = 1; i < g.profile.length; i++) {
      if (!(g.profile[i][0] < g.profile[i - 1][0])) bad('profile z must decrease');
      if (g.profile[i][1] > g.profile[i - 1][1]) bad('profile must not rise');
    }
  });

export type GraphLevel = z.infer<typeof graphLevel>;
export type GraphNode = z.infer<typeof node>;
export type GraphEdge = z.infer<typeof edge>;

export function parseGraph(obj: unknown): GraphLevel {
  return graphLevel.parse(obj);
}
