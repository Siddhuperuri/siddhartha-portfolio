import { SectionRegister } from "@/components/primitives/section-register";
import {
  CaseStudyFlipStack,
  type CaseStudyFlipItem,
} from "@/components/ui/case-study-flip-stack";
import { WorkIndex } from "@/components/work/work-stage";
import { coverAlt, coverSrc } from "@/lib/covers";
import { getFeaturedProjects } from "@/lib/projects";

// Alternating card grounds, all drawn from the portfolio palette.
const grounds = [
  { background: "#1a1a1a", foreground: "#f5f5f5" },
  { background: "#ff3d2e", foreground: "#0a0a0a" },
  { background: "#f5f5f5", foreground: "#0a0a0a" },
  { background: "#262626", foreground: "#f5f5f5" },
] as const;

/**
 * [ 04 / 09 ] SELECTED WORK — the case studies flip past as you scroll, one
 * card per project. The linked index underneath is the keyboard-friendly route
 * into each case study.
 */
export function WorkShowcase() {
  const projects = getFeaturedProjects();

  const items: CaseStudyFlipItem[] = projects.map((project, index) => {
    const ground = grounds[index % grounds.length];
    return {
      background: ground.background,
      description: project.summary,
      eyebrow: project.context,
      foreground: ground.foreground,
      image: coverSrc(project.slug),
      imageAlt: coverAlt(project),
      number: String(index + 1).padStart(2, "0"),
      title: project.title,
    };
  });

  return (
    <section
      aria-labelledby="work-heading"
      className="relative border-t border-[var(--rule-hairline)]"
      id="work"
    >
      <SectionRegister index={4} label="SELECTED WORK" />

      <h2 className="sr-only" id="work-heading">
        Selected work
      </h2>

      <CaseStudyFlipStack
        endLabel="Now the index"
        heading={`${projects.length} projects. Each one a working artefact.`}
        hint="Scroll"
        items={items}
      />

      <div className="mx-auto max-w-[var(--container-wide)] px-[var(--grid-margin)] pb-[var(--space-section)]">
        <WorkIndex projects={projects} />
      </div>
    </section>
  );
}
