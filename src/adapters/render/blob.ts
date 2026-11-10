import { CircleGeometry, Mesh, MeshBasicMaterial } from 'three';
import type { World } from '../../core/world';
import { terrainY } from './terrain';

// Hero contact blob (ADR 0009): one soft dark disc on the surface below the hero, on every tier.
// It is the only grounding cue on Low (no shadow map) and keeps height readable on Medium/High.

export const BLOB_RADIUS = 0.7;
/** Above this height over the surface the blob is gone. */
export const BLOB_FADE_H = 7;

/** Highest walkable surface at or below `y + 0.3` under (x, z): solid tops, else the hillside. */
export function supportY(world: World, x: number, y: number, z: number): number {
  let best = terrainY(x, z);
  for (let i = 0; i < world.solids.length; i++) {
    const s = world.solids[i];
    const top = s.max.y;
    if (top > y + 0.3 || top <= best) continue;
    if (x < s.min.x || x > s.max.x || z < s.min.z || z > s.max.z) continue;
    best = top;
  }
  return best;
}

export function buildBlob(): Mesh {
  const geo = new CircleGeometry(BLOB_RADIUS, 16);
  geo.rotateX(-Math.PI / 2);
  const mat = new MeshBasicMaterial({
    color: '#1b1410',
    transparent: true,
    opacity: 0.38,
    depthWrite: false,
    fog: false,
    polygonOffset: true,
    polygonOffsetFactor: -2,
    polygonOffsetUnits: -2,
  });
  const m = new Mesh(geo, mat);
  m.name = 'heroBlob';
  m.frustumCulled = false;
  m.visible = false;
  return m;
}

/** Places the blob under a hero standing at (x, y, z); hides it when airborne too high. */
export function placeBlob(blob: Mesh, world: World, x: number, y: number, z: number): void {
  const gy = supportY(world, x, y, z);
  const h = y - gy;
  if (h > BLOB_FADE_H || h < -1) {
    blob.visible = false;
    return;
  }
  blob.visible = true;
  blob.position.set(x, gy + 0.05, z);
  const k = 1 - 0.55 * Math.min(1, Math.max(0, h) / BLOB_FADE_H);
  blob.scale.setScalar(k);
  (blob.material as MeshBasicMaterial).opacity = 0.38 * k;
}
