import type { Metadata } from "next";
import TechnologySection from "@/components/technology-section";

export const metadata: Metadata = {
  title: "Technology",
  description:
    "Explore Giant's Advanced SL Composite, Maestro Suspension, SyncDrive Pro, D-Fuse, OverDrive Aero, and ALUXX SL engineering innovations.",
};

export default function TechnologyPage() {
  return (
    <main>
      <TechnologySection pageTitle />
    </main>
  );
}
