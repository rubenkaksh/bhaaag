import { describe, expect, it } from 'vitest';
import { ARCHETYPE_IDS, archetype } from '../../src/content/house/archetypes';
import type { ArchetypeId } from '../../src/content/house/archetypes';
import { emitHouse, newDraft } from '../../src/content/house/houseKit';
import { deckY, validateHouse } from '../../src/content/house/houseSpec';
import { STYLE_BALCONY } from '../../src/content/house/houseSpec';

const DECK: Record<ArchetypeId, number> = { A1: 6, A2: 3.2, A3: 3.2, A4: 6, B1: 6, B2: 6 };

describe('home archetype presets (handoff H1)', () => {
  it('every preset passes validateHouse and emits without throwing', () => {
    for (const a of ARCHETYPE_IDS) {
      const h = archetype(a, 1, 0, 0, 0);
      expect(() => validateHouse(h), a).not.toThrow();
      expect(() => emitHouse(h, newDraft()), a).not.toThrow();
    }
  });

  it('emitHouse gives a roof deck at 3.2 m (1 storey) or 6.0 m (2 storeys)', () => {
    for (const a of ARCHETYPE_IDS) {
      const h = archetype(a, 1, 0, 0, 0);
      expect(deckY(h), a).toBe(DECK[a]);
      const d = newDraft();
      emitHouse(h, d);
      expect(d.solids[0].max[1], a).toBe(DECK[a]);
    }
  });

  it('A1 emits a slip-1 awning ramp', () => {
    const d = newDraft();
    emitHouse(archetype('A1', 1, 0, 0, 0), d);
    expect(d.ramps.length).toBe(1);
    expect(d.ramps[0].slip).toBe(1);
  });

  it('B1 emits a style-5 balcony', () => {
    const d = newDraft();
    emitHouse(archetype('B1', 1, 0, 0, 0), d);
    expect(d.style.filter((s) => s === STYLE_BALCONY).length).toBe(1);
  });

  it('presets are independent copies and placement does not change the shape', () => {
    const a = archetype('A4', 1, 0, 0, 0);
    a.tall.push(2);
    expect(archetype('A4', 2, 8, 8, -3).tall).toEqual([0, 1]);
    const moved = archetype('B2', 3, 40, 20, -9);
    expect(moved.pole).toBe(true);
    expect(moved.stairs).toEqual({ face: 2, to: 'balcony' });
  });
});
