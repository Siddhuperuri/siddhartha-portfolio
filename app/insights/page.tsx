import type { Metadata } from "next";

import { AuthoritySection } from "@/components/authority/authority-section";
import { SkipLink } from "@/components/chrome/skip-link";

export const metadata: Metadata = {
  alternates: { canonical: "/insights" },
  description: "Notes on product thinking, visual systems, and creative technology by Siddhartha.",
  title: "Insights",
};

export default function InsightsPage() {
  return (
    <>
      <SkipLink />
      <main id="main-content">
        <AuthoritySection />
      </main>
    </>
  );
}
