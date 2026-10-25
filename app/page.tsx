import Hero from "@/components/hero";
import FeaturedBikes from "@/components/featured-bikes";
import TechnologyStorySection from "@/components/technology-story-section";
import DisciplineGrid from "@/components/discipline-grid";
import FlagshipStore from "@/components/flagship-store";

export default function Home() {
  return (
    <main className="home-page w-full min-h-screen">
      <Hero />
      <FeaturedBikes />
      <TechnologyStorySection />
      <DisciplineGrid />
      <FlagshipStore />
    </main>
  );
}
