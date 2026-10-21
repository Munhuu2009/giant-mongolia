import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import PageIntro from "@/components/page-intro";
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
          <p className="type-title">{/* PLACEHOLDER */ "Coming soon"}</p>
          <p className="type-lead mt-4">
            Helmets, kits, and components will live here. Until then, the 2026 bike range is ready to ride.
          </p>
          <ButtonLink href="/bikes" variant="secondary" size="md" className="mt-8">
            Shop bikes
            <ArrowRight className="arrow h-5 w-5" aria-hidden="true" />
          </ButtonLink>
        </div>
      </section>
    </main>
  );
}
