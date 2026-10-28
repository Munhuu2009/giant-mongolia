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
    src: "/images/giant3.webp",
    alt: {
      en: "Bicycle showroom display",
      mn: "Дугуйн үзэсгэлэнгийн талбай",
    },
  },
  {
    src: "/images/giant4.webp",
    alt: {
      en: "Bicycle equipment and accessories",
      mn: "Дугуйн хэрэгсэл болон дагалдах хэрэгсэл",
    },
  },
];

type FlagshipStoreProps = {
  showGallery?: boolean;
  showBanner?: boolean;
};

export default function FlagshipStore({ showGallery = false, showBanner = true }: FlagshipStoreProps) {
  const { t, language } = useLanguage();

  return (
    <>
      {showBanner && (
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
          src="/images/upscalemedia-transformed.webp"
          alt=""
          fill
          sizes="100vw"
          quality={90}
          className="h-full w-full object-cover"
        />
        <div
          aria-hidden="true"
          className="photo-panel__scrim bg-gradient-to-t from-black/80 via-black/40 to-black/20"
        />

        <div className="wrap photo-panel__body">
          <p className="chip chip-glass mb-4 bg-white/15 border-white/30 backdrop-blur-[1px]">{t("store.eyebrow")}</p>
          <h2 id="stores-heading" className="type-headline">
            {t("store.title")}
          </h2>
          <p className="type-lead mt-5">{t("store.description")}</p>

          <dl className="info-grid">
            <motion.div
              className="glass-card flagship-store-card backdrop-blur-sm bg-white/[0.08] dark:bg-black/40 border border-white/25 dark:border-white/15 shadow-[0_8px_32px_rgba(0,0,0,0.35)] rounded-2xl"
              whileHover={{
                borderColor: "rgba(255, 255, 255, 0.4)",
                boxShadow: "0 0 20px rgba(255, 255, 255, 0.1)",
              }}
              transition={{ duration: 0.3 }}
            >
              <dt>
                <span className="flagship-store-card__icon">
                  <MapPin className="h-4 w-4" aria-hidden="true" />
                </span>
                {t("store.address")}
              </dt>
              <dd>
                <a href={store.directionsUrl} target="_blank" rel="noopener noreferrer">
                  {store.address.join(" ")}
                </a>
              </dd>
            </motion.div>
            <motion.div
              className="glass-card flagship-store-card backdrop-blur-sm bg-white/[0.08] dark:bg-black/40 border border-white/25 dark:border-white/15 shadow-[0_8px_32px_rgba(0,0,0,0.35)] rounded-2xl"
              whileHover={{
                borderColor: "rgba(255, 255, 255, 0.4)",
                boxShadow: "0 0 20px rgba(255, 255, 255, 0.1)",
              }}
              transition={{ duration: 0.3 }}
            >
              <dt>
                <span className="flagship-store-card__icon">
                  <Clock className="h-4 w-4" aria-hidden="true" />
                </span>
                {t("store.hours")}
              </dt>
              <dd>{t("store.dailyHours")}</dd>
            </motion.div>
            <motion.div
              className="glass-card flagship-store-card backdrop-blur-sm bg-white/[0.08] dark:bg-black/40 border border-white/25 dark:border-white/15 shadow-[0_8px_32px_rgba(0,0,0,0.35)] rounded-2xl"
              whileHover={{
                borderColor: "rgba(255, 255, 255, 0.4)",
                boxShadow: "0 0 20px rgba(255, 255, 255, 0.1)",
              }}
              transition={{ duration: 0.3 }}
            >
              <dt>
                <span className="flagship-store-card__icon">
                  <Phone className="h-4 w-4" aria-hidden="true" />
                </span>
                {t("store.phone")}
              </dt>
              <dd>
                <a href="tel:+97677716868">{store.phone}</a>
              </dd>
            </motion.div>
          </dl>

          <motion.div
            className="mt-10"
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div whileHover="hover">
              <ButtonLink
                href={store.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="glass-strong"
                size="lg"
                className="flagship-store-cta inline-flex items-center gap-2 bg-white/15 dark:bg-white/10 border-white/30 dark:border-white/20 backdrop-blur-[1px] shadow-sm hover:bg-white/25 hover:border-white/40"
              >
                {t("store.directions")}
                <motion.span
                  className="arrow inline-block h-5 w-5"
                  aria-hidden="true"
                  variants={{
                    hover: { x: 4 },
                  }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <ArrowRight className="h-5 w-5" />
                </motion.span>
              </ButtonLink>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
      )}

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
