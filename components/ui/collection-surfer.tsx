"use client";

import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  MotionValue,
} from "framer-motion";
import React from "react";

export interface CollectionItem {
  id: number;
  image: string;
  title: string;
}

export type CollectionSurferVariant = "magnetic" | "uplift" | "simple";

interface CollectionSurferProps {
  items: CollectionItem[];
  variant?: CollectionSurferVariant;
  heading?: string;
}

export function CollectionSurfer({
  items,
  variant = "magnetic",
  heading,
}: CollectionSurferProps) {
  // 1. Loop Setup: Duplicate items to create a buffer
  // We render the list twice: [Original Set, Duplicate Set]
  // When we scroll past the Original Set, we snap back to the start.
  const duplicatedItems = [...items, ...items];

  // Scroll sensitivity
  const scrollPerItem = 600;

  // The exact scroll distance to complete one full loop of the ORIGINAL items
  const loopDistance = items.length * scrollPerItem;

  const { scrollY } = useScroll();

  const smoothScroll = useSpring(scrollY, {
    mass: 0.1,
    stiffness: 100,
    damping: 20,
  });

  // 2. Modulo Logic:
  // Instead of mapping 0 -> totalScroll, we map to a looped value.
  // loops 0 -> loopDistance -> 0 -> loopDistance...
  const loopedProgress = useTransform(smoothScroll, (value) => value % loopDistance);

  // Step vector
  const stepX = 240;
  const stepY = -84;
  const stepZ = -288;

  // We only move the scene backwards by the length of ONE set of items
  const x = useTransform(loopedProgress, [0, loopDistance], [0, -items.length * stepX]);
  const y = useTransform(loopedProgress, [0, loopDistance], [0, -items.length * stepY]);
  const z = useTransform(loopedProgress, [0, loopDistance], [0, -items.length * stepZ]);

  // Mouse position for magnetic effect
  // Initialize off-screen so no card is scaled by default
  const mouseX = useMotionValue(-10000);
  const mouseY = useMotionValue(-10000);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (variant === "simple") return;
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  const handleMouseLeave = () => {
    if (variant === "simple") return;
    mouseX.set(-10000);
    mouseY.set(-10000);
  };

  return (
    <div className="relative h-full w-full text-[var(--paper-100)]">
      {/* Fixed viewport */}
      <div
        className="perspective-container absolute inset-0 flex items-center justify-center overflow-hidden"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* UI Overlays */}
        <div className="pointer-events-none absolute top-[3vw] left-[3vw] z-50 mix-blend-difference">
          {heading ? (
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(2rem,6vw,5rem)] leading-[0.9] tracking-tighter">
              {" "}
              {heading}{" "}
            </h2>
          ) : null}
        </div>

        <div className="absolute right-[3vw] bottom-[3vw] z-50 font-mono text-xs tracking-wider uppercase opacity-70">
          scroll to surf
        </div>

        {/* 3D Scene */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            perspective: "2000px",
            perspectiveOrigin: "10% 10%",
          }}
        >
          {/* Animated Track */}
          <motion.div
            className="relative h-0 w-0"
            style={{
              x,
              y,
              z,
              transformStyle: "preserve-3d",
            }}
          >
            {duplicatedItems.map((item, i) => (
              <Card
                // We need a unique key because IDs repeat in the duplicated array
                key={`${item.id}-${i}`}
                item={item}
                i={i}
                stepX={stepX}
                stepY={stepY}
                stepZ={stepZ}
                mouseX={mouseX}
                mouseY={mouseY}
                scrollSpring={smoothScroll}
                variant={variant}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function Card({
  item,
  i,
  stepX,
  stepY,
  stepZ,
  mouseX,
  mouseY,
  scrollSpring,
  variant,
}: {
  item: CollectionItem;
  i: number;
  stepX: number;
  stepY: number;
  stepZ: number;
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  scrollSpring: MotionValue<number>;
  variant: CollectionSurferVariant;
}) {
  const ref = React.useRef<HTMLDivElement>(null);

  // Calculate distance from mouse to center of card
  const distance = useTransform(
    [mouseX, mouseY, scrollSpring],
    ([x = 0, y = 0]: number[]) => {
      if (!ref.current || variant === "simple") return 200; // Default large distance
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dist = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));
      return dist;
    },
  );

  // --- Magnetic Variant ---
  // Map distance to scale: Closer = larger
  const targetScale = useTransform(distance, [0, 400], [1.5, 1]);
  const springScale = useSpring(targetScale, {
    mass: 0.5,
    stiffness: 300,
    damping: 20,
  });

  // --- Uplift Variant ---
  // Map distance to Y uplift: Closer = move up (negative Y)
  // We want it to move UP relative to the card's local space or world space?
  // Moving up in Y (negative) usually works.
  const targetUplift = useTransform(distance, [0, 400], [-100, 0]);
  const springUplift = useSpring(targetUplift, {
    mass: 0.5,
    stiffness: 300,
    damping: 20,
  });

  // Combine transforms based on variant
  const transform = useTransform([springScale, springUplift], ([s, u]: number[]) => {
    let scaleValue = 1;
    let upliftValue = 0;

    if (variant === "magnetic") {
      scaleValue = Number(s);
    } else if (variant === "uplift") {
      upliftValue = Number(u);
    }
    // simple variant: scale=1, uplift=0

    // Base position
    const baseX = i * stepX;
    const baseY = i * stepY;
    const baseZ = i * stepZ;

    return `translate3d(${baseX}px, ${baseY + upliftValue}px, ${baseZ}px) rotateY(-50deg) scale(${scaleValue})`;
  });

  return (
    <motion.div
      ref={ref}
      className="group absolute h-[400px] w-[300px] overflow-hidden bg-neutral-900 shadow-2xl transition-colors duration-500 ease-out"
      style={{
        transform,
        transformStyle: "preserve-3d",
      }}
    >
      {/* Index number: Using i % 16 + 1 so the duplicate cards show correct numbers (01-16) */}
      <div className="absolute -top-6 -left-4 font-mono text-xs text-white opacity-50 transition-opacity group-hover:opacity-100">
        {String((i % 16) + 1).padStart(2, "0")}
      </div>

      {/* Image */}
      <div className="relative h-full w-full brightness-75 transition-all duration-300 group-hover:brightness-100">
        <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent" />
    </motion.div>
  );
}
