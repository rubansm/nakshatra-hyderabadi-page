import { Shield, Leaf, Droplets, Truck } from "lucide-react";

const trustBadges = [
  { icon: Shield, label: "FSSAI Certified" },
  { icon: Leaf, label: "Zero Preservatives" },
  { icon: Droplets, label: "Pure Groundnut Oil" },
  { icon: Truck, label: "Ships in 1 Day" },
];

const TrustBadges = () => {
  return (
    <section className="bg-[hsl(40,30%,96%)] py-5 px-6 border-b border-muted-foreground/20">
      <div className="max-w-sm md:max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-4 place-items-center">
        {trustBadges.map(({ icon: Icon, label }) => (
          <div
            key={label}
            className="flex items-center gap-2.5"
          >
            <Icon className="w-5 h-5 text-turmeric" strokeWidth={2.5} />
            <span className="font-body text-xs font-semibold tracking-widest uppercase text-foreground">
              {label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrustBadges;
