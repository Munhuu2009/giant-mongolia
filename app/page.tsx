import Hero from "@/components/hero";
import DisciplineGrid from "@/components/discipline-grid";
import FeaturedBikes from "@/components/featured-bikes";
import TechnologySection from "@/components/technology-section";
import FlagshipStore from "@/components/flagship-store";
import { motion } from "framer-motion";

const sectionReveal = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Home() {
  return (
    <motion.main
      className="home-page"
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
    >
      <motion.div variants={sectionReveal}><Hero /></motion.div>
      <motion.div variants={sectionReveal}><FeaturedBikes /></motion.div>
      <motion.div variants={sectionReveal}><DisciplineGrid /></motion.div>
      <motion.div variants={sectionReveal}><TechnologySection /></motion.div>
      <motion.div variants={sectionReveal}><FlagshipStore /></motion.div>
    </motion.main>
  );
}
