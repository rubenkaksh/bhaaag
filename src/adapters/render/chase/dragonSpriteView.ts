// T304: the sprite dragon is replaced by the 3D model in dragonView.ts. This alias keeps
// src/app/game.ts compiling unchanged; switch its import to DragonView and delete this file when
// game.ts is next edited.
export { DragonView as DragonSpriteView } from './dragonView';
