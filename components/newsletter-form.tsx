"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight } from "lucide-react";

export default function NewsletterForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // TODO: connect to an email provider or database to store subscribers.
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <p role="status" className="border border-neutral-800 px-4 py-4 text-sm text-neutral-300">
        {"Thanks for subscribing. We'll be in touch with new arrivals and rides."}
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 sm:flex-row">
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
        className="h-14 flex-1 border border-neutral-700 bg-transparent px-4 text-base text-white placeholder:text-neutral-500 focus:border-white focus:outline-none"
      />
      <button
        type="submit"
        className="inline-flex h-14 items-center justify-center gap-2 bg-accent px-6 text-sm font-bold uppercase tracking-[0.15em] text-white transition-colors hover:bg-accent-dark"
      >
        Subscribe
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </button>
    </form>
  );
}
