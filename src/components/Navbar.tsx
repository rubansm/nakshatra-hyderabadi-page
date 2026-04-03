import { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-6 left-4 right-4 z-50">
      <div
        className="max-w-lg mx-auto rounded-full px-6 h-12 flex items-center justify-between"
        style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(133,53,55,0.12))",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.15)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
        }}
      >
        <a href="#story" className="font-body text-black/70 text-[10px] tracking-[0.15em] uppercase hover:text-black transition-colors">
          Story
        </a>

        <a href="/" className="font-navbar text-black text-lg tracking-[0.2em] uppercase font-bold hover:text-black/80 transition-colors">
          Nakshatra
        </a>

        <div className="flex items-center gap-3">
          <a href="#pickle" className="font-body text-black/70 text-[10px] tracking-[0.15em] uppercase hover:text-black transition-colors">
            Pickle
          </a>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-black/70 hover:text-black transition-colors"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div
          className="max-w-lg mx-auto mt-2 rounded-2xl px-6 py-4 flex flex-col gap-3"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.12), rgba(133,53,55,0.15))",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            border: "1px solid rgba(255,255,255,0.15)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
          }}
        >
          {[
            { label: "About Us", href: "#about" },
            { label: "Pickles", href: "#pickle" },
            { label: "Snacks", href: "#snacks" },
            { label: "Abroad Orders", href: "#orders" },
            { label: "Contact Us", href: "#contact" },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="font-body text-black/80 text-xs tracking-[0.15em] uppercase hover:text-black transition-colors py-1"
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
