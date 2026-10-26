import { SkipLink } from "@/components/chrome/skip-link";
import { ContactConversion } from "@/components/conversion/contact-conversion";
import { HeroExperience } from "@/components/hero/hero-experience";
import { AboutIntro } from "@/components/home/about-intro";
import { CapabilitiesCircuit } from "@/components/home/capabilities-circuit";
import { ExploreStrip } from "@/components/home/explore-strip";
import { InsightsTeaser } from "@/components/home/insights-teaser";
import { ServicesGrid } from "@/components/home/services-grid";
import { VelocityBand } from "@/components/home/velocity-band";
import { PoolRules } from "@/components/storytelling/pool-rules";
import { WorkShowcase } from "@/components/work/work-showcase";

export default function HomePage() {
  return (
    <>
      <SkipLink />
      <main id="main-content">
        {/* [01/09] Hero — full-viewport WebGPU black hole (static fallback without WebGPU) */}
        <HeroExperience />
        {/* Velocity band — scroll-speed type */}
        <VelocityBand />
        {/* [02/09] About */}
        <AboutIntro />
        {/* [03/09] Services */}
        <ServicesGrid />
        {/* [04/09] Selected work */}
        <WorkShowcase />
        {/* [05/09] Artefacts */}
        <ExploreStrip />
        {/* [06/09] Capabilities */}
        <CapabilitiesCircuit />
        {/* [07/09] Pool Rules */}
        <PoolRules />
        {/* [08/09] Insights */}
        <InsightsTeaser />
        {/* [09/09] FAQ + closing banner */}
        <ContactConversion />
      </main>
    </>
  );
}
