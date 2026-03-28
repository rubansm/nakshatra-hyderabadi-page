import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import OriginStory from "@/components/OriginStory";
import ProductTruth from "@/components/ProductTruth";
import SocialProof from "@/components/SocialProof";
import ProcessSection from "@/components/ProcessSection";
import PricingSection from "@/components/PricingSection";
import FAQSection from "@/components/FAQSection";
import FinalCTA from "@/components/FinalCTA";

const Index = () => {
  return (
    <main className="font-body">
      <HeroSection />
      <OriginStory />
      <ProductTruth />
      <SocialProof />
      <ProcessSection />
      <PricingSection />
      <FAQSection />
      <FinalCTA />
    </main>
  );
};

export default Index;
