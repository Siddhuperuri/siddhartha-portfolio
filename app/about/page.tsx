import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";

import { SkipLink } from "@/components/chrome/skip-link";
import { Container } from "@/components/primitives/container";
import { Grid } from "@/components/primitives/grid";
import { Section } from "@/components/primitives/section";
import { JsonLd } from "@/components/seo/json-ld";
import { contactDetails } from "@/content/contact";
import { capabilities, processSteps, profile, skillGroups, timeline } from "@/content/profile";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/about" },
  description: profile.statement,
  title: "About",
};

export default function AboutPage() {
  return (
    <>
      <SkipLink />
      <JsonLd
        schema={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          description: profile.statement,
          name: `About ${profile.name}`,
          url: new URL("/about", siteUrl).toString(),
        }}
      />
      <main id="main-content">
        <section className="relative overflow-hidden border-b border-[var(--border-subtle)] py-[var(--space-section)]" id="about">
          <Container size="wide">
            <Grid>
              <div className="col-span-12 xl:col-span-9">
                <p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.16em] text-[var(--accent)]">
                  About — {profile.role}
                </p>
                <h1 className="mt-[var(--space-6)] font-[family-name:var(--font-display)] text-5xl font-semibold leading-[var(--leading-display)] tracking-[var(--tracking-display)] text-[var(--text-primary)] md:text-7xl">
                  {profile.name}
                </h1>
                <p className="mt-[var(--space-8)] max-w-[46rem] text-xl leading-[var(--leading-body)] text-[var(--text-secondary)]">
                  {profile.statement}
                </p>
                <div className="mt-[var(--space-10)] flex flex-wrap items-center gap-[var(--space-4)]">
                  <a
                    className="inline-flex h-[var(--control-height-lg)] items-center gap-[var(--space-3)] rounded-[var(--radius-pill)] bg-[var(--accent)] px-[var(--control-padding-x-lg)] text-sm font-semibold text-[var(--accent-foreground)] transition-colors hover:bg-[var(--accent-hover)]"
                    href={`mailto:${contactDetails.email}`}
                  >
                    Get in touch
                    <Mail aria-hidden className="size-[var(--icon-sm)]" />
                  </a>
                  <Link
                    className="inline-flex h-[var(--control-height-lg)] items-center gap-[var(--space-3)] rounded-[var(--radius-pill)] border border-[var(--border-strong)] bg-[var(--surface)] px-[var(--control-padding-x-lg)] text-sm font-medium text-[var(--text-primary)] transition-colors hover:border-[var(--accent)]"
                    href="/work"
                  >
                    View selected work
                    <ArrowUpRight aria-hidden className="size-[var(--icon-sm)]" />
                  </Link>
                </div>
              </div>
            </Grid>
          </Container>
        </section>

        <Section>
          <Container size="wide">
            <Grid>
              <div className="col-span-12 xl:col-span-4">
                <p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.16em] text-[var(--accent)]">
                  Capabilities
                </p>
                <h2 className="mt-[var(--space-4)] font-[family-name:var(--font-display)] text-3xl font-semibold tracking-[var(--tracking-heading)] text-[var(--text-primary)] md:text-4xl">
                  How I approach product & design
                </h2>
              </div>
              <div className="col-span-12 mt-[var(--space-8)] grid gap-[var(--space-6)] md:grid-cols-3 xl:col-span-8 xl:mt-0">
                {capabilities.map((cap) => (
                  <div
                    className="rounded-[var(--radius-xl)] border border-[var(--border-default)] bg-[var(--surface)] p-[var(--space-6)]"
                    key={cap.title}
                  >
                    <span className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.14em] text-[var(--accent)]">
                      {cap.index}
                    </span>
                    <h3 className="mt-[var(--space-4)] text-xl font-medium text-[var(--text-primary)]">
                      {cap.title}
                    </h3>
                    <p className="mt-[var(--space-3)] text-sm leading-[var(--leading-body)] text-[var(--text-secondary)]">
                      {cap.summary}
                    </p>
                  </div>
                ))}
              </div>
            </Grid>
          </Container>
        </Section>

        <Section className="border-y border-[var(--border-subtle)] bg-[var(--surface)]">
          <Container size="wide">
            <Grid>
              <div className="col-span-12 xl:col-span-4">
                <p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.16em] text-[var(--accent)]">
                  Skills & Tools
                </p>
                <h2 className="mt-[var(--space-4)] font-[family-name:var(--font-display)] text-3xl font-semibold tracking-[var(--tracking-heading)] text-[var(--text-primary)] md:text-4xl">
                  Toolkit & disciplines
                </h2>
              </div>
              <div className="col-span-12 mt-[var(--space-8)] grid gap-[var(--space-6)] md:grid-cols-3 xl:col-span-8 xl:mt-0">
                {skillGroups.map((group) => (
                  <div key={group.label}>
                    <h3 className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.14em] text-[var(--accent)]">
                      {group.label}
                    </h3>
                    <ul className="mt-[var(--space-4)] space-y-[var(--space-2)]">
                      {group.skills.map((skill) => (
                        <li
                          className="text-sm text-[var(--text-secondary)]"
                          key={skill}
                        >
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </Grid>
          </Container>
        </Section>

        <Section>
          <Container size="wide">
            <Grid>
              <div className="col-span-12 xl:col-span-4">
                <p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.16em] text-[var(--accent)]">
                  Process & Practice
                </p>
                <h2 className="mt-[var(--space-4)] font-[family-name:var(--font-display)] text-3xl font-semibold tracking-[var(--tracking-heading)] text-[var(--text-primary)] md:text-4xl">
                  Working methodology
                </h2>
              </div>
              <div className="col-span-12 mt-[var(--space-8)] grid gap-[var(--space-6)] sm:grid-cols-2 xl:col-span-8 xl:mt-0">
                {processSteps.map((step) => (
                  <div
                    className="rounded-[var(--radius-lg)] border border-[var(--border-default)] p-[var(--space-6)]"
                    key={step.number}
                  >
                    <span className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.14em] text-[var(--accent)]">
                      Step {step.number}
                    </span>
                    <h3 className="mt-[var(--space-3)] text-lg font-medium text-[var(--text-primary)]">
                      {step.title}
                    </h3>
                    <p className="mt-[var(--space-2)] text-sm leading-[var(--leading-body)] text-[var(--text-secondary)]">
                      {step.detail}
                    </p>
                  </div>
                ))}
              </div>
            </Grid>

            <Grid className="mt-[var(--space-section)] border-t border-[var(--border-default)] pt-[var(--space-12)]">
              <div className="col-span-12 xl:col-span-4">
                <p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.16em] text-[var(--accent)]">
                  Background
                </p>
              </div>
              <div className="col-span-12 mt-[var(--space-8)] space-y-[var(--space-6)] xl:col-span-8 xl:mt-0">
                {timeline.map((item) => (
                  <div
                    className="flex flex-col justify-between border-b border-[var(--border-subtle)] pb-[var(--space-6)] sm:flex-row sm:items-baseline"
                    key={item.title}
                  >
                    <div>
                      <h3 className="text-xl font-medium text-[var(--text-primary)]">
                        {item.title}
                      </h3>
                      <p className="mt-[var(--space-2)] text-sm leading-[var(--leading-body)] text-[var(--text-secondary)]">
                        {item.detail}
                      </p>
                    </div>
                    <span className="mt-[var(--space-2)] font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.14em] text-[var(--accent)] sm:mt-0 sm:shrink-0">
                      {item.period}
                    </span>
                  </div>
                ))}
              </div>
            </Grid>
          </Container>
        </Section>
      </main>
    </>
  );
}
