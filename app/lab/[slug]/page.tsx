import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SkipLink } from "@/components/chrome/skip-link";
import { Playground } from "@/components/lab/playground";
import {
  experiments,
  getExperiment,
  getExperimentNeighbours,
} from "@/content/experiments";

type PlaygroundPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return experiments.map((experiment) => ({ slug: experiment.slug }));
}

export async function generateMetadata({
  params,
}: PlaygroundPageProps): Promise<Metadata> {
  const { slug } = await params;
  const experiment = getExperiment(slug);

  if (!experiment) {
    return {};
  }

  return {
    alternates: { canonical: `/lab/${experiment.slug}` },
    description: `${experiment.note} An interactive experiment with editable controls.`,
    title: `${experiment.title} playground`,
  };
}

export default async function PlaygroundPage({ params }: PlaygroundPageProps) {
  const { slug } = await params;
  const experiment = getExperiment(slug);

  if (!experiment) {
    notFound();
  }

  const { index, next, previous } = getExperimentNeighbours(experiment.slug);

  return (
    <>
      <SkipLink />
      <Playground
        experiment={experiment}
        index={index}
        // Remount per experiment so one page's edits never leak into the next.
        key={experiment.slug}
        next={{ slug: next.slug, title: next.title }}
        previous={{ slug: previous.slug, title: previous.title }}
        total={experiments.length}
      />
    </>
  );
}
