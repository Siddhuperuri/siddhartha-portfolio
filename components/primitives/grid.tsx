import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

export function Grid({ className, ...props }: ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={cn(
        "grid grid-cols-12 gap-x-[var(--grid-gutter)]",
        className,
      )}
      {...props}
    />
  );
}
