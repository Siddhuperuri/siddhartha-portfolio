import { OutlineButton } from "@/components/primitives/outline-button";
import { SectionRegister } from "@/components/primitives/section-register";
import { HoverTransition } from "@/components/ui/hover-transition";

const services = [
  {
    detail:
      "Interface structures that make a product feel clear before it tries to feel clever.",
    name: "Product & UI/UX",
  },
  {
    detail:
      "Marks, type and colour that give an early idea a recognisable point of view.",
    name: "Visual identity",
  },
  {
    detail:
      "One page, one job: a hero, a flow and a reason to act, built to be shipped.",
    name: "Landing pages",
  },
  {
    detail:
      "Working browser prototypes that prove an idea before anyone writes a spec.",
    name: "Interactive prototypes",
  },
  {
    detail: "Tokens, components and rules so the second screen looks like the first.",
    name: "Design systems",
  },
  {
    detail: "Front-end that turns a concept into something people can explore.",
    name: "Creative front-end",
  },
  {
    detail:
      "Motion with a job: it explains, confirms or guides, and then gets out of the way.",
    name: "Motion & interaction",
  },
  {
    detail:
      "Case studies that show the question, the decisions and the working artefact.",
    name: "Case-study writing",
  },
] as const;

const effects = ["wipe", "curtain", "diagonal", "slide"] as const;
const directions = ["right", "bottom", "top-right", "left"] as const;

/**
 * [ 03 / 10 ] SERVICES — a statement, then a grid of eight tiles. Each tile
 * wipes from its name to what it covers when hovered or focused.
 */
export function ServicesGrid() {
  return (
    <section
      aria-labelledby="services-heading"
      className="relative overflow-hidden border-t border-[var(--rule-hairline)] pb-[var(--space-section)]"
      id="services"
    >
      <SectionRegister index={3} label="SERVICES" />

      <div className="mx-auto max-w-[var(--container-wide)] px-[var(--grid-margin)] pt-[calc(var(--space-section)*0.75)]">
        <div className="grid grid-cols-12 gap-x-[var(--grid-gutter)] gap-y-[var(--space-8)]">
          <h2
            className="col-span-12 max-w-[22ch] font-[family-name:var(--font-display)] text-[length:var(--text-4xl)] leading-[1.05] font-normal tracking-[var(--tracking-heading)] text-[var(--paper-100)] md:col-span-8 md:text-[length:var(--text-5xl)]"
            id="services-heading"
          >
            I write, design and build for teams that want a small studio in one person.
          </h2>
          <p className="col-span-12 max-w-[44ch] font-[family-name:var(--font-sans)] text-[16px] leading-[1.55] text-[var(--paper-200)] md:col-span-4 md:self-end">
            All shipped at the pace of a small team, from one person who does the whole
            job.
          </p>
        </div>

        <ul className="mt-[var(--space-16)] grid grid-cols-1 gap-[var(--space-px)] border border-[var(--rule-default)] bg-[var(--rule-default)] sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <li className="bg-[var(--ink-950)]" key={service.name}>
              <HoverTransition
                className="h-56 w-full md:h-64"
                defaultComponent={
                  <div className="flex h-full flex-col justify-between bg-[var(--ink-950)] p-[var(--space-6)]">
                    <span className="font-[family-name:var(--font-mono)] text-[11px] tracking-[var(--tracking-eyebrow)] text-[var(--paper-400)] uppercase">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="font-[family-name:var(--font-display)] text-[length:var(--text-2xl)] leading-[1.05] tracking-[var(--tracking-heading)] text-[var(--paper-100)]">
                      {service.name}
                    </span>
                  </div>
                }
                direction={directions[index % directions.length]}
                effect={effects[index % effects.length]}
                hoverComponent={
                  <div className="flex h-full flex-col justify-between bg-[var(--red-500)] p-[var(--space-6)] text-[var(--ink-950)]">
                    <span className="font-[family-name:var(--font-mono)] text-[11px] tracking-[var(--tracking-eyebrow)] uppercase">
                      {service.name}
                    </span>
                    <p className="max-w-[26ch] font-[family-name:var(--font-sans)] text-[16px] leading-[1.45]">
                      {service.detail}
                    </p>
                  </div>
                }
                label={`${service.name}: ${service.detail}`}
              />
            </li>
          ))}
        </ul>

        <div className="mt-[var(--space-10)]">
          <OutlineButton href="/contact">Start a project</OutlineButton>
        </div>
      </div>
    </section>
  );
}
