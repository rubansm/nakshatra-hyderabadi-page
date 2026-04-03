import { useState, useEffect, useRef, useCallback } from "react";

type CTAState = "hero" | "floating" | "merging" | "merged";

const FloatingCTA = () => {
  const [ctaState, setCtaState] = useState<CTAState>("hero");
  const [heroBounds, setHeroBounds] = useState<DOMRect | null>(null);
  const heroCtaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const heroEl = document.getElementById("hero");
    const productEl = document.getElementById("pricing");
    const heroCTAPlaceholder = document.getElementById("hero-cta-placeholder");

    if (!heroEl || !productEl) return;

    // Capture hero CTA position
    const updateHeroBounds = () => {
      if (heroCTAPlaceholder) {
        setHeroBounds(heroCTAPlaceholder.getBoundingClientRect());
      }
    };
    updateHeroBounds();

    const heroObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.3) {
          setCtaState("hero");
          updateHeroBounds();
        }
      },
      { threshold: 0.3 }
    );

    const floatingObserver = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          // Hero is off screen — float
          setCtaState((prev) => (prev === "merged" || prev === "merging") ? prev : "floating");
        }
      },
      { threshold: 0.1 }
    );

    const productObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio >= 0.8) {
          setCtaState("merged");
        } else if (entry.intersectionRatio >= 0.5) {
          setCtaState("merging");
        } else {
          setCtaState((prev) => {
            if (prev === "merged" || prev === "merging") {
              // Check if hero is visible
              const heroRect = heroEl.getBoundingClientRect();
              return heroRect.bottom > 100 ? "hero" : "floating";
            }
            return prev;
          });
        }
      },
      { threshold: [0, 0.5, 0.8, 1] }
    );

    heroObserver.observe(heroEl);
    floatingObserver.observe(heroEl);
    productObserver.observe(productEl);

    const handleScroll = () => {
      if (heroCTAPlaceholder) {
        const rect = heroCTAPlaceholder.getBoundingClientRect();
        // Only update when hero is in view
        if (rect.top > -200 && rect.top < window.innerHeight + 200) {
          setHeroBounds(rect);
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      heroObserver.disconnect();
      floatingObserver.disconnect();
      productObserver.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Hide product CTA when merged
  useEffect(() => {
    const productCTA = document.querySelector<HTMLElement>("[data-product-cta]");
    if (!productCTA) return;
    productCTA.style.opacity = ctaState === "merged" ? "0" : "1";
    productCTA.style.transition = "opacity 200ms ease";
  }, [ctaState]);

  const handleClick = useCallback(() => {
    if (ctaState === "merged") {
      const productCTA = document.querySelector<HTMLAnchorElement>("[data-product-cta]");
      if (productCTA) productCTA.click();
    } else {
      const productEl = document.getElementById("pricing");
      if (productEl) {
        productEl.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [ctaState]);

  const isMerged = ctaState === "merged";
  const label = isMerged ? "Add to Cart" : "Order Your Pack";

  // Compute styles based on state
  const getStyles = (): React.CSSProperties => {
    const base: React.CSSProperties = {
      backgroundColor: "#FF8900",
      willChange: "transform, opacity, top, left, width",
      transition: "all 300ms cubic-bezier(0.4, 0, 0.2, 1)",
      zIndex: 50,
    };

    switch (ctaState) {
      case "hero":
        return {
          ...base,
          position: "absolute",
        };

      case "floating":
        return {
          ...base,
          position: "fixed",
          bottom: "24px",
          left: "50%",
          transform: "translateX(-50%) scale(0.95)",
        };

      case "merging":
        return {
          ...base,
          position: "fixed",
          bottom: "24px",
          left: "50%",
          transform: "translateX(-50%) scale(0.88)",
        };

      case "merged": {
        // Position exactly over the product CTA
        const productCTA = document.querySelector<HTMLElement>("[data-product-cta]");
        if (productCTA) {
          const rect = productCTA.getBoundingClientRect();
          return {
            ...base,
            position: "fixed",
            top: `${rect.top}px`,
            left: `${rect.left}px`,
            width: `${rect.width}px`,
            height: `${rect.height}px`,
            transform: "scale(1)",
            padding: 0,
          };
        }
        return {
          ...base,
          position: "fixed",
          bottom: "24px",
          left: "50%",
          transform: "translateX(-50%) scale(0.85)",
        };
      }
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`font-body font-bold text-white rounded-full shadow-[0_4px_16px_rgba(255,137,0,0.4)] hover:shadow-[0_6px_24px_rgba(255,137,0,0.5)] flex items-center justify-center ${
        ctaState === "hero"
          ? "px-14 py-4 text-base tracking-wide"
          : isMerged
          ? "text-sm font-semibold"
          : "px-10 py-3.5 text-base tracking-wide"
      }`}
      style={getStyles()}
    >
      {label}
    </button>
  );
};

export default FloatingCTA;
