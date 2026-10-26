import type { Metadata } from "next";

import { SkipLink } from "@/components/chrome/skip-link";
import { WorkExplorer } from "@/components/work/work-explorer";

export const metadata: Metadata = {
  alternates: { canonical: "/work" },
  description:
    "Selected UI/UX, creative technology, and visual-system project case studies by Siddhartha.",
  title: "Selected work",
};

export default function WorkPage() {
  return (
    <>
      <SkipLink />
      <main id="main-content">
        <WorkExplorer />
      </main>
    </>
  );
}
