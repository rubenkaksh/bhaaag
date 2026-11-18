// Painted backdrop (owner decision 2026-11-18, replaces the procedural mountain rings and sea).
// Loaded lazily by scene.ts (dynamic import), so none of this is in the initial chunk. Textures are
// built by tools/backdrop-build.mjs into public/assets/textures/backdrop/ and listed per tier in
// textureManifest.ts. Stock unfogged MeshBasicMaterial only, no shaders.
//   plate  full 360 degree cylinder (R 900 m) with the snow range at golden hour; the image is
//          seam-blended so it wraps, and repeated twice round the horizon to keep it from
//          stretching. Horizon row sits at the camera eye height.
//   far    hazy foothills card at 700 m, near  pine hill with houses at 450 m (alpha cards).
//          Mirrored-repeat tiling hides the missing seam. Low tier: plate + near only.
// All three follow the camera POSITION every frame (never its rotation or the parent's offset), so
// they parallax like very distant scenery and the long descent never leaves them behind.
import {
  BackSide,
  Color,
  CylinderGeometry,
  Group,
  MeshBasicMaterial,
  Mesh,
  MirroredRepeatWrapping,
  RepeatWrapping,
  SRGBColorSpace,
  TextureLoader,
  type Fog,
  type Texture,
} from 'three';

export type BackdropTier = 'low' | 'medium' | 'high';

export type BackdropSpec = {
  name: 'plate' | 'far' | 'near';
  radius: number;
  /** Cylinder height in metres. */
  height: number;
  /** Fraction of the image height, from the top, that sits at the camera eye height. */
  eyeRow: number;
  /** Image repeats round the circle (even for mirrored cards). */
  repeat: number;
  mirrored: boolean;
  /** Image u (0..1) that faces the run direction (-Z); the plate puts its massif there. */
  u0: number;
  /** Pull towards the fog colour (0 = untouched). */
  fogTint: number;
  renderOrder: number;
};

const TAU = Math.PI * 2;
const PLATE_ASPECT = 1800 / 667; // seam-trimmed plate (tools/backdrop-build.mjs)
const FAR_ASPECT = 2000 / 667;
const NEAR_ASPECT = 1774 / 428;
const PLATE_R = 900;
const FAR_R = 700;
const NEAR_R = 450;
const PLATE_REPEAT = 2;
const CARD_REPEAT = 4;
/** Vertical squash of the plate: a true 360 degree wrap would make the peaks absurdly tall. */
const PLATE_SQUASH = 0.5;
const tile = (r: number, n: number): number => (TAU * r) / n;

export const BACKDROP_SPECS: Record<BackdropSpec['name'], BackdropSpec> = {
  plate: {
    name: 'plate',
    radius: PLATE_R,
    height: (tile(PLATE_R, PLATE_REPEAT) / PLATE_ASPECT) * PLATE_SQUASH,
    eyeRow: 0.6,
    repeat: PLATE_REPEAT,
    mirrored: false,
    u0: 0.42,
    fogTint: 0,
    renderOrder: -1.8,
  },
  far: {
    name: 'far',
    radius: FAR_R,
    height: (tile(FAR_R, CARD_REPEAT) / FAR_ASPECT) * 0.8,
    eyeRow: 0.82,
    repeat: CARD_REPEAT,
    mirrored: true,
    u0: 0,
    fogTint: 0.4,
    renderOrder: -1.7,
  },
  near: {
    name: 'near',
    radius: NEAR_R,
    height: (tile(NEAR_R, CARD_REPEAT) / NEAR_ASPECT) * 0.8,
    eyeRow: 0.9,
    repeat: CARD_REPEAT,
    mirrored: true,
    u0: 0,
    fogTint: 0.22,
    renderOrder: -1.6,
  },
};

/** Which layers a tier shows, far to near. Low: plate plus one card. */
export const BACKDROP_LAYERS: Record<BackdropTier, readonly BackdropSpec['name'][]> = {
  low: ['plate', 'near'],
  medium: ['plate', 'far', 'near'],
  high: ['plate', 'far', 'near'],
};

/** Draw calls the backdrop adds on a tier (one per layer). */
export function backdropDraws(tier: BackdropTier): number {
  return BACKDROP_LAYERS[tier].length;
}

export function backdropFile(name: BackdropSpec['name'], tier: BackdropTier): string {
  return `backdrop/${name}_${tier}.webp`;
}

const whiteTint = new Color(1, 1, 1);

function buildLayer(spec: BackdropSpec, map: Texture | null): Mesh {
  const geo = new CylinderGeometry(spec.radius, spec.radius, spec.height, 48, 1, true);
  // seen from inside the cylinder the u axis runs the wrong way round: mirror it
  const uv = geo.getAttribute('uv');
  for (let i = 0; i < uv.count; i++) uv.setX(i, 1 - uv.getX(i));
  if (map !== null) {
    map.colorSpace = SRGBColorSpace;
    map.wrapS = spec.mirrored ? MirroredRepeatWrapping : RepeatWrapping;
    map.repeat.set(spec.repeat, 1);
    map.offset.set(spec.u0, 0);
    map.needsUpdate = true;
  }
  const mat = new MeshBasicMaterial({
    map,
    color: '#ffffff',
    fog: false,
    transparent: true,
    side: BackSide,
    depthWrite: false,
  });
  const mesh = new Mesh(geo, mat);
  mesh.name = `backdrop_${spec.name}`;
  mesh.frustumCulled = false;
  mesh.renderOrder = spec.renderOrder;
  mesh.userData.cast = false;
  // eye height row: mesh centre sits (0.5 - eyeRow) of the height below the camera
  const dy = (0.5 - spec.eyeRow) * spec.height;
  mesh.onBeforeRender = (_r, scene, camera) => {
    // ride on the camera position only (ignores the parent group's offset and any rotation)
    mesh.matrixWorld.makeTranslation(camera.position.x, camera.position.y + dy, camera.position.z);
    if (spec.fogTint > 0) {
      const fog = scene.fog as Fog | null;
      mat.color.copy(whiteTint);
      if (fog !== null) mat.color.lerp(fog.color, spec.fogTint);
    }
  };
  return mesh;
}

/** Layers for a tier from already-loaded textures (null maps give flat white: node tests). */
export function buildBackdrop(
  tier: BackdropTier,
  maps: Partial<Record<BackdropSpec['name'], Texture>> = {},
): Group {
  const g = new Group();
  g.name = 'backdrop';
  for (const n of BACKDROP_LAYERS[tier]) g.add(buildLayer(BACKDROP_SPECS[n], maps[n] ?? null));
  return g;
}

function loadTexture(url: string): Promise<Texture> {
  return new Promise((resolve, reject) => {
    new TextureLoader().load(url, resolve, undefined, reject);
  });
}

/** Fetches the tier's textures, then builds the layers. Rejects if any file fails to load. */
export async function loadBackdrop(tier: BackdropTier): Promise<Group> {
  const base = `${import.meta.env.BASE_URL}assets/textures/`;
  const names = BACKDROP_LAYERS[tier];
  const tex = await Promise.all(names.map((n) => loadTexture(base + backdropFile(n, tier))));
  const maps: Partial<Record<BackdropSpec['name'], Texture>> = {};
  names.forEach((n, i) => (maps[n] = tex[i]));
  return buildBackdrop(tier, maps);
}
