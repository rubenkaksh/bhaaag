// Syncs a spike RunState (src/spikes cores) to three.js: the rider, enemies, pickups, projectiles,
// camera, day/night. Rendering only: it never changes the run.
import {
  BoxGeometry,
  Color,
  Float32BufferAttribute,
  PerspectiveCamera,
  Plane,
  Raycaster,
  Vector2,
  Vector3,
} from 'three';
import type { Object3D } from 'three';
import type { GraphicsTier } from '../../adapters/render/graphicsTier';
import { riderViewKinds } from './kinds';
import { creaturePools, groupByKind, Pool, PICKUP_GEO } from './creatures';
import { SpikeWorld } from './world';
import type { RunState } from '../run';
import { trailHeading } from '../trail';
import { RiderView, neutralFrame, type RiderFrame } from '../view/riderView';
import type { Projectile } from '../weapons';
import type { SpikeInput } from '../types';

const TAU = Math.PI * 2;
const _ray = new Raycaster();
const _ndc = new Vector2();
const _hit = new Vector3();
const AIM_PLANE = new Plane(new Vector3(0, 1, 0), -0.8);

function wrap(a: number): number {
  while (a > Math.PI) a -= TAU;
  while (a < -Math.PI) a += TAU;
  return a;
}

function paintGeo(g: BoxGeometry, hex: string): BoxGeometry {
  const c = new Color(hex);
  const n = g.getAttribute('position').count;
  const a = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    a[i * 3] = c.r;
    a[i * 3 + 1] = c.g;
    a[i * 3 + 2] = c.b;
  }
  g.setAttribute('color', new Float32BufferAttribute(a, 3));
  g.deleteAttribute('uv');
  return g;
}

export class SpikeView {
  readonly world: SpikeWorld;
  // far 3000 like scene.ts: the backdrop plate is a 900 m cylinder, so a 900 m far plane clipped it
  readonly camera = new PerspectiveCamera(55, 1, 0.3, 3000);
  readonly rider: RiderView;
  private readonly pools = creaturePools();
  private readonly pickups: Record<'wood' | 'ammo' | 'meat', Pool>;
  private readonly shots: Pool;
  private readonly frame: RiderFrame = neutralFrame();
  private gait = 0;
  private prevMag = -1;
  private recoil = 0;
  private lastRX = 0;
  private lastRZ = 0;
  private lastCX = 0;
  private lastCZ = 0;
  private walkPhase = 0;
  private camInit = false;
  private fallSide = 1;
  private t = 0;
  private aspect = 1;
  campFacing = 0;

  constructor(
    readonly run: RunState,
    tier: GraphicsTier,
    horseGlb: Object3D | null = null,
  ) {
    this.world = new SpikeWorld(run.cfg.ride, run.ride.obstacles, run.seed, tier, run.ride.trail);
    const kind = riderViewKinds(run.cfg.id);
    this.rider = new RiderView(kind, tier === 'high' ? 1 : 0, horseGlb);
    this.rider.group.rotation.order = 'YXZ'; // heading, then pitch to the grade, then the fall roll
    this.world.add(this.rider.group);
    for (const p of Object.values(this.pools)) this.world.add(p.mesh);
    this.pickups = {
      wood: new Pool(PICKUP_GEO.wood(), 24),
      ammo: new Pool(PICKUP_GEO.ammo(), 32),
      meat: new Pool(PICKUP_GEO.meat(), 32),
    };
    for (const p of Object.values(this.pickups)) this.world.add(p.mesh);
    const bow = run.cfg.ride.weapon.kind === 'bow';
    this.shots = new Pool(
      bow
        ? paintGeo(new BoxGeometry(0.05, 0.05, 0.8), '#e3d3b0')
        : paintGeo(new BoxGeometry(0.06, 0.06, 0.5), '#ffd36a'),
      160,
    );
    this.world.add(this.shots.mesh);
    this.lastRX = run.ride.x;
    this.lastRZ = run.ride.z;
  }

  resize(w: number, h: number): void {
    this.aspect = w / h;
    this.camera.aspect = this.aspect;
    this.camera.fov = this.aspect < 1 ? 70 : 55;
    this.camera.updateProjectionMatrix();
  }

  private get campZ(): number {
    return this.world.campZ;
  }

  /** Sim-space player position. */
  playerPos(): { x: number; z: number } {
    const r = this.run;
    if (r.phase === 'camp' && r.camp !== null) return { x: r.camp.x, z: r.camp.z };
    return { x: r.ride.x, z: r.ride.z };
  }

  /** Projects a screen point onto the ground and returns sim coordinates. */
  project(clientX: number, clientY: number, w: number, h: number): { x: number; z: number } | null {
    _ndc.set((clientX / w) * 2 - 1, -(clientY / h) * 2 + 1);
    _ray.setFromCamera(_ndc, this.camera);
    const camp = this.run.phase === 'camp';
    AIM_PLANE.constant = -((camp ? this.world.campY : this.run.ride.ground) + 0.8);
    if (_ray.ray.intersectPlane(AIM_PLANE, _hit) === null) return null;
    const off = camp ? this.campZ : 0;
    return { x: _hit.x, z: _hit.z - off };
  }

  sync(input: SpikeInput, dt: number): void {
    this.t += dt;
    const run = this.run;
    const camp = run.camp;
    const inCamp =
      run.phase === 'camp' || run.phase === 'dawn' || (run.phase === 'dead' && camp !== null);
    const r = run.ride;
    const f = this.frame;
    f.t = this.t;
    const weapon = inCamp && camp !== null ? camp.weapon : r.weapon;
    // recoil kick when the magazine drops
    if (this.prevMag >= 0 && weapon.mag < this.prevMag) this.recoil = 1;
    this.prevMag = weapon.mag;
    this.recoil = Math.max(0, this.recoil - dt * 6);
    f.charge = weapon.charge;
    f.hasArrow = weapon.mag > 0 && weapon.reloadLeft <= 0;
    f.reload = weapon.reloadLeft > 0 ? 1 - weapon.reloadLeft / weapon.cfg.reloadTime : 0;
    f.recoil = this.recoil;

    let projectiles: Projectile[];
    let offZ = 0;
    if (!inCamp || camp === null) {
      // riding
      const dx = r.x - this.lastRX;
      const dz = r.z - this.lastRZ;
      const dist = Math.hypot(dx, dz);
      this.lastRX = r.x;
      this.lastRZ = r.z;
      this.rider.onFoot = false;
      this.rider.group.position.set(r.x, r.y, r.z);
      this.rider.group.rotation.y = r.heading;
      // pitch with the grade; a fall rolls the mount over, the tip meter makes it lean and wobble
      this.rider.group.rotation.x = -Math.atan(r.grade) * 0.8;
      const fall = r.fallT > 0 ? Math.min(1, (1.4 - r.fallT) * 4) : 0;
      if (r.fallT <= 0) this.fallSide = input.steer < 0 ? -1 : 1; // keep the side the rider went down on
      const lean = this.fallSide * (fall * 1.3 + r.tip * 0.25);
      this.rider.group.rotation.z = lean + r.tip * 0.06 * Math.sin(this.t * 18);
      const m = r.cfg.mount;
      f.speed01 = Math.min(1, r.speed / m.boostSpeed);
      f.air = r.y - r.ground > 0.05 ? 1 : 0;
      f.steer = input.steer;
      f.aimYaw = wrap(Math.atan2(r.aimX, r.aimZ) - r.heading);
      f.aimPitch = r.cfg.weapon.kind === 'bow' ? 0.04 : 0.12;
      if (this.rider.horse) {
        this.gait += dist * 1.5;
        f.gait = this.gait;
      } else f.gait = dist;
      this.rider.update(f);
      projectiles = r.projectiles;
      this.world.setNight(0);
      this.world.animate(this.t, 1, false, 7);
      this.placeCameraRide(dt);
      this.world.cullAround(r.z);
      this.drawEnemies(r.enemies, 0);
      for (const p of Object.values(this.pickups)) p.commit(0);
    } else {
      offZ = this.campZ;
      const dx = camp.x - this.lastCX;
      const dz = camp.z - this.lastCZ;
      const moved = Math.hypot(dx, dz);
      this.lastCX = camp.x;
      this.lastCZ = camp.z;
      const sp = Math.min(1, moved / dt / camp.cfg.playerSpeed);
      this.walkPhase += moved * 2.4;
      this.rider.onFoot = true;
      this.rider.walkPhase = this.walkPhase;
      this.rider.walkSpeed01 = Number.isFinite(sp) ? sp : 0;
      this.campFacing = Math.atan2(camp.aimX, camp.aimZ);
      this.rider.group.position.set(camp.x, this.world.campY, camp.z + offZ);
      this.rider.group.rotation.set(0, this.campFacing, 0);
      f.aimYaw = 0;
      f.aimPitch = 0.02;
      f.steer = 0;
      f.speed01 = this.rider.walkSpeed01;
      this.rider.update(f);
      projectiles = camp.projectiles;
      const dusk = Math.min(1, camp.t / 22);
      const dawn = Math.max(0, (camp.t - (camp.cfg.nightLength - 16)) / 16);
      this.world.setNight(Math.max(0.15, dusk - 0.75 * dawn));
      this.world.animate(
        this.t,
        Math.min(1, camp.fuel / camp.cfg.fuelMax),
        camp.fuel > 0,
        camp.cfg.fireRadius,
      );
      this.placeCameraCamp(dt);
      this.world.cullAround(this.campZ);
      this.drawEnemies(camp.enemies, offZ);
      const counts = { wood: 0, ammo: 0, meat: 0 };
      for (const p of camp.pickups) {
        const pool = this.pickups[p.kind];
        pool.set(
          counts[p.kind]++,
          1000 + counts[p.kind] * 7 + (p.kind === 'wood' ? 1 : p.kind === 'ammo' ? 2 : 3),
          p.x,
          p.z + offZ,
          this.t,
          0,
          0.6 + this.t * 0.0,
          1.3,
          this.world.campY,
        );
      }
      this.pickups.wood.commit(counts.wood);
      this.pickups.ammo.commit(counts.ammo);
      this.pickups.meat.commit(counts.meat);
    }
    // projectiles
    let n = 0;
    const live = new Set<number>();
    for (const p of projectiles) {
      if (!p.alive || n >= 160) continue;
      this.shots.set(
        n,
        n,
        p.x,
        p.z + offZ,
        0,
        0,
        Math.atan2(p.vx, p.vz),
        1,
        1.5 + (offZ === 0 ? r.y : this.world.campY),
      );
      live.add(n++);
    }
    this.shots.commit(n);
    this.shots.forget(live);
  }

  private drawEnemies(list: import('../enemies').Enemy[], offZ: number): void {
    const g = groupByKind(list);
    for (const k of Object.keys(this.pools) as (keyof typeof g)[]) {
      const pool = this.pools[k];
      const arr = g[k];
      const live = new Set<number>();
      arr.forEach((e, i) => {
        pool.set(
          i,
          e.id,
          e.x,
          e.z + offZ,
          this.t,
          k === 'rabbit' ? 0.25 : k === 'zombie' || k === 'brute' ? 0.06 : 0.14,
          undefined,
          1,
          offZ === 0 ? this.world.heightAt(e.x, e.z) : this.world.campY,
        );
        live.add(e.id);
      });
      pool.commit(arr.length);
      pool.forget(live);
    }
  }

  private placeCameraRide(dt: number): void {
    const r = this.run.ride;
    const portrait = this.aspect < 1;
    // low chase camera (owner 2026-11-27 "feels too 2D"): eye near rider height so the horizon,
    // the backdrop range and the depth of the tree rows read; was 8.5-10 m back and 4-5.2 m up
    const dist = portrait ? 8 : 6.5;
    const h = portrait ? 3.6 : 2.6;
    // trails (2026-11-27): look along the trail ahead and sit behind the rider on it, mostly following
    // the trail's heading so a weaving rider does not swing the camera; height clears the ground
    const ahead = portrait ? 14 : 13;
    const th = r.trail === null ? 0 : trailHeading(r.trail.spec, r.z + ahead * 0.5);
    const camH = r.trail === null ? r.heading : th * 0.7 + r.heading * 0.3;
    const tx = r.x + Math.sin(th) * ahead;
    const tz = r.z + Math.cos(th) * ahead;
    const target = new Vector3(tx, r.y + 1.8 + 0.3 * (this.world.heightAt(tx, tz) - r.y), tz);
    const px = (r.trail === null ? r.x * 0.6 : r.x) - Math.sin(camH) * dist;
    const pz = r.z - Math.cos(camH) * dist;
    const pos = new Vector3(px, Math.max(r.y, this.world.heightAt(px, pz)) + h, pz);
    this.ease(pos, target, dt);
  }

  private placeCameraCamp(dt: number): void {
    const c = this.run.camp;
    if (c === null) return;
    const portrait = this.aspect < 1;
    const cy = this.world.campY;
    const target = new Vector3(c.x * 0.8, cy + 0.8, c.z + this.campZ + (portrait ? 3.5 : 2.5));
    const pos = new Vector3(
      c.x * 0.8,
      cy + (portrait ? 13.5 : 10.5),
      c.z + this.campZ - (portrait ? 10 : 8.5),
    );
    this.ease(pos, target, dt);
  }

  private readonly look = new Vector3();
  private ease(pos: Vector3, target: Vector3, dt: number): void {
    if (!this.camInit) {
      this.camera.position.copy(pos);
      this.look.copy(target);
      this.camInit = true;
    } else {
      const k = 1 - Math.exp(-dt * 6);
      this.camera.position.lerp(pos, k);
      this.look.lerp(target, k);
    }
    this.camera.lookAt(this.look);
  }

  /** Camp coordinates differ from ride coordinates: reset easing at the hand-over. */
  snapCamera(): void {
    this.camInit = false;
  }
}
