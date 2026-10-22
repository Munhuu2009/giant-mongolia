import Hero from "@/components/hero";
import DisciplineGrid from "@/components/discipline-grid";
import FeaturedBikes from "@/components/featured-bikes";
import TechnologySection from "@/components/technology-section";
import FlagshipStore from "@/components/flagship-store";

export default function Home() {
  return (
    <main className="home-page">
      <Hero />
      <FeaturedBikes />
      <DisciplineGrid />
      <TechnologySection />
      <FlagshipStore />
    </main>
  );
}
