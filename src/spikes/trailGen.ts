// Builds a TrailField: THREE.Terrain (three.terrain.js 3.1.1, owner pick 2026-11-27) makes the hills,
// carveTrail cuts the trail, ford and camp into them. Built once per spike (fixed seed) and cached.
import Terrain, { TerrainNS, createSeededRandom } from 'three.terrain.js';
import { carveTrail, gridFor, type TrailField, type TrailSpec } from './trail';

const cache = new Map<string, TrailField>();

/**
 * A painted heightmap (owner pick 2026-11-28): greyscale 0..1, row-major, w * h values. Read as a top-down map
 * with the ride going UP the image: the top row is the far end (past the camp), the bottom row the start, and
 * the left column is the rider's left (+x). Black = minHeight, white = maxHeight. Any size; it is stretched
 * over the whole grid. It replaces the noise hills only: the trail, ford and camp are still carved on top.
 */
export interface HillMap {
  w: number;
  h: number;
  data: Float32Array;
}

const hillMaps = new Map<number, HillMap>();

/** Registers a painted map for a terrain seed (one per spike); fields built after this use it. */
export function setHillMap(seed: number, map: HillMap | null): void {
  if (map === null) hillMaps.delete(seed);
  else hillMaps.set(seed, map);
  for (const k of [...cache.keys()]) if (cache.get(k)?.spec.seed === seed) cache.delete(k);
}

/** Bilinear grey value at image coordinates (u, v) in pixels, clamped to the edges. */
function sampleMap(m: HillMap, u: number, v: number): number {
  const x = Math.max(0, Math.min(m.w - 1, u));
  const y = Math.max(0, Math.min(m.h - 1, v));
  const i = Math.min(m.w - 2, Math.floor(x));
  const j = Math.min(m.h - 2, Math.floor(y));
  const a = Math.max(0, x - i);
  const b = Math.max(0, y - j);
  const d = m.data;
  const w = m.w;
  if (m.w < 2 || m.h < 2) return d[0];
  return (
    d[j * w + i] * (1 - a) * (1 - b) +
    d[j * w + i + 1] * a * (1 - b) +
    d[(j + 1) * w + i] * (1 - a) * b +
    d[(j + 1) * w + i + 1] * a * b
  );
}

/** Raw (uncarved) hill heights on the trail grid from a painted map. */
export function hillsFromMap(spec: TrailSpec, m: HillMap): Float32Array {
  const g = gridFor(spec);
  const r = g.nx + 1;
  const out = new Float32Array(r * (g.nz + 1));
  for (let j = 0; j <= g.nz; j++)
    for (let i = 0; i <= g.nx; i++) {
      const u = ((g.nx - i) / g.nx) * (m.w - 1); // left of the image = +x
      const v = ((g.nz - j) / g.nz) * (m.h - 1); // top of the image = far end
      out[j * r + i] = spec.minHeight + sampleMap(m, u, v) * (spec.maxHeight - spec.minHeight);
    }
  return out;
}

export function buildTrailField(spec: TrailSpec): TrailField {
  const map = hillMaps.get(spec.seed);
  const key = JSON.stringify(spec);
  const hit = cache.get(key);
  if (hit !== undefined) return hit;
  if (map !== undefined) {
    const hills = hillsFromMap(spec, map);
    const h = Float32Array.from(hills);
    const waterY = carveTrail(h, spec);
    const field: TrailField = { spec, ...gridFor(spec), h, waterY, hills };
    cache.set(key, field);
    return field;
  }
  // The library tests `heightmap instanceof HTMLCanvasElement || instanceof Image` even for a procedural
  // heightmap, which throws where those globals do not exist (Node, Vitest). Stub them there only.
  const g = globalThis as Record<string, unknown>;
  if (g.HTMLCanvasElement === undefined) g.HTMLCanvasElement = class {};
  if (g.Image === undefined) g.Image = class {};
  const grid = gridFor(spec);
  let waterY = 0;
  let hills = new Float32Array(0);
  const obj = Terrain({
    heightmap: TerrainNS.PerlinDiamond,
    xSegments: grid.nx,
    ySegments: grid.nz,
    xSize: grid.nx * grid.dx,
    ySize: grid.nz * grid.dz,
    maxHeight: spec.maxHeight,
    minHeight: spec.minHeight,
    random: createSeededRandom(spec.seed),
    after(zs: Float32Array) {
      hills = Float32Array.from(zs);
      waterY = carveTrail(zs, spec);
    },
  });
  const mesh = (obj.children[0] ?? obj) as unknown as {
    geometry: { attributes: { position: { array: Float32Array } }; dispose(): void };
  };
  const h = Float32Array.from(TerrainNS.toArray1D(mesh.geometry.attributes.position.array));
  mesh.geometry.dispose();
  const field: TrailField = { spec, ...grid, h, waterY, hills };
  cache.set(key, field);
  return field;
}
