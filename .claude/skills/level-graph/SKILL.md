---
name: level-graph
description: Draw a layered success/failure graph of any Bhaaag level on demand (Nagarkot Run or a level JSON like village.json). Use when the user asks to "show the level as a graph", see success paths and dead ends, or compare level routes.
---

# Level graph

Run from the repo root (use `PATH=/opt/homebrew/bin:$PATH`; the script starts Vite to load the TS generator, so run with the sandbox off if it fails to bind).

```bash
node tools/levelGraph.mjs                              # Nagarkot Run, text summary
node tools/levelGraph.mjs nagarkot --svg > graph.svg   # layered graph (the default deliverable)
node tools/levelGraph.mjs content/levels/village.json --svg
node tools/levelGraph.mjs nagarkot --json              # data behind the SVG
node tools/levelGraph.mjs nagarkot --mermaid [--full]  # text flowchart
node tools/levelGraph.mjs nagarkot --seed=N --svg      # other generator seed
```

## What the picture shows

- Rows = fewest moves from the start; top is start, bottom is goal. Left to right = across the hillside.
- Green thick = shortest success route. Grey = other moves that still reach the goal.
- Red dot and red dashed lines = dead-end roofs (reachable, no path to goal) and moves into them.
- Squares = balcony or road nodes. Only forward moves are drawn.

## How to deliver

Write the SVG to the session scratchpad and show it with SendUserFile (`display: render`). Do not hand-draw the graph in a widget: the script is the source of truth.

## Limits (say so when relevant)

- Strategy levels use the generator's real kinematic graph (`src/content/strategy/{gen,graph}.ts`). Falls and missed jumps have no node, so the only failures shown are dead-end roofs.
- JSON levels have no stored graph: the picture is a chain of spawn, route anchors and goal, with unused anchors as decoy dead ends. It is inferred, not simulated.
- Only the shortest route is highlighted even when several escape paths exist.
