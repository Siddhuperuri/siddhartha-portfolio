"use client";

import { useEffect, useState } from "react";

// Longest the idle callback may be held off once it is due.
const IDLE_TIMEOUT_MS = 4000;

/**
 * True once the page has loaded, `delayMs` has passed and the main thread has
 * had a quiet moment: the time for work that nobody is waiting for and that
 * should not compete with the first screen coming up.
 */
export function useIdleAfterLoad(delayMs: number) {
  const [idle, setIdle] = useState(false);

  useEffect(() => {
    let timeout = 0;
    let idleCallback = 0;

    const whenIdle = () => {
      if (typeof window.requestIdleCallback === "function") {
        idleCallback = window.requestIdleCallback(() => setIdle(true), {
          timeout: IDLE_TIMEOUT_MS,
        });
      } else {
        setIdle(true);
      }
    };
    const onLoad = () => {
      timeout = window.setTimeout(whenIdle, delayMs);
    };

    if (document.readyState === "complete") onLoad();
    else window.addEventListener("load", onLoad, { once: true });

    return () => {
      window.removeEventListener("load", onLoad);
      window.clearTimeout(timeout);
      if (idleCallback) window.cancelIdleCallback(idleCallback);
    };
  }, [delayMs]);

  return idle;
}
