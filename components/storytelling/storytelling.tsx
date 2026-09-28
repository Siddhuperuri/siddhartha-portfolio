import { ArrowUpRight } from "lucide-react";

import {
  capabilities,
  processSteps,
  profile,
  skillGroups,
  timeline,
} from "@/content/profile";

const contributionAreas = [
  "Product & web experience concepts",
  "Interface structure and high-fidelity UI",
  "Brand foundations and visual systems",
  "Interactive prototypes and front-end builds",
] as const;

/**
 * The middle of the homepage — everything the visitor learns about the
 * designer between the work index and the closing correspondence.
 *
 * Retired: the WebGL capabilities network background, ParticleText
 * eyebrow, Shuffle heading animation, DepthText perspective heading,
 * GlassPanel manifesto card, three-across skills grid, and every
 * "01 —" prefix rewritten as "§". The layout is now a long-form editorial
 * essay: an opening spread, a numbered capabilities register, a
 * side-margin colophon of tools, a numbered process list, a pull-quote,
 * a background note, and a contribution index. All type. No decoration.
 */
export function Storytelling() {
  return (
    <>
      {/* SECTION II — Perspective (opening spread) */}
      <section
        aria-labelledby="perspective-heading"
        className="relative border-t border-[var(--rule-hairline)] py-[var(--space-section)]"
        id="about"
      >
        <div className="mx-auto max-w-[var(--container-wide)] px-[var(--grid-margin)]">
          <div className="grid grid-cols-12 gap-x-[var(--grid-gutter)]">
            <p className="col-span-12 font-[family-name:var(--font-mono)] text-[var(--text-2xs)] uppercase tracking-[var(--tracking-eyebrow)] text-[var(--text-quaternary)] lg:col-span-3">
              <span className="text-[var(--accent)]">§ II</span> &nbsp;— Perspective
            </p>
            <div className="col-span-12 mt-[var(--space-8)] lg:col-span-9 lg:mt-0">
              <p
                className="font-[family-name:var(--font-display)] text-[length:var(--text-4xl)] font-normal leading-[var(--leading-heading)] tracking-[var(--tracking-heading)] text-[var(--text-primary)] md:text-[length:var(--text-6xl)]"
                id="perspective-heading"
              >
                Design, for me, is the quiet act of{" "}
                <span className="italic text-[var(--accent)]">giving a complicated idea a clear point of view</span>{" "}
                — and then handing it back, working, so someone else can touch it.
              </p>
              <div className="mt-[var(--space-12)] grid grid-cols-12 gap-x-[var(--grid-gutter)]">
                <p className="col-span-12 max-w-[42rem] text-[length:var(--text-lg)] leading-[var(--leading-body)] text-[var(--text-secondary)] md:col-span-8">
                  I am {profile.name}, a computer-science undergraduate building
                  a practice around clarity, visual character, and interaction.
                  My best work sits where a thoughtful interface meets a
                  working prototype — and where the two arrive at the same
                  answer together.
                </p>
                <p className="col-span-12 mt-[var(--space-6)] font-[family-name:var(--font-mono)] text-[var(--text-2xs)] uppercase tracking-[var(--tracking-eyebrow)] text-[var(--text-quaternary)] md:col-span-4 md:mt-0 md:text-right">
                  Vijayawada, India
                  <br />
                  <span className="text-[var(--text-tertiary)] normal-case tracking-normal font-[family-name:var(--font-sans)] text-[length:var(--text-sm)]">
                    Sri Vasavi Engineering College · B.Tech CSE
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION III — Capabilities (numbered register) */}
      <section
        aria-labelledby="capabilities-heading"
        className="relative border-t border-[var(--rule-hairline)] py-[var(--space-section)]"
      >
        <div className="mx-auto max-w-[var(--container-wide)] px-[var(--grid-margin)]">
          <div className="grid grid-cols-12 gap-x-[var(--grid-gutter)]">
            <div className="col-span-12 lg:col-span-3">
              <p className="font-[family-name:var(--font-mono)] text-[var(--text-2xs)] uppercase tracking-[var(--tracking-eyebrow)] text-[var(--text-quaternary)]">
                <span className="text-[var(--accent)]">§ III</span> &nbsp;— Capabilities
              </p>
              <p className="mt-[var(--space-4)] max-w-[16rem] text-[length:var(--text-sm)] leading-[var(--leading-body)] text-[var(--text-tertiary)]">
                A focused toolkit for shaping a product from its first idea
                to something tangible.
              </p>
            </div>
            <ol
              aria-labelledby="capabilities-heading"
              className="col-span-12 mt-[var(--space-10)] border-t border-[var(--rule-default)] lg:col-span-9 lg:mt-0"
            >
              <h3 className="sr-only" id="capabilities-heading">
                Capabilities
              </h3>
              {capabilities.map((capability, i) => (
                <li
                  className="grid grid-cols-12 gap-x-[var(--grid-gutter)] border-b border-[var(--rule-default)] py-[var(--space-10)]"
                  key={capability.index}
                >
                  <span className="col-span-2 font-[family-name:var(--font-mono)] text-[var(--text-2xs)] uppercase tracking-[var(--tracking-eyebrow)] text-[var(--text-quaternary)] md:col-span-1">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h4 className="col-span-10 font-[family-name:var(--font-display)] text-[length:var(--text-3xl)] font-normal leading-[var(--leading-heading)] tracking-[var(--tracking-heading)] text-[var(--text-primary)] md:col-span-5 md:text-[length:var(--text-4xl)]">
                    {capability.title}
                  </h4>
                  <p className="col-span-12 mt-[var(--space-4)] max-w-[36ch] text-[length:var(--text-base)] leading-[var(--leading-body)] text-[var(--text-secondary)] md:col-span-6 md:mt-0">
                    {capability.summary}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* SECTION IV — Craft (skills as marginalia, not cards) */}
      <section
        aria-labelledby="craft-heading"
        className="relative border-t border-[var(--rule-hairline)] py-[var(--space-section)]"
        id="skills"
      >
        <div className="mx-auto max-w-[var(--container-wide)] px-[var(--grid-margin)]">
          <div className="grid grid-cols-12 gap-x-[var(--grid-gutter)]">
            <div className="col-span-12 lg:col-span-4">
              <p className="font-[family-name:var(--font-mono)] text-[var(--text-2xs)] uppercase tracking-[var(--tracking-eyebrow)] text-[var(--text-quaternary)]">
                <span className="text-[var(--accent)]">§ IV</span> &nbsp;— Craft
              </p>
              <h2
                className="mt-[var(--space-5)] max-w-[16ch] font-[family-name:var(--font-display)] text-[length:var(--text-3xl)] font-normal leading-[var(--leading-heading)] tracking-[var(--tracking-heading)] text-[var(--text-primary)] md:text-[length:var(--text-4xl)]"
                id="craft-heading"
              >
                A designer&rsquo;s eye,{" "}
                <span className="italic text-[var(--accent)]">a builder&rsquo;s curiosity.</span>
              </h2>
            </div>
            <div className="col-span-12 mt-[var(--space-10)] space-y-[var(--space-10)] lg:col-span-8 lg:mt-0">
              {skillGroups.map((group) => (
                <article
                  className="grid grid-cols-12 gap-x-[var(--grid-gutter)] border-t border-[var(--rule-hairline)] pt-[var(--space-6)]"
                  key={group.label}
                >
                  <h3 className="col-span-12 font-[family-name:var(--font-mono)] text-[var(--text-2xs)] uppercase tracking-[var(--tracking-eyebrow)] text-[var(--accent)] md:col-span-3">
                    {group.label}
                  </h3>
                  <ul className="col-span-12 mt-[var(--space-3)] flex flex-wrap gap-x-[var(--space-6)] gap-y-[var(--space-2)] font-[family-name:var(--font-display)] text-[length:var(--text-xl)] leading-[var(--leading-body)] text-[var(--text-primary)] md:col-span-9 md:mt-0 md:text-[length:var(--text-2xl)]">
                    {group.skills.map((skill, i) => (
                      <li className="inline-flex items-baseline gap-[var(--space-2)]" key={skill}>
                        {i > 0 && (
                          <span aria-hidden className="text-[var(--text-quaternary)]">
                            /
                          </span>
                        )}
                        <span>{skill}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION V — Process (numbered list, not step-cards) */}
      <section
        aria-labelledby="process-heading"
        className="relative border-t border-[var(--rule-hairline)] py-[var(--space-section)]"
        id="process"
      >
        <div className="mx-auto max-w-[var(--container-wide)] px-[var(--grid-margin)]">
          <div className="grid grid-cols-12 gap-x-[var(--grid-gutter)]">
            <div className="col-span-12 lg:col-span-4">
              <p className="font-[family-name:var(--font-mono)] text-[var(--text-2xs)] uppercase tracking-[var(--tracking-eyebrow)] text-[var(--text-quaternary)]">
                <span className="text-[var(--accent)]">§ V</span> &nbsp;— Process
              </p>
              <h2
                className="mt-[var(--space-5)] max-w-[14ch] font-[family-name:var(--font-display)] text-[length:var(--text-4xl)] font-normal leading-[var(--leading-heading)] tracking-[var(--tracking-heading)] text-[var(--text-primary)] md:text-[length:var(--text-5xl)]"
                id="process-heading"
              >
                Build a point of view. Then{" "}
                <span className="italic text-[var(--accent)]">make it useful.</span>
              </h2>
            </div>
            <ol className="col-span-12 mt-[var(--space-10)] lg:col-span-8 lg:mt-0">
              {processSteps.map((step, i) => (
                <li
                  className="grid grid-cols-12 gap-x-[var(--grid-gutter)] border-t border-[var(--rule-default)] py-[var(--space-8)] last:border-b"
                  key={step.number}
                >
                  <span className="col-span-2 font-[family-name:var(--font-mono)] text-[var(--text-2xs)] uppercase tracking-[var(--tracking-eyebrow)] text-[var(--text-quaternary)] md:col-span-1">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="col-span-10 font-[family-name:var(--font-display)] text-[length:var(--text-2xl)] font-normal leading-[var(--leading-heading)] tracking-[var(--tracking-heading)] text-[var(--text-primary)] md:col-span-4 md:text-[length:var(--text-3xl)]">
                    {step.title}
                  </h3>
                  <p className="col-span-12 mt-[var(--space-3)] max-w-[38ch] leading-[var(--leading-body)] text-[var(--text-secondary)] md:col-span-7 md:mt-0">
                    {step.detail}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Pull-quote — a printed manifesto note, no glass panel */}
      <section
        aria-label="On trust"
        className="relative border-t border-[var(--rule-hairline)] py-[var(--space-section)]"
      >
        <div className="mx-auto max-w-[var(--container-content)] px-[var(--grid-margin)]">
          <figure className="relative">
            <span
              aria-hidden
              className="pointer-events-none absolute -left-[var(--space-8)] -top-[var(--space-8)] font-[family-name:var(--font-display)] text-[8rem] leading-none text-[color-mix(in_oklch,var(--accent)_28%,transparent)] md:-left-[var(--space-12)] md:-top-[var(--space-12)] md:text-[12rem]"
            >
              &ldquo;
            </span>
            <blockquote className="relative">
              <p className="font-[family-name:var(--font-display)] text-[length:var(--text-4xl)] leading-[var(--leading-heading)] tracking-[var(--tracking-heading)] text-[var(--text-primary)] md:text-[length:var(--text-6xl)]">
                Trust comes from{" "}
                <span className="italic text-[var(--accent)]">visible thinking</span>
                <span className="text-[var(--text-tertiary)]"> — </span>
                not inflated claims.
              </p>
            </blockquote>
            <figcaption className="mt-[var(--space-8)] max-w-[46rem] text-[length:var(--text-lg)] leading-[var(--leading-body)] text-[var(--text-secondary)]">
              Each project on this site names the problem, my contribution,
              the choices made, and what I&rsquo;d test or improve next.
              That&rsquo;s how I want collaboration to feel: open, curious,
              and accountable.
            </figcaption>
          </figure>
        </div>
      </section>

      {/* SECTION VI — Background (timeline as bibliographic entries) */}
      <section
        aria-labelledby="background-heading"
        className="relative border-t border-[var(--rule-hairline)] py-[var(--space-section)]"
        id="experience"
      >
        <div className="mx-auto max-w-[var(--container-wide)] px-[var(--grid-margin)]">
          <div className="grid grid-cols-12 gap-x-[var(--grid-gutter)]">
            <div className="col-span-12 lg:col-span-3">
              <p className="font-[family-name:var(--font-mono)] text-[var(--text-2xs)] uppercase tracking-[var(--tracking-eyebrow)] text-[var(--text-quaternary)]">
                <span className="text-[var(--accent)]">§ VI</span> &nbsp;— Foundation
              </p>
              <h2
                className="mt-[var(--space-5)] max-w-[14ch] font-[family-name:var(--font-display)] text-[length:var(--text-3xl)] font-normal leading-[var(--leading-heading)] tracking-[var(--tracking-heading)] text-[var(--text-primary)]"
                id="background-heading"
              >
                Learning in public.
              </h2>
            </div>
            <div className="col-span-12 mt-[var(--space-10)] lg:col-span-9 lg:mt-0">
              {timeline.map((entry) => (
                <article
                  className="grid grid-cols-12 gap-x-[var(--grid-gutter)] border-t border-[var(--rule-default)] py-[var(--space-8)] last:border-b"
                  key={entry.title}
                >
                  <p className="col-span-12 font-[family-name:var(--font-mono)] text-[var(--text-2xs)] uppercase tracking-[var(--tracking-eyebrow)] text-[var(--text-tertiary)] md:col-span-3">
                    {entry.period}
                  </p>
                  <div className="col-span-12 mt-[var(--space-3)] md:col-span-9 md:mt-0">
                    <h3 className="font-[family-name:var(--font-display)] text-[length:var(--text-2xl)] font-normal leading-[var(--leading-heading)] tracking-[var(--tracking-heading)] text-[var(--text-primary)] md:text-[length:var(--text-3xl)]">
                      {entry.title}
                    </h3>
                    <p className="mt-[var(--space-3)] max-w-[42rem] leading-[var(--leading-body)] text-[var(--text-secondary)]">
                      {entry.detail}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION VII — Where I can contribute */}
      <section
        aria-labelledby="collaboration-heading"
        className="relative border-t border-[var(--rule-hairline)] py-[var(--space-section)]"
        id="services"
      >
        <div className="mx-auto max-w-[var(--container-wide)] px-[var(--grid-margin)]">
          <div className="grid grid-cols-12 gap-x-[var(--grid-gutter)]">
            <div className="col-span-12 lg:col-span-4">
              <p className="font-[family-name:var(--font-mono)] text-[var(--text-2xs)] uppercase tracking-[var(--tracking-eyebrow)] text-[var(--text-quaternary)]">
                <span className="text-[var(--accent)]">§ VII</span> &nbsp;— Collaboration
              </p>
              <h2
                className="mt-[var(--space-5)] max-w-[14ch] font-[family-name:var(--font-display)] text-[length:var(--text-3xl)] font-normal leading-[var(--leading-heading)] tracking-[var(--tracking-heading)] text-[var(--text-primary)] md:text-[length:var(--text-4xl)]"
                id="collaboration-heading"
              >
                Where I can{" "}
                <span className="italic text-[var(--accent)]">contribute.</span>
              </h2>
            </div>
            <ul className="col-span-12 mt-[var(--space-10)] lg:col-span-8 lg:mt-0">
              {contributionAreas.map((area, i) => (
                <li
                  className="grid grid-cols-12 items-baseline gap-x-[var(--grid-gutter)] border-t border-[var(--rule-default)] py-[var(--space-6)] last:border-b"
                  key={area}
                >
                  <span className="col-span-2 font-[family-name:var(--font-mono)] text-[var(--text-2xs)] uppercase tracking-[var(--tracking-eyebrow)] text-[var(--text-quaternary)] md:col-span-1">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="col-span-9 font-[family-name:var(--font-display)] text-[length:var(--text-xl)] leading-[var(--leading-heading)] text-[var(--text-primary)] md:col-span-9 md:text-[length:var(--text-2xl)]">
                    {area}
                  </p>
                  <ArrowUpRight
                    aria-hidden
                    className="col-span-1 justify-self-end size-[var(--icon-sm)] text-[var(--text-quaternary)] md:col-span-2"
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
