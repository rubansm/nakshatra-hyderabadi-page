import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import HowToUseSection from "@/components/HowToUseSection";
import ProductTruth from "@/components/ProductTruth";
import SocialProof from "@/components/SocialProof";

import ProductSection from "@/components/ProductSection";
import FAQSection from "@/components/FAQSection";
import FinalCTA from "@/components/FinalCTA";
import FloatingCTA from "@/components/FloatingCTA";

const Index = () => {
  return (
    <main className="font-body">
      <Navbar />
      <HeroSection />
      <HowToUseSection />
      <ProductTruth />
      <SocialProof />
      <ProcessSection />
      <ProductSection />
      <FAQSection />
      <FinalCTA />
      <FloatingCTA />
    </main>
  );
};

export default Index;
