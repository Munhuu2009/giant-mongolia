import SiteHeader from "@/components/site-header";
import Hero from "@/components/hero";
import DisciplineGrid from "@/components/discipline-grid";
import FeaturedBikes from "@/components/featured-bikes";
import TechnologySection from "@/components/technology-section";
import FlagshipStore from "@/components/flagship-store";
import SiteFooter from "@/components/site-footer";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <DisciplineGrid />
        <FeaturedBikes />
        <TechnologySection />
        <FlagshipStore />
      </main>
      <SiteFooter />
    </>
  );
}
