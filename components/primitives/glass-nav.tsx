"use client";

import { useEffect, useRef } from "react";
import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

const scrollDistancePx = 240;

/**
 * Sticky glass surface whose fill and blur cross-fade with scroll position,
 * so the nav reads as floating over whatever is scrolling behind it. The
 * scroll listener is rAF-throttled and writes a single custom property
 * directly to the node — no per-pixel React state, no layout reads beyond
 * `window.scrollY`.
 */
export function GlassNav({ className, ...props }: ComponentPropsWithoutRef<"header">) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = ref.current;

    if (!node) {
      return;
    }

    let frame = 0;

    function applyScrollProgress() {
      frame = 0;
      const progress = Math.min(1, Math.max(0, window.scrollY / scrollDistancePx));
      node?.style.setProperty("--nav-scroll", progress.toFixed(3));
    }

    function handleScroll() {
      if (frame) {
        return;
      }
      frame = window.requestAnimationFrame(applyScrollProgress);
    }

    applyScrollProgress();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full border-b border-[var(--border-subtle)] transition-[border-color] duration-[var(--duration-base)] ease-[var(--ease-standard)]",
        className,
      )}
      ref={ref}
      style={{
        backdropFilter:
          "blur(calc(var(--glass-blur-nav-rest) + (var(--glass-blur-nav-scrolled) - var(--glass-blur-nav-rest)) * var(--nav-scroll, 0)))",
        background:
          "color-mix(in oklch, var(--glass-fill-nav-scrolled) calc(var(--nav-scroll, 0) * 100%), var(--glass-fill-nav-rest))",
      }}
      {...props}
    />
  );
}
