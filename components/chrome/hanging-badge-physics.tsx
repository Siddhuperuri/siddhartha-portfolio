"use client";

import { Canvas } from "@react-three/fiber";
import { CuboidCollider, Physics, RigidBody, useRopeJoint } from "@react-three/rapier";
import type { RapierRigidBody } from "@react-three/rapier";
import { useRef, useState } from "react";
import type { ThreeEvent } from "@react-three/fiber";
import * as THREE from "three";

import {
  BadgeCardMesh,
  BadgeLighting,
  CLIP_HOLE_Y,
  SLEEVE_H,
  SLEEVE_W,
  useFaceTexture,
} from "@/components/chrome/badge-face";

// Rapier's raw RigidBodyType enum (not re-exported by @react-three/rapier —
// importing it would mean reaching past a pnpm-hidden transitive dependency
// for two numbers). Dynamic = 0, KinematicPositionBased = 2.
const BODY_DYNAMIC = 0;
const BODY_KINEMATIC = 2;

// The joint is deliberately invisible: nothing is drawn between the anchor
// and the clip, so the badge hangs on its own the way the reference does.
// The anchor still sits well above the frame so the swing arc stays long and
// slow rather than reading as a short, twitchy pendulum.
const ANCHOR_POSITION: [number, number, number] = [0, 3.4, 0];
const ROPE_LENGTH = 1.5;
// The point on the badge, in its own local space, the joint is anchored
// from — the clip's punch hole, which is what a lanyard actually threads
// through, so the badge pivots where a real one would.
const CARD_ATTACH: [number, number, number] = [0, CLIP_HOLE_Y, 0];

function Card() {
  // `useRopeJoint` types its refs as non-nullable (`RefObject<RapierRigidBody>`),
  // but both genuinely start out null before the RigidBody mounts — the hook
  // itself guards for that internally. `null!` satisfies the stricter type
  // without lying about anything at runtime.
  const cardRef = useRef<RapierRigidBody>(null!);
  const anchorRef = useRef<RapierRigidBody>(null!);
  const face = useFaceTexture();

  const [dragging, setDragging] = useState(false);
  const dragPlane = useRef(new THREE.Plane());
  const dragOffset = useRef(new THREE.Vector3());
  const lastPoint = useRef(new THREE.Vector3());
  const lastTime = useRef(0);
  const velocity = useRef(new THREE.Vector3());

  useRopeJoint(anchorRef, cardRef, [[0, 0, 0], CARD_ATTACH, ROPE_LENGTH]);

  const onPointerDown = (event: ThreeEvent<PointerEvent>) => {
    const body = cardRef.current;
    if (!body) return;
    event.stopPropagation();
    (event.target as Element).setPointerCapture?.(event.pointerId);

    const pos = body.translation();
    const cardPos = new THREE.Vector3(pos.x, pos.y, pos.z);
    const normal = new THREE.Vector3();
    event.camera.getWorldDirection(normal);
    dragPlane.current.setFromNormalAndCoplanarPoint(normal, cardPos);
    dragOffset.current.copy(cardPos).sub(event.point);

    body.setBodyType(BODY_KINEMATIC, true);
    setDragging(true);
    lastPoint.current.copy(event.point);
    lastTime.current = performance.now();
    document.body.style.cursor = "grabbing";
  };

  const onPointerMove = (event: ThreeEvent<PointerEvent>) => {
    if (!dragging) return;
    const body = cardRef.current;
    if (!body) return;

    const point = new THREE.Vector3();
    if (!event.ray.intersectPlane(dragPlane.current, point)) return;

    const target = point.clone().add(dragOffset.current);
    body.setNextKinematicTranslation({ x: target.x, y: target.y, z: target.z });

    const now = performance.now();
    const dt = Math.max(1, now - lastTime.current) / 1000;
    velocity.current.copy(point).sub(lastPoint.current).divideScalar(dt);
    lastPoint.current.copy(point);
    lastTime.current = now;
  };

  const endDrag = (event: ThreeEvent<PointerEvent>) => {
    if (!dragging) return;
    setDragging(false);
    (event.target as Element).releasePointerCapture?.(event.pointerId);
    document.body.style.cursor = "grab";

    const body = cardRef.current;
    if (!body) return;
    body.setBodyType(BODY_DYNAMIC, true);
    // Carries the drag's recent velocity into the release, so letting go
    // mid-swing actually flings the card rather than dropping it dead —
    // clamped so a fast flick can't send it off past the rope's own limit.
    const v = velocity.current;
    const speed = v.length();
    const clamped = speed > 4 ? v.clone().multiplyScalar(4 / speed) : v;
    body.setLinvel({ x: clamped.x, y: clamped.y, z: clamped.z }, true);
  };

  return (
    <>
      <RigidBody colliders={false} position={ANCHOR_POSITION} ref={anchorRef} type="fixed" />

      <RigidBody
        angularDamping={1.1}
        canSleep={false}
        colliders={false}
        linearDamping={1.3}
        position={[0.2, 0.12, 0]}
        ref={cardRef}
        restitution={0}
        rotation={[0.1, 0.4, 0.15]}
      >
        <CuboidCollider args={[SLEEVE_W / 2, SLEEVE_H / 2, 0.05]} />
        <group
          onPointerDown={onPointerDown}
          onPointerLeave={() => document.body.style.cursor === "grabbing" || (document.body.style.cursor = "auto")}
          onPointerMove={onPointerMove}
          onPointerOut={endDrag}
          onPointerOver={() => !dragging && (document.body.style.cursor = "grab")}
          onPointerUp={endDrag}
        >
          <BadgeCardMesh face={face} />
        </group>
      </RigidBody>
    </>
  );
}

/**
 * Draggable, physically-simulated badge — grab it and it swings on a real
 * rope-joint pendulum; let go mid-swing and it carries that motion into the
 * release instead of just dropping.
 *
 * Simplified from the usual multi-segment "lanyard" pattern to a single
 * `useRopeJoint` between a fixed anchor and the card: one rigid body, one
 * joint, nothing rendered for the cord. A segmented chain only pays off if
 * you draw the band it simulates, and here the badge hangs bare — so the
 * extra bodies and joints would buy nothing visible.
 *
 * Lives in its own module (see hanging-badge-static.tsx) specifically so
 * `prefers-reduced-motion` visitors never fetch Rapier's wasm at all.
 */
export function HangingBadgePhysics() {
  return (
    <Canvas camera={{ fov: 34, position: [0, 0.1, 9.6] }} dpr={[1, 1.75]} gl={{ alpha: true, antialias: true }}>
      <BadgeLighting />
      <Physics gravity={[0, -2.4, 0]}>
        <Card />
      </Physics>
    </Canvas>
  );
}
