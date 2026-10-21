"use client";

import Image from "next/image";
import { useLanguage } from "@/components/language-provider";
import SectionHeading from "@/components/section-heading";

const specs = [
  {
    title: "Advanced SL Carbon",
    body: "Giant manufactures its own raw carbon, giving every frame a precise stiffness-to-weight ratio from the fiber up.",
  },
  {
    title: "AluxX SL Aluminum",
    body: "Butted, hydroformed alloy tubing that delivers race-level performance with long-term durability.",
  },
  {
    title: "Maestro Suspension",
    body: "A four-bar, dual-link design that stays active under braking and efficient under power on rough terrain.",
  },
  {
    title: "SyncDrive Motors",
    body: "Smart Assist reads speed, cadence, and torque to deliver natural, responsive power exactly when you need it.",
  },
];

export default function TechnologySection() {
  const { translate } = useLanguage();

  return (
    <section id="technology" aria-labelledby="technology-heading" className="technology-section panel-dark">
      <div className="technology-section__inner">
        <SectionHeading
          id="technology-heading"
          eyebrow={translate("Engineered by Giant")}
          title={translate("Technology")}
          inverted
        />

        <div className="tech">
          <div className="tech__media">
            <Image
              src="/images/technology-frame.png"
              alt={translate("Close-up of carbon fiber weave on a Giant bicycle frame")}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>

          <ul className="spec-list">
            {specs.map((spec) => (
              <li key={spec.title} className="spec-card">
                <h3 className="type-title">{translate(spec.title)}</h3>
                <p>{translate(spec.body)}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
