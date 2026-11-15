/**
 * One scroll loop for the whole page.
 *
 * Scroll-linked effects used to each own a scroll listener and read layout
 * (`getBoundingClientRect`) on every frame, then write styles. With several of
 * them on a page, each read came after another effect's write, so the browser
 * had to lay the page out again for every one of them, many times per frame.
 *
 * Here an effect subscribes with two phases instead:
 *  - `measure` reads layout and caches where the element sits in the document.
 *    It runs rarely: on resize, when the page changes height, and whenever
 *    scrolling comes to rest.
 *  - `update` runs once per scrolled frame, is handed the scroll position, and
 *    only writes. No layout is read while the page is moving.
 */

export type ScrollFrame = {
  /** Document scroll position in px. */
  scrollY: number;
  /** Signed scroll speed in px per millisecond. */
  velocity: number;
  /** Viewport height in px. */
  viewport: number;
};

type Subscriber = {
  measure?: (frame: ScrollFrame) => void;
  update: (frame: ScrollFrame) => void;
};

// Above this speed the visitor is travelling, not reading: roughly two and a
// half viewports a second.
const FAST_PX_PER_MS = 2.4;
// How long the speed must stay low before the page counts as settled.
const SETTLE_MS = 140;

const subscribers = new Set<Subscriber>();
const fastListeners = new Set<() => void>();

let scrollSource: (() => number) | null = null;
let started = false;
let frameId = 0;
let needsMeasure = true;
let settleTimer = 0;
let fast = false;
let lastY = 0;
let lastTime = 0;
let viewport = 0;
const frame: ScrollFrame = { scrollY: 0, velocity: 0, viewport: 0 };

function setFast(next: boolean) {
  if (fast === next) return;
  fast = next;
  for (const listener of fastListeners) listener();
}

function run(now: number) {
  frameId = 0;

  // The smooth scroller already knows where the page is; asking it instead of
  // the window keeps even this one read off the layout engine.
  const scrollY = scrollSource ? scrollSource() : window.scrollY;
  const elapsed = now - lastTime;
  frame.velocity = elapsed > 0 && elapsed < 250 ? (scrollY - lastY) / elapsed : 0;
  frame.scrollY = scrollY;
  frame.viewport = viewport;
  lastY = scrollY;
  lastTime = now;

  if (needsMeasure) {
    needsMeasure = false;
    viewport = window.innerHeight || 1;
    frame.viewport = viewport;
    // Every read happens here, before any subscriber writes.
    for (const subscriber of subscribers) subscriber.measure?.(frame);
  }
  for (const subscriber of subscribers) subscriber.update(frame);

  const speed = Math.abs(frame.velocity);
  if (speed > FAST_PX_PER_MS) setFast(true);
  else if (speed < FAST_PX_PER_MS * 0.4) setFast(false);
}

function schedule() {
  if (!frameId) frameId = requestAnimationFrame(run);
}

function onScroll() {
  schedule();
  window.clearTimeout(settleTimer);
  settleTimer = window.setTimeout(() => {
    // At rest nothing is being written, so this is the cheap moment to check
    // that the cached geometry still matches the page.
    setFast(false);
    invalidate();
  }, SETTLE_MS);
}

/** Geometry may have changed: re-measure on the next frame. */
export function invalidate() {
  needsMeasure = true;
  schedule();
}

function start() {
  if (started || typeof window === "undefined") return;
  started = true;
  viewport = window.innerHeight || 1;
  lastTime = performance.now();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", invalidate);
  window.addEventListener("load", invalidate);
  // Late images, mounted experiments and font swaps all change the page height.
  new ResizeObserver(invalidate).observe(document.body);
}

/** Subscribes an effect to the shared scroll loop. Returns the unsubscribe. */
export function onScrollFrame(subscriber: Subscriber) {
  start();
  subscribers.add(subscriber);
  invalidate();
  return () => {
    subscribers.delete(subscriber);
  };
}

/** Lets the smooth scroller report the position, so the window is not asked. */
export function setScrollSource(source: (() => number) | null) {
  scrollSource = source;
}

/** Whether the page is currently being scrolled quickly. */
export function isScrollingFast() {
  return fast;
}

export function subscribeScrollingFast(listener: () => void) {
  start();
  fastListeners.add(listener);
  return () => {
    fastListeners.delete(listener);
  };
}
