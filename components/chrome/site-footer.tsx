"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useRef, useState } from "react";

import { OutlineButton } from "@/components/primitives/outline-button";
import { contactDetails } from "@/content/contact";
import { profile } from "@/content/profile";
import { useIdleAfterLoad } from "@/hooks/use-idle-after-load";
import { useInView } from "@/hooks/use-in-view";
import { useReducedMotionPreference } from "@/hooks/use-reduced-motion";

// Two separate dynamic imports, not one component with an internal branch —
// so a prefers-reduced-motion visitor's bundle never includes Rapier at all,
// rather than fetching the physics chunk and then not using it.
const HangingBadgeStatic = dynamic(
  () => import("@/components/chrome/hanging-badge-static").then((m) => m.HangingBadgeStatic),
  { loading: () => null, ssr: false },
);
const HangingBadgePhysics = dynamic(
  () => import("@/components/chrome/hanging-badge-physics").then((m) => m.HangingBadgePhysics),
  { loading: () => null, ssr: false },
);

const sitemap = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/insights", label: "Insights" },
  { href: "/contact", label: "Contact" },
] as const;

// The badge is a WebGL scene of its own (and a physics simulation), at the very
// bottom of the page. Setting it up is real work for the main thread, so it
// waits until the page has loaded and gone idle — or until the footer is this
// close, whichever is first — rather than competing with the first screen.
const BADGE_IDLE_DELAY_MS = 0;
const BADGE_NEAR = "150% 0px";
// It only draws while the footer is this close to the viewport.
const BADGE_ON_SCREEN = "25% 0px";

const elsewhere = [
  { href: `mailto:${contactDetails.email}`, label: "Email" },
  { href: contactDetails.linkedIn, label: "LinkedIn" },
  { href: contactDetails.github, label: "GitHub" },
] as const;

function ArrowUpIcon() {
  return (
    <svg
      aria-hidden
      className="size-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      viewBox="0 0 16 16"
    >
      <path d="M8 13V3M3.5 7.5L8 3l4.5 4.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * Closing spread: navigation, the badge and the closing CTA on a warm ground
 * that hands off from paper to the signal red, so the page is bookended
 * rather than just stopped.
 */
export function SiteFooter() {
  const prefersReducedMotion = useReducedMotionPreference();
  const year = new Date().getFullYear();

  const badgeRef = useRef<HTMLDivElement>(null);
  const badgeNear = useInView(badgeRef, BADGE_NEAR);
  const badgeOnScreen = useInView(badgeRef, BADGE_ON_SCREEN);
  const pageIdle = useIdleAfterLoad(BADGE_IDLE_DELAY_MS);
  // Once mounted it stays: tearing a WebGL context down and up again costs more
  // than keeping an idle one.
  const [badgeMounted, setBadgeMounted] = useState(false);
  if (!badgeMounted && (badgeNear || pageIdle)) setBadgeMounted(true);

  return (
    <footer className="relative isolate overflow-hidden">
      {/* Warm ground: paper at the top handing off to the signal red at the
          floor, so the closing CTA sits in the brand's own colour. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(to bottom, #edeae4 0%, #dedad3 26%, #c9c3ba 48%, #d99a7f 72%, #fb6a4a 88%, #ff3d2e 100%)",
        }}
      />

      <div className="mx-auto grid max-w-[var(--container-wide)] grid-cols-12 gap-x-[var(--grid-gutter)] gap-y-[var(--space-10)] px-[var(--grid-margin)] pt-[var(--space-24)]">
        {/* Left — navigation */}
        <nav aria-label="Footer navigation" className="col-span-6 md:col-span-2">
          <ul className="space-y-[var(--space-3)] font-[family-name:var(--font-sans)] text-[clamp(1rem,1.4vw,1.25rem)] text-[var(--ink-950)]">
            {sitemap.map((item) => (
              <li key={item.href}>
                <Link className="group relative inline-flex" href={item.href}>
                  {item.label}
                  <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-[var(--ink-950)] transition-transform duration-[var(--duration-base)] ease-[var(--ease-emphasized)] group-hover:scale-x-100" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="col-span-6 md:col-span-2">
          <ul className="space-y-[var(--space-3)] font-[family-name:var(--font-sans)] text-[clamp(1rem,1.4vw,1.25rem)] text-[var(--ink-950)]">
            {elsewhere.map((item) => (
              <li key={item.href}>
                <a
                  className="group relative inline-flex"
                  href={item.href}
                  rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                >
                  {item.label}
                  <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-[var(--ink-950)] transition-transform duration-[var(--duration-base)] ease-[var(--ease-emphasized)] group-hover:scale-x-100" />
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-[var(--space-6)] max-w-[26ch] font-[family-name:var(--font-sans)] text-[13px] leading-[1.6] text-[rgba(10,10,10,0.62)]">
            {profile.role}. Based in Vijayawada, India.
          </p>
        </div>

        {/* Centre — the badge */}
        <div
          aria-hidden
          className="col-span-12 -my-[var(--space-10)] h-[clamp(22rem,42vw,40rem)] md:col-span-4"
          ref={badgeRef}
        >
          {badgeMounted &&
            (prefersReducedMotion ? (
              <HangingBadgeStatic onScreen={badgeOnScreen} />
            ) : (
              <HangingBadgePhysics onScreen={badgeOnScreen} />
            ))}
        </div>

        {/* Right — closing CTA */}
        <div className="col-span-12 md:col-span-4 md:pl-[var(--space-8)]">
          <p className="max-w-[18ch] font-[family-name:var(--font-sans)] text-[clamp(1.5rem,2.4vw,2.1rem)] font-medium leading-[1.15] tracking-[var(--tracking-heading)] text-[var(--ink-950)]">
            Ready to start your next digital experience?
          </p>
          <div className="mt-[var(--space-6)]">
            <OutlineButton
              className="border-[var(--ink-950)] bg-[var(--ink-950)] text-[var(--paper-100)] hover:bg-transparent hover:text-[var(--ink-950)]"
              href="/contact"
              showArrow={false}
              size="lg"
            >
              <span className="mr-2 inline-block size-1.5 rounded-full bg-[var(--red-500)] align-middle" />
              Get in touch
            </OutlineButton>
          </div>
        </div>
      </div>

      {/* Legal strip */}
      {/* Sits on the brightest part of the red ground, so the ink is kept near
          full strength rather than the 0.66 used on the paper areas above. */}
      <div className="mx-auto flex max-w-[var(--container-wide)] flex-col gap-[var(--space-4)] px-[var(--grid-margin)] pb-[var(--space-12)] pt-[calc(var(--space-24)+20px)] font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[var(--tracking-eyebrow)] text-[rgba(10,10,10,0.88)] md:flex-row md:items-center md:justify-between">
        <p className="flex flex-wrap items-center gap-x-[var(--space-4)] gap-y-1">
          <span>
            &copy; {year} {profile.name}. All rights reserved.
          </span>
          <Link className="underline-offset-4 transition-colors hover:text-[var(--ink-950)] hover:underline" href="/privacy-policy">
            Privacy Policy
          </Link>
        </p>
        <p className="hidden md:block">
          Set in Geist &amp; Anton &middot; Built in Next.js
        </p>
        <Link
          aria-label="Back to top"
          className="inline-flex items-center gap-2 transition-colors hover:text-[var(--ink-950)]"
          href="#top"
        >
          Back to top
          <ArrowUpIcon />
        </Link>
      </div>
    </footer>
  );
}
