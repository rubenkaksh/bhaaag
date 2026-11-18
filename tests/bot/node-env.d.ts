// Minimal typing for the dev bot (no @types/node in this repo).
declare module 'node:fs' {
  export function writeFileSync(path: string, data: string): void;
}
declare const process: { env: Record<string, string | undefined> };
