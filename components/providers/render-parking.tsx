"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

// Top-level blocks of a page: each is tall, self-contained, and off screen for
// most of a visit.
const BLOCKS = "main > section, body > footer";
// Long enough for scroll-driven effects to finish re-measuring after a resize.
const RESIZE_SETTLE_MS = 700;

/**
 * Stops the browser rendering page sections that are nowhere near the viewport.
 *
 * The pages are long and almost every section carries its own composited
 * layers (3D cards, per-letter transforms, canvases). Left alone, the browser
 * keeps all of them alive for the whole visit: style, layer and paint work for
 * a hundred layers on every scrolled frame, and tens of screens of GPU
 * texture, for content nobody can see.
 *
 * `content-visibility: auto` lets the browser skip an off-screen section
 * entirely, but on its own it has to guess the height of anything it has not
 * rendered yet, which makes the page length (and every scroll-linked effect
 * measured against it) jump around. So this renders the page normally first,
 * measures each section as it really is, and only then hands the browser that
 * exact height to hold while the section is parked. The page never changes
 * length, and parked content stays reachable by keyboard, find-in-page and
 * assistive technology, which un-park it on demand.
 */
export function RenderParking() {
  const pathname = usePathname();

  useEffect(() => {
    // Home only, on measurement. There it removes about half the slow frames
    // under a 4x CPU throttle. On /work and /lab the sections are large images
    // and canvases, and bringing one back costs more (a ~90ms hitch each) than
    // parking it saved.
    if (pathname !== "/") return;
    if (!CSS.supports("content-visibility", "auto")) return;

    let parked: HTMLElement[] = [];
    let idle = 0;
    let timer = 0;

    const release = () => {
      for (const block of parked) block.style.contentVisibility = "";
      parked = [];
    };

    const park = () => {
      const blocks = Array.from(document.querySelectorAll<HTMLElement>(BLOCKS)).filter(
        (block) => !block.hasAttribute("data-no-park"),
      );
      // Read every height first, then write, so layout runs once.
      // The held size is the content box, so padding and borders come off.
      const heights = blocks.map((block) => {
        const style = getComputedStyle(block);
        const chrome =
          Number.parseFloat(style.paddingTop) +
          Number.parseFloat(style.paddingBottom) +
          Number.parseFloat(style.borderTopWidth) +
          Number.parseFloat(style.borderBottomWidth);
        return Math.max(0, block.getBoundingClientRect().height - chrome);
      });
      blocks.forEach((block, index) => {
        if (heights[index] === 0) return;
        block.style.containIntrinsicBlockSize = `auto ${heights[index]}px`;
        block.style.contentVisibility = "auto";
      });
      parked = blocks;
    };

    const schedule = (delay: number) => {
      window.clearTimeout(timer);
      window.cancelIdleCallback?.(idle);
      timer = window.setTimeout(() => {
        if (window.requestIdleCallback)
          idle = window.requestIdleCallback(park, { timeout: 1500 });
        else park();
      }, delay);
    };

    // A resize changes every height, and scroll-linked effects re-measure the
    // whole page: let them see it fully rendered, then park again.
    const onResize = () => {
      release();
      schedule(RESIZE_SETTLE_MS);
    };

    const onLoad = () => schedule(300);
    if (document.readyState === "complete") onLoad();
    else window.addEventListener("load", onLoad, { once: true });
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("load", onLoad);
      window.removeEventListener("resize", onResize);
      window.clearTimeout(timer);
      window.cancelIdleCallback?.(idle);
      release();
    };
  }, [pathname]);

  return null;
}
