import { describe, expect, it } from 'vitest';
import {
  BUILDER_FORMAT,
  emptyLevel,
  parseBuilderLevel,
  serializeBuilderLevel,
} from '../../src/content/builder/format';
import {
  History,
  addEdge,
  addHouse,
  blocked,
  moveHouse,
  removeEdge,
  removeHouse,
  setGoal,
  snapPosition,
  updateHouse,
} from '../../src/content/builder/model';
import { sampleLevel } from '../../src/content/builder/sample';

describe('format', () => {
  it('round-trips the sample level', () => {
    const l = sampleLevel();
    expect(parseBuilderLevel(serializeBuilderLevel(l))).toEqual(l);
  });

  it('rejects bad JSON, wrong format, bad refs and gap edges without via', () => {
    expect(() => parseBuilderLevel('{')).toThrow(/invalid JSON/);
    expect(() => parseBuilderLevel(JSON.stringify({ ...sampleLevel(), format: 'x' }))).toThrow(
      /invalid builder level/,
    );
    const bad = sampleLevel();
    bad.edges.push({ id: 50, a: 0, b: 77, kind: 'zip' });
    expect(() => parseBuilderLevel(JSON.stringify(bad))).toThrow(/bad house reference/);
    const noVia = JSON.parse(serializeBuilderLevel(sampleLevel())) as { edges: { via?: string }[] };
    delete noVia.edges[1].via;
    expect(() => parseBuilderLevel(JSON.stringify(noVia))).toThrow(/via/);
    expect(emptyLevel('a', 'A').format).toBe(BUILDER_FORMAT);
  });
});

describe('model', () => {
  it('first house becomes the start, ids never collide after removal', () => {
    let l = addHouse(emptyLevel('a', 'A'), 0, 0);
    l = addHouse(l, 12, 0);
    expect(l.start).toBe(0);
    l = removeHouse(l, 0);
    expect(l.start).toBe(-1);
    l = addHouse(l, 24, 0);
    expect(new Set(l.houses.map((h) => h.id)).size).toBe(l.houses.length);
  });

  it('is immutable', () => {
    const l = addHouse(emptyLevel('a', 'A'), 0, 0);
    const m = moveHouse(l, 0, 5, 5);
    expect(l.houses[0].x).toBe(0);
    expect(m.houses[0].x).toBe(5);
    expect(updateHouse(l, 0, { storeys: 2 }).houses[0].storeys).toBe(2);
  });

  it('keeps one edge per ordered pair and one zip per source; removing a house drops its edges', () => {
    let l = addHouse(addHouse(addHouse(emptyLevel('a', 'A'), 0, 0), 0, -30), 12, -30);
    l = addEdge(l, 0, 1, 'zip');
    l = addEdge(l, 0, 2, 'zip');
    expect(l.edges.filter((e) => e.kind === 'zip').length).toBe(1);
    l = addEdge(l, 1, 2, 'gap', 'jump');
    l = addEdge(l, 1, 2, 'gap', 'tramp');
    expect(l.edges.filter((e) => e.a === 1).map((e) => e.via)).toEqual(['tramp']);
    expect(addEdge(l, 1, 1, 'gap', 'jump')).toBe(l);
    expect(removeHouse(l, 2).edges.length).toBe(0);
    const e = l.edges[0];
    expect(removeEdge(l, e.id).edges.length).toBe(l.edges.length - 1);
    expect(setGoal(l, 99)).toBe(l);
  });

  it('snaps to touching and aligned lines within range, else to the 1 m grid', () => {
    const l = addHouse(addHouse(emptyLevel('a', 'A'), 0, 0), 30, 30);
    expect(snapPosition(l, 1, 8.7, 0.4)).toEqual({ x: 8, z: 0 }); // touching east, aligned in z
    expect(snapPosition(l, 1, 14.6, -20.2)).toEqual({ x: 15, z: -20 }); // far: grid only
    expect(snapPosition(l, 1, 0.5, -7.6)).toEqual({ x: 0, z: -8 }); // aligned in x, touching south
  });

  it('blocks drops that overlap another house but allows touching', () => {
    const l = addHouse(addHouse(emptyLevel('a', 'A'), 0, 0), 30, 30);
    expect(blocked(l, 1, 4, 0)).toBe(true);
    expect(blocked(l, 1, 8, 0)).toBe(false);
  });
});

describe('History', () => {
  it('undoes, redoes and drops redo on a new edit', () => {
    const h = new History(1);
    h.push(2);
    h.push(3);
    expect(h.undo() && h.present).toBe(2);
    expect(h.redo() && h.present).toBe(3);
    h.undo();
    h.push(9);
    expect(h.canRedo).toBe(false);
    h.undo();
    h.undo();
    expect(h.present).toBe(1);
    expect(h.undo()).toBe(false);
  });

  it('ignores an unchanged push and caps its depth', () => {
    const h = new History(0, 3);
    h.push(0);
    expect(h.canUndo).toBe(false);
    for (let i = 1; i <= 10; i++) h.push(i);
    let n = 0;
    while (h.undo()) n++;
    expect(n).toBe(3);
  });
});
