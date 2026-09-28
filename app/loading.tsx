export default function Loading() {
  return (
    <div aria-live="polite" className="grid min-h-screen place-items-center bg-[var(--background)] text-[var(--text-secondary)]" role="status">
      <span className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.16em]">Loading portfolio</span>
    </div>
  );
}
