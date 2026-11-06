import { Vec3 } from './math/vec3';
import { AABB } from './math/aabb';

// Walkable ramp. slopeAxis is the uphill direction:
// 0 = +x, 1 = -x, 2 = +z, 3 = -z. rise is the height gain (metres)
// from the low edge of aabb to the high edge.
export class Ramp {
  aabb: AABB;
  slopeAxis: number;
  rise: number;

  constructor(aabb: AABB, slopeAxis: number, rise: number) {
    this.aabb = aabb;
    this.slopeAxis = slopeAxis;
    this.rise = rise;
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
  w.ramps.push(new Ramp(box, slopeAxis, rise));
  return w.ramps.length - 1;
}

// Appends a point anchor and returns its id (= index into w.anchors).
export function addAnchor(w: World, px: number, py: number, pz: number): number {
  const id = w.anchors.length;
  w.anchors.push(new Anchor(id, px, py, pz));
  return id;
}
