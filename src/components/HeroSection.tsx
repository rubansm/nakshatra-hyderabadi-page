const HeroSection = () => {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col">
      {/* Video Background */}
      <div className="absolute inset-0">
        {/* Mobile Video */}
        <video
          src="/hero-bg-mobile.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover md:hidden"
        />
        {/* Desktop Video */}
        <video
          src="/hero-bg-desktop.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover hidden md:block"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-warm-brown/30 via-transparent to-warm-brown/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col justify-end pb-10 px-6 md:px-12">
        <div className="h-[56px]" />
      </div>
    </section>
  );
};

export default HeroSection;
