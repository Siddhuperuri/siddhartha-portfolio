import type { Metadata } from "next";

import { SkipLink } from "@/components/chrome/skip-link";
import { ContactPage } from "@/components/conversion/contact-page";

export const metadata: Metadata = {
  alternates: { canonical: "/contact" },
  description: "Contact Peruri Jai Sai Siddhartha about product design, UI/UX, and creative front-end opportunities.",
  title: "Contact",
};

export default function Contact() {
  return (
    <>
      <SkipLink />
      <main id="main-content">
        <ContactPage />
      </main>
    </>
  );
}
