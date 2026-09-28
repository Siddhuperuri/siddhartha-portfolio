"use client";

import { DepthText } from "@/components/primitives/depth-text";
import { useViewportTier } from "@/hooks/use-viewport-tier";
import type { ViewportTier } from "@/hooks/use-viewport-tier";

function splitIntoDepthSegments(text: string): string[] {
  return text.split(/(\s+)/).filter((segment) => segment.length > 0);
}

type PerspectiveTier = {
  autoOrbit: boolean;
  depth: number;
  layers: number;
  perspective: number;
  pointerTracking: boolean;
  tilt: number;
};

// Desktop follows the supplied reference config (depth 5, tilt 12,
// perspective 450, pointerTracking on, autoOrbit off) closely — layers is
// trimmed from the reference's 30 to 20: layer count scales DOM element
// count directly (one instance per word × N layers, since DepthText forces
// nowrap and needs one instance per word to keep normal line wrapping),
// and that element count — not pointer tracking itself — was the actual
// driver of a real lag regression the first time this shipped at similarly
// high layer counts. Tablet/mobile scale further down and drop pointer
// tracking, since each word is its own listener + rAF loop.
const perspectiveTiers: Record<ViewportTier, PerspectiveTier> = {
  desktop: { autoOrbit: false, depth: 5, layers: 20, perspective: 450, pointerTracking: true, tilt: 12 },
  mobile: { autoOrbit: false, depth: 1.5, layers: 6, perspective: 450, pointerTracking: false, tilt: 4 },
  tablet: { autoOrbit: false, depth: 3, layers: 12, perspective: 450, pointerTracking: true, tilt: 8 },
};

type PerspectiveHeadingProps = {
  children: string;
  className?: string;
  /** Trailing substring of `children` that keeps the 3D depth treatment; everything before it renders as flat text. */
  depthPhrase?: string;
};

/**
 * The "Design is how I give complex ideas a clear point of view." heading:
 * word-level DepthText instances (necessary so normal responsive line
 * wrapping still works — DepthText forces white-space: nowrap per
 * instance) inheriting font-size/weight/line-height/letter-spacing from
 * the site's own heading markup, tuned toward the supplied reference
 * usage but with palette colours in place of the demo's purple. Only
 * `depthPhrase` gets the depth effect; the rest of the sentence is plain
 * text in the same face colour.
 */
export function PerspectiveHeading({
  children,
  className,
  depthPhrase = "point of view.",
}: PerspectiveHeadingProps) {
  const tier = perspectiveTiers[useViewportTier()];
  const depthStart = children.indexOf(depthPhrase);
  const plainText = depthStart >= 0 ? children.slice(0, depthStart) : children;
  const depthText = depthStart >= 0 ? children.slice(depthStart) : "";

  return (
    <p className={className}>
      {plainText ? <span className="text-[var(--text-primary)]">{plainText}</span> : null}
      {splitIntoDepthSegments(depthText).map((segment, index) =>
        /^\s+$/.test(segment) ? (
          segment
        ) : (
          <DepthText
            depthColor="var(--ink-800)"
            faceColor="var(--text-primary)"
            fontSize="inherit"
            fontWeight="inherit"
            key={`${segment}-${index}`}
            shadow
            smoothing={0.22}
            text={segment}
            {...tier}
          />
        ),
      )}
    </p>
  );
}
