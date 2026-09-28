"use client";

import { useMotionValue, useSpring } from "framer-motion";
import { useRef } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";

import { useReducedMotionPreference } from "@/hooks/use-reduced-motion";

const defaultMaxTilt = 8;
const defaultScale = 1.025;
const springConfig = { damping: 20, stiffness: 220 };

type UseTiltOptions = {
  maxTilt?: number;
  scale?: number;
};

/**
 * Pointer-tracked 3D tilt for the work cards: rotateX/rotateY driven by the
 * cursor's offset from the card's own center, plus a small lift scale.
 * Pointer-only and reduced-motion-gated, mirroring useMagnetic.
 */
export function useTilt<T extends HTMLElement>({
  maxTilt = defaultMaxTilt,
  scale = defaultScale,
}: UseTiltOptions = {}) {
  const prefersReducedMotion = useReducedMotionPreference();
  const ref = useRef<T>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const scaleValue = useMotionValue(1);
  const springRotateX = useSpring(rotateX, springConfig);
  const springRotateY = useSpring(rotateY, springConfig);
  const springScale = useSpring(scaleValue, springConfig);

  function onPointerMove(event: ReactPointerEvent<T>) {
    if (prefersReducedMotion || event.pointerType !== "mouse" || !ref.current) {
      return;
    }

    const bounds = ref.current.getBoundingClientRect();
    const px = (event.clientX - bounds.left) / bounds.width - 0.5;
    const py = (event.clientY - bounds.top) / bounds.height - 0.5;

    rotateY.set(px * maxTilt * 2);
    rotateX.set(py * maxTilt * -2);
    scaleValue.set(scale);
  }

  function onPointerLeave() {
    rotateX.set(0);
    rotateY.set(0);
    scaleValue.set(1);
  }

  return {
    onPointerLeave,
    onPointerMove,
    ref,
    style: {
      rotateX: springRotateX,
      rotateY: springRotateY,
      scale: springScale,
      transformPerspective: 800,
    },
  };
}
