// Minimal typing so the level test can read the JSON file without @types/node.
declare module 'node:fs' {
  export function readFileSync(path: URL | string, encoding: 'utf8'): string;
}
