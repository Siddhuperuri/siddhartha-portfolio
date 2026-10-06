"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

import { useViewportTier } from "@/hooks/use-viewport-tier";
import { cn } from "@/lib/utils";

// three.js + loaders stay out of the route's initial chunk; client-only.
const GlassObject = dynamic(
  () =>
    import("@/components/primitives/glass-object").then((module) => module.GlassObject),
  { loading: () => null, ssr: false },
);

/**
 * The headline as an extruded glass object, sitting over the black hole's disc.
 *
 * `/assets/hero/ideas-made-tangible.svg` is the headline's glyph outlines
 * (Anton, -0.025em tracking, kerned) — GlassObject extrudes SVG *paths*, not
 * live text. If the headline copy changes, that SVG has to be regenerated.
 *
 * Camera: GlassObject's defaults (55° FOV, 4 units out) suit a roughly square
 * object. This canvas is 5.5× wider than tall, so a wide lens would view the
 * outer letters from a steep angle and visibly shear them. A narrow vertical
 * FOV from far away is a telephoto: ~32° horizontally, barely any perspective.
 * The object is scaled up so it still fills the same share of the frame.
 *
 * Compositing: the glass renders over opaque black and the canvas is blended
 * with `mix-blend-mode: screen`. Black adds nothing, so the black hole behind
 * shows straight through the glass, while the glass's own reflections and edge
 * light add on top. (A transparent canvas gives the glass nothing to transmit
 * and it reads as grey plastic.) This needs the canvas to share a stacking
 * context with the black hole — don't give an ancestor a z-index or a
 * transform.
 *
 * Look: clear glass only reads as glass when something bright is behind it,
 * which is why the headline sits over the disc. Three.js can't sample the live
 * WebGPU black hole to refract it (a WebGPU canvas reads back blank to WebGL),
 * so the glass is lit by reflection instead: a glossy body, so the disc shows
 * straight through the letters, and a cool (icy blue) ring-light rim, which is
 * what makes it read as glass — the hue of the component's reference demo;
 * amber read as bronze.
 *
 * Shadow: screen-blended glass can only add light, so over the brightest part
 * of the disc its rim and sheen wash out (a letter can vanish into the glare).
 * A soft, blurred dark copy of the letters underneath dims the disc right
 * behind them so they stay readable, and it makes the glass sit in front of
 * the disc. Keep it light — a heavy shadow turns the glass smoky.
 */
const CANVAS_ASPECT = 5.5; // canvas width / height
const TEXT_ASPECT = 7549.51 / 875; // the headline SVG's width / height
const FOV = 6;
const VISIBLE_HEIGHT = 14; // scene units visible vertically at the text
const CAMERA_DISTANCE = VISIBLE_HEIGHT / (2 * Math.tan((FOV / 2) * (Math.PI / 180)));
const SHADOW_ALPHA = 0.4;
const SHADOW_BLUR_PX = 10;

/** Fraction of the canvas width the text spans; phones get more of it. */
const textShare = (tier: ReturnType<typeof useViewportTier>) =>
  tier === "mobile" ? 0.94 : 0.8;

type Status = "loading" | "ready" | "failed";

export function GlassHeadline({ text }: { text: string }) {
  const [status, setStatus] = useState<Status>("loading");
  const share = textShare(useViewportTier());

  return (
    <div
      aria-hidden
      className="pointer-events-none relative w-full select-none"
      style={{ aspectRatio: CANVAS_ASPECT }}
    >
      {/* Soft shadow under the glass (and under the fallback text): the outline
          SVG as a mask over a dark fill, blurred. Static while the glass rocks,
          so the blur is what keeps the two from visibly drifting apart. */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          style={{
            aspectRatio: TEXT_ASPECT,
            background: `rgba(0,0,0,${SHADOW_ALPHA})`,
            filter: `blur(${SHADOW_BLUR_PX}px)`,
            maskImage: "url(/assets/hero/ideas-made-tangible.svg)",
            maskPosition: "center",
            maskRepeat: "no-repeat",
            maskSize: "contain",
            WebkitMaskImage: "url(/assets/hero/ideas-made-tangible.svg)",
            WebkitMaskPosition: "center",
            WebkitMaskRepeat: "no-repeat",
            WebkitMaskSize: "contain",
            width: `${share * 100 + 2}%`,
          }}
        />
      </div>

      {/* First paint and permanent fallback (no WebGL / asset failure): the
          original solid gradient headline. It fades out once the glass is
          ready — glass is see-through, so leaving it would show through. */}
      <div
        className={cn(
          "absolute inset-0 flex items-center justify-center transition-opacity duration-[var(--duration-slow)] ease-[var(--ease-standard)] motion-reduce:transition-none",
          status === "ready" && "opacity-0",
        )}
      >
        <span
          className="text-center font-[family-name:var(--font-condensed)] text-[clamp(3rem,10vw,9.5rem)] leading-[0.86] tracking-[-0.025em] text-transparent uppercase"
          style={{
            backgroundClip: "text",
            backgroundImage:
              "linear-gradient(to bottom, #ffffff 0%, #d8d8d8 55%, #6f6f6f 100%)",
            WebkitBackgroundClip: "text",
          }}
        >
          {text}
        </span>
      </div>

      {status !== "failed" && (
        <GlassObject
          background="#000000"
          bevel={0.6}
          cameraDistance={CAMERA_DISTANCE}
          className={cn(
            "opacity-0 mix-blend-screen transition-opacity duration-[var(--duration-slow)] ease-[var(--ease-standard)] motion-reduce:transition-none",
            status === "ready" && "opacity-100",
          )}
          clearcoat={1}
          depth={0.013}
          dispersion={2}
          environmentIntensity={1.2}
          floatIntensity={5}
          floatSpeed={1.2}
          fov={FOV}
          highlight="#a8d0ff"
          ior={1.5}
          onError={() => setStatus("failed")}
          onLoad={() => setStatus("ready")}
          orbit={false}
          roughness={0.08}
          rotationIntensity={0.8}
          scale={VISIBLE_HEIGHT * CANVAS_ASPECT * share}
          src="/assets/hero/ideas-made-tangible.svg"
          // GlassObject's root sets `position: relative` inline, which would beat
          // an `absolute` class and collapse it to zero height.
          style={{ inset: 0, position: "absolute" }}
          thickness={2.5}
          zoom={false}
        />
      )}
    </div>
  );
}
