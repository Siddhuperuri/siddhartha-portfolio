"use client";

import type { PropsWithChildren } from "react";

import { AnalyticsProvider } from "@/components/analytics/analytics-provider";
import { LenisProvider } from "@/components/providers/lenis-provider";

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <>
      <LenisProvider />
      {children}
      <AnalyticsProvider />
    </>
  );
}
