import heroImg from "@/assets/hero-pickle.jpg";

const HeroSection = () => {
  return (
    <section className="relative bg-warm-brown min-h-[90vh] flex items-center">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="order-2 md:order-1 text-center md:text-left">
            <p className="font-body text-turmeric uppercase tracking-[0.25em] text-sm mb-4">
              Hyderabad's Finest · Delivered to Chennai
            </p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-cream leading-tight mb-6">
              Chicken Pickle
              <br />
              <span className="text-turmeric">Made with Soul</span>
            </h1>
            <p className="font-body text-cream/80 text-lg md:text-xl mb-8 max-w-lg mx-auto md:mx-0">
              A bold, slow-cooked Hyderabadi recipe passed down through generations.
              No preservatives. No shortcuts. Just real flavour.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <a
                href="#pricing"
                className="inline-block bg-turmeric text-warm-brown font-body font-semibold px-8 py-4 rounded-md text-lg hover:opacity-90 transition-opacity"
              >
                Order Now — ₹349
              </a>
              <a
                href="#story"
                className="inline-block border-2 border-cream/30 text-cream font-body font-medium px-8 py-4 rounded-md text-lg hover:border-cream/60 transition-colors"
              >
                Our Story
              </a>
            </div>
          </div>
          <div className="order-1 md:order-2 flex justify-center">
            <img
              src={heroImg}
              alt="Nakshatra Chicken Pickle in a traditional clay bowl with spices"
              width={1024}
              height={1024}
              className="w-72 h-72 md:w-96 md:h-96 lg:w-[28rem] lg:h-[28rem] object-cover rounded-full border-4 border-turmeric/30 shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
