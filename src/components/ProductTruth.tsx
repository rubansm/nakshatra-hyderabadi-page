import { Check, X } from "lucide-react";

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
    <section className="bg-warm-brown py-16 md:py-24">
      <div className="container mx-auto px-4 max-w-3xl">
        <p className="font-body text-turmeric uppercase tracking-[0.2em] text-sm mb-3 text-center">
          What Goes In
        </p>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-cream mb-10 text-center">
          Honest Ingredients. Nothing Else.
        </h2>
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
