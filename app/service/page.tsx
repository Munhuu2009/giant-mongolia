import type { Metadata } from "next";
import PageIntro from "@/components/page-intro";
import LocalizedText from "@/components/localized-text";
import { ButtonLink } from "@/components/ui/Button";
import { servicePage } from "@/data/pages";

export const metadata: Metadata = {
  title: "Service",
  description:
    "Bike fitting, repairs, and warranty support from the Giant Mongolia workshop in Ulaanbaatar.",
};

export default function ServicePage() {
  return (
    <main>
      <PageIntro
        id="service-heading"
        eyebrow={servicePage.eyebrow}
        title={servicePage.title}
        lead={servicePage.lead}
      />

      <section aria-labelledby="service-heading" className="panel">
        <div className="wrap">
          <ul className="spec-list">
            {servicePage.items.map((item) => (
              <li key={item.title} className="spec-card">
                <LocalizedText as="h2" className="type-title" text={item.title} />
                <LocalizedText as="p" text={item.body} />
              </li>
            ))}
          </ul>
          <ButtonLink href="/stores" variant="secondary" size="md" className="mt-8">
            <LocalizedText text="Visit the workshop" />
          </ButtonLink>
        </div>
      </section>
    </main>
  );
}
