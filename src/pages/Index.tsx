import TravelHeader from "@/components/TravelHeader";
import TravelHero from "@/components/TravelHero";
import CategoryGrid from "@/components/CategoryGrid";
import FeaturedContent from "@/components/FeaturedContent";
import TravelFooter from "@/components/TravelFooter";

const Index = () => {
  return (
    <div className="min-h-screen">
      <TravelHeader />
      <TravelHero />
      <CategoryGrid />
      <FeaturedContent />
      <TravelFooter />
    </div>
  );
};

export default Index;