import { useState, useEffect } from "react";
import { Plus, Minus } from "lucide-react";

type VariantKey = "250g" | "500g" | "1kg" | "more";

interface Variant {
  title: string;
  tagline: string;
  description: string;
  price: string;
  isCustom?: boolean;
}

const variants: Record<VariantKey, Variant> = {
  "250g": {
    title: "The Taster Jar",
    tagline: "A bold first bite.",
    description: "Enough for a week of fiery, flavour-packed meals. Pure groundnut oil, sun-dried spices.",
    price: "₹400",
  },
  "500g": {
    title: "The Family Jar",
    tagline: "The one everyone fights over.",
    description: "Two weeks of rich, homestyle chicken pickle. Our bestseller for a reason.",
    price: "₹600",
  },
  "1kg": {
    title: "The Bulk Jar",
    tagline: "For the ones who never run out.",
    description: "A month of deep, slow-cooked flavour. Best value, zero compromise.",
    price: "₹1000",
  },
  more: {
    title: "Bulk & Custom",
    tagline: "For gifting, events & larger orders.",
    description: "Custom quantities, branded packaging, and bulk pricing available.",
    price: "Custom / Bulk Orders",
    isCustom: true,
  },
};

const toggleOptions: VariantKey[] = ["250g", "500g", "1kg", "more"];

const ProductSection = () => {
  const [selected, setSelected] = useState<VariantKey>("500g");
  const [quantity, setQuantity] = useState(1);
  const [fade, setFade] = useState(false);

  const current = variants[selected];

  const handleToggle = (key: VariantKey) => {
    if (key === selected) return;
    setFade(true);
    setTimeout(() => {
      setSelected(key);
      setQuantity(1);
      setFade(false);
    }, 150);
  };

  return (
    <section id="pricing" className="bg-background py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Glassmorphism Toggle */}
        <div className="flex justify-center mb-12">
          <div
            className="inline-flex rounded-full p-1 gap-1"
            style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(133,53,55,0.12))",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.15)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
            }}
          >
            {toggleOptions.map((key) => (
              <button
                key={key}
                onClick={() => handleToggle(key)}
                className={`px-5 py-2 rounded-full text-sm font-body font-semibold uppercase tracking-wider transition-all duration-200 ${
                  selected === key
                    ? "text-white shadow-md"
                    : "text-foreground/70 hover:text-foreground"
                }`}
                style={
                  selected === key
                    ? { backgroundColor: "#FF8900" }
                    : {}
                }
              >
                {key === "more" ? "More" : key}
              </button>
            ))}
          </div>
        </div>

        {/* Product Display */}
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* Left: Image */}
          <div
            className={`transition-all duration-200 ease-out ${
              fade ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
            }`}
          >
            <div className="aspect-square rounded-2xl bg-card flex items-center justify-center">
              <span className="font-body text-muted-foreground text-sm uppercase tracking-widest">
                Product Image
              </span>
            </div>
          </div>

          {/* Right: Content */}
          <div
            className={`flex flex-col gap-5 transition-all duration-200 ease-out ${
              fade ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
            }`}
          >
            <div>
              <h2 className="font-navbar text-3xl md:text-4xl font-bold text-foreground leading-tight">
                {current.title}
              </h2>
              <p className="font-body text-muted-foreground text-base mt-1">
                {current.tagline}
              </p>
            </div>

            <p className="font-body text-foreground/80 text-sm leading-relaxed">
              {current.description}
            </p>

            {/* Price */}
            <p
              className="font-navbar text-3xl md:text-4xl font-bold"
              style={{ color: "#FF8900" }}
            >
              {current.price}
            </p>

            {/* Quantity + CTA */}
            {!current.isCustom ? (
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-2">
                {/* Quantity Selector */}
                <div className="flex items-center gap-3 border border-border rounded-full px-2 py-1">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-foreground/70 hover:text-foreground transition-colors"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="font-body font-semibold text-foreground w-6 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-foreground/70 hover:text-foreground transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>

                {/* CTA */}
                <a
                  href="https://wa.me/919999999999"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center font-body font-semibold text-white px-8 py-3 rounded-full transition-opacity hover:opacity-90"
                  style={{ backgroundColor: "#FF8900" }}
                >
                  Add to Cart
                </a>
              </div>
            ) : (
              <a
                href="https://wa.me/919999999999"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center font-body font-semibold text-white px-8 py-3 rounded-full transition-opacity hover:opacity-90 mt-2 self-start"
                style={{ backgroundColor: "#FF8900" }}
              >
                Enquire Now
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
