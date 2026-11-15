import { BufferGeometry, CylinderGeometry, DoubleSide, Mesh, MeshBasicMaterial } from 'three';
import type { HouseSpec } from '../../content/house/houseSpec';
import { TERRAIN_Z_MAX, TERRAIN_Z_MIN } from './terrain';

// backdrop.ts is loaded lazily (initial chunk), so its ring centre is restated here
const CENTRE_Z = (TERRAIN_Z_MAX + TERRAIN_Z_MIN) / 2;

/**
 * look 'home' far backdrop (H14): a cartoonified photo of the hills (tools/cartoonify.py card
 * mode, public/assets/textures/horizon.webp, alpha above the ridge) on a 90 degree cylinder
 * segment centred on the run's heading, farther out than every backdrop ring (the massif ends
 * near 1.5 km). Stock unfogged MeshBasicMaterial (the image is pre-hazed). Hidden on Low and not
 * loaded there: render/homeTextures.ts applyTierMaps swaps the map in on Medium/High.
 */
export const HORIZON_RADIUS = 2300;
export const HORIZON_ARC = Math.PI / 2;
export const HORIZON_BASE_Y = -20;
export const HORIZON_HEIGHT = 650;

/** Azimuth (cylinder theta: x = sin, z = cos) of the run from the first to the last house. */
export function horizonTheta(houses: readonly HouseSpec[]): number {
  if (houses.length < 2) return Math.PI; // downhill is -z
  const a = houses[0];
  const b = houses[houses.length - 1];
  const dx = b.cx - a.cx;
  const dz = b.cz - a.cz;
  return dx === 0 && dz === 0 ? Math.PI : Math.atan2(dx, dz);
}

export function buildHorizonCard(houses: readonly HouseSpec[]): Mesh {
  const theta = horizonTheta(houses);
  const geo: BufferGeometry = new CylinderGeometry(
    HORIZON_RADIUS,
    HORIZON_RADIUS,
    HORIZON_HEIGHT,
    24,
    1,
    true,
    theta - HORIZON_ARC / 2,
    HORIZON_ARC,
  );
  // seen from inside the cylinder the u axis runs the wrong way round: mirror it
  const uv = geo.getAttribute('uv');
  for (let i = 0; i < uv.count; i++) uv.setX(i, 1 - uv.getX(i));
  const mat = new MeshBasicMaterial({
    color: '#ffffff',
    fog: false,
    transparent: true,
    side: DoubleSide,
    depthWrite: false,
  });
  const mesh = new Mesh(geo, mat);
  mesh.name = 'horizonCard';
  mesh.position.set(0, HORIZON_BASE_Y + HORIZON_HEIGHT / 2, CENTRE_Z);
  mesh.frustumCulled = false;
  mesh.renderOrder = -2;
  mesh.userData.cast = false;
  mesh.userData.tierMaps = { rich: { map: 'horizon', ext: 'webp' }, hideOnLow: true };
  return mesh;
}
