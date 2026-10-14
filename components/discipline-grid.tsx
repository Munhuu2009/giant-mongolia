import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import SectionHeading from "@/components/section-heading";

const disciplines = [
  { name: "Road", tagline: "Speed & endurance", image: "/images/discipline-road.png" },
  { name: "Mountain", tagline: "Trail & enduro", image: "/images/discipline-mountain.png" },
  { name: "E-Bikes", tagline: "Powered by SyncDrive", image: "/images/discipline-ebike.png" },
  { name: "Gravel", tagline: "Any road, any steppe", image: "/images/discipline-gravel.png" },
  { name: "City", tagline: "Commute & fitness", image: "/images/discipline-city.png" },
  { name: "Kids", tagline: "First rides, big smiles", image: "/images/discipline-kids.png" },
];

export default function DisciplineGrid() {
  return (
    <section id="disciplines" aria-labelledby="disciplines-heading" className="scroll-mt-16 bg-white py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionHeading id="disciplines-heading" eyebrow="Shop by discipline" title="Find your ride" />

        <ul className="grid grid-cols-2 gap-2 md:gap-3 lg:grid-cols-3">
          {disciplines.map((d) => (
            <li key={d.name}>
              <Link
                href="#bikes"
                className="group relative block aspect-[3/4] overflow-hidden bg-neutral-900 md:aspect-[4/5]"
              >
                <Image
                  src={d.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 33vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-4 md:p-6">
                  <div>
                    <h3 className="text-xl font-black uppercase tracking-tight text-white md:text-3xl">{d.name}</h3>
                    <p className="mt-1 hidden text-sm text-neutral-200 sm:block">{d.tagline}</p>
                  </div>
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center bg-white text-neutral-900 transition-colors group-hover:bg-accent group-hover:text-white md:h-12 md:w-12">
                    <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
