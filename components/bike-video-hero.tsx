"use client";

import { useLanguage } from "@/components/language-provider";

const videoFile =
  "#GravelCrusher： The All-New Revolt Advanced SL ｜ Giant Bicycles [22-MHuDvHYA].mkv";

export default function BikeVideoHero() {
  const { language } = useLanguage();
  const videoSrc = `/videos/${encodeURIComponent(videoFile)}`;

  return (
    <section
      aria-labelledby="bikes-heading"
      className="relative mb-10 flex h-[60vh] min-h-[420px] max-h-[650px] w-full flex-col justify-end overflow-hidden rounded-sm bg-neutral-950 p-8 md:p-14"
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover object-center brightness-90 contrast-105"
      >
        <source src={videoSrc} type="video/x-matroska" />
      </video>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-black/30"
      />

      <div className="relative z-20">
        <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-extrabold uppercase italic tracking-[0.25em] text-[#000099] backdrop-blur-md dark:bg-black/40 dark:text-blue-400">
          {language === "mn" ? "2026 ОНЫ ЦУГЛУУЛГА" : "2026 COLLECTION"}
        </p>
        <h1
          id="bikes-heading"
          className="mb-3 text-4xl font-black uppercase italic leading-none tracking-wider text-white drop-shadow-md sm:text-6xl lg:text-7xl"
        >
          {language === "mn" ? "БҮХ ДУГУЙ" : "THE ULTIMATE RIDE"}
        </h1>
        <p className="max-w-xl text-xs font-semibold italic uppercase leading-relaxed tracking-widest text-neutral-300 sm:text-sm">
          {language === "mn"
            ? "Giant-ийн замын, уулын, гравел, хотын болон цахилгаан дугуйг Улаанбаатарт туршиж үзээрэй."
            : "Engineered for speed, trail control, and high-altitude endurance across Mongolia."}
        </p>
      </div>
    </section>
  );
}
