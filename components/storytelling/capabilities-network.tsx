"use client";

import { Canvas } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import { Color, Matrix4 } from "three";
import type { InstancedMesh } from "three";

import {
  capabilitiesNetworkEdges,
  capabilitiesNetworkLighting,
  capabilitiesNetworkSampling,
  capabilitiesNetworkScene,
  capabilitiesNetworkText,
} from "@/lib/capabilities-network-tokens";
import { buildNetworkEdges, pseudoRandom, sampleTextPoints } from "@/lib/text-particles";
import type { NetworkEdge } from "@/lib/text-particles";

type NodePosition = readonly [number, number, number];

/**
 * Rasterises CAPABILITIES once on mount (canvas text sampling is a browser
 * API, so this can only run client-side) and derives a node point cloud
 * plus the nearest-neighbour edges connecting it into a constellation.
 */
function useNetworkGeometry() {
  // Lazy initializer, not an effect: this component is dynamic-imported
  // with ssr:false, so it only ever renders client-side — the canvas
  // sampling can safely run once during the first render instead of
  // mounting empty and re-rendering once an effect fires.
  const [geometry] = useState<{ edges: NetworkEdge[]; nodes: NodePosition[] }>(() => {
    const fontFamily =
      getComputedStyle(document.documentElement).getPropertyValue("--font-display").trim() || "sans-serif";

    const points = sampleTextPoints({
      fontFamily,
      fontSize: capabilitiesNetworkSampling.fontSize,
      fontWeight: capabilitiesNetworkSampling.fontWeight,
      sampleStep: capabilitiesNetworkSampling.sampleStep,
      targetCount: capabilitiesNetworkSampling.targetCount,
      text: capabilitiesNetworkText,
    });

    const { scale } = capabilitiesNetworkScene;

    return {
      edges: buildNetworkEdges(points, capabilitiesNetworkEdges.neighborCount, capabilitiesNetworkEdges.maxDistance),
      nodes: points.map((point, index) => [
        point.x * scale,
        point.y * scale,
        (pseudoRandom(index + 1) - 0.5) * 2 * capabilitiesNetworkScene.depthJitter,
      ]),
    };
  });

  return geometry;
}

type NetworkNodesProps = {
  intensity: number;
  nodes: readonly NodePosition[];
};

function NetworkNodes({ intensity, nodes }: NetworkNodesProps) {
  const meshRef = useRef<InstancedMesh>(null);
  const matrix = useMemo(() => new Matrix4(), []);
  const brightColor = useMemo(() => new Color("#e88827"), []);
  const dimColor = useMemo(() => new Color("#d4601a"), []);

  useEffect(() => {
    const mesh = meshRef.current;

    if (!mesh || nodes.length === 0) {
      return;
    }

    nodes.forEach((position, index) => {
      matrix.setPosition(position[0], position[1], position[2]);
      mesh.setMatrixAt(index, matrix);
      mesh.setColorAt(index, index % 6 === 0 ? brightColor : dimColor);
    });

    mesh.instanceMatrix.needsUpdate = true;

    if (mesh.instanceColor) {
      mesh.instanceColor.needsUpdate = true;
    }
  }, [nodes, matrix, brightColor, dimColor]);

  if (nodes.length === 0) {
    return null;
  }

  return (
    <instancedMesh args={[undefined, undefined, nodes.length]} ref={meshRef}>
      <sphereGeometry args={[capabilitiesNetworkScene.nodeRadius, 8, 8]} />
      <meshStandardMaterial
        emissive="#e88827"
        emissiveIntensity={intensity}
        opacity={intensity}
        roughness={0.4}
        transparent
      />
    </instancedMesh>
  );
}

type NetworkLinesProps = {
  edges: readonly NetworkEdge[];
  nodes: readonly NodePosition[];
  opacity: number;
};

function NetworkLines({ edges, nodes, opacity }: NetworkLinesProps) {
  const positions = useMemo(() => {
    const values = new Float32Array(edges.length * 6);

    edges.forEach(([a, b], i) => {
      const pa = nodes[a];
      const pb = nodes[b];

      values[i * 6] = pa[0];
      values[i * 6 + 1] = pa[1];
      values[i * 6 + 2] = pa[2];
      values[i * 6 + 3] = pb[0];
      values[i * 6 + 4] = pb[1];
      values[i * 6 + 5] = pb[2];
    });

    return values;
  }, [edges, nodes]);

  if (edges.length === 0) {
    return null;
  }

  return (
    <lineSegments>
      <bufferGeometry>
        <bufferAttribute args={[positions, 3]} attach="attributes-position" />
      </bufferGeometry>
      <lineBasicMaterial color="#792f0f" opacity={opacity} transparent />
    </lineSegments>
  );
}

function CapabilitiesScene() {
  const { edges, nodes } = useNetworkGeometry();

  return (
    <>
      <ambientLight intensity={capabilitiesNetworkLighting.ambientIntensity} />
      <pointLight color="#e88827" intensity={capabilitiesNetworkLighting.pointIntensity} position={[0, 2, 8]} />
      <group>
        <NetworkNodes intensity={1} nodes={nodes} />
        <NetworkLines edges={edges} nodes={nodes} opacity={0.55} />
        <group position={[0, -capabilitiesNetworkScene.reflectionOffset, 0]} scale={[1, -1, 1]}>
          <NetworkNodes intensity={capabilitiesNetworkScene.reflectionOpacity} nodes={nodes} />
          <NetworkLines edges={edges} nodes={nodes} opacity={capabilitiesNetworkScene.reflectionOpacity * 0.6} />
        </group>
      </group>
    </>
  );
}

/**
 * Decorative-only: CAPABILITIES rendered as a wireframe node network with a
 * faint floor reflection, sitting above the real "02 — Capabilities"
 * eyebrow label that already carries the section's accessible heading —
 * this canvas adds nothing screen readers need, so it stays aria-hidden at
 * the call site rather than duplicating the text here.
 */
export function CapabilitiesNetwork() {
  return (
    <Canvas
      camera={{ fov: capabilitiesNetworkScene.fov, position: [0, 0, 14] }}
      dpr={[1, 1.5]}
      fallback={<div aria-hidden className="h-full w-full" />}
      frameloop="demand"
      gl={{ alpha: true, antialias: false, powerPreference: "low-power" }}
    >
      <CapabilitiesScene />
    </Canvas>
  );
}
