import { useState, useEffect, useRef } from "react";
import { Menu, X, ShoppingCart } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useCart } from "@/context/CartContext";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { totalItems } = useCart();

  useEffect(() => {
    if (!menuOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [menuOpen]);

  const menuItems = [
    { label: "Our Story", path: "/#story" },
    { label: "Pickles", path: "/pickles" },
    { label: "Snacks", path: "/snacks" },
    { label: "Abroad Orders", path: "/orders" },
    { label: "Contact Us", path: "/contact" },
  ];

  const handleNavClick = (path: string) => {
    setMenuOpen(false);
    if (path === "/#story") {
      if (location.pathname === "/") {
        document.getElementById("story")?.scrollIntoView({ behavior: "smooth" });
      } else {
        navigate("/");
        setTimeout(() => {
          document.getElementById("story")?.scrollIntoView({ behavior: "smooth" });
        }, 300);
      }
    } else {
      navigate(path);
      window.scrollTo(0, 0);
    }
  };

  return (
    <nav ref={navRef} className="fixed top-6 left-4 right-4 z-50">
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
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-black/70 hover:text-black transition-colors"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>

        <button onClick={() => { navigate("/"); window.scrollTo(0, 0); }} className="font-navbar text-black text-lg tracking-[0.2em] uppercase font-bold hover:text-black/80 transition-colors">
          Nakshatra
        </button>

        <button
          onClick={() => { navigate("/billing"); window.scrollTo(0, 0); }}
          className="relative text-black/70 hover:text-black transition-colors"
          aria-label="Cart"
        >
          <ShoppingCart size={18} />
          {totalItems > 0 && (
            <span
              className="absolute -top-2 -right-2 w-4 h-4 rounded-full flex items-center justify-center text-white text-[9px] font-bold"
              style={{ backgroundColor: "#FF8900" }}
            >
              {totalItems > 99 ? "99+" : totalItems}
            </span>
          )}
        </button>
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
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={() => handleNavClick(item.path)}
              className="font-body text-black/80 text-xs tracking-[0.15em] uppercase hover:text-black transition-colors py-1 text-left"
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
