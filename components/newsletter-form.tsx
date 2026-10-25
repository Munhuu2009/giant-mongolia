"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import Button from "@/components/ui/Button";

export default function NewsletterForm() {
  const { t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // TODO: connect to an email provider or database to store subscribers.
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <p role="status" className="notice">
        {t("newsletter.success")}
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="newsletter">
      <label htmlFor="newsletter-email" className="sr-only">
        {t("newsletter.email")}
      </label>
      <div className="newsletter__glass">
        <input
          id="newsletter-email"
          type="email"
          name="email"
          required
          autoComplete="email"
          placeholder={t("newsletter.placeholder")}
          className="newsletter__input"
        />
        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="newsletter__submit"
        >
          {t("newsletter.submit")}
          <ArrowRight className="arrow h-5 w-5" aria-hidden="true" />
        </Button>
      </div>
    </form>
  );
}
