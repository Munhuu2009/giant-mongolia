"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "@/components/language-provider";
import SectionHeading from "@/components/section-heading";

const specs = [
  {
    title: "Advanced SL Carbon",
    body: "Giant manufactures its own raw carbon, giving every frame a precise stiffness-to-weight ratio from the fiber up.",
  },
  {
    title: "AluxX SL Aluminum",
    body: "Butted, hydroformed alloy tubing that delivers race-level performance with long-term durability.",
  },
  {
    title: "Maestro Suspension",
    body: "A four-bar, dual-link design that stays active under braking and efficient under power on rough terrain.",
  },
  {
    title: "SyncDrive Motors",
    body: "Smart Assist reads speed, cadence, and torque to deliver natural, responsive power exactly when you need it.",
  },
];

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

export default function TechnologySection() {
  const { translate } = useLanguage();

  return (
    <section id="technology" aria-labelledby="technology-heading" className="technology-section panel-dark">
      <div className="technology-section__inner">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <SectionHeading
            id="technology-heading"
            eyebrow={translate("Engineered by Giant")}
            title={translate("Technology")}
            inverted
          />
        </motion.div>

        <motion.div
          className="tech"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={gridVariants}
        >
          <motion.div
            className="tech__media"
            variants={cardVariants}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src="/images/technology-frame.png"
              alt={translate("Close-up of carbon fiber weave on a Giant bicycle frame")}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </motion.div>
          <motion.ul className="spec-list" variants={gridVariants}>
            {specs.map((spec) => (
              <motion.li key={spec.title} className="spec-card" variants={cardVariants}>
                <h3 className="type-title">{translate(spec.title)}</h3>
                <p>{translate(spec.body)}</p>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </div>
    </section>
  );
}
