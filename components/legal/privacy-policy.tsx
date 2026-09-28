import Link from "next/link";

import { PrivacySidebar } from "@/components/legal/privacy-sidebar";
import { contactDetails } from "@/content/contact";
import { privacyEffectiveDate, privacyIntro, privacySections } from "@/content/legal";

/**
 * Structural echo of the reference privacy page — giant condensed headline
 * over a lit ground, sticky numbered "Navigate to" rail, and definition-list
 * rows (mono label + prose) per section — but the content itself is original
 * and specific to this site: no server-side contact form exists here (every
 * "email" link is a plain mailto:), the only tracking is cookie-free Vercel
 * Analytics, and nothing is invented to make the page look more elaborate
 * than what the site actually does.
 */
export function PrivacyPolicy() {
  return (
    <>
      <section aria-labelledby="privacy-title" className="relative isolate overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "linear-gradient(to bottom, #e7e3db 0%, #ddd8cf 40%, #cec7ba 72%, #bcb3a3 100%)",
          }}
        />

        <div className="px-[clamp(0.75rem,2vw,2.5rem)] pt-[calc(var(--space-16)+var(--space-10))]">
          <h1
            className="select-none font-[family-name:var(--font-condensed)] text-[clamp(3rem,13vw,11rem)] uppercase leading-[0.82] tracking-[-0.025em] text-transparent"
            id="privacy-title"
            style={{
              backgroundClip: "text",
              backgroundImage: "linear-gradient(to bottom, #0a0a0a 0%, #262626 55%, #8a8580 100%)",
              WebkitBackgroundClip: "text",
            }}
          >
            Privacy
            <br />
            Policy
          </h1>
        </div>

        <div className="mx-auto grid max-w-[var(--container-wide)] grid-cols-12 gap-x-[var(--grid-gutter)] px-[var(--grid-margin)] pb-[var(--space-16)] pt-[var(--space-10)]">
          <p className="col-span-12 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[var(--tracking-eyebrow)] text-[rgba(10,10,10,0.5)] md:col-span-3">
            Effective {privacyEffectiveDate}
          </p>
          <p className="col-span-12 max-w-[42rem] font-[family-name:var(--font-sans)] text-[clamp(1.25rem,2.2vw,1.75rem)] leading-[1.35] tracking-[var(--tracking-heading)] md:col-span-8 md:col-start-5">
            <span className="text-[var(--ink-950)]">{privacyIntro.emphasis}</span>{" "}
            <span className="text-[rgba(10,10,10,0.62)]">{privacyIntro.rest}</span>
          </p>
        </div>
      </section>

      <section
        aria-label="Policy sections"
        className="relative"
        style={{ background: "#bcb3a3" }}
      >
        <div className="mx-auto grid max-w-[var(--container-wide)] grid-cols-12 gap-x-[var(--grid-gutter)] px-[var(--grid-margin)] pb-[var(--space-section)]">
          <div className="col-span-12 md:col-span-3">
            <PrivacySidebar />
          </div>

          <div className="col-span-12 md:col-span-9">
            {privacySections.map((section) => (
              <div className="scroll-mt-[calc(var(--space-16)+var(--space-8))]" id={section.id} key={section.id}>
                <h2 className="mt-[var(--space-16)] font-[family-name:var(--font-sans)] text-[clamp(1.9rem,3.4vw,2.9rem)] font-semibold leading-[1.05] tracking-[var(--tracking-heading)] text-[var(--ink-950)] first:mt-0">
                  {section.number}. {section.title}
                </h2>

                <dl className="mt-[var(--space-6)] border-t border-[rgba(10,10,10,0.16)]">
                  {section.rows.map((row) => (
                    <div
                      className="grid grid-cols-12 gap-x-[var(--grid-gutter)] border-b border-[rgba(10,10,10,0.16)] py-[var(--space-6)]"
                      key={row.label}
                    >
                      <dt className="col-span-12 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[var(--tracking-eyebrow)] text-[rgba(10,10,10,0.5)] md:col-span-3">
                        {row.label}
                      </dt>
                      <dd className="col-span-12 mt-[var(--space-2)] max-w-[54ch] font-[family-name:var(--font-sans)] text-[15px] leading-[1.6] text-[rgba(10,10,10,0.82)] md:col-span-9 md:mt-0">
                        {row.detail}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}

            <p className="mt-[var(--space-10)] font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[var(--tracking-eyebrow)] text-[rgba(10,10,10,0.55)]">
              Questions about this page can go to{" "}
              <Link
                className="text-[var(--ink-950)] underline underline-offset-4"
                href={`mailto:${contactDetails.email}`}
              >
                {contactDetails.email}
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
