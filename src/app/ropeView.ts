import {
  AdditiveBlending,
  BoxGeometry,
  BufferAttribute,
  BufferGeometry,
  CircleGeometry,
  Color,
  CylinderGeometry,
  Group,
  Line,
  LineBasicMaterial,
  Mesh,
  MeshBasicMaterial,
  MeshLambertMaterial,
  Vector3,
} from 'three';
import { HOOK_ATTACHED, HOOK_FLYING, HOOK_IDLE } from '../core/hook';
import type { Hook } from '../core/hook';
import { GOLD, ROPE_TIE, twistColor } from './ropePost';

// Tube per ADR 0005 D6: SEG rings x RAD sides, radius 0.04 m (288 tris).
const SEG = 24;
const RAD = 6;
const RADIUS = 0.04;
// Trailing rope past the hero (ADR 0006 section 3): same tube geometry, no extra call.
const TRAIL_SEG = 12;
const TRAIL_RADIUS = 0.045;
const TRAIL_BACK = 8;
// Ring centres closer than this to the camera are pushed out radially.
const CAM_CLEAR = 0.7;
// Rings at this fraction of the drawn rope and beyond lerp to gold (the anchor end).
const GOLD_START = 0.8;
const LINE_COLOR = '#3a2a22';
const HANDLE_COLOR = '#ffc83a';
const HALO_RADIUS = 0.9;
const HALO_SEGMENTS = 20;
// Cosmetic sag as a fraction of rope length; the physics rope is a straight chord.
const SAG_FLYING = 0.04;
const SAG_TAUT = 0.012;
// Sag eases toward its goal with this time constant (s) instead of snapping.
const SAG_TAU = 0.12;
// Attach vibration: decay constant (s), two modes (Hz). Ends are nodes.
const VIB_TAU = 0.35;
const VIB_F1 = 6;
const VIB_F2 = 11;
const VIB_MIN = 5e-4;
const TWO_PI = Math.PI * 2;
const WHEEL_R = 0.065;
const WHEEL_COLOR = '#3a2a22';

// Static ring angles (RAD + 1 entries, seam duplicate), so the frame rewrite does no trig.
const RING_COS: number[] = [];
const RING_SIN: number[] = [];
for (let j = 0; j <= RAD; j++) {
  const a = (j / RAD) * Math.PI * 2;
  RING_COS.push(Math.cos(a));
  RING_SIN.push(Math.sin(a));
}

// Static twist pattern + gold end, baked once: (i + j) % 3 gives diagonal hemp stripes.
// Colours go through three's Color so the sRGB hex is converted to linear (ADR 0006 F2).
const scratchColor = new Color();
function fillRopeColors(colors: Float32Array): void {
  const rings = SEG + 1 + TRAIL_SEG + 1;
  for (let r = 0; r < rings; r++) {
    const trail = r > SEG;
    const i = trail ? r - SEG - 1 : r;
    const t = trail ? 0 : i / SEG;
    const k = t > GOLD_START ? (t - GOLD_START) / (1 - GOLD_START) : 0;
    for (let j = 0; j <= RAD; j++) {
      twistColor(i, j, k, scratchColor);
      const o = (r * (RAD + 1) + j) * 3;
      colors[o] = scratchColor.r;
      colors[o + 1] = scratchColor.g;
      colors[o + 2] = scratchColor.b;
    }
  }
}

// Visual rope from the hero hand to the anchor: a twisted tube, a gold anchor glow,
// a camera-facing halo and a trolley sleeve at the hand. Purely cosmetic: reads the
// hook, never writes it. Geometry and arrays are preallocated; every per-frame write
// is in place (ADR 0005 D6/D10: zero per-frame allocation, no per-frame colour work).
export class RopeView {
  readonly group = new Group();
  private readonly line: Line;
  private readonly tube: Mesh;
  private readonly handle: Mesh;
  private readonly halo: Mesh;
  /** Trolley wheel, child of the handle; rotation.x is a pure function of hook.s. */
  readonly wheel: Mesh;
  private sagCur = SAG_FLYING;
  private vibAmp = 0;
  private vibT = 0;
  // Centre line shared by the tube and the 1 px fallback line.
  private readonly center: Float32Array;
  private readonly trailCenter: Float32Array;
  /** Camera position, copied in the tube's onBeforeRender (one-frame lag). */
  readonly eye = new Vector3();
  private readonly tubePos: Float32Array;
  private readonly tubeNrm: Float32Array;
  private readonly linePos: BufferAttribute;
  private readonly tubePosAttr: BufferAttribute;
  private readonly tubeNrmAttr: BufferAttribute;

  constructor() {
    // 1 px fallback line, so the rope never vanishes at distance (ADR 0005 D6).
    this.center = new Float32Array((SEG + 1) * 3);
    this.trailCenter = new Float32Array((TRAIL_SEG + 1) * 3);
    const lineGeo = new BufferGeometry();
    this.linePos = new BufferAttribute(this.center, 3);
    lineGeo.setAttribute('position', this.linePos);
    this.line = new Line(lineGeo, new LineBasicMaterial({ color: LINE_COLOR }));
    this.line.frustumCulled = false;

    // Tube: (SEG + 1) rings x (RAD + 1) verts (the seam vert duplicates j = 0).
    const verts = (SEG + 1 + TRAIL_SEG + 1) * (RAD + 1);
    this.tubePos = new Float32Array(verts * 3);
    this.tubeNrm = new Float32Array(verts * 3);
    const colors = new Float32Array(verts * 3);
    fillRopeColors(colors);
    const index = new Uint16Array((SEG + TRAIL_SEG) * RAD * 6);
    let k = 0;
    for (let i = 0; i < SEG + TRAIL_SEG; i++) {
      // Main rings 0..SEG, trail rings SEG+1..; no quads between the two strips.
      const q = i < SEG ? i : i + 1;
      for (let j = 0; j < RAD; j++) {
        const a = q * (RAD + 1) + j;
        const b = (q + 1) * (RAD + 1) + j;
        const c = b + 1;
        const d = a + 1;
        index[k++] = a;
        index[k++] = d;
        index[k++] = c;
        index[k++] = a;
        index[k++] = c;
        index[k++] = b;
      }
    }
    const tubeGeo = new BufferGeometry();
    this.tubePosAttr = new BufferAttribute(this.tubePos, 3);
    this.tubeNrmAttr = new BufferAttribute(this.tubeNrm, 3);
    tubeGeo.setAttribute('position', this.tubePosAttr);
    tubeGeo.setAttribute('normal', this.tubeNrmAttr);
    tubeGeo.setAttribute('color', new BufferAttribute(colors, 3));
    tubeGeo.setIndex(new BufferAttribute(index, 1));
    this.tube = new Mesh(tubeGeo, new MeshLambertMaterial({ vertexColors: true }));
    this.tube.frustumCulled = false;
    this.tube.onBeforeRender = (_renderer, _scene, camera) => {
      this.eye.copy(camera.position);
    };

    // Small trolley sleeve at the hand, aimed down the rope.
    this.handle = new Mesh(
      new BoxGeometry(0.28, 0.1, 0.1),
      new MeshBasicMaterial({ color: HANDLE_COLOR }),
    );

    this.wheel = new Mesh(
      new CylinderGeometry(WHEEL_R, WHEEL_R, 0.035, 6).rotateZ(Math.PI / 2),
      new MeshLambertMaterial({ color: WHEEL_COLOR, flatShading: true }),
    );
    this.wheel.position.set(0, 0.08, 0);
    this.handle.add(this.wheel);

    // Additive halo at the anchor (or the flying hook tip): gold, soft centre.
    const haloGeo = new CircleGeometry(HALO_RADIUS, HALO_SEGMENTS);
    const haloPos = haloGeo.getAttribute('position');
    const haloColors = new Float32Array(haloPos.count * 4);
    for (let i = 0; i < haloPos.count; i++) {
      const o = i * 4;
      haloColors[o] = 1;
      haloColors[o + 1] = 1;
      haloColors[o + 2] = 1;
      const x = haloPos.getX(i);
      const y = haloPos.getY(i);
      haloColors[o + 3] = x * x + y * y < 1e-6 ? 0.9 : 0;
    }
    haloGeo.setAttribute('color', new BufferAttribute(haloColors, 4));
    this.halo = new Mesh(
      haloGeo,
      new MeshBasicMaterial({
        color: GOLD,
        vertexColors: true,
        transparent: true,
        blending: AdditiveBlending,
        depthWrite: false,
        fog: false,
      }),
    );
    this.halo.frustumCulled = false;
    // Billboard without touching game.ts: onBeforeRender runs before the model-view
    // matrix is computed, so a forced matrix update here is picked up this frame.
    this.halo.onBeforeRender = (_renderer, _scene, camera) => {
      this.halo.quaternion.copy(camera.quaternion);
      this.halo.updateMatrixWorld(true);
    };

    this.group.add(this.line, this.tube, this.handle, this.halo);
    this.group.visible = false;
  }

  /** Kick the attached rope: a decaying two-mode vibration. amp in metres. */
  pulse(amp: number): void {
    if (amp > this.vibAmp) this.vibAmp = amp;
    this.vibT = 0;
  }

  /** hand* is the (interpolated) hand position; hook is the live sim hook; dt in seconds. */
  update(
    hook: Hook,
    handX: number,
    handY: number,
    handZ: number,
    hookSpeed: number,
    dt: number,
  ): void {
    if (hook.state === HOOK_IDLE) {
      this.group.visible = false;
      this.sagCur = SAG_FLYING;
      this.vibAmp = 0;
      ROPE_TIE.live = false;
      return;
    }
    this.group.visible = true;
    const attached = hook.state === HOOK_ATTACHED;
    ROPE_TIE.live = attached && ROPE_TIE.set && hook.anchorId === ROPE_TIE.anchorId;
    let tx = hook.ax;
    let ty = hook.ay;
    let tz = hook.az;
    let sagGoal = SAG_TAUT;
    if (hook.state === HOOK_FLYING) {
      // Hook tip travels from the hand toward the anchor.
      const total = hook.len / hookSpeed;
      const k = total > 0 ? Math.min(1, Math.max(0, 1 - hook.flyT / total)) : 1;
      tx = handX + (hook.ax - handX) * k;
      ty = handY + (hook.ay - handY) * k;
      tz = handZ + (hook.az - handZ) * k;
      sagGoal = SAG_FLYING;
    }
    this.sagCur += (sagGoal - this.sagCur) * (1 - Math.exp(-dt / SAG_TAU));
    const sag = this.sagCur;
    const dx = tx - handX;
    const dy = ty - handY;
    const dz = tz - handZ;
    const drop = Math.sqrt(dx * dx + dy * dy + dz * dz) * sag;

    // Centre line, shared with the fallback line.
    for (let i = 0; i <= SEG; i++) {
      const t = i / SEG;
      const sagY = -4 * drop * t * (1 - t);
      this.center[i * 3] = handX + dx * t;
      this.center[i * 3 + 1] = handY + dy * t + sagY;
      this.center[i * 3 + 2] = handZ + dz * t;
    }

    // Attach vibration on the centre line only (trail untouched, ends are nodes).
    if (attached && this.vibAmp > 0) {
      this.vibT += dt;
      const env = this.vibAmp * Math.exp(-this.vibT / VIB_TAU);
      if (env < VIB_MIN) {
        this.vibAmp = 0;
      } else {
        for (let i = 1; i < SEG; i++) {
          const t = i / SEG;
          this.center[i * 3 + 1] +=
            env *
            (Math.sin(TWO_PI * VIB_F1 * this.vibT) * Math.sin(Math.PI * t) +
              0.4 * Math.sin(TWO_PI * VIB_F2 * this.vibT) * Math.sin(TWO_PI * t));
        }
      }
    } else if (!attached) {
      this.vibAmp = 0;
    }

    // Trail: hand -> Q = O - u * TRAIL_BACK (or the post tie), only while attached.
    // Otherwise every trail vertex collapses onto the hand.
    let trailRadius = 0;
    if (attached) {
      trailRadius = TRAIL_RADIUS;
      let qx = hook.ox - hook.dirX * TRAIL_BACK;
      let qy = hook.oy - hook.dirY * TRAIL_BACK;
      let qz = hook.oz - hook.dirZ * TRAIL_BACK;
      if (ROPE_TIE.live) {
        const along =
          (ROPE_TIE.x - hook.ox) * hook.dirX +
          (ROPE_TIE.y - hook.oy) * hook.dirY +
          (ROPE_TIE.z - hook.oz) * hook.dirZ;
        if (along < -1) {
          qx = ROPE_TIE.x;
          qy = ROPE_TIE.y;
          qz = ROPE_TIE.z;
        }
      }
      const ex = qx - handX;
      const ey = qy - handY;
      const ez = qz - handZ;
      const tdrop = Math.sqrt(ex * ex + ey * ey + ez * ez) * SAG_TAUT;
      for (let i = 0; i <= TRAIL_SEG; i++) {
        const t = i / TRAIL_SEG;
        this.trailCenter[i * 3] = handX + ex * t;
        this.trailCenter[i * 3 + 1] = handY + ey * t - 4 * tdrop * t * (1 - t);
        this.trailCenter[i * 3 + 2] = handZ + ez * t;
      }
    } else {
      for (let i = 0; i <= TRAIL_SEG; i++) {
        this.trailCenter[i * 3] = handX;
        this.trailCenter[i * 3 + 1] = handY;
        this.trailCenter[i * 3 + 2] = handZ;
      }
    }

    // Camera clearance: push ring centres out to CAM_CLEAR (skip until first render).
    if (this.eye.x !== 0 || this.eye.y !== 0 || this.eye.z !== 0) {
      this.pushFromEye(this.center, SEG);
      if (attached) this.pushFromEye(this.trailCenter, TRAIL_SEG);
    }
    this.linePos.needsUpdate = true;

    this.writeRings(this.center, SEG, 0, RADIUS);
    this.writeRings(this.trailCenter, TRAIL_SEG, SEG + 1, trailRadius);
    this.tubePosAttr.needsUpdate = true;
    this.tubeNrmAttr.needsUpdate = true;

    this.halo.position.set(tx, ty, tz);
    this.handle.position.set(handX, handY + 0.05, handZ);
    this.handle.lookAt(tx, ty, tz);
    this.wheel.rotation.x = -hook.s / WHEEL_R;
  }

  private pushFromEye(c: Float32Array, segs: number): void {
    const ex = this.eye.x;
    const ey = this.eye.y;
    const ez = this.eye.z;
    for (let i = 0; i <= segs; i++) {
      const vx = c[i * 3] - ex;
      const vy = c[i * 3 + 1] - ey;
      const vz = c[i * 3 + 2] - ez;
      const d = Math.sqrt(vx * vx + vy * vy + vz * vz);
      if (d >= CAM_CLEAR) continue;
      if (d < 1e-6) {
        c[i * 3] = ex + CAM_CLEAR;
        continue;
      }
      const f = CAM_CLEAR / d;
      c[i * 3] = ex + vx * f;
      c[i * 3 + 1] = ey + vy * f;
      c[i * 3 + 2] = ez + vz * f;
    }
  }

  // Ring frame: T by central difference, N = normalize(T x up) with up = +y
  // (fall back to +x when |T.y| > 0.95), B = T x N. Positions and normals only.
  private writeRings(c: Float32Array, segs: number, ringBase: number, radius: number): void {
    for (let i = 0; i <= segs; i++) {
      const i0 = i > 0 ? i - 1 : 0;
      const i1 = i < segs ? i + 1 : segs;
      let txv = c[i1 * 3] - c[i0 * 3];
      let tyv = c[i1 * 3 + 1] - c[i0 * 3 + 1];
      let tzv = c[i1 * 3 + 2] - c[i0 * 3 + 2];
      let tl = Math.sqrt(txv * txv + tyv * tyv + tzv * tzv);
      if (tl < 1e-6) {
        txv = 0;
        tyv = -1;
        tzv = 0;
        tl = 1;
      }
      txv /= tl;
      tyv /= tl;
      tzv /= tl;
      const ux = Math.abs(tyv) > 0.95 ? 1 : 0;
      const uy = 1 - ux;
      let nx = -tzv * uy;
      let ny = tzv * ux;
      let nz = txv * uy - tyv * ux;
      let nl = Math.sqrt(nx * nx + ny * ny + nz * nz);
      if (nl < 1e-6) {
        nx = 1;
        ny = 0;
        nz = 0;
        nl = 1;
      }
      nx /= nl;
      ny /= nl;
      nz /= nl;
      const bx = tyv * nz - tzv * ny;
      const by = tzv * nx - txv * nz;
      const bz = txv * ny - tyv * nx;
      const cx = c[i * 3];
      const cy = c[i * 3 + 1];
      const cz = c[i * 3 + 2];
      const ring = (ringBase + i) * (RAD + 1);
      for (let j = 0; j <= RAD; j++) {
        const co = RING_COS[j];
        const si = RING_SIN[j];
        const ox = co * nx + si * bx;
        const oy = co * ny + si * by;
        const oz = co * nz + si * bz;
        const o = (ring + j) * 3;
        this.tubePos[o] = cx + ox * radius;
        this.tubePos[o + 1] = cy + oy * radius;
        this.tubePos[o + 2] = cz + oz * radius;
        this.tubeNrm[o] = ox;
        this.tubeNrm[o + 1] = oy;
        this.tubeNrm[o + 2] = oz;
      }
    }
  }

  dispose(): void {
    this.line.geometry.dispose();
    this.tube.geometry.dispose();
    this.handle.geometry.dispose();
    this.wheel.geometry.dispose();
    (this.wheel.material as MeshLambertMaterial).dispose();
    this.halo.geometry.dispose();
  }
}
