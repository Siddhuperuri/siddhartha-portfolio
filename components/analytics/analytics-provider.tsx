"use client";

import { Analytics } from "@vercel/analytics/next";
import { track } from "@vercel/analytics";

import type { AnalyticsEventName } from "@/lib/analytics/events";

type EventProperties = Record<string, boolean | number | string>;

/**
 * Never throws — callers fire this ahead of the real action (e.g. opening a
 * mailto link), so a broken/blocked analytics call must not stop that
 * action from running.
 */
export function trackConversionEvent(
  name: AnalyticsEventName,
  properties: EventProperties = {},
) {
  try {
    track(name, properties);
  } catch (error) {
    console.error(error);
  }
}

export function AnalyticsProvider() {
  return <Analytics />;
}
