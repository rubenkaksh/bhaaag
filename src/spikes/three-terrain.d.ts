// Minimal types for three.terrain.js 3.1.1 (ships none): only what trailGen.ts uses.
declare module 'three.terrain.js' {
  import type { Object3D } from 'three';
  interface TerrainOptions {
    heightmap: unknown;
    xSegments: number;
    ySegments: number;
    xSize: number;
    ySize: number;
    maxHeight: number;
    minHeight: number;
    random?: () => number;
    after?: (zs: Float32Array, options: TerrainOptions) => void;
  }
  export const TerrainNS: {
    PerlinDiamond: unknown;
    toArray1D(positions: ArrayLike<number>): Float32Array;
  };
  export function createSeededRandom(seed: number): () => number;
  export default function Terrain(options: TerrainOptions): Object3D;
}
