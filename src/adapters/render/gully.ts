// Graph levels: the lethal hillside, drawn (review M2). Every world.hazards band is a thin z slice
// of open ground that kills on touch, and together they cover the whole hill. Painting all of it
// made the floor one red sheet (owner phone test 2026-11-13), so only a FRINGE hugging each house
// base is drawn terracotta (Principle 3: terracotta = danger): that is the ground a short fall
// lands on. The rest of the hill keeps its grass colour. Walkable patches (hay yards, stair
// yards, goal yard) are cut out. One merged draw call, stock material.
import { BufferGeometry, Color, Float32BufferAttribute, Mesh, MeshLambertMaterial } from 'three';
import type { World } from '../../core/world';
import { HILL_HALF_X, terrainY } from './terrain';

export const GULLY_COLOR = '#a8664c'; // same terracotta as the danger style in levelView
const SLICE = 1; // m, z thickness of one fringe slice
const STEP = 2; // m, max x spacing of ribbon vertices (the drawn ground bends across x)
const LIFT = 0.12; // above the drawn terrain (polygonOffset does the rest)
export const FRINGE = 0.7; // m of muted clay around each house base

export interface GullyPatch {
  x0: number;
  x1: number;
  z0: number;
  z1: number;
}

/** One ribbon quad: x0..x1 over the z slice z0..z1 (z0 < z1). */
export type GullyQuad = [number, number, number, number];

type Span = [number, number];

/** x intervals within FRINGE of a house base (outside the base itself) for the z slice z0..z1. */
function fringeSpans(world: World, z0: number, z1: number): Span[] {
  const out: Span[] = [];
  for (let i = 0; i < world.solids.length; i++) {
    const b = world.solids[i];
    if (b.max.x - b.min.x < 6 || b.max.y - b.min.y < 4) continue; // house base boxes only
    if (z1 <= b.min.z - FRINGE || z0 >= b.max.z + FRINGE) continue;
    const inside = z1 > b.min.z && z0 < b.max.z;
    if (inside) {
      out.push([b.min.x - FRINGE, b.min.x], [b.max.x, b.max.x + FRINGE]);
    } else {
      out.push([b.min.x - FRINGE, b.max.x + FRINGE]);
    }
  }
  out.sort((a, b) => a[0] - b[0]);
  const merged: Span[] = []; // union, so neighbouring houses never stack coplanar quads
  for (const s of out) {
    const last = merged[merged.length - 1];
    if (last !== undefined && s[0] <= last[1]) last[1] = Math.max(last[1], s[1]);
    else merged.push([s[0], s[1]]);
  }
  return merged;
}

function intersect(spans: Span[], mask: Span[]): Span[] {
  const out: Span[] = [];
  for (const [a, b] of spans) {
    for (const [c, d] of mask) {
      const lo = Math.max(a, c);
      const hi = Math.min(b, d);
      if (hi - lo > 0.05) out.push([lo, hi]);
    }
  }
  return out;
}

/** The x intervals of every hazard band that are lethal ground near a house base (patches cut out). */
export function gullyQuads(world: World, patches: readonly GullyPatch[]): GullyQuad[] {
  const out: GullyQuad[] = [];
  for (let i = 0; i < world.hazards.length; i++) {
    const hz = world.hazards[i];
    // Segmented levels (ADR 0015) have narrow, turned hazard boxes: only paint inside the box.
    const sx0 = Math.max(hz.min.x, -HILL_HALF_X);
    const sx1 = Math.min(hz.max.x, HILL_HALF_X);
    if (sx1 <= sx0) continue;
    // a turned run's band is long in z: slice it so the house fringe stays a fringe
    for (let sz = hz.min.z; sz < hz.max.z - 1e-6; sz += SLICE) {
      pushSlice(world, patches, out, sx0, sx1, sz, Math.min(sz + SLICE, hz.max.z));
    }
  }
  return out;
}

function pushSlice(
  world: World,
  patches: readonly GullyPatch[],
  out: GullyQuad[],
  sx0: number,
  sx1: number,
  z0: number,
  z1: number,
): void {
  {
    let spans: [number, number][] = [[sx0, sx1]];
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
    spans = intersect(spans, fringeSpans(world, z0, z1));
    for (let j = 0; j < spans.length; j++) out.push([spans[j][0], z0, spans[j][1], z1]);
  }
}

/** Terracotta gully ribbon for a graph level, or null when the world has no hazards. */
export function buildGully(world: World, patches: readonly GullyPatch[]): Mesh | null {
  const quads = gullyQuads(world, patches);
  if (quads.length === 0) return null;
  const pos: number[] = [];
  const idx: number[] = [];
  for (let i = 0; i < quads.length; i++) {
    const [x0, z0, x1, z1] = quads[i];
    // vertices sit on the drawn ground (terrainY), not on the straight plane
    const n = Math.max(1, Math.ceil((x1 - x0) / STEP));
    const base = pos.length / 3;
    for (let k = 0; k <= n; k++) {
      const x = x0 + ((x1 - x0) * k) / n;
      pos.push(x, terrainY(x, z0) + LIFT, z0, x, terrainY(x, z1) + LIFT, z1);
    }
    for (let k = 0; k < n; k++) {
      const a = base + 2 * k; // (x_k, z0), a+1 = (x_k, z1), a+2 = (x_k+1, z0), a+3 = (x_k+1, z1)
      idx.push(a, a + 3, a + 2, a, a + 1, a + 3); // faces up
    }
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
