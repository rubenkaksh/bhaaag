# Verify log

## three.js version (checked 2026-11-05)

- Command: `npm view three version time --json | tail`
- npm latest: 0.187.0 (published 2026-10-30T08:09:24Z). Previous: 0.186.1 (2026-09-24), 0.186.0 (2026-09-08).
- The plan said r186. Installed and pinned exactly: `three` 0.187.0 and `@types/three` 0.187.0 (same version).
- Also pinned: typescript 6.0.3 (typescript-eslint 8.72.1 rejects TS 7.0; peer range is <6.1.0).

## Deferred, not needed for M0

- gltf-transform / KTX2: deferred, no GLB assets exist until M5.
- Cloudflare Pages limits: deferred, the hello scene is a few hundred KB; check before large asset uploads.
- Pointer Lock on Safari: deferred, no input adapter until M1.
