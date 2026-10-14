import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, MapPin, Phone } from "lucide-react";

// PLACEHOLDER store details — replace with the real address, hours, and phone number.
const store = {
  address: ["Peace Avenue 00, Sukhbaatar District", "Ulaanbaatar 14200, Mongolia"],
  hours: ["Mon – Fri: 10:00 – 20:00", "Sat – Sun: 11:00 – 19:00"],
  phone: "+976 0000 0000",
  directionsUrl: "https://www.google.com/maps/search/?api=1&query=Ulaanbaatar",
};

export default function FlagshipStore() {
  return (
    <section id="stores" aria-labelledby="stores-heading" className="relative scroll-mt-16 overflow-hidden bg-neutral-900 text-white">
      <Image
        src="/images/flagship-store.png"
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-40"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-neutral-900 via-neutral-900/85 to-neutral-900/30" />

      <div className="relative mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-32">
        <p className="mb-3 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.3em] text-accent">
          <span aria-hidden="true" className="h-px w-8 bg-accent" />
          Flagship store
        </p>
        <h2 id="stores-heading" className="max-w-2xl text-4xl font-black uppercase leading-none tracking-tighter text-balance md:text-6xl">
          Visit Giant Mongolia
        </h2>
        <p className="mt-6 max-w-lg leading-relaxed text-neutral-300">
          Test ride the full range, get a professional bike fit, and keep your bike running with our certified service workshop.
        </p>

        <dl className="mt-12 grid max-w-3xl gap-8 sm:grid-cols-3">
          <div>
            <dt className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-400">
              <MapPin className="h-4 w-4 text-accent" aria-hidden="true" />
              Address
            </dt>
            <dd className="mt-3 leading-relaxed">
              {store.address.map((line) => (
                <span key={line} className="block">{line}</span>
              ))}
            </dd>
          </div>
          <div>
            <dt className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-400">
              <Clock className="h-4 w-4 text-accent" aria-hidden="true" />
              Hours
            </dt>
            <dd className="mt-3 leading-relaxed">
              {store.hours.map((line) => (
                <span key={line} className="block">{line}</span>
              ))}
            </dd>
          </div>
          <div>
            <dt className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-400">
              <Phone className="h-4 w-4 text-accent" aria-hidden="true" />
              Phone
            </dt>
            <dd className="mt-3">
              <a href={`tel:${store.phone.replace(/\s/g, "")}`} className="hover:text-accent">
                {store.phone}
              </a>
            </dd>
          </div>
        </dl>

        <Link
          href={store.directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-12 inline-flex h-14 items-center gap-3 bg-white px-8 text-sm font-bold uppercase tracking-[0.15em] text-neutral-900 transition-colors hover:bg-accent hover:text-white"
        >
          Get Directions
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
