import { cn } from "@/lib/utils";

/**
 * The hairline "[ NN / TT ]  LABEL" bar that opens every section in the
 * reference. Left: counter in mono. Center: uppercase mono label.
 */
type SectionRegisterProps = {
  className?: string;
  index: number;
  label: string;
  total?: number;
};

export function SectionRegister({
  className,
  index,
  label,
  total = 9,
}: SectionRegisterProps) {
  const pad = (n: number) => String(n).padStart(2, "0");
  return (
    <div
      className={cn(
        "mx-auto grid max-w-[var(--container-wide)] grid-cols-3 items-center px-[var(--grid-margin)] pt-[var(--space-4)] font-[family-name:var(--font-mono)] text-[12px] uppercase tracking-[var(--tracking-eyebrow)] text-[var(--paper-300)]",
        className,
      )}
    >
      <span className="text-left">[ {pad(index)} / {pad(total)} ]</span>
      <span className="text-center text-[var(--paper-200)]">{label}</span>
      <span aria-hidden />
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
