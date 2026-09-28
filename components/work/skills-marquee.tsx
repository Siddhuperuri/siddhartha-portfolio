import { skillGroups } from "@/content/profile";

const skills = skillGroups.flatMap((group) => group.skills);

/**
 * Reference "PARTNERS IN CRIME" band — a slow-scrolling row of monotype
 * labels below the hero. The reference uses partner logos; we substitute
 * the tool/skill vocabulary that plays the same role in the user's story.
 */
export function SkillsMarquee() {
  return (
    <section aria-labelledby="partners-heading" className="relative border-t border-b border-[var(--rule-hairline)] bg-[var(--ink-950)] py-[var(--space-6)]">
      <p
        className="mx-auto mb-[var(--space-4)] max-w-[var(--container-wide)] px-[var(--grid-margin)] text-center font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[var(--tracking-eyebrow)] text-[var(--paper-400)]"
        id="partners-heading"
      >
        Partners in craft
      </p>
      <div aria-hidden className="relative overflow-hidden">
        <div className="flex w-max animate-[marquee_60s_linear_infinite] gap-16">
          {[skills, skills].map((set, setIndex) => (
            <ul
              className="flex shrink-0 items-baseline gap-16"
              key={setIndex}
            >
              {set.map((skill, index) => (
                <li
                  className="flex items-baseline gap-4 font-[family-name:var(--font-sans)] text-[22px] font-normal tracking-[var(--tracking-heading)] text-[var(--paper-100)]"
                  key={`${skill}-${index}`}
                >
                  <span className="text-[var(--paper-400)]">✱</span>
                  <span>{skill}</span>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
