import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "How long does the pickle last?",
    a: "Stored in the fridge, our chicken pickle stays fresh for up to 3 months. The gingelly oil acts as a natural preservative. Just use a dry spoon every time.",
  },
  {
    q: "Is it really that spicy?",
    a: "It has authentic Hyderabadi heat — bold but balanced. If you eat Andhra food regularly, you'll love it. We also offer a medium-spice variant on request.",
  },
  {
    q: "Do you deliver outside Chennai?",
    a: "Currently, we deliver across Chennai only. We're working on expanding to Bangalore and Hyderabad soon. Follow us on Instagram for updates.",
  },
  {
    q: "What oil do you use?",
    a: "We use cold-pressed gingelly (sesame) oil — the traditional choice for South Indian pickles. No palm oil, no refined oil, no blends.",
  },
  {
    q: "Is the chicken halal?",
    a: "Yes, 100%. We source only halal-certified, fresh (never frozen) chicken from trusted local suppliers.",
  },
  {
    q: "How do I place an order?",
    a: "Just message us on WhatsApp with your address and preferred jar size. We'll confirm and deliver within 24 hours (for orders before 6 PM).",
  },
];

const FAQSection = () => {
  return (
    <section className="bg-card py-16 md:py-24">
      <div className="container mx-auto px-4 max-w-2xl">
        <p className="font-body text-turmeric uppercase tracking-[0.2em] text-sm mb-3 text-center">
          Questions?
        </p>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-10 text-center">
          Frequently Asked
        </h2>
        <Accordion type="single" collapsible className="space-y-2">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="bg-background rounded-lg border border-border px-5"
            >
              <AccordionTrigger className="font-body font-semibold text-foreground text-left py-4 hover:no-underline">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="font-body text-muted-foreground pb-4 leading-relaxed">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;
