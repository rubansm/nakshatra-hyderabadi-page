import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle2, Package, Truck, Home, MessageCircle, Mail, ShieldCheck, Copy, Check } from "lucide-react";
import Navbar from "@/components/Navbar";
import { useCart } from "@/context/CartContext";

const OWNER_WHATSAPP = "919840247628";

type StoredOrder = {
  orderId: string;
  name: string;
  phone: string;
  email: string;
  items: string;
  subtotal: number;
  paymentMethod: "card" | "upi" | "cod";
  paymentId?: string;
  address: string;
  placedAt: string; // ISO string
};

const readOrderFromSession = (): StoredOrder | null => {
  try {
    const raw = sessionStorage.getItem("nakshatra:lastOrder");
    if (!raw) return null;
    return JSON.parse(raw) as StoredOrder;
  } catch {
    return null;
  }
};

const formatDate = (iso: string, offsetDays = 0) => {
  const d = new Date(iso);
  d.setDate(d.getDate() + offsetDays);
  return d.toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
};

const OrderSuccess = () => {
  const navigate = useNavigate();
  const { clearCart } = useCart();
  const [order] = useState<StoredOrder | null>(() => readOrderFromSession());
  const [copied, setCopied] = useState(false);

  // Clear cart once on arrival — order is already captured
  useEffect(() => {
    if (order) clearCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const expectedDelivery = useMemo(
    () => (order ? formatDate(order.placedAt, 2) : ""),
    [order]
  );

  const copyOrderId = async () => {
    if (!order) return;
    try {
      await navigator.clipboard.writeText(order.orderId);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* noop */
    }
  };

  if (!order) {
    return (
      <div className="min-h-screen bg-[#FAF7F2]">
        <Navbar />
        <div className="container mx-auto px-4 pt-32 max-w-lg text-center">
          <h1 className="font-body text-2xl font-bold text-foreground mb-3">
            No recent order found
          </h1>
          <p className="font-body text-sm text-muted-foreground mb-6">
            If you just paid, please check your email or WhatsApp for the order details.
          </p>
          <div className="flex flex-col gap-3">
            <button
              onClick={() => navigate("/track")}
              className="w-full py-3 rounded-lg font-body font-semibold text-white text-sm"
              style={{ backgroundColor: "#FF8900" }}
            >
              Track an Order
            </button>
            <button
              onClick={() => navigate("/")}
              className="w-full py-3 rounded-lg font-body font-medium text-foreground text-sm bg-white border border-border/60"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  const trackUrl = `/track?id=${encodeURIComponent(order.orderId)}&phone=${encodeURIComponent(order.phone)}`;
  const waOwner = `https://wa.me/${OWNER_WHATSAPP}?text=${encodeURIComponent(
    `Hi! I just placed order ${order.orderId}. Wanted to confirm delivery details.`
  )}`;

  return (
    <div className="min-h-screen bg-[#FAF7F2] pb-16">
      <Navbar />

      <div className="container mx-auto px-4 pt-28 max-w-xl">
        {/* Hero */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-green-50 flex items-center justify-center shadow-sm">
            <CheckCircle2 size={48} className="text-green-600" strokeWidth={2} />
          </div>
          <div className="inline-block bg-green-50 text-green-700 text-[11px] font-bold tracking-wider uppercase px-3 py-1 rounded-full mb-3">
            ✓ Payment Received
          </div>
          <h1 className="font-body text-2xl md:text-3xl font-bold text-foreground mb-1">
            Order Confirmed
          </h1>
          <p className="font-body text-sm text-muted-foreground">
            Thank you, <span className="text-foreground font-semibold">{order.name}</span> — your pickle is being packed fresh 🧡
          </p>
        </div>

        {/* Order number card */}
        <div className="bg-white rounded-xl border border-border/50 p-4 mb-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-body text-[11px] text-muted-foreground uppercase tracking-wider">
                Order Number
              </p>
              <p className="font-body text-lg font-bold text-foreground mt-0.5 tracking-wide">
                {order.orderId}
              </p>
            </div>
            <button
              onClick={copyOrderId}
              className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors px-3 py-2 rounded-md border border-border/60"
            >
              {copied ? <Check size={13} className="text-green-600" /> : <Copy size={13} />}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
        </div>

        {/* Next steps reassurance */}
        <div className="bg-white rounded-xl border border-border/50 p-4 mb-4 shadow-sm">
          <div className="flex gap-3">
            <div className="w-9 h-9 rounded-full bg-[#FFF3E0] flex items-center justify-center shrink-0">
              <MessageCircle size={18} style={{ color: "#FF8900" }} />
            </div>
            <div className="flex-1">
              <p className="font-body text-sm font-semibold text-foreground">
                You'll hear from us within 10 minutes
              </p>
              <p className="font-body text-xs text-muted-foreground leading-relaxed mt-0.5">
                A personal confirmation on{" "}
                <span className="text-foreground font-medium">WhatsApp</span> (+91 {order.phone}) and a receipt to{" "}
                <span className="text-foreground font-medium">{order.email || "your email"}</span> with your tracking link.
              </p>
            </div>
          </div>
        </div>

        {/* Delivery timeline */}
        <div className="bg-white rounded-xl border border-border/50 p-5 mb-4 shadow-sm">
          <h2 className="font-body text-sm font-bold text-foreground mb-4 uppercase tracking-wide">
            What happens next
          </h2>
          <ol className="space-y-4">
            <TimelineStep
              icon={<CheckCircle2 size={16} />}
              title="Order placed"
              subtitle={`Received · ${formatDate(order.placedAt)}`}
              status="done"
            />
            <TimelineStep
              icon={<Package size={16} />}
              title="Packed fresh"
              subtitle="Within 24 hours"
              status="pending"
            />
            <TimelineStep
              icon={<Truck size={16} />}
              title="Dispatched"
              subtitle="Tomorrow"
              status="pending"
            />
            <TimelineStep
              icon={<Home size={16} />}
              title="Delivered"
              subtitle={`Expected by ${expectedDelivery}`}
              status="pending"
              last
            />
          </ol>
        </div>

        {/* Order summary */}
        <div className="bg-white rounded-xl border border-border/50 p-5 mb-4 shadow-sm">
          <h2 className="font-body text-sm font-bold text-foreground mb-3 uppercase tracking-wide">
            Your order
          </h2>
          <div className="space-y-2 mb-3">
            {order.items.split("\n").filter(Boolean).map((line, i) => (
              <div key={i} className="font-body text-sm text-foreground leading-relaxed">
                • {line}
              </div>
            ))}
          </div>
          <div className="border-t border-dashed border-border/60 pt-3 flex justify-between items-center">
            <span className="font-body text-sm text-muted-foreground">
              {order.paymentMethod === "cod" ? "To pay on delivery" : "Total paid"}
            </span>
            <span className="font-body text-lg font-bold" style={{ color: "#FF8900" }}>
              ₹{order.subtotal}
            </span>
          </div>
        </div>

        {/* Shipping address */}
        <div className="bg-white rounded-xl border border-border/50 p-5 mb-4 shadow-sm">
          <h2 className="font-body text-sm font-bold text-foreground mb-2 uppercase tracking-wide">
            Shipping to
          </h2>
          <p className="font-body text-sm text-foreground leading-relaxed">
            {order.name} · +91 {order.phone}
          </p>
          <p className="font-body text-sm text-muted-foreground leading-relaxed mt-1">
            {order.address}
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col gap-3 mb-6">
          <button
            onClick={() => navigate(trackUrl)}
            className="w-full py-3.5 rounded-lg font-body font-semibold text-white text-sm shadow-sm transition-transform active:scale-[0.98]"
            style={{ backgroundColor: "#FF8900" }}
          >
            🔍 Track Your Order
          </button>
          <a
            href={waOwner}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3.5 rounded-lg font-body font-semibold text-foreground text-sm bg-white border border-border/60 hover:border-foreground/40 transition-colors flex items-center justify-center gap-2"
          >
            <MessageCircle size={16} />
            Chat with us on WhatsApp
          </a>
        </div>

        {/* Trust footer */}
        <div className="bg-white rounded-xl border border-border/50 p-4 mb-4 shadow-sm">
          <div className="grid grid-cols-3 gap-2 text-center">
            <TrustPill icon={<ShieldCheck size={16} className="text-green-600" />} label="100% Secure" />
            <TrustPill icon={<Mail size={16} className="text-green-600" />} label="Email Receipt" />
            <TrustPill icon={<MessageCircle size={16} className="text-green-600" />} label="WhatsApp Support" />
          </div>
        </div>

        {/* Secondary CTA */}
        <div className="text-center mt-2">
          <p className="font-body text-xs text-muted-foreground mb-2">
            Want to try more?
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => navigate("/pickles")}
              className="flex-1 py-2.5 rounded-lg font-body font-medium text-xs text-foreground bg-white border border-border/60 hover:border-foreground/40 transition-colors"
            >
              Browse Pickles
            </button>
            <button
              onClick={() => navigate("/snacks")}
              className="flex-1 py-2.5 rounded-lg font-body font-medium text-xs text-foreground bg-white border border-border/60 hover:border-foreground/40 transition-colors"
            >
              Browse Snacks
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

type StepStatus = "done" | "active" | "pending";

const TimelineStep = ({
  icon,
  title,
  subtitle,
  status,
  last,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  status: StepStatus;
  last?: boolean;
}) => {
  const dotColor =
    status === "done" ? "bg-green-600 text-white" : "bg-muted text-muted-foreground";
  const textColor = status === "done" ? "text-foreground" : "text-muted-foreground";
  return (
    <li className="flex gap-3">
      <div className="flex flex-col items-center">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${dotColor}`}>
          {icon}
        </div>
        {!last && <div className="w-px flex-1 bg-border/60 mt-1" style={{ minHeight: 18 }} />}
      </div>
      <div className="pb-1">
        <p className={`font-body text-sm font-semibold ${textColor}`}>{title}</p>
        <p className="font-body text-xs text-muted-foreground mt-0.5">{subtitle}</p>
      </div>
    </li>
  );
};

const TrustPill = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
  <div className="flex flex-col items-center gap-1">
    {icon}
    <p className="font-body text-[10px] text-muted-foreground leading-tight">{label}</p>
  </div>
);

export default OrderSuccess;
