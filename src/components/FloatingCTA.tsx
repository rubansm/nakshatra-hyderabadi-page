import { useState, useEffect, useRef, useCallback } from "react";

const FloatingCTA = () => {
  const [isHeroVisible, setIsHeroVisible] = useState(true);
  const [isProductVisible, setIsProductVisible] = useState(false);
  const [isProductFullyVisible, setIsProductFullyVisible] = useState(false);
  const [isMerged, setIsMerged] = useState(false);
  const [ctaText, setCtaText] = useState("Order Your Pack");
  const floatingRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const heroEl = document.getElementById("hero");
    const productEl = document.getElementById("pricing");

    if (!heroEl || !productEl) return;

    const heroObserver = new IntersectionObserver(
      ([entry]) => setIsHeroVisible(entry.isIntersecting),
      { threshold: 0.3 }
    );

    const productObserver = new IntersectionObserver(
      ([entry]) => setIsProductVisible(entry.intersectionRatio >= 0.7),
      { threshold: 0.7 }
    );

    const productFullObserver = new IntersectionObserver(
      ([entry]) => setIsProductFullyVisible(entry.intersectionRatio >= 0.9),
      { threshold: 0.9 }
    );

    heroObserver.observe(heroEl);
    productObserver.observe(productEl);
    productFullObserver.observe(productEl);

    return () => {
      heroObserver.disconnect();
      productObserver.disconnect();
      productFullObserver.disconnect();
    };
  }, []);

  // Merge logic
  useEffect(() => {
    if (isProductFullyVisible) {
      setIsMerged(true);
      setCtaText("Add to Cart");
    } else {
      setIsMerged(false);
      setCtaText("Order Your Pack");
    }
  }, [isProductFullyVisible]);

  const handleClick = useCallback(() => {
    if (isMerged) {
      // Trigger the product section's Add to Cart
      const productCTA = document.querySelector<HTMLAnchorElement>("[data-product-cta]");
      if (productCTA) productCTA.click();
    } else {
      const productEl = document.getElementById("pricing");
      if (productEl) {
        productEl.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [isMerged]);

  // Don't show when hero is visible (hero has its own CTA)
  const isVisible = !isHeroVisible;

  // When approaching product section, begin scale-down
  const scale = isMerged ? 0.85 : isProductVisible ? 0.9 : 1;

  return (
    <button
      ref={floatingRef}
      onClick={handleClick}
      className={`fixed z-50 font-body font-bold text-white rounded-full shadow-[0_4px_20px_rgba(255,137,0,0.4)] transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
        isVisible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-4 pointer-events-none"
      } ${
        isMerged
          ? "px-6 py-2.5 text-sm bottom-6 left-1/2 -translate-x-1/2 md:bottom-8"
          : "px-10 py-3.5 text-base bottom-6 left-1/2 -translate-x-1/2 md:bottom-8 md:right-8 md:left-auto md:translate-x-0"
      }`}
      style={{
        backgroundColor: "#FF8900",
        transform: `${isVisible ? "translateY(0)" : "translateY(1rem)"} ${
          !isMerged ? "translateX(-50%)" : "translateX(-50%)"
        } scale(${scale})`,
        willChange: "transform, opacity",
      }}
    >
      {ctaText}
    </button>
  );
};

export default FloatingCTA;
