"use client";

import dynamic from "next/dynamic";

// WebGPU code stays out of the route's initial chunk (see ARCHITECTURE.md):
// it loads after hydration, client-side only.
const BlackHoleCanvas = dynamic(
  () =>
    import("@/components/hero/black-hole/black-hole-canvas").then(
      (module) => module.BlackHoleCanvas,
    ),
  { loading: () => null, ssr: false },
);

/**
 * Hero backdrop: a static, CSS-only black hole with the live WebGPU canvas
 * fading in over it. The static layer is what shows before the renderer is
 * ready, under prefers-reduced-motion's lighter touch, and permanently in
 * browsers without WebGPU — so the hero never reads as an empty black box.
 */
export function BlackHoleBackdrop() {
  return (
    <div
      aria-hidden
      className="pointer-events-auto absolute inset-0 -z-10 overflow-hidden bg-black"
    >
      {/* Static stand-in: horizon, thin lensed disc, faint halo. Colours echo the
          shader's thermal ramp, so the hand-off to the canvas isn't a colour jump. */}
      <div
        className="absolute inset-0"
        style={{
          background: [
            "radial-gradient(ellipse 30vmin 1.2vmin at 50% 50%, rgba(255,236,208,0.95) 0%, rgba(255,150,60,0.6) 40%, transparent 100%)",
            "radial-gradient(circle 11vmin at 50% 50%, #000 0 62%, rgba(255,170,80,0.55) 66%, rgba(255,110,30,0.18) 78%, transparent 100%)",
            "radial-gradient(ellipse 46vmin 20vmin at 50% 50%, rgba(255,120,40,0.16) 0%, transparent 100%)",
          ].join(", "),
        }}
      />
      <BlackHoleCanvas className="absolute inset-0" />
    </div>
  );
}
