"use client";

import { useState } from "react";

import { TrackedProjectLink } from "@/components/analytics/tracked-project-link";
import { cn } from "@/lib/utils";
import type { Project } from "@/types/project";

type WorkIndexProps = {
  projects: Project[];
};

/**
 * Reference-style project index — hairline rows with the project name in
 * huge sans-serif on the left, discipline metadata on the right, and a
 * one-line summary that expands under the row on hover/focus. No cards,
 * no thumbnails — the type is the moment.
 */
export function WorkIndex({ projects }: WorkIndexProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <ol className="border-t border-[var(--rule-default)]">
      {projects.map((project, index) => {
        const isOpen = openIndex === index;
        return (
          <li
            className={cn(
              "group relative border-b border-[var(--rule-default)] transition-colors duration-[var(--duration-base)]",
              isOpen && "bg-[rgba(255,255,255,0.02)]",
            )}
            key={project.slug}
            onFocus={() => setOpenIndex(index)}
            onMouseEnter={() => setOpenIndex(index)}
          >
            <TrackedProjectLink
              ariaLabel={`Read the ${project.title} case study`}
              className="block px-[var(--space-2)] py-[var(--space-10)] focus:outline-none"
              href={`/work/${project.slug}`}
              project={project.slug}
            >
              <div className="grid grid-cols-12 items-baseline gap-x-[var(--grid-gutter)]">
                <span
                  aria-hidden
                  className="col-span-2 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[var(--tracking-eyebrow)] text-[var(--paper-400)] md:col-span-1"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                <h3
                  className={cn(
                    "col-span-10 font-[family-name:var(--font-display)] text-[length:var(--text-4xl)] font-normal leading-[1] tracking-[var(--tracking-heading)] transition-colors duration-[var(--duration-base)] md:col-span-7 md:text-[length:var(--text-5xl)]",
                    isOpen ? "text-[var(--paper-100)]" : "text-[var(--paper-300)] group-hover:text-[var(--paper-100)]",
                  )}
                >
                  {project.title}
                </h3>

                <div className="col-span-12 mt-[var(--space-3)] flex items-baseline gap-[var(--space-3)] font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[var(--tracking-eyebrow)] text-[var(--paper-400)] md:col-span-4 md:mt-0 md:justify-end md:gap-[var(--space-4)]">
                  <span className="whitespace-nowrap">{project.context}</span>
                  <svg
                    aria-hidden
                    className={cn(
                      "size-3 shrink-0 transition-all duration-[var(--duration-base)] ease-[var(--ease-emphasized)]",
                      isOpen
                        ? "text-[var(--red-500)]"
                        : "text-[var(--paper-400)] group-hover:text-[var(--red-500)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5",
                    )}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    viewBox="0 0 12 12"
                  >
                    <path d="M2 10 L10 2 M4 2 H10 V8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>

              <div
                className={cn(
                  "grid grid-cols-12 gap-x-[var(--grid-gutter)] overflow-hidden transition-[max-height,opacity,margin] duration-[var(--duration-slow)] ease-[var(--ease-emphasized)]",
                  isOpen ? "mt-[var(--space-5)] max-h-40 opacity-100" : "mt-0 max-h-0 opacity-0",
                )}
              >
                <p className="col-span-12 md:col-span-8 md:col-start-2">
                  <span className="max-w-[56ch] font-[family-name:var(--font-sans)] text-[17px] leading-[1.55] text-[var(--paper-200)]">
                    {project.summary}
                  </span>
                </p>
                <div className="col-span-12 mt-[var(--space-4)] flex flex-wrap items-baseline gap-x-[var(--space-4)] gap-y-[var(--space-2)] font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[var(--tracking-eyebrow)] text-[var(--paper-400)] md:col-span-8 md:col-start-2">
                  {project.tools.length > 0
                    ? project.tools.map((tool) => <span key={tool}>{tool}</span>)
                    : project.roles.map((role) => <span key={role.label}>{role.value}</span>)}
                </div>
              </div>
            </TrackedProjectLink>

            <span
              aria-hidden
              className={cn(
                "pointer-events-none absolute left-0 top-0 h-full w-0.5 origin-top scale-y-0 bg-[var(--red-500)] transition-transform duration-[var(--duration-slow)] ease-[var(--ease-emphasized)]",
                isOpen && "scale-y-100",
              )}
            />
          </li>
        );
      })}
    </ol>
  );
}

export const WorkStage = WorkIndex;
