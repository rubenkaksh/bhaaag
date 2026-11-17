// SPIKE (T343, throwaway): render-only gyro look offset. Never writes lookYaw / InputFrame.
// Offsets are added to the camera yaw/pitch handed to updateCamera. Opt-in; desktop is a no-op.

const DEG = Math.PI / 180;
const MAX_YAW = 60 * DEG;
const MAX_PITCH = 25 * DEG;
const SMOOTH = 0.15; // per-frame low-pass
const DEADZONE = 1.5 * DEG;

type IOSOrientation = typeof DeviceOrientationEvent & { requestPermission?: () => Promise<string> };

export class GyroLook {
  yaw = 0;
  pitch = 0;
  enabled = false;
  private baseA = 0;
  private baseP = 0;
  private haveBase = false;
  private rawYaw = 0;
  private rawPitch = 0;
  private lastA = 0;
  private lastP = 0;
  private btn: HTMLButtonElement | null = null;

  static supported(): boolean {
    return typeof window !== 'undefined' && 'DeviceOrientationEvent' in window;
  }

  mount(root: HTMLElement): void {
    if (!GyroLook.supported() || !window.matchMedia('(pointer: coarse)').matches) return;
    const b = document.createElement('button');
    b.textContent = 'Gyro: off';
    b.style.cssText =
      'position:absolute;top:8px;left:50%;transform:translateX(-50%);z-index:50;padding:6px 10px;font:12px sans-serif;opacity:.75;touch-action:manipulation';
    let pressT = 0;
    b.addEventListener('pointerdown', (e) => {
      e.stopPropagation();
      pressT = performance.now();
    });
    b.addEventListener('pointerup', (e) => {
      e.stopPropagation();
      if (!this.enabled) void this.enable(b);
      else if (performance.now() - pressT > 500) this.disable(b);
      else this.recenter();
    });
    root.appendChild(b);
    this.btn = b;
  }

  /** Must run inside a user gesture on iOS (permission prompt). */
  private async enable(b: HTMLButtonElement): Promise<void> {
    const DOE = DeviceOrientationEvent as IOSOrientation;
    if (typeof DOE.requestPermission === 'function') {
      try {
        if ((await DOE.requestPermission()) !== 'granted') {
          b.textContent = 'Gyro: denied';
          return;
        }
      } catch {
        b.textContent = 'Gyro: error';
        return;
      }
    }
    window.addEventListener('deviceorientation', this.onOrient);
    this.enabled = true;
    this.haveBase = false;
    b.textContent = 'Gyro: on (tap=recenter, hold=off)';
  }

  private disable(b: HTMLButtonElement): void {
    window.removeEventListener('deviceorientation', this.onOrient);
    this.enabled = false;
    this.yaw = this.pitch = this.rawYaw = this.rawPitch = 0;
    b.textContent = 'Gyro: off';
  }

  recenter(): void {
    this.baseA = this.lastA;
    this.baseP = this.lastP;
    this.haveBase = true;
  }

  private onOrient = (e: DeviceOrientationEvent): void => {
    if (e.alpha === null || e.beta === null || e.gamma === null) return;
    const ang = (screen.orientation ? screen.orientation.angle : 0) | 0;
    // Pitch axis: beta in portrait, gamma in landscape (sign flips with the rotation direction).
    let p = e.beta;
    if (ang === 90) p = -e.gamma;
    else if (ang === 270 || ang === -90) p = e.gamma;
    else if (ang === 180) p = -e.beta;
    this.lastA = e.alpha;
    this.lastP = p;
    if (!this.haveBase) this.recenter();
    let da = e.alpha - this.baseA;
    da = ((((da + 180) % 360) + 360) % 360) - 180; // wrap to [-180, 180)
    const dp = p - this.baseP;
    this.rawYaw = da * DEG;
    this.rawPitch = dp * DEG;
  };

  /** Call once per render/tick: smooth, dead-zone, clamp. */
  update(): void {
    if (!this.enabled) return;
    const ty = this.rawYaw;
    const tp = this.rawPitch;
    const ey = Math.abs(ty) < DEADZONE ? 0 : ty;
    const ep = Math.abs(tp) < DEADZONE ? 0 : tp;
    this.yaw += (Math.max(-MAX_YAW, Math.min(MAX_YAW, ey)) - this.yaw) * SMOOTH;
    this.pitch += (Math.max(-MAX_PITCH, Math.min(MAX_PITCH, ep)) - this.pitch) * SMOOTH;
  }
}
