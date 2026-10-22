"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import { useLanguage } from "@/components/language-provider";
import { ButtonLink } from "@/components/ui/Button";

const features = [
  {
    label: "Advanced composite frame",
    detail: "Lightweight Advanced-grade composite built for fast, responsive gravel rides.",
    position: "hero__hotspot--frame",
  },
  {
    label: "D-Fuse comfort",
    detail: "D-Fuse components help absorb vibration across rough, all-terrain routes.",
    position: "hero__hotspot--cockpit",
  },
  {
    label: "All-terrain control",
    detail: "Confident geometry and tire clearance keep the ride composed when pavement ends.",
    position: "hero__hotspot--rear",
  },
];

export default function Hero() {
  const { t, translate } = useLanguage();
  const [activeFeature, setActiveFeature] = useState<number | null>(null);

  return (
    <motion.section
      aria-labelledby="hero-heading"
      className="hero hero--showcase"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="hero__product-stage" aria-label={translate("Giant gravel bicycle showcase")}>
        <Image
          src="/images/giant1.jpg"
          alt={translate("Giant gravel bicycle with drop handlebars and wide tires")}
          fill
          priority
          sizes="100vw"
          className="hero__product-image"
        />
      </div>

      <div aria-hidden="true" className="hero__showcase-scrim" />

      {features.map((feature, index) => (
        <motion.button
          key={feature.label}
          type="button"
          className={`hero__hotspot ${feature.position}${activeFeature === index ? " is-active" : ""}`}
          aria-label={translate(feature.label)}
          aria-pressed={activeFeature === index}
          onClick={() => setActiveFeature(activeFeature === index ? null : index)}
          whileTap={{ scale: 0.98 }}
        >
          <span className="hero__hotspot-pulse" />
          {activeFeature === index && (
            <span className="hero__hotspot-detail" role="status">
              <strong>{feature.label}</strong>
              <span>{feature.detail}</span>
            </span>
          )}
        </motion.button>
      ))}

      <div className="hero__showcase-copy">
        <div className="hero__showcase-content max-w-xl relative z-10 space-y-6">
          <p className="hero__showcase-eyebrow">{t("hero.category")}</p>
          <h1
            id="hero-heading"
            className="hero__showcase-title font-heading text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-[1.1] text-white max-w-xl drop-shadow-lg"
          >
            {t("hero.title")}
          </h1>
          <p className="hero__showcase-description">{t("hero.description")}</p>
          <motion.div whileTap={{ scale: 0.98 }} transition={{ duration: 0.2 }}>
            <ButtonLink href="/bikes" variant="primary" size="lg" className="hero__showcase-cta">
              {t("hero.cta")}
            </ButtonLink>
          </motion.div>
        </div>
      </div>

      <div className="hero__showcase-footer">
        <div className="hero__pagination" aria-label={translate("Featured bicycle 1 of 4")}>
          <span className="is-current">01</span>
          <span className="hero__pagination-track">
            <span />
          </span>
          <span>04</span>
        </div>
        <motion.figure
          className="hero__detail-card"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <div className="hero__detail-image">
            <Image
              src="/images/technology-frame.png"
              alt={translate("Close-up of a carbon bicycle frame")}
              fill
              sizes="180px"
            />
          </div>
          <figcaption>
            <span>{translate("Advanced composite")}</span>
            <small>{translate("Engineered for the long way")}</small>
          </figcaption>
        </motion.figure>
      </div>
    </motion.section>
  );
}
