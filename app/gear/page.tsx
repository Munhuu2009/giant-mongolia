import type { Metadata } from "next";
import PageIntro from "@/components/page-intro";
import GearCatalog from "@/components/gear-catalog";
import { gearPage } from "@/data/pages";

export const metadata: Metadata = {
  title: "Gear",
  description: "Shop Giant helmets, apparel, shoes, lights, electronics, pumps, bags, and accessories at Giant Mongolia.",
};

export default function GearPage() {
  return (
    <main>
      <PageIntro id="gear-heading" eyebrow={gearPage.eyebrow} title={gearPage.title} lead={gearPage.lead} />
      <GearCatalog />
    </main>
  );
}
