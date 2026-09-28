import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CaseStudy } from "@/components/work/case-study";
import { getProjectBySlug, getProjectNeighbours, getProjectSlugs } from "@/lib/projects";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {};
  }

  return {
    alternates: { canonical: `/work/${project.slug}` },
    description: project.description,
    openGraph: {
      description: project.description,
      title: project.title,
      type: "article",
    },
    title: project.title,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const { next, previous } = getProjectNeighbours(project.slug);

  return <CaseStudy nextProject={next} previousProject={previous} project={project} />;
}
