import Image from "next/image";
import { ArrowRight, Clock, MapPin, Phone } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { store } from "@/data/store";

export default function FlagshipStore() {
  return (
    <section id="stores" aria-labelledby="stores-heading" className="photo-panel on-photo">
      <Image src="/images/flagship-store.png" alt="" fill sizes="100vw" className="object-cover" />
      <div aria-hidden="true" className="photo-panel__scrim" />

      <div className="wrap photo-panel__body">
        <p className="chip chip-glass mb-4">Flagship store</p>
        <h2 id="stores-heading" className="type-headline">
          Visit Giant Mongolia
        </h2>
        <p className="type-lead mt-5">
          Test ride the full range, get a professional bike fit, and keep your bike running with our certified service workshop.
        </p>

        <dl className="info-grid">
          <div className="glass-card">
            <dt>
              <MapPin className="h-4 w-4" aria-hidden="true" />
              Address
            </dt>
            <dd>
              {store.address.map((line) => (
                <span key={line} className="block">{line}</span>
              ))}
            </dd>
          </div>
          <div className="glass-card">
            <dt>
              <Clock className="h-4 w-4" aria-hidden="true" />
              Hours
            </dt>
            <dd>
              {store.hours.map((line) => (
                <span key={line} className="block">{line}</span>
              ))}
            </dd>
          </div>
          <div className="glass-card">
            <dt>
              <Phone className="h-4 w-4" aria-hidden="true" />
              Phone
            </dt>
            <dd>
              <a href={`tel:${store.phone.replace(/\s/g, "")}`}>{store.phone}</a>
            </dd>
          </div>
        </dl>

        <ButtonLink
          href={store.directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          variant="glass-strong"
          size="lg"
          className="mt-10"
        >
          Get directions
          <ArrowRight className="arrow h-5 w-5" aria-hidden="true" />
        </ButtonLink>
      </div>
    </section>
  );
}
