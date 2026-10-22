"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/components/language-provider";

const technologies = [
  {
    id: "advanced-sl",
    category: { en: "COMPOSITE ENGINEERING", mn: "НИЙЛМЭЛ МАТЕРИАЛЫН ИНЖЕНЕРЧЛЭЛ" },
    title: { en: "ADVANCED SL COMPOSITE", mn: "ADVANCED SL КАРБОН МАТЕРИАЛ" },
    description: {
      en: "Professional-grade raw carbon fiber woven in Giant's own factories for unmatched stiffness-to-weight ratio.",
      mn: "Giant-ийн өөрийн үйлдвэрт нэхсэн мэргэжлийн түвшний карбон ширхэг нь жингийн бат бэх чанарыг дээд цэгт хүргэнэ.",
    },
    image: "/images/technology-frame.png",
    alt: {
      en: "Close-up of carbon fiber weave on a Giant bicycle frame",
      mn: "Giant дугуйн карбон рамыг ойроос харуулсан нь",
    },
    metrics: [
      { en: "In-house carbon manufacturing", mn: "Өөрийн карбон үйлдвэрлэл" },
      { en: "High stiffness-to-weight ratio", mn: "Жин ба хөшүүн чанарын оновчтой харьцаа" },
    ],
  },
  {
    id: "maestro",
    category: { en: "SUSPENSION DESIGN", mn: "ТҮДГЭЛЗҮҮЛЭЛТИЙН ХИЙЦ" },
    title: { en: "MAESTRO SUSPENSION", mn: "MAESTRO ТҮДГЭЛЗҮҮЛЭЛТ" },
    description: {
      en: "Floating pivot point system providing active, independent suspension on all mountain terrain without pedal bob.",
      mn: "Дөрвөн холбоостой түдгэлзүүлэлт нь бартаат замд дөрөөний эрчийг сааруулахгүйгээр цохилтыг бүрэн шингээнэ.",
    },
    image: "/images/bike-mtb.png",
    alt: {
      en: "Giant mountain bike built for technical trail terrain",
      mn: "Техникийн бартаат замд зориулсан Giant уулын дугуй",
    },
    metrics: [
      { en: "Floating pivot point", mn: "Хөвөгч эргэлтийн цэг" },
      { en: "Active suspension under braking", mn: "Тоормослох үед идэвхтэй түдгэлзүүлэлт" },
    ],
  },
  {
    id: "syncdrive",
    category: { en: "E-BIKE SYSTEMS", mn: "ЦАХИЛГААН ДУГУЙН СИСТЕМ" },
    title: { en: "SYNCDRIVE PRO MOTOR", mn: "SYNCDRIVE PRO ЦАХИЛГААН МОТОР" },
    description: {
      en: "Yamaha-powered e-bike motor technology delivering up to 85Nm of torque with Smart Assist automatic support.",
      mn: "Smart Assist систем бүхий 85Nm мушгих хүчтэй цахилгаан мотор нь дөрөөлөх бүрд мэдрэмжтэй туслах хүчийг өгнө.",
    },
    image: "/images/bike-ebike.png",
    alt: {
      en: "Giant electric bicycle featuring SyncDrive motor assistance",
      mn: "SyncDrive моторт туслах системтэй Giant цахилгаан дугуй",
    },
    metrics: [
      { en: "Up to 85Nm torque", mn: "85Nm хүртэл мушгих хүч" },
      { en: "Smart Assist automatic support", mn: "Smart Assist автомат туслах систем" },
    ],
  },
  {
    id: "d-fuse",
    category: { en: "COMFORT ENGINEERING", mn: "ТАВ ТУХЫН ИНЖЕНЕРЧЛЭЛ" },
    title: { en: "D-FUSE TECHNOLOGY", mn: "D-FUSE ТЕХНОЛОГИ" },
    description: {
      en: "D-shaped composite seatpost and handlebar system absorbing shocks and trail vibrations for maximum compliance and endurance comfort.",
      mn: "D хэлбэрийн карбон суудал болон залуур нь замын доргилт, чичиргээг өөртөө шингээн холын аялалд тав тухыг өндөр түвшинд хангана.",
    },
    image: "/images/technology-frame.png",
    alt: {
      en: "Composite bicycle frame and components designed to absorb vibration",
      mn: "Доргилт шингээх зориулалттай нийлмэл рам болон эд анги",
    },
    metrics: [
      { en: "D-shaped composite profile", mn: "D хэлбэрийн нийлмэл профиль" },
      { en: "Designed to absorb trail vibration", mn: "Замын доргилт шингээх хийц" },
    ],
  },
  {
    id: "overdrive-aero",
    category: { en: "AERODYNAMIC DESIGN", mn: "АЭРОДИНАМИК ХИЙЦ" },
    title: { en: "OVERDRIVE AERO", mn: "OVERDRIVE AERO" },
    description: {
      en: "D-shaped fork steerer tube paired with internal cable routing to provide maximum aerodynamic efficiency and easy serviceability.",
      mn: "D хэлбэрийн залуурын гол ба далд кабелийн суваг нь салхины эсэргүүцлийг бууруулж, аеродинамик үзүүлэлтийг дээшлүүлнэ.",
    },
    image: "/images/bike-road.png",
    alt: {
      en: "Giant road bicycle designed for aerodynamic efficiency",
      mn: "Аэродинамик үзүүлэлтэд зориулсан Giant замын дугуй",
    },
    metrics: [
      { en: "D-shaped fork steerer", mn: "D хэлбэрийн сэрээний гол" },
      { en: "Internal cable routing", mn: "Далд кабелийн суваг" },
    ],
  },
  {
    id: "aluxx-sl",
    category: { en: "ALUMINUM ENGINEERING", mn: "ХӨНГӨН ЦАГААНЫ ИНЖЕНЕРЧЛЭЛ" },
    title: { en: "ALUXX SL ALUMINUM", mn: "ALUXX SL ХӨНГӨН ЦАГААН ХАЙЛШ" },
    description: {
      en: "High-performance 6061-series alloy tubesets engineered with double-butting for lightweight strength and long-term durability.",
      mn: "Өндөр чанарын 6061 хайлшаар хийсэн давхар зузаалгатай рам нь хөнгөн жинтэй бөгөөд бат бөх, урт хугацааны эдэлгээг хангана.",
    },
    image: "/images/bike-gravel.png",
    alt: {
      en: "Giant aluminum gravel bicycle frame",
      mn: "Giant хөнгөн цагаан гравел дугуйн рам",
    },
    metrics: [
      { en: "6061-series alloy", mn: "6061 цувралын хайлш" },
      { en: "Double-butted tubeset", mn: "Давхар зузаалгатай хоолойн хийц" },
    ],
  },
] as const;

const sectionReveal = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
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

export default function TechnologySection({ pageTitle = false }: { pageTitle?: boolean }) {
  const { language } = useLanguage();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedTechnology = technologies.find((technology) => technology.id === selectedId);
  const Heading = pageTitle ? "h1" : "h2";

  useEffect(() => {
    if (!selectedTechnology) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedId(null);
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedTechnology]);

  const text = (value: { en: string; mn: string }) => value[language];

  return (
    <motion.section
      id="technology"
      aria-labelledby="technology-heading"
      className="technology-section bg-white text-neutral-900 transition-colors duration-300 dark:bg-neutral-950 dark:text-white"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={sectionReveal}
    >
      <div className="technology-section__inner">
        <motion.header className="technology-hero" variants={sectionReveal}>
          <p className="technology-hero__badge">
            <span aria-hidden="true" />
            {language === "mn" ? "Giant-ийн инженерчлэл" : "Giant Engineering"}
          </p>
          <Heading id="technology-heading">
            {language === "mn"
              ? "ТЕХНОЛОГИ БОЛОН ИННОВАЦИ"
              : "TECHNOLOGY & INNOVATION"}
          </Heading>
          <p>
            {language === "mn"
              ? "Карбон нэхэхээс эхлээд ухаалаг цахилгаан моторын туслах систем хүртэл Giant дугуйн цаадах инженерчлэлтэй танилцаарай."
              : "Discover the proprietary engineering behind Giant bicycles—from raw carbon weaving to intelligent e-bike motor assistance."}
          </p>
        </motion.header>

        <motion.div
          className="technology-grid"
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {technologies.map((technology) => (
            <motion.button
              key={technology.id}
              type="button"
              className="technology-card bg-neutral-50 border border-neutral-200 hover:border-[#000099] transition-all duration-300 dark:bg-neutral-900/80 dark:border-neutral-800 dark:hover:border-[#000099]"
              variants={cardVariants}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => setSelectedId(technology.id)}
              aria-haspopup="dialog"
            >
              <span className="technology-card__category">
                <span aria-hidden="true" />
                {text(technology.category)}
              </span>
              <h2>{text(technology.title)}</h2>
              <p>{text(technology.description)}</p>
              <span className="technology-card__action">
                {language === "mn" ? "ДЭЛГЭРЭНГҮЙ ҮЗЭХ" : "EXPLORE TECHNOLOGY"}
              </span>
            </motion.button>
          ))}
        </motion.div>
      </div>

      {selectedTechnology && (
        <div
          className="technology-modal-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSelectedId(null);
          }}
        >
          <section
            className="technology-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="technology-modal-heading"
          >
            <button
              type="button"
              className="technology-modal__close"
              onClick={() => setSelectedId(null)}
              aria-label={language === "mn" ? "Хаах" : "Close"}
            >
              <X aria-hidden="true" />
            </button>
            <div className="technology-modal__image">
              <Image
                src={selectedTechnology.image}
                alt={text(selectedTechnology.alt)}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="technology-modal__content">
              <p className="technology-card__category">
                <span aria-hidden="true" />
                {text(selectedTechnology.category)}
              </p>
              <h2 id="technology-modal-heading">{text(selectedTechnology.title)}</h2>
              <p>{text(selectedTechnology.description)}</p>
              <ul>
                {selectedTechnology.metrics.map((metric) => (
                  <li key={metric.en}>{text(metric)}</li>
                ))}
              </ul>
            </div>
          </section>
        </div>
      )}
    </motion.section>
  );
}
