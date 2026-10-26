import type { ReactNode } from "react";

import { GradientHero01 } from "@/components/gradient-hero-01";
import { InViewMount } from "@/components/primitives/in-view-mount";
import { SectionRegister } from "@/components/primitives/section-register";
import { CollectionSurfer } from "@/components/ui/collection-surfer";
import { CursorDrivenParticleTypography } from "@/components/ui/cursor-driven-particle-typography";
import { DitherPrismHero } from "@/components/ui/dither-prism-hero";
import { DitheredLogo } from "@/components/ui/dithered-logo";
import { FisheyeInfiniteGrid } from "@/components/ui/fisheye-infinite-grid";
import HeroGeometric from "@/components/ui/hero-geometric";
import { OrbitCardStack } from "@/components/ui/orbit-card-stack";
import { PixelCanvas } from "@/components/ui/pixel-canvas";
import { PixelImageTrail } from "@/components/ui/pixel-image-trail";
import { RippleTransition } from "@/components/ui/ripple-transition";
import { ScrollChoreography } from "@/components/ui/scroll-choreography";
import { ScrollSplitCard } from "@/components/ui/scroll-split-card";
import { SilkAurora } from "@/components/ui/silk-aurora";
import { Spiral3DSlider } from "@/components/ui/spiral-3d-slider";
import { WebGLLiquid } from "@/components/ui/webgl-liquid";
import { WheelCarousel } from "@/components/ui/wheel-carousel";
import { capabilities } from "@/content/profile";
import { projects } from "@/content/projects";
import { coverSrc, getCoverItems } from "@/lib/covers";

const covers = getCoverItems();
const RED = "#ff3d2e";
const DEEP = "#7a1810";
const INK = "#0a0a0a";
const PAPER = "#f5f5f5";

const eyebrow =
  "font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[var(--tracking-eyebrow)] text-[var(--paper-400)]";

type CellProps = {
  children: ReactNode;
  height?: string;
  index: number;
  note: string;
  title: string;
  total: number;
};

/** One experiment: a labelled, bordered stage that only runs while on screen. */
function Cell({
  children,
  height = "h-[70svh] min-h-[26rem]",
  index,
  note,
  title,
  total,
}: CellProps) {
  return (
    <section
      aria-label={title}
      className="relative border-t border-[var(--rule-hairline)] pb-[var(--space-16)]"
      id={title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}
    >
      <SectionRegister index={index} label={title} total={total} />
      <div className="mx-auto max-w-[var(--container-wide)] px-[var(--grid-margin)] pt-[var(--space-8)]">
        <p className={`${eyebrow} max-w-[60ch]`}>{note}</p>
        <InViewMount
          className={`mt-[var(--space-6)] w-full overflow-hidden border border-[var(--rule-default)] bg-[var(--ink-900)] ${height}`}
          fallback={<div aria-hidden className="h-full w-full" />}
        >
          {children}
        </InViewMount>
      </div>
    </section>
  );
}

const TOTAL = 14;

/**
 * /lab — the interactive experiments that did not belong on a case study.
 * Each stage mounts only while it is near the viewport, so the page never holds
 * more than a couple of WebGL contexts at once.
 */
export function LabExperiments() {
  const images = covers.map((cover) => cover.src);

  return (
    <>
      <GradientHero01 />

      <Cell
        index={1}
        note="Drag or scroll. The lens warps the tiles under the cursor."
        title="Fisheye grid"
        total={TOTAL}
      >
        <FisheyeInfiniteGrid
          className="h-full w-full"
          items={covers.map((cover) => ({
            alt: cover.alt,
            image: cover.src,
            meta: "Project",
            title: cover.title,
          }))}
          theme="dark"
        />
      </Cell>

      <Cell
        index={2}
        note="Scroll or drag to turn a spiral of cover art in 3D."
        title="Spiral slider"
        total={TOTAL}
      >
        <Spiral3DSlider
          className="h-full w-full"
          items={covers.map((cover) => ({ alt: cover.alt, src: cover.src }))}
        />
      </Cell>

      <Cell
        index={3}
        note="A looping strip that bends towards the pointer."
        title="Collection surfer"
        total={TOTAL}
      >
        <CollectionSurfer
          items={covers.map((cover, index) => ({
            id: index + 1,
            image: cover.src,
            title: cover.title,
          }))}
          heading="Surf the work"
          variant="magnetic"
        />
      </Cell>

      <Cell
        index={4}
        note="Wheel through the projects; the photo follows the selection."
        title="Wheel carousel"
        total={TOTAL}
      >
        <WheelCarousel
          background={INK}
          items={covers.map((cover) => ({
            image: cover.src,
            imageAlt: cover.alt,
            label: cover.title,
          }))}
          markerColor={RED}
          mode="custom"
          selectedColor={PAPER}
          textColor="rgba(245,245,245,0.35)"
        />
      </Cell>

      <Cell
        height="h-[34rem]"
        index={5}
        note="Hover to fan out the stack. Arrow keys move between cards."
        title="Orbit card stack"
        total={TOTAL}
      >
        <OrbitCardStack
          items={projects.slice(0, 5).map((project) => ({
            description: project.summary,
            image: coverSrc(project.slug),
            name: project.title,
            role: project.context,
            stat: project.type,
          }))}
        />
      </Cell>

      <Cell
        index={6}
        note="Letters scatter from the cursor and settle back."
        title="Particle type"
        total={TOTAL}
      >
        <div className="grid h-full w-full place-items-center text-[var(--paper-100)]">
          <CursorDrivenParticleTypography
            className="h-full w-full"
            color={PAPER}
            fontSize={150}
            text="SIDDHARTHA"
          />
        </div>
      </Cell>

      <Cell
        index={7}
        note="Cover art re-drawn as a field of dithered dots."
        title="Dithered mark"
        total={TOTAL}
      >
        <div className="grid h-full w-full place-items-center">
          <DitheredLogo
            className="h-full w-full"
            imageSrc={coverSrc("siddhartha")}
            particleColor={PAPER}
          />
        </div>
      </Cell>

      <Cell
        index={8}
        note="Pixels light up and fade behind the cursor."
        title="Pixel canvas"
        total={TOTAL}
      >
        <PixelCanvas
          className="absolute inset-0"
          colors={[DEEP, RED, PAPER]}
          variant="trail"
        />
      </Cell>

      <Cell
        index={9}
        note="Move over it to uncover the image one square at a time."
        title="Pixel image trail"
        total={TOTAL}
      >
        <PixelImageTrail
          alt="Helios cover artwork"
          className="h-full w-full"
          src={coverSrc("helios")}
        />
      </Cell>

      <Cell
        index={10}
        note="Click anywhere to send a ripple through the next image."
        title="Ripple transition"
        total={TOTAL}
      >
        <RippleTransition background={INK} className="h-full w-full" images={images} />
      </Cell>

      <Cell
        index={11}
        note="A slow silk-and-aurora field in the accent red."
        title="Silk aurora"
        total={TOTAL}
      >
        <SilkAurora
          accentColor={RED}
          baseColor={INK}
          className="h-full w-full"
          description=""
          midColor={DEEP}
          sheenColor={PAPER}
          subtitle=""
          title=""
        />
      </Cell>

      <Cell
        index={12}
        note="Dithered prisms with floating particles, re-tinted."
        title="Dither prism"
        total={TOTAL}
      >
        <DitherPrismHero
          className="h-full w-full"
          color1={INK}
          color2={DEEP}
          color3={RED}
          title1="Prism"
          title2="study"
        />
      </Cell>

      <Cell
        index={13}
        note="Floating geometry in three.js."
        title="Geometric hero"
        total={TOTAL}
      >
        <HeroGeometric
          className="h-full w-full"
          color1={RED}
          color2={PAPER}
          description="Shapes drifting in depth."
          title1="Geometric"
          title2="drift"
        />
      </Cell>

      <Cell
        index={14}
        note="A liquid field that reveals itself on load."
        title="Liquid field"
        total={TOTAL}
      >
        <WebGLLiquid
          className="h-full w-full"
          colorDeep={INK}
          colorHighlight={RED}
          colorMid={DEEP}
          description=""
          subtitle=""
          title=""
        />
      </Cell>

      <section
        aria-label="Scroll choreography"
        className="relative border-t border-[var(--rule-hairline)]"
      >
        <SectionRegister index={15} label="Scroll choreography" total={TOTAL + 2} />
        <p
          className={`${eyebrow} mx-auto max-w-[var(--container-wide)] px-[var(--grid-margin)] pt-[var(--space-8)]`}
        >
          Four covers swap places, stack, then one fills the screen.
        </p>
        <ScrollChoreography
          images={{
            bottomLeft: covers[0].src,
            bottomRight: covers[1].src,
            topLeft: covers[2].src,
            topRight: covers[3].src,
          }}
        />
      </section>

      <section
        aria-label="Scroll split card"
        className="relative border-t border-[var(--rule-hairline)]"
      >
        <SectionRegister index={16} label="Scroll split card" total={TOTAL + 2} />
        <p
          className={`${eyebrow} mx-auto max-w-[var(--container-wide)] px-[var(--grid-margin)] pt-[var(--space-8)]`}
        >
          One image splits into three cards that flip to reveal what I do.
        </p>
        <ScrollSplitCard
          cards={capabilities.map((cap, index) => ({
            bgColor: index === 1 ? RED : "#1a1a1a",
            description: cap.summary,
            textColor: index === 1 ? INK : PAPER,
            title: cap.title,
          }))}
          imageSrc={coverSrc("orbit")}
        />
      </section>
    </>
  );
}
