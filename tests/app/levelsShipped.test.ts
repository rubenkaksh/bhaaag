// Slice 6 of the builder-sync plan: shipped builder levels reach the default Classic row.
import { describe, expect, it, vi } from 'vitest';

vi.mock('../../src/content/builder/shippedMeta', () => ({
  shippedBuilderMeta: () => [{ id: 'my-level', name: 'My Level' }],
}));

import { classicLevels } from '../../src/app/modes/levels';

describe('shipped builder levels in the Classic row', () => {
  it('flag off: a shipped entry follows Hay Run, before saved library levels', () => {
    const rows = classicLevels(false, false, [{ id: 'lib1', name: 'Saved', visible: true }]);
    expect(rows.map((l) => l.id)).toEqual(['nagarkot-home', 'hay-run', 'b:my-level', 'l:lib1']);
    expect(rows[2]).toMatchObject({ label: 'My Level', key: 'strategy', builder: 'shipped' });
  });

  it('flag on: listed exactly once', () => {
    const rows = classicLevels(false, true, []);
    expect(rows.filter((l) => l.id === 'b:my-level')).toHaveLength(1);
  });
});
