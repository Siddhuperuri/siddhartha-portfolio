"use client";

import { useEffect, useRef, useState } from "react";

import { SectionRegister } from "@/components/primitives/section-register";
import { cn } from "@/lib/utils";

const rules = [
  "BE PROLIFIC.",
  "HAVE A POINT OF VIEW.",
  "TAKE NO PRISONERS.",
  "BE ORIGINAL.",
  "IF YOU CAN'T BE ORIGINAL, BE BETTER THAN ORIGINAL.",
  "DON'T TAKE NO SHIT.",
  "GREATNESS IS GOOD COMPOUNDED OVER TIME.",
  "CHARGE A LOT BUT GIVE THEM MORE THAN THEY PAY FOR.",
  "IT'S NOT CREATIVE UNLESS YOU DO SOMETHING THAT SCARES YOU.",
  "IF YOU AREN'T PISSING SOMEONE OFF, YOU'RE DOING SOMETHING WRONG.",
  "ALL CRITICISMS MUST BE ACCOMPANIED BY SUGGESTIONS.",
  "BE YOUR CLIENT'S MOST LOYAL CUSTOMER.",
  "TAKE YOUR WORK SERIOUSLY, YOURSELF LESS SO.",
  "NEVER SHIP ANYTHING YOU WOULDN'T USE YOURSELF.",
  "THERE'S POETRY IN EVERYTHING, FIND IT.",
  "DRESS BETTER THAN YOUR COMPETITION.",
  "INTERESTING PEOPLE ARE INTERESTED.",
];

/**
 * Reference [ 07 / 09 ] POOL RULES — an enormous numbered list in all-caps
 * mono, with rules dimmed by default and lit as they enter the viewport.
 */
export function PoolRules() {
  const listRef = useRef<HTMLOListElement | null>(null);
  const [litIndex, setLitIndex] = useState(-1);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const rows = Array.from(list.querySelectorAll<HTMLLIElement>("li"));

    let raf = 0;
    const compute = () => {
      raf = 0;
      const vh = window.innerHeight || 1;
      const anchor = vh * 0.55;
      let best = -1;
      rows.forEach((row, i) => {
        const rect = row.getBoundingClientRect();
        if (rect.top <= anchor) best = i;
      });
      setLitIndex(best);
    };
    const schedule = () => {
      if (raf) return;
      raf = requestAnimationFrame(compute);
    };
    compute();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return (
    <section
      aria-labelledby="rules-heading"
      className="relative border-t border-[var(--rule-hairline)] pb-[var(--space-section)]"
      id="principles"
    >
      <SectionRegister index={7} label="POOL RULES" />

      <div className="mx-auto max-w-[var(--container-wide)] px-[var(--grid-margin)] pt-[calc(var(--space-section)*0.5)]">
        <h2 className="sr-only" id="rules-heading">
          Studio principles
        </h2>

        <ol
          className="font-[family-name:var(--font-mono)] text-[clamp(1.25rem,3.2vw,2.5rem)] leading-[1.35] tracking-[var(--tracking-mono)] uppercase"
          ref={listRef}
        >
          {rules.map((rule, i) => (
            <li
              className="flex items-baseline gap-6 transition-colors duration-[var(--duration-slow)] ease-[var(--ease-standard)]"
              key={rule}
              style={{
                color: i <= litIndex ? "var(--paper-100)" : "var(--paper-500)",
              }}
            >
              <span className={cn("w-[3ch] shrink-0 text-[0.65em]", i <= litIndex ? "text-[var(--paper-300)]" : "text-[var(--paper-500)]")}>
                {String(i + 1).padStart(3, "0")}.
              </span>
              <span>{rule}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
