import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Mesh, PerspectiveCamera, Sprite, Texture } from 'three';

type Job = { path: string; ok: (t: Texture) => void; err: () => void };
const jobs: Job[] = [];

vi.mock('three', async (orig) => {
  const actual = await orig<typeof import('three')>();
  class FakeLoader {
    load(path: string, ok: (t: Texture) => void, _p?: unknown, err?: () => void): void {
      jobs.push({ path, ok, err: err ?? (() => {}) });
    }
  }
  return { ...actual, TextureLoader: FakeLoader };
});

const { DragonSpriteView } = await import('../../src/adapters/render/chase/dragonSpriteView');

function resolveAll(v: { fail?: string } = {}): Texture[] {
  const made: Texture[] = [];
  for (const j of jobs) {
    if (v.fail !== undefined && j.path.includes(v.fail)) j.err();
    else {
      const t = new Texture();
      made.push(t);
      j.ok(t);
    }
  }
  return made;
}

function cam(): PerspectiveCamera {
  const c = new PerspectiveCamera(60, 16 / 9, 0.1, 100);
  c.updateMatrixWorld();
  c.updateProjectionMatrix();
  return c;
}

describe('DragonSpriteView', () => {
  beforeEach(() => {
    jobs.length = 0;
    vi.restoreAllMocks();
  });

  it('re-applies beat material state after a tier rebuild mid-catch', () => {
    const v = new DragonSpriteView('low');
    resolveAll();
    const c = cam();
    v.update(0, 0, 0, 0, 5, 0, false);
    v.layout(c);
    v.setCatch(c, 0.5, 0, 0);
    const mat = (v as unknown as { headMat: { depthTest: boolean } }).headMat;
    expect(mat.depthTest).toBe(false);
    v.setTier('high');
    const fresh = (v as unknown as { headMat: { depthTest: boolean } }).headMat;
    expect(fresh).not.toBe(mat);
    expect(fresh.depthTest).toBe(true);
    v.update(0, 0, 0, 0, 5, 0, false);
    v.layout(c);
    v.setCatch(c, 0.6, 0, 0);
    expect(fresh.depthTest).toBe(false);
  });

  it('a failed body-strip load still builds, warns once, and the ribbon falls back to a plain colour', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const v = new DragonSpriteView('low');
    resolveAll({ fail: 'body-strip' });
    expect(warn).toHaveBeenCalledTimes(1);
    expect((v as unknown as { built: boolean }).built).toBe(true);
    const mat = (v as unknown as { ribbonMat: { map: unknown } }).ribbonMat;
    expect(mat.map).toBeNull();
    v.update(0, 0, 0, 0, 5, 0, false);
    expect(() => v.layout(cam())).not.toThrow();
  });

  it('a missing tail builds without a tail sprite and layout does not throw', () => {
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    const v = new DragonSpriteView('medium');
    resolveAll({ fail: 'tail' });
    expect((v as unknown as { tailSprite: unknown }).tailSprite).toBeNull();
    v.update(0, 0, 0, 0, 5, 0, false);
    expect(() => v.layout(cam())).not.toThrow();
  });

  it.each([
    ['high', 5],
    ['medium', 5],
    ['low', 4],
  ] as const)('the ribbon is one mesh and %s adds at most %i renderables', (tier, max) => {
    const v = new DragonSpriteView(tier);
    resolveAll();
    const r = v.group.children.filter((o) => o instanceof Mesh || o instanceof Sprite);
    expect(r.length).toBeLessThanOrEqual(max);
    expect(r.filter((o) => o instanceof Mesh).length).toBe(1);
  });

  it('a missing head-a skips the head and the catch beat does not throw', () => {
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    const v = new DragonSpriteView('low');
    resolveAll({ fail: 'head-a' });
    expect((v as unknown as { headSprite: unknown }).headSprite).toBeNull();
    expect(() => {
      v.update(0, 0, 0, 0, 5, 0, false);
      v.layout(cam());
      v.setCatch(cam(), 0.5, 0, 0);
    }).not.toThrow();
  });

  it('load callbacks after dispose dispose their texture and build nothing', () => {
    const v = new DragonSpriteView('low');
    v.dispose();
    const spies = jobs.map((j) => {
      const t = new Texture();
      const spy = vi.spyOn(t, 'dispose');
      j.ok(t);
      return spy;
    });
    expect(spies.every((sp) => sp.mock.calls.length === 1)).toBe(true);
    expect((v as unknown as { built: boolean }).built).toBe(false);
  });
});
