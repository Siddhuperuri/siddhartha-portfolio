"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { useEffect } from "react";

import { useReducedMotionPreference } from "@/hooks/use-reduced-motion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Smooth-scroll backbone for the spatial hero's scroll-driven camera.
 * Skipped entirely under prefers-reduced-motion so scrolling stays native
 * and the hero's ScrollTrigger falls back to its static vantage.
 */
export function LenisProvider() {
  const prefersReducedMotion = useReducedMotionPreference();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const lenis = new Lenis({
      anchors: true,
      autoRaf: false,
      duration: 1.35,
      easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.95,
    });

    lenis.on("scroll", ScrollTrigger.update);

    function raf(time: number) {
      lenis.raf(time * 1000);
    }

    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, [prefersReducedMotion]);

  return null;
}
