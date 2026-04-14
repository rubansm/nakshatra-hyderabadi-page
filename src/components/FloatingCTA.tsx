import { useState, useEffect, useCallback } from "react";

const FloatingCTA = () => {
  const [pricingVisible, setPricingVisible] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);

  useEffect(() => {
    const productEl = document.getElementById("pricing");
    const footerEl = document.getElementById("final-cta");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target.id === "pricing") setPricingVisible(entry.isIntersecting);
          if (entry.target.id === "final-cta") setFooterVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.05 }
    );

    if (productEl) observer.observe(productEl);
    if (footerEl) observer.observe(footerEl);
    return () => observer.disconnect();
  }, []);

  const visible = !pricingVisible && !footerVisible;

  const handleClick = useCallback(() => {
    const productEl = document.getElementById("pricing");
    if (productEl) productEl.scrollIntoView({ behavior: "smooth", block: "center" });
  }, []);

  return (
    <button
      onClick={handleClick}
      className="fixed z-50 bottom-[88px] left-1/2 -translate-x-1/2 font-body font-bold text-white rounded-md px-14 py-4 text-base tracking-wide shadow-[0_4px_16px_rgba(255,137,0,0.4)] hover:scale-105 hover:shadow-[0_6px_24px_rgba(255,137,0,0.5)] flex items-center justify-center whitespace-nowrap transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)]"
      style={{
        backgroundColor: "#FF8900",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(-50%) scale(1)" : "translateX(-50%) scale(0.8)",
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      Order Your Pack
    </button>
  );
};

export default FloatingCTA;
