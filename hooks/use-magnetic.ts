"use client";

import { useMotionValue, useSpring } from "framer-motion";
import { useRef } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";

import { useReducedMotionPreference } from "@/hooks/use-reduced-motion";

const defaultStrength = 0.25;
const defaultMaxDisplacement = 10;
/** Hard ceiling so no caller can push the nudge past a subtle displacement. */
const maxDisplacementCeiling = 11;

type UseMagneticOptions = {
  maxDisplacement?: number;
  strength?: number;
};

/**
 * Shared magnetic-hover behaviour: a pointer-only, reduced-motion-gated
 * nudge toward the cursor, always capped under 12px. Handlers read the
 * bound element's own rect via `ref`, so they work whether that ref is
 * attached to the same element the handlers are bound to, or the handlers
 * are bound to an ancestor (e.g. a card whose stretched link needs to keep
 * receiving pointer events while a smaller icon inside it does the moving).
 */
export function useMagnetic<T extends HTMLElement>({
  maxDisplacement = defaultMaxDisplacement,
  strength = defaultStrength,
}: UseMagneticOptions = {}) {
  const prefersReducedMotion = useReducedMotionPreference();
  const ref = useRef<T>(null);
  const max = Math.min(maxDisplacement, maxDisplacementCeiling);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { damping: 18, stiffness: 260 });
  const springY = useSpring(y, { damping: 18, stiffness: 260 });

  function onPointerMove(event: ReactPointerEvent<T>) {
    if (prefersReducedMotion || event.pointerType !== "mouse" || !ref.current) {
      return;
    }

    const bounds = ref.current.getBoundingClientRect();
    const offsetX = event.clientX - (bounds.left + bounds.width / 2);
    const offsetY = event.clientY - (bounds.top + bounds.height / 2);

    x.set(Math.max(-max, Math.min(max, offsetX * strength)));
    y.set(Math.max(-max, Math.min(max, offsetY * strength)));
  }

  function onPointerLeave() {
    x.set(0);
    y.set(0);
  }

  return { onPointerLeave, onPointerMove, ref, style: { x: springX, y: springY } };
}
