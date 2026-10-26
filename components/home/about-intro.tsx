import { OutlineButton } from "@/components/primitives/outline-button";
import { SectionRegister } from "@/components/primitives/section-register";
import { AnnotatedText } from "@/components/ui/annotated-text";
import { FlippingWordSwap } from "@/components/ui/flipping-word-swap";
import { KineticTextReveal } from "@/components/ui/kinetic-text-reveal";
import { TextMorph } from "@/components/ui/text-morph";

/**
 * [ 02 / 10 ] ABOUT — the statement reveals line by line, the two things I do
 * are hand-marked, and the role swaps between designer and builder on hover.
 */
export function AboutIntro() {
  return (
    <section
      aria-labelledby="about-heading"
      className="relative border-t border-[var(--rule-hairline)] pb-[var(--space-section)]"
      id="about"
    >
      <SectionRegister index={2} label="ABOUT" />

      <div className="mx-auto grid max-w-[var(--container-wide)] grid-cols-12 gap-x-[var(--grid-gutter)] gap-y-[var(--space-16)] px-[var(--grid-margin)] pt-[calc(var(--space-section)*0.75)]">
        <div className="col-span-12 md:col-span-10 md:col-start-2">
          <h2 className="sr-only" id="about-heading">
            About Siddhartha
          </h2>

          <KineticTextReveal
            blur
            className="block font-[family-name:var(--font-display)] text-[length:var(--text-4xl)] leading-[1.05] font-normal tracking-[var(--tracking-heading)] text-[var(--paper-100)] md:text-[length:var(--text-6xl)]"
            splitBy="words"
            stagger={0.035}
            text="Work in design, development and visual storytelling, built around thoughtful interfaces."
          />
        </div>

        <div className="col-span-12 grid gap-y-[var(--space-10)] md:col-span-10 md:col-start-2 md:grid-cols-2 md:gap-x-[var(--grid-gutter)]">
          <p className="max-w-[44ch] font-[family-name:var(--font-sans)] text-[17px] leading-[1.6] text-[var(--paper-200)]">
            I turn playful, high-concept ideas into{" "}
            <AnnotatedText color="text-[var(--red-500)]" variant="underline">
              clear, usable
            </AnnotatedText>{" "}
            digital experiences: interfaces that feel obvious before they try to feel
            clever, and prototypes you can{" "}
            <AnnotatedText color="text-[var(--red-500)]" variant="circle">
              actually click
            </AnnotatedText>
            .
          </p>

          <div className="flex flex-col gap-[var(--space-6)] font-[family-name:var(--font-display)] text-[length:var(--text-3xl)] leading-[1.05] tracking-[var(--tracking-heading)] text-[var(--paper-100)] md:text-[length:var(--text-4xl)]">
            <p className="flex flex-wrap items-baseline gap-x-[0.4em]">
              <span className="text-[var(--paper-400)]">I&rsquo;m a</span>
              <FlippingWordSwap
                className="text-[var(--paper-100)]"
                toClassName="text-[var(--red-500)]"
                word1="designer"
                word2="builder"
              />
            </p>
            <p className="flex flex-wrap items-baseline gap-x-[0.4em] text-[var(--paper-400)]">
              <span>currently shipping</span>
              <TextMorph
                className="text-[var(--paper-100)]"
                words={["interfaces", "identities", "prototypes", "systems"]}
              />
            </p>
          </div>
        </div>

        <div className="col-span-12 md:col-span-10 md:col-start-2">
          <OutlineButton href="/about">A longer read</OutlineButton>
        </div>
      </div>
    </section>
  );
}
