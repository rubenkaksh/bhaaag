// Sprite-based cloud dragon: head sprite facing the camera with a serpentine chain of
// modular cloud segments trailing behind it (+Z, uphill). Motion is a traveling sine wave
// along the body: x(s,t) = A(s) * sin(k*s - w*t), amplitude growing toward the tail.
// Textures are preloaded once via TextureLoader; the update loop only mutates transforms.
import {
  Group,
  LinearFilter,
  MathUtils,
  PerspectiveCamera,
  Sprite,
  SpriteMaterial,
  SRGBColorSpace,
  Texture,
  TextureLoader,
  Vector3,
} from 'three';
import type { GraphicsTier } from '../graphicsTier';
import { hillY } from '../../../core/chase/rows';
import { CATCH_DIST, HEAD_H_OVER_W, catchPose, easeOutBack } from './catchPose';
import type { CatchPose } from './catchPose';

const HOVER = 7; // metres above the hill line at the head (in-frame, above the hero)
const HEAD_SCALE = 20; // head sprite world width (aspect kept from the crop)
const BODY_LEN = 48; // world length of the segment chain (toward +Z / uphill)
const WAVE_K = 2.2; // spatial frequency along the body
const WAVE_W = 1.4; // temporal frequency (rad/s)
const WAVE_AMP = 8; // lateral amplitude at the tail
const HEAD_SWAP_S = 2.6; // seconds between head pose swaps
const HEAD_AHEAD = 14; // during play: the head is pinned this far in front of the camera

const SEGMENTS_BY_TIER: Record<GraphicsTier, number> = { low: 6, medium: 10, high: 12 };

// Segment textures in order from neck to tail; the chain cycles through these.
const SEG_PATHS = [
  '/assets/dragon/cloud-seg-a.webp',
  '/assets/dragon/cloud-seg-b.webp',
  '/assets/dragon/cloud-puff-d.webp',
  '/assets/dragon/cloud-puff-e.webp',
];

type Segment = {
  sprite: Sprite;
  mat: SpriteMaterial;
  t: number; // normalized distance from head, 0..1
};

function prepTexture(tex: Texture): Texture {
  tex.colorSpace = SRGBColorSpace;
  tex.minFilter = LinearFilter;
  tex.magFilter = LinearFilter;
  tex.generateMipmaps = false; // sprites at near-constant screen size; mipmaps cost memory
  return tex;
}

export class DragonSpriteView {
  readonly group = new Group();
  private tier: GraphicsTier;
  private readonly loader = new TextureLoader();
  private readonly headTextures: Texture[] = [];
  private readonly segTextures: (Texture | null)[] = SEG_PATHS.map(() => null);
  private texturesReady = 0;
  private readonly textureTotal = 2 + SEG_PATHS.length;
  private headSprite: Sprite | null = null;
  private headMat: SpriteMaterial | null = null;
  private segments: Segment[] = [];
  private headIndex = 0;
  private lastHeadSwap = -10;
  private built = false;
  private catching = false;
  private readonly catchPoseScratch: CatchPose = { cx: 0, cy: 0, h: 0 };
  private readonly pTop = new Vector3();
  private readonly pBot = new Vector3();
  private readonly target = new Vector3();

  constructor(tier: GraphicsTier) {
    this.tier = tier;
    this.group.name = 'chase_dragon';
    this.loadTextures();
  }

  private onLoad(tex: Texture): void {
    prepTexture(tex);
    this.texturesReady++;
    if (this.texturesReady === this.textureTotal && !this.built) this.build();
  }

  private loadTextures(): void {
    this.loader.load('/assets/dragon/head-a.webp', (t) => {
      this.headTextures[0] = t;
      this.onLoad(t);
    });
    this.loader.load('/assets/dragon/head-b.webp', (t) => {
      this.headTextures[1] = t;
      this.onLoad(t);
    });
    for (let i = 0; i < SEG_PATHS.length; i++) {
      const idx = i;
      this.loader.load(SEG_PATHS[idx], (t) => {
        this.segTextures[idx] = t;
        this.onLoad(t);
      });
    }
  }

  setTier(tier: GraphicsTier): void {
    if (tier === this.tier) return;
    this.tier = tier;
    if (this.built) this.build();
  }

  private clearBuilt(): void {
    if (this.headSprite !== null) {
      this.group.remove(this.headSprite);
      this.headSprite = null;
    }
    if (this.headMat !== null) {
      this.headMat.dispose();
      this.headMat = null;
    }
    for (const s of this.segments) {
      this.group.remove(s.sprite);
      s.mat.dispose();
    }
    this.segments = [];
  }

  private build(): void {
    this.clearBuilt();
    this.built = true;

    // Head: front-facing sprite, aspect from the crop (915 x 306 -> ~3:1).
    // Fog off: the head is the source of the white-out and must stay readable through it.
    this.headMat = new SpriteMaterial({
      map: this.headTextures[0],
      transparent: true,
      depthWrite: false,
      fog: false,
      toneMapped: false,
    });
    this.headSprite = new Sprite(this.headMat);
    this.headSprite.scale.set(HEAD_SCALE, HEAD_SCALE * (306 / 915), 1);
    this.headSprite.renderOrder = 2; // draw over its own body
    this.group.add(this.headSprite);

    // Body: a chain of cloud segments from neck to tail.
    const count = SEGMENTS_BY_TIER[this.tier];
    for (let i = 0; i < count; i++) {
      const t = (i + 1) / count; // 0..1, head -> tail
      const tex = this.segTextures[i % this.segTextures.length];
      if (tex === null || tex === undefined) continue;
      const mat = new SpriteMaterial({ map: tex, transparent: true, depthWrite: false, toneMapped: false });
      const sprite = new Sprite(mat);
      // Taper: fat near the head, thin at the tail; overlap keeps the chain continuous.
      const w = HEAD_SCALE * (0.85 - 0.55 * t);
      sprite.scale.set(w, w * 0.62, 1);
      sprite.renderOrder = 1;
      this.group.add(sprite);
      this.segments.push({ sprite, mat, t });
    }
  }

  /**
   * dragonZ: head z (world). time: seconds. lunge 0..1: head dips toward the hero (caught).
   * heroX: hero x, used to keep the head roughly over the hero while the body snakes.
   * gap: dragonZ - heroZ; the head looms larger and lower as it closes.
   * camZ: camera z. pin: during play the head is pinned HEAD_AHEAD in front of the camera
   * (the real dragon is behind the rig); false during the pan reveal and the catch turn-back,
   * where the camera already looks at the true position.
   */
  update(dragonZ: number, time: number, lunge: number, heroX: number, gap: number, camZ: number, pin: boolean): void {
    if (!this.built) return;

    // Proximity 0 (far) .. 1 (on you). fogGap 22 -> catchGap 2.5 is the ramp.
    const prox = Math.min(1, Math.max(0, (22 - gap) / 19.5));
    const headZ = pin ? Math.min(dragonZ, camZ - HEAD_AHEAD) : dragonZ;
    const hillRef = pin ? hillY(camZ) : hillY(headZ);
    const headX = heroX * 0.4 + Math.sin(time * 0.7) * 1.5;
    const headY = hillRef + HOVER - prox * 3 + Math.sin(time * 0.9) * 1.2 - lunge * 7;

    if (this.headSprite !== null) {
      this.headSprite.position.set(headX, headY, headZ);
      const s = 1 + prox * 0.6 + lunge * 0.25;
      this.headSprite.scale.set(HEAD_SCALE * s, HEAD_SCALE * (306 / 915) * s, 1);
    }

    // Controlled pose swap (not a flicker): every HEAD_SWAP_S seconds while lunging or idle.
    if (!this.catching && time - this.lastHeadSwap > HEAD_SWAP_S) {
      this.lastHeadSwap = time;
      this.headIndex = 1 - this.headIndex;
      if (this.headMat !== null) {
        this.headMat.map = this.headTextures[this.headIndex];
        this.headMat.needsUpdate = true;
      }
    }

    // Serpentine chain: sample a centerline behind the head and offset each segment
    // laterally with a traveling sine wave whose amplitude grows toward the tail.
    // During play the chain sweeps past the camera; fade segments out before they blot the view.
    const fadeStart = camZ - 6;
    for (const s of this.segments) {
      const u = s.t;
      const segZ = headZ + u * BODY_LEN;
      const segY = hillY(segZ) + HOVER + 2 * Math.sin(u * Math.PI * 0.5);
      const amp = WAVE_AMP * u * u; // small near the head, large at the tail
      const phase = WAVE_K * u * Math.PI * 2 - WAVE_W * time;
      const offsetX = amp * Math.sin(phase);
      s.sprite.position.set(headX + offsetX, segY, segZ);
      // Orient toward the tangent of the wave (screen-space lean).
      s.mat.rotation = Math.atan2(amp * Math.cos(phase) * WAVE_K * Math.PI * 2, BODY_LEN) * 0.5;
      let op = 1;
      if (pin && segZ > fadeStart) op = Math.max(0, 1 - (segZ - fadeStart) / 4);
      s.mat.opacity = op;
      s.sprite.visible = op > 0.01;
    }
  }

  /**
   * Game-over catch beat (see catchPose.ts). Call after update() and after the camera pose for
   * the frame is final. k 0 = normal; 0..1 = head lunges into camera space; settle 0..1 = docked
   * next to the card.
   */
  setCatch(camera: PerspectiveCamera, k: number, settle: number, time: number): void {
    const head = this.headSprite;
    const mat = this.headMat;
    if (head === null || mat === null) return;
    if (k <= 0) {
      if (this.catching) {
        this.catching = false;
        mat.depthTest = true;
        head.renderOrder = 2;
        mat.map = this.headTextures[this.headIndex];
        mat.needsUpdate = true;
      }
      return;
    }
    if (!this.catching) {
      this.catching = true;
      mat.depthTest = false;
      head.renderOrder = 999;
      mat.map = this.headTextures[0];
      mat.needsUpdate = true;
    }
    // Unproject NDC points through the camera's current projection (view offset / lens shift
    // included) onto the plane CATCH_DIST in front of it. The old camera-space maths assumed a
    // centred principal point and broke under the portrait lens shift (camera.setViewOffset).
    camera.updateMatrixWorld();
    const p = catchPose(camera.aspect, settle, this.catchPoseScratch);
    let cy = p.cy;
    if (settle > 0) cy += Math.sin(time * 1.6) * 0.01;
    this.ndcOnPlane(camera, 2 * p.cx, 2 * cy, this.target);
    this.ndcOnPlane(camera, 2 * p.cx, 2 * cy + p.h, this.pTop);
    this.ndcOnPlane(camera, 2 * p.cx, 2 * cy - p.h, this.pBot);
    const tH = this.pTop.distanceTo(this.pBot);
    const e = easeOutBack(k);
    const curH = head.scale.y;
    head.position.lerp(this.target, e);
    const h = curH + (tH - curH) * e;
    head.scale.set(h / HEAD_H_OVER_W, h, 1);
    const bodyOp = MathUtils.clamp(1 - k / 0.4, 0, 1);
    for (const s of this.segments) {
      s.mat.opacity *= bodyOp;
      s.sprite.visible = s.mat.opacity > 0.01;
    }
  }

  /** World point on the plane CATCH_DIST in front of the camera that projects to NDC (x, y). */
  private ndcOnPlane(camera: PerspectiveCamera, x: number, y: number, out: Vector3): void {
    out.set(x, y, 0.5).applyMatrix4(camera.projectionMatrixInverse);
    out.multiplyScalar(CATCH_DIST / -out.z).applyMatrix4(camera.matrixWorld);
  }

  /** Head sprite centre as viewport fractions from the top-left (valid after setCatch). */
  headScreen(camera: PerspectiveCamera, out: { x: number; y: number }): void {
    this.pTop.copy(this.headSprite?.position ?? this.target).project(camera);
    out.x = 0.5 + this.pTop.x / 2;
    out.y = 0.5 - this.pTop.y / 2;
  }

  dispose(): void {
    this.clearBuilt();
    for (const t of this.headTextures) t?.dispose();
    for (const t of this.segTextures) t?.dispose();
    this.built = false;
  }
}
