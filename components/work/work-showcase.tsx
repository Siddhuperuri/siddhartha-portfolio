import { SectionRegister } from "@/components/primitives/section-register";
import { WorkIndex } from "@/components/work/work-stage";
import { getFeaturedProjects } from "@/lib/projects";

/**
 * Reference [ 05 / 09 ] CLIENTS — massive statement headline, short intro,
 * then an index of client work. The typography carries all the weight;
 * no cards, no thumbnails on the home stage.
 */
export function WorkShowcase() {
  const projects = getFeaturedProjects();

  return (
    <section
      aria-labelledby="work-heading"
      className="relative border-t border-[var(--rule-hairline)] pb-[var(--space-section)]"
      id="work"
    >
      <SectionRegister index={5} label="SELECTED WORK" />

      <div className="mx-auto max-w-[var(--container-wide)] px-[var(--grid-margin)] pt-[calc(var(--space-section)*0.75)]">
        <div className="grid grid-cols-12 gap-x-[var(--grid-gutter)]">
          <h2
            className="col-span-12 max-w-[16ch] font-[family-name:var(--font-display)] text-[length:var(--text-5xl)] font-normal leading-[0.95] tracking-[var(--tracking-display)] text-[var(--paper-100)] md:col-span-8 md:text-[length:var(--text-6xl)]"
            id="work-heading"
          >
            Goliath, meet David.
            <br />
            <span className="text-[var(--paper-400)]">David, meet Goliath.</span>
          </h2>
          <p className="col-span-12 mt-[var(--space-8)] max-w-[42ch] font-[family-name:var(--font-sans)] text-[16px] leading-[1.6] text-[var(--paper-200)] md:col-span-4 md:mt-[var(--space-12)]">
            Five projects. Each one earns its place by turning a real question into a working artefact you can click on — interface, identity, or interactive prototype.
          </p>
        </div>

        <div className="mt-[var(--space-20)]">
          <WorkIndex projects={projects} />
        </div>
      </div>
    </section>
  );
}
