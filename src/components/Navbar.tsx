const Navbar = () => {
  return (
    <nav className="fixed top-6 left-4 right-4 z-50">
      <div
        className="max-w-lg mx-auto rounded-full px-6 h-12 flex items-center justify-center gap-5"
        style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(133,53,55,0.12))",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.15)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
        }}
      >
        <a href="#pickle" className="font-body text-black/70 text-[10px] tracking-[0.15em] uppercase hover:text-black transition-colors">
          Pickle
        </a>
        <a href="#snacks" className="font-body text-black/70 text-[10px] tracking-[0.15em] uppercase hover:text-black transition-colors">
          Snacks
        </a>

        <a href="/" className="font-navbar text-black text-lg tracking-[0.2em] uppercase font-bold hover:text-black/80 transition-colors">
          Nakshatra
        </a>

        <a href="#orders" className="font-body text-black/70 text-[10px] tracking-[0.15em] uppercase hover:text-black transition-colors">
          Orders
        </a>
        <a href="#contact" className="font-body text-black/70 text-[10px] tracking-[0.15em] uppercase hover:text-black transition-colors">
          Contact
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
