# Dragon head input (TripoSR), from the Fable review 2026-11-15

Generate in ChatGPT, 1024 px square. Head and neck stump only, flat light, plain background.

> Single 3D game asset turnaround still: stylised Nepali cloud-dragon head with short neck stump, sculpted from rounded cloud puffs, thick swept-back horns, heavy brow, closed jaw with visible fangs, cream and pale gold, matte clay render, flat even studio light, no shadows, plain light-grey background, three-quarter front view (about 30 degrees yaw, 10 above), whole head in frame, centred, square.

Then: remove background, check alpha, `--no-remove-bg --foreground-ratio 0.85 --mc-resolution 320`, 3-4 variants, pick by eye.
Post: bisect and mirror, remesh and smooth, 3-4k tris, recolour from palette, split jaw, emissive eyes, Int16 positions.
Check `lin2srgb` in tools/dragon/clean.py before reusing vertex colours.
Wings are separate flat meshes. Body stays the procedural trail tube.

## Simplified prompt (v2, 2026-11-16)

v1 output (ornate head with whiskers, flame mane, swirls) turned into a blob in TripoSR. Use this one, attach the v1 image as style reference only.

> Use the attached dragon head only as a colour and style reference. Redraw it as a much simpler single 3D game asset: a stylised dragon head with a short neck stump, in a smooth chunky toy-like sculpt, like a soft clay figurine. Terracotta orange-red skin with a cream belly stripe on the neck. Exactly two thick, short, slightly curved cream horns. Big rounded brow ridge, big round glowing orange eyes, wide blocky snout with two simple nostrils, mouth closed with two small rounded fangs. NO whiskers, NO tendrils, NO flame or hair mane, NO swirl or cloud carvings, NO scales, NO thin spikes, NO separate floating parts. One solid, compact, convex silhouette. Flat even studio lighting, no shadows, no rim light, no glow. Plain mid-grey background. Three-quarter front view (about 30 degrees yaw, 10 degrees from above), whole head in frame filling about 80%, centred, square 1024 px.
