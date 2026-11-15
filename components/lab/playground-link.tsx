import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

/** The link out to an experiment's own page, where it can be edited. */
export function PlaygroundLink({ slug, title }: { slug: string; title: string }) {
  return (
    <Link
      aria-label={`Open ${title} in the playground`}
      className="group inline-flex h-10 shrink-0 items-center gap-2 border border-[var(--rule-strong)] px-3 font-[family-name:var(--font-mono)] text-[10px] tracking-[var(--tracking-eyebrow)] text-[var(--paper-100)] uppercase transition-colors duration-[var(--duration-fast)] hover:border-[var(--red-500)] hover:bg-[var(--red-500)] hover:text-[var(--ink-950)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--red-500)] motion-reduce:transition-none"
      href={`/lab/${slug}`}
    >
      Open &amp; edit
      <ArrowUpRight
        aria-hidden
        className="size-3.5 transition-transform duration-[var(--duration-fast)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none"
      />
    </Link>
  );
}
