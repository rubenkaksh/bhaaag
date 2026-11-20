import valley1 from '../../../content/graphs/valley-1.graph.json';
import homeStreet from '../../../content/graphs/home-street.graph.json';
import hayRun from '../../../content/graphs/hay-run.graph.json';
import { parseGraph } from './format';
import type { GraphLevel } from './format';

export interface GraphEntry {
  id: string;
  label: string;
  file: unknown;
  /** Opt-in decor look (default off). 'home' = the H4-H8 home-street dressing. */
  look?: 'home';
  /** Opt-in path-following camera (pathCamera.ts) plus fork markers (default off). */
  pathCamera?: boolean;
}

/** One line per level (ADR 0013 section 3.5). */
export const GRAPH_LEVELS: readonly GraphEntry[] = [
  { id: 'valley-1', label: 'Valley Run', file: valley1 },
  { id: 'home-street', label: 'Home Street', file: homeStreet, look: 'home', pathCamera: true },
  { id: 'hay-run', label: 'Hay Run', file: hayRun, look: 'home', pathCamera: true },
];

export function graphEntry(id: string): GraphEntry | undefined {
  return GRAPH_LEVELS.find((g) => g.id === id);
}

export function loadGraph(id: string): GraphLevel {
  const e = graphEntry(id);
  if (e === undefined) throw new Error('unknown graph level ' + id);
  return parseGraph(e.file);
}
