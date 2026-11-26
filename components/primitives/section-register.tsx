import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * The hairline "[ NN / TT ]  LABEL" bar that opens every section in the
 * reference. Left: counter in mono. Center: uppercase mono label.
 */
type SectionRegisterProps = {
  /** Optional control at the right end of the bar. */
  action?: ReactNode;
  className?: string;
  index: number;
  label: string;
  /** Colour of the centred label; the default suits the dark pages. */
  labelClassName?: string;
  total?: number;
};

export function SectionRegister({
  action,
  className,
  index,
  label,
  labelClassName = "text-[var(--paper-200)]",
  total = 9,
}: SectionRegisterProps) {
  const pad = (n: number) => String(n).padStart(2, "0");
  return (
    <div
      className={cn(
        "mx-auto grid max-w-[var(--container-wide)] grid-cols-3 items-center px-[var(--grid-margin)] pt-[var(--space-4)] font-[family-name:var(--font-mono)] text-[12px] tracking-[var(--tracking-eyebrow)] text-[var(--paper-300)] uppercase",
        className,
      )}
    >
      <span className="text-left">
        [ {pad(index)} / {pad(total)} ]
      </span>
      <span className={cn("text-center", labelClassName)}>{label}</span>
      {action ? (
        <span className="flex justify-end">{action}</span>
      ) : (
        <span aria-hidden />
      )}
    </div>
  );
}

export function SectionDivider({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "mx-auto h-px w-full max-w-[calc(var(--container-wide)-2*var(--grid-margin))] bg-[var(--rule-hairline)]",
        className,
      )}
    />
  );
}
