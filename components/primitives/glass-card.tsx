"use client";

import { createElement } from "react";
import type { ComponentPropsWithoutRef, ElementType, PointerEvent as ReactPointerEvent } from "react";

import { usePointerGlow } from "@/hooks/use-pointer-glow";
import { useReducedMotionPreference } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

type GlassCardTag = "article" | "div" | "span";

type GlassCardProps = ComponentPropsWithoutRef<"div"> & {
  as?: GlassCardTag;
  /** Disable the pointer-tracked highlight for small surfaces (metadata tags). */
  specular?: boolean;
};

/**
 * Floating-control glass surface for project cards and metadata tags.
 * The specular highlight is a pure CSS radial-gradient positioned by
 * --mouse-x/--mouse-y, which pointermove writes directly onto the node
 * (no re-render). At rest the gradient falls back to a fixed position, so
 * the surface never looks dead when untouched. Uses createElement for the
 * polymorphic tag since JSX's LibraryManagedAttributes collapses a
 * variable-typed ElementType to `never` props.
 *
 * Under prefers-reduced-motion the pointer-tracked highlight is dropped
 * entirely — base glass fill/border/blur stays, only the cursor-following
 * layer goes — since a highlight that snaps to the pointer every move is
 * exactly the kind of motion that preference asks to remove.
 */
export function GlassCard({
  as = "div",
  children,
  className,
  onPointerLeave,
  onPointerMove,
  specular = true,
  ...props
}: GlassCardProps) {
  const prefersReducedMotion = useReducedMotionPreference();
  const specularEnabled = specular && !prefersReducedMotion;
  const pointerGlow = usePointerGlow<HTMLDivElement>();

  function handlePointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    if (specularEnabled) {
      pointerGlow.onPointerMove(event);
    }
    onPointerMove?.(event);
  }

  function handlePointerLeave(event: ReactPointerEvent<HTMLDivElement>) {
    if (specularEnabled) {
      pointerGlow.onPointerLeave(event);
    }
    onPointerLeave?.(event);
  }

  return createElement(
    as as ElementType,
    {
      ...props,
      className: cn(
        "relative overflow-hidden rounded-[var(--radius-xl)] border border-[var(--glass-border)] bg-[var(--glass-fill)] backdrop-blur-[var(--glass-blur)]",
        className,
      ),
      onPointerLeave: handlePointerLeave,
      onPointerMove: handlePointerMove,
    },
    specularEnabled
      ? createElement("span", {
          "aria-hidden": true,
          className: "pointer-events-none absolute inset-0",
          key: "glass-card-specular",
          style: {
            background:
              "radial-gradient(circle var(--glass-specular-radius) at var(--mouse-x, 30%) var(--mouse-y, -10%), var(--glass-specular-color), transparent 100%)",
            opacity: "var(--glass-specular-opacity)",
          },
        })
      : null,
    children,
  );
}
