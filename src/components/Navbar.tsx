const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-warm-brown/20 border-b border-cream/10">
      <div className="container mx-auto px-4 h-14 flex items-center justify-center gap-8">
        <a
          href="#origin"
          className="font-body text-cream/80 text-sm tracking-widest uppercase hover:text-cream transition-colors"
        >
          Our Story
        </a>

        <span className="font-navbar text-cream text-xl md:text-2xl tracking-[0.3em] uppercase">
          Nakshatra
        </span>

        <a
          href="#pricing"
          className="font-body text-cream/80 text-sm tracking-widest uppercase hover:text-cream transition-colors"
        >
          Pickle
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
