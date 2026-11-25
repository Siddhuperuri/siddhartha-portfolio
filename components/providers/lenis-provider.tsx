"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

import { useReducedMotionPreference } from "@/hooks/use-reduced-motion";
import { setScrollSource } from "@/lib/scroll-bus";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

let activeLenis: Lenis | null = null;

/** The running smooth-scroll instance, or null when scrolling is native. */
export function getLenis() {
  return activeLenis;
}

/**
 * Smooth-scroll backbone for the spatial hero's scroll-driven camera.
 * Skipped entirely under prefers-reduced-motion so scrolling stays native
 * and the hero's ScrollTrigger falls back to its static vantage.
 */
export function LenisProvider() {
  const prefersReducedMotion = useReducedMotionPreference();
  const pathname = usePathname();

  // A new page starts at the top. Lenis keeps its own idea of the scroll
  // position, so tell it directly instead of leaving it to catch up.
  useEffect(() => {
    const lenis = getLenis();
    if (!lenis) return;
    lenis.scrollTo(0, { immediate: true, force: true });
    lenis.resize();
  }, [pathname]);

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

    activeLenis = lenis;
    setScrollSource(() => lenis.scroll);
    lenis.on("scroll", ScrollTrigger.update);

    function raf(time: number) {
      lenis.raf(time * 1000);
    }

    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      activeLenis = null;
      setScrollSource(null);
      lenis.destroy();
    };
  }, [prefersReducedMotion]);

  return null;
}
