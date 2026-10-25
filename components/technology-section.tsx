"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/components/language-provider";

const technologies = [
  {
    id: "advanced-sl",
    hotspotId: "carbon",
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
    hotspotId: "powercore",
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
    hotspotId: "powercore",
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
    hotspotId: "cockpit",
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
    hotspotId: "cockpit",
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
    hotspotId: "powercore",
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

const hotspots = [
  {
    id: "cockpit",
    title: "OVERDRIVE AERO",
    position: "technology-hotspot--cockpit",
    technologyIds: ["overdrive-aero", "d-fuse"],
    detail: {
      en: "D-shaped steerer tube & internal routing",
      mn: "D хэлбэрийн жолооны гол ба дотор кабелийн суваг",
    },
  },
  {
    id: "carbon",
    title: "ADVANCED SL CARBON",
    position: "technology-hotspot--carbon",
    technologyIds: ["advanced-sl"],
    detail: {
      en: "Raw carbon fiber weaving & max stiffness-to-weight ratio",
      mn: "Түүхий карбон нэхээс ба жин-хөшүүн чанарын дээд харьцаа",
    },
  },
  {
    id: "powercore",
    title: "POWERCORE & ALUXX SL",
    position: "technology-hotspot--powercore",
    technologyIds: ["maestro", "syncdrive", "aluxx-sl"],
    detail: {
      en: "Oversized bottom bracket stiffness & power transfer",
      mn: "Томруулсан каретканы хөшүүн чанар ба хүч дамжуулалт",
    },
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
  const Heading = pageTitle ? "h1" : "h2";
  const text = (value: { en: string; mn: string }) => value[language];

  return (
    <motion.section
      id="technology"
      aria-labelledby="technology-heading"
      className="technology-section technology-diagram py-20"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={sectionReveal}
    >
      <div className="technology-diagram__stage" aria-hidden="true">
        <Image
          src="/images/giantbike3.png"
          alt="Giant Carbon Frame"
          fill
          priority={pageTitle}
          sizes="100vw"
          className="technology-diagram__image"
        />
        <div className="technology-diagram__scrim" />
      </div>

      <div
        className="technology-hotspots"
        role="group"
        aria-label={language === "mn" ? "Рамын технологи" : "Frame technologies"}
      >
        {hotspots.map((hotspot) => {
          const active = technologies.some(
            (technology) =>
              technology.id === selectedId && technology.hotspotId === hotspot.id,
          );

          return (
            <button
              key={hotspot.id}
              type="button"
              className={`technology-hotspot ${hotspot.position}${active ? " is-active" : ""}`}
              aria-label={`${hotspot.title}: ${text(hotspot.detail)}`}
              aria-pressed={active}
              onClick={() => {
                const technology = technologies.find(
                  (item) => item.hotspotId === hotspot.id,
                );
                setSelectedId(technology?.id ?? null);
              }}
            >
              <span className="technology-hotspot__pulse" aria-hidden="true" />
              <span className="technology-hotspot__label">{hotspot.title}</span>
              <span className="technology-hotspot__detail">{text(hotspot.detail)}</span>
            </button>
          );
        })}
      </div>

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
              className={`technology-card${selectedId === technology.id ? " is-active" : ""}`}
              variants={cardVariants}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.99 }}
              onClick={() =>
                setSelectedId(selectedId === technology.id ? null : technology.id)
              }
              aria-pressed={selectedId === technology.id}
            >
              <span className="technology-card__category">
                <span aria-hidden="true" />
                {text(technology.category)}
              </span>
              <h2>{text(technology.title)}</h2>
              <p>{text(technology.description)}</p>
              <span className="technology-card__action">
                {language === "mn" ? "РАМ ДЭЭР ТОДРУУЛАХ" : "HIGHLIGHT ON FRAME"}
              </span>
            </motion.button>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
