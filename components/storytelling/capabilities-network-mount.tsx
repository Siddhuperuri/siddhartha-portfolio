"use client";

import dynamic from "next/dynamic";

/**
 * storytelling.tsx is a Server Component; next/dynamic's ssr:false option
 * is only valid from a Client Component, so the dynamic import lives here
 * instead of inline at the call site.
 */
export const CapabilitiesNetwork = dynamic(
  () => import("@/components/storytelling/capabilities-network").then((module) => module.CapabilitiesNetwork),
  {
    loading: () => <div aria-hidden className="h-full w-full" />,
    ssr: false,
  },
);
