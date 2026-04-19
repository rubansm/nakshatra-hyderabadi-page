import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import BackButton from "@/components/BackButton";
import { useCart } from "@/context/CartContext";
import { Input } from "@/components/ui/input";
import {
  ChevronRight, CreditCard, Smartphone, Banknote,
  Info, Tag, Check, X, Minus, Plus, ShoppingBag, ShieldCheck,
} from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import pickleImg from "@/assets/hero-pickle.jpg";

const VALID_COUPONS: Record<string, { discount: number; label: string }> = {
  WELCOME10: { discount: 0.10, label: "10% off" },
};

const steps = ["Contact", "Address", "Payment"];

const Checkout = () => {
  const navigate = useNavigate();
  const { items, totalPrice, updateQuantity } = useCart();
  const [step, setStep] = useState(0);
  const [breakdownOpen, setBreakdownOpen] = useState(false);

  const [deliveryInstructions, setDeliveryInstructions] = useState("");
  const [contact, setContact] = useState({ name: "", whatsapp: "" });
  const [address, setAddress] = useState({
    door: "", building: "", street: "", area: "", city: "", pincode: "",
  });
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponError, setCouponError] = useState("");

  const couponData = appliedCoupon ? VALID_COUPONS[appliedCoupon] : null;
  const discountAmount = couponData ? Math.round(totalPrice * couponData.discount) : 0;
  const tax = Math.round((totalPrice - discountAmount) * 0.05);
  const subtotal = totalPrice - discountAmount + tax;

  const handleApplyCoupon = () => {
    const code = couponInput.trim().toUpperCase();
    if (!code) { setCouponError("Please enter a coupon code"); return; }
    if (VALID_COUPONS[code]) {
      setAppliedCoupon(code);
      setCouponError("");
    } else {
      setCouponError("Invalid coupon code");
      setAppliedCoupon(null);
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponInput("");
    setCouponError("");
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <BackButton />
        <div className="container mx-auto px-4 pt-24 text-center">
          <p className="font-body text-muted-foreground text-lg">Your cart is empty.</p>
        </div>
      </div>
    );
  }

  const validateContact = () => {
    const e: Record<string, string> = {};
    if (!contact.name.trim()) e.name = "Name is required";
    if (!contact.whatsapp.trim()) e.whatsapp = "WhatsApp number is required";
    else if (!/^\d{10}$/.test(contact.whatsapp.trim())) e.whatsapp = "Enter a valid 10-digit number";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateAddress = () => {
    const e: Record<string, string> = {};
    if (!address.door.trim()) e.door = "Required";
    if (!address.street.trim()) e.street = "Required";
    if (!address.area.trim()) e.area = "Required";
    if (!address.city.trim()) e.city = "Required";
    if (!address.pincode.trim()) e.pincode = "Required";
    else if (!/^\d{6}$/.test(address.pincode.trim())) e.pincode = "Enter a valid 6-digit pincode";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => {
    if (step === 0 && !validateContact()) return;
    if (step === 1 && !validateAddress()) return;
    setErrors({});
    setStep((s) => Math.min(s + 1, 2));
  };

  const buildOrderDetails = (paymentId?: string) => {
    const orderSummary = items
      .map((i) => `${i.quantity}x ${i.name} (${i.price} each)`)
      .join("\n");
    const discountLine = appliedCoupon
      ? `\nCoupon: ${appliedCoupon} (${couponData?.label}) — Save ₹${discountAmount}`
      : "";
    const instructionsLine = deliveryInstructions.trim()
      ? `\nDelivery Instructions: ${deliveryInstructions.trim()}`
      : "";
    const addrLine = `${address.door}, ${address.building ? address.building + ", " : ""}${address.street}, ${address.area}, ${address.city} - ${address.pincode}`;

    if (paymentId) {
      return `Hi Nakshatra Foods! 🎉 Payment successful!\n\nPayment ID: ${paymentId}\n\nName: ${contact.name}\nWhatsApp: +91${contact.whatsapp}\nAddress: ${addrLine}${instructionsLine}\n\n${orderSummary}${discountLine}\n\nTotal Paid: ₹${subtotal}\n\nPlease confirm and process my order. Thank you!`;
    }
    return `Hi Nakshatra Foods! I'd like to place a Cash on Delivery order.\n\nName: ${contact.name}\nWhatsApp: +91${contact.whatsapp}\nAddress: ${addrLine}${instructionsLine}\n\n${orderSummary}${discountLine}\n\nSubtotal: ₹${subtotal}\nPayment: Cash on Delivery\n\nPlease confirm this order. Thank you!`;
  };

  const handlePayment = () => {
    if (!paymentMethod) {
      setErrors({ payment: "Please select a payment method" });
      return;
    }

    if (paymentMethod === "cod") {
      window.open(
        `https://wa.me/919010291295?text=${encodeURIComponent(buildOrderDetails())}`,
        "_blank",
        "noopener,noreferrer"
      );
      return;
    }

    // Razorpay for Card / UPI
    const options = {
      key: "rzp_live_SeaaRIyS9RZUFW",
      amount: subtotal * 100, // paise
      currency: "INR",
      name: "Nakshatra Foods",
      description: "Hyderabadi Chicken Pickle",
      image: "https://pub-f43385626ccb4562b4a9240e54322e61.r2.dev/Nakshatra%20Logo.png",
      handler: (response: { razorpay_payment_id: string }) => {
        window.open(
          `https://wa.me/919010291295?text=${encodeURIComponent(buildOrderDetails(response.razorpay_payment_id))}`,
          "_blank",
          "noopener,noreferrer"
        );
      },
      prefill: {
        name: contact.name,
        contact: `91${contact.whatsapp}`,
      },
      theme: { color: "#FF8900" },
      modal: {
        ondismiss: () => {
          setErrors({ payment: "Payment was cancelled. Please try again." });
        },
      },
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const rzp = new (window as any).Razorpay(options);
    rzp.open();
  };

  const isChennai = address.city.trim().toLowerCase() === "chennai";

  return (
    <div className="min-h-screen bg-background pb-28">
      <Navbar />
      <BackButton />
      <div className="container mx-auto px-4 pt-32 max-w-2xl">

        {/* ── YOUR ORDER ── */}
        <h2 className="font-body text-xl font-bold text-foreground text-center mb-4 tracking-wide uppercase">
          Your Order
        </h2>
        <div className="border-t border-dashed border-border mb-4" />

        <div className="space-y-4 mb-6">
          {items.map((item) => (
            <div key={item.name} className="flex items-center gap-3">
              {/* Thumbnail */}
              <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0 border border-border">
                <img
                  src={item.image || pickleImg}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Name + Price */}
              <div className="flex-1 min-w-0">
                <p className="font-body font-semibold text-sm text-foreground leading-tight truncate">
                  {item.name}
                </p>
                <p className="font-body font-bold text-base mt-0.5" style={{ color: "#FF8900" }}>
                  {item.price}
                </p>
              </div>

              {/* Quantity counter */}
              <div className="flex items-center gap-2 border border-border rounded-md px-3 py-1.5 flex-shrink-0">
                <button
                  onClick={() => updateQuantity(item.name, item.quantity - 1)}
                  className="w-5 h-5 flex items-center justify-center text-foreground/60 hover:text-foreground transition-colors"
                >
                  <Minus size={13} />
                </button>
                <span className="font-body font-semibold text-sm w-5 text-center">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.name, item.quantity + 1)}
                  className="w-5 h-5 flex items-center justify-center text-foreground/60 hover:text-foreground transition-colors"
                >
                  <Plus size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* ── Delivery Instructions ── */}
        <div className="mb-4">
          <textarea
            placeholder="Order / Delivery Instructions (optional)"
            value={deliveryInstructions}
            onChange={(e) => setDeliveryInstructions(e.target.value.slice(0, 200))}
            className="w-full border border-border rounded-xl p-3 font-body text-sm resize-none h-24 bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <p className="text-right font-body text-xs text-muted-foreground mt-0.5">
            {deliveryInstructions.length} / 200
          </p>
        </div>

        {/* ── Add more items ── */}
        <button
          onClick={() => navigate(-1)}
          className="w-full flex items-center justify-center gap-2 font-body text-sm font-semibold text-muted-foreground border border-border rounded-md py-2.5 mb-8 hover:bg-accent transition-colors"
        >
          <ShoppingBag size={15} />
          Add more items
        </button>

        <div className="border-t border-border mb-6" />

        {/* ── Price breakdown bar ── */}
        <button
          onClick={() => setBreakdownOpen(true)}
          className="w-full flex items-center justify-between rounded-lg px-4 py-3 mb-6"
          style={{ backgroundColor: "#E6F9F0" }}
        >
          <div className="flex items-center gap-2 font-body text-sm font-medium text-foreground">
            <Info size={16} />
            <span>Price breakdown</span>
          </div>
          <span className="font-body font-bold text-foreground">₹{subtotal}</span>
        </button>

        {/* ── Coupon ── */}
        <div className="mb-6">
          {appliedCoupon ? (
            <div className="flex items-center justify-between rounded-lg border-2 border-green-500 bg-green-50 px-4 py-3">
              <div className="flex items-center gap-2">
                <Check size={16} className="text-green-600" />
                <span className="font-body text-sm font-medium text-green-700">
                  <span className="font-bold">{appliedCoupon}</span> applied — {couponData?.label} (−₹{discountAmount})
                </span>
              </div>
              <button onClick={handleRemoveCoupon} className="text-muted-foreground hover:text-destructive transition-colors">
                <X size={16} />
              </button>
            </div>
          ) : (
            <div>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Enter coupon code"
                    value={couponInput}
                    onChange={(e) => { setCouponInput(e.target.value.toUpperCase()); setCouponError(""); }}
                    onKeyDown={(e) => e.key === "Enter" && handleApplyCoupon()}
                    className="pl-9 uppercase tracking-wider font-body text-sm"
                  />
                </div>
                <button
                  onClick={handleApplyCoupon}
                  className="font-body font-semibold text-white px-5 py-2 rounded-md text-sm hover:opacity-90 transition-opacity shrink-0"
                  style={{ backgroundColor: "#FF8900" }}
                >
                  Apply
                </button>
              </div>
              {couponError && <p className="text-destructive text-xs font-body mt-1.5">{couponError}</p>}
            </div>
          )}
        </div>

        {/* ── Step indicators ── */}
        <div className="flex items-center gap-2 mb-8">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <button
                onClick={() => { if (i < step) setStep(i); }}
                className={`flex items-center gap-1.5 text-sm font-body ${
                  i === step ? "font-bold text-foreground"
                  : i < step ? "text-foreground underline cursor-pointer"
                  : "text-muted-foreground"
                }`}
              >
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    i <= step ? "text-white" : "bg-muted text-muted-foreground"
                  }`}
                  style={i <= step ? { backgroundColor: "#16A34A" } : {}}
                >
                  {i + 1}
                </span>
                {s}
              </button>
              {i < steps.length - 1 && <ChevronRight size={14} className="text-muted-foreground" />}
            </div>
          ))}
        </div>

        {/* ── Step 1: Contact ── */}
        {step === 0 && (
          <div className="space-y-6">
            <h2 className="font-body text-xl font-bold text-foreground">Contact details</h2>
            <div className="space-y-1">
              <label className="font-body text-sm font-medium text-foreground">
                Full Name <span className="text-destructive">*</span>
              </label>
              <Input
                placeholder="Your full name"
                value={contact.name}
                onChange={(e) => setContact({ ...contact, name: e.target.value })}
              />
              {errors.name && <p className="text-destructive text-xs font-body">{errors.name}</p>}
            </div>
            <div className="space-y-1">
              <label className="font-body text-sm font-medium text-foreground">
                WhatsApp Number <span className="text-destructive">*</span>
              </label>
              <div className="flex gap-2">
                <div className="flex items-center px-3 border border-input rounded-md bg-muted text-sm font-body text-muted-foreground">
                  +91
                </div>
                <Input
                  placeholder="10-digit number"
                  value={contact.whatsapp}
                  onChange={(e) => setContact({ ...contact, whatsapp: e.target.value.replace(/\D/g, "").slice(0, 10) })}
                  type="tel"
                  inputMode="numeric"
                />
              </div>
              {errors.whatsapp && <p className="text-destructive text-xs font-body">{errors.whatsapp}</p>}
            </div>
          </div>
        )}

        {/* ── Step 2: Address ── */}
        {step === 1 && (
          <div className="space-y-6">
            <h2 className="font-body text-xl font-bold text-foreground">Delivery address</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-body text-sm font-medium text-foreground">Door No. *</label>
                <Input value={address.door} onChange={(e) => setAddress({ ...address, door: e.target.value })} placeholder="e.g. 12A" />
                {errors.door && <p className="text-destructive text-xs">{errors.door}</p>}
              </div>
              <div className="space-y-1">
                <label className="font-body text-sm font-medium text-foreground">Building</label>
                <Input value={address.building} onChange={(e) => setAddress({ ...address, building: e.target.value })} placeholder="Optional" />
              </div>
            </div>
            <div className="space-y-1">
              <label className="font-body text-sm font-medium text-foreground">Street *</label>
              <Input value={address.street} onChange={(e) => setAddress({ ...address, street: e.target.value })} placeholder="Street name" />
              {errors.street && <p className="text-destructive text-xs">{errors.street}</p>}
            </div>
            <div className="space-y-1">
              <label className="font-body text-sm font-medium text-foreground">Area / Locality *</label>
              <Input value={address.area} onChange={(e) => setAddress({ ...address, area: e.target.value })} placeholder="Area name" />
              {errors.area && <p className="text-destructive text-xs">{errors.area}</p>}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-body text-sm font-medium text-foreground">City *</label>
                <Input value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value })} placeholder="City" />
                {errors.city && <p className="text-destructive text-xs">{errors.city}</p>}
              </div>
              <div className="space-y-1">
                <label className="font-body text-sm font-medium text-foreground">Pincode *</label>
                <Input value={address.pincode} onChange={(e) => setAddress({ ...address, pincode: e.target.value.replace(/\D/g, "").slice(0, 6) })} placeholder="6 digits" inputMode="numeric" />
                {errors.pincode && <p className="text-destructive text-xs">{errors.pincode}</p>}
              </div>
            </div>
          </div>
        )}

        {/* ── Step 3: Payment ── */}
        {step === 2 && (
          <div className="space-y-4">
            <h2 className="font-body text-xl font-bold text-foreground">Choose a payment method</h2>
            <div className="space-y-2.5">
              {/* Card */}
              <button
                onClick={() => { setPaymentMethod("card"); setErrors({}); }}
                className={`w-full flex items-center gap-3 px-4 py-4 text-left rounded-xl border-2 transition-all bg-white ${
                  paymentMethod === "card"
                    ? "border-[#FF8900] shadow-sm"
                    : "border-border/60 hover:border-foreground/30"
                }`}
              >
                <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${paymentMethod === "card" ? "border-[#FF8900]" : "border-muted-foreground"}`}>
                  {paymentMethod === "card" && <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#FF8900" }} />}
                </span>
                <CreditCard size={20} className="text-foreground shrink-0" />
                <div className="flex-1">
                  <span className="font-body text-sm font-semibold text-foreground block">Credit / Debit Card</span>
                  <span className="font-body text-xs text-muted-foreground">Visa, Mastercard, RuPay, Amex</span>
                </div>
              </button>

              {/* UPI */}
              <button
                onClick={() => { setPaymentMethod("upi"); setErrors({}); }}
                className={`w-full flex items-center gap-3 px-4 py-4 text-left rounded-xl border-2 transition-all bg-white ${
                  paymentMethod === "upi"
                    ? "border-[#FF8900] shadow-sm"
                    : "border-border/60 hover:border-foreground/30"
                }`}
              >
                <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${paymentMethod === "upi" ? "border-[#FF8900]" : "border-muted-foreground"}`}>
                  {paymentMethod === "upi" && <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#FF8900" }} />}
                </span>
                <Smartphone size={20} className="text-foreground shrink-0" />
                <div className="flex-1">
                  <span className="font-body text-sm font-semibold text-foreground block">UPI</span>
                  <span className="font-body text-xs text-muted-foreground">GPay, PhonePe, Paytm, BHIM</span>
                </div>
              </button>

              {/* COD */}
              <button
                onClick={() => { if (isChennai) { setPaymentMethod("cod"); setErrors({}); } }}
                className={`w-full flex items-center gap-3 px-4 py-4 text-left rounded-xl border-2 transition-all bg-white ${
                  !isChennai
                    ? "opacity-50 cursor-not-allowed border-border/60"
                    : paymentMethod === "cod"
                    ? "border-[#FF8900] shadow-sm"
                    : "border-border/60 hover:border-foreground/30"
                }`}
                disabled={!isChennai}
              >
                <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${paymentMethod === "cod" ? "border-[#FF8900]" : "border-muted-foreground"}`}>
                  {paymentMethod === "cod" && <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#FF8900" }} />}
                </span>
                <Banknote size={20} className="text-foreground shrink-0" />
                <div className="flex-1">
                  <span className="font-body text-sm font-semibold text-foreground block">Cash on Delivery</span>
                  <span className="font-body text-xs text-muted-foreground">
                    {!isChennai ? "Available only in Chennai" : "Pay at your doorstep"}
                  </span>
                </div>
              </button>
            </div>
            {errors.payment && <p className="text-destructive text-xs font-body">{errors.payment}</p>}

            {/* Trust indicator below methods */}
            <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-lg p-3 mt-2">
              <ShieldCheck size={18} className="text-green-700 shrink-0" />
              <p className="font-body text-xs text-green-800 leading-snug">
                {paymentMethod === "cod"
                  ? "You'll receive order confirmation on WhatsApp once placed."
                  : "100% Secure. Payments are processed by Razorpay — we never store your card details."}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* ── Sticky footer ── */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border px-4 py-4 z-40">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={step < 2 ? handleNext : handlePayment}
            className="w-full font-body font-semibold text-white py-3.5 rounded-md text-sm hover:opacity-90 transition-opacity"
            style={{ backgroundColor: step < 2 ? "#FF8900" : "#16A34A" }}
          >
            {step < 2
              ? "Continue"
              : paymentMethod === "cod"
              ? "Confirm COD Order"
              : paymentMethod
              ? `Pay ₹${subtotal} Securely`
              : "Confirm Order"}
          </button>
        </div>
      </div>

      {/* ── Price breakdown drawer ── */}
      <Drawer open={breakdownOpen} onOpenChange={setBreakdownOpen}>
        <DrawerContent className="max-h-[50vh]">
          <DrawerHeader className="text-left">
            <DrawerTitle className="font-body text-lg font-bold">Order Summary</DrawerTitle>
          </DrawerHeader>
          <div className="px-4 pb-6 space-y-4">
            <div className="space-y-2">
              {items.map((item) => (
                <div key={item.name} className="flex justify-between font-body text-sm">
                  <span className="text-foreground">{item.name} × {item.quantity}</span>
                  <span className="text-foreground font-medium">₹{item.priceNum * item.quantity}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-border pt-3 space-y-2">
              <div className="flex justify-between font-body text-sm">
                <span className="text-muted-foreground">Items Total</span>
                <span className="text-foreground">₹{totalPrice}</span>
              </div>
              {appliedCoupon && (
                <div className="flex justify-between font-body text-sm">
                  <span className="text-green-600">Coupon ({appliedCoupon})</span>
                  <span className="text-green-600 font-medium">−₹{discountAmount}</span>
                </div>
              )}
              <div className="flex justify-between font-body text-sm">
                <span className="text-muted-foreground">Tax (5%)</span>
                <span className="text-foreground">₹{tax}</span>
              </div>
              <div className="flex justify-between font-body text-sm">
                <span className="text-muted-foreground">Delivery</span>
                <span className="text-foreground">
                  <span className="line-through text-muted-foreground mr-1">₹50</span>
                  <span className="text-green-600 font-medium">FREE</span>
                </span>
              </div>
            </div>
            <div className="border-t border-border pt-3">
              <div className="flex justify-between font-body text-base font-bold">
                <span>Subtotal</span>
                <span style={{ color: "#FF8900" }}>₹{subtotal}</span>
              </div>
              {appliedCoupon && (
                <p className="font-body text-xs text-green-600 text-right mt-1">
                  You're saving ₹{discountAmount}!
                </p>
              )}
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default Checkout;
