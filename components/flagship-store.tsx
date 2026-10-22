"use client";

import Image from "next/image";
import { ArrowRight, Clock, MapPin, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/components/language-provider";
import { ButtonLink } from "@/components/ui/Button";
import { store } from "@/data/store";

const galleryImages = [
  {
    src: "/images/giant2.webp",
    alt: {
      en: "Bicycle fitting and workshop area",
      mn: "Дугуйн тохиргоо болон засварын хэсэг",
    },
  },
  {
    src: "/images/giant2.webp",
    alt: {
      en: "Bicycle showroom display",
      mn: "Дугуйн үзэсгэлэнгийн талбай",
    },
  },
  {
    src: "/images/giant2.webp",
    alt: {
      en: "Bicycle equipment and accessories",
      mn: "Дугуйн хэрэгсэл болон дагалдах хэрэгсэл",
    },
  },
];

type FlagshipStoreProps = {
  showGallery?: boolean;
};

export default function FlagshipStore({ showGallery = false }: FlagshipStoreProps) {
  const { t, language } = useLanguage();

  return (
    <>
      <motion.section
        id="stores"
        aria-labelledby="stores-heading"
        className="photo-panel on-photo"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <Image
          src="/images/giant2.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div aria-hidden="true" className="photo-panel__scrim" />

        <div className="wrap photo-panel__body">
          <p className="chip chip-glass mb-4">{t("store.eyebrow")}</p>
          <h2 id="stores-heading" className="type-headline">
            {t("store.title")}
          </h2>
          <p className="type-lead mt-5">{t("store.description")}</p>

          <dl className="info-grid">
            <div className="glass-card">
              <dt>
                <MapPin className="h-4 w-4" aria-hidden="true" />
                {t("store.address")}
              </dt>
              <dd>
                <a href={store.directionsUrl} target="_blank" rel="noopener noreferrer">
                  {store.address.join(" ")}
                </a>
              </dd>
            </div>
            <div className="glass-card">
              <dt>
                <Clock className="h-4 w-4" aria-hidden="true" />
                {t("store.hours")}
              </dt>
              <dd>{t("store.dailyHours")}</dd>
            </div>
            <div className="glass-card">
              <dt>
                <Phone className="h-4 w-4" aria-hidden="true" />
                {t("store.phone")}
              </dt>
              <dd>
                <a href="tel:+97677716868">{store.phone}</a>
              </dd>
            </div>
          </dl>

          <motion.div className="mt-10" whileTap={{ scale: 0.98 }} transition={{ duration: 0.2 }}>
            <ButtonLink
              href={store.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="glass-strong"
              size="lg"
            >
              {t("store.directions")}
              <ArrowRight className="arrow h-5 w-5" aria-hidden="true" />
            </ButtonLink>
          </motion.div>
        </div>
      </motion.section>

      {showGallery && (
        <section aria-labelledby="store-gallery-heading" className="store-gallery">
          <div className="wrap">
            <h2 id="store-gallery-heading" className="type-title">
              {language === "mn" ? "Манай дэлгүүр" : "Inside our store"}
            </h2>
            <div className="store-gallery__grid">
              {galleryImages.map((image) => (
                <figure key={image.alt.en} className="store-gallery__card">
                  <Image
                    src={image.src}
                    alt={image.alt[language]}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
