import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import PageIntro from "@/components/page-intro";
import LocalizedText from "@/components/localized-text";
import { ButtonLink } from "@/components/ui/Button";
import { gearPage } from "@/data/pages";

export const metadata: Metadata = {
  title: "Gear",
  description: "Giant apparel and accessories are coming soon at Giant Mongolia. Shop bikes in the meantime.",
};

export default function GearPage() {
  return (
    <main>
      <PageIntro id="gear-heading" eyebrow={gearPage.eyebrow} title={gearPage.title} lead={gearPage.lead} />

      <section aria-labelledby="gear-heading" className="panel">
        <div className="wrap">
          <LocalizedText as="p" className="type-title" text="Coming soon" />
          <LocalizedText
            as="p"
            className="type-lead mt-4"
            text="Helmets, kits, and components will live here. Until then, the 2026 bike range is ready to ride."
          />
          <ButtonLink href="/bikes" variant="secondary" size="md" className="mt-8">
            <LocalizedText text="Shop bikes" />
            <ArrowRight className="arrow h-5 w-5" aria-hidden="true" />
          </ButtonLink>
        </div>
      </section>
    </main>
  );
}
