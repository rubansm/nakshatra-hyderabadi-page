import founderImg from "@/assets/founder.png";

const FounderSection = () => {
  return (
    <section className="bg-cream py-16 md:py-24">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
          {/* Founder Image */}
          <div className="w-64 md:w-80 flex-shrink-0">
            <img
              src={founderImg}
              alt="Founder of Nakshatra Foods"
              className="w-full h-auto rounded-2xl"
            />
          </div>

          {/* Content */}
          <div className="text-center md:text-left">
            <p className="font-body text-turmeric uppercase tracking-[0.2em] text-sm mb-3">
              The Man Behind the Jar
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6 leading-tight">
              Meet the Founder
            </h2>

            <div className="space-y-5 font-body text-muted-foreground text-lg leading-relaxed">
              <p>
                What started as a mother's love packed into jars for her son
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
