import Link from "next/link";

import { SkipLink } from "@/components/chrome/skip-link";
import { Container } from "@/components/primitives/container";

export default function NotFound() {
  return (
    <>
      <SkipLink />
      <main className="grid min-h-[70vh] place-items-center" id="main-content">
        <Container size="reading">
          <p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.16em] text-[var(--accent)]">
            404 — Not found
          </p>
          <h1 className="mt-[var(--space-5)] font-[family-name:var(--font-display)] text-5xl font-semibold leading-[var(--leading-display)] tracking-[var(--tracking-display)] text-[var(--text-primary)]">
            That route is not part of this portfolio.
          </h1>
          <p className="mt-[var(--space-6)] leading-[var(--leading-body)] text-[var(--text-secondary)]">
            The work index is a good place to continue exploring.
          </p>
          <Link className="mt-[var(--space-8)] inline-flex rounded-[var(--radius-pill)] bg-[var(--accent)] px-[var(--control-padding-x-lg)] py-[var(--space-3)] font-medium text-[var(--accent-foreground)]" href="/work">
            View work
          </Link>
        </Container>
      </main>
    </>
  );
}
