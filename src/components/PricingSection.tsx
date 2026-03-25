const plans = [
  {
    name: "Taster",
    weight: "250g",
    price: "₹349",
    desc: "Perfect for trying it out. Enough for a week of meals.",
    popular: false,
  },
  {
    name: "Family Pack",
    weight: "500g",
    price: "₹599",
    desc: "Our bestseller. Great for a family of four for 2–3 weeks.",
    popular: true,
  },
  {
    name: "Bulk Jar",
    weight: "1 kg",
    price: "₹999",
    desc: "For the true pickle lovers. Best value per gram.",
    popular: false,
  },
];

const PricingSection = () => {
  return (
    <section id="pricing" className="bg-background py-16 md:py-24">
      <div className="container mx-auto px-4">
        <p className="font-body text-turmeric uppercase tracking-[0.2em] text-sm mb-3 text-center">
          Simple Pricing
        </p>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">
          Pick Your Jar
        </h2>
        <p className="font-body text-muted-foreground text-center mb-10 max-w-md mx-auto">
          Free delivery across Chennai. Orders placed before 6 PM ship next day.
        </p>
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-xl p-6 border-2 text-center ${
                plan.popular
                  ? "border-turmeric bg-warm-brown text-cream"
                  : "border-border bg-card text-foreground"
              }`}
            >
              {plan.popular && (
                <span className="inline-block bg-turmeric text-warm-brown font-body text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full mb-4">
                  Most Popular
                </span>
              )}
              <h3 className="font-display text-xl font-bold mb-1">
                {plan.name}
              </h3>
              <p
                className={`font-body text-sm mb-4 ${
                  plan.popular ? "text-cream/60" : "text-muted-foreground"
                }`}
              >
                {plan.weight}
              </p>
              <p className="font-display text-4xl font-bold mb-2 text-turmeric">
                {plan.price}
              </p>
              <p
                className={`font-body text-sm mb-6 ${
                  plan.popular ? "text-cream/70" : "text-muted-foreground"
                }`}
              >
                {plan.desc}
              </p>
              <a
                href="https://wa.me/919999999999"
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-block w-full font-body font-semibold px-6 py-3 rounded-md transition-opacity hover:opacity-90 ${
                  plan.popular
                    ? "bg-turmeric text-warm-brown"
                    : "bg-warm-brown text-cream"
                }`}
              >
                Order on WhatsApp
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
