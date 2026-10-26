import { projects } from "@/content/projects";
import type { Project } from "@/types/project";

/** Cover art lives in public/assets/projects/<slug>.png (see scripts/generate-covers.mjs). */
export function coverSrc(slug: string) {
  return `/assets/projects/${slug}.png`;
}

export function coverAlt(project: Pick<Project, "title">) {
  return `${project.title} cover artwork`;
}

export type CoverItem = {
  alt: string;
  slug: string;
  src: string;
  title: string;
};

export function getCoverItems(list: readonly Project[] = projects): CoverItem[] {
  return list.map((project) => ({
    alt: coverAlt(project),
    slug: project.slug,
    src: coverSrc(project.slug),
    title: project.title,
  }));
}
