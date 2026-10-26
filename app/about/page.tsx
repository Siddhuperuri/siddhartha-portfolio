import type { Metadata } from "next";

import { SkipLink } from "@/components/chrome/skip-link";
import { AboutExperience } from "@/components/about/about-experience";
import { JsonLd } from "@/components/seo/json-ld";
import { profile } from "@/content/profile";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/about" },
  description: profile.statement,
  title: "About",
};

export default function AboutPage() {
  return (
    <>
      <SkipLink />
      <JsonLd
        schema={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          description: profile.statement,
          name: `About ${profile.name}`,
          url: new URL("/about", siteUrl).toString(),
        }}
      />
      <main id="main-content">
        <AboutExperience />
      </main>
    </>
  );
}
