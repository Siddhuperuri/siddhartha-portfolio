"use client";

import { BookOpen, FlaskConical, FolderOpen, Home, Mail, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

const destinations = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/work", icon: FolderOpen, label: "Work" },
  { href: "/about", icon: User, label: "About" },
  { href: "/insights", icon: BookOpen, label: "Insights" },
  { href: "/lab", icon: FlaskConical, label: "Lab" },
  { href: "/contact", icon: Mail, label: "Contact" },
] as const;

const isActive = (pathname: string, href: string) =>
  href === "/" ? pathname === "/" : pathname.startsWith(href);

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]";

/**
 * Primary navigation. From `lg` up it is a slim glass rail on the left, every
 * label always visible, that never grows or opens over the page: the grid
 * margin is widened at `lg` (see globals.css) so the rail sits in its own
 * gutter and covers nothing. Below `lg` it is a bar along the bottom edge; the
 * footer reserves room for it.
 */
export function SiteNav() {
  const pathname = usePathname();

  return (
    <>
      <nav
        aria-label="Primary"
        className="fixed top-1/2 left-3 z-40 hidden -translate-y-1/2 lg:block"
      >
        <div className="flex w-[4.25rem] flex-col gap-1 rounded-2xl border border-[var(--rule-default)] bg-[rgba(16,16,16,0.94)] p-1 shadow-[0_18px_48px_-12px_rgba(0,0,0,0.6)] backdrop-blur-xl">
          <div className="grid h-12 place-items-center">
            <span
              aria-hidden
              className="grid size-[34px] place-items-center rounded-full bg-[var(--red-500)] font-[family-name:var(--font-mono)] text-[13px] font-medium text-[var(--ink-950)]"
            >
              S
            </span>
          </div>

          <div aria-hidden className="mx-2 h-px bg-[var(--rule-hairline)]" />

          <ul className="flex flex-col gap-1">
            {destinations.map(({ href, icon: Icon, label }) => {
              const active = isActive(pathname, href);
              return (
                <li key={href}>
                  <Link
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative flex h-14 flex-col items-center justify-center gap-1 rounded-xl font-[family-name:var(--font-mono)] text-[11px] tracking-[0.04em] uppercase transition-colors duration-[var(--duration-fast)] motion-reduce:transition-none",
                      focusRing,
                      active
                        ? "bg-white/[0.09] text-[var(--paper-100)]"
                        : "text-[var(--paper-300)] hover:bg-white/[0.05] hover:text-[var(--paper-100)]",
                    )}
                    href={href}
                  >
                    {active && (
                      <span
                        aria-hidden
                        className="absolute top-3 bottom-3 left-0 w-0.5 rounded-full bg-[var(--red-500)]"
                      />
                    )}
                    <Icon aria-hidden className="size-[20px]" strokeWidth={1.6} />
                    <span>{label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      <nav
        aria-label="Primary"
        className="fixed inset-x-0 bottom-0 z-40 border-t border-[var(--rule-default)] bg-[rgba(16,16,16,0.94)] pb-[env(safe-area-inset-bottom)] backdrop-blur-xl lg:hidden"
      >
        <ul className="mx-auto flex max-w-md items-stretch justify-between px-2">
          {destinations.map(({ href, icon: Icon, label }) => {
            const active = isActive(pathname, href);
            return (
              <li className="flex-1" key={href}>
                <Link
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative flex min-h-14 flex-col items-center justify-center gap-1 rounded-lg px-1 font-[family-name:var(--font-mono)] text-[11px] tracking-[var(--tracking-eyebrow)] uppercase",
                    focusRing,
                    active ? "text-[var(--paper-100)]" : "text-[var(--paper-400)]",
                  )}
                  href={href}
                >
                  {active && (
                    <span
                      aria-hidden
                      className="absolute top-0 h-0.5 w-8 rounded-full bg-[var(--red-500)]"
                    />
                  )}
                  <Icon aria-hidden className="size-5" strokeWidth={1.6} />
                  <span>{label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
