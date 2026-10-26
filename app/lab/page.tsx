import type { Metadata } from "next";

import { SkipLink } from "@/components/chrome/skip-link";
import { LabExperiments } from "@/components/lab/lab-experiments";

export const metadata: Metadata = {
  alternates: { canonical: "/lab" },
  description:
    "Interactive experiments by Siddhartha: WebGL, motion and pointer-driven interface studies.",
  title: "Lab",
};

export default function LabPage() {
  return (
    <>
      <SkipLink />
      <main id="main-content">
        <LabExperiments />
      </main>
    </>
  );
}
