import { BlackHoleBackdrop } from "@/components/hero/black-hole-backdrop";
import { GlassHeadline } from "@/components/hero/glass-headline";
import { LiveClock } from "@/components/hero/live-clock";

// PLACEHOLDER — swap for Siddhartha's own statement once supplied.
// Deliberately not a copy of the reference's "Sites that move".
// NOTE: the glass headline renders /assets/hero/ideas-made-tangible.svg (glyph
// outlines of this exact copy) — changing the words means regenerating it.
const headlineLineOne = "Ideas made";
const headlineLineTwo = "tangible";

const positioningStatement =
  "Peruri Jai Sai Siddhartha — a product-minded visual designer and creative front-end builder shipping interfaces, identities, and interactive prototypes with the pace of a small studio.";

export function HeroExperience() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate bg-[var(--ink-950)]"
      id="top"
    >
      {/* Everything above the backdrop is pointer-events-none (interactive
          children opt back in): the canvas must be the hit target for hover and
          touch, because that is what drives the camera orbit. */}
      <div className="pointer-events-none relative flex h-[100svh] min-h-[36rem] flex-col overflow-hidden">
        {/* Live WebGPU black hole over a static CSS fallback. */}
        <BlackHoleBackdrop />

        {/* Scrim: the camera orbits with the pointer, so the bright disc can swing
            behind the headline and metadata. This keeps their contrast no matter
            where it lands. No z-index on this or the content below: the glass
            headline is screen-blended and must share a stacking context with the
            black hole, so paint order here comes from DOM order alone. */}
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-[48%]"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.5) 55%, rgba(0,0,0,0.82) 100%)",
          }}
        />

        <h1 className="sr-only" id="hero-title">
          {headlineLineOne} {headlineLineTwo}
        </h1>

        {/* Visual headline (glass, with a solid-text fallback), centred over the
            disc — glass needs something bright behind it to read as glass. The
            real h1 is the sr-only one above. Centred with flexbox, not a
            transform: a transform on an ancestor would create a stacking context
            and break the glass's screen blend with the black hole. */}
        <div className="absolute inset-0 flex items-center">
          <GlassHeadline text={`${headlineLineOne} ${headlineLineTwo}`} />
        </div>

        <div className="relative mt-auto w-full">
          <div className="mx-auto flex w-full max-w-[var(--container-wide)] flex-col gap-[var(--space-5)] px-[var(--grid-margin)] pt-[var(--space-6)] pb-[var(--space-6)] md:flex-row md:items-end md:justify-between md:gap-8 md:pb-[var(--space-8)]">
            <LiveClock />
            <p className="pointer-events-auto max-w-[30rem] font-[family-name:var(--font-sans)] text-[14px] leading-[1.55] text-[var(--paper-200)] md:text-right md:text-[15px]">
              {positioningStatement}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
