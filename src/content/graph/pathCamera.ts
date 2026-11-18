// Path-following camera heading for graph levels that opt in (home-street). Pure TS: no three, no DOM.
// Headings are SIM yaw in radians: 0 faces +z, +yaw turns toward +x (forward = (sin h, cos h) in x, z).
// The game writes the heading into the sim camYaw, so the stick stays camera-relative.
import type { GraphLevel } from './format';

const DEG = Math.PI / 180;
const TWO_PI = Math.PI * 2;

export interface PathCamCfg {
  /** Eased turn speed, rad/s. */
  turnRate: number;
  /** Heading change above this snaps instantly (U-turns), rad. */
  snapAngle: number;
  /** At a fork: hero this far from the node centre commits to an exit, m. */
  commitOn: number;
  /** ...and drops the commit again only when back inside this, m (hysteresis). */
  commitOff: number;
  /** Fork check: every exit must be within this of the held heading, rad. */
  forkMax: number;
  /** A landing within this of a node centre belongs to that node, m. */
  nodeReach: number;
  /** Look this far ahead of the hero along the route (T346); 0 = off, heading only re-aims on landing. */
  lookahead: number;
}

export const PATH_CAM_CFG: PathCamCfg = {
  turnRate: 60 * DEG,
  snapAngle: 135 * DEG,
  commitOn: 2.5,
  commitOff: 1.5,
  forkMax: 75 * DEG,
  nodeReach: 14,
  lookahead: 0,
};

export interface PathNode {
  id: number;
  x: number;
  z: number;
  /** Optional per-node heading override, rad (from the graph file's `heading`, degrees). */
  heading?: number;
  /** Optional half extents (m); wide nodes (roads) lead the camera from their nearest edge, not their centre. */
  hx?: number;
  hz?: number;
  /** Exit node ids (BFS-forward). More than one = fork. */
  exits: number[];
  /** First predecessor, or -1 at the start. */
  from: number;
}

export interface PathGraph {
  nodes: PathNode[];
  start: number;
}

export function wrapAngle(a: number): number {
  let r = a % TWO_PI;
  if (r > Math.PI) r -= TWO_PI;
  else if (r < -Math.PI) r += TWO_PI;
  return r;
}

export function bearing(ax: number, az: number, bx: number, bz: number): number {
  return Math.atan2(bx - ax, bz - az);
}

/** Circular mean of angles (midpoint for two). */
export function meanAngle(angles: number[]): number {
  let sx = 0;
  let sz = 0;
  for (const a of angles) {
    sx += Math.sin(a);
    sz += Math.cos(a);
  }
  return Math.atan2(sx, sz);
}

/** Build the path model from a graph file and the placed house centres (id -> cx, cz). */
export function buildPathGraph(
  g: GraphLevel,
  houses: { id: number; cx: number; cz: number }[],
): PathGraph {
  const depth = new Map<number, number>([[g.start, 0]]);
  const queue = [g.start];
  while (queue.length > 0) {
    const n = queue.shift() as number;
    for (const e of g.edges) {
      const next = e.a === n ? e.b : e.kind === 'touch' && e.b === n ? e.a : -1;
      if (next >= 0 && !depth.has(next)) {
        depth.set(next, (depth.get(n) as number) + 1);
        queue.push(next);
      }
    }
  }
  const nodes: PathNode[] = [];
  for (const n of g.nodes) {
    const h = houses.find((hs) => hs.id === n.id);
    if (h === undefined) continue;
    const exits: number[] = [];
    let from = -1;
    const d = depth.get(n.id) ?? 0;
    for (const e of g.edges) {
      if (e.a === n.id) exits.push(e.b);
      else if (e.kind === 'touch' && e.b === n.id && (depth.get(e.a) ?? 0) > d) exits.push(e.a);
      if (e.b === n.id && from < 0 && (depth.get(e.a) ?? 0) < d) from = e.a;
      else if (e.kind === 'touch' && e.a === n.id && from < 0 && (depth.get(e.b) ?? 0) < d)
        from = e.b;
    }
    nodes.push({
      id: n.id,
      x: h.cx,
      z: h.cz,
      heading: n.heading === undefined ? undefined : n.heading * DEG,
      exits,
      from,
    });
  }
  return { nodes, start: g.start };
}

function nodeOf(pg: PathGraph, id: number): PathNode | undefined {
  return pg.nodes.find((n) => n.id === id);
}

/** Bearings (rad) from a node to each of its exits. */
export function exitHeadings(pg: PathGraph, n: PathNode): number[] {
  const out: number[] = [];
  for (const id of n.exits) {
    const t = nodeOf(pg, id);
    if (t !== undefined) out.push(bearing(n.x, n.z, t.x, t.z));
  }
  return out;
}

/** Heading the hero arrives on: predecessor -> node, else the first exit (start node), else 0. */
export function approachHeading(pg: PathGraph, n: PathNode): number {
  const p = n.from >= 0 ? nodeOf(pg, n.from) : undefined;
  if (p !== undefined) return bearing(p.x, p.z, n.x, n.z);
  const ex = exitHeadings(pg, n);
  return ex.length > 0 ? ex[0] : 0;
}

/**
 * Heading held at a fork until the player commits: the approach heading, unless some exit is more
 * than forkMax away from it, then the midpoint of the exits' headings. An override wins.
 */
export function forkHold(pg: PathGraph, n: PathNode, cfg: PathCamCfg = PATH_CAM_CFG): number {
  if (n.heading !== undefined) return n.heading;
  const a = approachHeading(pg, n);
  const ex = exitHeadings(pg, n);
  for (const h of ex) if (Math.abs(wrapAngle(h - a)) > cfg.forkMax) return meanAngle(ex);
  return a;
}

/** Nodes with more than one exit. */
export function forkNodes(pg: PathGraph): PathNode[] {
  return pg.nodes.filter((n) => n.exits.length > 1);
}

function nearestOnNode(n: PathNode, x: number, z: number): [number, number] {
  const hx = n.hx ?? 0;
  const hz = n.hz ?? 0;
  const px = Math.min(Math.max(x, n.x - hx), n.x + hx);
  const pz = Math.min(Math.max(z, n.z - hz), n.z + hz);
  return [px, pz];
}

/** Distance from (x, z) to the node's footprint (0 over it). */
function nodeDist(n: PathNode, x: number, z: number): number {
  const [px, pz] = nearestOnNode(n, x, z);
  return Math.sqrt((px - x) * (px - x) + (pz - z) * (pz - z));
}

/** Smallest lookahead leg worth steering by, m: closer than this the heading is left alone. */
const LEAD_MIN = 1.5;
/** Closer than this to a footprint counts as standing on it, m. */
const ON_NODE = 0.5;

/**
 * Lookahead heading (T346): sim yaw from the hero at (x, z) to the point `cfg.lookahead` metres ahead
 * along the route. The route is the hero -> nearest point of the next node's footprint -> ... polyline
 * through the nodes' exits; a fork follows its exit closest to the mean exit heading (or its heading override), so the view swings toward a
 * corner BEFORE the hero lands on it. Null when off, the hero is not over/near a node, or the route
 * ends within LEAD_MIN (keep the current heading). `from` = the node last landed on. Pure.
 */
export function leadHeading(
  pg: PathGraph,
  x: number,
  z: number,
  cfg: PathCamCfg = PATH_CAM_CFG,
  from = -1,
): number | null {
  if (!(cfg.lookahead > 0)) return null;
  // The node the hero is over; in a gap (airborne between nodes) the `from` node it left, so the route
  // does not skip ahead mid-jump; else the nearest within nodeReach.
  let cur: PathNode | undefined;
  let bd = cfg.nodeReach;
  for (const n of pg.nodes) {
    const d = nodeDist(n, x, z);
    if (d < bd) {
      bd = d;
      cur = n;
    }
  }
  if (bd > ON_NODE && from >= 0) {
    const f = nodeOf(pg, from);
    if (f !== undefined && nodeDist(f, x, z) <= cfg.nodeReach) cur = f;
  }
  if (cur === undefined) return null;
  let px = x;
  let pz = z;
  let left = cfg.lookahead;
  let node: PathNode = cur;
  for (let hop = 0; hop < 16; hop++) {
    if (node.exits.length === 0) break;
    let nextId = node.exits[0];
    if (node.exits.length > 1) {
      // fork: follow the exit closest to the mean exit heading, so a wide fan of exits leads along its middle
      const ex = exitHeadings(pg, node);
      const hold =
        node.heading !== undefined || ex.length === 0 ? forkHold(pg, node, cfg) : meanAngle(ex);
      let bestA = Infinity;
      for (const id of node.exits) {
        const t = nodeOf(pg, id);
        if (t === undefined) continue;
        const d = Math.abs(wrapAngle(bearing(node.x, node.z, t.x, t.z) - hold));
        if (d < bestA) {
          bestA = d;
          nextId = id;
        }
      }
    }
    const nx = nodeOf(pg, nextId);
    if (nx === undefined) break;
    const [tx, tz] = nearestOnNode(nx, px, pz);
    const seg = Math.sqrt((tx - px) * (tx - px) + (tz - pz) * (tz - pz));
    if (seg < left) {
      px = tx;
      pz = tz;
      left -= seg;
      node = nx;
      continue;
    }
    const dirX = (tx - px) / seg;
    const dirZ = (tz - pz) / seg;
    px += dirX * left;
    pz += dirZ * left;
    break;
  }
  const dx = px - x;
  const dz = pz - z;
  if (dx * dx + dz * dz < LEAD_MIN * LEAD_MIN) return null;
  return Math.atan2(dx, dz);
}

export class PathCam {
  heading = 0;
  target = 0;
  node = -1;
  /** Fork node id waiting for a commit, or -1. */
  fork = -1;
  /** Committed exit node id at the fork, or -1. */
  committed = -1;
  /** Player took the look: auto-aim paused until the next landing. */
  paused = false;

  constructor(
    private readonly pg: PathGraph,
    private cfg: PathCamCfg = PATH_CAM_CFG,
  ) {}

  /** Apply the camera tuning (camera.pathLookahead m, camera.pathTurnDeg deg/s). Call before reset. */
  setLead(lookahead: number, turnDegPerSec: number): void {
    this.cfg = { ...this.cfg, lookahead, turnRate: turnDegPerSec * DEG };
  }

  /** Steer the target toward the lookahead point (no-op when off or no route ahead). */
  private lead(x: number, z: number): void {
    if (this.committed >= 0) return;
    const h = leadHeading(this.pg, x, z, this.cfg, this.node);
    if (h !== null) this.target = h;
  }

  /** Respawn: face the first leg at once. */
  reset(x: number, z: number, fallback: number): void {
    this.heading = fallback;
    this.target = fallback;
    this.node = -1;
    this.fork = -1;
    this.committed = -1;
    this.paused = false;
    this.landed(x, z);
    this.heading = this.target;
  }

  private nearest(x: number, z: number): PathNode | undefined {
    let best: PathNode | undefined;
    let bd = this.cfg.nodeReach * this.cfg.nodeReach;
    for (const n of this.pg.nodes) {
      const d = (n.x - x) * (n.x - x) + (n.z - z) * (n.z - z);
      if (d < bd) {
        bd = d;
        best = n;
      }
    }
    return best;
  }

  /** The only re-aim: called on every landing. Clears a player pause. */
  landed(x: number, z: number): void {
    this.paused = false;
    const n = this.nearest(x, z);
    if (n === undefined) return;
    this.node = n.id;
    this.committed = -1;
    this.fork = -1;
    const ex = exitHeadings(this.pg, n);
    if (ex.length > 1) {
      this.fork = n.id;
      this.target = forkHold(this.pg, n, this.cfg);
    } else if (ex.length === 1) {
      this.target = n.heading !== undefined ? n.heading : ex[0];
    } else if (n.heading !== undefined) {
      this.target = n.heading;
    }
    this.lead(x, z);
  }

  /** One tick. Returns the heading. */
  update(dt: number, x: number, z: number, playerLook = false): number {
    if (playerLook) this.paused = true;
    if (this.paused) return this.heading;
    const fn = this.fork >= 0 ? nodeOf(this.pg, this.fork) : undefined;
    if (fn !== undefined) {
      const dx = x - fn.x;
      const dz = z - fn.z;
      const d = Math.sqrt(dx * dx + dz * dz);
      if (this.committed < 0 && d >= this.cfg.commitOn) {
        const hb = Math.atan2(dx, dz);
        let bestD = Infinity;
        for (const id of fn.exits) {
          const t = nodeOf(this.pg, id);
          if (t === undefined) continue;
          const a = Math.abs(wrapAngle(bearing(fn.x, fn.z, t.x, t.z) - hb));
          if (a < bestD) {
            bestD = a;
            this.committed = id;
            this.target = bearing(fn.x, fn.z, t.x, t.z);
          }
        }
      } else if (this.committed >= 0 && d < this.cfg.commitOff) {
        this.committed = -1;
        this.target = forkHold(this.pg, fn, this.cfg);
      }
    }
    this.lead(x, z);
    const diff = wrapAngle(this.target - this.heading);
    if (Math.abs(diff) > this.cfg.snapAngle) {
      this.heading = this.target;
    } else if (Math.abs(diff) < 1e-4) {
      this.heading = this.target;
    } else {
      // Linear at turnRate, easing out over the last 5 degrees.
      const speed = this.cfg.turnRate * Math.min(1, Math.max(0.15, Math.abs(diff) / (5 * DEG)));
      const step = Math.min(Math.abs(diff), speed * dt);
      this.heading = wrapAngle(this.heading + Math.sign(diff) * step);
    }
    return this.heading;
  }
}
