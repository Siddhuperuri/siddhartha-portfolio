"use client";

import { useCallback } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";

/**
 * Writes pointer position onto --mouse-x/--mouse-y as a direct style
 * mutation (no setState, no re-render) so a CSS radial-gradient can track
 * the cursor. The gradient itself does all the visual work.
 */
export function usePointerGlow<T extends HTMLElement>() {
  const handlePointerMove = useCallback((event: ReactPointerEvent<T>) => {
    if (event.pointerType !== "mouse") {
      return;
    }

    const bounds = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--mouse-x", `${event.clientX - bounds.left}px`);
    event.currentTarget.style.setProperty("--mouse-y", `${event.clientY - bounds.top}px`);
  }, []);

  const handlePointerLeave = useCallback((event: ReactPointerEvent<T>) => {
    event.currentTarget.style.removeProperty("--mouse-x");
    event.currentTarget.style.removeProperty("--mouse-y");
  }, []);

  return { onPointerLeave: handlePointerLeave, onPointerMove: handlePointerMove };
}
