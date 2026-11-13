# Valley Run (valley-1) level graph

Source: `content/graphs/valley-1.graph.json`, placed by `src/content/graph/place.ts` (seed 20261113).
Mermaid drawing of the graph (ADR 0013 section 3). Edge labels are the edge kind; node 8 is a decoy
host. Success path is the single chain 1 to 10; failure is a fall to the hazard band below each hop.

```mermaid
flowchart TD
  n1([1 start, 2 storeys]) -- zip --> n2[2]
  n2 -- touch --> n3[3]
  n3 -- touch --> n4[4]
  n4 -- zip --> n5[5]
  n5 -- zip --> n6[6]
  n6 -- "gap + cushion" --> n7["7 (1 storey)"]
  n7 -- touch --> n8["8 (1 storey, decoy)"]
  n8 -- "gap + tramp" --> n9["9 (2 storeys)"]
  n9 -- touch --> n10([10 goal, hay patch])
  n6 -. miss .-> F1{{fall: hazard band}}
  n8 -. miss .-> F2{{fall: hazard band}}
  n4 -. miss .-> F3{{fall: hazard band}}
```

Screenshots (390x844 portrait, Low tier): `docs/img/t313-valley-top.png` (spawn),
`docs/img/t313-valley-bottom.png` (start moved to node 9 for the shot), `docs/img/t313-lobby.png`
(five lobby entries).
