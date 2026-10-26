import { InViewMount } from "@/components/primitives/in-view-mount";
import { SectionRegister } from "@/components/primitives/section-register";
import { ImageTrail } from "@/components/ui/image-trail";
import { LetterCascade } from "@/components/ui/letter-cascade";
import { LiquidChrome } from "@/components/ui/liquid-chrome";
import { LiquidGlassCarousel } from "@/components/ui/liquid-glass-carousel";
import { ScrollTiltedGrid } from "@/components/ui/scroll-tilted-grid";
import { WorkIndex } from "@/components/work/work-stage";
import { getCoverItems } from "@/lib/covers";
import { projects } from "@/content/projects";

/**
 * /work — a liquid-chrome masthead, the projects as a glass carousel, the
 * linked index (with a cursor image trail), then the covers on a tilted grid
 * that straightens as you scroll through it.
 */
export function WorkExplorer() {
  const covers = getCoverItems();

  return (
    <>
      <section
        aria-labelledby="work-title"
        className="relative isolate overflow-hidden border-b border-[var(--rule-hairline)]"
      >
        <InViewMount
          className="absolute inset-0 -z-10 opacity-40"
          fallback={<div aria-hidden className="h-full w-full bg-[var(--ink-900)]" />}
          staticOk
        >
          <LiquidChrome
            amplitude={0.5}
            baseColor={[0.55, 0.1, 0.07]}
            interactive
            speed={0.45}
          />
        </InViewMount>
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-gradient-to-b from-[rgba(10,10,10,0.2)] via-[rgba(10,10,10,0.55)] to-[var(--ink-950)]"
        />

        <SectionRegister index={1} label="WORK" total={4} />
        <div className="mx-auto max-w-[var(--container-wide)] px-[var(--grid-margin)] pt-[calc(var(--space-section)*0.7)] pb-[var(--space-24)]">
          <h1
            className="font-[family-name:var(--font-display)] text-[clamp(4rem,13vw,12rem)] leading-[0.9] font-normal tracking-[var(--tracking-display)] text-[var(--paper-100)]"
            id="work-title"
          >
            <LetterCascade className="justify-start" text="Selected" />
            <br />
            <span className="text-[var(--paper-400)]">
              <LetterCascade className="justify-start" text="work" />
            </span>
          </h1>
          <p className="mt-[var(--space-8)] max-w-[48ch] font-[family-name:var(--font-sans)] text-[17px] leading-[1.55] text-[var(--paper-200)]">
            {projects.length} projects. Each one earns its place by turning a real
            question into a working artefact you can click on.
          </p>
        </div>
      </section>

      <section
        aria-label="Project carousel"
        className="relative border-b border-[var(--rule-hairline)]"
      >
        <SectionRegister index={2} label="GALLERY" total={4} />
        <InViewMount
          className="mt-[var(--space-8)] h-[78svh] min-h-[30rem] w-full"
          fallback={<div aria-hidden className="h-full w-full bg-[var(--ink-900)]" />}
        >
          <LiquidGlassCarousel
            background="#0a0a0a"
            className="h-full w-full"
            items={covers.map((cover) => ({
              src: cover.src,
              title: cover.title,
              aspect: 1.6,
            }))}
            panelHeight={420}
          />
        </InViewMount>
      </section>

      <section
        aria-labelledby="work-index-heading"
        className="relative border-b border-[var(--rule-hairline)]"
      >
        <SectionRegister index={3} label="INDEX" total={4} />
        <div className="mx-auto max-w-[var(--container-wide)] px-[var(--grid-margin)] pt-[calc(var(--space-section)*0.5)] pb-[var(--space-section)]">
          <h2 className="sr-only" id="work-index-heading">
            All projects
          </h2>
          <div className="relative">
            <WorkIndex projects={projects} />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 overflow-hidden"
            >
              <ImageTrail
                duration={1.4}
                imageHeight={150}
                imageWidth={240}
                images={covers.map((cover) => cover.src)}
                threshold={70}
              />
            </div>
          </div>
        </div>
      </section>

      <section aria-label="Cover art" className="relative">
        <SectionRegister index={4} label="COVERS" total={4} />
        <div className="mx-auto max-w-[var(--container-wide)] px-[var(--grid-margin)]">
          <ScrollTiltedGrid
            aspectRatio="8 / 5"
            images={covers.map((cover) => ({ alt: cover.alt, src: cover.src }))}
            maxBlur={5}
            maxTilt={48}
            smoothScroll={false}
          />
        </div>
      </section>
    </>
  );
}
