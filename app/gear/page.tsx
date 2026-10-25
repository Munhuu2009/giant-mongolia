import type { Metadata } from "next";
import GearCatalog from "@/components/gear-catalog";
import GearVideoHero from "@/components/gear-video-hero";

export const metadata: Metadata = {
  title: "Gear",
  description: "Shop Giant helmets, apparel, shoes, lights, electronics, pumps, bags, and accessories at Giant Mongolia.",
};

export default function GearPage() {
  return (
    <main>
      <GearVideoHero />
      <GearCatalog />
    </main>
  );
}
