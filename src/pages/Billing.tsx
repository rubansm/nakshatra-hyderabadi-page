import { Plus, Minus, Trash2, Info, ChevronDown, ShoppingBag } from "lucide-react";
import Navbar from "@/components/Navbar";
import BackButton from "@/components/BackButton";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from "@/components/ui/drawer";

const Billing = () => {
  const { items, updateQuantity, removeFromCart, clearCart, totalPrice } = useCart();
  const [breakdownOpen, setBreakdownOpen] = useState(false);

  const tax = Math.round(totalPrice * 0.05);
  const deliveryOriginal = 50;
  const deliveryFinal = 0;
  const subtotal = totalPrice + tax + deliveryFinal;

  const whatsappMessage = items
    .map((i) => `${i.quantity}x ${i.name} (${i.price} each)`)
    .join("\n");

  const whatsappLink = `https://wa.me/919010291295?text=${encodeURIComponent(
    `Hi, Nakshatra Foods! I'd like to place an order:\n\n${whatsappMessage}\n\nSubtotal: ₹${subtotal}`
  )}`;

  return (
    <div className="min-h-screen bg-background pb-24">
      <Navbar />
      <BackButton />
      <div className="container mx-auto px-4 pt-24 max-w-2xl">
        <h1 className="font-navbar text-2xl md:text-3xl font-bold text-foreground text-left mb-6">
          Cart
        </h1>

        {items.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingBag className="mx-auto mb-4 text-muted-foreground" size={48} />
            <p className="font-body text-muted-foreground text-lg">Your cart is empty</p>
            <p className="font-body text-muted-foreground text-sm mt-2">
              Browse our pickles and snacks to add items.
            </p>
          </div>
        ) : (
          <>
            <p className="font-body text-muted-foreground text-sm mb-4">
              {items.reduce((s, i) => s + i.quantity, 0)} item{items.reduce((s, i) => s + i.quantity, 0) !== 1 ? "s" : ""}
            </p>

            <div className="flex flex-col divide-y divide-border">
              {items.map((item) => (
                <div key={item.name} className="py-4 flex gap-4">
                  {/* Left: Price & Name */}
                  <div className="flex-1 min-w-0">
                    <p className="font-navbar text-lg font-bold" style={{ color: "#FF8900" }}>
                      {item.price}
                    </p>
                    <h3 className="font-body text-sm text-foreground mt-1 truncate">
                      {item.name}
                    </h3>
                  </div>

                  {/* Right: Controls */}
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => removeFromCart(item.name)}
                      className="w-9 h-9 rounded-full border border-foreground/20 flex items-center justify-center text-foreground/60 hover:text-destructive hover:border-destructive transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                    <span className="font-body font-bold text-foreground w-6 text-center text-base">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.name, item.quantity + 1)}
                      className="w-9 h-9 rounded-full border border-foreground/20 flex items-center justify-center text-foreground/60 hover:text-foreground transition-colors"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Clear cart */}
            <button
              onClick={clearCart}
              className="mt-4 font-body text-sm text-muted-foreground border border-border rounded-full px-5 py-2 hover:text-foreground transition-colors"
            >
              Empty cart
            </button>
          </>
        )}
      </div>

      {/* Sticky bottom checkout bar */}
      {items.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border px-4 py-4 z-40">
          <div className="max-w-2xl mx-auto flex items-center justify-between">
            {/* Subtotal with info icon */}
            <div>
              <p className="font-body text-xs text-muted-foreground">Subtotal</p>
              <div className="flex items-center gap-1.5">
                <span className="font-navbar text-xl font-bold text-foreground">
                  ₹{subtotal}
                </span>
                <button
                  onClick={() => setBreakdownOpen(true)}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Info size={16} />
                </button>
              </div>
            </div>

            {/* Checkout button */}
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="font-body font-semibold text-white px-8 py-3 rounded-full text-sm hover:opacity-90 transition-opacity"
              style={{ backgroundColor: "#FF8900" }}
            >
              Check out
            </a>
          </div>
        </div>
      )}

      {/* Subtotal Breakdown Drawer */}
      <Drawer open={breakdownOpen} onOpenChange={setBreakdownOpen}>
        <DrawerContent className="max-h-[50vh]">
          <DrawerHeader className="text-left">
            <DrawerTitle className="font-navbar text-lg font-bold">Order Summary</DrawerTitle>
          </DrawerHeader>
          <div className="px-4 pb-6 space-y-4">
            {/* Items breakdown */}
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
                <span className="text-muted-foreground">Delivery Charges</span>
                <span className="text-foreground">
                  <span className="line-through text-muted-foreground mr-1">₹{deliveryOriginal}</span>
                  <span className="text-green-600 font-medium">FREE</span>
                </span>
              </div>
            </div>

            <div className="border-t border-border pt-3">
              <div className="flex justify-between font-navbar text-base font-bold">
                <span>Subtotal</span>
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
