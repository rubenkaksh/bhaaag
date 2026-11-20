// Light metadata of the graph levels (id, label, opt-in looks). The heavy parts (graph JSON, zod
// parser, placement) live in registry.ts and load by dynamic import (T345); lobby and mode tables
// read only this file so the initial chunk stays small.
export interface GraphInfo {
  id: string;
  label: string;
  /** Opt-in decor look (default off). 'home' = the H4-H8 home-street dressing. */
  look?: 'home';
  /** Opt-in path-following camera (pathCamera.ts) plus fork markers (default off). */
  pathCamera?: boolean;
  /** Opt-in camera tilt assist (tiltAssist.ts); needs pathCamera. ?assist=0 turns it off. */
  tiltAssist?: boolean;
}

/** One line per level (ADR 0013 section 3.5); registry.ts pairs each with its JSON file. */
export const GRAPH_INFO: readonly GraphInfo[] = [
  { id: 'valley-1', label: 'Valley Run' },
  { id: 'home-street', label: 'Home Street', look: 'home', pathCamera: true },
  { id: 'hay-run', label: 'Hay Run', look: 'home', pathCamera: true, tiltAssist: true },
];

export function graphInfo(id: string): GraphInfo | undefined {
  return GRAPH_INFO.find((g) => g.id === id);
}
