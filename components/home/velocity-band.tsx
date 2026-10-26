import { ScrollBasedVelocity } from "@/components/ui/scroll-based-velocity";

/**
 * Replaces the static skills marquee: two opposing rows of type that speed up
 * and flip direction with scroll velocity.
 */
export function VelocityBand() {
  return (
    <section
      aria-label="Disciplines"
      className="relative overflow-hidden border-y border-[var(--rule-hairline)] bg-[var(--ink-950)] py-[var(--space-8)]"
    >
      <ScrollBasedVelocity
        className="font-[family-name:var(--font-display)] text-[clamp(3rem,9vw,8rem)] leading-[0.95] font-normal tracking-[var(--tracking-display)] text-[var(--paper-100)] uppercase"
        default_velocity={2}
        text="Design ✱ Build ✱ Ship ✱ "
      />
    </section>
  );
}
