import { Shield, Leaf, Droplets, Truck, FlameKindling } from "lucide-react";

const trustBadges = [
  { icon: Shield, label: "FSSAI Certified" },
  { icon: Leaf, label: "Zero Preservatives" },
  { icon: Droplets, label: "Pure Oil" },
  { icon: Truck, label: "Ships in 2–3 Days" },
  { icon: FlameKindling, label: "Small Batch Made" },
];

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex flex-col">
      {/* Video Background */}
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-warm-brown/30 via-transparent to-warm-brown/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col justify-between pt-24 pb-10 px-6 md:px-12">
        {/* Top-left: Pre-header + H1 */}
        <div className="max-w-[420px]">
          <p className="text-turmeric uppercase tracking-[0.15em] text-xs md:text-sm font-body mb-3 drop-shadow-md">
            Finest Flavours from a Hyderabadi Family Recipe
          </p>
          <h1
            className="font-display font-bold text-white leading-[1.05] drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]"
            style={{ fontSize: "clamp(2.25rem, 5vw + 1rem, 5.25rem)" }}
          >
            Nanama's
            <br />
            Chicken Pickle
          </h1>
        </div>

        {/* Bottom-left: Tagline + CTA + Badges */}
        <div className="max-w-[320px] mx-auto text-center">
          <p className="font-body text-[#E5E7EB]/80 text-xs md:text-sm mb-4 leading-relaxed drop-shadow-md">
            Hyderabadi chicken pickle, made without preservatives by the
            Nakshatra family. Now in Chennai.
          </p>

          <a
            href="https://wa.me/919999999999?text=I%20want%20to%20order%20Nakshatra%20Chicken%20Pickle"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#D97706] text-white font-body font-bold px-14 py-4 rounded-full text-base tracking-wide shadow-[0_6px_20px_rgba(217,119,6,0.5)] hover:scale-105 hover:shadow-[0_8px_28px_rgba(217,119,6,0.6)] transition-all duration-300 mb-5"
          >
            Order Your Pack
          </a>

          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {trustBadges.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-1.5"
              >
                <Icon className="w-3 h-3 text-turmeric" />
                <span className="font-body text-[10px] tracking-wider uppercase text-[#F3F4F6]/85">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
