import Image from "next/image";
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
  return (
    <section id="technology" aria-labelledby="technology-heading" className="panel panel-dark">
      <div className="wrap">
        <SectionHeading id="technology-heading" eyebrow="Engineered by Giant" title="Technology" inverted />

        <div className="tech">
          <div className="tech__media">
            <Image
              src="/images/technology-frame.png"
              alt="Close-up of carbon fiber weave on a Giant bicycle frame"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>

          <ul className="spec-list">
            {specs.map((spec) => (
              <li key={spec.title} className="spec-card">
                <h3 className="type-title">{spec.title}</h3>
                <p>{spec.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
