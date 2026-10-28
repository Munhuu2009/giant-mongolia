"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useLanguage } from "@/components/language-provider";

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

const heroSlides = [
  { src: "/images/hero/giantbike2.png" },
  { src: "/images/hero/giantbike5.png" },
] as const;

const SLIDE_INTERVAL_MS = 6500;
const SLIDE_TRANSITION = { duration: 1.2, ease: "easeInOut" } as const;

const textFade = {
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0 },
  transition: SLIDE_TRANSITION,
};

export default function Hero() {
  const { t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((current) => (current + 1) % heroSlides.length);
    }, SLIDE_INTERVAL_MS);

    return () => clearInterval(timer);
  }, []);

  const activeSlide = heroSlides[activeIndex];

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
        <div className="hero__product-frame relative overflow-hidden">
          <AnimatePresence initial={false} mode="popLayout">
            <motion.div
              key={activeSlide.src}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={SLIDE_TRANSITION}
            >
              <Image
                src={activeSlide.src}
                alt=""
                aria-hidden={true}
                fill={true}
                priority={true}
                sizes="100vw"
                className="hero__product-image"
                onError={() => console.warn(`[Hero] Image failed to load: ${activeSlide.src}`)}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <div aria-hidden="true" className="hero__showcase-scrim" />

      <div className="hero__showcase-inner">
        <motion.p key={`eyebrow-${activeIndex}`} className="hero__showcase-eyebrow" {...textFade}>
          {t("hero.category")}
        </motion.p>
        <motion.h1
          key={`title-${activeIndex}`}
          id="hero-heading"
          className="hero__showcase-title"
          {...textFade}
        >
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
        </motion.h1>

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
