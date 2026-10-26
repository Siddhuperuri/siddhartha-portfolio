"use client";

import { BookOpen, FlaskConical, FolderOpen, Home, Mail, User } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useMemo } from "react";

import { MagneticDock } from "@/components/ui/magnetic-dock";

const destinations = [
  { href: "/", icon: Home, id: "home", label: "Home" },
  { href: "/work", icon: FolderOpen, id: "work", label: "Work" },
  { href: "/about", icon: User, id: "about", label: "About" },
  { href: "/insights", icon: BookOpen, id: "insights", label: "Insights" },
  { href: "/lab", icon: FlaskConical, id: "lab", label: "Lab" },
  { href: "/contact", icon: Mail, id: "contact", label: "Contact" },
] as const;

/**
 * Site navigation as a magnetic dock pinned to the bottom of the viewport.
 * The header stays minimal; this is how the other routes are reached.
 */
export function SiteDock() {
  const router = useRouter();
  const pathname = usePathname();

  const items = useMemo(
    () =>
      destinations.map(({ href, icon: Icon, id, label }) => ({
        icon: (
          <Icon aria-hidden className="size-full p-[22%] text-[var(--paper-100)]" />
        ),
        id,
        isActive: href === "/" ? pathname === "/" : pathname.startsWith(href),
        label,
        onClick: () => router.push(href),
      })),
    [pathname, router],
  );

  return (
    <nav
      aria-label="Primary"
      className="pointer-events-none fixed inset-x-0 bottom-4 z-40 flex justify-center px-4"
    >
      <div className="pointer-events-auto">
        <MagneticDock
          className="!rounded-none !border-[var(--rule-default)] !bg-[rgba(10,10,10,0.78)] backdrop-blur-xl"
          iconSize={44}
          items={items}
          magneticDistance={110}
          maxScale={1.55}
          variant="transparent"
        />
      </div>
    </nav>
  );
}
