import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

type ContainerSize = "content" | "reading" | "wide";

type ContainerProps = ComponentPropsWithoutRef<"div"> & {
  size?: ContainerSize;
};

const sizeClassNames: Record<ContainerSize, string> = {
  content: "max-w-[var(--container-content)]",
  reading: "max-w-[var(--container-reading)]",
  wide: "max-w-[var(--container-wide)]",
};

export function Container({
  className,
  size = "content",
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-[var(--grid-margin)]",
        sizeClassNames[size],
        className,
      )}
      {...props}
    />
  );
}
