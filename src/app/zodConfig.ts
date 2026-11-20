// zod probes `Function('')` to decide on its JIT parser; under our Content-Security-Policy (no unsafe-eval)
// that probe is blocked and logged as a violation. Turn the JIT off up front. Imported first in main.ts.
import { z } from 'zod';

z.config({ jitless: true });
