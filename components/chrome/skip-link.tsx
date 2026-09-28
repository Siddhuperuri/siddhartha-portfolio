import { cn } from "@/lib/utils";

type SkipLinkProps = {
  className?: string;
  targetId?: string;
};

export function SkipLink({ className, targetId = "main-content" }: SkipLinkProps) {
  return (
    <a
      className={cn(
        "fixed left-[var(--space-4)] top-[var(--space-4)] z-50 -translate-y-24 rounded-[var(--radius-md)] bg-[var(--surface-inverse)] px-[var(--space-4)] py-[var(--space-3)] font-medium text-[var(--ink-950)] transition-transform duration-[var(--duration-fast)] ease-[var(--ease-standard)] focus:translate-y-0",
        className,
      )}
      href={`#${targetId}`}
    >
      Skip to content
    </a>
  );
}
