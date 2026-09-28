import { OutlineButton } from "@/components/primitives/outline-button";
import { ScrollReveal } from "@/components/primitives/scroll-reveal";
import { SectionRegister } from "@/components/primitives/section-register";

/**
 * Reference [ 08 / 09 ] KILL THEM WITH SWEETNESS — a long-form narrative
 * moment: massive centered headline in italic, then a stacked column of
 * paragraphs that reveal word-by-word.
 *
 * The headline gets the full blur+rotate+opacity reveal (six words — cheap).
 * The paragraphs reveal on opacity + rotation only, no blur — see the note
 * in scroll-reveal.tsx on why blur is left off for long-form copy.
 */
export function StorySection() {
  return (
    <section
      aria-labelledby="story-heading"
      className="relative border-t border-[var(--rule-hairline)] pb-[var(--space-section)]"
      id="story"
    >
      <SectionRegister index={8} label="THE LONG GAME" />

      <div className="mx-auto max-w-[var(--container-wide)] px-[var(--grid-margin)] pt-[calc(var(--space-section)*0.5)]">
        <ScrollReveal
          as="h2"
          baseOpacity={0.15}
          baseRotation={4}
          blurStrength={8}
          className="mx-auto max-w-[18ch] text-center font-[family-name:var(--font-display)] text-[length:var(--text-6xl)] font-normal leading-[0.95] tracking-[var(--tracking-display)] text-[var(--paper-100)] md:text-[length:var(--text-7xl)]"
          id="story-heading"
        >
          Ship it before someone else does.
        </ScrollReveal>

        <div className="mx-auto mt-[var(--space-16)] grid max-w-[var(--container-reading)] gap-[var(--space-8)] font-[family-name:var(--font-sans)] text-[17px] leading-[1.7] text-[var(--paper-200)]">
          <ScrollReveal as="p" baseOpacity={0.25} baseRotation={1.5} enableBlur={false}>
            In 1970, an unknown 20-year-old kid taught himself how to design a magazine cover in a country town with no design school for a thousand miles. Nine years later, his hand-set masthead was on every newsstand in the country. He never asked permission. He never waited for the right title. He just kept shipping.
          </ScrollReveal>
          <ScrollReveal as="p" baseOpacity={0.25} baseRotation={1.5} enableBlur={false}>
            That&#39;s the practice I want to run. Not a career built on decks and quarterly plans, but a small, prolific studio-of-one where the work speaks first. Fewer meetings. More screens. Less politics. More typography. If a project needs seventy hours of arguing to start, it needs zero from me.
          </ScrollReveal>
          <ScrollReveal as="p" baseOpacity={0.25} baseRotation={1.5} enableBlur={false}>
            The five case studies below are the current state of that practice. Each one earned its place by turning a real question into something you can actually click on. If you have a real question, that&#39;s all it takes to start.
          </ScrollReveal>
        </div>

        <div className="mt-[var(--space-12)] flex justify-center">
          <OutlineButton href="/contact" size="lg">
            Let&#39;s build one
          </OutlineButton>
        </div>
      </div>
    </section>
  );
}
