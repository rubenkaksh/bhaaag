import { beforeEach, describe, expect, it, vi } from 'vitest';
import { PerspectiveCamera, Texture } from 'three';

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
    v.setCatch(c, 0.5, 0, 0);
    const mat = (v as unknown as { headMat: { depthTest: boolean } }).headMat;
    expect(mat.depthTest).toBe(false);
    v.setTier('high');
    const fresh = (v as unknown as { headMat: { depthTest: boolean } }).headMat;
    expect(fresh).not.toBe(mat);
    expect(fresh.depthTest).toBe(true);
    v.update(0, 0, 0, 0, 5, 0, false);
    v.setCatch(c, 0.6, 0, 0);
    expect(fresh.depthTest).toBe(false);
  });

  it('a failed segment load still builds, warns once, and drops that variant', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const v = new DragonSpriteView('low');
    resolveAll({ fail: 'cloud-seg-b' });
    expect(warn).toHaveBeenCalledTimes(1);
    expect((v as unknown as { built: boolean }).built).toBe(true);
    expect((v as unknown as { segments: unknown[] }).segments.length).toBeLessThan(6);
  });

  it('a missing head-a skips the head and the catch beat does not throw', () => {
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    const v = new DragonSpriteView('low');
    resolveAll({ fail: 'head-a' });
    expect((v as unknown as { headSprite: unknown }).headSprite).toBeNull();
    expect(() => {
      v.update(0, 0, 0, 0, 5, 0, false);
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
