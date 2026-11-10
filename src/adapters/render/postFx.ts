import { HalfFloatType, Vector2, WebGLRenderTarget } from 'three';
import type { Camera, Scene, WebGLRenderer } from 'three';
import type { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import type { RenderConfig } from './graphicsTier';

// Post-processing lives behind a dynamic import() so the initial chunk (Low/Medium, every phone)
// never pays for EffectComposer, bloom and the output pass (ADR 0009). Bloom is High on a fine
// pointer only.

/** Builds the bloom composer for `cfg`. Resolves null when the tier has no bloom. */
export async function createComposer(
  renderer: WebGLRenderer,
  scene: Scene,
  camera: Camera,
  cfg: RenderConfig,
): Promise<EffectComposer | null> {
  if (cfg.bloom === null) return null;
  const [{ EffectComposer: Composer }, { RenderPass }, { UnrealBloomPass }, { OutputPass }] =
    await Promise.all([
      import('three/examples/jsm/postprocessing/EffectComposer.js'),
      import('three/examples/jsm/postprocessing/RenderPass.js'),
      import('three/examples/jsm/postprocessing/UnrealBloomPass.js'),
      import('three/examples/jsm/postprocessing/OutputPass.js'),
    ]);
  const size = renderer.getSize(new Vector2());
  const pr = renderer.getPixelRatio();
  const rt = new WebGLRenderTarget(size.x * pr, size.y * pr, {
    type: HalfFloatType,
    samples: cfg.composerSamples,
  });
  const c = new Composer(renderer, rt);
  c.addPass(new RenderPass(scene, camera));
  c.addPass(
    new UnrealBloomPass(
      new Vector2(size.x, size.y),
      cfg.bloom.strength,
      cfg.bloom.radius,
      cfg.bloom.threshold,
    ),
  );
  // OutputPass applies the renderer's tone mapping and sRGB conversion.
  c.addPass(new OutputPass());
  return c;
}
