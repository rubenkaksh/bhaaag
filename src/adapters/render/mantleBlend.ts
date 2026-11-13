// Visual-only ledge climb (T316). The sim mantle teleports the hero from the hang point to the
// ledge top in one tick; this keeps the drawn hero at the old spot and eases it to the sim
// position: first up (hands pull, 0..65 % of the climb), then forward over the edge (35..100 %).
// No three imports, node-testable. The sim end state is untouched.
export const MANTLE_SEC = 0.5; // keep equal to heroPose MANTLE_END
const MAX_JUMP = 4; // m; a larger gap is a respawn or teleport, never blended

function smooth(a: number, b: number, v: number): number {
  const t = Math.max(0, Math.min(1, (v - a) / (b - a)));
  return t * t * (3 - 2 * t);
}

export class MantleBlend {
  private t = -1;
  private dx = 0;
  private dy = 0;
  private dz = 0;
  /** Offsets written by step(): add to the sim position. */
  ox = 0;
  oy = 0;
  oz = 0;

  /** Begin a climb; (dx, dy, dz) = drawn position minus the new sim position. */
  start(dx: number, dy: number, dz: number): void {
    if (Math.hypot(dx, dy, dz) > MAX_JUMP || Math.hypot(dx, dy, dz) < 0.05) {
      this.t = -1;
      return;
    }
    this.t = 0;
    this.dx = dx;
    this.dy = dy;
    this.dz = dz;
  }

  cancel(): void {
    this.t = -1;
    this.ox = 0;
    this.oy = 0;
    this.oz = 0;
  }

  get active(): boolean {
    return this.t >= 0;
  }

  /** Advances dt seconds and updates ox/oy/oz. */
  step(dt: number): void {
    if (this.t < 0) {
      this.ox = 0;
      this.oy = 0;
      this.oz = 0;
      return;
    }
    const u = this.t / MANTLE_SEC;
    const kv = 1 - smooth(0, 0.65, u);
    const kh = 1 - smooth(0.35, 1, u);
    this.ox = this.dx * kh;
    this.oz = this.dz * kh;
    this.oy = this.dy * kv;
    this.t += dt;
    if (this.t >= MANTLE_SEC) this.t = -1;
  }
}
