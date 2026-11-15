import type { ReactNode } from "react";

import { GradientHero01 } from "@/components/gradient-hero-01";
import { ExperimentStage } from "@/components/lab/experiment-stage";
import { PrewarmExperiments } from "@/components/lab/prewarm-experiments";
import { PlaygroundLink } from "@/components/lab/playground-link";
import { InViewMount } from "@/components/primitives/in-view-mount";
import { SectionRegister } from "@/components/primitives/section-register";
import { WheelPass } from "@/components/primitives/wheel-pass";
import { defaultValues, experiments, type Experiment } from "@/content/experiments";

const eyebrow =
  "font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[var(--tracking-eyebrow)] text-[var(--paper-400)]";

const labExperiments = experiments.filter((experiment) => experiment.group === "lab");
const labSlugs = labExperiments.map((experiment) => experiment.slug);

// The card stack is a fixed-size composition; everything else fills the stage.
const stageHeight: Record<string, string> = {
  "orbit-card-stack": "h-[34rem]",
};
// These pin themselves to the viewport while the page scrolls past, so they
// run edge to edge rather than inside a bordered stage.
const fullBleed = new Set(["scroll-choreography", "scroll-split-card"]);

function Intro({ experiment }: { experiment: Experiment }) {
  return (
    <div className="mx-auto flex max-w-[var(--container-wide)] flex-wrap items-center justify-between gap-x-[var(--space-8)] gap-y-[var(--space-3)] px-[var(--grid-margin)] pt-[var(--space-8)]">
      <p className={`${eyebrow} max-w-[60ch]`}>
        {experiment.note}
        {experiment.wheel
          ? " The wheel scrolls the page here; open it to scroll inside."
          : ""}
      </p>
      <PlaygroundLink slug={experiment.slug} title={experiment.title} />
    </div>
  );
}

function Section({
  children,
  experiment,
  index,
  padded,
}: {
  children: ReactNode;
  experiment: Experiment;
  index: number;
  padded: boolean;
}) {
  return (
    <section
      aria-label={experiment.title}
      className={`relative border-t border-[var(--rule-hairline)] ${padded ? "pb-[var(--space-16)]" : ""}`}
      id={experiment.slug}
    >
      <SectionRegister
        index={index}
        label={experiment.title}
        total={labExperiments.length}
      />
      <Intro experiment={experiment} />
      {children}
    </section>
  );
}

/**
 * /lab — the interactive experiments that did not belong on a case study.
 * Each stage mounts only while it is near the viewport, so the page never holds
 * more than a couple of WebGL contexts at once, and each one links to a
 * playground page where its parameters can be edited.
 */
export function LabExperiments() {
  return (
    <>
      <GradientHero01 />
      <PrewarmExperiments slugs={labSlugs} />

      {labExperiments.map((experiment, position) => {
        const stage = (
          <ExperimentStage slug={experiment.slug} values={defaultValues(experiment)} />
        );

        if (fullBleed.has(experiment.slug)) {
          return (
            <Section
              experiment={experiment}
              index={position + 1}
              key={experiment.slug}
              padded={false}
            >
              {stage}
            </Section>
          );
        }

        return (
          <Section
            experiment={experiment}
            index={position + 1}
            key={experiment.slug}
            padded
          >
            <div className="mx-auto max-w-[var(--container-wide)] px-[var(--grid-margin)]">
              <InViewMount
                className={`mt-[var(--space-6)] w-full overflow-hidden border border-[var(--rule-default)] bg-[var(--ink-900)] ${stageHeight[experiment.slug] ?? "h-[70svh] min-h-[26rem]"}`}
                fallback={<div aria-hidden className="h-full w-full" />}
              >
                <WheelPass>{stage}</WheelPass>
              </InViewMount>
            </div>
          </Section>
        );
      })}
    </>
  );
}
