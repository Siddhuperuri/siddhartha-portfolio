"use client";

import { useEffect, useState, type RefObject } from "react";

/**
 * Whether the element is within `rootMargin` of the viewport (an
 * IntersectionObserver margin, e.g. "150% 0px"). False until first measured,
 * like the other client-only hooks here.
 */
export function useInView(ref: RefObject<Element | null>, rootMargin = "0px") {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => setInView(entries[entries.length - 1]?.isIntersecting ?? false),
      { rootMargin },
    );
    observer.observe(element);

    return () => observer.disconnect();
  }, [ref, rootMargin]);

  return inView;
}
