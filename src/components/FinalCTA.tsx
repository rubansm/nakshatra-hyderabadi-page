const FinalCTA = () => {
  return (
    <section id="final-cta" className="bg-warm-brown py-16 md:py-24">
      <div className="container mx-auto px-4 text-center max-w-2xl">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-cream mb-4">
          Ready to Taste Hyderabad
          <br />
          <span className="text-turmeric">in Chennai?</span>
        </h2>
        <p className="font-body text-cream/70 text-lg mb-8 max-w-md mx-auto">
          Order today and get your pack delivered tomorrow. No minimum order.
          Free delivery across Chennai.
        </p>
        <a
          href="https://wa.me/919010291295?text=Hi%2C%20Nakshatra%20foods%2C%20May%20I%20have%20your%20time%20%21%21%21"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-turmeric text-warm-brown font-body font-bold px-10 py-4 rounded-md text-lg hover:opacity-90 transition-opacity"
        >
          Contact us on WhatsApp
        </a>
        <p className="font-body text-cream/40 text-sm mt-6">
          © {new Date().getFullYear()} Nakshatra Pickle. Made with ❤️ in Chennai.
        </p>
      </div>
    </section>
  );
};

export default FinalCTA;
