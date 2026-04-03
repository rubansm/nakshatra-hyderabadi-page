import { useState, useEffect, useCallback } from "react";

const FloatingCTA = () => {
  const [isMerged, setIsMerged] = useState(false);

  useEffect(() => {
    const productEl = document.getElementById("pricing");
    if (!productEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsMerged(entry.intersectionRatio >= 0.8);
      },
      { threshold: [0, 0.5, 0.8, 1] }
    );

    observer.observe(productEl);
    return () => observer.disconnect();
  }, []);

  // Hide product CTA when merged
  useEffect(() => {
    const productCTA = document.querySelector<HTMLElement>("[data-product-cta]");
    if (!productCTA) return;
    productCTA.style.opacity = isMerged ? "0" : "1";
    productCTA.style.transition = "opacity 200ms ease";
  }, [isMerged]);

  const handleClick = useCallback(() => {
    if (isMerged) {
      const productCTA = document.querySelector<HTMLAnchorElement>("[data-product-cta]");
      if (productCTA) productCTA.click();
    } else {
      const productEl = document.getElementById("pricing");
      if (productEl) productEl.scrollIntoView({ behavior: "smooth" });
    }
  }, [isMerged]);

  const getMergedStyle = (): React.CSSProperties | null => {
    if (!isMerged) return null;
    const productCTA = document.querySelector<HTMLElement>("[data-product-cta]");
    if (!productCTA) return null;
    const rect = productCTA.getBoundingClientRect();
    return {
      top: `${rect.top}px`,
      left: `${rect.left}px`,
      width: `${rect.width}px`,
      height: `${rect.height}px`,
      padding: 0,
    };
  };

  const mergedStyle = getMergedStyle();

  return (
    <button
      onClick={handleClick}
      className={`fixed z-50 font-body font-bold text-white rounded-full transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] flex items-center justify-center whitespace-nowrap ${
        isMerged
          ? "text-sm font-semibold shadow-none"
          : "px-14 py-4 text-base tracking-wide shadow-[0_4px_16px_rgba(255,137,0,0.4)] hover:scale-105 hover:shadow-[0_6px_24px_rgba(255,137,0,0.5)] bottom-[88px] left-1/2 -translate-x-1/2"
      }`}
      style={{
        backgroundColor: "#FF8900",
        willChange: "transform, top, left, width, height",
        ...(isMerged && mergedStyle ? { ...mergedStyle, transform: "none" } : {}),
      }}
    >
      {isMerged ? "Add to Cart" : "Order Your Pack"}
    </button>
  );
};

export default FloatingCTA;
