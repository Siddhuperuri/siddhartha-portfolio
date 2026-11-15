"use client";

import dynamic from "next/dynamic";
import type { ComponentType } from "react";

import type { ControlValues } from "@/content/experiments";
import { capabilities } from "@/content/profile";
import { projects } from "@/content/projects";
import { coverSrc, getCoverItems } from "@/lib/covers";

const covers = getCoverItems();
const INK = "#0a0a0a";
const PAPER = "#f5f5f5";

// Every experiment is its own chunk, fetched only when its stage mounts, so
// neither the lab index nor a single playground pays for the other twenty.
const lazy = <P,>(load: () => Promise<ComponentType<P>>) =>
  dynamic(load, { loading: () => null, ssr: false });

const loadFisheyeInfiniteGrid = () =>
  import("@/components/ui/fisheye-infinite-grid").then((m) => m.FisheyeInfiniteGrid);
const FisheyeInfiniteGrid = lazy(loadFisheyeInfiniteGrid);
const loadSpiral3DSlider = () =>
  import("@/components/ui/spiral-3d-slider").then((m) => m.Spiral3DSlider);
const Spiral3DSlider = lazy(loadSpiral3DSlider);
const loadCollectionSurfer = () =>
  import("@/components/ui/collection-surfer").then((m) => m.CollectionSurfer);
const CollectionSurfer = lazy(loadCollectionSurfer);
const loadWheelCarousel = () =>
  import("@/components/ui/wheel-carousel").then((m) => m.WheelCarousel);
const WheelCarousel = lazy(loadWheelCarousel);
const loadOrbitCardStack = () =>
  import("@/components/ui/orbit-card-stack").then((m) => m.OrbitCardStack);
const OrbitCardStack = lazy(loadOrbitCardStack);
const loadCursorDrivenParticleTypography = () =>
  import("@/components/ui/cursor-driven-particle-typography").then(
    (m) => m.CursorDrivenParticleTypography,
  );
const CursorDrivenParticleTypography = lazy(loadCursorDrivenParticleTypography);
const loadDitheredLogo = () =>
  import("@/components/ui/dithered-logo").then((m) => m.DitheredLogo);
const DitheredLogo = lazy(loadDitheredLogo);
const loadPixelCanvas = () =>
  import("@/components/ui/pixel-canvas").then((m) => m.PixelCanvas);
const PixelCanvas = lazy(loadPixelCanvas);
const loadPixelImageTrail = () =>
  import("@/components/ui/pixel-image-trail").then((m) => m.PixelImageTrail);
const PixelImageTrail = lazy(loadPixelImageTrail);
const loadRippleTransition = () =>
  import("@/components/ui/ripple-transition").then((m) => m.RippleTransition);
const RippleTransition = lazy(loadRippleTransition);
const loadSilkAurora = () =>
  import("@/components/ui/silk-aurora").then((m) => m.SilkAurora);
const SilkAurora = lazy(loadSilkAurora);
const loadDitherPrismHero = () =>
  import("@/components/ui/dither-prism-hero").then((m) => m.default);
const DitherPrismHero = lazy(loadDitherPrismHero);
const loadHeroGeometric = () =>
  import("@/components/ui/hero-geometric").then((m) => m.default);
const HeroGeometric = lazy(loadHeroGeometric);
const loadWebGLLiquid = () =>
  import("@/components/ui/webgl-liquid").then((m) => m.WebGLLiquid);
const WebGLLiquid = lazy(loadWebGLLiquid);
const loadScrollChoreography = () =>
  import("@/components/ui/scroll-choreography").then((m) => m.ScrollChoreography);
const ScrollChoreography = lazy(loadScrollChoreography);
const loadScrollSplitCard = () =>
  import("@/components/ui/scroll-split-card").then((m) => m.ScrollSplitCard);
const ScrollSplitCard = lazy(loadScrollSplitCard);
const loadLiquidGlassCarousel = () =>
  import("@/components/ui/liquid-glass-carousel").then((m) => m.LiquidGlassCarousel);
const LiquidGlassCarousel = lazy(loadLiquidGlassCarousel);
const loadLiquidChrome = () =>
  import("@/components/ui/liquid-chrome").then((m) => m.LiquidChrome);
const LiquidChrome = lazy(loadLiquidChrome);
const loadImageTrail = () =>
  import("@/components/ui/image-trail").then((m) => m.ImageTrail);
const ImageTrail = lazy(loadImageTrail);
const loadScrollTiltedGrid = () =>
  import("@/components/ui/scroll-tilted-grid").then((m) => m.ScrollTiltedGrid);
const ScrollTiltedGrid = lazy(loadScrollTiltedGrid);

const loaders: Record<string, () => Promise<unknown>> = {
  "fisheye-grid": loadFisheyeInfiniteGrid,
  "spiral-slider": loadSpiral3DSlider,
  "collection-surfer": loadCollectionSurfer,
  "wheel-carousel": loadWheelCarousel,
  "orbit-card-stack": loadOrbitCardStack,
  "particle-type": loadCursorDrivenParticleTypography,
  "dithered-mark": loadDitheredLogo,
  "pixel-canvas": loadPixelCanvas,
  "pixel-image-trail": loadPixelImageTrail,
  "ripple-transition": loadRippleTransition,
  "silk-aurora": loadSilkAurora,
  "dither-prism": loadDitherPrismHero,
  "geometric-hero": loadHeroGeometric,
  "liquid-field": loadWebGLLiquid,
  "scroll-choreography": loadScrollChoreography,
  "scroll-split-card": loadScrollSplitCard,
  "glass-carousel": loadLiquidGlassCarousel,
  "liquid-chrome": loadLiquidChrome,
  "image-trail": loadImageTrail,
  "tilted-grid": loadScrollTiltedGrid,
};

/**
 * Fetches and evaluates experiment code ahead of use, one module per idle
 * period. Without this the first scroll past each stage would pay for parsing
 * its module (three.js included) in the middle of the scroll.
 */
export function prewarmExperiments(slugs: readonly string[]) {
  const queue = [...slugs];
  let cancelled = false;
  let handle = 0;
  const idle = (run: () => void) => {
    handle = window.requestIdleCallback
      ? window.requestIdleCallback(run, { timeout: 2500 })
      : window.setTimeout(run, 200);
  };
  const next = () => {
    const slug = queue.shift();
    if (cancelled || !slug) return;
    void loaders[slug]?.()
      .catch(() => undefined)
      .then(() => idle(next));
  };
  idle(next);
  return () => {
    cancelled = true;
    if (window.cancelIdleCallback) window.cancelIdleCallback(handle);
    else window.clearTimeout(handle);
  };
}

function hexToUnit(hex: string): [number, number, number] {
  const value = Number.parseInt(hex.slice(1), 16);
  return [((value >> 16) & 255) / 255, ((value >> 8) & 255) / 255, (value & 255) / 255];
}

type ExperimentStageProps = {
  slug: string;
  values: ControlValues;
};

/** Renders one experiment from its slug and the current control values. */
export function ExperimentStage({ slug, values }: ExperimentStageProps) {
  const n = (key: string) => values[key] as number;
  const s = (key: string) => values[key] as string;
  const b = (key: string) => values[key] as boolean;
  const full = "h-full w-full";

  switch (slug) {
    case "fisheye-grid":
      return (
        <FisheyeInfiniteGrid
          className={full}
          gap={n("gap")}
          hoverNudge={n("hoverNudge")}
          inertia={n("inertia")}
          items={covers.map((cover) => ({
            alt: cover.alt,
            image: cover.src,
            meta: "Project",
            title: cover.title,
          }))}
          lensStrength={n("lensStrength")}
          theme={s("theme") as "dark" | "light"}
          tileHeight={n("tileHeight")}
          tileWidth={n("tileWidth")}
          wheelSensitivity={n("wheelSensitivity")}
        />
      );
    case "spiral-slider":
      return (
        <Spiral3DSlider
          autoRotate={b("autoRotate")}
          autoSpeed={n("autoSpeed")}
          bend={n("bend")}
          blurStrength={n("blurStrength")}
          cardWidth={n("cardWidth")}
          className={full}
          fov={n("fov")}
          items={covers.map((cover) => ({ alt: cover.alt, src: cover.src }))}
          radius={n("radius")}
          verticalGap={n("verticalGap")}
        />
      );
    case "collection-surfer":
      return (
        <CollectionSurfer
          heading={s("heading")}
          items={covers.map((cover, index) => ({
            id: index + 1,
            image: cover.src,
            title: cover.title,
          }))}
          variant={s("variant") as "magnetic" | "simple" | "uplift"}
        />
      );
    case "wheel-carousel":
      return (
        <WheelCarousel
          background={s("background")}
          items={covers.map((cover) => ({
            image: cover.src,
            imageAlt: cover.alt,
            label: cover.title,
          }))}
          markerColor={s("markerColor")}
          mode="custom"
          momentum={b("momentum")}
          photoSide={s("photoSide") as "left" | "right"}
          photoWidth={n("photoWidth")}
          radius={n("radius")}
          selectedColor={s("selectedColor")}
          snap={b("snap")}
          spacing={n("spacing")}
          textColor="rgba(245,245,245,0.35)"
          visibleItems={n("visibleItems")}
        />
      );
    case "orbit-card-stack":
      return (
        <OrbitCardStack
          items={projects.slice(0, n("count")).map((project) => ({
            description: project.summary,
            image: coverSrc(project.slug),
            name: project.title,
            role: project.context,
            stat: project.type,
          }))}
          lift={n("lift")}
          spread={n("spread")}
        />
      );
    case "particle-type":
      return (
        <div className="grid h-full w-full place-items-center text-[var(--paper-100)]">
          <CursorDrivenParticleTypography
            className={full}
            color={s("color")}
            dispersionStrength={n("dispersionStrength")}
            fontSize={n("fontSize")}
            particleDensity={n("particleDensity")}
            particleSize={n("particleSize")}
            returnSpeed={n("returnSpeed")}
            text={s("text") || " "}
          />
        </div>
      );
    case "dithered-mark":
      return (
        <div className="grid h-full w-full place-items-center">
          <DitheredLogo
            className={full}
            contrast={n("contrast")}
            dotScale={n("dotScale")}
            gridSize={n("gridSize")}
            imageSrc={s("imageSrc")}
            invert={b("invert")}
            particleColor={s("particleColor")}
            threshold={n("threshold")}
          />
        </div>
      );
    case "pixel-canvas":
      return (
        <PixelCanvas
          className="absolute inset-0"
          colors={[s("color1"), s("color2"), s("color3")]}
          gap={n("gap")}
          speed={n("speed")}
          variant={s("variant") as "default" | "glow" | "trail"}
        />
      );
    case "pixel-image-trail":
      return (
        <PixelImageTrail
          alt="Project cover artwork"
          className={full}
          fadeDuration={n("fadeDuration")}
          maxPixels={n("maxPixels")}
          pixelSize={n("pixelSize")}
          radius={n("radius")}
          src={s("src")}
        />
      );
    case "ripple-transition":
      return (
        <RippleTransition
          autoPlay={b("autoPlay")}
          background={INK}
          caStrength={n("caStrength")}
          className={full}
          duration={n("duration")}
          glow={n("glow")}
          images={covers.map((cover) => cover.src)}
          noiseWarp={n("noiseWarp")}
          pinch={b("pinch")}
          pushAmt={n("pushAmt")}
          waveFreq={n("waveFreq")}
          waveSpeed={n("waveSpeed")}
        />
      );
    case "silk-aurora":
      return (
        <SilkAurora
          accentColor={s("accentColor")}
          baseColor={s("baseColor")}
          className={full}
          description=""
          grain={n("grain")}
          intensity={n("intensity")}
          midColor={s("midColor")}
          mouseInfluence={n("mouseInfluence")}
          sheenColor={s("sheenColor")}
          speed={n("speed")}
          subtitle=""
          title=""
          vignette={n("vignette")}
        />
      );
    case "dither-prism":
      return (
        <DitherPrismHero
          className={full}
          color1={s("color1")}
          color2={s("color2")}
          color3={s("color3")}
          ditherIntensity={n("ditherIntensity")}
          particleCount={n("particleCount")}
          prismIntensity={n("prismIntensity")}
          showParticles={n("particleCount") > 0}
          speed={n("speed")}
          title1={s("title1")}
          title2={s("title2")}
        />
      );
    case "geometric-hero":
      return (
        <HeroGeometric
          className={full}
          color1={s("color1")}
          color2={s("color2")}
          description="Shapes drifting in depth."
          speed={n("speed")}
          title1={s("title1")}
          title2={s("title2")}
        />
      );
    case "liquid-field":
      return (
        <WebGLLiquid
          className={full}
          colorDeep={s("colorDeep")}
          colorHighlight={s("colorHighlight")}
          colorMid={s("colorMid")}
          contrast={n("contrast")}
          description=""
          flowStrength={n("flowStrength")}
          grain={n("grain")}
          speed={n("speed")}
          subtitle=""
          title=""
        />
      );
    case "scroll-choreography":
      return (
        <ScrollChoreography
          images={{
            bottomLeft: s("bottomLeft"),
            bottomRight: s("bottomRight"),
            topLeft: s("topLeft"),
            topRight: s("topRight"),
          }}
        />
      );
    case "scroll-split-card":
      return (
        <ScrollSplitCard
          cards={capabilities.map((capability, index) => ({
            bgColor: index === 1 ? s("accent") : s("ground"),
            description: capability.summary,
            textColor: index === 1 ? INK : PAPER,
            title: capability.title,
          }))}
          imageSrc={s("imageSrc")}
        />
      );
    case "glass-carousel":
      return (
        <LiquidGlassCarousel
          background={s("background")}
          className={full}
          gap={n("gap")}
          items={covers.map((cover) => ({
            aspect: n("aspect"),
            src: cover.src,
            title: cover.title,
          }))}
          panelHeight={n("panelHeight")}
        />
      );
    case "liquid-chrome":
      return (
        <LiquidChrome
          amplitude={n("amplitude")}
          baseColor={hexToUnit(s("baseColor"))}
          interactive={b("interactive")}
          speed={n("speed")}
        />
      );
    case "image-trail":
      return (
        <ImageTrail
          duration={n("duration")}
          imageHeight={n("imageHeight")}
          imageWidth={n("imageWidth")}
          images={covers.map((cover) => cover.src)}
          threshold={n("threshold")}
        />
      );
    case "tilted-grid":
      return (
        <ScrollTiltedGrid
          aspectRatio={s("aspectRatio")}
          images={covers.map((cover) => ({ alt: cover.alt, src: cover.src }))}
          maxBlur={n("maxBlur")}
          maxTilt={n("maxTilt")}
          perspective={n("perspective")}
          smoothScroll={false}
        />
      );
    default:
      return null;
  }
}
