"use client";

import { useLanguage } from "@/components/language-provider";

export default function Loading() {
  const { translate } = useLanguage();

  return (
    <div
      role="status"
      aria-label={translate("Loading Giant Mongolia")}
      className="fixed inset-0 z-50 flex min-h-screen flex-col items-center justify-center bg-neutral-950 text-white"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 100 100"
        className="app-loading__wheel h-24 w-24 animate-spin"
        fill="none"
      >
        <circle cx="50" cy="50" r="43" stroke="#262626" strokeWidth="3" />
        <circle
          cx="50"
          cy="50"
          r="43"
          stroke="#000099"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray="78 192"
          className="drop-shadow-[0_0_8px_#000099]"
        />
        <circle cx="50" cy="50" r="30" stroke="#737373" strokeWidth="1.5" />
        <g stroke="#a3a3a3" strokeWidth="1.5">
          <path d="M50 20v60M20 50h60M28.8 28.8l42.4 42.4M71.2 28.8 28.8 71.2" />
          <path d="m38.5 22.2 23 55.6M22.2 61.5l55.6-23M61.5 22.2l-23 55.6M77.8 61.5l-55.6-23" />
        </g>
        <circle cx="50" cy="50" r="7" fill="#000099" />
        <circle cx="50" cy="50" r="2.5" fill="white" />
      </svg>

      <div
        role="progressbar"
        aria-label={translate("Loading progress")}
        aria-valuemin={0}
        aria-valuemax={100}
        className="loading-progress mt-8 h-1 w-48 overflow-hidden rounded-full bg-neutral-800"
      >
        <span className="loading-progress__fill block h-full rounded-full bg-[#000099]" />
      </div>

      <p className="mt-5 text-sm font-bold uppercase tracking-[0.24em] text-white/80">
        {translate("Loading ride...")}
      </p>
    </div>
  );
}
