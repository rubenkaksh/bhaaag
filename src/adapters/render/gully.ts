// Graph levels: the lethal hillside, drawn (review M2). Every world.hazards band is a thin z slice
// of open ground that kills on touch; this lays a terracotta ribbon over the terrain there, with
// the walkable patches (hay yards, stair yards, goal yard) cut out, so the player can read where
// the ground is fatal (Principle 3: terracotta = danger). One merged draw call, stock material.
import { BufferGeometry, Color, Float32BufferAttribute, Mesh, MeshLambertMaterial } from 'three';
import type { World } from '../../core/world';
import { HILL_HALF_X, planeY } from './terrain';

export const GULLY_COLOR = '#c4472a'; // same terracotta as the danger style in levelView
const LIFT = 0.06; // above the drawn terrain (polygonOffset does the rest)

export interface GullyPatch {
  x0: number;
  x1: number;
  z0: number;
  z1: number;
}

/** One ribbon quad: x0..x1 over the z slice z0..z1 (z0 < z1). */
export type GullyQuad = [number, number, number, number];

/** The x intervals of every hazard band that are open lethal ground (patches cut out). */
export function gullyQuads(world: World, patches: readonly GullyPatch[]): GullyQuad[] {
  const out: GullyQuad[] = [];
  for (let i = 0; i < world.hazards.length; i++) {
    const hz = world.hazards[i];
    const z0 = hz.min.z;
    const z1 = hz.max.z;
    let spans: [number, number][] = [[-HILL_HALF_X, HILL_HALF_X]];
    for (let k = 0; k < patches.length; k++) {
      const p = patches[k];
      if (p.z1 <= z0 || p.z0 >= z1) continue;
      const next: [number, number][] = [];
      for (let j = 0; j < spans.length; j++) {
        const [a, b] = spans[j];
        if (p.x1 <= a || p.x0 >= b) {
          next.push([a, b]);
          continue;
        }
        if (p.x0 > a) next.push([a, p.x0]);
        if (p.x1 < b) next.push([p.x1, b]);
      }
      spans = next;
    }
    for (let j = 0; j < spans.length; j++) out.push([spans[j][0], z0, spans[j][1], z1]);
  }
  return out;
}

/** Terracotta gully ribbon for a graph level, or null when the world has no hazards. */
export function buildGully(world: World, patches: readonly GullyPatch[]): Mesh | null {
  const quads = gullyQuads(world, patches);
  if (quads.length === 0) return null;
  const pos: number[] = [];
  const idx: number[] = [];
  for (let i = 0; i < quads.length; i++) {
    const [x0, z0, x1, z1] = quads[i];
    const yLo = planeY(z0) + LIFT; // z0 is the downhill edge
    const yHi = planeY(z1) + LIFT;
    const base = pos.length / 3;
    pos.push(x0, yLo, z0, x1, yLo, z0, x1, yHi, z1, x0, yHi, z1);
    idx.push(base, base + 2, base + 1, base, base + 3, base + 2); // faces up
  }
  const geo = new BufferGeometry();
  geo.setAttribute('position', new Float32BufferAttribute(pos, 3));
  geo.setIndex(idx);
  geo.computeVertexNormals();
  const mat = new MeshLambertMaterial({
    color: new Color(GULLY_COLOR),
    flatShading: true,
    polygonOffset: true,
    polygonOffsetFactor: -2,
    polygonOffsetUnits: -2,
  });
  const mesh = new Mesh(geo, mat);
  mesh.name = 'gully';
  mesh.userData.cast = false;
  return mesh;
}
