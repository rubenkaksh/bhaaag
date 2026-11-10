import { Vec3 } from './math/vec3';
import { AABB } from './math/aabb';

// Walkable ramp. slopeAxis is the uphill direction:
// 0 = +x, 1 = -x, 2 = +z, 3 = -z. rise is the height gain (metres)
// from the low edge of aabb to the high edge.
// slip is 1 for a slippery tile surface (one half of a pitched Roof, ADR 0002): steeper than
// roof.slipDeg it slides the hero downhill. roofId is the owning Roof id, or -1 for a plain ramp.
export class Ramp {
  aabb: AABB;
  slopeAxis: number;
  rise: number;
  slip: number;
  roofId: number;

  constructor(aabb: AABB, slopeAxis: number, rise: number, slip: number, roofId: number) {
    this.aabb = aabb;
    this.slopeAxis = slopeAxis;
    this.rise = rise;
    this.slip = slip;
    this.roofId = roofId;
  }
}

// Ridge direction of a gable Roof (ADR 0002). A gable is symmetric, so yaw 0/180 and 90/270
// collapse to these two values.
export const RIDGE_X = 0; // ridge runs along x: the two slopes face +z and -z
export const RIDGE_Z = 1; // ridge runs along z: the two slopes face +x and -x

// Pitched tile roof (gable prism). aabb.min.y is the eave height, aabb.max.y the ridge height;
// the ridge runs through the footprint centre along ridgeAxis. Gameplay uses the two slippery
// Ramp halves addRoof appends; this record is for the renderer and the level tools.
export class Roof {
  aabb: AABB;
  ridgeAxis: number;
  rampA: number; // ramp ids of the two halves
  rampB: number;

  constructor(aabb: AABB, ridgeAxis: number, rampA: number, rampB: number) {
    this.aabb = aabb;
    this.ridgeAxis = ridgeAxis;
    this.rampA = rampA;
    this.rampB = rampB;
  }
}

// Point anchor (segment/rect anchors come later). id is an int index
// into World.anchors; px/py/pz is the anchor point in metres.
export class Anchor {
  id: number;
  px: number;
  py: number;
  pz: number;

  constructor(id: number, px: number, py: number, pz: number) {
    this.id = id;
    this.px = px;
    this.py = py;
    this.pz = pz;
  }
}

// Runtime world: flat arrays, int ids (= array index). Y-up, 1 unit = 1 m.
export class World {
  solids: AABB[];
  ramps: Ramp[];
  roofs: Roof[];
  anchors: Anchor[];
  spawn: Vec3;
  spawnYaw: number; // radians
  killPlaneY: number;
  // Level fields (all optional in JSON; defaults below keep old fixtures valid).
  goal: AABB; // finish target (leap-of-faith haystack); empty-ish box at origin
  pads: AABB[]; // safe landing pads (cream), one per roof
  route: number[]; // ordered anchor ids = runner's vision (next anchor pulses)
  style: number[]; // parallel to solids: 0 ground, 1 house wall, 2 roof, 3 wall/danger

  constructor() {
    this.solids = [];
    this.ramps = [];
    this.roofs = [];
    this.anchors = [];
    this.spawn = new Vec3(0, 0, 0);
    this.spawnYaw = 0;
    this.killPlaneY = 0;
    this.goal = new AABB(new Vec3(0, 0, 0), new Vec3(0, 0, 0));
    this.pads = [];
    this.route = [];
    this.style = [];
  }
}

// Appends box and returns its id (= index into w.solids).
export function addSolid(w: World, box: AABB): number {
  w.solids.push(box);
  return w.solids.length - 1;
}

// Appends a ramp and returns its id (= index into w.ramps).
export function addRamp(w: World, box: AABB, slopeAxis: number, rise: number): number {
  w.ramps.push(new Ramp(box, slopeAxis, rise, 0, -1));
  return w.ramps.length - 1;
}

// Appends a gable roof over box (min.y = eave, max.y = ridge) as two slippery ramp halves that
// meet at the ridge, and returns its id (= index into w.roofs).
export function addRoof(w: World, box: AABB, ridgeAxis: number): number {
  const id = w.roofs.length;
  const rise = box.max.y - box.min.y;
  const lo = box.min;
  const hi = box.max;
  let a: AABB;
  let b: AABB;
  let axisA: number;
  let axisB: number;
  if (ridgeAxis === RIDGE_Z) {
    const cx = (lo.x + hi.x) * 0.5;
    a = new AABB(new Vec3(lo.x, lo.y, lo.z), new Vec3(cx, hi.y, hi.z));
    b = new AABB(new Vec3(cx, lo.y, lo.z), new Vec3(hi.x, hi.y, hi.z));
    axisA = 0; // west half rises toward +x
    axisB = 1; // east half rises toward -x
  } else {
    const cz = (lo.z + hi.z) * 0.5;
    a = new AABB(new Vec3(lo.x, lo.y, lo.z), new Vec3(hi.x, hi.y, cz));
    b = new AABB(new Vec3(lo.x, lo.y, cz), new Vec3(hi.x, hi.y, hi.z));
    axisA = 2; // south half rises toward +z
    axisB = 3; // north half rises toward -z
  }
  w.ramps.push(new Ramp(a, axisA, rise, 1, id));
  const rampA = w.ramps.length - 1;
  w.ramps.push(new Ramp(b, axisB, rise, 1, id));
  const rampB = w.ramps.length - 1;
  w.roofs.push(new Roof(box, ridgeAxis, rampA, rampB));
  return id;
}

// Appends a point anchor and returns its id (= index into w.anchors).
export function addAnchor(w: World, px: number, py: number, pz: number): number {
  const id = w.anchors.length;
  w.anchors.push(new Anchor(id, px, py, pz));
  return id;
}
