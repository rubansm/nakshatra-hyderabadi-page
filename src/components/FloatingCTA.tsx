import { useState, useEffect, useCallback, useRef } from "react";

const FloatingCTA = () => {
  const [state, setState] = useState<"floating" | "merging" | "merged">("floating");
  const hasSnapped = useRef(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const mergeTimeout = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    const productEl = document.getElementById("pricing");
    if (!productEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.intersectionRatio >= 0.3;

        // Snap-scroll once when product section enters
        if (visible && !hasSnapped.current) {
          hasSnapped.current = true;
          productEl.scrollIntoView({ behavior: "smooth", block: "center" });
        }
        if (!visible) {
          hasSnapped.current = false;
        }

        const shouldMerge = entry.intersectionRatio >= 0.6;

        if (shouldMerge && state === "floating") {
          // Start merging: get target position and animate there
          const productCTA = document.querySelector<HTMLElement>("[data-product-cta]");
          if (productCTA && buttonRef.current) {
            const targetRect = productCTA.getBoundingClientRect();
            const btn = buttonRef.current;
            
            // Set explicit position to animate TO
            btn.style.top = `${targetRect.top}px`;
            btn.style.left = `${targetRect.left}px`;
            btn.style.width = `${targetRect.width}px`;
            btn.style.height = `${targetRect.height}px`;
            btn.style.padding = "0";
            btn.style.bottom = "auto";
            btn.style.transform = "none";
            btn.style.fontSize = "14px";
            btn.style.fontWeight = "600";
            btn.style.boxShadow = "none";
          }
          setState("merging");
          
          // After transition completes, switch to fully merged (hide floating, show product CTA)
          clearTimeout(mergeTimeout.current);
          mergeTimeout.current = setTimeout(() => {
            setState("merged");
          }, 500);
        } else if (!shouldMerge && state !== "floating") {
          clearTimeout(mergeTimeout.current);
          setState("floating");
          
          // Reset inline styles
          if (buttonRef.current) {
            const btn = buttonRef.current;
            btn.style.top = "auto";
            btn.style.left = "50%";
            btn.style.width = "";
            btn.style.height = "";
            btn.style.padding = "";
            btn.style.bottom = "88px";
            btn.style.transform = "translateX(-50%)";
            btn.style.fontSize = "";
            btn.style.fontWeight = "";
            btn.style.boxShadow = "";
          }
        }
      },
      { threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1] }
    );

    observer.observe(productEl);
    return () => {
      observer.disconnect();
      clearTimeout(mergeTimeout.current);
    };
  }, [state]);

  // When fully merged, hide floating and show product CTA
  // When not merged, show floating and hide product CTA
  useEffect(() => {
    const productCTA = document.querySelector<HTMLElement>("[data-product-cta]");
    if (!productCTA) return;
    
    if (state === "merged") {
      productCTA.style.opacity = "1";
      productCTA.style.transition = "opacity 100ms ease";
    } else if (state === "merging") {
      productCTA.style.opacity = "0";
      productCTA.style.transition = "opacity 100ms ease";
    } else {
      productCTA.style.opacity = "1";
      productCTA.style.transition = "opacity 150ms ease";
    }
  }, [state]);

  const handleClick = useCallback(() => {
    if (state === "merged") {
      const productCTA = document.querySelector<HTMLAnchorElement>("[data-product-cta]");
      if (productCTA) productCTA.click();
    } else {
      const productEl = document.getElementById("pricing");
      if (productEl) productEl.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [state]);

  // When fully merged, hide the floating button entirely
  if (state === "merged") {
    return null;
  }

  return (
    <button
      ref={buttonRef}
      onClick={handleClick}
      className="fixed z-50 font-body font-bold text-white rounded-full flex items-center justify-center whitespace-nowrap px-14 py-4 text-base tracking-wide shadow-[0_4px_16px_rgba(255,137,0,0.4)] hover:scale-105 hover:shadow-[0_6px_24px_rgba(255,137,0,0.5)] transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
      style={{
        backgroundColor: "#FF8900",
        willChange: "transform, top, left, width, height, padding",
        bottom: "88px",
        left: "50%",
        transform: "translateX(-50%)",
        top: "auto",
      }}
    >
      {state === "merging" ? "Add to Cart" : "Order Your Pack"}
    </button>
  );
};

export default FloatingCTA;
