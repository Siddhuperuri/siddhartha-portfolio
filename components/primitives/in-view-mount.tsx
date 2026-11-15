"use client";

import {
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
  type ReactNode,
} from "react";

import { useInView } from "@/hooks/use-in-view";
import { useReducedMotionPreference } from "@/hooks/use-reduced-motion";
import { isScrollingFast, subscribeScrollingFast } from "@/lib/scroll-bus";
import { cn } from "@/lib/utils";

type InViewMountProps = {
  children: ReactNode;
  className?: string;
  /** Rendered instead of the children while off-screen or when motion is reduced. */
  fallback?: ReactNode;
  /** How far outside the viewport to mount, as an IntersectionObserver margin. */
  rootMargin?: string;
  /** Keep the children mounted for users who prefer reduced motion. */
  staticOk?: boolean;
  style?: CSSProperties;
};

/**
 * Mounts heavy children (WebGL canvases, shader backdrops) only while they are
 * near the viewport, and unmounts them again when they scroll far away.
 * Browsers cap live WebGL contexts at around 16, and this page already runs a
 * WebGPU hero, so effects have to hand their context back when off-screen.
 *
 * Mounting is also held back while the page is being scrolled quickly. Setting
 * up a canvas and compiling its shaders is tens of milliseconds of main-thread
 * work; doing it for a stage the visitor is flying past buys nothing and shows
 * up as a hitch in the scroll. The stage mounts as soon as they slow down.
 */
export function InViewMount({
  children,
  className,
  fallback = null,
  rootMargin = "30% 0px",
  staticOk = false,
  style,
}: InViewMountProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, rootMargin);
  const reduced = useReducedMotionPreference();

  const scrollingFast = useSyncExternalStore(
    subscribeScrollingFast,
    isScrollingFast,
    () => false,
  );

  const wanted = inView && (staticOk || !reduced);
  const [live, setLive] = useState(false);
  if (!wanted && live) setLive(false);
  else if (wanted && !live && !scrollingFast) setLive(true);

  return (
    <div className={cn("relative", className)} ref={ref} style={style}>
      {live ? children : fallback}
    </div>
  );
}
