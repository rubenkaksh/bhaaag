# Graphics resources for the Bhaaag syllabus

All links are free. Checked on 2026-11-15 against web search listings (title and summary match). This session's network blocked opening the pages themselves, so if a link fails, see "Could not verify" at the end. Paid courses and "free preview" lessons were removed.

Tip: you do not need every link. Pick one per module, before the exercise.

## 1. What a game picture is

| Title | URL | Type | Minutes (estimate) | Why it fits |
|---|---|---|---|---|
| Creating a scene (three.js manual) | https://threejs.org/manual/en/creating-a-scene.html | docs | 10 | Shows the three things every three.js picture needs: a scene, a camera and a renderer. |
| Fundamentals (three.js manual) | https://threejs.org/manual/en/fundamentals.html | docs | 15 | Explains that the renderer paints what the camera sees, again and again, to make a moving picture. |

## 2. Shapes: polygons, triangles and meshes

| Title | URL | Type | Minutes (estimate) | Why it fits |
|---|---|---|---|---|
| Modeling · Beginner (Polygon entry, Morphic 3D glossary) | https://morphic.com/3d-glossary/polygon | article | 5 | A short, plain definition of a polygon and of why games use triangles. |
| Blender 4.0 Beginner Donut Tutorial (Blender Guru) | https://www.blenderguru.com/tutorials/blender-4-beginner-donut-tutorial | video | 20-30 (part 1 only; estimate) | Watch only the first part: you see a shape made of many small flat faces being pushed and smoothed. The rest of the series is optional. |

## 3. Colour without pictures: flat colour

| Title | URL | Type | Minutes (estimate) | Why it fits |
|---|---|---|---|---|
| Pixar in a Box | https://pixar.com/pixar-in-a-box | interactive | 30 per lesson | Pixar's free course, with a colour section that explains where colour comes from and how people see it. |
| Color Science from Pixar in a Box | https://shapeof.com/archives/2016/11/introduction_to_color_by_pixar.html | article | 15 | A readable summary of Pixar's colour lessons, with the main ideas in plain words. |

## 4. Textures: pictures wrapped on shapes

| Title | URL | Type | Minutes (estimate) | Why it fits |
|---|---|---|---|---|
| Textures (three.js manual) | https://threejs.org/manual/en/textures.html | docs | 15 | Shows how a picture is wrapped onto a shape in three.js. |
| Seamless texture (Morphic 3D glossary, beginner) | https://morphic.com/3d-glossary/seamless-texture | article | 5 | Defines a tile whose edges match, so it repeats with no visible join, which is what the Bhaaag tiles are. |

## 5. What a texture costs: download size and memory

| Title | URL | Type | Minutes (estimate) | Why it fits |
|---|---|---|---|---|
| Texture mipmaps introduction (Unity manual; the idea applies to three.js too) | https://docs.unity3d.com/Manual/texture-mipmaps-introduction.html | docs | 10 | Explains the smaller copies of a texture that graphics chips keep for far-away surfaces, and why they take up a bit more memory. |
| Textures (three.js manual, same page as module 4) | https://threejs.org/manual/en/textures.html | docs | 15 | Warns that textures are often the biggest memory user in a three.js app. |

## 6. Materials: how a surface treats light

| Title | URL | Type | Minutes (estimate) | Why it fits |
|---|---|---|---|---|
| Materials (three.js manual) | https://threejs.org/manual/en/materials.html | docs | 15 | Lists the built-in material types, from simple to realistic, and says which ones cost more to draw. |
| Lights and Shadows (Bartosz Ciechanowski, middle sections) | https://ciechanow.ski/lights-and-shadows/ | interactive | 15 | Sliders show the difference between a matte surface and a shiny one, which is what a material decides. |

## 7. Light

| Title | URL | Type | Minutes (estimate) | Why it fits |
|---|---|---|---|---|
| Lights (three.js manual) | https://threejs.org/manual/en/lights.html | docs | 15 | Shows each light type (sun-like directional, sky-and-ground hemisphere, flat ambient) side by side on the same scene; skip the code. |
| Lights and Shadows (Bartosz Ciechanowski) | https://ciechanow.ski/lights-and-shadows/ | interactive | 15 (first sections) | Drag the light around and watch one side of an object brighten while the other darkens. |

## 8. Shadows

| Title | URL | Type | Minutes (estimate) | Why it fits |
|---|---|---|---|---|
| Shadows (three.js manual) | https://threejs.org/manual/en/shadows.html | docs | 15 | Explains which lights can cast shadows and why shadows add extra work for the computer. |
| Lights and Shadows (Bartosz Ciechanowski, shadow sections) | https://ciechanow.ski/lights-and-shadows/ | interactive | 15 | Move the light and watch shadows stretch and blur, the same idea as the soft shadows on Medium/High. |

## 9. What makes a scene look like sunset

| Title | URL | Type | Minutes (estimate) | Why it fits |
|---|---|---|---|---|
| Fog (three.js manual) | https://threejs.org/manual/en/fog.html | docs | 10 | Shows how fog fades far-away things into the sky colour, which gives the hazy sunset look. |
| Pixar in a Box (same course as module 3) | https://pixar.com/pixar-in-a-box | interactive | 30 per lesson | Its lighting and colour lessons explain how warm and cool light work together in a picture. |

## 10. Post-processing: a filter on the finished picture

| Title | URL | Type | Minutes (estimate) | Why it fits |
|---|---|---|---|---|
| Anti-aliasing (Morphic 3D glossary, beginner) | https://morphic.com/3d-glossary/anti-aliasing | article | 5 | Explains why edges look jagged and how smoothing fixes it, with the trade-off in plain words. |
| Post Processing (three.js manual) | https://threejs.org/manual/en/post-processing.html | docs | 15 | Explains the extra steps applied to the finished picture, such as glow. |

## 11. Quality tiers and phones

| Title | URL | Type | Minutes (estimate) | Why it fits |
|---|---|---|---|---|
| Optimize Lots of Objects (three.js manual) | https://threejs.org/manual/en/optimize-lots-of-objects.html | docs | 15 | Read the first few paragraphs only (the rest is code): explains why many separate objects are slow to draw and how grouping them helps. |
| Responsive Design (three.js manual) | https://threejs.org/manual/en/responsive.html | docs | 10 | Read the part on high-density screens: it explains pixel ratio and why sharper phone screens cost more to paint. |

## 12. References, art direction and the one-page brief

| Title | URL | Type | Minutes (estimate) | Why it fits |
|---|---|---|---|---|
| Licence page (Poly Haven, CC0) | https://polyhaven.com/license | docs | 5 | Shows that Poly Haven textures are free to use, including in games, without needing credit. |
| ambientCG (free PBR textures, CC0 licence stated) | https://ambientcg.com | docs | 10 | A free texture library whose licence is stated as CC0, so it is safe to check before you use a texture. |
| How to art direct your game as a non-artist (Bugnet) | https://bugnet.io/blog/how-to-art-direct-your-game-as-a-non-artist | article | 20 | Plain advice on writing down a game's look so that artists and tools can follow it. |
| Game design moodboard guide (Milanote) | https://milanote.com/guide/game-design-moodboard | article | 15 | Shows how to gather a small set of reference pictures for a game's look and sort them into groups. |

## Could not verify

- Opening the pages directly: this session's network blocked threejs.org, ciechanow.ski, polyhaven.com, ambientcg.com, blenderguru.com, pixar.com and the others, so every link above rests on its search listing. These are the first to check if a link fails.
- Khan Academy Pixar in a Box lighting and colour lesson pages: only aggregator and mirror pages were found, so no official lesson URL is listed. Use the pixar.com hub link above.
- Khan Academy "Master Lighting" video: no confirmed URL.
- MDN "Getting started with WebGL" (English): only translated copies were found, and no English page was loaded. Not listed.
- Scratchapixel "Introduction to Polygon Meshes": found in search, but its level looked too technical for an absolute beginner. Not listed.
- Three.js Journey lessons: paid (free previews only), so removed in review.
- Removed in review as off-topic or too far from the game: a Unity Learn lighting course (needs the Unity editor) and a small developer blog on game loops.
- three.js "Responsive Design" manual page: its listing came through forum links to it, not a direct search hit.
- No YouTube video was confirmed by exact URL and title, so none is listed.
- Blender Guru donut series: the episode count and total length vary by source (the site, YouTube and third-party pages disagree), so the minutes shown are estimates.
