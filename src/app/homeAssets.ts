// Everything only nagarkot-home needs (T336c): the generator pass, the kit dressing and the path camera graph.
// Behind one dynamic import (main.ts) so none of it is in the initial chunk (PRODUCT.md 17g).
import { buildNagarkotHome } from '../content/strategy/home';
import { dressNagarkotHome } from '../adapters/render/decor/homeDress';
import { PathCam } from '../content/graph/pathCamera';
import type { PathGraph, PathNode } from '../content/graph/pathCamera';
import type { StrategyLevel } from '../content/strategy/gen';

/** Path camera graph from the maze: node centres, downhill (directed) exits, first predecessor. */
export function buildHomePathGraph(s: StrategyLevel): PathGraph {
  const nodes: PathNode[] = s.nodes.map((n) => ({
    id: n.id,
    x: (n.x0 + n.x1) / 2,
    z: (n.z0 + n.z1) / 2,
    exits: [],
    from: -1,
  }));
  for (const e of s.graph.edges) {
    const a = nodes[e.from];
    const b = nodes[e.to];
    // only downhill legs are route headings; a sideways step is not
    if (a === undefined || b === undefined || b.z >= a.z - 1e-6 || a.exits.includes(e.to)) continue;
    a.exits.push(e.to);
    if (b.from < 0) b.from = e.from;
  }
  return { nodes, start: s.graph.start };
}

/** The ready-to-play level: world JSON, kit dressing (levelView `graph` option) and path camera. */
export function loadHome() {
  const s = buildNagarkotHome();
  const d = dressNagarkotHome(s);
  return {
    level: s.level,
    graph: {
      houses: d.houses,
      props: d.props,
      profile: d.profile,
      seed: d.seed,
      look: d.look,
      patches: d.patches,
      kitSkip: d.kitSkip,
    },
    pathCam: new PathCam(buildHomePathGraph(s)),
  };
}
export type HomeBundle = ReturnType<typeof loadHome>;
