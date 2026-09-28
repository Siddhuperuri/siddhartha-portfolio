"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { cn } from "@/lib/utils";

/**
 * Progressive word-by-word text reveal driven by scroll position.
 *
 * As the block enters/passes the middle band of the viewport, each word
 * lights from muted grey → paper white. This is the reference site's
 * signature reading rhythm on About / Story blocks.
 */
type RevealTextProps = {
  as?: "p" | "h2" | "h3" | "div";
  children: string;
  className?: string;
  /** Where in the viewport the reveal starts (0 = top). */
  startAt?: number;
  /** Where the reveal completes (1 = bottom). */
  endAt?: number;
};

export function RevealText({
  as: Tag = "p",
  children,
  className,
  startAt = 0.85,
  endAt = 0.15,
}: RevealTextProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [progress, setProgress] = useState(0);

  const words = useMemo(() => children.split(/(\s+)/), [children]);
  const wordCount = useMemo(
    () => words.filter((w) => w.trim().length > 0).length,
    [words],
  );

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    const compute = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const startY = startAt * vh;
      const endY = endAt * vh;
      const range = startY - endY;
      const p = (startY - rect.top) / range;
      setProgress(Math.max(0, Math.min(1, p)));
    };
    const schedule = () => {
      if (raf) return;
      raf = requestAnimationFrame(compute);
    };
    compute();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [startAt, endAt]);

  const revealedUpTo = Math.floor(progress * wordCount);
  let wordIdx = 0;

  return (
    <Tag
      ref={ref as never}
      className={cn(className)}
    >
      {words.map((token, i) => {
        if (!token.trim()) {
          return <span key={i}>{token}</span>;
        }
        const active = wordIdx <= revealedUpTo;
        wordIdx += 1;
        return (
          <span
            className="transition-colors duration-[var(--duration-slow)] ease-[var(--ease-standard)]"
            key={i}
            style={{ color: active ? "var(--paper-100)" : "var(--paper-500)" }}
          >
            {token}
          </span>
        );
      })}
    </Tag>
  );
}
