import { Plus, Minus, Trash2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import BackButton from "@/components/BackButton";
import { useCart } from "@/context/CartContext";

const Billing = () => {
  const { items, updateQuantity, removeFromCart, clearCart, totalPrice } = useCart();

  const whatsappMessage = items
    .map((i) => `${i.quantity}x ${i.name} (${i.price} each)`)
    .join("\n");

  const whatsappLink = `https://wa.me/919010291295?text=${encodeURIComponent(
    `Hi, Nakshatra Foods! I'd like to place an order:\n\n${whatsappMessage}\n\nTotal: ₹${totalPrice}`
  )}`;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <BackButton />
      <div className="container mx-auto px-4 pt-28 pb-16 max-w-2xl">
        <h1 className="font-navbar text-2xl md:text-3xl font-bold text-foreground text-center mb-2">
          Your Cart
        </h1>
        <p className="font-body text-muted-foreground text-center text-sm mb-8">
          Review your order before placing it via WhatsApp.
        </p>

        {items.length === 0 ? (
          <div className="text-center py-16">
            <p className="font-body text-muted-foreground text-lg">Your cart is empty</p>
            <p className="font-body text-muted-foreground text-sm mt-2">
              Browse our pickles and snacks to add items.
            </p>
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-3">
              {items.map((item) => (
                <div
                  key={item.name}
                  className="rounded-2xl border border-border bg-card p-4 flex items-center gap-4"
                >
                  <div className="flex-1">
                    <h3 className="font-navbar text-base font-bold text-foreground">
                      {item.name}
                    </h3>
                    <p className="font-navbar text-sm font-bold mt-1" style={{ color: "#FF8900" }}>
                      {item.price}
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 border border-border rounded-full px-2 py-1">
                    <button
                      onClick={() => updateQuantity(item.name, item.quantity - 1)}
                      className="w-6 h-6 rounded-full flex items-center justify-center text-foreground/70 hover:text-foreground"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="font-body font-semibold text-foreground w-5 text-center text-xs">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.name, item.quantity + 1)}
                      className="w-6 h-6 rounded-full flex items-center justify-center text-foreground/70 hover:text-foreground"
                    >
                      <Plus size={12} />
                    </button>
                  </div>

                  <p className="font-navbar text-base font-bold text-foreground w-16 text-right">
                    ₹{item.priceNum * item.quantity}
                  </p>

                  <button
                    onClick={() => removeFromCart(item.name)}
                    className="text-destructive/70 hover:text-destructive"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-border bg-card p-5">
              <div className="flex justify-between items-center mb-4">
                <span className="font-body text-foreground font-semibold">Total</span>
                <span className="font-navbar text-2xl font-bold" style={{ color: "#FF8900" }}>
                  ₹{totalPrice}
                </span>
              </div>

              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center font-body font-semibold text-white px-6 py-3 rounded-full text-sm hover:opacity-90 transition-opacity"
                style={{ backgroundColor: "#FF8900" }}
              >
                Place Order via WhatsApp
              </a>

              <button
                onClick={clearCart}
                className="w-full mt-3 font-body text-muted-foreground text-xs hover:text-foreground transition-colors py-2"
              >
                Clear Cart
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Billing;
