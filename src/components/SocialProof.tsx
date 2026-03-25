import { Star } from "lucide-react";

const reviews = [
  {
    name: "Priya R.",
    location: "Anna Nagar, Chennai",
    text: "Best chicken pickle I've ever had. My husband is from Hyderabad and he says it tastes like his mom's. That's the highest compliment.",
    stars: 5,
  },
  {
    name: "Karthik S.",
    location: "Velachery, Chennai",
    text: "I ordered once to try. Now I order every month. My rice consumption has gone up 200% and I'm not even sorry.",
    stars: 5,
  },
  {
    name: "Meena J.",
    location: "T. Nagar, Chennai",
    text: "Finally, a pickle that's actually spicy. Not 'Chennai spicy' — real Hyderabadi heat. And the chicken pieces are generous.",
    stars: 5,
  },
];

const SocialProof = () => {
  return (
    <section className="bg-background py-16 md:py-24">
      <div className="container mx-auto px-4">
        <p className="font-body text-turmeric uppercase tracking-[0.2em] text-sm mb-3 text-center">
          What People Say
        </p>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-10 text-center">
          Trusted by 500+ Families in Chennai
        </h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {reviews.map((review, i) => (
            <div
              key={i}
              className="bg-card rounded-xl p-6 border border-border"
            >
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: review.stars }).map((_, j) => (
                  <Star
                    key={j}
                    className="w-4 h-4 fill-turmeric text-turmeric"
                  />
                ))}
              </div>
              <p className="font-body text-muted-foreground mb-4 leading-relaxed">
                "{review.text}"
              </p>
              <div>
                <p className="font-body font-semibold text-foreground text-sm">
                  {review.name}
                </p>
                <p className="font-body text-muted-foreground text-xs">
                  {review.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
