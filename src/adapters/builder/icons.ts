// Builder icon set: one consistent 24x24 line style (stroke = currentColor). Hand-drawn inline SVG so every
// tool, link type and action has its own distinct glyph, and the canvas can draw the same ones.
// Houses are flat-roofed blocks (Newari rooftops); links share a "two ledges" scene and differ in the middle.

const P: Record<string, string> = {
  move: '<path d="M12 3v18M3 12h18M12 3l-3 3M12 3l3 3M12 21l-3-3M12 21l3-3M3 12l3-3M3 12l3 3M21 12l-3-3M21 12l-3 3"/>',
  house1:
    '<rect x="5" y="9" width="14" height="11" rx="1"/><path d="M3 9h18"/><rect x="10" y="14" width="4" height="6"/>',
  house2:
    '<rect x="6" y="3" width="12" height="7" rx="1"/><rect x="4" y="10" width="16" height="10" rx="1"/><path d="M9 7h2M13 7h2M10 15h4v5"/>',
  addhouse:
    '<rect x="3" y="9" width="13" height="11" rx="1"/><path d="M1.5 9h16M8 20v-5h3v5"/><path d="M19 3v6M16 6h6"/>',
  zip: '<path d="M3 4v16M21 8v12"/><path d="M3 6l18 4"/><circle cx="12" cy="8" r="1.6"/><path d="M12 9.6V14M10.5 14h3"/>',
  gap: '<path d="M2 12h6v8H2zM16 12h6v8h-6z"/><path d="M8 9c2-3 6-3 8 0" stroke-dasharray="2 2"/>',
  jump: '<path d="M2 14h6v7H2zM16 14h6v7h-6z"/><path d="M6 11c1.5-6 10.5-6 12 0"/><path d="M18 11l.4-3M18 11l-3-.6"/>',
  tramp:
    '<path d="M2 12h5v9H2zM17 12h5v9h-5z"/><path d="M8 17c1 1.6 2 1.6 3 0s2-1.6 3 0 2 1.6 2 0"/><path d="M12 14V6M9.5 8.5L12 6l2.5 2.5"/>',
  cushion:
    '<path d="M2 6h7v8H2z"/><rect x="11" y="16" width="11" height="5" rx="2.5"/><path d="M12 8c2 0 3.5 1.5 4.5 5"/><path d="M16.5 13l-.2-2.7M16.5 13l-2.4-1"/>',
  boxes:
    '<rect x="3" y="15" width="6" height="6"/><rect x="9" y="10" width="6" height="11"/><rect x="15" y="5" width="6" height="16"/>',
  stairs: '<path d="M3 21h4v-4h4v-4h4V9h4V5"/><path d="M3 21h18"/>',
  crate: '<rect x="4" y="8" width="16" height="12" rx="1"/><path d="M4 12h16M12 8v12M7 5h10"/>',
  del: '<path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13M10 11v6M14 11v6"/>',
  start: '<path d="M6 21V3"/><path d="M6 4h12l-3 4 3 4H6" fill="currentColor" fill-opacity=".25"/>',
  goal: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.4" fill="currentColor"/>',
  undo: '<path d="M9 14L4 9l5-5"/><path d="M4 9h10a6 6 0 010 12h-3"/>',
  redo: '<path d="M15 14l5-5-5-5"/><path d="M20 9H10a6 6 0 000 12h3"/>',
  play: '<path d="M7 4l13 8-13 8z" fill="currentColor" fill-opacity=".25"/>',
  download: '<path d="M12 3v12M7 10l5 5 5-5M4 20h16"/>',
  import: '<path d="M12 16V4M7 9l5-5 5 5M4 20h16"/>',
  new: '<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M12 11v6M9 14h6"/>',
  sample: '<path d="M12 3l2 5 5 .5-4 3.5 1.2 5L12 14.3 7.8 17l1.2-5L5 8.500 10 8z"/>',
  save: '<path d="M5 3h12l3 3v15H5z"/><path d="M8 3v6h8V3M8 21v-7h8v7"/>',
  copy: '<rect x="8" y="8" width="12" height="13" rx="1.5"/><path d="M16 8V5a1 1 0 00-1-1H5a1 1 0 00-1 1v11a1 1 0 001 1h3"/>',
  balcony:
    '<rect x="5" y="3" width="14" height="13" rx="1"/><path d="M2 16h20v3H2zM6 19v2M12 19v2M18 19v2"/>',
  eye: '<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
  eyeoff:
    '<path d="M3 3l18 18M10 6.200A9.500 9.500 0 0112 6c6 0 10 6 10 6a17 17 0 01-3 3.500M6.500 7.500A17 17 0 002 12s4 7 10 7a9 9 0 004-1"/>',
  warn: '<path d="M12 3l10 18H2z"/><path d="M12 10v5M12 18v.5"/>',
  error: '<circle cx="12" cy="12" r="9"/><path d="M9 9l6 6M15 9l-6 6"/>',
  ok: '<circle cx="12" cy="12" r="9"/><path d="M8 12.500l3 3 5-6"/>',
  edit: '<path d="M4 20l1-5L16 4l4 4L9 19z"/><path d="M14 6l4 4"/>',
  library: '<path d="M4 4h4v16H4zM10 4h4v16h-4z"/><path d="M16 6l4-1 3 15-4 1z"/>',
  hint: '<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.500v.5"/>',
  link: '<path d="M10 14a4 4 0 005.500 0l3-3a4 4 0 00-5.500-5.500L12 7M14 10a4 4 0 00-5.500 0l-3 3A4 4 0 0011 18.500L12 17"/>',
};

export type IconName = keyof typeof P;

export function icon(name: IconName, size = 20): string {
  return `<svg class="ic" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${P[name] ?? ''}</svg>`;
}

const cache = new Map<string, HTMLImageElement>();
/** An <img> of the icon in a fixed colour, for drawing on the canvas. Redraws via `onload` once decoded. */
export function iconImage(name: IconName, color: string, onload: () => void): HTMLImageElement {
  const k = name + color;
  let img = cache.get(k);
  if (img === undefined) {
    img = new Image();
    img.onload = onload;
    img.src =
      'data:image/svg+xml;utf8,' +
      encodeURIComponent(
        `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${P[name] ?? ''}</svg>`,
      );
    cache.set(k, img);
  }
  return img;
}
