import { describe, expect, it } from 'vitest';
import { fetchTuningOverrides, tuningUrlFrom } from '../../src/adapters/config/remoteTuning';

const URL_ = 'https://example.test/tuning.json';

function okResponse(body: unknown): Response {
  return new Response(JSON.stringify(body), { status: 200 });
}

describe('tuningUrlFrom', () => {
  it('the ?tuning= query beats the build-time env URL', () => {
    expect(tuningUrlFrom('?tuning=https://a.test/x.json', 'https://env.test/y.json')).toBe(
      'https://a.test/x.json',
    );
  });

  it('falls back to the env URL, and is null when neither is set', () => {
    expect(tuningUrlFrom('', 'https://env.test/y.json')).toBe('https://env.test/y.json');
    expect(tuningUrlFrom('?level=x', undefined)).toBeNull();
    expect(tuningUrlFrom('', '   ')).toBeNull();
    expect(tuningUrlFrom('?tuning=', undefined)).toBeNull();
  });
});

describe('fetchTuningOverrides', () => {
  it('returns the parsed JSON on 2xx and passes the abort signal', async () => {
    let seen: RequestInit | undefined;
    const got = await fetchTuningOverrides(URL_, {
      fetchFn: async (_u, init) => {
        seen = init;
        return okResponse({ rope: { drag: 0.2 } });
      },
    });
    expect(got).toEqual({ rope: { drag: 0.2 } });
    expect(seen?.signal).toBeInstanceOf(AbortSignal);
    expect(seen?.cache).toBe('no-store');
  });

  it('resolves undefined on an HTTP error, a network error or invalid JSON', async () => {
    expect(
      await fetchTuningOverrides(URL_, { fetchFn: async () => new Response('no', { status: 500 }) }),
    ).toBeUndefined();
    expect(
      await fetchTuningOverrides(URL_, {
        fetchFn: async () => {
          throw new TypeError('network down');
        },
      }),
    ).toBeUndefined();
    expect(
      await fetchTuningOverrides(URL_, { fetchFn: async () => new Response('{not json', { status: 200 }) }),
    ).toBeUndefined();
  });

  it('gives up at the timeout even when the transport ignores the abort', async () => {
    const started = Date.now();
    const got = await fetchTuningOverrides(URL_, {
      timeoutMs: 30,
      fetchFn: () => new Promise<Response>(() => undefined), // never settles, ignores signal
    });
    expect(got).toBeUndefined();
    expect(Date.now() - started).toBeLessThan(2000);
  });

  it('aborts the request when the timeout fires', async () => {
    let aborted = false;
    await fetchTuningOverrides(URL_, {
      timeoutMs: 20,
      fetchFn: (_u, init) =>
        new Promise<Response>((_resolve, reject) => {
          init?.signal?.addEventListener('abort', () => {
            aborted = true;
            reject(new DOMException('aborted', 'AbortError'));
          });
        }),
    });
    expect(aborted).toBe(true);
  });
});
