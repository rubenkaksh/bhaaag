// Scene content for the spikes: ground, trees, course obstacles, the camp (fire, ring, flags), lights
// and the reused painted backdrop, with a dusk-to-night tint. Stock materials, no custom shaders.
import {
  AmbientLight,
  BoxGeometry,
  BufferGeometry,
  CircleGeometry,
  Color,
  ConeGeometry,
  CylinderGeometry,
  DirectionalLight,
  DodecahedronGeometry,
  Fog,
  Group,
  HemisphereLight,
  InstancedMesh,
  Matrix4,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  Object3D,
  PerspectiveCamera,
  PlaneGeometry,
  PointLight,
  RingGeometry,
  Scene,
} from 'three';
import type { Texture } from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import type { Obstacle } from '../ride';
import { Rng } from '../rng';

/** Landscape lift of the backdrop plate, in plate heights (spike ride camera only). */
const PLATE_LIFT_LANDSCAPE = 0.3;
import type { RideCfg } from '../ride';
import type { GraphicsTier } from '../../adapters/render/graphicsTier';

export const DAY = {
  sky: new Color('#e9a878'),
  fog: new Color('#e8b48a'),
  ground: new Color('#7d8a45'),
};
export const NIGHT = {
  sky: new Color('#101a33'),
  fog: new Color('#16203c'),
  ground: new Color('#243326'),
};

const mat = (hex: string, glow = 0.1): MeshStandardMaterial =>
  new MeshStandardMaterial({
    color: hex,
    roughness: 0.9,
    metalness: 0,
    emissive: hex,
    emissiveIntensity: glow,
  });

function inst(geo: BufferGeometry, color: string, n: number): InstancedMesh {
  const m = new InstancedMesh(geo, mat(color), Math.max(1, n));
  m.frustumCulled = false;
  return m;
}

export class SpikeWorld {
  readonly scene = new Scene();
  readonly ground: Mesh;
  /** Camp offset along +z: camp sim coordinates are drawn at (x, z + campZ). */
  readonly campZ: number;
  private readonly hemi: HemisphereLight;
  private readonly sun: DirectionalLight;
  private readonly amb: AmbientLight;
  private readonly fireLight: PointLight;
  private readonly flames: Mesh[] = [];
  private readonly ring: Mesh;
  private readonly campGroup = new Group();
  private backdrop: Group | null = null;
  private night = 0;
  private disposed = false;

  constructor(cfg: RideCfg, obstacles: Obstacle[], seed: number, tier: GraphicsTier) {
    const s = this.scene;
    s.background = DAY.sky.clone();
    s.fog = new Fog(DAY.fog.clone(), 60, 420);
    this.hemi = new HemisphereLight('#fff0d8', '#6a7040', 1.0);
    this.sun = new DirectionalLight('#ffd7a0', 1.5);
    this.sun.position.set(-30, 40, 20);
    this.amb = new AmbientLight('#ffffff', 0.2);
    s.add(this.hemi, this.sun, this.amb);
    this.campZ = cfg.distance + 40;
    const length = this.campZ + 260;

    this.ground = new Mesh(
      new PlaneGeometry(900, length + 200).rotateX(-Math.PI / 2),
      mat(DAY.ground.getStyle(), 0.05),
    );
    this.ground.position.set(0, 0, length / 2 - 100);
    s.add(this.ground);

    // trees along both edges
    const rng = new Rng(seed ^ 0x5eed);
    const treeGeo = mergeGeometries([
      new CylinderGeometry(0.25, 0.35, 2, 5).translate(0, 1, 0),
      new ConeGeometry(1.6, 3.6, 6).translate(0, 3.6, 0),
      new ConeGeometry(1.2, 2.8, 6).translate(0, 5.4, 0),
    ]);
    const pos: number[][] = [];
    for (let z = -20; z < length; z += 7) {
      for (const side of [-1, 1]) {
        const x = side * (cfg.halfWidth + 5 + rng.range(0, 40));
        pos.push([x, z + rng.range(-3, 3), rng.range(0.8, 1.5)]);
      }
    }
    const trees = inst(treeGeo, '#2f5a34', pos.length);
    const m4 = new Matrix4();
    pos.forEach((p, i) =>
      trees.setMatrixAt(i, m4.makeScale(p[2], p[2], p[2]).setPosition(p[0], 0, p[1])),
    );
    s.add(trees);

    // course obstacles
    const by: Record<string, Obstacle[]> = { log: [], rock: [], ramp: [], mud: [] };
    for (const o of obstacles) by[o.kind].push(o);
    this.addObstacles(
      by.log,
      new CylinderGeometry(0.4, 0.4, 3.2, 7).rotateZ(Math.PI / 2).translate(0, 0.4, 0),
      '#7a5535',
    );
    this.addObstacles(
      by.rock,
      new DodecahedronGeometry(1.5, 0).scale(1, 0.9, 1).translate(0, 1.1, 0),
      '#7b7b78',
    );
    const wedge = new CylinderGeometry(1.8, 1.8, 3.2, 3)
      .rotateZ(Math.PI / 2)
      .rotateY(Math.PI / 2)
      .scale(1, 0.4, 1)
      .translate(0, 0.35, 0);
    this.addObstacles(by.ramp, wedge, '#b98550');
    this.addObstacles(
      by.mud,
      new CylinderGeometry(3, 3, 0.05, 12).translate(0, 0.03, 0),
      '#4a3a28',
    );

    // destination: pole with flags and a tent over the camp
    this.campGroup.position.set(0, 0, this.campZ);
    s.add(this.campGroup);
    this.buildCamp(cfg);
    const dest = new Group();
    for (const sx of [-1, 1]) {
      const pole = new Mesh(new CylinderGeometry(0.1, 0.12, 7, 5), mat('#6b4a2f'));
      pole.position.set(sx * 6, 3.5, cfg.distance);
      const flag = new Mesh(new BoxGeometry(2.2, 1.2, 0.05), mat('#b8483c', 0.3));
      flag.position.set(sx * 6 + 1.2, 6.2, cfg.distance);
      dest.add(pole, flag);
    }
    s.add(dest);

    this.fireLight = new PointLight('#ff9a4a', 0, 40, 1.6);
    this.fireLight.position.set(0, 2.2, this.campZ);
    s.add(this.fireLight);
    this.ring = new Mesh(
      new RingGeometry(0.97, 1, 48).rotateX(-Math.PI / 2),
      new MeshBasicMaterial({
        color: '#ffb060',
        transparent: true,
        opacity: 0.35,
        depthWrite: false,
      }),
    );
    this.ring.position.set(0, 0.06, this.campZ);
    s.add(this.ring);

    void this.loadBackdrop(tier);
  }

  private addObstacles(list: Obstacle[], geo: BufferGeometry, color: string): void {
    if (list.length === 0) return;
    const m = inst(geo, color, list.length);
    const m4 = new Matrix4();
    list.forEach((o, i) => m.setMatrixAt(i, m4.makeTranslation(o.x, 0, o.z)));
    this.scene.add(m);
  }

  private buildCamp(cfg: RideCfg): void {
    void cfg;
    const g = this.campGroup;
    const logs = new Mesh(
      mergeGeometries([
        new CylinderGeometry(0.15, 0.15, 1.3, 5).rotateZ(Math.PI / 2).translate(0, 0.15, 0),
        new CylinderGeometry(0.15, 0.15, 1.3, 5)
          .rotateZ(Math.PI / 2)
          .rotateY(Math.PI / 2)
          .translate(0, 0.3, 0),
      ]),
      mat('#4a3426'),
    );
    g.add(logs);
    const fm = new MeshBasicMaterial({ color: '#ff8a2a' });
    for (let i = 0; i < 3; i++) {
      const f = new Mesh(
        new ConeGeometry(0.4 - i * 0.08, 1.2 + i * 0.3, 6).translate(0, 0.9, 0),
        fm,
      );
      f.position.set((i - 1) * 0.12, 0, (i % 2) * 0.1);
      this.flames.push(f);
      g.add(f);
    }
    const core = new Mesh(
      new ConeGeometry(0.2, 0.8, 6).translate(0, 0.7, 0),
      new MeshBasicMaterial({ color: '#ffe08a' }),
    );
    this.flames.push(core);
    g.add(core);
    // ground patch and a tent behind the fire
    const patch = new Mesh(new CircleGeometry(8, 32).rotateX(-Math.PI / 2), mat('#8a7a52', 0.05));
    patch.position.y = 0.03;
    g.add(patch);
    const tent = new Mesh(
      new ConeGeometry(2.4, 2.6, 4).rotateY(Math.PI / 4).translate(0, 1.3, 0),
      mat('#cdbd9a', 0.15),
    );
    tent.position.set(0, 0, 10.5);
    g.add(tent);
  }

  private async loadBackdrop(tier: GraphicsTier): Promise<void> {
    try {
      const m = await import('../../adapters/render/backdrop');
      const g = await m.loadBackdrop(tier);
      if (this.disposed) return;
      // The plate is placed for the game's descent camera, which sits high above the valley. The
      // spike rides on flat ground with a low camera, so in landscape the snow range fell below
      // the horizon. Lift the plate there (portrait is already stretched upward by backdrop.ts).
      const plate = g.getObjectByName('backdrop_plate') as Mesh | undefined;
      if (plate) {
        const h = (plate.geometry as CylinderGeometry).parameters.height;
        const base = plate.onBeforeRender;
        plate.onBeforeRender = (...args) => {
          base.apply(plate, args);
          const cam = args[2] as PerspectiveCamera;
          if (cam.aspect >= 1) plate.matrixWorld.elements[13] += h * PLATE_LIFT_LANDSCAPE;
        };
      }
      this.backdrop = g;
      this.scene.add(g);
      this.setNight(this.night);
    } catch {
      // the backdrop is decoration: the spike still plays without it
    }
  }

  /** 0 = golden hour (ride), 1 = night (camp). */
  setNight(k: number): void {
    this.night = k;
    const s = this.scene;
    (s.background as Color).copy(DAY.sky).lerp(NIGHT.sky, k);
    const fog = s.fog as Fog;
    fog.color.copy(DAY.fog).lerp(NIGHT.fog, k);
    fog.near = 60 - 30 * k;
    fog.far = 420 - 260 * k;
    (this.ground.material as MeshStandardMaterial).color.copy(DAY.ground).lerp(NIGHT.ground, k);
    this.hemi.intensity = 1 - 0.6 * k;
    this.hemi.color.set('#fff0d8').lerp(new Color('#7a8cc8'), k);
    this.sun.intensity = 1.5 * (1 - k) + 0.25 * k;
    this.sun.color.set('#ffd7a0').lerp(new Color('#8fa4ff'), k);
    this.amb.intensity = 0.2 + 0.1 * k;
    this.fireLight.intensity = 6 * k;
    if (this.backdrop !== null) {
      const t = new Color('#ffffff').lerp(new Color('#2c3a6a'), k * 0.85);
      this.backdrop.traverse((o) => {
        const m = o as Mesh;
        if (m.isMesh) (m.material as MeshBasicMaterial).color.copy(t);
      });
    }
  }

  /** Per frame: flicker, ring size from fuel. */
  animate(t: number, fuel01: number, lit: boolean, fireRadius: number): void {
    const fl = 1 + Math.sin(t * 23) * 0.12 + Math.sin(t * 37) * 0.08;
    this.flames.forEach((f, i) => {
      f.visible = lit;
      f.scale.set(1, fl * (0.6 + 0.4 * fuel01) * (1 + i * 0.05), 1);
    });
    this.fireLight.intensity = (lit ? 5 + 2 * fl : 0.3) * this.night;
    this.ring.visible = this.night > 0.3;
    const r = fireRadius * (lit ? 1 : 0.2);
    this.ring.scale.set(r, 1, r);
    (this.ring.material as MeshBasicMaterial).opacity = lit ? 0.25 + 0.2 * fuel01 : 0.08;
  }

  add(o: Object3D): void {
    this.scene.add(o);
  }

  dispose(): void {
    this.disposed = true;
  }
}

export type { Texture };
