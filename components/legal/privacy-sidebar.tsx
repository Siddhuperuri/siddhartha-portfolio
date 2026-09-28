"use client";

import { useEffect, useRef, useState } from "react";

import { privacySections } from "@/content/legal";
import { cn } from "@/lib/utils";

function ArrowRight() {
  return (
    <svg
      aria-hidden
      className="size-3.5 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      viewBox="0 0 14 14"
    >
      <path d="M2 7h10M8 3l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * Sticky "Navigate to:" rail — mirrors the reference's numbered jump-list,
 * with the active section tracked via IntersectionObserver rather than a
 * static list, so it stays honest as you scroll instead of just linking.
 */
export function PrivacySidebar() {
  const [activeId, setActiveId] = useState(privacySections[0]?.id ?? "");
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const elements = privacySections
      .map((section) => document.getElementById(section.id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible[0]) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-15% 0px -70% 0px", threshold: 0 },
    );

    elements.forEach((el) => observerRef.current?.observe(el));

    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <nav aria-label="Privacy policy sections" className="sticky top-[calc(var(--space-16)+var(--space-8))]">
      <p className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[var(--tracking-eyebrow)] text-[rgba(10,10,10,0.55)]">
        Navigate to
      </p>
      <ol className="mt-[var(--space-4)] space-y-[var(--space-2)]">
        {privacySections.map((section) => {
          const isActive = section.id === activeId;
          return (
            <li key={section.id}>
              <a
                className={cn(
                  "group flex items-center gap-[var(--space-3)] rounded-[var(--radius-md)] px-[var(--space-3)] py-[var(--space-2)] font-[family-name:var(--font-sans)] text-[13px] transition-colors duration-[var(--duration-base)]",
                  isActive
                    ? "bg-[var(--ink-950)] text-[var(--paper-100)]"
                    : "text-[rgba(10,10,10,0.72)] hover:bg-[rgba(10,10,10,0.06)]",
                )}
                href={`#${section.id}`}
              >
                <span
                  className={cn(
                    "flex size-6 shrink-0 items-center justify-center rounded-full border transition-colors duration-[var(--duration-base)]",
                    isActive
                      ? "border-[var(--paper-100)] text-[var(--paper-100)]"
                      : "border-[rgba(10,10,10,0.25)] text-[rgba(10,10,10,0.55)]",
                  )}
                >
                  <ArrowRight />
                </span>
                {section.number}. {section.navLabel}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
