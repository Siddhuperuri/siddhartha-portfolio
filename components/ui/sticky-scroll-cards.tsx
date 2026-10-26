"use client";

import { useReducedMotion, useScroll, useTransform, motion } from "framer-motion";
import { useRef, type ReactNode, type RefObject } from "react";

import { cn } from "@/lib/utils";

interface StickyScrollCardsProps<T> {
  /** Items to stack, in order. */
  items: T[];
  /** Renders the face of one card. */
  renderCard: (item: T, index: number) => ReactNode;
  /** Stable key for an item. */
  getKey: (item: T, index: number) => string;
  /** Additional CSS classes for the outer container */
  className?: string;
  /** Classes for each card's frame (size, surface, border). */
  cardClassName?: string;
}

const TILT_PATTERN = [-0.6, 0.45, -0.35, 0.7, -0.5];

function StackCard({
  children,
  cardClassName,
  index,
  total,
  container,
  reduceMotion,
}: {
  children: ReactNode;
  cardClassName?: string;
  index: number;
  total: number;
  container: RefObject<HTMLDivElement | null>;
  reduceMotion: boolean;
}) {
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });
  const start = total > 1 ? index / (total + 1) : 0;
  const restingScale = Math.max(0.6, 1 - (total - index - 1) * 0.08);
  const scale = useTransform(
    scrollYProgress,
    [start, 1],
    reduceMotion ? [1, 1] : [1, restingScale],
  );

  return (
    <section className="sticky top-0 grid h-screen place-items-start justify-items-center">
      <motion.div
        className={cn("relative origin-top overflow-hidden", cardClassName)}
        style={{
          scale,
          rotate: reduceMotion ? 0 : TILT_PATTERN[index % TILT_PATTERN.length],
          marginTop: `calc(max(6rem, 14vh) + ${index * 22}px)`,
          willChange: reduceMotion ? "auto" : "transform",
        }}
      >
        {children}
      </motion.div>
    </section>
  );
}

/**
 * Cards that pin to the top as you scroll and shrink back as the next one
 * stacks over them. Scroll smoothing comes from the site-wide Lenis provider,
 * so the stack deliberately does not start a second Lenis instance.
 */
export function StickyScrollCards<T>({
  items,
  renderCard,
  getKey,
  className,
  cardClassName,
}: StickyScrollCardsProps<T>) {
  const container = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion() ?? false;

  return (
    <div
      ref={container}
      className={cn("relative flex w-full flex-col pb-[30vh]", className)}
    >
      {items.map((item, index) => (
        <StackCard
          cardClassName={cardClassName}
          container={container}
          index={index}
          key={getKey(item, index)}
          reduceMotion={reduceMotion}
          total={items.length}
        >
          {renderCard(item, index)}
        </StackCard>
      ))}
    </div>
  );
}
