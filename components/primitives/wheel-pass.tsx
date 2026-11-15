"use client";

import { useEffect, useRef, type ReactNode } from "react";

import { getLenis } from "@/components/providers/lenis-provider";
import { cn } from "@/lib/utils";

type WheelPassProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Keeps the mouse wheel for the page. Some embedded experiments claim the
 * wheel for themselves, which leaves a visitor scrolling the page and the
 * experiment at once. Here the wheel never reaches the children: it is handed
 * straight back to the page scroller. Pointer, touch and keyboard still reach
 * them, and each has a playground page where the wheel is theirs.
 */
export function WheelPass({ children, className }: WheelPassProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const onWheel = (event: WheelEvent) => {
      // Pinch-zoom arrives as ctrl+wheel; leave it to the browser.
      if (event.ctrlKey || event.metaKey) return;
      event.stopPropagation();

      // With smooth scrolling on, the scroller listens on window, which the
      // stopped event no longer reaches, so replay it there. Without it the
      // browser's own scrolling carries on untouched.
      if (!getLenis()) return;
      event.preventDefault();
      window.dispatchEvent(
        new WheelEvent("wheel", {
          cancelable: true,
          deltaMode: event.deltaMode,
          deltaX: event.deltaX,
          deltaY: event.deltaY,
        }),
      );
    };

    element.addEventListener("wheel", onWheel, { capture: true, passive: false });
    return () => element.removeEventListener("wheel", onWheel, { capture: true });
  }, []);

  return (
    <div className={cn("h-full w-full", className)} ref={ref}>
      {children}
    </div>
  );
}
