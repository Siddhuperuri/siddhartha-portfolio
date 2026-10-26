import { InViewMount } from "@/components/primitives/in-view-mount";
import { AnimatedGradient } from "@/components/ui/animated-gradient";
import { DitherGradient } from "@/components/ui/dither-gradient";
import { PrismGradient } from "@/components/ui/prism-gradient";
import { SpectralRibbon } from "@/components/ui/spectral-ribbon";
import { WebGLLiquid } from "@/components/ui/webgl-liquid";
import type { Project } from "@/types/project";

/**
 * Some backdrops ship with a fixed multicolour palette. Greyscale plus a red
 * multiply layer pulls any of them onto the portfolio's ink-and-red palette.
 */
function Tinted({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div
        className="absolute inset-0"
        style={{ filter: "grayscale(1) contrast(1.15)" }}
      >
        {children}
      </div>
      <div
        aria-hidden
        className="absolute inset-0 bg-[var(--red-500)] mix-blend-multiply"
      />
    </>
  );
}

function Backdrop({ type }: { type: Project["type"] }) {
  switch (type) {
    case "interactive":
      return (
        <Tinted>
          <PrismGradient className="h-full w-full" speed={0.6} />
        </Tinted>
      );
    case "ai":
      return (
        <Tinted>
          <SpectralRibbon
            className="h-full w-full"
            grain={0.4}
            intensity={0.9}
            speed={0.6}
          />
        </Tinted>
      );
    case "brand":
      return (
        <Tinted>
          <AnimatedGradient className="h-full w-full" />
        </Tinted>
      );
    case "product":
      return (
        <DitherGradient
          className="h-full w-full"
          colorFrom="#0a0a0a"
          colorMid="#7a1810"
          colorTo="#ff3d2e"
          intensity={0.2}
          speed={1.5}
        />
      );
    case "web":
    default:
      return (
        <WebGLLiquid
          className="h-full w-full"
          colorDeep="#0a0a0a"
          colorHighlight="#ff3d2e"
          colorMid="#7a1810"
          description=""
          subtitle=""
          title=""
        />
      );
  }
}

/** The case-study masthead backdrop: a different generative field per project type. */
export function CaseBackdrop({ type }: { type: Project["type"] }) {
  return (
    <>
      <InViewMount
        className="absolute inset-0 -z-10 opacity-50"
        fallback={<div aria-hidden className="h-full w-full bg-[var(--ink-900)]" />}
        staticOk
      >
        <Backdrop type={type} />
      </InViewMount>
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-b from-[rgba(10,10,10,0.3)] via-[rgba(10,10,10,0.6)] to-[var(--ink-950)]"
      />
    </>
  );
}
