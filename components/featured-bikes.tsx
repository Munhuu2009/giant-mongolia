"use client";

import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/components/language-provider";
import ProductCard from "@/components/product-card";
import SectionHeading from "@/components/section-heading";
import { ButtonLink } from "@/components/ui/Button";
import { featuredProducts } from "@/data/products";

const featuredBadges: Record<string, "New" | "Best Seller"> = {
  "propel-advanced-1": "New",
  "trance-x-2": "Best Seller",
};

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

export default function FeaturedBikes() {
  const { translate } = useLanguage();

  return (
    <section id="bikes" aria-labelledby="bikes-heading" className="panel featured-section">
      <div className="wrap">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <SectionHeading
            id="bikes-heading"
            eyebrow={translate("2026 collection")}
            title={translate("Featured bikes")}
            action={
              <motion.div whileTap={{ scale: 0.98 }} transition={{ duration: 0.2 }}>
                <ButtonLink href="/bikes" variant="secondary" size="md" className="self-start md:self-auto">
                  {translate("View all bikes")}
                  <ArrowRight className="arrow h-5 w-5" aria-hidden="true" />
                </ButtonLink>
              </motion.div>
            }
          />
        </motion.div>

        <motion.ul
          className="product-grid"
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {featuredProducts.map((product) => (
            <motion.li
              key={product.id}
              variants={cardVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <ProductCard
                product={product}
                variant="featured"
                promotionBadge={featuredBadges[product.id]}
              />
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
