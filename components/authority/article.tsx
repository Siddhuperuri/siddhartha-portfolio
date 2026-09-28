import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import { SkipLink } from "@/components/chrome/skip-link";
import { Container } from "@/components/primitives/container";
import { JsonLd } from "@/components/seo/json-ld";
import type { AuthorityArticle } from "@/content/authority";
import { siteUrl } from "@/lib/site";

type ArticleProps = {
  article: AuthorityArticle;
};

export function Article({ article }: ArticleProps) {
  return (
    <>
      <SkipLink />
      <JsonLd
        schema={{
          "@context": "https://schema.org",
          "@type": "Article",
          author: { "@type": "Person", name: "Peruri Jai Sai Siddhartha" },
          datePublished: article.publishedAt,
          description: article.description,
          headline: article.title,
          mainEntityOfPage: new URL(`/insights/${article.slug}`, siteUrl).toString(),
        }}
      />
      <main id="main-content">
        <Container size="reading">
          <article className="py-[var(--space-section)]">
          <Link
            className="inline-flex items-center gap-[var(--space-2)] font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.14em] text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
            href="/insights"
          >
            <ArrowLeft aria-hidden className="size-[var(--icon-sm)]" />
            All notes
          </Link>
          <p className="mt-[var(--space-16)] font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.16em] text-[var(--accent)]">
            {article.topic} — {article.readingTime}
          </p>
          <h1 className="mt-[var(--space-5)] font-[family-name:var(--font-display)] text-5xl font-semibold leading-[var(--leading-display)] tracking-[var(--tracking-display)] text-[var(--text-primary)] md:text-7xl">
            {article.title}
          </h1>
          <p className="mt-[var(--space-8)] text-xl leading-[var(--leading-body)] text-[var(--text-secondary)]">
            {article.description}
          </p>
          <div className="mt-[var(--space-16)] space-y-[var(--space-16)]">
            {article.sections.map((section) => (
              <section key={section.title}>
                <h2 className="text-3xl font-medium tracking-[var(--tracking-heading)] text-[var(--text-primary)]">
                  {section.title}
                </h2>
                <div className="mt-[var(--space-5)] space-y-[var(--space-5)] text-lg leading-[var(--leading-body)] text-[var(--text-secondary)]">
                  {section.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>
          </article>
        </Container>
      </main>
    </>
  );
}
