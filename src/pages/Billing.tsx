import { Plus, Minus, Trash2, Info, ShoppingBag, ShieldCheck, Truck, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import BackButton from "@/components/BackButton";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import pickleImg from "@/assets/hero-pickle.jpg";

const Billing = () => {
  const navigate = useNavigate();
  const { items, updateQuantity, removeFromCart, clearCart, totalPrice } = useCart();
  const [breakdownOpen, setBreakdownOpen] = useState(false);

  const tax = Math.round(totalPrice * 0.05);
  const deliveryOriginal = 50;
  const deliveryFinal = 0;
  const subtotal = totalPrice + tax + deliveryFinal;
  const totalItemsCount = items.reduce((s, i) => s + i.quantity, 0);

  return (
    <div className="min-h-screen bg-[#FAF7F2] pb-28">
      <Navbar />
      <BackButton />
      <div className="container mx-auto px-4 pt-28 max-w-2xl">
        <h1 className="font-body text-2xl md:text-3xl font-bold text-foreground mb-1">
          Your Cart
        </h1>
        {items.length > 0 && (
          <p className="font-body text-sm text-muted-foreground mb-6">
            {totalItemsCount} item{totalItemsCount !== 1 ? "s" : ""} ready for delivery
          </p>
        )}

        {items.length === 0 ? (
          /* ── Empty Cart ── */
          <div className="text-center py-12 md:py-16">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-white flex items-center justify-center shadow-sm border border-border/40">
              <ShoppingBag className="text-muted-foreground" size={40} strokeWidth={1.5} />
            </div>
            <h2 className="font-body text-xl md:text-2xl font-bold text-foreground mb-2">
              Your cart is empty
            </h2>
            <p className="font-body text-muted-foreground text-sm max-w-xs mx-auto mb-8">
              Explore our authentic Hyderabadi pickles and crunchy snacks, handmade with love.
            </p>
            <div className="flex flex-col gap-3 max-w-xs mx-auto">
              <button
                onClick={() => navigate("/pickles")}
                className="w-full py-3.5 rounded-lg font-body font-semibold text-white text-sm shadow-sm transition-transform active:scale-[0.98]"
                style={{ backgroundColor: "#FF8900" }}
              >
                Browse Pickles
              </button>
              <button
                onClick={() => navigate("/snacks")}
                className="w-full py-3.5 rounded-lg font-body font-semibold text-foreground text-sm bg-white border border-border/60 hover:border-foreground/40 transition-colors"
              >
                Browse Snacks
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* ── Cart Items ── */}
            <div className="space-y-3">
              {items.map((item) => {
                const lineTotal = item.priceNum * item.quantity;
                return (
                  <div
                    key={item.name}
                    className="bg-white rounded-xl border border-border/50 p-4 flex gap-4 shadow-sm"
                  >
                    {/* LEFT: Image */}
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-lg overflow-hidden shrink-0 bg-muted/40">
                      <img
                        src={item.image || pickleImg}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* MIDDLE: Name, category, remove */}
                    <div className="flex-1 min-w-0 flex flex-col">
                      <h3 className="font-body text-[15px] font-semibold text-foreground leading-snug">
                        {item.name}
                      </h3>
                      <p className="font-body text-xs text-muted-foreground mt-0.5">
                        Nakshatra Pickles
                      </p>
                      <button
                        onClick={() => removeFromCart(item.name)}
                        className="mt-auto self-start flex items-center gap-1 text-xs text-muted-foreground hover:text-destructive transition-colors pt-2"
                      >
                        <Trash2 size={12} />
                        Remove
                      </button>
                    </div>

                    {/* RIGHT: Price + Quantity dialer */}
                    <div className="flex flex-col items-end justify-between shrink-0">
                      <p className="font-body font-bold text-foreground text-base">
                        ₹{lineTotal}
                      </p>
                      <div className="flex items-center bg-[#FAF7F2] rounded-lg border border-border/60 overflow-hidden">
                        <button
                          onClick={() => updateQuantity(item.name, item.quantity - 1)}
                          className="w-7 h-7 flex items-center justify-center text-foreground/70 active:bg-border/40 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={13} />
                        </button>
                        <span className="font-body font-semibold text-sm w-7 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.name, item.quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center text-foreground/70 active:bg-border/40 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus size={13} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ── Utility actions ── */}
            <div className="flex items-center justify-between mt-5 mb-6">
              <button
                onClick={() => navigate("/pickles")}
                className="font-body text-sm font-medium text-foreground underline underline-offset-2 decoration-border hover:decoration-foreground transition-colors"
                style={{ color: "#FF8900" }}
              >
                + Add more items
              </button>
              <button
                onClick={clearCart}
                className="font-body text-sm text-muted-foreground hover:text-destructive transition-colors"
              >
                Clear cart
              </button>
            </div>

            {/* ── Trust badges ── */}
            <div className="bg-white rounded-xl border border-border/50 p-4 mb-4">
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="flex flex-col items-center gap-1.5">
                  <Lock size={18} className="text-green-600" />
                  <p className="font-body text-[11px] text-muted-foreground leading-tight">
                    100% Secure<br />Payment
                  </p>
                </div>
                <div className="flex flex-col items-center gap-1.5">
                  <Truck size={18} className="text-green-600" />
                  <p className="font-body text-[11px] text-muted-foreground leading-tight">
                    Free<br />Delivery
                  </p>
                </div>
                <div className="flex flex-col items-center gap-1.5">
                  <ShieldCheck size={18} className="text-green-600" />
                  <p className="font-body text-[11px] text-muted-foreground leading-tight">
                    FSSAI<br />Certified
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* ── Sticky bottom checkout bar ── */}
      {items.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border/60 px-4 py-3 z-40 shadow-[0_-4px_12px_rgba(0,0,0,0.04)]">
          <div className="max-w-2xl mx-auto flex items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-1.5">
                <p className="font-body text-[11px] text-muted-foreground uppercase tracking-wide">
                  Total
                </p>
                <button
                  onClick={() => setBreakdownOpen(true)}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="View price breakdown"
                >
                  <Info size={12} />
                </button>
              </div>
              <p className="font-body text-xl font-bold text-foreground leading-tight">
                ₹{subtotal}
              </p>
            </div>

            <button
              onClick={() => navigate("/checkout")}
              className="flex-1 max-w-[240px] font-body font-semibold text-white py-3.5 rounded-lg text-sm shadow-sm transition-transform active:scale-[0.98]"
              style={{ backgroundColor: "#FF8900" }}
            >
              Proceed to Checkout →
            </button>
          </div>
        </div>
      )}

      {/* ── Subtotal Breakdown Drawer ── */}
      <Drawer open={breakdownOpen} onOpenChange={setBreakdownOpen}>
        <DrawerContent className="max-h-[60vh]">
          <DrawerHeader className="text-left">
            <DrawerTitle className="font-body text-lg font-bold">Order Summary</DrawerTitle>
          </DrawerHeader>
          <div className="px-4 pb-6 space-y-4">
            <div className="space-y-2">
              {items.map((item) => (
                <div key={item.name} className="flex justify-between font-body text-sm">
                  <span className="text-foreground">
                    {item.name} × {item.quantity}
                  </span>
                  <span className="text-foreground font-medium">
                    ₹{item.priceNum * item.quantity}
                  </span>
                </div>
              ))}
            </div>
            <div className="border-t border-border pt-3 space-y-2">
              <div className="flex justify-between font-body text-sm">
                <span className="text-muted-foreground">Items Total</span>
                <span className="text-foreground">₹{totalPrice}</span>
              </div>
              <div className="flex justify-between font-body text-sm">
                <span className="text-muted-foreground">Tax (5%)</span>
                <span className="text-foreground">₹{tax}</span>
              </div>
              <div className="flex justify-between font-body text-sm">
                <span className="text-muted-foreground">Delivery</span>
                <span className="text-foreground">
                  <span className="line-through text-muted-foreground mr-1">₹{deliveryOriginal}</span>
                  <span className="text-green-600 font-medium">FREE</span>
                </span>
              </div>
            </div>
            <div className="border-t border-border pt-3">
              <div className="flex justify-between font-body text-base font-bold">
                <span>Total</span>
                <span style={{ color: "#FF8900" }}>₹{subtotal}</span>
              </div>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default Billing;
