"use client";

import { useEffect } from "react";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="grid min-h-screen place-items-center bg-[var(--background)] px-[var(--grid-margin)]" id="main-content">
      <section className="max-w-[var(--container-reading)]">
        <p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.16em] text-[var(--accent)]">Something went wrong</p>
        <h1 className="mt-[var(--space-5)] font-[family-name:var(--font-display)] text-5xl font-semibold leading-[var(--leading-display)] tracking-[var(--tracking-display)] text-[var(--text-primary)]">The page could not finish loading.</h1>
        <p className="mt-[var(--space-6)] leading-[var(--leading-body)] text-[var(--text-secondary)]">Please try again. If the problem continues, contact Siddhartha directly by email.</p>
        <button className="mt-[var(--space-8)] rounded-[var(--radius-pill)] bg-[var(--accent)] px-[var(--control-padding-x-lg)] py-[var(--space-3)] font-medium text-[var(--accent-foreground)]" onClick={reset} type="button">Try again</button>
      </section>
    </main>
  );
}
