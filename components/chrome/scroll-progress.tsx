"use client";

import { useEffect, useRef } from "react";

import { onScrollFrame } from "@/lib/scroll-bus";

/**
 * A thin red line under the header that fills as the page scrolls. It rides the
 * shared scroll loop and only writes a transform, so it costs no layout. On a
 * page that does not scroll (the playgrounds) it stays empty and invisible.
 */
export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    let range = 1;
    let last = -1;

    return onScrollFrame({
      measure: ({ viewport }) => {
        range = Math.max(1, document.documentElement.scrollHeight - viewport);
      },
      update: ({ scrollY }) => {
        const progress = Math.min(1, Math.max(0, scrollY / range));
        if (Math.abs(progress - last) < 0.0005) return;
        last = progress;
        bar.style.transform = `scaleX(${progress})`;
        bar.style.opacity = progress > 0.002 ? "1" : "0";
      },
    });
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-[45] h-[2px]"
    >
      <div
        className="h-full origin-left bg-[var(--red-500)] opacity-0 transition-opacity duration-[var(--duration-base)]"
        ref={barRef}
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
