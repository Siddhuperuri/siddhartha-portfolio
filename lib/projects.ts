import type { Project } from "@/types/project";

import { projects } from "@/content/projects";

export interface ProjectRepository {
  getAll(): Promise<Project[]>;
  getBySlug(slug: string): Promise<Project | null>;
  getFeatured(): Promise<Project[]>;
}

export function getFeaturedProjects() {
  return projects.filter((project) => project.featured);
}

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug) ?? null;
}

export function getProjectSlugs() {
  return projects.map((project) => project.slug);
}

export function getProjectNeighbours(slug: string) {
  const index = projects.findIndex((project) => project.slug === slug);

  if (index === -1) {
    return { next: null, previous: null };
  }

  return {
    next: projects[(index + 1) % projects.length] ?? null,
    previous: projects[(index - 1 + projects.length) % projects.length] ?? null,
  };
}
