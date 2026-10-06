"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

import { createRenderer } from "./renderer";

/**
 * Full-bleed WebGPU black hole (vgpu): geodesic ray-marched accretion disc,
 * HDR bloom, ACES tone mapping. Decorative — the canvas is hidden from
 * assistive tech and starts transparent so whatever sits behind it (the hero's
 * static backdrop) is what shows while it loads, or for good where WebGPU is
 * unavailable or the renderer fails.
 */
export function BlackHoleCanvas({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let active = true;
    const fallBack = (error: unknown) => {
      if (!active) return;
      console.warn(
        "Black hole renderer unavailable; showing the static backdrop.",
        error,
      );
      setReady(false);
    };

    const renderer = createRenderer({ canvas, onError: fallBack });
    renderer.ready.then(() => {
      if (active) setReady(true);
    }, fallBack);

    return () => {
      active = false;
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      aria-hidden
      className={cn(
        "block h-full w-full opacity-0 transition-opacity duration-[var(--duration-slow)] ease-[var(--ease-standard)] motion-reduce:transition-none",
        ready && "opacity-100",
        className,
      )}
      ref={canvasRef}
    />
  );
}
