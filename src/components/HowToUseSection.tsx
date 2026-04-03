import { useState, useEffect } from "react";

const pairingFoods = [
  "Steamed Rice",
  "Biryani",
  "Jeera Rice",
  "Roti",
  "Dosa",
  "Paratha",
  "Idli",
  "Chapati",
];

const steps = [
  {
    num: "01",
    label: "Just Add It",
    visual: "🍚 + 🫙",
    desc: "Drop a spoon onto hot rice",
  },
  {
    num: "02",
    label: "Coat Every Grain",
    visual: "🥄🔥",
    desc: "Mix until the oil coats everything",
  },
  {
    num: "03",
    label: "That's a Meal",
    visual: "🍽️✨",
    desc: "No sides needed. Just satisfaction.",
  },
];

const HowToUseSection = () => {
  const [currentFood, setCurrentFood] = useState(0);
  const [fadeState, setFadeState] = useState<"in" | "out">("in");

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeState("out");
      setTimeout(() => {
        setCurrentFood((prev) => (prev + 1) % pairingFoods.length);
        setFadeState("in");
      }, 400);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-background py-20 md:py-32 overflow-hidden">
      {/* Hook */}
      <div className="container mx-auto px-4 text-center mb-16 md:mb-24">
        <h2 className="font-navbar text-4xl md:text-6xl font-bold text-foreground leading-tight mb-4">
          There's a Better Way<br />to Eat This
        </h2>
        <p className="font-body text-muted-foreground text-lg md:text-xl tracking-wide uppercase">
          Your daily staple, perfected
        </p>
      </div>

      {/* 3-Step Horizontal Flow */}
      <div className="container mx-auto px-4 mb-20 md:mb-28">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-0 max-w-4xl mx-auto relative">
          {/* Connecting line (desktop only) */}
          <div className="hidden md:block absolute top-16 left-[16.67%] right-[16.67%] h-[2px] bg-gradient-to-r from-transparent via-border to-transparent" />

          {steps.map((step, i) => (
            <div key={step.num} className="relative flex flex-col items-center text-center group">
              {/* Step circle */}
              <div
                className="w-32 h-32 rounded-full bg-card border-2 border-border flex items-center justify-center mb-5 relative z-10 transition-transform duration-500 hover:scale-105"
                style={{ animationDelay: `${i * 200}ms` }}
              >
                <span className="text-4xl">{step.visual}</span>
              </div>

              {/* Step number */}
              <span className="font-body text-xs tracking-[0.2em] text-muted-foreground/50 uppercase mb-2">
                Step {step.num}
              </span>

              {/* Step label */}
              <h3 className="font-navbar text-xl md:text-2xl font-bold text-foreground mb-2">
                {step.label}
              </h3>

              {/* Step description */}
              <p className="font-body text-muted-foreground text-sm max-w-[200px]">
                {step.desc}
              </p>

              {/* Arrow between steps (desktop) */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-14 -right-3 z-20 text-muted-foreground/30 text-2xl">
                  →
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* GIF / Video Placeholder */}
      <div className="container mx-auto px-4 mb-20 md:mb-28">
        <div className="max-w-lg mx-auto">
          <div className="aspect-square rounded-2xl bg-card border-2 border-dashed border-border flex items-center justify-center overflow-hidden">
            <div className="text-center p-8">
              <span className="text-6xl mb-4 block">🍛</span>
              <p className="font-body text-muted-foreground text-sm">
                Video placeholder — mixing the food
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic Pairing */}
      <div className="container mx-auto px-4 text-center">
        <h2 className="font-navbar text-3xl md:text-5xl font-bold text-foreground leading-tight mb-10">
          Pairs with Everything
        </h2>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
          {/* Fixed pickle element */}
          <div className="flex flex-col items-center">
            <div className="w-28 h-28 md:w-36 md:h-36 rounded-full bg-accent/10 border-2 border-accent/30 flex items-center justify-center">
              <span className="text-5xl md:text-6xl">🫙</span>
            </div>
            <span className="font-navbar text-sm md:text-base font-bold text-foreground mt-3">
              Chicken Pickle
            </span>
          </div>

          {/* Plus sign */}
          <span className="font-navbar text-3xl md:text-4xl text-muted-foreground/40 font-bold">
            +
          </span>

          {/* Rotating food */}
          <div className="flex flex-col items-center">
            <div className="w-28 h-28 md:w-36 md:h-36 rounded-full bg-card border-2 border-border flex items-center justify-center">
              <span className="text-5xl md:text-6xl">🍚</span>
            </div>
            <span
              className={`font-navbar text-sm md:text-base font-bold text-foreground mt-3 transition-all duration-400 ${
                fadeState === "in"
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-2"
              }`}
            >
              {pairingFoods[currentFood]}
            </span>
          </div>
        </div>

        {/* Subtle closing line */}
        <p className="font-body text-muted-foreground text-base md:text-lg mt-14 max-w-md mx-auto leading-relaxed">
          One jar. Every meal. No sides needed.
        </p>
      </div>
    </section>
  );
};

export default HowToUseSection;
