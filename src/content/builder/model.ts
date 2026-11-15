// Pure, immutable edit operations on a builder level (undo = keep the old object). No DOM.
import type { BuilderEdge, BuilderHouse, BuilderLevel, GapVia } from './format';
import { HOUSE_SIZE } from './format';

const SNAP_GRID = 1; // metres
const SNAP_NEAR = 1.2; // pull to a neighbour's touching or aligned line within this distance

function nextId(items: { id: number }[]): number {
  let m = -1;
  for (const i of items) m = Math.max(m, i.id);
  return m + 1;
}

export function houseById(l: BuilderLevel, id: number): BuilderHouse | undefined {
  return l.houses.find((h) => h.id === id);
}

export function addHouse(l: BuilderLevel, x: number, z: number, storeys: 1 | 2 = 1): BuilderLevel {
  const h: BuilderHouse = { id: nextId(l.houses), x, z, lift: 0, storeys, balcony: false };
  const start = l.start === -1 ? h.id : l.start;
  return { ...l, houses: [...l.houses, h], start };
}

export function updateHouse(
  l: BuilderLevel,
  id: number,
  patch: Partial<Omit<BuilderHouse, 'id'>>,
): BuilderLevel {
  return { ...l, houses: l.houses.map((h) => (h.id === id ? { ...h, ...patch } : h)) };
}

export function moveHouse(l: BuilderLevel, id: number, x: number, z: number): BuilderLevel {
  return updateHouse(l, id, { x, z });
}

export function removeHouse(l: BuilderLevel, id: number): BuilderLevel {
  return {
    ...l,
    houses: l.houses.filter((h) => h.id !== id),
    edges: l.edges.filter((e) => e.a !== id && e.b !== id),
    start: l.start === id ? -1 : l.start,
    goal: l.goal === id ? -1 : l.goal,
  };
}

/** Add an edge a -> b. One edge per ordered pair and one zip per source house: the new one wins. */
export function addEdge(
  l: BuilderLevel,
  a: number,
  b: number,
  kind: 'zip' | 'gap',
  via?: GapVia,
): BuilderLevel {
  if (a === b || houseById(l, a) === undefined || houseById(l, b) === undefined) return l;
  const kept = l.edges.filter(
    (e) => !(e.a === a && e.b === b) && !(kind === 'zip' && e.kind === 'zip' && e.a === a),
  );
  const edge: BuilderEdge =
    kind === 'zip'
      ? { id: nextId(l.edges), a, b, kind }
      : { id: nextId(l.edges), a, b, kind, via: via ?? 'jump' };
  return { ...l, edges: [...kept, edge] };
}

export function removeEdge(l: BuilderLevel, id: number): BuilderLevel {
  return { ...l, edges: l.edges.filter((e) => e.id !== id) };
}

export function setStart(l: BuilderLevel, id: number): BuilderLevel {
  return houseById(l, id) === undefined ? l : { ...l, start: id };
}

export function setGoal(l: BuilderLevel, id: number): BuilderLevel {
  return houseById(l, id) === undefined ? l : { ...l, goal: id };
}

/** True when two houses' footprints overlap by more than a sliver (touching is fine). */
export function overlaps(a: BuilderHouse, b: BuilderHouse): boolean {
  return Math.abs(a.x - b.x) < HOUSE_SIZE - 0.01 && Math.abs(a.z - b.z) < HOUSE_SIZE - 0.01;
}

function snapAxis(v: number, others: number[]): number {
  let best = Math.round(v / SNAP_GRID) * SNAP_GRID;
  let bestD = SNAP_NEAR;
  for (const o of others) {
    for (const c of [o, o + HOUSE_SIZE, o - HOUSE_SIZE]) {
      // aligned (c = o) or touching (c = o +- size)
      const d = Math.abs(v - c);
      if (d < bestD) {
        bestD = d;
        best = c;
      }
    }
  }
  return best;
}

/** Snap a dragged house to the 1 m grid, then to neighbours' touching or aligned lines. */
export function snapPosition(
  l: BuilderLevel,
  id: number,
  x: number,
  z: number,
): { x: number; z: number } {
  const others = l.houses.filter((h) => h.id !== id);
  return {
    x: snapAxis(
      x,
      others.map((h) => h.x),
    ),
    z: snapAxis(
      z,
      others.map((h) => h.z),
    ),
  };
}

/** Does moving house `id` to (x, z) overlap another house? The UI refuses such a drop. */
export function blocked(l: BuilderLevel, id: number, x: number, z: number): boolean {
  const probe: BuilderHouse = { id, x, z, lift: 0, storeys: 1, balcony: false };
  return l.houses.some((h) => h.id !== id && overlaps(h, probe));
}

/** Undo/redo over immutable snapshots. */
export class History<T> {
  private past: T[] = [];
  private future: T[] = [];
  constructor(
    public present: T,
    private readonly limit = 200,
  ) {}
  push(next: T): void {
    if (next === this.present) return;
    this.past.push(this.present);
    if (this.past.length > this.limit) this.past.shift();
    this.present = next;
    this.future = [];
  }
  undo(): boolean {
    const p = this.past.pop();
    if (p === undefined) return false;
    this.future.push(this.present);
    this.present = p;
    return true;
  }
  redo(): boolean {
    const f = this.future.pop();
    if (f === undefined) return false;
    this.past.push(this.present);
    this.present = f;
    return true;
  }
  get canUndo(): boolean {
    return this.past.length > 0;
  }
  get canRedo(): boolean {
    return this.future.length > 0;
  }
}
