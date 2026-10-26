import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { SkipLink } from "@/components/chrome/skip-link";
import { InViewMount } from "@/components/primitives/in-view-mount";
import { SectionRegister } from "@/components/primitives/section-register";
import { JsonLd } from "@/components/seo/json-ld";
import { ImageRippleEffect } from "@/components/ui/image-ripple-effect";
import { KineticTextReveal } from "@/components/ui/kinetic-text-reveal";
import { SplitFlapDisplay } from "@/components/ui/split-flap-display";
import { CaseBackdrop } from "@/components/work/case-backdrop";
import { ProjectArtefact } from "@/components/work/project-artefact";
import { coverAlt, coverSrc } from "@/lib/covers";
import { siteUrl } from "@/lib/site";
import type { Project } from "@/types/project";

type CaseStudyProps = {
  nextProject: Project | null;
  previousProject: Project | null;
  project: Project;
};

type DetailListProps = {
  items: readonly string[];
  title: string;
};

const eyebrow =
  "font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[var(--tracking-eyebrow)] text-[var(--paper-400)]";

function DetailList({ items, title }: DetailListProps) {
  return (
    <div>
      <h2 className={`${eyebrow} text-[var(--red-500)]`}>{title}</h2>
      <ul className="mt-[var(--space-6)] border-t border-[var(--rule-default)]">
        {items.map((item, index) => (
          <li
            className="grid grid-cols-12 gap-x-[var(--grid-gutter)] border-b border-[var(--rule-default)] py-[var(--space-5)] font-[family-name:var(--font-sans)] text-[16px] leading-[1.55] text-[var(--paper-200)]"
            key={item}
          >
            <span
              aria-hidden
              className="col-span-2 font-[family-name:var(--font-mono)] text-[11px] text-[var(--paper-400)] md:col-span-1"
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="col-span-10 md:col-span-11">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function DetailPair({
  left,
  right,
}: {
  left: DetailListProps;
  right: DetailListProps;
}) {
  return (
    <section className="border-b border-[var(--rule-hairline)] py-[calc(var(--space-section)*0.6)]">
      <div className="mx-auto grid max-w-[var(--container-wide)] grid-cols-12 gap-x-[var(--grid-gutter)] gap-y-[var(--space-12)] px-[var(--grid-margin)]">
        <div className="col-span-12 lg:col-span-6">
          <DetailList {...left} />
        </div>
        <div className="col-span-12 lg:col-span-6">
          <DetailList {...right} />
        </div>
      </div>
    </section>
  );
}

export function CaseStudy({ nextProject, previousProject, project }: CaseStudyProps) {
  const rows = [
    ...project.roles.map((role) => ({ label: role.label, value: role.value })),
    ...(project.tools.length > 0
      ? [{ label: "Tools", value: project.tools.join(" · ") }]
      : []),
  ];

  return (
    <>
      <SkipLink />
      <JsonLd
        schema={{
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          creator: { "@type": "Person", name: "Peruri Jai Sai Siddhartha" },
          description: project.description,
          name: project.title,
          url: new URL(`/work/${project.slug}`, siteUrl).toString(),
        }}
      />
      <main id="main-content">
        <section className="relative isolate overflow-hidden border-b border-[var(--rule-hairline)]">
          <CaseBackdrop type={project.type} />
          <SectionRegister
            index={1}
            label={`${project.type} — ${project.context}`}
            total={4}
          />

          <div className="mx-auto grid max-w-[var(--container-wide)] grid-cols-12 gap-x-[var(--grid-gutter)] gap-y-[var(--space-12)] px-[var(--grid-margin)] pt-[calc(var(--space-section)*0.5)] pb-[var(--space-24)]">
            <div className="col-span-12">
              <Link
                className={`${eyebrow} inline-flex items-center gap-[var(--space-2)] transition-colors hover:text-[var(--paper-100)]`}
                href="/work"
              >
                <ArrowLeft aria-hidden className="size-3.5" />
                All work
              </Link>
            </div>

            <div className="col-span-12 lg:col-span-9">
              <h1 className="font-[family-name:var(--font-display)] text-[clamp(3.5rem,11vw,10rem)] leading-[0.92] font-normal tracking-[var(--tracking-display)] text-[var(--paper-100)]">
                <KineticTextReveal
                  autoPlay
                  splitBy="words"
                  stagger={0.07}
                  text={project.title}
                />
              </h1>
              <p className="mt-[var(--space-8)] max-w-[44ch] font-[family-name:var(--font-sans)] text-[20px] leading-[1.5] text-[var(--paper-200)]">
                {project.summary}
              </p>
            </div>

            <div className="col-span-12 overflow-x-auto">
              <SplitFlapDisplay
                accentColor="#ff3d2e"
                columns={36}
                rows={rows}
                size="sm"
              />
            </div>
          </div>
        </section>

        <section
          aria-label="Cover"
          className="relative border-b border-[var(--rule-hairline)]"
        >
          <SectionRegister index={2} label="COVER" total={4} />
          <div className="relative mt-[var(--space-6)] h-[60svh] min-h-[22rem] w-full">
            <Image
              alt={coverAlt(project)}
              className="object-cover"
              fill
              priority
              sizes="100vw"
              src={coverSrc(project.slug)}
            />
            <InViewMount className="absolute inset-0" staticOk>
              <ImageRippleEffect
                aria-hidden
                className="h-full w-full"
                images={[{ src: coverSrc(project.slug) }]}
              />
            </InViewMount>
          </div>
        </section>

        {project.media.length > 0 ? (
          <section className="border-b border-[var(--rule-hairline)] py-[var(--space-12)]">
            <div className="mx-auto grid max-w-[var(--container-wide)] gap-[var(--space-6)] px-[var(--grid-margin)]">
              {project.media.map((media, idx) => (
                <div
                  className="relative aspect-video w-full overflow-hidden border border-[var(--rule-default)] bg-[var(--surface-raised)]"
                  key={media.src}
                >
                  <Image
                    alt={media.alt}
                    className="object-cover"
                    fill
                    priority={idx === 0}
                    sizes="(max-width: 1280px) 100vw, 1200px"
                    src={media.src}
                  />
                </div>
              ))}
            </div>
          </section>
        ) : null}

        <section className="relative border-b border-[var(--rule-hairline)] pb-[var(--space-section)]">
          <SectionRegister index={3} label="THE CHALLENGE" total={4} />
          <div className="mx-auto max-w-[var(--container-wide)] px-[var(--grid-margin)] pt-[calc(var(--space-section)*0.5)]">
            <p className="max-w-[26ch] font-[family-name:var(--font-display)] text-[length:var(--text-3xl)] leading-[1.08] tracking-[var(--tracking-heading)] text-[var(--paper-100)] md:text-[length:var(--text-5xl)]">
              {project.challenge}
            </p>
          </div>
        </section>

        <section className="border-b border-[var(--rule-hairline)] py-[calc(var(--space-section)*0.6)]">
          <div className="mx-auto grid max-w-[var(--container-wide)] gap-[var(--space-5)] px-[var(--grid-margin)] md:grid-cols-3">
            {project.artefacts.map((artefact, index) => (
              <ProjectArtefact artefact={artefact} index={index} key={artefact.label} />
            ))}
          </div>
        </section>

        <DetailPair
          left={{ items: project.research, title: "Questions that framed the work" }}
          right={{
            items: project.wireframes,
            title: "Structure and wireframe direction",
          }}
        />
        <DetailPair
          left={{ items: project.designSystem, title: "Design system decisions" }}
          right={{ items: project.iteration, title: "Iteration principles" }}
        />
        <DetailPair
          left={{ items: project.development, title: "Development" }}
          right={{ items: project.results, title: "Delivered outcomes" }}
        />

        <nav aria-label="Project navigation" className="relative">
          <SectionRegister index={4} label="KEEP GOING" total={4} />
          <div className="mx-auto mt-[var(--space-6)] grid max-w-[var(--container-wide)] gap-px bg-[var(--rule-default)] px-0 md:grid-cols-2">
            {previousProject ? (
              <Link
                className="group flex min-h-56 flex-col justify-between bg-[var(--ink-950)] p-[var(--space-8)] transition-colors hover:bg-[var(--red-500)] hover:text-[var(--ink-950)]"
                href={`/work/${previousProject.slug}`}
              >
                <span
                  className={`${eyebrow} inline-flex items-center gap-[var(--space-2)] group-hover:text-[var(--ink-950)]`}
                >
                  <ArrowLeft aria-hidden className="size-3.5" />
                  Previous project
                </span>
                <span className="mt-[var(--space-8)] font-[family-name:var(--font-display)] text-[length:var(--text-4xl)] leading-[1] tracking-[var(--tracking-heading)] text-[var(--paper-100)] group-hover:text-[var(--ink-950)]">
                  {previousProject.title}
                </span>
              </Link>
            ) : (
              <div className="bg-[var(--ink-950)]" />
            )}
            {nextProject ? (
              <Link
                className="group flex min-h-56 flex-col items-start justify-between bg-[var(--ink-950)] p-[var(--space-8)] transition-colors hover:bg-[var(--red-500)] md:items-end md:text-right"
                href={`/work/${nextProject.slug}`}
              >
                <span
                  className={`${eyebrow} inline-flex items-center gap-[var(--space-2)] group-hover:text-[var(--ink-950)]`}
                >
                  Next project
                  <ArrowRight aria-hidden className="size-3.5" />
                </span>
                <span className="mt-[var(--space-8)] font-[family-name:var(--font-display)] text-[length:var(--text-4xl)] leading-[1] tracking-[var(--tracking-heading)] text-[var(--paper-100)] group-hover:text-[var(--ink-950)]">
                  {nextProject.title}
                </span>
              </Link>
            ) : (
              <div className="bg-[var(--ink-950)]" />
            )}
          </div>
        </nav>
      </main>
    </>
  );
}
