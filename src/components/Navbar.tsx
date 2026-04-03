const Navbar = () => {
  return (
    <nav className="fixed top-6 left-4 right-4 z-50">
      <div
        className="max-w-md mx-auto rounded-full px-6 h-12 flex items-center justify-center gap-6"
        style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(133,53,55,0.12))",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.15)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
        }}
      >
        <a
          href="#origin"
          className="font-body text-[#FF8900]/80 text-[11px] tracking-[0.15em] uppercase hover:text-[#FF8900] transition-colors"
        >
          Story
        </a>

        <a
          href="/"
          className="font-navbar text-[#1a1a1a] text-lg tracking-[0.2em] uppercase font-bold hover:text-[#FF8900] transition-colors"
        >
          Nakshatra
        </a>

        <a
          href="#pricing"
          className="font-body text-[#FF8900]/80 text-[11px] tracking-[0.15em] uppercase hover:text-[#FF8900] transition-colors"
        >
          Pickle
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
