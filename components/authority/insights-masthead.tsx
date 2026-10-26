import Link from "next/link";

import { InViewMount } from "@/components/primitives/in-view-mount";
import { SectionRegister } from "@/components/primitives/section-register";
import { GrainGradient } from "@/components/ui/grain-gradient";
import { KineticTextReveal } from "@/components/ui/kinetic-text-reveal";
import { NewsletterBookshelf } from "@/components/ui/newsletter-bookshelf";
import { authorityArticles } from "@/content/authority";

const books = authorityArticles.map((article, index) => ({
  color: index % 2 === 0 ? "#ff3d2e" : "#f5f5f5",
  date: article.readingTime.toUpperCase(),
  foil: index % 2 === 0 ? "#0a0a0a" : "#ff3d2e",
  href: `/insights/${article.slug}`,
  id: article.slug,
  subtitle: article.description,
  title: article.title,
}));

/**
 * /insights masthead: a grain gradient behind the heading, the written pieces
 * as a shelf of books you can pick up, and the same pieces as a plain index
 * for anyone not using a pointer.
 */
export function InsightsMasthead() {
  return (
    <>
      <section
        aria-labelledby="notes-heading"
        className="relative isolate overflow-hidden border-b border-[var(--rule-hairline)]"
        id="insights"
      >
        <InViewMount
          className="absolute inset-0 -z-10 opacity-55"
          fallback={<div aria-hidden className="h-full w-full bg-[var(--ink-900)]" />}
          staticOk
        >
          <GrainGradient
            className="h-full w-full"
            colorDark="#0a0a0a"
            colorLight="#ff3d2e"
            colorMid="#7a1810"
            grain={0.45}
            speed={0.6}
          />
        </InViewMount>
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-gradient-to-b from-[rgba(10,10,10,0.25)] via-[rgba(10,10,10,0.55)] to-[var(--ink-950)]"
        />

        <SectionRegister index={1} label="INSIGHTS" total={2} />
        <div className="mx-auto max-w-[var(--container-wide)] px-[var(--grid-margin)] pt-[calc(var(--space-section)*0.7)] pb-[var(--space-24)]">
          <h1
            className="font-[family-name:var(--font-display)] text-[clamp(3.5rem,11vw,10rem)] leading-[0.92] font-normal tracking-[var(--tracking-display)] text-[var(--paper-100)]"
            id="notes-heading"
          >
            <KineticTextReveal
              autoPlay
              splitBy="words"
              stagger={0.07}
              text="Written from the work."
            />
          </h1>
          <p className="mt-[var(--space-8)] max-w-[44ch] font-[family-name:var(--font-sans)] text-[17px] leading-[1.55] text-[var(--paper-200)]">
            Short essays gathered while making the projects: the thinking, not the
            marketing.
          </p>
        </div>
      </section>

      <section
        aria-label="Notes shelf"
        className="relative border-b border-[var(--rule-hairline)]"
      >
        <SectionRegister index={2} label="SHELF" total={2} />
        <InViewMount
          className="mt-[var(--space-6)] h-[70svh] min-h-[28rem] w-full"
          fallback={<div aria-hidden className="h-full w-full bg-[var(--ink-900)]" />}
        >
          <NewsletterBookshelf
            brand="SIDDHARTHA"
            className="h-full w-full"
            height="100%"
            items={books}
          />
        </InViewMount>

        <ol className="mx-auto max-w-[var(--container-wide)] border-t border-[var(--rule-default)] px-[var(--grid-margin)]">
          {authorityArticles.map((article, index) => (
            <li className="border-b border-[var(--rule-default)]" key={article.slug}>
              <Link
                className="group grid grid-cols-12 items-baseline gap-x-[var(--grid-gutter)] py-[var(--space-8)] transition-colors hover:bg-[rgba(255,255,255,0.03)]"
                href={`/insights/${article.slug}`}
              >
                <span className="col-span-2 font-[family-name:var(--font-mono)] text-[11px] tracking-[var(--tracking-eyebrow)] text-[var(--paper-400)] uppercase md:col-span-1">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="col-span-10 md:col-span-11">
                  <span className="block font-[family-name:var(--font-mono)] text-[10px] tracking-[var(--tracking-eyebrow)] text-[var(--paper-400)] uppercase">
                    {article.topic} · {article.readingTime}
                  </span>
                  <span className="mt-[var(--space-3)] block max-w-[24ch] font-[family-name:var(--font-display)] text-[length:var(--text-3xl)] leading-[1.05] tracking-[var(--tracking-heading)] text-[var(--paper-100)] transition-colors group-hover:text-[var(--red-500)] md:text-[length:var(--text-4xl)]">
                    {article.title}
                  </span>
                  <span className="mt-[var(--space-4)] block max-w-[42rem] leading-[var(--leading-body)] text-[var(--paper-200)]">
                    {article.description}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
