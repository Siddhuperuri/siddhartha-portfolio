import type { Metadata } from "next";
import type { ReactNode } from "react";

import { Anton, Geist, Geist_Mono } from "next/font/google";

import { SiteFooter } from "@/components/chrome/site-footer";
import { SiteHeader } from "@/components/chrome/site-header";
import { AppProviders } from "@/components/providers/app-providers";
import { JsonLd } from "@/components/seo/json-ld";
import { siteConfig, siteUrl } from "@/lib/site";

import "./globals.css";

const geistSans = Geist({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600"],
});

const geistMono = Geist_Mono({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
});

// Scoped to the hero's mega-headline only — Anton is a display-only
// condensed grotesk, not a substitute for --font-display (Geist) used
// site-wide on every other heading.
const anton = Anton({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-condensed",
  weight: "400",
});

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  description: siteConfig.description,
  metadataBase: siteUrl,
  openGraph: {
    description: siteConfig.description,
    locale: "en_IN",
    siteName: siteConfig.name,
    title: siteConfig.title,
    type: "website",
    url: "/",
  },
  robots: { follow: true, index: true },
  title: {
    default: siteConfig.title,
    template: "%s — Siddhartha",
  },
};

type RootLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      className={`${geistSans.variable} ${geistMono.variable} ${anton.variable}`}
      lang="en"
      // Browser extensions (Dark Reader, Grammarly, etc.) inject attributes on
      // <html> before hydration. Scoped to this element's own attributes.
      suppressHydrationWarning
    >
      <body>
        <AppProviders>
          <JsonLd
            schema={{
              "@context": "https://schema.org",
              "@type": "Person",
              email: "siddharthaperuri12@gmail.com",
              jobTitle: "Product-minded visual designer and creative front-end builder",
              name: "Peruri Jai Sai Siddhartha",
              sameAs: [
                "https://www.linkedin.com/in/siddharthaperuri/",
                "https://github.com/Siddhuperuri",
              ],
              url: siteUrl.toString(),
            }}
          />
          <JsonLd
            schema={{
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: siteConfig.name,
              url: siteUrl.toString(),
            }}
          />
          <SiteHeader />
          {children}
          <SiteFooter />
        </AppProviders>
      </body>
    </html>
  );
}
