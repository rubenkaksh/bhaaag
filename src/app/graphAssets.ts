// Everything only the graph levels need (home-street, valley-1): graph JSON + zod parser, placement,
// path camera and fork markers. Behind one dynamic import (main.ts) so none of it is in the initial chunk (T345).
import { loadGraph } from '../content/graph/registry';
import { placeGraph } from '../content/graph/place';
import { PathCam, buildPathGraph } from '../content/graph/pathCamera';
import { buildForkMarkers } from '../adapters/render/forkMarkers';

export const graphAssets = { loadGraph, placeGraph, PathCam, buildPathGraph, buildForkMarkers };
export type GraphAssets = typeof graphAssets;
