"use client";

import { useEffect, useState } from "react";

export type ViewportTier = "desktop" | "mobile" | "tablet";

const tabletQuery = "(min-width: 768px)";
const desktopQuery = "(min-width: 1280px)";

/**
 * Coarse viewport tier for scaling DOM-cost-bearing props (e.g. DepthText's
 * layer count) responsively — matches the site's existing md/xl breakpoints.
 * Defaults to "desktop" for SSR/first paint and corrects after mount, same
 * pattern as useReducedMotionPreference.
 */
export function useViewportTier(): ViewportTier {
  const [tier, setTier] = useState<ViewportTier>("desktop");

  useEffect(() => {
    const tabletMedia = window.matchMedia(tabletQuery);
    const desktopMedia = window.matchMedia(desktopQuery);

    const updateTier = () => {
      if (desktopMedia.matches) {
        setTier("desktop");
      } else if (tabletMedia.matches) {
        setTier("tablet");
      } else {
        setTier("mobile");
      }
    };

    updateTier();
    tabletMedia.addEventListener("change", updateTier);
    desktopMedia.addEventListener("change", updateTier);
    window.addEventListener("resize", updateTier);

    return () => {
      tabletMedia.removeEventListener("change", updateTier);
      desktopMedia.removeEventListener("change", updateTier);
      window.removeEventListener("resize", updateTier);
    };
  }, []);

  return tier;
}
