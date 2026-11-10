import {
  CylinderGeometry,
  Float32BufferAttribute,
  Group,
  Mesh,
  MeshBasicMaterial,
  RingGeometry,
  AdditiveBlending,
  DoubleSide,
} from 'three';

const BEAM_H = 40;
const COLOR = 0xffd35a;

/** Vertical light beam plus a pulsing ground ring at the waypoint (2 additive draws, 64 tris). */
export class WaypointView {
  readonly group = new Group();
  private readonly beamGeo = new CylinderGeometry(0.2, 0.45, BEAM_H, 8, 1, true);
  private readonly ringGeo = new RingGeometry(0.5, 0.75, 24);
  private readonly beamMat = new MeshBasicMaterial({
    color: 0xffffff,
    vertexColors: true,
    transparent: true,
    blending: AdditiveBlending,
    depthWrite: false,
    fog: false,
    side: DoubleSide,
  });
  private readonly ringMat = new MeshBasicMaterial({
    color: COLOR,
    transparent: true,
    opacity: 0.8,
    blending: AdditiveBlending,
    depthWrite: false,
    fog: false,
    side: DoubleSide,
  });
  private readonly ring: Mesh;

  constructor() {
    // Base at y=0, tip at y=BEAM_H. Alpha 0.9 at the bottom, 0 at the top.
    this.beamGeo.translate(0, BEAM_H / 2, 0);
    const pos = this.beamGeo.getAttribute('position');
    const col = new Float32Array(pos.count * 4);
    const r = ((COLOR >> 16) & 255) / 255;
    const g = ((COLOR >> 8) & 255) / 255;
    const b = (COLOR & 255) / 255;
    for (let i = 0; i < pos.count; i++) {
      const t = pos.getY(i) / BEAM_H;
      const f = 0.7 * (1 - t); // fade rgb too, so additive stays subtle on any path
      col[i * 4] = r * f;
      col[i * 4 + 1] = g * f;
      col[i * 4 + 2] = b * f;
      col[i * 4 + 3] = f;
    }
    this.beamGeo.setAttribute('color', new Float32BufferAttribute(col, 4));
    const beam = new Mesh(this.beamGeo, this.beamMat);
    beam.frustumCulled = false;
    this.ringGeo.rotateX(-Math.PI / 2);
    this.ring = new Mesh(this.ringGeo, this.ringMat);
    this.ring.position.y = 0.05;
    this.group.add(beam, this.ring);
    this.group.visible = false;
  }

  /** Places the beam base at (x, y, z), the ring on the pad at padY, and pulses the ring. */
  update(visible: boolean, x: number, y: number, z: number, padY: number, t: number): void {
    this.group.visible = visible;
    if (!visible) return;
    this.group.position.set(x, y, z);
    this.ring.position.y = padY - y + 0.05;
    this.ring.scale.setScalar(1 + 0.25 * Math.sin(6 * t));
  }

  dispose(): void {
    this.beamGeo.dispose();
    this.ringGeo.dispose();
    this.beamMat.dispose();
    this.ringMat.dispose();
  }
}
