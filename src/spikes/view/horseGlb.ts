// TRIAL (owner 2026-11-27, "Yes, trial horse"): the Wild West Town 3D rigged horse in place of the
// primitive pony. Dev spike page only, behind ?horse=glb. The GLB is never committed: it lives in
// art/spike-assets/ (gitignored) and is fetched by the dev server; a missing file falls back to the
// primitive HorseView. Licence and source: docs/spikes/SOURCES.tsv.
// The pack ships idle/graze clips only, so the gallop is procedural: each leg bone gets a swing
// about its local x on top of its rest pose, like HorseView.update.
import {
  BoxGeometry,
  Group,
  Mesh,
  MeshStandardMaterial,
  Quaternion,
  Vector3,
  type Bone,
  type Object3D,
} from 'three';
import { clone as cloneSkinned } from 'three/examples/jsm/utils/SkeletonUtils.js';
import { MOUNT_COLORS as C } from './kit';
import type { HorseLike } from './horse';

export const HORSE_GLB_URL = `${import.meta.env.BASE_URL}art/spike-assets/horse.glb`;
/** The pack horse is a full-size animal (back about 1.5 m); this brings it to the pony's saddle height. */
const SCALE = 0.93;

/** Loads the GLB once; null when the file is missing or fails to parse. */
export async function loadHorseTemplate(url = HORSE_GLB_URL): Promise<Object3D | null> {
  try {
    const { GLTFLoader } = await import('three/examples/jsm/loaders/GLTFLoader.js');
    const gltf = await new GLTFLoader().loadAsync(url);
    return gltf.scene;
  } catch (e) {
    console.warn('[spike] horse GLB not loaded, using the primitive pony', e);
    return null;
  }
}

interface Swing {
  bone: Bone;
  rest: Quaternion;
}

const _q = new Quaternion();
const _x = new Vector3(1, 0, 0);

function flat(color: string): MeshStandardMaterial {
  return new MeshStandardMaterial({ color, roughness: 0.85, metalness: 0 });
}

export class HorseGlbView implements HorseLike {
  readonly root = new Group();
  private readonly body = new Group();
  readonly seat = new Vector3(0, 1.38, -0.05);
  readonly stirrup = [new Vector3(0.34, 0.74, 0.0), new Vector3(-0.34, 0.74, 0.0)];
  readonly reins = new Vector3(0.0, 1.58, 0.5);
  /** [fore-left, fore-right, hind-left, hind-right] upper bones, then their lower bones. */
  private readonly upper: Swing[] = [];
  private readonly lower: Swing[] = [];
  private readonly neck: Swing | null;
  private readonly tail: Swing | null;

  constructor(template: Object3D) {
    const horse = cloneSkinned(template);
    horse.scale.setScalar(SCALE);
    horse.traverse((o) => {
      o.frustumCulled = false; // skinned bounds do not follow the procedural gallop
    });
    this.body.add(horse);
    this.root.add(this.body);
    const find = (name: string): Swing | null => {
      const b = horse.getObjectByName(name) as Bone | undefined;
      return b ? { bone: b, rest: b.quaternion.clone() } : null;
    };
    for (const n of ['foreleg_upper_l', 'foreleg_upper_r', 'thigh_l', 'thigh_r']) {
      const s = find(n);
      if (s) this.upper.push(s);
    }
    for (const n of ['foreleg_lower_l', 'foreleg_lower_r', 'gaskin_l', 'gaskin_r']) {
      const s = find(n);
      if (s) this.lower.push(s);
    }
    this.neck = find('neck1');
    this.tail = find('tail1');
    // The pack horse has no tack: blanket, saddle and stirrups as stock boxes.
    const box = (w: number, h: number, d: number, c: string, x: number, y: number, z: number) => {
      const m = new Mesh(new BoxGeometry(w, h, d), flat(c));
      m.position.set(x, y, z);
      this.body.add(m);
    };
    const y = 1.28; // blanket on the back under the seat
    box(0.62, 0.035, 0.62, C.ochre, 0, y, -0.05);
    box(0.58, 0.04, 0.56, C.blanket, 0, y + 0.025, -0.05);
    box(0.36, 0.07, 0.4, C.leather, 0, y + 0.06, -0.05);
    box(0.36, 0.1, 0.06, C.leather, 0, y + 0.09, -0.27);
    for (const sx of [-1, 1]) {
      box(0.03, 0.52, 0.04, C.leather, 0.33 * sx, y - 0.28, 0.0);
      box(0.1, 0.03, 0.1, C.metal, 0.34 * sx, 0.75, 0.0);
    }
  }

  update(phase: number, tuck: number, speed01: number): void {
    const amp = 0.3 + 0.45 * speed01;
    const offs = [0, 0.5, 2.4, 2.9];
    for (let i = 0; i < this.upper.length; i++) {
      const p = phase + offs[i];
      const swing = Math.sin(p) * amp * (1 - tuck) + tuck * (i < 2 ? 0.7 : -0.5);
      const u = this.upper[i];
      u.bone.quaternion.copy(u.rest).multiply(_q.setFromAxisAngle(_x, swing));
      const l = this.lower[i];
      if (l) {
        const fold = Math.max(0, Math.cos(p)) * (0.4 + 0.6 * speed01) * (1 - tuck) + tuck * 1.1;
        // fore knees fold back, hind hocks fold forward
        l.bone.quaternion.copy(l.rest).multiply(_q.setFromAxisAngle(_x, i < 2 ? -fold : fold));
      }
    }
    this.body.position.y = Math.abs(Math.sin(phase)) * 0.05 * speed01 * (1 - tuck);
    if (this.neck)
      this.neck.bone.quaternion
        .copy(this.neck.rest)
        .multiply(_q.setFromAxisAngle(_x, Math.sin(phase) * 0.06 * speed01));
    if (this.tail)
      this.tail.bone.quaternion
        .copy(this.tail.rest)
        .multiply(_q.setFromAxisAngle(_x, -(0.3 * speed01 + Math.sin(phase * 2) * 0.08)));
  }
}
