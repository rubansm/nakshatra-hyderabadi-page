import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import BackButton from "@/components/BackButton";
import { useCart } from "@/context/CartContext";
import { Input } from "@/components/ui/input";
import { ChevronRight, CreditCard, Smartphone, Banknote, Info } from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

const steps = ["Contact", "Address", "Payment"];

const Checkout = () => {
  const navigate = useNavigate();
  const { items, totalPrice } = useCart();
  const [step, setStep] = useState(0);
  const [breakdownOpen, setBreakdownOpen] = useState(false);

  const [contact, setContact] = useState({ name: "", whatsapp: "" });
  const [address, setAddress] = useState({
    door: "", building: "", street: "", area: "", city: "", pincode: "",
  });
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const tax = Math.round(totalPrice * 0.05);
  const subtotal = totalPrice + tax;

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

  const handlePayment = () => {
    if (!paymentMethod) {
      setErrors({ payment: "Please select a payment method" });
      return;
    }

    if (paymentMethod === "card" || paymentMethod === "upi") {
      // Placeholder for Razorpay integration
      alert("Razorpay integration coming soon! Your order details have been saved.");
    } else if (paymentMethod === "cod") {
      // Redirect to WhatsApp for OTP verification
      const orderSummary = items
        .map((i) => `${i.quantity}x ${i.name} (${i.price} each)`)
        .join("\n");
      const msg = `Hi, Nakshatra foods, May I have your time !!!\n\nI'd like to place a COD order:\n\nName: ${contact.name}\nWhatsApp: ${contact.whatsapp}\nAddress: ${address.door}, ${address.building ? address.building + ", " : ""}${address.street}, ${address.area}, ${address.city} - ${address.pincode}\n\n${orderSummary}\n\nSubtotal: ₹${subtotal}\n\nPlease send me an OTP to confirm this order.`;
      window.open(
        `https://wa.me/919010291295?text=${encodeURIComponent(msg)}`,
        "_blank"
      );
    }
  };

  const isChennai = address.city.trim().toLowerCase() === "chennai";

  return (
    <div className="min-h-screen bg-background pb-28">
      <Navbar />
      <BackButton />
      <div className="container mx-auto px-4 pt-24 max-w-2xl">
        {/* Price breakdown bar */}
        <button
          onClick={() => setBreakdownOpen(true)}
          className="w-full flex items-center justify-between rounded-lg px-4 py-3 mb-6"
          style={{ backgroundColor: "#E6F9F0" }}
        >
          <div className="flex items-center gap-2 font-body text-sm font-medium text-foreground">
            <Info size={16} />
            <span>Price breakdown</span>
          </div>
          <span className="font-navbar font-bold text-foreground">₹{subtotal}</span>
        </button>

        {/* Step indicators */}
        <div className="flex items-center gap-2 mb-8">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <button
                onClick={() => {
                  if (i < step) setStep(i);
                }}
                className={`flex items-center gap-1.5 text-sm font-body ${
                  i === step
                    ? "font-bold text-foreground"
                    : i < step
                    ? "text-foreground underline cursor-pointer"
                    : "text-muted-foreground"
                }`}
              >
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    i <= step
                      ? "text-white"
                      : "bg-muted text-muted-foreground"
                  }`}
                  style={i <= step ? { backgroundColor: "#16A34A" } : {}}
                >
                  {i + 1}
                </span>
                {s}
              </button>
              {i < steps.length - 1 && (
                <ChevronRight size={14} className="text-muted-foreground" />
              )}
            </div>
          ))}
        </div>

        {/* Step 1: Contact */}
        {step === 0 && (
          <div className="space-y-6">
            <h2 className="font-navbar text-xl font-bold text-foreground">Contact details</h2>
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
                  onChange={(e) =>
                    setContact({ ...contact, whatsapp: e.target.value.replace(/\D/g, "").slice(0, 10) })
                  }
                  type="tel"
                  inputMode="numeric"
                />
              </div>
              {errors.whatsapp && <p className="text-destructive text-xs font-body">{errors.whatsapp}</p>}
            </div>
          </div>
        )}

        {/* Step 2: Address */}
        {step === 1 && (
          <div className="space-y-6">
            <h2 className="font-navbar text-xl font-bold text-foreground">Delivery address</h2>
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

        {/* Step 3: Payment */}
        {step === 2 && (
          <div className="space-y-6">
            <h2 className="font-navbar text-xl font-bold text-foreground">Payment details</h2>

            <div className="border border-border rounded-lg overflow-hidden">
              {/* Card option */}
              <button
                onClick={() => { setPaymentMethod("card"); setErrors({}); }}
                className={`w-full flex items-center gap-3 px-4 py-4 text-left border-b border-border transition-colors ${
                  paymentMethod === "card" ? "bg-accent" : ""
                }`}
              >
                <span
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    paymentMethod === "card" ? "border-[#16A34A]" : "border-muted-foreground"
                  }`}
                >
                  {paymentMethod === "card" && (
                    <span className="w-2.5 h-2.5 rounded-full bg-[#16A34A]" />
                  )}
                </span>
                <CreditCard size={20} className="text-foreground" />
                <span className="font-body text-sm font-medium text-foreground">Debit / Credit Card</span>
              </button>

              {/* UPI option */}
              <button
                onClick={() => { setPaymentMethod("upi"); setErrors({}); }}
                className={`w-full flex items-center gap-3 px-4 py-4 text-left border-b border-border transition-colors ${
                  paymentMethod === "upi" ? "bg-accent" : ""
                }`}
              >
                <span
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    paymentMethod === "upi" ? "border-[#16A34A]" : "border-muted-foreground"
                  }`}
                >
                  {paymentMethod === "upi" && (
                    <span className="w-2.5 h-2.5 rounded-full bg-[#16A34A]" />
                  )}
                </span>
                <Smartphone size={20} className="text-foreground" />
                <span className="font-body text-sm font-medium text-foreground">UPI</span>
              </button>

              {/* COD option */}
              <button
                onClick={() => {
                  if (isChennai) {
                    setPaymentMethod("cod");
                    setErrors({});
                  }
                }}
                className={`w-full flex items-center gap-3 px-4 py-4 text-left transition-colors ${
                  !isChennai ? "opacity-50 cursor-not-allowed" : paymentMethod === "cod" ? "bg-accent" : ""
                }`}
                disabled={!isChennai}
              >
                <span
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    paymentMethod === "cod" ? "border-[#16A34A]" : "border-muted-foreground"
                  }`}
                >
                  {paymentMethod === "cod" && (
                    <span className="w-2.5 h-2.5 rounded-full bg-[#16A34A]" />
                  )}
                </span>
                <Banknote size={20} className="text-foreground" />
                <div>
                  <span className="font-body text-sm font-medium text-foreground">Cash on Delivery</span>
                  {!isChennai && (
                    <p className="font-body text-xs text-muted-foreground">Available only in Chennai</p>
                  )}
                </div>
              </button>
            </div>
            {errors.payment && <p className="text-destructive text-xs font-body">{errors.payment}</p>}

            {paymentMethod === "cod" && (
              <p className="font-body text-xs text-muted-foreground">
                You'll receive an OTP on WhatsApp to confirm your COD order.
              </p>
            )}
          </div>
        )}
      </div>

      {/* Sticky bottom button */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border px-4 py-4 z-40">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={step < 2 ? handleNext : handlePayment}
            className="w-full font-body font-semibold text-white py-3.5 rounded-full text-sm hover:opacity-90 transition-opacity"
            style={{ backgroundColor: step < 2 ? "#FF8900" : "#16A34A" }}
          >
            {step < 2 ? "Continue" : paymentMethod === "cod" ? "Verify via WhatsApp" : "Pay ₹" + subtotal}
          </button>
        </div>
      </div>

      {/* Price breakdown drawer */}
      <Drawer open={breakdownOpen} onOpenChange={setBreakdownOpen}>
        <DrawerContent className="max-h-[50vh]">
          <DrawerHeader className="text-left">
            <DrawerTitle className="font-navbar text-lg font-bold">Order Summary</DrawerTitle>
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

export default Checkout;
