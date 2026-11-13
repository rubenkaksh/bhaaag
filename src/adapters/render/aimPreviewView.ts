import { BoxGeometry, Group, Mesh, MeshBasicMaterial, RingGeometry, Vector3 } from 'three';
import { PREVIEW_NONE, PREVIEW_RELEASE, PREVIEW_SAFE } from '../../core/preview';
import { GOLD } from '../../app/ropePost';

// Three-colour language (lean-scope): cream = safe, gold = the player must act, terracotta = danger.
// Terracotta is the same hex as levelView's danger style.
const CREAM = 0xf3ead6;
const TERRACOTTA = 0xc4472a;
const LINE_THICKNESS = 0.1; // metres; a THREE.Line would be 1 px and unreadable on a phone
const RING_INNER = 0.55;
const RING_OUTER = 0.85;
const RING_LIFT = 0.06; // keeps the flat ring off the surface it marks
const MIN_LEN = 1e-3;

function colorFor(outcome: number): number {
  if (outcome === PREVIEW_SAFE) return CREAM;
  if (outcome === PREVIEW_RELEASE) return GOLD;
  return TERRACOTTA; // PREVIEW_LETHAL
}

/**
 * Aim preview: a straight bar from the hand to the targeted anchor plus a flat ring at the
 * predicted touchdown / impact point, both tinted by the predicted outcome. Two normal-blend
 * draws (no additive, ADR 0006), stock MeshBasicMaterial, no shaders. Purely cosmetic: it never
 * reads or writes the sim.
 */
export class AimPreviewView {
  readonly group = new Group();
  private readonly lineGeo = new BoxGeometry(1, 1, 1);
  private readonly ringGeo = new RingGeometry(RING_INNER, RING_OUTER, 24);
  private readonly lineMat = new MeshBasicMaterial({ color: CREAM, transparent: true, opacity: 0.85, fog: false });
  private readonly ringMat = new MeshBasicMaterial({ color: CREAM, transparent: true, opacity: 0.9, fog: false });
  private readonly line = new Mesh(this.lineGeo, this.lineMat);
  private readonly ring = new Mesh(this.ringGeo, this.ringMat);
  private readonly aim = new Vector3();
  private lastOutcome = -1;

  constructor() {
    this.ring.rotation.x = -Math.PI / 2; // lie flat in XZ
    this.group.add(this.line, this.ring);
    this.group.visible = false;
  }

  /** Hand and anchor define the bar; (px, py, pz) is the predicted point for the ring. */
  update(
    outcome: number,
    hx: number,
    hy: number,
    hz: number,
    ax: number,
    ay: number,
    az: number,
    px: number,
    py: number,
    pz: number,
  ): void {
    const dx = ax - hx;
    const dy = ay - hy;
    const dz = az - hz;
    const len = Math.sqrt(dx * dx + dy * dy + dz * dz);
    if (outcome === PREVIEW_NONE || len < MIN_LEN) {
      this.group.visible = false;
      return;
    }
    this.group.visible = true;
    if (outcome !== this.lastOutcome) {
      this.lastOutcome = outcome;
      const c = colorFor(outcome);
      this.lineMat.color.setHex(c);
      this.ringMat.color.setHex(c);
    }
    this.line.position.set(hx + dx / 2, hy + dy / 2, hz + dz / 2);
    this.line.scale.set(LINE_THICKNESS, LINE_THICKNESS, len);
    this.aim.set(ax, ay, az);
    this.line.lookAt(this.aim); // +z of the unit box points at the anchor
    this.ring.position.set(px, py + RING_LIFT, pz);
  }

  hide(): void {
    this.group.visible = false;
  }

  dispose(): void {
    this.lineGeo.dispose();
    this.ringGeo.dispose();
    this.lineMat.dispose();
    this.ringMat.dispose();
  }
}
