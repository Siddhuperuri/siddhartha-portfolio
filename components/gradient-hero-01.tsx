type GradientHero01Props = {
  description?: string;
  eyebrow?: string;
  primary?: { href: string; label: string };
  secondary?: { href: string; label: string };
  title?: string;
};

/**
 * Componentry "gradient hero" block, re-coloured to the portfolio palette (ink
 * ground, one red glow) and driven by props instead of its demo copy.
 */
export function GradientHero01({
  description = "A place for the experiments that did not belong on a case study.",
  eyebrow = "Playground",
  primary = { href: "/work", label: "See the work" },
  secondary = { href: "/contact", label: "Get in touch" },
  title = "Small experiments, built to be played with",
}: GradientHero01Props) {
  return (
    <section className="relative min-h-[80svh] overflow-hidden bg-[var(--ink-950)] text-[var(--paper-100)]">
      <div
        className="absolute inset-x-[-18%] bottom-[-34%] h-[78%] rounded-[100%] blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(255, 61, 46, 0.55) 0%, rgba(217, 44, 34, 0.32) 34%, rgba(179, 36, 26, 0.18) 58%, transparent 78%)",
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-[68%]"
        style={{
          background:
            "linear-gradient(to top, rgba(179, 36, 26, 0.4), rgba(255, 61, 46, 0.14) 42%, transparent 78%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 55%, color-mix(in oklab, var(--ink-950) 18%, transparent) 0%, transparent 34%, color-mix(in oklab, var(--ink-950) 90%, transparent) 78%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, var(--ink-950) 0%, color-mix(in oklab, var(--ink-950) 68%, transparent) 38%, color-mix(in oklab, var(--ink-950) 12%, transparent) 100%)",
        }}
      />

      <div className="relative mx-auto flex min-h-[80svh] max-w-6xl flex-col items-center justify-center px-6 py-24 text-center">
        <div className="border border-[var(--rule-default)] bg-[rgba(10,10,10,0.5)] px-4 py-1.5 font-[family-name:var(--font-mono)] text-[11px] tracking-[var(--tracking-eyebrow)] text-[var(--paper-300)] uppercase backdrop-blur-md">
          {eyebrow}
        </div>

        <h1 className="mt-8 max-w-5xl font-[family-name:var(--font-display)] text-5xl leading-[0.96] font-normal tracking-[var(--tracking-display)] text-balance md:text-6xl lg:text-7xl">
          {title}
        </h1>

        <p className="mt-6 max-w-2xl font-[family-name:var(--font-sans)] text-base leading-7 text-pretty text-[var(--paper-200)] md:text-lg">
          {description}
        </p>

        <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
          <a
            className="inline-flex h-11 items-center justify-center border border-[var(--red-500)] bg-[var(--red-500)] px-6 font-[family-name:var(--font-mono)] text-[11px] tracking-[var(--tracking-eyebrow)] text-[var(--ink-950)] uppercase transition-colors hover:border-[var(--red-400)] hover:bg-[var(--red-400)]"
            href={primary.href}
          >
            {primary.label}
          </a>
          <a
            className="inline-flex h-11 items-center justify-center border border-[var(--paper-100)] px-6 font-[family-name:var(--font-mono)] text-[11px] tracking-[var(--tracking-eyebrow)] text-[var(--paper-100)] uppercase transition-colors hover:bg-[var(--paper-100)] hover:text-[var(--ink-950)]"
            href={secondary.href}
          >
            {secondary.label}
          </a>
        </div>
      </div>
    </section>
  );
}
