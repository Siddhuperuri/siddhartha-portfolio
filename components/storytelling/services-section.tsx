import { OutlineButton } from "@/components/primitives/outline-button";
import { SectionRegister } from "@/components/primitives/section-register";

const services = [
  "Product & UI/UX",
  "Visual identity",
  "Landing pages",
  "Interactive prototypes",
  "Design systems",
  "Creative front-end",
  "Motion & interaction",
  "Case-study writing",
];

/**
 * Reference [ 03 / 09 ] SERVICES — big statement headline, tight paragraph,
 * outline CTA, and a horizontal loop of service names beneath.
 */
export function ServicesSection() {
  return (
    <section
      aria-labelledby="services-heading"
      className="relative overflow-hidden border-t border-[var(--rule-hairline)] pb-[var(--space-section)]"
      id="services"
    >
      <SectionRegister index={3} label="SERVICES" />

      <div className="mx-auto grid max-w-[var(--container-wide)] grid-cols-12 gap-x-[var(--grid-gutter)] px-[var(--grid-margin)] pt-[calc(var(--space-section)*0.75)]">
        <div className="col-span-12 md:col-span-8">
          <h2
            className="max-w-[22ch] font-[family-name:var(--font-display)] text-[length:var(--text-4xl)] font-normal leading-[1.05] tracking-[var(--tracking-heading)] text-[var(--paper-100)] md:text-[length:var(--text-5xl)]"
            id="services-heading"
          >
            I write, design and build for teams that want a small studio in one person.
          </h2>

          <p className="mt-[var(--space-8)] max-w-[52ch] font-[family-name:var(--font-sans)] text-[16px] leading-[1.55] text-[var(--paper-200)]">
            Interfaces that make a product feel clear before it tries to feel clever. Identities that give early ideas a recognisable point of view. Front-end that turns concepts into things people can actually explore. All shipped at the pace of a small team, from one person who does the whole job.
          </p>

          <div className="mt-[var(--space-10)]">
            <OutlineButton href="/contact">Start a project</OutlineButton>
          </div>
        </div>
      </div>

      {/* Service word loop — the reference's ghosted service name at the bottom */}
      <div aria-hidden className="pointer-events-none mt-[var(--space-24)] overflow-hidden">
        <div className="flex w-max animate-[marquee_80s_linear_infinite] gap-16">
          {[services, services].map((set, i) => (
            <ul className="flex shrink-0 items-baseline gap-16" key={i}>
              {set.map((s, j) => (
                <li
                  className="font-[family-name:var(--font-display)] text-[clamp(3rem,8vw,7rem)] font-normal leading-[0.9] tracking-[var(--tracking-display)] text-[var(--paper-600)]"
                  key={`${s}-${j}`}
                >
                  {s}
                  <span className="mx-8 text-[var(--red-500)]">·</span>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
