// T290e dragon: square head sprite, one continuous ribbon body (DragonRibbon, a triangle strip
// with a tileable scale texture), a flame-plume tail sprite and a few neck mist cards.
// Textures are preloaded once via TextureLoader; the update/layout loops only mutate buffers and
// transforms (no per-frame allocation).
import {
  CanvasTexture,
  ClampToEdgeWrapping,
  DoubleSide,
  Group,
  LinearFilter,
  LinearMipmapLinearFilter,
  MathUtils,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  RepeatWrapping,
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
import {
  DragonRibbon,
  HEAD_SCALE,
  V_PHASE,
  W_TAIL,
  WAVE_K,
  WAVE_W,
  ribbonRootY,
  ribbonWidth,
} from './dragonRibbon';
import type { RibbonParams } from './dragonRibbon';

const HOVER = 7; // metres above the hill line at the head (in-frame, above the hero)
const HEAD_AHEAD = 14; // during play: the head is pinned this far in front of the camera
const HEAD_ORDER = 3;
const LAG_S = 0.6; // head-follow lag of the body (seconds)

// Tail plume sprite (v2/tail.webp, tail-up art, pivot at the tube base). Measured on the asset.
const TAIL_TUBE_FRAC = 0.24;
const TAIL_ASPECT = 1.016; // H / W
const TAIL_W = W_TAIL / TAIL_TUBE_FRAC;
const TAIL_H = TAIL_W * TAIL_ASPECT;
const TAIL_OVERLAP_F = 0.3;
const WHIP_A = 0.3;
const FALLBACK_BODY_COLOR = 0x7a2a18;

// Mist cards: soft cool-grey radial sprites forming a cloud collar around the neck.
const MIST_PX = 128;
const MIST_COLOR = 0xcdd0da; // = CLOUD_FOG_COLOR in game.ts
const MIST_SCALE = 1.8;
const MIST_MAX_W = 18;
const MIST_ASPECT = 0.55;
const MIST_OP = 0.5;
const MIST_MIN = 0.55;
const MIST_PULL = 5;
const MIST_DROP = 0.35;
const ROUTE_CLEAR = 4;
const ROUTE_FADE = 6;
const LENS_NEAR = 8;
const LENS_FADE = 8;
const MIST_U_LOW = [0.05];
const MIST_U = [0.05, 0.2];

const PATH_HEAD = '/assets/dragon/v2/head-a.webp';
const PATH_STRIP = '/assets/dragon/v2/body-strip.webp';
const PATH_TAIL = '/assets/dragon/v2/tail.webp';

type Mist = { sprite: Sprite; mat: SpriteMaterial; u: number };

function clamp01(x: number): number {
  return x < 0 ? 0 : x > 1 ? 1 : x;
}

function prepSprite(tex: Texture): Texture {
  tex.colorSpace = SRGBColorSpace;
  tex.minFilter = LinearFilter;
  tex.magFilter = LinearFilter;
  tex.generateMipmaps = false;
  return tex;
}

function prepStrip(tex: Texture): Texture {
  tex.colorSpace = SRGBColorSpace;
  tex.wrapS = ClampToEdgeWrapping;
  tex.wrapT = RepeatWrapping;
  tex.generateMipmaps = true;
  tex.minFilter = LinearMipmapLinearFilter;
  tex.magFilter = LinearFilter;
  return tex;
}

export class DragonSpriteView {
  readonly group = new Group();
  private tier: GraphicsTier;
  private readonly loader = new TextureLoader();
  private headTexture: Texture | null = null;
  private stripTexture: Texture | null = null;
  private tailTexture: Texture | null = null;
  private texturesSettled = 0; // loaded or failed
  private disposed = false;
  private readonly warned = new Set<string>();
  private readonly textureTotal = 3;
  private mistTex: CanvasTexture | null = null;
  private headSprite: Sprite | null = null;
  private headMat: SpriteMaterial | null = null;
  private ribbon: DragonRibbon | null = null;
  private ribbonMesh: Mesh | null = null;
  private ribbonMat: MeshBasicMaterial | null = null;
  private tailSprite: Sprite | null = null;
  private tailMat: SpriteMaterial | null = null;
  private mists: Mist[] = [];
  private built = false;
  private catching = false;
  private readonly catchPoseScratch: CatchPose = { cx: 0, cy: 0, h: 0 };
  private readonly pTop = new Vector3();
  private readonly pBot = new Vector3();
  private readonly target = new Vector3();
  private readonly params: RibbonParams = { headX: 0, headY: 0, headZ: 0, s: 1, lagX: 0, lagY: 0, time: 0 };
  private lastTime = -1;
  private heroZ = 0;
  private camZ = 0;

  constructor(tier: GraphicsTier) {
    this.tier = tier;
    this.group.name = 'chase_dragon';
    this.loadTextures();
  }

  private settle(): void {
    this.texturesSettled++;
    if (this.texturesSettled === this.textureTotal && !this.built && !this.disposed) this.build();
  }

  private loadOne(path: string, prep: (t: Texture) => Texture, assign: (t: Texture) => void): void {
    this.loader.load(
      path,
      (t) => {
        if (this.disposed) {
          t.dispose();
          return;
        }
        assign(prep(t));
        this.settle();
      },
      undefined,
      () => {
        if (this.disposed) return;
        if (!this.warned.has(path)) {
          this.warned.add(path);
          console.warn(`DragonSpriteView: failed to load ${path}`);
        }
        this.settle();
      },
    );
  }

  private loadTextures(): void {
    this.loadOne(PATH_HEAD, prepSprite, (t) => {
      this.headTexture = t;
    });
    this.loadOne(PATH_STRIP, prepStrip, (t) => {
      this.stripTexture = t;
    });
    this.loadOne(PATH_TAIL, prepSprite, (t) => {
      this.tailTexture = t;
    });
  }

  private mistTexture(): CanvasTexture | null {
    if (this.mistTex !== null) return this.mistTex;
    if (typeof document === 'undefined') return null; // node test env: no mist
    const c = document.createElement('canvas');
    c.width = MIST_PX;
    c.height = MIST_PX;
    const g = c.getContext('2d');
    if (g === null) return null;
    const r = MIST_PX / 2;
    const grad = g.createRadialGradient(r, r, 0, r, r, r);
    grad.addColorStop(0, 'rgba(255,255,255,1)');
    grad.addColorStop(0.45, 'rgba(255,255,255,0.55)');
    grad.addColorStop(1, 'rgba(255,255,255,0)');
    g.fillStyle = grad;
    g.fillRect(0, 0, MIST_PX, MIST_PX);
    const t = new CanvasTexture(c);
    t.colorSpace = SRGBColorSpace;
    this.mistTex = t;
    return t;
  }

  setTier(tier: GraphicsTier): void {
    if (tier === this.tier) return;
    this.tier = tier;
    if (this.built) this.build();
  }

  private clearBuilt(): void {
    // A rebuilt head has fresh material state; let the next setCatch re-apply the beat.
    this.catching = false;
    this.lastTime = -1; // snap the body lag after a rebuild
    if (this.headSprite !== null) {
      this.group.remove(this.headSprite);
      this.headSprite = null;
    }
    if (this.headMat !== null) {
      this.headMat.dispose();
      this.headMat = null;
    }
    if (this.ribbonMesh !== null) {
      this.group.remove(this.ribbonMesh);
      this.ribbonMesh = null;
    }
    this.ribbonMat?.dispose();
    this.ribbonMat = null;
    this.ribbon?.dispose();
    this.ribbon = null;
    if (this.tailSprite !== null) {
      this.group.remove(this.tailSprite);
      this.tailSprite = null;
    }
    this.tailMat?.dispose();
    this.tailMat = null;
    for (const m of this.mists) {
      this.group.remove(m.sprite);
      m.mat.dispose();
    }
    this.mists = [];
  }

  private build(): void {
    this.clearBuilt();
    this.built = true;

    // Head: square front-facing sprite. Fog off: the head is the source of the white-out and must
    // stay readable through it. Missing head-a: no head; the catch beat then no-ops.
    if (this.headTexture !== null) {
      this.headMat = new SpriteMaterial({
        map: this.headTexture,
        transparent: true,
        depthWrite: false,
        fog: false,
        toneMapped: false,
      });
      this.headSprite = new Sprite(this.headMat);
      this.headSprite.scale.set(HEAD_SCALE, HEAD_SCALE, 1);
      this.headSprite.renderOrder = HEAD_ORDER; // draw over its own body
      this.group.add(this.headSprite);
    }

    // Body: one ribbon mesh. Missing strip texture: plain colour (the dragon still has a body).
    this.ribbon = new DragonRibbon(this.tier);
    this.ribbonMat =
      this.stripTexture !== null
        ? new MeshBasicMaterial({
            map: this.stripTexture,
            transparent: true,
            depthWrite: false,
            side: DoubleSide,
            toneMapped: false,
          })
        : new MeshBasicMaterial({
            map: null,
            color: FALLBACK_BODY_COLOR,
            transparent: true,
            depthWrite: false,
            side: DoubleSide,
            toneMapped: false,
          });
    this.ribbonMesh = new Mesh(this.ribbon.geometry, this.ribbonMat);
    this.ribbonMesh.frustumCulled = false;
    this.ribbonMesh.castShadow = false;
    this.ribbonMesh.receiveShadow = false;
    this.ribbonMesh.renderOrder = 1;
    this.group.add(this.ribbonMesh);

    if (this.tailTexture !== null) {
      this.tailMat = new SpriteMaterial({
        map: this.tailTexture,
        transparent: true,
        depthWrite: false,
        toneMapped: false,
      });
      this.tailSprite = new Sprite(this.tailMat);
      this.tailSprite.center.set(0.5, 0);
      this.tailSprite.scale.set(TAIL_W, TAIL_H, 1);
      this.tailSprite.renderOrder = 2;
      this.group.add(this.tailSprite);
    }

    // Mist collar around the neck.
    const mt = this.mistTexture();
    if (mt !== null) {
      const us = this.tier === 'low' ? MIST_U_LOW : MIST_U;
      for (const u of us) {
        const mat = new SpriteMaterial({
          map: mt,
          color: MIST_COLOR,
          transparent: true,
          depthWrite: false,
          depthTest: true,
          fog: false,
          toneMapped: false,
        });
        const sprite = new Sprite(mat);
        sprite.renderOrder = 0;
        sprite.visible = false;
        this.group.add(sprite);
        this.mists.push({ sprite, mat, u });
      }
    }
  }

  /**
   * dragonZ: head z (world). time: seconds. lunge 0..1: head dips toward the hero (caught).
   * heroX: hero x, used to keep the head roughly over the hero while the body snakes.
   * gap: dragonZ - heroZ; the head looms larger and lower as it closes.
   * camZ: camera z. pin: during play the head is pinned HEAD_AHEAD in front of the camera
   * (the real dragon is behind the rig); false during the pan reveal and the catch turn-back,
   * where the camera already looks at the true position.
   * The body is placed by layout(camera), called once the camera pose is final.
   */
  update(dragonZ: number, time: number, lunge: number, heroX: number, gap: number, camZ: number, pin: boolean): void {
    if (!this.built) return;

    // Proximity 0 (far) .. 1 (on you). fogGap 22 -> catchGap 2.5 is the ramp.
    const prox = Math.min(1, Math.max(0, (22 - gap) / 19.5));
    const headZ = pin ? Math.min(dragonZ, camZ - HEAD_AHEAD) : dragonZ;
    const hillRef = pin ? hillY(camZ) : hillY(headZ);
    const headX = heroX * 0.4 + Math.sin(time * 0.7) * 1.5;
    const headY = hillRef + HOVER - prox * 3 + Math.sin(time * 0.9) * 1.2 - lunge * 7;
    const s = 1 + prox * 0.6 + lunge * 0.25;

    if (this.headSprite !== null) {
      this.headSprite.position.set(headX, headY, headZ);
      this.headSprite.scale.set(HEAD_SCALE * s, HEAD_SCALE * s, 1);
    }

    // Head-follow lag: the far body trails the head by about LAG_S seconds.
    const p = this.params;
    const rootY = ribbonRootY(headY, s);
    if (this.lastTime < 0) {
      p.lagX = headX;
      p.lagY = rootY;
    } else {
      const dt = MathUtils.clamp(time - this.lastTime, 0, 0.1);
      const a = 1 - Math.exp(-dt / LAG_S);
      p.lagX += (headX - p.lagX) * a;
      p.lagY += (rootY - p.lagY) * a;
    }
    this.lastTime = time;
    p.headX = headX;
    p.headY = headY;
    p.headZ = headZ;
    p.s = s;
    p.time = time;
    this.heroZ = dragonZ - gap;
    this.camZ = camZ;
  }

  /**
   * Places the ribbon, tail and mist from the values stored by update(). Call once per frame
   * after the camera pose and fov are final, before setCatch().
   */
  layout(camera: PerspectiveCamera): void {
    const rb = this.ribbon;
    if (!this.built || rb === null) return;
    const p = this.params;
    rb.layout(p);
    if (this.ribbonMat !== null) this.ribbonMat.opacity = 1;
    if (this.ribbonMesh !== null) this.ribbonMesh.visible = true;
    const n = rb.sections;
    const c = rb.centres;

    if (this.tailSprite !== null && this.tailMat !== null) {
      const e = 3 * (n - 1);
      let tx = c[e] - c[e - 6];
      let ty = c[e + 1] - c[e - 5];
      let tz = c[e + 2] - c[e - 4];
      const tl = Math.hypot(tx, ty, tz) || 1;
      tx /= tl;
      ty /= tl;
      tz /= tl;
      const k = TAIL_OVERLAP_F * TAIL_H;
      this.tailSprite.position.set(c[e] - tx * k, c[e + 1] - ty * k, c[e + 2] - tz * k);
      camera.updateMatrixWorld();
      this.pBot.set(c[e - 6], c[e - 5], c[e - 4]).project(camera);
      this.pTop.set(c[e], c[e + 1], c[e + 2]).project(camera);
      const dx = this.pTop.x - this.pBot.x;
      const dy = this.pTop.y - this.pBot.y;
      const phTail = 2 * Math.PI * WAVE_K - WAVE_W * p.time;
      this.tailMat.rotation = Math.atan2(dy, dx * camera.aspect) - Math.PI / 2 + WHIP_A * Math.sin(phTail - Math.PI / 3);
      this.tailMat.opacity = 1;
      this.tailSprite.visible = true;
    }

    for (const m of this.mists) {
      const idx = Math.min(n - 1, Math.round(m.u * (n - 1)));
      const wd = ribbonWidth(m.u, p.s, p.time);
      const mistZ = c[3 * idx + 2] - MIST_PULL;
      const vWave = Math.sin(2 * Math.PI * WAVE_K * m.u - WAVE_W * p.time + V_PHASE);
      const routeK = clamp01((mistZ - this.heroZ - ROUTE_CLEAR) / ROUTE_FADE);
      const lensK = clamp01((mistZ - this.camZ - LENS_NEAR) / LENS_FADE);
      const dipK = 0.5 - 0.5 * vWave;
      const mop = MIST_OP * routeK * lensK * (MIST_MIN + (1 - MIST_MIN) * dipK);
      const mw = Math.min(MIST_MAX_W, MIST_SCALE * wd);
      m.sprite.scale.set(mw, mw * MIST_ASPECT, 1);
      m.sprite.position.set(c[3 * idx], c[3 * idx + 1] - MIST_DROP * wd, mistZ);
      m.mat.opacity = mop;
      m.sprite.visible = mop > 0.01;
    }
  }

  /**
   * Game-over catch beat (see catchPose.ts). Call after update(), layout() and after the camera
   * pose for the frame is final. k 0 = normal; 0..1 = head lunges into camera space; settle 0..1 =
   * docked next to the card.
   */
  setCatch(camera: PerspectiveCamera, k: number, settle: number, time: number): void {
    const head = this.headSprite;
    const mat = this.headMat;
    if (head === null || mat === null) return;
    if (k <= 0) {
      if (this.catching) {
        this.catching = false;
        mat.depthTest = true;
        head.renderOrder = HEAD_ORDER;
        mat.needsUpdate = true;
      }
      return;
    }
    if (!this.catching) {
      this.catching = true;
      mat.depthTest = false;
      head.renderOrder = 999;
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
    if (this.ribbonMat !== null && this.ribbonMesh !== null) {
      this.ribbonMat.opacity *= bodyOp;
      this.ribbonMesh.visible = this.ribbonMat.opacity > 0.01;
    }
    if (this.tailMat !== null && this.tailSprite !== null) {
      this.tailMat.opacity *= bodyOp;
      this.tailSprite.visible = this.tailMat.opacity > 0.01;
    }
    for (const m of this.mists) {
      m.mat.opacity *= bodyOp;
      m.sprite.visible = m.mat.opacity > 0.01;
    }
  }

  /** World point on the plane CATCH_DIST in front of the camera that projects to NDC (x, y). */
  private ndcOnPlane(camera: PerspectiveCamera, x: number, y: number, out: Vector3): void {
    out.set(x, y, 0.5).applyMatrix4(camera.projectionMatrixInverse);
    out.multiplyScalar(CATCH_DIST / -out.z).applyMatrix4(camera.matrixWorld);
  }

  /** Head sprite centre as viewport fractions from the top-left (valid after setCatch). */
  headScreen(camera: PerspectiveCamera, out: { x: number; y: number }): void {
    const head = this.headSprite;
    if (head === null) return; // no head: leave out as the caller set it
    this.pTop.copy(head.position).project(camera);
    out.x = 0.5 + this.pTop.x / 2;
    out.y = 0.5 - this.pTop.y / 2;
  }

  dispose(): void {
    this.disposed = true;
    this.clearBuilt();
    this.headTexture?.dispose();
    this.stripTexture?.dispose();
    this.tailTexture?.dispose();
    this.mistTex?.dispose();
    this.mistTex = null;
    this.built = false;
  }
}
