import { Shield, Leaf, Droplets, Truck } from "lucide-react";

const heroBadges = [
  { icon: Shield, label: "FSSAI Certified" },
  { icon: Leaf, label: "Zero Preservatives" },
  { icon: Droplets, label: "Pure Groundnut Oil" },
  { icon: Truck, label: "Ships in 1 Day" },
];

const HeroSection = () => {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col">
      {/* Video Background */}
      <div className="absolute inset-0">
        {/* Mobile Video */}
        <video
          src="/hero-bg-mobile.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover md:hidden"
        />
        {/* Desktop Video */}
        <video
          src="/hero-bg-desktop.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover hidden md:block"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-warm-brown/30 via-transparent to-warm-brown/40" />
        <div className="absolute bottom-0 left-0 right-0 h-40 md:h-56 bg-gradient-to-b from-transparent to-black pointer-events-none" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col justify-end pb-6 px-6 md:px-12">
        <div className="h-[56px]" />
        <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2.5 max-w-xs mx-auto md:grid-cols-4 md:max-w-2xl">
          {heroBadges.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2">
              <Icon className="w-4 h-4 text-turmeric flex-shrink-0" strokeWidth={2.5} />
              <span className="font-body text-[10px] font-semibold tracking-wider uppercase text-white/90 leading-tight">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
