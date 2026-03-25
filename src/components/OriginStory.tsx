import { AspectRatio } from "@/components/ui/aspect-ratio";

const OriginStory = () => {
  return (
    <section id="story" className="bg-cream py-16 md:py-24">
      <div className="container mx-auto px-4 max-w-[680px] text-center">
        <p className="font-body text-turmeric uppercase tracking-[0.2em] text-sm mb-3">
          Where It All Begins
        </p>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-8 leading-tight">
          A Recipe Born from a Mother Who Refused to Let Him Go Hungry
        </h2>

        <div className="mb-10 rounded-lg overflow-hidden bg-muted">
          <AspectRatio ratio={4 / 1}>
            <div className="w-full h-full bg-warm-brown/10 flex items-center justify-center">
              <span className="text-muted-foreground text-sm font-body">Image Placeholder</span>
            </div>
          </AspectRatio>
        </div>

        <div className="space-y-5 font-body text-muted-foreground text-lg leading-relaxed mb-10">
          <p>
            In the narrow lanes of the Charminar area, the grandma perfected her
            chicken pickle by instinct, by memory, and by hand. Slow-cooking
            until the oil turned a deep amber, then letting it mature in jars
            under the long afternoon sun.
          </p>
          <p>
            She refused to let her son board the train to Delhi for work until
            she packed enough chicken pickle to last him the next six months,
            until the day he'd return.
          </p>
        </div>

        <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6 leading-tight">
          The story of that chicken pickle flew to Chennai.
        </h3>

        <div className="space-y-5 font-body text-muted-foreground text-lg leading-relaxed mb-10">
          <p>
            The grandson grew up with this ritual woven into his routine, until
            he carried that same recipe to Chennai, far from family, far from
            home. Because thousands here are living the same story: away from
            everything familiar, craving something they can't quite name but
            deeply miss.
          </p>
          <p>
            And that's how a Hyderabadi family{" "}
            <span className="text-foreground font-semibold italic">
              the Nakshatras
            </span>{" "}
            began spreading their finest flavours across Chennai.
          </p>
        </div>

        <p className="font-body text-foreground text-lg font-bold italic leading-relaxed">
          The Mother still makes every batch.
          <br />
          In the same kitchen. In Hyderabad.
        </p>
      </div>
    </section>
  );
};

export default OriginStory;
