import { Check, X } from "lucide-react";
import ingredientsHero from "@/assets/ingredients-hero.png";

const truths = [
  { good: true, text: "100% boneless chicken pieces" },
  { good: true, text: "Cold-pressed gingelly oil" },
  { good: true, text: "Hand-ground masala, never factory-mixed" },
  { good: true, text: "No preservatives or artificial colour" },
  { good: true, text: "Small batches, made fresh weekly" },
  { good: false, text: "No MSG or taste enhancers" },
  { good: false, text: "No palm oil or cheap substitutes" },
  { good: false, text: "No frozen or pre-processed chicken" },
];

const ProductTruth = () => {
  return (
    <section className="bg-warm-brown">
      {/* Hero image with overlay text */}
      <div className="relative">
        <img
          src={ingredientsHero}
          alt="Nakshatra Pickle ingredients — boneless chicken, cold-pressed sesame oil, turmeric, red chili, ginger-garlic paste, mustard seeds, fenugreek, curry leaves, and mixed spices"
          className="w-full h-auto block"
        />
        {/* Text overlay in the headroom area */}
        <div className="absolute top-0 left-0 right-0 pt-8 md:pt-14 px-4 text-center">
          <p className="font-body text-turmeric uppercase tracking-[0.25em] text-xs md:text-sm mb-2">
            What Goes In
          </p>
          <h2 className="font-display text-2xl md:text-4xl font-bold text-cream leading-tight">
            Ingredients That Defy Distance
          </h2>
        </div>
      </div>

      {/* Truth badges below */}
      <div className="container mx-auto px-4 max-w-3xl py-12 md:py-16">
        <div className="grid sm:grid-cols-2 gap-4">
          {truths.map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-3 bg-cream/5 rounded-lg px-5 py-4"
            >
              {item.good ? (
                <Check className="w-5 h-5 text-turmeric shrink-0" />
              ) : (
                <X className="w-5 h-5 text-terracotta shrink-0" />
              )}
              <span className="font-body text-cream/90">{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductTruth;