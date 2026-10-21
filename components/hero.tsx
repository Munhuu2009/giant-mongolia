import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";

const stats = ["Official retailer", "Flagship store, Ulaanbaatar", "Service & fitting"];

export default function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="hero on-photo">
      <Image
        src="/images/hero-steppe.png"
        alt="Mountain biker riding across the Mongolian steppe at golden hour"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[88%_center] md:object-[70%_center]"
      />
      <div aria-hidden="true" className="hero__scrim" />

      <div className="hero__body">
        <div className="animate-fade-up">
          <h1 id="hero-heading" className="type-display hero__title">
            Ride your world<span className="dot">.</span>
          </h1>
          <p className="hero__lead">Explore Mongolia on a bike built for the way you ride.</p>
          <div className="hero__actions">
            <ButtonLink href="#bikes" variant="glass-strong" size="lg">
              Shop bikes
              <ArrowRight className="arrow h-5 w-5" aria-hidden="true" />
            </ButtonLink>
            <ButtonLink href="#disciplines" variant="glass" size="lg">
              Explore e-bikes
            </ButtonLink>
          </div>
        </div>

        <ul className="hero__chips">
          {stats.map((stat) => (
            <li key={stat} className="chip chip-glass">
              {stat}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
