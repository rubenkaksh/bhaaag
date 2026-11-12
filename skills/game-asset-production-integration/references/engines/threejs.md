# Three.js / custom 3D

- Use the project's existing scene graph, loaders, coordinate conventions and material patterns. Check the pinned three version and the repo's render docs before choosing an approach.
- Use sprites or planes only when appropriate to the established visual style. Do not force 2D sprites into a 3D pipeline without a clear reason.
- For procedural architecture, prefer reusable geometries and materials, and instancing where the project already uses it.
- Prefer stock materials. Do not add hand-written shaders, `onBeforeCompile`, or new loaders unless the project's docs allow it.
- Budget before adding: texture bytes, draw calls per quality tier, per-frame allocation. Runtime-generated textures (for example a small `CanvasTexture`) cost 0 shipped bytes.
- Load textures once; share materials and geometries; dispose what you create.
- Keep rendering and collision/gameplay data separate. Decorative meshes must not become colliders.
- Do not hand-edit generator-owned level or content files; change the generator and regenerate.
- Keep concept sheets as mood reference only: never load, crop or ship a full sheet as a texture.
