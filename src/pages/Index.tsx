import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import HowToUseSection from "@/components/HowToUseSection";
import ProductTruth from "@/components/ProductTruth";
import SocialProof from "@/components/SocialProof";

import FounderSection from "@/components/FounderSection";
import ProductSection from "@/components/ProductSection";
import FAQSection from "@/components/FAQSection";
import FinalCTA from "@/components/FinalCTA";
import FloatingCTA from "@/components/FloatingCTA";
import WelcomePopup from "@/components/WelcomePopup";

const Index = () => {
  return (
    <main className="font-body">
      <Navbar />
      <WelcomePopup />
      <HeroSection />
      <HowToUseSection />
      <ProductTruth />
      <FounderSection />
      <SocialProof />
      
      <ProductSection />
      <FAQSection />
      <FinalCTA />
      <FloatingCTA />
    </main>
  );
};

export default Index;
