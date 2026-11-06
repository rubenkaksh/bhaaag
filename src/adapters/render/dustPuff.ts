import { Mesh, MeshBasicMaterial, RingGeometry } from 'three';

// ADR 0007 section 4: landing/jump/death dust ring.
// Flat ring on the ground, scales out and fades over 0.4 s, then hides
// itself so it costs 0 draw calls at rest. Normal blending, not additive.

const LIFE = 0.4;
const SCALE_GAIN = 2.2;
const OPACITY_BASE = 0.55;
const Y_OFFSET = 0.03;
const RING_TRIS = 24;

const GEOMETRY = new RingGeometry(0.25, 0.42, 12, 1);
GEOMETRY.rotateX(-Math.PI / 2);

export class DustPuff {
  readonly mesh: Mesh;

  private readonly material: MeshBasicMaterial;
  private age = LIFE;
  private amount = 0;
  private baseY = 0;

  constructor() {
    this.material = new MeshBasicMaterial({
      color: '#c9a27e',
      transparent: true,
      depthWrite: false,
      opacity: 0,
    });
    this.mesh = new Mesh(GEOMETRY, this.material);
    this.mesh.visible = false;
    this.mesh.frustumCulled = false;
  }

  /** Restart the puff at (x, y, z) with strength a in [0, 1]. */
  trigger(x: number, y: number, z: number, a: number): void {
    this.age = 0;
    this.amount = a < 0 ? 0 : a > 1 ? 1 : a;
    this.baseY = y;
    this.mesh.position.set(x, y + Y_OFFSET, z);
    this.mesh.scale.setScalar(1);
    this.material.opacity = OPACITY_BASE * (0.5 + 0.5 * this.amount);
    this.mesh.visible = true;
  }

  /** Advance one tick. No-op while hidden. */
  update(dt: number): void {
    if (!this.mesh.visible) return;
    const t = dt < 0 ? 0 : dt;
    this.age += t;
    const u = this.age / LIFE;
    if (u >= 1) {
      this.hide();
      return;
    }
    const inv = 1 - u;
    this.mesh.scale.setScalar(1 + SCALE_GAIN * (1 - inv * inv * inv));
    this.material.opacity = OPACITY_BASE * (0.5 + 0.5 * this.amount) * inv * inv;
    this.mesh.position.y = this.baseY + Y_OFFSET;
  }

  private hide(): void {
    this.age = LIFE;
    this.mesh.visible = false;
    this.material.opacity = 0;
    this.mesh.scale.setScalar(1);
  }
}

/** Triangle count of the ring (budget check, ADR 0007 section 1). */
export function dustPuffTriangles(): number {
  return RING_TRIS;
}
