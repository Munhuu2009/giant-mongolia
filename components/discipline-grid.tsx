"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
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

const gridVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function DisciplineGrid() {
  const { t, translate } = useLanguage();

  return (
    <motion.section
      id="disciplines"
      aria-labelledby="disciplines-heading"
      className="section discipline-section"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="discipline-wrap">
        <SectionHeading
          id="disciplines-heading"
          eyebrow={t("disciplines.eyebrow")}
          title={t("disciplines.title")}
        />

        <motion.ul
          className="discipline-grid"
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {rideCategories.map((category) => (
            <motion.li
              key={category.key}
              variants={cardVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
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
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </motion.section>
  );
}
