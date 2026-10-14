import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const stats = ["Official Retailer", "Flagship Store Ulaanbaatar", "Service & Fitting"];

export default function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative flex min-h-[calc(100svh-4rem)] flex-col overflow-hidden bg-black text-white"
    >
      <Image
        src="/images/hero-steppe.png"
        alt="Mountain biker riding across the Mongolian steppe at golden hour"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[70%_center]"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-black/0" />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/90 to-transparent" />

      <div className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-4 py-20 md:px-8">
        <div className="animate-fade-up max-w-3xl">
          <p className="mb-6 text-xs font-bold uppercase tracking-[0.3em] text-neutral-200">
            Giant Bicycles — Mongolia
          </p>
          <h1
            id="hero-heading"
            className="text-6xl font-black uppercase leading-[0.88] tracking-tighter text-balance sm:text-7xl md:text-8xl lg:text-9xl"
          >
            Ride your world<span className="text-accent">.</span>
          </h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-neutral-200 md:text-xl">
            Explore Mongolia on a bike built for the way you ride.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link
              href="#bikes"
              className="group inline-flex h-14 items-center justify-center gap-3 bg-white px-8 text-sm font-bold uppercase tracking-[0.15em] text-neutral-900 transition-colors hover:bg-accent hover:text-white"
            >
              Shop Bikes
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
            <Link
              href="#disciplines"
              className="inline-flex h-14 items-center justify-center border border-white px-8 text-sm font-bold uppercase tracking-[0.15em] text-white transition-colors hover:bg-white hover:text-neutral-900"
            >
              Explore E-Bikes
            </Link>
          </div>
        </div>
      </div>

      <div className="relative border-t border-white/20">
        <ul className="mx-auto grid max-w-7xl grid-cols-1 px-4 sm:grid-cols-3 md:px-8">
          {stats.map((stat, i) => (
            <li
              key={stat}
              className={`flex items-center gap-3 py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-200 sm:py-5 ${
                i > 0 ? "border-t border-white/20 sm:border-t-0 sm:border-l sm:pl-6" : ""
              }`}
            >
              <span className="font-mono text-accent">{`0${i + 1}`}</span>
              {stat}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
