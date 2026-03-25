const OriginStory = () => {
  return (
    <section id="story" className="bg-background py-16 md:py-24">
      <div className="container mx-auto px-4 max-w-3xl text-center">
        <p className="font-body text-turmeric uppercase tracking-[0.2em] text-sm mb-3">
          Where It All Began
        </p>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-8">
          A Recipe Born in Hyderabad's Old City
        </h2>
        <div className="space-y-5 font-body text-muted-foreground text-lg leading-relaxed">
          <p>
            In the narrow lanes of Hyderabad's Charminar area, our grandmother
            perfected her chicken pickle over decades — adjusting spices by
            instinct, slow-cooking until the oil turned a deep amber, and
            letting it mature in ceramic jars under the afternoon sun.
          </p>
          <p>
            When we moved to Chennai, we carried that jar with us. Friends
            tasted it. Then their friends. Then strangers who became friends.
            Everyone asked the same thing:{" "}
            <span className="text-foreground font-semibold italic">
              "Where can I buy this?"
            </span>
          </p>
          <p>
            That's how <span className="text-turmeric font-semibold">Nakshatra Pickle</span> was born — not
            in a factory, but in a kitchen. And that's exactly where we still
            make it today.
          </p>
        </div>
      </div>
    </section>
  );
};

export default OriginStory;
