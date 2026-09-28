import { OutlineButton } from "@/components/primitives/outline-button";
import { RevealText } from "@/components/primitives/reveal-text";
import { SectionRegister } from "@/components/primitives/section-register";

/**
 * Reference [ 02 / 09 ] ABOUT — an eyebrow + a short left-aligned paragraph
 * that reveals word-by-word, a small red tag, and one outline CTA.
 */
export function AboutSection() {
  return (
    <section
      aria-labelledby="about-heading"
      className="relative border-t border-[var(--rule-hairline)] pb-[var(--space-section)]"
      id="about"
    >
      <SectionRegister index={2} label="ABOUT" />

      <div className="mx-auto grid max-w-[var(--container-wide)] grid-cols-12 gap-x-[var(--grid-gutter)] px-[var(--grid-margin)] pt-[calc(var(--space-section)*0.75)]">
        <div className="col-span-12 flex flex-col md:col-span-9 md:col-start-2">
          <span className="inline-flex w-fit items-center bg-[var(--red-500)] px-2 py-1 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[var(--tracking-eyebrow)] text-[var(--ink-950)]">
            About
          </span>

          <RevealText
            as="h2"
            className="mt-[var(--space-8)] max-w-[26ch] font-[family-name:var(--font-display)] text-[length:var(--text-4xl)] font-normal leading-[1.05] tracking-[var(--tracking-heading)] md:text-[length:var(--text-5xl)]"
          >
            A portfolio showcasing Siddhartha&rsquo;s work in design, development, and visual storytelling — built around thoughtful interfaces, strong aesthetics, and meaningful digital experiences.
          </RevealText>

          <h2 className="sr-only" id="about-heading">
            About Siddhartha
          </h2>

          <div className="mt-[var(--space-10)]">
            <OutlineButton href="/about">A longer read</OutlineButton>
          </div>
        </div>
      </div>
    </section>
  );
}
