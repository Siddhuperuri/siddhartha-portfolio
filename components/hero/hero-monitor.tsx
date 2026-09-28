"use client";

import { Environment, Lightformer, RoundedBox } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import type { MutableRefObject } from "react";
import * as THREE from "three";

export type MonitorChannel = {
  context: string;
  title: string;
  type: string;
};

const SCREEN_W = 1600;
const SCREEN_H = 1000;

const FOV = 38;
const TAN_HALF_FOV = Math.tan((FOV * Math.PI) / 180 / 2);

/**
 * The vertical layout of the whole set, in world units. Everything else —
 * stand height, desk position, camera framing — is derived from these, so
 * moving one part can't silently leave another floating or intersecting.
 *
 * Panel −1.36…+1.36 · neck −1.98…−1.30 · base plate −2.06…−1.98 · desk top
 * face at −2.06, which is exactly where the base plate lands.
 */
const PANEL_W = 4.36;
const PANEL_H = 2.72;
const DESK_TOP_Y = -2.06;

/**
 * Bounding box of the whole monitor assembly (panel + neck + base), with a
 * little margin. Camera distances are DERIVED from this rather than guessed,
 * so the object can never be cropped.
 */
const OBJECT_W = 4.6;
const OBJECT_H = 3.62;

/** How much of the frame the object occupies: 1 / fill. */
const FILL_FAR = 1.76; // panel ≈37% of frame width at rest
const FILL_NEAR = 1.45; // panel ≈52% at full scroll

/**
 * Where the BOTTOM edge of the frame sits in world units at each end of the
 * dolly — this is what actually choreographs the shot.
 *
 * At rest the frame bottom sits just under the panel, which puts the panel's
 * top edge a little past halfway down the frame and runs its lower portion
 * off the bottom of the viewport: the monitor enters low and cropped, below
 * the headline. Scrolling drops the frame bottom past the neck and base to
 * land the desk in shot. The desk never moves — the camera does.
 *
 * These two are calibrated against the rendered frame, not solved: the panel
 * is tilted and sits off-centre, so its projected height runs a few percent
 * over the flat-plane figure `visibleHeightAt` returns and the ideal numbers
 * land the object high. Re-measure on screen if the object dimensions change.
 */
const REST_FRAME_BOTTOM = -0.96;
const SCROLL_FRAME_BOTTOM = -2.2;

/**
 * Fraction of the scroll runway spent cycling through projects. The remainder
 * holds on the final entry, so the last piece of work gets its own beat at
 * full zoom instead of flicking past on the way out of the pin.
 */
const CHANNEL_CYCLE_END = 0.75;

/**
 * Smallest camera distance that fits the object in BOTH axes at the given
 * aspect. Vertical FOV alone would slice a wide object out of a narrow frame,
 * so the width-constrained distance wins on portrait viewports.
 */
function fitDistance(aspect: number, fill: number) {
  const forHeight = (OBJECT_H * fill) / (2 * TAN_HALF_FOV);
  const forWidth = (OBJECT_W * fill) / (2 * TAN_HALF_FOV * aspect);
  return Math.max(forHeight, forWidth);
}

function visibleHeightAt(distance: number) {
  return 2 * distance * TAN_HALF_FOV;
}

/**
 * Draws the monitor's screen as a designed title card on a 2D canvas, then
 * hands it to three.js as a texture.
 *
 * Why canvas rather than drei's <Text>: it gives real layout (rules, meta
 * row, accent bar) so the screen reads as a designed interface instead of
 * floating 3D text, and it avoids drei's default font CDN fetch entirely.
 *
 * This is a title card, not a fabricated screenshot — swap in useTexture
 * with real project imagery once it exists; nothing else here changes.
 */
function drawChannel(
  ctx: CanvasRenderingContext2D,
  channel: MonitorChannel,
  index: number,
  total: number,
) {
  const pad = 96;
  const right = SCREEN_W - pad;

  ctx.clearRect(0, 0, SCREEN_W, SCREEN_H);

  // Paper ground
  ctx.fillStyle = "#edeae4";
  ctx.fillRect(0, 0, SCREEN_W, SCREEN_H);

  // Faint working grid
  ctx.strokeStyle = "rgba(0,0,0,0.045)";
  ctx.lineWidth = 2;
  for (let x = pad; x < SCREEN_W; x += 128) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, SCREEN_H);
    ctx.stroke();
  }

  const mono = '600 34px ui-monospace, "Cascadia Code", Menlo, monospace';
  const sans =
    '600 132px "Helvetica Neue", Helvetica, Arial, "Segoe UI", sans-serif';

  // Header row
  ctx.fillStyle = "#8a8375";
  ctx.font = mono;
  ctx.textBaseline = "alphabetic";
  ctx.fillText(
    `${String(index + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`,
    pad,
    130,
  );

  ctx.textAlign = "right";
  ctx.fillText("SELECTED WORK", right, 130);
  ctx.textAlign = "left";

  ctx.strokeStyle = "rgba(0,0,0,0.16)";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(pad, 182);
  ctx.lineTo(right, 182);
  ctx.stroke();

  // Title — wrapped to the card width
  ctx.fillStyle = "#14110e";
  ctx.font = sans;
  const words = channel.title.split(" ");
  const lines: string[] = [];
  let line = "";
  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (ctx.measureText(candidate).width > SCREEN_W - pad * 2 && line) {
      lines.push(line);
      line = word;
    } else {
      line = candidate;
    }
  }
  if (line) lines.push(line);

  const startY = lines.length > 1 ? 470 : 545;
  lines.slice(0, 2).forEach((text, i) => {
    ctx.fillText(text, pad, startY + i * 146);
  });

  // Meta row
  ctx.fillStyle = "#6f6a60";
  ctx.font = mono;
  ctx.fillText(
    `${channel.type.toUpperCase()}  —  ${channel.context.toUpperCase()}`,
    pad,
    lines.length > 1 ? 730 : 660,
  );

  // Accent bar — the site's signal red, tying the screen to the page
  ctx.fillStyle = "#ff3d2e";
  ctx.fillRect(pad, SCREEN_H - 150, 240, 14);

  ctx.strokeStyle = "rgba(0,0,0,0.16)";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(pad, SCREEN_H - 96);
  ctx.lineTo(right, SCREEN_H - 96);
  ctx.stroke();
}

function useScreenTexture(channels: MonitorChannel[], index: number) {
  const canvas = useMemo(() => {
    const element = document.createElement("canvas");
    element.width = SCREEN_W;
    element.height = SCREEN_H;
    return element;
  }, []);

  const texture = useMemo(() => {
    const created = new THREE.CanvasTexture(canvas);
    created.colorSpace = THREE.SRGBColorSpace;
    created.anisotropy = 8;
    return created;
  }, [canvas]);

  useEffect(() => {
    const ctx = canvas.getContext("2d");
    const channel = channels[index];
    if (!ctx || !channel) return;
    drawChannel(ctx, channel, index, channels.length);
    // Flagged by react-hooks/immutability since `texture` came from useMemo,
    // but this flag is the actual, unavoidable three.js API for telling the
    // renderer a CanvasTexture's backing pixels changed — there's no
    // non-mutating equivalent short of reallocating a new GPU texture.
    // eslint-disable-next-line react-hooks/immutability
    texture.needsUpdate = true;
  }, [canvas, channels, index, texture]);

  useEffect(() => () => texture.dispose(), [texture]);

  return texture;
}

/**
 * The stand's neck: a rounded slab with an oval cable pass-through punched
 * near the top. Built once at module scope — the profile never changes, so
 * there is nothing for a hook to recompute.
 */
const NECK_GEOMETRY = (() => {
  const w = 1.06;
  const h = 0.74;
  const r = 0.1;

  const shape = new THREE.Shape();
  shape.moveTo(-w / 2 + r, -h / 2);
  shape.lineTo(w / 2 - r, -h / 2);
  shape.quadraticCurveTo(w / 2, -h / 2, w / 2, -h / 2 + r);
  shape.lineTo(w / 2, h / 2 - r);
  shape.quadraticCurveTo(w / 2, h / 2, w / 2 - r, h / 2);
  shape.lineTo(-w / 2 + r, h / 2);
  shape.quadraticCurveTo(-w / 2, h / 2, -w / 2, h / 2 - r);
  shape.lineTo(-w / 2, -h / 2 + r);
  shape.quadraticCurveTo(-w / 2, -h / 2, -w / 2 + r, -h / 2);

  const hole = new THREE.Path();
  hole.absellipse(0, 0.08, 0.21, 0.16, 0, Math.PI * 2, true, 0);
  shape.holes.push(hole);

  const geometry = new THREE.ExtrudeGeometry(shape, {
    bevelEnabled: true,
    bevelSegments: 2,
    bevelSize: 0.014,
    bevelThickness: 0.012,
    curveSegments: 20,
    depth: 0.3,
  });
  geometry.translate(0, 0, -0.15);
  return geometry;
})();

type SceneProps = {
  channels: MonitorChannel[];
  reduced: boolean;
  scrollProgressRef: MutableRefObject<number>;
};

function MonitorScene({ channels, reduced, scrollProgressRef }: SceneProps) {
  const groupRef = useRef<THREE.Group>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const framed = useRef(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const screenTexture = useScreenTexture(channels, activeIndex);

  useEffect(() => {
    if (reduced) return;
    const onMove = (event: PointerEvent) => {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (event.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduced]);

  useFrame((state, delta) => {
    const group = groupRef.current;
    if (!group) return;

    const progress = scrollProgressRef.current;
    const cycle = Math.min(1, progress / CHANNEL_CYCLE_END);
    const next = Math.min(
      channels.length - 1,
      Math.floor(cycle * channels.length),
    );
    if (next !== activeIndex) setActiveIndex(next);

    const aspect = state.size.width / Math.max(1, state.size.height);

    // Both endpoints of the dolly are solved from the object's bounding box at
    // the current aspect, so the monitor and its stand stay fully framed at
    // every scroll position and on every viewport.
    const zFar = fitDistance(aspect, FILL_FAR);
    const zNear = fitDistance(aspect, FILL_NEAR);
    const camYFar = REST_FRAME_BOTTOM + visibleHeightAt(zFar) / 2;
    const camYNear = SCROLL_FRAME_BOTTOM + visibleHeightAt(zNear) / 2;

    if (reduced) {
      group.rotation.set(-0.03, 0.15, 0);
      state.camera.position.set(0, camYFar, zFar);
      return;
    }

    const targetZ = THREE.MathUtils.lerp(zFar, zNear, progress);
    const targetCamY = THREE.MathUtils.lerp(camYFar, camYNear, progress);

    // First frame snaps into place; afterwards the dolly eases, so a resize or
    // an aspect change never produces a visible jump-cut.
    if (!framed.current) {
      state.camera.position.set(0, targetCamY, targetZ);
      framed.current = true;
    } else {
      const ease = Math.min(1, delta * 3);
      state.camera.position.z += (targetZ - state.camera.position.z) * ease;
      state.camera.position.y += (targetCamY - state.camera.position.y) * ease;
    }

    const ease = Math.min(1, delta * 3);

    // The gesture is dolly AND rotation together: the camera pushes in while
    // the panel swings from an angled three-quarter view toward face-on.
    const targetX = -0.04 + progress * 0.03 + pointer.current.y * 0.03;
    const targetY =
      THREE.MathUtils.lerp(0.15, 0.035, progress) + pointer.current.x * 0.05 * (1 - progress);

    group.rotation.x += (targetX - group.rotation.x) * ease;
    group.rotation.y += (targetY - group.rotation.y) * ease;
    group.position.y = Math.sin(state.clock.elapsedTime * 0.55) * 0.03 * (1 - progress);
  });

  return (
    <group ref={groupRef} rotation={[-0.04, 0.15, 0]}>
      {/* Rear housing — the panel is a slab without it, and the silhouette
          only reads as a monitor from three-quarters if there is a body
          behind the bezel for the light to fall off. */}
      <RoundedBox args={[3.3, 1.86, 0.42]} position={[0, -0.1, -0.28]} radius={0.09} smoothness={4}>
        <meshStandardMaterial color="#17171a" envMapIntensity={1.2} metalness={0.7} roughness={0.42} />
      </RoundedBox>

      {/* Neck. Extruded from a profile with a real cable pass-through rather
          than a box wearing a ring — the hole is the shape that makes a stand
          read as a stand. */}
      <mesh geometry={NECK_GEOMETRY} position={[0, -1.64, -0.06]}>
        <meshStandardMaterial color="#202024" envMapIntensity={2} metalness={0.86} roughness={0.3} />
      </mesh>

      {/* Base plate, sitting flush on the desk top */}
      <RoundedBox args={[2.36, 0.08, 0.98]} position={[0, -2.02, 0.06]} radius={0.03} smoothness={4}>
        <meshStandardMaterial color="#232327" envMapIntensity={2.2} metalness={0.88} roughness={0.28} />
      </RoundedBox>

      {/* Bezel — lifted off pure black and kept metallic so the lightformers
          draw an edge on it. At #0b0b0b it was invisible against the scrim,
          which is what made the monitor read as a floating screenshot. */}
      <RoundedBox args={[PANEL_W, PANEL_H, 0.14]} radius={0.05} smoothness={5}>
        <meshStandardMaterial color="#141417" envMapIntensity={2.4} metalness={0.88} roughness={0.24} />
      </RoundedBox>

      {/* Screen, sat slightly high so the chin is deeper than the top bezel */}
      <mesh position={[0, 0.035, 0.078]}>
        <planeGeometry args={[PANEL_W - 0.16, PANEL_H - 0.2]} />
        <meshBasicMaterial map={screenTexture} toneMapped={false} />
      </mesh>

      {/* Glass sheen across the panel */}
      <mesh position={[0, 0.035, 0.084]}>
        <planeGeometry args={[PANEL_W - 0.16, PANEL_H - 0.2]} />
        <meshPhysicalMaterial
          clearcoat={1}
          clearcoatRoughness={0.08}
          envMapIntensity={2.2}
          metalness={0}
          opacity={0.09}
          roughness={0.06}
          transparent
        />
      </mesh>
    </group>
  );
}

/**
 * Shallow on purpose. The visible top surface is the desk's depth raked by
 * the camera angle, so a deep slab projects into a wide empty band that
 * pushes the drawer fronts off the bottom of the frame entirely. At 2.2 the
 * top reads as a sliver and the seams land in shot, which is the composition
 * in the reference.
 */
const DESK_DEPTH = 2.2;
const DESK_FRONT_Z = DESK_DEPTH / 2;
/** Panel pitch and gap for the credenza fronts. The gap is the seam. */
const PANEL_PITCH = 2.12;
const PANEL_GAP = 0.09;
const PANEL_COUNT = 17;

/** Front panel x-centres for one row, offset by half a pitch on alternate rows
 *  so the seams stagger instead of stacking into one continuous vertical line. */
function rowOffsets(stagger: boolean) {
  const half = (PANEL_COUNT - 1) / 2;
  return Array.from({ length: PANEL_COUNT }, (_, i) => (i - half) * PANEL_PITCH + (stagger ? PANEL_PITCH / 2 : 0));
}

/**
 * The credenza the monitor stands on, plus its power cable. Kept outside the
 * rotating group so the surface stays world-fixed while the panel swings.
 *
 * The seams are the whole point. A single dark slab reads as nothing at all
 * against a dark scrim — what makes a surface legible is its construction, so
 * this is built the way the real thing is: a top slab with a lit front edge
 * over two rows of drawer fronts, each front a separate mesh with a gap
 * between it and its neighbour. Those gaps expose the darker carcass behind,
 * and that is what draws the seam lines; nothing is painted on.
 */
function Desk() {
  const cable = useMemo(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(0.12, -1.72, -0.24),
        new THREE.Vector3(0.5, -1.98, -0.42),
        new THREE.Vector3(1.05, -2.02, -0.75),
        new THREE.Vector3(1.9, -2.02, -1.25),
        new THREE.Vector3(2.9, -2.02, -1.05),
      ]),
    [],
  );

  const rows = [
    { height: 0.8, stagger: false, y: DESK_TOP_Y - 0.56 },
    { height: 0.9, stagger: true, y: DESK_TOP_Y - 1.46 },
  ];

  return (
    <group>
      {/*
        Low metalness throughout, unlike the monitor. A metallic surface only
        shows what is around it, and there is nothing below the horizon here
        to show — at metalness 0.6 the whole credenza mirrored black and
        disappeared. These read by diffuse colour instead, so the seams
        survive regardless of what the environment is doing.
      */}

      {/* Carcass — the dark body the seams read against */}
      <mesh position={[0, DESK_TOP_Y - 2.1, -0.1]}>
        <boxGeometry args={[40, 4, DESK_DEPTH - 0.2]} />
        <meshStandardMaterial color="#0a0a0c" envMapIntensity={0.4} metalness={0.1} roughness={0.7} />
      </mesh>

      {/* Top slab. Lighter than the fronts so the surface separates from them. */}
      <mesh position={[0, DESK_TOP_Y - 0.09, 0]}>
        <boxGeometry args={[40, 0.18, DESK_DEPTH]} />
        <meshStandardMaterial color="#303036" envMapIntensity={1.4} metalness={0.22} roughness={0.48} />
      </mesh>

      {/* The lit nose of the top edge — the horizontal line that tells you
          where the surface ends and the drop begins. */}
      <mesh position={[0, DESK_TOP_Y - 0.015, DESK_FRONT_Z]}>
        <boxGeometry args={[40, 0.05, 0.07]} />
        <meshStandardMaterial color="#70707e" envMapIntensity={3} metalness={0.85} roughness={0.2} />
      </mesh>

      {rows.map((row) =>
        rowOffsets(row.stagger).map((x) => (
          <mesh key={`${row.y}-${x}`} position={[x, row.y, DESK_FRONT_Z - 0.05]}>
            <boxGeometry args={[PANEL_PITCH - PANEL_GAP, row.height, 0.1]} />
            <meshStandardMaterial color="#1d1d22" envMapIntensity={0.9} metalness={0.15} roughness={0.56} />
          </mesh>
        )),
      )}

      <mesh>
        <tubeGeometry args={[cable, 48, 0.045, 10, false]} />
        <meshStandardMaterial color="#161616" envMapIntensity={1} metalness={0.4} roughness={0.6} />
      </mesh>
    </group>
  );
}

type HeroMonitorProps = {
  channels: MonitorChannel[];
  reduced: boolean;
  scrollProgressRef: MutableRefObject<number>;
};

export function HeroMonitor({ channels, reduced, scrollProgressRef }: HeroMonitorProps) {
  return (
    <Canvas
      camera={{ fov: FOV, position: [0, 0.76, 10] }}
      dpr={[1, 2]}
      gl={{ alpha: true, antialias: true }}
    >
      <ambientLight intensity={0.35} />
      <directionalLight intensity={0.9} position={[4, 5, 6]} />
      {/* Aimed down and forward at the credenza. Without it the desk sits
          below every light in the rig and renders as a black void. */}
      <directionalLight intensity={0.85} position={[1.5, 2.5, 7]} />

      {/*
        Studio reflections built from geometry rather than an HDRI file —
        frames={1} bakes it once, and nothing is fetched over the network
        (an Environment preset would hit a CDN and break under a strict CSP).
      */}
      <Environment frames={1} resolution={256}>
        <Lightformer color="#ffffff" intensity={2.6} position={[0, 3.5, 3]} scale={[9, 3, 1]} />
        <Lightformer color="#cfd6ff" intensity={1.4} position={[-5, 1, 2]} rotation-y={Math.PI / 2} scale={[6, 4, 1]} />
        <Lightformer color="#ffd9c2" intensity={1.1} position={[5, -1, 2]} rotation-y={-Math.PI / 2} scale={[6, 4, 1]} />
        {/* Ceiling panel facing down — this is what the desk top mirrors.
            The old version sat at y −4, below the desk, lighting nothing. */}
        <Lightformer color="#ffffff" intensity={1.6} position={[0, 6, 1.5]} rotation-x={Math.PI / 2} scale={[16, 9, 1]} />
      </Environment>

      <Desk />

      <MonitorScene channels={channels} reduced={reduced} scrollProgressRef={scrollProgressRef} />
    </Canvas>
  );
}
