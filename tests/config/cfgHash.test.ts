import { describe, expect, it } from 'vitest';
import l1 from '../../content/levels/l1.json';
import { cfgHash, cfgHashInput } from '../../src/app/cfgHash';
import { resolveCfg } from '../../src/app/tuning';

describe('cfgHash', () => {
  const t = () => resolveCfg('classic');
  it('is stable 16 hex', async () => {
    const h = await cfgHash('l1', l1.version, t());
    expect(h).toMatch(/^[0-9a-f]{16}$/);
    expect(await cfgHash('l1', l1.version, t())).toBe(h);
  });
  it('changes with speed tuning, not with aim or camera', async () => {
    const base = await cfgHash('l1', 1, t());
    const fast = t();
    fast.hero.sprintSpeed += 1;
    expect(await cfgHash('l1', 1, fast)).not.toBe(base);
    const aim = t();
    aim.aim.snapRadius += 1;
    expect(await cfgHash('l1', 1, aim)).toBe(base);
  });
  it('is independent of key order', () => {
    expect(cfgHashInput('l1', 1, t())).toBe(cfgHashInput('l1', 1, JSON.parse(JSON.stringify(t()))));
  });
});
