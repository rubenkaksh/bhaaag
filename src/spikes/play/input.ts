// Touch-first input for the hunting spikes (pointer events) with a desktop mirror (WASD + mouse).
//   Left 45% of the screen: floating stick. Ride: steer. Camp: walk.
//   Right side: aim pointer. The finger (or mouse) position is projected onto the ground and the
//   rider aims there; holding it draws the bow or fires the rifle.
//   Buttons (data-act): jump, boost, reload, interact, eat.
// Screen right is -x for a camera behind a rider facing +z, so the stick maps with a sign flip.
import { neutralInput, type SpikeInput } from '../types';

export type AimProjector = (clientX: number, clientY: number) => { x: number; z: number } | null;

const STICK_RADIUS = 56;

export class PlayInput {
  private stickId = -1;
  private stickOx = 0;
  private stickOy = 0;
  stickX = 0;
  stickY = 0;
  private aimId = -1;
  private aimCx = -1;
  private aimCy = -1;
  private mouseDown = false;
  private readonly keys = new Set<string>();
  private readonly held = new Set<string>();
  private pressedInteract = false;
  private pressedEat = false;
  private lastAim = { x: 0, z: 1 };

  constructor(private readonly root: HTMLElement) {
    const r = root;
    r.addEventListener('pointerdown', this.onDown);
    r.addEventListener('pointermove', this.onMove);
    r.addEventListener('pointerup', this.onUp);
    r.addEventListener('pointercancel', this.onUp);
    r.addEventListener('contextmenu', (e) => e.preventDefault());
    window.addEventListener('keydown', (e) => {
      this.keys.add(e.code);
      if (e.code === 'KeyE') this.pressedInteract = true;
      if (e.code === 'KeyQ' || e.code === 'KeyF') this.pressedEat = true;
    });
    window.addEventListener('keyup', (e) => this.keys.delete(e.code));
    for (const b of document.querySelectorAll<HTMLElement>('[data-act]')) {
      const act = b.dataset.act as string;
      b.addEventListener('pointerdown', (e) => {
        e.stopPropagation();
        e.preventDefault();
        b.setPointerCapture(e.pointerId);
        this.held.add(act);
        if (act === 'interact') this.pressedInteract = true;
        if (act === 'eat') this.pressedEat = true;
      });
      const up = (e: PointerEvent): void => {
        e.stopPropagation();
        this.held.delete(act);
      };
      b.addEventListener('pointerup', up);
      b.addEventListener('pointercancel', up);
    }
  }

  private readonly onDown = (e: PointerEvent): void => {
    if (e.pointerType === 'mouse') {
      this.mouseDown = true;
      this.aimCx = e.clientX;
      this.aimCy = e.clientY;
      return;
    }
    const left = e.clientX < window.innerWidth * 0.45;
    if (left && this.stickId < 0) {
      this.stickId = e.pointerId;
      this.stickOx = e.clientX;
      this.stickOy = e.clientY;
    } else if (!left && this.aimId < 0) {
      this.aimId = e.pointerId;
      this.aimCx = e.clientX;
      this.aimCy = e.clientY;
    }
    this.root.setPointerCapture(e.pointerId);
  };

  private readonly onMove = (e: PointerEvent): void => {
    if (e.pointerType === 'mouse') {
      this.aimCx = e.clientX;
      this.aimCy = e.clientY;
      return;
    }
    if (e.pointerId === this.stickId) {
      this.stickX = Math.max(-1, Math.min(1, (e.clientX - this.stickOx) / STICK_RADIUS));
      this.stickY = Math.max(-1, Math.min(1, (e.clientY - this.stickOy) / STICK_RADIUS));
    } else if (e.pointerId === this.aimId) {
      this.aimCx = e.clientX;
      this.aimCy = e.clientY;
    }
  };

  private readonly onUp = (e: PointerEvent): void => {
    if (e.pointerType === 'mouse') {
      this.mouseDown = false;
      return;
    }
    if (e.pointerId === this.stickId) {
      this.stickId = -1;
      this.stickX = 0;
      this.stickY = 0;
    } else if (e.pointerId === this.aimId) {
      this.aimId = -1;
    }
  };

  /** True when any pointer is down on the right side (used to restart from the end overlay). */
  get touching(): boolean {
    return this.aimId >= 0 || this.stickId >= 0 || this.mouseDown;
  }

  /** Where the stick base is, for drawing it. -1 when idle. */
  get stickOrigin(): { x: number; y: number } | null {
    return this.stickId >= 0 ? { x: this.stickOx, y: this.stickOy } : null;
  }

  read(phase: 'ride' | 'camp', project: AimProjector, px: number, pz: number): SpikeInput {
    const i = neutralInput();
    const k = this.keys;
    let sx = this.stickX;
    let sy = this.stickY;
    if (k.has('KeyA') || k.has('ArrowLeft')) sx -= 1;
    if (k.has('KeyD') || k.has('ArrowRight')) sx += 1;
    if (k.has('KeyW') || k.has('ArrowUp')) sy -= 1;
    if (k.has('KeyS') || k.has('ArrowDown')) sy += 1;
    sx = Math.max(-1, Math.min(1, sx));
    sy = Math.max(-1, Math.min(1, sy));
    if (phase === 'ride') {
      i.steer = -sx;
      i.throttle = sy > 0.6 ? -1 : 1; // pull the stick down to brake
      i.boost = this.held.has('boost') || k.has('ShiftLeft') || k.has('ShiftRight');
      i.jump = this.held.has('jump') || k.has('Space');
    } else {
      i.moveX = -sx;
      i.moveZ = -sy;
    }
    const aiming =
      this.aimId >= 0 || this.mouseDown || (this.aimCx >= 0 && this.aimId < 0 && this.mouseSeen());
    if (aiming && this.aimCx >= 0) {
      const w = project(this.aimCx, this.aimCy);
      if (w !== null) this.lastAim = { x: w.x - px, z: w.z - pz };
    }
    i.aimX = this.lastAim.x;
    i.aimZ = this.lastAim.z;
    i.fire = this.aimId >= 0 || this.mouseDown || this.held.has('fire') || k.has('KeyJ');
    i.reload = this.held.has('reload') || k.has('KeyR');
    i.interact = this.pressedInteract || this.held.has('interact');
    i.eat = this.pressedEat || this.held.has('eat');
    this.pressedInteract = false;
    this.pressedEat = false;
    return i;
  }

  private mouseSeen(): boolean {
    return this.aimCx >= 0;
  }
}
