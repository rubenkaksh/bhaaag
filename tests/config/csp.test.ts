import { describe, expect, it } from 'vitest';
import { buildCsp } from '../../vite.config';

describe('buildCsp', () => {
  it('allows only self when nothing is configured', () => {
    expect(buildCsp({})).toContain("connect-src 'self';");
    expect(buildCsp({})).toContain("script-src 'self';");
  });
  it('adds the Supabase and tuning origins, once, without paths', () => {
    const csp = buildCsp({ VITE_SUPABASE_URL: 'https://x.supabase.co/', VITE_TUNING_URL: 'https://x.supabase.co/rest/v1/y' });
    expect(csp).toContain("connect-src 'self' https://x.supabase.co;");
  });
  it('ignores a malformed url', () => {
    expect(buildCsp({ VITE_SUPABASE_URL: 'not a url' })).toContain("connect-src 'self';");
  });
});
