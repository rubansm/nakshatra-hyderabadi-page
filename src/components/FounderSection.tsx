import founderImg from "@/assets/founder.png";

const FounderSection = () => {
  return (
    <section className="bg-cream py-10 md:py-14">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-10 md:mb-14">
          <p className="font-body text-turmeric uppercase tracking-[0.2em] text-sm mb-3">
            The Man Behind the Pack
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground leading-tight">
            Meet the Founder
          </h2>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
          {/* Founder Image with frame and overlay */}
          <div className="w-72 md:w-80 flex-shrink-0">
            <div className="relative rounded-lg overflow-hidden border-4 border-turmeric shadow-xl">
              <img
                src={founderImg}
                alt="Vitor Indrapalli — Founder of Nakshatra Foods"
                className="w-full h-auto block"
              />
              {/* Gradient overlay with handwritten founder signature */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent pt-16 pb-5 px-4 text-center">
                <p className="font-script text-white text-4xl md:text-5xl font-semibold leading-none">
                  Vitor Indrapalli
                </p>
                <p className="font-body text-white/70 text-xs uppercase tracking-[0.2em] mt-2">
                  Founder
                </p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="text-center md:text-left">
            <div className="space-y-5 font-body text-muted-foreground text-lg leading-relaxed">
              <p>
                What started as a mother's love packed into pouches for her son
                became a mission to bring authentic Hyderabadi flavours to every
                home far from home. Our founder grew up watching his mother
                slow-cook chicken pickle in their Charminar kitchen, learning
                that the best food is made with patience, memory, and the
                finest ingredients — never shortcuts.
              </p>
              <p>
                Today, he carries that same uncompromising spirit into every
                batch of Nakshatra pickle. From sourcing cold-pressed sesame oil
                to hand-selecting spices from trusted local vendors, he
                personally oversees every step — because when you're preserving
                a family legacy, nothing less than perfection will do. That hair
                net and those gloves aren't just protocol; they're a promise.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FounderSection;
