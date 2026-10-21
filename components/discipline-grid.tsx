"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/components/language-provider";
import SectionHeading from "@/components/section-heading";

const rideCategories = [
  {
    key: "category.ebikes",
    href: "/bikes?discipline=ebike",
    image: "/images/ride-ebike.jpg",
    alt: "Rider with a fat-tire electric bicycle in open mountain country",
  },
  {
    key: "category.road",
    href: "/bikes?discipline=road",
    image: "/images/ride-road.jpg",
    alt: "Road cyclists riding together in a race",
  },
  {
    key: "category.mountain",
    href: "/bikes?discipline=mountain",
    image: "/images/ride-mountain.jpg",
    alt: "Mountain bikers riding a dirt trail outdoors",
  },
  {
    key: "category.womens",
    href: "/bikes",
    image: "/images/ride-womens.jpg",
    alt: "Two women riding road bikes along an outdoor coastal road",
  },
] as const;

export default function DisciplineGrid() {
  const { t, translate } = useLanguage();

  return (
    <section id="disciplines" aria-labelledby="disciplines-heading" className="section discipline-section">
      <div className="discipline-wrap">
        <SectionHeading
          id="disciplines-heading"
          eyebrow={t("disciplines.eyebrow")}
          title={t("disciplines.title")}
        />

        <ul className="discipline-grid">
          {rideCategories.map((category) => (
            <li key={category.key}>
              <Link href={category.href} className="discipline-card discipline-card--category">
                <Image
                  src={category.image}
                  alt={translate(category.alt)}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="discipline-card__image"
                />
                <span aria-hidden="true" className="discipline-card__scrim" />
                <span className="discipline-card__content">
                  <span className="discipline-card__name">{t(category.key)}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
