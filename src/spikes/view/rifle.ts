import { BoxGeometry, CylinderGeometry, Group, Mesh } from 'three';
import { MOUNT_COLORS, mat } from './kit';

/** Lever rifle. Grip (right hand) at the origin, barrel along +z. */
export function buildRifle(): Group {
  const g = new Group();
  const wood = mat(MOUNT_COLORS.wood);
  const steel = mat(MOUNT_COLORS.metal);
  const stock = new Mesh(new BoxGeometry(0.05, 0.1, 0.34), wood);
  stock.position.set(0, -0.015, -0.2);
  stock.rotation.x = -0.12;
  const recv = new Mesh(new BoxGeometry(0.055, 0.085, 0.2), steel);
  recv.position.set(0, 0.012, 0.06);
  const barrel = new Mesh(new CylinderGeometry(0.014, 0.014, 0.6, 6).rotateX(Math.PI / 2), steel);
  barrel.position.set(0, 0.03, 0.46);
  const fore = new Mesh(new BoxGeometry(0.045, 0.05, 0.3), wood);
  fore.position.set(0, 0.0, 0.34);
  const lever = new Mesh(new BoxGeometry(0.02, 0.07, 0.1), steel);
  lever.position.set(0, -0.06, 0.06);
  g.add(stock, recv, barrel, fore, lever);
  return g;
}
