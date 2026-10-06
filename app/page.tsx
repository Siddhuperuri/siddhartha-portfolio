import { SkipLink } from "@/components/chrome/skip-link";
import { ContactConversion } from "@/components/conversion/contact-conversion";
import { HeroExperience } from "@/components/hero/hero-experience";
import { AboutSection } from "@/components/storytelling/about-section";
import { PoolRules } from "@/components/storytelling/pool-rules";
import { ProcessSection } from "@/components/storytelling/process-section";
import { ServicesSection } from "@/components/storytelling/services-section";
import { StorySection } from "@/components/storytelling/story-section";
import { SkillsMarquee } from "@/components/work/skills-marquee";
import { WorkShowcase } from "@/components/work/work-showcase";

export default function HomePage() {
  return (
    <>
      <SkipLink />
      <main id="main-content">
        {/* [01/09] Hero — full-viewport WebGPU black hole (static fallback without WebGPU) */}
        <HeroExperience />
        {/* Partners rail */}
        <SkillsMarquee />
        {/* [02/09] About */}
        <AboutSection />
        {/* [03/09] Services */}
        <ServicesSection />
        {/* [04/09] How I Work */}
        <ProcessSection />
        {/* [05/09] Selected Work */}
        <WorkShowcase />
        {/* [07/09] Pool Rules */}
        <PoolRules />
        {/* [08/09] The Long Game */}
        <StorySection />
        {/* [09/09] FAQ + Closing banner */}
        <ContactConversion />
      </main>
    </>
  );
}
