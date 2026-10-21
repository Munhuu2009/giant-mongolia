"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";

export default function NewsletterForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // TODO: connect to an email provider or database to store subscribers.
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <p role="status" className="notice">
        {"Thanks for subscribing. We'll be in touch with new arrivals and rides."}
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="newsletter">
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <input
        id="newsletter-email"
        type="email"
        name="email"
        required
        autoComplete="email"
        placeholder="Your email address"
        className="field"
      />
      <Button type="submit" variant="primary" size="lg">
        Subscribe
        <ArrowRight className="arrow h-5 w-5" aria-hidden="true" />
      </Button>
    </form>
  );
}
