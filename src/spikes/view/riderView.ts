// Assembles one hunting-spike rider: the shared Bhaaag hero (render/heroRig.ts with a riderLook),
// a mount (horse or dirt bike) and a weapon (bow or rifle). The caller owns `group` (position, yaw)
// and calls update() each render frame with values taken from the spike core (src/spikes).
import { Group, Quaternion, Vector3 } from 'three';
import { HeroRig } from '../../adapters/render/heroRig';
import { riderLook } from '../../adapters/render/heroLook';
import { BikeView } from './bike';
import { BowView } from './bow';
import { HorseView } from './horse';
import { applyRiderPose, type RiderAnchors } from './riderPose';
import { buildRifle } from './rifle';

export type SpikeKind = 'horse-bow' | 'bike-rifle';

export interface RiderFrame {
  /** Horse gallop phase in radians, or bike distance in metres (wheel spin). */
  gait: number;
  /** 0..1 of top speed. */
  speed01: number;
  /** 0..1 while airborne (legs tuck) or landing squash for the bike. */
  air: number;
  /** -1..1 */
  steer: number;
  /** Radians relative to heading, + = left. */
  aimYaw: number;
  aimPitch: number;
  /** Bow draw 0..1. */
  charge: number;
  hasArrow: boolean;
  /** Rifle reload progress 0..1 (0 idle) and recoil 1..0. */
  reload: number;
  recoil: number;
  /** Seconds, drives the bob and the scarf. */
  t: number;
}

export function neutralFrame(): RiderFrame {
  return {
    gait: 0,
    speed01: 0.8,
    air: 0,
    steer: 0,
    aimYaw: 0,
    aimPitch: 0,
    charge: 0,
    hasArrow: true,
    reload: 0,
    recoil: 0,
    t: 0,
  };
}

const _up = new Vector3(0, 1, 0);
const _wh = new Vector3();
const _dh = new Vector3();
const _grip = new Vector3();
const _q = new Quaternion();
const _qp = new Quaternion();
const _qy = new Quaternion();
const _nock = new Vector3();

export class RiderView {
  readonly group = new Group();
  readonly rig: HeroRig;
  readonly horse: HorseView | null;
  readonly bike: BikeView | null;
  readonly bow: BowView | null;
  readonly rifle: Group | null;
  readonly kind: SpikeKind;
  private readonly anchors: RiderAnchors;

  constructor(kind: SpikeKind, detail: 0 | 1 = 0) {
    this.kind = kind;
    const horse = kind === 'horse-bow';
    this.rig = new HeroRig(riderLook(horse ? 'quiver' : 'bandolier', detail));
    if (horse) {
      this.horse = new HorseView(detail === 1);
      this.bike = null;
      this.group.add(this.horse.root);
      this.bow = new BowView();
      this.rifle = null;
      this.group.add(this.bow.group);
      this.anchors = {
        seat: this.horse.seat.clone().add(new Vector3(0, 0.06, 0)),
        footL: this.horse.stirrup[0],
        footR: this.horse.stirrup[1],
        restHand: this.horse.reins,
      };
    } else {
      this.bike = new BikeView(detail === 1);
      this.horse = null;
      this.group.add(this.bike.root);
      this.rifle = buildRifle();
      this.bow = null;
      this.group.add(this.rifle);
      this.anchors = {
        seat: this.bike.seat.clone().add(new Vector3(0, 0.08, 0)),
        footL: this.bike.pegs[0],
        footR: this.bike.pegs[1],
        restHand: new Vector3(),
      };
    }
    this.group.add(this.rig.root);
  }

  update(f: RiderFrame): void {
    const bob = this.horse ? Math.abs(Math.sin(f.gait)) * 0.03 * f.speed01 * (1 - f.air) : 0;
    let lean = 0.1 + 0.12 * f.speed01;
    if (this.horse) this.horse.update(f.gait, f.air, f.speed01);
    if (this.bike) {
      this.bike.update(f.gait === 0 ? 0 : 0, f.steer, f.steer * f.speed01, 0);
      this.bike.grip(0, this.anchors.restHand);
      lean += 0.25;
    }
    const flutter = 0.25 + 0.6 * f.speed01 + Math.sin(f.t * 9) * 0.08 * f.speed01;
    applyRiderPose(
      this.rig,
      this.anchors,
      {
        weapon: this.horse ? 'bow' : 'rifle',
        aimYaw: f.aimYaw,
        aimPitch: f.aimPitch,
        charge: f.charge,
        reload: f.reload,
        recoil: f.recoil,
        lean,
        bob,
        flutter,
      },
      _wh,
      _dh,
    );
    // Props follow the hands, oriented along the aim (rider root space == mount space == group space).
    _qy.setFromAxisAngle(_up, f.aimYaw);
    _qp.setFromAxisAngle(new Vector3(-1, 0, 0), f.aimPitch);
    _q.copy(_qy).multiply(_qp);
    const rp = this.rig.root.position;
    if (this.bow) {
      this.bow.group.quaternion.copy(_q);
      this.bow.group.position.copy(_wh).add(rp);
      this.bow.update(f.charge, f.hasArrow);
    }
    if (this.rifle) {
      _qp.setFromAxisAngle(
        new Vector3(-1, 0, 0),
        f.aimPitch + f.recoil * 0.12 - Math.sin(f.reload * Math.PI) * 0.4,
      );
      this.rifle.quaternion.copy(_qy).multiply(_qp);
      this.rifle.position.copy(_wh).add(rp);
    }
    void _grip;
    void _nock;
  }
}
