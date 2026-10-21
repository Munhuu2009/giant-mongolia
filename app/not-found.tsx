import { ArrowRight } from "lucide-react";
import PageIntro from "@/components/page-intro";
import { ButtonLink } from "@/components/ui/Button";
import { notFoundPage } from "@/data/pages";
import LocalizedText from "@/components/localized-text";

export default function NotFound() {
  return (
    <main>
      <PageIntro
        id="not-found-heading"
        eyebrow={notFoundPage.eyebrow}
        title={notFoundPage.title}
        lead={notFoundPage.lead}
      />

      <section aria-labelledby="not-found-heading" className="section">
        <div className="wrap">
          <ButtonLink href="/" variant="primary" size="lg">
            <LocalizedText text="Back home" />
            <ArrowRight className="arrow h-5 w-5" aria-hidden="true" />
          </ButtonLink>
        </div>
      </section>
    </main>
  );
}
