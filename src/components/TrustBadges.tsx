import { Shield, Leaf, Droplets, Truck } from "lucide-react";

const trustBadges = [
  { icon: Shield, label: "FSSAI Certified" },
  { icon: Leaf, label: "Zero Preservatives" },
  { icon: Droplets, label: "Pure Groundnut Oil" },
  { icon: Truck, label: "Ships in 1 Day" },
];

const TrustBadges = () => {
  return (
    <section className="bg-warm-brown py-5 px-6">
      <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-x-8 gap-y-4">
        {trustBadges.map(({ icon: Icon, label }) => (
          <div
            key={label}
            className="flex items-center gap-2.5"
          >
            <Icon className="w-5 h-5 text-turmeric" strokeWidth={2.5} />
            <span className="font-body text-xs md:text-sm font-semibold tracking-widest uppercase text-background/90">
              {label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrustBadges;
