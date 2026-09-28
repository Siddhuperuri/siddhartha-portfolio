export default function CaseStudyLoading() {
  return (
    <div
      aria-live="polite"
      className="min-h-screen bg-[var(--background)]"
      role="status"
    >
      <div className="border-b border-[var(--border-subtle)] py-[var(--space-section)]">
        <div className="mx-auto w-full max-w-[var(--container-wide)] px-[var(--grid-margin)]">
          <div className="h-4 w-16 rounded-[var(--radius-xs)] bg-[var(--surface-raised)]" />
          <div className="mt-[var(--space-16)] space-y-[var(--space-4)]">
            <div className="h-3 w-32 rounded-[var(--radius-xs)] bg-[var(--surface-raised)]" />
            <div className="h-12 w-full max-w-[36rem] rounded-[var(--radius-sm)] bg-[var(--surface-raised)] md:h-16" />
            <div className="h-6 w-full max-w-[28rem] rounded-[var(--radius-xs)] bg-[var(--surface-raised)]" />
          </div>
          <div className="mt-[var(--space-12)] grid gap-[var(--space-6)] border-t border-[var(--border-default)] pt-[var(--space-6)] md:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i}>
                <div className="h-3 w-12 rounded-[var(--radius-xs)] bg-[var(--surface-raised)]" />
                <div className="mt-[var(--space-2)] h-4 w-24 rounded-[var(--radius-xs)] bg-[var(--surface-raised)]" />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="py-[var(--space-section)]">
        <div className="mx-auto w-full max-w-[var(--container-wide)] px-[var(--grid-margin)]">
          <div className="h-3 w-24 rounded-[var(--radius-xs)] bg-[var(--surface-raised)]" />
          <div className="mt-[var(--space-6)] h-10 w-full max-w-[50rem] rounded-[var(--radius-sm)] bg-[var(--surface-raised)] md:h-14" />
        </div>
      </div>
      <span className="sr-only">Loading case study</span>
    </div>
  );
}
