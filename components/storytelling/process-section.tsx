import { SectionRegister } from "@/components/primitives/section-register";

const steps = [
  {
    number: "One",
    title: "One Signal",
    body: "I don&#39;t start with features. I start with the sharpest signal in the room — the constraint, the user, the moment the product has to earn its place — and let the rest of the work fall in behind it.",
  },
  {
    number: "Two",
    title: "Two Weeks",
    body: "The first working artefact ships in two weeks. Wireframes, brand direction, a hero flow — whatever proves the idea in the browser. If it takes longer to see, the answer is usually smaller than the plan.",
  },
  {
    number: "Three",
    title: "Three Rounds",
    body: "Three focused rounds of iteration: structure, interaction, polish. Each round is defended by working prototypes and screen captures, not deck slides. You always see the current state of the work.",
  },
];

function RowArrow() {
  return (
    <svg
      aria-hidden
      className="size-3.5 -translate-x-1 text-[var(--paper-400)] opacity-0 transition-[transform,opacity,color] duration-[var(--duration-base)] ease-[var(--ease-standard)] group-hover:translate-x-0 group-hover:text-[var(--red-500)] group-hover:opacity-100"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      viewBox="0 0 12 12"
    >
      <path d="M2 10 L10 2 M4 2 H10 V8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * Reference [ 04 / 09 ] HOW WE WORK — a numbered process, big serif label
 * per row, tight body copy, all in a wide table-like grid.
 *
 * Each row carries a quiet hover state (left accent rule draws in, the
 * numeral shifts to red, the title nudges right, a small arrow resolves
 * in) so the list reads as alive without any scale/shadow theatrics. A
 * one-line bridge closes the section and hands off to Selected Work.
 */
export function ProcessSection() {
  return (
    <section
      aria-labelledby="process-heading"
      className="relative border-t border-[var(--rule-hairline)] pb-[var(--space-section)]"
      id="process"
    >
      <SectionRegister index={4} label="HOW I WORK" />

      <div className="mx-auto max-w-[var(--container-wide)] px-[var(--grid-margin)] pt-[calc(var(--space-section)*0.75)]">
        <div className="grid grid-cols-12 gap-x-[var(--grid-gutter)]">
          <p className="col-span-12 font-[family-name:var(--font-mono)] text-[13px] uppercase tracking-[var(--tracking-eyebrow)] text-[var(--paper-400)] md:col-span-4">
            (My process is as easy as 1 · 2 · 3)
          </p>
          <h2
            className="col-span-12 max-w-[24ch] font-[family-name:var(--font-display)] text-[length:var(--text-4xl)] font-normal leading-[1.02] tracking-[var(--tracking-heading)] text-[var(--paper-100)] md:col-span-8 md:text-[length:var(--text-6xl)]"
            id="process-heading"
          >
            It&#39;s not a deal with the devil.
          </h2>
        </div>

        <ol className="mt-[var(--space-16)] divide-y divide-[var(--rule-hairline)] border-y border-[var(--rule-hairline)]">
          {steps.map((step) => (
            <li
              className="group relative grid grid-cols-12 items-baseline gap-x-[var(--grid-gutter)] py-[var(--space-10)] pl-0 transition-[padding-left] duration-[var(--duration-base)] ease-[var(--ease-standard)] hover:pl-[var(--space-4)]"
              key={step.number}
            >
              <span
                aria-hidden
                className="absolute inset-y-0 left-0 w-px origin-center scale-y-0 bg-[var(--red-500)] transition-transform duration-[var(--duration-base)] ease-[var(--ease-standard)] group-hover:scale-y-100"
              />

              <span className="col-span-12 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[var(--tracking-eyebrow)] text-[var(--paper-400)] transition-colors duration-[var(--duration-base)] ease-[var(--ease-standard)] md:col-span-2 group-hover:text-[var(--red-500)]">
                {step.number}
              </span>
              <h3 className="col-span-12 mt-[var(--space-2)] flex items-center gap-3 font-[family-name:var(--font-display)] text-[length:var(--text-3xl)] font-normal leading-[1.05] tracking-[var(--tracking-heading)] text-[var(--paper-100)] transition-transform duration-[var(--duration-base)] ease-[var(--ease-standard)] md:col-span-4 md:mt-0 md:text-[length:var(--text-4xl)] group-hover:translate-x-1">
                {step.title}
                <RowArrow />
              </h3>
              <p
                className="col-span-12 mt-[var(--space-4)] font-[family-name:var(--font-sans)] text-[16px] leading-[1.55] text-[var(--paper-200)] md:col-span-6 md:mt-0"
                dangerouslySetInnerHTML={{ __html: step.body }}
              />
            </li>
          ))}
        </ol>

        <div className="mt-[var(--space-16)] flex items-center gap-[var(--space-6)]" role="presentation">
          <span aria-hidden className="h-px flex-1 bg-[var(--rule-hairline)]" />
          <p className="shrink-0 font-[family-name:var(--font-display)] text-[length:var(--text-2xl)] italic tracking-[var(--tracking-heading)] text-[var(--paper-300)]">
            Then I make it real.
          </p>
          <span aria-hidden className="h-px flex-1 bg-[var(--rule-hairline)]" />
        </div>
      </div>
    </section>
  );
}
