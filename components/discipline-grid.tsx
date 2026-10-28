"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "@/components/language-provider";

type Localized = { en: string; mn: string };

const disciplines = [
  {
    id: "road",
    href: "/bikes?discipline=road",
    image: "/images/giantpropeladvanced1.webp",
    label: { en: "Road", mn: "Зам" },
  },
  {
    id: "gravel",
    href: "/bikes?discipline=gravel",
    image: "/images/giantrevolt2advanced.webp",
    label: { en: "Gravel", mn: "Гравел" },
  },
  {
    id: "mountain",
    href: "/bikes?discipline=mountain",
    image: "/images/gianttrancex2.jpg",
    label: { en: "Mountain", mn: "Уулын" },
  },
  {
    id: "city",
    href: "/bikes?discipline=city",
    image: "/images/giantroam.jpg",
    label: { en: "City & Touring", mn: "Хот & аялал" },
  },
  {
    id: "ebike",
    href: "/bikes?discipline=ebike",
    image: "/images/giantstancee+1.png",
    label: { en: "E-Bikes", mn: "Цахилгаан дугуй" },
  },
] as const;

const copy = {
  eyebrow: { en: "Giant Discipline Selector", mn: "Giant төрөл сонгогч" },
  title: { en: "Find Your Ride", mn: "Өөрт тохирох дугуйгаа ол" },
  viewAll: { en: "View all bikes", mn: "Бүх дугуйг харах" },
  help: { en: "Help me decide", mn: "Сонгоход тусла" },
} satisfies Record<string, Localized>;

const gridVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const itemClass =
  "w-[62%] shrink-0 snap-start sm:w-[38%] md:w-[28%] lg:w-auto";

const linkClass = "group flex h-full flex-col items-center outline-none";

const cardClass =
  "relative aspect-[4/3] w-full flex items-center justify-center transition-transform duration-300 group-hover:scale-105 group-focus-visible:ring-2 group-focus-visible:ring-[#1a1aec]/50 dark:group-focus-visible:ring-[#7a7aff]/50 rounded-xl";

const labelClass =
  "relative inline-block pb-1.5 text-sm font-semibold text-neutral-800 dark:text-neutral-200 text-center mt-3";

const underlineClass =
  "absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-[#1a1aec] transition-transform duration-300 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100 dark:bg-[#7a7aff]";

export default function DisciplineGrid() {
  const { language } = useLanguage();
  const text = (value: Localized) => value[language];

  return (
    <motion.section
      id="disciplines"
      aria-labelledby="disciplines-heading"
      className="relative w-full bg-white py-20 text-slate-900 transition-colors duration-300 dark:bg-[#0b0f17] dark:text-white"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="mx-auto w-full max-w-[1400px] px-6 md:px-12">
        <header className="mb-14 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.3em] text-[#1a1aec] dark:text-[#7a7aff]">
              <span aria-hidden="true" className="h-px w-8 bg-[#1a1aec] dark:bg-[#7a7aff]" />
              {text(copy.eyebrow)}
            </p>
            <h2
              id="disciplines-heading"
              className="font-extrabold italic tracking-tight uppercase transform -skew-x-3 text-3xl leading-[1.02] md:text-5xl text-neutral-900 dark:text-white"
            >
              {text(copy.title)}
            </h2>
          </div>

          <Link
            href="/bikes"
            className="group/link inline-flex items-center gap-2 self-start text-xs font-bold uppercase tracking-[0.2em] text-slate-900 transition-colors duration-300 hover:text-[#1a1aec] dark:text-white dark:hover:text-[#7a7aff] sm:self-auto"
          >
            {text(copy.viewAll)}
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
        </header>

        <motion.ul
          className="-mx-6 flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-4 [scrollbar-width:none] md:-mx-12 md:px-12 lg:mx-0 lg:grid lg:grid-cols-6 lg:gap-4 lg:overflow-visible lg:px-0 lg:pb-0 [&::-webkit-scrollbar]:hidden"
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {disciplines.map((discipline) => (
            <motion.li key={discipline.id} variants={itemVariants} className={itemClass}>
              <Link href={discipline.href} className={linkClass}>
                <span className={cardClass}>
                  <Image
                    src={discipline.image}
                    alt=""
                    width={800}
                    height={600}
                    quality={90}
                    sizes="(min-width: 1024px) 16vw, (min-width: 640px) 38vw, 62vw"
                    className="h-full w-full object-contain"
                  />
                </span>
                <span className={labelClass}>
                  {text(discipline.label)}
                  <span aria-hidden="true" className={underlineClass} />
                </span>
              </Link>
            </motion.li>
          ))}

          <motion.li variants={itemVariants} className={itemClass}>
            <Link href="/bikes" className={linkClass}>
              <span className={cardClass}>
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="h-16 w-16 text-[#1a1aec] dark:text-[#7a7aff]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.25}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 17c3 0 3-10 8-10s5 10 8 10" />
                  <path d="M15 3l5 4-5 4" />
                </svg>
              </span>
              <span className={labelClass}>
                {text(copy.help)}
                <span aria-hidden="true" className={underlineClass} />
              </span>
            </Link>
          </motion.li>
        </motion.ul>
      </div>
    </motion.section>
  );
}