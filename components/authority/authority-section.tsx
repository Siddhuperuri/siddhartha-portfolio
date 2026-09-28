import { ArrowUpRight, Github } from "lucide-react";
import Link from "next/link";

import {
  authorityArticles,
  authoritySignals,
  resources,
  transparencyNotes,
} from "@/content/authority";

export function AuthoritySection() {
  return (
    <>
      {/* SECTION VIII — Notes (essays / insights index) */}
      <section
        aria-labelledby="notes-heading"
        className="relative border-t border-[var(--rule-hairline)] py-[var(--space-section)]"
        id="insights"
      >
        <div className="mx-auto max-w-[var(--container-wide)] px-[var(--grid-margin)]">
          <div className="grid grid-cols-12 gap-x-[var(--grid-gutter)]">
            <div className="col-span-12 lg:col-span-4">
              <p className="font-[family-name:var(--font-mono)] text-[var(--text-2xs)] uppercase tracking-[var(--tracking-eyebrow)] text-[var(--text-quaternary)]">
                <span className="text-[var(--accent)]">§ VIII</span> &nbsp;— Notes
              </p>
              <h2
                className="mt-[var(--space-5)] max-w-[14ch] font-[family-name:var(--font-display)] text-[length:var(--text-4xl)] font-normal leading-[var(--leading-heading)] tracking-[var(--tracking-heading)] text-[var(--text-primary)] md:text-[length:var(--text-5xl)]"
                id="notes-heading"
              >
                Written{" "}
                <span className="italic text-[var(--accent)]">from the work.</span>
              </h2>
              <p className="mt-[var(--space-6)] max-w-[22rem] text-[length:var(--text-base)] leading-[var(--leading-body)] text-[var(--text-tertiary)]">
                Short essays gathered while making the projects — the
                thinking, not the marketing.
              </p>
              <Link
                className="mt-[var(--space-8)] inline-flex items-baseline gap-[var(--space-3)] font-[family-name:var(--font-display)] text-[length:var(--text-xl)] text-[var(--text-primary)] transition-colors hover:text-[var(--accent)]"
                href="/insights"
              >
                <span className="relative">
                  Read all notes
                  <span className="absolute -bottom-0.5 left-0 h-px w-full bg-[var(--accent)]" />
                </span>
                <ArrowUpRight aria-hidden className="size-[var(--icon-sm)]" />
              </Link>
            </div>
            <ol className="col-span-12 mt-[var(--space-10)] lg:col-span-8 lg:mt-0">
              {authorityArticles.map((article, i) => (
                <li
                  className="group border-t border-[var(--rule-default)] py-[var(--space-8)] last:border-b"
                  key={article.slug}
                >
                  <Link className="block" href={`/insights/${article.slug}`}>
                    <div className="grid grid-cols-12 items-baseline gap-x-[var(--grid-gutter)]">
                      <span className="col-span-2 font-[family-name:var(--font-mono)] text-[var(--text-2xs)] uppercase tracking-[var(--tracking-eyebrow)] text-[var(--text-quaternary)] md:col-span-1">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="col-span-10 md:col-span-11">
                        <p className="font-[family-name:var(--font-mono)] text-[var(--text-2xs)] uppercase tracking-[var(--tracking-eyebrow)] text-[var(--text-tertiary)]">
                          {article.topic}
                          <span aria-hidden className="mx-[var(--space-2)] text-[var(--text-quaternary)]">·</span>
                          {article.readingTime}
                        </p>
                        <h3 className="mt-[var(--space-3)] max-w-[24ch] font-[family-name:var(--font-display)] text-[length:var(--text-2xl)] font-normal leading-[var(--leading-heading)] tracking-[var(--tracking-heading)] text-[var(--text-primary)] transition-colors group-hover:text-[var(--accent)] md:text-[length:var(--text-3xl)]">
                          {article.title}
                        </h3>
                        <p className="mt-[var(--space-4)] max-w-[42rem] leading-[var(--leading-body)] text-[var(--text-secondary)]">
                          {article.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Research & resources — bibliographic references */}
      <section
        aria-label="Research references"
        className="relative border-t border-[var(--rule-hairline)] py-[var(--space-section)]"
      >
        <div className="mx-auto max-w-[var(--container-wide)] px-[var(--grid-margin)]">
          <div className="grid grid-cols-12 gap-x-[var(--grid-gutter)]">
            <p className="col-span-12 font-[family-name:var(--font-mono)] text-[var(--text-2xs)] uppercase tracking-[var(--tracking-eyebrow)] text-[var(--text-quaternary)] lg:col-span-3">
              References
            </p>
            <ol className="col-span-12 mt-[var(--space-8)] lg:col-span-9 lg:mt-0">
              {resources.map((resource, i) => (
                <li
                  className="grid grid-cols-12 gap-x-[var(--grid-gutter)] border-t border-[var(--rule-hairline)] py-[var(--space-6)] last:border-b"
                  key={resource.href}
                >
                  <span className="col-span-2 font-[family-name:var(--font-mono)] text-[var(--text-2xs)] uppercase tracking-[var(--tracking-eyebrow)] text-[var(--text-quaternary)] md:col-span-1">
                    [{String(i + 1).padStart(2, "0")}]
                  </span>
                  <div className="col-span-10 md:col-span-11">
                    <p className="font-[family-name:var(--font-mono)] text-[var(--text-2xs)] uppercase tracking-[var(--tracking-eyebrow)] text-[var(--accent)]">
                      {resource.topic}
                    </p>
                    <a
                      className="group mt-[var(--space-2)] inline-flex items-baseline gap-[var(--space-2)] font-[family-name:var(--font-display)] text-[length:var(--text-xl)] leading-[var(--leading-heading)] text-[var(--text-primary)] transition-colors hover:text-[var(--accent)] md:text-[length:var(--text-2xl)]"
                      href={resource.href}
                      rel="noreferrer"
                      target="_blank"
                    >
                      <span className="relative">
                        {resource.label}
                        <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-[var(--accent)] transition-transform duration-[var(--duration-base)] group-hover:scale-x-100" />
                      </span>
                      <ArrowUpRight
                        aria-hidden
                        className="size-[var(--icon-xs)] shrink-0"
                      />
                    </a>
                    <p className="mt-[var(--space-3)] max-w-[42rem] leading-[var(--leading-body)] text-[var(--text-secondary)]">
                      {resource.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Transparency & signals — plain dl, no glass panel */}
      <section
        aria-label="Transparency"
        className="relative border-t border-[var(--rule-hairline)] py-[var(--space-section)]"
      >
        <div className="mx-auto max-w-[var(--container-wide)] px-[var(--grid-margin)]">
          <div className="grid grid-cols-12 gap-x-[var(--grid-gutter)]">
            <div className="col-span-12 lg:col-span-4">
              <p className="font-[family-name:var(--font-mono)] text-[var(--text-2xs)] uppercase tracking-[var(--tracking-eyebrow)] text-[var(--text-quaternary)]">
                Evidence, not theatre
              </p>
              <p className="mt-[var(--space-5)] max-w-[22rem] font-[family-name:var(--font-display)] text-[length:var(--text-2xl)] leading-[var(--leading-heading)] text-[var(--text-primary)]">
                What&rsquo;s counted, and what isn&rsquo;t claimed yet.
              </p>
              <a
                className="mt-[var(--space-8)] inline-flex items-baseline gap-[var(--space-3)] font-[family-name:var(--font-mono)] text-[var(--text-xs)] uppercase tracking-[var(--tracking-eyebrow)] text-[var(--text-tertiary)] transition-colors hover:text-[var(--accent)]"
                href="https://github.com/Siddhuperuri"
                rel="noreferrer"
                target="_blank"
              >
                <Github aria-hidden className="size-[var(--icon-sm)]" />
                Verify on GitHub
                <ArrowUpRight aria-hidden className="size-[var(--icon-xs)]" />
              </a>
            </div>

            <div className="col-span-12 mt-[var(--space-10)] lg:col-span-8 lg:mt-0">
              <div className="grid grid-cols-3 gap-x-[var(--grid-gutter)] border-y border-[var(--rule-default)] py-[var(--space-8)]">
                {authoritySignals.map((signal) => (
                  <div className="text-left" key={signal.label}>
                    <p className="font-[family-name:var(--font-display)] text-[length:var(--text-6xl)] leading-none tracking-[var(--tracking-display)] text-[var(--text-primary)] md:text-[length:var(--text-7xl)]">
                      {signal.value}
                    </p>
                    <p className="mt-[var(--space-4)] max-w-[16ch] text-[length:var(--text-sm)] leading-[var(--leading-body)] text-[var(--text-tertiary)]">
                      {signal.label}
                    </p>
                  </div>
                ))}
              </div>

              <dl className="mt-[var(--space-8)]">
                {transparencyNotes.map((note) => (
                  <div
                    className="grid grid-cols-12 gap-x-[var(--grid-gutter)] border-t border-[var(--rule-hairline)] py-[var(--space-5)] last:border-b"
                    key={note.label}
                  >
                    <dt className="col-span-12 font-[family-name:var(--font-mono)] text-[var(--text-2xs)] uppercase tracking-[var(--tracking-eyebrow)] text-[var(--text-quaternary)] md:col-span-3">
                      {note.label}
                    </dt>
                    <dd className="col-span-12 mt-[var(--space-2)] max-w-[46rem] leading-[var(--leading-body)] text-[var(--text-secondary)] md:col-span-9 md:mt-0">
                      {note.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
