"use client";

import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import { Color, Matrix4 } from "three";
import type { InstancedMesh } from "three";

import { useReducedMotionPreference } from "@/hooks/use-reduced-motion";
import { keplerianPosition, meanMotion } from "@/lib/orbital-mechanics";
import {
  centralBodyRadius,
  gravitationalParameter,
  materialTuning,
  orbitalBodies,
  orbitTrailSegments,
  sceneLighting,
  starfield,
  type OrbitalBody,
} from "@/lib/spatial-tokens";
import { generateStarfieldPositions } from "@/lib/starfield";
import { visualTokens } from "@/lib/visual-tokens";

function OrbitTrail({ body }: { body: OrbitalBody }) {
  const positions = useMemo(() => {
    const values = new Float32Array((orbitTrailSegments + 1) * 3);

    for (let i = 0; i <= orbitTrailSegments; i += 1) {
      const meanAnomaly = (i / orbitTrailSegments) * Math.PI * 2;
      const [x, y, z] = keplerianPosition({
        eccentricity: body.eccentricity,
        inclination: body.inclination,
        meanAnomaly,
        semiMajorAxis: body.semiMajorAxis,
      });

      values[i * 3] = x;
      values[i * 3 + 1] = y;
      values[i * 3 + 2] = z;
    }

    return values;
  }, [body]);

  return (
    <line>
      <bufferGeometry>
        <bufferAttribute args={[positions, 3]} attach="attributes-position" />
      </bufferGeometry>
      <lineBasicMaterial color={visualTokens.muted} opacity={0.22} transparent />
    </line>
  );
}

/**
 * All orbiting bodies share one geometry/material draw call via
 * InstancedMesh — a unit sphere scaled and positioned per instance each
 * frame, with per-instance base colour set once via setColorAt. The
 * meaningfully "repeated geometry" case in this scene is the starfield
 * (hundreds of points, already a single Points draw call below); with only
 * four bodies the win here is modest, but it's the correct pattern to keep
 * if more bodies are ever added.
 */
function OrbitingBodies({ bodies }: { bodies: readonly OrbitalBody[] }) {
  const meshRef = useRef<InstancedMesh>(null);
  const prefersReducedMotion = useReducedMotionPreference();
  const elapsed = useRef(0);
  const matrix = useMemo(() => new Matrix4(), []);
  const speeds = useMemo(
    () => bodies.map((body) => meanMotion(body.semiMajorAxis, gravitationalParameter)),
    [bodies],
  );

  useEffect(() => {
    const mesh = meshRef.current;

    if (!mesh) {
      return;
    }

    bodies.forEach((body, index) => {
      mesh.setColorAt(index, new Color(body.color));
    });

    if (mesh.instanceColor) {
      mesh.instanceColor.needsUpdate = true;
    }
  }, [bodies]);

  useFrame((_, delta) => {
    const mesh = meshRef.current;

    if (!mesh) {
      return;
    }

    if (!prefersReducedMotion) {
      elapsed.current += delta;
    }

    bodies.forEach((body, index) => {
      const meanAnomaly = body.meanAnomalyAtEpoch + speeds[index] * elapsed.current;
      const [x, y, z] = keplerianPosition({
        eccentricity: body.eccentricity,
        inclination: body.inclination,
        meanAnomaly,
        semiMajorAxis: body.semiMajorAxis,
      });

      matrix.makeScale(body.radius, body.radius, body.radius);
      matrix.setPosition(x, y, z);
      mesh.setMatrixAt(index, matrix);
    });

    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh args={[undefined, undefined, bodies.length]} ref={meshRef}>
      <sphereGeometry args={[1, 24, 24]} />
      <meshStandardMaterial
        emissive={visualTokens.accent}
        emissiveIntensity={sceneLighting.orbitingEmissiveIntensity}
        roughness={materialTuning.roughness}
      />
    </instancedMesh>
  );
}

function Starfield() {
  const positions = useMemo(() => generateStarfieldPositions(starfield), []);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute args={[positions, 3]} attach="attributes-position" />
      </bufferGeometry>
      <pointsMaterial
        color={visualTokens.muted}
        opacity={0.5}
        size={0.02}
        sizeAttenuation
        transparent
      />
    </points>
  );
}

/**
 * An abstracted gravity field standing in for the Gravity Playground
 * project's Cosmos Engine: a central mass with bodies on real (simplified)
 * Keplerian orbits, rather than a decorative particle cloud.
 */
export function CosmosField() {
  return (
    <group>
      <ambientLight intensity={sceneLighting.ambientIntensity} />
      <pointLight
        color={visualTokens.accent}
        intensity={sceneLighting.pointIntensity}
        position={[0, 0, 0]}
      />
      <mesh>
        <sphereGeometry args={[centralBodyRadius, 32, 32]} />
        <meshStandardMaterial
          color={visualTokens.accent}
          emissive={visualTokens.accent}
          emissiveIntensity={sceneLighting.centralEmissiveIntensity}
          roughness={materialTuning.roughness}
        />
      </mesh>
      {orbitalBodies.map((body) => (
        <OrbitTrail body={body} key={body.id} />
      ))}
      <OrbitingBodies bodies={orbitalBodies} />
      <Starfield />
    </group>
  );
}
