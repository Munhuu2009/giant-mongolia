"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "@/components/language-provider";
import { ButtonLink } from "@/components/ui/Button";

const features = [
  {
    title: "hero.feature.design.title",
    description: "hero.feature.design.description",
  },
  {
    title: "hero.feature.engineering.title",
    description: "hero.feature.engineering.description",
  },
  {
    title: "hero.feature.performance.title",
    description: "hero.feature.performance.description",
  },
] as const;

export default function Hero() {
  const { t } = useLanguage();

  return (
    <motion.section
      aria-labelledby="hero-heading"
      className="hero hero--showcase"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
        <div className="hero__product-stage" aria-hidden="true">
        <div className="hero__product-frame">
          <Image
            src="/images/hero/giantbike2.png"
            alt=""
            aria-hidden={true}
            fill={true}
            priority={true}
            sizes="100vw"
            className="hero__product-image hero__product-image--a"
            onError={() => console.warn("[Hero] Image failed to load: /images/hero/giantbike2.png")}
          />
          <Image
            src="/images/hero/giantbike5.png"
            alt=""
            aria-hidden={true}
            fill={true}
            loading="lazy"
            fetchPriority="low"
            sizes="100vw"
            className="hero__product-image hero__product-image--b"
            onError={() => console.warn("[Hero] Image failed to load: /images/hero/giantbike5.png")}
          />
        </div>
      </div>
      <div aria-hidden="true" className="hero__showcase-scrim" />

      <div className="hero__showcase-inner">
        <p className="hero__showcase-eyebrow">{t("hero.category")}</p>
        <h1 id="hero-heading" className="hero__showcase-title">
          <span className="hero__headline-side">
            <span className="hero__headline-line">{t("hero.headline.left1")}</span>
            <span className="hero__headline-line">{t("hero.headline.left2")}</span>
            <span className="hero__headline-line hero__headline-line--fade">
              {t("hero.headline.left3")}
            </span>
          </span>
          <span className="hero__headline-side hero__headline-side--right">
            <span className="hero__headline-line">{t("hero.headline.right1")}</span>
            <span className="hero__headline-line">{t("hero.headline.right2")}</span>
            <span className="hero__headline-line hero__headline-line--fade">
              {t("hero.headline.right3")}
            </span>
          </span>
        </h1>
        <motion.div
          className="hero__showcase-action"
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.2 }}
        >
          <ButtonLink href="/bikes" variant="primary" size="lg" className="hero__showcase-cta">
            {t("hero.cta")}
          </ButtonLink>
        </motion.div>

        <ul className="hero__features">
          {features.map(({ title, description }) => (
            <li className="hero__feature" key={title}>
              <h2>{t(title)}</h2>
              <p>{t(description)}</p>
            </li>
          ))}
        </ul>
      </div>
    </motion.section>
  );
}
