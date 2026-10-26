"use client";

import { TrackedProjectLink } from "@/components/analytics/tracked-project-link";
import { StickyScrollCards } from "@/components/ui/sticky-scroll-cards";
import type { Project } from "@/types/project";

type ProjectStackProps = {
  projects: Project[];
};

/** Project gallery: each case study is a card that stacks over the last as you scroll. */
export function ProjectStack({ projects }: ProjectStackProps) {
  return (
    <StickyScrollCards
      cardClassName="w-[min(92vw,920px)] rounded-[var(--radius-xl)] border border-[var(--rule-default)] bg-[var(--surface-raised)] shadow-[0_24px_64px_rgb(0_0_0/0.45)]"
      getKey={(project) => project.slug}
      items={projects}
      renderCard={(project, index) => (
        <TrackedProjectLink
          ariaLabel={`Read the ${project.title} case study`}
          className="block p-[var(--space-8)] focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-[var(--accent)] md:p-[var(--space-12)]"
          href={`/work/${project.slug}`}
          project={project.slug}
        >
          <div className="flex items-baseline justify-between gap-[var(--space-4)] font-[family-name:var(--font-mono)] text-[11px] tracking-[var(--tracking-eyebrow)] text-[var(--paper-400)] uppercase">
            <span aria-hidden>{String(index + 1).padStart(2, "0")}</span>
            <span>{project.context}</span>
          </div>
          <h3 className="mt-[var(--space-10)] font-[family-name:var(--font-display)] text-[length:var(--text-4xl)] leading-[1] font-normal tracking-[var(--tracking-heading)] text-[var(--paper-100)] md:text-[length:var(--text-5xl)]">
            {project.title}
          </h3>
          <p className="mt-[var(--space-5)] max-w-[52ch] font-[family-name:var(--font-sans)] text-[17px] leading-[1.55] text-[var(--paper-200)]">
            {project.summary}
          </p>
          <ul className="mt-[var(--space-8)] flex flex-wrap gap-[var(--space-2)] font-[family-name:var(--font-mono)] text-[10px] tracking-[var(--tracking-eyebrow)] text-[var(--paper-400)] uppercase">
            {project.tools.map((tool) => (
              <li
                className="rounded-full border border-[var(--rule-default)] px-[var(--space-3)] py-[var(--space-1)]"
                key={tool}
              >
                {tool}
              </li>
            ))}
          </ul>
        </TrackedProjectLink>
      )}
    />
  );
}
