import valley1 from '../../../content/graphs/valley-1.graph.json';
import { parseGraph } from './format';
import type { GraphLevel } from './format';

export interface GraphEntry {
  id: string;
  label: string;
  file: unknown;
}

/** One line per level (ADR 0013 section 3.5). */
export const GRAPH_LEVELS: readonly GraphEntry[] = [
  { id: 'valley-1', label: 'Valley Run', file: valley1 },
];

export function graphEntry(id: string): GraphEntry | undefined {
  return GRAPH_LEVELS.find((g) => g.id === id);
}

export function loadGraph(id: string): GraphLevel {
  const e = graphEntry(id);
  if (e === undefined) throw new Error('unknown graph level ' + id);
  return parseGraph(e.file);
}
