import { ConeGeometry, Group, Mesh, MeshBasicMaterial } from 'three';
import { forkNodes } from '../../content/graph/pathCamera';
import type { PathGraph } from '../../content/graph/pathCamera';
import type { PlacedEdge } from '../../content/graph/place';

const HOVER = 2.6;

/**
 * Decor only (no collision, no gameplay): one downward marigold cone above each exit's takeoff
 * point at every fork. Plain (non-instanced) meshes, so the 24 instanced-mesh cap is untouched.
 */
export function buildForkMarkers(pg: PathGraph, edges: PlacedEdge[]): Group {
  const group = new Group();
  group.name = 'fork_markers';
  const geo = new ConeGeometry(0.35, 0.8, 6);
  geo.rotateX(Math.PI); // tip down
  const mat = new MeshBasicMaterial({ color: 0xffb830, fog: false });
  for (const n of forkNodes(pg)) {
    for (const e of edges) {
      if (e.a !== n.id || !n.exits.includes(e.b)) continue;
      const m = new Mesh(geo, mat);
      m.name = 'fork_marker';
      m.position.set(e.takeoff[0], e.takeoff[1] + HOVER, e.takeoff[2]);
      group.add(m);
    }
  }
  return group;
}
