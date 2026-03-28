import { Shield, Leaf, Droplets, Truck } from "lucide-react";

const trustBadges = [
  { icon: Shield, label: "FSSAI Certified" },
  { icon: Leaf, label: "Zero Preservatives" },
  { icon: Droplets, label: "Pure Groundnut Oil" },
  { icon: Truck, label: "Ships in 1 Day" },
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
          <p className="text-white text-lg md:text-xl font-medium my-[24px] text-left max-w-[420px] drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]">
            Finest Flavours from
            <br />
            a Hyderabadi Family Recipe
          </p>
          <h1
            className="font-display font-bold text-[#FF8900] text-6xl leading-[1.05]"
            style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}
          >
            Nanama's
            <br />
            Chicken Pickle
          </h1>
        </div>

        {/* Bottom-left: Tagline + CTA + Badges */}
        <div className="max-w-xl mx-auto text-center flex flex-col items-center gap-6">
          <p className="font-body text-white text-lg md:text-xl max-w-xl mx-auto text-center drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]">
            Hyderabadi chicken pickle, made without preservatives by the
            Nakshatra family. Now in Chennai.
          </p>

          <a
            href="https://wa.me/919999999999?text=I%20want%20to%20order%20Nakshatra%20Chicken%20Pickle"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#FF8900] text-white font-body font-bold px-14 py-4 rounded-full text-base tracking-wide shadow-[0_4px_16px_rgba(255,137,0,0.4)] hover:scale-105 hover:shadow-[0_6px_24px_rgba(255,137,0,0.5)] transition-all duration-300"
          >
            Order Your Pack
          </a>

          <div className="flex flex-wrap justify-center gap-x-5 gap-y-2">
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
