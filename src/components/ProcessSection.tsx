import processImg from "@/assets/process-pickle.jpg";

const steps = [
  {
    num: "01",
    title: "Source Fresh Chicken",
    desc: "Halal-certified, fresh (never frozen) chicken from trusted local suppliers.",
  },
  {
    num: "02",
    title: "Hand-Grind Spices",
    desc: "Whole spices — red chilli, fenugreek, mustard — ground on stone for depth of flavour.",
  },
  {
    num: "03",
    title: "Slow Cook in Gingelly Oil",
    desc: "Cooked low and slow until the oil separates and each piece absorbs the masala.",
  },
  {
    num: "04",
    title: "Mature & Pack",
    desc: "Rested for 48 hours, then packed in airtight glass jars for peak freshness.",
  },
];

const ProcessSection = () => {
  return (
    <section className="bg-card py-16 md:py-24">
      <div className="container mx-auto px-4">
        <p className="font-body text-turmeric uppercase tracking-[0.2em] text-sm mb-3 text-center">
          How We Make It
        </p>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
          From Kitchen to Your Doorstep
        </h2>
        <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto items-center">
          <img
            src={processImg}
            alt="Traditional pickle making process"
            loading="lazy"
            width={1024}
            height={768}
            className="rounded-xl w-full object-cover aspect-[4/3]"
          />
          <div className="space-y-6">
            {steps.map((step) => (
              <div key={step.num} className="flex gap-4">
                <span className="font-display text-2xl font-bold text-turmeric/40 shrink-0">
                  {step.num}
                </span>
                <div>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-1">
                    {step.title}
                  </h3>
                  <p className="font-body text-muted-foreground text-sm leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
