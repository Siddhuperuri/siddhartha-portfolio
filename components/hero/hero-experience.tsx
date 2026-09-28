"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";

import { LiveClock } from "@/components/hero/live-clock";
import { useReducedMotionPreference } from "@/hooks/use-reduced-motion";
import { getFeaturedProjects } from "@/lib/projects";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const HeroMonitor = dynamic(
  () => import("@/components/hero/hero-monitor").then((module) => module.HeroMonitor),
  { loading: () => null, ssr: false },
);

// Extra scroll runway (vh) the hero holds itself pinned for while the
// monitor's screen cycles one channel per project. Skipped entirely under
// prefers-reduced-motion (see the conditional height below).
const heroScrollVh = 260;

// PLACEHOLDER — swap for Siddhartha's own statement once supplied.
// Deliberately not a copy of the reference's "Sites that move".
const headlineLineOne = "Ideas made";
const headlineLineTwo = "tangible";

const positioningStatement =
  "Peruri Jai Sai Siddhartha — a product-minded visual designer and creative front-end builder shipping interfaces, identities, and interactive prototypes with the pace of a small studio.";

export function HeroExperience() {
  const prefersReducedMotion = useReducedMotionPreference();
  const pinRef = useRef<HTMLDivElement>(null);
  const scrollProgress = useRef(0);
  const channels = getFeaturedProjects().map((project) => ({
    context: project.context,
    title: project.title,
    type: project.type,
  }));

  useEffect(() => {
    if (prefersReducedMotion || !pinRef.current) {
      scrollProgress.current = 0;
      return;
    }

    const trigger = ScrollTrigger.create({
      end: "bottom bottom",
      onUpdate: (self) => {
        scrollProgress.current = self.progress;
      },
      scrub: true,
      start: "top top",
      trigger: pinRef.current,
    });

    return () => {
      trigger.kill();
      scrollProgress.current = 0;
    };
  }, [prefersReducedMotion]);

  return (
    <section aria-labelledby="hero-title" className="relative isolate bg-[var(--ink-950)]" id="top">
      <div
        className="relative"
        ref={pinRef}
        style={prefersReducedMotion ? undefined : { height: `${heroScrollVh}vh` }}
      >
        <div className="sticky top-0 flex h-[100svh] flex-col overflow-hidden">
          {/*
            Lit-room ground. The reference grounds its object in an implied
            studio rather than floating it on flat black; this pool of light
            sits behind/below the monitor and falls back to --ink-950 before
            the bottom edge, so there's no hard seam into the next section.
          */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10"
            style={{
              // Lit wall behind the object, falling back to dark at the floor.
              // The bright band deliberately peaks around 55-64% (behind the
              // panel) rather than at the bottom, so the corner metadata is
              // never stranded on light grey.
              background:
                "linear-gradient(to bottom, #0b0b0b 0%, #191919 20%, #454545 38%, #8a8a8a 54%, #a8a8a8 64%, #6b6b6b 78%, #262626 90%, #111111 100%)",
            }}
          />

          <h1 className="sr-only" id="hero-title">
            {headlineLineOne} {headlineLineTwo}
          </h1>

          {/* Full-bleed stage. Sits above line two (z-10) but below line one
              and the metadata (z-20), so the object crops the type exactly the
              way it would if both lived in the same space. */}
          {/* Full-height stage: vertical placement of the object is solved by
              the camera, not by cropping the canvas. Mobile keeps a shorter box
              so the frame's aspect stays sane.

              Sits ABOVE both headline lines (z-10 vs z-0): the object is a
              physical thing in front of the type, so as the dolly pushes in it
              occludes the words rather than being cut out around them. */}
          <div className="pointer-events-none absolute inset-x-0 bottom-[14%] top-[36%] z-10 md:inset-0">
            <HeroMonitor
              channels={channels}
              reduced={prefersReducedMotion}
              scrollProgressRef={scrollProgress}
            />
          </div>

          {/* Scrim: guarantees the corner metadata keeps contrast no matter
              how bright the screen behind it gets during the dolly. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 z-[15] h-[20%]"
            style={{
              background:
                "linear-gradient(to bottom, rgba(10,10,10,0) 0%, rgba(10,10,10,0.35) 45%, rgba(10,10,10,0.75) 100%)",
            }}
          />

          {/* Small screens centre the composition (there is no room for a
              top-weighted layout); from md up it sits high, as designed. */}
          <div className="relative flex flex-1 flex-col justify-center pt-[calc(var(--space-16)+var(--space-4))] md:justify-start md:pt-[calc(var(--space-16)+var(--space-8))]">
            {/* Full-bleed, not container-bound: the headline is meant to run
                to the edges of the frame, so it deliberately escapes the
                --container-wide measure the rest of the page sits inside. */}
            <div className="w-full px-[clamp(0.75rem,2.5vw,3rem)]">
              {/* Line one — sits in front, full width */}
              <div
                aria-hidden
                className="relative z-0 select-none text-center font-[family-name:var(--font-condensed)] text-[clamp(3rem,17vw,13rem)] uppercase leading-[0.82] tracking-[-0.025em] text-transparent md:text-[clamp(4rem,18vw,22rem)]"
                style={{
                  backgroundClip: "text",
                  backgroundImage:
                    "linear-gradient(to bottom, #ffffff 0%, #d8d8d8 48%, #6f6f6f 100%)",
                  WebkitBackgroundClip: "text",
                }}
              >
                {headlineLineOne}
              </div>

              {/* Line two + monitor share a stacking context so the object
                  genuinely occludes the type, the way the reference does. */}
              <div className="relative mt-[-0.04em]">
                <div
                  aria-hidden
                  className="relative z-0 select-none text-center font-[family-name:var(--font-condensed)] text-[clamp(3.5rem,19vw,14rem)] uppercase italic leading-[0.82] tracking-[-0.025em] text-transparent md:text-[clamp(4.5rem,20vw,24rem)]"
                  style={{
                    backgroundClip: "text",
                    backgroundImage:
                      "linear-gradient(to bottom, #c9c9c9 0%, #8d8d8d 45%, #4a4a4a 100%)",
                    WebkitBackgroundClip: "text",
                  }}
                >
                  {headlineLineTwo}
                </div>

                {/* Anchored to the lower half of line two: the object crops
                    the type's baseline the way the reference does, instead of
                    covering the word outright. */}
                {/* Intentionally empty — the monitor is rendered full-bleed
                    outside this container (see below) so the desk can run to
                    the viewport edges instead of being clipped to a box. */}
              </div>
            </div>
          </div>

          {/* Stacks on mobile so neither block gets squeezed into a column
              of two-word lines; splits to the corners from md up. */}
          <div className="relative z-20 mx-auto flex w-full max-w-[var(--container-wide)] flex-col gap-[var(--space-5)] px-[var(--grid-margin)] pb-[var(--space-6)] md:flex-row md:items-end md:justify-between md:gap-8 md:pb-[var(--space-8)]">
            <LiveClock />
            <p className="max-w-[30rem] font-[family-name:var(--font-sans)] text-[14px] leading-[1.55] text-[var(--paper-200)] md:text-right md:text-[15px]">
              {positioningStatement}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
