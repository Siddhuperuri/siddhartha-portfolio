"use client";

import type { PropsWithChildren } from "react";

import { AnalyticsProvider } from "@/components/analytics/analytics-provider";
import { LenisProvider } from "@/components/providers/lenis-provider";
import { RenderParking } from "@/components/providers/render-parking";

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <>
      <LenisProvider />
      <RenderParking />
      {children}
      <AnalyticsProvider />
    </>
  );
}
