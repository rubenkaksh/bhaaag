# GPT image prompts: hero + mount (2026-11-27)

Status: prompts 1 and 3 below produced the accepted images (horse+bow 3/4 and side, dirt bike+rifle 3/4; the bike side view came from Gemini). The first wording tripped the GPT content filter ("Nepali", "boy", "aiming"), so the working wording avoids ethnicity words, uses "young adventurer" and "pointing". The hero look built from them is documented in `hero-look.md`.

Style anchor: the hero of `src/adapters/render/heroRig.ts`: dark hair, knit beanie (or cream open helmet for the bike), cream tunic with a wrap front, brick-red scarf and wide sash with a knot and two tails, dark trousers, leather bracers, knee boots. 1024 px square each. Modelling reference for procedural primitives only: no image-to-3D (TripoSR failed on the dragon, 2026-11-16).

## 1. Horse + bow, hero view (accepted)
> Stylised game character, chunky toy-like sculpt, smooth clay finish. A young adventurer riding a sturdy mountain pony at a gallop, holding a simple wooden hunting bow drawn back with an arrow nocked, pointing to the right. Rider: dark hair cap, hemp-coloured tunic, crimson scarf and waist sash with short trailing tails, dark trousers, leather gloves and boots, small quiver of arrows on the back. Pony: stocky chestnut-brown with a cream blaze, thick short mane, simple leather saddle and red-and-ochre blanket, no bridle ornaments. Large simple shapes, no thin spikes, no fine fringes, no scenery. Flat even studio lighting, no shadows, plain mid-grey background. Three-quarter front view (about 30 degrees yaw, 10 degrees from above), whole subject in frame filling about 80%, centred, square 1024 px.

## 2. Horse + bow, side view (attach 1) (accepted)
> Same character and horse as the attached image, redrawn as a strict flat side view (90 degrees, no perspective), horse at a gallop with the rider leaning forward drawing the bow. Simple solid shapes, flat colours, flat even light, no shadows, plain mid-grey background, whole subject in frame, square 1024 px.

## 3. Dirt bike + rifle, hero view (accepted)
> Stylised game character, chunky toy-like sculpt, smooth clay finish. A young adventurer riding a small rugged dirt bike, mid-ride, one hand on the handlebar and the other holding a lever-action hunting rifle pointed upward and to the right. Rider: dark hair cap, hemp-coloured tunic, crimson scarf and waist sash streaming behind, dark trousers, leather gloves and boots, simple open-face helmet pushed back, rifle strap across the chest. Bike: terracotta-orange body with cream number plate, chunky knobby tyres, simple upright forks, small rear rack with a rolled blanket, no logos, no text. Large simple shapes, no thin spikes, no scenery. Flat even studio lighting, no shadows, plain mid-grey background. Three-quarter front view (about 30 degrees yaw, 10 degrees from above), whole subject in frame filling about 80%, centred, square 1024 px.

## 4. Dirt bike + rifle, side view (attach 3) (accepted, Gemini)
> Same character and bike as the attached image, redrawn as a strict flat side view (90 degrees, no perspective), bike level, rider leaning forward pointing the rifle. Simple solid shapes, flat colours, flat even light, no shadows, plain mid-grey background, whole subject in frame, square 1024 px.

## Still to generate (opus review 2026-11-27)
Keep out of `main` (art folder or the `assets` branch). Wording hints: "stylised toy figurine, young adventurer character", "the same character as the attached image", "bow drawn, arrow pointing to the right", creatures "friendly cartoon undead villager toy, no blood, no gore".
- Rider alone, front, back and side: "standing alone, relaxed A-pose, arms 30 degrees out, strict orthographic front view, flat even light, plain mid-grey background, full body, square 1024 px".
- Face close-up with and without the hat.
- Horse and bike turnarounds (side, front), standing.
- Bow and rifle as flat props.
- Zombie, wolf, boar, rabbit, deer, campfire.

## Optional: night skybox plate
Only if darkening the existing golden-hour plate looks muddy. A second plate costs texture budget (Low 21 KB, High 130 KB per plate, tier caps in `textureManifest.ts`).
> Wide panoramic painting, 2:1, seamless left-to-right wrap. The same Himalayan snow range and layered forested foothills as the attached golden-hour image, now at deep blue night: full moon low behind the peaks, snow lit pale blue-silver, scattered stars in a violet-indigo sky, thin mist in the valleys, a few tiny warm lights on far hillsides. Painterly, stylised, no text, no pylons, no wires, no people, no buildings in the foreground. Top edge fades to a flat dark blue so it blends into the sky dome.
