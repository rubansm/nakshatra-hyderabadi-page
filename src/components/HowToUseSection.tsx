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
      <div className="container mx-auto px-4 mb-10 md:mb-14">
        <div className="flex flex-row items-start justify-center gap-4 md:gap-0 max-w-4xl mx-auto relative pb-4">
          {/* Connecting line (desktop only) */}
          <div className="hidden md:block absolute top-16 left-[16.67%] right-[16.67%] h-[2px] bg-gradient-to-r from-transparent via-border to-transparent" />

          {steps.map((step, i) => (
            <div key={step.num} className="relative flex flex-col items-center text-center group min-w-[110px] flex-1">
              {/* Step circle */}
              <div
                className="w-20 h-20 md:w-32 md:h-32 rounded-full bg-card border-2 border-border flex items-center justify-center mb-3 md:mb-5 relative z-10 transition-transform duration-500 hover:scale-105"
                style={{ animationDelay: `${i * 200}ms` }}
              >
                <span className="text-2xl md:text-4xl">{step.visual}</span>
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
                <div className="absolute top-8 md:top-14 -right-2 md:-right-3 z-20 text-muted-foreground/30 text-lg md:text-2xl">
                  →
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Video Placeholder */}
      <div className="container mx-auto px-4 mb-20 md:mb-28">
        <div className="max-w-lg mx-auto">
          <div className="aspect-square rounded-2xl bg-muted/30 flex items-center justify-center overflow-hidden">
            <p className="font-body text-muted-foreground/40 text-sm">Video</p>
          </div>
        </div>
      </div>

      {/* Pairs with Everything */}
      <div className="container mx-auto px-4 text-center mb-16">
        <h2 className="font-navbar text-3xl md:text-5xl font-bold text-foreground leading-tight mb-10">
          Pairs with Everything
        </h2>
        <div className="max-w-lg mx-auto">
          <div className="aspect-square rounded-2xl bg-muted/30 flex items-center justify-center overflow-hidden">
            <p className="font-body text-muted-foreground/40 text-sm">Video</p>
          </div>
        </div>

        <p className="font-body text-muted-foreground text-base md:text-lg mt-14 max-w-md mx-auto leading-relaxed">
          One jar. Every meal. No sides needed.
        </p>
      </div>
    </section>
  );
};

export default HowToUseSection;
