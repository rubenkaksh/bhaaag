# Dragon head input (TripoSR), from the Fable review 2026-11-15

Generate in ChatGPT, 1024 px square. Head and neck stump only, flat light, plain background.

> Single 3D game asset turnaround still: stylised Nepali cloud-dragon head with short neck stump, sculpted from rounded cloud puffs, thick swept-back horns, heavy brow, closed jaw with visible fangs, cream and pale gold, matte clay render, flat even studio light, no shadows, plain light-grey background, three-quarter front view (about 30 degrees yaw, 10 above), whole head in frame, centred, square.

Then: remove background, check alpha, `--no-remove-bg --foreground-ratio 0.85 --mc-resolution 320`, 3-4 variants, pick by eye.
Post: bisect and mirror, remesh and smooth, 3-4k tris, recolour from palette, split jaw, emissive eyes, Int16 positions.
Check `lin2srgb` in tools/dragon/clean.py before reusing vertex colours.
Wings are separate flat meshes. Body stays the procedural trail tube.
