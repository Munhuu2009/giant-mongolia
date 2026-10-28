"use client";

import { Clock, Mail, MapPin, Navigation, Phone } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import { ButtonLink } from "@/components/ui/Button";
import { store } from "@/data/store";

export default function StoreContact() {
  const { language } = useLanguage();
  const mn = language === "mn";
  const localized = (en: string, mnText: string) => (mn ? mnText : en);

  const details = [
    {
      Icon: MapPin,
      label: localized("Address", "Хаяг"),
      value: store.address.join(" "),
      href: store.directionsUrl,
    },
    {
      Icon: Clock,
      label: localized("Opening hours", "Ажиллах цаг"),
      value: localized("Monday–Sunday: 10:00 – 20:00", "Даваа–Ням: 10:00 – 20:00"),
    },
    {
      Icon: Phone,
      label: localized("Phone", "Утас"),
      value: store.phone,
      href: `tel:${store.phone.replace(/\s/g, "")}`,
    },
    {
      Icon: Mail,
      label: localized("Email", "Имэйл"),
      value: store.email,
      href: `mailto:${store.email}`,
    },
  ];

  return (
    <section
      aria-labelledby="store-contact-heading"
      className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-12 px-6 py-12 lg:grid-cols-2"
    >
      <div className="flex flex-col gap-8">
        <div>
          <h1
            id="store-contact-heading"
            className="text-4xl font-black uppercase leading-tight text-neutral-900 dark:text-white md:text-5xl"
          >
            {localized("Our stores", "Хаяг ба холбоо барих")}
          </h1>
          <p className="mt-4 max-w-md text-base leading-relaxed text-neutral-600 dark:text-neutral-400">
            {localized(
              "Test ride the full range, get a professional bike fit, and keep your bike running with our certified service workshop.",
              "Giant Mongolia-д зочилж, дугуйгаа сонгоод, мэргэжлийн засвар болон хэмжилтийг аваарай.",
            )}
          </p>
        </div>

        <dl className="grid gap-5">
          {details.map(({ Icon, label, value, href }) => (
            <div key={label} className="flex items-start gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#000099]/10 text-[#000099] dark:bg-white/10 dark:text-blue-400">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <dt className="text-xs font-bold uppercase tracking-wide text-neutral-500">{label}</dt>
                <dd className="mt-1 text-base font-semibold text-neutral-900 dark:text-white">
                  {href ? (
                    <a
                      href={href}
                      className="hover:text-[#000099] dark:hover:text-blue-400"
                      {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    >
                      {value}
                    </a>
                  ) : (
                    value
                  )}
                </dd>
              </div>
            </div>
          ))}
        </dl>

        <div className="flex flex-wrap gap-3">
          <ButtonLink
            href={store.directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            size="lg"
            className="inline-flex items-center gap-2"
          >
            <Navigation className="h-4 w-4" aria-hidden="true" />
            {localized("Get directions", "Чиглэл авах")}
          </ButtonLink>
          <ButtonLink
            href={`tel:${store.phone.replace(/\s/g, "")}`}
            size="lg"
            variant="secondary"
            className="inline-flex items-center gap-2"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            {localized("Contact us", "Холбоо барих")}
          </ButtonLink>
        </div>
      </div>

      <div className="h-[500px] w-full overflow-hidden rounded-2xl border border-neutral-200 shadow-xl dark:border-neutral-800">
        <iframe
          title="Giant Mongolia - Ulaanbaatar"
          src="https://www.google.com/maps?q=47.8948117,106.9213379&z=16&output=embed"
          className="h-full w-full border-0"
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </section>
  );
}
