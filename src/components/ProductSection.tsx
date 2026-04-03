import { useState, useEffect, useRef } from "react";
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
  const sectionRef = useRef<HTMLElement>(null);
  const hasSnapped = useRef(false);

  const current = variants[selected];

  // Auto-scroll to center when section enters viewport
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasSnapped.current) {
          hasSnapped.current = true;
          el.scrollIntoView({ behavior: "smooth", block: "center" });
        }
        if (!entry.isIntersecting) {
          hasSnapped.current = false;
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

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
    <section ref={sectionRef} id="pricing" className="bg-background py-10 md:py-14">
      <div className="container mx-auto px-4 flex flex-col items-center">
        {/* Toggle */}
        <div
          className="inline-flex rounded-full p-1 gap-1 mb-5"
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
              className={`px-4 py-1.5 rounded-full text-xs font-body font-semibold uppercase tracking-wider transition-all duration-200 ${
                selected === key
                  ? "text-white shadow-md"
                  : "text-foreground/70 hover:text-foreground"
              }`}
              style={selected === key ? { backgroundColor: "#FF8900" } : {}}
            >
              {key === "more" ? "More" : key}
            </button>
          ))}
        </div>

        {/* Content - all center aligned */}
        <div
          className={`w-full max-w-lg flex flex-col items-center text-center transition-all duration-200 ease-out ${
            fade ? "opacity-0 translate-y-1" : "opacity-100 translate-y-0"
          }`}
        >
          {/* H1 + Tagline */}
          <h2 className="font-navbar text-2xl md:text-3xl font-bold text-foreground leading-tight">
            {current.title}
          </h2>
          <p className="font-body text-muted-foreground text-sm mt-1 mb-4">
            {current.tagline}
          </p>

          {/* Image - shorter aspect ratio */}
          <div className="w-full max-w-sm aspect-[4/3] rounded-2xl bg-card flex items-center justify-center mb-4">
            <span className="font-body text-muted-foreground text-xs uppercase tracking-widest">
              Product Image
            </span>
          </div>

          {/* Description */}
          <p className="font-body text-foreground/80 text-sm leading-relaxed max-w-xs mb-3">
            {current.description}
          </p>

          {/* Price */}
          <p
            className="font-navbar text-2xl md:text-3xl font-bold mb-3"
            style={{ color: "#FF8900" }}
          >
            {current.price}
          </p>

          {/* Quantity + CTA */}
          {!current.isCustom ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 border border-border rounded-full px-2 py-1">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-7 h-7 rounded-full flex items-center justify-center text-foreground/70 hover:text-foreground transition-colors"
                >
                  <Minus size={14} />
                </button>
                <span className="font-body font-semibold text-foreground w-5 text-center text-sm">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-7 h-7 rounded-full flex items-center justify-center text-foreground/70 hover:text-foreground transition-colors"
                >
                  <Plus size={14} />
                </button>
              </div>

              <a
                href="https://wa.me/919999999999"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center font-body font-semibold text-white px-6 py-2.5 rounded-full text-sm hover:opacity-90"
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
              className="inline-flex items-center justify-center font-body font-semibold text-white px-6 py-2.5 rounded-full text-sm transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#FF8900" }}
            >
              Enquire Now
            </a>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
