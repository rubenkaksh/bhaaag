# Graph level builder (scope)

Mission pointer: read `PRODUCT.md` first. No level select; this only generates level JSON for dev use.

## Goal
`node tools/buildLevel.mjs graph.json > content/levels/<name>.json` turns a hand-written graph into a
Cloud-Village-style level (same geometry and verified rope limits as `tools/genVillage.mjs`).

## Graph format (kept tiny)
```json
{
  "name": "my-level",
  "clusters": [2, 2, 3, 2],
  "gap": 13,
  "decoys": [1, 3],
  "goal": "leap"
}
```
- `clusters[i]` = houses in row i, linked by hop (attached, step down). Between rows = one zip (anchor on the next row's first house).
- `decoys` = row indexes that get a hookable decoy beside them.
- Nodes/edges in `levelGraph.mjs --mermaid` output use the same vocabulary, so a Mermaid graph can later be parsed into this JSON.

## Work (small, one coherent change, cursor/Sonnet tier)
1. Refactor `tools/genVillage.mjs`: `CLUSTERS`, `GAP`, decoy rows become parameters of `generateVillage(spec)`; default spec reproduces `village.json` byte-for-byte (test: regenerate, diff empty).
2. `tools/buildLevel.mjs`: read spec, validate (zod or plain checks: clusters 1-6 rows, each 1-4 houses, gap 10-16), call generator, write JSON.
3. Test: built level passes `tests/content/village.test.ts` checks (zod load, route reachable) for two sample specs.
4. `levelGraph.mjs` on the output shows the matching chain.

## Not in scope
Drawing UI, free-form 2D layouts, Nagarkot-style generation (that is ADR 0012's generator), GLB.

## Done when
Default spec regenerates `village.json` unchanged; two other specs build, load through zod and pass the bot test; gates green.

## Blocker
Lives on the unmerged T297 branch; land after the Cloud Village review/merge.
