const Navbar = () => {
  return (
    <nav className="fixed top-4 left-4 right-4 z-50">
      <div className="max-w-md mx-auto backdrop-blur-xl bg-cream/15 border border-cream/20 rounded-full px-6 h-12 flex items-center justify-center gap-6 shadow-lg shadow-warm-brown/20">
        <a
          href="#origin"
          className="font-body text-cream/60 text-[11px] tracking-[0.2em] uppercase hover:text-cream/90 transition-colors"
        >
          Our Story
        </a>

        <span className="font-navbar text-cream text-lg tracking-[0.3em] uppercase font-bold">
          Nakshatra
        </span>

        <a
          href="#pricing"
          className="font-body text-cream/60 text-[11px] tracking-[0.2em] uppercase hover:text-cream/90 transition-colors"
        >
          Pickle
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
