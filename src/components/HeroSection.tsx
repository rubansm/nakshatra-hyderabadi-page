import { Shield, Leaf, Droplets, Truck, FlameKindling } from "lucide-react";
import nakshatraLogo from "@/assets/nakshatra-logo.png";

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
      {/* Announcement Bar */}
      <div className="relative z-20 bg-turmeric text-warm-brown text-center py-2.5 px-4">
        <p className="font-body text-sm md:text-base font-semibold tracking-wide">
          First order in Chennai? Free delivery. Use code:{" "}
          <span className="font-bold uppercase tracking-widest">FIRSTJAR</span>
        </p>
      </div>

      {/* Video Background */}
      <div className="relative flex-1 flex items-center justify-center">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-warm-brown/70" />

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 py-20 md:py-32 text-center max-w-3xl">
          <p className="font-body text-turmeric uppercase tracking-[0.25em] text-sm mb-5">
            Finest Flavours from a Hyderabadi Family Recipe
          </p>

          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-cream leading-tight mb-6">
            Nanama's Chicken Pickle
            <br />
            <span className="text-turmeric">Made with Soul, Tastes Like Home.</span>
          </h1>

          <p className="font-body text-cream/80 text-lg md:text-xl mb-10 max-w-xl mx-auto">
            Hyderabadi chicken pickle, made without preservatives by the
            Nakshatra family. Now in Chennai.
          </p>

          <a
            href="https://wa.me/919999999999?text=I%20want%20to%20order%20Nakshatra%20Chicken%20Pickle"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-turmeric text-warm-brown font-body font-bold px-10 py-4 rounded-md text-lg hover:opacity-90 transition-opacity"
          >
            Order Your Pack
          </a>

          {/* Trust Badges */}
          <div className="mt-12 flex flex-wrap justify-center gap-x-6 gap-y-4">
            {trustBadges.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 text-cream/70"
              >
                <Icon className="w-4 h-4 text-turmeric" />
                <span className="font-body text-xs md:text-sm tracking-wide">
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
