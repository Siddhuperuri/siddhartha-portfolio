import { ContactForm } from "@/components/conversion/contact-form";
import { contactDetails, contactFaqs } from "@/content/contact";
import { profile } from "@/content/profile";

const channels = [
  { detail: contactDetails.email, external: false, href: `mailto:${contactDetails.email}`, label: "Email" },
  { detail: "in/siddharthaperuri", external: true, href: contactDetails.linkedIn, label: "LinkedIn" },
  { detail: "@Siddhuperuri", external: true, href: contactDetails.github, label: "GitHub" },
] as const;

/**
 * The column rules that run the height of the working area. Purely
 * decorative — they expose the same 12-column grid everything else is set
 * on, so the form and the accordion visibly sit on structure rather than
 * floating. Dropped below md, where a 12-column rule set is just noise.
 */
function ColumnRules() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 hidden grid-cols-12 md:grid">
      {Array.from({ length: 12 }, (_, index) => (
        <div className="border-l border-[rgba(10,10,10,0.07)] last:border-r" key={index} />
      ))}
    </div>
  );
}

function PlusIcon() {
  return (
    <svg
      aria-hidden
      className="size-5 shrink-0 text-[var(--ink-950)] transition-transform duration-[var(--duration-base)] ease-[var(--ease-standard)] group-open:rotate-45"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      viewBox="0 0 20 20"
    >
      <path d="M10 4v12M4 10h12" strokeLinecap="round" />
    </svg>
  );
}

/**
 * /contact — masthead, then the enquiry form and the FAQ sharing one ruled
 * grid, in the shape of the reference page.
 *
 * The ground runs warm-paper at the masthead into near-white behind the
 * form: the form area needs the quietest possible field for hairline rules
 * and 15px labels to hold, while the masthead keeps the site's own warmth so
 * the page doesn't read as a different site from the one above it.
 */
export function ContactPage() {
  return (
    <>
      <section aria-labelledby="contact-title" className="relative isolate overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background: "linear-gradient(to bottom, #e6e3dd 0%, #eceae5 46%, #f4f3f1 78%, #f6f5f4 100%)",
          }}
        />

        {/* Masthead — full-bleed, escaping the container measure */}
        <div className="px-[clamp(0.75rem,2vw,2.5rem)] pt-[calc(var(--space-16)+var(--space-12))]">
          {/*
            32vw is measured, not guessed: Anton sets "Contact" at 0.59× its
            font size, so this is what makes the word reach both margins at
            every width, the way a masthead has to.
          */}
          <h1
            className="select-none font-[family-name:var(--font-condensed)] text-[clamp(3.5rem,32vw,60rem)] uppercase leading-[0.78] tracking-[-0.03em] text-transparent"
            id="contact-title"
            style={{
              backgroundClip: "text",
              backgroundImage: "linear-gradient(to bottom, #101010 0%, #4a4a4a 46%, #b8b6b3 100%)",
              WebkitBackgroundClip: "text",
            }}
          >
            Contact
          </h1>
        </div>

        {/* Lede — eyebrow parked left, statement starting on column 5 */}
        <div className="mx-auto grid max-w-[var(--container-wide)] grid-cols-12 gap-x-[var(--grid-gutter)] px-[var(--grid-margin)] pt-[var(--space-16)]">
          <p className="col-span-12 flex items-center gap-[var(--space-2)] self-start font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[var(--tracking-eyebrow)] text-[rgba(10,10,10,0.6)] md:col-span-4 md:pt-[var(--space-3)]">
            <span aria-hidden className="inline-block size-1.5 rounded-full bg-[var(--red-500)]" />
            Get in touch
          </p>
          <p className="col-span-12 mt-[var(--space-6)] max-w-[26ch] font-[family-name:var(--font-sans)] text-[clamp(1.5rem,2.6vw,2.35rem)] font-medium leading-[1.16] tracking-[var(--tracking-heading)] text-[rgba(10,10,10,0.42)] md:col-span-8 md:mt-0 md:max-w-[24ch]">
            Have a project in mind? I&rsquo;d love to hear more. Whether it&rsquo;s a full digital experience, design
            support, or a front-end build &mdash; let&rsquo;s connect.
          </p>
        </div>

        {/* Ruled working area: form above, FAQ below, one grid under both */}
        <div className="relative mt-[var(--space-16)]">
          <ColumnRules />

          <div className="relative mx-auto grid max-w-[var(--container-wide)] grid-cols-12 gap-x-[var(--grid-gutter)] px-[var(--grid-margin)] pb-[var(--space-section)]">
            <div className="col-span-12 md:col-span-8 md:col-start-5">
              <ContactForm />
            </div>

            <div className="col-span-12 mt-[var(--space-32)] md:col-span-4 md:mt-[var(--space-40)]">
              <h2
                className="font-[family-name:var(--font-condensed)] text-[clamp(3rem,7vw,5.5rem)] uppercase leading-[0.82] tracking-[-0.03em] text-[var(--ink-950)]"
                id="contact-faq"
              >
                FAQ
              </h2>
              <p className="mt-[var(--space-5)] max-w-[26ch] font-[family-name:var(--font-sans)] text-[15px] leading-[1.5] text-[rgba(10,10,10,0.68)]">
                If your question isn&rsquo;t answered here, feel free to reach out to me above.
              </p>

              <ul className="mt-[var(--space-10)] space-y-[var(--space-3)]">
                {channels.map((channel) => (
                  <li key={channel.href}>
                    <a
                      className="group flex flex-wrap items-baseline gap-x-[var(--space-3)] font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[var(--tracking-eyebrow)] text-[rgba(10,10,10,0.72)] transition-colors hover:text-[var(--red-600)]"
                      href={channel.href}
                      rel={channel.external ? "noreferrer" : undefined}
                      target={channel.external ? "_blank" : undefined}
                    >
                      <span className="w-[4.5rem] shrink-0">{channel.label}</span>
                      <span className="min-w-0 break-all text-[rgba(10,10,10,0.5)] transition-colors group-hover:text-[var(--red-600)]">
                        {channel.detail}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/*
              Native <details>, not a JS accordion: it is keyboard- and
              screen-reader-operable for free, survives with JS off, and is
              findable by in-page search when collapsed.
            */}
            <div
              aria-labelledby="contact-faq"
              className="col-span-12 mt-[var(--space-10)] md:col-span-8 md:col-start-5 md:mt-[var(--space-40)]"
            >
              {contactFaqs.map((faq) => (
                <details className="group border-t border-[rgba(10,10,10,0.16)] last:border-b" key={faq.question}>
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-[var(--space-6)] py-[var(--space-5)] font-[family-name:var(--font-sans)] text-[clamp(1rem,1.5vw,1.3rem)] leading-[1.3] tracking-[var(--tracking-heading)] text-[var(--ink-950)] [&::-webkit-details-marker]:hidden">
                    {faq.question}
                    <PlusIcon />
                  </summary>
                  <p className="max-w-[54ch] pb-[var(--space-6)] font-[family-name:var(--font-sans)] text-[15px] leading-[1.6] text-[rgba(10,10,10,0.68)]">
                    {faq.answer}
                  </p>
                </details>
              ))}

              <p className="mt-[var(--space-10)] font-[family-name:var(--font-mono)] text-[10px] uppercase leading-[1.8] tracking-[var(--tracking-eyebrow)] text-[rgba(10,10,10,0.48)]">
                {profile.name} &middot; Vijayawada, India
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
