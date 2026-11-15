# Flutter Flame

- Export PNG atlases and JSON in a format supported by the project's Flame version, or load individual frames if simpler.
- Create or update `SpriteSheet`, `Sprite` and `SpriteAnimation` definitions with verified frame dimensions.
- Use `SpriteAnimationComponent` or the project's existing component architecture.
- Set component size in game-world units, not raw texture pixels.
- Set anchors deliberately (bottom-center for characters, center for centered VFX).
- Keep world-space effects and screen-space HUD effects separate.
- Verify camera zoom, device pixel ratio and logical resolution.
- Provide Dart snippets that match the installed Flame version and existing architecture.
