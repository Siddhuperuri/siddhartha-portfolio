import Link from "next/link";

import { SectionRegister } from "@/components/primitives/section-register";
import { TextRepel } from "@/components/ui/text-repel";
import { authorityArticles } from "@/content/authority";

/**
 * [ 08 / 09 ] INSIGHTS — a heading the cursor pushes letters out of, then
 * the written pieces as a hairline index.
 */
export function InsightsTeaser() {
  return (
    <section
      aria-labelledby="insights-heading"
      className="relative border-t border-[var(--rule-hairline)] pb-[var(--space-section)]"
      id="insights"
    >
      <SectionRegister index={8} label="INSIGHTS" />

      <div className="mx-auto max-w-[var(--container-wide)] px-[var(--grid-margin)] pt-[calc(var(--space-section)*0.5)]">
        <h2
          className="flex flex-wrap gap-x-[0.28em] font-[family-name:var(--font-display)] text-[clamp(3.5rem,11vw,10rem)] leading-[0.95] font-normal tracking-[var(--tracking-display)] text-[var(--paper-100)]"
          id="insights-heading"
        >
          {["Written", "from", "the", "work."].map((word) => (
            <TextRepel
              className="justify-start"
              key={word}
              letterClassName="inline-block"
              radius={140}
              strength={38}
              text={word}
            />
          ))}
        </h2>

        <ol className="mt-[var(--space-16)] border-t border-[var(--rule-default)]">
          {authorityArticles.map((article, index) => (
            <li className="border-b border-[var(--rule-default)]" key={article.slug}>
              <Link
                className="group grid grid-cols-12 items-baseline gap-x-[var(--grid-gutter)] px-[var(--space-2)] py-[var(--space-8)] transition-colors hover:bg-[rgba(255,255,255,0.03)]"
                href={`/insights/${article.slug}`}
              >
                <span className="col-span-2 font-[family-name:var(--font-mono)] text-[11px] tracking-[var(--tracking-eyebrow)] text-[var(--paper-400)] uppercase md:col-span-1">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="col-span-10 font-[family-name:var(--font-display)] text-[length:var(--text-3xl)] leading-[1.05] tracking-[var(--tracking-heading)] text-[var(--paper-200)] transition-colors group-hover:text-[var(--paper-100)] md:col-span-7 md:text-[length:var(--text-4xl)]">
                  {article.title}
                </span>
                <span className="col-span-12 mt-[var(--space-3)] font-[family-name:var(--font-mono)] text-[10px] tracking-[var(--tracking-eyebrow)] text-[var(--paper-400)] uppercase group-hover:text-[var(--red-500)] md:col-span-4 md:mt-0 md:text-right">
                  {article.topic} · {article.readingTime}
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
