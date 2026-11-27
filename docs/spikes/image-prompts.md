# GPT image prompts: hero + mount (2026-11-27)

Style anchor: the existing stylised-but-lit look (`docs/art-style-guide.md`, iPhone 13 High target), and the existing hero from `render/heroRig.ts`: a boy with a dark hair cap, hemp tunic dress, crimson neck scarf and waist sash with trailing tails, dark trousers, leather gloves and shoes. Keep him identical across all four.

Rules learned from the dragon head (`docs/dragon/head-prompt.md`): simple, chunky, one solid convex silhouette, no thin parts, plain mid-grey background, flat even light. These are modelling references for procedural primitives, not image-to-3D inputs. 1024 px square each.

## 1. Horse + bow, three-quarter hero view
> Stylised game character, chunky toy-like sculpt, smooth clay finish. A young Nepali hill boy riding a sturdy mountain horse at a gallop, drawing a simple wooden hunting bow with an arrow nocked, aiming to the right. Boy: dark hair cap, hemp-coloured tunic dress, crimson scarf and waist sash with short trailing tails, dark trousers, leather gloves and shoes, small quiver of arrows on his back. Horse: stocky chestnut-brown pony with a cream blaze, thick short mane, simple leather saddle and red-and-ochre blanket, no bridle ornaments. Large simple shapes, no thin spikes, no fine fringes, no scenery. Flat even studio lighting, no shadows, plain mid-grey background. Three-quarter front view (about 30 degrees yaw, 10 degrees from above), whole subject in frame filling about 80%, centred, square 1024 px.

## 2. Horse + bow, side silhouette (for primitive proportions)
> Same character and horse as the attached image, redrawn as a strict flat side view (90 degrees, no perspective), horse at a gallop with the boy leaning forward drawing the bow. Simple solid shapes, flat colours, flat even light, no shadows, plain mid-grey background, whole subject in frame, square 1024 px.

## 3. Dirt bike + rifle, three-quarter hero view
> Stylised game character, chunky toy-like sculpt, smooth clay finish. The same young Nepali hill boy riding a small rugged dirt bike, mid-ride, one hand on the handlebar and one hand holding a lever-action rifle pointed to the right. Boy: dark hair cap, hemp-coloured tunic dress, crimson scarf and waist sash streaming behind him, dark trousers, leather gloves and shoes, simple open-face helmet pushed back, rifle strap across his chest. Bike: terracotta-orange body with cream number plate, chunky knobby tyres, simple upright forks, a small rear rack with a rolled blanket, no logos, no text. Large simple shapes, no thin spikes, no scenery. Flat even studio lighting, no shadows, plain mid-grey background. Three-quarter front view (about 30 degrees yaw, 10 degrees from above), whole subject in frame filling about 80%, centred, square 1024 px.

## 4. Dirt bike + rifle, side silhouette
> Same character and bike as the attached image, redrawn as a strict flat side view (90 degrees, no perspective), bike level, boy leaning forward aiming the rifle. Simple solid shapes, flat colours, flat even light, no shadows, plain mid-grey background, whole subject in frame, square 1024 px.

## Optional 5. Night skybox plate (only if the tinted sunset plate looks muddy)
Ask before generating: the existing plate is built by `tools/backdrop-build.mjs` and budgeted per tier (Low 21 KB, High 130 KB), so a second plate costs texture budget.
> Wide panoramic painting, 2:1, seamless left-to-right wrap. The same Himalayan snow range and layered forested foothills as the attached golden-hour image, now at deep blue night: full moon low behind the peaks, snow lit pale blue-silver, scattered stars in a violet-indigo sky, thin mist in the valleys, a few tiny warm lights on far hillsides. Painterly, stylised, no text, no pylons, no wires, no people, no buildings in the foreground. Top edge fades to a flat dark blue so it blends into the sky dome.
