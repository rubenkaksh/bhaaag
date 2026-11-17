import valley1 from '../../../content/graphs/valley-1.graph.json';
import homeStreet from '../../../content/graphs/home-street.graph.json';
import { parseGraph } from './format';
import type { GraphLevel } from './format';
import { GRAPH_INFO } from './info';
import type { GraphInfo } from './info';

export interface GraphEntry extends GraphInfo {
  file: unknown;
}

const FILES: Record<string, unknown> = { 'valley-1': valley1, 'home-street': homeStreet };

/** Metadata (info.ts) paired with each level's JSON file. Loaded lazily (T345). */
export const GRAPH_LEVELS: readonly GraphEntry[] = GRAPH_INFO.map((g) => ({
  ...g,
  file: FILES[g.id],
}));

export function graphEntry(id: string): GraphEntry | undefined {
  return GRAPH_LEVELS.find((g) => g.id === id);
}

export function loadGraph(id: string): GraphLevel {
  const e = graphEntry(id);
  if (e === undefined) throw new Error('unknown graph level ' + id);
  return parseGraph(e.file);
}
