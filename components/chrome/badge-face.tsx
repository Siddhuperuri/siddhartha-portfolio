"use client";

import { Environment, Lightformer, RoundedBox } from "@react-three/drei";
import { useEffect, useMemo } from "react";
import * as THREE from "three";

/** The printed card itself, sitting inside the holder. */
export const CARD_W = 1.9;
export const CARD_H = 2.41;
/** The vinyl holder the card slides into — the dark frame you actually see. */
export const SLEEVE_W = 2.3;
export const SLEEVE_H = 3.06;
/**
 * The card is not centred in the holder: the top border is deeper than the
 * other three because that's where the clip slot is punched.
 */
export const CARD_OFFSET_Y = -0.128;
/** Centre of the clip's punch hole, in the badge's local space — what it hangs from. */
export const CLIP_HOLE_Y = 1.843;

const FACE_W = 1024;
const FACE_H = 1300;
/** Card corner radius, in face pixels — the corners are left transparent so the sleeve shows through. */
const FACE_RADIUS = 30;

const GLINT_X = FACE_W * 0.46;
const GLINT_Y = FACE_H * 0.505;

const SANS = '"Helvetica Neue", Helvetica, Arial, "Segoe UI", sans-serif';
const MONO = 'ui-monospace, "Cascadia Code", "SF Mono", Menlo, monospace';

/** Paints `gradient` over the whole face in one blend pass. */
function wash(
  ctx: CanvasRenderingContext2D,
  gradient: CanvasGradient,
  alpha: number,
  mode: GlobalCompositeOperation = "multiply",
) {
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.globalCompositeOperation = mode;
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, FACE_W, FACE_H);
  ctx.restore();
}

/**
 * A display word set to fill the measure exactly, the way the reference sets
 * its two discipline words edge to edge. Measuring and then scaling on x is
 * what keeps that flush-both-sides fit honest across whichever grotesque the
 * OS actually resolves, instead of trusting one font's metrics.
 */
function drawFittedWord(
  ctx: CanvasRenderingContext2D,
  word: string,
  x: number,
  baseline: number,
  measure: number,
  size: number,
  fill: string | CanvasGradient,
) {
  ctx.save();
  ctx.font = `700 ${size}px ${SANS}`;
  ctx.letterSpacing = "-0.02em";
  ctx.fillStyle = fill;
  const natural = ctx.measureText(word).width;
  ctx.translate(x, baseline);
  ctx.scale(measure / natural, 1);
  ctx.fillText(word, 0, 0);
  ctx.restore();
}

/**
 * The pinched four-arm outline. Each edge is a cubic whose handles are pulled
 * right back along the two axes it spans (`WAIST`), so the curve hugs the
 * axes and the arms come out as thin needles. Handles further out — a plain
 * quadratic through the origin — give arms roughly four times fatter, which
 * reads as a shuriken rather than a caustic.
 */
const WAIST = 0.17;

function glintPath(ctx: CanvasRenderingContext2D, arms: [number, number, number, number], scale: number) {
  const [up, right, down, left] = arms.map((a) => a * scale) as [number, number, number, number];
  ctx.beginPath();
  ctx.moveTo(0, -up);
  ctx.bezierCurveTo(0, -up * WAIST, right * WAIST, 0, right, 0);
  ctx.bezierCurveTo(right * WAIST, 0, 0, down * WAIST, 0, down);
  ctx.bezierCurveTo(0, down * WAIST, -left * WAIST, 0, -left, 0);
  ctx.bezierCurveTo(-left * WAIST, 0, 0, -up * WAIST, 0, -up);
  ctx.closePath();
}

/**
 * The four-pointed caustic sitting in the middle of the card — the specular
 * star a foil laminate throws under a hard light. Arms are unequal and the
 * whole thing is raked off-axis, because a symmetrical star reads as a drawn
 * sparkle rather than a reflection.
 *
 * Built as nested copies of one outline rather than a single shape with a
 * soft gradient: stacking a wide faint pass under a small bright one is what
 * gives the arms their fast taper and leaves a hard core, where one gradient
 * only ever produces a blob.
 */
function drawGlint(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  rotation: number,
  arms: [number, number, number, number],
  strength: number,
) {
  const layers: Array<[number, number]> = [
    [1, 0.42],
    [0.66, 0.44],
    [0.34, 0.52],
    [0.14, 0.7],
  ];

  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(rotation);

  // Halo first, so the arms sit in a little atmosphere instead of ending
  // abruptly against the foil.
  const reach = Math.max(...arms);
  const halo = ctx.createRadialGradient(0, 0, 0, 0, 0, reach * 0.5);
  halo.addColorStop(0, `rgba(255,255,255,${0.13 * strength})`);
  halo.addColorStop(0.5, `rgba(255,255,255,${0.05 * strength})`);
  halo.addColorStop(1, "rgba(255,255,255,0)");
  ctx.globalCompositeOperation = "lighter";
  ctx.fillStyle = halo;
  ctx.fillRect(-reach, -reach, reach * 2, reach * 2);

  // A cool shadow slipped just off the bright shape reads as a fold in the
  // laminate rather than a sticker of a star sitting on top of it. It goes
  // under the highlight, not over, so it never rings the core.
  ctx.globalCompositeOperation = "multiply";
  ctx.save();
  ctx.translate(16, 20);
  glintPath(ctx, arms, 0.84);
  ctx.fillStyle = `rgba(132,141,156,${0.3 * strength})`;
  ctx.fill();
  ctx.restore();

  ctx.globalCompositeOperation = "lighter";
  for (const [scale, alpha] of layers) {
    glintPath(ctx, arms, scale);
    ctx.fillStyle = `rgba(255,255,255,${alpha * strength})`;
    ctx.fill();
  }

  ctx.restore();
}

/**
 * The badge face, drawn on a 2D canvas — same approach as the hero monitor's
 * screen: real layout control, crisp text, no font fetched over the network.
 *
 * The card is a holographic foil laminate: a near-white ground that only
 * turns chromatic where the light rakes it, so the colour lives in the
 * gradients rather than in any printed ink. Content stays factual (the two
 * disciplines this practice covers, the site's own identifiers) rather than
 * invented credentials.
 *
 * Shared between the static and physics badge variants so the two only
 * differ in how the card moves, not what it looks like.
 */
function drawFace(ctx: CanvasRenderingContext2D) {
  const pad = 34;
  const measure = FACE_W - pad * 2;

  ctx.clearRect(0, 0, FACE_W, FACE_H);

  ctx.save();
  ctx.beginPath();
  ctx.roundRect(0, 0, FACE_W, FACE_H, FACE_RADIUS);
  ctx.clip();

  // --- foil ground -------------------------------------------------------
  // Silver, not paper-white. The caustic and the sheen are both pure white,
  // so the field has to sit a few stops under them or there is no headroom
  // left to read a highlight against.
  const ground = ctx.createLinearGradient(0, 0, FACE_W * 0.35, FACE_H);
  ground.addColorStop(0, "#eef0f3");
  ground.addColorStop(0.4, "#e1e3e7");
  ground.addColorStop(0.7, "#d9d6d3");
  ground.addColorStop(1, "#c8c2bd");
  ctx.fillStyle = ground;
  ctx.fillRect(0, 0, FACE_W, FACE_H);

  // Chroma piles up on the right edge, where the laminate turns away from
  // the key light; the left two-thirds stay neutral so type can hold.
  // Held off until well past halfway: in the reference the left of the card
  // stays near-neutral silver and only the trailing third goes spectral.
  const across = ctx.createLinearGradient(0, 0, FACE_W, 0);
  across.addColorStop(0, "#ffffff");
  across.addColorStop(0.54, "#ffffff");
  across.addColorStop(0.66, "#d3ecff");
  across.addColorStop(0.78, "#ded3ff");
  across.addColorStop(0.88, "#ffc3e4");
  across.addColorStop(0.96, "#ffc6a2");
  across.addColorStop(1, "#ffd6bb");
  wash(ctx, across, 1);

  const down = ctx.createLinearGradient(0, 0, 0, FACE_H);
  down.addColorStop(0, "#ffffff");
  down.addColorStop(0.3, "#e6f3ff");
  down.addColorStop(0.62, "#ffffff");
  down.addColorStop(1, "#ffd9ba");
  wash(ctx, down, 0.75);

  const streak = ctx.createLinearGradient(FACE_W * 0.1, FACE_H, FACE_W, 0);
  streak.addColorStop(0.34, "#ffffff");
  streak.addColorStop(0.48, "#d5ffef");
  streak.addColorStop(0.56, "#d2e7ff");
  streak.addColorStop(0.64, "#f0d9ff");
  streak.addColorStop(0.78, "#ffffff");
  wash(ctx, streak, 0.5);

  // Warm bloom pooling in the bottom-right corner, cool one opposite it —
  // the two ends of the spectrum a foil splits under a single source.
  const warm = ctx.createRadialGradient(FACE_W, FACE_H, 0, FACE_W, FACE_H, FACE_W * 0.85);
  warm.addColorStop(0, "#ffb885");
  warm.addColorStop(0.55, "#ffdcc4");
  warm.addColorStop(1, "#ffffff");
  wash(ctx, warm, 0.7);

  const cool = ctx.createRadialGradient(FACE_W * 0.95, 0, 0, FACE_W * 0.95, 0, FACE_W * 0.55);
  cool.addColorStop(0, "#bcd9ff");
  cool.addColorStop(0.6, "#e6f1ff");
  cool.addColorStop(1, "#ffffff");
  wash(ctx, cool, 0.6);

  // --- printed matter ----------------------------------------------------
  drawFittedWord(ctx, "Designer", pad, 245, measure, 190, "#31343a");

  ctx.save();
  ctx.font = `500 27px ${MONO}`;
  ctx.letterSpacing = "0.04em";
  ctx.fillStyle = "#5f636a";
  ctx.textAlign = "right";
  ctx.fillText("PERURI SIDDHARTHA", FACE_W - pad, 330);
  ctx.fillText("VIJAYAWADA, IN", FACE_W - pad, 370);
  ctx.restore();

  ctx.save();
  ctx.font = `500 27px ${MONO}`;
  ctx.letterSpacing = "0.04em";
  ctx.fillStyle = "#8c8078";
  ctx.fillText("DESIGN /", pad, 1055);
  ctx.fillText("FRONT-END", pad, 1092);
  ctx.restore();

  const developer = ctx.createLinearGradient(pad, 0, FACE_W - pad, 0);
  developer.addColorStop(0, "#9b8f88");
  developer.addColorStop(0.45, "#6f645e");
  developer.addColorStop(1, "#4b433f");
  drawFittedWord(ctx, "Developer", pad, 1272, measure, 190, developer);

  // --- light over the print ----------------------------------------------
  // The sheen sits above the type on purpose: on real foil the highlight
  // washes whatever is printed under it, which is what breaks the words up
  // instead of leaving them flat and stickered-on.
  const column = ctx.createLinearGradient(FACE_W * 0.18, 0, FACE_W * 0.7, 0);
  column.addColorStop(0, "rgba(255,255,255,0)");
  column.addColorStop(0.5, "rgba(255,255,255,0.14)");
  column.addColorStop(1, "rgba(255,255,255,0)");
  wash(ctx, column, 1, "lighter");

  // Kept tight and off-centre. A wide bloom flattens the whole card to paper
  // white and takes the caustic with it — the highlight has to stay small
  // enough that the chroma around it survives.
  const bloom = ctx.createRadialGradient(
    GLINT_X - 60,
    GLINT_Y - 30,
    0,
    GLINT_X - 60,
    GLINT_Y - 30,
    FACE_W * 0.38,
  );
  bloom.addColorStop(0, "rgba(255,255,255,0.2)");
  bloom.addColorStop(0.36, "rgba(255,255,255,0.09)");
  bloom.addColorStop(0.72, "rgba(255,255,255,0.02)");
  bloom.addColorStop(1, "rgba(255,255,255,0)");
  wash(ctx, bloom, 1, "lighter");

  drawGlint(ctx, GLINT_X, GLINT_Y, -0.32, [265, 450, 320, 495], 1);
  drawGlint(ctx, GLINT_X, GLINT_Y, -0.55, [34, 680, 30, 345], 0.55);

  const core = ctx.createRadialGradient(GLINT_X, GLINT_Y, 0, GLINT_X, GLINT_Y, 34);
  core.addColorStop(0, "rgba(255,255,255,0.9)");
  core.addColorStop(0.4, "rgba(255,255,255,0.3)");
  core.addColorStop(1, "rgba(255,255,255,0)");
  wash(ctx, core, 1, "lighter");

  // --- wear on the sleeve ------------------------------------------------
  // Deterministic so the scuffs are identical on every render and every
  // visitor, rather than a different card each mount.
  let seed = 7;
  const random = () => (seed = (seed * 1664525 + 1013904223) % 4294967296) / 4294967296;

  ctx.save();
  ctx.lineCap = "round";
  for (let i = 0; i < 24; i += 1) {
    const x = random() * FACE_W;
    const y = random() * FACE_H;
    const length = 40 + random() * 190;
    const angle = -0.55 + random() * 0.5;
    const dark = random() > 0.72;
    ctx.globalCompositeOperation = dark ? "multiply" : "lighter";
    ctx.strokeStyle = dark
      ? `rgba(126,122,118,${0.05 + random() * 0.06})`
      : `rgba(255,255,255,${0.06 + random() * 0.14})`;
    ctx.lineWidth = 0.7 + random() * 1.2;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + Math.cos(angle) * length, y + Math.sin(angle) * length);
    ctx.stroke();
  }
  ctx.restore();

  // Hard chromatic fringe at the trailing edge, where the foil bends away.
  const fringe = ctx.createLinearGradient(FACE_W - 96, 0, FACE_W, 0);
  fringe.addColorStop(0, "#ffffff");
  fringe.addColorStop(0.45, "#ffd8f0");
  fringe.addColorStop(1, "#c2e2ff");
  ctx.save();
  ctx.globalAlpha = 0.55;
  ctx.globalCompositeOperation = "multiply";
  ctx.fillStyle = fringe;
  ctx.fillRect(FACE_W - 96, 0, 96, FACE_H);
  ctx.restore();

  ctx.restore();
}

export function useFaceTexture() {
  const canvas = useMemo(() => {
    const el = document.createElement("canvas");
    el.width = FACE_W;
    el.height = FACE_H;
    return el;
  }, []);

  const texture = useMemo(() => {
    const t = new THREE.CanvasTexture(canvas);
    t.colorSpace = THREE.SRGBColorSpace;
    t.anisotropy = 8;
    return t;
  }, [canvas]);

  useEffect(() => {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    drawFace(ctx);
    // Flagged by react-hooks/immutability since `texture` came from useMemo,
    // but this flag is the actual, unavoidable three.js API for telling the
    // renderer a CanvasTexture's backing pixels changed — there's no
    // non-mutating equivalent short of reallocating a new GPU texture.
    // eslint-disable-next-line react-hooks/immutability
    texture.needsUpdate = true;
  }, [canvas, texture]);

  useEffect(() => () => texture.dispose(), [texture]);

  return texture;
}

/**
 * The pressed-steel clip: a narrow neck that flares where it disappears into
 * the holder's slot, a domed head, and a punched hole for the lanyard. Built
 * as an extruded profile rather than assembled from primitives so the bevel
 * runs continuously around the whole silhouette and catches the light as one
 * piece of metal.
 */
const CLIP_GEOMETRY = (() => {
  const neck = 0.334;
  const flare = 0.482;
  const height = 0.737;
  const top = height / 2;
  const bottom = -height / 2;
  const head = neck / 2;
  const shoulder = bottom + 0.34;

  const shape = new THREE.Shape();
  shape.moveTo(-flare / 2, bottom);
  shape.lineTo(-flare / 2, bottom + 0.18);
  shape.quadraticCurveTo(-flare / 2, shoulder - 0.04, -neck / 2, shoulder);
  shape.lineTo(-neck / 2, top - head);
  shape.absarc(0, top - head, head, Math.PI, 0, true);
  shape.lineTo(neck / 2, shoulder);
  shape.quadraticCurveTo(flare / 2, shoulder - 0.04, flare / 2, bottom + 0.18);
  shape.lineTo(flare / 2, bottom);
  shape.closePath();

  const hole = new THREE.Path();
  hole.absarc(0, top - 0.145, 0.074, 0, Math.PI * 2, true);
  shape.holes.push(hole);

  const geometry = new THREE.ExtrudeGeometry(shape, {
    bevelEnabled: true,
    bevelSegments: 2,
    bevelSize: 0.011,
    bevelThickness: 0.009,
    curveSegments: 24,
    depth: 0.032,
  });
  geometry.translate(0, 0, -0.016);
  return geometry;
})();

/**
 * The card's visual stack, bottom to top: the vinyl holder body, the printed
 * card inset inside it, and the glossy front film that runs over both. The
 * dark border in the finished badge is simply the holder showing around the
 * smaller card, which is how the real object works.
 */
export function BadgeCardMesh({ face }: { face: THREE.Texture }) {
  return (
    <>
      {/* Sits proud of the sleeve's front face, not buried in it. The flared
          base overlaps the holder in y, and at a shared depth the two
          surfaces z-fight into a hatched band across the clip — the clip
          clamps over the front of a real holder anyway. */}
      <mesh geometry={CLIP_GEOMETRY} position={[0, SLEEVE_H / 2 + 0.114, 0.055]}>
        {/* Not fully metallic: at metalness 1 the clip renders purely as a
            reflection of a mostly-dark environment and goes to gunmetal.
            Holding a little diffuse back keeps it reading as bright steel. */}
        <meshStandardMaterial color="#f4f6f9" envMapIntensity={2.6} metalness={0.82} roughness={0.2} />
      </mesh>

      {/* Opaque, not tinted-transparent: with the footer's warm ground behind
          it any transmission turns the black vinyl brown. The border reads as
          translucent from the clearcoat's reflections alone. */}
      <RoundedBox args={[SLEEVE_W, SLEEVE_H, 0.05]} radius={0.085} smoothness={5}>
        <meshPhysicalMaterial
          clearcoat={1}
          clearcoatRoughness={0.06}
          color="#08090b"
          envMapIntensity={0.85}
          metalness={0}
          roughness={0.34}
        />
      </RoundedBox>

      <mesh position={[0, CARD_OFFSET_Y, 0.027]}>
        <planeGeometry args={[CARD_W, CARD_H]} />
        <meshBasicMaterial map={face} toneMapped={false} transparent />
      </mesh>

      {/* The vinyl window over everything — thin, near-clear, and the only
          thing carrying the sleeve's own reflection. Kept very low opacity:
          any more and it fogs the black border to grey. */}
      <mesh position={[0, 0, 0.034]}>
        <planeGeometry args={[SLEEVE_W, SLEEVE_H]} />
        <meshPhysicalMaterial
          clearcoat={1}
          clearcoatRoughness={0.02}
          envMapIntensity={2.4}
          metalness={0}
          opacity={0.06}
          roughness={0.03}
          transparent
        />
      </mesh>
    </>
  );
}

/**
 * Studio lighting shared by both badge variants — reflections built from
 * geometry rather than an HDRI file, baked once (`frames={1}`), so nothing
 * is fetched over the network and no CSP exception is needed.
 */
export function BadgeLighting() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight intensity={1} position={[3, 4, 5]} />
      {/* Neutral-dominant: the warm bounce is kept low and small so it reads
          as a floor kick on the chrome, not a tint flooding the black vinyl. */}
      <Environment frames={1} resolution={256}>
        <Lightformer color="#ffffff" intensity={4} position={[0, 4, 3]} scale={[9, 3, 1]} />
        <Lightformer color="#f4f7ff" intensity={2.2} position={[0, 0, 5]} scale={[7, 7, 1]} />
        <Lightformer color="#ffc9a4" intensity={1.1} position={[3, -3, 2]} rotation-x={-Math.PI / 2} scale={[5, 4, 1]} />
        <Lightformer color="#cfdcff" intensity={1.6} position={[-4, 1, 3]} rotation-y={Math.PI / 2} scale={[6, 5, 1]} />
      </Environment>
    </>
  );
}
