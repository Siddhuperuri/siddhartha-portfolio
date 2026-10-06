"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { OutlineButton } from "@/components/primitives/outline-button";
import { cn } from "@/lib/utils";

/**
 * Minimal strip pinned to the top: wordmark + year on the left, a single
 * contact CTA on the right. Other routes are reached from the page content.
 */
export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-[background-color,backdrop-filter] duration-[var(--duration-base)] ease-[var(--ease-standard)]",
        // The bar is always present, never fully transparent. Its contents are
        // paper-white, and pages like /contact and the footer sit on a light
        // ground — a transparent header made the nav unreadable there. Over the
        // near-black hero this scrim is effectively invisible anyway.
        scrolled
          ? "bg-[rgba(10,10,10,0.82)] backdrop-blur-md"
          : "bg-[rgba(10,10,10,0.55)] backdrop-blur-sm",
      )}
    >
      <div className="mx-auto flex max-w-[var(--container-wide)] items-center justify-between px-[var(--grid-margin)] py-[var(--space-4)]">
        {/* Left — wordmark + year */}
        <Link
          aria-label="Siddhartha — home"
          className="group flex flex-col font-[family-name:var(--font-mono)] text-[11px] leading-none tracking-[var(--tracking-eyebrow)] text-[var(--paper-100)] uppercase"
          href="/"
        >
          <span className="inline-flex items-baseline">
            SIDDHARTHA<span className="ml-0.5 text-[var(--paper-400)]">—</span>
          </span>
          <span className="mt-1 text-[var(--paper-400)]">
            ©{new Date().getFullYear()}
          </span>
        </Link>

        {/* Right — red CTA */}
        <div className="flex items-center justify-end">
          <OutlineButton href="/contact" showArrow={false} size="sm" variant="red">
            Contact me
          </OutlineButton>
        </div>
      </div>
    </header>
  );
}
