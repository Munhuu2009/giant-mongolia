import type { Metadata } from "next";
import PageIntro from "@/components/page-intro";
import TechnologySection from "@/components/technology-section";
import { technologyPage } from "@/data/pages";

export const metadata: Metadata = {
  title: "Technology",
  description:
    "Giant carbon, aluminum, Maestro suspension, and SyncDrive e-bike systems sold at Giant Mongolia.",
};

export default function TechnologyPage() {
  return (
    <main>
      <PageIntro
        id="technology-page-heading"
        eyebrow={technologyPage.eyebrow}
        title={technologyPage.title}
        lead={technologyPage.lead}
      />
      <TechnologySection />
    </main>
  );
}
