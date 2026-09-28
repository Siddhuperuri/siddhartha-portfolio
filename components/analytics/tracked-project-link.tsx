"use client";

import Link from "next/link";
import type { ReactNode } from "react";

import { trackConversionEvent } from "@/components/analytics/analytics-provider";

type TrackedProjectLinkProps = {
  ariaLabel: string;
  children: ReactNode;
  className: string;
  href: string;
  onBlur?: () => void;
  onFocus?: () => void;
  project: string;
};

export function TrackedProjectLink({
  ariaLabel,
  children,
  className,
  href,
  onBlur,
  onFocus,
  project,
}: TrackedProjectLinkProps) {
  return (
    <Link
      aria-label={ariaLabel}
      className={className}
      href={href}
      onBlur={onBlur}
      onClick={() => trackConversionEvent("project_opened", { project })}
      onFocus={onFocus}
    >
      {children}
    </Link>
  );
}
