import type { Metadata } from "next";
import FlagshipStore from "@/components/flagship-store";
import PageIntro from "@/components/page-intro";
import { storesPage } from "@/data/pages";

export const metadata: Metadata = {
  title: "Stores",
  description:
    "Visit the Giant Mongolia flagship store in Ulaanbaatar for test rides, bike fitting, and service.",
};

export default function StoresPage() {
  return (
    <main>
      <PageIntro
        id="stores-page-heading"
        eyebrow={storesPage.eyebrow}
        title={storesPage.title}
        lead={storesPage.lead}
      />
      <FlagshipStore />
    </main>
  );
}
