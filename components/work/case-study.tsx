import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

import { SkipLink } from "@/components/chrome/skip-link";
import { Container } from "@/components/primitives/container";
import { Grid } from "@/components/primitives/grid";
import { Section } from "@/components/primitives/section";
import { JsonLd } from "@/components/seo/json-ld";
import { ProjectArtefact } from "@/components/work/project-artefact";
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

function DetailList({ items, title }: DetailListProps) {
  return (
    <div>
      <h2 className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.16em] text-[var(--accent)]">
        {title}
      </h2>
      <ul className="mt-[var(--space-6)] divide-y divide-[var(--border-default)] border-y border-[var(--border-default)]">
        {items.map((item) => (
          <li className="py-[var(--space-5)] leading-[var(--leading-body)] text-[var(--text-secondary)]" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function CaseStudy({ nextProject, previousProject, project }: CaseStudyProps) {
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
      <section className="relative overflow-hidden border-b border-[var(--border-subtle)] py-[var(--space-section)]">
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_80%_25%,var(--light-accent),transparent_28%)]" />
        <Container className="relative" size="wide">
          <Link
            className="inline-flex items-center gap-[var(--space-2)] font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.14em] text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
            href="/work"
          >
            <ArrowLeft aria-hidden className="size-[var(--icon-sm)]" />
            All work
          </Link>
          <Grid>
            <div className="col-span-12 pt-[var(--space-16)] xl:col-span-9">
              <span className="inline-flex items-center rounded-[var(--radius-pill)] border border-[var(--glass-border)] bg-[var(--glass-fill)] px-[var(--space-3)] py-[var(--space-1)] font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.16em] text-[var(--accent)] backdrop-blur-[var(--glass-blur)]">
                {project.type} — {project.context}
              </span>
              <h1 className="mt-[var(--space-6)] font-[family-name:var(--font-display)] text-5xl font-semibold leading-[var(--leading-display)] tracking-[var(--tracking-display)] text-[var(--text-primary)] md:text-7xl">
                {project.title}
              </h1>
              <p className="mt-[var(--space-8)] max-w-[44rem] text-xl leading-[var(--leading-body)] text-[var(--text-secondary)]">
                {project.summary}
              </p>
            </div>
            <dl className="col-span-12 mt-[var(--space-12)] grid gap-[var(--space-6)] border-t border-[var(--border-default)] pt-[var(--space-6)] md:grid-cols-3 xl:col-span-9">
              {project.roles.map((role) => (
                <div key={role.label}>
                  <dt className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.14em] text-[var(--text-tertiary)]">
                    {role.label}
                  </dt>
                  <dd className="mt-[var(--space-2)] text-sm text-[var(--text-primary)]">{role.value}</dd>
                </div>
              ))}
              {project.tools.length > 0 ? (
                <div>
                  <dt className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.14em] text-[var(--text-tertiary)]">
                    Tools
                  </dt>
                  <dd className="mt-[var(--space-2)] text-sm text-[var(--text-primary)]">
                    {project.tools.join(" · ")}
                  </dd>
                </div>
              ) : null}
            </dl>
          </Grid>
        </Container>
      </section>

      {project.media.length > 0 ? (
        <Section className="border-b border-[var(--border-subtle)] py-[var(--space-12)]">
          <Container size="wide">
            <div className="grid gap-[var(--space-6)]">
              {project.media.map((media, idx) => (
                <div
                  className="relative aspect-video w-full overflow-hidden rounded-[var(--radius-xl)] border border-[var(--border-default)] bg-[var(--surface-raised)]"
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
          </Container>
        </Section>
      ) : null}

      <Section>
        <Container size="wide">
          <Grid>
            <p className="col-span-12 font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.16em] text-[var(--accent)] xl:col-span-3">
              The challenge
            </p>
            <p className="col-span-12 mt-[var(--space-6)] max-w-[50rem] font-[family-name:var(--font-display)] text-3xl font-semibold leading-[var(--leading-heading)] tracking-[var(--tracking-heading)] text-[var(--text-primary)] md:text-5xl xl:col-span-8 xl:col-start-5 xl:mt-0">
              {project.challenge}
            </p>
          </Grid>
        </Container>
      </Section>

      <Section className="border-y border-[var(--border-subtle)] bg-[var(--surface)]">
        <Container size="wide">
          <div className="grid gap-[var(--space-5)] md:grid-cols-3">
            {project.artefacts.map((artefact, index) => (
              <ProjectArtefact artefact={artefact} index={index} key={artefact.label} />
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container size="wide">
          <Grid>
            <div className="col-span-12 xl:col-span-5">
              <DetailList items={project.research} title="Questions that framed the work" />
            </div>
            <div className="col-span-12 mt-[var(--space-12)] xl:col-span-5 xl:col-start-8 xl:mt-0">
              <DetailList items={project.wireframes} title="Structure and wireframe direction" />
            </div>
          </Grid>
        </Container>
      </Section>

      <Section className="border-y border-[var(--border-subtle)] bg-[var(--surface)]">
        <Container size="wide">
          <Grid>
            <div className="col-span-12 xl:col-span-5">
              <DetailList items={project.designSystem} title="Design system decisions" />
            </div>
            <div className="col-span-12 mt-[var(--space-12)] xl:col-span-5 xl:col-start-8 xl:mt-0">
              <DetailList items={project.iteration} title="Iteration principles" />
            </div>
          </Grid>
        </Container>
      </Section>

      <Section>
        <Container size="wide">
          <Grid>
            <div className="col-span-12 xl:col-span-5">
              <DetailList items={project.development} title="Development" />
            </div>
            <div className="col-span-12 mt-[var(--space-12)] xl:col-span-5 xl:col-start-8 xl:mt-0">
              <DetailList items={project.results} title="Delivered outcomes" />
            </div>
          </Grid>
        </Container>
      </Section>

      <nav aria-label="Project navigation" className="border-t border-[var(--border-subtle)]">
        <Container size="wide">
          <div className="grid gap-px bg-[var(--border-subtle)] md:grid-cols-2">
            {previousProject ? (
              <Link
                className="group flex min-h-48 flex-col justify-between bg-[var(--background)] p-[var(--space-8)] transition-colors hover:bg-[var(--surface)]"
                href={`/work/${previousProject.slug}`}
              >
                <span className="inline-flex items-center gap-[var(--space-2)] font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.14em] text-[var(--text-tertiary)]">
                  <ArrowLeft aria-hidden className="size-[var(--icon-sm)]" />
                  Previous project
                </span>
                <span className="mt-[var(--space-8)] text-2xl font-medium text-[var(--text-primary)]">
                  {previousProject.title}
                </span>
              </Link>
            ) : null}
            {nextProject ? (
              <Link
                className="group flex min-h-48 flex-col items-start justify-between bg-[var(--background)] p-[var(--space-8)] transition-colors hover:bg-[var(--surface)] md:items-end md:text-right"
                href={`/work/${nextProject.slug}`}
              >
                <span className="inline-flex items-center gap-[var(--space-2)] font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.14em] text-[var(--text-tertiary)]">
                  Next project
                  <ArrowRight aria-hidden className="size-[var(--icon-sm)]" />
                </span>
                <span className="mt-[var(--space-8)] text-2xl font-medium text-[var(--text-primary)]">
                  {nextProject.title}
                </span>
              </Link>
            ) : null}
          </div>
        </Container>
      </nav>
      </main>
    </>
  );
}
