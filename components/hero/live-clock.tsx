"use client";

import { useEffect, useState } from "react";

const timeZone = "Asia/Kolkata";

const timeFormatter = new Intl.DateTimeFormat("en-GB", {
  hour: "2-digit",
  hour12: false,
  minute: "2-digit",
  timeZone,
});

/**
 * Bottom-left HUD metadata — mirrors the reference's "DESIGN BY DYLAN / NL /
 * 08:58 CET" block. Real local time in Siddhartha's timezone, ticking every
 * second; not a static string.
 */
export function LiveClock() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const update = () => setTime(timeFormatter.format(new Date()));
    update();
    const interval = window.setInterval(update, 1000);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col gap-1 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[var(--tracking-eyebrow)] text-[var(--paper-300)]">
      <span>
        Design by <span className="text-[var(--paper-100)]">Siddhartha</span>
      </span>
      <span className="inline-flex items-center gap-2">
        <span>IN</span>
        <span aria-hidden>⊕</span>
        <span suppressHydrationWarning>{time ?? "--:--"} IST</span>
      </span>
    </div>
  );
}
