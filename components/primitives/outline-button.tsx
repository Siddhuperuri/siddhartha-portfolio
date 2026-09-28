import Link from "next/link";
import type { AnchorHTMLAttributes, ComponentPropsWithoutRef, ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Reference button — the thin outline rectangle with mono uppercase label
 * and a small ↗ arrow. Used across CTAs: "ESCAPE VELOCITY", "MUM'S THE WORD",
 * "HUG IT OUT", "HERE". No fill, hover inverts to solid.
 */
type Variant = "outline" | "solid" | "red";
type Size = "sm" | "md" | "lg";

const base =
  "group inline-flex items-center gap-3 border font-[family-name:var(--font-mono)] uppercase tracking-[var(--tracking-eyebrow)] transition-colors duration-[var(--duration-base)] ease-[var(--ease-standard)]";

const sizes: Record<Size, string> = {
  sm: "h-8 px-3 text-[10px]",
  md: "h-10 px-4 text-[11px]",
  lg: "h-14 px-6 text-[13px]",
};

const variants: Record<Variant, string> = {
  outline:
    "border-[var(--paper-100)] text-[var(--paper-100)] hover:bg-[var(--paper-100)] hover:text-[var(--ink-950)]",
  solid:
    "border-[var(--paper-100)] bg-[var(--paper-100)] text-[var(--ink-950)] hover:bg-[transparent] hover:text-[var(--paper-100)]",
  red: "border-[var(--red-500)] bg-[var(--red-500)] text-[var(--ink-950)] hover:bg-[var(--red-400)] hover:border-[var(--red-400)]",
};

function Arrow() {
  return (
    <svg
      aria-hidden
      className="size-3 transition-transform duration-[var(--duration-base)] ease-[var(--ease-standard)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      viewBox="0 0 12 12"
    >
      <path d="M2 10 L10 2 M4 2 H10 V8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

type OutlineButtonProps = {
  children: ReactNode;
  className?: string;
  size?: Size;
  variant?: Variant;
  showArrow?: boolean;
} & (
  | ({ href: string; type?: never } & AnchorHTMLAttributes<HTMLAnchorElement>)
  | ({ href?: undefined } & ComponentPropsWithoutRef<"button">)
);

export function OutlineButton({
  children,
  className,
  size = "md",
  variant = "outline",
  showArrow = true,
  href,
  ...rest
}: OutlineButtonProps) {
  const classes = cn(base, sizes[size], variants[variant], className);
  const content = (
    <>
      <span className="leading-none">{children}</span>
      {showArrow ? <Arrow /> : null}
    </>
  );

  if (href) {
    if (href.startsWith("/")) {
      return (
        <Link
          className={classes}
          href={href}
          {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {content}
        </Link>
      );
    }
    return (
      <a className={classes} href={href} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {content}
      </a>
    );
  }

  return (
    <button className={classes} type="button" {...(rest as ComponentPropsWithoutRef<"button">)}>
      {content}
    </button>
  );
}
