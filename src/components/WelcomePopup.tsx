import { useState, useEffect } from "react";
import { X, Copy, Check } from "lucide-react";

const POPUP_SHOWN_KEY = "nakshatra_welcome_popup_shown";
const COUPON_CODE = "WELCOME10";

const WelcomePopup = () => {
  const [visible, setVisible] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const alreadyShown = sessionStorage.getItem(POPUP_SHOWN_KEY);
    if (alreadyShown) return;

    const timer = setTimeout(() => {
      setVisible(true);
      sessionStorage.setItem(POPUP_SHOWN_KEY, "1");
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(COUPON_CODE);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
      const ta = document.createElement("textarea");
      ta.value = COUPON_CODE;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleClose = () => setVisible(false);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center px-4"
      onClick={handleClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Popup card */}
      <div
        className="relative bg-white rounded-lg shadow-2xl max-w-sm w-full p-8 text-center animate-in fade-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        {/* Content */}
        <p className="font-body text-turmeric uppercase tracking-[0.2em] text-xs mb-3">
          Wait! Before you go...
        </p>

        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
          Get 10% Off
        </h2>

        <p className="font-body text-muted-foreground text-sm mb-6 leading-relaxed">
          Use this code on your first order and taste authentic Hyderabadi chicken pickle.
        </p>

        {/* Coupon code display */}
        <div className="bg-[#F5F0EB] rounded-lg py-4 px-6 mb-5">
          <span className="font-body font-bold text-foreground text-xl tracking-[0.3em]">
            {COUPON_CODE}
          </span>
        </div>

        {/* Copy button */}
        <button
          onClick={handleCopy}
          className="w-full font-body font-semibold text-white py-3.5 rounded-md text-sm uppercase tracking-[0.15em] transition-all duration-200 flex items-center justify-center gap-2"
          style={{ backgroundColor: copied ? "#16A34A" : "#3D2B1F" }}
        >
          {copied ? (
            <>
              <Check size={16} />
              Copied!
            </>
          ) : (
            <>
              <Copy size={16} />
              Copy Code
            </>
          )}
        </button>

        {/* Dismiss link */}
        <button
          onClick={handleClose}
          className="mt-4 font-body text-xs text-muted-foreground hover:text-foreground transition-colors underline"
        >
          No thanks, I'll pay full price
        </button>
      </div>
    </div>
  );
};

export default WelcomePopup;
