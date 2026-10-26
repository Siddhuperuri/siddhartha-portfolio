import { InViewMount } from "@/components/primitives/in-view-mount";
import { ClosingPlasma } from "@/components/ui/closing-plasma";
import { SectionRegister } from "@/components/primitives/section-register";

const faqs = [
  {
    number: "001",
    question: "How much do projects cost?",
    answer:
      "It depends entirely on scope — anywhere between the price of a nice camera and a small used car. I quote per project once we&#39;ve talked through the actual thing.",
  },
  {
    number: "002",
    question: "When do you invoice?",
    answer:
      "Fifty on day one to hold the calendar, fifty on delivery. Two-round projects invoice once. Longer engagements bill monthly.",
  },
  {
    number: "003",
    question: "Do you take one-off projects?",
    answer:
      "If they make me curious. A single landing page, a small brand, a working prototype for a pitch — all fair game.",
  },
  {
    number: "004",
    question: "When aren't we a fit?",
    answer:
      "If the brief is &quot;make it look like X&quot; without a real problem underneath, we&#39;ll both spend money and leave unhappy. Bring the problem.",
  },
];

/**
 * Reference [ 09 / 09 ] FAQ — the entire page turns bright red. Enormous
 * black headline on the left ("You've got questions. / We've got answers.")
 * and a 2×2 grid of Q&A blocks, each labelled with a small black pill.
 *
 * Directly below: the huge black/white "WHERE DO I SIGN? / HERE ↗↗↗" banner.
 */
export function ContactConversion() {
  return (
    <>
      <section
        aria-labelledby="faq-heading"
        className="relative bg-[var(--red-500)] pb-[var(--space-section)] text-[var(--ink-950)]"
        id="faq"
      >
        <SectionRegister className="text-[rgba(0,0,0,0.7)]" index={9} label="FAQ" />

        <div className="mx-auto grid max-w-[var(--container-wide)] grid-cols-12 gap-x-[var(--grid-gutter)] gap-y-[var(--space-16)] px-[var(--grid-margin)] pt-[calc(var(--space-section)*0.75)]">
          <h2
            className="col-span-12 max-w-[14ch] font-[family-name:var(--font-display)] text-[length:var(--text-5xl)] font-normal leading-[0.95] tracking-[var(--tracking-display)] md:col-span-4 md:text-[length:var(--text-6xl)]"
            id="faq-heading"
          >
            You&#39;ve got questions.
            <br />
            <br />
            I&#39;ve got answers.
          </h2>

          <div className="col-span-12 grid grid-cols-1 gap-x-[var(--grid-gutter)] gap-y-[var(--space-12)] md:col-span-8 md:grid-cols-2">
            {faqs.map((faq) => (
              <div className="flex flex-col" key={faq.number}>
                <span className="inline-flex w-fit items-center bg-[var(--ink-950)] px-2 py-1 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[var(--tracking-eyebrow)] text-[var(--red-500)]">
                  {faq.number}
                </span>
                <h3 className="mt-[var(--space-6)] font-[family-name:var(--font-display)] text-[length:var(--text-2xl)] font-normal leading-[1.1] tracking-[var(--tracking-heading)] md:text-[length:var(--text-3xl)]">
                  {faq.question}
                </h3>
                <p
                  className="mt-[var(--space-4)] max-w-[38ch] font-[family-name:var(--font-sans)] text-[16px] leading-[1.55]"
                  dangerouslySetInnerHTML={{ __html: faq.answer }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing banner — a red plasma field behind the call to action */}
      <a
        aria-label="Send a message"
        className="group relative block overflow-hidden border-y border-[var(--paper-100)] bg-[var(--ink-950)]"
        href="mailto:siddharthaperuri12@gmail.com?subject=Portfolio%20enquiry"
      >
        <InViewMount
          className="absolute inset-0"
          fallback={<div aria-hidden className="h-full w-full bg-[var(--ink-950)]" />}
          staticOk
        >
          <ClosingPlasma
            className="h-full w-full"
            darkColorA="#0a0a0a"
            darkColorB="#b3241a"
            darkColorC="#ff3d2e"
            grain={0.6}
            mouseInfluence={1.2}
            sparkle={0.4}
            vignette={1.2}
          />
        </InViewMount>
        <div className="relative flex min-h-[70svh] items-center justify-between gap-8 px-[var(--grid-margin)] py-[var(--space-16)]">
          <span className="font-[family-name:var(--font-display)] text-[clamp(3rem,11vw,10rem)] font-normal leading-[0.9] tracking-[var(--tracking-display)] text-[var(--paper-100)]">
            Where do
            <br />I sign?
          </span>
          <span aria-hidden className="flex gap-1 text-[var(--paper-100)]">
            <ArrowLg />
            <ArrowLg className="hidden md:block" />
            <ArrowLg className="hidden lg:block" />
          </span>
        </div>
      </a>
    </>
  );
}

function ArrowLg({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden
      className={`size-[clamp(2rem,5vw,4.5rem)] transition-transform duration-[var(--duration-slow)] ease-[var(--ease-emphasized)] group-hover:-translate-y-2 ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      viewBox="0 0 24 24"
    >
      <path d="M4 20 L20 4 M8 4 H20 V16" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
