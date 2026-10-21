import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import PageIntro from "@/components/page-intro";
import LocalizedText from "@/components/localized-text";
import { ButtonLink } from "@/components/ui/Button";
import { contactPage } from "@/data/pages";
import { store } from "@/data/store";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Giant Mongolia in Ulaanbaatar for bikes, service, and store visits.",
};

export default function ContactPage() {
  return (
    <main>
      <PageIntro
        id="contact-heading"
        eyebrow={contactPage.eyebrow}
        title={contactPage.title}
        lead={contactPage.lead}
      />

      <section aria-labelledby="contact-heading" className="panel">
        <div className="wrap">
          <dl className="contact-grid">
            <div className="spec-card">
              <dt className="type-label flex items-center gap-2">
                <MapPin className="h-4 w-4" aria-hidden="true" />
                <LocalizedText text="Address" />
              </dt>
              <dd className="mt-3">
                {store.address.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </dd>
            </div>
            <div className="spec-card">
              <dt className="type-label flex items-center gap-2">
                <Clock className="h-4 w-4" aria-hidden="true" />
                <LocalizedText text="Hours" />
              </dt>
              <dd className="mt-3">
                <LocalizedText as="span" className="block" text="Mon–Fri: 10:00 – 20:00" />
                <LocalizedText as="span" className="block" text="Sat–Sun: 11:00 – 19:00" />
              </dd>
            </div>
            <div className="spec-card">
              <dt className="type-label flex items-center gap-2">
                <Phone className="h-4 w-4" aria-hidden="true" />
                <LocalizedText text="Phone" />
              </dt>
              <dd className="mt-3">
                <a href={`tel:${store.phone.replace(/\s/g, "")}`} className="plain-link">
                  {store.phone}
                </a>
              </dd>
            </div>
            <div className="spec-card">
              <dt className="type-label flex items-center gap-2">
                <Mail className="h-4 w-4" aria-hidden="true" />
                <LocalizedText text="Email" />
              </dt>
              <dd className="mt-3">
                {/* PLACEHOLDER */}
                <a href={`mailto:${store.email}`} className="plain-link">
                  {store.email}
                </a>
              </dd>
            </div>
          </dl>

          <ButtonLink href="/stores" variant="secondary" size="md" className="mt-8">
            <LocalizedText text="Flagship store details" />
          </ButtonLink>
        </div>
      </section>
    </main>
  );
}
