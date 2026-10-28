"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type FocusEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLanguage } from "@/components/language-provider";

type Localized = { en: string; mn: string };

const SLIDE_DURATION_MS = 7000;
const IMAGE = { width: 2736, height: 1536 } as const;
const CARD_MAX_WIDTH = 340;
const EDGE = 16;
const MOVE = { duration: 0.7, ease: "easeInOut" } as const;
const FADE = { duration: 0.4, ease: "easeInOut" } as const;

const features = [
  {
    id: "advanced-sl",
    pin: { x: 50, y: 51 },
    card: { side: 1, dx: 80, dy: 110 },
    category: { en: "Composite engineering", mn: "Нийлмэл материалын инженерчлэл" },
    title: { en: "Advanced SL Carbon", mn: "Advanced SL карбон" },
    description: {
      en: "Raw carbon fiber woven in Giant's own factory for an uncompromising stiffness-to-weight ratio.",
      mn: "Giant-ийн өөрийн үйлдвэрт нэхсэн карбон ширхэг нь жин ба хөшүүн чанарын хамгийн сайн харьцааг өгнө.",
    },
  },
  {
    id: "overdrive-aero",
    pin: { x: 53, y: 7 },
    card: { side: 1, dx: 80, dy: 100 },
    category: { en: "Aerodynamic design", mn: "Аэродинамик хийц" },
    title: { en: "Overdrive Aero", mn: "Overdrive Aero" },
    description: {
      en: "Oversized D-shaped steerer tube and internal routing cut drag while sharpening front-end steering response.",
      mn: "D хэлбэрийн томруулсан жолооны гол ба далд кабелийн суваг нь салхины эсэргүүцлийг бууруулж, жолоодлогыг илүү нарийн болгоно.",
    },
  },
  {
    id: "d-fuse",
    pin: { x: 54.5, y: 26 },
    card: { side: 1, dx: 90, dy: 60 },
    category: { en: "Comfort engineering", mn: "Тав тухын инженерчлэл" },
    title: { en: "D-Fuse Technology", mn: "D-Fuse технологи" },
    description: {
      en: "A D-shaped composite seatpost that flexes to absorb road vibration without giving up aero efficiency.",
      mn: "D хэлбэрийн карбон суудлын шон нь аэродинамикийг алдагдуулахгүйгээр замын чичиргээг шингээнэ.",
    },
  },
  {
    id: "aero-shaping",
    pin: { x: 62.5, y: 50 },
    card: { side: 1, dx: 80, dy: -120 },
    category: { en: "Frame design", mn: "Рамын хийц" },
    title: { en: "AeroSystem Shaping", mn: "AeroSystem хэлбэржилт" },
    description: {
      en: "Truncated airfoil tube profiles and dropped seatstays shed turbulence across the whole frame and wheel zone.",
      mn: "Тайрсан далавчны профиль болон намхан суудлын тулгуур нь рам ба дугуйн орчмын салхины эргэлтийг бууруулна.",
    },
  },
  {
    id: "integrated-cockpit",
    pin: { x: 42, y: 7.5 },
    card: { side: 1, dx: 80, dy: 130 },
    category: { en: "Front-end integration", mn: "Урд хэсгийн нэгдсэн хийц" },
    title: { en: "Integrated Cockpit", mn: "Нэгдсэн кокпит" },
    description: {
      en: "Bar, stem and cabling merge into one clean aero unit that stays easy to fit and service.",
      mn: "Залуур, шток болон кабель нэг цэвэрхэн аэро нэгж болж, тохируулга болон засвар үйлчилгээ хялбар хэвээр үлдэнэ.",
    },
  },
] as const;

type Feature = (typeof features)[number];

const copy = {
  badge: { en: "Giant Engineering", mn: "Giant-ийн инженерчлэл" },
  title: { en: "Propel Technology", mn: "Propel технологи" },
  lead: {
    en: "The core engineering behind the Propel, built around speed in every detail.",
    mn: "Хурдыг эрхэмлэсэн Propel дугуйн гол инженерчлэлийн шийдлүүд.",
  },
  details: { en: "See the details", mn: "Дэлгэрэнгүй үзэх" },
  explore: { en: "Explore Propel", mn: "Propel үзэх" },
  features: { en: "Features", mn: "Онцлогууд" },
} satisfies Record<string, Localized>;

const sectionReveal = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const glass =
  "backdrop-blur-sm bg-white/[0.08] dark:bg-black/40 border border-white/25 dark:border-white/15 shadow-[0_8px_32px_rgba(0,0,0,0.35)] rounded-2xl text-white";

const pill =
  "inline-flex items-center justify-center bg-white/15 dark:bg-white/10 border border-white/30 dark:border-white/20 backdrop-blur-[1px] rounded-full px-5 py-2 text-xs font-semibold text-white transition-all hover:bg-white/25 hover:border-white/40 shadow-sm";

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), Math.max(min, max));

const round = (value: number) => Math.round(value * 10) / 10;

function FeatureContent({
  feature,
  index,
  language,
}: {
  feature: Feature;
  index: number;
  language: "en" | "mn";
}) {
  return (
    <>
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="flex items-center gap-2 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-white/80">
          <span aria-hidden="true" className="h-px w-5 bg-white/60" />
          {feature.category[language]}
        </p>
        <span className="text-[0.65rem] font-semibold tabular-nums text-white/60">
          {String(index + 1).padStart(2, "0")} / {String(features.length).padStart(2, "0")}
        </span>
      </div>
      <h3 className="text-xl font-bold leading-tight tracking-tight text-white">
        {feature.title[language]}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-white/80">
        {feature.description[language]}
      </p>
    </>
  );
}

export default function TechnologySection({ pageTitle = false }: { pageTitle?: boolean }) {
  const { language } = useLanguage();
  const text = (value: Localized) => value[language];
  const Heading = pageTitle ? "h1" : "h2";

  const [activeIndex, setActiveIndex] = useState(0);
  const [resetKey, setResetKey] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const paused = hovered || focused;

  const stageRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [headerBox, setHeaderBox] = useState({ right: 0, bottom: 0 });
  const [contentBox, setContentBox] = useState({ left: EDGE, right: 0 });
  const [cardHeight, setCardHeight] = useState(220);

  useEffect(() => {
    const stage = stageRef.current;
    const container = containerRef.current;
    const header = headerRef.current;
    if (!stage) return;
    const update = () => {
      const s = stage.getBoundingClientRect();
      setSize({ w: stage.clientWidth, h: stage.clientHeight });
      if (header) {
        const r = header.getBoundingClientRect();
        setHeaderBox({ right: r.right - s.left, bottom: r.bottom - s.top });
      }
      if (container) {
        const r = container.getBoundingClientRect();
        const style = window.getComputedStyle(container);
        setContentBox({
          left: r.left - s.left + parseFloat(style.paddingLeft || "0"),
          right: r.right - s.left - parseFloat(style.paddingRight || "0"),
        });
      }
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(stage);
    if (container) observer.observe(container);
    if (header) observer.observe(header);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const node = cardRef.current;
    if (!node) return;
    const update = () => setCardHeight(node.offsetHeight);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % features.length);
    }, SLIDE_DURATION_MS);
    return () => clearInterval(timer);
  }, [activeIndex, resetKey, paused]);

  const selectFeature = (index: number) => {
    setActiveIndex(index);
    setResetKey((key) => key + 1);
  };

  const pauseHandlers = {
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
    onFocusCapture: (event: FocusEvent<HTMLElement>) =>
      setFocused(event.target.matches(":focus-visible")),
    onBlurCapture: () => setFocused(false),
  };

  const mobile = size.w > 0 && size.w < 640;

  const layout = (() => {
    if (!size.w || !size.h) return null;
    const scale = Math.max(size.w / IMAGE.width, size.h / IMAGE.height);
    const w = IMAGE.width * scale;
    const h = IMAGE.height * scale;
    const left = mobile ? clamp(size.w / 2 - w * 0.52, size.w - w, 0) : size.w - w;
    return { w, h, left, top: (size.h - h) / 2 };
  })();

  const toPoint = (pin: { x: number; y: number }) =>
    layout
      ? { x: layout.left + (pin.x / 100) * layout.w, y: layout.top + (pin.y / 100) * layout.h }
      : null;

  const isVisible = (point: { x: number; y: number } | null) =>
    !!point && point.x > 24 && point.x < size.w - 24 && point.y > 24 && point.y < size.h - 24;

  const k = clamp(size.w / 1000, 0.55, 1);
  const active = features[activeIndex];
  const minX = contentBox.left || EDGE;
  const maxX = contentBox.right || size.w - EDGE;
  const cardWidth = Math.min(CARD_MAX_WIDTH, Math.max(0, maxX - minX));

  const activePin = toPoint(active.pin);
  const pinVisible = isVisible(activePin);

  const geometry = (() => {
    if (!layout) return null;
    const pin = activePin ?? { x: size.w * 0.6, y: size.h * 0.5 };

    let x: number;
    let y: number;
    if (mobile) {
      x = minX;
      y = size.h - cardHeight - EDGE;
    } else {
      const { side, dx, dy } = active.card;
      const rawX = side === 1 ? pin.x + dx * k : pin.x - dx * k - cardWidth;
      x = clamp(rawX, minX, maxX - cardWidth);
      y = clamp(pin.y + dy * k - cardHeight / 2, EDGE, size.h - cardHeight - EDGE);

      const overlapsHeader =
        headerBox.right > 0 && y < headerBox.bottom + EDGE && x < headerBox.right + EDGE;
      if (overlapsHeader) {
        if (headerBox.right + EDGE + cardWidth <= maxX) {
          x = headerBox.right + EDGE;
        } else {
          y = clamp(headerBox.bottom + EDGE, EDGE, size.h - cardHeight - EDGE);
        }
      }
    }

    const card = { x, y, right: x + cardWidth, bottom: y + cardHeight };

    let attach: { x: number; y: number };
    let elbow: { x: number; y: number };
    if (pin.x < card.x) {
      attach = { x: card.x, y: card.y + cardHeight / 2 };
      elbow = { x: Math.max(pin.x, attach.x - 28), y: attach.y };
    } else if (pin.x > card.right) {
      attach = { x: card.right, y: card.y + cardHeight / 2 };
      elbow = { x: Math.min(pin.x, attach.x + 28), y: attach.y };
    } else {
      const ax = clamp(pin.x, card.x + 20, card.right - 20);
      attach = pin.y < card.y ? { x: ax, y: card.y } : { x: ax, y: card.bottom };
      elbow = { x: ax, y: pin.y + (attach.y - pin.y) / 2 };
    }

    const d = `M${round(pin.x)} ${round(pin.y)} L${round(elbow.x)} ${round(elbow.y)} L${round(attach.x)} ${round(attach.y)}`;
    return { card, attach, d };
  })();

  return (
    <motion.section
      id="technology"
      aria-labelledby="technology-heading"
      className="technology-section relative flex min-h-[46rem] w-full items-center justify-center overflow-hidden bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-[#0b0f17] dark:text-white sm:min-h-[85vh] md:aspect-[2736/1536] md:max-h-screen"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={sectionReveal}
    >
      <div ref={stageRef} className="absolute inset-0 z-0 h-full w-full">
        <div
          className="absolute"
          style={
            layout
              ? { left: layout.left, top: layout.top, width: layout.w, height: layout.h }
              : { inset: 0 }
          }
        >
          <Image
            src="/images/giantbike4.png"
            alt="Propel"
            fill
            priority
            sizes="100vw"
            className="h-full w-full object-cover object-right opacity-100"
          />
        </div>
      </div>

      <div
        ref={containerRef}
        className="pointer-events-none relative z-10 mx-auto w-full max-w-7xl self-start px-6 pt-6 md:px-12 md:pt-10"
      >
        <div
          ref={headerRef}
          className={`pointer-events-auto max-w-lg p-6 md:p-8 ${glass}`}
          {...pauseHandlers}
        >
          <p className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/80">
            <span aria-hidden="true" className="h-2 w-2 rounded-full bg-white/80" />
            {text(copy.badge)}
          </p>

          <Heading
            id="technology-heading"
            className="text-4xl font-extrabold uppercase italic leading-[1.02] tracking-tight text-white md:text-5xl"
          >
            {text(copy.title)}
          </Heading>

          <p className="mt-4 max-w-md text-sm leading-relaxed text-white/80">
            {text(copy.lead)}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link
              href="/technology"
              className={`${pill} uppercase tracking-[0.2em] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70`}
            >
              {text(copy.details)}
            </Link>
            <Link
              href="/bikes"
              className={`${pill} uppercase tracking-[0.2em] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70`}
            >
              {text(copy.explore)}
            </Link>
          </div>

          <nav className="mt-6 flex flex-row flex-wrap gap-3" aria-label={text(copy.features)}>
            {features.map((feature, index) => {
              const isActive = index === activeIndex;
              return (
                <button
                  key={feature.id}
                  type="button"
                  title={text(feature.title)}
                  aria-label={text(feature.title)}
                  aria-current={isActive ? "step" : undefined}
                  onClick={() => selectFeature(index)}
                  className="group flex flex-col items-center gap-1.5 outline-none"
                >
                  <span
                    className={`${pill} h-10 w-10 !p-0 tabular-nums group-focus-visible:ring-2 group-focus-visible:ring-white/70 ${
                      isActive
                        ? "!border-white/60 !bg-white/35"
                        : "group-hover:bg-white/25"
                    }`}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="h-0.5 w-8 overflow-hidden rounded-full bg-white/25">
                    {isActive && (
                      <motion.span
                        key={`progress-${activeIndex}-${resetKey}-${paused ? "paused" : "running"}`}
                        className="block h-full w-full origin-left bg-white"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: paused ? 0 : 1 }}
                        transition={{
                          duration: paused ? 0.2 : SLIDE_DURATION_MS / 1000,
                          ease: "linear",
                        }}
                      />
                    )}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 z-40">
        {geometry && (
          <svg aria-hidden="true" width={size.w} height={size.h} className="absolute inset-0">
            <motion.path
              fill="none"
              stroke="#ffffff"
              strokeWidth={4}
              strokeLinejoin="round"
              strokeLinecap="round"
              initial={false}
              animate={{ d: geometry.d, opacity: pinVisible ? 0.85 : 0 }}
              transition={MOVE}
            />
            <motion.path
              fill="none"
              stroke="#0b0f17"
              strokeWidth={1.75}
              strokeLinejoin="round"
              strokeLinecap="round"
              initial={false}
              animate={{ d: geometry.d, opacity: pinVisible ? 1 : 0 }}
              transition={MOVE}
            />
            <motion.circle
              r={3.5}
              fill="#1a1aec"
              stroke="#ffffff"
              strokeWidth={1.5}
              initial={false}
              animate={{
                cx: geometry.attach.x,
                cy: geometry.attach.y,
                opacity: pinVisible ? 1 : 0,
              }}
              transition={MOVE}
            />
          </svg>
        )}

        {features.map((feature, index) => {
          const point = toPoint(feature.pin);
          if (!point || !isVisible(point)) return null;
          const isActive = index === activeIndex;
          return (
            <button
              key={feature.id}
              type="button"
              aria-label={text(feature.title)}
              aria-pressed={isActive}
              onClick={() => selectFeature(index)}
              className="group pointer-events-auto absolute left-0 top-0 grid h-11 w-11 place-items-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-[#1a1aec]"
              style={{ transform: `translate(${point.x - 22}px, ${point.y - 22}px)` }}
            >
              <span
                aria-hidden="true"
                className="relative grid h-full w-full place-items-center"
              >
                {isActive && (
                  <>
                    <motion.span
                      className="absolute h-8 w-8 rounded-full border-2 border-[#1a1aec] bg-white/30"
                      animate={{ scale: [0.6, 1.8], opacity: [0.95, 0] }}
                      transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
                    />
                    <motion.span
                      className="absolute h-8 w-8 rounded-full border-2 border-[#1a1aec] bg-white/30"
                      animate={{ scale: [0.6, 1.8], opacity: [0.95, 0] }}
                      transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut", delay: 0.9 }}
                    />
                  </>
                )}
                <motion.span
                  className="relative rounded-full border-2 bg-white"
                  initial={false}
                  animate={{
                    width: isActive ? 16 : 12,
                    height: isActive ? 16 : 12,
                    borderColor: isActive ? "#1a1aec" : "#0b0f17",
                    boxShadow: isActive
                      ? "0 0 0 2px #ffffff, 0 4px 12px rgba(0,0,0,0.55)"
                      : "0 0 0 1.5px #ffffff, 0 2px 8px rgba(0,0,0,0.45)",
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                />
              </span>
            </button>
          );
        })}

        <motion.div
          ref={cardRef}
          className={`pointer-events-auto absolute left-0 top-0 p-5 will-change-transform md:p-6 ${glass}`}
          style={{ width: cardWidth || undefined }}
          initial={false}
          animate={{
            x: geometry?.card.x ?? 0,
            y: geometry?.card.y ?? 0,
            opacity: geometry ? 1 : 0,
          }}
          transition={MOVE}
          aria-live="polite"
          {...pauseHandlers}
        >
          <div className="grid">
            {features.map((feature, index) => (
              <div
                key={`sizer-${feature.id}`}
                aria-hidden="true"
                className="invisible col-start-1 row-start-1"
              >
                <FeatureContent feature={feature} index={index} language={language} />
              </div>
            ))}

            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={`${active.id}-${language}`}
                className="col-start-1 row-start-1"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={FADE}
              >
                <FeatureContent feature={active} index={activeIndex} language={language} />
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
