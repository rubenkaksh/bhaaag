import {
  Mesh,
  MeshBasicMaterial,
  MeshLambertMaterial,
  MeshStandardMaterial,
  type Material,
  type Texture,
} from 'three';
import type { GraphicsTier } from './graphicsTier';
import { tileNormal, tileTexture } from './tileTexture';

/**
 * Tier-driven texture swap for look 'home' meshes (kit.ts, horizonCard.ts). A mesh opts in with
 * `userData.tierMaps`. Nothing is fetched until a tier that needs it applies, so Low never loads
 * the home files; node tests never apply it and keep the flat tints.
 */
export type TierMapSet = { map?: string; ext?: string; normal?: string };
export type TierMaps = {
  /** Maps on Low (default none). */
  low?: TierMapSet;
  /** Maps on Medium and High; the normal map only on High. */
  rich: TierMapSet;
  /** Material colour multiplier on Medium/High (the tiles are dark; instance tints multiply them). */
  boost?: number;
  /** Hide the mesh on Low. */
  hideOnLow?: boolean;
};

type MapMat = Material & {
  map: Texture | null;
  normalMap?: Texture | null;
  color: { setScalar(v: number): unknown };
};

function setOn(m: Material, map: Texture | null, normal: Texture | null, boost: number): void {
  const mm = m as MapMat;
  mm.map = map;
  if (m instanceof MeshLambertMaterial || m instanceof MeshStandardMaterial) mm.normalMap = normal;
  if (!(m instanceof MeshBasicMaterial)) mm.color.setScalar(boost);
  m.needsUpdate = true;
}

/** Applies the mesh's `tierMaps` for `tier`; returns false when the mesh has none. */
export function applyTierMaps(o: Mesh, tier: GraphicsTier): boolean {
  const spec = o.userData.tierMaps as TierMaps | undefined;
  if (spec === undefined) return false;
  const rich = tier !== 'low';
  const set = rich ? spec.rich : spec.low;
  const map = set?.map !== undefined ? tileTexture(set.map, set.ext) : null;
  const normal = tier === 'high' && set?.normal !== undefined ? tileNormal(set.normal) : null;
  const boost = rich ? (spec.boost ?? 1) : 1;
  if (spec.hideOnLow === true) o.visible = rich;
  // scene.swapStandard keeps its own copy of the lambert normal map: keep that in step too
  const ud = o.userData as { lambert?: Material; standard?: Material; normalMap?: Texture | null };
  ud.normalMap = normal;
  const mats: Material[] = [];
  if (Array.isArray(o.material)) mats.push(...o.material);
  else mats.push(o.material);
  if (ud.lambert !== undefined) mats.push(ud.lambert);
  if (ud.standard !== undefined) mats.push(ud.standard);
  for (const m of new Set(mats)) setOn(m, map, normal, boost);
  return true;
}
