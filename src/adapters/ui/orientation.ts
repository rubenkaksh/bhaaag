// Orientation switch: Auto / Landscape / Portrait (owner request; no rotate overlay, decided 2026-11-10).
// Adapter layer, DOM allowed; the pure helpers at the top are unit-tested.
//
// Forced mode, in order of preference:
//  1. screen.orientation.lock (needs fullscreen on Android Chrome; tried from the button tap).
//  2. Fallback (iOS Safari has no lock): rotate the game root (document.body) 90 degrees with CSS. The
//     logical viewport is then the physical one with width and height swapped: renderer, HUD and touch
//     coordinates read it through viewportSize() / toLogical(). `@media (orientation: ...)` rules are
//     swapped at runtime so the portrait/landscape HUD layouts follow the logical orientation.
// Desktop (no coarse pointer) never rotates: the choice is ignored there.

export type OrientPref = 'auto' | 'landscape' | 'portrait';
export const ORIENT_PREFS: readonly OrientPref[] = ['auto', 'landscape', 'portrait'];
export const ORIENT_KEY = 'bhaaag.orientation';
export const ORIENT_LABEL: Record<OrientPref, string> = {
  auto: 'Auto',
  landscape: 'Landscape',
  portrait: 'Portrait',
};

export function parseOrientPref(v: unknown): OrientPref {
  return v === 'landscape' || v === 'portrait' ? v : 'auto';
}

export function physicalOrientation(w: number, h: number): 'landscape' | 'portrait' {
  return w >= h ? 'landscape' : 'portrait';
}

/** CSS rotation is needed when a forced orientation differs from the physical one and no lock is active. */
export function needsRotation(pref: OrientPref, w: number, h: number, lockActive: boolean): boolean {
  if (pref === 'auto' || lockActive) return false;
  return physicalOrientation(w, h) !== pref;
}

/** Size the game sees: width and height swap when the root is rotated. */
export function logicalSize(w: number, h: number, rotated: boolean): { w: number; h: number } {
  return rotated ? { w: h, h: w } : { w, h };
}

/**
 * Map a physical client point to the rotated root's own frame. The root is rotated 90 degrees clockwise
 * about its top-left corner and shifted right by the physical width, so logical (x, y) lands on screen
 * at (W - y, x); this is the inverse.
 */
export function remapPoint(
  x: number,
  y: number,
  physW: number,
  rotated: boolean,
  out: { x: number; y: number },
): { x: number; y: number } {
  if (rotated) {
    out.x = y;
    out.y = physW - x;
  } else {
    out.x = x;
    out.y = y;
  }
  return out;
}

/** Inline style for the rotated root (physical size w x h). */
export function rotatedRootStyle(w: number, h: number): { width: string; height: string; transform: string } {
  return { width: `${h}px`, height: `${w}px`, transform: `translateX(${w}px) rotate(90deg)` };
}

/** Swap portrait and landscape inside a media query text. */
export function swapOrientationText(text: string): string {
  return text.replace(/orientation\s*:\s*(portrait|landscape)/g, (_m, o: string) =>
    o === 'portrait' ? 'orientation: landscape' : 'orientation: portrait',
  );
}

export function cyclePref(p: OrientPref): OrientPref {
  return ORIENT_PREFS[(ORIENT_PREFS.indexOf(p) + 1) % ORIENT_PREFS.length];
}

export function loadOrientPref(storage: Pick<Storage, 'getItem'> | null = safeStorage()): OrientPref {
  try {
    return parseOrientPref(storage?.getItem(ORIENT_KEY));
  } catch {
    return 'auto';
  }
}

export function saveOrientPref(p: OrientPref, storage: Pick<Storage, 'setItem'> | null = safeStorage()): void {
  try {
    storage?.setItem(ORIENT_KEY, p);
  } catch {
    // private mode / storage full: the choice just does not persist
  }
}

function safeStorage(): Storage | null {
  try {
    return typeof localStorage === 'undefined' ? null : localStorage;
  } catch {
    return null;
  }
}

// ---- module state read by the viewport, renderer and touch adapter ----

let rotatedNow = false;

export function isRotated(): boolean {
  return rotatedNow;
}

/** Logical viewport size (what the game lays out in), accounting for a CSS-rotated root. */
export function viewportSize(): { w: number; h: number } {
  return logicalSize(window.innerWidth, window.innerHeight, rotatedNow);
}

const scratch = { x: 0, y: 0 };
/** Physical pointer client coordinates to the game's logical frame. Returns a shared scratch object. */
export function toLogical(clientX: number, clientY: number): { x: number; y: number } {
  return remapPoint(clientX, clientY, window.innerWidth, rotatedNow, scratch);
}

// ---- controller ----

export type OrientationControl = {
  pref: () => OrientPref;
  setPref: (p: OrientPref) => void;
  /** Cycle Auto -> Landscape -> Portrait; call from a tap so fullscreen + lock are allowed. */
  cycle: () => OrientPref;
  onChange: (cb: (p: OrientPref) => void) => void;
  /** False on desktop, where the choice is ignored. */
  supported: boolean;
};

const origMedia = new WeakMap<CSSMediaRule, string>();

function walkRules(rules: CSSRuleList, fn: (r: CSSMediaRule) => void): void {
  for (const r of Array.from(rules)) {
    if (r instanceof CSSMediaRule) {
      fn(r);
      walkRules(r.cssRules, fn);
    }
  }
}

function applyMediaSwap(swap: boolean): void {
  for (const sheet of Array.from(document.styleSheets)) {
    let rules: CSSRuleList;
    try {
      rules = sheet.cssRules;
    } catch {
      continue; // cross-origin sheet
    }
    walkRules(rules, (r) => {
      const orig = origMedia.get(r) ?? r.media.mediaText;
      if (!/orientation/.test(orig)) return;
      origMedia.set(r, orig);
      r.media.mediaText = swap ? swapOrientationText(orig) : orig;
    });
  }
}

export function createOrientation(root: HTMLElement = document.body): OrientationControl {
  const supported = window.matchMedia('(pointer: coarse)').matches;
  let pref: OrientPref = supported ? loadOrientPref() : 'auto';
  let lockActive = false;
  const listeners: Array<(p: OrientPref) => void> = [];

  const refresh = (): void => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const want = supported && needsRotation(pref, w, h, lockActive);
    if (want) {
      const st = rotatedRootStyle(w, h);
      root.style.position = 'fixed';
      root.style.left = '0';
      root.style.top = '0';
      root.style.transformOrigin = '0 0';
      root.style.width = st.width;
      root.style.height = st.height;
      root.style.transform = st.transform;
    }
    if (want === rotatedNow) return;
    rotatedNow = want;
    if (!want) {
      for (const k of ['position', 'left', 'top', 'transformOrigin', 'width', 'height', 'transform'] as const) {
        root.style[k] = '';
      }
    }
    applyMediaSwap(want);
    document.documentElement.classList.toggle('orient-rotated', want);
    // Let the viewport watcher re-read the (now logical) size.
    window.dispatchEvent(new Event('resize'));
  };

  const lock = async (p: OrientPref): Promise<void> => {
    const so = screen.orientation as ScreenOrientation & { lock?: (o: string) => Promise<void> };
    try {
      if (p === 'auto') {
        so.unlock?.();
        lockActive = false;
        return;
      }
      if (typeof so.lock !== 'function') return; // iOS Safari: CSS fallback only
      if (document.fullscreenElement === null) await document.documentElement.requestFullscreen();
      await so.lock(p);
      lockActive = true;
    } catch {
      lockActive = false; // not allowed here: the CSS fallback stays in charge
    }
    refresh();
  };

  const release = (): void => {
    if (document.fullscreenElement === null && lockActive) {
      lockActive = false;
      refresh();
    }
  };

  window.addEventListener('resize', refresh);
  window.addEventListener('orientationchange', refresh);
  document.addEventListener('fullscreenchange', release);
  refresh();

  const setPref = (p: OrientPref): void => {
    if (!supported) return;
    pref = p;
    saveOrientPref(p);
    lockActive = false;
    refresh();
    void lock(p);
    for (const cb of listeners) cb(p);
  };
  return {
    pref: () => pref,
    setPref,
    cycle: () => {
      setPref(cyclePref(pref));
      return pref;
    },
    onChange: (cb) => {
      listeners.push(cb);
    },
    supported,
  };
}
