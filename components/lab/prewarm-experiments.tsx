"use client";

import { useEffect } from "react";

import { prewarmExperiments } from "@/components/lab/experiment-stage";

/** Loads the code for the listed experiments in the background once the page is idle. */
export function PrewarmExperiments({ slugs }: { slugs: readonly string[] }) {
  useEffect(() => {
    let stop: (() => void) | undefined;
    const begin = () => {
      stop = prewarmExperiments(slugs);
    };
    if (document.readyState === "complete") begin();
    else window.addEventListener("load", begin, { once: true });
    return () => {
      window.removeEventListener("load", begin);
      stop?.();
    };
  }, [slugs]);

  return null;
}
