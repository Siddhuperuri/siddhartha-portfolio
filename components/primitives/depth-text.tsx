"use client";

import { useEffect, useMemo, useRef } from "react";
import type { CSSProperties } from "react";

import "@/components/primitives/depth-text.css";

const MAX_LAYERS = 64;

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

const getLayerColor = (faceColor: string, depthColor: string, index: number, total: number) => {
  const progress = total <= 1 ? 1 : index / total;
  const eased = progress * progress;
  const faceMix = Math.round((1 - eased) * 72 + 4);

  return `color-mix(in srgb, ${faceColor} ${faceMix}%, ${depthColor})`;
};

const getTransform = (rotateX: number, rotateY: number) =>
  `rotateX(${rotateX.toFixed(3)}deg) rotateY(${rotateY.toFixed(3)}deg)`;

export type DepthTextProps = {
  autoOrbit?: boolean;
  className?: string;
  depth?: number;
  depthColor?: string;
  faceColor?: string;
  fontSize?: string;
  fontWeight?: number | string;
  layers?: number;
  orbitSpeed?: number;
  perspective?: number;
  pointerTracking?: boolean;
  shadow?: boolean;
  smoothing?: number;
  style?: CSSProperties;
  text?: string;
  tilt?: number;
};

/**
 * React Bits' DepthText, ported as-is: a word rendered as a stack of
 * translateZ layers that tilt toward the pointer (or a slow fallback orbit)
 * inside a perspective container. Kept faithful to the supplied
 * implementation, with one perf-motivated addition: when a caller sets
 * both pointerTracking and autoOrbit to false, the instance has nothing to
 * animate frame-to-frame, so the rAF loop and pointermove listener are
 * skipped entirely and the base tilt is applied once — the same treatment
 * the supplied source already gives prefers-reduced-motion.
 */
export function DepthText({
  autoOrbit = true,
  className = "",
  depth = 2.4,
  depthColor = "#7c3aed",
  faceColor = "#f8fafc",
  fontSize = "clamp(3rem, 12vw, 7rem)",
  fontWeight = 900,
  layers = 34,
  orbitSpeed = 0.35,
  perspective = 900,
  pointerTracking = true,
  shadow = true,
  smoothing = 0.14,
  style = {},
  text = "Elevate",
  tilt = 7.5,
}: DepthTextProps) {
  const rootRef = useRef<HTMLSpanElement>(null);
  const stageRef = useRef<HTMLSpanElement>(null);

  const safeLayers = clamp(Math.round(Number(layers) || 1), 2, MAX_LAYERS);
  const safeDepth = clamp(Number(depth) || 0, 0, 12);
  const safeTilt = clamp(Number(tilt) || 0, 0, 12);
  const safeSmoothing = clamp(Number(smoothing) || 0.14, 0.02, 0.35);
  const safePerspective = clamp(Number(perspective) || 900, 300, 2000);
  const safeOrbitSpeed = clamp(Number(orbitSpeed) || 0, 0, 2);

  const baseRotation = useMemo(() => ({ x: -safeTilt * 0.32, y: safeTilt * 0.42 }), [safeTilt]);

  const depthLayers = useMemo(
    () =>
      Array.from({ length: safeLayers }, (_, layerIndex) => {
        const index = safeLayers - layerIndex;

        return {
          color: getLayerColor(faceColor, depthColor, index, safeLayers),
          index,
          transform: `translateZ(${-index * safeDepth}px)`,
        };
      }),
    [safeLayers, safeDepth, faceColor, depthColor],
  );

  useEffect(() => {
    const root = rootRef.current;
    const stage = stageRef.current;

    if (!root || !stage || typeof window === "undefined") {
      return undefined;
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const canTrackPointer = pointerTracking && finePointer && !reducedMotion;

    if (reducedMotion) {
      stage.style.transform = getTransform(baseRotation.x, baseRotation.y);

      return undefined;
    }

    if (!canTrackPointer && !autoOrbit) {
      stage.style.transform = getTransform(baseRotation.x, baseRotation.y);

      return undefined;
    }

    let frameId = 0;
    let activePointer = false;
    let startTime = performance.now();
    const current = { ...baseRotation };
    const target = { ...baseRotation };

    const applyTransform = () => {
      stage.style.transform = getTransform(current.x, current.y);
    };

    const handlePointerMove = (event: PointerEvent) => {
      const rect = root.getBoundingClientRect();

      if (!rect.width || !rect.height) {
        return;
      }

      activePointer = true;
      const x = clamp((event.clientX - (rect.left + rect.width / 2)) / (rect.width * 0.8), -1, 1);
      const y = clamp((event.clientY - (rect.top + rect.height / 2)) / (rect.height * 0.8), -1, 1);

      target.x = baseRotation.x - y * safeTilt;
      target.y = baseRotation.y + x * safeTilt;
    };

    const handlePointerLeave = () => {
      activePointer = false;
      target.x = baseRotation.x;
      target.y = baseRotation.y;
    };

    if (canTrackPointer) {
      window.addEventListener("pointermove", handlePointerMove);
      window.addEventListener("pointerleave", handlePointerLeave);
      window.addEventListener("blur", handlePointerLeave);
    }

    const tick = (now: number) => {
      if ((!canTrackPointer || !activePointer) && autoOrbit) {
        const elapsed = (now - startTime) / 1000;
        const orbit = elapsed * safeOrbitSpeed * Math.PI * 2;
        const fallbackAmount = canTrackPointer ? 0.18 : 0.55;

        target.x = baseRotation.x + Math.sin(orbit) * safeTilt * fallbackAmount;
        target.y = baseRotation.y + Math.cos(orbit * 0.85) * safeTilt * fallbackAmount;
      }

      current.x += (target.x - current.x) * safeSmoothing;
      current.y += (target.y - current.y) * safeSmoothing;
      applyTransform();
      frameId = requestAnimationFrame(tick);
    };

    applyTransform();
    frameId = requestAnimationFrame(tick);

    return () => {
      if (canTrackPointer) {
        window.removeEventListener("pointermove", handlePointerMove);
        window.removeEventListener("pointerleave", handlePointerLeave);
        window.removeEventListener("blur", handlePointerLeave);
      }

      cancelAnimationFrame(frameId);
      startTime = 0;
    };
  }, [autoOrbit, baseRotation, pointerTracking, safeOrbitSpeed, safeSmoothing, safeTilt]);

  const rootStyle = {
    ...style,
    "--depth-text-depth-color": depthColor,
    "--depth-text-face-color": faceColor,
    "--depth-text-font-size": fontSize,
    "--depth-text-font-weight": fontWeight,
    "--depth-text-perspective": `${safePerspective}px`,
    "--depth-text-shadow": shadow
      ? `0 22px 34px color-mix(in srgb, ${depthColor} 36%, transparent), 0 4px 8px rgba(0, 0, 0, 0.28)`
      : "none",
  } as CSSProperties;

  return (
    <span className={`depth-text ${className}`.trim()} ref={rootRef} style={rootStyle}>
      <span className="depth-text__stage" ref={stageRef}>
        {depthLayers.map((layer) => (
          <span
            aria-hidden="true"
            className="depth-text__layer"
            key={layer.index}
            style={{ color: layer.color, transform: layer.transform }}
          >
            {text}
          </span>
        ))}
        <span className="depth-text__face">{text}</span>
      </span>
    </span>
  );
}
