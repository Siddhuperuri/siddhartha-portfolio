import { OutlineButton } from "@/components/primitives/outline-button";
import { InViewMount } from "@/components/primitives/in-view-mount";
import { SectionRegister } from "@/components/primitives/section-register";
import { InfiniteImageField } from "@/components/ui/infinite-image-field";
import { coverSrc } from "@/lib/covers";
import { getFeaturedProjects } from "@/lib/projects";

/**
 * [ 05 / 09 ] ARTEFACTS — a drag-and-drift field of cover art. Steer with the
 * pointer; it eases to a stop when you leave.
 */
export function ExploreStrip() {
  const images = getFeaturedProjects().map((project) => coverSrc(project.slug));

  return (
    <section
      aria-labelledby="explore-heading"
      className="relative overflow-hidden border-t border-[var(--rule-hairline)] pb-[var(--space-section)]"
      id="artefacts"
    >
      <SectionRegister index={5} label="ARTEFACTS" />

      <div className="mx-auto max-w-[var(--container-wide)] px-[var(--grid-margin)] pt-[calc(var(--space-section)*0.5)]">
        <h2
          className="max-w-[18ch] font-[family-name:var(--font-display)] text-[length:var(--text-4xl)] leading-[1.02] font-normal tracking-[var(--tracking-heading)] text-[var(--paper-100)] md:text-[length:var(--text-6xl)]"
          id="explore-heading"
        >
          Move your cursor.
          <br />
          <span className="text-[var(--paper-400)]">Wander the work.</span>
        </h2>
      </div>

      <InViewMount
        className="mt-[var(--space-12)] h-[70svh] min-h-[28rem] border-y border-[var(--rule-default)]"
        fallback={<div aria-hidden className="h-full w-full bg-[var(--ink-900)]" />}
      >
        <InfiniteImageField
          className="absolute inset-0 h-full w-full"
          gap={24}
          imageHeight={230}
          imageWidth={360}
          images={images}
          maxSpeed={4}
        />
      </InViewMount>

      <div className="mx-auto mt-[var(--space-10)] max-w-[var(--container-wide)] px-[var(--grid-margin)]">
        <OutlineButton href="/work">See every project</OutlineButton>
      </div>
    </section>
  );
}
