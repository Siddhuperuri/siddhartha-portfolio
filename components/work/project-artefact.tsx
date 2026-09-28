import { Atom, Compass, Palette } from "lucide-react";

import type { Project } from "@/types/project";

const artefactIcon = {
  brand: Palette,
  flow: Compass,
  simulation: Atom,
} as const;

type ProjectArtefactProps = {
  artefact: Project["artefacts"][number];
  index: number;
};

export function ProjectArtefact({ artefact, index }: ProjectArtefactProps) {
  const Icon = artefactIcon[artefact.kind];

  return (
    <figure className="group overflow-hidden rounded-[var(--radius-xl)] border border-[var(--border-default)] bg-[var(--surface)]">
      <div
        aria-hidden
        className="relative min-h-64 overflow-hidden border-b border-[var(--border-default)] bg-[radial-gradient(circle_at_70%_25%,var(--light-accent),transparent_32%),linear-gradient(135deg,var(--surface-raised),var(--surface))] p-[var(--space-6)]"
      >
        <div className="absolute inset-[var(--space-6)] rounded-[var(--radius-lg)] border border-[var(--border-subtle)]" />
        <div className="absolute left-[20%] top-[28%] h-24 w-24 rounded-full border border-[var(--accent)] opacity-70" />
        <div className="absolute left-[42%] top-[42%] h-2 w-2 rounded-full bg-[var(--paper-100)] shadow-[0_0_20px_var(--accent)]" />
        <div className="absolute right-[18%] top-[22%] h-16 w-16 rounded-full border border-[var(--border-strong)]" />
        <div className="absolute bottom-[22%] left-[18%] h-px w-[62%] -rotate-[14deg] bg-[linear-gradient(90deg,transparent,var(--accent),transparent)]" />
        <div className="absolute bottom-[var(--space-6)] right-[var(--space-6)] grid size-12 place-items-center rounded-full border border-[var(--glass-border)] bg-[var(--glass-fill)] text-[var(--accent)] backdrop-blur-[var(--glass-blur)]">
          <Icon className="size-[var(--icon-lg)]" />
        </div>
      </div>
      <figcaption className="p-[var(--space-6)]">
        <p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.14em] text-[var(--accent)]">
          Artefact {String(index + 1).padStart(2, "0")}
        </p>
        <h3 className="mt-[var(--space-3)] text-xl font-medium text-[var(--text-primary)]">
          {artefact.label}
        </h3>
        <p className="mt-[var(--space-3)] leading-[var(--leading-body)] text-[var(--text-secondary)]">
          {artefact.detail}
        </p>
      </figcaption>
    </figure>
  );
}
