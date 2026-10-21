import type { Metadata } from "next";
import FlagshipStore from "@/components/flagship-store";
import LocalizedText from "@/components/localized-text";
import PageIntro from "@/components/page-intro";
import { aboutPage } from "@/data/pages";

export const metadata: Metadata = {
  title: "About",
  description:
    "Giant Mongolia is the official Giant Bicycles retailer in Ulaanbaatar, with a flagship store, test rides, and service.",
};

export default function AboutPage() {
  return (
    <main>
      <PageIntro id="about-heading" eyebrow={aboutPage.eyebrow} title={aboutPage.title} lead={aboutPage.lead} />

      <section aria-labelledby="about-heading" className="panel">
        <div className="wrap">
          {aboutPage.paragraphs.map((paragraph) => (
            <LocalizedText key={paragraph} as="p" className="type-lead mb-4" text={paragraph} />
          ))}
        </div>
      </section>

      <FlagshipStore />
    </main>
  );
}
