"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import type { RefObject } from "react";

import { CosmosField } from "@/components/hero/cosmos-field";
import { useReducedMotionPreference } from "@/hooks/use-reduced-motion";
import { cameraDolly, dollyToVector3, type DollyState } from "@/lib/spatial-tokens";

function lerpDolly(start: DollyState, end: DollyState, progress: number): DollyState {
  return {
    azimuth: start.azimuth + (end.azimuth - start.azimuth) * progress,
    elevation: start.elevation + (end.elevation - start.elevation) * progress,
    radius: start.radius + (end.radius - start.radius) * progress,
  };
}

type CameraRigProps = {
  scrollProgressRef: RefObject<number>;
};

/**
 * Reads scroll progress written by the hero's GSAP ScrollTrigger and moves
 * the camera along a fixed spherical dolly/orbit path — 1:1 with scroll,
 * never autoplaying. A light per-frame damping keeps the motion cinematic
 * without decoupling it from the scrub.
 */
function CameraRig({ scrollProgressRef }: CameraRigProps) {
  const { camera } = useThree();
  const prefersReducedMotion = useReducedMotionPreference();
  const current = useRef<DollyState>({ ...cameraDolly.start });

  useFrame((_, delta) => {
    const target = prefersReducedMotion
      ? cameraDolly.start
      : lerpDolly(cameraDolly.start, cameraDolly.end, scrollProgressRef.current);

    const smoothing = prefersReducedMotion
      ? 1
      : 1 - Math.pow(1 - cameraDolly.damping, delta * 60);

    current.current = {
      azimuth: current.current.azimuth + (target.azimuth - current.current.azimuth) * smoothing,
      elevation:
        current.current.elevation + (target.elevation - current.current.elevation) * smoothing,
      radius: current.current.radius + (target.radius - current.current.radius) * smoothing,
    };

    const [x, y, z] = dollyToVector3(current.current);
    camera.position.set(x, y, z);
    camera.lookAt(0, 0, 0);
  });

  return null;
}

type HeroWebglProps = {
  scrollProgressRef: RefObject<number>;
};

/**
 * `frameloop="demand"` under reduced motion means the scene renders exactly
 * once (its frozen first frame) and then does zero further GPU work — no
 * ongoing render loop to pause, not just motion values that stop changing.
 */
export function HeroWebgl({ scrollProgressRef }: HeroWebglProps) {
  const prefersReducedMotion = useReducedMotionPreference();
  const initialPosition = dollyToVector3(cameraDolly.start);

  return (
    <Canvas
      camera={{ fov: cameraDolly.fov, position: [...initialPosition] }}
      dpr={[1, 1.5]}
      fallback={<div aria-hidden className="h-full w-full" />}
      frameloop={prefersReducedMotion ? "demand" : "always"}
      gl={{ alpha: true, antialias: false, powerPreference: "low-power" }}
    >
      <CameraRig scrollProgressRef={scrollProgressRef} />
      <CosmosField />
    </Canvas>
  );
}
