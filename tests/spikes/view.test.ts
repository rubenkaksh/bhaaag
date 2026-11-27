import { describe, expect, it } from 'vitest';
import { Mesh, Vector3 } from 'three';
import type { Object3D } from 'three';
import { RiderView, neutralFrame, type SpikeKind } from '../../src/spikes/view/riderView';

function count(o: Object3D): { draws: number; tris: number } {
  let draws = 0;
  let tris = 0;
  o.traverse((m) => {
    if (m instanceof Mesh && m.visible) {
      draws++;
      const g = m.geometry;
      tris += (g.index ? g.index.count : g.attributes.position.count) / 3;
    }
  });
  return { draws, tris };
}

function finite(o: Object3D): boolean {
  o.updateMatrixWorld(true);
  let ok = true;
  o.traverse((n) => {
    for (const e of n.matrixWorld.elements) if (!Number.isFinite(e)) ok = false;
  });
  return ok;
}

const KINDS: SpikeKind[] = ['horse-bow', 'bike-rifle'];

describe('spike riders (shared hero + mount + weapon)', () => {
  it.each(KINDS)('%s builds within the proposed budgets', (kind) => {
    const low = count(new RiderView(kind, 0).group);
    const high = count(new RiderView(kind, 1).group);
    // proposed 2026-11-27: Low rider+mount+weapon under 3,500 tris, High under 5,500; 24 draws
    expect(low.tris).toBeLessThan(3500);
    expect(high.tris).toBeLessThan(5500);
    expect(low.draws).toBeLessThanOrEqual(24);
    expect(high.draws).toBeLessThanOrEqual(26);
  });

  it.each(KINDS)('%s stays finite over a gallop, a full draw, a jump and a wild aim', (kind) => {
    const v = new RiderView(kind, 1);
    const f = neutralFrame();
    for (let i = 0; i < 240; i++) {
      f.t = i / 60;
      f.gait = i * 0.2;
      f.speed01 = (i % 120) / 120;
      f.air = i > 100 && i < 140 ? 1 : 0;
      f.charge = (i % 60) / 60;
      f.steer = Math.sin(i / 20);
      f.aimYaw = Math.sin(i / 17) * 3; // beyond the +-1.7 rad torso limit: must clamp, not blow up
      f.aimPitch = Math.sin(i / 11) * 0.8;
      f.reload = i % 90 < 30 ? (i % 90) / 30 : 0;
      f.recoil = i % 30 === 0 ? 1 : Math.max(0, 1 - (i % 30) / 10);
      f.hasArrow = i % 7 !== 0;
      v.update(f);
      expect(finite(v.group)).toBe(true);
    }
  });

  it('the bow hand follows the aim and the draw hand pulls back with charge', () => {
    const v = new RiderView('horse-bow', 0);
    const f = neutralFrame();
    f.charge = 0;
    v.update(f);
    v.group.updateMatrixWorld(true);
    const rest = v.rig.handR.getWorldPosition(new Vector3());
    f.charge = 1;
    v.update(f);
    v.group.updateMatrixWorld(true);
    const drawn = v.rig.handR.getWorldPosition(new Vector3());
    const bowHand = v.rig.handL.getWorldPosition(new Vector3());
    expect(rest.z - drawn.z).toBeGreaterThan(0.25); // string hand moves toward the rider
    expect(bowHand.z).toBeGreaterThan(drawn.z + 0.3); // bow arm out front
  });

  it('the rider sits on the saddle or seat', () => {
    for (const kind of KINDS) {
      const v = new RiderView(kind, 0);
      v.update(neutralFrame());
      v.group.updateMatrixWorld(true);
      const pelvis = v.rig.pelvis.getWorldPosition(new Vector3());
      const seat = v.horse ? v.horse.seat : (v.bike as NonNullable<typeof v.bike>).seat;
      expect(Math.abs(pelvis.y - seat.y)).toBeLessThan(0.2);
      expect(Math.abs(pelvis.z - seat.z)).toBeLessThan(0.2);
    }
  });
});
