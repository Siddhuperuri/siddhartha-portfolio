import Link from "next/link";

import { SkipLink } from "@/components/chrome/skip-link";
import { InViewMount } from "@/components/primitives/in-view-mount";
import { OutlineButton } from "@/components/primitives/outline-button";
import { SectionRegister } from "@/components/primitives/section-register";
import { AsciiEffect } from "@/components/ui/ascii-effect";
import { EyeTracking } from "@/components/ui/eye-tracking";
import { MatrixRain } from "@/components/ui/matrix-rain";
import { coverSrc } from "@/lib/covers";

export default function NotFound() {
  return (
    <>
      <SkipLink />
      <main className="relative isolate overflow-hidden" id="main-content">
        <InViewMount
          className="absolute inset-0 -z-10 opacity-25"
          fallback={<div aria-hidden className="h-full w-full bg-[var(--ink-950)]" />}
          staticOk
        >
          <MatrixRain
            className="h-full w-full"
            fixedColor="#ff3d2e"
            fontSize={14}
            speed={60}
            transparent
          />
        </InViewMount>

        <SectionRegister index={4} label="NOT FOUND" total={4} />
        <div className="mx-auto grid min-h-[80svh] max-w-[var(--container-wide)] grid-cols-12 items-center gap-x-[var(--grid-gutter)] gap-y-[var(--space-12)] px-[var(--grid-margin)] py-[var(--space-24)]">
          <div className="col-span-12 lg:col-span-6">
            <p className="font-[family-name:var(--font-mono)] text-[11px] tracking-[var(--tracking-eyebrow)] text-[var(--red-500)] uppercase">
              404 — Not found
            </p>
            <h1 className="mt-[var(--space-6)] max-w-[12ch] font-[family-name:var(--font-display)] text-[clamp(3.5rem,9vw,8rem)] leading-[0.92] font-normal tracking-[var(--tracking-display)] text-[var(--paper-100)]">
              Nothing lives here.
            </h1>
            <p className="mt-[var(--space-6)] max-w-[40ch] font-[family-name:var(--font-sans)] text-[17px] leading-[1.55] text-[var(--paper-200)]">
              That route is not part of this portfolio. The work index is a good place
              to continue exploring.
            </p>
            <div className="mt-[var(--space-10)] flex flex-wrap items-center gap-[var(--space-4)]">
              <OutlineButton href="/work" size="lg">
                View work
              </OutlineButton>
              <Link
                className="font-[family-name:var(--font-mono)] text-[12px] tracking-[var(--tracking-eyebrow)] text-[var(--paper-300)] uppercase transition-colors hover:text-[var(--paper-100)]"
                href="/"
              >
                Back home
              </Link>
            </div>
            <div aria-hidden className="mt-[var(--space-12)] text-[var(--paper-100)]">
              <EyeTracking
                eyeSize={72}
                gap={20}
                irisColor="#ff3d2e"
                irisColorSecondary="#b3241a"
                scleraColor="#f5f5f5"
              />
            </div>
          </div>
          <div aria-hidden className="col-span-12 lg:col-span-6">
            <InViewMount
              className="aspect-[8/5] w-full overflow-hidden border border-[var(--rule-default)]"
              fallback={<div className="h-full w-full bg-[var(--ink-900)]" />}
              staticOk
            >
              <AsciiEffect
                backgroundColor="#0a0a0a"
                className="h-full w-full"
                colors={["#6f6f6f", "#f5f5f5", "#ff3d2e"]}
                imageSrc={coverSrc("siddhartha")}
                variant="glitch"
              />
            </InViewMount>
          </div>
        </div>
      </main>
    </>
  );
}
