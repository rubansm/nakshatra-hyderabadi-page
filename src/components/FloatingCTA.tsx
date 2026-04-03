import { useState, useEffect, useCallback, useRef } from "react";

const FloatingCTA = () => {
  const [isMerged, setIsMerged] = useState(false);
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);
  const hasSnapped = useRef(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const productEl = document.getElementById("pricing");
    if (!productEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const entering = entry.intersectionRatio >= 0.3;
        
        // Snap-scroll when product section first enters bottom of screen
        if (entering && !hasSnapped.current) {
          hasSnapped.current = true;
          productEl.scrollIntoView({ behavior: "smooth", block: "center" });
        }
        
        if (!entering) {
          hasSnapped.current = false;
        }

        // Merge when section is well visible
        const shouldMerge = entry.intersectionRatio >= 0.6;
        setIsMerged(shouldMerge);

        if (shouldMerge) {
          const productCTA = document.querySelector<HTMLElement>("[data-product-cta]");
          if (productCTA) {
            setTargetRect(productCTA.getBoundingClientRect());
          }
        }
      },
      { threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1] }
    );

    observer.observe(productEl);
    return () => observer.disconnect();
  }, []);

  // Continuously update target rect position when merged
  useEffect(() => {
    if (!isMerged) return;
    
    let raf: number;
    const update = () => {
      const productCTA = document.querySelector<HTMLElement>("[data-product-cta]");
      if (productCTA) {
        setTargetRect(productCTA.getBoundingClientRect());
      }
      raf = requestAnimationFrame(update);
    };
    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, [isMerged]);

  // Hide product CTA when merged
  useEffect(() => {
    const productCTA = document.querySelector<HTMLElement>("[data-product-cta]");
    if (!productCTA) return;
    productCTA.style.opacity = isMerged ? "0" : "1";
    productCTA.style.transition = "opacity 150ms ease";
  }, [isMerged]);

  const handleClick = useCallback(() => {
    if (isMerged) {
      const productCTA = document.querySelector<HTMLAnchorElement>("[data-product-cta]");
      if (productCTA) productCTA.click();
    } else {
      const productEl = document.getElementById("pricing");
      if (productEl) productEl.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [isMerged]);

  // Use a consistent positioning approach: always use top/left with transform
  const getStyle = (): React.CSSProperties => {
    if (isMerged && targetRect) {
      return {
        backgroundColor: "#FF8900",
        willChange: "transform, top, left, width, height, padding",
        top: `${targetRect.top}px`,
        left: `${targetRect.left}px`,
        width: `${targetRect.width}px`,
        height: `${targetRect.height}px`,
        padding: 0,
        transform: "none",
        bottom: "auto",
      };
    }
    
    // Default floating position - use top calculated from viewport
    return {
      backgroundColor: "#FF8900",
      willChange: "transform, top, left, width, height, padding",
      bottom: "88px",
      left: "50%",
      transform: "translateX(-50%)",
      top: "auto",
    };
  };

  return (
    <button
      ref={buttonRef}
      onClick={handleClick}
      className={`fixed z-50 font-body font-bold text-white rounded-full flex items-center justify-center whitespace-nowrap ${
        isMerged
          ? "text-sm font-semibold shadow-none transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
          : "px-14 py-4 text-base tracking-wide shadow-[0_4px_16px_rgba(255,137,0,0.4)] hover:scale-105 hover:shadow-[0_6px_24px_rgba(255,137,0,0.5)] transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
      }`}
      style={getStyle()}
    >
      {isMerged ? "Add to Cart" : "Order Your Pack"}
    </button>
  );
};

export default FloatingCTA;
