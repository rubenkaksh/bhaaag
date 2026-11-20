import { loadEnv } from 'vite';
import { configDefaults, defineConfig, type Plugin } from 'vitest/config';

function origin(url: string | undefined): string | null {
  try {
    return url ? new URL(url).origin : null;
  } catch {
    return null;
  }
}

/** The page's Content-Security-Policy. Exported for tests. */
export function buildCsp(env: Record<string, string | undefined>): string {
  const connect = ["'self'", origin(env.VITE_SUPABASE_URL), origin(env.VITE_TUNING_URL)].filter(
    (x): x is string => x !== null,
  );
  return [
    "default-src 'self'",
    "script-src 'self'",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob:",
    `connect-src ${[...new Set(connect)].join(' ')}`,
    "font-src 'self' data:",
    "worker-src 'self' blob:",
    "base-uri 'self'",
    "form-action 'self'",
    "object-src 'none'",
  ].join('; ');
}

/** GitHub Pages cannot set headers, so the policy ships as a meta tag, first in <head> (build only: dev needs inline HMR). */
function csp(): Plugin {
  let env: Record<string, string | undefined> = {};
  return {
    name: 'bhaaag-csp',
    apply: 'build',
    configResolved(c) {
      env = loadEnv(c.mode, c.envDir || c.root, 'VITE_');
    },
    transformIndexHtml: {
      order: 'pre',
      handler: () => [
        { tag: 'meta', attrs: { 'http-equiv': 'Content-Security-Policy', content: buildCsp(env) }, injectTo: 'head-prepend' },
      ],
    },
  };
}

export default defineConfig({
  plugins: [csp()],
  build: { outDir: 'dist' },
  test: { exclude: [...configDefaults.exclude, '.claude/**'] },
});
