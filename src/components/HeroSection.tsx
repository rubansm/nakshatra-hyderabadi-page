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
        <div className="absolute inset-0 bg-warm-brown/10" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col justify-between pt-20 pb-10 px-6 md:px-12">
        {/* Top-left: Pre-header + H1 */}
        <div className="max-w-lg">
          <p className="font-body text-turmeric uppercase tracking-[0.25em] text-xs mb-3">
            Finest Flavours from a Hyderabadi Family Recipe
          </p>
          <h1 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-cream leading-tight">
            Nanama's Chicken Pickle
          </h1>
        </div>

        {/* Bottom-center: Tagline + CTA + Badges */}
        <div className="text-center">
          <p className="font-body text-cream/70 text-xs md:text-sm mb-4 max-w-md mx-auto">
            Hyderabadi chicken pickle, made without preservatives by the
            Nakshatra family. Now in Chennai.
          </p>

          <a
            href="https://wa.me/919999999999?text=I%20want%20to%20order%20Nakshatra%20Chicken%20Pickle"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-turmeric text-warm-brown font-body font-bold px-10 py-4 rounded-md text-lg hover:opacity-90 transition-opacity mb-6"
          >
            Order Your Pack
          </a>

          <div className="flex flex-wrap justify-center gap-x-6 gap-y-3">
            {trustBadges.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 text-cream/60"
              >
                <Icon className="w-3.5 h-3.5 text-turmeric" />
                <span className="font-body text-xs tracking-wide">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
