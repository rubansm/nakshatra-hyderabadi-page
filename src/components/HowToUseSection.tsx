const steps = [
  {
    num: "01",
    label: "Add a Spoonful",
    video: "https://pub-f43385626ccb4562b4a9240e54322e61.r2.dev/GIF%201.mp4",
    desc: "onto piping hot rice",
  },
  {
    num: "02",
    label: "Mix it in",
    video: "https://pub-f43385626ccb4562b4a9240e54322e61.r2.dev/GIF%202.mp4",
    desc: "Until every grain drips with flavor",
  },
  {
    num: "03",
    label: "Eat in Peace",
    video: "https://pub-f43385626ccb4562b4a9240e54322e61.r2.dev/GIF%203.mp4",
    desc: "A complete meal in seconds",
  },
];

const HowToUseSection = () => {
  return (
    <section className="bg-background pt-10 pb-4 md:pt-16 md:pb-6 overflow-hidden">
      {/* Hook */}
      <div className="container mx-auto px-4 text-center mb-10 md:mb-14">
        <h2 className="font-body text-3xl md:text-6xl font-bold text-foreground leading-tight mb-4">
          A Comforting Meal in<br />3 Simple Steps
        </h2>
      </div>

      {/* 3-Step Horizontal Flow */}
      <div className="container mx-auto px-4 mb-10 md:mb-14">
        <div className="flex flex-row items-start justify-center gap-4 md:gap-0 max-w-4xl mx-auto relative pb-4">
          <div className="hidden md:block absolute top-16 left-[16.67%] right-[16.67%] h-[2px] bg-gradient-to-r from-transparent via-border to-transparent" />

          {steps.map((step, i) => (
            <div key={step.num} className="relative flex flex-col items-center text-center group min-w-[110px] flex-1">
              <div
                className="w-20 h-20 md:w-32 md:h-32 rounded-full border-2 border-border overflow-hidden mb-3 md:mb-5 relative z-10 transition-transform duration-500 hover:scale-105"
                style={{ animationDelay: `${i * 200}ms` }}
              >
                <video src={step.video} autoPlay loop muted playsInline className="w-full h-full object-cover" />
              </div>

              <span className="font-body text-xs tracking-[0.2em] text-muted-foreground/50 uppercase mb-2">
                Step {step.num}
              </span>

              <h3 className="font-body text-xl md:text-2xl font-bold text-foreground mb-2">{step.label}</h3>

              <p className="font-body text-muted-foreground text-sm max-w-[200px]">{step.desc}</p>

              {i < steps.length - 1 && (
                <div className="absolute top-8 md:top-14 -right-2 md:-right-3 z-20 text-muted-foreground/30 text-lg md:text-2xl">
                  →
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Goes with Everything */}
      <div className="container mx-auto px-4 text-center mb-0">
        <h2 className="font-body text-3xl md:text-5xl font-bold text-foreground leading-tight mb-6">
          Goes with Everything
        </h2>
        <div className="max-w-lg mx-auto">
          <div className="aspect-square rounded-lg overflow-hidden">
            <video
              src="https://pub-f43385626ccb4562b4a9240e54322e61.r2.dev/Pairs%20with%20everything.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <p className="font-body text-muted-foreground text-base md:text-lg mt-6 max-w-md mx-auto leading-relaxed">
          Like a best friend, always there when you need
        </p>
      </div>
    </section>
  );
};

export default HowToUseSection;
