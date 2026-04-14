import { Shield, Leaf, Droplets, Truck } from "lucide-react";

const trustBadges = [
  { icon: Shield, label: "FSSAI Certified" },
  { icon: Leaf, label: "Zero Preservatives" },
  { icon: Droplets, label: "Pure Groundnut Oil" },
  { icon: Truck, label: "Ships in 1 Day" },
];

const TrustBadges = () => {
  return (
    <section className="relative bg-black py-10 px-6">
      <div className="relative z-10 max-w-sm md:max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-4 place-items-center">
        {trustBadges.map(({ icon: Icon, label }) => (
          <div
            key={label}
            className="flex items-center gap-2.5"
          >
            <Icon className="w-5 h-5 text-turmeric" strokeWidth={2.5} />
            <span className="font-body text-xs font-semibold tracking-widest uppercase text-white/90">
              {label}
            </span>
          </div>
        ))}
      </div>
      {/* Bottom fade — blends black into the cream section below */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-background pointer-events-none" />
    </section>
  );
};

export default TrustBadges;
