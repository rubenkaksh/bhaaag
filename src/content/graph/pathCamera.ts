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
}

export const PATH_CAM_CFG: PathCamCfg = {
  turnRate: 60 * DEG,
  snapAngle: 135 * DEG,
  commitOn: 2.5,
  commitOff: 1.5,
  forkMax: 75 * DEG,
  nodeReach: 14,
};

export interface PathNode {
  id: number;
  x: number;
  z: number;
  /** Deck height of the node's house, when the caller supplied it (tilt assist). */
  y?: number;
  /** Optional per-node heading override, rad (from the graph file's `heading`, degrees). */
  heading?: number;
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
  houses: { id: number; cx: number; cz: number; deck?: number }[],
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
      y: h.deck,
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
    private readonly cfg: PathCamCfg = PATH_CAM_CFG,
  ) {}

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
  }

  /**
   * The exit the hero is heading for: the committed one, the only one, or at an uncommitted fork the
   * exit closest to the held heading. null when the node has none. Read-only (tilt assist).
   */
  nextTarget(): { x: number; z: number; y: number } | null {
    const n = this.node >= 0 ? nodeOf(this.pg, this.node) : undefined;
    if (n === undefined) return null;
    let id = this.committed;
    if (id < 0 && n.exits.length === 1) id = n.exits[0];
    if (id < 0) {
      let bestD = Infinity;
      for (const e of n.exits) {
        const t = nodeOf(this.pg, e);
        if (t === undefined) continue;
        const a = Math.abs(wrapAngle(bearing(n.x, n.z, t.x, t.z) - this.heading));
        if (a < bestD) {
          bestD = a;
          id = e;
        }
      }
    }
    const t = id >= 0 ? nodeOf(this.pg, id) : undefined;
    if (t === undefined || t.y === undefined) return null;
    return { x: t.x, z: t.z, y: t.y };
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
