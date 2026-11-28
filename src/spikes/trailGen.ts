// Builds a TrailField: THREE.Terrain (three.terrain.js 3.1.1, owner pick 2026-11-27) makes the hills,
// carveTrail cuts the trail, ford and camp into them. Built once per spike (fixed seed) and cached.
import Terrain, { TerrainNS, createSeededRandom } from 'three.terrain.js';
import { carveTrail, gridFor, type TrailField, type TrailSpec } from './trail';

const cache = new Map<string, TrailField>();

export function buildTrailField(spec: TrailSpec): TrailField {
  const key = JSON.stringify(spec);
  const hit = cache.get(key);
  if (hit !== undefined) return hit;
  // The library tests `heightmap instanceof HTMLCanvasElement || instanceof Image` even for a procedural
  // heightmap, which throws where those globals do not exist (Node, Vitest). Stub them there only.
  const g = globalThis as Record<string, unknown>;
  if (g.HTMLCanvasElement === undefined) g.HTMLCanvasElement = class {};
  if (g.Image === undefined) g.Image = class {};
  const grid = gridFor(spec);
  let waterY = 0;
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
      waterY = carveTrail(zs, spec);
    },
  });
  const mesh = (obj.children[0] ?? obj) as unknown as {
    geometry: { attributes: { position: { array: Float32Array } }; dispose(): void };
  };
  const h = Float32Array.from(TerrainNS.toArray1D(mesh.geometry.attributes.position.array));
  mesh.geometry.dispose();
  const field: TrailField = { spec, ...grid, h, waterY };
  cache.set(key, field);
  return field;
}
