import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import SectionHeading from "@/components/section-heading";
import { disciplines } from "@/data/disciplines";

export default function DisciplineGrid() {
  return (
    <section id="disciplines" aria-labelledby="disciplines-heading" className="section">
      <div className="wrap">
        <SectionHeading id="disciplines-heading" eyebrow="Shop by discipline" title="Find your ride" />

        <ul className="tile-grid">
          {disciplines.map((d) => (
            <li key={d.id}>
              <Link href={`/bikes?discipline=${d.id}`} className="tile on-photo">
                <Image src={d.image} alt={`${d.name} bikes`} fill sizes="(min-width: 1024px) 33vw, 50vw" className="zoom" />
                <div aria-hidden="true" className="tile__scrim" />
                <div className="tile__content">
                  <div>
                    <h3 className="tile__name">{d.name}</h3>
                    <p className="tile__tagline">{d.tagline}</p>
                  </div>
                  <span aria-hidden="true" className="icon-btn icon-btn-glass tile__arrow">
                    <ArrowUpRight className="h-5 w-5" />
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
