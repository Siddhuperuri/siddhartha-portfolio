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
 * Bottom-left HUD metadata: location + real local time in Siddhartha's
 * timezone, ticking every second; not a static string.
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
    <div className="inline-flex items-center gap-2 font-[family-name:var(--font-mono)] text-[11px] tracking-[var(--tracking-eyebrow)] text-[var(--paper-300)] uppercase">
      <span>IN</span>
      <span aria-hidden>⊕</span>
      <span suppressHydrationWarning>{time ?? "--:--"} IST</span>
    </div>
  );
}
