import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

/**
 * Heavier glass treatment for callouts meant to float above content
 * (contact card, experiment callouts) — controls float, content leads.
 * Reserve this for at most one such moment per viewport.
 */
export function GlassPanel({ className, ...props }: ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={cn(
        "rounded-[var(--radius-xl)] border border-[var(--glass-border-panel)] bg-[var(--glass-fill-panel)] shadow-[var(--shadow-3)] backdrop-blur-[var(--glass-blur-panel)]",
        className,
      )}
      {...props}
    />
  );
}
