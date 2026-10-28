import type { Metadata } from "next";
import FlagshipStore from "@/components/flagship-store";
import StoreContact from "@/components/store-contact";

export const metadata: Metadata = {
  title: "Stores",
  description:
    "Visit the Giant Mongolia flagship store in Ulaanbaatar for test rides, bike fitting, and service.",
};

export default function StoresPage() {
  return (
    <main>
      <StoreContact />
      <FlagshipStore showGallery showBanner={false} />
    </main>
  );
}
