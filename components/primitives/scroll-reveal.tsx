"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useMemo, useRef } from "react";

import { useReducedMotionPreference } from "@/hooks/use-reduced-motion";

import "./scroll-reveal.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export type ScrollRevealProps = {
  as?: "h2" | "p";
  baseOpacity?: number;
  baseRotation?: number;
  blurStrength?: number;
  children: string;
  className?: string;
  enableBlur?: boolean;
  id?: string;
  rotationEnd?: string;
  wordAnimationEnd?: string;
};

/**
 * React Bits' ScrollReveal, ported with three changes:
 *
 * 1. Cleanup fix. The original kills every ScrollTrigger on the page
 *    (`ScrollTrigger.getAll().forEach(t => t.kill())`) when ANY instance
 *    unmounts. With more than one on a page — here there are four, one per
 *    paragraph plus the headline — unmounting one would kill the others'
 *    scrub mid-scroll, and it would just as happily kill the hero's own
 *    pinned ScrollTrigger. Each instance now tracks and kills only the
 *    tweens it created.
 * 2. `prefers-reduced-motion` renders the words fully revealed and static
 *    instead of ignoring the preference, matching how the rest of this
 *    site handles motion.
 * 3. `as` replaces the hardcoded `<h2><p>…</p></h2>` wrapper. The original
 *    always nests a paragraph inside a heading, which is invalid HTML (and
 *    a second <h2> besides) on every call site that isn't an actual
 *    heading — this component reveals plain body copy too.
 *
 * Blur is opt-in per call site rather than left at the library default: a
 * `filter: blur()` transition repaints per word per scroll frame, which is
 * fine for a six-word headline and genuinely costly across a 70-word
 * paragraph. Long-form copy here runs opacity + rotation only.
 */
export function ScrollReveal({
  as = "p",
  baseOpacity = 0.1,
  baseRotation = 3,
  blurStrength = 4,
  children,
  className,
  enableBlur = true,
  id,
  rotationEnd = "bottom bottom",
  wordAnimationEnd = "bottom bottom",
}: ScrollRevealProps) {
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const paragraphRef = useRef<HTMLParagraphElement | null>(null);
  const prefersReducedMotion = useReducedMotionPreference();

  const words = useMemo(
    () =>
      children.split(/(\s+)/).map((word, index) => {
        if (/^\s+$/.test(word)) return word;
        return (
          <span className="scroll-reveal-word" key={index}>
            {word}
          </span>
        );
      }),
    [children],
  );

  useEffect(() => {
    if (prefersReducedMotion) return;

    const el = as === "h2" ? headingRef.current : paragraphRef.current;
    if (!el) return;

    const wordElements = el.querySelectorAll<HTMLElement>(".scroll-reveal-word");
    const tweens: gsap.core.Tween[] = [];

    tweens.push(
      gsap.fromTo(
        el,
        { rotate: baseRotation, transformOrigin: "0% 50%" },
        {
          ease: "none",
          rotate: 0,
          scrollTrigger: { end: rotationEnd, scrub: true, start: "top bottom", trigger: el },
        },
      ),
    );

    tweens.push(
      gsap.fromTo(
        wordElements,
        { opacity: baseOpacity },
        {
          ease: "none",
          opacity: 1,
          scrollTrigger: { end: wordAnimationEnd, scrub: true, start: "top bottom-=20%", trigger: el },
          stagger: 0.05,
        },
      ),
    );

    if (enableBlur) {
      tweens.push(
        gsap.fromTo(
          wordElements,
          { filter: `blur(${blurStrength}px)` },
          {
            ease: "none",
            filter: "blur(0px)",
            scrollTrigger: { end: wordAnimationEnd, scrub: true, start: "top bottom-=20%", trigger: el },
            stagger: 0.05,
          },
        ),
      );
    }

    return () => {
      tweens.forEach((tween) => {
        tween.scrollTrigger?.kill();
        tween.kill();
      });
    };
  }, [as, baseOpacity, baseRotation, blurStrength, enableBlur, prefersReducedMotion, rotationEnd, wordAnimationEnd]);

  if (prefersReducedMotion) {
    return as === "h2" ? (
      <h2 className={className} id={id}>
        {children}
      </h2>
    ) : (
      <p className={className} id={id}>
        {children}
      </p>
    );
  }

  return as === "h2" ? (
    <h2 className={className} id={id} ref={headingRef}>
      {words}
    </h2>
  ) : (
    <p className={className} id={id} ref={paragraphRef}>
      {words}
    </p>
  );
}
