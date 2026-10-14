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
    <section id="technology" aria-labelledby="technology-heading" className="scroll-mt-16 bg-black py-20 text-white md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionHeading id="technology-heading" eyebrow="Engineered by Giant" title="Technology" inverted />

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="relative aspect-[4/3] overflow-hidden bg-neutral-900 lg:aspect-auto">
            <Image
              src="/images/technology-frame.png"
              alt="Close-up of carbon fiber weave on a Giant bicycle frame"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>

          <ol className="flex flex-col">
            {specs.map((spec, i) => (
              <li key={spec.title} className="flex gap-6 border-t border-neutral-800 py-7 last:border-b md:gap-10">
                <span className="font-mono text-sm font-semibold text-accent" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-xl font-black uppercase tracking-tight md:text-2xl">{spec.title}</h3>
                  <p className="mt-2 max-w-md leading-relaxed text-neutral-400">{spec.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
