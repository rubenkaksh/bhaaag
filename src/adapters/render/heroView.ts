import { Group } from 'three';
import type { HeroState } from '../../core/hero';
import { AE_MANTLE } from './animEvents';
import { DEAD, newHeroPoseInput } from './heroPose';
import { MantleBlend } from './mantleBlend';
import type { HeroPoseInput } from './heroPose';
import { HeroRig, updateHeroRig } from './heroRig';

const TWO_PI = Math.PI * 2;
const MAX_DT = 0.1;

// Jointed hero (ADR 0004). The group origin is at the feet. Local +z is the
// facing direction (sim yaw 0 faces +z, same as three's rotation.y = yaw).
//
// update() places the root and drives the rig. It fills input.state, speed
// and vy from the sim; the caller owns input.brake, input.rolling and
// input.ropeDir*, input.events, input.impact, input.win and input.hookFlying
// (set them before update; zero events and impact afterwards). Pass dt for the render frame time;
// without it the view measures wall-clock time itself.
export class HeroView {
  readonly group: Group;
  readonly rig: HeroRig;
  readonly input: HeroPoseInput;
  private lastMs = -1;
  private readonly mantle = new MantleBlend();
  private drawnX = 0;
  private drawnY = 0;
  private drawnZ = 0;
  private hasDrawn = false;

  constructor() {
    this.group = new Group();
    this.rig = new HeroRig();
    this.group.add(this.rig.root);
    this.input = newHeroPoseInput();
  }

  update(prev: HeroState, cur: HeroState, alpha: number, dt?: number): void {
    const rx = prev.px + (cur.px - prev.px) * alpha;
    const ry = prev.py + (cur.py - prev.py) * alpha;
    const rz = prev.pz + (cur.pz - prev.pz) * alpha;
    const dtv = dt !== undefined ? dt : this.clockDt();
    if (cur.dead === 1) this.mantle.cancel();
    else if (this.hasDrawn && (this.input.events & AE_MANTLE) !== 0) {
      this.mantle.start(this.drawnX - rx, this.drawnY - ry, this.drawnZ - rz);
    }
    this.mantle.step(dtv);
    this.drawnX = rx + this.mantle.ox;
    this.drawnY = ry + this.mantle.oy;
    this.drawnZ = rz + this.mantle.oz;
    this.hasDrawn = true;
    this.group.position.set(this.drawnX, this.drawnY, this.drawnZ);
    let dy = (cur.yaw - prev.yaw) % TWO_PI;
    if (dy > Math.PI) dy -= TWO_PI;
    if (dy < -Math.PI) dy += TWO_PI;
    const yaw = prev.yaw + dy * alpha;
    this.group.rotation.y = yaw;

    const inp = this.input;
    inp.state = cur.dead === 1 ? DEAD : cur.mode;
    inp.speed = Math.sqrt(cur.vx * cur.vx + cur.vz * cur.vz);
    inp.vy = cur.vy;
    inp.deadCause = cur.deadCause;
    inp.dt = dtv;
    this.rig.yaw = yaw;
    updateHeroRig(this.rig, inp);
  }

  private clockDt(): number {
    const now = performance.now();
    const d = this.lastMs < 0 ? 0 : (now - this.lastMs) / 1000;
    this.lastMs = now;
    return d < 0 ? 0 : d > MAX_DT ? MAX_DT : d;
  }
}
