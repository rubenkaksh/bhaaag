// Network side of remote tuning: where the overrides file is and how it is fetched. Never rejects:
// any failure (no URL, timeout, network, HTTP status, bad JSON) resolves to undefined, which means
// "baked-in defaults". Pure merge lives in src/app/tuningOverrides.ts.

/** Fetch budget, ms. Vidanta's remote config uses the same 3 s. */
export const TUNING_FETCH_TIMEOUT_MS = 3000;

/**
 * The overrides URL: `?tuning=<url>` (for testing a file on any build), else the build-time
 * `VITE_TUNING_URL`. null when neither is set, which means no fetch at all.
 */
export function tuningUrlFrom(search: string, envUrl: string | undefined): string | null {
  const fromQuery = new URLSearchParams(search).get('tuning');
  const url = (fromQuery ?? envUrl ?? '').trim();
  return url === '' ? null : url;
}

export interface TuningFetchOptions {
  timeoutMs?: number;
  fetchFn?: typeof fetch;
}

/**
 * GET the overrides file and return its parsed JSON, or undefined on any failure. The timeout
 * resolves even if the transport ignores the abort signal, so game start is never held longer.
 */
export async function fetchTuningOverrides(
  url: string,
  opts: TuningFetchOptions = {},
): Promise<unknown> {
  const timeoutMs = opts.timeoutMs ?? TUNING_FETCH_TIMEOUT_MS;
  const fetchFn = opts.fetchFn ?? fetch;
  const controller = new AbortController();
  let timer: ReturnType<typeof setTimeout> | undefined;
  const timedOut = new Promise<undefined>((resolve) => {
    timer = setTimeout(() => {
      controller.abort();
      resolve(undefined);
    }, timeoutMs);
  });
  const loaded = (async (): Promise<unknown> => {
    const res = await fetchFn(url, { signal: controller.signal, cache: 'no-store' });
    return res.ok ? ((await res.json()) as unknown) : undefined;
  })().catch(() => undefined);
  try {
    return await Promise.race([loaded, timedOut]);
  } finally {
    clearTimeout(timer);
  }
}
