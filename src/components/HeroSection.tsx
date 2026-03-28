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
        {/* Subtle gradient overlay — heavier at top/bottom for text, transparent in center for video */}
        <div className="absolute inset-0 bg-gradient-to-b from-warm-brown/40 via-transparent to-warm-brown/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col justify-between pt-24 pb-10 px-6 md:px-12">
        {/* Top-left: Pre-header + H1 */}
        <div className="max-w-lg">
          <p className="font-body text-turmeric uppercase tracking-[0.25em] text-xs mb-3 drop-shadow-md">
            Finest Flavours from a Hyderabadi Family Recipe
          </p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-7xl font-bold text-cream leading-[1.1] drop-shadow-lg">
            Nanama's
            <br />
            Chicken Pickle
          </h1>
        </div>

        {/* Bottom-center: Tagline + CTA + Badges */}
        <div className="text-center">
          <p className="font-body text-cream/90 text-xs md:text-sm mb-5 max-w-sm mx-auto drop-shadow-md leading-relaxed">
            Hyderabadi chicken pickle, made without preservatives by the
            Nakshatra family. Now in Chennai.
          </p>

          <a
            href="https://wa.me/919999999999?text=I%20want%20to%20order%20Nakshatra%20Chicken%20Pickle"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-turmeric text-warm-brown font-body font-bold px-12 py-4 rounded-full text-base tracking-wide hover:scale-105 hover:shadow-xl hover:shadow-turmeric/30 transition-all duration-300 mb-6"
          >
            Order Your Pack
          </a>

          <div className="flex flex-wrap justify-center gap-x-5 gap-y-2">
            {trustBadges.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-1.5 text-cream/70"
              >
                <Icon className="w-3 h-3 text-turmeric" />
                <span className="font-body text-[10px] tracking-wider uppercase">
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
