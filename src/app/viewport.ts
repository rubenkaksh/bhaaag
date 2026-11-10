// Viewport layout: pure classification plus a DOM watcher (three-track plan D1).

export type Orientation = 'landscape' | 'portrait';
export type ViewportLayout = {
  w: number;
  h: number;
  aspect: number;
  orientation: Orientation;
  coarse: boolean;
};

export function layoutFor(w: number, h: number, coarse: boolean): ViewportLayout {
  const hh = h > 0 ? h : 1;
  const aspect = w / hh;
  return { w, h, aspect, orientation: aspect >= 1 ? 'landscape' : 'portrait', coarse };
}

export function readViewport(): ViewportLayout {
  return layoutFor(
    window.innerWidth,
    window.innerHeight,
    window.matchMedia('(pointer: coarse)').matches,
  );
}

/**
 * resize + orientationchange + visualViewport.resize, rAF-coalesced; after an orientation change
 * it re-reads 250 ms later (iOS reports stale sizes right after the event). Returns unsubscribe.
 */
export function watchViewport(
  cb: (v: ViewportLayout, orientationChanged: boolean) => void,
): () => void {
  let last = readViewport();
  let raf = 0;
  let timer = 0;
  const emit = (): void => {
    raf = 0;
    const v = readViewport();
    const flipped = v.orientation !== last.orientation;
    last = v;
    cb(v, flipped);
  };
  const schedule = (): void => {
    if (raf === 0) raf = requestAnimationFrame(emit);
  };
  const onOrientation = (): void => {
    schedule();
    window.clearTimeout(timer);
    timer = window.setTimeout(schedule, 250);
  };
  window.addEventListener('resize', schedule);
  window.addEventListener('orientationchange', onOrientation);
  window.visualViewport?.addEventListener('resize', schedule);
  return () => {
    window.removeEventListener('resize', schedule);
    window.removeEventListener('orientationchange', onOrientation);
    window.visualViewport?.removeEventListener('resize', schedule);
    if (raf !== 0) cancelAnimationFrame(raf);
    window.clearTimeout(timer);
  };
}
