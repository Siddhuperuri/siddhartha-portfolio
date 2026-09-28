import type { Metadata } from "next";

import { SkipLink } from "@/components/chrome/skip-link";
import { PrivacyPolicy } from "@/components/legal/privacy-policy";

export const metadata: Metadata = {
  alternates: { canonical: "/privacy-policy" },
  description: "What this site collects, what it doesn't, and where any of it goes.",
  title: "Privacy Policy",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <SkipLink />
      <main id="main-content">
        <PrivacyPolicy />
      </main>
    </>
  );
}
