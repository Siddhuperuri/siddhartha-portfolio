"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

import { BadgeCardMesh, BadgeLighting, CLIP_HOLE_Y, useFaceTexture } from "@/components/chrome/badge-face";

function Badge() {
  const groupRef = useRef<THREE.Group>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const face = useFaceTexture();

  useFrame((state, delta) => {
    const group = groupRef.current;
    if (!group) return;

    const t = state.clock.elapsedTime;
    const targetZ = Math.sin(t * 0.55) * 0.055 + pointer.current.x * 0.05;
    const targetY = 0.35 + Math.sin(t * 0.38) * 0.28 + pointer.current.x * 0.25;
    const targetX = Math.sin(t * 0.47) * 0.05 - pointer.current.y * 0.06;
    const ease = Math.min(1, delta * 2.2);

    group.rotation.z += (targetZ - group.rotation.z) * ease;
    group.rotation.y += (targetY - group.rotation.y) * ease;
    group.rotation.x += (targetX - group.rotation.x) * ease;
  });

  return (
    // Framing offset, then a pivot at the clip's punch hole so the sway
    // turns about the point the lanyard actually threads through.
    <group position={[0, -0.55, 0]}>
      <group position={[0, CLIP_HOLE_Y, 0]} ref={groupRef}>
        <group position={[0, -CLIP_HOLE_Y, 0]}>
          <BadgeCardMesh face={face} />
        </group>
      </group>
    </group>
  );
}

/**
 * `prefers-reduced-motion` fallback — the same idle sway that shipped before
 * the physics rebuild. Deliberately kept in a separate module (not just an
 * `if` inside the physics file) so reduced-motion visitors never fetch the
 * Rapier chunk at all — see site-footer.tsx.
 */
export function HangingBadgeStatic() {
  return (
    <Canvas camera={{ fov: 34, position: [0, 0.1, 9.6] }} dpr={[1, 1.75]} gl={{ alpha: true, antialias: true }}>
      <BadgeLighting />
      <Badge />
    </Canvas>
  );
}
